import React, { useState } from 'react';
import { 
  AlertTriangle, Bug, PhoneCall, 
  Activity, CheckCircle2, Layers, FileText, Info
} from 'lucide-react';
import type { DiagnosticResult as DiagnosticResultType, Language } from '../types';
import { translations } from '../utils/translations';

interface DiagnosticResultProps {
  result: DiagnosticResultType;
  lang: Language;
  onReset: () => void;
}

export const DiagnosticResult: React.FC<DiagnosticResultProps> = ({
  result,
  lang,
  onReset
}) => {
  const t = translations[lang];
  const [showGradCam, setShowGradCam] = useState<boolean>(true);
  const [showPestBoxes, setShowPestBoxes] = useState<boolean>(true);

  const isHealthy = result.status === 'Healthy';
  const isUnknown = result.is_unknown;

  const getSeverityBadgeColor = (category: string) => {
    if (category.includes('Mild')) return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
    if (category.includes('Moderate')) return 'bg-amber-950/80 text-amber-400 border-amber-500/30';
    if (category.includes('High')) return 'bg-orange-950/80 text-orange-400 border-orange-500/30';
    if (category.includes('Severe')) return 'bg-red-950/80 text-red-400 border-red-500/30';
    return 'bg-slate-900 text-slate-300 border-slate-700';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Quality & Header Banner */}
      <div className="glass-panel-glow rounded-2xl p-5 md:p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                ID: {result.prediction_id}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                isUnknown 
                  ? 'bg-amber-950 text-amber-400 border-amber-500/30' 
                  : isHealthy 
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30' 
                    : 'bg-red-950 text-red-400 border-red-500/30'
              }`}>
                {isUnknown ? t.unknownDetected : isHealthy ? t.statusHealthy : t.statusDiseased}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {result.model_version}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {result.crop} — {result.condition}
            </h2>
            {result.scientific_name && (
              <p className="text-xs md:text-sm text-slate-400 italic mt-0.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                {t.scientificName}: {result.scientific_name}
              </p>
            )}
          </div>

          {/* Calibrated Confidence Badge */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                {t.confidence}
              </span>
              <span className="text-2xl font-black gradient-text">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-950/50">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Image Quality Mini-Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>{t.sharpness}: <strong className="text-slate-200">{result.quality.blur_score}</strong></span>
            <span>{t.brightness}: <strong className="text-slate-200">{result.quality.brightness_score}</strong></span>
            <span>{t.resolution}: <strong className="text-slate-200">{result.quality.resolution}</strong></span>
          </div>
          <span className="text-emerald-400 font-medium">✓ {result.quality.message}</span>
        </div>
      </div>

      {/* Unknown OOD Warning Banner if applicable */}
      {isUnknown && (
        <div className="p-4 bg-amber-950/50 border border-amber-500/40 rounded-xl flex items-start gap-3 text-amber-200 text-xs md:text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block text-amber-300">{t.unknownDetected}</strong>
            <span>{result.rejection_reason || t.unknownMsg}</span>
          </div>
        </div>
      )}

      {/* 2. Visual Inspection Grid (Grad-CAM Explainability + Pest Bounding Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Attention & Image Viewer */}
        <div className="glass-panel rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              {t.gradcamTitle}
            </h3>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setShowGradCam(true)}
                className={`px-2 py-1 rounded font-medium transition ${
                  showGradCam ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {t.showHeatmap}
              </button>
              <button
                onClick={() => setShowGradCam(false)}
                className={`px-2 py-1 rounded font-medium transition ${
                  !showGradCam ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {t.showOriginal}
              </button>
            </div>
          </div>

          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            {/* Base Image or GradCAM Overlay */}
            <img
              src={showGradCam && result.gradcam_heatmap_url ? result.gradcam_heatmap_url : result.scan_url}
              alt="Scan Diagnosis View"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to original scan URL if heatmap is loading
                (e.target as HTMLImageElement).src = result.scan_url;
              }}
            />

            {/* Render Pest Bounding Box Overlays if enabled */}
            {showPestBoxes && result.pest_detection?.detections?.map((pest) => (
              <div
                key={pest.id}
                className="absolute border-2 border-red-500 bg-red-500/20 rounded pointer-events-none"
                style={{
                  left: `${pest.relative_coords.x1 * 100}%`,
                  top: `${pest.relative_coords.y1 * 100}%`,
                  width: `${(pest.relative_coords.x2 - pest.relative_coords.x1) * 100}%`,
                  height: `${(pest.relative_coords.y2 - pest.relative_coords.y1) * 100}%`,
                }}
              >
                <span className="absolute -top-5 left-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                  {pest.pest_name} ({(pest.confidence * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {t.gradcamDesc}
          </p>
        </div>

        {/* Severity & Pest Detection Summary */}
        <div className="space-y-4">
          {/* Severity Card */}
          <div className="glass-panel rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                {t.severityTitle}
              </h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getSeverityBadgeColor(result.severity.severity_category)}`}>
                {result.severity.severity_category}
              </span>
            </div>

            {/* Severity Progress Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">{t.affectedArea}</span>
                <span className="text-white">{result.severity.affected_percentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${result.severity.affected_percentage}%`,
                    backgroundColor: result.severity.color_code
                  }}
                />
              </div>
            </div>

            <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Action:</strong> {result.severity.action_urgency}</span>
            </div>
          </div>

          {/* Pest Object Detection Card */}
          <div className="glass-panel rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bug className="w-4 h-4 text-emerald-400" />
                {t.pestDetectionTitle}
              </h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                result.pest_detection?.etl_breached 
                  ? 'bg-red-950 text-red-400 border-red-500/30' 
                  : 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
              }`}>
                {result.pest_detection?.total_count || 0} {t.pestsFound}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-300">
                {result.pest_detection?.etl_breached ? t.etlAlert : t.etlNormal}
              </span>
              <button
                onClick={() => setShowPestBoxes(!showPestBoxes)}
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                {showPestBoxes ? 'Hide Bounding Boxes' : 'Show Bounding Boxes'}
              </button>
            </div>

            {/* Top 3 Diagnostic Ranking Context */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Top Probabilistic Predictions
              </span>
              <div className="space-y-1.5">
                {result.top3_predictions?.map((pred, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
                    <span className="text-slate-300 truncate max-w-[200px]">
                      {pred.crop} — {pred.condition}
                    </span>
                    <span className="font-mono text-emerald-400 font-semibold">
                      {(pred.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Multilingual Actionable Farmer Advisory Card */}
      <div className="glass-panel-glow rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            {t.advisoryTitle}
          </h3>

          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-transform active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1800-180-1551</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          {/* Symptoms */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
              {t.symptoms}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.symptoms}
            </p>
          </div>

          {/* Organic Remedies */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <span className="text-teal-400 font-bold uppercase tracking-wider text-[11px] block">
              {t.organicRemedy}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.organic_remedies}
            </p>
          </div>

          {/* Chemical IPM */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block">
              {t.chemicalTreatment}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.chemical_ipm}
            </p>
          </div>

          {/* Cultural Care & Waiting Period */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
              {t.culturalPractices}
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.cultural_practices}
            </p>
            {result.advisory?.waiting_period_days > 0 && (
              <span className="inline-block mt-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {t.waitingPeriod}: {result.advisory.waiting_period_days} {t.days}
              </span>
            )}
          </div>
        </div>

        {/* Retake / Scan Another Crop Button */}
        <div className="pt-2 text-center">
          <button
            onClick={onReset}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 transition-colors"
          >
            ← Scan Another Crop Sample
          </button>
        </div>
      </div>
    </div>
  );
};
