import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, Sparkles, AlertTriangle, CheckCircle2, Focus } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface CameraScannerProps {
  lang: Language;
  onImageSelected: (file: File, previewUrl: string) => void;
  isAnalyzing?: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  lang,
  onImageSelected,
  isAnalyzing = false
}) => {
  const t = translations[lang];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  // Stop camera stream utility
  const stopCameraStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  // Start real browser camera with WebRTC getUserMedia
  const startCamera = async (facing: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    setCapturedPreview(null);
    setCapturedFile(null);

    // Stop existing stream if running
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API (getUserMedia) is not supported in this browser environment.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
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
    } catch (err: any) {
      console.warn('Camera initiation failed:', err);
      setCameraError('Camera access is unavailable. Please check permissions or upload an image instead.');
      setIsCameraActive(false);
    }
  };

  // Toggle front/rear camera
  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
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
        const preview = URL.createObjectURL(blob);
        setCapturedPreview(preview);
        setCapturedFile(file);
        stopCameraStream();
      }
    }, 'image/jpeg', 0.95);
  };

  // Gallery file upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setCapturedPreview(preview);
      setCapturedFile(file);
      stopCameraStream();
    }
  };

  // Trigger analysis
  const handleConfirmAndAnalyze = () => {
    if (capturedFile && capturedPreview) {
      onImageSelected(capturedFile, capturedPreview);
    }
  };

  // Reset / Retake
  const handleRetake = () => {
    setCapturedPreview(null);
    setCapturedFile(null);
    startCamera(facingMode);
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl p-4 md:p-6 shadow-2xl border border-emerald-500/20">
      {/* Hidden elements */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header Banner */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <Focus className="w-5 h-5 text-emerald-400" />
            {t.scanMyCrop}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hold camera steady over leaf surface for blur-free diagnosis
          </p>
        </div>

        {isCameraActive && (
          <button
            onClick={toggleCameraFacing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-emerald-300 border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t.switchCamera}
          </button>
        )}
      </div>

      {/* Main Viewfinder Box */}
      <div className="relative w-full aspect-[4/3] max-h-[420px] rounded-xl overflow-hidden bg-slate-950 border-2 border-dashed border-slate-700 flex items-center justify-center">
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
            {/* Real-time Focus Reticle Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
              <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-emerald-400/70 rounded-2xl relative animate-pulse-slow">
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-400" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-400" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-400" />
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-scan-radar" />
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
            <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur border border-emerald-500/40 text-emerald-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Image Ready</span>
            </div>
          </div>
        )}

        {/* Idle / Camera Off State */}
        {!isCameraActive && !capturedPreview && (
          <div className="text-center p-6 space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
              <Camera className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                {t.cameraPreview}
              </h3>
              <p className="text-xs text-slate-400">
                Launch camera or select photo from storage to begin high-accuracy detection.
              </p>
            </div>

            {cameraError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-start gap-2 text-left">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* State 1: Camera is Active */}
        {isCameraActive && (
          <button
            onClick={capturePhoto}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Camera className="w-4 h-4" />
            {t.capturePhoto}
          </button>
        )}

        {/* State 2: Photo is Captured & Ready */}
        {!isCameraActive && capturedPreview && (
          <>
            <button
              onClick={handleRetake}
              disabled={isAnalyzing}
              className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t.retake}
            </button>
            <button
              onClick={handleConfirmAndAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-1/2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              {isAnalyzing ? t.analyzingText : t.analyzeNow}
            </button>
          </>
        )}

        {/* State 3: Idle / Start Options */}
        {!isCameraActive && !capturedPreview && (
          <>
            <button
              onClick={() => startCamera('environment')}
              className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4" />
              {t.scanNow}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              {t.uploadGallery}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
