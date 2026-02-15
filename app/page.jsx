'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveFeatures from '../components/InteractiveFeatures';
import SocialProof from '../components/SocialProof';
import CTASection from '../components/CTASection';

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import('../components/Hero3D'), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const storyRef = useRef(null);
  const storyTextRef = useRef(null);
  const storyFeaturesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setHeaderSolid(currentScroll > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (storyRef.current) {
        const cardBefore = storyRef.current.querySelector('.card-before');
        const cardAfter = storyRef.current.querySelector('.card-after');

        if (cardBefore && cardAfter) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
              pin: true,
            },
          });

          tl.to(cardBefore, {
            x: -200, opacity: 0, scale: 0.7, rotateY: -30, duration: 1,
          }, 0);

          tl.fromTo(cardAfter,
            { x: 200, opacity: 0, scale: 0.7, rotateY: 30 },
            { x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1 },
            0.3
          );
        }
      }

      if (storyTextRef.current) {
        gsap.fromTo(storyTextRef.current,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: storyTextRef.current, start: 'top 80%' },
          }
        );
      }

      if (storyFeaturesRef.current) {
        const features = storyFeaturesRef.current.children;
        gsap.fromTo(features,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: storyFeaturesRef.current, start: 'top 80%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-light-cream overflow-x-hidden">
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bright-cyan via-primary-blue to-soft-pink z-[9999]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-4 flex justify-between items-center transition-all duration-500 ${
        headerSolid ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-dark-bg/50' : 'bg-transparent'
      }`}>
        <div className="text-2xl font-bold font-mono text-bright-cyan tracking-tight">
          Bo<span className="animate-pulse">_</span>
        </div>

        <nav className="hidden md:flex gap-10">
          {['Home', 'About', 'How it Works'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative group text-sm text-light-cream/70 hover:text-light-cream transition-colors duration-300"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bright-cyan to-primary-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex gap-3">
          <button className="px-5 py-2.5 rounded-full border border-bright-cyan/50 text-bright-cyan text-sm hover:bg-bright-cyan/10 transition-all duration-300">
            Let&apos;s Get Started
          </button>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white text-sm hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
            Sign Up
          </button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-light-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {['Home', 'About', 'How it Works'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-2xl text-light-cream/80 hover:text-bright-cyan transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <button
          className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-blue to-bright-cyan text-white"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </button>
      </div>

      {/* ============ HERO ============ */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-primary-blue rounded-full blur-[120px] opacity-15 top-10 left-10 animate-float" />
          <div className="absolute w-[400px] h-[400px] bg-soft-pink rounded-full blur-[100px] opacity-10 bottom-20 right-20 animate-float-delayed" />
          <div className="absolute w-[350px] h-[350px] bg-warm-yellow rounded-full blur-[100px] opacity-[0.08] top-1/2 right-1/4 animate-float-slow" />
        </div>

        <Hero3D />

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

      {/* ============ STORY / ABOUT ============ */}
      <section id="about" ref={storyRef} className="relative min-h-screen bg-gradient-to-b from-dark-bg via-[#0d1f3c] to-dark-bg">
        <div className="h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl w-full px-6 md:px-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative h-[420px] md:h-[500px]">
              <div className="card-before absolute w-72 md:w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="font-mono text-text-dark text-lg md:text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">😰</span> Math Homework
                </h3>
                <div className="space-y-3">
                  {['Complete Chapter 5: 20 problems', 'Review equations 1-15', 'Write summary paragraph'].map((task, i) => (
                    <div key={i} className="bg-gray-100 p-3 md:p-4 rounded-xl text-text-dark text-sm">
                      {task}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-red-400 text-xs font-mono">
                  Estimated: 90 minutes straight...
                </div>
              </div>

              <div className="card-after absolute w-72 md:w-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 md:p-8 shadow-2xl opacity-0">
                <h3 className="font-mono text-text-dark text-lg md:text-xl mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span> Bo&apos;s Breakdown
                </h3>
                <div className="space-y-2">
                  {[
                    { text: 'Problems 1-5', time: '5 min', color: 'blue', done: true },
                    { text: 'Dance break! 🕺', time: '2 min', color: 'pink', done: true, isBreak: true },
                    { text: 'Problems 6-10', time: '5 min', color: 'blue', done: false },
                    { text: 'Breathing 🧘', time: '1 min', color: 'yellow', done: false, isBreak: true },
                    { text: 'Problems 11-15', time: '5 min', color: 'blue', done: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-l-4 ${
                        item.color === 'pink' ? 'bg-pink-50 border-[#FF6B9D]'
                        : item.color === 'yellow' ? 'bg-yellow-50 border-[#F2C94C]'
                        : 'bg-blue-50 border-[#2D9CDB]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                        item.done ? (item.isBreak ? 'bg-[#FF6B9D]' : 'bg-[#2D9CDB]') : 'bg-gray-300'
                      }`}>
                        {item.done ? '✓' : ''}
                      </div>
                      <span className="text-text-dark text-sm flex-1">{item.text}</span>
                      <span className="text-text-dark/40 text-xs font-mono">{item.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center text-emerald-500 text-xs font-mono">
                  Same work, way more fun!
                </div>
              </div>
            </div>

            <div ref={storyTextRef} className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-white">From Overwhelming</span>
                <br />
                <span className="gradient-text">to Achievable</span>
              </h2>
              <p className="text-base md:text-lg text-light-cream/60 leading-relaxed">
                Bo transforms dense homework assignments into bite-sized microtasks that ADHD brains
                can actually tackle. No more arguments, no more tears &mdash; just progress.
              </p>

              <div ref={storyFeaturesRef} className="space-y-4 mt-8">
                {[
                  { icon: '🎯', title: 'Smart Task Breakdown', desc: 'AI-powered division into manageable 5-10 minute chunks', gradient: 'from-primary-blue to-bright-cyan' },
                  { icon: '🎮', title: 'Brain-Approved Breaks', desc: 'Dance challenges, breathing exercises, and mini-games', gradient: 'from-soft-pink to-warm-yellow' },
                  { icon: '📸', title: 'Photo Validation', desc: 'Upload work for instant AI feedback and encouragement', gradient: 'from-warm-yellow to-primary-blue' },
                  { icon: '🏆', title: 'Celebration System', desc: 'Confetti, badges, and rewards that motivate completion', gradient: 'from-primary-blue to-soft-pink' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="text-bright-cyan text-sm font-semibold mb-0.5">{f.title}</h3>
                      <p className="text-light-cream/45 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <InteractiveFeatures />

      {/* ============ SOCIAL PROOF ============ */}
      <SocialProof />

      {/* ============ CTA ============ */}
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
