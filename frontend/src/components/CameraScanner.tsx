import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, Upload, RefreshCw, AlertTriangle, 
  CheckCircle2, Sparkles, Volume2, VolumeX, Focus,
  Zap
} from 'lucide-react';
import type { Language, QualityEvaluation } from '../types';
import { translations } from '../utils/translations';
import { evaluateImageQualityClient, speakGuidance } from '../utils/clientDiagnosis';

interface CameraScannerProps {
  lang: Language;
  onImageSelected: (file: File, previewUrl: string, selectedCrop?: string) => void;
  isAnalyzing?: boolean;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  lang,
  onImageSelected,
  isAnalyzing = false,
  voiceEnabled,
  onToggleVoice
}) => {
  const t = translations[lang] || translations.en;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  const [selectedCrop, setSelectedCrop] = useState<string>('All / Auto-Detect');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [qualityEval, setQualityEval] = useState<QualityEvaluation | null>(null);
  const [showQualityModal, setShowQualityModal] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);

  const cropOptions = [
    { label: t.cropAll, value: 'All / Auto-Detect' },
    { label: t.cropTomato, value: 'Tomato' },
    { label: t.cropPotato, value: 'Potato' },
    { label: t.cropRice, value: 'Rice' },
    { label: t.cropCotton, value: 'Cotton' },
    { label: t.cropMaize, value: 'Maize' },
    { label: t.cropSoybean, value: 'Soybean' },
    { label: t.cropSugarcane, value: 'Sugarcane' },
    { label: t.cropOnion, value: 'Onion' },
    { label: t.cropPomegranate, value: 'Pomegranate' },
    { label: t.cropChilli, value: 'Chilli' },
    { label: t.cropWheat, value: 'Wheat' },
  ];

  // Stop camera stream utility
  const stopCameraStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  // Start live WebRTC video stream
  const startCamera = async (facing: 'environment' | 'user' = 'environment') => {
    setCameraError(null);
    stopCameraStream();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(t.cameraUnavailable);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((err) => console.error('Video play error:', err));
      }

      if (voiceEnabled) {
        speakGuidance(t.voiceKeepInside, lang);
      }
    } catch (err: any) {
      console.warn('Camera initiation failed:', err);
      setCameraError(t.cameraUnavailable);
      setIsCameraActive(false);
    }
  };

  // Toggle front/rear camera
  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  // Process selected or captured image
  const processImageFile = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setCapturedPreview(preview);
    setCapturedFile(file);
    stopCameraStream();

    // Run Pre-Scan Image Quality Check
    const quality = await evaluateImageQualityClient(file);
    setQualityEval(quality);

    if (quality.quality === 'POOR' || quality.quality === 'LOW_RESOLUTION' || !quality.can_analyze) {
      setShowQualityModal(true);
      if (voiceEnabled) {
        speakGuidance(t.voiceRetake, lang);
      }
    } else {
      if (voiceEnabled) {
        speakGuidance(t.voiceUploaded, lang);
      }
    }
  };

  // Capture frame from video stream
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `crop_scan_${Date.now()}.jpg`, { type: 'image/jpeg' });
        processImageFile(file);
      }
    }, 'image/jpeg', 0.95);
  };

  // File Input Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Trigger Final Analysis
  const handleConfirmAndAnalyze = () => {
    if (capturedFile && capturedPreview) {
      if (voiceEnabled) {
        speakGuidance(t.voiceAnalyzing, lang);
      }
      setShowQualityModal(false);
      onImageSelected(capturedFile, capturedPreview, selectedCrop);
    }
  };

  // Reset / Retake
  const handleRetake = () => {
    setCapturedPreview(null);
    setCapturedFile(null);
    setQualityEval(null);
    setShowQualityModal(false);
    startCamera(facingMode);
  };

  // 7-Stage Animated Scan Sequence during analysis
  useEffect(() => {
    if (!isAnalyzing) {
      setScanStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setScanStepIndex((prev) => (prev + 1) % 7);
    }, 600);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Hidden elements */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 1. Crop Selection Pill Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            {t.selectCropLabel}
          </label>
          <button
            onClick={onToggleVoice}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
              voiceEnabled
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{voiceEnabled ? t.voiceEnabled : t.voiceDisabled}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {cropOptions.map((crop) => (
            <button
              key={crop.value}
              onClick={() => setSelectedCrop(crop.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCrop === crop.value
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {crop.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Visual Scanning Frame & Camera Box */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 shadow-2xl border border-emerald-500/20 space-y-4">
        {/* Header Banner */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-white flex items-center gap-2 font-['Outfit']">
              <Focus className="w-5 h-5 text-emerald-400" />
              {t.scanMyCrop}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.scanSubtitle}
            </p>
          </div>

          {isCameraActive && (
            <button
              onClick={toggleCameraFacing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 border border-slate-700 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.switchCamera}
            </button>
          )}
        </div>

        {/* Viewfinder Frame */}
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full aspect-[4/3] max-h-[420px] rounded-2xl overflow-hidden bg-slate-950 border-2 transition-all flex items-center justify-center ${
            isDragging
              ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01]'
              : 'border-dashed border-slate-700'
          }`}
        >
          {/* Live Camera Stream */}
          {isCameraActive && (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              {/* Real-time Focus Reticle & Laser */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-emerald-400/80 rounded-2xl relative animate-pulse-slow">
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-emerald-400" />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-emerald-400" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-emerald-400" />
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-1/2 -translate-y-1/2 animate-scan-radar absolute" />
                </div>
              </div>
            </div>
          )}

          {/* Captured Preview */}
          {!isCameraActive && capturedPreview && (
            <div className="relative w-full h-full">
              <img
                src={capturedPreview}
                alt="Captured crop scan"
                className="w-full h-full object-contain bg-black/60"
              />

              {/* Analysis Animation Overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-4 border-teal-500/20 border-b-teal-400 animate-spin-reverse" />
                    <Sparkles className="w-8 h-8 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="text-sm font-bold text-white font-['Outfit']">
                      {t.multiStageAnalysis}
                    </h4>
                    <p className="text-xs text-emerald-400 font-semibold">
                      {scanStepIndex === 0 && t.stage1}
                      {scanStepIndex === 1 && t.stage2}
                      {scanStepIndex === 2 && t.stage3}
                      {scanStepIndex === 3 && t.stage4}
                      {scanStepIndex === 4 && t.stage5}
                      {scanStepIndex === 5 && t.stage6}
                      {scanStepIndex === 6 && t.stage7}
                    </p>
                  </div>
                </div>
              )}

              {!isAnalyzing && (
                <div className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.imageStaged}</span>
                </div>
              )}
            </div>
          )}

          {/* Idle / Off State */}
          {!isCameraActive && !capturedPreview && (
            <div className="text-center p-6 space-y-4 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Camera className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-['Outfit']">
                  {t.cameraPreview}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.dragDropText}{' '}
                  <span
                    onClick={() => fileInputRef.current?.click()}
                    className="text-emerald-400 font-semibold underline cursor-pointer"
                  >
                    {t.browseFiles}
                  </span>
                </p>
              </div>

              {cameraError && (
                <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-start gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Visual Guidance Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t.guidance1}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{t.guidance2}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{t.guidance3}</span>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isCameraActive && (
            <button
              onClick={capturePhoto}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              {t.capturePhoto}
            </button>
          )}

          {!isCameraActive && capturedPreview && (
            <>
              <button
                onClick={handleRetake}
                disabled={isAnalyzing}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t.retake}
              </button>
              <button
                onClick={handleConfirmAndAnalyze}
                disabled={isAnalyzing}
                className="w-full sm:w-1/2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {isAnalyzing ? t.analyzingText : t.analyzeNow}
              </button>
            </>
          )}

          {!isCameraActive && !capturedPreview && (
            <>
              <button
                onClick={() => startCamera('environment')}
                className="w-full sm:w-1/2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                {t.scanNow}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-1/2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                {t.uploadGallery}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 5. Pre-Scan Quality Assessment Modal if Quality is Sub-optimal */}
      {showQualityModal && qualityEval && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel rounded-3xl p-6 max-w-md w-full border border-amber-500/40 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {t.qualityCheckTitle}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  {t.qualityLow}
                </p>
              </div>
            </div>

            {/* Quality Score Breakdown */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">{t.sharpness}:</span>
                <span className={`font-semibold ${qualityEval.blur_score < 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {qualityEval.blur_score} (Score)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.brightness}:</span>
                <span className={`font-semibold ${qualityEval.brightness_score < 45 || qualityEval.brightness_score > 230 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {qualityEval.brightness_score} / 255
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.leafCoverage}:</span>
                <span className={`font-semibold ${qualityEval.leaf_coverage < 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {qualityEval.leaf_coverage}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.resolution}:</span>
                <span className="text-slate-200 font-mono font-semibold">{qualityEval.resolution}</span>
              </div>
            </div>

            {/* Suggestions */}
            {qualityEval.suggestions && qualityEval.suggestions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  How to improve:
                </span>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                  {qualityEval.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRetake}
                className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {t.retakePhotoBtn}
              </button>
              <button
                onClick={handleConfirmAndAnalyze}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 cursor-pointer"
              >
                {t.proceedAnyway}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
