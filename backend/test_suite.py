import unittest
import io
import numpy as np
from PIL import Image

from backend.services.inference_service import inference_engine
from backend.services.quality_service import ImageQualityValidator
from backend.services.severity_service import SeverityEstimationService
from backend.services.risk_engine import AgroClimaticRiskEngine

class TestCropDiseasePlatform(unittest.TestCase):
    def setUp(self):
        # Create a sharp patterned test leaf image with rich high-frequency edges
        np.random.seed(42)
        base = np.zeros((300, 300, 3), dtype=np.uint8)
        base[:, :] = [45, 160, 60]
        # Add high-frequency checkerboard / leaf vein edges for high Laplacian variance
        checker = (np.indices((300, 300)).sum(axis=0) % 4 == 0)[:, :, np.newaxis]
        img_arr = np.where(checker, base + 40, base - 20).astype(np.uint8)
        # Add necrotic lesion patch
        img_arr[100:160, 100:160] = [140, 90, 30]
        
        img = Image.fromarray(img_arr)
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=95)
        self.sample_bytes = buf.getvalue()

    def test_quality_evaluator(self):
        quality = ImageQualityValidator.evaluate_image_bytes(self.sample_bytes)
        self.assertTrue("blur_score" in quality)
        self.assertTrue("brightness_score" in quality)
        self.assertTrue(quality["blur_score"] > 50)
        print(f"[TEST PASS] Image Quality Evaluator: blur_score={quality['blur_score']}, brightness={quality['brightness_score']}")

    def test_inference_engine(self):
        result = inference_engine.predict(self.sample_bytes)
        self.assertTrue("crop" in result)
        self.assertTrue("condition" in result)
        self.assertTrue("calibrated_confidence" in result)
        self.assertTrue("top3_predictions" in result)
        print(f"[TEST PASS] Crop Inference Engine: {result['crop']} - {result['condition']} (Conf: {result['calibrated_confidence']*100:.1f}%)")

    def test_severity_estimator(self):
        sev = SeverityEstimationService.estimate_severity(self.sample_bytes, is_healthy_label=False)
        self.assertTrue("affected_percentage" in sev)
        self.assertTrue("severity_category" in sev)
        print(f"[TEST PASS] Severity Estimator: {sev['severity_category']} ({sev['affected_percentage']}% affected)")

    def test_risk_radar(self):
        hotspots = AgroClimaticRiskEngine.get_all_maharashtra_hotspots()
        self.assertTrue(len(hotspots) > 0)
        top = hotspots[0]
        self.assertTrue("risk_score" in top)
        self.assertTrue("risk_level" in top)
        print(f"[TEST PASS] Agro-Climatic Risk Radar: {len(hotspots)} district vectors evaluated.")

if __name__ == "__main__":
    unittest.main()
