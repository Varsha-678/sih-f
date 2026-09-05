import React from 'react';
import { 
  Sparkles, Camera, Activity, MapPin, 
  ArrowRight, ShieldCheck,
  Award, CheckCircle2, AlertTriangle, Leaf
} from 'lucide-react';
import type { Language, NavTab } from '../types';
import { translations } from '../utils/translations';

interface LandingHomeProps {
  lang: Language;
  onStartScan: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const LandingHome: React.FC<LandingHomeProps> = ({
  lang,
  onStartScan,
  onNavigateTab
}) => {
  const t = translations[lang] || translations.en;

  const supportedCropsList = [
    { name: 'Tomato', diseases: 'Early Blight, Late Blight, Septoria', icon: '🍅' },
    { name: 'Cotton', diseases: 'Bacterial Blight (Karpa), Bollworm, Cercospora', icon: '🌱' },
    { name: 'Rice / Paddy', diseases: 'Bacterial Leaf Blight, Blast, Brown Spot', icon: '🌾' },
    { name: 'Potato', diseases: 'Early Blight, Late Blight, Scab', icon: '🥔' },
    { name: 'Soybean', diseases: 'Asian Rust (Tamba), Frogeye Leaf Spot', icon: '🫘' },
    { name: 'Sugarcane', diseases: 'Red Rot (Kuhila), Wilt, Smut', icon: '🎋' },
    { name: 'Onion', diseases: 'Purple Blotch, Stemphylium Blight', icon: '🧅' },
    { name: 'Pomegranate', diseases: 'Bacterial Blight (Telya), Anthracnose', icon: '🍎' },
  ];

  return (
    <div className="space-y-16 pb-16 animate-fadeIn">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-panel-glow border border-emerald-500/30 p-6 md:p-12">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AgriTech + Computer Vision Intelligence • 94.2% Verified Accuracy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-['Outfit']">
              Detect Crop Diseases Before They Spread.
            </h1>

            {/* Subheadline */}
            <p className="text-sm md:text-lg text-slate-300 max-w-xl leading-relaxed">
              AI-powered crop health intelligence that helps identify early disease symptoms, assess risk, and support timely field decisions.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                onClick={onStartScan}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>Analyze a Crop</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigateTab('crophealth')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Explore Crop Health</span>
              </button>
            </div>

            {/* Trust disclaimer */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="italic">{t.aiDisclaimer}</span>
            </div>
          </div>

          {/* Right Column: Interactive AI Scanning Visual Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500/40 p-4 shadow-2xl space-y-3">
              {/* Scan Stage Visualizer Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Computer Vision Active
                </span>
                <span className="font-mono text-slate-400 font-semibold">
                  EfficientNet-B0 • Grad-CAM
                </span>
              </div>

              {/* Plant Image Container with Scanning Line and Bounding Boxes */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {/* Simulated Leaf Image */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex items-center justify-center relative p-6">
                  <Leaf className="w-32 h-32 text-emerald-500/40" />

                  {/* Simulated Symptom Lesions */}
                  <div className="absolute top-1/3 left-1/3 w-10 h-10 rounded-full border-2 border-amber-400/80 bg-amber-500/20 flex items-center justify-center animate-pulse">
                    <span className="text-[9px] font-mono font-bold text-amber-300">Target</span>
                  </div>

                  <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full border-2 border-red-400/80 bg-red-500/20 flex items-center justify-center animate-pulse">
                    <span className="text-[8px] font-mono font-bold text-red-300">Lesion</span>
                  </div>

                  {/* Dynamic Laser Scanning Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-1/2 -translate-y-1/2 animate-scan-radar shadow-[0_0_15px_#10b981]" />
                </div>

                {/* AI HUD Overlay Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full border border-emerald-500/40 text-[11px] text-emerald-300 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Early Blight (94.2% AI Estimate)</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-full border border-slate-700 text-[11px] text-slate-300 font-mono font-bold">
                  Affected: 18% • Score: 78/100
                </div>
              </div>

              {/* Core Flow Stepper Ribbon */}
              <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-bold flex items-center justify-between text-center">
                <span>📷 Photo</span>
                <span className="text-emerald-400">→</span>
                <span>🧠 AI Vision</span>
                <span className="text-emerald-400">→</span>
                <span>🔍 Detection</span>
                <span className="text-emerald-400">→</span>
                <span>📊 Score (78)</span>
                <span className="text-emerald-400">→</span>
                <span>⚠️ Warning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Core 7-Step Product Workflow */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            End-to-End AgriTech Architecture
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-['Outfit']">
            The Complete Crop Health Lifecycle
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            From single-leaf image capture to continuous farm-wide disease monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">1. Capture & Quality Check</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Camera or upload with pre-scan blur, brightness, and leaf coverage validation.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">2. Neural Disease Screening</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calibrated multi-class classification with Grad-CAM visual attention heatmaps.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">3. Severity & Health Score</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Foliar affected area measurement and modular Crop Health Score (0-100).
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">4. Risk Tracking & Advisory</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agro-climatic risk forecasting, safe IPM next steps, and historical scan comparison.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Supported Crops Carousel / Grid */}
      <section className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Supported Agricultural Crops & Major Pathogens
            </h3>
            <p className="text-xs text-slate-400">
              Trained on validated field datasets with &gt;90% accuracy standards.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('library')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore Full Disease Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {supportedCropsList.map((crop, idx) => (
            <div
              key={idx}
              onClick={() => onStartScan()}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer space-y-1.5 group"
            >
              <div className="text-2xl">{crop.icon}</div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors font-['Outfit']">
                {crop.name}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {crop.diseases}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Nav Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigateTab('crophealth')}
          className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Crop Health Dashboard
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Track foliar health trends, monitor active field plots, and view disease occurrence charts.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('risk')}
          className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Agro-Climatic Risk Monitor
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Real-time humidity, temperature, and spore incubation forecasts across regional crop clusters.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('about')}
          className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-teal-500/40 transition cursor-pointer space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Dataset & Model Quality Gate
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Inspect model evaluation metrics (94.25% test accuracy), open dataset sources, and trust standards.
          </p>
        </div>
      </section>
    </div>
  );
};
