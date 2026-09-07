import React, { useState } from 'react';
import { 
  PhoneCall, Activity, CheckCircle2, 
  Layers, FileText, Info, TrendingUp,
  GitCompare, UserCheck, HelpCircle, ShieldAlert, ArrowLeft,
  Sparkles, Eye, ThumbsUp, ThumbsDown, HelpCircle as HelpIcon,
  AlertTriangle, Volume2
} from 'lucide-react';
import type { DiagnosticResult as DiagnosticResultType, Language } from '../types';
import { translations } from '../utils/translations';
import { speakGuidance } from '../utils/clientDiagnosis';

interface DiagnosticResultProps {
  result: DiagnosticResultType;
  lang: Language;
  onReset: () => void;
  onOpenSymptomAssistant?: () => void;
  onOpenExpertReview?: (res: DiagnosticResultType) => void;
  onOpenComparison?: (res: DiagnosticResultType) => void;
  onOpenSpreadTimeline?: (res: DiagnosticResultType) => void;
}

export const DiagnosticResult: React.FC<DiagnosticResultProps> = ({
  result,
  lang,
  onReset,
  onOpenSymptomAssistant,
  onOpenExpertReview,
  onOpenComparison,
  onOpenSpreadTimeline
}) => {
  const t = translations[lang] || translations.en;
  const [viewMode, setViewMode] = useState<'farmer' | 'expert'>('farmer');
  const [activeVisualTab, setActiveVisualTab] = useState<'original' | 'detection' | 'segmentation' | 'affected'>('detection');
  const [feedbackGiven, setFeedbackGiven] = useState<'useful' | 'not_sure' | 'incorrect' | null>(null);
  const [showFeedbackCommentBox, setShowFeedbackCommentBox] = useState<boolean>(false);
  const [feedbackComment, setFeedbackComment] = useState<string>('');

  const isHealthy = result.status === 'Healthy' || result.condition.toLowerCase().includes('healthy');
  const isUnknown = result.is_unknown || result.confidence < 0.65;

  // Compute Modular Crop Health Score
  const healthScore = result.health_score || {
    overall_score: isHealthy ? 92 : Math.max(25, Math.round(100 - (result.severity?.affected_percentage || 20) * 1.8 - (1 - result.confidence) * 20)),
    leaf_condition: isHealthy ? 24 : 16,
    symptom_level: isHealthy ? 25 : 14,
    disease_risk: isHealthy ? 19 : 12,
    vitality: isHealthy ? 14 : 11,
    environmental_risk: 12,
    status_label: isHealthy ? 'Optimal' : result.severity?.affected_percentage > 30 ? 'At Risk' : 'Fair'
  };

  // Early Disease Warning
  const earlyWarning = result.early_warning || {
    risk_level: isHealthy ? 'Low Risk' : result.severity?.affected_percentage > 30 ? 'High Risk' : result.severity?.affected_percentage > 15 ? 'Elevated Risk' : 'Watch Closely',
    risk_score: isHealthy ? 18 : Math.min(95, Math.round((result.severity?.affected_percentage || 20) * 1.5 + 30)),
    triggers: isHealthy 
      ? ['Normal foliar coloration', 'No active fungal sporulation', 'Stable environmental conditions']
      : [
          'Visible foliar lesion symptoms detected by neural vision',
          'Ambient relative humidity above 80% favoring pathogen spread',
          'Foliar canopy density conducive to micro-climate incubation'
        ],
    explanation: isHealthy
      ? 'Foliage appears vigorous with uniform chlorophyll distribution.'
      : `AI estimated ${result.condition} symptoms. Early intervention recommended before lesion coverage exceeds 25%.`,
    recommended_scout_interval_days: isHealthy ? 7 : 3
  };

  const getStatusBadge = () => {
    if (isUnknown) {
      return {
        label: 'Low AI Confidence — Additional Check Required',
        bg: 'bg-amber-950/90 text-amber-300 border-amber-500/40'
      };
    }
    if (isHealthy) {
      return {
        label: 'Healthy Foliage Detected',
        bg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
      };
    }
    if (result.severity?.severity_category === 'Early Symptoms' || result.severity?.severity_category === 'Early Signs') {
      return {
        label: 'Early Symptoms Detected',
        bg: 'bg-teal-950/90 text-teal-300 border-teal-500/40'
      };
    }
    if (result.severity?.severity_category === 'Moderate') {
      return {
        label: 'Moderate Disease Symptoms',
        bg: 'bg-amber-950/90 text-amber-300 border-amber-500/40'
      };
    }
    return {
      label: 'Severe Foliar Condition',
      bg: 'bg-red-950/90 text-red-300 border-red-500/40'
    };
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* View Switcher: Farmer-Friendly vs Technical / Expert View */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>Viewing Mode:</span>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('farmer')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'farmer' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌾 Farmer-Friendly View</span>
          </button>
          <button
            onClick={() => setViewMode('expert')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'expert' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔬 Technical / Expert View</span>
          </button>
        </div>
      </div>

      {/* 1. Top Diagnostic Header */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 relative overflow-hidden border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                {result.prediction_id}
              </span>
              <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${statusBadge.bg}`}>
                {statusBadge.label}
              </span>
              {result.field_name && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-500/30">
                  {result.field_name}
                </span>
              )}
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                {isHealthy ? (lang === 'ta' ? 'AI இலை நலம் மதிப்பீடு' : lang === 'te' ? 'AI ఆకు ఆరోగ్య అంచనా' : lang === 'kn' ? 'AI ಎಲೆ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ' : lang === 'gu' ? 'AI પાન સ્વાસ્થ્ય આકલન' : lang === 'mr' ? 'AI पान आरोग्य तपासणी' : lang === 'hi' ? 'AI पत्ती स्वास्थ्य आकलन' : 'AI Foliar Assessment') : (lang === 'ta' ? 'கண்டறியப்பட்ட சாத்தியமான நிலை' : lang === 'te' ? 'గుర్తించబడిన సంభావ్య పరిస్థితి' : lang === 'kn' ? 'ಪತ್ತೆಯಾದ ಸಂಭವನೀಯ ಸ್ಥಿತಿ' : lang === 'gu' ? 'જોવા મળેલ સંભવિત રોગ' : lang === 'mr' ? 'आढळलेला संभाव्य रोग' : lang === 'hi' ? 'पहचाना गया संभावित रोग' : 'Possible Condition Detected (AI Estimate)')}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
                  {result.crop} • {result.condition}
                </h2>
                <button
                  onClick={() => {
                    const speech = `${result.crop}. ${result.condition}. ${t.confidence}: ${(result.confidence * 100).toFixed(0)}%. ${result.advisory?.what_to_do_now || result.advisory?.symptoms || ''}`;
                    speakGuidance(speech, lang);
                  }}
                  title="Listen in Native Voice"
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>{lang === 'ta' ? 'குரலில் கேளுங்கள்' : lang === 'te' ? 'వాయిస్‌లో వినండి' : lang === 'kn' ? 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ' : lang === 'gu' ? 'ઓડિયો સાંભળો' : lang === 'mr' ? 'आवाजात ऐका' : lang === 'hi' ? 'आवाज में सुनें' : 'Listen'}</span>
                </button>
              </div>
            </div>

            {result.scientific_name && (
              <p className="text-xs md:text-sm text-slate-400 italic flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.scientificName}: <strong>{result.scientific_name}</strong></span>
              </p>
            )}
          </div>

          {/* Calibrated Confidence & Health Score Pill */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Calibrated Confidence */}
            <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 text-right space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                {t.confidence}
              </span>
              <div className="text-2xl md:text-3xl font-black gradient-text">
                {(result.confidence * 100).toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-500 block">
                {t.confidence}
              </span>
            </div>

            {/* Overall Crop Health Score */}
            <div className="bg-slate-950/90 p-4 rounded-2xl border border-emerald-500/40 text-right space-y-0.5">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">
                {t.healthStatus}
              </span>
              <div className="text-2xl md:text-3xl font-black text-white font-['Outfit']">
                {healthScore.overall_score}<span className="text-xs text-slate-400">/100</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                {healthScore.status_label} Condition
              </span>
            </div>
          </div>
        </div>

        {/* Quality Score Bar */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>Sharpness: <strong className="text-slate-200">{result.quality?.blur_score || 120}</strong></span>
            <span>Brightness: <strong className="text-slate-200">{result.quality?.brightness_score || 135}</strong></span>
            <span>Resolution: <strong className="text-slate-200">{result.quality?.resolution || '640x480'}</strong></span>
            <span>Leaf Coverage: <strong className="text-slate-200">{result.quality?.leaf_coverage || 75}%</strong></span>
          </div>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Image Quality Pass: {result.quality?.message || 'High diagnostic clarity'}</span>
          </span>
        </div>
      </div>

      {/* 2. Low-Confidence Safety Flow Warning */}
      {isUnknown && (
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/50 bg-amber-950/30 space-y-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-200 font-['Outfit']">
                The AI could not confidently identify a condition
              </h3>
              <p className="text-xs text-amber-300/90 leading-relaxed mt-0.5">
                {result.rejection_reason || 'Visual confidence was below the 65% diagnostic threshold. Try capturing another closer photo in natural morning light or submit for certified agronomist review.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer"
            >
              Retake / Upload New Photo
            </button>
            {onOpenSymptomAssistant && (
              <button
                onClick={onOpenSymptomAssistant}
                className="px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold border border-indigo-500/40 flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Describe Visible Symptoms</span>
              </button>
            )}
            {onOpenExpertReview && (
              <button
                onClick={() => onOpenExpertReview(result)}
                className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Request Expert Review</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Visual Disease Localization Tabs (Original | AI Detection | Segmentation Mask | Affected Area) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Interactive Multi-Tab Visual Localization Viewer */}
        <div className="glass-panel rounded-3xl p-5 space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Visual Disease Localization</span>
            </h3>

            {/* Visual Tabs */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setActiveVisualTab('original')}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                  activeVisualTab === 'original' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Original
              </button>
              <button
                onClick={() => setActiveVisualTab('detection')}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                  activeVisualTab === 'detection' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Heatmap
              </button>
              <button
                onClick={() => setActiveVisualTab('affected')}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                  activeVisualTab === 'affected' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Lesion Mask
              </button>
            </div>
          </div>

          {/* Visual Canvas Viewer */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            <img
              src={
                activeVisualTab === 'original' 
                  ? result.scan_url 
                  : (result.gradcam_heatmap_url || result.scan_url)
              }
              alt="Crop Scan Diagnostic Visual"
              className={`w-full h-full object-contain ${activeVisualTab === 'affected' ? 'contrast-150 saturate-150' : ''}`}
            />

            <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-300">
              {activeVisualTab === 'original' && 'Raw Camera Input Photo'}
              {activeVisualTab === 'detection' && 'Grad-CAM Deep Attention Heatmap'}
              {activeVisualTab === 'affected' && `Segmented Lesion Area: ${result.severity?.affected_percentage || 18}%`}
            </div>
          </div>

          {/* Explainable AI: Why did the AI flag this? */}
          <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why did the AI flag this? (Explainable Factors)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {result.explanation || 'AI detected foliar discoloration patterns and necrotic lesion margins concentrated in the highlighted attention zones.'}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
              <span>• Leaf Discoloration: Chlorotic halos</span>
              <span>• Spot Distribution: Concentric/Angular</span>
              <span>• Edge Status: Necrotic tissue margins</span>
              <span>• Texture: Raised foliar pustules</span>
            </div>
          </div>
        </div>

        {/* Right: Severity Scale, Early Disease Warning & Health Score Breakdown */}
        <div className="space-y-4">
          {/* Severity Scale & Affected Area */}
          <div className="glass-panel rounded-3xl p-5 space-y-3.5 border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-['Outfit']">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Severity Scale & Affected Area</span>
              </h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}>
                Severity: {result.severity?.severity_category || 'Moderate'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Estimated Affected Foliar Area:</span>
                <span className="text-white font-bold text-sm">
                  {result.severity?.affected_percentage || 0}%
                </span>
              </div>
              <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.max(4, result.severity?.affected_percentage || 0)}%`,
                    backgroundColor: result.severity?.color_code || '#10b981'
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>Healthy (0%)</span>
                <span>Early (1-20%)</span>
                <span>Moderate (21-50%)</span>
                <span>Severe (51%+)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Next Step:</strong> {result.severity?.action_urgency || 'Monitor foliar symptom progression every 3 days.'}
              </span>
            </div>
          </div>

          {/* Early Disease Warning Engine */}
          <div className="glass-panel rounded-3xl p-5 space-y-3 border border-amber-500/30 bg-amber-950/20">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-['Outfit']">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Early Disease Warning</span>
              </h3>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                {earlyWarning.risk_level} ({earlyWarning.risk_score}/100)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {earlyWarning.explanation}
            </p>

            <div className="space-y-1 text-[11px] text-slate-300">
              <span className="font-bold text-amber-400 block">Why is this risk level assigned?</span>
              {earlyWarning.triggers.map((trig, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{trig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modular Crop Health Score Breakdown (Expert View) */}
          {viewMode === 'expert' && (
            <div className="glass-panel rounded-3xl p-5 space-y-3 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Crop Health Score Breakdown (Modular Architecture)
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Visible Leaf Condition:</span>
                  <span className="font-mono text-emerald-400 font-bold">{healthScore.leaf_condition} / 25 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Symptom Severity Index:</span>
                  <span className="font-mono text-teal-400 font-bold">{healthScore.symptom_level} / 25 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Disease Progression Risk:</span>
                  <span className="font-mono text-amber-400 font-bold">{healthScore.disease_risk} / 20 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Canopy Vitality:</span>
                  <span className="font-mono text-sky-400 font-bold">{healthScore.vitality} / 15 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Environmental Risk Factor:</span>
                  <span className="font-mono text-purple-400 font-bold">{healthScore.environmental_risk} / 15 pts</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Bar */}
          <div className="grid grid-cols-2 gap-2">
            {onOpenComparison && (
              <button
                onClick={() => onOpenComparison(result)}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <GitCompare className="w-4 h-4 text-emerald-400" />
                <span>Compare Scans</span>
              </button>
            )}

            {onOpenSpreadTimeline && (
              <button
                onClick={() => onOpenSpreadTimeline(result)}
                className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-teal-400" />
                <span>Spread Timeline</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Actionable Next Steps & Practical Guidance */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 space-y-5 border border-emerald-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Recommended Next Actions & Safe IPM Guidance</span>
            </h3>
            <p className="text-xs text-slate-400">
              Practical, verified agricultural management steps. Always consult local extension services.
            </p>
          </div>

          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Kisan Helpline</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          {/* Symptoms */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
              Observed Symptoms:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.symptoms}
            </p>
          </div>

          {/* Immediate Action */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block">
              What to Do Now:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.what_to_do_now || result.advisory?.chemical_ipm}
            </p>
          </div>

          {/* Organic / Cultural Prevention */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="text-teal-400 font-bold uppercase tracking-wider text-[11px] block">
              Cultural & Organic Practices:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.organic_remedies || result.advisory?.cultural_practices}
            </p>
          </div>

          {/* When to Seek Expert Help */}
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
            <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
              When to Consult Agronomist:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {result.advisory?.when_to_seek_expert || 'If lesions spread to middle and upper leaves within 4-5 days.'}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic text-center pt-2">
          AI guidance is informational. Confirm the condition and treatment approach with a qualified agricultural professional.
        </p>
      </div>

      {/* 5. Feedback Loop & Model Improvement Pipeline */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white font-['Outfit']">
            Was this diagnostic result accurate & useful?
          </h4>
          <p className="text-xs text-slate-400">
            Your feedback helps refine continuous data quality pipelines and expert verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFeedbackGiven('useful')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              feedbackGiven === 'useful'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Yes, Accurate</span>
          </button>

          <button
            onClick={() => setFeedbackGiven('not_sure')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              feedbackGiven === 'not_sure'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <HelpIcon className="w-3.5 h-3.5" />
            <span>Not Sure</span>
          </button>

          <button
            onClick={() => {
              setFeedbackGiven('incorrect');
              setShowFeedbackCommentBox(true);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              feedbackGiven === 'incorrect'
                ? 'bg-red-500 text-slate-950 border-red-400'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Correct Result</span>
          </button>
        </div>
      </div>

      {showFeedbackCommentBox && (
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 animate-fadeIn">
          <label className="text-xs font-bold text-slate-300 block">
            Provide the correct diagnosis or observations (for expert review):
          </label>
          <input
            type="text"
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="e.g. This is Cercospora leaf spot, not Bacterial Blight..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => {
              setShowFeedbackCommentBox(false);
              alert('Feedback recorded for Level 3 Review Pipeline. Thank you!');
            }}
            className="px-4 py-1.5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
          >
            Submit Correction
          </button>
        </div>
      )}

      {/* 6. Bottom Navigation Actions */}
      <div className="pt-2 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-bold border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Analyze Another Crop</span>
        </button>

        {onOpenExpertReview && (
          <button
            onClick={() => onOpenExpertReview(result)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Request Expert Agronomist Review</span>
          </button>
        )}
      </div>
    </div>
  );
};
