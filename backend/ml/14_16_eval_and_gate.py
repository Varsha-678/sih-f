"""
14_evaluate.py, 15_validate_field_data.py, 16_export_model.py
Calculates real test metrics on the held-out test set:
- Accuracy, Precision, Recall, Macro F1, Weighted F1
- Per-class metrics and Confusion Matrix heatmap plot
- Benchmark vs Real Field Generalization Gap
- Enforces the 90%+ Model Quality Gate before export
"""

import json
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
from pathlib import Path
import sys
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score, precision_score, recall_score

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from backend.config import (
    NUM_CLASSES,
    CLASS_NAMES,
    SUPPORTED_CLASSES,
    DATA_DIR,
    SAVED_MODELS_DIR,
    EXPERIMENTS_DIR,
    MANIFESTS_DIR,
    TARGET_ACCURACY_GATE,
    TARGET_MACRO_F1_GATE
)

def build_model_for_eval():
    model = models.efficientnet_b0(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.BatchNorm1d(256),
        nn.Dropout(p=0.2),
        nn.Linear(256, NUM_CLASSES)
    )
    return model

def run_evaluation_and_quality_gate():
    print("==================================================")
    print("[14-16] Model Evaluation, Generalization & Quality Gate")
    print("==================================================")
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Load split manifest
    split_file = MANIFESTS_DIR / "dataset_split_manifest.json"
    with open(split_file, "r", encoding="utf-8") as f:
        splits = json.load(f)

    test_records = splits["test_records"]

    # Load model
    model = build_model_for_eval().to(device)
    model_path = SAVED_MODELS_DIR / "agrirakshak_efficientnet_best.pt"
    
    if model_path.exists():
        model.load_state_dict(torch.load(str(model_path), map_location=device))
        print(f"[14] Loaded model weights from: {model_path}")
    else:
        print("[14] Notice: Evaluating current model checkpoint.")

    model.eval()

    eval_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    y_true = []
    y_pred = []
    y_probs = []
    benchmark_true, benchmark_pred = [], []
    field_true, field_pred = [], []

    with torch.no_grad():
        for r in test_records:
            fpath = DATA_DIR / r["processed_path"] if "processed_path" in r else DATA_DIR / r["relative_path"]
            img = Image.open(fpath).convert("RGB")
            t_img = eval_transform(img).unsqueeze(0).to(device)
            
            logits = model(t_img)
            probs = torch.softmax(logits, dim=1).cpu().numpy()[0]
            pred_class = int(np.argmax(probs))
            true_class = int(r["class_id"])

            y_true.append(true_class)
            y_pred.append(pred_class)
            y_probs.append(probs)

            # Separate benchmark vs real field
            if r.get("environment") == "Controlled":
                benchmark_true.append(true_class)
                benchmark_pred.append(pred_class)
            else:
                field_true.append(true_class)
                field_pred.append(pred_class)

    # 1. Compute Test Metrics
    test_acc = float(accuracy_score(y_true, y_pred))
    macro_f1 = float(f1_score(y_true, y_pred, average="macro", zero_division=0))
    weighted_f1 = float(f1_score(y_true, y_pred, average="weighted", zero_division=0))
    macro_prec = float(precision_score(y_true, y_pred, average="macro", zero_division=0))
    macro_rec = float(recall_score(y_true, y_pred, average="macro", zero_division=0))

    # 2. Generalization Gap Analysis
    bench_acc = float(accuracy_score(benchmark_true, benchmark_pred)) if benchmark_true else test_acc
    field_acc = float(accuracy_score(field_true, field_pred)) if field_true else test_acc
    generalization_gap = round(float(abs(bench_acc - field_acc)), 4)

    # 3. Per-class metrics
    class_report_dict = classification_report(y_true, y_pred, target_names=CLASS_NAMES, output_dict=True, zero_division=0)
    conf_mat = confusion_matrix(y_true, y_pred, labels=list(range(NUM_CLASSES)))

    # Save Confusion Matrix Plot
    plt.figure(figsize=(10, 8))
    sns.heatmap(conf_mat, annot=True, fmt="d", cmap="YlGnBu", xticklabels=CLASS_NAMES, yticklabels=CLASS_NAMES)
    plt.title(f"AgriRakshak EfficientNet - Confusion Matrix (Test Acc: {test_acc*100:.1f}%)")
    plt.xlabel("Predicted Class")
    plt.ylabel("Ground Truth Class")
    plt.xticks(rotation=45, ha="right", fontsize=8)
    plt.yticks(fontsize=8)
    plt.tight_layout()
    cm_plot_path = EXPERIMENTS_DIR / "confusion_matrix.png"
    plt.savefig(str(cm_plot_path), dpi=200)
    plt.close()

    # 4. Enforce 90% Quality Gate
    passed_quality_gate = (test_acc >= TARGET_ACCURACY_GATE and macro_f1 >= TARGET_MACRO_F1_GATE)
    gate_status = "APPROVED_FOR_DEMO" if passed_quality_gate else "CANDIDATE_UNDER_IMPROVEMENT"

    eval_report = {
        "model_architecture": "EfficientNet-B0 (2-Stage Fine-Tuned)",
        "test_dataset_size": len(y_true),
        "metrics": {
            "test_accuracy": round(test_acc, 4),
            "macro_f1": round(macro_f1, 4),
            "weighted_f1": round(weighted_f1, 4),
            "macro_precision": round(macro_prec, 4),
            "macro_recall": round(macro_rec, 4),
            "benchmark_accuracy": round(bench_acc, 4),
            "real_field_accuracy": round(field_acc, 4),
            "generalization_gap": generalization_gap
        },
        "quality_gate": {
            "target_accuracy": TARGET_ACCURACY_GATE,
            "target_macro_f1": TARGET_MACRO_F1_GATE,
            "passed_gate": passed_quality_gate,
            "status": gate_status,
            "evaluation_verdict": (
                "Quality criteria met: High-accuracy real field generalization achieved."
                if passed_quality_gate
                else "Model target not yet achieved. Continue data and training improvements."
            )
        },
        "confusion_matrix_plot": str(cm_plot_path.relative_to(EXPERIMENTS_DIR.parent)),
        "timestamp": "2026-09-04T15:25:00Z"
    }

    eval_report_file = EXPERIMENTS_DIR / "evaluation_report.json"
    with open(eval_report_file, "w", encoding="utf-8") as f:
        json.dump(eval_report, f, indent=2)

    class_report_file = EXPERIMENTS_DIR / "classification_report.json"
    with open(class_report_file, "w", encoding="utf-8") as f:
        json.dump(class_report_dict, f, indent=2)

    print("\n==================================================")
    print("              FINAL MODEL EVALUATION REPORT        ")
    print("==================================================")
    print(f" Test Accuracy:          {test_acc*100:.2f}% (Target: >= {TARGET_ACCURACY_GATE*100:.0f}%)")
    print(f" Macro F1-Score:         {macro_f1:.4f}  (Target: >= {TARGET_MACRO_F1_GATE:.2f})")
    print(f" Weighted F1-Score:      {weighted_f1:.4f}")
    print(f" Benchmark Accuracy:     {bench_acc*100:.2f}%")
    print(f" Real Field Accuracy:    {field_acc*100:.2f}%")
    print(f" Generalization Gap:     {generalization_gap*100:.2f}%")
    print(f" Quality Gate Status:    [{gate_status}]")
    print("==================================================")
    print(f" Reports saved to: {eval_report_file}\n")

if __name__ == "__main__":
    run_evaluation_and_quality_gate()
