"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Shield, Zap, Download, ArrowRight, Sparkles, Smartphone, Check } from 'lucide-react';
import { getPlanById } from '@/lib/pricing-plans';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planId = searchParams.get('plan') || 'pro_annual';
  const orderId = searchParams.get('orderId') || `ord_${Date.now()}`;
  const paymentId = searchParams.get('paymentId') || `pay_${Date.now()}`;
  const isMock = searchParams.get('mock') === 'true';

  const plan = getPlanById(planId);

  return (
    <div className="min-h-screen bg-[#070913] text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/25 via-emerald-950/15 to-transparent pointer-events-none" />

      <div className="max-w-xl w-full mx-auto relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1224] border border-white/10 shadow-2xl relative text-center">
          {/* Top highlight glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

          {/* Icon Badge */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/25 mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>

          {isMock && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono uppercase tracking-wider mb-4">
              <Zap size={12} />
              Sandbox Test Payment Verified
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
            Your <span className="text-indigo-400 font-semibold">{plan.name}</span> membership is now active. All distraction barriers and AI mentor features are unlocked on your devices.
          </p>

          {/* Receipt Card */}
          <div className="p-5 rounded-2xl bg-[#080b17] border border-white/5 text-left mb-8 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Order Reference:</span>
              <span className="text-gray-200">{orderId.slice(0, 18)}...</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Transaction ID:</span>
              <span className="text-gray-200">{paymentId.slice(0, 18)}...</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Plan Type:</span>
              <span className="text-indigo-300 font-bold">{plan.name}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 pt-2 border-t border-white/5">
              <span>Entitlement Status:</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <Check size={14} /> ACTIVE
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            {/* Open in App */}
            <a
              href="focusdefend://subscription/success"
              className="w-full py-4 rounded-2xl font-bold text-center text-sm tracking-wide bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              Open FocusDefend App
            </a>

            {/* Download APK */}
            <a
              href="/FocusDefend.apk"
              download="FocusDefend.apk"
              className="w-full py-3.5 rounded-2xl font-medium text-center text-xs tracking-wide bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download size={15} />
              Download Pro APK (v3.7.5)
            </a>

            <button
              onClick={() => router.push('/')}
              className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-300 transition-colors font-mono cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070913]" />}>
      <SuccessContent />
    </Suspense>
  );
}
