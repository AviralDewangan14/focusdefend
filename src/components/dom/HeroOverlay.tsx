export default function HeroOverlay() {
  return (
    <section id="hero" className="min-h-[100dvh] w-full flex items-center justify-start px-8 md:px-16 pointer-events-none relative pt-20">
      <div className="z-10 max-w-2xl pointer-events-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]">
          Where Learning<br />Unlocks Freedom.
        </h1>
        <p className="text-lg text-brand-dark-text-secondary mb-10 max-w-lg">
          The only parental control platform where students earn access to their favorite apps by completing educational activities.
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <a href="/FocusShield.apk" download className="bg-white text-black px-7 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] inline-block">
            Download for Android
          </a>
          <button className="bg-transparent text-white px-7 py-3 rounded-full font-semibold text-lg hover:bg-white/5 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
