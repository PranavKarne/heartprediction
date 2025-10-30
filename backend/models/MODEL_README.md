# Model Setup Instructions

## Required Model File

Place your trained model file here:
- **File**: `finetuned_model.pt`
- **Path**: `/backend/models/finetuned_model.pt`

## Model Information

- **Architecture**: ECG_CNN_GNN (CNN + Graph Neural Network)
- **Framework**: PyTorch + PyTorch Geometric
- **Input**: 12-lead ECG image (PNG, 6x2 grid layout)
- **Output**: 5 classes (NORM, MI, STTC, HYP, CD)

## Installation Steps

1. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements-ml.txt
   ```

2. **Place your model file**:
   - Copy `finetuned_model.pt` from your training environment
   - Place it in this directory: `backend/models/`

3. **Verify Python installation**:
   ```bash
   python3 predict.py --help
   ```

## Model Training

If you need to retrain or fine-tune the model, refer to:
- Original training notebook: `backend/models/finalmodelcollab.ipynb`
- Training uses PTB-XL dataset with reconstructed ECG graphs

## Troubleshooting

### Import Errors
If you get torch/cv2 import errors:
```bash
pip install torch torchvision
pip install torch-geometric
pip install opencv-python scipy numpy
```

### Model Not Found
Ensure `finetuned_model.pt` is in `backend/models/` directory and the path in `predict.py` is correct.

### CUDA Issues
The script auto-detects CUDA. If you want to force CPU:
- Edit `predict.py` and change `DEVICE` line to: `DEVICE = torch.device('cpu')`
