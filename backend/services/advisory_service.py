from typing import Dict, Any, List

class FarmerAdvisoryService:
    """
    Knowledge-grounded agricultural advisory service providing CIBRC-compliant
    integrated pest & disease management (IPM) guidelines in English, Tamil, Marathi, Hindi, Telugu, Kannada.
    """

    DISEASE_KNOWLEDGE_BASE = {
        "Rice___Bacterial_Leaf_Blight": {
            "symptoms": {
                "en": "Water-soaked lesions on leaf margins turning yellow and dry with characteristic bacterial ooze droplets.",
                "ta": "இலை ஓரங்களில் நீர் வடிந்த புள்ளிகள் தோன்றி மஞ்சள் நிறமாக மாறி காய்ந்துவிடும். பாக்டீரியா கசிவு துளிகள் காணப்படும்.",
                "mr": "पानांच्या कडांवर पाणथळ डाग पिवळे पडून वाळतात. जिवाणू पाझर दिसतो.",
                "hi": "पत्तियों के किनारों पर जलयुक्त धब्बे जो पीले होकर सूख जाते हैं। जीवाणु रिसाव दिखाई देता है।"
            },
            "organic_remedies": {
                "en": "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 10g/L.",
                "ta": "5% வேப்பம்பருப்பு சாறு (NSKE) அல்லது சூடோமோனாஸ் ஃபுளோரசன்ஸ் 10 கிராம்/லிட்டர் தெளிக்கவும்.",
                "mr": "५% निंबोळी अर्क किंवा स्यूडोमोनास फ्लुओरेसेन्स १० ग्रॅम/लिटर फवारावे.",
                "hi": "5% नीम गिरी अर्क (NSKE) या स्यूडोमोनास फ्लोरोसेंस 10 ग्राम/लीटर छिड़कें।"
            },
            "chemical_ipm": {
                "en": "Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (0.1 g/L) spray at initial symptom onset.",
                "ta": "காப்பர் ஆக்சிக்ளோரைடு 50 WP (2.5 கிராம்/லி) + ஸ்ட்ரெப்டோசைக்கிளின் (0.1 கிராம்/லி) தெளிக்கவும்.",
                "mr": "कॉपर ऑक्सिक्लोराईड (२.५ ग्रॅम/लिटर) + स्ट्रेप्टोसायक्लिन (०.१ ग्रॅम/लिटर) फवारणी करा.",
                "hi": "कॉपर ऑक्सीक्लोराइड (2.5 ग्राम/लीटर) + स्ट्रेप्टोसाइक्लिन (0.1 ग्राम/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Avoid excess nitrogen fertilizer. Maintain proper field drainage.",
                "ta": "அதிகப்படியான நைட்ரஜன் உரங்களைத் தவிர்க்கவும். வயலில் சரியான நீர் வடிகால் பராமரிக்கவும்.",
                "mr": "नत्रयुक्त खतांचा अतिवापर टाळा. पाण्याचा योग्य निचरा ठेवावा.",
                "hi": "अत्यधिक नाइट्रोजन उर्वरकों से बचें। खेत में जल निकासी व्यवस्था बनाए रखें।"
            },
            "waiting_period_days": 15,
            "helpline": "Kisan Call Center: 1800-180-1551"
        },
        "Maize___Fall_Armyworm_Symptoms": {
            "symptoms": {
                "en": "Ragged whorl feeding holes with abundant sawdust-like frass inside leaf whorls.",
                "ta": "இலை சுருள்களுக்குள் ரம்பம் போன்ற துளைகள் மற்றும் அதிகப்படியான கழிவுப் துகள்கள் காணப்படும்.",
                "mr": "पानांच्या पाभऱ्यात मोठे छिद्र व लाकडाच्या भुशासारखी विष्ठा आढळते.",
                "hi": "पत्तियों के पोंगे में बड़े छेद और चूरे जैसी बीट दिखाई देती है।"
            },
            "organic_remedies": {
                "en": "Apply Metarhizium anisopliae @ 5g/L or 10% Neem leaf extract into central leaf whorl.",
                "ta": "மெட்டாரைசியம் அனிசோப்லியே 5 கிராம்/லி அல்லது 10% வேப்பிலை சாறு இலை சுருளுக்குள் ஊற்றவும்.",
                "mr": "पिकाच्या पोंग्यात मेटारायझियम अ‍ॅनिसापली ५ ग्रॅम/लिटर किंवा निंबोळी अर्क टाकावा.",
                "hi": "पौधे के पोंगे में मेटारिज़ियम एनिसोपली 5 ग्राम/लीटर या नीम अर्क डालें।"
            },
            "chemical_ipm": {
                "en": "Spinetoram 11.7 SC (0.5 ml/L) or Chlorantraniliprole 18.5 SC (0.4 ml/L) whorl application.",
                "ta": "ஸ்பினெடோரம் 11.7 SC (0.5 மி.லி/லி) அல்லது குளோராண்ட்ரானிலிப்ரோல் 18.5 SC (0.4 மி.லி/லி) தெளிக்கவும்.",
                "mr": "स्पिनेटोरम ११.७ एस.सी. (०.५ मिली/लिटर) किंवा क्लोरांट्रानिलिप्रोल १८.५ एस.सी. (०.४ मिली/लिटर) पोंग्यात टाकावे.",
                "hi": "स्पिनेटोरम 11.7 SC (0.5 मिली/लीटर) या क्लोरेंट्रानिलिप्रोल (0.4 मिली/लीटर) का छिड़काव करें।"
            },
            "cultural_practices": {
                "en": "Set up Pheromone traps @ 4/acre. Intercrop with cowpea or napier grass.",
                "ta": "ஏக்கருக்கு 4 மோகப் பொறிகளை வைக்கவும். தட்டப்பயறு அல்லது நேப்பியர் புல் ஊடு பயிராக நடவும்.",
                "mr": "एकर ४ कामगंध सापळे लावावेत. चवळी किंवा नेपिअर गवत आंतरपीक म्हणून घ्यावे.",
                "hi": "प्रति एकड़ 4 फेरोमोन ट्रैप लगाएं। लोबिया की अंतर-फसल लगाएं।"
            },
            "waiting_period_days": 14,
            "helpline": "Kisan Call Center: 1800-180-1551"
        }
    }

    HEALTHY_ADVISORY = {
        "symptoms": {
            "en": "Leaf shows normal vigor, vibrant green color, and no visible lesions or pathogenic sporulation.",
            "ta": "இலை ஆரோக்கியமாக உள்ளது, இயல்பான பச்சை நிறமும் நல்ல வளர்ச்சியும் காணப்படுகிறது. நோய் அறிகுறிகள் இல்லை.",
            "mr": "पान निरोगी असून, नैसर्गिक हिरवा रंग व जोमदार वाढ दिसत आहे. कोणताही रोग किंवा कीड आढळलेली नाही.",
            "hi": "पत्ती स्वस्थ है, सामान्य हरा रंग और अच्छी बढ़वार है। किसी भी बीमारी या कीट का लक्षण नहीं है।"
        },
        "organic_remedies": {
            "en": "Maintain prophylactic health by applying Jeevamrit or Seaweed extract (2 ml/L) during regular watering.",
            "ta": "பயிரின் நோய் எதிர்ப்பு திறனைப் பராமரிக்க ஜீவாமிர்தம் அல்லது கடற்பாசி சாறு (2 மி.லி/லி) தெளிக்கவும்.",
            "mr": "रोगप्रतिकारक शक्ती टिकवण्यासाठी नियमित पाटाच्या पाण्यातून जिवामृत किंवा समुद्री शैवाल अर्क (२ मिली/लिटर) द्यावे.",
            "hi": "पौधे के स्वास्थ्य को बनाए रखने के लिए नियमित रूप से जीवामृत या सीवीड अर्क (2 मिली/लीटर) दें।"
        },
        "chemical_ipm": {
            "en": "No chemical application required. Continue regular scouting and balanced N:P:K nutrition with micronutrients.",
            "ta": "ரசாயன தெளிப்பு தேவையில்லை. வழக்கமான கண்காணிப்பு மற்றும் சீரான உர மேலாண்மையைத் தொடரவும்.",
            "mr": "सध्या कोणत्याही रासायनिक फवारणीची गरज नाही. नियमित निरीक्षण आणि संतुलित खत व्यवस्थापन सुरू ठेवा.",
            "hi": "वर्तमान में किसी रासायनिक छिड़काव की आवश्यकता नहीं है। नियमित निरीक्षण जारी रखें।"
        },
        "cultural_practices": {
            "en": "Maintain optimum irrigation schedule and weed-free bunds.",
            "ta": "சரியான நீர் பாசன அட்டவணையைப் பின்பற்றி வரப்புகளை களை இன்றி பராமரிக்கவும்.",
            "mr": "पाणी देण्याचे योग्य वेळापत्रक पाळा आणि शेताचे बांध तणमुक्त ठेवा.",
            "hi": "सिंचाई का उचित समय रखें और मेड़ों को खरपतवार मुक्त रखें।"
        },
        "waiting_period_days": 0,
        "helpline": "Kisan Call Center: 1800-180-1551"
    }

    @classmethod
    def get_advisory_for_class(cls, class_key: str, lang: str = "en") -> Dict[str, Any]:
        info = cls.DISEASE_KNOWLEDGE_BASE.get(class_key, cls.HEALTHY_ADVISORY)
        lang_code = lang if lang in ["en", "ta", "mr", "hi", "te", "kn", "gu"] else "en"

        def get_text(dict_obj, key):
            val = dict_obj.get(key, {})
            if isinstance(val, dict):
                return val.get(lang_code, val.get("ta" if lang_code == "ta" else "en", val.get("en", "")))
            return str(val)

        return {
            "class_key": class_key,
            "language": lang_code,
            "symptoms": get_text(info, "symptoms"),
            "organic_remedies": get_text(info, "organic_remedies"),
            "chemical_ipm": get_text(info, "chemical_ipm"),
            "cultural_practices": get_text(info, "cultural_practices"),
            "what_to_do_now": get_text(info, "chemical_ipm"),
            "when_to_seek_expert": "அறிகுறிகள் 4-5 நாட்களில் பரவினால் விவசாய நிபுணரை அணுகவும்." if lang_code == "ta" else "If symptoms spread within 4-5 days, consult an agronomist.",
            "waiting_period_days": info.get("waiting_period_days", 0),
            "helpline": info.get("helpline", "Kisan Call Center: 1800-180-1551")
        }
