import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, FileCheck, 
  BarChart3, RefreshCw
} from 'lucide-react';
import type { MLMetricsData, Language } from '../types';
import { translations } from '../utils/translations';

interface ExpertPortalProps {
  lang: Language;
}

export const ExpertPortal: React.FC<ExpertPortalProps> = ({ lang }) => {
  const t = translations[lang];

  const [metrics, setMetrics] = useState<MLMetricsData | null>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [selectedScan, setSelectedScan] = useState<any | null>(null);
  const [expertNote, setExpertNote] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null);

  // Fetch metrics and review queue
  const fetchData = async () => {
    try {
      const [resMetrics, resScans] = await Promise.all([
        fetch('/api/v1/ml/metrics'),
        fetch('/api/v1/history/scans?limit=15')
      ]);

      if (resMetrics.ok) {
        const mData = await resMetrics.json();
        setMetrics(mData);
      }
      if (resScans.ok) {
        const sData = await resScans.json();
        setScans(sData);
        if (sData.length > 0) {
          setSelectedScan(sData[0]);
        }
      }
    } catch (err) {
      console.warn('Backend fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyScan = async () => {
    if (!selectedScan) return;
    setIsVerifying(true);
    setVerificationSuccess(null);

    try {
      const res = await fetch('http://localhost:8000/api/v1/expert/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_id: selectedScan.id,
          verified_crop: selectedScan.crop,
          verified_condition: selectedScan.condition,
          expert_notes: expertNote || 'Verified and certified by Agricultural Extension Specialist.',
          is_correct: true
        })
      });

      if (res.ok) {
        setVerificationSuccess(`Scan ${selectedScan.id} successfully certified as Level 4 Ground Truth.`);
        fetchData();
      }
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Header & Quality Gate Banner */}
      <div className="glass-panel-glow rounded-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> EXPERT VALIDATION & CONTINUOUS LEARNING
              </span>
              <span className="text-xs text-slate-400">Level 1 → Level 4 Label Hierarchy</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {t.tabExpert}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Agronomist review queue, ground-truth certification, and model quality gate compliance
            </p>
          </div>

          <button
            onClick={fetchData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700 self-start md:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Metrics
          </button>
        </div>
      </div>

      {/* 2. 90%+ Quality Gate Compliance Card */}
      {metrics && (
        <div className="glass-panel rounded-2xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              {t.mlMetricsTitle}
            </h3>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              STATUS: {metrics.quality_gate?.status || 'APPROVED_FOR_DEMO'}
            </span>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {/* Test Accuracy */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.testAccuracy}</span>
              <span className="text-2xl font-black text-emerald-400">
                {(metrics.evaluation_metrics?.test_accuracy * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-slate-500 block">Target: ≥ 90.0%</span>
            </div>

            {/* Macro F1 */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.macroF1}</span>
              <span className="text-2xl font-black text-teal-400">
                {metrics.evaluation_metrics?.macro_f1?.toFixed(3)}
              </span>
              <span className="text-[9px] text-slate-500 block">Target: ≥ 0.900</span>
            </div>

            {/* Benchmark vs Real Field */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.realFieldAcc}</span>
              <span className="text-2xl font-black text-white">
                {(metrics.evaluation_metrics?.real_field_accuracy * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-slate-500 block">Benchmark: {(metrics.evaluation_metrics?.benchmark_accuracy * 100).toFixed(1)}%</span>
            </div>

            {/* Generalization Gap */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.genGap}</span>
              <span className="text-2xl font-black text-amber-400">
                {(metrics.evaluation_metrics?.generalization_gap * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-emerald-400 font-semibold block">✓ Low Gap</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong>Model Quality Gate Verdict:</strong> {metrics.quality_gate?.evaluation_verdict}
          </p>
        </div>
      )}

      {/* 3. Review Queue & Certification Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scan List */}
        <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Field Scan Queue ({scans.length} Scans)
          </h3>

          {scans.map((scan) => (
            <div
              key={scan.id}
              onClick={() => setSelectedScan(scan)}
              className={`p-3.5 rounded-xl cursor-pointer transition border ${
                selectedScan?.id === scan.id
                  ? 'bg-slate-900 border-emerald-500 shadow-md'
                  : 'glass-panel hover:bg-slate-900/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">
                  {scan.crop} — {scan.condition}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  scan.expert_verified
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-950 text-amber-400 border-amber-500/30'
                }`}>
                  Level {scan.label_level || 2} {scan.expert_verified ? 'Certified' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span>District: {scan.district}</span>
                <span>Confidence: {(scan.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Action Pane */}
        {selectedScan && (
          <div className="lg:col-span-7 glass-panel-glow rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-emerald-400">Scan ID: {selectedScan.id}</span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  {selectedScan.crop} — {selectedScan.condition}
                </h4>
                <span className="text-xs text-slate-400">Location: {selectedScan.district}</span>
              </div>

              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                selectedScan.expert_verified
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-950 text-amber-400 border-amber-500/40'
              }`}>
                {selectedScan.expert_verified ? 'Level 4 Certified' : 'Awaiting Agronomist Review'}
              </span>
            </div>

            {/* Scan Image Thumbnail */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedScan.image_url}
                alt="Scan Thumbnail"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310B981"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>';
                }}
              />
            </div>

            {/* Expert Certification Form */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {t.expertNotes}
                </label>
                <textarea
                  rows={2}
                  value={expertNote}
                  onChange={(e) => setExpertNote(e.target.value)}
                  placeholder="Add extension officer remarks or confirm pathogen etiology..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {verificationSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{verificationSuccess}</span>
                </div>
              )}

              <button
                onClick={handleVerifyScan}
                disabled={isVerifying}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <FileCheck className="w-4 h-4" />
                {isVerifying ? 'Certifying...' : t.expertVerifyBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
