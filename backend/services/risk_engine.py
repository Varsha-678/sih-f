import datetime
from typing import Dict, List, Any

# Maharashtra District Baseline Telemetry and Agro-climatic Zones
MAHARASHTRA_DISTRICTS_DATA = [
    {
        "district": "Yavatmal",
        "region": "Vidarbha",
        "coordinates": [20.3888, 78.1204],
        "primary_crop": "Cotton",
        "secondary_crop": "Soybean",
        "temperature_c": 32.4,
        "relative_humidity": 82.0,
        "rainfall_mm": 18.5,
        "forecast_rain_prob": 70.0,
        "pest_trap_density": 14.8,  # Moths/trap/night
        "active_outbreak": "Pink Bollworm & Bacterial Blight Alert",
        "soil_moisture": 76.0,
        "crop_stage": "Flowering & Boll Formation"
    },
    {
        "district": "Nagpur",
        "region": "Vidarbha",
        "coordinates": [21.1458, 79.0882],
        "primary_crop": "Cotton",
        "secondary_crop": "Citrus / Soybean",
        "temperature_c": 31.0,
        "relative_humidity": 78.5,
        "rainfall_mm": 12.0,
        "forecast_rain_prob": 60.0,
        "pest_trap_density": 9.2,
        "active_outbreak": "Soybean Rust Vigil",
        "soil_moisture": 68.0,
        "crop_stage": "Vegetative"
    },
    {
        "district": "Akola",
        "region": "Vidarbha",
        "coordinates": [20.7002, 77.0082],
        "primary_crop": "Cotton",
        "secondary_crop": "Soybean",
        "temperature_c": 33.2,
        "relative_humidity": 79.0,
        "rainfall_mm": 14.2,
        "forecast_rain_prob": 65.0,
        "pest_trap_density": 12.4,
        "active_outbreak": "Whitefly & Sucking Pest Pressure",
        "soil_moisture": 65.0,
        "crop_stage": "Flowering"
    },
    {
        "district": "Nashik",
        "region": "North Maharashtra",
        "coordinates": [19.9975, 73.7898],
        "primary_crop": "Onion",
        "secondary_crop": "Tomato / Grapes",
        "temperature_c": 28.5,
        "relative_humidity": 88.0,
        "rainfall_mm": 24.0,
        "forecast_rain_prob": 85.0,
        "pest_trap_density": 11.5,
        "active_outbreak": "Purple Blotch & Downy Mildew Threat",
        "soil_moisture": 84.0,
        "crop_stage": "Bulb Formation"
    },
    {
        "district": "Jalgaon",
        "region": "North Maharashtra",
        "coordinates": [21.0077, 75.5626],
        "primary_crop": "Cotton",
        "secondary_crop": "Banana / Maize",
        "temperature_c": 34.0,
        "relative_humidity": 71.0,
        "rainfall_mm": 8.0,
        "forecast_rain_prob": 45.0,
        "pest_trap_density": 7.8,
        "active_outbreak": "Moderate Thrips & Mites",
        "soil_moisture": 58.0,
        "crop_stage": "Vegetative"
    },
    {
        "district": "Solapur",
        "region": "Western Maharashtra",
        "coordinates": [17.6599, 75.9064],
        "primary_crop": "Pomegranate",
        "secondary_crop": "Sugarcane",
        "temperature_c": 30.5,
        "relative_humidity": 84.0,
        "rainfall_mm": 16.0,
        "forecast_rain_prob": 75.0,
        "pest_trap_density": 13.1,
        "active_outbreak": "Bacterial Blight (Telya) High Alert",
        "soil_moisture": 72.0,
        "crop_stage": "Fruit Development"
    },
    {
        "district": "Pune",
        "region": "Western Maharashtra",
        "coordinates": [18.5204, 73.8567],
        "primary_crop": "Sugarcane",
        "secondary_crop": "Tomato / Vegetables",
        "temperature_c": 27.8,
        "relative_humidity": 82.0,
        "rainfall_mm": 19.5,
        "forecast_rain_prob": 80.0,
        "pest_trap_density": 6.2,
        "active_outbreak": "Early Blight & Rust Monitoring",
        "soil_moisture": 80.0,
        "crop_stage": "Tillering"
    },
    {
        "district": "Kolhapur",
        "region": "Western Maharashtra",
        "coordinates": [16.7050, 74.2433],
        "primary_crop": "Sugarcane",
        "secondary_crop": "Soybean",
        "temperature_c": 26.5,
        "relative_humidity": 90.0,
        "rainfall_mm": 35.0,
        "forecast_rain_prob": 90.0,
        "pest_trap_density": 8.5,
        "active_outbreak": "Red Rot & Rust in Waterlogged Patches",
        "soil_moisture": 92.0,
        "crop_stage": "Grand Growth"
    },
    {
        "district": "Latur",
        "region": "Marathwada",
        "coordinates": [18.4088, 76.5604],
        "primary_crop": "Soybean",
        "secondary_crop": "Pulses (Tur/Urad)",
        "temperature_c": 30.0,
        "relative_humidity": 76.0,
        "rainfall_mm": 10.5,
        "forecast_rain_prob": 55.0,
        "pest_trap_density": 10.2,
        "active_outbreak": "Girdle Beetle & Pod Borer Watch",
        "soil_moisture": 62.0,
        "crop_stage": "Pod Formation"
    },
    {
        "district": "Chhatrapati Sambhajinagar",
        "region": "Marathwada",
        "coordinates": [19.8762, 75.3433],
        "primary_crop": "Cotton",
        "secondary_crop": "Maize / Bajra",
        "temperature_c": 31.8,
        "relative_humidity": 74.0,
        "rainfall_mm": 11.0,
        "forecast_rain_prob": 50.0,
        "pest_trap_density": 8.9,
        "active_outbreak": "Fall Armyworm Vigil in Maize",
        "soil_moisture": 60.0,
        "crop_stage": "Vegetative"
    },
]

class AgroClimaticRiskEngine:
    """
    Transparent Agro-Climatic Early Warning Engine
    Calculates disease & pest outbreak risk (0-100 score):
    - Weather Proliferation Index (35%)
    - Phenological Stage Vulnerability (25%)
    - Pheromone Trap & Vector Counts (25%)
    - Neighborhood Cluster Outbreak Proximity (15%)
    """

    @staticmethod
    def calculate_risk(
        crop: str,
        stage: str,
        temp_c: float,
        humidity: float,
        rainfall_mm: float,
        forecast_rain_prob: float,
        trap_density: float,
        neighbor_outbreak_count: int = 2
    ) -> Dict[str, Any]:
        # 1. Weather Proliferation Index (0 - 100)
        # Optimal fungal/bacterial spread: Temp between 24-32°C and Humidity > 75%
        temp_score = 0.0
        if 22.0 <= temp_c <= 34.0:
            # Peak proliferation zone
            temp_score = 100.0 - abs(temp_c - 28.0) * 5.0
        else:
            temp_score = max(10.0, 60.0 - abs(temp_c - 28.0) * 10.0)

        # Humidity score
        humidity_score = min(100.0, max(0.0, (humidity - 40.0) * 1.67))

        # Rain score
        rain_score = min(100.0, (rainfall_mm * 2.5) + (forecast_rain_prob * 0.5))

        weather_index = (temp_score * 0.35) + (humidity_score * 0.40) + (rain_score * 0.25)
        weather_index = min(100.0, max(0.0, weather_index))

        # 2. Phenological Stage Vulnerability (0 - 100)
        stage_weights = {
            "Seedling": 60.0,
            "Vegetative": 50.0,
            "Flowering": 88.0,
            "Fruit Development": 92.0,
            "Pod Formation": 90.0,
            "Bulb Formation": 85.0,
            "Boll Formation": 95.0,
            "Tillering": 55.0,
            "Grand Growth": 70.0,
            "Maturity": 40.0
        }
        stage_score = stage_weights.get(stage, 65.0)

        # 3. Trap & Vector Density Index (0 - 100)
        # ETL (Economic Threshold Level): > 8 moths/trap/night is critical
        trap_score = min(100.0, (trap_density / 15.0) * 100.0)

        # 4. Neighborhood Cluster Proximity (0 - 100)
        cluster_score = min(100.0, neighbor_outbreak_count * 25.0)

        # Aggregate Weighted Risk Score (0 - 100)
        total_risk = (
            (weather_index * 0.35) +
            (stage_score * 0.25) +
            (trap_score * 0.25) +
            (cluster_score * 0.15)
        )
        total_risk_int = int(round(total_risk))

        if total_risk_int >= 70:
            risk_level = "HIGH"
            level_color = "red"
        elif total_risk_int >= 40:
            risk_level = "MEDIUM"
            level_color = "amber"
        else:
            risk_level = "LOW"
            level_color = "emerald"

        # Actionable Trilingual Advisories
        advisories = AgroClimaticRiskEngine._generate_risk_advisory(crop, risk_level, total_risk_int)

        return {
            "risk_score": total_risk_int,
            "risk_level": risk_level,
            "level_color": level_color,
            "breakdown": {
                "weather_index": round(weather_index, 1),
                "stage_vulnerability": round(stage_score, 1),
                "trap_density_index": round(trap_score, 1),
                "cluster_proximity_index": round(cluster_score, 1)
            },
            "parameters": {
                "temperature_c": temp_c,
                "relative_humidity": humidity,
                "rainfall_mm": rainfall_mm,
                "forecast_rain_prob": forecast_rain_prob,
                "trap_density": trap_density,
                "crop": crop,
                "stage": stage
            },
            "advisory": advisories
        }

    @staticmethod
    def _generate_risk_advisory(crop: str, risk_level: str, score: int) -> Dict[str, str]:
        if risk_level == "HIGH":
            return {
                "en": f"CRITICAL EARLY WARNING: High outbreak risk ({score}/100) for {crop}. Weather conditions (high humidity and warm temperature) favor rapid spore germination and pest infestation. Install pheromone traps immediately and apply recommended preventive bio-fungicide (Trichoderma viride @ 5g/L) before heavy rain.",
                "mr": f"अतिदक्षतेचा इशारा: {crop} पिकासाठी कीड व रोगाचा धोका उच्च ({score}/100) पातळीवर आहे. सततची आर्द्रता व उबदार हवामानामुळे बुरशी व किडींचा प्रादुर्भाव वाढू शकतो. ताबडतोब कामगंध सापळे लावा आणि पावसापूर्वी ट्रायकोडर्मा विरिडी (५ ग्रॅम/लिटर) फवारणी करा.",
                "hi": f"गंभीर पूर्व चेतावनी: {crop} फसल के लिए कीट व रोग का जोखिम उच्च स्तर ({score}/100) पर है। अत्यधिक नमी और तापमान के कारण फफूंद तेजी से फैल सकती है। तुरंत फेरोमोन ट्रैप लगाएं और बारिश से पहले ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) का छिड़काव करें।"
            }
        elif risk_level == "MEDIUM":
            return {
                "en": f"MODERATE ALERT: Moderate disease pressure ({score}/100) for {crop}. Inspect lower leaves and flower buds every 2 days. Maintain proper drainage in field to avoid water stagnation.",
                "mr": f"मध्यम दक्षता इशारा: {crop} पिकावर मध्यम रोग दबाव ({score}/100) नोंदवला गेला आहे. दर २ दिवसांनी पानांची खालची बाजू तपासा. शेतात पाणी साचणार नाही याची काळजी घ्या.",
                "hi": f"मध्यम चेतावनी: {crop} पर रोग का मध्यम दबाव ({score}/100) देखा जा रहा है। हर 2 दिन में पत्तियों की निचली सतह का निरीक्षण करें और खेत में जल निकासी बनाए रखें।"
            }
        else:
            return {
                "en": f"LOW RISK: Micro-climate is currently favorable ({score}/100) for {crop}. Continue regular crop scouting and balanced nutrient management.",
                "mr": f"कमी धोका: सध्याचे हवामान {crop} पिकासाठी अनुकूल ({score}/100) आहे. नियमित शेत पाहणी व संतुलित खत व्यवस्थापन सुरू ठेवा.",
                "hi": f"कम जोखिम: मौसम वर्तमान में {crop} फसल के लिए अनुकूल ({score}/100) है। नियमित निरीक्षण और संतुलित पोषण प्रबंधन जारी रखें।"
            }

    @staticmethod
    def get_all_maharashtra_hotspots() -> List[Dict[str, Any]]:
        results = []
        for d in MAHARASHTRA_DISTRICTS_DATA:
            risk = AgroClimaticRiskEngine.calculate_risk(
                crop=d["primary_crop"],
                stage=d["crop_stage"],
                temp_c=d["temperature_c"],
                humidity=d["relative_humidity"],
                rainfall_mm=d["rainfall_mm"],
                forecast_rain_prob=d["forecast_rain_prob"],
                trap_density=d["pest_trap_density"],
                neighbor_outbreak_count=3 if d["pest_trap_density"] > 10 else 1
            )
            item = {
                **d,
                "risk_score": risk["risk_score"],
                "risk_level": risk["risk_level"],
                "level_color": risk["level_color"],
                "breakdown": risk["breakdown"],
                "advisory": risk["advisory"]
            }
            results.append(item)
        return sorted(results, key=lambda x: x["risk_score"], reverse=True)
