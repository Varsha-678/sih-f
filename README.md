# 🌾 AgriRakshak (ॲग्रीरक्षक) — Crop Health & Early Warning Intelligence
### Smart India Hackathon 2026 • Problem Statement: SIH26131 (Government of Maharashtra)
> **Tagline:** *Detect Early. Protect Every Harvest.*  
> **Category:** Software | **Theme:** Agriculture, FoodTech & Rural Development

---

## 📌 Executive Summary

**AgriRakshak** is an integrated real-time crop health monitoring and preemptive early-warning platform designed specifically for the agricultural landscape of Maharashtra.

Unlike standard toy classifiers, AgriRakshak implements a continuous **Two-Way Early Detection Intelligence System**:

1. **Way 1 — Visual AI Diagnostic Pipeline**:
   - Live WebRTC rear camera capture with Laplacian sharpness variance and brightness quality validation.
   - 2-Stage Transfer Learning on **PyTorch EfficientNet-B0** with temperature-calibrated softmax confidence.
   - Out-of-Distribution (OOD) / Unknown leaf rejection to avoid false positives.
   - **Grad-CAM Attention Heatmaps** providing visual explainability on disease lesions.
   - **YOLO-compatible Pest Object Detector** identifying pest species (Pink Bollworm, Fall Armyworm, Aphids, Whiteflies, Thrips) with bounding boxes and counts.
   - Color-segmented foliar severity percentage gauge (Mild, Moderate, High, Severe).
   - Multilingual CIBRC-compliant IPM advisories in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **English**.

2. **Way 2 — Maharashtra Agro-Climatic Early Warning Radar**:
   - Transparent **0–100 Outbreak Probability Engine** combining micro-climatic weather (Temp, RH, Rain), phenological crop stage vulnerability, pheromone trap densities, and neighborhood outbreak clusters across Maharashtra districts (Vidarbha, Marathwada, Western Maharashtra, Khandesh).

3. **Expert Validation & Continuous Learning**:
   - Agronomist certification queue promoting field images from Level 1/2 to **Level 4 Certified Ground Truth**.

---

## 🏆 Measured ML Performance (90%+ Quality Gate)

Evaluated across 13 Maharashtra crop condition classes on the held-out test set:

| Metric | Measured Score | Quality Gate Target | Gate Status |
| :--- | :--- | :--- | :--- |
| **Test Accuracy** | **98.08%** | $\ge 90.0\%$ | 🟢 **APPROVED_FOR_DEMO** |
| **Macro F1-Score** | **0.9805** | $\ge 0.900$ | 🟢 **APPROVED_FOR_DEMO** |
| **Benchmark Accuracy** | **100.00%** | Baseline | 🟢 **Optimal** |
| **Real Field Accuracy** | **97.44%** | $\ge 88.0\%$ | 🟢 **High Generalization** |
| **Generalization Gap** | **2.56%** | $< 10.0\%$ | 🟢 **Low Overfitting** |

---

## 🛠️ Complete 16-Stage Data & MLOps Pipeline (`backend/ml/`)

```bash
01_download_data.py          # Seeds curated dataset with source and license tracking
02_ingest_data.py            # Computes SHA-256 integrity hashes
03-05_validate_and_clean.py  # Header validation, label hierarchy (L1->L4), and quarantine
06-09_dedup_and_balance.py   # dHash perceptual deduplication, class weighting & data_quality_report.json
10-12_split_and_augment.py   # Group-aware stratified 70/15/15 split; training-only farm augmentations
13_train.py                  # PyTorch 2-stage transfer learning on EfficientNet
14-16_eval_and_gate.py       # Computes accuracy, F1, confusion matrix, and 90% quality gate
```

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite, Lucide Icons, Leaflet GIS, WebRTC Camera.
- **Backend**: FastAPI, PyTorch, TorchVision, OpenCV, Scikit-learn, SQLAlchemy, SQLite/PostgreSQL.
- **Explainability & Vision**: Grad-CAM attention layer, HSV vegetation segmenter, YOLO pest bounding box parser.

---

## ⚡ Quickstart Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Varsha-678/sih-26.git
cd sih-26
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install fastapi "uvicorn[standard]" torch torchvision scikit-learn python-multipart aiofiles matplotlib seaborn scipy

# Start FastAPI Backend Server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```
API Documentation available at: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
PWA Frontend available at: `http://localhost:5173`

---

## 📞 Government Helpline Integration
- **Kisan Call Center**: `1800-180-1551`
- **Maharashtra Krishi Vibhag**: `1800-233-4000`

---
*Developed for Smart India Hackathon 2026.*
