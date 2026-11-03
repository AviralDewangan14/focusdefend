import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | FocusDefend',
  description: 'Official Terms of Service and user agreement for FocusDefend educational platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-16 px-6 sm:px-10 selection:bg-sky-500/30">
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            ← Return to FocusDefend
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
            Legal & Compliance
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: November 3, 2026 • Effective Immediately
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-10 text-slate-300 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, accessing, or using the FocusDefend application, website, or associated services (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you are creating an account on behalf of a minor child, you represent and warrant that you are their parent or legal guardian and agree to these Terms on their behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
            <p>
              FocusDefend is an educational focus guardian and study productivity ecosystem designed to help students build disciplined screen habits and master academic curricula through study sprints, hardware-level application pauses, and curriculum problem challenges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Parental Guardian Supervision & PIN Security</h2>
            <p>
              Parents and legal guardians are responsible for safeguarding their master 4-digit security PIN. FocusDefend provides parental controls, daily screen limits, bedtime curfews, and manual override capabilities. Parents agree to supervise their student&rsquo;s device configuration and grant requisite Android system permissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Device Permissions & System Enforcement</h2>
            <p>
              To deliver its core protective functionality, FocusDefend requires specific Android permissions, including <strong>Usage Access Stats</strong> (to monitor screen time and identify distracting apps), <strong>Display Over Other Apps</strong> (to provide study challenge overlays), and optional <strong>Notification Access / Do Not Disturb</strong> (to silence notifications during active study sprints). FocusDefend operates locally on-device and does not harvest private chats, browsing contents, or credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Focus Credits & Academic Rewards</h2>
            <p>
              Focus Credits and points earned within the application are virtual utility units designed exclusively to unlock temporary app access or track academic progress. Focus Credits carry <strong>no monetary cash value</strong>, are non-transferable, and cannot be redeemed for fiat currency or cryptocurrency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Student Academic Integrity</h2>
            <p>
              Curriculum challenge questions are designed for self-assessment, concept mastery, and exam readiness. Users agree not to tamper with question scoring algorithms, reverse-engineer hardware protection barriers, or circumvent parental lockouts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Intellectual Property</h2>
            <p>
              All curriculum frameworks, software code, visual designs, trademarks, and algorithms comprising FocusDefend are the exclusive intellectual property of FocusDefend and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. FocusDefend is not liable for indirect, incidental, special, or consequential damages resulting from device configuration, software interruptions, or third-party operating system updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact & Inquiries</h2>
            <p>
              If you have questions regarding these Terms, please contact our legal team at{' '}
              <a href="mailto:support@focusdefend.app" className="text-sky-400 underline font-semibold">
                support@focusdefend.app
              </a>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FocusDefend Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
