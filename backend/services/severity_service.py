import cv2
import numpy as np
from typing import Dict, Any

class SeverityEstimationService:
    """
    Estimates disease lesion severity on crop foliage:
    Affected Area Ratio = (Lesion Surface Area / Total Detected Leaf Area) * 100
    Categories:
    - 0% - 20%: Mild (Level 1)
    - 21% - 50%: Moderate (Level 2)
    - 51% - 75%: High (Level 3)
    - 76% - 100%: Severe (Level 4)
    """

    @staticmethod
    def estimate_severity(image_bytes: bytes, is_healthy_label: bool = False) -> Dict[str, Any]:
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return {
                "affected_percentage": 0.0,
                "healthy_percentage": 100.0,
                "severity_category": "Unknown",
                "severity_tier": 0,
                "action_urgency": "Unknown",
                "color_code": "#6B7280"
            }

        # Convert to HSV color space
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        # 1. Total Leaf Foliage Mask (Green to Yellowish Green vegetation)
        lower_green = np.array([25, 30, 30])
        upper_green = np.array([90, 255, 255])
        leaf_mask = cv2.inRange(hsv, lower_green, upper_green)

        # 2. Lesion / Necrosis Mask (Brown, Orange Rust, Dark Spot, Yellow Halo, Rust Pustules)
        # Brown / orange-red rust pustules and leaf spots
        lower_lesion1 = np.array([5, 35, 20])
        upper_lesion1 = np.array([24, 255, 245])
        lesion_mask1 = cv2.inRange(hsv, lower_lesion1, upper_lesion1)

        # Dark necrotic / bacterial spots / anthracnose
        lower_lesion2 = np.array([0, 0, 10])
        upper_lesion2 = np.array([180, 255, 75])
        lesion_mask2 = cv2.inRange(hsv, lower_lesion2, upper_lesion2)

        # Yellow-brown chlorotic halos
        lower_lesion3 = np.array([18, 40, 70])
        upper_lesion3 = np.array([30, 255, 255])
        lesion_mask3 = cv2.inRange(hsv, lower_lesion3, upper_lesion3)

        lesion_mask = cv2.bitwise_or(lesion_mask1, lesion_mask2)
        lesion_mask = cv2.bitwise_or(lesion_mask, lesion_mask3)

        # Combined total plant foliage area
        total_plant_mask = cv2.bitwise_or(leaf_mask, lesion_mask)
        total_leaf_pixels = int(np.sum(total_plant_mask > 0))
        lesion_pixels = int(np.sum(lesion_mask > 0))

        if total_leaf_pixels < 500:
            # Fallback if image has unusual coloration
            if is_healthy_label:
                affected_percentage = 0.0
            else:
                affected_percentage = 22.5
        else:
            raw_lesion_ratio = float(lesion_pixels / (total_leaf_pixels + 1e-5))
            
            # If visual lesion ratio is significant (> 2.5%), foliar damage is present
            if raw_lesion_ratio >= 0.025:
                affected_percentage = float(raw_lesion_ratio * 100.0)
                affected_percentage = min(96.0, max(3.0, affected_percentage))
            elif is_healthy_label:
                affected_percentage = 0.0
            else:
                affected_percentage = float(raw_lesion_ratio * 100.0)

        healthy_percentage = round(100.0 - affected_percentage, 1)
        affected_percentage = round(affected_percentage, 1)

        if affected_percentage <= 0.5:
            severity_category = "Healthy / None"
            severity_tier = 0
            action_urgency = "Standard preventive management & routine scouting"
            color_code = "#10B981"
        elif affected_percentage <= 20.0:
            severity_category = "Mild (1-20%)"
            severity_tier = 1
            action_urgency = "Early Signs Detected - Apply preventive bio-agents"
            color_code = "#22C55E"
        elif affected_percentage <= 50.0:
            severity_category = "Moderate (21-50%)"
            severity_tier = 2
            action_urgency = "Targeted Spray Recommended within 48 hrs"
            color_code = "#F59E0B"
        elif affected_percentage <= 75.0:
            severity_category = "High (51-75%)"
            severity_tier = 3
            action_urgency = "Immediate Therapeutic Intervention Required"
            color_code = "#EF4444"
        else:
            severity_category = "Severe (76-100%)"
            severity_tier = 4
            action_urgency = "Critical Foliar Damage - Isolate & Treat Stems"
            color_code = "#991B1B"

        return {
            "affected_percentage": affected_percentage,
            "healthy_percentage": healthy_percentage,
            "severity_category": severity_category,
            "severity_tier": severity_tier,
            "action_urgency": action_urgency,
            "color_code": color_code,
            "total_foliage_pixels": total_leaf_pixels,
            "lesion_pixels": lesion_pixels
        }
