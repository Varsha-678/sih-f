import React, { useState, useEffect } from 'react';
import { 
  History, Calendar, MapPin, Activity, ShieldCheck, 
  Search, Filter, GitCompare
} from 'lucide-react';
import type { DiagnosticResult, Language } from '../types';
import { translations } from '../utils/translations';

interface HistoryTimelineProps {
  lang: Language;
  onSelectScan?: (scan: DiagnosticResult) => void;
  onCompareScan?: (scan: DiagnosticResult) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
  lang,
  onSelectScan,
  onCompareScan
}) => {
  const t = translations[lang] || translations.en;

  const [historyScans, setHistoryScans] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/v1/history/scans?limit=25');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setHistoryScans(data);
            return;
          }
        }
      } catch (err) {
        console.warn('History fetch error:', err);
      }

      // Fallback demo scans if backend offline
      setHistoryScans([
        {
          id: 'SC-9104',
          crop: 'Cotton',
          condition: 'Bacterial Blight (Karpa)',
          confidence: 0.94,
          severity: 'Early Signs (1-20%)',
          affected_percentage: 18.5,
          district: 'Field 01 - North Plot',
          image_url: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=300&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
          expert_verified: true
        },
        {
          id: 'SC-8842',
          crop: 'Rice',
          condition: 'Bacterial Leaf Blight (BLB)',
          confidence: 0.92,
          severity: 'Moderate (21-50%)',
          affected_percentage: 24.5,
          district: 'Field 02 - East Ridge',
          image_url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
          expert_verified: false
        },
        {
          id: 'SC-7921',
          crop: 'Tomato',
          condition: 'Early Blight (Target Spot)',
          confidence: 0.93,
          severity: 'Moderate (21-50%)',
          affected_percentage: 28.0,
          district: 'Field 03 - South Valley',
          image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a47a?w=300&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
          expert_verified: true
        },
        {
          id: 'SC-6540',
          crop: 'Potato',
          condition: 'Late Blight',
          confidence: 0.91,
          severity: 'Early Signs (1-20%)',
          affected_percentage: 19.5,
          district: 'Field 01 - North Plot',
          image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80',
          created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
          expert_verified: false
        }
      ]);
    };

    fetchHistory();
  }, []);

  const filtered = historyScans.filter((s) => {
    const matchesCrop = filterCrop === 'all' || s.crop.toLowerCase() === filterCrop.toLowerCase();
    const matchesSearch = !searchTerm || 
      s.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.id && s.id.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-1.5">
        <h2 className="text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
          <History className="w-6 h-6 text-emerald-400" />
          {t.tabHistory}
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          Search and review past foliar diagnostic records, severity scores, and treatment progression.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop, condition, scan ID..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">{t.allCrops}</option>
            <option value="Cotton">Cotton</option>
            <option value="Rice">Rice</option>
            <option value="Tomato">Tomato</option>
            <option value="Potato">Potato</option>
            <option value="Maize">Maize</option>
            <option value="Soybean">Soybean</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-panel p-8 text-center text-xs text-slate-400 rounded-3xl border border-slate-800">
            No historical scan records found matching the filter.
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onSelectScan && onSelectScan(item)}
              className="glass-panel rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                  <img
                    src={item.image_url}
                    alt="Scan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310B981"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>';
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      {item.id}
                    </span>
                    <h3 className="font-bold text-white text-base">
                      {item.crop} — {item.condition}
                    </h3>
                    {item.expert_verified && (
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Certified
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {item.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-amber-400" /> Severity: {item.severity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" /> {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.confidence}</span>
                  <span className="text-xl font-black text-emerald-400">
                    {((item.confidence || 0.9) * 100).toFixed(0)}%
                  </span>
                </div>

                {onCompareScan && (
                  <button
                    onClick={() => onCompareScan(item)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                    title="Compare this scan"
                  >
                    <GitCompare className="w-4 h-4 text-emerald-400" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
