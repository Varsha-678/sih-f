import React, { useState } from 'react';
import { 
  Activity, ShieldCheck, AlertTriangle, TrendingUp, 
  MapPin, Layers, Sparkles,
  CheckCircle2, ArrowUpRight, BarChart3, PieChart
} from 'lucide-react';
import type { Language, Field } from '../types';

interface CropHealthDashboardProps {
  lang: Language;
  fields: Field[];
  onNavigateTab: (tab: any) => void;
  onSelectFieldForScan?: (field: Field) => void;
}

export const CropHealthDashboard: React.FC<CropHealthDashboardProps> = ({
  fields,
  onNavigateTab,
  onSelectFieldForScan
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Compute Aggregates
  const totalFields = fields.length;
  const totalAcreage = fields.reduce((acc, f) => acc + f.acreage, 0);
  const healthyFieldsCount = fields.filter((f) => f.health_status === 'Healthy').length;
  const warningFieldsCount = fields.filter((f) => f.health_status === 'Early Warning').length;
  const atRiskFieldsCount = fields.filter((f) => f.health_status === 'At Risk' || f.health_status === 'Critical').length;

  // Average AI Crop Health Score
  const avgHealthScore = 84.5;
  const healthScoreStatus = avgHealthScore >= 80 ? 'Optimal' : avgHealthScore >= 65 ? 'Fair' : 'At Risk';

  // 30-Day Foliar Health Trend Data Points
  const healthTrendData = [
    { day: 'Day 1', score: 72, risk: 28 },
    { day: 'Day 5', score: 75, risk: 25 },
    { day: 'Day 10', score: 79, risk: 21 },
    { day: 'Day 15', score: 81, risk: 19 },
    { day: 'Day 20', score: 86, risk: 14 },
    { day: 'Day 25', score: 83, risk: 17 },
    { day: 'Day 30', score: 85, risk: 15 },
  ];

  // Disease Occurrence Frequency
  const diseaseOccurrences = [
    { name: 'Early Blight (Tomato/Potato)', count: 18, percentage: 32, color: '#10b981', crop: 'Solanaceae' },
    { name: 'Bacterial Blight / Karpa (Cotton)', count: 14, percentage: 25, color: '#06b6d4', crop: 'Cotton' },
    { name: 'Soybean Rust / Tamba', count: 11, percentage: 20, color: '#f59e0b', crop: 'Soybean' },
    { name: 'Purple Blotch (Onion)', count: 8, percentage: 14, color: '#8b5cf6', crop: 'Onion' },
    { name: 'Red Rot (Sugarcane)', count: 5, percentage: 9, color: '#ef4444', crop: 'Sugarcane' },
  ];

  // Severity Distribution
  const severityBreakdown = [
    { label: 'Healthy Foliage', count: 62, percentage: 55, color: '#10b981' },
    { label: 'Early Symptoms (1-20%)', count: 28, percentage: 25, color: '#34d399' },
    { label: 'Moderate Lesions (21-50%)', count: 16, percentage: 14, color: '#f59e0b' },
    { label: 'Severe / Necrotic (51%+)', count: 6, percentage: 6, color: '#ef4444' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Farm-Wide Crop Health Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
            Crop Health & Disease Intelligence Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
            Continuous foliar health scoring, early symptom trajectory, multi-field risk assessment, and computer-vision disease intelligence.
          </p>
        </div>

        {/* Global Action & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                timeRange === '7d' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                timeRange === '30d' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                timeRange === '90d' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Season
            </button>
          </div>

          <button
            onClick={() => onNavigateTab('detect')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze New Crop</span>
          </button>
        </div>
      </div>

      {/* 2. Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Health Score */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Overall Crop Health
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-white font-['Outfit']">
              {avgHealthScore}
            </span>
            <span className="text-slate-400 text-xs font-bold">/ 100</span>
            <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              {healthScoreStatus}
            </span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full"
              style={{ width: `${avgHealthScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            AI-estimated crop health score across {totalFields} fields ({totalAcreage.toFixed(1)} acres).
          </p>
        </div>

        {/* KPI 2: Active Disease Risk */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Disease Risk Level
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black text-amber-300 font-['Outfit']">
              Watch Closely
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            High humidity (82%) creates favorable fungal sporulation conditions in 1 field.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-emerald-400 font-bold">{healthyFieldsCount} Low</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold">{warningFieldsCount} Watch</span>
            <span className="text-slate-600">•</span>
            <span className="text-red-400 font-bold">{atRiskFieldsCount} High</span>
          </div>
        </div>

        {/* KPI 3: Monitored Fields & Plots */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fields Monitored
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-white font-['Outfit']">
              {totalFields}
            </span>
            <span className="text-slate-400 text-xs font-semibold">Active Plots</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Covering Cotton, Rice, Tomato, Soybean, Onion across Vidarbha/Marathwada.
          </p>
          <button
            onClick={() => onNavigateTab('fields')}
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Manage Field Maps</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* KPI 4: Total Scans & Model Health */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Diagnostic Scans
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-white font-['Outfit']">
              112
            </span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 94.2% Conf
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Last foliar scan: Today (Cotton - Healthy Leaf, 96% confidence).
          </p>
          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View Scan History</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Interactive Health & Risk Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Foliar Health Score Curve over Time */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Crop Health Score & Risk Trajectory</span>
              </h3>
              <p className="text-xs text-slate-400">
                Multi-point foliar health scoring curve compared against disease pressure index.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Health Score (0-100)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Disease Risk Index
              </span>
            </div>
          </div>

          {/* SVG Visual Health Chart */}
          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Health Score Area & Path (Values: 72, 75, 79, 81, 86, 83, 85) */}
              <path
                d="M 0 100 L 100 90 L 200 70 L 300 60 L 400 35 L 500 48 L 600 42 L 600 200 L 0 200 Z"
                fill="url(#healthGrad)"
              />
              <path
                d="M 0 100 L 100 90 L 200 70 L 300 60 L 400 35 L 500 48 L 600 42"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Risk Path (Values: 28, 25, 21, 19, 14, 17, 15) */}
              <path
                d="M 0 155 L 100 160 L 200 168 L 300 172 L 400 180 L 500 175 L 600 178"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />

              {/* Data points */}
              {[
                { cx: 0, cy: 100, val: 72 },
                { cx: 100, cy: 90, val: 75 },
                { cx: 200, cy: 70, val: 79 },
                { cx: 300, cy: 60, val: 81 },
                { cx: 400, cy: 35, val: 86 },
                { cx: 500, cy: 48, val: 83 },
                { cx: 600, cy: 42, val: 85 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.cx} cy={pt.cy} r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
                  <text x={pt.cx} y={pt.cy - 10} fill="#f1f5f9" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {pt.val}
                  </text>
                </g>
              ))}
            </svg>

            {/* Bottom X-Axis labels */}
            <div className="flex justify-between text-[11px] text-slate-500 font-semibold pt-2">
              {healthTrendData.map((d, i) => (
                <span key={i}>{d.day}</span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>
              <strong>Diagnostic Summary:</strong> Foliar recovery observed (+13 pts) following recommended IPM treatment.
            </span>
            <button
              onClick={() => onNavigateTab('compare')}
              className="text-emerald-400 hover:text-emerald-300 font-bold shrink-0 ml-3 cursor-pointer"
            >
              Compare Scans →
            </button>
          </div>
        </div>

        {/* Chart 2: Disease Occurrence Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
              <PieChart className="w-4 h-4 text-teal-400" />
              <span>Disease Occurrence</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              Season Total
            </span>
          </div>

          <div className="space-y-3">
            {diseaseOccurrences.map((dis, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold truncate max-w-[180px]">
                    {dis.name}
                  </span>
                  <span className="font-mono text-slate-400 font-bold">
                    {dis.percentage}% ({dis.count})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${dis.percentage}%`,
                      backgroundColor: dis.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => onNavigateTab('library')}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Disease Library & Prevention</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Foliar Severity Distribution & Field Health Overview Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Severity Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Foliar Severity Breakdown</span>
          </h3>
          <p className="text-xs text-slate-400">
            Segmentation of scanned leaf tissue by estimated affected lesion area percentage.
          </p>

          <div className="space-y-3 pt-2">
            {severityBreakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-200 font-medium">{item.label}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-white font-bold">{item.count}</span>
                  <span className="text-slate-500 ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field-by-Field Status Matrix */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit']">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Monitored Field Health Matrix</span>
              </h3>
              <p className="text-xs text-slate-400">
                Current health scores, latest diagnosis, and risk status per cultivated plot.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('fields')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>All Fields</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Field Name</th>
                  <th className="py-2.5 px-3">Crop</th>
                  <th className="py-2.5 px-3">Acreage</th>
                  <th className="py-2.5 px-3">Health Status</th>
                  <th className="py-2.5 px-3">Latest Scan</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {fields.map((field) => {
                  const isHealthy = field.health_status === 'Healthy';
                  const isWatch = field.health_status === 'Early Warning';
                  return (
                    <tr key={field.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3 px-3 font-bold text-white">
                        {field.name}
                        <span className="block text-[10px] text-slate-400 font-normal">
                          {field.location}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-300">
                        {field.crop}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {field.acreage} ac
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isHealthy 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' 
                            : isWatch 
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40' 
                            : 'bg-red-950 text-red-300 border-red-500/40'
                        }`}>
                          {field.health_status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {field.latest_scan ? (
                          <div>
                            <span className="font-medium text-slate-200 block truncate max-w-[150px]">
                              {field.latest_scan.condition}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {field.latest_scan.date} • {field.latest_scan.affected_percentage}% lesion
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">No scans yet</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            if (onSelectFieldForScan) {
                              onSelectFieldForScan(field);
                            } else {
                              onNavigateTab('detect');
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition cursor-pointer"
                        >
                          Scan Field
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
