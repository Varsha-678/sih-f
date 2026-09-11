import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
ANNOTATIONS_DIR = DATA_DIR / "annotations"
MANIFESTS_DIR = DATA_DIR / "manifests"
VERSIONS_DIR = DATA_DIR / "versions"
QUARANTINE_DIR = DATA_DIR / "quarantine"
REJECTED_DIR = DATA_DIR / "rejected"
EXPERIMENTS_DIR = BASE_DIR / "experiments"
SAVED_MODELS_DIR = BASE_DIR / "saved_models"
STATIC_DIR = BASE_DIR / "static"
HEATMAPS_DIR = STATIC_DIR / "heatmaps"
SCANS_DIR = STATIC_DIR / "scans"

# Ensure directories exist
for d in [
    RAW_DATA_DIR,
    PROCESSED_DATA_DIR / "classification",
    PROCESSED_DATA_DIR / "detection",
    PROCESSED_DATA_DIR / "segmentation",
    ANNOTATIONS_DIR,
    MANIFESTS_DIR,
    VERSIONS_DIR,
    QUARANTINE_DIR,
    REJECTED_DIR,
    EXPERIMENTS_DIR,
    SAVED_MODELS_DIR,
    HEATMAPS_DIR,
    SCANS_DIR,
]:
    d.mkdir(parents=True, exist_ok=True)

# Application Metadata
APP_NAME = "AgriRakshak - Crop Health Intelligence"
APP_VERSION = "1.0.0"
MODEL_VERSION = "v1.2-efficientnet"
DATASET_VERSION = "dataset_v1.0"

# Quality Thresholds
BLUR_THRESHOLD = 75.0  # Laplacian variance threshold
MIN_BRIGHTNESS = 40.0   # Min mean luminance
MAX_BRIGHTNESS = 230.0  # Max mean luminance
MIN_RESOLUTION = (224, 224)

# ML Thresholds
UNKNOWN_CONFIDENCE_THRESHOLD = 0.65  # If max probability < 0.65, mark as Unknown / Out-of-Distribution
TARGET_ACCURACY_GATE = 0.90
TARGET_MACRO_F1_GATE = 0.90

# Key Supported Crops & Conditions (Matching agrirakshak_rice_maize.pt Checkpoint)
SUPPORTED_CLASSES = [
    {"class_id": 0, "crop": "Rice/Maize", "condition": "Aphid Infestation", "scientific": "Aphidoidea", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 1, "crop": "Rice", "condition": "Bacterial Leaf Blight", "scientific": "Xanthomonas oryzae", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 2, "crop": "Rice", "condition": "Brown Spot", "scientific": "Bipolaris oryzae", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 3, "crop": "Rice/Maize", "condition": "Curvularia Leaf Spot", "scientific": "Curvularia lunata", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 4, "crop": "Maize", "condition": "Fall Armyworm", "scientific": "Spodoptera frugiperda", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 5, "crop": "Maize", "condition": "Fall Armyworm Symptoms", "scientific": "Spodoptera frugiperda", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 6, "crop": "Rice", "condition": "False Smut", "scientific": "Ustilaginoidea virens", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 7, "crop": "Rice/Maize", "condition": "Healthy Leaf", "scientific": "Oryza sativa / Zea mays", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 8, "crop": "Rice", "condition": "Leaf Folder", "scientific": "Cnaphalocrocis medinalis", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 9, "crop": "Rice", "condition": "Leaf Sheath Blight", "scientific": "Rhizoctonia solani", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 10, "crop": "Maize", "condition": "Maydis Leaf Blight", "scientific": "Bipolaris maydis", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 11, "crop": "Rice", "condition": "Rice Skipper", "scientific": "Pelopidas mathias", "status": "Diseased", "severity_risk": "Low"},
    {"class_id": 12, "crop": "Maize", "condition": "Sorghum Downy Mildew", "scientific": "Peronosclerospora sorghi", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 13, "crop": "Maize", "condition": "Turcicum Leaf Blight", "scientific": "Exserohilum turcicum", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 14, "crop": "Rice", "condition": "White Stem Borer", "scientific": "Scirpophaga innotata", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 15, "crop": "Rice", "condition": "Yellow Stem Borer", "scientific": "Scirpophaga incertulas", "status": "Diseased", "severity_risk": "High"},
]

CLASS_NAMES = [item["condition"] for item in SUPPORTED_CLASSES]
NUM_CLASSES = len(SUPPORTED_CLASSES)

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'agrirakshak.db'}")

