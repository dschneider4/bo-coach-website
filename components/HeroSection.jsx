'use client';

import ErrorBoundary from './ErrorBoundary';
import Hero3D from './Hero3D';

const heroFallback = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-blue/30 to-bright-cyan/20 blur-xl animate-pulse" />
    </div>
  </div>
);

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-primary-blue rounded-full blur-[120px] opacity-15 top-10 left-10 animate-float" />
        <div className="absolute w-[400px] h-[400px] bg-soft-pink rounded-full blur-[100px] opacity-10 bottom-20 right-20 animate-float-delayed" />
        <div className="absolute w-[350px] h-[350px] bg-warm-yellow rounded-full blur-[100px] opacity-[0.08] top-1/2 right-1/4 animate-float-slow" />
      </div>

      <ErrorBoundary fallback={heroFallback}>
        <Hero3D />
      </ErrorBoundary>

      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="font-mono text-warm-yellow/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-5 opacity-0 animate-fade-in-up">
          ADHD Behavioral Coach
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] opacity-0 animate-fade-in-up-d1">
          <span className="gradient-text">Meet Bo,</span>
          <br />
          <span className="text-white">Your Homework Ally</span>
        </h1>
        <p className="text-base md:text-xl text-light-cream/60 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up-d2">
          A pocket-sized executive functioning coach powered by AI and behavioral science.
          Transform homework battles into peaceful afternoons.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up-d3">
          <a
            href="#how-it-works"
            className="px-10 py-4 text-base rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white hover:shadow-2xl hover:shadow-primary-blue/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Start Your Journey
          </a>
          <a
            href="#about"
            className="px-10 py-4 text-base rounded-full border border-white/20 text-light-cream/80 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-light-cream/40 font-mono tracking-widest">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-light-cream/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-bright-cyan animate-bounce" />
        </div>
      </div>
    </section>
  );
}
