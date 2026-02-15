'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 via-dark-bg to-dark-bg" />
      <div className="absolute top-10 left-20 w-72 h-72 bg-bright-cyan/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-soft-pink/10 rounded-full blur-3xl animate-float-delayed" />

      <div ref={contentRef} className="max-w-3xl mx-auto relative z-10 text-center">
        <div className="font-mono text-bright-cyan text-sm tracking-widest uppercase mb-6">
          Join the Movement
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
          Ready to Transform<br />
          <span className="gradient-text">Homework Time?</span>
        </h2>
        <p className="text-lg md:text-xl text-light-cream/70 mb-12 leading-relaxed max-w-xl mx-auto">
          Join families who have discovered peaceful afternoons and homework success with Bo
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/40 backdrop-blur-xl focus:border-bright-cyan focus:outline-none focus:bg-white/10 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-bright-cyan to-primary-blue text-white font-semibold hover:shadow-2xl hover:shadow-bright-cyan/30 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              {submitted ? '✓ Joined!' : 'Get Access'}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-light-cream/50">
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan text-xs">✓</span>
            Free trial, no credit card
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan text-xs">✓</span>
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan text-xs">✓</span>
            HIPAA compliant
          </div>
        </div>

        {/* Pricing card */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl glass-card hover:border-bright-cyan/20 transition-all duration-500">
          <div className="text-xs text-warm-yellow font-mono tracking-widest mb-3">LAUNCH SPECIAL</div>
          <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            $19<span className="text-lg text-light-cream/40">/month</span>
          </div>
          <div className="text-light-cream/50 mb-6 text-sm">
            Limited time &mdash; normally $29/month
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto text-left">
            {[
              'Unlimited homework sessions',
              'AI-powered task breakdown',
              'Photo validation & feedback',
              'Parent dashboard & insights',
              'Google Classroom integration',
              'Celebration & reward system',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-light-cream/70">
                <span className="text-bright-cyan mt-0.5 text-xs">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
