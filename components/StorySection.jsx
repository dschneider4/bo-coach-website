'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const storyRef = useRef(null);
  const storyTextRef = useRef(null);
  const storyFeaturesRef = useRef(null);

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
  );
}
