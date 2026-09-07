import React, { useState } from 'react';
import { 
  HelpCircle, CheckCircle2, Sparkles, ArrowRight, FileText
} from 'lucide-react';
import type { Language, SymptomDiagnosticResult } from '../types';
import { translations } from '../utils/translations';

interface SymptomAssistantProps {
  lang: Language;
  onNavigateToScan: () => void;
}

export const SymptomAssistant: React.FC<SymptomAssistantProps> = ({
  lang,
  onNavigateToScan
}) => {
  const t = translations[lang] || translations.en;

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('Cotton');
  const [diagnosticVerdict, setDiagnosticVerdict] = useState<SymptomDiagnosticResult | null>(null);

  const symptomOptions = [
    { id: 'spots', label: t.symptomSpots, desc: 'Dark circular, angular, or target-like lesions on foliage.' },
    { id: 'yellowing', label: t.symptomYellowing, desc: 'Interveinal or full leaf yellowing / loss of chlorophyll.' },
    { id: 'browning', label: t.symptomBrowning, desc: 'Crispy leaf edges or necrotic dried out sections.' },
    { id: 'curling', label: t.symptomCurling, desc: 'Upward or downward leaf curling / puckering.' },
    { id: 'wilting', label: t.symptomWilting, desc: 'Drooping foliage despite adequate soil moisture.' },
    { id: 'powder', label: t.symptomPowder, desc: 'White, powdery, or dusty fungal growth on upper or lower surface.' },
    { id: 'holes', label: t.symptomHoles, desc: 'Chewed shot-holes, notched edges, or insect leaf mines.' },
    { id: 'other', label: t.symptomOther, desc: 'Stunting, mosaic streaks, or abnormal gall formations.' },
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleEvaluate = () => {
    if (selectedSymptoms.length === 0) return;

    let possible: Array<{ crop: string; disease: string; probability: number; match_reason: string }> = [];
    let action = 'Isolate symptomatic plants and verify moisture levels.';
    let urgency: 'Low' | 'Medium' | 'High' = 'Medium';

    if (selectedSymptoms.includes('spots') && selectedSymptoms.includes('browning')) {
      possible = [
        { crop: selectedCrop, disease: 'Bacterial Blight / Leaf Spot', probability: 0.88, match_reason: 'Angular necrotic spots and browning indicate bacterial/fungal lesion development.' },
        { crop: selectedCrop, disease: 'Alternaria Leaf Blight', probability: 0.72, match_reason: 'Target-like concentric brown spots typical of Alternaria.' },
      ];
      action = 'Apply protective bio-fungicide (Trichoderma or Pseudomonas) and reduce foliage wetness.';
      urgency = 'Medium';
    } else if (selectedSymptoms.includes('powder')) {
      possible = [
        { crop: selectedCrop, disease: 'Powdery Mildew (Oidium sp.)', probability: 0.92, match_reason: 'White powdery superficial mycelial growth across upper leaf lamina.' }
      ];
      action = 'Apply wettable sulfur @ 2g/L or bio-agent Ampelomyces quisqualis in morning hours.';
      urgency = 'Medium';
    } else if (selectedSymptoms.includes('wilting')) {
      possible = [
        { crop: selectedCrop, disease: 'Vascular Wilt (Fusarium / Verticillium)', probability: 0.85, match_reason: 'Drooping leaves and vascular clogging originating from root zone.' }
      ];
      action = 'Drench root zone with Trichoderma viride and avoid flood irrigation across neighboring rows.';
      urgency = 'High';
    } else if (selectedSymptoms.includes('curling') || selectedSymptoms.includes('yellowing')) {
      possible = [
        { crop: selectedCrop, disease: 'Viral Leaf Curl / Sucking Pest Stress', probability: 0.82, match_reason: 'Puckering and yellowing often transmitted by whiteflies or thrips vectors.' }
      ];
      action = 'Install yellow sticky traps and spray 5% Neem seed kernel extract to manage vectors.';
      urgency = 'Medium';
    } else {
      possible = [
        { crop: selectedCrop, disease: 'Early Foliar Stress / Secondary Abnormality', probability: 0.70, match_reason: 'General foliar stress symptoms aligned with crop profile.' }
      ];
      action = 'Take a clear leaf photo using AI Scanner for high-resolution visual model classification.';
      urgency = 'Low';
    }

    setDiagnosticVerdict({
      possible_diseases: possible,
      recommended_action: action,
      urgency
    });
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setDiagnosticVerdict(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-1.5">
        <h2 className="text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          {t.symptomTitle}
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          {t.symptomSubtitle}
        </p>
      </div>

      {/* Crop Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
        <label className="text-xs font-bold text-slate-300">
          Target Crop:
        </label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Cotton">Cotton</option>
          <option value="Rice">Rice</option>
          <option value="Tomato">Tomato</option>
          <option value="Potato">Potato</option>
          <option value="Maize">Maize</option>
          <option value="Soybean">Soybean</option>
          <option value="Sugarcane">Sugarcane</option>
          <option value="Onion">Onion</option>
          <option value="Pomegranate">Pomegranate</option>
        </select>
      </div>

      {/* Symptom Checklist Cards */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white font-['Outfit']">
          {t.symptomQuestion}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {symptomOptions.map((sym) => {
            const isChecked = selectedSymptoms.includes(sym.id);

            return (
              <div
                key={sym.id}
                onClick={() => toggleSymptom(sym.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'bg-indigo-950/80 border-indigo-500/60 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                  isChecked
                    ? 'bg-indigo-500 border-indigo-400 text-slate-950 font-bold'
                    : 'border-slate-700'
                }`}>
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{sym.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sym.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-800 cursor-pointer"
          >
            Clear Selected
          </button>

          <button
            onClick={handleEvaluate}
            disabled={selectedSymptoms.length === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer ${
              selectedSymptoms.length > 0
                ? 'bg-indigo-500 hover:bg-indigo-400 text-slate-950 shadow-indigo-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.evaluateSymptoms} ({selectedSymptoms.length})</span>
          </button>
        </div>
      </div>

      {/* Evaluated Diagnostic Verdict */}
      {diagnosticVerdict && (
        <div className="glass-panel-glow p-6 rounded-3xl border border-indigo-500/40 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Symptom Evaluation Assessment
            </h3>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              diagnosticVerdict.urgency === 'High'
                ? 'bg-red-950 text-red-300 border-red-500/40'
                : 'bg-indigo-950 text-indigo-300 border-indigo-500/40'
            }`}>
              {diagnosticVerdict.urgency} Urgency
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Candidate Conditions:
            </span>
            {diagnosticVerdict.possible_diseases.map((d, i) => (
              <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{d.crop} — {d.disease}</span>
                  <span className="text-indigo-400">{(d.probability * 100).toFixed(0)}% Match</span>
                </div>
                <p className="text-slate-400 text-[11px]">{d.match_reason}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-500/30 text-xs text-indigo-200">
            <strong className="block text-indigo-300 mb-0.5 font-bold">Recommended Step:</strong>
            {diagnosticVerdict.recommended_action}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onNavigateToScan}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Verify with AI Camera Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
