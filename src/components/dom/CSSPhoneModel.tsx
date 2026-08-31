"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Pencil, Star, List, User, Play } from "lucide-react";

const BottomNav = ({ active }: { active: "home" | "study" }) => (
  <div className="absolute bottom-0 left-0 right-0 h-[88px] bg-[#121214]/95 backdrop-blur-md border-t border-white/5 flex justify-between items-start px-6 pt-4 z-40">
    <div className={`flex flex-col items-center gap-1.5 ${active === 'home' ? 'text-white' : 'text-gray-500'}`}>
      <Home size={22} className={active === 'home' ? 'fill-white' : ''} />
      <span className="text-[10px] font-medium">Home</span>
    </div>
    <div className={`flex flex-col items-center gap-1.5 ${active === 'study' ? 'text-white' : 'text-gray-500'}`}>
      <Pencil size={22} className={active === 'study' ? 'fill-white' : ''} />
      <span className="text-[10px] font-medium">Study</span>
    </div>
    <div className="flex flex-col items-center gap-1.5 text-gray-500">
      <Star size={22} />
      <span className="text-[10px] font-medium">Rewards</span>
    </div>
    <div className="flex flex-col items-center gap-1.5 text-gray-500">
      <List size={22} />
      <span className="text-[10px] font-medium">Progress</span>
    </div>
    <div className="flex flex-col items-center gap-1.5 text-gray-500">
      <User size={22} />
      <span className="text-[10px] font-medium">Settings</span>
    </div>
  </div>
);

const QuizScreen = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="absolute inset-0 flex flex-col pt-16 px-6 pb-24 text-white bg-[#0c0c0e]"
  >
    <div className="flex justify-between items-center mb-6 text-xs text-gray-400 font-medium tracking-wider">
      <span>PYQ -</span>
      <span>Question 2/9</span>
    </div>
    <h2 className="text-[22px] font-semibold mb-8 leading-[1.3] text-gray-100">
      What is the tone of the story about the doctor, the snake, and the mirror?
    </h2>
    <div className="flex flex-col gap-3 relative">
      <div className="p-5 rounded-3xl border-[1.5px] border-white/10 bg-white/5 flex items-center">
        <span className="text-[15px] font-medium text-gray-200">Serious and frightening</span>
      </div>
      <div className="p-5 rounded-3xl border-[1.5px] border-[#4ade80] bg-[#4ade80]/10 flex items-center">
        <span className="text-[15px] font-medium text-[#4ade80]">Humorous and lighthearted</span>
      </div>
      <div className="p-5 rounded-3xl border-[1.5px] border-white/10 bg-white/5 flex items-center">
        <span className="text-[15px] font-medium text-gray-200">Sad and melancholic</span>
      </div>
      <div className="p-5 rounded-3xl border-[1.5px] border-white/10 bg-white/5 flex items-center">
        <span className="text-[15px] font-medium text-gray-200">Angry and aggressive</span>
      </div>
      
      {/* Ghost Next Button */}
      <div className="mt-6 flex justify-center">
        <div className="text-[#3b82f6] font-bold text-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] opacity-80">Next</div>
      </div>
    </div>
  </motion.div>
);

const DashboardScreen = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="absolute inset-0 flex flex-col pt-16 px-6 pb-24 text-white bg-[#0c0c0e]"
  >
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-[22px] font-bold">Student Home</h2>
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
        <User size={20} className="text-gray-300" />
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-[#1c1c22] to-[#121215] rounded-[32px] p-7 border border-white/10 mb-5 relative overflow-hidden shadow-lg">
      <div className="absolute -top-4 -right-4 p-4 opacity-5 rotate-12">
        <Star size={120} />
      </div>
      <h3 className="text-[28px] font-bold mb-1">Hello, Mayank!</h3>
      <p className="text-sm text-gray-400 mb-8 font-medium">Your 6-Digit Student ID: F3337E</p>
      
      <div className="inline-flex items-center gap-2 bg-[#1a1a24] border border-[#2a2a35] rounded-full px-4 py-2 shadow-inner">
        <Star size={16} className="text-[#fbbf24] fill-[#fbbf24]" />
        <span className="text-sm font-bold text-gray-200">5 Focus Credits</span>
      </div>
    </div>
    
    <button className="w-full bg-[#f8f9fa] text-black rounded-full py-[18px] font-bold flex items-center justify-center gap-2 mb-8 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      <Play size={18} className="fill-black" />
      <span className="text-[17px]">Start Study Mode</span>
    </button>
    
    <div>
      <h4 className="text-[15px] font-bold mb-5 text-gray-300">Weekly Study Activity (Mins)</h4>
      <div className="flex justify-between items-end h-28 pb-3 border-b border-white/10 relative">
        {/* Dotted lines background */}
        <div className="absolute inset-0 flex flex-col justify-between pb-3 pointer-events-none">
          <div className="w-full border-b border-white/5 border-dashed"></div>
          <div className="w-full border-b border-white/5 border-dashed"></div>
          <div className="w-full border-b border-white/5 border-dashed"></div>
        </div>
        {[0, 0, 0, 0, 0, 0, 0].map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-3 z-10">
            <div className="w-2.5 rounded-full bg-white/10 relative" style={{ height: Math.max(val, 6) + 'px' }} />
            <span className="text-[11px] font-semibold text-gray-500">0</span>
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="relative w-[320px] h-[670px] md:w-[370px] md:h-[770px] mx-auto opacity-0" />;
  }

  return (
    <div className="relative w-[320px] h-[670px] md:w-[370px] md:h-[770px] mx-auto">
      <div className="w-full h-full relative">
        <div className="absolute inset-0 rounded-[10px] border-[8px] border-[#18181b] bg-[#0c0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col">
          
          {/* S25 Ultra Punch-hole Camera */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-50 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-900/40 rounded-full" />
          </div>

          {/* Status Bar */}
          <div className="absolute top-4 left-7 z-50 text-[11px] font-semibold text-white/90 tracking-wide">13:05</div>
          <div className="absolute top-4 right-7 z-50 flex gap-1.5 items-center">
            {/* Signal Bars fake */}
            <div className="flex items-end gap-[2px] h-2.5">
              <div className="w-0.5 h-1 bg-white/90 rounded-full" />
              <div className="w-0.5 h-1.5 bg-white/90 rounded-full" />
              <div className="w-0.5 h-2 bg-white/90 rounded-full" />
              <div className="w-0.5 h-2.5 bg-white/90 rounded-full" />
            </div>
            {/* Battery */}
            <div className="w-5 h-2.5 rounded-[3px] border-[1.5px] border-white/90 p-[1px] relative">
              <div className="w-full h-full bg-white/90 rounded-[1px]" />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-white/90 rounded-r-sm" />
            </div>
          </div>

          <div className="flex-1 w-full h-full relative">
            <AnimatePresence mode="wait">
              {screen === "dashboard" ? <DashboardScreen key="dashboard" /> : <QuizScreen key="quiz" />}
            </AnimatePresence>
          </div>
          
          <BottomNav active={screen === 'dashboard' ? 'home' : 'study'} />
          <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none z-50 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}
