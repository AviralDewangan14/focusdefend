"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Pencil, Star, List, User, Play, ArrowRight, ShieldCheck } from "lucide-react";

const BottomNav = ({ active }: { active: "home" | "study" }) => (
  <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#0c101c]/95 backdrop-blur-xl border-t border-white/10 flex justify-between items-start px-6 pt-3.5 z-40">
    <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active === 'home' ? 'text-indigo-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}>
      <Home size={20} className={active === 'home' ? 'fill-indigo-400/20' : ''} />
      <span className="text-[10px]">Home</span>
    </div>
    <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active === 'study' ? 'text-indigo-400 font-bold' : 'text-gray-500 hover:text-gray-300'}`}>
      <Pencil size={20} className={active === 'study' ? 'fill-indigo-400/20' : ''} />
      <span className="text-[10px]">Study</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 cursor-pointer">
      <Star size={20} />
      <span className="text-[10px]">Rewards</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 cursor-pointer">
      <List size={20} />
      <span className="text-[10px]">Progress</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 cursor-pointer">
      <User size={20} />
      <span className="text-[10px]">Settings</span>
    </div>
  </div>
);

const QuizScreen = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="absolute inset-0 flex flex-col pt-16 px-6 pb-24 text-white bg-[#070a14]"
  >
    <div className="flex justify-between items-center mb-5 text-[11px] font-mono text-gray-400">
      <span className="px-2.5 py-0.5 rounded-full skeuo-pill text-indigo-300">CBSE Class 10 PYQ</span>
      <span className="font-semibold text-gray-300">Q 2 / 9</span>
    </div>

    <h2 className="text-[19px] font-bold mb-6 leading-[1.3] text-gray-100">
      What is the tone of the story about the doctor, the snake, and the mirror?
    </h2>

    <div className="flex flex-col gap-2.5 relative">
      <div className="p-4 rounded-2xl skeuo-card border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all">
        <span className="text-[14px] font-medium text-gray-200">Serious and frightening</span>
        <span className="w-4 h-4 rounded-full border border-white/20" />
      </div>

      <div className="p-4 rounded-2xl skeuo-card border-emerald-500/50 bg-emerald-950/20 flex items-center justify-between cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]">
        <span className="text-[14px] font-bold text-emerald-400">Humorous and lighthearted</span>
        <span className="w-4 h-4 rounded-full skeuo-led-green" />
      </div>

      <div className="p-4 rounded-2xl skeuo-card border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all">
        <span className="text-[14px] font-medium text-gray-200">Sad and melancholic</span>
        <span className="w-4 h-4 rounded-full border border-white/20" />
      </div>

      <div className="p-4 rounded-2xl skeuo-card border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all">
        <span className="text-[14px] font-medium text-gray-200">Angry and aggressive</span>
        <span className="w-4 h-4 rounded-full border border-white/20" />
      </div>

      {/* Tactile Push Button - No redundant square container */}
      <button className="w-full mt-3 py-3.5 rounded-full skeuo-btn-primary font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer">
        <span>Next Question</span>
        <ArrowRight size={15} />
      </button>
    </div>
  </motion.div>
);

const DashboardScreen = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="absolute inset-0 flex flex-col pt-16 px-6 pb-24 text-white bg-[#070a14]"
  >
    <div className="flex justify-between items-center mb-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">FocusDefend Mobile</span>
        <h2 className="text-[20px] font-extrabold text-white">Student Dashboard</h2>
      </div>
      <div className="w-9 h-9 rounded-full skeuo-btn-secondary flex items-center justify-center text-gray-300">
        <User size={18} />
      </div>
    </div>
    
    {/* Skeuomorphic Student Smartcard */}
    <div className="skeuo-card rounded-[26px] p-6 mb-5 relative overflow-hidden border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.7)]">
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      <div className="absolute -top-6 -right-6 p-4 opacity-5 rotate-12">
        <Star size={110} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300">Active Shield</span>
        </div>
        <span className="text-[10px] font-mono text-gray-400">ID: F3337E</span>
      </div>

      <h3 className="text-[24px] font-extrabold text-white mb-0.5">Mayank Sharma</h3>
      <p className="text-xs text-gray-400 mb-6">Grade 10 • Daily Goal: 45m</p>
      
      <div className="inline-flex items-center gap-2 skeuo-well px-3.5 py-1.5 rounded-full border border-white/10">
        <Star size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
        <span className="text-xs font-bold text-amber-200">5 Focus Credits Earned</span>
      </div>
    </div>
    
    {/* Start Study Mode Tactile Button */}
    <button className="w-full skeuo-btn-emerald text-white rounded-full py-3.5 font-bold flex items-center justify-center gap-2 mb-6 cursor-pointer text-sm shadow-lg">
      <Play size={16} className="fill-white" />
      <span>Start Study Mode</span>
    </button>
    
    {/* Weekly Activity Debossed Well */}
    <div className="skeuo-well p-4 rounded-2xl border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-gray-300">Weekly Study Minutes</h4>
        <span className="text-[10px] font-mono text-emerald-400">Target: 300m</span>
      </div>
      <div className="flex justify-between items-end h-20 pb-2 relative">
        {[20, 45, 10, 60, 30, 0, 0].map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 z-10 flex-1">
            <div 
              className="w-2 rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all"
              style={{ height: `${Math.max(val, 6)}px` }}
            />
            <span className="text-[10px] font-mono text-gray-400">
              {['M','T','W','T','F','S','S'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function CSSPhoneModel() {
  const [screen, setScreen] = useState<"dashboard" | "quiz">("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setScreen(s => s === "dashboard" ? "quiz" : "dashboard");
    }, 5500);
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

          {/* Main Display Area */}
          <div className="flex-1 w-full h-full relative">
            <AnimatePresence mode="wait">
              {screen === "dashboard" ? <DashboardScreen key="dashboard" /> : <QuizScreen key="quiz" />}
            </AnimatePresence>
          </div>
          
          <BottomNav active={screen === 'dashboard' ? 'home' : 'study'} />

          {/* Glare Glass Reflection */}
          <div className="absolute top-0 right-0 w-32 h-64 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-50 rounded-tr-[36px]" />
        </div>
      </div>
    </div>
  );
}

