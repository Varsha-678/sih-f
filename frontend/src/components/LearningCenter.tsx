import React, { useState } from 'react';
import { 
  GraduationCap, Search, CheckCircle2, 
  Lightbulb, Compass, CloudRain, Sprout, Cpu,
  Eye, BookOpen, ChevronRight, PhoneCall
} from 'lucide-react';
import type { Language, LearnCategoryItem } from '../types';

interface LearningCenterProps {
  lang: Language;
  onNavigateToScan?: () => void;
}

export const LEARN_MODULES: LearnCategoryItem[] = [
  {
    id: 'learn-1',
    title: '1. Visual Disease Identification Basics',
    category: 'Disease Identification',
    readTime: '4 min read',
    summary: 'Learn how to differentiate fungal leaf spots, bacterial water-soaked lesions, and viral mosaics through visual patterns.',
    iconName: 'Eye',
    badgeText: 'Foundational',
    keyPoints: [
      'Fungal Infections: Usually produce concentric rings (target spots), powdery coatings, or raised pustules (rusts).',
      'Bacterial Infections: Characterized by angular, water-soaked, translucent margins strictly bounded by leaf veins.',
      'Viral Pathogens: Cause systemic leaf curling, mosaic mottling, yellow veining, and stunted internode growth.',
      'Nutrient Deficiencies: Symmetrical yellowing (chlorosis) starting either at leaf margins (potassium) or between veins (magnesium/iron).'
    ],
    fieldAction: 'Carry a 10x hand lens into the field. Check the underside of leaves for water-soaked borders or fungal sporulation.'
  },
  {
    id: 'learn-2',
    title: '2. Early Symptom Scouting Protocols',
    category: 'Early Symptoms',
    readTime: '5 min read',
    summary: 'The difference between 2% and 30% crop damage is early detection. Implement systematic scouting routes.',
    iconName: 'Compass',
    badgeText: 'Best Practice',
    keyPoints: [
      'Use a "W" or "Z" walking pattern across the field rather than inspecting only perimeter border rows.',
      'Examine at least 20 plants randomly selected across 5 different spots in each 2-acre plot.',
      'Inspect lower canopy leaves first—over 70% of foliar fungal pathogens (Early Blight, Rust) originate on older damp foliage.',
      'Photograph suspicious leaves against a neutral background with good natural morning lighting.'
    ],
    fieldAction: 'Scout your fields early in the morning (7:00 AM - 9:00 AM) when morning dew highlights bacterial ooze and fresh sporulation.'
  },
  {
    id: 'learn-3',
    title: '3. Systematic Crop Monitoring Cadence',
    category: 'Crop Monitoring',
    readTime: '3 min read',
    summary: 'Establish an optimal monitoring schedule aligned with crop growth stage vulnerability.',
    iconName: 'BookOpen',
    badgeText: 'Field Protocol',
    keyPoints: [
      'Vegetative Stage: Scout once every 7 days under normal weather; once every 3 days under high humidity.',
      'Flowering & Fruit/Pod Formation: Scout every 3-4 days—this is the most critical yield-determining window.',
      'Post-Heavy Rain Events: Perform an immediate walk-through 24 hours after heavy rains or strong winds.',
      'Log each scan in the platform to build an unbroken health trajectory for your specific plot.'
    ],
    fieldAction: 'Keep records of previous disease outbreaks; pathogens often overwinter in specific soil micro-pockets.'
  },
  {
    id: 'learn-4',
    title: '4. Integrated Pest & Disease Prevention (IPM)',
    category: 'Disease Prevention',
    readTime: '6 min read',
    summary: 'Combine cultural sanitation, bio-fungicides, and targeted IPM interventions without relying solely on chemical sprays.',
    iconName: 'Lightbulb',
    badgeText: 'Sustainability',
    keyPoints: [
      'Crop Rotation: Never plant solanaceous crops (tomato, potato, chilli) consecutively; rotate with legumes or millets.',
      'Canopy Aeration: Maintain recommended planting distances (e.g. 45-60cm) to allow air circulation and fast leaf drying.',
      'Biological Priming: Treat seeds and roots with Trichoderma or Pseudomonas prior to sowing.',
      'Safety First: Never mix unverified agrochemicals. Respect Pre-Harvest Intervals (PHI) to prevent chemical residue in crops.'
    ],
    fieldAction: 'Prune the bottom 6 to 12 inches of foliage on tomato and chilli plants to prevent soil-splash pathogen transmission.'
  },
  {
    id: 'learn-5',
    title: '5. Weather Triggers & Disease Epidemiology',
    category: 'Weather & Disease Risk',
    readTime: '4 min read',
    summary: 'Understand how temperature, relative humidity, and rainfall create disease outbreak windows.',
    iconName: 'CloudRain',
    badgeText: 'Agro-Climatic',
    keyPoints: [
      'Relative Humidity > 85%: Triggers spore germination for Powdery Mildew, Rusts, and Downy Mildews.',
      'Continuous Leaf Wetness (> 6 hours): Necessary for bacterial pathogens (Xanthomonas) to enter through stomatal openings.',
      'Temperature Windows: Early Blight thrives at 24-29°C; Late Blight prefers cooler 15-20°C conditions.',
      'Use the platform\'s Risk Monitor radar to anticipate outbreaks 48 hours before visible symptoms manifest.'
    ],
    fieldAction: 'Avoid overhead sprinkler irrigation during late evenings; wet leaves overnight provide ideal fungal incubation.'
  },
  {
    id: 'learn-6',
    title: '6. Crop Growth Stages & Critical Vulnerabilities',
    category: 'Crop Growth Stages',
    readTime: '5 min read',
    summary: 'Identify the most vulnerable developmental stages for Cotton, Rice, Tomato, Soybean, and Sugarcane.',
    iconName: 'Sprout',
    badgeText: 'Agronomy',
    keyPoints: [
      'Seedling Stage: High vulnerability to Damping-off, Collar Rot, and Seedling Blight.',
      'Square / Tillering Stage: Rapid vegetative expansion attracts foliar blights and sucking pests.',
      'Flowering & Boll/Fruit Set: High physiological demand; diseases during this stage cause abortion of flowers and bolls.',
      'Maturation Stage: Pathogen entry into fruit/boll tissues causes staining, internal rot, and heavy harvest loss.'
    ],
    fieldAction: 'Inspect flowering nodes and developing pods weekly for water-soaked discolored calyx margins.'
  },
  {
    id: 'learn-7',
    title: '7. How AI Crop Vision Works & Explainable AI',
    category: 'AI Crop Analysis',
    readTime: '5 min read',
    summary: 'Demystifying deep learning, Grad-CAM attention heatmaps, confidence calibration, and why AI is an assistive tool.',
    iconName: 'Cpu',
    badgeText: 'AI Literacy',
    keyPoints: [
      'Visual Feature Extraction: Deep neural networks scan pixel gradients for texture, lesion boundary shapes, and color spectrums.',
      'Grad-CAM Heatmaps: Highlight the exact leaf regions the AI focused on to produce its diagnostic prediction.',
      'Confidence Calibration: High confidence (90%+) indicates strong visual similarity with known validated dataset references.',
      'Assistive Nature: AI provides probabilistic estimates. Severe or uncertain cases should always be reviewed by certified agronomists.'
    ],
    fieldAction: 'When reviewing an AI scan, switch to the "Grad-CAM Heatmap" tab to verify that the AI focused on the actual lesion and not background soil.'
  }
];

export const LearningCenter: React.FC<LearningCenterProps> = ({
  onNavigateToScan
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('learn-1');

  const categories = [
    { label: 'All Modules', value: 'all' },
    { label: 'Disease Identification', value: 'Disease Identification' },
    { label: 'Early Symptoms', value: 'Early Symptoms' },
    { label: 'Crop Monitoring', value: 'Crop Monitoring' },
    { label: 'Disease Prevention', value: 'Disease Prevention' },
    { label: 'Weather & Risk', value: 'Weather & Disease Risk' },
    { label: 'Growth Stages', value: 'Crop Growth Stages' },
    { label: 'AI Crop Vision', value: 'AI Crop Analysis' },
  ];

  const filteredModules = LEARN_MODULES.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.keyPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* 1. Top Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <GraduationCap className="w-4 h-4" />
            <span>Agricultural Intelligence & Training Hub</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
            Crop Health & Disease Learning Center
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
            Practical agronomist guides on foliar symptom identification, proactive field scouting protocols, weather risk epidemiology, and responsible AI usage.
          </p>
        </div>

        <button
          onClick={() => onNavigateToScan && onNavigateToScan()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Apply Learning on a Crop</span>
        </button>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search educational guides by topic, symptom, scouting method, or IPM strategy..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === c.value
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Learning Modules List */}
      <div className="space-y-4">
        {filteredModules.map((module) => {
          const isExpanded = expandedModuleId === module.id;

          return (
            <div
              key={module.id}
              className={`glass-panel rounded-3xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-emerald-500/50 bg-slate-900/90 shadow-xl' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Module Header Bar */}
              <div
                onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                className="p-5 md:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    {module.iconName === 'Eye' && <Eye className="w-5 h-5" />}
                    {module.iconName === 'Compass' && <Compass className="w-5 h-5" />}
                    {module.iconName === 'BookOpen' && <BookOpen className="w-5 h-5" />}
                    {module.iconName === 'Lightbulb' && <Lightbulb className="w-5 h-5" />}
                    {module.iconName === 'CloudRain' && <CloudRain className="w-5 h-5" />}
                    {module.iconName === 'Sprout' && <Sprout className="w-5 h-5" />}
                    {module.iconName === 'Cpu' && <Cpu className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                        {module.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {module.readTime}
                      </span>
                      <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/30">
                        {module.badgeText}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
                      {module.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
                      {module.summary}
                    </p>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-slate-400 border border-slate-800 transition-transform duration-300 shrink-0 ${
                  isExpanded ? 'rotate-90 text-emerald-400 border-emerald-500/40' : ''
                }`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Expandable Content Area */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 pt-2 border-t border-slate-800 space-y-4 animate-fadeIn">
                  {/* Key Takeaway Points */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block font-['Outfit']">
                      Key Field Principles:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {module.keyPoints.map((point, i) => (
                        <div key={i} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800/90 flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Field Action Checklist */}
                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                        Actionable Field Tip:
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                        {module.fieldAction}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Support Callout */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-['Outfit']">
              Need personalized advisory for your region?
            </h4>
            <p className="text-xs text-slate-400">
              Speak directly with Kisan Call Centre agronomists for localized crop assistance.
            </p>
          </div>
        </div>

        <a
          href="tel:18001801551"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 whitespace-nowrap"
        >
          Call 1800-180-1551 (Toll Free)
        </a>
      </div>
    </div>
  );
};
