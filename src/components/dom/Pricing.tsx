"use client";

import { motion } from "framer-motion";

const pricingTiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Essential controls for focused learning.",
    features: [
      "2 Restricted Apps",
      "Objective Questions Only",
      "Standard Activity History",
      "Community Support"
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Focus Pro",
    price: "$199",
    period: "/mo",
    description: "Advanced AI learning and unlimited control. ($1,500/year)",
    features: [
      "Unlimited Restricted Apps",
      "Subjective Questions",
      "Advanced AI Evaluator",
      "Advanced Analytics Dashboard",
      "Priority Support"
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  }
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Choose the plan that fits your family&apos;s needs. Where learning unlocks freedom today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative p-8 rounded-3xl backdrop-blur-xl border flex flex-col h-full ${
              tier.highlight 
                ? "bg-indigo-950/30 border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.15)]" 
                : "bg-white/5 border-white/10"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-sm text-gray-400 mb-6">{tier.description}</p>
            
            <div className="mb-8 flex items-baseline">
              <span className="text-5xl font-extrabold text-white">{tier.price}</span>
              {tier.period && <span className="text-gray-400 ml-2 font-medium">{tier.period}</span>}
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-indigo-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                tier.highlight
                  ? "bg-indigo-500 text-white hover:bg-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
