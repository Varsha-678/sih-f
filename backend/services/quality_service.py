import cv2
import numpy as np
from typing import Dict, Any, Tuple
from PIL import Image
import io

from backend.config import BLUR_THRESHOLD, MIN_BRIGHTNESS, MAX_BRIGHTNESS, MIN_RESOLUTION

class ImageQualityValidator:
    """
    Validates crop image quality before running deep learning inference:
    1. Blur estimation via Laplacian variance
    2. Brightness / exposure evaluation via luminance channel
    3. Resolution & dimension checks
    4. Plant/Leaf vegetation presence check using Excess Green (ExG) index
    """

    @staticmethod
    def evaluate_image_bytes(image_bytes: bytes) -> Dict[str, Any]:
        try:
            # Decode image with OpenCV
            np_arr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            if img is None:
                return {
                    "can_analyze": False,
                    "quality": "CORRUPT",
                    "blur_score": 0.0,
                    "brightness_score": 0.0,
                    "resolution": "0x0",
                    "leaf_coverage": 0.0,
                    "message": "The uploaded file is not a valid or readable image. Please choose a valid image file."
                }

            height, width, channels = img.shape
            resolution_str = f"{width}x{height}"

            # 1. Dimension Check
            if width < MIN_RESOLUTION[0] or height < MIN_RESOLUTION[1]:
                return {
                    "can_analyze": False,
                    "quality": "LOW_RESOLUTION",
                    "blur_score": 0.0,
                    "brightness_score": 0.0,
                    "resolution": resolution_str,
                    "leaf_coverage": 0.0,
                    "message": f"Image resolution ({resolution_str}) is too small. Minimum required is {MIN_RESOLUTION[0]}x{MIN_RESOLUTION[1]} px."
                }

            # 2. Blur Estimation (Laplacian Variance)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            blur_score = float(laplacian.var())

            # 3. Brightness / Exposure Estimation
            brightness_score = float(np.mean(gray))

            # 4. Vegetation / Plant Tissue Coverage (Excess Green ExG = 2*G - R - B)
            b, g, r = cv2.split(img.astype(np.float32))
            exg = 2 * g - r - b
            leaf_pixels = np.sum(exg > 15)  # threshold for plant tissue
            total_pixels = height * width
            leaf_coverage = float((leaf_pixels / total_pixels) * 100)

            # Evaluate pass/fail criteria
            issues = []
            if blur_score < BLUR_THRESHOLD:
                issues.append(f"Image appears blurry (sharpness score {blur_score:.1f}/{BLUR_THRESHOLD:.1f}). Hold phone steady.")

            if brightness_score < MIN_BRIGHTNESS:
                issues.append(f"Image is underexposed/too dark (brightness {brightness_score:.1f}). Use better lighting or flash.")
            elif brightness_score > MAX_BRIGHTNESS:
                issues.append(f"Image is overexposed/too bright (brightness {brightness_score:.1f}). Avoid direct harsh glare.")

            if leaf_coverage < 5.0:
                issues.append("No clear crop leaf or plant tissue detected in focus. Please point camera directly at the leaf.")

            if issues:
                quality_status = "WARNING" if blur_score >= (BLUR_THRESHOLD * 0.7) and len(issues) == 1 else "POOR"
                # If quality is borderline, allow user to proceed with warning, else reject
                can_analyze = blur_score >= (BLUR_THRESHOLD * 0.6) and brightness_score >= 30 and brightness_score <= 245
                return {
                    "can_analyze": can_analyze,
                    "quality": quality_status,
                    "blur_score": round(blur_score, 2),
                    "brightness_score": round(brightness_score, 2),
                    "resolution": resolution_str,
                    "leaf_coverage": round(leaf_coverage, 1),
                    "message": " | ".join(issues)
                }

            return {
                "can_analyze": True,
                "quality": "EXCELLENT",
                "blur_score": round(blur_score, 2),
                "brightness_score": round(brightness_score, 2),
                "resolution": resolution_str,
                "leaf_coverage": round(leaf_coverage, 1),
                "message": "Image quality is optimal for diagnosis."
            }

        except Exception as e:
            return {
                "can_analyze": False,
                "quality": "ERROR",
                "blur_score": 0.0,
                "brightness_score": 0.0,
                "resolution": "Unknown",
                "leaf_coverage": 0.0,
                "message": f"Quality validation error: {str(e)}"
            }
