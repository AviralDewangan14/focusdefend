"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does the AI choose the educational challenges?",
    answer: "Our AI engine analyzes your child's age, grade level, and past performance to dynamically generate questions that are challenging yet achievable. It adapts in real-time, ensuring they are always learning at their optimal pace."
  },
  {
    question: "Can I choose which apps are blocked?",
    answer: "Absolutely. The Parent Dashboard gives you granular control over exactly which apps are restricted, when they are restricted, and how many Focus Credits are required to unlock them."
  },
  {
    question: "Does FocusDefend drain my child's battery?",
    answer: "No. FocusDefend is built natively for Android using highly optimized background services. Our interception engine uses less than 2% of daily battery life."
  },
  {
    question: "What if there is an emergency and my child needs their phone?",
    answer: "FocusDefend only blocks specific entertainment and social media apps that you select. Core phone functions like calling, messaging, and emergency services are never blocked."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription at any time directly from the Parent Dashboard. There are no hidden fees or long-term contracts."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto relative z-20 pb-40">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-400">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index} 
              className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-colors hover:bg-white/10"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-semibold text-white pr-8">{faq.question}</span>
                <motion.span 
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-indigo-400 shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
