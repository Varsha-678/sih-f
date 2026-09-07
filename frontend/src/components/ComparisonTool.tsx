import React, { useState } from 'react';
import { 
  GitCompare, CheckCircle2, TrendingDown, TrendingUp
} from 'lucide-react';
import type { DiagnosticResult, Language } from '../types';
import { translations } from '../utils/translations';

interface ComparisonToolProps {
  scans: DiagnosticResult[];
  lang: Language;
  currentResult?: DiagnosticResult | null;
}

export const ComparisonTool: React.FC<ComparisonToolProps> = ({
  scans,
  lang,
  currentResult
}) => {
  const t = translations[lang] || translations.en;

  // Default selection
  const [scanAId, setScanAId] = useState<string>(scans[1]?.prediction_id || scans[0]?.prediction_id || '');
  const [scanBId, setScanBId] = useState<string>(currentResult?.prediction_id || scans[0]?.prediction_id || '');

  const scanA = scans.find((s) => s.prediction_id === scanAId) || scans[0];
  const scanB = (currentResult && currentResult.prediction_id === scanBId)
    ? currentResult
    : (scans.find((s) => s.prediction_id === scanBId) || scans[0]);

  // Delta calculation
  const areaA = scanA?.severity?.affected_percentage || 0;
  const areaB = scanB?.severity?.affected_percentage || 0;
  const delta = Math.round((areaB - areaA) * 10) / 10;

  let verdict = t.verdictUnchanged;
  let verdictColor = 'bg-slate-900 text-slate-300 border-slate-700';
  let verdictIcon = <CheckCircle2 className="w-5 h-5 text-slate-400" />;

  if (delta < -2) {
    verdict = t.verdictImproved;
    verdictColor = 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40';
    verdictIcon = <TrendingDown className="w-5 h-5 text-emerald-400" />;
  } else if (delta > 2) {
    verdict = t.verdictWorsening;
    verdictColor = 'bg-red-950/90 text-red-300 border-red-500/40';
    verdictIcon = <TrendingUp className="w-5 h-5 text-red-400" />;
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-1.5">
        <h2 className="text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-emerald-400" />
          {t.compareTitle}
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          {t.compareSubtitle}
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-1.5">
            {t.selectScanA}
          </label>
          <select
            value={scanAId}
            onChange={(e) => setScanAId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {scans.map((s) => (
              <option key={s.prediction_id} value={s.prediction_id}>
                {s.prediction_id} — {s.crop} ({s.condition}) • {s.severity?.affected_percentage}%
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 block mb-1.5">
            {t.selectScanB}
          </label>
          <select
            value={scanBId}
            onChange={(e) => setScanBId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {currentResult && (
              <option value={currentResult.prediction_id}>
                [Latest] {currentResult.prediction_id} — {currentResult.crop} ({currentResult.condition})
              </option>
            )}
            {scans.map((s) => (
              <option key={s.prediction_id} value={s.prediction_id}>
                {s.prediction_id} — {s.crop} ({s.condition}) • {s.severity?.affected_percentage}%
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Verdict Banner */}
      <div className={`p-5 rounded-3xl border flex items-center justify-between gap-4 ${verdictColor}`}>
        <div className="flex items-center gap-3">
          {verdictIcon}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
              Differential Diagnosis Result
            </span>
            <h3 className="text-lg font-bold font-['Outfit']">{verdict}</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
            Lesion Area Delta
          </span>
          <span className="text-xl font-mono font-black">
            {delta > 0 ? `+${delta}%` : `${delta}%`}
          </span>
        </div>
      </div>

      {/* Side-by-Side Visual Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scan A */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.previousScan} ({scanA?.prediction_id})
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              {scanA?.severity?.affected_percentage}% Affected
            </span>
          </div>

          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            {scanA?.scan_url ? (
              <img
                src={scanA.scan_url}
                alt="Previous scan"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="text-xs space-y-1">
            <h4 className="font-bold text-white">{scanA?.crop} — {scanA?.condition}</h4>
            <p className="text-slate-400">{scanA?.severity?.action_urgency}</p>
          </div>
        </div>

        {/* Scan B */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {t.latestScan} ({scanB?.prediction_id})
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              {scanB?.severity?.affected_percentage}% Affected
            </span>
          </div>

          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            {scanB?.scan_url ? (
              <img
                src={scanB.scan_url}
                alt="Recent scan"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="text-xs space-y-1">
            <h4 className="font-bold text-white">{scanB?.crop} — {scanB?.condition}</h4>
            <p className="text-slate-400">{scanB?.severity?.action_urgency}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
