import React, { useState } from 'react';
import { 
  MapPin, Plus, Filter, Layers, Camera
} from 'lucide-react';
import type { Field, Language } from '../types';
import { translations } from '../utils/translations';

interface FieldManagerProps {
  fields: Field[];
  activeFieldId: string;
  onSelectField: (fieldId: string) => void;
  onAddField: (newField: Omit<Field, 'id' | 'total_scans'>) => void;
  lang: Language;
  onStartScanForField: (field: Field) => void;
}

export const FieldManager: React.FC<FieldManagerProps> = ({
  fields,
  activeFieldId,
  onSelectField,
  onAddField,
  lang,
  onStartScanForField
}) => {
  const t = translations[lang] || translations.en;

  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // New Field Form State
  const [fieldName, setFieldName] = useState('');
  const [crop, setCrop] = useState('Cotton');
  const [location, setLocation] = useState('Yavatmal Sector 4');
  const [acreage, setAcreage] = useState('3.5');
  const [sowingDate, setSowingDate] = useState('2026-06-15');

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName) return;

    onAddField({
      name: fieldName,
      crop,
      location,
      coordinates: [19.8 + Math.random() * 0.5, 77.2 + Math.random() * 0.5],
      acreage: parseFloat(acreage) || 2.5,
      sowing_date: sowingDate,
      health_status: 'Healthy',
      risk_level: 'LOW',
      latest_scan: undefined
    });

    setFieldName('');
    setShowAddModal(false);
  };

  const filteredFields = fields.filter((f) => {
    if (filterCrop !== 'all' && f.crop.toLowerCase() !== filterCrop.toLowerCase()) return false;
    if (filterSeverity !== 'all') {
      if (filterSeverity === 'healthy' && f.health_status !== 'Healthy') return false;
      if (filterSeverity === 'at_risk' && f.health_status !== 'At Risk' && f.health_status !== 'Early Warning') return false;
    }
    return true;
  });

  const getStatusColor = (status: Field['health_status']) => {
    switch (status) {
      case 'Healthy':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Early Warning':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'At Risk':
      case 'Critical':
        return 'bg-red-950/80 text-red-300 border-red-500/40';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white font-['Outfit'] flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            {t.fieldsTitle}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            Manage multiple crop plots, monitor disease spread zones, and assign scans.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addNewField}</span>
        </button>
      </div>

      {/* 2. Filter & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filters:</span>
          </div>

          {/* Crop Filter */}
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">{t.allCrops}</option>
            <option value="Rice">Rice</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Potato">Potato</option>
            <option value="Maize">Maize</option>
            <option value="Soybean">Soybean</option>
          </select>

          {/* Severity Filter */}
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">{t.allSeverities}</option>
            <option value="healthy">Healthy Only</option>
            <option value="at_risk">At Risk / Warning</option>
          </select>
        </div>

        <div className="text-xs text-slate-400">
          Showing <strong>{filteredFields.length}</strong> of <strong>{fields.length}</strong> fields
        </div>
      </div>

      {/* 3. Field Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFields.map((field) => {
          const isSelected = field.id === activeFieldId;

          return (
            <div
              key={field.id}
              onClick={() => onSelectField(field.id)}
              className={`glass-panel p-5 rounded-3xl border transition-all cursor-pointer space-y-4 relative ${
                isSelected
                  ? 'border-emerald-400 bg-slate-900/90 shadow-xl shadow-emerald-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">
                    {field.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{field.location}</span>
                  </p>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(field.health_status)}`}>
                  {field.health_status}
                </span>
              </div>

              {/* Stats Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Crop</span>
                  <span className="text-white font-bold">{field.crop}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Acreage</span>
                  <span className="text-white font-bold">{field.acreage} Acres</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Sowing Date</span>
                  <span className="text-slate-300">{field.sowing_date}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Total Scans</span>
                  <span className="text-emerald-400 font-bold">{field.total_scans}</span>
                </div>
              </div>

              {/* Latest Scan Snippet */}
              {field.latest_scan ? (
                <div className="p-2.5 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 block font-semibold">Latest Scan:</span>
                    <span className="font-semibold text-white">{field.latest_scan.condition}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {field.latest_scan.affected_percentage}%
                  </span>
                </div>
              ) : (
                <div className="p-2.5 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-500 italic text-center">
                  No scan recorded yet for this plot
                </div>
              )}

              {/* Quick Scan for Field Button */}
              <div className="pt-1 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartScanForField(field);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Crop for this Field</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Interactive Field Health Map Simulation */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              {t.fieldHealthMap}
            </h3>
            <p className="text-xs text-slate-400">
              Geographical distribution of active fields and disease hotspot zones.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Healthy</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-300">Early Signs</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-slate-300">Affected</span>
            </span>
          </div>
        </div>

        {/* Map Canvas Box */}
        <div className="relative w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
          {/* Stylized Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40" />

          {/* Field Marker Pins */}
          {fields.map((field, idx) => {
            const isAtRisk = field.health_status === 'At Risk' || field.health_status === 'Early Warning';
            const leftPct = 20 + (idx * 28) % 65;
            const topPct = 25 + (idx * 32) % 55;

            return (
              <div
                key={field.id}
                onClick={() => onSelectField(field.id)}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              >
                <div className={`p-2 rounded-2xl border flex items-center gap-2 shadow-2xl transition-transform transform group-hover:scale-110 ${
                  isAtRisk
                    ? 'bg-red-950/90 border-red-500/60 text-red-300'
                    : 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300'
                }`}>
                  <MapPin className="w-4 h-4 shrink-0" />
                  <div className="text-left whitespace-nowrap">
                    <span className="text-xs font-bold block">{field.name}</span>
                    <span className="text-[10px] text-slate-400">{field.crop} • {field.health_status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Add Field Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-emerald-500/40 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              {t.addNewField}
            </h3>

            <form onSubmit={handleCreateField} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {t.fieldName}
                </label>
                <input
                  type="text"
                  required
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g. Field 04 - River Valley"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Primary Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Cotton">Cotton</option>
                    <option value="Rice">Rice</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                    <option value="Maize">Maize</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Onion">Onion</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {t.fieldAcreage}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    placeholder="3.5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {t.fieldLocation}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pusad Taluka, Yavatmal"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {t.fieldSowingDate}
                </label>
                <input
                  type="date"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  {t.saveField}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
