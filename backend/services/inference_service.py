import os
import io
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
from typing import Dict, Any, Tuple
import torchvision.models as models
from pathlib import Path

from backend.config import (
    SUPPORTED_CLASSES,
    CLASS_NAMES,
    NUM_CLASSES,
    UNKNOWN_CONFIDENCE_THRESHOLD,
    MODEL_VERSION,
    DATASET_VERSION,
    SAVED_MODELS_DIR,
    BASE_DIR
)

class CropDiseaseInferenceEngine:
    """
    Production PyTorch Inference Engine for Crop Disease Identification
    utilizing trained agrirakshak_rice_maize.pt EfficientNet-B0 checkpoint.
    """

    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.temperature = 1.0  # Raw calibrated softmax
        self.model = None
        self.class_names = []
        self.class_to_idx = {}
        self.image_size = 224
        self.normalization = {"mean": [0.485, 0.456, 0.406], "std": [0.229, 0.224, 0.225]}
        self.transform = None

        print("========================================")
        print("    AGRIRAKSHAK EFFICIENTNET-B0 ENGINE  ")
        print("========================================")
        print("Device:", self.device)

        self._load_or_initialize_model()

    def _load_or_initialize_model(self):
        # Locate model checkpoint relative to project root or saved models directory
        possible_paths = [
            BASE_DIR.parent / "agrirakshak_rice_maize.pt",
            SAVED_MODELS_DIR / "agrirakshak_rice_maize.pt",
            BASE_DIR.parent / "output" / "agrirakshak_rice_maize.pt"
        ]

        model_path = None
        for p in possible_paths:
            if p.exists():
                model_path = p
                break

        if model_path is None or not model_path.exists():
            print(f"[ML Engine] WARNING: agrirakshak_rice_maize.pt not found. Checkpoint search paths: {[str(p) for p in possible_paths]}")
            # Fallback initialization
            self.class_names = [cls["condition"] for cls in SUPPORTED_CLASSES]
            num_classes = len(self.class_names)
            base_model = models.efficientnet_b0(weights=None)
            base_model.classifier[1] = nn.Linear(base_model.classifier[1].in_features, num_classes)
            base_model.to(self.device)
            base_model.eval()
            self.model = base_model
        else:
            print(f"[ML Engine] Loading AgriRakshak trained checkpoint from {model_path}...")
            checkpoint = torch.load(str(model_path), map_location=self.device, weights_only=False)

            self.class_names = checkpoint.get("class_names", [cls["condition"] for cls in SUPPORTED_CLASSES])
            self.class_to_idx = checkpoint.get("class_to_idx", {})
            self.image_size = checkpoint.get("image_size", 224)
            self.normalization = checkpoint.get("normalization", {"mean": [0.485, 0.456, 0.406], "std": [0.229, 0.224, 0.225]})

            num_classes = len(self.class_names)

            # Reconstruct EfficientNet-B0 exactly as trained
            base_model = models.efficientnet_b0(weights=None)
            in_features = base_model.classifier[1].in_features
            base_model.classifier[1] = nn.Linear(in_features, num_classes)

            # Load model state dict
            base_model.load_state_dict(checkpoint["model_state_dict"])
            base_model.to(self.device)
            base_model.eval()
            self.model = base_model

            print(f"[ML Engine] EfficientNet-B0 model loaded successfully with {num_classes} classes.")

        # Build transform based on checkpoint normalization
        self.transform = transforms.Compose([
            transforms.Resize((self.image_size, self.image_size)),
            transforms.ToTensor(),
            transforms.Normalize(mean=self.normalization["mean"], std=self.normalization["std"])
        ])

    def predict(self, image_bytes: bytes) -> Dict[str, Any]:
        """
        Runs PyTorch EfficientNet-B0 inference on input image bytes.
        Returns top prediction, softmax confidence %, top-3 breakdown, and risk advisory.
        """
        try:
            pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            tensor_img = self.transform(pil_image).unsqueeze(0).to(self.device)

            with torch.no_grad():
                logits = self.model(tensor_img)
                probabilities = torch.softmax(logits, dim=1).cpu().numpy()[0]

            top_idx = int(np.argmax(probabilities))
            raw_conf = float(probabilities[top_idx])
            calibrated_conf = round(raw_conf * 100.0, 2)  # In percentage

            # Class metadata lookup
            predicted_class_name = self.class_names[top_idx] if top_idx < len(self.class_names) else "Unknown"

            # Match class with SUPPORTED_CLASSES or construct dynamic info
            matched_info = None
            for sc in SUPPORTED_CLASSES:
                if sc["condition"].lower() == predicted_class_name.lower() or sc["class_id"] == top_idx:
                    matched_info = sc
                    break

            if matched_info:
                crop = matched_info["crop"]
                condition = matched_info["condition"]
                scientific = matched_info["scientific"]
                status = matched_info["status"]
            else:
                # Infer crop type from class name
                lower_name = predicted_class_name.lower()
                crop = "Rice" if any(k in lower_name for k in ["rice", "smut", "brown spot", "sheath", "skipper", "stem borer"]) else \
                       "Maize" if any(k in lower_name for k in ["maize", "armyworm", "downy mildew", "turcicum"]) else "Crop"
                condition = predicted_class_name
                scientific = "AgriRakshak Model Classification"
                status = "Healthy" if lower_name == "healthy" else "Diseased"

            # Low confidence threshold check (e.g. 50%)
            is_unknown = raw_conf < 0.50
            rejection_reason = None
            if is_unknown:
                rejection_reason = "AI confidence is low (<50%). Please capture a clearer crop image or consult an agricultural expert."

            # Calculate top 3 predictions
            top_k = min(3, len(probabilities))
            top_indices = np.argsort(probabilities)[::-1][:top_k]
            top3_classes = [
                {
                    "class_name": self.class_names[i] if i < len(self.class_names) else f"Class_{i}",
                    "crop": SUPPORTED_CLASSES[i]["crop"] if i < len(SUPPORTED_CLASSES) else "Crop",
                    "condition": self.class_names[i] if i < len(self.class_names) else f"Class_{i}",
                    "probability": round(float(probabilities[i]) * 100.0, 2),
                    "confidence": round(float(probabilities[i]) * 100.0, 2)
                }
                for i in top_indices
            ]

            return {
                "class_id": top_idx,
                "class_key": predicted_class_name,
                "crop": crop,
                "condition": condition,
                "scientific_name": scientific,
                "status": status,
                "raw_confidence": round(raw_conf, 4),
                "calibrated_confidence": calibrated_conf,
                "confidence": calibrated_conf,
                "is_unknown": is_unknown,
                "rejection_reason": rejection_reason,
                "top3_predictions": top3_classes,
                "model_version": MODEL_VERSION,
                "dataset_version": DATASET_VERSION,
                "inference_device": str(self.device)
            }

        except Exception as e:
            return {
                "class_id": -1,
                "class_key": "Unknown",
                "crop": "Unknown",
                "condition": "Error during analysis",
                "scientific_name": "",
                "status": "Unknown",
                "raw_confidence": 0.0,
                "calibrated_confidence": 0.0,
                "confidence": 0.0,
                "is_unknown": True,
                "rejection_reason": f"Inference pipeline exception: {str(e)}",
                "top3_predictions": [],
                "model_version": MODEL_VERSION,
                "dataset_version": DATASET_VERSION,
                "inference_device": "cpu"
            }

# Singleton instance initialized once on app start
inference_engine = CropDiseaseInferenceEngine()
