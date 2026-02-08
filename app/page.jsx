// app/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Hero3D from '../components/Hero3D';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const storyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);

      // Story section animation
      if (storyRef.current) {
        const rect = storyRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        
        const cardBefore = document.querySelector('.card-before');
        const cardAfter = document.querySelector('.card-after');
        
        if (cardBefore && cardAfter) {
          cardBefore.style.opacity = Math.max(1 - progress * 1.5, 0);
          cardBefore.style.transform = `translateY(-50%) translateX(${-progress * 150}px) scale(${1 - progress * 0.4}) rotate(${-progress * 15}deg)`;
          
          cardAfter.style.opacity = Math.min(progress * 1.5, 1);
          cardAfter.style.transform = `translateY(-50%) translateX(${(1 - progress) * 150}px) scale(${0.8 + progress * 0.2}) rotate(${(1 - progress) * 15}deg)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-light-cream overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-bright-cyan z-[9999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-16 py-6 flex justify-between items-center bg-dark-bg/80 backdrop-blur-xl border-b border-bright-cyan/10">
        <div className="text-2xl font-bold font-mono text-bright-cyan tracking-tight">
          Bo_
        </div>
        
        <nav className="hidden md:flex gap-12">
          <a href="#home" className="relative group text-light-cream hover:text-bright-cyan transition-colors">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-blue to-bright-cyan group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#about" className="relative group text-light-cream hover:text-bright-cyan transition-colors">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-blue to-bright-cyan group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#how-it-works" className="relative group text-light-cream hover:text-bright-cyan transition-colors">
            How it Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-blue to-bright-cyan group-hover:w-full transition-all duration-300" />
          </a>
        </nav>

        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full border-2 border-bright-cyan text-bright-cyan hover:bg-bright-cyan hover:text-dark-bg transition-all duration-300">
            Let's Get Started
          </button>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white hover:shadow-lg hover:shadow-primary-blue/50 hover:-translate-y-0.5 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Shapes Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-primary-blue rounded-full blur-3xl opacity-20 top-20 left-20 animate-float" />
          <div className="absolute w-80 h-80 bg-soft-pink rounded-full blur-3xl opacity-20 bottom-32 right-32 animate-float-delayed" />
          <div className="absolute w-72 h-72 bg-warm-yellow rounded-full blur-3xl opacity-20 top-1/2 right-40 animate-float-slow" />
        </div>

        {/* 3D Canvas */}
        <Hero3D />

        </section>

{/* Hero Content */}
<div className="relative z-10 text-center max-w-4xl px-8">
  <div className="font-mono text-warm-yellow text-sm tracking-widest uppercase mb-4 opacity-0 animate-fade-in-up">
    ADHD Behavioral Coach
  </div>
  <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-bright-cyan via-primary-blue to-soft-pink bg-clip-text text-transparent opacity-0 animate-fade-in-up-delayed leading-tight">
    Meet Bo, Your Homework Ally
  </h1>
  <p className="text-xl md:text-2xl text-light-cream/80 mb-8 opacity-0 animate-fade-in-up-more-delayed leading-relaxed">
    A pocket-sized executive functioning coach powered by AI and behavioral science. 
    Transform homework battles into peaceful afternoons.
  </p>
  <button className="px-10 py-4 text-lg rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white hover:shadow-2xl hover:shadow-primary-blue/50 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up-most-delayed">
    Start Your Journey
  </button>
</div>

      {/* Story Section */}
      <section ref={storyRef} className="relative min-h-[200vh] bg-gradient-to-b from-dark-bg to-[#16213E]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl px-16 grid md:grid-cols-2 gap-16 items-center">
            {/* Visual Side */}
            <div className="relative h-[500px]">
              {/* Before Card */}
              <div className="card-before absolute w-80 top-1/2 left-0 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl transition-all duration-700">
                <h3 className="font-mono text-text-dark text-xl mb-4">😰 Math Homework</h3>
                <div className="space-y-3">
                  <div className="bg-gray-100 p-4 rounded-xl text-text-dark text-sm">
                    Complete Chapter 5: 20 problems
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl text-text-dark text-sm">
                    Review equations 1-15
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl text-text-dark text-sm">
                    Write summary paragraph
                  </div>
                </div>
              </div>

              {/* After Card */}
              <div className="card-after absolute w-80 top-1/2 -right-12 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl opacity-0 transition-all duration-700">
                <h3 className="font-mono text-text-dark text-xl mb-4">✨ Bo's Breakdown</h3>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-primary-blue p-3 rounded-lg flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-text-dark text-sm">Problem 1-5 (5 min)</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-soft-pink p-3 rounded-lg flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-soft-pink flex items-center justify-center text-white text-xs">✓</div>
                    <span className="text-text-dark text-sm">Dance break! 🕺</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-primary-blue p-3 rounded-lg flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">○</div>
                    <span className="text-text-dark text-sm">Problem 6-10 (5 min)</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-warm-yellow p-3 rounded-lg flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">○</div>
                    <span className="text-text-dark text-sm">Breathing exercise 🧘</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-blue to-bright-cyan bg-clip-text text-transparent">
                From Overwhelming to Achievable
              </h2>
              <p className="text-xl text-light-cream/80 leading-relaxed">
                Bo transforms dense homework assignments into bite-sized microtasks that ADHD brains 
                can actually tackle. No more arguments, no more tears—just progress.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue to-bright-cyan flex items-center justify-center text-2xl flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 className="text-bright-cyan text-lg font-semibold mb-1">Smart Task Breakdown</h3>
                    <p className="text-light-cream/60 text-sm">AI-powered division of homework into manageable 5-10 minute chunks</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-soft-pink to-warm-yellow flex items-center justify-center text-2xl flex-shrink-0">
                    🎮
                  </div>
                  <div>
                    <h3 className="text-bright-cyan text-lg font-semibold mb-1">Brain-Approved Breaks</h3>
                    <p className="text-light-cream/60 text-sm">Dance challenges, breathing exercises, and mini-games between tasks</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warm-yellow to-primary-blue flex items-center justify-center text-2xl flex-shrink-0">
                    📸
                  </div>
                  <div>
                    <h3 className="text-bright-cyan text-lg font-semibold mb-1">Photo Validation</h3>
                    <p className="text-light-cream/60 text-sm">Upload work for instant AI feedback and gentle error correction</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue to-soft-pink flex items-center justify-center text-2xl flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-bright-cyan text-lg font-semibold mb-1">Celebration System</h3>
                    <p className="text-light-cream/60 text-sm">Confetti, badges, and customizable rewards that motivate completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050A14] px-16 py-16 border-t border-bright-cyan/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-mono text-2xl text-bright-cyan mb-4">Bo Coach</h3>
            <p className="text-light-cream/60 text-sm leading-relaxed">
              Empowering ADHD students with AI-driven behavioral coaching. 
              Built on neuroscience, designed for real families.
            </p>
          </div>

          <div>
            <h4 className="text-bright-cyan mb-4 font-semibold">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Features</a></li>
              <li><a href="#pricing" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Pricing</a></li>
              <li><a href="#demo" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Request Demo</a></li>
              <li><a href="#schools" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">For Schools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-bright-cyan mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">About Us</a></li>
              <li><a href="#team" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Team</a></li>
              <li><a href="#blog" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Blog</a></li>
              <li><a href="#contact" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-bright-cyan mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#terms" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#hipaa" className="text-light-cream/60 hover:text-bright-cyan transition-colors text-sm">HIPAA Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-bright-cyan/10">
          <p className="text-light-cream/40 text-sm">
            &copy; 2026 Werkable. All rights reserved. Built with ❤️ for ADHD families.
          </p>
        </div>
      </footer>
    </div>
  );
}