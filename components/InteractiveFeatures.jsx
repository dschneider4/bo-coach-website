// components/InteractiveFeatures.jsx
'use client';

import { useState } from 'react';

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: '🎯',
      title: 'Smart Task Breakdown',
      description: 'AI-powered division of homework into manageable 5-10 minute chunks',
      color: 'from-primary-blue to-bright-cyan',
      demo: 'Breaks down "Write 500-word essay" into: Research (10 min) → Outline (5 min) → Intro (10 min) → Break → Body paragraphs (15 min) → Conclusion (10 min) → Review (5 min)',
    },
    {
      icon: '🎮',
      title: 'Brain-Approved Breaks',
      description: 'Dance challenges, breathing exercises, and mini-games between tasks',
      color: 'from-soft-pink to-warm-yellow',
      demo: 'After each task: Quick dance challenge 🕺, 4-7-8 breathing 🧘, or joke of the day 😄',
    },
    {
      icon: '📸',
      title: 'Photo Validation',
      description: 'Upload work for instant AI feedback and gentle error correction',
      color: 'from-warm-yellow to-primary-blue',
      demo: 'Take a photo → AI checks completeness → Gentle nudges if something's missing → Praise when done!',
    },
    {
      icon: '🏆',
      title: 'Celebration System',
      description: 'Confetti, badges, and customizable rewards that motivate completion',
      color: 'from-primary-blue to-soft-pink',
      demo: 'Earn badges: "Math Master", "Homework Hero", "Streak Champion" with virtual confetti 🎊',
    },
  ];

  return (
    <section className="py-24 px-8 bg-gradient-to-b from-[#16213E] to-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-bright-cyan to-soft-pink bg-clip-text text-transparent">
          How Bo Works Its Magic
        </h2>
        <p className="text-xl text-center text-light-cream/70 mb-16 max-w-2xl mx-auto">
          Four powerful features designed by behavioral scientists to work with ADHD brains, not against them
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
                activeFeature === index
                  ? 'bg-gradient-to-br from-primary-blue/20 to-bright-cyan/20 border-2 border-bright-cyan scale-105 shadow-2xl shadow-bright-cyan/20'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`text-6xl mb-4 transition-transform duration-300 ${
                activeFeature === index ? 'scale-110' : ''
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-light-cream">{feature.title}</h3>
              <p className="text-light-cream/70 leading-relaxed">{feature.description}</p>
              
              {activeFeature === index && (
                <div className="mt-6 p-4 rounded-xl bg-white/10 border border-bright-cyan/30 animate-fade-in-up">
                  <p className="text-sm text-bright-cyan font-mono leading-relaxed">
                    {feature.demo}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeFeature === index ? 'w-12 bg-bright-cyan' : 'w-2 bg-white/30'
              }`}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}