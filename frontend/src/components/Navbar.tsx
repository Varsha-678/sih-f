import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Camera, 
  MapPin, Activity, History, Home,
  BookOpen, GraduationCap, Info,
  Menu, X, Sparkles, LayoutDashboard
} from 'lucide-react';
import type { Language, NavTab, NotificationItem } from '../types';
import { translations } from '../utils/translations';
import { NotificationCenter } from './NotificationCenter';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (item: NotificationItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  onTabChange,
  notifications,
  onMarkAllRead,
  onNotificationClick
}) => {
  const t = translations[lang] || translations.en;
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const languages: Array<{ code: Language; label: string; short: string }> = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'mr', label: 'मराठी', short: 'MR' },
    { code: 'hi', label: 'हिंदी', short: 'HI' },
    { code: 'ta', label: 'தமிழ்', short: 'TA' },
    { code: 'te', label: 'తెలుగు', short: 'TE' },
    { code: 'kn', label: 'ಕನ್ನಡ', short: 'KN' },
    { code: 'gu', label: 'ગુજરાતી', short: 'GU' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-500/20 px-3 sm:px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-['Outfit']">
                {t.appName}
              </h1>
              <span className="hidden sm:inline text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                AI Vision
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.tabHome}</span>
          </button>

          <button
            onClick={() => handleNavClick('detect')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'detect'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.tabDetect}</span>
          </button>

          <button
            onClick={() => handleNavClick('crophealth')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'crophealth'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.tabCropHealth}</span>
          </button>

          <button
            onClick={() => handleNavClick('risk')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'risk'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.tabRiskRadar}</span>
          </button>

          <button
            onClick={() => handleNavClick('fields')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'fields'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.tabFields}</span>
          </button>

          <button
            onClick={() => handleNavClick('history')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.tabHistory}</span>
          </button>

          <button
            onClick={() => handleNavClick('library')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'library'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.tabLibrary}</span>
          </button>

          <button
            onClick={() => handleNavClick('learn')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.tabLearn}</span>
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>{t.tabAbout}</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Primary CTA: Analyze Crop */}
          <button
            onClick={() => handleNavClick('detect')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.btnAnalyzeCrop}</span>
          </button>

          {/* Secondary Dashboard Link */}
          <button
            onClick={() => handleNavClick('crophealth')}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.tabDashboard}</span>
          </button>

          {/* Notifications Center */}
          <NotificationCenter
            notifications={notifications}
            lang={lang}
            onMarkAllRead={onMarkAllRead}
            onNotificationClick={onNotificationClick}
          />

          {/* Language Switcher with 7 Languages */}
          <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs gap-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-0.5 shrink-0" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                title={l.label}
                className={`px-1.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                  lang === l.code
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden pt-3 pb-2 border-t border-slate-800 mt-2 space-y-3 animate-fadeIn">
          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'home' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.tabHome}</span>
            </button>

            <button
              onClick={() => handleNavClick('detect')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'detect' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-emerald-400'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.tabDetect}</span>
            </button>

            <button
              onClick={() => handleNavClick('crophealth')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'crophealth' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>{t.tabCropHealth}</span>
            </button>

            <button
              onClick={() => handleNavClick('risk')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'risk' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.tabRiskRadar}</span>
            </button>

            <button
              onClick={() => handleNavClick('fields')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'fields' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.tabFields}</span>
            </button>

            <button
              onClick={() => handleNavClick('history')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'history' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <History className="w-4 h-4" />
              <span>{t.tabHistory}</span>
            </button>

            <button
              onClick={() => handleNavClick('library')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'library' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.tabLibrary}</span>
            </button>

            <button
              onClick={() => handleNavClick('learn')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'learn' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.tabLearn}</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`p-2.5 rounded-xl flex items-center gap-2 ${
                activeTab === 'about' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t.tabAbout}</span>
            </button>
          </div>

          {/* Mobile Language Switcher (All 7 languages) */}
          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 font-semibold text-xs flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Choose Native Language:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 text-xs">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2 py-1.5 font-bold rounded-lg transition-colors text-center ${
                    lang === l.code
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
