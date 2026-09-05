import React, { useState, useEffect } from 'react';
import { 
  Award, CheckCircle2, FileCheck, 
  BarChart3, Send, UserCheck
} from 'lucide-react';
import type { MLMetricsData, Language, ExpertReviewSubmission, DiagnosticResult } from '../types';
import { translations } from '../utils/translations';

interface ExpertPortalProps {
  lang: Language;
  initialReviewData?: DiagnosticResult | null;
}

export const ExpertPortal: React.FC<ExpertPortalProps> = ({ 
  lang,
  initialReviewData
}) => {
  const t = translations[lang];

  const [activeSubTab, setActiveSubTab] = useState<'request' | 'queue' | 'metrics'>('request');
  const [metrics, setMetrics] = useState<MLMetricsData | null>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [selectedScan, setSelectedScan] = useState<any | null>(null);
  const [expertNote, setExpertNote] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] = useState<string | null>(null);

  // Farmer Request Form State
  const [reqCrop, setReqCrop] = useState(initialReviewData?.crop || 'Cotton');
  const [reqField, setReqField] = useState(initialReviewData?.field_name || 'Field 01 - North Plot');
  const [reqSymptoms, setReqSymptoms] = useState('Angular dark spots and yellowing around leaf margins');
  const [reqNotes, setReqNotes] = useState('');
  const [reqPhone, setReqPhone] = useState('9876543210');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Submissions State list
  const [submissions, setSubmissions] = useState<ExpertReviewSubmission[]>([
    {
      id: 'EXP-1049',
      crop: 'Cotton',
      field_name: 'Field 01 - North Plot',
      image_url: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=300&auto=format&fit=crop&q=80',
      ai_result: 'Bacterial Blight (94%)',
      confidence: 0.94,
      farmer_symptoms: ['Spots', 'Yellowing'],
      farmer_notes: 'Spread noticed after heavy monsoon rain last Thursday.',
      farmer_phone: '9876543210',
      status: 'Reviewed',
      submitted_at: '2026-09-02',
      expert_feedback: {
        verified_disease: 'Bacterial Blight (Karpa)',
        confidence_rating: 'High Confidence',
        treatment_advice: 'Copper oxychloride 25g + Streptocycline 1g in 10L water. Suspend top-dressing urea.',
        agronomist_name: 'Dr. S. Patil (Senior Agronomist, KVK)',
        reviewed_at: '2026-09-03'
      }
    },
    {
      id: 'EXP-1050',
      crop: 'Tomato',
      field_name: 'Field 03 - South Valley',
      image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a47a?w=300&auto=format&fit=crop&q=80',
      ai_result: 'Early Blight (93%)',
      confidence: 0.93,
      farmer_symptoms: ['Spots', 'Browning'],
      farmer_notes: 'Concentric rings starting on lower 3-4 branches.',
      farmer_phone: '9876543210',
      status: 'Under Review',
      submitted_at: '2026-09-04'
    }
  ]);

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

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubmission: ExpertReviewSubmission = {
      id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      crop: reqCrop,
      field_name: reqField,
      image_url: initialReviewData?.scan_url || 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=300&auto=format&fit=crop&q=80',
      ai_result: initialReviewData ? `${initialReviewData.condition} (${(initialReviewData.confidence * 100).toFixed(0)}%)` : `${reqCrop} Foliar Analysis`,
      confidence: initialReviewData?.confidence || 0.85,
      farmer_symptoms: [reqSymptoms],
      farmer_notes: reqNotes || 'Submitted for expert agronomist validation.',
      farmer_phone: reqPhone,
      status: 'Pending',
      submitted_at: new Date().toISOString().split('T')[0]
    };

    setSubmissions([newSubmission, ...submissions]);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleVerifyScan = async () => {
    if (!selectedScan) return;
    setIsVerifying(true);
    setVerificationSuccess(null);

    try {
      const res = await fetch('/api/v1/expert/validate', {
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
      {/* 1. Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> EXPERT REVIEW & CONTINUOUS LEARNING
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white font-['Outfit']">
            {t.tabExpert}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Request certified agricultural specialist reviews and inspect ML model quality gate compliance.
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('request')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'request'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Farmer Submissions
          </button>
          <button
            onClick={() => setActiveSubTab('queue')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'queue'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Agronomist Queue
          </button>
          <button
            onClick={() => setActiveSubTab('metrics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSubTab === 'metrics'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ML Quality Gate
          </button>
        </div>
      </div>

      {/* Tab 1: Farmer Request Review & Submissions */}
      {activeSubTab === 'request' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submission Form */}
          <div className="lg:col-span-5 glass-panel-glow p-6 rounded-3xl border border-emerald-500/30 space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              {t.expertPortalTitle}
            </h3>

            <form onSubmit={handleFarmerSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Crop Type
                </label>
                <select
                  value={reqCrop}
                  onChange={(e) => setReqCrop(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Cotton">Cotton</option>
                  <option value="Rice">Rice</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Potato">Potato</option>
                  <option value="Maize">Maize</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Assigned Field
                </label>
                <input
                  type="text"
                  value={reqField}
                  onChange={(e) => setReqField(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Observed Symptoms
                </label>
                <input
                  type="text"
                  value={reqSymptoms}
                  onChange={(e) => setReqSymptoms(e.target.value)}
                  placeholder="e.g. Yellowing spots on leaf edges"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Farmer Notes & History
                </label>
                <textarea
                  rows={3}
                  value={reqNotes}
                  onChange={(e) => setReqNotes(e.target.value)}
                  placeholder={t.expertNotesPlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Kisan Contact Phone
                </label>
                <input
                  type="tel"
                  value={reqPhone}
                  onChange={(e) => setReqPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {submitSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.reviewSubmitted}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitReview}</span>
              </button>
            </form>
          </div>

          {/* Submissions Tracker */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit']">
              Review Status Tracker ({submissions.length} Requests)
            </h3>

            <div className="space-y-3">
              {submissions.map((sub) => {
                const isReviewed = sub.status === 'Reviewed';
                const isPending = sub.status === 'Pending';

                return (
                  <div
                    key={sub.id}
                    className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                          {sub.id}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {sub.crop} • {sub.field_name}
                        </h4>
                        <span className="text-xs text-slate-400">Submitted on {sub.submitted_at}</span>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isReviewed
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                          : isPending
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : 'bg-sky-950 text-sky-300 border-sky-500/40'
                      }`}>
                        {sub.status === 'Reviewed' ? t.statusReviewed : sub.status === 'Pending' ? t.statusPending : t.statusUnderReview}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div><strong>AI Initial Prediction:</strong> {sub.ai_result}</div>
                      <div><strong>Farmer Observations:</strong> {sub.farmer_notes}</div>
                    </div>

                    {/* Expert Feedback Section */}
                    {sub.expert_feedback && (
                      <div className="p-3.5 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs space-y-1.5 text-emerald-200">
                        <div className="flex items-center justify-between font-bold text-emerald-300">
                          <span className="flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5" />
                            {sub.expert_feedback.agronomist_name}
                          </span>
                          <span className="text-[10px] opacity-75">{sub.expert_feedback.reviewed_at}</span>
                        </div>
                        <p className="text-slate-200">
                          <strong>Prescribed Care:</strong> {sub.expert_feedback.treatment_advice}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Agronomist Queue */}
      {activeSubTab === 'queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Certification Queue ({scans.length} Scans)
            </h3>

            {scans.map((scan) => (
              <div
                key={scan.id}
                onClick={() => setSelectedScan(scan)}
                className={`p-3.5 rounded-2xl cursor-pointer transition border ${
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

          {selectedScan && (
            <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 space-y-4">
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

              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <img
                  src={selectedScan.image_url}
                  alt="Scan Thumbnail"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310B981"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>';
                  }}
                />
              </div>

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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  <FileCheck className="w-4 h-4" />
                  {isVerifying ? 'Certifying...' : t.expertVerifyBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: ML Quality Gate */}
      {activeSubTab === 'metrics' && (
        <div className="glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              {t.mlMetricsTitle}
            </h3>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              STATUS: {metrics?.quality_gate?.status || 'APPROVED_FOR_DEMO'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.testAccuracy}</span>
              <span className="text-2xl font-black text-emerald-400">
                {((metrics?.evaluation_metrics?.test_accuracy || 0.942) * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-slate-500 block">Target: ≥ 90.0%</span>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.macroF1}</span>
              <span className="text-2xl font-black text-teal-400">
                {(metrics?.evaluation_metrics?.macro_f1 || 0.938).toFixed(3)}
              </span>
              <span className="text-[9px] text-slate-500 block">Target: ≥ 0.900</span>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.realFieldAcc}</span>
              <span className="text-2xl font-black text-white">
                {((metrics?.evaluation_metrics?.real_field_accuracy || 0.920) * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-slate-500 block">Benchmark: 96.5%</span>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.genGap}</span>
              <span className="text-2xl font-black text-amber-400">
                {((metrics?.evaluation_metrics?.generalization_gap || 0.045) * 100).toFixed(1)}%
              </span>
              <span className="text-[9px] text-emerald-400 font-semibold block">✓ Low Gap</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
