import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | FocusDefend',
  description: 'Official Privacy Policy and child data protection commitments for FocusDefend.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-16 px-6 sm:px-10 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            ← Return to FocusDefend
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            COPPA & Student Privacy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: November 3, 2026 • Strict Student Data Safeguards
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-10 text-slate-300 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Our Commitment to Student & Child Privacy</h2>
            <p>
              FocusDefend is dedicated to protecting the privacy and digital wellbeing of students and families. We adhere strictly to the <strong>Children&rsquo;s Online Privacy Protection Act (COPPA)</strong>, the <strong>Family Educational Rights and Privacy Act (FERPA)</strong>, and global educational data privacy standards. We do not sell personal data, display behavioral advertisements, or profile students for commercial monetization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Parental Consent & Control</h2>
            <p>
              FocusDefend accounts for minors under 13 must be created with verified parental consent. Parents retain full visibility into linked child profiles, screen usage aggregates, and academic progress. Parents may review, export, or request the deletion of their child&rsquo;s data at any time through the Parent Portal or by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-3">We collect only the minimal data necessary to deliver our educational and protection features:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong>Account Credentials:</strong> Name, parent/student email address, and encrypted password hash.</li>
              <li><strong>Academic Preferences:</strong> Class/grade level, target exams (e.g. CBSE, ICSE), and selected study subjects.</li>
              <li><strong>Aggregated Usage Stats:</strong> Minutes spent in foreground applications to enforce daily limits and study blocks.</li>
              <li><strong>Study Metrics:</strong> Quiz sprint performance, accuracy percentages, focus streaks, and virtual credit transactions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Information We NEVER Collect</h2>
            <p className="mb-3">FocusDefend is built on privacy-first architecture. We explicitly do NOT collect or monitor:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Private chat conversations, direct messages, or email contents.</li>
              <li>Keystrokes, passwords, or browsing search queries.</li>
              <li>Photos, audio recordings, or camera feeds.</li>
              <li>Real-time GPS tracking or physical location data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. On-Device Processing & Hardware Permissions</h2>
            <p>
              App restriction detection and overlay barriers are evaluated locally on your Android device using the Android <code>UsageStatsManager</code> and <code>SYSTEM_ALERT_WINDOW</code> APIs. Real-time application packages are matched against parent-configured restriction lists on-device, minimizing data transmitted over the network.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Third-Party Sharing & Advertisements</h2>
            <p>
              FocusDefend has <strong>zero third-party advertising SDKs</strong>. We do not share student information with ad networks, data brokers, or marketing partners. Data is shared only with essential cloud infrastructure providers (such as Supabase for encrypted cloud sync) under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Data Security & Retention</h2>
            <p>
              All network transmissions are secured via TLS 1.3 encryption. Passwords and parental PINs are hashed using industry-standard cryptographic salts. User data is retained only for as long as your account remains active and is permanently expunged upon account deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Contact Our Privacy Officer</h2>
            <p>
              For privacy inquiries, parental data requests, or deletion notices, reach our Data Protection Officer at{' '}
              <a href="mailto:privacy@focusdefend.app" className="text-emerald-400 underline font-semibold">
                privacy@focusdefend.app
              </a>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FocusDefend Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
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
