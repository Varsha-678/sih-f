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

# Key Maharashtra Supported Crops & Conditions
SUPPORTED_CLASSES = [
    {"class_id": 0, "crop": "Cotton", "condition": "Bacterial Blight (Karpa)", "scientific": "Xanthomonas citri pv. malvacearum", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 1, "crop": "Cotton", "condition": "Healthy Leaf", "scientific": "Gossypium hirsutum", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 2, "crop": "Soybean", "condition": "Soybean Rust (Tamba)", "scientific": "Phakopsora pachyrhizi", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 3, "crop": "Soybean", "condition": "Healthy Leaf", "scientific": "Glycine max", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 4, "crop": "Sugarcane", "condition": "Red Rot (Kuhila)", "scientific": "Colletotrichum falcatum", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 5, "crop": "Sugarcane", "condition": "Healthy Cane Leaf", "scientific": "Saccharum officinarum", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 6, "crop": "Onion", "condition": "Purple Blotch (Jaambhla Karpa)", "scientific": "Alternaria porri", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 7, "crop": "Onion", "condition": "Healthy Leaf", "scientific": "Allium cepa", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 8, "crop": "Tomato", "condition": "Early Blight (Lavkar Karpa)", "scientific": "Alternaria solani", "status": "Diseased", "severity_risk": "Moderate"},
    {"class_id": 9, "crop": "Tomato", "condition": "Late Blight (Ushira Karpa)", "scientific": "Phytophthora infestans", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 10, "crop": "Tomato", "condition": "Healthy Leaf", "scientific": "Solanum lycopersicum", "status": "Healthy", "severity_risk": "None"},
    {"class_id": 11, "crop": "Pomegranate", "condition": "Bacterial Blight (Telya)", "scientific": "Xanthomonas axonopodis pv. punicae", "status": "Diseased", "severity_risk": "High"},
    {"class_id": 12, "crop": "Pomegranate", "condition": "Healthy Leaf", "scientific": "Punica granatum", "status": "Healthy", "severity_risk": "None"},
]

CLASS_NAMES = [f"{item['crop']}___{item['condition'].replace(' ', '_')}" for item in SUPPORTED_CLASSES]
NUM_CLASSES = len(SUPPORTED_CLASSES)

# Database URL
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'agrirakshak.db'}")
