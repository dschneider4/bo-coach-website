'use client'

import { useEffect } from 'react'
import { Trophy, Star, ArrowRight } from 'lucide-react'

export default function CompletionCard({ subject, taskCount, onNewSession }) {
  useEffect(() => {
    let confettiModule
    import('canvas-confetti').then((mod) => {
      confettiModule = mod.default
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confettiModule({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#56CCF2', '#2D9CDB', '#FF6B9D', '#F2C94C'],
        })
        confettiModule({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#56CCF2', '#2D9CDB', '#FF6B9D', '#F2C94C'],
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    })
  }, [])

  return (
    <div className="bg-gradient-to-br from-bright-cyan/10 via-primary-blue/10 to-soft-pink/10 border border-bright-cyan/20 rounded-2xl p-8 text-center chat-bubble-enter">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-warm-yellow to-soft-pink flex items-center justify-center">
        <Trophy className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-light-cream mb-2">Homework Hero!</h2>
      <p className="text-light-cream/60 mb-6">
        You crushed {taskCount} tasks in {subject}. That takes real focus and grit!
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-yellow/10 border border-warm-yellow/30 mb-6">
        <Star className="w-4 h-4 text-warm-yellow" />
        <span className="text-warm-yellow text-sm font-medium">Badge Earned: Homework Hero</span>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-blue to-bright-cyan text-white font-medium hover:shadow-lg hover:shadow-primary-blue/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
        >
          Start New Session
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
