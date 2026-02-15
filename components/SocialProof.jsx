'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const testimonialRef = useRef(null);

  const testimonials = [
    {
      quote: "Bo transformed our evenings. No more tears, no more battles. My daughter actually asks to use Bo now!",
      author: "Sarah M.",
      role: "Parent of 10-year-old with ADHD",
      rating: 5,
      stat: "85% reduction in homework conflicts",
    },
    {
      quote: "As a BCBA, I'm impressed by Bo's behavioral approach. It's evidence-based and truly works with the ADHD brain.",
      author: "Dr. James K.",
      role: "Board Certified Behavior Analyst",
      rating: 5,
      stat: "Used with 40+ students successfully",
    },
    {
      quote: "My son went from 15% homework completion to 90% in just 3 weeks. Bo is literally life-changing.",
      author: "Marcus T.",
      role: "Parent of 8-year-old with ADHD",
      rating: 5,
      stat: "6x improvement in completion rate",
    },
  ];

  const stats = [
    { value: "6x", label: "Improvement in task completion" },
    { value: "85%", label: "Parents report reduced stress" },
    { value: "90%", label: "Students complete more homework" },
    { value: "3 weeks", label: "Average time to see results" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      });

      if (testimonialRef.current) {
        gsap.fromTo(testimonialRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: testimonialRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-8 bg-dark-bg relative overflow-hidden">
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-pink/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="text-center p-6 md:p-8 rounded-2xl glass-card hover:border-bright-cyan/30 transition-all duration-500 group"
            >
              <div className="text-3xl md:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-light-cream/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialRef} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 gradient-text">
            Families Love Bo
          </h2>

          <div className="relative min-h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  currentTestimonial === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-xl text-warm-yellow">★</span>
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-2xl text-light-cream text-center leading-relaxed mb-8 font-light">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-bright-cyan mb-1">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-light-cream/50 mb-4">
                      {testimonial.role}
                    </div>
                    <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/15 border border-primary-blue/30">
                      <span className="text-xs font-mono text-bright-cyan">
                        {testimonial.stat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? 'w-12 bg-bright-cyan'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
