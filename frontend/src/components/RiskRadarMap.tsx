import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Droplets, 
  Bug, MapPin, Search, Compass, AlertTriangle
} from 'lucide-react';
import type { DistrictHotspot, Language } from '../types';
import { translations } from '../utils/translations';

interface RiskRadarMapProps {
  lang: Language;
}

export const RiskRadarMap: React.FC<RiskRadarMapProps> = ({ lang }) => {
  const t = translations[lang];

  const [hotspots, setHotspots] = useState<DistrictHotspot[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictHotspot | null>(null);
  const [filterRegion, setFilterRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch Maharashtra Hotspot risk vectors from FastAPI backend
  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await fetch('/api/v1/risk/maharashtra');
        if (res.ok) {
          const data = await res.json();
          setHotspots(data.hotspots);
          if (data.hotspots.length > 0) {
            setSelectedDistrict(data.hotspots[0]);
          }
        }
      } catch (err) {
        console.warn('Backend risk endpoint unavailable. Using local agro-climatic fallback telemetry.', err);
      }
    };

    fetchHotspots();
  }, []);

  const filteredHotspots = hotspots.filter((h) => {
    const matchesRegion = filterRegion === 'ALL' || h.region.toUpperCase().includes(filterRegion);
    const matchesSearch = h.district.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          h.primary_crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const getRiskBadgeColor = (level: string) => {
    if (level === 'HIGH') return 'bg-red-950/80 text-red-400 border-red-500/40 shadow-red-500/10';
    if (level === 'MEDIUM') return 'bg-amber-950/80 text-amber-400 border-amber-500/40 shadow-amber-500/10';
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Header & Summary Stats */}
      <div className="glass-panel-glow rounded-2xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                WAY 2 • PREEMPTIVE RISK ENGINE
              </span>
              <span className="text-xs text-slate-400">Maharashtra Agro-Climatic Intelligence</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {t.riskTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {t.riskSubtitle} — Live Environmental Vector Analysis
            </p>
          </div>

          {/* Aggregate Risk Indicators */}
          <div className="grid grid-cols-3 gap-3 self-start md:self-auto">
            <div className="bg-red-950/40 border border-red-500/30 px-3 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-red-400 block">{t.riskHigh}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'HIGH').length}
              </span>
            </div>
            <div className="bg-amber-950/40 border border-amber-500/30 px-3 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">{t.riskMedium}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'MEDIUM').length}
              </span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 px-3 py-2 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">{t.riskLow}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'LOW').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & District Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-3 rounded-xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search District or Crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {['ALL', 'VIDARBHA', 'MARATHWADA', 'WESTERN', 'NORTH'].map((reg) => (
            <button
              key={reg}
              onClick={() => setFilterRegion(reg)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
                filterRegion === reg
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Split View: District List + Detailed Breakdown Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Feed List */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
          {filteredHotspots.map((district) => (
            <div
              key={district.district}
              onClick={() => setSelectedDistrict(district)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                selectedDistrict?.district === district.district
                  ? 'bg-slate-900/90 border-emerald-500 shadow-md shadow-emerald-500/10 scale-[1.01]'
                  : 'glass-panel hover:bg-slate-900/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm md:text-base">
                      {district.district}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ({district.region})
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {t.primaryCrop}: <strong className="text-slate-200">{district.primary_crop}</strong> ({district.crop_stage})
                  </span>
                </div>

                <div className={`px-2.5 py-1 rounded-lg border text-right ${getRiskBadgeColor(district.risk_level)}`}>
                  <span className="text-[10px] font-bold block">{district.risk_level}</span>
                  <span className="text-base font-black">{district.risk_score}</span>
                  <span className="text-[9px] text-slate-400">/100</span>
                </div>
              </div>

              {/* Weather Summary Pill */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber-400" /> {district.temperature_c}°C
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" /> {district.relative_humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Bug className="w-3 h-3 text-red-400" /> {district.pest_trap_density}/trap
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected District Deep-Dive Risk Card */}
        {selectedDistrict && (
          <div className="lg:col-span-7 glass-panel-glow rounded-2xl p-5 md:p-6 space-y-5">
            {/* Header Info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> District Risk Vector Deep-Dive
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedDistrict.district} <span className="text-slate-400 text-sm font-normal">({selectedDistrict.region})</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Primary Crop: <strong className="text-emerald-300">{selectedDistrict.primary_crop}</strong> | Stage: <strong>{selectedDistrict.crop_stage}</strong>
                </p>
              </div>

              <div className={`p-3 rounded-xl border text-center ${getRiskBadgeColor(selectedDistrict.risk_level)}`}>
                <span className="text-[10px] font-extrabold uppercase tracking-wider block">
                  {selectedDistrict.risk_level}
                </span>
                <span className="text-3xl font-black">
                  {selectedDistrict.risk_score}
                </span>
                <span className="text-[10px] text-slate-400 block font-semibold">Outbreak Index</span>
              </div>
            </div>

            {/* 4 Multi-Factor Breakdown Meters */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Transparent Multi-Factor Risk Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Weather Proliferation Index (35%) */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Weather Index (35%)</span>
                    <span className="text-amber-400 font-bold">{selectedDistrict.breakdown.weather_index}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedDistrict.breakdown.weather_index}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {selectedDistrict.temperature_c}°C • {selectedDistrict.relative_humidity}% RH • {selectedDistrict.rainfall_mm}mm rain
                  </span>
                </div>

                {/* Phenological Vulnerability (25%) */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Crop Stage Vulnerability (25%)</span>
                    <span className="text-emerald-400 font-bold">{selectedDistrict.breakdown.stage_vulnerability}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${selectedDistrict.breakdown.stage_vulnerability}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Susceptible Stage: {selectedDistrict.crop_stage}
                  </span>
                </div>

                {/* Pest Trap Density Index (25%) */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Trap Catch Index (25%)</span>
                    <span className="text-red-400 font-bold">{selectedDistrict.breakdown.trap_density_index}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${selectedDistrict.breakdown.trap_density_index}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Catch: {selectedDistrict.pest_trap_density} moths/trap/night
                  </span>
                </div>

                {/* Cluster Outbreak Proximity (15%) */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Cluster Proximity (15%)</span>
                    <span className="text-teal-400 font-bold">{selectedDistrict.breakdown.cluster_proximity_index}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: `${selectedDistrict.breakdown.cluster_proximity_index}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Alert: {selectedDistrict.active_outbreak}
                  </span>
                </div>
              </div>
            </div>

            {/* Trilingual Preemptive Risk Advisory */}
            <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                Preemptive Agro-Climatic Advisory ({lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'})
              </span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                {selectedDistrict.advisory[lang] || selectedDistrict.advisory.en}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
