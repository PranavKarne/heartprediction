#!/opt/homebrew/bin/python3.11
import sys
import os

# Test if we can import the necessary libraries
print("Testing imports...")
try:
    import torch
    print("✅ torch")
except Exception as e:
    print(f"❌ torch: {e}")

try:
    from torchvision import models, transforms
    print("✅ torchvision")
except Exception as e:
    print(f"❌ torchvision: {e}")

try:
    from PIL import Image
    print("✅ PIL")
except Exception as e:
    print(f"❌ PIL: {e}")

try:
    from torch_geometric.nn import GCNConv
    print("✅ torch_geometric")
except Exception as e:
    print(f"❌ torch_geometric: {e}")

# Test model loading
print("\nTesting model files...")
model_path = os.path.join(os.path.dirname(__file__), 'models', 'finetuned_model.pt')
validator_path = os.path.join(os.path.dirname(__file__), 'models', 'best_mobilenetv2.pt')

print(f"Main model exists: {os.path.exists(model_path)}")
print(f"Validator exists: {os.path.exists(validator_path)}")

# Try loading validator
print("\nTrying to load validator...")
try:
    model = models.mobilenet_v2(weights=None)
    print(f"✅ Created MobileNetV2 architecture")
    model.classifier[1] = torch.nn.Linear(model.last_channel, 1)
    print(f"✅ Modified classifier")
    state_dict = torch.load(validator_path, map_location='cpu')
    print(f"✅ Loaded state dict")
    model.load_state_dict(state_dict)
    print(f"✅ Applied state dict")
    print("SUCCESS!")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
