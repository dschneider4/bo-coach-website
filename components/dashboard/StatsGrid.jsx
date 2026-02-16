'use client'

import { BookOpen, CheckCircle2, Flame, Trophy } from 'lucide-react'

export default function StatsGrid({ stats }) {
  const cards = [
    {
      label: 'Sessions',
      value: stats.totalSessions,
      icon: BookOpen,
      gradient: 'from-primary-blue to-bright-cyan',
    },
    {
      label: 'Tasks Done',
      value: stats.totalTasks,
      icon: CheckCircle2,
      gradient: 'from-bright-cyan to-emerald-400',
    },
    {
      label: 'Day Streak',
      value: stats.streak,
      icon: Flame,
      gradient: 'from-orange-400 to-warm-yellow',
    },
    {
      label: 'Badges',
      value: stats.badgeCount,
      icon: Trophy,
      gradient: 'from-soft-pink to-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all duration-300"
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3`}>
            <card.icon className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-light-cream">{card.value}</div>
          <div className="text-xs text-light-cream/40 mt-0.5">{card.label}</div>
        </div>
      ))}
    </div>
  )
}
