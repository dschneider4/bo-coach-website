'use client'

import { CheckCircle, Circle, Coffee, Sparkles } from 'lucide-react'

export default function TaskChecklist({ tasks, completedIds, onToggle, disabled }) {
  const totalTasks = tasks.filter((t) => t.type === 'task').length
  const completedTasks = tasks.filter((t) => t.type === 'task' && completedIds.includes(t.id)).length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-light-cream/80">Your Game Plan</h3>
        <span className="text-xs text-bright-cyan font-mono">
          {completedTasks}/{totalTasks} done
        </span>
      </div>

      <div className="w-full h-2 bg-white/5 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-bright-cyan to-primary-blue rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const isCompleted = completedIds.includes(task.id)
          const isBreak = task.type === 'break'

          return (
            <button
              key={task.id}
              onClick={() => !disabled && onToggle(task.id)}
              disabled={disabled}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${
                isCompleted
                  ? 'bg-bright-cyan/10 border border-bright-cyan/20'
                  : isBreak
                  ? 'bg-warm-yellow/5 border border-warm-yellow/15 hover:bg-warm-yellow/10'
                  : 'bg-white/[0.02] border border-white/5 hover:bg-white/5'
              } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-bright-cyan" />
                ) : isBreak ? (
                  <Coffee className="w-5 h-5 text-warm-yellow/70" />
                ) : (
                  <Circle className="w-5 h-5 text-light-cream/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${
                    isCompleted
                      ? 'text-bright-cyan/70 line-through'
                      : isBreak
                      ? 'text-warm-yellow/80'
                      : 'text-light-cream/80'
                  }`}
                >
                  {isBreak && !isCompleted && '~ '}
                  {task.text}
                </p>
              </div>
              <span className="text-xs text-light-cream/30 shrink-0">{task.duration}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
