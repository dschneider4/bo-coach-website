'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      icon: '🎯',
      title: 'Smart Task Breakdown',
      description: 'AI-powered division of homework into manageable 5-10 minute chunks that work with ADHD brains.',
      color: 'from-primary-blue to-bright-cyan',
      borderColor: 'border-bright-cyan',
      demo: [
        { task: 'Research topic', time: '10 min', done: true },
        { task: 'Write outline', time: '5 min', done: true },
        { task: 'Dance break! 🕺', time: '2 min', done: false, isBreak: true },
        { task: 'Write intro paragraph', time: '10 min', done: false },
        { task: 'Body paragraphs', time: '15 min', done: false },
      ],
    },
    {
      icon: '🎮',
      title: 'Brain-Approved Breaks',
      description: 'Neuroscience-backed breaks between tasks: dance challenges, breathing exercises, and mini-games.',
      color: 'from-soft-pink to-warm-yellow',
      borderColor: 'border-soft-pink',
      demo: [
        { task: '4-7-8 Breathing 🧘', time: '1 min', done: false, isBreak: true },
        { task: 'Quick Dance 💃', time: '2 min', done: false, isBreak: true },
        { task: 'Joke of the Day 😄', time: '30 sec', done: false, isBreak: true },
        { task: 'Stretch Break 🤸', time: '1 min', done: false, isBreak: true },
      ],
    },
    {
      icon: '📸',
      title: 'Photo Validation',
      description: 'Upload completed work for instant AI feedback with gentle, encouraging error correction.',
      color: 'from-warm-yellow to-primary-blue',
      borderColor: 'border-warm-yellow',
      demo: [
        { task: 'Take photo of work', time: 'Step 1', done: true },
        { task: 'AI checks completeness', time: 'Step 2', done: true },
        { task: 'Gentle feedback given', time: 'Step 3', done: true },
        { task: 'Celebrate success! 🎉', time: 'Step 4', done: false },
      ],
    },
    {
      icon: '🏆',
      title: 'Celebration System',
      description: 'Earn badges, virtual confetti, and customizable rewards that build intrinsic motivation.',
      color: 'from-primary-blue to-soft-pink',
      borderColor: 'border-primary-blue',
      demo: [
        { task: '"Math Master" badge', time: 'Earned!', done: true },
        { task: '"Homework Hero" badge', time: 'Earned!', done: true },
        { task: '"5-Day Streak" 🔥', time: 'In progress', done: false },
        { task: '"Science Wizard" badge', time: 'Locked', done: false },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-32 px-6 md:px-8 bg-gradient-to-b from-[#0d1f3c] to-dark-bg relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 gradient-text">
            How Bo Works Its Magic
          </h2>
          <p className="text-lg md:text-xl text-center text-light-cream/60 mb-20 max-w-2xl mx-auto">
            Four powerful features designed by behavioral scientists to work with ADHD brains, not against them
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setActiveFeature(index)}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 group ${
                activeFeature === index
                  ? `glass-card ${feature.borderColor} border-2 scale-[1.02] shadow-2xl`
                  : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className={`text-5xl mb-5 transition-transform duration-500 ${
                activeFeature === index ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 text-light-cream">{feature.title}</h3>
              <p className="text-light-cream/60 leading-relaxed text-sm lg:text-base">{feature.description}</p>

              {/* Interactive demo panel */}
              <div className={`overflow-hidden transition-all duration-500 ${
                activeFeature === index ? 'max-h-[300px] opacity-100 mt-6' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-2">
                  {feature.demo.map((item, j) => (
                    <div
                      key={j}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all duration-300 ${
                        item.isBreak
                          ? 'bg-soft-pink/10 border border-soft-pink/20'
                          : item.done
                          ? 'bg-bright-cyan/10 border border-bright-cyan/20'
                          : 'bg-white/5 border border-white/10'
                      }`}
                      style={{ animationDelay: `${j * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          item.done ? 'bg-bright-cyan text-dark-bg' : 'border border-white/30'
                        }`}>
                          {item.done ? '✓' : ''}
                        </div>
                        <span className="text-light-cream/80">{item.task}</span>
                      </div>
                      <span className="text-light-cream/40 font-mono text-xs">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mt-12">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeFeature === index ? 'w-12 bg-bright-cyan' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
