from typing import Dict, Any, List

class FarmerAdvisoryService:
    """
    Knowledge-grounded agricultural advisory service providing CIBRC-compliant
    integrated pest & disease management (IPM) guidelines in English, Marathi, and Hindi.
    """

    DISEASE_KNOWLEDGE_BASE = {
        "Cotton___Bacterial_Blight_(Karpa)": {
            "symptoms": {
                "en": "Angular water-soaked spots on leaves bounded by veins, later turning brown/black. Bacterial ooze under humid conditions. Vein blight causing leaf drop.",
                "mr": "पानांवर शिरांनी मर्यादित कोनीय, पाणथळ डाग जे नंतर तपकिरी/काळे होतात. जास्त आर्द्रतेत जिवाणूंचा पाझर दिसतो. शिरा करपल्यामुळे पाने गळतात.",
                "hi": "पत्तियों पर नसों से घिरे कोणीय, जल-सिक्त धब्बे जो बाद में भूरे/काले हो जाते हैं। अधिक नमी में जीवाणु का रिसाव होता है और पत्ते झड़ने लगते हैं।"
            },
            "organic_remedies": {
                "en": "Spray Pseudomonas fluorescens @ 10g/L or 2% Neem oil formulation. Ensure clean seed treatment with bio-agents before sowing.",
                "mr": "स्यूडोमोनास फ्लुओरेसेन्स १० ग्रॅम/लिटर किंवा २% कडुनिंब तेल फवारणी करा. पेरणीपूर्वी जैविक बियाणे प्रक्रिया खात्री करा.",
                "hi": "स्यूडोमोनास फ्लोरोसेंस 10 ग्राम/लीटर या 2% नीम के तेल का छिड़काव करें। बुवाई से पहले बीजोपचार अवश्य करें।"
            },
            "chemical_ipm": {
                "en": "Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (0.1 g/L) or Copper Hydroxide 53.8 DF (2 g/L). Apply during early morning or late evening.",
                "mr": "कॉपर ऑक्सिक्लोराईड ५० डब्ल्यू.पी. (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (०.१ ग्रॅम/लिटर) किंवा कॉपर हायड्रॉक्साईड ५३.८ डी.एफ. (२ ग्रॅम/लिटर) फवारणी करावी.",
                "hi": "कॉपर ऑक्सीक्लोराइड 50 WP (2.5 ग्राम/लीटर) + स्ट्रेप्टोसाइक्लिन (0.1 ग्राम/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Destroy crop residues after harvest. Avoid overhead irrigation and excessive nitrogen fertilizers.",
                "mr": "कापणीनंतर पिकांचे अवशेष नष्ट करा. तुषार सिंचन टाळा व नत्रयुक्त खतांचा अतिवापर टाळा.",
                "hi": "फसल कटाई के बाद अवशेष नष्ट करें। अत्यधिक नाइट्रोजन उर्वरकों के प्रयोग से बचें।"
            },
            "waiting_period_days": 15,
            "helpline": "Kisan Call Center: 1800-180-1551 | Maharashtra Krishi Vibhag: 1800-233-4000"
        },
        "Soybean___Soybean_Rust_(Tamba)": {
            "symptoms": {
                "en": "Small tan to dark brown pustules on undersides of lower leaves. Yellowing and premature leaf defoliation during pod-filling stage.",
                "mr": "खालच्या बाजूच्या पानांवर बारीक तांबूस-तपकिरी रंगाचे फोड (पुस्ट्युल्स). शेंगा भरण्याच्या अवस्थेत पाने पिवळी पडून गळतात (तांबेरा).",
                "hi": "निचली पत्तियों की सतह पर छोटे भूरे-लाल रंग के धब्बे/फफोले। पत्तियां पीली होकर समय से पहले झड़ने लगती हैं।"
            },
            "organic_remedies": {
                "en": "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Trichoderma harzianum @ 5g/L as preventive measure.",
                "mr": "प्रतिबंधात्मक उपाय म्हणून ५% निंबोळी अर्क (NSKE) किंवा ट्रायकोडर्मा हरझियानम ५ ग्रॅम/लिटर फवारावे.",
                "hi": "रोकथाम के लिए 5% नीम गिरी अर्क (NSKE) या ट्राइकोडर्मा हरज़ियानम 5 ग्राम/लीटर का छिड़काव करें।"
            },
            "chemical_ipm": {
                "en": "Hexaconazole 5% EC (1 ml/L) or Propiconazole 25% EC (1 ml/L) or Tebuconazole 25.9% EC (1.5 ml/L). Repeat after 12-15 days if cloudy weather persists.",
                "mr": "हेक्झाकोनाझोल ५% ईसी (१ मिली/लिटर) किंवा प्रोपीकोनाझोल २५% ईसी (१ मिली/लिटर) किंवा टेबुकोनाझोल २५.९% ईसी (१.५ मिली/लिटर) फवारावे.",
                "hi": "हेक्साकोनाजोल 5% EC (1 मिली/लीटर) या प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Maintain 45 cm row spacing for good aeration. Avoid sowing susceptible varieties in rust-prone river belt areas.",
                "mr": "हवा खेळती राहण्यासाठी ४५ सेमी अंतरावर पेरणी करा. नदीकाठच्या भागात तांबेरा सहनशील वाण वापरावेत.",
                "hi": "उचित वायु संचार के लिए 45 सेमी कतार दूरी रखें। रोग प्रतिरोधी किस्मों का चयन करें।"
            },
            "waiting_period_days": 20,
            "helpline": "Kisan Call Center: 1800-180-1551"
        },
        "Sugarcane___Red_Rot_(Kuhila)": {
            "symptoms": {
                "en": "Yellowing and drooping of 3rd or 4th leaf from top. Stalk splitting reveals reddish longitudinal discoloration with characteristic transverse white patches and alcoholic sour smell.",
                "mr": "उसाच्या शेंड्याकडील तिसरे/चौथे पान पिवळे पडून वाळते. कांड्या उभ्या चिरल्यास लाल रंगाचे पट्टे व आडवे पांढरे ठिपके आणि आंबूस वास येतो.",
                "hi": "गन्ने के ऊपरी भाग की पत्तियां पीली पड़कर सूखने लगती हैं। तने को चीरने पर अंदर लाल रंग और सफेद चकत्ते दिखते हैं।"
            },
            "organic_remedies": {
                "en": "Sett treatment with Trichoderma viride @ 10g/L for 30 minutes before planting. Soil application of bio-agents enriched with FYM.",
                "mr": "लागवडीपूर्वी उसाच्या बेण्यावर ट्रायकोडर्मा विरिडी (१० ग्रॅम/लिटर) द्रावणात ३० मिनिटे संस्कार करावा. शेणखतात मिसळून जमिनीत द्यावे.",
                "hi": "बुवाई से पहले गन्ने के टुकड़ों को ट्राइकोडर्मा विरिडी (10 ग्राम/लीटर) से 30 मिनट तक उपचारित करें।"
            },
            "chemical_ipm": {
                "en": "Carbendazim 50% WP (1 g/L) sett dip treatment. Drench infected clumps with Carbendazim (1 g/L) and remove affected stools.",
                "mr": "कार्बेन्डाझिम ५०% डब्ल्यू.पी. (१ ग्रॅम/लिटर) बेणे प्रक्रिया करावी. बाधित उसाचे बेट उपटून जाळून नष्ट करावे.",
                "hi": "कार्बेंडाजिम 50% WP (1 ग्राम/लीटर) से बेजोपचार करें। रोगग्रस्त पौधों को उखाड़कर नष्ट करें।"
            },
            "cultural_practices": {
                "en": "Use certified disease-free tissue culture seed setts. Practice crop rotation with green manure crops (Dhaincha/Sunnhemp).",
                "mr": "प्रमाणित रोगमुक्त बेणे वापरा. ताग किंवा ढेंचा सारख्या हिरवळीच्या खतांसह फेरपालट करा.",
                "hi": "रोगमुक्त प्रमाणित बीजों का उपयोग करें। हरी खाद (ढैंचा/सनई) के साथ फसल चक्र अपनाएं।"
            },
            "waiting_period_days": 30,
            "helpline": "Vasantdada Sugar Institute (VSI) Pune: 020-26902100 | Kisan Call Center: 1800-180-1551"
        },
        "Onion___Purple_Blotch_(Jaambhla_Karpa)": {
            "symptoms": {
                "en": "Small, sunken, water-soaked lesions that enlarge and turn purplish with a yellow halo. Tips of leaves die back, drastically reducing bulb size.",
                "mr": "पानांवर लहान जांभळट-तपकिरी लांबट डाग पडतात ज्यांच्या भोवती पिवळसर कडा असते. पानांचे शेंडे करपतात आणि कांद्याची वाढ खुंटते.",
                "hi": "पत्तियों पर छोटे बैंगनी-भूरे रंग के धब्बे बनते हैं जिनके चारों ओर पीला घेरा होता है। पत्तियों के सिरे सूखने लगते हैं।"
            },
            "organic_remedies": {
                "en": "Foliar spray of Ampelomyces quisqualis or Trichoderma harzianum (5 g/L). Garlic-chilli extract spray helps repel vectors.",
                "mr": "ट्रायकोडर्मा हरझियानम किंवा स्यूडोमोनास (५ ग्रॅम/लिटर) फवारावे. लसूण-मिरची अर्क फवारणी करावी.",
                "hi": "ट्राइकोडर्मा हरज़ियानम (5 ग्राम/लीटर) का छिड़काव करें। लहसुन-मिर्च का काढ़ा कीटों को दूर रखता है।"
            },
            "chemical_ipm": {
                "en": "Mancozeb 75% WP (2.5 g/L) or Tebuconazole + Trifloxystrobin 75 WG (0.7 g/L) or Azoxystrobin 23% SC (1 ml/L) mixed with sticker.",
                "mr": "मँकोझेब ७५% डब्ल्यू.पी. (२.५ ग्रॅम/लिटर) किंवा टेबुकोनाझोल + ट्रायफ्लॉक्सीस्ट्रोबिन ७५ डब्ल्यू.जी. (०.७ ग्रॅम/लिटर) सोबत स्टिकर (सर्फेक्टंट) मिसळून फवारावे.",
                "hi": "मैंकोजेब 75% WP (2.5 ग्राम/लीटर) या टेबुकोनाजोल + ट्राइफ्लॉक्सीस्ट्रोबिन 75 WG (0.7 ग्राम/लीटर) चिपचिपे पदार्थ के साथ मिलाकर छिड़कें।"
            },
            "cultural_practices": {
                "en": "Avoid excess irrigation near harvest. Provide raised beds for better drainage during heavy monsoon showers in Nashik/Pune.",
                "mr": "काढणीच्या वेळी जास्त पाणी देणे टाळा. गादीवाफ्यावर लागवड करून पाण्याचा योग्य निचरा ठेवावा.",
                "hi": "उठाए गए बिस्तरों (उठी क्यारियों) पर रोपाई करें ताकि जलभराव न हो।"
            },
            "waiting_period_days": 10,
            "helpline": "Directorate of Onion & Garlic Research (DOGR) Rajgurunagar: 02135-222026"
        },
        "Tomato___Early_Blight_(Lavkar_Karpa)": {
            "symptoms": {
                "en": "Concentric dark brown rings on older lower leaves (target-board appearance), surrounded by yellow chlorotic zone.",
                "mr": "खालच्या जुन्या पानांवर गोलाकार वलयाकार गडद तपकिरी डाग (टार्गेट बोर्डसारखे) पडतात आणि पानांचा पिवळेपणा वाढतो.",
                "hi": "निचली पत्तियों पर गोल छल्लेदार गहरे भूरे धब्बे बनते हैं। पत्तियां पीली होकर सूखने लगती हैं।"
            },
            "organic_remedies": {
                "en": "Spray Trichoderma viride @ 5g/L or 10% cow urine + hing decoction every 10 days.",
                "mr": "ट्रायकोडर्मा विरिडी ५ ग्रॅम/लिटर किंवा १०% गोमूत्र अर्क दर १० दिवसांनी फवारावा.",
                "hi": "ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर या 10% गोमूत्र के घोल का छिड़काव करें।"
            },
            "chemical_ipm": {
                "en": "Chlorothalonil 75% WP (2 g/L) or Difenoconazole 25% EC (0.5 ml/L) or Copper Oxychloride 50 WP (2.5 g/L).",
                "mr": "क्लोरोथॅलोनिल ७५% डब्ल्यू.पी. (२ ग्रॅम/लिटर) किंवा डायफेनोकोनाझोल २५% ईसी (०.५ मिली/लिटर) फवारावे.",
                "hi": "डाइफेनोकोनाजोल 25% EC (0.5 मिली/लीटर) या क्लोरोथैलोनिल 75% WP (2 ग्राम/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Mulch soil surface with straw or plastic film to prevent soil splash on leaves. Prune lower diseased foliage.",
                "mr": "पानांवर मातीचे शिंतोडे उडू नयेत म्हणून आच्छादन (मल्चिंग) वापरा. जमिनीलगतची बाधित पाने छाटून टाकावीत.",
                "hi": "मल्चिंग का उपयोग करें ताकि मिट्टी के छींटे पत्तियों पर न पड़ें। निचली संक्रमित पत्तियां हटा दें।"
            },
            "waiting_period_days": 7,
            "helpline": "Kisan Call Center: 1800-180-1551"
        },
        "Pomegranate___Bacterial_Blight_(Telya)": {
            "symptoms": {
                "en": "Water-soaked dark oily spots on leaves, stems (cankers), and fruits with characteristic 'L' or 'Y' shaped cracks with oozing gum.",
                "mr": "पाने, फांद्या व फळांवर तेलकट काळे डाग (तेल्या). फळांवर 'L' किंवा 'Y' आकाराच्या भेगा पडून डिंक बाहेर येतो.",
                "hi": "पत्तियों और फलों पर तैलीय काले धब्बे (तेल्या)। फलों पर अंग्रेजी के 'L' या 'Y' आकार की दरारें पड़ जाती हैं।"
            },
            "organic_remedies": {
                "en": "Bacticide-bio spray: Bacillus subtilis @ 5g/L + Copper Hydroxide (1.5 g/L). Paste Bordeaux paste (10%) on stem wounds.",
                "mr": "बॅसिलस सबटिलिस ५ ग्रॅम/लिटर + कॉपर हायड्रॉक्साईड १.५ ग्रॅम/लिटर फवारावे. खोडावरील जखमांवर १०% बोर्डो पेस्ट लावावी.",
                "hi": "बैसिलस सबटिलिस 5 ग्राम/लीटर का छिड़काव करें। तने के घावों पर बोर्डो पेस्ट लगाएं।"
            },
            "chemical_ipm": {
                "en": "Streptocycline (0.5 g/L) or 2-Bromo-2-nitropropane-1,3-diol (Bronopol @ 0.5 g/L) + Copper Oxychloride 50 WP (2.5 g/L).",
                "mr": "स्ट्रेप्टोसायक्लिन (०.५ ग्रॅम/लिटर) किंवा ब्रोनोपॉल (०.५ ग्रॅम/लिटर) + कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) फवारावे.",
                "hi": "स्ट्रेप्टोसाइक्लिन (0.5 ग्राम/लीटर) + कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Strict orchard hygiene: Collect and burn fallen leaves and infected fruits. Disinfect secateurs with 2.5% sodium hypochlorite.",
                "mr": "बागेची स्वच्छता ठेवा. पडलेली पाने व फळे गोळा करून जाळा. छाटणीची कात्री २.५% सोडियम हायपोक्लोराईटने निर्जंतुक करा.",
                "hi": "बगीचे की सफाई रखें। गिरे हुए फल और पत्तियां जला दें। छंटाई के औजारों को विसंक्रमित करें।"
            },
            "waiting_period_days": 21,
            "helpline": "National Research Centre on Pomegranate (NRCP) Solapur: 0217-2354330"
        }
    }

    HEALTHY_ADVISORY = {
        "symptoms": {
            "en": "Leaf shows normal vigor, vibrant green color, and no visible lesions or pathogenic sporulation.",
            "mr": "पान निरोगी असून, नैसर्गिक हिरवा रंग व जोमदार वाढ दिसत आहे. कोणताही रोग किंवा कीड आढळलेली नाही.",
            "hi": "पत्ती स्वस्थ है, सामान्य हरा रंग और अच्छी बढ़वार है। किसी भी बीमारी या कीट का लक्षण नहीं है।"
        },
        "organic_remedies": {
            "en": "Maintain prophylactic health by applying Jeevamrit or Seaweed extract (2 ml/L) during regular watering.",
            "mr": "रोगप्रतिकारक शक्ती टिकवण्यासाठी नियमित पाटाच्या पाण्यातून जिवामृत किंवा समुद्री शैवाल अर्क (२ मिली/लिटर) द्यावे.",
            "hi": "पौधे के स्वास्थ्य को बनाए रखने के लिए नियमित रूप से जीवामृत या सीवीड अर्क (2 मिली/लीटर) दें।"
        },
        "chemical_ipm": {
            "en": "No chemical application required. Continue regular scouting and balanced N:P:K nutrition with micronutrients.",
            "mr": "सध्या कोणत्याही रासायनिक फवारणीची गरज नाही. नियमित निरीक्षण आणि संतुलित खत व्यवस्थापन सुरू ठेवा.",
            "hi": "वर्तमान में किसी रासायनिक छिड़काव की आवश्यकता नहीं है। नियमित निरीक्षण जारी रखें।"
        },
        "cultural_practices": {
            "en": "Maintain optimum irrigation schedule and weed-free bunds.",
            "mr": "पाणी देण्याचे योग्य वेळापत्रक पाळा आणि शेताचे बांध तणमुक्त ठेवा.",
            "hi": "सिंचाई का उचित समय रखें और मेड़ों को खरपतवार मुक्त रखें।"
        },
        "waiting_period_days": 0,
        "helpline": "Kisan Call Center: 1800-180-1551"
    }

    @classmethod
    def get_advisory_for_class(cls, class_key: str, lang: str = "en") -> Dict[str, Any]:
        info = cls.DISEASE_KNOWLEDGE_BASE.get(class_key, cls.HEALTHY_ADVISORY)
        lang_code = lang if lang in ["en", "mr", "hi"] else "en"

        return {
            "class_key": class_key,
            "language": lang_code,
            "symptoms": info["symptoms"].get(lang_code, info["symptoms"]["en"]),
            "organic_remedies": info["organic_remedies"].get(lang_code, info["organic_remedies"]["en"]),
            "chemical_ipm": info["chemical_ipm"].get(lang_code, info["chemical_ipm"]["en"]),
            "cultural_practices": info["cultural_practices"].get(lang_code, info["cultural_practices"]["en"]),
            "waiting_period_days": info.get("waiting_period_days", 0),
            "helpline": info.get("helpline", "Kisan Call Center: 1800-180-1551")
        }
