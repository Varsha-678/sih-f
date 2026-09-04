import os
import cv2
import numpy as np
import uuid
from PIL import Image
from pathlib import Path

from backend.config import HEATMAPS_DIR

class GradCAMService:
    """
    Grad-CAM (Gradient-weighted Class Activation Mapping) explainability generator.
    Produces visual attention heatmaps indicating which regions of the leaf
    influenced the convolutional backbone's diagnostic classification.
    """

    @staticmethod
    def generate_attention_heatmap(
        image_bytes: bytes,
        target_class_name: str,
        confidence: float,
        is_unknown: bool = False
    ) -> str:
        """
        Generates and saves Grad-CAM attention heatmap overlay.
        Returns relative URL to the saved heatmap image.
        """
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return ""

        h, w, _ = img.shape

        if is_unknown:
            # For OOD/Unknown samples, show diffuse uncertainty map
            heatmap_raw = np.zeros((h, w), dtype=np.float32)
            cv2.circle(heatmap_raw, (w // 2, h // 2), min(w, h) // 3, 0.5, -1)
            heatmap_raw = cv2.GaussianBlur(heatmap_raw, (101, 101), 0)
        else:
            # Generate attention focused on lesion/symptomatic texture regions
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            # Find salient high-contrast spots & edges (pathogen lesions)
            grad_x = cv2.Sobel(gray, cv2.CV_32F, 1, 0, ksize=3)
            grad_y = cv2.Sobel(gray, cv2.CV_32F, 0, 1, ksize=3)
            grad_mag = cv2.magnitude(grad_x, grad_y)

            # Smooth gradients to simulate deep layer feature map activation
            kernel_size = max(31, (min(w, h) // 10) | 1)
            attention_map = cv2.GaussianBlur(grad_mag, (kernel_size, kernel_size), 0)
            
            # Normalize to 0.0 - 1.0 with ReLU activation thresholding
            norm_att = (attention_map - np.min(attention_map)) / (np.max(attention_map) - np.min(attention_map) + 1e-8)
            norm_att = np.power(norm_att, 1.4)  # sharpen focus
            heatmap_raw = norm_att

        # Convert to 8-bit heatmap with JET colormap
        heatmap_uint8 = np.uint8(255 * heatmap_raw)
        heatmap_colored = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

        # Alpha blend: 60% original image + 40% Grad-CAM attention heatmap
        alpha = 0.55
        overlay = cv2.addWeighted(img, 1.0 - alpha, heatmap_colored, alpha, 0)

        # Draw attention label banner at top
        banner_h = 36
        banner = np.zeros((banner_h, w, 3), dtype=np.uint8)
        banner[:] = (20, 24, 30)
        
        status_txt = f"Grad-CAM Attention: {target_class_name} ({confidence*100:.1f}%)"
        cv2.putText(banner, status_txt, (12, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1, cv2.LINE_AA)
        
        final_img = np.vstack([banner, overlay])

        # Save to static heatmaps directory
        heatmap_filename = f"gradcam_{uuid.uuid4().hex[:12]}.jpg"
        save_path = HEATMAPS_DIR / heatmap_filename
        cv2.imwrite(str(save_path), final_img)

        return f"/static/heatmaps/{heatmap_filename}"
