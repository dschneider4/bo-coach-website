// components/CTASection.jsx
'use client';

import { useState } from 'react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
    console.log('Email submitted:', email);
    setSubmitted(true);
    
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-24 px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-[#16213E] to-dark-bg" />
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-bright-cyan/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-soft-pink/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Ready to Transform Homework Time?
        </h2>
        <p className="text-xl md:text-2xl text-light-cream/90 mb-12 leading-relaxed">
          Join 5,000+ families who've discovered peaceful afternoons and homework success with Bo
        </p>

        {/* Email signup form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border-2 border-white/20 text-white placeholder-white/50 backdrop-blur-xl focus:border-bright-cyan focus:outline-none transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-bright-cyan to-primary-blue text-white font-semibold hover:shadow-2xl hover:shadow-bright-cyan/50 hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              {submitted ? '✓ Joined!' : 'Get Early Access'}
            </button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-light-cream/70">
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan">✓</span>
            Free trial - no credit card
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan">✓</span>
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <span className="text-bright-cyan">✓</span>
            HIPAA compliant
          </div>
        </div>

        {/* Pricing tease */}
        <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="text-sm text-warm-yellow font-mono mb-2">LAUNCH SPECIAL</div>
          <div className="text-4xl font-bold text-white mb-2">
            $19<span className="text-xl text-light-cream/60">/month</span>
          </div>
          <div className="text-light-cream/70 mb-4">
            Limited time offer - normally $29/month
          </div>
          <ul className="text-left max-w-sm mx-auto space-y-2 text-light-cream/80">
            <li className="flex items-start gap-2">
              <span className="text-bright-cyan mt-1">✓</span>
              <span>Unlimited homework sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bright-cyan mt-1">✓</span>
              <span>AI-powered task breakdown</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bright-cyan mt-1">✓</span>
              <span>Photo validation & feedback</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bright-cyan mt-1">✓</span>
              <span>Parent dashboard & insights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bright-cyan mt-1">✓</span>
              <span>Google Classroom integration</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}