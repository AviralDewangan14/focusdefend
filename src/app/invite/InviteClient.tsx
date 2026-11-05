"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface InviteClientProps {
  initialCode?: string;
  initialName?: string;
  initialRole?: string;
}

export default function InviteClient({
  initialCode,
  initialName,
  initialRole,
}: InviteClientProps) {
  const searchParams = useSearchParams();

  const code = searchParams.get("code") || initialCode || "FSH-INVITE";
  const name = searchParams.get("name") || initialName || "Student";
  const role = searchParams.get("role") || initialRole || "";

  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const isParent =
    role.toLowerCase() === "parent" || code.toUpperCase().startsWith("PAR-");

  const deepLink = `focusdefend://invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}`;
  const qrTargetUrl = `https://focusdefend.vercel.app/invite?code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}`;

  useEffect(() => {
    // Attempt automatic app launch on mobile devices
    if (typeof window !== "undefined") {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        const timeout = setTimeout(() => {
          window.location.href = deepLink;
        }, 900);
        return () => clearTimeout(timeout);
      }
    }
  }, [deepLink]);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 text-center transition-all duration-300">
      {/* Halo Emblem Header */}
      <div className="mx-auto w-20 h-20 rounded-3xl bg-cyan-500/10 border-2 border-cyan-400/50 flex items-center justify-center mb-5 shadow-inner shadow-cyan-500/20 group hover:scale-105 transition-transform">
        <svg
          className="w-10 h-10 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isParent ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          )}
        </svg>
      </div>

      {/* Persona Badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-3.5 py-1 mb-3.5 rounded-full text-xs font-bold tracking-wider uppercase ${
          isParent
            ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
            : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            isParent ? "bg-cyan-400" : "bg-emerald-400"
          }`}
        />
        {isParent ? "Parent Guardian Pairing" : "Child Device Pairing"}
      </div>

      {/* Headline */}
      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
        {isParent ? "Connect with Guardian" : `Connect with ${name}`}
      </h1>

      {/* Subtitle / Explanation */}
      <p className="text-sm text-neutral-400 mb-6 leading-relaxed px-2">
        {isParent
          ? "Your parent has invited you to pair devices on FocusDefend. Linking enables study progress syncing, instant unlocks upon quiz completion, and study rewards."
          : `${name} has invited you to connect their device on FocusDefend to supervise screen time, manage study schedules, and unlock study rewards.`}
      </p>

      {/* Code Display Capsule */}
      <div className="p-4 mb-6 rounded-2xl bg-black/70 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />
        <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-widest mb-1.5">
          {isParent ? "Parent Guardian Code" : "Student Device Code"}
        </span>
        <span className="text-3xl sm:text-4xl font-black tracking-widest text-cyan-400 font-mono select-all">
          {code}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Primary CTA */}
        <a
          href={deepLink}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98] text-center flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Open in FocusDefend App
        </a>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          type="button"
          className="w-full py-3 px-6 rounded-xl bg-neutral-800/90 hover:bg-neutral-700/80 text-neutral-200 font-bold text-sm border border-white/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-emerald-400 font-extrabold">
                Code Copied to Clipboard!
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy Invite Code</span>
            </>
          )}
        </button>

        {/* Toggle QR Code for Desktop / Laptop viewers */}
        <button
          onClick={() => setShowQR(!showQR)}
          type="button"
          className="w-full py-2.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800/80 text-neutral-300 font-medium text-xs border border-white/5 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          {showQR ? "Hide QR Code" : "Scan QR Code on Phone"}
        </button>

        {showQR && (
          <div className="p-4 rounded-2xl bg-neutral-950 border border-cyan-500/20 flex flex-col items-center justify-center animate-fadeIn">
            {/* Styled QR Code */}
            <div className="p-2.5 bg-neutral-900 rounded-xl border border-white/10 shadow-lg mb-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=22d3ee&bgcolor=0a0a0a&data=${encodeURIComponent(
                  qrTargetUrl
                )}`}
                alt="Scan with phone"
                className="w-44 h-44 rounded-lg"
              />
            </div>
            <p className="text-[11px] text-neutral-400">
              Scan with your phone&apos;s camera to connect instantly
            </p>
          </div>
        )}

        {/* Download APK Link */}
        <a
          href="/FocusDefend.apk"
          download
          className="w-full py-2.5 px-6 rounded-xl text-neutral-400 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Don&apos;t have FocusDefend yet? Download APK (v3.5.6)
        </a>
      </div>

      {/* How to Connect Instructions */}
      <div className="mt-6 pt-5 border-t border-white/10 text-left">
        <h3 className="text-xs uppercase font-extrabold text-neutral-300 tracking-wider mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Quick Pairing Instructions:
        </h3>
        <ol className="text-xs text-neutral-400 space-y-1.5 pl-4 list-decimal leading-relaxed">
          {isParent ? (
            <>
              <li>Install and open FocusDefend on the student device.</li>
              <li>
                Navigate to the <strong className="text-neutral-200">Profile / Settings</strong> screen.
              </li>
              <li>
                Under <strong className="text-cyan-400">Link Parent Guardian Code</strong>, paste or enter{" "}
                <span className="font-mono text-cyan-300 font-bold">{code}</span>.
              </li>
              <li>Tap <strong className="text-neutral-200">Link Guardian</strong> to complete pairing!</li>
            </>
          ) : (
            <>
              <li>Install and open FocusDefend on the parent device.</li>
              <li>
                Go to the <strong className="text-neutral-200">Children</strong> management screen.
              </li>
              <li>
                In the invite box, enter student code{" "}
                <span className="font-mono text-cyan-300 font-bold">{code}</span>.
              </li>
              <li>Tap <strong className="text-neutral-200">Link Child</strong> to supervise progress!</li>
            </>
          )}
        </ol>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-500">
        FocusDefend • Autonomous Study Guardian & Digital Wellbeing
      </div>
    </div>
  );
}
