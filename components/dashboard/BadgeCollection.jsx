'use client'

import { Trophy, Flame, Star, Compass, Zap } from 'lucide-react'

const BADGES = [
  { id: 'homework-hero', name: 'Homework Hero', desc: 'Complete 1 session', icon: Trophy, requirement: (s) => s.totalSessions >= 1 },
  { id: 'streak-starter', name: 'Streak Starter', desc: '3 days in a row', icon: Flame, requirement: (s) => s.streak >= 3 },
  { id: 'focus-master', name: 'Focus Master', desc: 'Complete 5 sessions', icon: Star, requirement: (s) => s.totalSessions >= 5 },
  { id: 'subject-explorer', name: 'Subject Explorer', desc: 'Use 3+ subjects', icon: Compass, requirement: (s) => s.uniqueSubjects >= 3 },
  { id: 'unstoppable', name: 'Unstoppable', desc: '7-day streak', icon: Zap, requirement: (s) => s.streak >= 7 },
]

export default function BadgeCollection({ stats }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-light-cream/70 mb-4">Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {BADGES.map((badge) => {
          const earned = badge.requirement(stats)
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 ${
                earned
                  ? 'bg-bright-cyan/5 border-bright-cyan/20'
                  : 'bg-white/[0.02] border-white/5 opacity-40'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                earned ? 'bg-gradient-to-br from-bright-cyan to-primary-blue' : 'bg-white/10'
              }`}>
                <badge.icon className={`w-5 h-5 ${earned ? 'text-white' : 'text-white/30'}`} />
              </div>
              <span className="text-xs font-medium text-light-cream/80">{badge.name}</span>
              <span className="text-[10px] text-light-cream/30 mt-0.5">{badge.desc}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
