import React, { useState, useEffect } from 'react';
import { History, Calendar, MapPin, Activity, ShieldCheck } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface HistoryTimelineProps {
  lang: Language;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ lang }) => {
  const t = translations[lang];

  const [historyScans, setHistoryScans] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/v1/history/scans?limit=25');
        if (res.ok) {
          const data = await res.json();
          setHistoryScans(data);
        }
      } catch (err) {
        console.warn('History fetch error:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div className="glass-panel-glow rounded-2xl p-5 md:p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <History className="w-3.5 h-3.5" /> LONGITUDINAL CROP HEALTH
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {t.tabHistory}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Track individual plot diagnostics, treatment progression, and recovery history
        </p>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {historyScans.map((item, idx) => (
          <div
            key={item.id || idx}
            className="glass-panel rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 hover:border-emerald-500/40 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
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
                  <h3 className="font-bold text-white text-base">
                    {item.crop} — {item.condition}
                  </h3>
                  {item.expert_verified && (
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Level 4
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

            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Confidence</span>
              <span className="text-xl font-black text-emerald-400">
                {(item.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
