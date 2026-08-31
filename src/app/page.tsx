"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import DOMCinematicScene from "@/components/dom/DOMCinematicScene";
import Navbar from "@/components/dom/Navbar";
import Footer from "@/components/dom/Footer";
import SceneOverlays from "@/components/dom/SceneOverlays";
import Pricing from "@/components/dom/Pricing";
import FAQ from "@/components/dom/FAQ";
import Loader from "@/components/dom/Loader";


// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true, // Crucial for mobile scroll tracking
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main id="main-container" ref={containerRef} className="relative min-h-[500vh] bg-background text-foreground">
      <Loader />
      
      {/* Floating Navbar */}
      <Navbar />

      {/* DOM-Based Cinematic Background */}
      <DOMCinematicScene />

      {/* DOM Content Sections layered on top */}
      <div id="scene-overlays" className="relative z-10">
        <SceneOverlays />
      </div>

      {/* Standard DOM sections at the bottom */}
      <div className="relative z-20 bg-[#050816]/90 backdrop-blur-md">
        <Pricing />
        <FAQ />
      </div>
      
      <Footer />
    </main>
  );
}
