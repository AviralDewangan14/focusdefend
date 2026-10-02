"use client";

import { useState } from "react";
import CSSPhoneModel, { MobileScreen } from "@/components/dom/CSSPhoneModel";
import { 
  Sparkles, 
  Smartphone, 
  ShieldCheck, 
  Flame, 
  Download,
  Home, 
  Pencil, 
  ShieldAlert, 
  BarChart3, 
  User, 
  Play, 
  ArrowRight, 
  Lock, 
  Clock, 
  Star,
  CheckCircle2
} from "lucide-react";

export default function MobileScreensShowcase() {
  const [activeTab, setActiveTab] = useState<MobileScreen | "all">("all");

  return (
    <div className="min-h-screen bg-[#04060e] text-white p-6 md:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full skeuo-pill text-xs font-mono uppercase tracking-widest text-indigo-300 mb-4 border border-indigo-500/30">
          <Smartphone size={14} className="text-indigo-400" />
          FocusDefend Android Mobile App
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
          Native Mobile Application Screens
        </h1>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
          High-fidelity tactile skeuomorphic interfaces for the student experience: from home dashboard and native distraction interception to adaptive quizzes and progress analytics.
        </p>

        {/* View Switcher Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "all" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            All 8 Screens Master Lineup
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "dashboard" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            1. Student Dashboard
          </button>
          <button
            onClick={() => setActiveTab("intercept")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "intercept" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            2. App Intercepted
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "quiz" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            3. Quiz Challenge
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "progress" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            4. Study Progress
          </button>
          <button
            onClick={() => setActiveTab("study")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "study" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            5. Study Mode
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "wallet" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            6. Rewards Wallet
          </button>
          <button
            onClick={() => setActiveTab("protection")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "protection" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            7. Protection Setup
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "parent" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            8. Parent Dashboard
          </button>
          <button
            onClick={() => setActiveTab("youtube")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "youtube" ? "skeuo-btn-primary text-white" : "skeuo-btn-secondary text-gray-300 hover:text-white"
            }`}
          >
            9. YouTube Shield (Regain)
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {/* Screen 1 */}
            <div id="screen-dashboard-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Screen 1</span>
                <h3 className="text-base font-bold text-white">Student Dashboard</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="dashboard" />
              </div>
            </div>

            {/* Screen 2 */}
            <div id="screen-intercept-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider">Screen 2</span>
                <h3 className="text-base font-bold text-white">Restricted App Intercepted</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="intercept" />
              </div>
            </div>

            {/* Screen 3 */}
            <div id="screen-quiz-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Screen 3</span>
                <h3 className="text-base font-bold text-white">Quiz Challenge (PYQ)</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="quiz" />
              </div>
            </div>

            {/* Screen 4 */}
            <div id="screen-progress-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-wider">Screen 4</span>
                <h3 className="text-base font-bold text-white">Progress & Mastery</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="progress" />
              </div>
            </div>

            {/* Screen 5 */}
            <div id="screen-study-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider">Screen 5</span>
                <h3 className="text-base font-bold text-white">Universal Study Mode</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="study" />
              </div>
            </div>

            {/* Screen 6 */}
            <div id="screen-wallet-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">Screen 6</span>
                <h3 className="text-base font-bold text-white">Rewards Wallet</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="wallet" />
              </div>
            </div>

            {/* Screen 7 */}
            <div id="screen-protection-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">Screen 7</span>
                <h3 className="text-base font-bold text-white">Protection & Security</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="protection" />
              </div>
            </div>

            {/* Screen 8 */}
            <div id="screen-parent-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Screen 8</span>
                <h3 className="text-base font-bold text-white">Parent Dashboard</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="parent" />
              </div>
            </div>

            {/* Screen 9 */}
            <div id="screen-youtube-container" className="flex flex-col items-center space-y-3">
              <div className="text-center mb-1">
                <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider">Screen 9</span>
                <h3 className="text-base font-bold text-white">YouTube Selective Shield</h3>
              </div>
              <div className="w-[310px] h-[640px]">
                <SinglePhoneScreen screenType="youtube" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-6">
            <div className="w-[350px] h-[720px]">
              <SinglePhoneScreen screenType={activeTab} />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Return */}
      <div className="mt-16 text-center">
        <a 
          href="/" 
          className="skeuo-btn-secondary px-6 py-2.5 rounded-full text-xs font-mono text-gray-300 hover:text-white inline-flex items-center gap-2 cursor-pointer"
        >
          ← Return to Main Web Landing
        </a>
      </div>
    </div>
  );
}

// Sub-component rendering an isolated titanium phone locked to a specific screen


const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YouTubeIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

function SinglePhoneScreen({ screenType }: { screenType: MobileScreen }) {
  const [selectedOpt, setSelectedOpt] = useState<number>(1);
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  return (
    <div className="w-full h-full relative">
      {/* Titanium Frame */}
      <div className="w-full h-full rounded-[42px] border-[8px] border-[#1a1f30] bg-[#070a14] shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.18)] overflow-hidden flex flex-col relative ring-1 ring-white/10">
        
        {/* Punch-hole Camera */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 shadow-[inset_0_0_2px_rgba(255,255,255,0.3)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-900/50 rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="absolute top-3.5 left-6 z-50 text-[10px] font-mono font-bold text-white/90">13:05</div>
        <div className="absolute top-3.5 right-6 z-50 flex gap-1.5 items-center">
          <div className="flex items-end gap-[1.5px] h-2">
            <div className="w-0.5 h-1 bg-white/90 rounded-full" />
            <div className="w-0.5 h-1.5 bg-white/90 rounded-full" />
            <div className="w-0.5 h-2 bg-white/90 rounded-full" />
          </div>
          <div className="w-4 h-2 rounded-[2px] border border-white/90 p-[1px] relative">
            <div className="w-2.5 h-full bg-emerald-400 rounded-[0.5px]" />
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 w-full h-full relative pt-12 px-4 pb-20 overflow-y-auto">
          {screenType === "dashboard" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400">FocusDefend Mobile</span>
                  <h2 className="text-[17px] font-extrabold text-white">Student Dashboard</h2>
                </div>
                <div className="w-7 h-7 rounded-full skeuo-btn-secondary flex items-center justify-center text-gray-300">
                  <User size={14} />
                </div>
              </div>

              {/* Smartcard */}
              <div className="skeuo-card rounded-[22px] p-4 relative overflow-hidden border border-white/15 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-300">Active Shield</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-400">ID: F3337E</span>
                </div>
                <h3 className="text-[18px] font-extrabold text-white">Mayank Sharma</h3>
                <p className="text-[10px] text-gray-400 mb-3">Grade 10 • Daily Goal: 45m</p>
                <div className="inline-flex items-center gap-1.5 skeuo-well px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-bold text-amber-200">
                  <Star size={12} className="text-amber-400 fill-amber-400" /> 5 Focus Credits
                </div>
              </div>

              {/* Study Mode Button */}
              <div className="w-full skeuo-btn-emerald text-white rounded-full py-3 font-bold flex items-center justify-center gap-2 cursor-pointer text-xs shadow-md">
                <Play size={14} className="fill-white" />
                <span>Start Study Mode</span>
              </div>

              {/* Restricted App Intercept Pill */}
              <div className="p-3 rounded-2xl skeuo-card border border-rose-500/30 bg-rose-950/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center text-white">
                    <InstagramIcon size={14} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white flex items-center gap-1">Instagram <Lock size={10} className="text-rose-400" /></div>
                    <div className="text-[9px] text-gray-400">Scheduled Study Block</div>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded-full">
                  Locked
                </span>
              </div>

              {/* Weekly Activity */}
              <div className="skeuo-well p-3 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-[10px] font-bold text-gray-300">Weekly Minutes</h4>
                  <span className="text-[9px] font-mono text-emerald-400">Target: 300m</span>
                </div>
                <div className="flex justify-between items-end h-14 pb-1">
                  {[20, 45, 10, 60, 30, 0, 0].map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 z-10 flex-1">
                      <div className="w-1.5 rounded-full bg-indigo-500" style={{ height: `${Math.max(val, 6)}px` }} />
                      <span className="text-[8px] font-mono text-gray-400">{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {screenType === "intercept" && (
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-rose-400 skeuo-pill px-2.5 py-0.5 rounded-full mx-auto border-rose-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                FocusDefend Guard Active
              </div>

              <div className="relative mx-auto w-14 h-14">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f97316] via-[#ec4899] to-[#8b5cf6] p-0.5 shadow-lg flex items-center justify-center">
                  <InstagramIcon size={30} className="text-white" />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-600 border-2 border-[#090b14] flex items-center justify-center text-white">
                  <Lock size={11} />
                </div>
              </div>

              <div>
                <h2 className="text-[17px] font-extrabold text-white mb-0.5">Instagram is Paused</h2>
                <p className="text-[10.5px] text-gray-400 leading-relaxed px-2">
                  Study session active. Distractions are paused to protect your retention.
                </p>
              </div>

              <div className="skeuo-card p-3 rounded-2xl border border-indigo-500/40 bg-indigo-950/20 text-left">
                <div className="flex items-center gap-1.5 mb-1 text-indigo-300 font-bold text-[11px]">
                  <Sparkles size={12} className="text-indigo-400" />
                  Turn Friction into Learning
                </div>
                <p className="text-[10px] text-gray-300 leading-relaxed mb-2">
                  Answer 1 question correctly to unlock <strong className="text-white">15 minutes</strong> of Instagram.
                </p>
                <div className="flex items-center gap-3 text-[9px] font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={10} className="text-emerald-400" /> 15m Screen Time</span>
                  <span className="flex items-center gap-1"><Star size={10} className="text-amber-400" /> +1 Credit</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="w-full py-3 rounded-full skeuo-btn-primary font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-lg cursor-pointer">
                  <Sparkles size={13} />
                  <span>Solve Challenge to Unlock (+15m)</span>
                </div>
                <div className="w-full py-2.5 rounded-full skeuo-btn-secondary font-semibold text-[11px] text-gray-300 hover:text-white flex items-center justify-center cursor-pointer">
                  <span>Back to Student Home</span>
                </div>
              </div>
            </div>
          )}

          {screenType === "quiz" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                <span className="px-2 py-0.5 rounded-full skeuo-pill text-indigo-300">Class 10 CBSE PYQ</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1"><Clock size={10} /> 00:48s</span>
              </div>

              <div>
                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400">Challenge 1 of 1</span>
                <h2 className="text-[14px] font-bold leading-snug text-gray-100 mt-0.5">
                  What is the tone of the story about the doctor, the snake, and the mirror?
                </h2>
              </div>

              <div className="space-y-1.5">
                {[
                  "Serious and frightening",
                  "Humorous and lighthearted",
                  "Sad and melancholic",
                  "Angry and aggressive"
                ].map((opt, i) => {
                  const isSel = selectedOpt === i;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedOpt(i)}
                      className={`p-2.5 rounded-xl skeuo-card flex items-center justify-between cursor-pointer transition-all ${
                        isSel ? "border-emerald-500/60 bg-emerald-950/20 shadow-sm" : "border-white/10"
                      }`}
                    >
                      <span className={`text-[11px] ${isSel ? "text-emerald-400 font-bold" : "text-gray-300"}`}>{opt}</span>
                      <span className={`w-3.5 h-3.5 rounded-full ${isSel ? "skeuo-led-green" : "border border-white/20"}`} />
                    </div>
                  );
                })}
              </div>

              {submittedQuiz ? (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 size={13} /> Correct! +15 mins Unlocked
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setSubmittedQuiz(true)}
                  className="w-full py-3 rounded-full skeuo-btn-emerald font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-md cursor-pointer mt-2"
                >
                  <span>Submit & Claim Screen Time</span>
                  <ArrowRight size={13} />
                </div>
              )}

              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-gray-400 pt-1">
                <Sparkles size={10} className="text-indigo-400" /> Evaluated in Real-Time by FocusDefend AI
              </div>
            </div>
          )}

          {screenType === "progress" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400">Telemetry</span>
                  <h2 className="text-[17px] font-extrabold text-white">Study Progress</h2>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full skeuo-pill text-[9px] font-mono text-amber-300">
                  <Flame size={11} className="text-amber-400 fill-amber-400" /> 7 Days Streak
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="skeuo-well p-2.5 rounded-xl">
                  <span className="text-[8.5px] font-mono text-gray-400 uppercase">Focus Time</span>
                  <div className="text-[15px] font-extrabold text-white">18h 40m</div>
                  <span className="text-[8px] text-emerald-400 font-mono">+24% vs last week</span>
                </div>
                <div className="skeuo-well p-2.5 rounded-xl">
                  <span className="text-[8.5px] font-mono text-gray-400 uppercase">Gated Apps</span>
                  <div className="text-[15px] font-extrabold text-rose-400">38 Apps</div>
                  <span className="text-[8px] text-gray-400 font-mono">2h 45m saved</span>
                </div>
              </div>

              <div className="skeuo-card p-3 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-200">
                  <span>Subject Mastery Accuracy</span>
                  <span className="font-mono text-indigo-400">CBSE 10th</span>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div>
                    <div className="flex justify-between text-[9.5px] mb-0.5">
                      <span className="text-gray-300">Science (Physics & Bio)</span>
                      <span className="font-mono text-emerald-400 font-bold">94%</span>
                    </div>
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: "94%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9.5px] mb-0.5">
                      <span className="text-gray-300">Mathematics</span>
                      <span className="font-mono text-indigo-400 font-bold">88%</span>
                    </div>
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: "88%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9.5px] mb-0.5">
                      <span className="text-gray-300">English Literature</span>
                      <span className="font-mono text-purple-400 font-bold">82%</span>
                    </div>
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="skeuo-well p-2.5 rounded-xl border border-white/5 text-[9.5px] space-y-1.5">
                <div className="flex justify-between text-gray-400 font-bold">
                  <span>Recent Interceptions</span>
                  <span>Today</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-1"><InstagramIcon size={11} className="text-pink-400" /> Instagram</span>
                  <span className="text-emerald-400 font-mono">+15m earned</span>
                </div>
                <div className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-1"><Lock size={10} className="text-rose-400" /> YouTube Shorts</span>
                  <span className="text-gray-400 font-mono">Blocked</span>
                </div>
              </div>
            </div>
          )}

          {/* Screen 5: Universal Study Mode */}
          {screenType === "study" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full skeuo-pill text-[9px] font-mono text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full skeuo-led-green animate-pulse" />
                  STUDY ACTIVE
                </div>
                <span className="text-[9px] font-mono text-gray-400">Class 10 CBSE</span>
              </div>

              <div className="skeuo-card rounded-2xl p-4 text-center border border-emerald-500/20 shadow-md">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Deep Focus Timer</span>
                <div className="text-[28px] font-extrabold text-white my-0.5 font-mono">32:45</div>
                <p className="text-[10px] text-gray-400">Target Session: 45 Minutes</p>
                <div className="w-full h-1.5 bg-black/60 rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>

              <div className="skeuo-well p-3 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase text-gray-400">Active Syllabus</span>
                  <span className="text-[8.5px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">Physics</span>
                </div>
                <h4 className="text-xs font-bold text-white">Light: Reflection & Refraction</h4>
                <p className="text-[9.5px] text-gray-400 mt-0.5">NCERT Chapter 10 • 3 PYQs Completed</p>
              </div>

              <div className="p-2.5 rounded-2xl skeuo-card border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={13} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">38 Distractions Gated</div>
                    <div className="text-[8.5px] text-gray-400">Instagram, YouTube, Discord</div>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                  Enforced
                </span>
              </div>
            </div>
          )}

          {/* Screen 6: Rewards Wallet */}
          {screenType === "wallet" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400">Ledger & Vault</span>
                  <h3 className="text-base font-extrabold text-white">Rewards Wallet</h3>
                </div>
                <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                  Sync Active
                </span>
              </div>

              <div className="skeuo-card rounded-2xl p-4 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-transparent">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase text-amber-300">Available Balance</span>
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                </div>
                <div className="text-[26px] font-extrabold text-white font-mono">5 <span className="text-xs font-sans text-amber-200">Credits</span></div>
                <p className="text-[9.5px] text-gray-400 mt-0.5">1 Credit = 15m Leisure Time</p>
                <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-between text-[9px]">
                  <span className="text-gray-400">Screen Time Pool</span>
                  <span className="text-emerald-400 font-bold font-mono">15m Active Right Now</span>
                </div>
              </div>

              <div className="skeuo-well p-3 rounded-2xl border border-white/5 space-y-1.5 text-[9.5px]">
                <div className="flex justify-between font-bold text-gray-300">
                  <span>Transaction History</span>
                  <span className="text-gray-500">CBSE Term 1</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Science PYQ Completed</span>
                  <span className="text-emerald-400 font-mono font-bold">+1 Credit</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>English Literature Check</span>
                  <span className="text-emerald-400 font-mono font-bold">+1 Credit</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Instagram Unlock Claimed</span>
                  <span className="text-rose-400 font-mono font-bold">-1 Credit</span>
                </div>
              </div>
            </div>
          )}

          {/* Screen 7: Protection & Security Setup */}
          {screenType === "protection" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400">Parental Boundaries</span>
                  <h3 className="text-base font-extrabold text-white">Protection Engine</h3>
                </div>
                <div className="w-2 h-2 rounded-full skeuo-led-green" />
              </div>

              <div className="skeuo-card rounded-2xl p-3.5 border border-indigo-500/20 bg-indigo-950/20 text-[9.5px] space-y-1">
                <div className="flex justify-between text-indigo-300 font-bold mb-1">
                  <span>OS Anti-Tamper Core</span>
                  <span className="text-emerald-400">KNOX Verified</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Accessibility Service</span>
                  <span className="text-emerald-400 font-mono font-bold">0ms Intercept</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>UsageStats Monitor</span>
                  <span className="text-emerald-400 font-mono font-bold">Running</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Uninstall Protection</span>
                  <span className="text-emerald-400 font-mono font-bold">Admin Locked</span>
                </div>
              </div>

              <div className="skeuo-well p-3 rounded-2xl border border-white/5 space-y-1 text-[9.5px]">
                <div className="flex justify-between font-bold text-gray-300 mb-0.5">
                  <span>Curfew Window</span>
                  <span className="text-amber-400">Night Lock</span>
                </div>
                <div className="flex justify-between text-gray-300 bg-black/40 p-1.5 rounded-lg font-mono">
                  <span>Bedtime Lock:</span>
                  <span className="text-white font-bold">21:30 — 06:00</span>
                </div>
              </div>

              <div className="skeuo-well p-3 rounded-2xl border border-white/5 space-y-1.5 text-[9.5px]">
                <div className="flex justify-between font-bold text-gray-300">
                  <span>Guarded Apps</span>
                  <span className="text-gray-500">38 Total</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-1"><InstagramIcon size={11} className="text-pink-400" /> Instagram</span>
                  <span className="text-rose-400 font-mono">Guarded</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-1"><Lock size={10} className="text-rose-400" /> YouTube Shorts</span>
                  <span className="text-rose-400 font-mono">Blocked</span>
                </div>
              </div>
            </div>
          )}

          {/* Screen 8: Parent Dashboard & Guardian Console */}
          {screenType === "parent" && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">FocusDefend Guardian</span>
                  <h3 className="text-base font-extrabold text-white">Parent Dashboard</h3>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[8.5px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full skeuo-led-green animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Child Info Card */}
              <div className="skeuo-card rounded-2xl p-2.5 border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-[#0e1222] text-[9.5px]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-indigo-300 text-[10px]">
                      MS
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-white leading-tight">Mayank Sharma</h4>
                      <span className="text-[8.5px] text-gray-400 font-mono">Galaxy M34 • Gr 10</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                    Knox Active
                  </span>
                </div>

                <div className="skeuo-well p-2 rounded-xl border border-white/5">
                  <div className="flex justify-between text-[8.5px] font-mono mb-1">
                    <span className="text-indigo-300 font-bold">Focus: 45m</span>
                    <span className="text-rose-300">Leisure: 15m / 60m</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500" style={{ width: "75%" }} />
                    <div className="h-full bg-rose-500/80" style={{ width: "25%" }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-gray-400 font-mono mt-1">
                    <span>75% Productive Ratio</span>
                    <span className="text-emerald-400 font-bold">+5 Credits</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-1.5">
                <button className="skeuo-btn-primary py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[9px] font-bold text-white shadow">
                  <Clock size={10} className="text-indigo-300" />
                  <span>+30m Pass</span>
                </button>
                <button className="skeuo-btn-rose py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[9px] font-bold text-white shadow">
                  <Lock size={10} className="text-rose-200" />
                  <span>Instant Guard</span>
                </button>
              </div>

              {/* Intercept Feed */}
              <div className="skeuo-well p-2.5 rounded-2xl border border-white/5 space-y-1 text-[9px]">
                <div className="flex justify-between items-center text-gray-300 font-bold text-[9px]">
                  <span>Live Activity Stream</span>
                  <span className="text-gray-500 font-mono text-[8px]">Today</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 p-1.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Instagram Gate</span>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">Unlocked 15m</span>
                </div>
                <div className="flex items-center justify-between bg-black/30 p-1.5 rounded-lg border border-white/5">
                  <span className="font-semibold text-white">YouTube Shorts</span>
                  <span className="text-[8px] font-mono text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded">Hard Blocked</span>
                </div>
              </div>

              {/* Family Agreement */}
              <div className="skeuo-card rounded-xl p-2 border border-white/10 text-[8.5px] text-gray-300">
                <div className="flex justify-between font-bold text-white mb-0.5">
                  <span>Family Agreement</span>
                  <span className="text-emerald-400 font-mono">Enforced</span>
                </div>
                <p className="text-[8px] text-gray-400 leading-snug">Parental PIN required for changes or uninstall.</p>
              </div>
            </div>
          )}

          {/* Screen 9: YouTube Selective Shield (Regain Feature) */}
          {screenType === "youtube" && (
            <div className="space-y-2.5 text-white">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1">
                    <YouTubeIcon size={11} className="text-red-500 fill-red-500" />
                    Regain Selective Filter
                  </span>
                  <h2 className="text-[16px] font-extrabold text-white">YouTube Shield</h2>
                </div>
                <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Special Access
                </span>
              </div>

              {/* Zero Accessibility Architecture Card */}
              <div className="skeuo-card rounded-2xl p-2.5 border border-indigo-500/30 bg-indigo-950/20">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-mono font-bold text-indigo-300 uppercase flex items-center gap-1">
                    <ShieldCheck size={11} className="text-indigo-400" />
                    Zero Accessibility Engine
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400 font-bold">0ms Overlay</span>
                </div>
                <p className="text-[9px] text-gray-300 leading-snug">
                  Special App Access (SYSTEM_ALERT_WINDOW) + UsageStats. &lt;0.8% battery draw.
                </p>
              </div>

              {/* Shorts Interceptor */}
              <div className="skeuo-card rounded-2xl p-2.5 border border-rose-500/30 bg-rose-950/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
                      <YouTubeIcon size={12} className="fill-red-500" />
                    </div>
                    <div>
                      <h4 className="text-[10.5px] font-bold text-white">Shorts Interceptor</h4>
                      <span className="text-[8px] text-gray-400">Vertical Dopamine Feed</span>
                    </div>
                  </div>
                  <span className="bg-rose-500/30 text-rose-300 border border-rose-500/50 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold">
                    BLOCKED
                  </span>
                </div>
                <p className="text-[8.5px] text-gray-300">
                  Blocks infinite vertical Shorts reels without blocking normal study lectures.
                </p>
              </div>

              {/* Channels Whitelist vs Gated */}
              <div className="skeuo-well p-2.5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-white flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-400" />
                    Channel Whitelist
                  </h4>
                  <span className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/30">
                    Regain Logic
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    ✓ Allowed Study Channels
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[8.5px]">
                    <div className="p-1 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate">
                      Physics Wallah
                    </div>
                    <div className="p-1 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 truncate">
                      Khan Academy
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-white/5">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                    ✕ Distracting Channels (Gated)
                  </span>
                  <div className="p-1 rounded bg-rose-950/20 border border-rose-500/20 text-rose-200 text-[8.5px] flex justify-between">
                    <span>Gaming &amp; Entertainment</span>
                    <span className="text-rose-400 font-mono font-bold">GATED</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav: Floating Skeuomorphic Dock */}
        <div className="absolute bottom-3 left-3 right-3 h-[52px] rounded-[22px] skeuo-floating-dock flex justify-between items-center px-2 z-40">
          <div className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            screenType === 'dashboard' 
              ? 'skeuo-dock-tab-active text-indigo-400 font-bold scale-105' 
              : 'text-gray-400 hover:text-gray-200'
          }`}>
            <Home size={15} className={screenType === 'dashboard' ? 'fill-indigo-400/20 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''} />
            <span className="text-[8px] mt-0.5 tracking-tight">Home</span>
          </div>

          <div className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            screenType === 'intercept' 
              ? 'skeuo-dock-tab-active text-rose-400 font-bold scale-105' 
              : 'text-gray-400 hover:text-gray-200'
          }`}>
            <ShieldAlert size={15} className={screenType === 'intercept' ? 'fill-rose-400/20 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]' : ''} />
            <span className="text-[8px] mt-0.5 tracking-tight">Shield</span>
          </div>

          <div className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            screenType === 'quiz' 
              ? 'skeuo-dock-tab-active text-emerald-400 font-bold scale-105' 
              : 'text-gray-400 hover:text-gray-200'
          }`}>
            <Pencil size={15} className={screenType === 'quiz' ? 'fill-emerald-400/20 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''} />
            <span className="text-[8px] mt-0.5 tracking-tight">Quiz</span>
          </div>

          <div className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            screenType === 'progress' 
              ? 'skeuo-dock-tab-active text-purple-400 font-bold scale-105' 
              : 'text-gray-400 hover:text-gray-200'
          }`}>
            <BarChart3 size={15} className={screenType === 'progress' ? 'fill-purple-400/20 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : ''} />
            <span className="text-[8px] mt-0.5 tracking-tight">Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
