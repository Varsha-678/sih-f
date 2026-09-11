from flask import Flask, render_template, request
from pathlib import Path
from PIL import Image
import torch
import torch.nn as nn
from torchvision import transforms, models
import os
import uuid


# ============================================================
# AGRIRAKSHAK - PYTORCH CROP DISEASE DETECTION
# ============================================================

app = Flask(__name__)


# ============================================================
# PATHS
# ============================================================

ROOT = Path(__file__).resolve().parent

MODEL_PATH = ROOT / "agrirakshak_rice_maize.pt"
if not MODEL_PATH.exists():
    MODEL_PATH = ROOT / "output" / "agrirakshak_rice_maize.pt"


UPLOAD_FOLDER = ROOT / "uploads"

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

app.config["UPLOAD_FOLDER"] = str(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".bmp"
}


# ============================================================
# DEVICE
# ============================================================

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print("========================================")
print("        AGRIRAKSHAK AI SYSTEM")
print("========================================")
print("Device:", DEVICE)


# ============================================================
# CHECK MODEL
# ============================================================

if not MODEL_PATH.exists():

    raise FileNotFoundError(
        f"\nModel not found!\n\n"
        f"Expected location:\n{MODEL_PATH}\n\n"
        f"Please make sure:\n"
        f"output/agrirakshak_rice_maize.pt\n"
        f"exists."
    )


# ============================================================
# LOAD CHECKPOINT
# ============================================================

print("\nLoading AgriRakshak model...")

checkpoint = torch.load(
    MODEL_PATH,
    map_location=DEVICE,
    weights_only=False
)


# ============================================================
# READ MODEL INFORMATION
# ============================================================

class_names = checkpoint["class_names"]

class_to_idx = checkpoint["class_to_idx"]

image_size = checkpoint.get("image_size", 224)

normalization = checkpoint.get(
    "normalization",
    {
        "mean": [0.485, 0.456, 0.406],
        "std": [0.229, 0.224, 0.225]
    }
)

num_classes = len(class_names)


print("Model architecture:",
      checkpoint.get("architecture", "unknown"))

print("Number of classes:", num_classes)

print("Classes:")

for i, name in enumerate(class_names):
    print(f"  {i}: {name}")


# ============================================================
# CREATE EFFICIENTNET-B0
# ============================================================

model = models.efficientnet_b0(
    weights=None
)


# Replace classifier exactly like training
model.classifier[1] = nn.Linear(
    model.classifier[1].in_features,
    num_classes
)


# Load trained weights
model.load_state_dict(
    checkpoint["model_state_dict"]
)


model = model.to(DEVICE)

model.eval()


print("\nModel loaded successfully!")
print("========================================")


# ============================================================
# IMAGE TRANSFORMATION
# ============================================================

transform = transforms.Compose([

    transforms.Resize(
        (image_size, image_size)
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        normalization["mean"],
        normalization["std"]
    )

])


# ============================================================
# ALLOWED FILE
# ============================================================

def allowed_file(filename):

    extension = Path(filename).suffix.lower()

    return extension in ALLOWED_EXTENSIONS


# ============================================================
# HOME PAGE
# ============================================================

@app.route("/")
def index():

    return render_template(
        "index.html",
        classes=class_names
    )


# ============================================================
# PREDICTION
# ============================================================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    # --------------------------------------------------------
    # CHECK IMAGE
    # --------------------------------------------------------

    if "image" not in request.files:

        return render_template(
            "index.html",
            error="Please select an image."
        )


    file = request.files["image"]


    if file.filename == "":

        return render_template(
            "index.html",
            error="Please select an image."
        )


    if not allowed_file(file.filename):

        return render_template(
            "index.html",
            error="Please upload JPG, JPEG, PNG, WEBP or BMP."
        )


    # --------------------------------------------------------
    # SAVE IMAGE
    # --------------------------------------------------------

    extension = Path(
        file.filename
    ).suffix.lower()

    unique_filename = (
        uuid.uuid4().hex + extension
    )

    image_path = (
        UPLOAD_FOLDER /
        unique_filename
    )

    file.save(image_path)


    print(
        f"\nImage received: {file.filename}"
    )


    # --------------------------------------------------------
    # OPEN IMAGE
    # --------------------------------------------------------

    try:

        image = Image.open(
            image_path
        ).convert("RGB")

    except Exception as e:

        return render_template(
            "index.html",
            error=f"Could not read image: {e}"
        )


    # --------------------------------------------------------
    # TRANSFORM
    # --------------------------------------------------------

    image_tensor = transform(
        image
    ).unsqueeze(0)


    image_tensor = image_tensor.to(
        DEVICE
    )


    # --------------------------------------------------------
    # MODEL PREDICTION
    # --------------------------------------------------------

    with torch.no_grad():

        outputs = model(
            image_tensor
        )

        probabilities = torch.softmax(
            outputs,
            dim=1
        )


    # --------------------------------------------------------
    # TOP PREDICTIONS
    # --------------------------------------------------------

    top_k = min(
        3,
        num_classes
    )


    top_probabilities, top_indices = torch.topk(
        probabilities,
        top_k
    )


    predictions = []


    for probability, index in zip(
        top_probabilities[0],
        top_indices[0]
    ):

        class_index = int(
            index.item()
        )

        confidence = float(
            probability.item() * 100
        )

        predictions.append({

            "class": class_names[class_index],

            "confidence": round(
                confidence,
                2
            )

        })


    # --------------------------------------------------------
    # BEST PREDICTION
    # --------------------------------------------------------

    best_prediction = predictions[0]

    predicted_class = (
        best_prediction["class"]
    )

    confidence = (
        best_prediction["confidence"]
    )


    # --------------------------------------------------------
    # CONFIDENCE / RISK
    # --------------------------------------------------------

    if confidence >= 80:

        risk = "HIGH CONFIDENCE"

    elif confidence >= 50:

        risk = "MEDIUM CONFIDENCE"

    else:

        risk = "LOW CONFIDENCE"


    # --------------------------------------------------------
    # RECOMMENDATION
    # --------------------------------------------------------

    if confidence < 50:

        recommendation = (
            "The model is not sufficiently confident. "
            "Please capture a clearer image and consider "
            "expert verification before taking treatment decisions."
        )

    elif predicted_class.lower() == "healthy":

        recommendation = (
            "The crop appears healthy according to the AI model. "
            "Continue regular monitoring."
        )

    else:

        recommendation = (
            "A possible crop health problem has been detected. "
            "Inspect nearby plants and consider expert verification "
            "before applying any treatment."
        )


    print("\nPrediction:")
    print("Class:", predicted_class)
    print("Confidence:", confidence)
    print("Risk:", risk)


    # --------------------------------------------------------
    # RETURN RESULT
    # --------------------------------------------------------

    return render_template(
        "index.html",

        prediction=predicted_class,

        confidence=confidence,

        risk=risk,

        predictions=predictions,

        recommendation=recommendation,

        image_name=unique_filename
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    print("\n========================================")
    print(" AgriRakshak Web Application")
    print("========================================")
    print("Open this in your browser:")
    print("http://127.0.0.1:5000")
    print("========================================\n")


    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )