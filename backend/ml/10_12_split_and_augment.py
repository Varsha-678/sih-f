"""
10_preprocess.py, 11_split_data.py, 12_augment_train.py
Performs group-aware stratified 70/15/15 splitting (preventing data leakage)
and applies realistic agricultural augmentations strictly to the training split.
"""

import json
import cv2
import numpy as np
import shutil
from pathlib import Path
import sys
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from backend.config import DATA_DIR, MANIFESTS_DIR, PROCESSED_DATA_DIR

def run_split_and_augment():
    print("==================================================")
    print("[10-12] Preprocessing, Group-Aware Split & Training Augmentation")
    print("==================================================")
    
    deduped_manifest = MANIFESTS_DIR / "dataset_deduped_manifest.json"
    with open(deduped_manifest, "r", encoding="utf-8") as f:
        records = json.load(f)

    # Group by class and group_id to ensure samples from same farm plot stay together
    class_groups = defaultdict(lambda: defaultdict(list))
    for r in records:
        class_groups[r["class_id"]][r.get("group_id", "default")].append(r)

    train_records = []
    val_records = []
    test_records = []

    # 70% Train, 15% Val, 15% Test
    for class_id, groups in class_groups.items():
        group_keys = list(groups.keys())
        np.random.seed(42 + class_id)
        np.random.shuffle(group_keys)

        num_groups = len(group_keys)
        n_train = max(1, int(round(num_groups * 0.70)))
        n_val = max(1, int(round(num_groups * 0.15)))

        train_keys = group_keys[:n_train]
        val_keys = group_keys[n_train:n_train + n_val]
        test_keys = group_keys[n_train + n_val:]

        if not test_keys:
            test_keys = [val_keys[-1]]

        for k in train_keys:
            for item in groups[k]:
                item["split"] = "train"
                train_records.append(item)
        for k in val_keys:
            for item in groups[k]:
                item["split"] = "val"
                val_records.append(item)
        for k in test_keys:
            for item in groups[k]:
                item["split"] = "test"
                test_records.append(item)

    # Process and write images to processed directories
    base_proc = PROCESSED_DATA_DIR / "classification"
    for s in ["train", "val", "test"]:
        (base_proc / s).mkdir(parents=True, exist_ok=True)

    augmented_train_records = list(train_records)

    # Preprocess test and val (Strictly NO augmentation)
    for r in val_records + test_records:
        src = DATA_DIR / r["relative_path"]
        img = cv2.imread(str(src))
        resized = cv2.resize(img, (224, 224), interpolation=cv2.INTER_AREA)
        
        target_dir = base_proc / r["split"] / f"class_{r['class_id']:02d}"
        target_dir.mkdir(parents=True, exist_ok=True)
        dest = target_dir / r["filename"]
        cv2.imwrite(str(dest), resized)
        r["processed_path"] = str(dest.relative_to(DATA_DIR))

    # Preprocess & Augment Train Split ONLY
    for r in train_records:
        src = DATA_DIR / r["relative_path"]
        img = cv2.imread(str(src))
        resized = cv2.resize(img, (224, 224), interpolation=cv2.INTER_AREA)

        target_dir = base_proc / "train" / f"class_{r['class_id']:02d}"
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # Save base sample
        dest = target_dir / r["filename"]
        cv2.imwrite(str(dest), resized)
        r["processed_path"] = str(dest.relative_to(DATA_DIR))

        # Apply 2 targeted realistic augmentations (rotation + subtle lighting variation)
        # Augmentation 1: Flip & Subtle Brightness
        aug1 = cv2.flip(resized, 1)
        aug1 = np.clip(aug1 * np.random.uniform(0.90, 1.10), 0, 255).astype(np.uint8)
        aug1_name = f"aug1_{r['filename']}"
        cv2.imwrite(str(target_dir / aug1_name), aug1)

        # Augmentation 2: Small rotation (-12 to +12 degrees)
        angle = np.random.uniform(-12, 12)
        M = cv2.getRotationMatrix2D((112, 112), angle, 1.0)
        aug2 = cv2.warpAffine(resized, M, (224, 224), borderMode=cv2.BORDER_REFLECT)
        aug2_name = f"aug2_{r['filename']}"
        cv2.imwrite(str(target_dir / aug2_name), aug2)

        augmented_train_records.append({**r, "filename": aug1_name, "is_augmented": True})
        augmented_train_records.append({**r, "filename": aug2_name, "is_augmented": True})

    # Save split manifests
    split_manifest = {
        "train_count": len(augmented_train_records),
        "val_count": len(val_records),
        "test_count": len(test_records),
        "train_records": augmented_train_records,
        "val_records": val_records,
        "test_records": test_records
    }

    split_file = MANIFESTS_DIR / "dataset_split_manifest.json"
    with open(split_file, "w", encoding="utf-8") as f:
        json.dump(split_manifest, f, indent=2)

    print(f"[10-12] Splitting and Preprocessing Complete:")
    print(f"        Train set (with targeted aug): {len(augmented_train_records)} images")
    print(f"        Validation set (clean):       {len(val_records)} images")
    print(f"        Held-out Test set (clean):    {len(test_records)} images")
    print(f"[10-12] Split manifest saved to: {split_file}\n")

if __name__ == "__main__":
    run_split_and_augment()
