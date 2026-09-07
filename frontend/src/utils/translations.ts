import type { Language } from '../types';

export interface TranslationSchema {
  appName: string;
  tagline: string;
  govtBadge: string;
  aiDisclaimer: string;
  kisanHelpline: string;

  // Nav tabs
  tabHome: string;
  tabDetect: string;
  tabCropHealth: string;
  tabRiskRadar: string;
  tabFields: string;
  tabHistory: string;
  tabLibrary: string;
  tabLearn: string;
  tabAbout: string;
  tabDashboard: string;
  tabSpread: string;
  tabCompare: string;
  tabSymptoms: string;
  tabExpert: string;
  btnAnalyzeCrop: string;

  // Homepage Hero
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCta: string;
  exploreCropHealth: string;
  exploreHowItWorks: string;
  startHealthCheck: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Hero AI HUD Box
  cvActive: string;
  cvModel: string;
  earlyBlightHud: string;
  targetSpot: string;
  lesionSpot: string;
  affectedHud: string;
  stepPhoto: string;
  stepAIVision: string;
  stepDetection: string;
  stepScore: string;
  stepWarning: string;

  // Lifecycle Section
  lifecycleBadge: string;
  lifecycleTitle: string;
  lifecycleSubtitle: string;
  lcStep1Title: string;
  lcStep1Desc: string;
  lcStep2Title: string;
  lcStep2Desc: string;
  lcStep3Title: string;
  lcStep3Desc: string;
  lcStep4Title: string;
  lcStep4Desc: string;

  // Supported Crops Section
  supportedCropsTitle: string;
  supportedCropsSubtitle: string;
  exploreFullLibrary: string;

  // Feature Cards
  cardDashboardTitle: string;
  cardDashboardDesc: string;
  cardRiskTitle: string;
  cardRiskDesc: string;
  cardModelTitle: string;
  cardModelDesc: string;

  // Core Scanner & Camera
  scanMyCrop: string;
  scanSubtitle: string;
  selectCropLabel: string;
  cropAll: string;
  cropRice: string;
  cropTomato: string;
  cropCotton: string;
  cropPotato: string;
  cropMaize: string;
  cropSoybean: string;
  cropSugarcane: string;
  cropOnion: string;
  cropPomegranate: string;
  cropChilli: string;
  cropWheat: string;

  dragDropText: string;
  browseFiles: string;
  cameraPreview: string;
  switchCamera: string;
  capturePhoto: string;
  retake: string;
  scanNow: string;
  uploadGallery: string;
  analyzeNow: string;
  analyzingText: string;
  imageStaged: string;
  multiStageAnalysis: string;
  stage1: string;
  stage2: string;
  stage3: string;
  stage4: string;
  stage5: string;
  stage6: string;
  stage7: string;
  cameraUnavailable: string;

  // Visual & Voice Guidance
  guidance1: string;
  guidance2: string;
  guidance3: string;
  voiceEnabled: string;
  voiceDisabled: string;
  voiceMoveCloser: string;
  voiceKeepInside: string;
  voiceCaptured: string;
  voiceUploaded: string;
  voiceRetake: string;
  voiceAnalyzing: string;
  voiceAnalysisComplete: string;

  // Quality Check
  qualityCheckTitle: string;
  qualityPass: string;
  qualityLow: string;
  sharpness: string;
  brightness: string;
  resolution: string;
  leafCoverage: string;
  retakePhotoBtn: string;
  proceedAnyway: string;

  // Result & XAI
  diagnosisTitle: string;
  cropDetected: string;
  condition: string;
  confidence: string;
  healthStatus: string;
  severityLevel: string;
  affectedArea: string;
  healthyArea: string;
  scientificName: string;
  statusHealthy: string;
  statusEarly: string;
  statusModerate: string;
  statusSevere: string;
  statusUnknown: string;
  statusAtRisk: string;

  // Explainable AI
  whyDetectedTitle: string;
  xaiExplanation: string;
  showHeatmap: string;
  showOriginal: string;
  gradcamDesc: string;

  // Severity Meter
  severityMeterTitle: string;
  severityActionUrgency: string;

  // Farmer Guidance
  guidanceTitle: string;
  whatDetected: string;
  whatSymptomsMean: string;
  whatToDoNow: string;
  preventSpread: string;
  whenSeekExpert: string;
  helplineBtn: string;

  // Low Confidence Flow
  lowConfidenceTitle: string;
  lowConfidenceMsg: string;
  tryAnotherImg: string;
  describeSymptomsBtn: string;
  requestExpertBtn: string;

  // Field Management & Map
  fieldsTitle: string;
  totalFields: string;
  recentScans: string;
  healthyCrops: string;
  atRiskCrops: string;
  activeAlerts: string;
  addNewField: string;
  fieldName: string;
  fieldLocation: string;
  fieldAcreage: string;
  fieldSowingDate: string;
  saveField: string;
  fieldHealthMap: string;
  filterByCrop: string;
  filterBySeverity: string;
  allSeverities: string;
  allCrops: string;

  // Disease Spread
  spreadTitle: string;
  spreadSubtitle: string;
  timelineDay1: string;
  timelineDay5: string;
  timelineDay10: string;
  timelineDay15: string;

  // Comparison Tool
  compareTitle: string;
  compareSubtitle: string;
  previousScan: string;
  latestScan: string;
  verdictImproved: string;
  verdictUnchanged: string;
  verdictWorsening: string;
  selectScanA: string;
  selectScanB: string;
  runComparison: string;

  // Symptom Assistant
  symptomTitle: string;
  symptomSubtitle: string;
  symptomQuestion: string;
  symptomSpots: string;
  symptomYellowing: string;
  symptomBrowning: string;
  symptomCurling: string;
  symptomWilting: string;
  symptomPowder: string;
  symptomHoles: string;
  symptomOther: string;
  evaluateSymptoms: string;

  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  noNotifications: string;
  newScanDone: string;
  riskIncreased: string;
  followUpRec: string;
  expertReviewDone: string;

  // Expert Portal
  expertPortalTitle: string;
  expertNotesPlaceholder: string;
  submitReview: string;
  reviewSubmitted: string;
  statusPending: string;
  statusUnderReview: string;
  statusReviewed: string;
  expertNotes: string;
  expertVerifyBtn: string;
  mlMetricsTitle: string;
  testAccuracy: string;
  macroF1: string;
  realFieldAcc: string;
  genGap: string;

  // Risk Radar
  riskTitle: string;
  riskSubtitle: string;
  riskLow: string;
  riskWatch: string;
  riskHigh: string;
  temp: string;
  humidity: string;
  rainfall: string;
  trapDensity: string;
  primaryCrop: string;
  elevatedNotice: string;
}

export const translations: Record<Language, TranslationSchema> = {
  // 1. English
  en: {
    appName: "AgriRakshak AI",
    tagline: "Early Crop Disease Detection & Field Intelligence",
    govtBadge: "SIH 2026 • AI Agricultural Protection",
    aiDisclaimer: "AI predictions are intended as an early screening aid and should not replace professional agricultural diagnosis.",
    kisanHelpline: "Kisan Helpline",

    tabHome: "Home",
    tabDetect: "Disease Detection",
    tabCropHealth: "Crop Health",
    tabRiskRadar: "Risk Monitor",
    tabFields: "Fields",
    tabHistory: "Scan History",
    tabLibrary: "Disease Library",
    tabLearn: "Learn",
    tabAbout: "About & Models",
    tabDashboard: "Dashboard",
    tabSpread: "Spread Timeline",
    tabCompare: "Compare Scans",
    tabSymptoms: "Symptom Guide",
    tabExpert: "Expert Review",
    btnAnalyzeCrop: "Analyze Crop",

    heroBadge: "AgriTech + Computer Vision Intelligence • 94.2% Verified Accuracy",
    heroHeadline: "Detect Crop Diseases Before They Spread.",
    heroSubheadline: "AI-powered crop health intelligence that helps identify early disease symptoms, assess risk, and support timely field decisions.",
    primaryCta: "Analyze a Crop",
    exploreCropHealth: "Explore Crop Health",
    exploreHowItWorks: "Explore How It Works",
    startHealthCheck: "Start Your Crop Health Check",
    howItWorksTitle: "How AgriRakshak Works",
    step1Title: "1. Capture",
    step1Desc: "Snap or upload a leaf photo using your phone or desktop camera.",
    step2Title: "2. Analyze",
    step2Desc: "Real-time AI verifies image quality and detects foliar abnormalities.",
    step3Title: "3. Understand",
    step3Desc: "Explore visual Explainable AI attention maps and affected area %.",
    step4Title: "4. Monitor",
    step4Desc: "Track disease spread over time across multiple fields and plots.",

    cvActive: "Computer Vision Active",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "Early Blight (94.2% AI Estimate)",
    targetSpot: "Target",
    lesionSpot: "Lesion",
    affectedHud: "Affected: 18% • Score: 78/100",
    stepPhoto: "📷 Photo",
    stepAIVision: "🧠 AI Vision",
    stepDetection: "🔍 Detection",
    stepScore: "📊 Score (78)",
    stepWarning: "⚠️ Warning",

    lifecycleBadge: "End-to-End AgriTech Architecture",
    lifecycleTitle: "The Complete Crop Health Lifecycle",
    lifecycleSubtitle: "From single-leaf image capture to continuous farm-wide disease monitoring.",
    lcStep1Title: "1. Capture & Quality Check",
    lcStep1Desc: "Camera or upload with pre-scan blur, brightness, and leaf coverage validation.",
    lcStep2Title: "2. Neural Disease Screening",
    lcStep2Desc: "Calibrated multi-class classification with Grad-CAM visual attention heatmaps.",
    lcStep3Title: "3. Severity & Health Score",
    lcStep3Desc: "Foliar affected area measurement and modular Crop Health Score (0-100).",
    lcStep4Title: "4. Risk Tracking & Advisory",
    lcStep4Desc: "Agro-climatic risk forecasting, safe IPM next steps, and historical scan comparison.",

    supportedCropsTitle: "Supported Agricultural Crops & Major Pathogens",
    supportedCropsSubtitle: "Trained on validated field datasets with >90% accuracy standards.",
    exploreFullLibrary: "Explore Full Disease Library",

    cardDashboardTitle: "Crop Health Dashboard",
    cardDashboardDesc: "Track foliar health trends, monitor active field plots, and view disease occurrence charts.",
    cardRiskTitle: "Agro-Climatic Risk Monitor",
    cardRiskDesc: "Real-time humidity, temperature, and spore incubation forecasts across regional crop clusters.",
    cardModelTitle: "Dataset & Model Quality Gate",
    cardModelDesc: "Inspect model evaluation metrics (94.25% test accuracy), open dataset sources, and trust standards.",

    scanMyCrop: "Scan Your Crop",
    scanSubtitle: "Point camera or upload a clear leaf image to detect early disease signs.",
    selectCropLabel: "Select Crop (Optional / Auto-detect):",
    cropAll: "All / Auto-Detect",
    cropRice: "Rice",
    cropTomato: "Tomato",
    cropCotton: "Cotton",
    cropPotato: "Potato",
    cropMaize: "Maize",
    cropSoybean: "Soybean",
    cropSugarcane: "Sugarcane",
    cropOnion: "Onion",
    cropPomegranate: "Pomegranate",
    cropChilli: "Chilli",
    cropWheat: "Wheat",

    dragDropText: "Drag & drop leaf image here, or",
    browseFiles: "Browse Files",
    cameraPreview: "Live Camera Viewfinder",
    switchCamera: "Switch Camera",
    capturePhoto: "Capture Leaf Photo",
    retake: "Retake Photo",
    scanNow: "Scan Crop Leaf",
    uploadGallery: "Upload from Gallery",
    analyzeNow: "Analyze Crop Health",
    analyzingText: "Analyzing Leaf with Vision AI...",
    imageStaged: "Image Staged",
    multiStageAnalysis: "AI Multi-Stage Crop Health Analysis",
    stage1: "Stage 01/07 — Normalizing and preprocessing foliar image...",
    stage2: "Stage 02/07 — Verifying crop identity and leaf boundaries...",
    stage3: "Stage 03/07 — Examining foliar discoloration & symptom patterns...",
    stage4: "Stage 04/07 — Matching neural embeddings with disease classes...",
    stage5: "Stage 05/07 — Estimating lesion severity & affected foliar area %...",
    stage6: "Stage 06/07 — Calculating agro-climatic disease risk & score...",
    stage7: "Stage 07/07 — Formulating safe IPM recommendations & advisory...",
    cameraUnavailable: "Camera access is unavailable. Please check permissions or upload an image instead.",

    guidance1: "Place one clear leaf inside the frame",
    guidance2: "Ensure good natural lighting",
    guidance3: "Avoid blurry or shaky images",

    voiceEnabled: "Voice Guidance ON",
    voiceDisabled: "Voice Guidance OFF",
    voiceMoveCloser: "Move the camera closer to the leaf surface.",
    voiceKeepInside: "Keep the leaf inside the frame and steady.",
    voiceCaptured: "Leaf image captured successfully. Ready for AI disease analysis.",
    voiceUploaded: "Leaf image uploaded successfully. Ready for AI disease analysis.",
    voiceRetake: "Image quality is low. Please retake photo with better lighting.",
    voiceAnalyzing: "Analyzing leaf image with Vision AI...",
    voiceAnalysisComplete: "Analysis complete. Crop health results are ready.",

    qualityCheckTitle: "Automated Pre-Scan Quality Check",
    qualityPass: "Image quality is optimal for reliable detection.",
    qualityLow: "Image quality is too low for reliable detection.",
    sharpness: "Sharpness",
    brightness: "Lighting",
    resolution: "Resolution",
    leafCoverage: "Leaf Presence",
    retakePhotoBtn: "Retake Photo",
    proceedAnyway: "Proceed with Analysis",

    diagnosisTitle: "Disease Detection Results",
    cropDetected: "Crop Detected",
    condition: "Condition Detected",
    confidence: "Confidence",
    healthStatus: "Crop Health",
    severityLevel: "Severity Level",
    affectedArea: "Affected Leaf Area",
    healthyArea: "Healthy Leaf Area",
    scientificName: "Scientific Pathogen",
    statusHealthy: "Healthy",
    statusEarly: "Early Signs",
    statusModerate: "Moderate",
    statusSevere: "Severe",
    statusUnknown: "Unknown / Needs Review",
    statusAtRisk: "At Risk",

    whyDetectedTitle: "Why was this detected?",
    xaiExplanation: "AI identified visual patterns in the highlighted leaf regions that are associated with this condition.",
    showHeatmap: "AI Attention Heatmap (Grad-CAM)",
    showOriginal: "Original Leaf Photo",
    gradcamDesc: "Highlighted heatmap zones show visual attention that influenced the AI prediction.",

    severityMeterTitle: "Disease Severity Meter",
    severityActionUrgency: "Recommended Urgency",

    guidanceTitle: "Actionable Prevention & Care Guidance",
    whatDetected: "What Was Detected",
    whatSymptomsMean: "What These Symptoms Mean",
    whatToDoNow: "What To Do Right Now",
    preventSpread: "How To Prevent Further Spread",
    whenSeekExpert: "When To Seek Agronomist Help",
    helplineBtn: "Call Kisan Helpline (1800-180-1551)",

    lowConfidenceTitle: "Uncertain AI Prediction",
    lowConfidenceMsg: "AI could not identify this condition reliably. Please use safe alternatives below:",
    tryAnotherImg: "Try Another Image",
    describeSymptomsBtn: "Describe Symptoms",
    requestExpertBtn: "Request Expert Review",

    fieldsTitle: "Field Management",
    totalFields: "Total Fields",
    recentScans: "Recent Scans",
    healthyCrops: "Healthy Crops",
    atRiskCrops: "At-Risk Crops",
    activeAlerts: "Active Disease Alerts",
    addNewField: "+ Add New Field",
    fieldName: "Field Name",
    fieldLocation: "Location",
    fieldAcreage: "Acreage (Acres)",
    fieldSowingDate: "Sowing Date",
    saveField: "Save Field",
    fieldHealthMap: "Interactive Field Health Map",
    filterByCrop: "Filter by Crop",
    filterBySeverity: "Filter by Severity",
    allSeverities: "All Severities",
    allCrops: "All Crops",

    spreadTitle: "Disease Spread Tracking",
    spreadSubtitle: "Monitor how foliar lesion area evolves across inspection timeline (Day 1 - Day 15).",
    timelineDay1: "Day 1 (Inception)",
    timelineDay5: "Day 5 (Early Spread)",
    timelineDay10: "Day 10 (Progression)",
    timelineDay15: "Day 15 (Current State)",

    compareTitle: "Image-to-Image Health Comparison",
    compareSubtitle: "Compare previous scan with latest scan to measure treatment effectiveness.",
    previousScan: "Previous Scan",
    latestScan: "Latest Scan",
    verdictImproved: "Health improved",
    verdictUnchanged: "Health unchanged",
    verdictWorsening: "Condition may be worsening",
    selectScanA: "Select Baseline Scan",
    selectScanB: "Select Recent Scan",
    runComparison: "Run Delta Comparison",

    symptomTitle: "Guided Symptom Assistant",
    symptomSubtitle: "Answer simple visual questions to assist AI identification.",
    symptomQuestion: "What visible patterns do you observe on the leaf?",
    symptomSpots: "Spots (Brown/Black/Yellow)",
    symptomYellowing: "Yellowing (Chlorosis)",
    symptomBrowning: "Browning / Necrosis",
    symptomCurling: "Curling / Wrinkling",
    symptomWilting: "Wilting / Drooping",
    symptomPowder: "Powder-like Surface",
    symptomHoles: "Chewed Holes / Tunnels",
    symptomOther: "Other Abnormalities",
    evaluateSymptoms: "Evaluate Symptoms",

    notificationsTitle: "Notification Center",
    markAllRead: "Mark all as read",
    noNotifications: "No new notifications",
    newScanDone: "New scan completed successfully",
    riskIncreased: "Disease risk increased in Field 02",
    followUpRec: "Follow-up scan recommended in 3 days",
    expertReviewDone: "Expert review completed for Scan #SC-4821",

    expertPortalTitle: "Request Agricultural Expert Review",
    expertNotesPlaceholder: "Describe observed field conditions, fertilizer/spray history, or specific concerns...",
    submitReview: "Submit for Agronomist Review",
    reviewSubmitted: "Request submitted to certified agronomists.",
    statusPending: "Pending",
    statusUnderReview: "Under Review",
    statusReviewed: "Reviewed & Certified",
    expertNotes: "Agronomist Field Notes",
    expertVerifyBtn: "Verify & Certify as Level 4",
    mlMetricsTitle: "ML Model Quality Gate (90%+ Target)",
    testAccuracy: "Test Accuracy",
    macroF1: "Macro F1-Score",
    realFieldAcc: "Real Field Accuracy",
    genGap: "Generalization Gap",

    riskTitle: "Agro-Climatic Disease Risk Radar",
    riskSubtitle: "Early warning environmental indicators & pathogen sporulation vulnerability.",
    riskLow: "LOW RISK",
    riskWatch: "WATCH / ELEVATED",
    riskHigh: "HIGH RISK",
    temp: "Temperature",
    humidity: "Relative Humidity",
    rainfall: "Rainfall",
    trapDensity: "Pest Trap Density",
    primaryCrop: "Major Crop",
    elevatedNotice: "Elevated risk detected. Monitor your crops closely.",
  },

  // 2. Tamil (தமிழ்)
  ta: {
    appName: "அக்ரி ரக்ஷக் AI (AgriRakshak)",
    tagline: "ஆரம்ப கட்ட பயிர் நோய் கண்டறிதல் & பண்ணை நுண்ணறிவு",
    govtBadge: "SIH 2026 • AI பயிர் பாதுகாப்பு தளம்",
    aiDisclaimer: "AI கணிப்புகள் ஆரம்பகால பரிசோதனை உதவிக்காக மட்டுமே. இது விவசாய நிபுணர் ஆலோசனையை மாற்றாது.",
    kisanHelpline: "விவசாயிகள் உதவி எண் (கிசான்)",

    tabHome: "முகப்பு",
    tabDetect: "நோய் கண்டறிதல்",
    tabCropHealth: "பயிர் நலம்",
    tabRiskRadar: "ஆபத்து ரேடார்",
    tabFields: "வயல்வெளிகள்",
    tabHistory: "ஸ்கேன் வரலாறு",
    tabLibrary: "நோய் களஞ்சியம்",
    tabLearn: "கற்றுக்கொள்ளுங்கள்",
    tabAbout: "விவரக்குறிப்பு & மாதிரிகள்",
    tabDashboard: "டாஷ்போர்டு",
    tabSpread: "நோய் பரவல் காலக்கோடு",
    tabCompare: "ஸ்கேன் ஒப்பீடு",
    tabSymptoms: "அறிகுறி வழிகாட்டி",
    tabExpert: "நிபுணர் ஆய்வு",
    btnAnalyzeCrop: "பயிரை பரிசோதிக்கவும்",

    heroBadge: "அக்ரிடெக் + கணினி பார்வை நுண்ணறிவு • 94.2% சரிபார்க்கப்பட்ட துல்லியம்",
    heroHeadline: "பயிர் நோய்கள் பரவுவதற்கு முன்பே கண்டறியுங்கள்.",
    heroSubheadline: "ஆரம்பகால நோய் அறிகுறிகளை அடையாளம் காணவும், ஆபத்தை மதிப்பிடவும், சரியான நேரத்தில் கள முடிவுகளை எடுக்கவும் உதவும் AI பயிர் நலம் நுண்ணறிவு.",
    primaryCta: "பயிரை பரிசோதிக்கவும்",
    exploreCropHealth: "பயிர் நலத்தை ஆராய்க",
    exploreHowItWorks: "இது எவ்வாறு செயல்படுகிறது",
    startHealthCheck: "பயிர் நல பரிசோதனையைத் தொடங்குங்கள்",
    howItWorksTitle: "அக்ரி ரக்ஷக் செயல்படும் முறை",
    step1Title: "1. புகைப்படம் எடுக்கவும்",
    step1Desc: "உங்கள் மொபைல் அல்லது கேமரா மூலம் பாதிக்கப்பட்ட இலையை படம் பிடிக்கவும்.",
    step2Title: "2. AI பகுப்பாய்வு",
    step2Desc: "AI உடனடியாக படத்தின் தரத்தை சரிபார்த்து துல்லியமான நோயைக் கண்டறியும்.",
    step3Title: "3. காரணத்தைப் புரிந்து கொள்ளுங்கள்",
    step3Desc: "Explainable AI ஹீட்மேப் மூலம் நோயின் தாக்கம் மற்றும் பாதிக்கப்பட்ட பரப்பளவைக் காணுங்கள்.",
    step4Title: "4. தொடர்ந்து கண்காணியுங்கள்",
    step4Desc: "பல்வேறு வயல்களில் பயிர் நலம் மற்றும் நோய் பரவலை காலப்போக்கில் கண்காணிக்கவும்.",

    cvActive: "கணினி பார்வை இயங்குகிறது",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "ஆரம்ப கருகல் (94.2% AI கணிப்பு)",
    targetSpot: "இலக்கு",
    lesionSpot: "புண் / புள்ளி",
    affectedHud: "பாதிப்பு: 18% • மதிப்பெண்: 78/100",
    stepPhoto: "📷 புகைப்படம்",
    stepAIVision: "🧠 AI பார்வை",
    stepDetection: "🔍 கண்டறிதல்",
    stepScore: "📊 மதிப்பெண் (78)",
    stepWarning: "⚠️ எச்சரிக்கை",

    lifecycleBadge: "முழுமையான அக்ரிடெக் கட்டமைப்பு",
    lifecycleTitle: "முழுமையான பயிர் நலம் சுழற்சி",
    lifecycleSubtitle: "ஒற்றை இலை புகைப்படம் எடுப்பதில் இருந்து தொடர்ச்சியான பண்ணை நோய் கண்காணிப்பு வரை.",
    lcStep1Title: "1. புகைப்படம் & தர சோதனை",
    lcStep1Desc: "மங்கலான நிலை, வெளிச்சம் மற்றும் இலை பரப்பளவை முன்கூட்டியே சரிபார்த்தல்.",
    lcStep2Title: "2. நரம்பியல் நோய் பரிசோதனை",
    lcStep2Desc: "Grad-CAM காட்சி வெப்ப வரைபடங்களுடன் துல்லியமான பல-வகுப்பு வகைப்பாடு.",
    lcStep3Title: "3. தீவிரம் & நலம் மதிப்பெண்",
    lcStep3Desc: "இலை பாதிக்கப்பட்ட பரப்பளவு அளவீடு மற்றும் மட்டு பயிர் நலம் மதிப்பெண் (0-100).",
    lcStep4Title: "4. ஆபத்து கண்காணிப்பு & ஆலோசனை",
    lcStep4Desc: "காலநிலை ஆபத்து கணிப்பு, பாதுகாப்பான IPM வழிகாட்டுதல் மற்றும் வரலாற்று ஒப்பீடு.",

    supportedCropsTitle: "ஆதரிக்கப்படும் வேளாண் பயிர்கள் & முக்கிய நோய்கள்",
    supportedCropsSubtitle: ">90% துல்லிய தரநிலைகளுடன் சரிபார்க்கப்பட்ட கள தரவுகளில் பயிற்சியளிக்கப்பட்டது.",
    exploreFullLibrary: "முழு நோய் களஞ்சியத்தை ஆராய்க",

    cardDashboardTitle: "பயிர் நலம் டாஷ்போர்டு",
    cardDashboardDesc: "இலை நலம் போக்குகளைக் கண்காணிக்கவும், வயல் அடுக்குகளைப் பார்க்கவும், நோய் நிகழ்வு விளக்கப்படங்களை ஆராயவும்.",
    cardRiskTitle: "வேளாண்-காலநிலை ஆபத்து கண்காணிப்பு",
    cardRiskDesc: "பிராந்திய பயிர் குழுக்களில் நிகழ்நேர ஈரப்பதம், வெப்பநிலை மற்றும் வித்து அடைப்பு முன்னறிவிப்பு.",
    cardModelTitle: "தரவுத்தொகுப்பு & மாதிரி தர வாயில்",
    cardModelDesc: "மாதிரி மதிப்பீட்டு அளவீடுகள் (94.25% சோதனை துல்லியம்) மற்றும் திறந்த தரவு மூலங்களை ஆய்வு செய்யவும்.",

    scanMyCrop: "பயிரை ஸ்கேன் செய்யவும்",
    scanSubtitle: "நோய்களை முன்கூட்டியே கண்டறிய கேமராவை இலையின் மீது பிடிக்கவும் அல்லது படத்தை பதிவேற்றவும்.",
    selectCropLabel: "பயிரைத் தேர்ந்தெடுக்கவும் (விருப்பத்தேர்வு):",
    cropAll: "அனைத்தும் / தானியங்கி கண்டறிதல்",
    cropRice: "நெல் (Rice)",
    cropTomato: "தக்காளி (Tomato)",
    cropCotton: "பருத்தி (Cotton)",
    cropPotato: "உருளைக்கிழங்கு (Potato)",
    cropMaize: "மக்காச்சோளம் (Maize)",
    cropSoybean: "சோயாபீன் (Soybean)",
    cropSugarcane: "கரும்பு (Sugarcane)",
    cropOnion: "வெங்காயம் (Onion)",
    cropPomegranate: "மாதுளை (Pomegranate)",
    cropChilli: "மிளகாய் (Chilli)",
    cropWheat: "கோதுமை (Wheat)",

    dragDropText: "இலை படத்தை இங்கே இழுத்து விடவும், அல்லது",
    browseFiles: "கோப்புகளைத் தேர்ந்தெடுக்கவும்",
    cameraPreview: "நேரடி கேமரா காட்சி",
    switchCamera: "கேமராவை மாற்றவும்",
    capturePhoto: "புகைப்படம் எடுக்கவும்",
    retake: "மீண்டும் எடுக்கவும்",
    scanNow: "இலையை ஸ்கேன் செய்யவும்",
    uploadGallery: "கேலரியில் இருந்து பதிவேற்றவும்",
    analyzeNow: "பயிர் நலத்தை ஆராயவும்",
    analyzingText: "விஷன் AI மூலம் இலை பரிசோதிக்கப்படுகிறது...",
    imageStaged: "படம் தயாராக உள்ளது",
    multiStageAnalysis: "AI பல-நிலை பயிர் நலம் பகுப்பாய்வு",
    stage1: "நிலை 01/07 — இலை படத்தை சமநிலைப்படுத்துதல் மற்றும் முன்கூட்டிய செயலாக்கம்...",
    stage2: "நிலை 02/07 — பயிர் அடையாளம் மற்றும் இலை எல்லைகளை சரிபார்த்தல்...",
    stage3: "நிலை 03/07 — இலை நிறமாற்றம் மற்றும் அறிகுறிகளை ஆய்வு செய்தல்...",
    stage4: "நிலை 04/07 — நரம்பியல் பதிவுகளை நோய் வகைகளுடன் பொருத்துதல்...",
    stage5: "நிலை 05/07 — புண் தீவிரம் மற்றும் பாதிக்கப்பட்ட இலை பரப்பளவை கணக்கிடுதல்...",
    stage6: "நிலை 06/07 — வேளாண்-காலநிலை நோய் ஆபத்து மற்றும் மதிப்பெண்ணைக் கணக்கிடுதல்...",
    stage7: "நிலை 07/07 — பாதுகாப்பான IPM பரிந்துரைகள் மற்றும் ஆலோசனைகளை உருவாக்குதல்...",
    cameraUnavailable: "கேமரா அணுகல் கிடைக்கவில்லை. அனுமதிகளை சரிபார்க்கவும் அல்லது படத்தை பதிவேற்றவும்.",

    guidance1: "சட்டகத்திற்குள் ஒரு தெளிவான இலையை வைக்கவும்",
    guidance2: "நல்ல இயற்கை வெளிச்சம் இருப்பதை உறுதிப்படுத்தவும்",
    guidance3: "மங்கலான அல்லது அசைந்த படங்களைத் தவிர்க்கவும்",

    voiceEnabled: "குரல் வழிகாட்டுதல் ஆன்",
    voiceDisabled: "குரல் வழிகாட்டுதல் ஆஃப்",
    voiceMoveCloser: "கேமராவை இலையின் மேற்பரப்பிற்கு அருகில் கொண்டு செல்லவும்.",
    voiceKeepInside: "இலையை சட்டகத்திற்குள் அசையாமல் நேராக வைக்கவும்.",
    voiceCaptured: "இலை படம் வெற்றிகரமாக எடுக்கப்பட்டது. AI நோய் பரிசோதனைக்கு தயார்.",
    voiceUploaded: "இலை படம் வெற்றிகரமாக பதிவேற்றப்பட்டது. AI நோய் பரிசோதனைக்கு தயார்.",
    voiceRetake: "படத்தின் தரம் குறைவாக உள்ளது. சிறந்த வெளிச்சத்தில் மீண்டும் எடுக்கவும்.",
    voiceAnalyzing: "விஷன் AI மூலம் இலை படம் பரிசோதிக்கப்படுகிறது...",
    voiceAnalysisComplete: "பரிசோதனை முடிந்தது. பயிர் நலம் முடிவுகள் தயாராக உள்ளன.",

    qualityCheckTitle: "தானியங்கி முன்-ஸ்கேன் தர சோதனை",
    qualityPass: "நம்பகமான கண்டறிதலுக்கு படத்தின் தரம் உகந்ததாக உள்ளது.",
    qualityLow: "நம்பகமான கண்டறிதலுக்கு படத்தின் தரம் மிகக் குறைவாக உள்ளது.",
    sharpness: "தெளிவுத்திறன்",
    brightness: "வெளிச்சம்",
    resolution: "பிக்சல் தரம்",
    leafCoverage: "இலை இருப்பு",
    retakePhotoBtn: "மீண்டும் படம் எடுக்கவும்",
    proceedAnyway: "இருப்பினும் தொடரவும்",

    diagnosisTitle: "நோய் கண்டறிதல் முடிவுகள்",
    cropDetected: "கண்டறியப்பட்ட பயிர்",
    condition: "கண்டறியப்பட்ட நோய் / நிலை",
    confidence: "துல்லிய நம்பிக்கை",
    healthStatus: "பயிர் நலம்",
    severityLevel: "தீவிர நிலை",
    affectedArea: "பாதிக்கப்பட்ட இலை பரப்பளவு",
    healthyArea: "ஆரோக்கியமான பகுதி",
    scientificName: "அறிவியல் நோய்க்கிருமி பெயர்",
    statusHealthy: "ஆரோக்கியமானது",
    statusEarly: "ஆரம்ப அறிகுறிகள்",
    statusModerate: "மிதமான பாதிப்பு",
    statusSevere: "கடுமையான பாதிப்பு",
    statusUnknown: "தெரியவில்லை / ஆய்வு தேவை",
    statusAtRisk: "ஆபத்தில் உள்ளது",

    whyDetectedTitle: "இது ஏன் கண்டறியப்பட்டது?",
    xaiExplanation: "ஹைலைட் செய்யப்பட்ட இலை பகுதிகளில் உள்ள அறிகுறிகள் மற்றும் வடிவங்களின் அடிப்படையில் AI இந்த முடிவை எடுத்துள்ளது.",
    showHeatmap: "AI கவனம் ஹீட்மேப் (Grad-CAM)",
    showOriginal: "அசல் இலை புகைப்படம்",
    gradcamDesc: "வண்ண வரைபடத்தில் காட்டப்பட்டுள்ள பகுதிகள் AI நோயை தீர்மானிக்க பெரிதும் உதவியுள்ளன.",

    severityMeterTitle: "நோய் தீவிரத்தன்மை மீட்டர்",
    severityActionUrgency: "பரிந்துரைக்கப்பட்ட அவசரம்",

    guidanceTitle: "செயல்படக்கூடிய தடுப்பு மற்றும் பராமரிப்பு வழிகாட்டுதல்",
    whatDetected: "என்ன கண்டறியப்பட்டது",
    whatSymptomsMean: "இந்த அறிகுறிகளின் அர்த்தம் என்ன",
    whatToDoNow: "இப்போது என்ன செய்ய வேண்டும்",
    preventSpread: "மேலும் பரவுவதை எவ்வாறு தடுப்பது",
    whenSeekExpert: "விவசாய நிபுணரை எப்போது அணுக வேண்டும்",
    helplineBtn: "கிசான் உதவி எண் (1800-180-1551)",

    lowConfidenceTitle: "நிச்சயமற்ற AI கணிப்பு",
    lowConfidenceMsg: "AI இந்த நிலையை உறுதியாக அடையாளம் காண முடியவில்லை. தயவுசெய்து மாற்று வழிகளைப் பயன்படுத்தவும்:",
    tryAnotherImg: "வேறொரு படத்தை முயற்சிக்கவும்",
    describeSymptomsBtn: "அறிகுறிகளை விவரிக்கவும்",
    requestExpertBtn: "நிபுணர் மறுஆய்வைக் கோரவும்",

    fieldsTitle: "வயல்வெளி மேலாண்மை",
    totalFields: "மொத்த வயல்கள்",
    recentScans: "சமீபத்திய ஸ்கேன்கள்",
    healthyCrops: "ஆரோக்கியமான பயிர்கள்",
    atRiskCrops: "ஆபத்தில் உள்ள பயிர்கள்",
    activeAlerts: "செயலில் உள்ள எச்சரிக்கைகள்",
    addNewField: "+ புதிய வயலைச் சேர்க்கவும்",
    fieldName: "வயலின் பெயர்",
    fieldLocation: "இடம் / கிராமம்",
    fieldAcreage: "பரப்பளவு (ஏக்கர்)",
    fieldSowingDate: "விதைத்த தேதி",
    saveField: "வயலைச் சேமிக்கவும்",
    fieldHealthMap: "ஊடாடும் வயல் நலம் வரைபடம்",
    filterByCrop: "பயிர் வாரியாக வடிகட்டவும்",
    filterBySeverity: "தீவிரம் வாரியாக வடிகட்டவும்",
    allSeverities: "அனைத்து தீவிர நிலைகளும்",
    allCrops: "அனைத்து பயிர்களும்",

    spreadTitle: "நோய் பரவல் கண்காணிப்பு",
    spreadSubtitle: "காலப்போக்கில் (நாள் 1 முதல் 15 வரை) இலையில் நோய் பரவல் எவ்வாறு மாறியது என்பதை கண்காணிக்கவும்.",
    timelineDay1: "நாள் 1 (துவக்கம்)",
    timelineDay5: "நாள் 5 (ஆரம்ப பரவல்)",
    timelineDay10: "நாள் 10 (தீவிரம்)",
    timelineDay15: "நாள் 15 (தற்போதைய நிலை)",

    compareTitle: "படங்களுக்கு இடையேயான நலம் ஒப்பீடு",
    compareSubtitle: "சிகிச்சையின் பலனை அளவிட முந்தைய ஸ்கேனையும் புதிய ஸ்கேனையும் ஒப்பிடவும்.",
    previousScan: "முந்தைய ஸ்கேன்",
    latestScan: "சமீபத்திய ஸ்கேன்",
    verdictImproved: "ஆரோக்கியம் மேம்பட்டுள்ளது",
    verdictUnchanged: "மாற்றமில்லை",
    verdictWorsening: "நிலை மோசமடைய வாய்ப்புள்ளது",
    selectScanA: "அடிப்படை ஸ்கேனைத் தேர்ந்தெடுக்கவும்",
    selectScanB: "சமீபத்திய ஸ்கேனைத் தேர்ந்தெடுக்கவும்",
    runComparison: "ஒப்பீட்டை இயக்கவும்",

    symptomTitle: "வழிகாட்டப்பட்ட அறிகுறி உதவியாளர்",
    symptomSubtitle: "துல்லியமான முடிவுக்கு எளிய காட்சி கேள்விகளுக்கு பதிலளிக்கவும்.",
    symptomQuestion: "இலையில் நீங்கள் என்ன புலப்படும் வடிவங்களைக் காண்கிறீர்கள்?",
    symptomSpots: "புள்ளிகள் (பழுப்பு/கருப்பு/மஞ்சள்)",
    symptomYellowing: "மஞ்சளாதல் (குளோரோசிஸ்)",
    symptomBrowning: "பழுப்பாதல் / கருகல்",
    symptomCurling: "சுருங்குதல் / மடிதல்",
    symptomWilting: "வாடுதல் / தொங்குதல்",
    symptomPowder: "சாம்பல் அல்லது மாவு போன்ற படிவு",
    symptomHoles: "பூச்சிகளால் உண்ணப்பட்ட துளைகள்",
    symptomOther: "பிற அசாதாரண அறிகுறிகள்",
    evaluateSymptoms: "அறிகுறிகளை மதிப்பிடவும்",

    notificationsTitle: "அறிவிப்பு மையம்",
    markAllRead: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    noNotifications: "புதிய அறிவிப்புகள் இல்லை",
    newScanDone: "புதிய ஸ்கேன் வெற்றிகரமாக முடிந்தது",
    riskIncreased: "வயல் 02 இல் நோய் ஆபத்து அதிகரித்துள்ளது",
    followUpRec: "3 நாட்களில் மறு ஸ்கேன் செய்ய பரிந்துரைக்கப்படுகிறது",
    expertReviewDone: "ஸ்கேன் #SC-4821 க்கான நிபுணர் ஆய்வு முடிந்தது",

    expertPortalTitle: "வேளாண் நிபுணர் மறுஆய்வு கோரிக்கை",
    expertNotesPlaceholder: "வயல் நிலவரம், உரம் அல்லது பூச்சிக்கொல்லி தெளிப்பு வரலாறு குறித்து குறிப்பிடவும்...",
    submitReview: "நிபுணர் ஆய்வுக்கு அனுப்பவும்",
    reviewSubmitted: "கோரிக்கை சான்றளிக்கப்பட்ட விவசாய நிபுணர்களுக்கு அனுப்பப்பட்டது.",
    statusPending: "நிலுவையில் உள்ளது",
    statusUnderReview: "ஆய்வில் உள்ளது",
    statusReviewed: "மதிப்பாய்வு செய்யப்பட்டு சான்றளிக்கப்பட்டது",
    expertNotes: "விவசாய நிபுணர் களக் குறிப்புகள்",
    expertVerifyBtn: "நிலை 4 ஆக சரிபார்த்து சான்றளிக்கவும்",
    mlMetricsTitle: "ML மாதிரி தர வாயில் (90%+ இலக்கு)",
    testAccuracy: "சோதனை துல்லியம் (Test Accuracy)",
    macroF1: "Macro F1-Score",
    realFieldAcc: "உண்மையான கள துல்லியம்",
    genGap: "Generalization Gap",

    riskTitle: "வேளாண்-காலநிலை நோய் ஆபத்து ரேடார்",
    riskSubtitle: "சுற்றுச்சூழல் குறிகாட்டிகள் மற்றும் பூஞ்சை நோய் பரவல் ஆபத்து மீட்டர்.",
    riskLow: "குறைந்த ஆபத்து",
    riskWatch: "கண்காணிப்பு / நடுத்தர ஆபத்து",
    riskHigh: "அதிக ஆபத்து",
    temp: "வெப்பநிலை",
    humidity: "ஒப்பீட்டு ஈரப்பதம்",
    rainfall: "மழைப்பொழிவு",
    trapDensity: "பொறி அடர்த்தி",
    primaryCrop: "முக்கிய பயிர்",
    elevatedNotice: "அதிக ஆபத்து கண்டறியப்பட்டது. உங்கள் பயிர்களை உன்னிப்பாகக் கண்காணிக்கவும்.",
  },

  // 3. Telugu (తెలుగు)
  te: {
    appName: "అగ్రిరక్షక్ AI (AgriRakshak)",
    tagline: "ముందస్తు పంట వ్యాధి గుర్తింపు & క్షేత్ర నిఘా",
    govtBadge: "SIH 2026 • AI వ్యవసాయ రక్షణ వేదిక",
    aiDisclaimer: "AI అంచనాలు ప్రాథమిక స్క్రీనింగ్ సహాయం కోసం మాత్రమే మరియు నిపుణుల వ్యవసాయ నిర్ధారణను భర్తీ చేయలేవు.",
    kisanHelpline: "కిసాన్ హెల్ప్‌లైన్",

    tabHome: "హోమ్",
    tabDetect: "వ్యాధి గుర్తింపు",
    tabCropHealth: "పంట ఆరోగ్యం",
    tabRiskRadar: "రిస్క్ మానిటర్",
    tabFields: "పొలాలు",
    tabHistory: "స్కాన్ చరిత్ర",
    tabLibrary: "వ్యాధి లైబ్రరీ",
    tabLearn: "నేర్చుకోండి",
    tabAbout: "గురించి & మోడల్స్",
    tabDashboard: "డ్యాష్‌బోర్డ్",
    tabSpread: "వ్యాప్తి టైమ్‌లైన్",
    tabCompare: "స్కాన్ల పోలిక",
    tabSymptoms: "లక్షణాల గైడ్",
    tabExpert: "నిపుణుల సమీక్ష",
    btnAnalyzeCrop: "పంటను విశ్లేషించండి",

    heroBadge: "అగ్రిటెక్ + కంప్యూటర్ విజన్ ఇంటెలిజెన్స్ • 94.2% ధృవీకరించబడిన ఖచ్చితత్వం",
    heroHeadline: "పంట వ్యాధులు వ్యాపించకముందే గుర్తించండి.",
    heroSubheadline: "ముందస్తు వ్యాధి లక్షణాలను గుర్తించడం, నష్ట తీవ్రతను అంచనా వేయడం మరియు సమయానుకూల నిర్ణయాలకు సహాయపడే AI పంట ఆరోగ్య సాంకేతికత.",
    primaryCta: "పంటను స్కాన్ చేయండి",
    exploreCropHealth: "పంట ఆరోగ్యాన్ని పరిశీలించండి",
    exploreHowItWorks: "ఇది ఎలా పనిచేస్తుందో చూడండి",
    startHealthCheck: "పంట ఆరోగ్య పరీక్ష ప్రారంభించండి",
    howItWorksTitle: "అగ్రిరక్షక్ ఎలా పనిచేస్తుంది",
    step1Title: "1. ఫోటో తీయండి",
    step1Desc: "ఫోన్ లేదా కెమెరాతో తెగులు సోకిన ఆకు స్పష్టమైన ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.",
    step2Title: "2. AI విశ్లేషణ",
    step2Desc: "AI ఫోటో నాణ్యతను తనిఖీ చేసి ఖచ్చితమైన వ్యాధిని తక్షణమే గుర్తిస్తుంది.",
    step3Title: "3. కారణాన్ని అర్థం చేసుకోండి",
    step3Desc: "Explainable AI హీట్‌మ్యాప్ ద్వారా ఆకుపై తెగులు తీవ్రతను వివరంగా చూడండి.",
    step4Title: "4. పర్యవేక్షించండి",
    step4Desc: "కాలక్రమేణా వివిధ పొలాల్లో వ్యాధి వ్యాప్తిని మరియు పంట ఆరోగ్యాన్ని ట్రాక్ చేయండి.",

    cvActive: "కంప్యూటర్ విజన్ సక్రియంగా ఉంది",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "ముందస్తు తెగులు (94.2% AI అంచనా)",
    targetSpot: "లక్ష్యం",
    lesionSpot: "మచ్చ / గాయం",
    affectedHud: "నష్టం: 18% • స్కోర్: 78/100",
    stepPhoto: "📷 ఫోటో",
    stepAIVision: "🧠 AI విజన్",
    stepDetection: "🔍 గుర్తింపు",
    stepScore: "📊 స్కోరు (78)",
    stepWarning: "⚠️ హెచ్చరిక",

    lifecycleBadge: "సంపూర్ణ అగ్రిటెక్ ఆర్కిటెక్చర్",
    lifecycleTitle: "సంపూర్ణ పంట ఆరోగ్య చక్రం",
    lifecycleSubtitle: "ఒకే ఆకు ఫోటో తీయడం నుండి నిరంతర క్షేత్ర వ్యాధి పర్యవేక్షణ వరకు.",
    lcStep1Title: "1. ఫోటో తీయడం & నాణ్యత తనిఖీ",
    lcStep1Desc: "బ్లర్, కాంతి మరియు ఆకు విస్తీర్ణాన్ని ముందుగానే స్వయంచాలకంగా తనిఖీ చేయడం.",
    lcStep2Title: "2. న్యూరల్ వ్యాధి స్క్రీనింగ్",
    lcStep2Desc: "Grad-CAM విజువల్ అటెన్షన్ హీట్‌మ్యాప్‌లతో ఖచ్చితమైన బహుళ-తరగతి వర్గీకరణ.",
    lcStep3Title: "3. తీవ్రత & ఆరోగ్య స్కోరు",
    lcStep3Desc: "ఆకు నష్ట శాతాన్ని కొలవడం మరియు మాడ్యులర్ పంట ఆరోగ్య స్కోరు (0-100).",
    lcStep4Title: "4. రిస్క్ ట్రాకింగ్ & సలహా",
    lcStep4Desc: "వాతావరణ రిస్క్ అంచనా, సురక్షితమైన IPM నివారణలు మరియు చారిత్రక పోలిక.",

    supportedCropsTitle: "మద్దతు ఉన్న వ్యవసాయ పంటలు & ప్రధాన వ్యాధులు",
    supportedCropsSubtitle: ">90% ఖచ్చితత్వ ప్రమాణాలతో ధృవీకరించబడిన క్షేత్ర డేటాపై శిక్షణ పొందింది.",
    exploreFullLibrary: "పూర్తి వ్యాధి లైబ్రరీని చూడండి",

    cardDashboardTitle: "పంట ఆరోగ్య డ్యాష్‌బోర్డ్",
    cardDashboardDesc: "ఆరోగ్య పోకడలను ట్రాక్ చేయండి, పొలాల స్థితిని పర్యవేక్షించండి మరియు వ్యాధి చార్టులను చూడండి.",
    cardRiskTitle: "వాతావరణ-తెగులు రిస్క్ మానిటర్",
    cardRiskDesc: "రియల్ టైమ్ తేమ, ఉష్ణోగ్రత మరియు వ్యాధి వ్యాప్తి సంభావ్యత సూచికలు.",
    cardModelTitle: "డేటాసెట్ & మోడల్ క్వాలిటీ గేట్",
    cardModelDesc: "మోడల్ ఖచ్చితత్వ గణాంకాలు (94.25% పరీక్ష ఖచ్చితత్వం) మరియు విశ్వసనీయ ప్రమాణాలు.",

    scanMyCrop: "పంటను స్కాన్ చేయండి",
    scanSubtitle: "వ్యాధి లక్షణాలను ముందుగానే గుర్తించడానికి కెమెరాను ఆకుపై ఉంచండి లేదా ఫోటోను అప్‌లోడ్ చేయండి.",
    selectCropLabel: "పంటను ఎంచుకోండి (ఐచ్ఛికం):",
    cropAll: "అన్నీ / స్వయంచాలక గుర్తింపు",
    cropRice: "వరి (Rice)",
    cropTomato: "టమోటా (Tomato)",
    cropCotton: "పత్తి (Cotton)",
    cropPotato: "బంగాళాదుంప (Potato)",
    cropMaize: "మొక్కజొన్న (Maize)",
    cropSoybean: "సోయాబీన్ (Soybean)",
    cropSugarcane: "చెరకు (Sugarcane)",
    cropOnion: "ఉల్లిపాయ (Onion)",
    cropPomegranate: "దానిమ్మ (Pomegranate)",
    cropChilli: "మిరప (Chilli)",
    cropWheat: "గోధుమ (Wheat)",

    dragDropText: "ఆకు చిత్రాన్ని ఇక్కడ డ్రాగ్ చేయండి, లేదా",
    browseFiles: "ఫైళ్ళను ఎంచుకోండి",
    cameraPreview: "ప్రత్యక్ష కెమెరా వ్యూ",
    switchCamera: "కెమెరా మార్చండి",
    capturePhoto: "ఫోటో తీయండి",
    retake: "మళ్లీ ఫోటో తీయండి",
    scanNow: "ఆకును స్కాన్ చేయండి",
    uploadGallery: "గ్యాలరీ నుండి అప్‌లోడ్ చేయండి",
    analyzeNow: "పంట ఆరోగ్యాన్ని విశ్లేషించండి",
    analyzingText: "విజన్ AI ద్వారా ఆకు విశ్లేషించబడుతోంది...",
    imageStaged: "చిత్రం సిద్ధంగా ఉంది",
    multiStageAnalysis: "AI బహుళ-దశల పంట ఆరోగ్య విశ్లేషణ",
    stage1: "దశ 01/07 — ఆకు చిత్రాన్ని సాధారణీకరించడం మరియు ముందస్తు ప్రాసెసింగ్...",
    stage2: "దశ 02/07 — పంట రకం మరియు ఆకు సరిహద్దులను ధృవీకరించడం...",
    stage3: "దశ 03/07 — ఆకు రంగు మార్పు మరియు వ్యాధి లక్షణాలను పరిశీలించడం...",
    stage4: "దశ 04/07 — న్యూరల్ ఎంబెడ్డింగ్‌లను వ్యాధి తరగతులతో సరిపోల్చడం...",
    stage5: "దశ 05/07 — మచ్చల తీవ్రత మరియు ప్రభావిత ఆకు శాతాన్ని లెక్కించడం...",
    stage6: "దశ 06/07 — వాతావరణ ఆధారిత వ్యాధి ప్రమాదం మరియు స్కోరును లెక్కించడం...",
    stage7: "దశ 07/07 — సురక్షితమైన IPM సిఫార్సులు మరియు సలహాలను రూపొందించడం...",
    cameraUnavailable: "కెమెరా యాక్సెస్ అందుబాటులో లేదు. అనుమతులను తనిఖీ చేయండి లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి.",

    guidance1: "ఫ్రేమ్‌లో స్పష్టమైన ఒకే ఆకును ఉంచండి",
    guidance2: "సహజ కాంతి పుష్కలంగా ఉండేలా చూసుకోండి",
    guidance3: "మసకగా లేదా కదిలిన ఫోటోలను నివారించండి",

    voiceEnabled: "వాయిస్ గైడెన్స్ ఆన్",
    voiceDisabled: "వాయిస్ గైడెన్స్ ఆఫ్",
    voiceMoveCloser: "కెమెరాను ఆకు ఉపరితలానికి దగ్గరగా తీసుకురండి.",
    voiceKeepInside: "ఆకును ఫ్రేమ్ లోపల కదలకుండా స్థిరంగా ఉంచండి.",
    voiceCaptured: "చిత్రం విజయవంతంగా తీయబడింది. AI వ్యాధి విశ్లేషణకు సిద్ధంగా ఉంది.",
    voiceUploaded: "ఆకు చిత్రం విజయవంతంగా అప్‌లోడ్ చేయబడింది. AI వ్యాధి విశ్లేషణకు సిద్ధంగా ఉంది.",
    voiceRetake: "చిత్ర నాణ్యత తక్కువగా ఉంది. దయచేసి మంచి వెలుతురులో మళ్లీ ఫోటో తీయండి.",
    voiceAnalyzing: "విజన్ AI ద్వారా ఆకు చిత్రం విశ్లేషించబడుతోంది...",
    voiceAnalysisComplete: "విశ్లేషణ పూర్తయింది. పంట ఆరోగ్య ఫలితాలు సిద్ధంగా ఉన్నాయి.",

    qualityCheckTitle: "స్వయంచాలక నాణ్యత తనిఖీ",
    qualityPass: "ఖచ్చితమైన గుర్తింపు కోసం చిత్రం నాణ్యత అనుకూలంగా ఉంది.",
    qualityLow: "ఖచ్చితమైన గుర్తింపు కోసం చిత్ర నాణ్యత సరిపోదు.",
    sharpness: "స్పష్టత",
    brightness: "కాంతి",
    resolution: "రిజల్యూషన్",
    leafCoverage: "ఆకు విస్తీర్ణం",
    retakePhotoBtn: "మళ్లీ ఫోటో తీయండి",
    proceedAnyway: "అయినా కొనసాగించండి",

    diagnosisTitle: "వ్యాధి నిర్ధారణ ఫలితాలు",
    cropDetected: "గుర్తించిన పంట",
    condition: "కనుగొన్న వ్యాధి / స్థితి",
    confidence: "విశ్వసనీయత",
    healthStatus: "పంట ఆరోగ్యం",
    severityLevel: "తీవ్రత స్థాయి",
    affectedArea: "దెబ్బతిన్న ఆకు విస్తీర్ణం",
    healthyArea: "ఆరోగ్యకరమైన విస్తీర్ణం",
    scientificName: "శాస్త్రీయ వ్యాధికారక నామం",
    statusHealthy: "ఆరోగ్యంగా ఉంది",
    statusEarly: "ప్రారంభ లక్షణాలు",
    statusModerate: "మితమైన నష్టం",
    statusSevere: "తీవ్రమైన నష్టం",
    statusUnknown: "అస్పష్ట నమూనా / సమీక్ష అవసరం",
    statusAtRisk: "ప్రమాదంలో ఉంది",

    whyDetectedTitle: "ఇది ఎందుకు గుర్తించబడింది?",
    xaiExplanation: "గుర్తించబడిన ఆకు భాగాల్లోని లక్షణాలు మరియు నమూనాల ఆధారంగా AI ఈ నిర్ణయానికి వచ్చింది.",
    showHeatmap: "AI అటెన్షన్ హీట్‌మ్యాప్ (Grad-CAM)",
    showOriginal: "అసలు ఆకు ఫోటో",
    gradcamDesc: "హీట్‌మ్యాప్‌లో చూపిన రంగురంగుల ప్రాంతాలు AI నిర్ధారణకు కీలకమైనవి.",

    severityMeterTitle: "వ్యాధి తీవ్రత మీటర్",
    severityActionUrgency: "సిఫార్సు చేయబడిన చర్య",

    guidanceTitle: "రైతులకు సమగ్ర సంరక్షణ మరియు నివారణ మార్గదర్శకాలు",
    whatDetected: "ఏమి కనుగొనబడింది",
    whatSymptomsMean: "ఈ లక్షణాల అర్థం ఏమిటి",
    whatToDoNow: "ఇప్పుడు వెంటనే ఏమి చేయాలి",
    preventSpread: "వ్యాప్తిని ఎలా అరికట్టాలి",
    whenSeekExpert: "వ్యవసాయ నిపుణుడిని ఎప్పుడు సంప్రదించాలి",
    helplineBtn: "కిసాన్ హెల్ప్‌లైన్ (1800-180-1551)",

    lowConfidenceTitle: "అస్పష్టమైన AI ఫలితం",
    lowConfidenceMsg: "AI ఖచ్చితంగా ఈ వ్యాధిని గుర్తించలేకపోయింది. దయచేసి క్రింది ఎంపికలను ఉపయోగించండి:",
    tryAnotherImg: "మరొక ఫోటోతో ప్రయత్నించండి",
    describeSymptomsBtn: "లక్షణాలను వివరించండి",
    requestExpertBtn: "నిపుణుల సమీక్షను కోరండి",

    fieldsTitle: "పొలాల నిర్వహణ",
    totalFields: "మొత్తం పొలాలు",
    recentScans: "ఇటీవలి స్కాన్లు",
    healthyCrops: "ఆరోగ్యకరమైన పంటలు",
    atRiskCrops: "ప్రమాదంలో ఉన్న పంటలు",
    activeAlerts: "సక్రియ హెచ్చరికలు",
    addNewField: "+ కొత్త పొలాన్ని జోడించండి",
    fieldName: "పొలం పేరు",
    fieldLocation: "గ్రామం / ప్రాంతం",
    fieldAcreage: "విస్తీర్ణం (ఎకరాలు)",
    fieldSowingDate: "విత్తిన తేదీ",
    saveField: "పొలాన్ని భద్రపరచండి",
    fieldHealthMap: "ఇంటరాక్టివ్ పొలం ఆరోగ్య పటం",
    filterByCrop: "పంటల వారీగా వడపోత",
    filterBySeverity: "తీవ్రత వారీగా వడపోత",
    allSeverities: "అన్ని తీవ్రతలు",
    allCrops: "అన్ని పంటలు",

    spreadTitle: "వ్యాధి వ్యాప్తి ట్రాకింగ్",
    spreadSubtitle: "సమయం గడిచేకొద్దీ (రోజు 1 నుండి 15 వరకు) ఆకుపై వ్యాధి వ్యాప్తిని గమనించండి.",
    timelineDay1: "రోజు 1 (ప్రారంభం)",
    timelineDay5: "రోజు 5 (వ్యాప్తి)",
    timelineDay10: "రోజు 10 (పెరుగుదల)",
    timelineDay15: "రోజు 15 (ప్రస్తుత స్థితి)",

    compareTitle: "ఫోటోలతో ఆరోగ్య పోలిక",
    compareSubtitle: "చికిత్స ప్రభావాన్ని తెలుసుకోవడానికి పాత మరియు తాజా స్కాన్లను సరిపోల్చండి.",
    previousScan: "మునుపటి స్కాన్",
    latestScan: "తాజా స్కాన్",
    verdictImproved: "ఆరోగ్యం మెరుగుపడింది",
    verdictUnchanged: "ఎటువంటి మార్పు లేదు",
    verdictWorsening: "పరిస్థితి మరింత దిగజారే ప్రమాదం",
    selectScanA: "పాత స్కాన్ ఎంచుకోండి",
    selectScanB: "తాజా స్కాన్ ఎంచుకోండి",
    runComparison: "పోలికను అమలు చేయండి",

    symptomTitle: "లక్షణాల అసిస్టెంట్",
    symptomSubtitle: "ఖచ్చితమైన గుర్తింపు కోసం సాధారణ ప్రశ్నలకు సమాధానం ఇవ్వండి.",
    symptomQuestion: "ఆకుపై మీకు ఎలాంటి లక్షణాలు కనిపిస్తున్నాయి?",
    symptomSpots: "మచ్చలు (నలుపు / పసుపు / గోధుమ)",
    symptomYellowing: "ఆకు పసుపుపచ్చగా మారడం",
    symptomBrowning: "ఆకు మాడిపోవడం / గోధుమ రంగు",
    symptomCurling: "ఆకులు ముడుచుకుపోవడం",
    symptomWilting: "వాడిపోవడం / వేలాడటం",
    symptomPowder: "తెల్లటి లేదా బూడిద పొడి",
    symptomHoles: "పురుగులు తిన్న రంధ్రాలు",
    symptomOther: "ఇతర వింత మార్పులు",
    evaluateSymptoms: "లక్షణాలను విశ్లేషించండి",

    notificationsTitle: "నోటిఫికేషన్ల కేంద్రం",
    markAllRead: "అన్నీ చదివినట్లుగా గుర్తించండి",
    noNotifications: "కొత్త నోటిఫికేషన్‌లు లేవు",
    newScanDone: "కొత్త స్కాన్ విజయవంతంగా పూర్తయింది",
    riskIncreased: "పొలం 02 లో వ్యాధి ప్రమాదం పెరిగింది",
    followUpRec: "3 రోజుల్లో మళ్లీ స్కాన్ చేయాలని సిఫార్సు",
    expertReviewDone: "స్కాన్ #SC-4821 కు నిపుణుల సమీక్ష పూర్తయింది",

    expertPortalTitle: "వ్యవసాయ నిపుణుడి సమీక్షను కోరండి",
    expertNotesPlaceholder: "పొలం స్థితి, ఎరువులు లేదా మందుల పిచికారీ వివరాలను రాయండి...",
    submitReview: "నిపుణుడికి పంపండి",
    reviewSubmitted: "సమీక్ష కోసం వ్యవసాయ శాస్త్రవేత్తలకు పంపబడింది.",
    statusPending: "పెండింగ్‌లో ఉంది",
    statusUnderReview: "సమీక్షలో ఉంది",
    statusReviewed: "ధృవీకరించబడింది",
    expertNotes: "నిపుణుల ఫీల్డ్ నోట్స్",
    expertVerifyBtn: "లెవెల్ 4 గా ధృవీకరించండి",
    mlMetricsTitle: "ML మోడల్ నాణ్యత ప్రమాణాలు (90%+ లక్ష్యం)",
    testAccuracy: "పరీక్ష ఖచ్చితత్వం",
    macroF1: "Macro F1-Score",
    realFieldAcc: "ఫీల్డ్ ఖచ్చితత్వం",
    genGap: "Generalization Gap",

    riskTitle: "వాతావరణ ఆధారిత తెగులు రిస్క్ రాడార్",
    riskSubtitle: "వాతావరణ కారకాలు మరియు ఫంగల్ వ్యాధుల వ్యాప్తి ప్రమాద మీటర్.",
    riskLow: "తక్కువ రిస్క్",
    riskWatch: "గమనించండి (మధ్యస్థ)",
    riskHigh: "అధిక రిస్క్",
    temp: "ఉష్ణోగ్రత",
    humidity: "గాలిలో తేమ",
    rainfall: "వర్షపాతం",
    trapDensity: "ట్రాప్ డెన్సిటీ",
    primaryCrop: "ప్రధాన పంట",
    elevatedNotice: "అధిక ప్రమాదం గుర్తించబడింది. మీ పంటలను జాగ్రత్తగా గమనించండి.",
  },

  // 4. Kannada (ಕನ್ನಡ)
  kn: {
    appName: "ಅಗ್ರಿ ರಕ್ಷಕ್ AI (AgriRakshak)",
    tagline: "ಮುಂಚಿತ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಕೃಷಿ ಜ್ಞಾನ",
    govtBadge: "SIH 2026 • AI ಕೃಷಿ ಸಂರಕ್ಷಣಾ ವೇದಿಕೆ",
    aiDisclaimer: "AI ಭವಿಷ್ಯವಾಣಿಗಳು ಆರಂಭಿಕ ತಪಾಸಣಾ ಸಹಾಯಕ್ಕಾಗಿ ಮಾತ್ರ ಮತ್ತು ವೃತ್ತಿಪರ ಕೃಷಿ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ.",
    kisanHelpline: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ",

    tabHome: "ಮುಖಪುಟ",
    tabDetect: "ರೋಗ ಪತ್ತೆ",
    tabCropHealth: "ಬೆಳೆ ಆರೋಗ್ಯ",
    tabRiskRadar: "ಅಪಾಯ ರಾಡಾರ್",
    tabFields: "ಜಮೀನುಗಳು",
    tabHistory: "ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ",
    tabLibrary: "ರೋಗ ಲೈಬ್ರರಿ",
    tabLearn: "ಕಲಿಯಿರಿ",
    tabAbout: "ಕುರಿತು & ಮಾದರಿಗಳು",
    tabDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    tabSpread: "ರೋಗ ಹರಡುವಿಕೆ",
    tabCompare: "ಸ್ಕ್ಯಾನ್ ಹೋಲಿಕೆ",
    tabSymptoms: "ರೋಗಲಕ್ಷಣ ಮಾರ್ಗದರ್ಶಿ",
    tabExpert: "ತಜ್ಞರ ಪರಿಶೀಲನೆ",
    btnAnalyzeCrop: "ಬೆಳೆ ಪರೀಕ್ಷಿಸಿ",

    heroBadge: "ಅಗ್ರಿಟೆಕ್ + ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಇಂಟೆಲಿಜೆನ್ಸ್ • 94.2% ಪರಿಶೀಲಿಸಿದ ನಿಖರತೆ",
    heroHeadline: "ಬೆಳೆ ರೋಗಗಳು ಹರಡುವ ಮುನ್ನವೇ ಪತ್ತೆಹಚ್ಚಿ.",
    heroSubheadline: "ಆರಂಭಿಕ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಗುರುತಿಸಲು, ಅಪಾಯವನ್ನು ನಿರ್ಣಯಿಸಲು ಮತ್ತು ಸಕಾಲಿಕ ನಿರ್ಧಾರಗಳನ್ನು ಬೆಂಬಲಿಸಲು AI ಬೆಳೆ ಆರೋಗ್ಯ ತಂತ್ರಜ್ಞಾನ.",
    primaryCta: "ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    exploreCropHealth: "ಬೆಳೆ ಆರೋಗ್ಯ ಪರಿಶೀಲಿಸಿ",
    exploreHowItWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    startHealthCheck: "ಬೆಳೆ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ",
    howItWorksTitle: "ಅಗ್ರಿ ರಕ್ಷಕ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    step1Title: "1. ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ",
    step1Desc: "ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ಬಾಧಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    step2Title: "2. AI ವಿಶ್ಲೇಷಣೆ",
    step2Desc: "AI ಚಿತ್ರದ ಗುಣಮಟ್ಟವನ್ನು ಪರಿಶೀಲಿಸಿ ನಿಖರ ರೋಗವನ್ನು ಕ್ಷಣಾರ್ಧದಲ್ಲಿ ಗುರುತಿಸುತ್ತದೆ.",
    step3Title: "3. ಕಾರಣವನ್ನು ತಿಳಿಯಿರಿ",
    step3Desc: "Explainable AI ಹೀಟ್‌ಮ್ಯಾಪ್ ಮೂಲಕ ಎಲೆಯ ಬಾಧಿತ ಭಾಗ ಮತ್ತು ರೋಗದ ಪ್ರಮಾಣವನ್ನು ವೀಕ್ಷಿಸಿ.",
    step4Title: "4. ನಿಗಾ ವಹಿಸಿ",
    step4Desc: "ವಿವಿಧ ಜಮೀನುಗಳಲ್ಲಿ ಕಾಲಕ್ರಮೇಣ ಬೆಳೆ ಆರೋಗ್ಯ ಮತ್ತು ರೋಗದ ಹರಡುವಿಕೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",

    cvActive: "ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "ಆರಂಭಿಕ ಅಂಗಮಾರಿ (94.2% AI ಅಂದಾಜು)",
    targetSpot: "ಗುರಿ",
    lesionSpot: "ಗಾಯ / ಕಲೆ",
    affectedHud: "ಬಾಧಿತ: 18% • ಅಂಕ: 78/100",
    stepPhoto: "📷 ಫೋಟೋ",
    stepAIVision: "🧠 AI ವಿಷನ್",
    stepDetection: "🔍 ಪತ್ತೆ",
    stepScore: "📊 ಅಂಕ (78)",
    stepWarning: "⚠️ ಎಚ್ಚರಿಕೆ",

    lifecycleBadge: "ಸಂಪೂರ್ಣ ಅಗ್ರಿಟೆಕ್ ಆರ್ಕಿಟೆಕ್ಚರ್",
    lifecycleTitle: "ಸಂಪೂರ್ಣ ಬೆಳೆ ಆರೋಗ್ಯ ಚಕ್ರ",
    lifecycleSubtitle: "ಒಂದು ಎಲೆಯ ಫೋಟೋ ಸೆರೆಹಿಡಿಯುವಿಕೆಯಿಂದ ನಿರಂತರ ಕೃಷಿ ರೋಗ ಮೇಲ್ವಿಚಾರಣೆಯವರೆಗೆ.",
    lcStep1Title: "1. ಫೋಟೋ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ",
    lcStep1Desc: "ಬ್ಲರ್, ಬೆಳಕು ಮತ್ತು ಎಲೆಯ ವ್ಯಾಪ್ತಿಯನ್ನು ಮುಂಚಿತವಾಗಿಯೇ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡುವುದು.",
    lcStep2Title: "2. ನರಮಂಡಲ ರೋಗ ತಪಾಸಣೆ",
    lcStep2Desc: "Grad-CAM ದೃಶ್ಯ ಶಾಖ ನಕ್ಷೆಗಳೊಂದಿಗೆ ನಿಖರವಾದ ಬಹು-ವರ್ಗದ ವರ್ಗೀಕರಣ.",
    lcStep3Title: "3. ತೀವ್ರತೆ ಮತ್ತು ಆರೋಗ್ಯ ಅಂಕ",
    lcStep3Desc: "ಎಲೆಯ ಹಾನಿ ಶೇಕಡಾವಾರು ಅಳತೆ ಮತ್ತು ಮಾಡ್ಯುಲರ್ ಬೆಳೆ ಆರೋಗ್ಯ ಅಂಕ (0-100).",
    lcStep4Title: "4. ಅಪಾಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸಲಹೆ",
    lcStep4Desc: "ಹವಾಮಾನ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ, ಸುರಕ್ಷಿತ IPM ಕ್ರಮಗಳು ಮತ್ತು ಹಿಂದಿನ ಸ್ಕ್ಯಾನ್ ಹೋಲಿಕೆ.",

    supportedCropsTitle: "ಬೆಂಬಲಿತ ಕೃಷಿ ಬೆಳೆಗಳು ಮತ್ತು ಮುಖ್ಯ ರೋಗಗಳು",
    supportedCropsSubtitle: ">90% ನಿಖರತೆಯೊಂದಿಗೆ ಕ್ಷೇತ್ರ ಡೇಟಾದಲ್ಲಿ ತರಬೇತಿ ಪಡೆದ ಮಾದರಿ.",
    exploreFullLibrary: "ಸಂಪೂರ್ಣ ರೋಗ ಲೈಬ್ರರಿಯನ್ನು ಅನ್ವೇಷಿಸಿ",

    cardDashboardTitle: "ಬೆಳೆ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    cardDashboardDesc: "ಎಲೆ ಆರೋಗ್ಯ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಜಮೀನುಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ರೋಗದ ಚಾರ್ಟ್ ವೀಕ್ಷಿಸಿ.",
    cardRiskTitle: "ಹವಾಮಾನ-ರೋಗ ಅಪಾಯ ಮಾನಿಟರ್",
    cardRiskDesc: "ನೈಜ ಸಮಯದ ತೇವಾಂಶ, ತಾಪಮಾನ ಮತ್ತು ರೋಗ ಹರಡುವ ಸಾಧ್ಯತೆಯ ಮುನ್ಸೂಚನೆ.",
    cardModelTitle: "ಡೇಟಾಸೆಟ್ & ಮಾದರಿ ಗುಣಮಟ್ಟ ಗೇಟ್",
    cardModelDesc: "ಮಾದರಿ ನಿಖರತೆಯ ಮೆಟ್ರಿಕ್‌ಗಳು (94.25% ಪರೀಕ್ಷಾ ನಿಖರತೆ) ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಮಾನದಂಡಗಳು.",

    scanMyCrop: "ಬೆಳೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    scanSubtitle: "ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಆರಂಭದಲ್ಲೇ ಪತ್ತೆಹಚ್ಚಲು ಕ್ಯಾಮೆರಾವನ್ನು ಎಲೆಯ ಮೇಲೆ ಇರಿಸಿ ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    selectCropLabel: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (ಐಚ್ಛಿಕ):",
    cropAll: "ಎಲ್ಲಾ / ಸ್ವಯಂಚಾಲಿತ ಪತ್ತೆ",
    cropRice: "ಭತ್ತ (Rice)",
    cropTomato: "ಟೊಮೆಟೊ (Tomato)",
    cropCotton: "ಹತ್ತಿ (Cotton)",
    cropPotato: "ಆಲೂಗಡ್ಡೆ (Potato)",
    cropMaize: "ಮೆಕ್ಕೆಜೋಳ (Maize)",
    cropSoybean: "ಸೋಯಾಬೀನ್ (Soybean)",
    cropSugarcane: "ಕಬ್ಬು (Sugarcane)",
    cropOnion: "ಈರುಳ್ಳಿ (Onion)",
    cropPomegranate: "ದಾಳಿಂಬೆ (Pomegranate)",
    cropChilli: "ಮೆಣಸಿನಕಾಯಿ (Chilli)",
    cropWheat: "ಗೋಧಿ (Wheat)",

    dragDropText: "ಎಲೆಯ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿಗೆ ಎಳೆಯಿರಿ, ಅಥವಾ",
    browseFiles: "ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
    cameraPreview: "ಲೈವ್ ಕ್ಯಾಮೆರಾ ವ್ಯೂ",
    switchCamera: "ಕ್ಯಾಮೆರಾ ಬದಲಿಸಿ",
    capturePhoto: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    retake: "ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    scanNow: "ಎಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    uploadGallery: "ಗ್ಯಾಲರಿಯಿಂದ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    analyzeNow: "ಬೆಳೆ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಿಸಿ",
    analyzingText: "ವಿಷನ್ AI ಮೂಲಕ ಎಲೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    imageStaged: "ಚಿತ್ರ ಸಿದ್ಧವಾಗಿದೆ",
    multiStageAnalysis: "AI ಬಹು-ಹಂತದ ಬೆಳೆ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ",
    stage1: "ಹಂತ 01/07 — ಎಲೆ ಚಿತ್ರವನ್ನು ಸಮತೋಲನಗೊಳಿಸುವುದು ಮತ್ತು ಪೂರ್ವ ಸಂಸ್ಕರಣೆ...",
    stage2: "ಹಂತ 02/07 — ಬೆಳೆ ಗುರುತು ಮತ್ತು ಎಲೆ ಗಡಿಗಳನ್ನು ಪರಿಶೀಲಿಸುವುದು...",
    stage3: "ಹಂತ 03/07 — ಎಲೆ ಬಣ್ಣ ಬದಲಾವಣೆ ಮತ್ತು ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸುವುದು...",
    stage4: "ಹಂತ 04/07 — ನರ ಎಂಬೆಡ್ಡಿಂಗ್‌ಗಳನ್ನು ರೋಗ ವರ್ಗಗಳೊಂದಿಗೆ ಹೊಂದಿಸುವುದು...",
    stage5: "ಹಂತ 05/07 — ಕಲೆಗಳ ತೀವ್ರತೆ ಮತ್ತು ಹಾನಿಗೊಳಗಾದ ಎಲೆಯ ಶೇಕಡಾವಾರು ಅಂದಾಜು ಮಾಡುವುದು...",
    stage6: "ಹಂತ 06/07 — ಹವಾಮಾನ ಆಧಾರಿತ ರೋಗದ ಅಪಾಯ ಮತ್ತು ಅಂಕವನ್ನು ಲೆಕ್ಕಹಾಕುವುದು...",
    stage7: "ಹಂತ 07/07 — ಸುರಕ್ಷಿತ IPM ಶಿಫಾರಸುಗಳು ಮತ್ತು ಸಲಹೆಗಳನ್ನು ರೂಪಿಸುವುದು...",
    cameraUnavailable: "ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

    guidance1: "ಚೌಕಟ್ಟಿನಲ್ಲಿ ಸ್ಪಷ್ಟವಾದ ಒಂದು ಎಲೆಯನ್ನು ಇರಿಸಿ",
    guidance2: "ಉತ್ತಮ ನೈಸರ್ಗಿಕ ಬೆಳಕು ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
    guidance3: "ಮಸುಕಾದ ಅಥವಾ ಅಲುಗಾಡಿದ ಫೋಟೋಗಳನ್ನು ತಪ್ಪಿಸಿ",

    voiceEnabled: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆನ್",
    voiceDisabled: "ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಆಫ್",
    voiceMoveCloser: "ಕ್ಯಾಮೆರಾವನ್ನು ಎಲೆಯ ಮೇಲ್ಮೈಗೆ ಹತ್ತಿರ ತನ್ನಿ.",
    voiceKeepInside: "ಎಲೆಯನ್ನು ಚೌಕಟ್ಟಿನ ಒಳಗೆ ಸ್ಥಿರವಾಗಿ ಇರಿಸಿ.",
    voiceCaptured: "ಚಿತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ. AI ರೋಗ ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ.",
    voiceUploaded: "ಚಿತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ. AI ರೋಗ ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ.",
    voiceRetake: "ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಕಡಿಮೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೊಮ್ಮೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
    voiceAnalyzing: "ವಿಷನ್ AI ಮೂಲಕ ಎಲೆ ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    voiceAnalysisComplete: "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ಬೆಳೆ ಆರೋಗ್ಯ ವರದಿ ಸಿದ್ಧವಾಗಿದೆ.",

    qualityCheckTitle: "ಸ್ವಯಂಚಾಲಿತ ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ",
    qualityPass: "ವಿಶ್ವಾಸಾರ್ಹ ಪತ್ತೆಗೆ ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ.",
    qualityLow: "ವಿಶ್ವಾಸಾರ್ಹ ಪತ್ತೆಗೆ ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಸಾಲದು.",
    sharpness: "ಸ್ಪಷ್ಟತೆ",
    brightness: "ಬೆಳಕು",
    resolution: "ರೆಸಲ್ಯೂಶನ್",
    leafCoverage: "ಎಲೆಯ ಉಪಸ್ಥಿತಿ",
    retakePhotoBtn: "ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    proceedAnyway: "ಮುಂದುವರಿಯಿರಿ",

    diagnosisTitle: "ರೋಗ ಪತ್ತೆ ಫಲಿತಾಂಶಗಳು",
    cropDetected: "ಪತ್ತೆಯಾದ ಬೆಳೆ",
    condition: "ಕಂಡುಬಂದ ರೋಗ / ಸ್ಥಿತಿ",
    confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",
    healthStatus: "ಬೆಳೆ ಆರೋಗ್ಯ",
    severityLevel: "ತೀವ್ರತೆಯ ಮಟ್ಟ",
    affectedArea: "ಹಾನಿಗೊಳಗಾದ ಎಲೆ ಪ್ರದೇಶ",
    healthyArea: "ಆರೋಗ್ಯಕರ ಪ್ರದೇಶ",
    scientificName: "ವೈಜ್ಞಾನಿಕ ರೋಗಕಾರಕ ಹೆಸರು",
    statusHealthy: "ಆರೋಗ್ಯಕರ",
    statusEarly: "ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು",
    statusModerate: "ಮಧ್ಯಮ ಹಾನಿ",
    statusSevere: "ತೀವ್ರ ಹಾನಿ",
    statusUnknown: "ಅನಿಶ್ಚಿತ ಮಾದರಿ / ಮರುಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ",
    statusAtRisk: "ಅಪಾಯದಲ್ಲಿದೆ",

    whyDetectedTitle: "ಇದನ್ನು ಏಕೆ ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ?",
    xaiExplanation: "ಎಲೆಯ ಹೈಲೈಟ್ ಮಾಡಲಾದ ಭಾಗಗಳಲ್ಲಿನ ಲಕ್ಷಣಗಳು ಮತ್ತು ನಮೂನೆಗಳ ಆಧಾರದ ಮೇಲೆ AI ಈ ನಿರ್ಧಾರವನ್ನು ತೆಗೆದುಕೊಂಡಿದೆ.",
    showHeatmap: "AI ಹೀಟ್‌ಮ್ಯಾಪ್ (Grad-CAM)",
    showOriginal: "ಮೂಲ ಎಲೆ ಫೋಟೋ",
    gradcamDesc: "ಬಣ್ಣದ ನಕ್ಷೆಯಲ್ಲಿ ತೋರಿಸಲಾದ ಪ್ರದೇಶಗಳು AI ರೋಗವನ್ನು ನಿರ್ಣಯಿಸಲು ಮುಖ್ಯ ಆಧಾರವಾಗಿದೆ.",

    severityMeterTitle: "ರೋಗ ತೀವ್ರತೆ ಮೀಟರ್",
    severityActionUrgency: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",

    guidanceTitle: "ರೈತರಿಗೆ ತುರ್ತು ಸಲಹೆ ಮತ್ತು ಆರೈಕೆ ಮಾರ್ಗದರ್ಶಿ",
    whatDetected: "ಏನು ಪತ್ತೆಯಾಗಿದೆ",
    whatSymptomsMean: "ಈ ರೋಗಲಕ್ಷಣಗಳ ಅರ್ಥವೇನು",
    whatToDoNow: "ಈಗ ತಕ್ಷಣ ಏನು ಮಾಡಬೇಕು",
    preventSpread: "ಮುಂದೆ ಹರಡುವುದನ್ನು ತಡೆಯುವುದು ಹೇಗೆ",
    whenSeekExpert: "ಕೃಷಿ ತಜ್ಞರನ್ನು ಯಾವಾಗ ಸಂಪರ್ಕಿಸಬೇಕು",
    helplineBtn: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ (1800-180-1551)",

    lowConfidenceTitle: "ಅನಿಶ್ಚಿತ AI ಮುನ್ಸೂಚನೆ",
    lowConfidenceMsg: "AI ಈ ಸ್ಥಿತಿಯನ್ನು ವಿಶ್ವಾಸಾರ್ಹವಾಗಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಪರ್ಯಾಯಗಳನ್ನು ಬಳಸಿ:",
    tryAnotherImg: "ಮತ್ತೊಂದು ಫೋಟೋ ಪ್ರಯತ್ನಿಸಿ",
    describeSymptomsBtn: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
    requestExpertBtn: "ತಜ್ಞರ ಪರಿಶೀಲನೆ ಕೇಳಿ",

    fieldsTitle: "ಜಮೀನು ನಿರ್ವಹಣೆ",
    totalFields: "ಒಟ್ಟು ಜಮೀನುಗಳು",
    recentScans: "ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು",
    healthyCrops: "ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು",
    atRiskCrops: "ಅಪಾಯದಲ್ಲಿರುವ ಬೆಳೆಗಳು",
    activeAlerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
    addNewField: "+ ಹೊಸ ಜಮೀನು ಸೇರಿಸಿ",
    fieldName: "ಜಮೀನಿನ ಹೆಸರು",
    fieldLocation: "ಸ್ಥಳ / ಗ್ರಾಮ",
    fieldAcreage: "ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)",
    fieldSowingDate: "ಬಿತ್ತನೆ ದಿನಾಂಕ",
    saveField: "ಜಮೀನು ಉಳಿಸಿ",
    fieldHealthMap: "ಇಂಟರಾಕ್ಟಿವ್ ಜಮೀನು ಆರೋಗ್ಯ ನಕ್ಷೆ",
    filterByCrop: "ಬೆಳೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್",
    filterBySeverity: "ತೀವ್ರತೆಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್",
    allSeverities: "ಎಲ್ಲಾ ತೀವ್ರತೆಗಳು",
    allCrops: "ಎಲ್ಲಾ ಬೆಳೆಗಳು",

    spreadTitle: "ರೋಗ ಹರಡುವಿಕೆ ಟ್ರ್ಯಾಕಿಂಗ್",
    spreadSubtitle: "ದಿನಗಳು ಕಳೆದಂತೆ (ದಿನ 1 ರಿಂದ 15) ಎಲೆಯ ಮೇಲೆ ರೋಗ ಹೇಗೆ ಬದಲಾಗಿದೆ ಎಂಬುದನ್ನು ಗಮನಿಸಿ.",
    timelineDay1: "ದಿನ 1 (ಆರಂಭ)",
    timelineDay5: "ದಿನ 5 (ವ್ಯಾಪನೆ)",
    timelineDay10: "ದಿನ 10 (ಹೆಚ್ಚಳ)",
    timelineDay15: "ದಿನ 15 (ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ)",

    compareTitle: "ಫೋಟೋದಿಂದ ಫೋಟೋ ಆರೋಗ್ಯ ಹೋಲಿಕೆ",
    compareSubtitle: "ಚಿಕಿತ್ಸೆಯ ಫಲಿತಾಂಶವನ್ನು ಅಳೆಯಲು ಹಳೆಯ ಮತ್ತು ಹೊಸ ಸ್ಕ್ಯಾನ್ ಹೋಲಿಕೆ ಮಾಡಿ.",
    previousScan: "ಹಿಂದಿನ ಸ್ಕ್ಯಾನ್",
    latestScan: "ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್",
    verdictImproved: "ಆರೋಗ್ಯ ಸುಧಾರಿಸಿದೆ",
    verdictUnchanged: "ಬದಲಾವಣೆ ಇಲ್ಲ",
    verdictWorsening: "ಪರಿಸ್ಥಿತಿ ಹದಗೆಡುವ ಸಾಧ್ಯತೆ",
    selectScanA: "ಮೂಲ ಸ್ಕ್ಯಾನ್ ಆಯ್ಕೆಮಾಡಿ",
    selectScanB: "ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್ ಆಯ್ಕೆಮಾಡಿ",
    runComparison: "ಹೋಲಿಕೆಯನ್ನು ಚಲಾಯಿಸಿ",

    symptomTitle: "ಮಾರ್ಗದರ್ಶಿ ರೋಗಲಕ್ಷಣ ಸಹಾಯಕ",
    symptomSubtitle: "ನಿಖರ ರೋಗ ಪತ್ತೆಗೆ ಸರಳ ದೃಶ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",
    symptomQuestion: "ಎಲೆಯ ಮೇಲೆ ನಿಮಗೆ ಯಾವ ಗೋಚರ ಲಕ್ಷಣಗಳು ಕಂಡುಬರುತ್ತಿವೆ?",
    symptomSpots: "ಮಚ್ಚೆಗಳು (ಕಂದು / ಕಪ್ಪು / ಹಳದಿ)",
    symptomYellowing: "ಹಳದಿಯಾಗುವುದು (ಕ್ಲೋರೋಸಿಸ್)",
    symptomBrowning: "ಕಂದು ಬಣ್ಣ / ಸುಟ್ಟಂತೆ ಆಗುವುದು",
    symptomCurling: "ಎಲೆ ಮುದುಡುವುದು",
    symptomWilting: "ಬಾಡುವುದು / ಜೋತು ಬೀಳುವುದು",
    symptomPowder: "ಬೂದಿ ಅಥವಾ ಪುಡಿಯಂತಹ ಮೇಲ್ಮೈ",
    symptomHoles: "ಕೀಟಗಳು ತಿಂದ ರಂಧ್ರಗಳು",
    symptomOther: "ಇತರ ಅಸಹಜ ಲಕ್ಷಣಗಳು",
    evaluateSymptoms: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ",

    notificationsTitle: "ಅಧಿಸೂಚನೆ ಕೇಂದ್ರ",
    markAllRead: "ಎಲ್ಲವನ್ನೂ ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    noNotifications: "ಯಾವುದೇ ಹೊಸ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ",
    newScanDone: "ಹೊಸ ಸ್ಕ್ಯಾನ್ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
    riskIncreased: "ಜಮೀನು 02 ರಲ್ಲಿ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ",
    followUpRec: "3 ದಿನಗಳಲ್ಲಿ ಮರು-ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಶಿಫಾರಸು",
    expertReviewDone: "ಸ್ಕ್ಯಾನ್ #SC-4821 ಗೆ ತಜ್ಞರ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಂಡಿದೆ",

    expertPortalTitle: "ಕೃಷಿ ತಜ್ಞರ ಪರಿಶೀಲನೆಗೆ ವಿನಂತಿಸಿ",
    expertNotesPlaceholder: "ಜಮೀನಿನ ಸ್ಥಿತಿ, ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಯ ವಿವರಗಳನ್ನು ಬರೆಯಿರಿ...",
    submitReview: "ತಜ್ಞರಿಗೆ ಕಳುಹಿಸಿ",
    reviewSubmitted: "ವಿನಂತಿಯನ್ನು ಪ್ರಮಾಣೀಕೃತ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.",
    statusPending: "ಬಾಕಿ ಇದೆ",
    statusUnderReview: "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
    statusReviewed: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ",
    expertNotes: "ಕೃಷಿ ವಿಜ್ಞಾನಿ ಕ್ಷೇತ್ರ ಟಿಪ್ಪಣಿಗಳು",
    expertVerifyBtn: "ಲೆವೆಲ್ 4 ಎಂದು ಪ್ರಮಾಣೀಕರಿಸಿ",
    mlMetricsTitle: "ML ಮಾದರಿ ಗುಣಮಟ್ಟ ಗೇಟ್ (90%+ ಗುರಿ)",
    testAccuracy: "ಪರೀಕ್ಷಾ ನಿಖರತೆ",
    macroF1: "Macro F1-Score",
    realFieldAcc: "ಕ್ಷೇತ್ರ ನಿಖರತೆ",
    genGap: "Generalization Gap",

    riskTitle: "ಹವಾಮಾನ ರೋಗ ಅಪಾಯ ರಾಡಾರ್",
    riskSubtitle: "ಪರಿಸರ ಅಂಶಗಳು ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗಗಳ ಹರಡುವಿಕೆಯ ಅಪಾಯ ಮಾಪಕ.",
    riskLow: "ಕಡಿಮೆ ಅಪಾಯ",
    riskWatch: "ನಿಗಾ ಇರಿಸಿ (ಮಧ್ಯಮ)",
    riskHigh: "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    temp: "ತಾಪಮಾನ",
    humidity: "ಸಾಮಾನ್ಯ ತೇವಾಂಶ",
    rainfall: "ಮಳೆ",
    trapDensity: "ಬಲೆ ಸಾಂದ್ರತೆ",
    primaryCrop: "ಮುಖ್ಯ ಬೆಳೆ",
    elevatedNotice: "ಹೆಚ್ಚಿನ ಅಪಾಯ ಕಂಡುಬಂದಿದೆ. ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಗಮನಿಸಿ.",
  },

  // 5. Gujarati (ગુજરાતી)
  gu: {
    appName: "એગ્રી રક્ષક AI (AgriRakshak)",
    tagline: "પાકના રોગોની વહેલી ઓળખ અને ખેતી ગુપ્તચર",
    govtBadge: "SIH 2026 • AI કૃષિ સુરક્ષા પ્લેટફોર્મ",
    aiDisclaimer: "AI આગાહીઓ માત્ર પ્રારંભિક તપાસ સહાય માટે છે અને તે કૃષિ નિષ્ણાતની સલાહનું સ્થાન લેતી નથી.",
    kisanHelpline: "કિસાન હેલ્પલાઇન",

    tabHome: "મુખ્ય પૃષ્ઠ",
    tabDetect: "રોગ ઓળખ",
    tabCropHealth: "પાક સ્વાસ્થ્ય",
    tabRiskRadar: "જોખમ રડાર",
    tabFields: "ખેતરો",
    tabHistory: "સ્કેન ઇતિહાસ",
    tabLibrary: "રોગ લાયબ્રેરી",
    tabLearn: "શીખો",
    tabAbout: "વિશે અને મોડેલ્સ",
    tabDashboard: "ડેશબોર્ડ",
    tabSpread: "રોગ ફેલાવો ટાઇમલાઇન",
    tabCompare: "સ્કેન સરખામણી",
    tabSymptoms: "લક્ષણ માર્ગદર્શિકા",
    tabExpert: "નિષ્ણાત સમીક્ષા",
    btnAnalyzeCrop: "પાકની તપાસ કરો",

    heroBadge: "એગ્રીટેક + કમ્પ્યુટર વિઝન ઇન્ટેલિજન્સ • 94.2% ચકાસાયેલ ચોકસાઈ",
    heroHeadline: "પાકના રોગો ફેલાય તે પહેલાં જ શોધી કાઢો.",
    heroSubheadline: "પ્રારંભિક રોગના લક્ષણોને ઓળખવા, જોખમનું મૂલ્યાંકન કરવા અને સમયસર ખેતરના નિર્ણયો લેવામાં મદદ કરવા માટે AI પાક સ્વાસ્થ્ય ઇન્ટેલિજન્સ.",
    primaryCta: "પાક સ્કેન કરો",
    exploreCropHealth: "પાક સ્વાસ્થ્ય જુઓ",
    exploreHowItWorks: "તે કેવી રીતે કાર્ય કરે છે",
    startHealthCheck: "પાક સ્વાસ્થ્ય તપાસ શરૂ કરો",
    howItWorksTitle: "એગ્રી રક્ષક કેવી રીતે કામ કરે છે",
    step1Title: "1. ફોટો પાડો",
    step1Desc: "મોબાઇલ કેમેરાથી અસરગ્રસ્ત પાનનો સ્પષ્ટ ફોટો પાડો અથવા અપલોડ કરો.",
    step2Title: "2. AI વિશ્લેષણ",
    step2Desc: "AI ફોટાની ગુણવત્તા ચકાસીને ચોક્કસ રોગનું તાત્કાલિક નિદાન કરે છે.",
    step3Title: "3. કારણ સમજો",
    step3Desc: "Explainable AI હીટમેપ દ્વારા પાન પર રોગ ક્યાં છે અને કેટલો ફેલાયેલો છે તે જુઓ.",
    step4Title: "4. દેખરેખ રાખો",
    step4Desc: "સમય જતાં વિવિધ ખેતરોમાં પાકના સ્વાસ્થ્ય અને રોગના ફેલાવા પર નજર રાખો.",

    cvActive: "કમ્પ્યુટર વિઝન સક્રિય છે",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "શરૂઆતનો સુકારો (94.2% AI અંદાજ)",
    targetSpot: "ટાર્ગેટ",
    lesionSpot: "ડાઘ / ક્ષતિ",
    affectedHud: "અસરગ્રસ્ત: 18% • સ્કોર: 78/100",
    stepPhoto: "📷 ફોટો",
    stepAIVision: "🧠 AI વિઝન",
    stepDetection: "🔍 ઓળખ",
    stepScore: "📊 સ્કોર (78)",
    stepWarning: "⚠️ ચેતવણી",

    lifecycleBadge: "સંપૂર્ણ એગ્રીટેક આર્કિટેક્ચર",
    lifecycleTitle: "સંપૂર્ણ પાક સ્વાસ્થ્ય જીવનચક્ર",
    lifecycleSubtitle: "એક પાનના ફોટાથી લઈને ખેતર-વ્યાપી સતત રોગ નિરીક્ષણ સુધી.",
    lcStep1Title: "1. કેપ્ચર અને ગુણવત્તા ચકાસણી",
    lcStep1Desc: "બ્લર, પ્રકાશ અને પાનના કવરેજની અગાઉથી સ્વચાલિત ચકાસણી.",
    lcStep2Title: "2. ન્યુરલ રોગ સ્ક્રીનીંગ",
    lcStep2Desc: "Grad-CAM વિઝ્યુઅલ અટેન્શન હીટમેપ્સ સાથે સચોટ મલ્ટી-ક્લાસ વર્ગીકરણ.",
    lcStep3Title: "3. ગંભીરતા અને સ્વાસ્થ્ય સ્કોર",
    lcStep3Desc: "પાનના નુકસાન ટકાવારીનું માપ અને મોડ્યુલર પાક સ્વાસ્થ્ય સ્કોર (0-100).",
    lcStep4Title: "4. જોખમ ટ્રેકિંગ અને સલાહ",
    lcStep4Desc: "હવામાન આધારિત રોગ જોખમ આગાહી, સુરક્ષિત IPM પગલાં અને જૂના સ્કેન સાથે સરખામણી.",

    supportedCropsTitle: "સમર્થિત કૃષિ પાકો અને મુખ્ય રોગો",
    supportedCropsSubtitle: ">90% ચોકસાઈના ધોરણો સાથે પ્રમાણિત ફિલ્ડ ડેટાસેટ્સ પર પ્રશિક્ષિત.",
    exploreFullLibrary: "સંપૂર્ણ રોગ લાયબ્રેરી જુઓ",

    cardDashboardTitle: "પાક સ્વાસ્થ્ય ડેશબોર્ડ",
    cardDashboardDesc: "પાંદડાના સ્વાસ્થ્યના વલણો જુઓ, ખેતરોનું નિરીક્ષણ કરો અને રોગના ચાર્ટ તપાસો.",
    cardRiskTitle: "હવામાન રોગ જોખમ મોનિટર",
    cardRiskDesc: "રીઅલ-ટાઇમ ભેજ, તાપમાન અને ફૂગના રોગો ફેલાવવાની સંભાવના સૂચકાંક.",
    cardModelTitle: "ડેટાસેટ અને મોડેલ ગુણવત્તા ગેટ",
    cardModelDesc: "મોડેલ મૂલ્યાંકન મેટ્રિક્સ (94.25% ટેસ્ટ ચોકસાઈ) અને વિશ્વસનીય ધોરણો.",

    scanMyCrop: "પાક સ્કેન કરો",
    scanSubtitle: "રોગની વહેલી ઓળખ માટે કેમેરાને પાન પર રાખો અથવા ફોટો અપલોડ કરો.",
    selectCropLabel: "પાક પસંદ કરો (વૈકલ્પિક):",
    cropAll: "બધા / આપમેળે ઓળખ",
    cropRice: "ડાંગર (Rice)",
    cropTomato: "ટામેટા (Tomato)",
    cropCotton: "કપાસ (Cotton)",
    cropPotato: "બટાકા (Potato)",
    cropMaize: "મકાઈ (Maize)",
    cropSoybean: "સોયાબીન (Soybean)",
    cropSugarcane: "શેરડી (Sugarcane)",
    cropOnion: "ડુંગળી (Onion)",
    cropPomegranate: "દાડમ (Pomegranate)",
    cropChilli: "મરચી (Chilli)",
    cropWheat: "ઘઉં (Wheat)",

    dragDropText: "પાનનો ફોટો અહીં ખેંચો, અથવા",
    browseFiles: "ફાઇલો પસંદ કરો",
    cameraPreview: "લાઇવ કેમેરા વ્યુ",
    switchCamera: "કેમેરા બદલો",
    capturePhoto: "ફોટો પાડો",
    retake: "ફરીથી ફોટો લો",
    scanNow: "પાન સ્કેન કરો",
    uploadGallery: "ગેલેરીમાંથી અપલોડ કરો",
    analyzeNow: "પાક સ્વાસ્થ્ય તપાસો",
    analyzingText: "વિઝન AI દ્વારા પાનનું વિશ્લેષણ ચાલુ છે...",
    imageStaged: "છબી તૈયાર છે",
    multiStageAnalysis: "AI બહુ-તબક્કા પાક સ્વાસ્થ્ય વિશ્લેષણ",
    stage1: "તબક્કો 01/07 — પાનની છબીનું નોર્મલાઈઝેશન અને પ્રીપ્રોસેસિંગ...",
    stage2: "તબક્કો 02/07 — પાકની ઓળખ અને પાનની સીમાઓની ચકાસણી...",
    stage3: "તબક્કો 03/07 — પાનનો રંગ બદલાવ અને રોગના લક્ષણોની તપાસ...",
    stage4: "તબક્કો 04/07 — ન્યુરલ એમ્બેડિંગ્સને રોગના વર્ગો સાથે મેચ કરવું...",
    stage5: "તબક્કો 05/07 — નુકસાનની ગંભીરતા અને અસરગ્રસ્ત વિસ્તારની ગણતરી...",
    stage6: "તબક્કો 06/07 — હવામાન આધારિત રોગના જોખમ અને સ્કોરની ગણતરી...",
    stage7: "તબક્કો 07/07 — સલામત IPM ભલામણો અને ઉપાયો તૈયાર કરવા...",
    cameraUnavailable: "કેમેરા ઍક્સેસ ઉપલબ્ધ નથી. કૃપા કરીને પરવાનગી તપાસો અથવા છબી અપલોડ કરો.",

    guidance1: "ફ્રેમની અંદર એક સ્પષ્ટ પાન રાખો",
    guidance2: "પૂરતો કુદરતી પ્રકાશ હોવાની ખાતરી કરો",
    guidance3: "ધૂંધળી અથવા હલતી છબી ટાળો",

    voiceEnabled: "વોઈસ ગાઇડ ચાલુ",
    voiceDisabled: "વોઈસ ગાઇડ બંધ",
    voiceMoveCloser: "કેમેરાને પાનની સપાટીની નજીક લાવો.",
    voiceKeepInside: "પાનને ફ્રેમની અંદર સ્થિર રાખો.",
    voiceCaptured: "છબી સફળતાપૂર્વક લેવામાં આવી છે. AI રોગ વિશ્લેષણ માટે તૈયાર છે.",
    voiceUploaded: "છબી સફળતાપૂર્વક અપલોડ થઈ ગઈ છે. AI રોગ વિશ્લેષણ માટે તૈયાર છે.",
    voiceRetake: "છબીની ગુણવત્તા ઓછી છે. કૃપા કરીને સારા પ્રકાશમાં ફરીથી ફોટો લો.",
    voiceAnalyzing: "વિઝન AI દ્વારા પાકના પાનની તપાસ ચાલુ છે...",
    voiceAnalysisComplete: "વિશ્લેષણ પૂર્ણ થયું. પાક સ્વાસ્થ્ય પરિણામ તૈયાર છે.",

    qualityCheckTitle: "સ્વચાલિત ફોટો ગુણવત્તા પરીક્ષણ",
    qualityPass: "વિશ્વસનીય પરિણામ માટે છબીની ગુણવત્તા ઉત્તમ છે.",
    qualityLow: "વિશ્વસનીય પરિણામ માટે છબીની ગુણવત્તા ઓછી છે.",
    sharpness: "તીક્ષ્ણતા (શાર્પનેસ)",
    brightness: "પ્રકાશ",
    resolution: "રિઝોલ્યુશન",
    leafCoverage: "પાનની હાજરી",
    retakePhotoBtn: "ફરીથી ફોટો લો",
    proceedAnyway: "તેમ છતાં આગળ વધો",

    diagnosisTitle: "રોગ ઓળખ પરિણામો",
    cropDetected: "ઓળખાયેલ પાક",
    condition: "જોવા મળેલ રોગ / સ્થિતિ",
    confidence: "વિશ્વાસપાત્રતા",
    healthStatus: "પાક સ્વાસ્થ્ય",
    severityLevel: "ગંભીરતા સ્તર",
    affectedArea: "અસરગ્રસ્ત વિસ્તાર",
    healthyArea: "સ્વસ્થ વિસ્તાર",
    scientificName: "વૈજ્ઞાનિક રોગકારક નામ",
    statusHealthy: "સ્વસ્થ પાક",
    statusEarly: "શરૂઆતના લક્ષણો",
    statusModerate: "મધ્યમ નુકસાન",
    statusSevere: "ગંભીર નુકસાન",
    statusUnknown: "અનિશ્ચિત / સમીક્ષા જરૂરી",
    statusAtRisk: "જોખમમાં છે",

    whyDetectedTitle: "આ રોગ કેમ ઓળખાયો?",
    xaiExplanation: "AI એ પાનના હાઇલાઇટ કરેલા ભાગોમાં લક્ષણો અને પેટર્ન જોઈને આ તારણ કાઢ્યું છે.",
    showHeatmap: "AI અટેન્શન હીટમેપ (Grad-CAM)",
    showOriginal: "મૂળ પાનનો ફોટો",
    gradcamDesc: "હીટમેપ પર દેખાતા રંગીન વિસ્તારો એ દર્શાવે છે કે AI એ કયા ભાગના આધારે રોગ નક્કી કર્યો.",

    severityMeterTitle: "રોગ ગંભીરતા મીટર",
    severityActionUrgency: "સૂચવેલ પગલાંની તાકીદ",

    guidanceTitle: "ખેડૂતો માટે પગલાં લેવા યોગ્ય નિવારણ અને સંભાળ માર્ગદર્શન",
    whatDetected: "શું જોવા મળ્યું",
    whatSymptomsMean: "આ લક્ષણોનો અર્થ શું છે",
    whatToDoNow: "હમણાં તરત શું કરવું",
    preventSpread: "વધુ ફેલાવો કેવી રીતે રોકવો",
    whenSeekExpert: "કૃષિ નિષ્ણાતની મદદ ક્યારે લેવી",
    helplineBtn: "કિસાન હેલ્પલાઇન (1800-180-1551)",

    lowConfidenceTitle: "અનિશ્ચિત AI આગાહી",
    lowConfidenceMsg: "AI ખાતરીપૂર્વક આ સ્થિતિ ઓળખી શક્યું નથી. કૃપા કરીને નીચેના વિકલ્પો વાપરો:",
    tryAnotherImg: "બીજો ફોટો વાપરો",
    describeSymptomsBtn: "લક્ષણો જણાવો",
    requestExpertBtn: "નિષ્ણાત સમીક્ષા માંગો",

    fieldsTitle: "ખેતર વ્યવસ્થાપન",
    totalFields: "કુલ ખેતરો",
    recentScans: "તાજેતરના સ્કેન",
    healthyCrops: "સ્વસ્થ પાક",
    atRiskCrops: "જોખમમાં રહેલા પાક",
    activeAlerts: "સક્રિય એલર્ટ્સ",
    addNewField: "+ નવું ખેતર ઉમેરો",
    fieldName: "ખેતરનું નામ",
    fieldLocation: "સ્થળ / ગામ",
    fieldAcreage: "વિસ્તાર (એકર)",
    fieldSowingDate: "વાવણી તારીખ",
    saveField: "ખેતર સાચવો",
    fieldHealthMap: "ઇન્ટરેક્ટિવ ખેતર સ્વાસ્થ્ય નકશો",
    filterByCrop: "પાક પ્રમાણે ફિલ્ટર",
    filterBySeverity: "ગંભીરતા પ્રમાણે ફિલ્ટર",
    allSeverities: "બધા ગંભીરતા સ્તર",
    allCrops: "બધા પાક",

    spreadTitle: "રોગ ફેલાવો ટ્રેકિંગ",
    spreadSubtitle: "સમય સાથે (દિવસ 1 થી 15) પાન પર રોગ કેવી રીતે બદલાયો તે તપાસો.",
    timelineDay1: "દિવસ 1 (શરૂઆત)",
    timelineDay5: "દિવસ 5 (ફેલાવો)",
    timelineDay10: "દિવસ 10 (વૃદ્ધિ)",
    timelineDay15: "દિવસ 15 (વર્તમાન સ્થિતિ)",

    compareTitle: "ફોટોથી ફોટો સ્વાસ્થ્ય સરખામણી",
    compareSubtitle: "સારવારની અસરકારકતા ચકાસવા માટે જૂના અને નવા સ્કેનની સરખામણી કરો.",
    previousScan: "અગાઉનું સ્કેન",
    latestScan: "નવીનતમ સ્કેન",
    verdictImproved: "સ્વાસ્થ્યમાં સુધારો થયો છે",
    verdictUnchanged: "કોઈ ફેરફાર નથી",
    verdictWorsening: "સ્થિતિ બગડવાની સંભાવના છે",
    selectScanA: "પ્રારંભિક સ્કેન પસંદ કરો",
    selectScanB: "તાજેતરનું સ્કેન પસંદ કરો",
    runComparison: "સરખામણી કરો",

    symptomTitle: "માર્ગદર્શિત લક્ષણ સહાયક",
    symptomSubtitle: "ચોક્કસ નિદાન માટે સરળ પ્રશ્નોના જવાબો આપો.",
    symptomQuestion: "પાન પર તમને કયા લક્ષણો દેખાય છે?",
    symptomSpots: "ડાઘ (કાળા / પીળા / કથ્થઈ)",
    symptomYellowing: "પાન પીળું પડવું",
    symptomBrowning: "પાન બળવું / કથ્થઈ થવું",
    symptomCurling: "પાન વળવું / સંકોચાવું",
    symptomWilting: "છોડ કરમાવો / નમી જવો",
    symptomPowder: "સફેદ કે રાખોડી પાવડર જેવો થર",
    symptomHoles: "કીટકોએ ખાધેલા કાણાં",
    symptomOther: "અન્ય અસામાન્ય લક્ષણો",
    evaluateSymptoms: "લક્ષણો તપાસો",

    notificationsTitle: "સૂચના કેન્દ્ર",
    markAllRead: "બધા વાંચેલા તરીકે ચિહ્નિત કરો",
    noNotifications: "કોઈ નવી સૂચના નથી",
    newScanDone: "નવું સ્કેન સફળતાપૂર્વક પૂર્ણ થયું",
    riskIncreased: "ખેતર 02 માં રોગનું જોખમ વધ્યું છે",
    followUpRec: "3 દિવસમાં ફરીથી સ્કેન કરવાની ભલામણ",
    expertReviewDone: "સ્કેન #SC-4821 ની નિષ્ણાત સમીક્ષા પૂર્ણ થઈ",

    expertPortalTitle: "કૃષિ નિષ્ણાત સમીક્ષા માટે વિનંતી કરો",
    expertNotesPlaceholder: "ખેતરની સ્થિતિ, ખાતર અથવા છંટકાવની વિગતો લખો...",
    submitReview: "નિષ્ણાતને મોકલો",
    reviewSubmitted: "પ્રમાણિત કૃષિ વૈજ્ઞાનિકોને વિનંતી મોકલવામાં આવી છે.",
    statusPending: "બાકી",
    statusUnderReview: "સમીક્ષા હેઠળ",
    statusReviewed: "પ્રમાણિત થયેલ",
    expertNotes: "કૃષિ નિષ્ણાત ફીલ્ડ નોંધો",
    expertVerifyBtn: "લેવલ 4 તરીકે પ્રમાણિત કરો",
    mlMetricsTitle: "ML મોડેલ ગુણવત્તા ધોરણો (90%+ લક્ષ્ય)",
    testAccuracy: "ટેસ્ટ ચોકસાઈ",
    macroF1: "Macro F1-Score",
    realFieldAcc: "ફીલ્ડ ચોકસાઈ",
    genGap: "Generalization Gap",

    riskTitle: "હવામાન રોગ જોખમ રડાર",
    riskSubtitle: "પર્યાવરણીય પરિબળો અને ફૂગના રોગોના ફેલાવાનું જોખમ મીટર.",
    riskLow: "ઓછું જોખમ",
    riskWatch: "નિરીક્ષણ રાખો (મધ્યમ)",
    riskHigh: "ઉચ્ચ જોખમ",
    temp: "તાપમાન",
    humidity: "ભેજ",
    rainfall: "વરસાદ",
    trapDensity: "ટ્રેપ ઘનતા",
    primaryCrop: "મુખ્ય પાક",
    elevatedNotice: "ઉચ્ચ જોખમ મળ્યું છે. તમારા પાકનું નિયમિત નિરીક્ષણ કરો.",
  },

  // 6. Marathi (मराठी)
  mr: {
    appName: "ॲग्रीरक्षक AI",
    tagline: "लवकर ओळखा. संपूर्ण पीक वाचवा.",
    govtBadge: "महाराष्ट्र शासन • SIH 2026",
    aiDisclaimer: "AI चे अंदाज प्राथमिक तपासणीसाठी आहेत, हे कृषी तज्ज्ञांच्या सल्ल्याची जागा घेऊ शकत नाहीत.",
    kisanHelpline: "किसान हेल्पलाइन",

    tabHome: "मुख्य पृष्ठ",
    tabDetect: "रोग निदान",
    tabCropHealth: "पीक आरोग्य",
    tabRiskRadar: "जोखीम रडार",
    tabFields: "शेत व्यवस्थापन",
    tabHistory: "स्कॅन इतिहास",
    tabLibrary: "रोग ज्ञानकोश",
    tabLearn: "कृषी शिक्षण",
    tabAbout: "प्रणाली व मॉडेल",
    tabDashboard: "डॅशबोर्ड",
    tabSpread: "रोग प्रसार टाइमलाइन",
    tabCompare: "स्कॅन तुलना",
    tabSymptoms: "लक्षण मार्गदर्शक",
    tabExpert: "तज्ज्ञ पुनरावलोकन",
    btnAnalyzeCrop: "पीक तपासा",

    heroBadge: "ॲग्रीटेक + कॉम्प्युटर व्हिजन इंटेलिजन्स • ९४.२% अचूकता",
    heroHeadline: "रोगांची वेळेवर ओळख. पिकांचे १००% संरक्षण.",
    heroSubheadline: "पानांच्या फोटोवरून रोगांचे प्राथमिक निदान, नुकसान प्रमाण आणि शेताचे आरोग्य तपासणीसाठी प्रगत AI प्लॅटफॉर्म.",
    primaryCta: "तुमचे पीक स्कॅन करा",
    exploreCropHealth: "पीक आरोग्य तपासा",
    exploreHowItWorks: "कसे कार्य करते ते पहा",
    startHealthCheck: "पीक आरोग्य तपासणी सुरू करा",
    howItWorksTitle: "ॲग्रीरक्षक कसे कार्य करते",
    step1Title: "१. फोटो काढा",
    step1Desc: "मोबाईल कॅमेऱ्याने बाधित पानाचा स्पष्ट फोटो काढा किंवा अपलोड करा.",
    step2Title: "२. AI विश्लेषण",
    step2Desc: "AI फोटोची गुणवत्ता तपासून अचूक रोग निदान करते.",
    step3Title: "३. कारण समजून घ्या",
    step3Desc: "Explainable AI हीटमॅपद्वारे कोणत्या भागामुळे रोग ओळखला ते पहा.",
    step4Title: "४. शेताचे निरीक्षण करा",
    step4Desc: "अनेक शेतांचे आरोग्य आणि रोगाचा प्रसार नकाशावर ट्रॅक करा.",

    cvActive: "कॉम्प्युटर व्हिजन सक्रिय आहे",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "करपा / अर्ली ब्लाઇટ (९४.२% AI अंदाज)",
    targetSpot: "लक्ष्य",
    lesionSpot: "डाग / फोड",
    affectedHud: "नुकसान: १८% • स्कोअर: ७८/१००",
    stepPhoto: "📷 फोटो",
    stepAIVision: "🧠 AI व्हिजन",
    stepDetection: "🔍 निदान",
    stepScore: "📊 स्कोअर (७८)",
    stepWarning: "⚠️ चेतावणी",

    lifecycleBadge: "सविस्तर ॲग्रीटेक रचना",
    lifecycleTitle: "संपूर्ण पीक आरोग्य चक्र",
    lifecycleSubtitle: "पानाच्या फोटोपासून ते संपूर्ण शेताच्या सातत्यपूर्ण रोग नियंत्रणापर्यंत.",
    lcStep1Title: "१. फोटो व गुणवत्ता तपासणी",
    lcStep1Desc: "कॅमेरा किंवा गॅलरीतून फोटो घेताना स्पष्टता, उजेड आणि पानाच्या भागाची पूर्व तपासणी.",
    lcStep2Title: "२. न्यूरल रोग स्क्रीनिंग",
    lcStep2Desc: "Grad-CAM व्हिज्युअल हीटमॅपसह अचूक बहु-वर्गीय रोग ओळख.",
    lcStep3Title: "३. तीव्रता व आरोग्य स्कोअर",
    lcStep3Desc: "बाधित क्षेत्राचे मापन आणि प्रमाणित पीक आरोग्य स्कोअर (०-१००).",
    lcStep4Title: "४. जोखीम ट्रॅकिंग व सल्ला",
    lcStep4Desc: "हवामान आधारित रोग धोका अंदाज, सुरक्षित IPM उपाय आणि ऐतिहासिक तुलना.",

    supportedCropsTitle: "प्रमुख पिके आणि त्यांचे संभाव्य रोग",
    supportedCropsSubtitle: ">९०% अचूकतेसह शेतातील प्रत्यक्ष माहितीवर आधारित मॉडेल.",
    exploreFullLibrary: "संपूर्ण रोग ज्ञानकोश पहा",

    cardDashboardTitle: "पीक आरोग्य डॅशबोर्ड",
    cardDashboardDesc: "आरोग्य ट्रेंड ट्रॅक करा, शेतांची स्थिती तपासा आणि रोग वारंवारता चार्ट पहा.",
    cardRiskTitle: "हवामान व रोग जोखीम रडार",
    cardRiskDesc: "थेट आर्द्रता, तापमान आणि बुरशीजन्य रोग प्रसाराचा धोका मीटर.",
    cardModelTitle: "डेटासेट आणि मॉडेल गुणवत्ता गेट",
    cardModelDesc: "मॉडेल अचूकता मेट्रिक्स (९४.२५% चाचणी अचूकता) आणि विश्वासार्ಹ निकष.",

    scanMyCrop: "माझे पीक स्कॅन करा",
    scanSubtitle: "रोग लवकर ओळखण्यासाठी पानावर कॅमेरा स्थिर ठेवा किंवा फोटो निवडा.",
    selectCropLabel: "पीक निवडा (पर्यायी):",
    cropAll: "सर्व / स्वयंचलित ओळख",
    cropRice: "भात (Rice)",
    cropTomato: "टोमॅटो (Tomato)",
    cropCotton: "कापूस (Cotton)",
    cropPotato: "बटाटा (Potato)",
    cropMaize: "मका (Maize)",
    cropSoybean: "सोयाबीन (Soybean)",
    cropSugarcane: "ऊस (Sugarcane)",
    cropOnion: "कांदा (Onion)",
    cropPomegranate: "डाळिंब (Pomegranate)",
    cropChilli: "मिरची (Chilli)",
    cropWheat: "गहू (Wheat)",

    dragDropText: "पानाचा फोटो येथे ड्रॅग करा किंवा",
    browseFiles: "गॅलरीतून निवडा",
    cameraPreview: "थेट कॅमेरा दृश्य",
    switchCamera: "कॅमेरा बदला",
    capturePhoto: "फोटो काढा",
    retake: "पुन्हा फोटो काढा",
    scanNow: "पीक स्कॅन करा",
    uploadGallery: "गॅलरीतून फोटो निवडा",
    analyzeNow: "पीक आरोग्य तपासा",
    analyzingText: "Vision AI द्वारे विश्लेषण सुरू आहे...",
    imageStaged: "फोटो तयार आहे",
    multiStageAnalysis: "AI बहु-स्तरीय पीक आरोग्य विश्लेषण",
    stage1: "टप्पा ०१/०७ — पानाच्या फोटोचे पूर्व-प्रक्रिया आणि सामान्यीकरण...",
    stage2: "टप्पा ०२/०७ — पीक ओळख आणि पानाच्या कडांची पडताळणी...",
    stage3: "टप्पा ०३/०७ — रंगबदल आणि लक्षणांची सखोल तपासणी...",
    stage4: "टप्पा ०४/०७ — न्यूरल पॅटर्न रोगांच्या डेटाबेसशी जुळवणे...",
    stage5: "टप्पा ०५/०७ — डागांची तीव्रता आणि बाधित भागाची टक्केवारी काढणे...",
    stage6: "टप्पा ०६/०७ — हवामान जोखीम आणि पीक आरोग्य स्कोअर मोजणे...",
    stage7: "टप्पा ०७/०७ — शेतकऱ्यांसाठी सुरक्षित IPM सल्ला तयार करणे...",
    cameraUnavailable: "कॅमेरा सुरू करता आला नाही. कृपया परवानग्या तपासा किंवा फोटो अपलोड करा.",

    guidance1: "चौकटीत एक स्पष्ट पान ठेवा",
    guidance2: "पुरेसा सूर्यप्रकाश असल्याची खात्री करा",
    guidance3: "अस्पष्ट फोटो टाळा",

    voiceEnabled: "आवाज मार्गदर्शन सुरू",
    voiceDisabled: "आवाज मार्गदर्शन बंद",
    voiceMoveCloser: "कॅमेरा पानाच्या जवळ आणा.",
    voiceKeepInside: "पान चौकटीत स्थिर ठेवा.",
    voiceCaptured: "पानाचा फोटो यशस्वीरित्या काढला. AI रोग विश्लेषणासाठी तयार आहे.",
    voiceUploaded: "पानाचा फोटो यशस्वीरित्या अपलोड केला. AI रोग विश्लेषणासाठी तयार आहे.",
    voiceRetake: "फोटो अस्पष्ट आहे, चांगल्या उजेडात पुन्हा काढा.",
    voiceAnalyzing: "व्हिजन AI द्वारे पानाच्या फोटोचे विश्लेषण सुरू आहे...",
    voiceAnalysisComplete: "विश्लेषण पूर्ण झाले. पीक आरोग्याचा अहवाल तयार आहे.",

    qualityCheckTitle: "स्वयंचलित फोटो गुणवत्ता तपासणी",
    qualityPass: "फोटोची गुणवत्ता अचूक निदानासाठी योग्य आहे.",
    qualityLow: "फोटोची गुणवत्ता खात्रीशीर निदानासाठी कमी आहे.",
    sharpness: "स्पष्टता (शार्पनेस)",
    brightness: "प्रकाश (उजेड)",
    resolution: "रिझोल्यूशन",
    leafCoverage: "पानाचा भाग",
    retakePhotoBtn: "पुन्हा फोटो काढा",
    proceedAnyway: "तरीही पुढे जा",

    diagnosisTitle: "रोग व कीड निदान अहवाल",
    cropDetected: "ओळखलेले पीक",
    condition: "आढळलेला रोग / स्थिती",
    confidence: "विश्वासार्हता",
    healthStatus: "पीक आरोग्य",
    severityLevel: "तीव्रता पातळी",
    affectedArea: "बाधित पानाचे क्षेत्रफळ",
    healthyArea: "निरोगी भाग",
    scientificName: "शास्त्रीय / जिवाणू नाव",
    statusHealthy: "निरोगी पीक",
    statusEarly: "प्रारंभिक लक्षणे",
    statusModerate: "मध्यम नुकसान",
    statusSevere: "गंभीर नुकसान",
    statusUnknown: "अनिश्चित नमुना",
    statusAtRisk: "धोक्यात आहे",

    whyDetectedTitle: "हे निदान का झाले?",
    xaiExplanation: "AI ने हायलाइट केलेल्या पानावरील डाग आणि लक्षणांच्या आधारे हा निष्कर्ष काढला आहे.",
    showHeatmap: "AI लक्ष हीटमॅप (Grad-CAM)",
    showOriginal: "मूळ फोटो",
    gradcamDesc: "मॉडेलने निदानासाठी ज्या भागांवर लक्ष केंद्रित केले ते रंगीत नकाशात दिसत आहेत.",

    severityMeterTitle: "रोग तीव्रता मीटर",
    severityActionUrgency: "तातडीची शिफारस",

    guidanceTitle: "शेतकऱ्यांसाठी कृती आराखडा व सल्ला",
    whatDetected: "काय आढळले",
    whatSymptomsMean: "या लक्षणांचा अर्थ काय",
    whatToDoNow: "आता त्वरित काय करावे",
    preventSpread: "पुढील प्रसार कसा रोखावा",
    whenSeekExpert: "कृषी तज्ज्ञांचा सल्ला कधी घ्यावा",
    helplineBtn: "किसान हेल्पलाइन (1800-180-1551)",

    lowConfidenceTitle: "अस्पष्ट AI निकाल",
    lowConfidenceMsg: "AI या नमुन्याची खात्री करू शकले नाही. कृपया खालील पर्याय वापरा:",
    tryAnotherImg: "दुसरा फोटो वापरा",
    describeSymptomsBtn: "लक्षणे सांगा",
    requestExpertBtn: "तज्ज्ञ पुनरावलोकन मागा",

    fieldsTitle: "शेत व्यवस्थापन",
    totalFields: "एकूण शेते",
    recentScans: "अलीकडील स्कॅन",
    healthyCrops: "निरोगी पिके",
    atRiskCrops: "धोक्यात असलेली पिके",
    activeAlerts: "सक्रिय सूचना",
    addNewField: "+ नवीन शेत जोडा",
    fieldName: "शेताचे नाव",
    fieldLocation: "गाव / ठिकाण",
    fieldAcreage: "क्षेत्रफळ (एकर)",
    fieldSowingDate: "पेरणी दिनांक",
    saveField: "शेत जतन करा",
    fieldHealthMap: "शेताचा आरोग्य नकाशा",
    filterByCrop: "पिकानुसार फिल्टर",
    filterBySeverity: "तीव्रतेनुसार फिल्टर",
    allSeverities: "सर्व पातळी",
    allCrops: "सर्व पिके",

    spreadTitle: "रोग प्रसार ट्रॅकिंग",
    spreadSubtitle: "वेळेनुसार (दिवस १ ते १५) पानावरील डागांचे प्रमाण कसे बदलले ते पहा.",
    timelineDay1: "दिवस १ (सुरुवात)",
    timelineDay5: "दिवस ५ (प्रसार)",
    timelineDay10: "दिवस १० (वाढ)",
    timelineDay15: "दिवस १५ (सध्याची स्थिती)",

    compareTitle: "फोटो ते फोटो आरोग्य तुलना",
    compareSubtitle: "उपचाराचा परिणाम मोजण्यासाठी जुन्या आणि ताज्या स्कॅनची तुलना करा.",
    previousScan: "मागील स्कॅन",
    latestScan: "सध्याचा स्कॅन",
    verdictImproved: "आरोग्यात सुधारणा झाली",
    verdictUnchanged: "बदल नाही",
    verdictWorsening: "नुकसान वाढण्याची शक्यता",
    selectScanA: "मूळ स्कॅन निवडा",
    selectScanB: "ताजा स्कॅन निवडा",
    runComparison: "तुलना करा",

    symptomTitle: "लक्षण मार्गदर्शक",
    symptomSubtitle: "सोप्या प्रश्नांची उत्तरे देऊन अचूक निदानात मदत करा.",
    symptomQuestion: "पानावर तुम्हाला काय दिसत आहे?",
    symptomSpots: "डाग (काळे / पिवळे / तांबडे)",
    symptomYellowing: "पान पिवळे पडणे",
    symptomBrowning: "पान जळणे किंवा तपकिरी होणे",
    symptomCurling: "पान आकसणे / मुरडणे",
    symptomWilting: "झाड सुकणे / कोमेजणे",
    symptomPowder: "पानावर पांढरी किंवा राखी भुकटी",
    symptomHoles: "किडीने खाल्लेली छिद्रे",
    symptomOther: "इतर काही वेगळे",
    evaluateSymptoms: "लक्षणे तपासा",

    notificationsTitle: "सूचना केंद्र",
    markAllRead: "सर्व वाचल्याचे चिन्हांकित करा",
    noNotifications: "नवीन सूचना नाहीत",
    newScanDone: "नवीन स्कॅन यशस्वीरित्या पूर्ण झाले",
    riskIncreased: "शेत ०२ मध्ये रोगाचा धोका वाढला",
    followUpRec: "३ दिवसांत पुन्हा तपासणीची शिफारस",
    expertReviewDone: "स्कॅन #SC-4821 चे तज्ज्ञ पुनरावलोकन पूर्ण",

    expertPortalTitle: "कृषी तज्ज्ञांकडे पुनरावलोकनासाठी पाठवा",
    expertNotesPlaceholder: "शेतातील निरीक्षणे, खते किंवा फवारणीचा तपशील लिहा...",
    submitReview: "तज्ज्ञांकडे पाठवा",
    reviewSubmitted: "तपासणीसाठी तज्ज्ञांकडे पाठवण्यात आले आहे.",
    statusPending: "प्रलंबित",
    statusUnderReview: "तपासणी सुरू",
    statusReviewed: "प्रमाणित झाले",
    expertNotes: "कृषी तज्ज्ञ शेत नोंदी",
    expertVerifyBtn: "प्रमाणित करा (Level 4)",
    mlMetricsTitle: "ML मॉडेल गुणवत्ता गेट (९०%+ ध्येय)",
    testAccuracy: "तपासणी अचूकता",
    macroF1: "Macro F1-Score",
    realFieldAcc: "शेत अचूकता",
    genGap: "Generalization Gap",

    riskTitle: "हवामान व रोग धोका रडार",
    riskSubtitle: "हवामानातील बदल आणि बुरशीजन्य रोगांच्या प्रसाराचा धोका मीटर.",
    riskLow: "कमी धोका",
    riskWatch: "निरीक्षण ठेवा (मध्यम)",
    riskHigh: "उच्च धोका",
    temp: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पाऊस",
    trapDensity: "सापळा घनता",
    primaryCrop: "प्रमुख पीक",
    elevatedNotice: "उच्च धोका आढळला आहे. पिकांची काळजीपूर्वक पाहणी करा.",
  },

  // 7. Hindi (हिंदी)
  hi: {
    appName: "एग्रीरक्षक AI",
    tagline: "जल्दी पहचानें. पूरी फसल बचाएं.",
    govtBadge: "SIH 2026 • AI कृषि सुरक्षा",
    aiDisclaimer: "AI भविष्यवाणी केवल प्राथमिक जांच के लिए है, यह विशेषज्ञ कृषि सलाह का विकल्प नहीं है।",
    kisanHelpline: "किसान हेल्पलाइन",

    tabHome: "मुख्य पृष्ठ",
    tabDetect: "रोग पहचान",
    tabCropHealth: "फसल स्वास्थ्य",
    tabRiskRadar: "जोखिम रडार",
    tabFields: "खेत प्रबंधन",
    tabHistory: "स्कैन इतिहास",
    tabLibrary: "रोग लाइब्रेरी",
    tabLearn: "कृषि सीखें",
    tabAbout: "सिस्टम व मॉडल",
    tabDashboard: "डैशबोर्ड",
    tabSpread: "रोग फैलाव टाइमलाइन",
    tabCompare: "स्कैन तुलना",
    tabSymptoms: "लक्षण गाइड",
    tabExpert: "विशेषज्ञ समीक्षा",
    btnAnalyzeCrop: "फसल जांचें",

    heroBadge: "एग्रीटेक + कंप्यूटर विज़न इंटेलिजेंस • 94.2% सत्यापित सटीकता",
    heroHeadline: "फसल रोगों की समय पर पहचान. सुरक्षित उत्पादन.",
    heroSubheadline: "पत्ती की तस्वीर से प्रारंभिक रोग पहचान, क्षति आकलन और कई खेतों की स्वास्थ्य निगरानी के लिए AI प्लेटफॉर्म।",
    primaryCta: "अपनी फसल स्कैन करें",
    exploreCropHealth: "फसल स्वास्थ्य देखें",
    exploreHowItWorks: "यह कैसे काम करता है",
    startHealthCheck: "फसल जांच शुरू करें",
    howItWorksTitle: "एग्रीरक्षक कैसे काम करता है",
    step1Title: "1. फोटो लें",
    step1Desc: "प्रभावित पत्ती की स्पष्ट तस्वीर खींचें या गैलरी से अपलोड करें।",
    step2Title: "2. AI विश्लेषण",
    step2Desc: "AI तुरंत पत्ती की गुणवत्ता जांच कर सटीक रोग का पता लगाता है।",
    step3Title: "3. कारण समझें",
    step3Desc: "Explainable AI हीटमैप से देखें कि AI ने पत्ती के किस भाग से रोग पहचाना।",
    step4Title: "4. निगरानी रखें",
    step4Desc: "विभिन्न खेतों में रोग के फैलाव और स्वास्थ्य को ट्रैक करें।",

    cvActive: "कंप्यूटर विज़न सक्रिय है",
    cvModel: "EfficientNet-B0 • Grad-CAM",
    earlyBlightHud: "अगेती झुलसा / अर्ली ब्लाइट (94.2% AI अनुमान)",
    targetSpot: "लक्ष्य",
    lesionSpot: "धब्बा / घाव",
    affectedHud: "प्रभावित: 18% • स्कोर: 78/100",
    stepPhoto: "📷 फोटो",
    stepAIVision: "🧠 AI विज़न",
    stepDetection: "🔍 पहचान",
    stepScore: "📊 स्कोर (78)",
    stepWarning: "⚠️ चेतावनी",

    lifecycleBadge: "एंड-टू-एंड एग्रीटेक आर्किटेक्चर",
    lifecycleTitle: "संपूर्ण फसल स्वास्थ्य चक्र",
    lifecycleSubtitle: "एक पत्ती की तस्वीर से लेकर पूरे खेत की निरंतर रोग निगरानी तक।",
    lcStep1Title: "1. फोटो व गुणवत्ता जांच",
    lcStep1Desc: "कैमरा या अपलोड करते समय धुंधलापन, रोशनी और पत्ती के भाग का पूर्व परीक्षण।",
    lcStep2Title: "2. न्यूरल रोग स्क्रीनिंग",
    lcStep2Desc: "Grad-CAM विजुअल अटेंशन हीटमैप के साथ सटीक बहु-वर्गीय वर्गीकरण।",
    lcStep3Title: "3. गंभीरता व स्वास्थ्य स्कोर",
    lcStep3Desc: "प्रभावित क्षेत्र का मापन और मॉड्यूलर फसल स्वास्थ्य स्कोर (0-100)।",
    lcStep4Title: "4. जोखिम ट्रैकिंग व सलाह",
    lcStep4Desc: "जलवायु आधारित रोग जोखिम पूर्वानुमान, सुरक्षित IPM उपाय और ऐतिहासिक तुलना।",

    supportedCropsTitle: "प्रमुख फसलें और उनके संभावित रोग",
    supportedCropsSubtitle: ">90% सटीकता के साथ खेत के वास्तविक डेटा पर प्रशिक्षित मॉडल।",
    exploreFullLibrary: "पूरी रोग लाइब्रेरी देखें",

    cardDashboardTitle: "फसल स्वास्थ्य डैशबोर्ड",
    cardDashboardDesc: "पत्ती स्वास्थ्य के रुझान देखें, खेतों की निगरानी करें और रोग घटना चार्ट जांचें।",
    cardRiskTitle: "मौसम व रोग जोखिम रडार",
    cardRiskDesc: "रीयल-टाइम नमी, तापमान और फंगल रोगों के पनपने का खतरा मीटर।",
    cardModelTitle: "डेटासेट व मॉडल क्वालिटी गेट",
    cardModelDesc: "मॉडल सटीकता मेट्रिक्स (94.25% परीक्षण सटीकता) और विश्वास मानक।",

    scanMyCrop: "फसल स्कैन करें",
    scanSubtitle: "रोग की जल्दी पहचान के लिए कैमरे को पत्ती पर रखें या फोटो अपलोड करें।",
    selectCropLabel: "फसल चुनें (वैकल्पिक):",
    cropAll: "सभी / स्वतः पहचान",
    cropRice: "चावल (Rice)",
    cropTomato: "टमाटर (Tomato)",
    cropCotton: "कपास (Cotton)",
    cropPotato: "आलू (Potato)",
    cropMaize: "मक्का (Maize)",
    cropSoybean: "सोयाबीन (Soybean)",
    cropSugarcane: "गन्ना (Sugarcane)",
    cropOnion: "प्याज (Onion)",
    cropPomegranate: "अनार (Pomegranate)",
    cropChilli: "मिर्च (Chilli)",
    cropWheat: "गेहूं (Wheat)",

    dragDropText: "पत्ती का फोटो यहाँ खींचें या",
    browseFiles: "गैलरी से चुनें",
    cameraPreview: "लाइव कैमरा व्यू",
    switchCamera: "कैमरा बदलें",
    capturePhoto: "फोटो खींचें",
    retake: "दोबारा फोटो लें",
    scanNow: "फसल स्कैन करें",
    uploadGallery: "गैलरी से अपलोड करें",
    analyzeNow: "स्वास्थ्य विश्लेषण करें",
    analyzingText: "Vision AI द्वारा पत्ती का विश्लेषण जारी है...",
    imageStaged: "फोटो तैयार है",
    multiStageAnalysis: "AI बहु-चरणीय फसल स्वास्थ्य विश्लेषण",
    stage1: "चरण 01/07 — पत्ती की तस्वीर का सामान्यीकरण और पूर्व-प्रसंस्करण...",
    stage2: "चरण 02/07 — फसल की पहचान और पत्ती की सीमाओं का सत्यापन...",
    stage3: "चरण 03/07 — पत्ती के रंग परिवर्तन और लक्षणों की जांच...",
    stage4: "चरण 04/07 — न्यूरल पैटर्न को रोग श्रेणियों से मिलाना...",
    stage5: "चरण 05/07 — धब्बों की गंभीरता और प्रभावित पत्ती क्षेत्र का अनुमान...",
    stage6: "चरण 06/07 — मौसम आधारित रोग जोखिम और स्कोर की गणना...",
    stage7: "चरण 07/07 — किसानों के लिए सुरक्षित IPM सलाह तैयार करना...",
    cameraUnavailable: "कैमरा उपलब्ध नहीं है। कृपया अनुमतियों की जांच करें या फोटो अपलोड करें।",

    guidance1: "फ्रेम के अंदर एक साफ पत्ती रखें",
    guidance2: "पर्याप्त रोशनी सुनिश्चित करें",
    guidance3: "धुंधली फोटो से बचें",

    voiceEnabled: "वॉइस गाइड चालू",
    voiceDisabled: "वॉइस गाइड बंद",
    voiceMoveCloser: "कैमरे को पत्ती के और पास लाएं।",
    voiceKeepInside: "पत्ती को फ्रेम के अंदर स्थिर रखें।",
    voiceCaptured: "पत्ती की तस्वीर सफलतापूर्वक ले ली गई है। AI विश्लेषण के लिए तैयार है।",
    voiceUploaded: "पत्ती की तस्वीर सफलतापूर्वक अपलोड हो गई है। AI विश्लेषण के लिए तैयार है।",
    voiceRetake: "फोटो धुंधली है, अच्छी रोशनी में दोबारा लें।",
    voiceAnalyzing: "Vision AI द्वारा पत्ती का विश्लेषण जारी है...",
    voiceAnalysisComplete: "विश्लेषण पूरा हुआ। फसल स्वास्थ्य परिणाम तैयार हैं।",

    qualityCheckTitle: "स्वचालित फोटो गुणवत्ता परीक्षण",
    qualityPass: "फोटो की गुणवत्ता विश्वसनीय पहचान के लिए उत्तम है।",
    qualityLow: "विश्वसनीय पहचान के लिए फोटो की गुणवत्ता बहुत कम है।",
    sharpness: "स्पष्टता",
    brightness: "रोशनी",
    resolution: "रेजोल्यूशन",
    leafCoverage: "पत्ती की उपस्थिति",
    retakePhotoBtn: "दोबारा फोटो लें",
    proceedAnyway: "फिर भी आगे बढ़ें",

    diagnosisTitle: "रोग पहचान परिणाम",
    cropDetected: "पहचानी गई फसल",
    condition: "पहचाना गया रोग / स्थिति",
    confidence: "सटीकता विश्वास",
    healthStatus: "फसल स्वास्थ्य",
    severityLevel: "गंभीरता स्तर",
    affectedArea: "प्रभावित पत्ती क्षेत्र",
    healthyArea: "स्वस्थ क्षेत्र",
    scientificName: "वैज्ञानिक रोगाणु नाम",
    statusHealthy: "स्वस्थ फसल",
    statusEarly: "प्रारंभिक लक्षण",
    statusModerate: "मध्यम नुकसान",
    statusSevere: "गंभीर नुकसान",
    statusUnknown: "अस्पष्ट नमूना",
    statusAtRisk: "जोखिम में",

    whyDetectedTitle: "यह रोग क्यों पहचाना गया?",
    xaiExplanation: "AI ने पत्ती के हाइलाइट किए गए हिस्सों में लक्षणों के आधार पर यह निर्णय लिया है।",
    showHeatmap: "AI ध्यान हीटमैप (Grad-CAM)",
    showOriginal: "मूल पत्ती फोटो",
    gradcamDesc: "मॉडल द्वारा ध्यान केंद्रित किए गए हिस्से रंगीन हीटमैप पर दिखाए गए हैं।",

    severityMeterTitle: "रोग गंभीरता मीटर",
    severityActionUrgency: "सुझाया गया कदम",

    guidanceTitle: "किसानों के लिए आवश्यक सलाह व देखभाल",
    whatDetected: "क्या पाया गया",
    whatSymptomsMean: "इन लक्षणों का क्या अर्थ है",
    whatToDoNow: "तुरंत क्या उपाय करें",
    preventSpread: "आगे फैलाव कैसे रोकें",
    whenSeekExpert: "कृषि वैज्ञानिक की मदद कब लें",
    helplineBtn: "किसान हेल्पलाइन (1800-180-1551)",

    lowConfidenceTitle: "अनिश्चित AI परिणाम",
    lowConfidenceMsg: "AI इस स्थिति की निश्चित पहचान नहीं कर सका। कृपया नीचे दिए गए विकल्पों का उपयोग करें:",
    tryAnotherImg: "दूसरी तस्वीर आज़माएं",
    describeSymptomsBtn: "लक्षण बताएं",
    requestExpertBtn: "विशेषज्ञ समीक्षा मांगें",

    fieldsTitle: "खेत प्रबंधन",
    totalFields: "कुल खेत",
    recentScans: "हाल के स्कैन",
    healthyCrops: "स्वस्थ फसलें",
    atRiskCrops: "जोखिम वाली फसलें",
    activeAlerts: "सक्रिय अलर्ट",
    addNewField: "+ नया खेत जोड़ें",
    fieldName: "खेत का नाम",
    fieldLocation: "स्थान / गांव",
    fieldAcreage: "क्षेत्रफल (एकड़)",
    fieldSowingDate: "बुवाई की तारीख",
    saveField: "खेत सहेजें",
    fieldHealthMap: "खेत स्वास्थ्य नक्शा",
    filterByCrop: "फसल के अनुसार फिल्टर",
    filterBySeverity: "गंभीरता अनुसार",
    allSeverities: "सभी स्तर",
    allCrops: "सभी फसलें",

    spreadTitle: "रोग प्रसार ट्रैकिंग",
    spreadSubtitle: "समय के साथ (दिन 1 से दिन 15) पत्ती पर रोग का फैलाव कैसे बदला देखें।",
    timelineDay1: "दिन 1 (प्रारंभ)",
    timelineDay5: "दिन 5 (फैलाव)",
    timelineDay10: "दिन 10 (वृद्धि)",
    timelineDay15: "दिन 15 (वर्तमान स्थिति)",

    compareTitle: "फोटो से फोटो स्वास्थ्य तुलना",
    compareSubtitle: "उपचार का असर देखने के लिए पुराने और नए स्कैन की तुलना करें।",
    previousScan: "पिछला स्कैन",
    latestScan: "नवीनतम स्कैन",
    verdictImproved: "स्वास्थ्य में सुधार हुआ",
    verdictUnchanged: "कोई बदलाव नहीं",
    verdictWorsening: "क्षति बढ़ने की संभावना",
    selectScanA: "मूल स्कैन चुनें",
    selectScanB: "हाल का स्कैन चुनें",
    runComparison: "तुलना करें",

    symptomTitle: "मार्गदर्शित लक्षण सहायक",
    symptomSubtitle: "सटीक पहचान के लिए सरल प्रश्नों के उत्तर दें।",
    symptomQuestion: "पत्ती पर आपको क्या दिखाई दे रहा है?",
    symptomSpots: "धब्बे (काले / भूरे / पीले)",
    symptomYellowing: "पत्ती पीली पड़ना",
    symptomBrowning: "पत्ती भूरी / झुलसी होना",
    symptomCurling: "पत्ती मुड़ना (Curling)",
    symptomWilting: "मुरझाना (Wilting)",
    symptomPowder: "सफेद या भूरा चूर्ण",
    symptomHoles: "कीटों द्वारा खाए गए छेद",
    symptomOther: "अन्य कोई लक्षण",
    evaluateSymptoms: "लक्षण जांचें",

    notificationsTitle: "सूचना केंद्र",
    markAllRead: "सभी पढ़ी हुई मार्क करें",
    noNotifications: "कोई नई सूचना नहीं",
    newScanDone: "नया स्कैन सफलतापूर्वक पूरा हुआ",
    riskIncreased: "खेत 02 में रोग जोखिम बढ़ गया है",
    followUpRec: "3 दिनों में दोबारा स्कैन करने की सलाह",
    expertReviewDone: "स्कैन #SC-4821 की विशेषज्ञ समीक्षा पूरी हुई",

    expertPortalTitle: "कृषि वैज्ञानिक से समीक्षा मांगें",
    expertNotesPlaceholder: "खेत की स्थिति, खाद या छिड़काव का विवरण दर्ज करें...",
    submitReview: "विशेषज्ञ को भेजें",
    reviewSubmitted: "समीक्षा के लिए कृषि वैज्ञानिकों को भेजा गया।",
    statusPending: "लंबित",
    statusUnderReview: "समीक्षाधीन",
    statusReviewed: "प्रमाणित",
    expertNotes: "कृषि वैज्ञानिक फील्ड नोट्स",
    expertVerifyBtn: "प्रमाणित करें (Level 4)",
    mlMetricsTitle: "ML मॉडल क्वालिटी गेट (90%+ लक्ष्य)",
    testAccuracy: "परीक्षण सटीकता (Test Accuracy)",
    macroF1: "Macro F1-Score",
    realFieldAcc: "खेत सटीकता (Field Accuracy)",
    genGap: "Generalization Gap",

    riskTitle: "मौसम व रोग जोखिम रडار",
    riskSubtitle: "पर्यावरणीय कारक और कवक रोगों के पनपने का खतरा मीटर।",
    riskLow: "कम जोखिम",
    riskWatch: "निगरानी रखें (मध्यम)",
    riskHigh: "उच्च जोखिम",
    temp: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा",
    trapDensity: "ट्रैप घनत्व",
    primaryCrop: "प्रमुख फसल",
    elevatedNotice: "उच्च जोखिम मिला है। अपनी फसलों की नियमित जांच करें।",
  }
};
