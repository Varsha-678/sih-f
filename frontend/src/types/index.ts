export type Language = 'en' | 'mr' | 'hi';

export interface QualityEvaluation {
  can_analyze: boolean;
  quality: 'EXCELLENT' | 'WARNING' | 'POOR' | 'CORRUPT' | 'LOW_RESOLUTION' | 'ERROR';
  blur_score: number;
  brightness_score: number;
  resolution: string;
  leaf_coverage: number;
  message: string;
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
  severity_category: string;
  severity_tier: number;
  action_urgency: string;
  color_code: string;
}

export interface DiseaseAdvisory {
  class_key: string;
  language: string;
  symptoms: string;
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
  status: 'Healthy' | 'Diseased' | 'Unknown';
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
  severity: SeverityReport;
  pest_detection: PestReport;
  advisory: DiseaseAdvisory;
  model_version: string;
  dataset_version: string;
  created_at: string;
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
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  level_color: string;
  breakdown: {
    weather_index: number;
    stage_vulnerability: number;
    trap_density_index: number;
    cluster_proximity_index: number;
  };
  advisory: {
    en: string;
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
