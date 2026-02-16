'use client'

import { useState } from 'react'
import { MessageSquare, Camera, Mic, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

const steps = [
  {
    title: "Meet Bo",
    subtitle: "Your ADHD homework coach",
    description: "Bo breaks big, overwhelming homework into tiny, doable steps — with built-in breaks so your brain gets the rest it needs.",
    icon: Sparkles,
    gradient: 'from-bright-cyan to-primary-blue',
  },
  {
    title: "How it works",
    subtitle: "Three ways to get started",
    description: "Type what you're working on, snap a photo of your assignment, or just talk to Bo. He'll turn it into a step-by-step plan you can actually follow.",
    icon: MessageSquare,
    gradient: 'from-primary-blue to-purple-500',
    features: [
      { icon: MessageSquare, label: 'Type it' },
      { icon: Camera, label: 'Photo it' },
      { icon: Mic, label: 'Say it' },
    ],
  },
  {
    title: "Try it!",
    subtitle: "Here's a quick example",
    description: "Ready to see Bo in action? Hit the button below to start your first session.",
    icon: CheckCircle2,
    gradient: 'from-soft-pink to-warm-yellow',
  },
]

export default function OnboardingFlow({ onComplete, firstName }) {
  const [step, setStep] = useState(0)
  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] max-w-md mx-auto px-6">
      <div className="text-center onboarding-slide">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center mx-auto mb-6`}>
          <current.icon className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-light-cream mb-1">{current.title}</h2>
        <p className="text-sm text-bright-cyan/60 mb-4">{current.subtitle}</p>
        <p className="text-sm text-light-cream/60 leading-relaxed mb-8">{current.description}</p>

        {current.features && (
          <div className="flex justify-center gap-6 mb-8">
            {current.features.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-bright-cyan/70" />
                </div>
                <span className="text-xs text-light-cream/40">{f.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <button
          onClick={() => isLast ? onComplete() : setStep((s) => s + 1)}
          className="w-full max-w-[240px] px-6 py-3 rounded-xl bg-gradient-to-r from-primary-blue to-bright-cyan text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-blue/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isLast ? `Let's go, ${firstName}!` : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>

        {!isLast && (
          <button
            onClick={onComplete}
            className="text-xs text-light-cream/30 hover:text-light-cream/50 transition-colors"
          >
            Skip intro
          </button>
        )}

        <div className="flex gap-2 mt-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === step ? 'bg-bright-cyan w-6' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
