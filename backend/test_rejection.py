#!/opt/homebrew/bin/python3.11
"""
Test the validation rejection with a non-ECG image
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from predict import load_ecg_validator, validate_ecg_image
from PIL import Image
import numpy as np

# Create a fake non-ECG image (random noise)
print("Creating test non-ECG image...")
img = Image.fromarray(np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8))
test_path = '/tmp/test_non_ecg.png'
img.save(test_path)
print(f"✅ Saved test image: {test_path}")

# Load validator
print("\nLoading validator...")
validator = load_ecg_validator()
print(f"✅ Validator loaded: {validator is not None}")

# Test validation
print("\nTesting validation...")
is_valid, confidence = validate_ecg_image(test_path, validator)
print(f"Result:")
print(f"  - Is valid ECG: {is_valid}")
print(f"  - Confidence: {confidence:.2%}")
print(f"  - Threshold: 50%")

if not is_valid:
    print("\n✅ SUCCESS! Non-ECG image correctly REJECTED")
else:
    print("\n❌ ERROR! Non-ECG image incorrectly ACCEPTED")

# Cleanup
os.remove(test_path)
