#!/opt/homebrew/bin/python3.11
"""
ECG Heart Disease Prediction Script
Digitizes a 6x2 grid ECG PNG and runs inference with the fine-tuned model
"""
import sys
import os
import json
import numpy as np
import torch 
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GCNConv, global_mean_pool
import cv2
from scipy.signal import resample 

# Configuration
TARGET_CLASSES = ['NORM', 'MI', 'STTC', 'HYP', 'CD']
DISEASE_CLASSES = ['MI', 'STTC', 'HYP', 'CD']
LEAD_NAMES = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6']

# Calibrated thresholds (from notebook Step 6 - adjust based on your calibration)
CALIBRATED_THRESHOLDS = {
    'MI': 0.92,
    'STTC': 0.78,
    'HYP': 0.92,
    'CD': 0.91
}

# Model path - update this to your model location
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'finetuned_model.pt')
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


class LeadCNN(nn.Module):
    """1D CNN for extracting features from single ECG lead"""
    def __init__(self, in_channels=1, hidden=64):
        super().__init__()
        self.conv1 = nn.Conv1d(in_channels, 32, kernel_size=7, stride=2, padding=3)
        self.bn1 = nn.BatchNorm1d(32)
        self.conv2 = nn.Conv1d(32, hidden, kernel_size=5, stride=2, padding=2)
        self.bn2 = nn.BatchNorm1d(hidden)
        self.conv3 = nn.Conv1d(hidden, hidden, kernel_size=3, stride=2, padding=1)
        self.bn3 = nn.BatchNorm1d(hidden)
        self.pool = nn.AdaptiveAvgPool1d(1)
    
    def forward(self, x):
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        x = F.relu(self.bn3(self.conv3(x)))
        return self.pool(x).squeeze(-1)


class ECG_CNN_GNN(nn.Module):
    """Hybrid CNN-GNN model for 12-lead ECG classification"""
    def __init__(self, cnn_out=64, hidden=128, num_classes=5, dropout=0.5):
        super().__init__()
        self.cnn = LeadCNN(hidden=cnn_out)
        self.gcn1 = GCNConv(cnn_out, hidden)
        self.gcn2 = GCNConv(hidden, hidden)
        self.fc1 = nn.Linear(hidden, hidden // 2)
        self.fc2 = nn.Linear(hidden // 2, num_classes)
        self.dropout = dropout
    
    def forward(self, x, edge_index, batch):
        # x: (12, 1000) lead signals
        x = x.unsqueeze(1)  # (12, 1, 1000)
        lead_emb = self.cnn(x)  # (12, hidden)
        
        # GNN layers
        h = F.relu(self.gcn1(lead_emb, edge_index))
        h = F.dropout(h, p=self.dropout, training=self.training)
        h = F.relu(self.gcn2(h, edge_index))
        
        # Global pooling
        g = torch.zeros(1, dtype=torch.long, device=x.device)
        graph_emb = F.dropout(
            F.relu(self.fc1(torch.mean(h, dim=0, keepdim=True))),
            p=self.dropout,
            training=self.training
        )
        return self.fc2(graph_emb)


def digitize_single_lead(cell_bgr, target_length=1000):
    """Extract waveform from single lead image cell"""
    gray = cv2.cvtColor(cell_bgr, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY_INV)
    height, width = thresh.shape
    
    # Extract y-coordinates of waveform
    ys = []
    for x in range(width):
        rows = np.where(thresh[:, x] > 0)[0]
        if len(rows) > 0:
            ys.append(np.mean(rows))
        else:
            ys.append(ys[-1] if ys else height / 2)
    
    # Convert to waveform and normalize
    wf = height - np.array(ys, dtype=np.float32)
    wf -= wf.mean()
    scale = np.max(np.abs(wf)) + 1e-8
    wf = 1.5 * (wf / scale)
    
    # Resample to target length
    return resample(wf, target_length).astype(np.float32)


def digitize_ecg_image_6x2(image_path):
    """
    Digitize 6x2 grid ECG image layout
    Returns: (1000, 12) numpy array
    """
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Could not read image: {image_path}")
    
    H, W, _ = img.shape
    lead_height = H // 6
    lead_width = W // 2
    
    # Extract each lead cell
    leads = []
    for i in range(12):
        row = i // 2
        col = i % 2
        cell = img[row*lead_height:(row+1)*lead_height, col*lead_width:(col+1)*lead_width]
        leads.append(digitize_single_lead(cell, 1000))
    
    # Remap to correct lead order (from notebook)
    order_map = {0:0, 2:1, 4:2, 6:3, 8:4, 10:5, 1:6, 3:7, 5:8, 7:9, 9:10, 11:11}
    signal = np.zeros((1000, 12), dtype=np.float32)
    for src, dst in order_map.items():
        signal[:, dst] = leads[src]
    
    return signal


def build_graph(sig_1000x12, device):
    """Convert ECG signal to graph structure"""
    X = torch.tensor(sig_1000x12.T, dtype=torch.float, device=device)  # (12, 1000)
    
    # Fully connected graph between leads
    edges = [[i, j] for i in range(12) for j in range(12) if i != j]
    edge_index = torch.tensor(edges, dtype=torch.long, device=device).t().contiguous()
    
    batch = torch.zeros(12, dtype=torch.long, device=device)
    return X, edge_index, batch


@torch.no_grad()
def predict_probs(model, sig_1000x12):
    """Get probability predictions for all classes"""
    X, edge_index, batch = build_graph(sig_1000x12, DEVICE)
    logits = model(X, edge_index, batch)
    return torch.sigmoid(logits)[0].cpu().numpy()


def apply_calibrated_decision(probs, thresholds):
    """
    Apply calibrated thresholds to make final prediction
    Returns: (predicted_class, details_list)
    """
    passed = []
    for disease_class in DISEASE_CLASSES:
        idx = TARGET_CLASSES.index(disease_class)
        if probs[idx] >= thresholds[disease_class]:
            passed.append({
                'class': disease_class,
                'probability': float(probs[idx]),
                'threshold': thresholds[disease_class]
            })
    
    # If no disease exceeds threshold, predict NORM
    if not passed:
        return 'NORM', passed
    
    # Return disease with highest (prob - threshold) margin
    passed.sort(key=lambda x: (x['probability'] - x['threshold']), reverse=True)
    return passed[0]['class'], passed


def load_model(model_path):
    """Load the fine-tuned model"""
    model = ECG_CNN_GNN(num_classes=len(TARGET_CLASSES)).to(DEVICE)
    
    state = torch.load(model_path, map_location=DEVICE)
    if isinstance(state, dict) and 'state_dict' in state:
        state = state['state_dict']
    
    # Handle potential 'module.' prefix from DataParallel
    from collections import OrderedDict
    cleaned_state = OrderedDict()
    for k, v in state.items():
        cleaned_state[k.replace('module.', '')] = v
    
    model.load_state_dict(cleaned_state, strict=False)
    model.eval()
    return model


def predict_image(image_path, model, thresholds):
    """
    Full prediction pipeline for an ECG image
    Returns dict with prediction results
    """
    # Digitize image
    signal = digitize_ecg_image_6x2(image_path)
    
    # Get probabilities
    probs = predict_probs(model, signal)
    
    # Apply calibrated thresholds
    predicted_class, details = apply_calibrated_decision(probs, thresholds)
    
    # Map to risk level
    risk_mapping = {
        'NORM': 'Low',
        'MI': 'High',
        'STTC': 'High',
        'HYP': 'Moderate',
        'CD': 'Moderate'
    }
    
    risk_level = risk_mapping.get(predicted_class, 'Moderate')
    
    # Calculate risk score (0-100)
    if predicted_class == 'NORM':
        # Low risk for normal
        risk_score = int(probs[0] * 30)  # Max 30 for normal
    else:
        # Higher risk for disease classes
        disease_idx = TARGET_CLASSES.index(predicted_class)
        risk_score = int(probs[disease_idx] * 100)
    
    # Calculate confidence
    confidence = float(probs[TARGET_CLASSES.index(predicted_class)] * 100)
    
    return {
        'success': True,
        'predicted_class': predicted_class,
        'risk_score': risk_score,
        'risk_level': risk_level,
        'confidence': round(confidence, 2),
        'probabilities': {TARGET_CLASSES[i]: round(float(probs[i] * 100), 2) for i in range(len(TARGET_CLASSES))},
        'threshold_details': details
    }


def main():
    """CLI entry point"""
    if len(sys.argv) < 2:
        print(json.dumps({'success': False, 'error': 'No image path provided'}))
        sys.exit(1)
    
    image_path = sys.argv[1] 
    
    try:
        # Verify image exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found: {image_path}")
        
        # Verify model exists
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model not found: {MODEL_PATH}. Please place finetuned_model.pt in {os.path.dirname(MODEL_PATH)}")
        
        # Load model
        model = load_model(MODEL_PATH)
        
        # Run prediction
        result = predict_image(image_path, model, CALIBRATED_THRESHOLDS)
        
        # Output JSON result
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'success': False,
            'error': str(e)
        }
        print(json.dumps(error_result))
        sys.exit(1)


if __name__ == '__main__':
    main()

