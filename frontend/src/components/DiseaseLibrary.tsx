import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, AlertTriangle, 
  Leaf, Thermometer, Droplets, Calendar,
  GitCompare, ChevronRight, X, PhoneCall
} from 'lucide-react';
import type { Language, DiseaseLibraryItem } from '../types';

interface DiseaseLibraryProps {
  lang: Language;
  onNavigateToScan?: (crop?: string) => void;
}

export const DISEASE_KNOWLEDGE_BASE: DiseaseLibraryItem[] = [
  {
    id: 'early-blight-tomato',
    name: 'Early Blight (Target Spot)',
    scientific_name: 'Alternaria solani',
    vernacular_names: {
      hi: 'अगेती झुलसा (टमाटर / आलू)',
      mr: 'लवकर येणारा करपा (टोमॅटो / बटाटा)',
      ta: 'ஆரம்ப கருகல் நோய்'
    },
    category: 'Fungal',
    crops: ['Tomato', 'Potato', 'Eggplant'],
    early_symptoms: 'Small, dark brown to black spots appearing first on older lower leaves, often surrounded by a narrow chlorotic (yellow) halo.',
    advanced_signs: 'Concentric rings create a characteristic "bulls-eye" or target pattern. Severe foliar blight leads to defoliation, sunburn on fruit, and collar rot at stem bases.',
    progression: [
      { stage: 'Initial Infection', days: 'Day 1-3', description: 'Microscopic conidia penetrate stomata or foliar wounds under warm moist conditions.' },
      { stage: 'Target Lesions', days: 'Day 4-7', description: 'Circular brown lesions expand to 3-10mm with distinct concentric rings and yellow halo.' },
      { stage: 'Canopy Defoliation', days: 'Day 8-15', description: 'Lower foliage dies and falls off, exposing fruit to sunscald; stem lesions develop.' },
      { stage: 'Yield Loss Stage', days: 'Day 16+', description: 'Total vegetative collapse and dark sunken leathery rot on stem-end of fruits.' }
    ],
    environmental_risk: {
      temp_optimal: '24°C – 29°C (75°F – 84°F)',
      humidity_threshold: 'Relative humidity > 80% with frequent leaf wetness',
      rainfall_trigger: 'Intermittent rain showers followed by warm sunshine',
      risk_summary: 'Elevated fungal risk during high humidity and dew periods with older vegetative canopy.'
    },
    prevention: {
      cultural: 'Rotate with non-solanaceous crops for 3 years; stake plants; prune bottom 12 inches of foliage; drip irrigate to avoid wetting leaves.',
      organic: 'Apply Trichoderma harzianum or Bacillus subtilis bio-fungicide preventative spray @ 5g/L; neem oil 0.5%.',
      chemical: 'Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L at first appearance of lower leaf spots.',
      safety_disclaimer: 'AI guidance is informational. Confirm condition and treatment approach with a local certified agronomist.'
    },
    monitoring_tips: 'Scout lowest leaves weekly starting 3 weeks after transplanting, especially after heavy morning dew.',
    similar_conditions: [
      {
        condition_name: 'Septoria Leaf Spot (Septoria lycopersici)',
        scientific_name: 'Septoria lycopersici',
        distinguishing_features: 'Numerous smaller (1-3mm) circular spots with grayish-white centers and dark brown borders with tiny black pycnidia speckles inside.',
        key_difference: 'Lacks concentric rings; spots are much smaller and more numerous than Early Blight target spots.',
        risk_level: 'Moderate'
      },
      {
        condition_name: 'Bacterial Spot (Xanthomonas perforans)',
        scientific_name: 'Xanthomonas perforans',
        distinguishing_features: 'Water-soaked angular spots (1-3mm) that turn dark brown to black and tear in centers (shot-hole appearance).',
        key_difference: 'Bacterial nature creates greasy water-soaked margins; no concentric target rings.',
        risk_level: 'High'
      },
      {
        condition_name: 'Late Blight (Phytophthora infestans)',
        scientific_name: 'Phytophthora infestans',
        distinguishing_features: 'Large, irregular water-soaked pale green to dark lesions rapidly turning dark purplish-brown, with white downy fungal mold on leaf undersides.',
        key_difference: 'Fast spreading in cool wet weather (15-20°C); Early Blight prefers warmer temps (24-29°C) and shows dry concentric rings.',
        risk_level: 'Critical'
      }
    ]
  },
  {
    id: 'bacterial-blight-cotton',
    name: 'Bacterial Blight / Angular Leaf Spot (Karpa)',
    scientific_name: 'Xanthomonas citri pv. malvacearum',
    vernacular_names: {
      hi: 'कपास का जीवाणु झुलसा (कोणीय धब्बा)',
      mr: 'कपाशीवरील जिवाणूजन्य करपा / काळे डाग',
      ta: 'பருத்தி பாக்டீரியா கருகல் நோய்'
    },
    category: 'Bacterial',
    crops: ['Cotton'],
    early_symptoms: 'Small, angular, water-soaked translucent lesions on lower leaf surfaces bounded strictly by leaf veinlets.',
    advanced_signs: 'Lesions turn dark reddish-brown to black (Angular Leaf Spot), extend along main veins (Vein Blight), cause girdling black lesions on branches (Blackarm), and greasy water-soaked round spots on bolls.',
    progression: [
      { stage: 'Seedling / Early Foliar', days: 'Day 1-4', description: 'Water-soaked angular spots appear on underside of cotyledons and early leaves.' },
      { stage: 'Angular Expansion', days: 'Day 5-9', description: 'Spots turn necrotic brown-black, restricted into angular shapes between veins.' },
      { stage: 'Blackarm & Vein Blight', days: 'Day 10-15', description: 'Bacteria travel into petiole and main stems, creating black sunken girdling lesions.' },
      { stage: 'Boll Rot Infection', days: 'Day 16+', description: 'Direct infection of developing bolls resulting in stained fiber and premature opening.' }
    ],
    environmental_risk: {
      temp_optimal: '28°C – 34°C with high relative humidity',
      humidity_threshold: 'Relative humidity > 85%',
      rainfall_trigger: 'Heavy wind-driven monsoon rains (splashes transmit bacteria rapidly)',
      risk_summary: 'Extreme risk following driving monsoon rains and humid warm spells in black cotton soil.'
    },
    prevention: {
      cultural: 'Acid-delint seed before sowing; destroy cotton crop residues; ensure deep summer plowing and good field drainage.',
      organic: 'Pseudomonas fluorescens @ 10g/kg seed treatment and 0.2% foliar spray.',
      chemical: 'Copper Oxychloride 50% WP @ 2.5g/L + Streptocycline 100ppm (1g in 10L water) preventive spray.',
      safety_disclaimer: 'AI guidance is informational. Never apply chemicals without personal protective equipment.'
    },
    monitoring_tips: 'Inspect leaf undersides against bright sunlight after rain showers for water-soaked angular corners.',
    similar_conditions: [
      {
        condition_name: 'Cercospora Leaf Spot (Cercospora gossypina)',
        scientific_name: 'Cercospora gossypina',
        distinguishing_features: 'Circular reddish-purple to brown spots with distinct white or ash-colored center, not strictly bounded by veins.',
        key_difference: 'Fungal circular spots with ash-gray center, unlike water-soaked angular bacterial lesions.',
        risk_level: 'Moderate'
      },
      {
        condition_name: 'Alternaria Macrospora Blight',
        scientific_name: 'Alternaria macrospora',
        distinguishing_features: 'Brown circular spots with concentric rings and purple margins on older leaves.',
        key_difference: 'Presence of concentric target rings and lack of angular vein boundaries.',
        risk_level: 'Moderate'
      }
    ]
  },
  {
    id: 'bacterial-leaf-blight-rice',
    name: 'Bacterial Leaf Blight (BLB)',
    scientific_name: 'Xanthomonas oryzae pv. oryzae',
    vernacular_names: {
      hi: 'धान का झुलसा रोग (बीएलबी)',
      mr: 'भातावरील जिवाणूजन्य करपा',
      ta: 'நெல் பாக்டீரியா இலை கருகல்'
    },
    category: 'Bacterial',
    crops: ['Rice / Paddy'],
    early_symptoms: 'Water-soaked translucent to yellowish-green stripes on leaf margins near the tips.',
    advanced_signs: 'Stripes enlarge rapidly along margins with wavy edges, turning straw-yellow and eventually grayish-white. Milky bacterial ooze beads appear in early morning dew.',
    progression: [
      { stage: 'Marginal Water-Soaking', days: 'Day 1-4', description: 'Lesions initiate at margins of leaf tip where water guttation droplets form.' },
      { stage: 'Wavy Stripe Blight', days: 'Day 5-10', description: 'Yellow-orange wavy stripes advance downward along leaf blade.' },
      { stage: 'Kresek / Systemic Wilt', days: 'Day 11-18', description: 'In young plants, systemic vascular blockage causes sudden rolling and complete wilting.' },
      { stage: 'Bleached Foliage', days: 'Day 19+', description: 'Entire leaf canopy turns bleached white-gray with poor grain filling.' }
    ],
    environmental_risk: {
      temp_optimal: '25°C – 34°C with strong gusty winds',
      humidity_threshold: 'Relative humidity > 90%',
      rainfall_trigger: 'Tropical rainstorms and typhoons that cause leaf abrasions',
      risk_summary: 'Severe risk during tillering and heading stages under high nitrogen fertilization and rain.'
    },
    prevention: {
      cultural: 'Avoid excess nitrogen fertilizer (split applications); maintain field sanitation; drain stagnant field water for 3-4 days.',
      organic: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg; spray fresh cow dung extract (20%) or neem cake aqueous extract.',
      chemical: 'Copper Hydroxide 77% WP @ 2g/L or Streptocycline 150ppm as preventative foliar spray.',
      safety_disclaimer: 'Always verify disease identification through agronomist diagnosis before treatment.'
    },
    monitoring_tips: 'Walk field dikes at sunrise to observe morning bacterial exudate droplets along leaf edges.',
    similar_conditions: [
      {
        condition_name: 'Rice Blast (Magnaporthe oryzae)',
        scientific_name: 'Magnaporthe oryzae',
        distinguishing_features: 'Spindle/diamond/eye-shaped lesions with pointed ends, gray center, and reddish-brown borders on leaf blades.',
        key_difference: 'Blast forms diamond-shaped lesions in center of leaf; BLB forms wavy yellow stripes along leaf edges.',
        risk_level: 'High'
      },
      {
        condition_name: 'Brown Spot (Bipolaris oryzae)',
        scientific_name: 'Bipolaris oryzae',
        distinguishing_features: 'Small, oval, dark brown spots with a distinct yellow halo evenly distributed across the leaf blade.',
        key_difference: 'Brown Spot forms isolated oval spots on nutrient-deficient plants, not continuous marginal stripes.',
        risk_level: 'Moderate'
      }
    ]
  },
  {
    id: 'soybean-rust',
    name: 'Soybean Rust (Asian Rust)',
    scientific_name: 'Phakopsora pachyrhizi',
    vernacular_names: {
      hi: 'सोयाबीन का गेरुई / रस्ट रोग',
      mr: 'सोयाबीनवरील तांबेरा रोग',
      ta: 'சோயாபீன் துரு நோய்'
    },
    category: 'Fungal',
    crops: ['Soybean'],
    early_symptoms: 'Pinpoint chlorotic spots on upper leaf surface corresponding to tiny raised volcano-like pustules (uredinia) on lower surface.',
    advanced_signs: 'Pustules turn reddish-brown to dark brown; mass production of powdery urediniospores. Leaves rapidly turn yellow, bronze, and drop prematurely, devastating pod filling.',
    progression: [
      { stage: 'Micro Pustules', days: 'Day 1-4', description: 'Pustules erupt on lower canopy leaves; easily missed without hand lens.' },
      { stage: 'Spore Eruption', days: 'Day 5-9', description: 'Reddish-brown pustules rupture, spreading billions of airborne spores across the field.' },
      { stage: 'Canopy Bronzing', days: 'Day 10-15', description: 'Middle and upper leaves turn yellowish-bronze and drop rapidly.' },
      { stage: 'Severe Defoliation', days: 'Day 16+', description: 'Plant loses >80% leaves before seed maturity, causing 60-80% yield reduction.' }
    ],
    environmental_risk: {
      temp_optimal: '18°C – 28°C (cooler than bacterial blights)',
      humidity_threshold: 'Extended leaf wetness > 6-8 continuous hours',
      rainfall_trigger: 'Prolonged cloudy monsoon weather with continuous mist/drizzle',
      risk_summary: 'Fastest spreading foliar pathogen in soybean; wind-dispersed across hundreds of kilometers.'
    },
    prevention: {
      cultural: 'Plant early-maturing rust-tolerant varieties (e.g., JS 335, DS 228); maintain wider row spacing (45 cm).',
      organic: 'Foliar spray of Ampelomyces quisqualis bio-control agent or Trichoderma viride @ 5g/L.',
      chemical: 'Tebuconazole 25.9% EC @ 1.25ml/L or Hexaconazole 5% EC @ 2ml/L at first appearance in lower canopy.',
      safety_disclaimer: 'Advisory guidance is informational. Check waiting periods before harvest.'
    },
    monitoring_tips: 'Flip lower canopy leaves and use 10x magnifying glass to look for raised sand-like pustules.',
    similar_conditions: [
      {
        condition_name: 'Frogeye Leaf Spot (Cercospora sojina)',
        scientific_name: 'Cercospora sojina',
        distinguishing_features: 'Circular to angular brown lesions with prominent gray center and dark reddish-purple border.',
        key_difference: 'Frogeye lesions have gray centers and do NOT produce raised powdery pustules on the lower leaf surface.',
        risk_level: 'Moderate'
      },
      {
        condition_name: 'Bacterial Pustule (Xanthomonas axonopodis pv. glycines)',
        scientific_name: 'Xanthomonas axonopodis pv. glycines',
        distinguishing_features: 'Yellowish-green spots with small raised light-colored blisters in centers on lower surface.',
        key_difference: 'Bacterial blisters do not rupture to release reddish-brown powdery fungal spores.',
        risk_level: 'Moderate'
      }
    ]
  },
  {
    id: 'sugarcane-red-rot',
    name: 'Red Rot of Sugarcane',
    scientific_name: 'Colletotrichum falcatum',
    vernacular_names: {
      hi: 'गन्ने का लाल सड़न (रेड रॉट)',
      mr: 'उसाचा लाल कुजवा रोग',
      ta: 'கரும்பு செவ்வழுகல் நோய்'
    },
    category: 'Fungal',
    crops: ['Sugarcane'],
    early_symptoms: 'Yellowing and withering of third or fourth leaf from the top; red lesions with straw-colored center on midribs.',
    advanced_signs: 'Split cane reveals internal red discoloration of stalk pith tissues interrupted with white crosswise transverse bands. Stalk becomes hollow, sour alcoholic odor emitted.',
    progression: [
      { stage: 'Midrib Lesions', days: 'Day 1-10', description: 'Blood-red spots form on midribs of leaves, later expanding with straw centers.' },
      { stage: 'Crown Withering', days: 'Day 11-25', description: 'Top leaves lose turgidity, turn yellow, wither from margin to center.' },
      { stage: 'Internal Pith Rot', days: 'Day 26-45', description: 'Internal vascular bundles turn bright red with white horizontal transverse patches.' },
      { stage: 'Cane Shrinkage', days: 'Day 46+', description: 'Stalks shrivel, rind wrinkles, cane lodges, sucrose fully degrades into invert sugars.' }
    ],
    environmental_risk: {
      temp_optimal: '27°C – 32°C with high soil moisture',
      humidity_threshold: 'Relative humidity > 85%',
      rainfall_trigger: 'Waterlogging and flood water movement through fields',
      risk_summary: 'Major destructive epidemic disease causing complete crop loss if infected seed setts are planted.'
    },
    prevention: {
      cultural: 'Plant certified disease-free setts from nursery; hot water treatment of setts at 52°C for 30 mins; avoid ratooning infected fields.',
      organic: 'Sett dipping in Trichoderma viride @ 10g/L before planting.',
      chemical: 'Sett treatment with Carbendazim 50% WP @ 1g/L for 15 minutes before planting.',
      safety_disclaimer: 'Chemical application should always follow integrated pest and disease management guidelines.'
    },
    monitoring_tips: 'Inspect leaf midribs for dark red chain-like lesions during the monsoon vegetative phase.',
    similar_conditions: [
      {
        condition_name: 'Sugarcane Wilt (Fusarium sacchari)',
        scientific_name: 'Fusarium sacchari',
        distinguishing_features: 'Stalk pith turns diffuse purplish-pink or muddy gray-brown without distinct white transverse bands.',
        key_difference: 'Wilt shows diffuse uniform pinkish-brown discoloration without the diagnostic white transverse patches of Red Rot.',
        risk_level: 'High'
      }
    ]
  },
  {
    id: 'onion-purple-blotch',
    name: 'Purple Blotch of Onion & Garlic',
    scientific_name: 'Alternaria porri',
    vernacular_names: {
      hi: 'प्याज का बैंगनी धब्बा रोग',
      mr: 'कांद्यावरील जांभळा करपा',
      ta: 'வெங்காய ஊதா கருகல்'
    },
    category: 'Fungal',
    crops: ['Onion', 'Garlic', 'Leek'],
    early_symptoms: 'Small, sunken, whitish to water-soaked flecks on leaves and seed stalks.',
    advanced_signs: 'Flecks rapidly enlarge into elliptical or oval purplish-brown lesions with distinct violet-purple center and yellow surrounding halo. Black velvety fungal sporulation rings develop.',
    progression: [
      { stage: 'White Flecks', days: 'Day 1-3', description: 'Tiny water-soaked flecks appear on tubular onion foliage.' },
      { stage: 'Purple Lesion Ring', days: 'Day 4-8', description: 'Lesions turn characteristic deep purple/violet with concentric bands.' },
      { stage: 'Leaf Girdling', days: 'Day 9-14', description: 'Lesions girdle tubular leaf; foliage breaks over at point of lesion.' },
      { stage: 'Bulb Neck Rot', days: 'Day 15+', description: 'Infection enters bulb neck during harvest causing dark watery decay in storage.' }
    ],
    environmental_risk: {
      temp_optimal: '21°C – 30°C',
      humidity_threshold: 'High relative humidity (80-90%) with 12h foliar dew',
      rainfall_trigger: 'Thunderstorms and rainy spells during bulb development',
      risk_summary: 'Severe in Kharif and late-Kharif onion crops under humid windy weather.'
    },
    prevention: {
      cultural: 'Ensure 3-year crop rotation; plant on raised broad beds; avoid sprinkler irrigation that wets foliage.',
      organic: 'Seed treatment and foliar spray of Trichoderma harzianum @ 5g/L.',
      chemical: 'Difenoconazole 25% EC @ 1ml/L or Mancozeb 75% WP @ 2.5g/L at first appearance.',
      safety_disclaimer: 'AI guidance is informational. Confirm condition with local agricultural university.'
    },
    monitoring_tips: 'Look for sunken violet-purple eye-shaped spots on the middle third of onion tubular leaves.',
    similar_conditions: [
      {
        condition_name: 'Stemphylium Leaf Blight (Stemphylium vesicarium)',
        scientific_name: 'Stemphylium vesicarium',
        distinguishing_features: 'Small yellow-to-tan water-soaked spots developing into elongated light brown to tan lesions with dark olive-brown centers.',
        key_difference: 'Stemphylium lesions are tan/brown without the characteristic deep purple-violet centers of Purple Blotch.',
        risk_level: 'Moderate'
      }
    ]
  }
];

export const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({
  onNavigateToScan
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDiseaseModal, setActiveDiseaseModal] = useState<DiseaseLibraryItem | null>(null);

  const cropFilterOptions = [
    { label: 'All Crops', value: 'all' },
    { label: 'Tomato', value: 'Tomato' },
    { label: 'Potato', value: 'Potato' },
    { label: 'Cotton', value: 'Cotton' },
    { label: 'Rice', value: 'Rice' },
    { label: 'Soybean', value: 'Soybean' },
    { label: 'Sugarcane', value: 'Sugarcane' },
    { label: 'Onion', value: 'Onion' },
  ];

  const categoryFilterOptions = [
    { label: 'All Pathogens', value: 'all' },
    { label: 'Fungal', value: 'Fungal' },
    { label: 'Bacterial', value: 'Bacterial' },
    { label: 'Viral', value: 'Viral' },
  ];

  // Filtered List
  const filteredDiseases = useMemo(() => {
    return DISEASE_KNOWLEDGE_BASE.filter((dis) => {
      const matchesSearch = 
        dis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dis.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dis.early_symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dis.vernacular_names?.hi && dis.vernacular_names.hi.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (dis.vernacular_names?.mr && dis.vernacular_names.mr.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCrop = 
        selectedCrop === 'all' || dis.crops.some((c) => c.toLowerCase().includes(selectedCrop.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'all' || dis.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCrop && matchesCategory;
    });
  }, [searchTerm, selectedCrop, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Top Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <BookOpen className="w-4 h-4" />
            <span>Searchable Crop Disease Knowledge Base</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
            Crop Disease Library & Lookalike Comparison
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
            Scientific pathogen profiles, early foliar symptoms, progression stages, and differential diagnosis for visually similar crop diseases.
          </p>
        </div>

        <button
          onClick={() => onNavigateToScan && onNavigateToScan()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Leaf className="w-4 h-4" />
          <span>Analyze a Symptomatic Leaf</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search diseases by name, scientific pathogen, crop, or vernacular term..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Crop Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {cropFilterOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCrop(c.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCrop === c.value
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categoryFilterOptions.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Diseases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => {
          const isFungal = disease.category === 'Fungal';
          const isBacterial = disease.category === 'Bacterial';

          return (
            <div
              key={disease.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Badge Row */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isFungal
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                      : isBacterial
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                      : 'bg-purple-950 text-purple-300 border-purple-500/40'
                  }`}>
                    {disease.category} Pathogen
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{disease.crops.join(', ')}</span>
                  </div>
                </div>

                {/* Title & Scientific */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-['Outfit']">
                    {disease.name}
                  </h3>
                  <p className="text-xs text-slate-400 italic font-mono mt-0.5">
                    {disease.scientific_name}
                  </p>
                  {disease.vernacular_names?.mr && (
                    <p className="text-[11px] text-emerald-400/90 font-medium mt-1">
                      {disease.vernacular_names.mr}
                    </p>
                  )}
                </div>

                {/* Early Symptoms Snippet */}
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Early Visible Symptoms:
                  </span>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {disease.early_symptoms}
                  </p>
                </div>

                {/* Lookalike Conditions Count */}
                <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                  <GitCompare className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>
                    <strong>{disease.similar_conditions.length} Lookalike conditions</strong> differentiated
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveDiseaseModal(disease)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-950/80 text-emerald-400 hover:text-emerald-300 text-xs font-bold border border-slate-700 hover:border-emerald-500/50 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Pathogen Guide & Lookalikes</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            No matching disease profiles found
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search keywords or reset the crop and pathogen filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCrop('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Detailed Disease Modal & Lookalike Comparison */}
      {activeDiseaseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="glass-panel rounded-3xl max-w-3xl w-full border border-emerald-500/40 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto my-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    {activeDiseaseModal.category} Pathogen
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Crops: {activeDiseaseModal.crops.join(', ')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white font-['Outfit']">
                  {activeDiseaseModal.name}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 italic font-mono mt-0.5">
                  Scientific Name: {activeDiseaseModal.scientific_name}
                </p>
                {activeDiseaseModal.vernacular_names && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-400/90 font-medium mt-1">
                    {activeDiseaseModal.vernacular_names.hi && <span>Hindi: {activeDiseaseModal.vernacular_names.hi}</span>}
                    {activeDiseaseModal.vernacular_names.mr && <span>Marathi: {activeDiseaseModal.vernacular_names.mr}</span>}
                    {activeDiseaseModal.vernacular_names.ta && <span>Tamil: {activeDiseaseModal.vernacular_names.ta}</span>}
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveDiseaseModal(null)}
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Symptoms & Visual Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  Early Visible Symptoms:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeDiseaseModal.early_symptoms}
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block">
                  Advanced Foliar Signs:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeDiseaseModal.advanced_signs}
                </p>
              </div>
            </div>

            {/* Disease Progression Timeline */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-['Outfit']">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>Progression Timeline (Days from Infection)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {activeDiseaseModal.progression.map((prog, i) => (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">{prog.stage}</span>
                      <span className="text-slate-500">{prog.days}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      {prog.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CRUCIAL SECTION: Similar-Looking Conditions Comparison */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-amber-500/30">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white font-['Outfit']">
                  Similar-Looking Conditions (Differential Diagnosis)
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                These conditions cause visually similar foliar symptoms. Use these key differences to avoid misdiagnosis:
              </p>

              <div className="space-y-3 pt-1">
                {activeDiseaseModal.similar_conditions.map((sim, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {sim.condition_name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                        {sim.risk_level} Risk
                      </span>
                    </div>
                    <p className="text-slate-300">
                      <strong>Visual Symptoms:</strong> {sim.distinguishing_features}
                    </p>
                    <div className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
                      <strong>Key Distinguishing Difference:</strong> {sim.key_difference}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Triggers & Risk */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                Environmental Triggers:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Temp: {activeDiseaseModal.environmental_risk.temp_optimal}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Humidity: {activeDiseaseModal.environmental_risk.humidity_threshold}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Rain: {activeDiseaseModal.environmental_risk.rainfall_trigger}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1">
                {activeDiseaseModal.environmental_risk.risk_summary}
              </p>
            </div>

            {/* Prevention & Management */}
            <div className="space-y-2 text-xs">
              <span className="text-xs font-bold text-white uppercase tracking-wider block font-['Outfit']">
                Integrated Crop Management & Prevention
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold text-[11px] block">Cultural Practices:</span>
                  <p className="text-slate-300">{activeDiseaseModal.prevention.cultural}</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-teal-400 font-bold text-[11px] block">Biological / Organic:</span>
                  <p className="text-slate-300">{activeDiseaseModal.prevention.organic}</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-sky-400 font-bold text-[11px] block">Chemical IPM:</span>
                  <p className="text-slate-300">{activeDiseaseModal.prevention.chemical}</p>
                </div>
              </div>
              <p className="text-[11px] text-amber-400/90 italic pt-1">
                {activeDiseaseModal.prevention.safety_disclaimer}
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <a
                href="tel:18001801551"
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Kisan Helpline: 1800-180-1551</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDiseaseModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveDiseaseModal(null);
                    if (onNavigateToScan) {
                      onNavigateToScan(activeDiseaseModal.crops[0]);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Scan This Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
