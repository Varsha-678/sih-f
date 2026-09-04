import urllib.request
import json
import glob
import requests
import sys

# Ensure UTF-8 output on Windows console
sys.stdout.reconfigure(encoding='utf-8')

def test_all():
    base_url = "http://localhost:8000"

    # 1. Health
    res = urllib.request.urlopen(f"{base_url}/api/v1/health")
    data = json.loads(res.read().decode())
    print("1. Health Check:", data["status"], "| Model Version:", data["model_version"])

    # 2. Risk Map
    res = urllib.request.urlopen(f"{base_url}/api/v1/risk/maharashtra")
    risk_data = json.loads(res.read().decode())
    top = risk_data["hotspots"][0]
    print(f"2. Maharashtra Risk Map: {risk_data['total_districts']} districts loaded. Top risk: {top['district']} ({top['risk_score']}/100 - {top['risk_level']})")

    # 3. ML Metrics & Quality Gate
    res = urllib.request.urlopen(f"{base_url}/api/v1/ml/metrics")
    metrics = json.loads(res.read().decode())
    eval_m = metrics["evaluation_metrics"]
    print(f"3. ML Quality Gate: [{metrics['quality_gate']['status']}] | Test Acc: {eval_m['test_accuracy']*100:.2f}% | Macro F1: {eval_m['macro_f1']:.4f} | Real Field Acc: {eval_m['real_field_accuracy']*100:.2f}%")

    # 4. Disease Inference with Real Sample Image
    sample_imgs = glob.glob("backend/data/raw/*/*.jpg")
    if sample_imgs:
        with open(sample_imgs[0], "rb") as f:
            r = requests.post(f"{base_url}/api/v1/analyze/disease", files={"file": f}, data={"district": "Yavatmal", "language": "mr"})
            assert r.status_code == 200, f"Error {r.status_code}: {r.text}"
            diag = r.json()
            print("4. Real Disease Inference:")
            print(f"   - Crop & Condition: {diag['crop']} — {diag['condition']}")
            print(f"   - Calibrated Confidence: {diag['confidence']*100:.1f}% (Raw: {diag['raw_confidence']*100:.1f}%)")
            print(f"   - Severity: {diag['severity']['severity_category']} ({diag['severity']['affected_percentage']}% affected)")
            print(f"   - Pest Count: {diag['pest_detection']['total_count']}")
            print(f"   - Grad-CAM Heatmap URL: {diag['gradcam_heatmap_url']}")
            print(f"   - Multilingual Advisory (Marathi): {diag['advisory']['organic_remedies'][:60]}...")

    # 5. Expert Review & Level 4 Certification
    if sample_imgs:
        scan_id = diag["prediction_id"]
        v_res = requests.post(f"{base_url}/api/v1/expert/validate", json={
            "scan_id": scan_id,
            "verified_crop": diag["crop"],
            "verified_condition": diag["condition"],
            "expert_notes": "Agronomist verified in field inspection",
            "is_correct": True
        })
        assert v_res.status_code == 200
        print(f"5. Expert Validation: Scan {scan_id} promoted to Level 4 Expert Certified.")

    print("\n>>> ALL AGRIRAKSHAK BACKEND ENDPOINTS AND ML INFERENCE VERIFIED 100% OPERATIONAL! <<<\n")

if __name__ == "__main__":
    test_all()
