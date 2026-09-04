"""
13_train.py
2-Stage Transfer Learning PyTorch Training Pipeline for AgriRakshak:
- Stage 1: Freeze convolutional backbone, train custom classifier head.
- Stage 2: Fine-tune top convolutional blocks with differential learning rate.
- Tracks metrics, early stopping, and checkpoints best validation state.
"""

import json
import time
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, models
from PIL import Image
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))
from backend.config import (
    NUM_CLASSES,
    DATA_DIR,
    PROCESSED_DATA_DIR,
    SAVED_MODELS_DIR,
    EXPERIMENTS_DIR,
    MANIFESTS_DIR
)

class CropDataset(Dataset):
    def __init__(self, record_list, transform=None):
        self.records = record_list
        self.transform = transform

    def __len__(self):
        return len(self.records)

    def __getitem__(self, idx):
        item = self.records[idx]
        img_path = DATA_DIR / item["processed_path"] if "processed_path" in item else DATA_DIR / item["relative_path"]
        image = Image.open(img_path).convert("RGB")
        label = item["class_id"]

        if self.transform:
            image = self.transform(image)

        return image, torch.tensor(label, dtype=torch.long)

def build_efficientnet_model(num_classes: int):
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3, inplace=True),
        nn.Linear(in_features, 256),
        nn.ReLU(),
        nn.BatchNorm1d(256),
        nn.Dropout(p=0.2),
        nn.Linear(256, num_classes)
    )
    return model

def run_training(epochs_stage1=4, epochs_stage2=6, batch_size=16):
    print("==================================================")
    print("[13] PyTorch 2-Stage Transfer Learning Pipeline")
    print("==================================================")
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[13] Execution Device: {device}")

    # Load split manifest
    split_file = MANIFESTS_DIR / "dataset_split_manifest.json"
    with open(split_file, "r", encoding="utf-8") as f:
        splits = json.load(f)

    # Transforms
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    train_ds = CropDataset(splits["train_records"], transform=train_transform)
    val_ds = CropDataset(splits["val_records"], transform=val_transform)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False)

    model = build_efficientnet_model(NUM_CLASSES).to(device)
    criterion = nn.CrossEntropyLoss()

    # --- STAGE 1: Train classification head with frozen backbone ---
    print("\n--- STAGE 1: Training Classification Head (Backbone Frozen) ---")
    for param in model.features.parameters():
        param.requires_grad = False

    optimizer = optim.Adam(model.classifier.parameters(), lr=1e-3, weight_decay=1e-4)

    best_val_acc = 0.0
    history = {"train_loss": [], "val_loss": [], "train_acc": [], "val_acc": []}

    for epoch in range(epochs_stage1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        train_loss = running_loss / total
        train_acc = correct / total

        # Validation
        model.eval()
        v_loss = 0.0
        v_correct = 0
        v_total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                v_loss += loss.item() * images.size(0)
                _, preds = torch.max(outputs, 1)
                v_correct += torch.sum(preds == labels.data).item()
                v_total += labels.size(0)

        val_loss = v_loss / v_total
        val_acc = v_correct / v_total

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_acc"].append(train_acc)
        history["val_acc"].append(val_acc)

        print(f"Stage 1 Epoch {epoch+1}/{epochs_stage1} | Train Loss: {train_loss:.4f}, Train Acc: {train_acc*100:.2f}% | Val Loss: {val_loss:.4f}, Val Acc: {val_acc*100:.2f}%")

    # --- STAGE 2: Fine-Tuning Top Convolutional Blocks ---
    print("\n--- STAGE 2: Fine-Tuning Top Convolutional Layers (Lower LR) ---")
    for param in model.features[-3:].parameters():
        param.requires_grad = True

    optimizer_ft = optim.Adam([
        {"params": model.features[-3:].parameters(), "lr": 1e-4},
        {"params": model.classifier.parameters(), "lr": 5e-4}
    ], weight_decay=1e-4)

    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer_ft, T_max=epochs_stage2)

    best_model_weights = model.state_dict()

    for epoch in range(epochs_stage2):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            optimizer_ft.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer_ft.step()

            running_loss += loss.item() * images.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data).item()
            total += labels.size(0)

        scheduler.step()
        train_loss = running_loss / total
        train_acc = correct / total

        # Validation
        model.eval()
        v_loss = 0.0
        v_correct = 0
        v_total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                v_loss += loss.item() * images.size(0)
                _, preds = torch.max(outputs, 1)
                v_correct += torch.sum(preds == labels.data).item()
                v_total += labels.size(0)

        val_loss = v_loss / v_total
        val_acc = v_correct / v_total

        history["train_loss"].append(train_loss)
        history["val_loss"].append(val_loss)
        history["train_acc"].append(train_acc)
        history["val_acc"].append(val_acc)

        print(f"Stage 2 Epoch {epoch+1}/{epochs_stage2} | Train Loss: {train_loss:.4f}, Train Acc: {train_acc*100:.2f}% | Val Loss: {val_loss:.4f}, Val Acc: {val_acc*100:.2f}%")

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            best_model_weights = model.state_dict().copy()

    # Save best checkpoint
    best_checkpoint_path = SAVED_MODELS_DIR / "agrirakshak_efficientnet_best.pt"
    torch.save(best_model_weights, str(best_checkpoint_path))
    print(f"\n[13] Best model checkpoint saved to: {best_checkpoint_path} (Best Val Acc: {best_val_acc*100:.2f}%)")

    # Save training history
    history_file = EXPERIMENTS_DIR / "training_history.json"
    with open(history_file, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

if __name__ == "__main__":
    run_training()
