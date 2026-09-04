import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { CameraScanner } from './components/CameraScanner';
import { DiagnosticResult } from './components/DiagnosticResult';
import { RiskRadarMap } from './components/RiskRadarMap';
import { ExpertPortal } from './components/ExpertPortal';
import { HistoryTimeline } from './components/HistoryTimeline';
import type { Language, DiagnosticResult as DiagnosticResultType } from './types';
import { translations } from './utils/translations';
import { ShieldCheck, Sparkles, AlertCircle, PhoneCall } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('mr'); // Marathi by default for Maharashtra
  const [activeTab, setActiveTab] = useState<'detect' | 'risk' | 'history' | 'expert'>('detect');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const t = translations[lang];

  // Seed initial demo data on mount if database is empty
  useEffect(() => {
    fetch('/api/v1/seed_demo_scans', { method: 'POST' }).catch(() => {});
  }, []);

  // Handle Image Selection and Send to FastAPI Backend
  const handleImageSelected = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('district', 'Yavatmal');
    formData.append('language', lang);

    try {
      const response = await fetch('/api/v1/analyze/disease', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Diagnostic analysis failed.');
      }

      const data: DiagnosticResultType = await response.json();
      setDiagnosticResult(data);

      // Celebrate high confidence diagnosis or healthy state
      if (!data.is_unknown && data.confidence > 0.85) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Unable to connect to AgriRakshak diagnostic engine.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetScan = () => {
    setDiagnosticResult(null);
    setAnalysisError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Top Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        gatePassed={true}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* Tab 1: Detect / Real Camera Scanner */}
        {activeTab === 'detect' && (
          <div className="space-y-6">
            {!diagnosticResult ? (
              <>
                {/* Hero Banner for Farmer */}
                <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SIH 2026 • AI-Powered Real-Time Crop Protection</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                    {t.scanMyCrop}
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400">
                    Point rear camera at crop leaf to diagnose fungal/bacterial diseases, detect pests, and view explainable AI attention maps.
                  </p>
                </div>

                {analysisError && (
                  <div className="max-w-2xl mx-auto p-4 bg-red-950/50 border border-red-500/40 rounded-xl text-xs md:text-sm text-red-300 flex items-start gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{analysisError}</span>
                  </div>
                )}

                <CameraScanner
                  lang={lang}
                  onImageSelected={handleImageSelected}
                  isAnalyzing={isAnalyzing}
                />
              </>
            ) : (
              <DiagnosticResult
                result={diagnosticResult}
                lang={lang}
                onReset={handleResetScan}
              />
            )}
          </div>
        )}

        {/* Tab 2: Agro-Climatic Early Warning Radar (Way 2) */}
        {activeTab === 'risk' && <RiskRadarMap lang={lang} />}

        {/* Tab 3: Historical Plot Diagnostics */}
        {activeTab === 'history' && <HistoryTimeline lang={lang} />}

        {/* Tab 4: Expert Portal & ML Quality Gate */}
        {activeTab === 'expert' && <ExpertPortal lang={lang} />}
      </main>

      {/* 3. Bottom Footer */}
      <footer className="glass-panel border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AgriRakshak • Government of Maharashtra Agricultural Intelligence</span>
          </div>

          <a
            href="tel:18001801551"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Kisan Call Center: 1800-180-1551</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
