"use client";



export default function SceneOverlays() {
  return (
    <div className="w-full pointer-events-none">
      
      {/* Scene 01 - The Problem */}
      <section id="scene01" className="min-h-[150vh] w-full flex items-center justify-start px-8 md:px-24">
        <div className="max-w-xl z-10 pointer-events-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-primary mb-4">The Reality</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
            Digital distractions never sleep.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary">
            Our children are bombarded with endless notifications, creating a chaotic environment that shatters their focus.
          </p>
        </div>
      </section>

      {/* Scene 02 - FocusDefend Launches */}
      <section id="scene02" className="min-h-[150vh] w-full flex items-center justify-end px-8 md:px-24">
        <div className="max-w-xl z-10 pointer-events-auto text-right">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            There is a better way.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary">
            Meet FocusDefend. A revolutionary approach that replaces digital battles with positive reinforcement and structured learning.
          </p>
        </div>
      </section>

      {/* Scene 03 - Parent Dashboard */}
      <section id="scene03" className="min-h-[150vh] w-full flex items-center justify-start px-8 md:px-24">
        <div className="max-w-xl z-10 pointer-events-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-blue mb-4">Control</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            Set healthy boundaries.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary">
            Configure restrictions for distracting apps and define custom educational schedules effortlessly from the Parent Dashboard.
          </p>
        </div>
      </section>

      {/* Scene 04 - Restriction Activates */}
      <section id="scene04" className="min-h-[150vh] w-full flex items-center justify-end px-8 md:px-24">
        <div className="max-w-xl z-10 pointer-events-auto text-right">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            Intercept distractions.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary">
            When a blocked app is opened, FocusDefend natively intercepts the launch, pausing the distraction instantly.
          </p>
        </div>
      </section>

      {/* Scene 05 - Challenge Overlay */}
      <section id="scene05" className="min-h-[150vh] w-full flex items-center justify-center px-8 md:px-24 text-center">
        <div className="max-w-2xl z-10 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            Turn friction into learning.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary max-w-xl mx-auto">
            Instead of a simple "Blocked" screen, students are presented with an opportunity: complete a brief educational challenge to earn Focus Credits.
          </p>
        </div>
      </section>

      {/* Scene 06 - Reward & AI */}
      <section id="scene06" className="min-h-[150vh] w-full flex items-center justify-start px-8 md:px-24">
        <div className="max-w-xl z-10 pointer-events-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-success mb-4">Growth</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            Reward effort.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary">
            Our AI engine evaluates answers in real-time. Correct answers instantly reward the student with screen time, reinforcing positive digital habits.
          </p>
        </div>
      </section>

      {/* Scene 07 - App Unlocks */}
      <section id="scene07" className="min-h-[150vh] w-full flex items-center justify-center px-8 md:px-24 text-center">
        <div className="max-w-2xl z-10 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">
            A balanced digital life.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary max-w-xl mx-auto">
            The app unlocks seamlessly. Screen time is no longer a given right—it's an earned privilege that builds knowledge.
          </p>
        </div>
      </section>

      {/* Scene 08 - Analytics */}
      <section id="scene08" className="min-h-[150vh] w-full flex flex-col items-center justify-center px-8 md:px-24 text-center">
        <div className="max-w-3xl z-10 pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white leading-none">
            Insights that matter.
          </h2>
          <p className="text-lg text-brand-dark-text-secondary mb-10 max-w-2xl mx-auto">
            Review your child's progress, focus habits, and academic improvements with beautiful, real-time analytics directly from your phone.
          </p>
          <button className="bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-blue transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
            Start Your Free Trial
          </button>
        </div>
      </section>

    </div>
  );
}
