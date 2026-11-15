"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Shield, Zap, Check, ArrowLeft, Lock, Sparkles, CreditCard, Smartphone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PRICING_PLANS, PricingPlan, getPlanById } from '@/lib/pricing-plans';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPlanId = searchParams.get('plan') || 'pro_annual';
  const paramUserId = searchParams.get('userId') || '';
  const paramEmail = searchParams.get('email') || '';

  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [selectedGateway, setSelectedGateway] = useState<'razorpay' | 'stripe' | 'mock_sandbox'>('razorpay');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(paramEmail);
  const [userId, setUserId] = useState(paramUserId);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentPlan: PricingPlan = getPlanById(selectedPlanId);

  // Load Razorpay Checkout script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // 1. Create Checkout Order on backend
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: currentPlan.id,
          gateway: selectedGateway,
          userId: userId.trim() || undefined,
          email: email.trim(),
          name: name.trim(),
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order.');
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2A. MOCK / SANDBOX TEST GATEWAY (Instant 1-Click Verification)
      // ───────────────────────────────────────────────────────────────────────
      if (selectedGateway === 'mock_sandbox' || orderData.mockMode) {
        // Complete mock verification
        const verifyRes = await fetch('/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gateway: selectedGateway === 'mock_sandbox' ? 'mock_sandbox' : 'razorpay',
            mockMode: true,
            planId: currentPlan.id,
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_test_${Date.now()}`,
            razorpay_signature: 'test_signature_valid',
            userId: userId.trim() || undefined,
            email: email.trim(),
            name: name.trim(),
            method: 'upi_test',
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          router.push(
            `/checkout/success?plan=${currentPlan.id}&orderId=${orderData.orderId}&paymentId=${verifyData.paymentId}&gateway=${selectedGateway}&mock=true`
          );
          return;
        } else {
          throw new Error(verifyData.error || 'Test payment verification failed.');
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2B. RAZORPAY STANDARD CHECKOUT (UPI, Google Pay, Cards, NetBanking)
      // ───────────────────────────────────────────────────────────────────────
      if (selectedGateway === 'razorpay') {
        if (typeof window.Razorpay === 'undefined') {
          throw new Error('Payment gateway SDK is loading. Please try again in a few seconds.');
        }

        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'FocusDefend',
          description: `${currentPlan.name} Subscription`,
          order_id: orderData.orderId,
          image: '/logo.png',
          prefill: {
            name: name || undefined,
            email: email || undefined,
          },
          theme: {
            color: '#4f46e5',
          },
          handler: async function (response: any) {
            try {
              setLoading(true);
              const verifyRes = await fetch('/api/checkout/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  gateway: 'razorpay',
                  planId: currentPlan.id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: userId.trim() || undefined,
                  email: email.trim(),
                  name: name.trim(),
                  method: 'razorpay_modal',
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                router.push(
                  `/checkout/success?plan=${currentPlan.id}&orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&gateway=razorpay`
                );
              } else {
                setErrorMsg(verifyData.error || 'Payment signature verification failed.');
                setLoading(false);
              }
            } catch (err: any) {
              setErrorMsg(err?.message || 'Verification network error.');
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          setErrorMsg(resp?.error?.description || 'Payment failed or was cancelled.');
          setLoading(false);
        });
        rzp.open();
        return;
      }

      // ───────────────────────────────────────────────────────────────────────
      // 2C. STRIPE REDIRECT (International)
      // ───────────────────────────────────────────────────────────────────────
      if (selectedGateway === 'stripe') {
        if (orderData.checkoutUrl) {
          window.location.href = orderData.checkoutUrl;
          return;
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Payment initiation failed. Please check your network and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back navigation */}
        <button
          onClick={() => router.push('/#pricing')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </button>

        <div className="grid md:grid-cols-12 gap-8">
          {/* LEFT: Plan Selector & Features (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0f1424] border border-indigo-950/70 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
                <Sparkles size={13} />
                Selected Subscription
              </div>

              <h2 className="text-2xl font-black tracking-tight mb-1 text-white">
                {currentPlan.name}
              </h2>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                {currentPlan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-6 p-4 rounded-2xl bg-[#090c17] border border-white/5">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  ₹{currentPlan.amountINR.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-400 text-xs">
                  / {currentPlan.interval === 'year' ? 'year' : 'month'}
                </span>
                <span className="ml-auto text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  (${currentPlan.amountUSD})
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                  Included in this plan:
                </div>
                {currentPlan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Switcher Between Plans */}
            <div className="p-4 rounded-2xl bg-[#0b0e1c] border border-white/5 space-y-2">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-2 px-1">
                Choose Billing Tier:
              </div>
              {(['pro_annual', 'pro_monthly', 'family_annual'] as const).map((pid) => {
                const p = PRICING_PLANS[pid];
                const active = selectedPlanId === pid;
                return (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => setSelectedPlanId(pid)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                      active
                        ? 'bg-indigo-600/15 border-indigo-500/60 text-white'
                        : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-2">
                        {p.name}
                        {p.badge && (
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                            SAVE
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{p.tagline}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      ₹{p.amountINR}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Payment Form & Gateway Selector (7 cols) */}
          <div className="md:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0d1121] border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Shield size={22} className="text-indigo-400" />
                    Secure Checkout
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Instant activation • Cancel anytime • 256-bit encrypted
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Lock size={18} className="text-indigo-400" />
                </div>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>{errorMsg}</div>
                </div>
              )}

              <form onSubmit={handleCheckout} className="space-y-6">
                {/* 1. Account Details */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-widest">
                    Your Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#070a14] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Parent / Account Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#070a14] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="User ID or Invite Code (Optional — for direct sync)"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070a14] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                    />
                    <p className="text-[10px] text-gray-500 mt-1 pl-1">
                      If linked from app, your user ID is automatically synced.
                    </p>
                  </div>
                </div>

                {/* 2. Select Payment Method */}
                <div className="space-y-3 pt-2">
                  <label className="block text-[11px] font-mono text-gray-300 uppercase tracking-widest">
                    Select Payment Gateway
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Razorpay (UPI + Cards) */}
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('razorpay')}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedGateway === 'razorpay'
                          ? 'bg-indigo-600/15 border-indigo-500 ring-1 ring-indigo-500/50'
                          : 'bg-[#070a14] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Smartphone size={20} className={selectedGateway === 'razorpay' ? 'text-indigo-400' : 'text-gray-400'} />
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          Recommended
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">UPI & Cards</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Google Pay, PhonePe, Cards (Razorpay)</div>
                    </button>

                    {/* Stripe (International) */}
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('stripe')}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedGateway === 'stripe'
                          ? 'bg-indigo-600/15 border-indigo-500 ring-1 ring-indigo-500/50'
                          : 'bg-[#070a14] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard size={20} className={selectedGateway === 'stripe' ? 'text-indigo-400' : 'text-gray-400'} />
                        <span className="text-[9px] font-mono text-gray-400">USD</span>
                      </div>
                      <div className="text-xs font-bold text-white">Stripe Global</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Apple Pay, Google Pay, Global Cards</div>
                    </button>

                    {/* Test Sandbox (Instant 1-Click Verification) */}
                    <button
                      type="button"
                      onClick={() => setSelectedGateway('mock_sandbox')}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        selectedGateway === 'mock_sandbox'
                          ? 'bg-indigo-600/15 border-indigo-500 ring-1 ring-indigo-500/50'
                          : 'bg-[#070a14] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Zap size={20} className={selectedGateway === 'mock_sandbox' ? 'text-indigo-400' : 'text-gray-400'} />
                        <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          Test Mode
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">1-Click Sandbox</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Instant test simulation for review</div>
                    </button>
                  </div>
                </div>

                {/* 3. Order Summary & Total */}
                <div className="p-4 rounded-2xl bg-[#070a14] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{currentPlan.name} ({currentPlan.interval})</span>
                    <span>₹{currentPlan.amountINR.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Estimated Tax / GST</span>
                    <span className="text-emerald-400">Included</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Total Amount</span>
                    <span className="text-xl font-extrabold text-white">
                      ₹{currentPlan.amountINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* 4. Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-center text-sm tracking-wide bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>
                        {selectedGateway === 'mock_sandbox'
                          ? `Simulate Payment (₹${currentPlan.amountINR})`
                          : `Pay ₹${currentPlan.amountINR} Securely`}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-gray-500 leading-relaxed">
                  By clicking Pay, you agree to our{' '}
                  <a href="/terms" className="text-gray-400 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-gray-400 hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070913] flex items-center justify-center text-white">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
