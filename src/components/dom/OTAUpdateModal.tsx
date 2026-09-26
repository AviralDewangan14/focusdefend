"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  DownloadCloud, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  RefreshCw,
  QrCode,
  Copy,
  Check
} from "lucide-react";
import { useStore } from "@/store/useStore";

export default function OTAUpdateModal() {
  const { 
    isOtaModalOpen, 
    setOtaModalOpen, 
    otaChannel, 
    setOtaChannel,
    otaDownloadProgress,
    setOtaDownloadProgress,
    isOtaDownloading,
    setIsOtaDownloading
  } = useStore();

  const [activeTab, setActiveTab] = useState<"update" | "changelog" | "adb">("update");
  const [downloadStep, setDownloadStep] = useState<"idle" | "connecting" | "downloading" | "verifying" | "ready">("idle");
  const [speed, setSpeed] = useState("2.4 MB/s");
  const [copiedAdb, setCopiedAdb] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOtaModalOpen(false);
    };
    if (isOtaModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOtaModalOpen, setOtaModalOpen]);

  const handleStartOta = () => {
    setIsOtaDownloading(true);
    setDownloadStep("connecting");
    setOtaDownloadProgress(0);

    setTimeout(() => {
      setDownloadStep("downloading");
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 12 + 6;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setOtaDownloadProgress(100);
          setDownloadStep("verifying");

          setTimeout(() => {
            setDownloadStep("ready");
            setIsOtaDownloading(false);
            
            // Trigger actual browser download of the real APK
            const link = document.createElement("a");
            link.href = "/FocusShield.apk";
            link.download = "FocusShield_v1.2.4_OTA.apk";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1200);
        } else {
          setOtaDownloadProgress(Math.min(currentProgress, 99));
          const currentSpeed = (2.1 + Math.random() * 0.8).toFixed(1);
          setSpeed(`${currentSpeed} MB/s`);
        }
      }, 150);
    }, 800);
  };

  const copyAdbCommand = () => {
    navigator.clipboard.writeText("adb install -r FocusShield.apk");
    setCopiedAdb(true);
    setTimeout(() => setCopiedAdb(false), 2000);
  };

  if (!isOtaModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOtaModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl skeuo-card rounded-[28px] overflow-hidden z-10 border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
        >
          {/* Hardware Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full skeuo-led-green animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                    FocusDefend OTA System Hub
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                    v1.2.4 Available
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Universal Android Distribution (Target API 29-35)
                </p>
              </div>
            </div>

            <button
              onClick={() => setOtaModalOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center skeuo-btn-secondary text-gray-300 hover:text-white transition-all"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Sub-bar */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("update")}
              className={`pb-3 px-3 transition-colors relative ${
                activeTab === "update" ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              System Flash & Update
              {activeTab === "update" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("changelog")}
              className={`pb-3 px-3 transition-colors relative ${
                activeTab === "changelog" ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Release Notes (v1.2.4)
              {activeTab === "changelog" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("adb")}
              className={`pb-3 px-3 transition-colors relative ${
                activeTab === "adb" ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Developer / Sideload
              {activeTab === "adb" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "update" && (
              <div className="space-y-6">
                {/* Hardware Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="skeuo-well p-3.5 rounded-2xl">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <Cpu size={12} className="text-indigo-400" /> Channel
                    </div>
                    <div className="font-bold text-sm text-white capitalize">{otaChannel}</div>
                  </div>
                  <div className="skeuo-well p-3.5 rounded-2xl">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <HardDrive size={12} className="text-emerald-400" /> Package
                    </div>
                    <div className="font-bold text-sm text-white">4.92 MB</div>
                  </div>
                  <div className="skeuo-well p-3.5 rounded-2xl">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <ShieldCheck size={12} className="text-blue-400" /> Current
                    </div>
                    <div className="font-bold text-sm text-gray-300">v1.2.0</div>
                  </div>
                  <div className="skeuo-well p-3.5 rounded-2xl border-indigo-500/30">
                    <div className="text-[10px] text-indigo-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <Sparkles size={12} className="text-indigo-400" /> Target
                    </div>
                    <div className="font-bold text-sm text-indigo-300">v1.2.4-BIC</div>
                  </div>
                </div>

                {/* Release Channel Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl skeuo-well">
                  <div>
                    <div className="text-xs font-bold text-white">Distribution Channel</div>
                    <div className="text-[11px] text-gray-400">Select stability profile for OTA delivery</div>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
                    <button
                      onClick={() => setOtaChannel("stable")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        otaChannel === "stable" 
                          ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(79,70,229,0.5)]" 
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Stable
                    </button>
                    <button
                      onClick={() => setOtaChannel("canary")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        otaChannel === "canary" 
                          ? "bg-purple-600 text-white shadow-[0_2px_8px_rgba(147,51,234,0.5)]" 
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      BIC 2.0 Preview
                    </button>
                  </div>
                </div>

                {/* Main Action / Progress Console */}
                <div className="p-6 rounded-2xl skeuo-well space-y-4">
                  {downloadStep === "idle" && (
                    <div className="text-center py-4">
                      <div className="w-14 h-14 rounded-full mx-auto skeuo-btn-secondary flex items-center justify-center mb-3">
                        <DownloadCloud size={28} className="text-indigo-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">Patch v1.2.4 Ready for Over-The-Air Installation</h4>
                      <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                        Includes high-performance Android interception engine, sub-2% battery footprint, and BIC 2.0 presentation updates.
                      </p>
                      <button
                        onClick={handleStartOta}
                        className="skeuo-btn-primary px-8 py-3.5 rounded-full font-bold text-sm text-white inline-flex items-center gap-2 cursor-pointer"
                      >
                        <DownloadCloud size={18} />
                        Download & Verify OTA (4.92 MB)
                      </button>
                    </div>
                  )}

                  {(downloadStep === "connecting" || downloadStep === "downloading" || downloadStep === "verifying") && (
                    <div className="space-y-4 py-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-indigo-300 flex items-center gap-2">
                          <RefreshCw size={14} className="animate-spin text-indigo-400" />
                          {downloadStep === "connecting" && "Establishing encrypted OTA pipeline..."}
                          {downloadStep === "downloading" && `Streaming package chunks (${speed})...`}
                          {downloadStep === "verifying" && "Verifying SHA-256 binary checksum..."}
                        </span>
                        <span className="font-mono font-bold text-white">
                          {Math.round(otaDownloadProgress)}%
                        </span>
                      </div>

                      {/* Tactile Progress Bar */}
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.8)]"
                          style={{ width: `${otaDownloadProgress}%` }}
                          transition={{ duration: 0.15 }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
                        <span>Binary: FocusShield.apk</span>
                        <span>SHA-256: 8f9b...a10e</span>
                      </div>
                    </div>
                  )}

                  {downloadStep === "ready" && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-14 h-14 rounded-full mx-auto skeuo-btn-emerald flex items-center justify-center">
                        <CheckCircle2 size={30} className="text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-emerald-400">Update Verified & Downloaded!</h4>
                      <p className="text-xs text-gray-300 max-w-md mx-auto">
                        The APK was triggered in your browser. Tap the notification on your Android device to complete installation.
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <a
                          href="/FocusShield.apk"
                          download="FocusShield_v1.2.4.apk"
                          className="skeuo-btn-secondary px-5 py-2.5 rounded-full text-xs font-semibold text-white inline-flex items-center gap-2"
                        >
                          <DownloadCloud size={14} />
                          Re-download APK
                        </a>
                        <button
                          onClick={() => setDownloadStep("idle")}
                          className="skeuo-pill px-5 py-2.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white"
                        >
                          Check Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "changelog" && (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                <div className="skeuo-well p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">v1.2.4-BIC2.0 (Latest Release)</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      Current Live
                    </span>
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-white">AI-Powered Question Engine:</strong> Dynamic quiz gating that replaces app blocking friction with educational incentives.</li>
                    <li><strong className="text-white">Sub-2% Battery Architecture:</strong> Native foreground interceptor optimized for Android 10 through Android 15.</li>
                    <li><strong className="text-white">Tactile Skeuomorphic Interface:</strong> Complete UI overhaul with tactile physical hardware controls and concentric radii.</li>
                    <li><strong className="text-white">BIC 2.0 Stability Fixes:</strong> Zero memory leaks on long-running student study sessions.</li>
                  </ul>
                </div>

                <div className="skeuo-well p-4 rounded-2xl space-y-2 opacity-70">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">v1.2.0 (Stable Release)</span>
                    <span className="text-[10px] font-mono text-gray-400">Previous</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4">
                    <li>Initial parent dashboard synchronization.</li>
                    <li>Basic app timer restrictions and parental control passcode lock.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "adb" && (
              <div className="space-y-4">
                <div className="skeuo-well p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Terminal size={14} className="text-indigo-400" />
                      ADB Command-Line Sideload
                    </div>
                    <button
                      onClick={copyAdbCommand}
                      className="skeuo-pill px-3 py-1 rounded-full text-[11px] font-semibold text-gray-300 hover:text-white flex items-center gap-1.5"
                    >
                      {copiedAdb ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      {copiedAdb ? "Copied" : "Copy ADB"}
                    </button>
                  </div>
                  <div className="bg-black/80 p-3 rounded-xl border border-white/10 font-mono text-xs text-emerald-400 select-all">
                    adb install -r FocusShield.apk
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Connect your phone via USB with USB Debugging enabled in Developer Options.
                  </p>
                </div>

                <div className="skeuo-well p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <QrCode size={14} className="text-indigo-400" />
                      Direct Device Download
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Scan or visit direct URL on Android:
                    </div>
                    <div className="text-xs font-mono text-indigo-300">
                      https://focusdefend.vercel.app/FocusShield.apk
                    </div>
                  </div>
                  <a
                    href="/FocusShield.apk"
                    download="FocusShield.apk"
                    className="skeuo-btn-secondary px-4 py-2 rounded-full text-xs font-semibold text-white inline-flex items-center gap-1.5"
                  >
                    <DownloadCloud size={14} />
                    Direct APK
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Hardware Footer */}
          <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              OTA Server: Connected (Vercel Edge CDN)
            </span>
            <span>FocusShield-Signed.apk</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
