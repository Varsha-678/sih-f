import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { LandingHome } from './components/LandingHome';
import { CameraScanner } from './components/CameraScanner';
import { DiagnosticResult } from './components/DiagnosticResult';
import { CropHealthDashboard } from './components/CropHealthDashboard';
import { RiskRadarMap } from './components/RiskRadarMap';
import { FieldManager } from './components/FieldManager';
import { HistoryTimeline } from './components/HistoryTimeline';
import { DiseaseLibrary } from './components/DiseaseLibrary';
import { LearningCenter } from './components/LearningCenter';
import { DatasetModelCenter } from './components/DatasetModelCenter';
import { SpreadTimeline } from './components/SpreadTimeline';
import { ComparisonTool } from './components/ComparisonTool';
import { SymptomAssistant } from './components/SymptomAssistant';
import { ExpertPortal } from './components/ExpertPortal';
import { Waves } from './components/Waves';
import type { 
  Language, 
  NavTab,
  DiagnosticResult as DiagnosticResultType, 
  Field, 
  NotificationItem 
} from './types';
import { translations } from './utils/translations';
import { diagnoseImageClientSide } from './utils/clientDiagnosis';
import { ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [activeFieldId, setActiveFieldId] = useState<string>('field-1');

  // Fields State
  const [fields, setFields] = useState<Field[]>([
    {
      id: 'field-1',
      name: 'Field 01 - North Acre',
      crop: 'Cotton',
      variety: 'Ajeet 155 Bt-II',
      growth_stage: 'Flowering',
      location: 'Yavatmal Sector 4',
      coordinates: [20.38, 78.12],
      acreage: 4.5,
      sowing_date: '2026-06-10',
      health_status: 'Healthy',
      risk_level: 'LOW',
      latest_scan: {
        date: '2026-09-02',
        condition: 'Healthy Leaf',
        affected_percentage: 0.0,
        severity: 'Healthy',
        confidence: 0.95,
        health_score: 94
      },
      total_scans: 6
    },
    {
      id: 'field-2',
      name: 'Field 02 - East Ridge',
      crop: 'Rice',
      variety: 'Indrayani',
      growth_stage: 'Tillering',
      location: 'Pusad River Basin',
      coordinates: [19.91, 77.58],
      acreage: 3.0,
      sowing_date: '2026-06-25',
      health_status: 'Early Warning',
      risk_level: 'WATCH',
      latest_scan: {
        date: '2026-09-03',
        condition: 'Bacterial Leaf Blight (BLB)',
        affected_percentage: 18.5,
        severity: 'Moderate',
        confidence: 0.92,
        health_score: 76
      },
      total_scans: 4
    },
    {
      id: 'field-3',
      name: 'Field 03 - South Valley',
      crop: 'Tomato',
      variety: 'Abhinav Hybrid',
      growth_stage: 'Pod/Fruit Formation',
      location: 'Sawargaon Greenhouses',
      coordinates: [20.12, 77.89],
      acreage: 2.0,
      sowing_date: '2026-07-05',
      health_status: 'At Risk',
      risk_level: 'HIGH',
      latest_scan: {
        date: '2026-09-04',
        condition: 'Early Blight (Target Spot)',
        affected_percentage: 28.0,
        severity: 'Moderate',
        confidence: 0.93,
        health_score: 68
      },
      total_scans: 8
    }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Disease risk increased in Field 02',
      message: 'High humidity (>85%) detected. Susceptibility to bacterial blight elevated.',
      type: 'risk_alert',
      timestamp: '10m ago',
      read: false,
      link_tab: 'risk',
      related_field_id: 'field-2'
    },
    {
      id: 'notif-2',
      title: 'New scan completed',
      message: 'Scan #SC-9104 for Cotton verified with 94% confidence.',
      type: 'scan',
      timestamp: '2h ago',
      read: false,
      link_tab: 'history'
    },
    {
      id: 'notif-3',
      title: 'Expert review certified',
      message: 'Senior Agronomist certified Scan #EXP-1049 as Level 4 Ground Truth.',
      type: 'expert_review',
      timestamp: '1d ago',
      read: true,
      link_tab: 'about'
    }
  ]);

  // Scans History Cache
  const [allScans, setAllScans] = useState<DiagnosticResultType[]>([]);

  // Seed demo initial scans
  useEffect(() => {
    fetch('/api/v1/seed_demo_scans', { method: 'POST' }).catch(() => {});
  }, []);

  // Handle Image Selection
  const handleImageSelected = async (file: File, _previewUrl: string, selectedCrop?: string) => {
    setIsAnalyzing(true);
    const activeField = fields.find((f) => f.id === activeFieldId);

    try {
      let data: DiagnosticResultType | null = null;

      // 1. Try FastAPI Backend
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('district', activeField?.location || 'Yavatmal');
        formData.append('language', lang);

        const response = await fetch('/api/v1/analyze/disease', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          data = await response.json();
        }
      } catch (backendErr) {
        console.warn('Backend server offline. Running Autonomous Client Vision AI Engine.', backendErr);
      }

      // 2. If Backend not reachable, run Real-Time Client Vision Engine
      if (!data) {
        data = await diagnoseImageClientSide(file, lang, selectedCrop || activeField?.crop);
      }

      data.field_id = activeFieldId;
      data.field_name = activeField?.name || 'My Field';

      setDiagnosticResult(data);
      setAllScans([data, ...allScans]);

      // Trigger celebration for healthy or confident prediction
      if (!data.is_unknown && data.confidence > 0.80) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      }

      // Add Notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'New scan completed',
        message: `Diagnosed ${data.crop} — ${data.condition} (${(data.confidence * 100).toFixed(0)}% confidence).`,
        type: 'scan',
        timestamp: 'Just now',
        read: false,
        link_tab: 'detect'
      };
      setNotifications([newNotif, ...notifications]);

      // Update Field status
      if (activeField) {
        const isHealthy = data.status === 'Healthy';
        const updatedFields = fields.map((f) => {
          if (f.id === activeField.id) {
            return {
              ...f,
              health_status: (isHealthy ? 'Healthy' : data.severity.affected_percentage > 30 ? 'At Risk' : 'Early Warning') as Field['health_status'],
              latest_scan: {
                date: new Date().toISOString().split('T')[0],
                condition: data.condition,
                affected_percentage: data.severity.affected_percentage,
                severity: data.severity.severity_category,
                confidence: data.confidence,
                health_score: data.health_score?.overall_score || 80
              },
              total_scans: f.total_scans + 1
            };
          }
          return f;
        });
        setFields(updatedFields);
      }

    } catch (err: any) {
      console.error('Diagnostic error:', err);
      const fallbackData = await diagnoseImageClientSide(file, lang, selectedCrop || activeField?.crop);
      setDiagnosticResult(fallbackData);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleResetScan = () => {
    setDiagnosticResult(null);
  };

  const handleAddField = (newField: Omit<Field, 'id' | 'total_scans'>) => {
    const created: Field = {
      ...newField,
      id: `field-${Date.now()}`,
      total_scans: 0
    };
    setFields([...fields, created]);
    setActiveFieldId(created.id);
  };

  const handleStartScanForField = (field: Field) => {
    setActiveFieldId(field.id);
    setDiagnosticResult(null);
    setActiveTab('detect');
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (item: NotificationItem) => {
    if (item.link_tab) {
      setActiveTab(item.link_tab);
    }
    setNotifications(
      notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic ReactBits Gradient Waves Background */}
      <Waves
        gradientColors={[
          'rgba(16, 185, 129, 0.38)', // Emerald
          'rgba(6, 182, 212, 0.35)',  // Cyan
          'rgba(59, 130, 246, 0.32)',  // Blue
          'rgba(139, 92, 246, 0.30)', // Violet
          'rgba(16, 185, 129, 0.38)'  // Emerald
        ]}
        backgroundColor="transparent"
        waveSpeedX={0.014}
        waveSpeedY={0.006}
        waveAmpX={38}
        waveAmpY={20}
        xGap={12}
        yGap={32}
        friction={0.92}
        tension={0.005}
        maxCursorMove={140}
        glow={true}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* 1. Top Navbar */}
      <div className="relative z-20">
        <Navbar
          lang={lang}
          onLanguageChange={setLang}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onNotificationClick={handleNotificationClick}
        />
      </div>

      {/* 2. Main Content Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* Tab 1: Home / Landing */}
        {activeTab === 'home' && (
          <LandingHome
            lang={lang}
            onStartScan={() => {
              setDiagnosticResult(null);
              setActiveTab('detect');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Tab 2: Disease Detection / AI Crop Analysis */}
        {activeTab === 'detect' && (
          <div className="space-y-6">
            {!diagnosticResult ? (
              <>
                <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Early Stage Disease Screening & Foliar Analysis</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
                    AI Crop Disease Detection
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400">
                    Capture or upload a clear leaf image to detect early disease symptoms, assess severity, calculate crop health score, and formulate timely next actions.
                  </p>
                </div>

                <CameraScanner
                  lang={lang}
                  onImageSelected={handleImageSelected}
                  isAnalyzing={isAnalyzing}
                  voiceEnabled={voiceEnabled}
                  onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
                />
              </>
            ) : (
              <DiagnosticResult
                result={diagnosticResult}
                lang={lang}
                onReset={handleResetScan}
                onOpenSymptomAssistant={() => setActiveTab('symptoms')}
                onOpenExpertReview={() => setActiveTab('expert')}
                onOpenComparison={() => setActiveTab('compare')}
                onOpenSpreadTimeline={() => setActiveTab('spread')}
              />
            )}
          </div>
        )}

        {/* Tab 3: Crop Health Dashboard & Trends */}
        {activeTab === 'crophealth' && (
          <CropHealthDashboard
            lang={lang}
            fields={fields}
            onNavigateTab={setActiveTab}
            onSelectFieldForScan={handleStartScanForField}
          />
        )}

        {/* Tab 4: Risk Monitor / Agro-Climatic Radar */}
        {activeTab === 'risk' && <RiskRadarMap lang={lang} />}

        {/* Tab 5: Fields Management & Health Map */}
        {activeTab === 'fields' && (
          <FieldManager
            fields={fields}
            activeFieldId={activeFieldId}
            onSelectField={setActiveFieldId}
            onAddField={handleAddField}
            lang={lang}
            onStartScanForField={handleStartScanForField}
          />
        )}

        {/* Tab 6: Scan History & Timeline */}
        {activeTab === 'history' && (
          <HistoryTimeline
            lang={lang}
            onSelectScan={(scan) => {
              setDiagnosticResult(scan);
              setActiveTab('detect');
            }}
            onCompareScan={(scan) => {
              setDiagnosticResult(scan);
              setActiveTab('compare');
            }}
          />
        )}

        {/* Tab 7: Searchable Disease Library & Lookalike Differentiation */}
        {activeTab === 'library' && (
          <DiseaseLibrary
            lang={lang}
            onNavigateToScan={() => {
              setDiagnosticResult(null);
              setActiveTab('detect');
            }}
          />
        )}

        {/* Tab 8: Learning Center & Educational Hub */}
        {activeTab === 'learn' && (
          <LearningCenter
            lang={lang}
            onNavigateToScan={() => {
              setDiagnosticResult(null);
              setActiveTab('detect');
            }}
          />
        )}

        {/* Tab 9: About / Dataset & Model Architecture / Responsible AI */}
        {activeTab === 'about' && <DatasetModelCenter lang={lang} />}

        {/* Auxiliary Sub-views */}
        {activeTab === 'spread' && (
          <SpreadTimeline
            lang={lang}
            currentResult={diagnosticResult}
          />
        )}

        {activeTab === 'compare' && (
          <ComparisonTool
            scans={allScans.length > 0 ? allScans : [
              {
                prediction_id: 'SC-9104',
                scan_url: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=300&auto=format&fit=crop&q=80',
                quality: { can_analyze: true, quality: 'EXCELLENT', blur_score: 120, brightness_score: 130, resolution: '640x480', leaf_coverage: 75, message: 'OK' },
                crop: 'Cotton',
                condition: 'Bacterial Blight (Karpa)',
                scientific_name: 'Xanthomonas citri',
                status: 'Early Symptoms',
                confidence: 0.94,
                raw_confidence: 0.96,
                is_unknown: false,
                top3_predictions: [],
                gradcam_heatmap_url: '',
                severity: { affected_percentage: 18.5, healthy_percentage: 81.5, severity_category: 'Early Symptoms', severity_tier: 1, action_urgency: 'Monitor', color_code: '#10B981' },
                pest_detection: { detections: [], total_count: 0, infestation_level: 'NONE', etl_breached: false },
                advisory: { class_key: 'Cotton', language: lang, symptoms: 'Dark lesions', organic_remedies: 'Neem spray', chemical_ipm: 'Copper Oxychloride', cultural_practices: 'Drainage', waiting_period_days: 7, helpline: '1800-180-1551' },
                model_version: 'v1.2',
                dataset_version: 'v1.0',
                created_at: new Date().toISOString()
              }
            ]}
            lang={lang}
            currentResult={diagnosticResult}
          />
        )}

        {activeTab === 'symptoms' && (
          <SymptomAssistant
            lang={lang}
            onNavigateToScan={() => {
              setDiagnosticResult(null);
              setActiveTab('detect');
            }}
          />
        )}

        {activeTab === 'expert' && (
          <ExpertPortal
            lang={lang}
            initialReviewData={diagnosticResult}
          />
        )}
      </main>

      {/* 3. Bottom Footer with Kisan Helpline */}
      <footer className="glass-panel border-t border-slate-800/80 py-5 px-4 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AgriRakshak • AI Crop Disease Detection & Health Intelligence Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500 italic hidden md:inline">
              {translations[lang].aiDisclaimer}
            </span>

            <a
              href="tel:18001801551"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Kisan Helpline: 1800-180-1551</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
