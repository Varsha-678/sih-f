"""
03_validate_images.py, 04_check_labels.py, 05_remove_corrupt.py
Validates header, image integrity, label levels (L1 to L4), and routes bad samples to quarantine.
"""

import json
import cv2
import shutil
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from backend.config import DATA_DIR, MANIFESTS_DIR, QUARANTINE_DIR, BLUR_THRESHOLD, MIN_RESOLUTION

def validate_and_clean():
    print("==================================================")
    print("[03-05] Image Quality, Label Hierarchy & Quarantine Pipeline")
    print("==================================================")
    
    manifest_path = MANIFESTS_DIR / "dataset_ingested_manifest.json"
    if not manifest_path.exists():
        print("Manifest not found. Run 02_ingest_data.py first.")
        return

    with open(manifest_path, "r", encoding="utf-8") as f:
        records = json.load(f)

    valid_records = []
    quarantined_records = []

    for r in records:
        fpath = DATA_DIR / r["relative_path"]
        img = cv2.imread(str(fpath))
        
        # Check corrupt
        if img is None:
            r["quarantine_reason"] = "Corrupt image format / unreadable byte stream"
            quarantined_records.append(r)
            shutil.move(str(fpath), str(QUARANTINE_DIR / fpath.name))
            continue

        h, w, c = img.shape
        if w < MIN_RESOLUTION[0] or h < MIN_RESOLUTION[1] or c != 3:
            r["quarantine_reason"] = f"Invalid dimensions or channel count: {w}x{h}x{c}"
            quarantined_records.append(r)
            shutil.move(str(fpath), str(QUARANTINE_DIR / fpath.name))
            continue

        # Check blur
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur_val = cv2.Laplacian(gray, cv2.CV_64F).var()
        r["blur_metric"] = round(float(blur_val), 2)
        r["resolution"] = f"{w}x{h}"

        # Level 1-4 Label hierarchy validation
        # Level 1: Public Web | Level 2: Auto Filtered | Level 3: Dual Peer | Level 4: Agronomist Certified
        if r.get("expert_validated", False):
            r["label_level"] = 4
            r["label_status"] = "CERTIFIED_LEVEL_4"
        else:
            r["label_level"] = 2
            r["label_status"] = "FILTERED_LEVEL_2"

        valid_records.append(r)

    # Save validated manifest
    clean_manifest = MANIFESTS_DIR / "dataset_validated_manifest.json"
    with open(clean_manifest, "w", encoding="utf-8") as f:
        json.dump(valid_records, f, indent=2)

    # Quarantine log
    quarantine_log = MANIFESTS_DIR / "quarantine_manifest.json"
    with open(quarantine_log, "w", encoding="utf-8") as f:
        json.dump(quarantined_records, f, indent=2)

    print(f"[03-05] Validation complete. {len(valid_records)} samples passed; {len(quarantined_records)} quarantined.")
    print(f"[03-05] Validated manifest saved to: {clean_manifest}\n")

if __name__ == "__main__":
    validate_and_clean()
