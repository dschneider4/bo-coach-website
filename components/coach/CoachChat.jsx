'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Send, Loader2 } from 'lucide-react'
import ChatBubble from './ChatBubble'
import TaskChecklist from './TaskChecklist'
import CompletionCard from './CompletionCard'

const WELCOME_MESSAGE = "Hey! I'm Bo, your homework coach. You say it, I'll help you slay it! Tell me what you're working on today."

export default function CoachChat() {
  const { data: session } = useSession()
  const [phase, setPhase] = useState('welcome') // welcome | input | analyzing | tasks | complete
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [taskData, setTaskData] = useState(null)
  const [completedIds, setCompletedIds] = useState([])
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  const firstName = session?.user?.name?.split(' ')[0] || 'friend'

  useEffect(() => {
    // Show welcome message with typing effect
    const timer = setTimeout(() => {
      setMessages([{ sender: 'bo', text: `Hey ${firstName}! ${WELCOME_MESSAGE.slice(22)}` }])
      setPhase('input')
    }, 1000)
    return () => clearTimeout(timer)
  }, [firstName])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, phase])

  useEffect(() => {
    if (phase === 'input') inputRef.current?.focus()
  }, [phase])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || phase !== 'input') return

    setMessages((prev) => [...prev, { sender: 'user', text }])
    setInput('')
    setPhase('analyzing')

    // Show Bo typing
    await new Promise((r) => setTimeout(r, 1500))

    try {
      const res = await fetch('/api/bo/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: text }),
      })

      if (!res.ok) throw new Error('Failed to process')

      const data = await res.json()
      setTaskData(data)
      setMessages((prev) => [...prev, { sender: 'bo', text: data.boMessage }])
      setPhase('tasks')
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'bo', text: "Hmm, something went sideways. Can you try describing your homework again?" },
      ])
      setPhase('input')
    }
  }

  const handleToggleTask = (taskId) => {
    setCompletedIds((prev) => {
      const next = prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]

      // Check if all actual tasks (not breaks) are done
      if (taskData) {
        const allTaskIds = taskData.tasks.filter((t) => t.type === 'task').map((t) => t.id)
        const allDone = allTaskIds.every((id) => next.includes(id))

        if (allDone) {
          // Save session and show completion
          fetch('/api/bo/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subject: taskData.subject,
              description: taskData.description,
              tasks: taskData.tasks,
              badge: 'Homework Hero',
            }),
          }).catch(() => {})

          setTimeout(() => setPhase('complete'), 600)
        }
      }

      return next
    })
  }

  const handleNewSession = () => {
    setPhase('welcome')
    setMessages([])
    setInput('')
    setTaskData(null)
    setCompletedIds([])

    setTimeout(() => {
      setMessages([{ sender: 'bo', text: `Ready for round two, ${firstName}? What are we tackling now?` }])
      setPhase('input')
    }, 800)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg.text} sender={msg.sender} />
        ))}

        {phase === 'analyzing' && <ChatBubble sender="bo" isTyping />}

        {phase === 'tasks' && taskData && (
          <div className="mt-4 chat-bubble-enter">
            <TaskChecklist
              tasks={taskData.tasks}
              completedIds={completedIds}
              onToggle={handleToggleTask}
              disabled={false}
            />
          </div>
        )}

        {phase === 'complete' && taskData && (
          <div className="mt-4">
            <CompletionCard
              subject={taskData.subject}
              taskCount={taskData.tasks.filter((t) => t.type === 'task').length}
              onNewSession={handleNewSession}
            />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      {(phase === 'input' || phase === 'welcome') && (
        <div className="border-t border-white/5 px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your homework (e.g., 'Math worksheet on fractions')"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-light-cream placeholder:text-light-cream/30 focus:outline-none focus:border-bright-cyan/50 focus:ring-1 focus:ring-bright-cyan/25 transition-all"
              disabled={phase === 'welcome'}
            />
            <button
              type="submit"
              disabled={!input.trim() || phase === 'welcome'}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-primary-blue to-bright-cyan text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-blue/30 active:scale-95 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {phase === 'analyzing' && (
        <div className="border-t border-white/5 px-4 py-4">
          <div className="flex items-center justify-center gap-2 text-bright-cyan/60 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Bo is breaking down your homework...
          </div>
        </div>
      )}
    </div>
  )
}
