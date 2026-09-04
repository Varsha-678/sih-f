import React from 'react';
import { ShieldCheck, Globe, Award, Sparkles } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  activeTab: 'detect' | 'risk' | 'history' | 'expert';
  onTabChange: (tab: 'detect' | 'risk' | 'history' | 'expert') => void;
  gatePassed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  onTabChange,
  gatePassed = true
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                  {t.appName}
                </h1>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.tagline}</p>
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="flex md:hidden items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {(['mr', 'en', 'hi'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  lang === l
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l === 'mr' ? 'मराठी' : l === 'en' ? 'EN' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center justify-around md:justify-center gap-1 bg-slate-900/70 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onTabChange('detect')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'detect'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t.tabDetect}
          </button>
          <button
            onClick={() => onTabChange('risk')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'risk'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t.tabRiskRadar}
          </button>
          <button
            onClick={() => onTabChange('history')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t.tabHistory}
          </button>
          <button
            onClick={() => onTabChange('expert')}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'expert'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            {t.tabExpert}
          </button>
        </nav>

        {/* Desktop Language Switcher & Quality Gate Status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>90%+ Gate: {gatePassed ? 'APPROVED' : 'CANDIDATE'}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['mr', 'en', 'hi'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  lang === l
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l === 'mr' ? 'मराठी' : l === 'en' ? 'English' : 'हिंदी'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
