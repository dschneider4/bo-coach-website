import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import InteractiveFeatures from '../components/InteractiveFeatures';
import SocialProof from '../components/SocialProof';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-light-cream overflow-x-hidden">
      <Header />
      <HeroSection />
      <StorySection />
      <InteractiveFeatures />
      <SocialProof />
      <CTASection />

      {/* ============ FOOTER ============ */}
      <footer className="bg-darker-bg px-6 md:px-16 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-mono text-xl text-bright-cyan mb-4">Bo Coach</h3>
            <p className="text-light-cream/40 text-sm leading-relaxed">
              Empowering ADHD students with AI-driven behavioral coaching.
              Built on neuroscience, designed for real families.
            </p>
          </div>

          <div>
            <h4 className="text-light-cream/70 mb-4 font-semibold text-sm">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Request Demo', 'For Schools'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-light-cream/35 hover:text-bright-cyan transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-light-cream/70 mb-4 font-semibold text-sm">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Team', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-light-cream/35 hover:text-bright-cyan transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-light-cream/70 mb-4 font-semibold text-sm">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-light-cream/35 hover:text-bright-cyan transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-light-cream/25 text-xs">
            &copy; 2026 Werkable. All rights reserved. Built with care for ADHD families.
          </p>
        </div>
      </footer>
    </div>
  );
}
