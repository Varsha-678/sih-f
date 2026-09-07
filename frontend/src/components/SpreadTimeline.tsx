import React from 'react';
import { 
  TrendingUp, Activity
} from 'lucide-react';
import type { SpreadTimelinePoint, Language, DiagnosticResult } from '../types';
import { translations } from '../utils/translations';

interface SpreadTimelineProps {
  lang: Language;
  currentResult?: DiagnosticResult | null;
}

export const SpreadTimeline: React.FC<SpreadTimelineProps> = ({
  lang,
  currentResult
}) => {
  const t = translations[lang] || translations.en;

  // Demo timeline points simulating disease progression across 15 days
  const basePoints: SpreadTimelinePoint[] = [
    {
      day_label: t.timelineDay1,
      date: 'Aug 20, 2026',
      affected_percentage: 4.2,
      severity_category: 'Early Signs',
      confidence: 0.94,
      notes: 'Initial microscopic necrotic specks noted on lower leaf margins.',
    },
    {
      day_label: t.timelineDay5,
      date: 'Aug 25, 2026',
      affected_percentage: 12.8,
      severity_category: 'Early Signs',
      confidence: 0.93,
      notes: 'Water-soaked translucent lesions coalescing along primary veins.',
    },
    {
      day_label: t.timelineDay10,
      date: 'Aug 30, 2026',
      affected_percentage: 23.5,
      severity_category: 'Moderate',
      confidence: 0.91,
      notes: 'Lesions darkening to reddish-brown; yellow chlorotic halos visible.',
    },
    {
      day_label: t.timelineDay15,
      date: 'Sep 04, 2026',
      affected_percentage: currentResult?.severity?.affected_percentage || 31.0,
      severity_category: currentResult?.severity?.severity_category || 'Moderate',
      confidence: currentResult?.confidence || 0.92,
      notes: 'Foliar surface necrosis stabilizing following bio-control application.',
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-1.5">
        <h2 className="text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          {t.spreadTitle}
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          {t.spreadSubtitle}
        </p>
      </div>

      {/* Visual Spread Graph / Progress Chart */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/30 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Foliar Affected Area Progression (%)
          </h3>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
            15-Day Track
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="h-56 flex items-end justify-between gap-4 pt-8 pb-4 border-b border-slate-800 px-4">
          {basePoints.map((pt, idx) => {
            const heightPct = Math.min(100, Math.max(10, pt.affected_percentage * 2.5));

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {pt.affected_percentage}%
                </span>
                <div className="w-full max-w-[50px] bg-slate-900 rounded-t-xl overflow-hidden p-0.5 border border-slate-700/60 h-full flex items-end">
                  <div
                    className="w-full rounded-t-lg transition-all duration-700 bg-gradient-to-t from-emerald-600 via-teal-500 to-amber-500"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                  {pt.day_label.split(' ')[0]} {pt.day_label.split(' ')[1]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Timeline Event Cards */}
        <div className="space-y-3 pt-2">
          {basePoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 font-['Outfit']">
                    {pt.day_label}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({pt.date})
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                    {pt.severity_category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pt.notes}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Affected Area</span>
                  <span className="text-sm font-mono font-black text-amber-400">{pt.affected_percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
