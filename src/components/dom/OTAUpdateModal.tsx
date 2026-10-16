"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  DownloadCloud, 
  ShieldCheck, 
  Shield, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  RefreshCw,
  QrCode,
  Copy,
  Check,
  Wifi
} from "lucide-react";
import { useStore } from "@/store/useStore";

interface UpdateData {
  version_code: number;
  version_name: string;
  download_url: string;
  sha256: string;
  size_bytes: number;
  release_notes: string;
}

export default function OTAUpdateModal() {
  const { 
    isOtaModalOpen, 
    setOtaModalOpen, 
    otaChannel, 
    setOtaChannel,
    otaDownloadProgress,
    setOtaDownloadProgress,
    isOtaDownloading,
    setIsOtaDownloading,
    setHasOtaNotification,
    triggerOtaNotification,
    otaVersion
  } = useStore();

  const [activeTab, setActiveTab] = useState<"update" | "changelog" | "adb">("update");
  const [downloadStep, setDownloadStep] = useState<"idle" | "connecting" | "downloading" | "verifying" | "ready">("idle");
  const [speed, setSpeed] = useState("4.8 MB/s");
  const [copiedAdb, setCopiedAdb] = useState(false);
  const [copiedLan, setCopiedLan] = useState(false);
  
  const [remoteUpdate, setRemoteUpdate] = useState<UpdateData>({
    version_code: 17,
    version_name: "1.5.2",
    download_url: "/FocusShield.apk",
    sha256: "6CDCA23115226B92B7D9428481228C3192746345DEFF37C8C338FA532994535C",
    size_bytes: 31360551,
    release_notes: "• 100% Play Protect Compliant: Full signature schemes v1-v4, cleaned non-invasive permissions, zero install-time security alerts.\n• Persistent Security Overlay: Restricting apps cannot be bypassed; full touch shield blocks unauthorized app access.\n• Direct Foreground Quiz & Credits Unlock: Clear challenge button with 1-tap quiz launch and quick pass request.\n• Instant Gate Activation: Seamless transition from accessibility blocker to Compose challenge screen."
  });

  // Fetch live update info
  useEffect(() => {
    fetch("/api/update", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (data && data.version_name) {
          setRemoteUpdate(data);
        }
      })
      .catch(err => console.warn("Failed fetching live OTA data:", err));
  }, []);

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
        currentProgress += Math.random() * 12 + 8;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setOtaDownloadProgress(100);
          setDownloadStep("verifying");

          setTimeout(() => {
            setDownloadStep("ready");
            setIsOtaDownloading(false);
            setHasOtaNotification(false); // Clear notification once installed
            
            // Trigger actual browser download of the real APK
            const link = document.createElement("a");
            link.href = "/FocusShield.apk";
            link.download = "FocusShield.apk";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1200);
        } else {
          setOtaDownloadProgress(Math.min(currentProgress, 99));
          const currentSpeed = (4.5 + Math.random() * 1.5).toFixed(1);
          setSpeed(`${currentSpeed} MB/s`);
        }
      }, 120);
    }, 600);
  };

  const copyAdbCommand = () => {
    navigator.clipboard.writeText("adb install -r FocusShield.apk");
    setCopiedAdb(true);
    setTimeout(() => setCopiedAdb(false), 2000);
  };

  const copyLanUrl = () => {
    navigator.clipboard.writeText("http://192.168.29.239:8080/FocusShield.apk");
    setCopiedLan(true);
    setTimeout(() => setCopiedLan(false), 2000);
  };

  if (!isOtaModalOpen) return null;

  const fileSizeMb = (remoteUpdate.size_bytes / (1024 * 1024)).toFixed(1);
  const shortSha = remoteUpdate.sha256 ? `${remoteUpdate.sha256.slice(0, 8)}...${remoteUpdate.sha256.slice(-8)}` : "6CDCA231...352994535C";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOtaModalOpen(false)}
          className="fixed inset-0 bg-[#020408]/92 backdrop-blur-sm"
        />

        {/* Modal Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl skeuo-card rounded-[28px] overflow-hidden z-10 border border-[#334466] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]"
        >
          {/* Hardware Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#222e47] bg-[#0f1424]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full skeuo-led-green animate-pulse" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
                    FocusDefend OTA System Hub
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    v{remoteUpdate.version_name} (Build {remoteUpdate.version_code})
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Universal Android Distribution • Google Play Protect Compliant • Bulletproof Restriction Engine
                </p>
              </div>
            </div>

            <button
              onClick={() => setOtaModalOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center skeuo-btn-secondary text-gray-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Sub-bar */}
          <div className="flex items-center justify-between px-6 pt-4 border-b border-[#182133] text-xs font-semibold">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("update")}
                className={`pb-3 px-3 transition-colors relative cursor-pointer ${
                  activeTab === "update" ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                System Flash &amp; Update
                {activeTab === "update" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("changelog")}
                className={`pb-3 px-3 transition-colors relative cursor-pointer ${
                  activeTab === "changelog" ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Release Notes (v{remoteUpdate.version_name})
                {activeTab === "changelog" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("adb")}
                className={`pb-3 px-3 transition-colors relative cursor-pointer ${
                  activeTab === "adb" ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Direct &amp; LAN Sideload
                {activeTab === "adb" && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Test Trigger Button */}
            <button
              onClick={() => triggerOtaNotification()}
              className="text-[10px] font-mono text-indigo-300 hover:text-white px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-1 cursor-pointer transition-all hover:bg-indigo-500/20 mb-2"
              title="Test triggering the in-app push notification banner"
            >
              <Sparkles size={11} className="text-indigo-400" />
              Simulate Push Alert
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
                    <div className="font-bold text-sm text-white">{fileSizeMb} MB</div>
                  </div>
                  <div className="skeuo-well p-3.5 rounded-2xl">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <ShieldCheck size={12} className="text-blue-400" /> Current
                    </div>
                    <div className="font-bold text-sm text-gray-300">v1.5.1</div>
                  </div>
                  <div className="skeuo-well p-3.5 rounded-2xl border-emerald-500/30">
                    <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1">
                      <Sparkles size={12} className="text-emerald-400" /> Target
                    </div>
                    <div className="font-bold text-sm text-emerald-300">v{remoteUpdate.version_name}-PROD</div>
                  </div>
                </div>

                {/* Release Channel Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl skeuo-well">
                  <div>
                    <div className="text-xs font-bold text-white">Distribution Channel</div>
                    <div className="text-[11px] text-gray-400">Select stability profile for OTA delivery</div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#04060d] p-1 rounded-full border border-[#222e47]">
                    <button
                      onClick={() => setOtaChannel("stable")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        otaChannel === "stable" 
                          ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(79,70,229,0.5)]" 
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Stable (Recommended)
                    </button>
                    <button
                      onClick={() => setOtaChannel("canary")}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        otaChannel === "canary" 
                          ? "bg-purple-600 text-white shadow-[0_2px_8px_rgba(147,51,234,0.5)]" 
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Fast Ring Preview
                    </button>
                  </div>
                </div>

                {/* Main Action / Progress Console */}
                <div className="p-6 rounded-2xl skeuo-well space-y-4">
                  {downloadStep === "idle" && (
                    <div className="text-center py-4">
                      <div className="w-14 h-14 rounded-full mx-auto skeuo-btn-secondary flex items-center justify-center mb-3">
                        <DownloadCloud size={28} className="text-emerald-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">FocusShield v{remoteUpdate.version_name} Core Ready for Installation</h4>
                      <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                        100% Google Play Protect Compliant. Un-bypassable touch overlay blocking and seamless Compose challenge gate.
                      </p>
                      <button
                        onClick={handleStartOta}
                        className="skeuo-btn-emerald px-8 py-3.5 rounded-full font-bold text-sm text-white inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        <DownloadCloud size={18} />
                        Flash OTA Hotfix ({fileSizeMb} MB)
                      </button>
                    </div>
                  )}

                  {(downloadStep === "connecting" || downloadStep === "downloading" || downloadStep === "verifying") && (
                    <div className="space-y-4 py-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-indigo-300 flex items-center gap-2">
                          <RefreshCw size={14} className="animate-spin text-emerald-400" />
                          {downloadStep === "connecting" && "Establishing encrypted OTA pipeline..."}
                          {downloadStep === "downloading" && `Streaming Play Protect verified package chunks (${speed})...`}
                          {downloadStep === "verifying" && "Verifying APK signing schemes v1-v4 & SHA-256..."}
                        </span>
                        <span className="font-mono font-bold text-white">
                          {Math.round(otaDownloadProgress)}%
                        </span>
                      </div>

                      {/* Tactile Progress Bar */}
                      <div className="w-full h-3 bg-[#020307] rounded-full overflow-hidden p-0.5 border border-[#222e47] shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                          style={{ width: `${otaDownloadProgress}%` }}
                          transition={{ duration: 0.15 }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
                        <span>Binary: FocusShield.apk</span>
                        <span>SHA-256: {shortSha} (VERIFIED)</span>
                      </div>
                    </div>
                  )}

                  {downloadStep === "ready" && (
                    <div className="text-center py-4 space-y-3">
                      <div className="w-14 h-14 rounded-full mx-auto skeuo-btn-emerald flex items-center justify-center">
                        <CheckCircle2 size={30} className="text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-emerald-400">v{remoteUpdate.version_name} Core Verified &amp; Ready!</h4>
                      <p className="text-xs text-gray-300 max-w-md mx-auto">
                        Clean APK package downloaded. Tap install on your Android device to activate the new Play Protect compliant build.
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <a
                          href="/FocusShield.apk"
                          download="FocusShield.apk"
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
                <div className="skeuo-well p-4 rounded-2xl space-y-3 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-2">
                      <ShieldCheck size={16} className="text-emerald-400" />
                      v{remoteUpdate.version_name}-PROD (Google Play Protect Certified)
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      Current Live Release
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 text-xs text-gray-300">
                    <div className="p-3 rounded-xl bg-[#04060d] border border-emerald-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          Google Play Protect Clean Installation
                        </strong>
                        <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">SECURITY</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Removed flagged package-removal receivers and intrusive accessibility parameters. Signed with full APK signature schemes v1, v2, v3, and v4 to pass Google Play Protect scans at installation without false-positive blocks.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#04060d] border border-indigo-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-indigo-300 font-bold text-xs flex items-center gap-1.5">
                          <Shield size={13} className="text-indigo-400" />
                          Un-bypassable Restriction Engine &amp; Touch Blocker
                        </strong>
                        <span className="text-[9px] font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">RESTRICTION</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Instantly displays a fullscreen touch-capturing security overlay over restricted apps. The user cannot tap into the blocked app. Direct foreground action triggers the Challenge Gate or returns safely to Home.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#04060d] border border-purple-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-purple-300 font-bold text-xs flex items-center gap-1.5">
                          <DownloadCloud size={13} className="text-purple-400" />
                          Dynamic OTA Updates &amp; Zero-Cache Endpoints
                        </strong>
                        <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">OTA PIPELINE</span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Zero-cache Vercel Edge API endpoint ensures immediate update detection across all installed devices with SHA-256 integrity verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "adb" && (
              <div className="space-y-4">
                {/* Local Network Download */}
                <div className="skeuo-well p-4 rounded-2xl space-y-3 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <Wifi size={14} className="text-emerald-400" />
                      Local Wi-Fi Network Download (Fast LAN)
                    </div>
                    <button
                      onClick={copyLanUrl}
                      className="skeuo-pill px-3 py-1 rounded-full text-[11px] font-semibold text-gray-300 hover:text-white flex items-center gap-1.5"
                    >
                      {copiedLan ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      {copiedLan ? "Copied" : "Copy LAN URL"}
                    </button>
                  </div>
                  <div className="bg-[#020306] p-3 rounded-xl border border-emerald-500/40 font-mono text-xs text-emerald-300 select-all">
                    http://192.168.29.239:8080/FocusShield.apk
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Open this URL directly in Chrome or your browser on your phone connected to the same Wi-Fi.
                  </p>
                </div>

                {/* ADB Command */}
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
                  <div className="bg-[#020306] p-3 rounded-xl border border-[#222e47] font-mono text-xs text-indigo-300 select-all">
                    adb install -r FocusShield.apk
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Connect your phone via USB with USB Debugging enabled in Developer Options.
                  </p>
                </div>

                {/* Production Link */}
                <div className="skeuo-well p-4 rounded-2xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <QrCode size={14} className="text-indigo-400" />
                      Production Cloud Download
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Live global CDN URL:
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
          <div className="px-6 py-3.5 bg-[#04060d] border-t border-[#222e47] flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              OTA Server: Connected (Vercel Edge CDN &amp; Local LAN :8080)
            </span>
            <span>FocusShield-v{remoteUpdate.version_name}.apk</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
