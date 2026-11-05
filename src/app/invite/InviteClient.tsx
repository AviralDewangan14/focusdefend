"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface InviteClientProps {
  initialCode?: string;
  initialSenderName?: string;
  initialRecipientName?: string;
  initialRole?: string;
}

export default function InviteClient({
  initialCode,
  initialSenderName,
  initialRecipientName,
  initialRole,
}: InviteClientProps) {
  const searchParams = useSearchParams();

  const code = searchParams.get("code") || initialCode || "FSH-INVITE";
  const rawRole = searchParams.get("role") || searchParams.get("fromRole") || initialRole || "";
  const isParentSender =
    rawRole.toLowerCase() === "parent" || code.toUpperCase().startsWith("PAR-");

  const senderName =
    searchParams.get("from") ||
    searchParams.get("name") ||
    initialSenderName ||
    (isParentSender ? "Parent Guardian" : "Student");

  const recipientName =
    searchParams.get("to") ||
    initialRecipientName ||
    (isParentSender ? "Student" : "Parent Guardian");

  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const deepLink = `focusdefend://invite?code=${encodeURIComponent(code)}&from=${encodeURIComponent(
    senderName
  )}&to=${encodeURIComponent(recipientName)}&role=${isParentSender ? "parent" : "student"}`;

  const qrTargetUrl = `https://focusdefend.vercel.app/invite?code=${encodeURIComponent(
    code
  )}&from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(
    recipientName
  )}&role=${isParentSender ? "parent" : "student"}`;

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
      {/* Dual Persona Header Banner */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          FocusDefend Family Connection
        </div>

        {/* Dual Name Exchange Box */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-3 shadow-inner">
          {/* Sender Column */}
          <div className="flex-1 text-center">
            <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 text-lg">
              {isParentSender ? "🛡️" : "🎓"}
            </div>
            <span className="text-xs uppercase font-extrabold text-cyan-400 block tracking-wider">
              From (Sender)
            </span>
            <span className="text-sm font-black text-white truncate block">
              {senderName}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              {isParentSender ? "Parent Guardian" : "Student Device"}
            </span>
          </div>

          {/* Connection Bridge Arrow */}
          <div className="flex flex-col items-center justify-center px-1">
            <svg
              className="w-6 h-6 text-cyan-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <span className="text-[9px] uppercase font-black text-neutral-500 tracking-widest mt-0.5">
              PAIRED
            </span>
          </div>

          {/* Recipient Column */}
          <div className="flex-1 text-center">
            <div className="w-10 h-10 mx-auto mb-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-lg">
              {isParentSender ? "🎓" : "🛡️"}
            </div>
            <span className="text-xs uppercase font-extrabold text-emerald-400 block tracking-wider">
              To (Invited)
            </span>
            <span className="text-sm font-black text-white truncate block">
              {recipientName}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              {isParentSender ? "Student Device" : "Parent Guardian"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
        Connect {senderName} & {recipientName}
      </h1>

      {/* Subtitle / Explanation */}
      <p className="text-sm text-neutral-300 mb-6 leading-relaxed px-2">
        {isParentSender ? (
          <>
            <strong className="text-cyan-300">{senderName} (Parent Guardian)</strong> has invited{" "}
            <strong className="text-emerald-300">{recipientName}</strong> to link devices on FocusDefend. Linking enables study progress tracking, instant challenge unlocks, and rewards.
          </>
        ) : (
          <>
            <strong className="text-emerald-300">{senderName} (Student)</strong> has invited{" "}
            <strong className="text-cyan-300">{recipientName}</strong> to connect as their supervising Guardian to monitor digital wellbeing and approve unlocks.
          </>
        )}
      </p>

      {/* Code Display Capsule */}
      <div className="p-4 mb-6 rounded-2xl bg-black/75 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 pointer-events-none" />
        <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-widest mb-1.5">
          {isParentSender ? "Parent Guardian Pairing Code" : "Student Device Pairing Code"}
        </span>
        <span className="text-3xl sm:text-4xl font-black tracking-widest text-cyan-400 font-mono select-all">
          {code}
        </span>
        <span className="text-[11px] text-neutral-400 mt-1">
          Valid for: <strong className="text-white">{senderName}</strong> ➔ <strong className="text-white">{recipientName}</strong>
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

        {/* Toggle QR Code for Desktop viewers */}
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
              Scan with your phone&apos;s camera to connect {senderName} and {recipientName}
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
          Don&apos;t have FocusDefend yet? Download APK
        </a>
      </div>

      {/* How to Connect Instructions */}
      <div className="mt-6 pt-5 border-t border-white/10 text-left">
        <h3 className="text-xs uppercase font-extrabold text-neutral-300 tracking-wider mb-2.5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Instructions for {recipientName}:
        </h3>
        <ol className="text-xs text-neutral-400 space-y-1.5 pl-4 list-decimal leading-relaxed">
          {isParentSender ? (
            <>
              <li>Open FocusDefend on <strong className="text-neutral-200">{recipientName}&apos;s</strong> student device.</li>
              <li>
                Navigate to <strong className="text-neutral-200">Profile / Settings</strong> screen.
              </li>
              <li>
                Under <strong className="text-cyan-400">Link Parent Guardian Code</strong>, paste or enter{" "}
                <span className="font-mono text-cyan-300 font-bold">{code}</span>.
              </li>
              <li>Tap <strong className="text-neutral-200">Link Guardian</strong> to link with <strong className="text-cyan-300">{senderName}</strong>!</li>
            </>
          ) : (
            <>
              <li>Open FocusDefend on <strong className="text-neutral-200">{recipientName}&apos;s</strong> parent device.</li>
              <li>
                Go to the <strong className="text-neutral-200">Children</strong> management screen.
              </li>
              <li>
                In the invite box, enter code{" "}
                <span className="font-mono text-cyan-300 font-bold">{code}</span>.
              </li>
              <li>Tap <strong className="text-neutral-200">Link Child</strong> to supervise <strong className="text-emerald-300">{senderName}</strong>!</li>
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
