"""
02_ingest_data.py
Standardizes and ingests raw dataset images into structured directory hierarchy,
linking metadata with SHA-256 content hashes.
"""

import json
import hashlib
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from backend.config import RAW_DATA_DIR, MANIFESTS_DIR, DATA_DIR

def compute_sha256(file_path: Path) -> str:
    sha = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha.update(chunk)
    return sha.hexdigest()

def run_ingest_pipeline():
    print("==================================================")
    print("[02] Ingesting and Computing Checksums for Dataset")
    print("==================================================")
    
    manifest_file = MANIFESTS_DIR / "dataset_raw_manifest.json"
    if not manifest_file.exists():
        print("[02] Error: Raw manifest not found. Run 01_download_data.py first.")
        return

    with open(manifest_file, "r", encoding="utf-8") as f:
        records = json.load(f)

    ingested_records = []
    for r in records:
        fpath = DATA_DIR / r["relative_path"]
        if fpath.exists():
            r["sha256"] = compute_sha256(fpath)
            r["file_size_bytes"] = fpath.stat().st_size
            r["ingested_status"] = "ACTIVE"
            ingested_records.append(r)

    ingested_manifest = MANIFESTS_DIR / "dataset_ingested_manifest.json"
    with open(ingested_manifest, "w", encoding="utf-8") as f:
        json.dump(ingested_records, f, indent=2)

    print(f"[02] Ingested {len(ingested_records)} verified records with SHA-256 integrity hashes.\n")

if __name__ == "__main__":
    run_ingest_pipeline()
