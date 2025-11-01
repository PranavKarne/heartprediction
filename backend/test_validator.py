#!/opt/homebrew/bin/python3.11
"""
Test script to verify MobileNetV2 validator integration
"""
import torch
from torchvision import models
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'best_mobilenetv2.pt')

print("=" * 60)
print("🧪 Testing MobileNetV2 Validator Integration")
print("=" * 60)

# Check if model file exists
print(f"\n1. Checking model file...")
print(f"   Path: {MODEL_PATH}")
if os.path.exists(MODEL_PATH):
    print(f"   ✅ Model file found")
    file_size = os.path.getsize(MODEL_PATH) / (1024 * 1024)
    print(f"   Size: {file_size:.2f} MB")
else:
    print(f"   ❌ Model file NOT found")
    exit(1)

# Try loading the model
print(f"\n2. Loading MobileNetV2 model...")
try:
    model = models.mobilenet_v2(weights=None)
    model.classifier[1] = torch.nn.Linear(model.last_channel, 1)
    
    state_dict = torch.load(MODEL_PATH, map_location='cpu')
    model.load_state_dict(state_dict)
    
    model.eval()
    print(f"   ✅ Model loaded successfully")
    
    # Count parameters
    total_params = sum(p.numel() for p in model.parameters())
    print(f"   Parameters: {total_params:,}")
    
except Exception as e:
    print(f"   ❌ Failed to load model: {e}")
    exit(1)

# Test inference with dummy input
print(f"\n3. Testing inference...")
try:
    dummy_input = torch.randn(1, 3, 224, 224)
    with torch.no_grad():
        output = model(dummy_input)
        prob = torch.sigmoid(output).item()
    
    print(f"   ✅ Inference successful")
    print(f"   Output shape: {output.shape}")
    print(f"   Sample probability: {prob:.4f}")
    
except Exception as e:
    print(f"   ❌ Inference failed: {e}")
    exit(1)

print("\n" + "=" * 60)
print("✅ All tests passed! Integration ready.")
print("=" * 60)
