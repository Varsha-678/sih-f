"""
run_all_pipeline.py
Executes the complete 16-stage AgriRakshak Data & ML Engineering Pipeline.
"""

import sys
import time
import importlib
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

def run_complete_ml_lifecycle():
    start_time = time.time()
    print("\n=======================================================")
    print("   STARTING AGRIRAKSHAK 16-STEP MLOPS & DATA PIPELINE  ")
    print("=======================================================\n")

    # Step 01: Download and seed curated dataset
    step01 = importlib.import_module("backend.ml.01_download_data")
    step01.run_download_pipeline()

    # Step 02: Ingest and calculate integrity checksums
    step02 = importlib.import_module("backend.ml.02_ingest_data")
    step02.run_ingest_pipeline()

    # Steps 03-05: Image Quality, Label Levels & Quarantine
    step03_05 = importlib.import_module("backend.ml.03_05_validate_and_clean")
    step03_05.validate_and_clean()

    # Steps 06-09: Perceptual Deduplication, Class Balancing & Report
    step06_09 = importlib.import_module("backend.ml.06_09_dedup_and_balance")
    step06_09.run_dedup_and_balance()

    # Steps 10-12: Preprocessing, Group Split & Train-Only Augmentation
    step10_12 = importlib.import_module("backend.ml.10_12_split_and_augment")
    step10_12.run_split_and_augment()

    # Step 13: 2-Stage PyTorch Transfer Learning Training
    step13 = importlib.import_module("backend.ml.13_train")
    step13.run_training(epochs_stage1=3, epochs_stage2=4, batch_size=16)

    # Steps 14-16: Test Set Evaluation, Generalization & 90% Quality Gate
    step14_16 = importlib.import_module("backend.ml.14_16_eval_and_gate")
    step14_16.run_evaluation_and_quality_gate()

    elapsed = time.time() - start_time
    print(f"[MLOps Engine] Entire 16-Step Pipeline completed in {elapsed:.2f} seconds.")
    print("=======================================================\n")

if __name__ == "__main__":
    run_complete_ml_lifecycle()
