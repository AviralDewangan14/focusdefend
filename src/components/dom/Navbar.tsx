"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Download, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setOtaModalOpen } = useStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-5 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 w-full max-w-5xl rounded-full transition-all duration-300 ${
          scrolled 
            ? "skeuo-card bg-[#0b0e1b]/85 backdrop-blur-xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.6)]" 
            : "bg-[#0b0e1b]/40 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 font-bold text-base md:text-lg tracking-tight shrink-0 text-white group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 shadow-[0_0_12px_rgba(79,70,229,0.5)]">
            <img src="/logo.jpg" alt="FocusDefend Logo" className="w-full h-full rounded-full object-cover" />
          </div>
          <span className="hidden sm:inline bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            FocusDefend
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* Actions Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Over-The-Air (OTA) Status Pill */}
          <button
            onClick={() => setOtaModalOpen(true)}
            className="skeuo-pill px-3 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
            title="Open FocusDefend OTA System Update Center"
          >
            <span className="w-2 h-2 rounded-full skeuo-led-green animate-pulse" />
            <span className="hidden sm:inline text-[11px] font-mono">OTA v1.2.4</span>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded-full">
              Live
            </span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 rounded-full flex items-center justify-center skeuo-btn-secondary text-gray-300 hover:text-white transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Tactile Download APK Button */}
          <a 
            href="/FocusShield.apk" 
            download="FocusShield.apk" 
            className="skeuo-btn-primary px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs md:text-sm font-semibold text-white inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-lg"
          >
            <Download size={14} className="shrink-0" />
            <span className="hidden sm:inline">Download APK</span>
            <span className="sm:hidden font-mono">APK</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

