'use client'

import { BookOpen, CheckCircle2 } from 'lucide-react'

export default function SessionHistory({ sessions }) {
  if (sessions.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-light-cream/70 mb-4">Recent Sessions</h3>
        <p className="text-sm text-light-cream/30 text-center py-6">No sessions yet. Start your first one!</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-light-cream/70 mb-4">Recent Sessions</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
        {sessions.map((s) => {
          const taskCount = Array.isArray(s.tasks)
            ? s.tasks.filter((t) => t.type === 'task').length
            : 0
          const date = new Date(s.completedAt)
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          return (
            <div
              key={s.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-blue/30 to-bright-cyan/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-bright-cyan/70" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-light-cream/80 truncate">{s.subject}</div>
                <div className="text-[11px] text-light-cream/30 truncate">{s.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-xs text-bright-cyan/50">
                  <CheckCircle2 className="w-3 h-3" />
                  {taskCount}
                </div>
                <div className="text-[10px] text-light-cream/25">{dateStr}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
