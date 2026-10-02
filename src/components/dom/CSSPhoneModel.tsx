"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Home, 
  Pencil, 
  ShieldAlert, 
  BarChart3, 
  User, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock,
  RotateCcw,
  Star,
  AlertTriangle,
  Cpu,
  Terminal,
  RefreshCw,
  Key,
  Shield,
  DownloadCloud,
  X
} from "lucide-react";
import { useStore } from "@/store/useStore";

const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YouTubeIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

export type MobileScreen = "dashboard" | "intercept" | "quiz" | "youtube" | "progress" | "study" | "wallet" | "protection" | "parent";

interface BottomNavProps {
  active: MobileScreen;
  onNavigate: (screen: MobileScreen) => void;
}

const BottomNav = ({ active, onNavigate }: BottomNavProps) => (
  <div className="absolute bottom-3.5 left-3.5 right-3.5 h-[58px] rounded-[24px] skeuo-floating-dock flex justify-between items-center px-2 z-40">
    <button 
      onClick={() => onNavigate("dashboard")}
      className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        active === 'dashboard' 
          ? 'skeuo-dock-tab-active text-indigo-400 font-bold scale-105' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <Home size={17} className={active === 'dashboard' ? 'fill-indigo-400/20 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''} />
      <span className="text-[9px] mt-0.5 tracking-tight">Home</span>
    </button>

    <button 
      onClick={() => onNavigate("intercept")}
      className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        active === 'intercept' 
          ? 'skeuo-dock-tab-active text-rose-400 font-bold scale-105' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <ShieldAlert size={17} className={active === 'intercept' ? 'fill-rose-400/20 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' : ''} />
      <span className="text-[9px] mt-0.5 tracking-tight">Shield</span>
    </button>

    <button 
      onClick={() => onNavigate("quiz")}
      className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        active === 'quiz' 
          ? 'skeuo-dock-tab-active text-emerald-400 font-bold scale-105' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <Pencil size={17} className={active === 'quiz' ? 'fill-emerald-400/20 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''} />
      <span className="text-[9px] mt-0.5 tracking-tight">Quiz</span>
    </button>

    <button 
      onClick={() => onNavigate("progress")}
      className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        active === 'progress' 
          ? 'skeuo-dock-tab-active text-purple-400 font-bold scale-105' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      <BarChart3 size={17} className={active === 'progress' ? 'fill-purple-400/20 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : ''} />
      <span className="text-[9px] mt-0.5 tracking-tight">Progress</span>
    </button>
  </div>
);

/* SCREEN 1: DASHBOARD */
const DashboardScreen = ({ onNavigate, credits = 5 }: { onNavigate: (screen: MobileScreen) => void; credits?: number }) => {
  const { hasOtaNotification, setOtaModalOpen } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-[#070a14] overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">FocusDefend Mobile</span>
          <h2 className="text-[19px] font-extrabold text-white">Student Dashboard</h2>
        </div>
        <div className="w-8 h-8 rounded-full skeuo-btn-secondary flex items-center justify-center text-gray-300">
          <User size={16} />
        </div>
      </div>

      {/* Live OTA Notification Banner in Dashboard */}
      {hasOtaNotification && (
        <div 
          onClick={() => setOtaModalOpen(true)}
          className="p-3 rounded-2xl skeuo-card border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-indigo-950/30 mb-3.5 flex items-center justify-between cursor-pointer hover:border-emerald-400/60 transition-all shadow-md group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <DownloadCloud size={15} className="animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                v1.3.0 Core Available
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[9.5px] text-gray-300">Special App Access &amp; YouTube Filter</div>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full group-hover:bg-emerald-500/30">
            Install
          </span>
        </div>
      )}
      
      {/* Student Smartcard */}
      <div className="skeuo-card rounded-[24px] p-4 mb-3.5 relative overflow-hidden border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.7)]">
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Active Shield</span>
          </div>
          <span className="text-[9px] font-mono text-gray-400">Special App Access</span>
        </div>

        <h3 className="text-[20px] font-extrabold text-white mb-0.5">Mayank Sharma</h3>
        <p className="text-[10.5px] text-gray-400 mb-3">Grade 10 • Daily Goal: 45m</p>
        
        <div className="inline-flex items-center gap-2 skeuo-well px-3 py-1 rounded-full border border-white/10">
          <Star size={12} className="text-[#fbbf24] fill-[#fbbf24]" />
          <span className="text-xs font-bold text-amber-200">{credits} Focus Credits Earned</span>
        </div>
      </div>
      
      {/* Study Mode Button */}
      <button 
        onClick={() => onNavigate("quiz")}
        className="w-full skeuo-btn-emerald text-white rounded-full py-3 font-bold flex items-center justify-center gap-2 mb-3 cursor-pointer text-xs sm:text-sm shadow-lg"
      >
        <Play size={14} className="fill-white" />
        <span>Start Study Mode</span>
      </button>

      {/* Regain YouTube Feature Card */}
      <div 
        onClick={() => onNavigate("youtube")}
        className="p-3 rounded-2xl skeuo-card border border-red-500/30 bg-red-950/20 mb-3 flex items-center justify-between cursor-pointer hover:border-red-500/50 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shrink-0">
            <YouTubeIcon size={16} className="fill-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              YouTube Smart Filter <span className="text-[8.5px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1.5 py-0.2 rounded-full">Regain</span>
            </div>
            <div className="text-[10px] text-gray-400">Shorts Gated • Study Lectures Free</div>
          </div>
        </div>
        <span className="text-[9.5px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
          Active
        </span>
      </div>

      {/* Restricted App Test Card (Instagram) */}
      <div 
        onClick={() => onNavigate("intercept")}
        className="p-3 rounded-2xl skeuo-card border border-rose-500/30 bg-rose-950/20 mb-3.5 flex items-center justify-between cursor-pointer hover:border-rose-500/50 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-md shrink-0">
            <InstagramIcon size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              Instagram <Lock size={11} className="text-rose-400" />
            </div>
            <div className="text-[10px] text-gray-400">Special App Access Background Popup</div>
          </div>
        </div>
        <span className="text-[9.5px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full">
          Blocked
        </span>
      </div>
      
      {/* Weekly Activity Debossed Well */}
      <div className="skeuo-well p-3 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-1.5">
          <h4 className="text-[10.5px] font-bold text-gray-300">Weekly Study Minutes</h4>
          <span className="text-[9px] font-mono text-emerald-400">Target: 300m</span>
        </div>
        <div className="flex justify-between items-end h-14 pb-1 relative">
          {[20, 45, 10, 60, 30, 0, 0].map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1 z-10 flex-1">
              <div 
                className="w-2 rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all"
                style={{ height: `${Math.max(val, 6)}px` }}
              />
              <span className="text-[9px] font-mono text-gray-400">
                {['M','T','W','T','F','S','S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* SCREEN 2: RESTRICTED APP INTERCEPTED (POPUP WINDOW OVERLAY) */
const RestrictedAppScreen = ({ 
  onNavigate,
  mode = "instagram",
  onModeChange
}: { 
  onNavigate: (screen: MobileScreen) => void;
  mode?: "instagram" | "shorts" | "channel";
  onModeChange?: (mode: "instagram" | "shorts" | "channel") => void;
}) => {
  const [currentMode, setCurrentMode] = useState<"instagram" | "shorts" | "channel">(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const handleSelectMode = (newMode: "instagram" | "shorts" | "channel") => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col pt-16 px-4 pb-24 text-white bg-gradient-to-b from-[#140608] via-[#090b14] to-[#060810] overflow-y-auto"
    >
      {/* Modern Special App Access Badge */}
      <div className="flex flex-col items-center gap-1 mb-4 text-center">
        <div className="flex items-center gap-1.5 text-[9.5px] font-mono uppercase tracking-widest text-emerald-300 skeuo-pill px-3 py-1 rounded-full border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Special App Access: Background Popup Window
        </div>
        <span className="text-[9px] font-mono text-gray-400">
          Zero Accessibility • SYSTEM_ALERT_WINDOW + UsageStats
        </span>
      </div>

      {/* Target Selector Pills */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/5 mb-4 text-[9.5px] font-mono">
        <button
          onClick={() => handleSelectMode("instagram")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            currentMode === "instagram" ? "bg-rose-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Instagram (App)
        </button>
        <button
          onClick={() => handleSelectMode("shorts")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            currentMode === "shorts" ? "bg-red-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Shorts (Regain)
        </button>
        <button
          onClick={() => handleSelectMode("channel")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            currentMode === "channel" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Channel (Regain)
        </button>
      </div>

      {/* App Icon with Lock */}
      <div className="relative mx-auto mb-3">
        {currentMode === "instagram" && (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f97316] via-[#ec4899] to-[#8b5cf6] p-0.5 shadow-[0_12px_30px_rgba(244,63,94,0.35)] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-black/20 flex items-center justify-center">
              <InstagramIcon size={34} className="text-white" />
            </div>
          </div>
        )}
        {currentMode === "shorts" && (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-800 p-0.5 shadow-[0_12px_30px_rgba(239,68,68,0.35)] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-black/20 flex items-center justify-center">
              <YouTubeIcon size={34} className="text-white fill-white" />
            </div>
          </div>
        )}
        {currentMode === "channel" && (
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-600 p-0.5 shadow-[0_12px_30px_rgba(168,85,247,0.35)] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-black/20 flex items-center justify-center">
              <Lock size={30} className="text-white" />
            </div>
          </div>
        )}
        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 border-2 border-[#090b14] flex items-center justify-center text-white shadow-lg">
          <Lock size={12} />
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-[19px] font-extrabold text-white mb-1">
          {currentMode === "instagram" && "Instagram is Paused"}
          {currentMode === "shorts" && "YouTube Shorts Paused"}
          {currentMode === "channel" && "Entertainment Channel Gated"}
        </h2>
        <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
          {currentMode === "instagram" && "Study schedule is in session. Full app distraction paused via Special App Access popup."}
          {currentMode === "shorts" && "Vertical dopamine reel intercepted. Standard study lectures on YouTube remain free to watch!"}
          {currentMode === "channel" && "Non-study entertainment channel is gated. Educational study channels (Physics Wallah, Khan Academy) are open."}
        </p>
      </div>

      {/* Opportunity Box */}
      <div className="skeuo-card p-3.5 rounded-2xl border border-indigo-500/40 bg-indigo-950/20 mb-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1.5 text-indigo-300 font-bold text-xs">
          <Sparkles size={14} className="text-indigo-400" />
          Turn Friction into Learning
        </div>
        <p className="text-[11px] text-gray-300 leading-relaxed mb-2.5">
          Answer 1 curriculum challenge correctly to earn <strong className="text-white">15 minutes</strong> of unrestricted leisure access.
        </p>
        <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400">
          <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-400" /> 15m Screen Time</span>
          <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> +1 Focus Credit</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => onNavigate("quiz")}
          className="w-full py-3 rounded-full skeuo-btn-primary font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-xl"
        >
          <Sparkles size={14} />
          <span>Solve Challenge to Unlock (+15m)</span>
        </button>

        {currentMode !== "instagram" ? (
          <button
            onClick={() => onNavigate("youtube")}
            className="w-full py-2.5 rounded-full skeuo-btn-secondary font-semibold text-xs text-emerald-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Play size={12} className="fill-emerald-400" />
            <span>Return to YouTube Study Lecture</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full py-2.5 rounded-full skeuo-btn-secondary font-semibold text-xs text-gray-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Back to Student Home</span>
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={() => onNavigate("dashboard")}
          className="text-[10px] font-mono text-gray-500 hover:text-gray-400 underline cursor-pointer"
        >
          Emergency Access / Parent Passcode
        </button>
      </div>
    </motion.div>
  );
};

/* SCREEN 3: YOUTUBE SELECTIVE FILTER (REGAIN FEATURE) */
const YouTubeFilterScreen = ({ 
  onNavigate,
  onSelectInterceptMode
}: { 
  onNavigate: (screen: MobileScreen) => void;
  onSelectInterceptMode?: (mode: "instagram" | "shorts" | "channel") => void;
}) => {
  const [shortsBlocked, setShortsBlocked] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col pt-16 px-4 pb-24 text-white bg-gradient-to-b from-[#140608] via-[#090b14] to-[#04060e] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1.5">
            <YouTubeIcon size={13} className="text-red-500 fill-red-500" />
            Regain Selective Filter
          </span>
          <h2 className="text-[18px] font-extrabold text-white">YouTube Selective Shield</h2>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          Special Access
        </span>
      </div>

      {/* Modern Architecture Notice Card */}
      <div className="skeuo-card rounded-2xl p-3 border border-indigo-500/30 bg-indigo-950/20 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold text-indigo-300 uppercase flex items-center gap-1">
            <ShieldCheck size={12} className="text-indigo-400" />
            Zero Accessibility Architecture
          </span>
          <span className="text-[9px] font-mono text-emerald-400 font-bold">0ms Overlay</span>
        </div>
        <p className="text-[10.5px] text-gray-300 leading-snug">
          Uses <strong>Special App Access: &quot;Display popups while in background&quot;</strong> + <strong>UsageStats</strong>. No Accessibility required, &lt;0.8% battery drain.
        </p>
      </div>

      {/* Feature 1: YouTube Shorts Infinite Reel Interceptor */}
      <div className="skeuo-card rounded-2xl p-3.5 border border-rose-500/30 bg-rose-950/20 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <YouTubeIcon size={16} className="fill-red-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">YouTube Shorts Interceptor</h4>
              <span className="text-[9.5px] text-gray-400">Vertical Dopamine Loop</span>
            </div>
          </div>
          <button 
            onClick={() => setShortsBlocked(!shortsBlocked)}
            className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
              shortsBlocked 
                ? "bg-rose-500/30 text-rose-300 border border-rose-500/50" 
                : "bg-gray-800 text-gray-400 border border-white/10"
            }`}
          >
            {shortsBlocked ? "BLOCKED" : "ALLOWED"}
          </button>
        </div>
        <p className="text-[10.5px] text-gray-300 mb-2 leading-relaxed">
          Blocks infinite vertical Shorts reels without blocking normal YouTube lecture playback.
        </p>
        <button
          onClick={() => {
            if (onSelectInterceptMode) onSelectInterceptMode("shorts");
            onNavigate("intercept");
          }}
          className="w-full py-2 rounded-xl skeuo-btn-secondary text-[10.5px] font-semibold text-rose-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Play size={12} className="fill-rose-400" />
          Test Intercepting a YouTube Short
        </button>
      </div>

      {/* Feature 2: Smart Channel Categorization (Allowed vs Gated) */}
      <div className="skeuo-well p-3.5 rounded-2xl border border-white/5 space-y-2.5 mb-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-400" />
            Channel Study Whitelist vs Distraction
          </h4>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
            Regain Logic
          </span>
        </div>

        {/* Study Channels (Always Whitelisted) */}
        <div className="space-y-1.5">
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            ✓ Whitelisted Study Channels (No Gating)
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <div className="p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Physics Wallah
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Khan Academy
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              NCERT Official
            </div>
            <div className="p-1.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Veritasium STEM
            </div>
          </div>
        </div>

        {/* Distracting Channels (Gated Behind Focus Credits) */}
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          <span className="text-[9.5px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
            ✕ Distracting Channels (Gated / MCQ Required)
          </span>
          <div className="space-y-1 text-[10px]">
            <div className="p-1.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-200 flex items-center justify-between">
              <span>Gaming &amp; Livestreams</span>
              <span className="text-[8.5px] font-mono text-rose-400 font-bold">GATED</span>
            </div>
            <div className="p-1.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-200 flex items-center justify-between">
              <span>Entertainment, Pranks &amp; Vlogs</span>
              <span className="text-[8.5px] font-mono text-rose-400 font-bold">GATED</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (onSelectInterceptMode) onSelectInterceptMode("channel");
            onNavigate("intercept");
          }}
          className="w-full py-2 rounded-xl skeuo-btn-secondary text-[10.5px] font-semibold text-amber-300 hover:text-white flex items-center justify-center gap-1.5 cursor-pointer mt-1"
        >
          <Lock size={12} className="text-amber-400" />
          Test Intercepting a Distracting Channel
        </button>
      </div>

      {/* Return to Dashboard */}
      <button 
        onClick={() => onNavigate("dashboard")}
        className="w-full skeuo-btn-secondary text-gray-300 hover:text-white rounded-full py-2.5 font-semibold text-xs cursor-pointer mt-auto"
      >
        Return to Dashboard
      </button>
    </motion.div>
  );
};

/* SCREEN 3: QUIZ / CHALLENGE PAGE */
const QuizScreen = ({ 
  onNavigate,
  credits = 5,
  onEarnCredits
}: { 
  onNavigate: (screen: MobileScreen) => void;
  credits?: number;
  onEarnCredits?: (amount: number) => void;
}) => {
  const [selected, setSelected] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentCredits, setCurrentCredits] = useState<number>(credits);

  const handleSubmit = () => {
    setSubmitted(true);
    setCurrentCredits((prev) => prev + 1);
    if (onEarnCredits) {
      onEarnCredits(1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-[#070a14] overflow-y-auto animate-quiz-start"
    >
      {/* Top Challenge Header Well */}
      <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-gray-300">
        <span className="px-2.5 py-1 rounded-full skeuo-pill text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full skeuo-led-green animate-pulse" />
          CBSE Class 10 PYQ
        </span>
        <span className="font-semibold text-emerald-400 flex items-center gap-1 skeuo-well px-2.5 py-1 rounded-md border border-emerald-500/30">
          <Clock size={11} className="text-emerald-400" /> 00:48s
        </span>
      </div>

      <div className="mb-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Challenge 1 of 1</span>
          <span className="text-[10px] font-mono text-amber-300 font-bold">+1 Credit Reward</span>
        </div>
        <h2 className="text-[16px] font-bold leading-snug text-gray-100 mt-1">
          What is the tone of the story about the doctor, the snake, and the mirror?
        </h2>
      </div>

      <div className="flex flex-col gap-2 relative mb-3">
        {[
          "Serious and frightening",
          "Humorous and lighthearted",
          "Sad and melancholic",
          "Angry and aggressive"
        ].map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === 1;

          return (
            <div 
              key={idx}
              onClick={() => !submitted && setSelected(idx)}
              className={`p-3 rounded-xl skeuo-card flex items-center justify-between cursor-pointer transition-all ${
                isSelected 
                  ? "border-emerald-500/80 bg-[#0e1f18] shadow-[0_4px_16px_rgba(16,185,129,0.3)] translate-y-[1px]" 
                  : "border-white/10 hover:border-white/20 active:translate-y-[1px]"
              }`}
            >
              <span className={`text-[12.5px] font-medium ${isSelected ? "text-emerald-300 font-bold" : "text-gray-200"}`}>
                {option}
              </span>
              <span className={`w-3.5 h-3.5 rounded-full ${isSelected ? "skeuo-led-green" : "border border-white/20"}`} />
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className="p-4 rounded-2xl skeuo-card border border-amber-500/50 bg-[#12111d] text-center animate-quiz-start relative overflow-hidden mt-auto">
          {/* 3D Minted Focus Credit Coin with glowing ring */}
          <div className="relative mb-2.5 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full skeuo-coin flex items-center justify-center animate-coin-stamp text-amber-950 font-black text-xl shadow-2xl">
              <Star size={24} className="text-amber-950 fill-amber-950 drop-shadow" />
            </div>
            <div className="absolute inset-0 rounded-full animate-credit-ring pointer-events-none" />
          </div>

          <div className="text-sm font-extrabold text-amber-300 font-mono tracking-wider mb-0.5 animate-ticker">
            +1 FOCUS CREDIT MINTED!
          </div>
          
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
            <CheckCircle2 size={14} /> Correct Answer! +15 Mins Unlocked
          </div>

          <div className="skeuo-well px-3 py-1.5 rounded-full text-[10.5px] font-mono text-gray-300 mb-3 border border-white/10 inline-flex items-center gap-2">
            <span>New Balance:</span>
            <span className="text-amber-300 font-bold font-mono">{currentCredits} Credits</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button 
              onClick={() => onNavigate("dashboard")}
              className="py-2.5 rounded-full skeuo-btn-emerald font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Dashboard</span>
              <ArrowRight size={13} />
            </button>
            <button 
              onClick={() => onNavigate("wallet")}
              className="py-2.5 rounded-full skeuo-btn-secondary font-bold text-xs text-amber-300 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Wallet</span>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-full skeuo-btn-emerald font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-auto active:translate-y-[2px]"
        >
          <span>Submit & Claim Screen Time</span>
          <ArrowRight size={15} />
        </button>
      )}

      {/* AI Evaluator Badge */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-400">
        <Sparkles size={11} className="text-indigo-400" />
        Evaluated in Real-Time by FocusDefend AI
      </div>
    </motion.div>
  );
};

/* SCREEN 4: PROGRESS & ANALYTICS */
const ProgressScreen = ({ onNavigate }: { onNavigate: (screen: MobileScreen) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.25 }}
    className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-[#070a14] overflow-y-auto"
  >
    <div className="flex justify-between items-center mb-5">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Telemetry & Analytics</span>
        <h2 className="text-[19px] font-extrabold text-white">Study Progress</h2>
      </div>
      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full skeuo-pill text-[10px] font-mono text-amber-300 border-amber-500/30">
        <Flame size={12} className="text-amber-400 fill-amber-400" /> 7 Days Streak
      </div>
    </div>

    {/* Metric Overview Grid */}
    <div className="grid grid-cols-2 gap-2.5 mb-4">
      <div className="skeuo-well p-3.5 rounded-2xl">
        <span className="text-[9.5px] font-mono text-gray-400 uppercase">Focus Time</span>
        <div className="text-[18px] font-extrabold text-white mt-0.5">18h 40m</div>
        <span className="text-[9px] text-emerald-400 font-mono">+24% vs last week</span>
      </div>
      <div className="skeuo-well p-3.5 rounded-2xl">
        <span className="text-[9.5px] font-mono text-gray-400 uppercase">Distractions Gated</span>
        <div className="text-[18px] font-extrabold text-rose-400 mt-0.5">38 Apps</div>
        <span className="text-[9px] text-gray-400 font-mono">2h 45m saved</span>
      </div>
    </div>

    {/* Subject Mastery Console */}
    <div className="skeuo-card p-4 rounded-2xl border border-white/10 mb-4 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-gray-200">Subject Mastery Accuracy</h4>
        <span className="text-[10px] font-mono text-indigo-400">Class 10 CBSE</span>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-gray-300">Science (Physics & Bio)</span>
            <span className="font-mono text-emerald-400 font-bold">94%</span>
          </div>
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "94%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-gray-300">Mathematics</span>
            <span className="font-mono text-indigo-400 font-bold">88%</span>
          </div>
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: "88%" }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-gray-300">English Literature</span>
            <span className="font-mono text-purple-400 font-bold">82%</span>
          </div>
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }} />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Intercept Log */}
    <div className="skeuo-well p-3.5 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-[11px] font-bold text-gray-300">Recent Interceptions</h4>
        <span className="text-[9px] font-mono text-gray-400">Today</span>
      </div>
      <div className="space-y-2 text-[11px]">
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5"><InstagramIcon size={13} className="text-pink-400" /> Instagram</span>
          <span className="text-emerald-400 font-mono">+15m earned</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-1.5"><Lock size={13} className="text-rose-400" /> YouTube Shorts</span>
          <span className="text-gray-400 font-mono">Blocked</span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* SCREEN 5: UNIVERSAL STUDY MODE */
const StudyScreen = ({ onNavigate }: { onNavigate: (screen: MobileScreen) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.25 }}
    className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-gradient-to-b from-[#081512] via-[#060b14] to-[#04060e] overflow-y-auto"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full skeuo-pill text-[10px] font-mono text-emerald-300 border-emerald-500/30">
        <span className="w-2 h-2 rounded-full skeuo-led-green animate-pulse" />
        STUDY SESSION ACTIVE
      </div>
      <span className="text-[10px] font-mono text-gray-400">Class 10 CBSE</span>
    </div>

    {/* Timer Wheel Display */}
    <div className="skeuo-card rounded-[28px] p-5 mb-4 text-center relative overflow-hidden border border-emerald-500/20 shadow-[0_16px_36px_rgba(0,0,0,0.7)]">
      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Deep Focus Timer</span>
      <div className="text-[36px] font-extrabold text-white my-1 font-mono tracking-tight">32:45</div>
      <p className="text-[11px] text-gray-400">Target Session: 45 Minutes</p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-black/60 rounded-full mt-3 overflow-hidden border border-white/5">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "72%" }} />
      </div>
    </div>

    {/* Subject & Topic */}
    <div className="skeuo-well p-3.5 rounded-2xl mb-4 border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9.5px] font-mono uppercase text-gray-400">Current Focus</span>
        <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">Physics</span>
      </div>
      <h3 className="text-sm font-bold text-white">Light: Reflection & Refraction</h3>
      <p className="text-[10.5px] text-gray-400 mt-0.5">NCERT Chapter 10 • 3 PYQs Completed</p>
    </div>

    {/* Distractions Gated Badge */}
    <div className="p-3 rounded-2xl skeuo-card border border-white/10 bg-white/[0.02] flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <ShieldCheck size={16} />
        </div>
        <div>
          <div className="text-xs font-bold text-white">38 Distractions Gated</div>
          <div className="text-[9.5px] text-gray-400">Instagram, YouTube, Discord muted</div>
        </div>
      </div>
      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
        Enforced
      </span>
    </div>

    {/* End Session Button */}
    <button 
      onClick={() => onNavigate("dashboard")}
      className="w-full skeuo-btn-secondary text-gray-300 hover:text-white rounded-full py-3 font-semibold text-xs cursor-pointer mt-auto"
    >
      Pause / End Study Session
    </button>
  </motion.div>
);

/* SCREEN 6: REWARDS WALLET */
const WalletScreen = ({ onNavigate, credits = 5 }: { onNavigate: (screen: MobileScreen) => void; credits?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.25 }}
    className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-gradient-to-b from-[#141006] via-[#0b0c16] to-[#04060e] overflow-y-auto"
  >
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Ledger & Vault</span>
        <h2 className="text-[19px] font-extrabold text-white">Rewards Wallet</h2>
      </div>
      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
        Sync Active
      </span>
    </div>

    {/* Balance Card */}
    <div className="skeuo-card rounded-[26px] p-5 mb-4 relative overflow-hidden border border-amber-500/30 shadow-[0_16px_36px_rgba(0,0,0,0.7)] bg-gradient-to-br from-amber-950/20 to-transparent">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300">Available Balance</span>
        <Star size={16} className="text-amber-400 fill-amber-400" />
      </div>
      <div className="text-[32px] font-extrabold text-white font-mono tracking-tight">{credits} <span className="text-sm font-sans font-normal text-amber-200">Focus Credits</span></div>
      <p className="text-[10px] text-gray-400 mt-1">1 Credit = 15 Minutes Unrestricted Access</p>
      
      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px]">
        <span className="text-gray-400">Screen Time Pool</span>
        <span className="text-emerald-400 font-bold font-mono">15m Active Right Now</span>
      </div>
    </div>

    {/* Earning / Redemption History */}
    <div className="skeuo-well p-3.5 rounded-2xl mb-4 border border-white/5 space-y-2.5">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-gray-200">Transaction History</h4>
        <span className="text-[9px] font-mono text-gray-400">CBSE Term 1</span>
      </div>

      <div className="space-y-2 text-[10.5px]">
        <div className="flex items-center justify-between text-gray-300">
          <div>
            <div className="font-semibold text-white">Science PYQ Completed</div>
            <div className="text-[9px] text-gray-500">Today, 12:40 PM</div>
          </div>
          <span className="text-emerald-400 font-mono font-bold">+1 Credit</span>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <div>
            <div className="font-semibold text-white">English Literature Challenge</div>
            <div className="text-[9px] text-gray-500">Today, 11:15 AM</div>
          </div>
          <span className="text-emerald-400 font-mono font-bold">+1 Credit</span>
        </div>

        <div className="flex items-center justify-between text-gray-300">
          <div>
            <div className="font-semibold text-white">Instagram Leisure Unlock</div>
            <div className="text-[9px] text-gray-500">Yesterday, 07:30 PM</div>
          </div>
          <span className="text-rose-400 font-mono font-bold">-1 Credit</span>
        </div>
      </div>
    </div>

    {/* Redeem CTA */}
    <button 
      onClick={() => onNavigate("quiz")}
      className="w-full skeuo-btn-emerald text-white rounded-full py-3.5 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-auto"
    >
      <Sparkles size={14} />
      <span>Solve PYQ to Earn More Credits</span>
    </button>
  </motion.div>
);

/* SCREEN 7: PROTECTION SETUP & VULNERABILITY REMEDIATION HUB */
const ProtectionScreen = ({ onNavigate }: { onNavigate: (screen: MobileScreen) => void }) => {
  const [activeTab, setActiveTab] = useState<"shields" | "audit" | "curfew">("shields");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);

  const securityVulnerabilities = [
    { id: "V01", name: "SpecialAppAccessDaemon", severity: "CRITICAL", vector: "Accessibility Fragility & Battery Drain", patch: "AccessibilityService removed. Replaced with Special App Access ('Display popups while in background') + UsageStats", status: "HARDENED" },
    { id: "V02", name: "SplitScreenInterceptor", severity: "HIGH", vector: "Multi-Window Snapping Race", patch: "Auto-collapses unauthorized split-screen to Home", status: "PATCHED" },
    { id: "V03", name: "Knox DeviceOwner Core", severity: "HIGH", vector: "Safe Mode Boot Bypass", patch: "DISALLOW_SAFE_BOOT hardware lock enforcement", status: "PATCHED" },
    { id: "V04", name: "PiP MediaSession Meter", severity: "MEDIUM", vector: "Background PiP Video Leak", patch: "AudioTrack & MediaSession hardware usage meter", status: "PATCHED" },
    { id: "V05", name: "SQLCipher + Keystore", severity: "MEDIUM", vector: "Root Database Tampering", patch: "AES-256 DB encryption sealed in hardware Keystore", status: "PATCHED" },
    { id: "V06", name: "TrueTime Monotonic Clock", severity: "MEDIUM", vector: "Clock Rollback Glitch", patch: "SystemClock.elapsedRealtime() + signed NTP", status: "PATCHED" },
    { id: "V07", name: "Sticky Foreground Watchdog", severity: "MEDIUM", vector: "OEM Battery Killer Drops", patch: "SPECIAL_USE foreground daemon + auto whitelist", status: "PATCHED" },
    { id: "V08", name: "HMAC Nonce Verifier", severity: "LOW", vector: "Quick-Pass Token Replay", patch: "Cryptographic one-time nonces per unlock session", status: "PATCHED" },
    { id: "V09", name: "Multi-User Profile Shield", severity: "LOW", vector: "Guest Space Sandbox Escape", patch: "DISALLOW_ADD_USER locks guest switching", status: "PATCHED" },
    { id: "V10", name: "Kernel UID UsageStats Hook", severity: "LOW", vector: "Launcher Tile Deep Link Leak", patch: "Low-level process UID poller catches raw intents", status: "PATCHED" },
    { id: "V11", name: "RegainYouTubeFilter", severity: "HIGH", vector: "Shorts & Distracting Channels Loop", patch: "Selective blocker intercepts /shorts/ and gaming channels; whitelists study lectures", status: "PATCHED" },
  ];

  const runAudit = () => {
    setIsAuditing(true);
    setAuditComplete(false);
    setAuditStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAuditStep(step);
      if (step >= securityVulnerabilities.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAuditing(false);
          setAuditComplete(true);
        }, 500);
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col pt-16 px-4 pb-24 text-white bg-gradient-to-b from-[#0e0714] via-[#090b14] to-[#04060e] overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Hardened Security Core</span>
          <h2 className="text-[18px] font-extrabold text-white">Special Access &amp; Shield Hub</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full skeuo-led-green animate-pulse" />
          v1.3.0 CORE
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 mb-3 text-[10px] font-mono">
        <button
          onClick={() => setActiveTab("shields")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            activeTab === "shields" ? "bg-indigo-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Shield Architecture
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            activeTab === "audit" ? "bg-emerald-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Live Penetration Test
        </button>
        <button
          onClick={() => setActiveTab("curfew")}
          className={`flex-1 py-1 rounded-lg text-center font-bold cursor-pointer transition-all ${
            activeTab === "curfew" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
          }`}
        >
          Curfew / Apps
        </button>
      </div>

      {/* TAB 1: 10 SHIELDS OVERVIEW */}
      {activeTab === "shields" && (
        <div className="space-y-2.5">
          {/* Security Score Well */}
          <div className="skeuo-card rounded-2xl p-3.5 border border-emerald-500/30 bg-emerald-950/15">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Zero-Accessibility Architecture: 100%
              </span>
              <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                11/11 Verified
              </span>
            </div>
            <p className="text-[10.5px] text-gray-300 leading-snug">
              AccessibilityService is completely eliminated. Uses Android <strong>Special App Access (&quot;Display popups while in background&quot;)</strong> + <strong>UsageStats</strong>. Sub-0.8% battery drain and zero A11y crash loops.
            </p>
          </div>

          {/* Shields Feed */}
          <div className="skeuo-well p-3 rounded-2xl border border-white/5 space-y-2 max-h-[300px] overflow-y-auto">
            {securityVulnerabilities.map((v) => (
              <div key={v.id} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-gray-400">[{v.id}]</span>
                    {v.name}
                  </span>
                  <span className={`text-[8.5px] font-mono px-1.5 py-0.2 rounded-full border font-bold ${
                    v.severity === "HIGH" 
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40" 
                      : v.severity === "MEDIUM" 
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40" 
                      : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                  }`}>
                    {v.severity}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  Threat: {v.vector}
                </div>
                <div className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                  {v.patch}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE AUDIT & PENETRATION TEST */}
      {activeTab === "audit" && (
        <div className="space-y-3">
          <div className="skeuo-card rounded-2xl p-4 border border-indigo-500/30 bg-indigo-950/20 text-center">
            <div className="w-10 h-10 rounded-full mx-auto skeuo-btn-secondary flex items-center justify-center mb-2 text-indigo-400">
              <Terminal size={20} />
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Automated OS Loophole Verification</h4>
            <p className="text-[10px] text-gray-400 mb-3 max-w-[240px] mx-auto">
              Simulates real-world student bypass vectors to verify zero-leakage defense.
            </p>

            <button
              onClick={runAudit}
              disabled={isAuditing}
              className={`w-full py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2 ${
                isAuditing ? "bg-gray-700 text-gray-300 cursor-not-allowed" : "skeuo-btn-emerald text-white shadow-lg"
              }`}
            >
              <RefreshCw size={13} className={isAuditing ? "animate-spin" : ""} />
              {isAuditing ? `Verifying Vector ${auditStep}/${securityVulnerabilities.length}...` : "Run Live Penetration Test"}
            </button>
          </div>

          {/* Test Logs Console */}
          <div className="skeuo-well p-3 rounded-2xl border border-white/5 space-y-1.5 font-mono text-[10px] max-h-[240px] overflow-y-auto">
            <div className="text-gray-400 text-[9px] pb-1 border-b border-white/5 flex justify-between items-center">
              <span>Security Terminal Log</span>
              <span>Kernel API 35</span>
            </div>

            {securityVulnerabilities.map((v, idx) => {
              const isPassed = auditComplete || auditStep > idx;
              const isCurrent = isAuditing && auditStep === idx;

              return (
                <div key={v.id} className="flex items-center justify-between py-0.5">
                  <span className={`${isPassed ? "text-gray-300" : isCurrent ? "text-amber-300 font-bold" : "text-gray-600"}`}>
                    {v.id}: {v.name}
                  </span>
                  {isPassed && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-[9px]">
                      [BLOCKED] PASS
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-amber-400 animate-pulse text-[9px]">
                      TESTING...
                    </span>
                  )}
                  {!isPassed && !isCurrent && (
                    <span className="text-gray-600 text-[9px]">PENDING</span>
                  )}
                </div>
              );
            })}

            {auditComplete && (
              <div className="mt-2 pt-2 border-t border-emerald-500/30 text-emerald-400 font-bold text-center text-[10.5px]">
                ✓ 10/10 EXPLOITS NEUTRALIZED • ZERO VULNERABILITIES DETECTED
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CURFEW & GUARDED APPS */}
      {activeTab === "curfew" && (
        <div className="space-y-3">
          {/* Family Agreement Curfew */}
          <div className="skeuo-well p-3.5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-1.5">
              <h4 className="text-xs font-bold text-gray-200">Family Agreement Curfew</h4>
              <span className="text-[9px] font-mono text-amber-400">Night Lock</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-2">Device curfew automatically enforces study / sleep block.</p>
            <div className="flex justify-between items-center bg-black/40 p-2 rounded-xl text-[10px] font-mono">
              <span className="text-gray-300">Curfew Window:</span>
              <span className="text-white font-bold">21:30 — 06:00</span>
            </div>
          </div>

          {/* Guarded Apps */}
          <div className="skeuo-well p-3.5 rounded-2xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-xs font-bold text-gray-200">Guarded Apps</h4>
              <span className="text-[9px] font-mono text-gray-400">38 Guarded</span>
            </div>
            <div className="flex justify-between items-center text-[10.5px]">
              <span className="flex items-center gap-1.5"><InstagramIcon size={12} className="text-pink-400" /> Instagram</span>
              <span className="text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">Guarded</span>
            </div>
            <div className="flex justify-between items-center text-[10.5px]">
              <span className="flex items-center gap-1.5"><Lock size={12} className="text-rose-400" /> YouTube Shorts</span>
              <span className="text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">Always Blocked</span>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home */}
      <button 
        onClick={() => onNavigate("dashboard")}
        className="w-full skeuo-btn-secondary text-gray-300 hover:text-white rounded-full py-2.5 font-semibold text-xs cursor-pointer mt-auto"
      >
        Return to Dashboard
      </button>
    </motion.div>
  );
};

/* SCREEN 8: PARENT DASHBOARD & GUARDIAN CONSOLE */
const ParentDashboardScreen = ({ onNavigate }: { onNavigate: (screen: MobileScreen) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.25 }}
    className="absolute inset-0 flex flex-col pt-16 px-5 pb-24 text-white bg-[#070a14] overflow-y-auto"
  >
    <div className="flex justify-between items-center mb-3">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">FocusDefend Guardian</span>
        <h2 className="text-[19px] font-extrabold text-white">Parent Dashboard</h2>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
        <span className="w-2 h-2 rounded-full skeuo-led-green animate-pulse" />
        LIVE SYNC
      </div>
    </div>

    {/* Monitored Ward Smartcard */}
    <div className="skeuo-card rounded-[22px] p-3.5 mb-3 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-[#0e1222]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-indigo-300 text-xs">
            MS
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Mayank Sharma</h4>
            <span className="text-[10px] text-gray-400 font-mono">Galaxy M34 • Grade 10</span>
          </div>
        </div>
        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          Knox Active
        </span>
      </div>

      {/* Today Study vs Leisure Progress Bar */}
      <div className="skeuo-well p-2.5 rounded-xl border border-white/5 mt-1.5">
        <div className="flex justify-between text-[10px] font-mono mb-1">
          <span className="text-indigo-300 font-bold">Focus: 45m</span>
          <span className="text-rose-300">Leisure: 15m / 60m</span>
        </div>
        <div className="w-full h-2 bg-gray-800/80 rounded-full overflow-hidden flex border border-white/5">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-l-full" style={{ width: "75%" }} />
          <div className="h-full bg-rose-500/80" style={{ width: "25%" }} />
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 font-mono mt-1">
          <span>75% Productive Ratio</span>
          <span className="text-emerald-400 font-semibold">+5 Credits Earned</span>
        </div>
      </div>
    </div>

    {/* Quick Parent Guardian Actions */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <button className="skeuo-btn-primary py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-white shadow-md">
        <Clock size={12} className="text-indigo-300" />
        <span>+30m Study Pass</span>
      </button>
      <button className="skeuo-btn-rose py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-white shadow-md">
        <Lock size={12} className="text-rose-200" />
        <span>Instant Guard</span>
      </button>
    </div>

    {/* Live Interception Log Feed */}
    <div className="skeuo-well p-3 rounded-2xl mb-3 border border-white/5 space-y-1.5">
      <div className="flex justify-between items-center mb-0.5">
        <h4 className="text-xs font-bold text-gray-200">Real-Time Intercept Log</h4>
        <span className="text-[9px] font-mono text-gray-400">Today</span>
      </div>
      
      <div className="flex items-center justify-between text-[9.5px] bg-black/30 p-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <div>
            <div className="font-bold text-white">Instagram Gate</div>
            <div className="text-[8.5px] text-gray-400">12:42 PM • Question Solved</div>
          </div>
        </div>
        <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">Unlocked 15m</span>
      </div>

      <div className="flex items-center justify-between text-[9.5px] bg-black/30 p-2 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <div>
            <div className="font-bold text-white">YouTube Shorts</div>
            <div className="text-[8.5px] text-gray-400">11:15 AM • Hard Lock</div>
          </div>
        </div>
        <span className="text-[8.5px] font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">Gate Blocked</span>
      </div>
    </div>

    {/* Family Agreement Status */}
    <div className="skeuo-card rounded-2xl p-2.5 border border-white/10 text-[9.5px] space-y-1 mb-3">
      <div className="flex justify-between font-bold text-gray-200">
        <span>Family Agreement Mode</span>
        <span className="text-emerald-400">Enforced</span>
      </div>
      <p className="text-[9px] text-gray-400">
        PIN requirement enabled for settings modifications and app uninstallation attempts.
      </p>
    </div>

    <button 
      onClick={() => onNavigate("dashboard")}
      className="w-full skeuo-btn-secondary text-gray-300 hover:text-white rounded-full py-2.5 font-semibold text-xs cursor-pointer mt-auto"
    >
      Return to Dashboard
    </button>
  </motion.div>
);

export default function CSSPhoneModel() {
  const [screen, setScreen] = useState<MobileScreen>("dashboard");
  const [interceptMode, setInterceptMode] = useState<"instagram" | "shorts" | "channel">("instagram");
  const [credits, setCredits] = useState<number>(5);
  const [mounted, setMounted] = useState(false);

  const { hasOtaNotification, dismissOtaNotification, setOtaModalOpen } = useStore();

  const handleEarnCredits = (amount: number) => {
    setCredits((prev) => prev + amount);
  };

  useEffect(() => {
    setMounted(true);
    // Cycle through screens every 9 seconds if idle
    const screens: MobileScreen[] = ["dashboard", "intercept", "youtube", "quiz", "progress", "study", "wallet", "protection", "parent"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % screens.length;
      setScreen(screens[idx]);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="relative w-[320px] h-[670px] md:w-[370px] md:h-[770px] mx-auto opacity-0" />;
  }

  return (
    <div className="relative w-[320px] h-[670px] md:w-[370px] md:h-[770px] mx-auto">
      {/* Physical Hardware Volume & Power Rockers */}
      <div className="absolute -left-[14px] top-28 w-[4px] h-12 bg-[#2c3242] rounded-l-md shadow-inner" />
      <div className="absolute -left-[14px] top-44 w-[4px] h-12 bg-[#2c3242] rounded-l-md shadow-inner" />
      <div className="absolute -right-[14px] top-32 w-[4px] h-16 bg-[#2c3242] rounded-r-md shadow-inner" />

      {/* Screen Selector Hardware Pills (Top of Phone for User Control) */}
      <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 z-50 bg-[#0c101d] p-1.5 rounded-full border border-[#27324d] shadow-[0_12px_28px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] text-[9px] font-mono flex-wrap justify-center max-w-[400px]">
        <button
          onClick={() => setScreen("dashboard")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'dashboard' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Home
        </button>
        <button
          onClick={() => setScreen("intercept")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'intercept' ? 'bg-rose-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Intercept
        </button>
        <button
          onClick={() => setScreen("youtube")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'youtube' ? 'bg-red-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          YouTube
        </button>
        <button
          onClick={() => setScreen("quiz")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'quiz' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Quiz
        </button>
        <button
          onClick={() => setScreen("progress")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'progress' ? 'bg-purple-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Progress
        </button>
        <button
          onClick={() => setScreen("study")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'study' ? 'bg-teal-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Study
        </button>
        <button
          onClick={() => setScreen("wallet")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'wallet' ? 'bg-amber-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Wallet
        </button>
        <button
          onClick={() => setScreen("protection")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'protection' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Guard
        </button>
        <button
          onClick={() => setScreen("parent")}
          className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${screen === 'parent' ? 'bg-cyan-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Parent
        </button>
      </div>

      <div className="w-full h-full relative">
        {/* Flagship Titanium Curved Chassis */}
        <div className="absolute inset-0 rounded-[46px] border-[10px] border-[#181d2c] bg-[#070a14] shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col ring-1 ring-white/10">
          
          {/* Punch-hole Camera */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 shadow-[inset_0_0_3px_rgba(255,255,255,0.3)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-900/50 rounded-full" />
          </div>

          {/* Status Bar */}
          <div className="absolute top-4 left-7 z-50 text-[11px] font-mono font-bold text-white/90">13:05</div>
          <div className="absolute top-4 right-7 z-50 flex gap-2 items-center">
            {/* 5G Signal */}
            <div className="flex items-end gap-[2px] h-2.5">
              <div className="w-0.5 h-1 bg-white/90 rounded-full" />
              <div className="w-0.5 h-1.5 bg-white/90 rounded-full" />
              <div className="w-0.5 h-2 bg-white/90 rounded-full" />
              <div className="w-0.5 h-2.5 bg-white/90 rounded-full" />
            </div>
            {/* Battery with green level */}
            <div className="w-5 h-2.5 rounded-[3px] border-[1.5px] border-white/90 p-[1px] relative">
              <div className="w-3.5 h-full bg-emerald-400 rounded-[1px]" />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-white/90 rounded-r-sm" />
            </div>
          </div>

          {/* Android Heads-Up In-Phone Push Notification Banner */}
          <AnimatePresence>
            {hasOtaNotification && (
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                onClick={() => setOtaModalOpen(true)}
                className="absolute top-10 left-3 right-3 z-50 p-2.5 rounded-2xl skeuo-card border border-emerald-500/50 bg-[#091122]/95 shadow-[0_16px_36px_rgba(0,0,0,0.9)] cursor-pointer hover:border-emerald-400/80 transition-all group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-md">
                    <DownloadCloud size={14} className="animate-bounce" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-mono font-bold text-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        FocusDefend System OTA
                      </span>
                      <span className="text-[8.5px] font-mono text-gray-400">Just now</span>
                    </div>
                    <h5 className="text-[11px] font-bold text-white truncate">v1.3.0 Ready: Special App Access</h5>
                    <p className="text-[9px] text-gray-300 leading-tight">YouTube selective filter included • Tap to review &amp; install</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissOtaNotification();
                    }}
                    className="text-gray-400 hover:text-white p-1 cursor-pointer transition-colors"
                    title="Dismiss notification"
                  >
                    <X size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Display Area with Screen Transition */}
          <div className="flex-1 w-full h-full relative">
            <AnimatePresence mode="wait">
              {screen === "dashboard" && <DashboardScreen key="dashboard" onNavigate={setScreen} credits={credits} />}
              {screen === "intercept" && (
                <RestrictedAppScreen 
                  key="intercept" 
                  onNavigate={setScreen} 
                  mode={interceptMode} 
                  onModeChange={setInterceptMode} 
                />
              )}
              {screen === "youtube" && (
                <YouTubeFilterScreen 
                  key="youtube" 
                  onNavigate={setScreen} 
                  onSelectInterceptMode={(m) => {
                    setInterceptMode(m);
                    setScreen("intercept");
                  }} 
                />
              )}
              {screen === "quiz" && <QuizScreen key="quiz" onNavigate={setScreen} credits={credits} onEarnCredits={handleEarnCredits} />}
              {screen === "progress" && <ProgressScreen key="progress" onNavigate={setScreen} />}
              {screen === "study" && <StudyScreen key="study" onNavigate={setScreen} />}
              {screen === "wallet" && <WalletScreen key="wallet" onNavigate={setScreen} credits={credits} />}
              {screen === "protection" && <ProtectionScreen key="protection" onNavigate={setScreen} />}
              {screen === "parent" && <ParentDashboardScreen key="parent" onNavigate={setScreen} />}
            </AnimatePresence>
          </div>
          
          <BottomNav active={screen} onNavigate={setScreen} />

          {/* Glare Glass Reflection */}
          <div className="absolute top-0 right-0 w-32 h-64 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-50 rounded-tr-[36px]" />
        </div>
      </div>
    </div>
  );
}

