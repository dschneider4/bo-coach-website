// components/SocialProof.jsx
'use client';

import { useState, useEffect } from 'react';

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    { value: "15-20%", label: "Fewer assignments turned in without help" },
    { value: "85%", label: "Parents report reduced stress" },
    { value: "90%", label: "Students complete more homework" },
    { value: "5000+", label: "Families helped in Year 1" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-8 bg-dark-bg relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-pink/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-bright-cyan/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-bright-cyan to-primary-blue bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-light-cream/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-bright-cyan to-soft-pink bg-clip-text text-transparent">
            Families Love Bo
          </h2>

          <div className="relative min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  currentTestimonial === index
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8 pointer-events-none'
                }`}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-2xl text-warm-yellow">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl text-light-cream text-center leading-relaxed mb-8 font-light">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-bright-cyan mb-1">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-light-cream/60 mb-4">
                      {testimonial.role}
                    </div>
                    
                    {/* Stat badge */}
                    <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/20 border border-primary-blue/50">
                      <span className="text-sm font-mono text-bright-cyan">
                        {testimonial.stat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? 'w-12 bg-bright-cyan'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 items-center opacity-60">
          <div className="text-sm text-light-cream/60 font-mono">FEATURED IN</div>
          <div className="text-light-cream/40">EdTech Digest</div>
          <div className="text-light-cream/40">CHADD</div>
          <div className="text-light-cream/40">ADDitude Magazine</div>
          <div className="text-light-cream/40">Parent's Choice Award</div>
        </div>
      </div>
    </section>
  );
}