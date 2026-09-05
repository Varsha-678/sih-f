export type Language = 'en' | 'ta' | 'mr' | 'hi';

export type NavTab = 
  | 'home' 
  | 'detect' 
  | 'crophealth' 
  | 'risk' 
  | 'fields' 
  | 'history' 
  | 'library' 
  | 'learn' 
  | 'about' 
  | 'spread' 
  | 'compare' 
  | 'symptoms' 
  | 'expert';

export interface QualityEvaluation {
  can_analyze: boolean;
  quality: 'EXCELLENT' | 'WARNING' | 'POOR' | 'CORRUPT' | 'LOW_RESOLUTION' | 'ERROR';
  blur_score: number;
  brightness_score: number;
  resolution: string;
  leaf_coverage: number;
  message: string;
  issues?: string[];
  suggestions?: string[];
}

export interface PestDetection {
  id: number;
  pest_name: string;
  scientific_name: string;
  confidence: number;
  box: [number, number, number, number];
  area_pixels: number;
  relative_coords: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface PestReport {
  detections: PestDetection[];
  total_count: number;
  infestation_level: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH';
  etl_breached: boolean;
}

export interface SeverityReport {
  affected_percentage: number;
  healthy_percentage: number;
  severity_category: 'Healthy' | 'Early Symptoms' | 'Mild' | 'Moderate' | 'Severe' | string;
  severity_tier: number;
  action_urgency: string;
  color_code: string;
}

export interface HealthScoreBreakdown {
  overall_score: number; // 0 to 100
  leaf_condition: number; // 0 to 25
  symptom_level: number; // 0 to 25
  disease_risk: number; // 0 to 20
  vitality: number; // 0 to 15
  environmental_risk: number; // 0 to 15
  status_label: 'Optimal' | 'Good' | 'Fair' | 'At Risk' | 'Critical';
}

export interface EarlyWarningEngineReport {
  risk_level: 'Low Risk' | 'Watch Closely' | 'Elevated Risk' | 'High Risk';
  risk_score: number; // 0 to 100
  triggers: string[];
  explanation: string;
  recommended_scout_interval_days: number;
}

export interface ExplainableAIFactors {
  visible_factors: string[];
  discoloration_pattern: string;
  lesion_distribution: string;
  edge_damage: string;
  texture_status: string;
  attention_focus_summary: string;
}

export interface DiseaseAdvisory {
  class_key: string;
  language: string;
  symptoms: string;
  what_it_means?: string;
  what_to_do_now?: string;
  prevention_guidance?: string;
  when_to_seek_expert?: string;
  organic_remedies: string;
  chemical_ipm: string;
  cultural_practices: string;
  waiting_period_days: number;
  helpline: string;
}

export interface DiagnosticResult {
  prediction_id: string;
  scan_url: string;
  quality: QualityEvaluation;
  crop: string;
  condition: string;
  scientific_name: string;
  status: 'Healthy' | 'Early Symptoms' | 'Early Signs' | 'Mild' | 'Moderate' | 'Severe' | 'Diseased' | 'Unknown';
  confidence: number;
  raw_confidence: number;
  is_unknown: boolean;
  rejection_reason?: string;
  top3_predictions: Array<{
    class_name: string;
    crop: string;
    condition: string;
    probability: number;
  }>;
  gradcam_heatmap_url: string;
  explanation?: string;
  explainable_factors?: ExplainableAIFactors;
  severity: SeverityReport;
  health_score?: HealthScoreBreakdown;
  early_warning?: EarlyWarningEngineReport;
  pest_detection: PestReport;
  advisory: DiseaseAdvisory;
  model_version: string;
  dataset_version: string;
  created_at: string;
  field_id?: string;
  field_name?: string;
  user_feedback?: 'useful' | 'not_sure' | 'incorrect';
  user_feedback_comment?: string;
}

export interface Field {
  id: string;
  name: string;
  crop: string;
  variety?: string;
  growth_stage?: 'Seedling' | 'Vegetative' | 'Tillering' | 'Flowering' | 'Pod/Fruit Formation' | 'Maturity';
  location: string;
  coordinates: [number, number];
  acreage: number;
  sowing_date: string;
  health_status: 'Healthy' | 'Early Warning' | 'At Risk' | 'Critical';
  risk_level: 'LOW' | 'WATCH' | 'HIGH';
  latest_scan?: {
    date: string;
    condition: string;
    affected_percentage: number;
    severity: string;
    confidence: number;
    health_score?: number;
  };
  total_scans: number;
}

export interface SpreadTimelinePoint {
  day_label: string; // "Day 1", "Day 5", "Day 10", "Day 15", "Day 20"
  date: string;
  affected_percentage: number;
  severity_category: string;
  confidence: number;
  notes: string;
  image_url?: string;
}

export interface ComparisonResult {
  scan_a: DiagnosticResult;
  scan_b: DiagnosticResult;
  time_gap_days: number;
  delta_affected_percentage: number;
  delta_health_score: number;
  health_status_verdict: 'Health improved' | 'Health unchanged' | 'Condition may be worsening';
  summary_reason: string;
}

export interface SimilarConditionComparison {
  condition_name: string;
  scientific_name: string;
  distinguishing_features: string;
  key_difference: string;
  risk_level: string;
}

export interface DiseaseLibraryItem {
  id: string;
  name: string;
  scientific_name: string;
  vernacular_names?: {
    hi?: string;
    mr?: string;
    ta?: string;
  };
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Nutrient Deficiency' | 'Pest-Induced';
  crops: string[];
  early_symptoms: string;
  advanced_signs: string;
  progression: Array<{
    stage: string;
    days: string;
    description: string;
  }>;
  environmental_risk: {
    temp_optimal: string;
    humidity_threshold: string;
    rainfall_trigger: string;
    risk_summary: string;
  };
  prevention: {
    cultural: string;
    organic: string;
    chemical: string;
    safety_disclaimer: string;
  };
  monitoring_tips: string;
  similar_conditions: SimilarConditionComparison[];
}

export interface LearnCategoryItem {
  id: string;
  title: string;
  category: 'Disease Identification' | 'Early Symptoms' | 'Crop Monitoring' | 'Disease Prevention' | 'Weather & Disease Risk' | 'Crop Growth Stages' | 'AI Crop Analysis';
  readTime: string;
  summary: string;
  keyPoints: string[];
  fieldAction: string;
  badgeText: string;
  iconName: string;
}

export interface DatasetSourceMetadata {
  id: string;
  name: string;
  source_organization: string;
  crop_coverage: string[];
  total_images: number;
  dataset_version: string;
  license: string;
  annotation_type: 'Multi-class Classification' | 'Bounding Box (YOLO)' | 'Pixel-level Lesion Mask (Grad-CAM/UNet)';
  geographic_context: string;
  collection_method: 'Field-acquired & Controlled Studio';
  quality_tier: 'Level 1-4 Validated';
}

export interface SymptomOption {
  id: string;
  label: string;
  description: string;
  category: 'Spots' | 'Yellowing' | 'Browning' | 'Curling' | 'Wilting' | 'Powder-like' | 'Holes' | 'Other';
  associated_diseases: string[];
}

export interface SymptomDiagnosticResult {
  possible_diseases: Array<{
    crop: string;
    disease: string;
    probability: number;
    match_reason: string;
  }>;
  recommended_action: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'scan' | 'risk_alert' | 'expert_review' | 'system';
  timestamp: string;
  read: boolean;
  link_tab?: NavTab;
  related_field_id?: string;
}

export interface ExpertReviewSubmission {
  id: string;
  crop: string;
  field_name: string;
  image_url: string;
  ai_result: string;
  confidence: number;
  farmer_symptoms: string[];
  farmer_notes: string;
  farmer_phone: string;
  status: 'Pending' | 'Under Review' | 'Reviewed' | 'Resolved';
  submitted_at: string;
  expert_feedback?: {
    verified_disease: string;
    confidence_rating: string;
    treatment_advice: string;
    agronomist_name: string;
    reviewed_at: string;
  };
}

export interface DistrictHotspot {
  district: string;
  region: string;
  coordinates: [number, number];
  primary_crop: string;
  secondary_crop: string;
  temperature_c: number;
  relative_humidity: number;
  rainfall_mm: number;
  forecast_rain_prob: number;
  pest_trap_density: number;
  active_outbreak: string;
  soil_moisture: number;
  crop_stage: string;
  risk_score: number;
  risk_level: 'LOW' | 'WATCH' | 'HIGH';
  level_color: string;
  breakdown: {
    weather_index: number;
    stage_vulnerability: number;
    trap_density_index: number;
    cluster_proximity_index: number;
  };
  advisory: {
    en: string;
    ta: string;
    mr: string;
    hi: string;
  };
}

export interface MLMetricsData {
  model_architecture: string;
  evaluation_metrics: {
    test_accuracy: number;
    macro_f1: number;
    weighted_f1: number;
    macro_precision: number;
    macro_recall: number;
    benchmark_accuracy: number;
    real_field_accuracy: number;
    generalization_gap: number;
  };
  quality_gate: {
    target_accuracy: number;
    target_macro_f1: number;
    passed_gate: boolean;
    status: string;
    evaluation_verdict: string;
  };
  data_quality_summary: any;
  supported_classes: Array<{
    class_id: number;
    crop: string;
    condition: string;
    scientific: string;
    status: string;
  }>;
}
