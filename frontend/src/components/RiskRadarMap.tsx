import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Droplets, 
  Bug, MapPin, Search, Compass, AlertTriangle, Activity
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

  const fallbackHotspots: DistrictHotspot[] = [
    {
      district: 'Yavatmal',
      region: 'Vidarbha',
      coordinates: [20.38, 78.12],
      primary_crop: 'Cotton',
      secondary_crop: 'Soybean',
      temperature_c: 32.5,
      relative_humidity: 82.0,
      rainfall_mm: 18.4,
      forecast_rain_prob: 75.0,
      pest_trap_density: 16.4,
      active_outbreak: 'Pink Bollworm & Bacterial Blight',
      soil_moisture: 72.0,
      crop_stage: 'Flowering & Boll Formation',
      risk_score: 78,
      risk_level: 'HIGH',
      level_color: '#EF4444',
      breakdown: {
        weather_index: 82,
        stage_vulnerability: 85,
        trap_density_index: 76,
        cluster_proximity_index: 68
      },
      advisory: {
        en: 'High humidity (>80%) and intermittent rain create prime conditions for bacterial blight sporulation. Inspect cotton bolls and bottom leaves.',
        ta: 'அதிக ஈரப்பதம் (>80%) மற்றும் மழை காரணமாக பாக்டீரியா இலைக்கருகல் பரவும் அபாயம் உள்ளது. பருத்தி காய்கள் மற்றும் கீழ் இலைகளை உன்னிப்பாக கண்காணிக்கவும்.',
        mr: '८०% पेक्षा जास्त आर्द्रता आणि पावसाळी वातावरणामुळे करपा रोगाचा धोका वाढला आहे. बोंडे व खालच्या पानांची पाहणी करा.',
        hi: '80% से अधिक आर्द्रता और बारिश से जीवाणु झुलसा रोग का खतरा बढ़ गया है। पत्तियों और गूलरों की जांच करें।'
      }
    },
    {
      district: 'Latur',
      region: 'Marathwada',
      coordinates: [18.40, 76.58],
      primary_crop: 'Soybean',
      secondary_crop: 'Pigeonpea',
      temperature_c: 30.0,
      relative_humidity: 78.0,
      rainfall_mm: 12.0,
      forecast_rain_prob: 60.0,
      pest_trap_density: 8.5,
      active_outbreak: 'Soybean Rust Alert',
      soil_moisture: 65.0,
      crop_stage: 'Pod Development',
      risk_score: 64,
      risk_level: 'WATCH',
      level_color: '#F59E0B',
      breakdown: {
        weather_index: 65,
        stage_vulnerability: 70,
        trap_density_index: 58,
        cluster_proximity_index: 62
      },
      advisory: {
        en: 'Elevated rust vulnerability in low-lying soybean plots. Spray preventive bio-fungicide if pustules detected.',
        ta: 'சோயாபீன் பயிரில் துரு நோய் தாக்கும் அபாயம் உள்ளது. கொப்புளங்கள் தென்பட்டால் உயிர் பூஞ்சாணக் கொல்லி தெளிக்கவும்.',
        mr: 'सोयाबीनमध्ये तांबेरा रोगाचा मध्यम धोका आहे. पानाच्या खाली तांबूस डाग दिसल्यास तातडीने फवारणी करा.',
        hi: 'सोयाबीन में गेरुई (रस्ट) रोग की मध्यम संभावना है। लक्षण दिखते ही जैविक कवकनाशी का प्रयोग करें।'
      }
    },
    {
      district: 'Kolhapur',
      region: 'Western',
      coordinates: [16.70, 74.24],
      primary_crop: 'Sugarcane',
      secondary_crop: 'Rice',
      temperature_c: 28.5,
      relative_humidity: 88.0,
      rainfall_mm: 24.0,
      forecast_rain_prob: 85.0,
      pest_trap_density: 4.2,
      active_outbreak: 'Red Rot Alert',
      soil_moisture: 85.0,
      crop_stage: 'Grand Growth',
      risk_score: 55,
      risk_level: 'WATCH',
      level_color: '#F59E0B',
      breakdown: {
        weather_index: 68,
        stage_vulnerability: 50,
        trap_density_index: 45,
        cluster_proximity_index: 52
      },
      advisory: {
        en: 'Ensure proper drainage channels in cane fields to prevent root water-logging and red rot progression.',
        ta: 'கரும்பு வயல்களில் நீர் தேங்காமல் இருக்க முறையான வடிகால் அமைக்கவும்.',
        mr: 'उसाच्या शेतात पाण्याचा निचरा व्यवस्थित ठेवा जेणेकरून तांबेरा किंवा कुजवा रोग टाळता येईल.',
        hi: 'गन्ने के खेतों में जल निकासी की व्यवस्था करें ताकि लाल सड़न रोग न फैले।'
      }
    },
    {
      district: 'Nashik',
      region: 'North',
      coordinates: [19.99, 73.78],
      primary_crop: 'Onion',
      secondary_crop: 'Tomato',
      temperature_c: 29.0,
      relative_humidity: 62.0,
      rainfall_mm: 4.0,
      forecast_rain_prob: 30.0,
      pest_trap_density: 3.1,
      active_outbreak: 'Purple Blotch Watch',
      soil_moisture: 52.0,
      crop_stage: 'Bulb Formation',
      risk_score: 32,
      risk_level: 'LOW',
      level_color: '#10B981',
      breakdown: {
        weather_index: 30,
        stage_vulnerability: 35,
        trap_density_index: 32,
        cluster_proximity_index: 28
      },
      advisory: {
        en: 'Favorable dry weather. Maintain standard irrigation and routine field scouting.',
        ta: 'சாதகமான வறண்ட வானிலை. வழக்கமான பாசனம் மற்றும் வயல் கண்காணிப்பை தொடரவும்.',
        mr: 'हवामान कोरडे व अनुकूल आहे. नेहमीप्रमाणे पाणी व्यवस्थापन आणि पाहणी चालू ठेवा.',
        hi: 'मौसम अनुकूल है। सामान्य सिंचाई और नियमित निगरानी जारी रखें।'
      }
    }
  ];

  // Fetch Maharashtra Hotspot risk vectors from FastAPI backend
  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        const res = await fetch('/api/v1/risk/maharashtra');
        if (res.ok) {
          const data = await res.json();
          if (data && data.hotspots && data.hotspots.length > 0) {
            setHotspots(data.hotspots);
            setSelectedDistrict(data.hotspots[0]);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend risk endpoint unavailable. Using local agro-climatic fallback telemetry.', err);
      }

      setHotspots(fallbackHotspots);
      setSelectedDistrict(fallbackHotspots[0]);
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
    if (level === 'MEDIUM' || level === 'WATCH') return 'bg-amber-950/80 text-amber-400 border-amber-500/40 shadow-amber-500/10';
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Header & Summary Stats */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-emerald-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> EARLY WARNING RISK DASHBOARD
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-['Outfit']">
              {t.riskTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              {t.riskSubtitle}
            </p>
          </div>

          {/* Aggregate Risk Indicators */}
          <div className="grid grid-cols-3 gap-3 self-start md:self-auto">
            <div className="bg-red-950/40 border border-red-500/30 px-3.5 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-red-400 block">{t.riskHigh}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'HIGH').length}
              </span>
            </div>
            <div className="bg-amber-950/40 border border-amber-500/30 px-3.5 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">{t.riskWatch}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'WATCH').length}
              </span>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">{t.riskLow}</span>
              <span className="text-xl font-black text-white">
                {hotspots.filter(h => h.risk_level === 'LOW').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & District Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search District or Crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {['ALL', 'VIDARBHA', 'MARATHWADA', 'WESTERN', 'NORTH'].map((reg) => (
            <button
              key={reg}
              onClick={() => setFilterRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
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
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                selectedDistrict?.district === district.district
                  ? 'bg-slate-900/90 border-emerald-500 shadow-md shadow-emerald-500/10 scale-[1.01]'
                  : 'glass-panel hover:bg-slate-900/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm md:text-base font-['Outfit']">
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

                <div className={`px-2.5 py-1 rounded-xl border text-right ${getRiskBadgeColor(district.risk_level)}`}>
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
                  <Droplets className="w-3 h-3 text-blue-400" /> {district.relative_humidity}% RH
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
          <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 space-y-5 border border-emerald-500/30">
            {/* Header Info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Environmental Risk Breakdown
                </span>
                <h3 className="text-2xl font-black text-white mt-1 font-['Outfit']">
                  {selectedDistrict.district} <span className="text-slate-400 text-sm font-normal">({selectedDistrict.region})</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Primary Crop: <strong className="text-emerald-300">{selectedDistrict.primary_crop}</strong> | Stage: <strong>{selectedDistrict.crop_stage}</strong>
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl border text-center ${getRiskBadgeColor(selectedDistrict.risk_level)}`}>
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
                Transparent Multi-Factor Risk Assessment
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Weather Proliferation Index (35%) */}
                <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
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
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
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
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
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
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
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

            {/* Multilingual Preemptive Risk Advisory */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                Preemptive Agro-Climatic Advisory
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
