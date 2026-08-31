

export default function Footer() {
  return (
    <footer className="w-full bg-[#050816] border-t border-white/10 pt-16 pb-8 px-6 text-white z-20 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-xs">
              FD
            </div>
            FocusDefend
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Where Learning Unlocks Freedom. The ultimate AI-powered app that replaces mindless scrolling with bite-sized educational challenges.
          </p>
        </div>

        <div className="flex gap-16 md:gap-24">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold mb-2">Product</h4>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-bold mb-2">Company</h4>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} FocusDefend. All rights reserved.</p>
        <p>Built for Android users worldwide.</p>
      </div>
    </footer>
  );
}
