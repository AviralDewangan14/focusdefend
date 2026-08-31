"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CSSPhoneModel from "./CSSPhoneModel";
import HTMLParticleEngine from "./HTMLParticleEngine";

export default function DOMCinematicScene() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Map scroll progress (0 to 1) across the 8 scenes
  // Scene 1: 0.00 - 0.12 (Center)
  // Scene 2: 0.12 - 0.25 (Right)
  // Scene 3: 0.25 - 0.37 (Left)
  // Scene 4: 0.37 - 0.50 (Center, rotated)
  // Scene 5: 0.50 - 0.62 (Right, flat)
  // Scene 6: 0.62 - 0.75 (Left, 3D tilt)
  // Scene 7: 0.75 - 0.87 (Center, scaled up)
  // Scene 8: 0.87 - 1.00 (Center, fade out)

  const xOffset = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.37, 0.50, 0.62, 0.75, 0.87, 1],
    ["35%", "35%", "-35%", "0%", "25%", "-25%", "0%", "0%", "0%"]
  );

  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "0%"] // Keep vertically centered, the background moves instead
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.37, 0.50, 0.62, 0.75, 0.87, 1],
    [0, 15, -10, 25, 0, 15, -5, 0, 0]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.37, 0.50, 0.62, 0.75, 0.87, 1],
    [-15, -25, 25, 0, -15, 30, 0, 0, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.37, 0.50, 0.62, 0.75, 0.87, 1],
    [1, 0.9, 0.9, 1.1, 0.9, 1, 1.2, 1, 0.8]
  );


  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#02040a] via-[#050816] to-[#0a0f25]">
      <HTMLParticleEngine />
      
      {/* 3D Perspective Container */}
      <div style={{ perspective: "1200px" }} className="w-full h-full flex items-center justify-center">
        <motion.div
          style={{
            x: xOffset,
            y: yOffset,
            rotateX,
            rotateY,
            scale
          }}
          className="inline-block"
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <CSSPhoneModel />
        </motion.div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
