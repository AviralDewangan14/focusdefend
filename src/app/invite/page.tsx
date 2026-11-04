"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function InviteContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "FSH-INVITE";
  const name = searchParams.get("name") || "Student";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Attempt automatic app launch on mobile
    if (typeof window !== "undefined") {
      const appUrl = `focusdefend://invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}`;
      const timeout = setTimeout(() => {
        window.location.href = appUrl;
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [code, name]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-neutral-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 text-center">
      {/* Halo Emblem */}
      <div className="mx-auto w-20 h-20 rounded-3xl bg-cyan-500/10 border-2 border-cyan-400/50 flex items-center justify-center mb-6 shadow-inner">
        <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>

      <div className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
        Child Device Pairing
      </div>

      <h1 className="text-2xl font-black text-white tracking-tight mb-2">
        Connect with {name}
      </h1>
      <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
        {name} has invited you to connect their device on FocusDefend to supervise screen time, verify focus sessions, and unlock study rewards.
      </p>

      {/* Code Display Capsule */}
      <div className="p-4 mb-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center">
        <span className="text-xs uppercase font-bold text-neutral-500 tracking-wider mb-1">
          Child Invite Code
        </span>
        <span className="text-3xl font-black tracking-widest text-cyan-400 font-mono">
          {code}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <a
          href={`focusdefend://invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}`}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98] text-center"
        >
          Open in FocusDefend App
        </a>

        <button
          onClick={handleCopy}
          className="w-full py-3 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700/80 text-neutral-200 font-bold text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400 font-extrabold">Code Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy Invite Code</span>
            </>
          )}
        </button>

        <a
          href="/FocusDefend.apk"
          download
          className="w-full py-2.5 px-6 rounded-xl text-neutral-400 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Don't have the app? Download APK
        </a>
      </div>

      <div className="mt-6 pt-5 border-t border-white/5 text-[11px] text-neutral-500">
        FocusDefend • Autonomous Study Guardian & Digital Wellbeing
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <Suspense fallback={<div className="text-cyan-400 font-bold">Loading Invitation...</div>}>
        <InviteContent />
      </Suspense>
    </main>
  );
}
