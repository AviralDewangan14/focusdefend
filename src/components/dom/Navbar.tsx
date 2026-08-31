"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div 
        className={`flex items-center justify-between px-6 py-3 w-full max-w-5xl rounded-full border transition-all duration-300 ${
          scrolled 
            ? "bg-background/70 backdrop-blur-md border-border shadow-lg" 
            : "bg-transparent border-transparent"
        }`}
      >
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <img src="/logo.jpg" alt="FocusDefend Logo" className="w-8 h-8 rounded-full object-cover" />
          FocusDefend
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
          <a href="#" className="hover:opacity-100 transition-opacity">Home</a>
          <a href="#how-it-works" className="hover:opacity-100 transition-opacity">How it works</a>
          <a href="#pricing" className="hover:opacity-100 transition-opacity">Pricing</a>
          <a href="#faq" className="hover:opacity-100 transition-opacity">FAQ</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <a href="/FocusShield.apk" download className="relative group overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] inline-block">
            <span className="relative z-10">Download APK</span>
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 skew-x-12" />
          </a>
        </div>
      </div>
    </nav>
  );
}
