'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, LogOut, MessageSquare } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import StatsGrid from '../../components/dashboard/StatsGrid'
import BadgeCollection from '../../components/dashboard/BadgeCollection'
import SessionHistory from '../../components/dashboard/SessionHistory'
import StreakCalendar from '../../components/dashboard/StreakCalendar'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/bo/sessions')
        .then((r) => r.json())
        .then((data) => {
          setSessions(Array.isArray(data) ? data : [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-bright-cyan animate-pulse text-2xl font-mono">Bo_</div>
      </div>
    )
  }

  if (!session) return null

  // Compute stats
  const totalSessions = sessions.length
  const totalTasks = sessions.reduce((acc, s) => {
    const tasks = Array.isArray(s.tasks) ? s.tasks.filter((t) => t.type === 'task') : []
    return acc + tasks.length
  }, 0)

  const uniqueSubjects = new Set(sessions.map((s) => s.subject)).size

  // Compute streak from session dates
  const sessionDates = [...new Set(sessions.map((s) => new Date(s.completedAt).toISOString().split('T')[0]))]
    .sort()
    .reverse()

  let streak = 0
  if (sessionDates.length > 0) {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (sessionDates[0] === today || sessionDates[0] === yesterday) {
      streak = 1
      for (let i = 1; i < sessionDates.length; i++) {
        const prev = new Date(sessionDates[i - 1])
        const curr = new Date(sessionDates[i])
        const diff = (prev - curr) / 86400000
        if (diff === 1) {
          streak++
        } else {
          break
        }
      }
    }
  }

  // Count earned badges
  const stats = { totalSessions, totalTasks, streak, uniqueSubjects }
  let badgeCount = 0
  if (totalSessions >= 1) badgeCount++
  if (streak >= 3) badgeCount++
  if (totalSessions >= 5) badgeCount++
  if (uniqueSubjects >= 3) badgeCount++
  if (streak >= 7) badgeCount++

  const fullStats = { ...stats, badgeCount }

  const firstName = session.user?.name?.split(' ')[0] || 'Student'

  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="h-16 border-b border-white/5 px-4 flex items-center justify-between bg-dark-bg/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <a href="/" className="text-light-cream/40 hover:text-light-cream/70 transition-colors">
            <Home className="w-4 h-4" />
          </a>
          <span className="text-xl font-bold font-mono text-bright-cyan">
            Bo<span className="animate-pulse">_</span>
          </span>
          <span className="text-xs text-light-cream/30 hidden sm:inline">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/coach"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-blue to-bright-cyan text-white text-xs hover:shadow-lg hover:shadow-primary-blue/30 active:scale-95 transition-all"
          >
            <MessageSquare className="w-3 h-3" />
            Coach
          </Link>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-7 h-7 rounded-full border border-white/10"
            />
          )}
          <span className="text-sm text-light-cream/60 hidden sm:inline">{firstName}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-light-cream/30 hover:text-soft-pink transition-colors p-1"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-light-cream">
            Hey {firstName}!
          </h1>
          <p className="text-sm text-light-cream/40 mt-1">Here&apos;s your homework journey so far.</p>
        </div>

        <StatsGrid stats={fullStats} />
        <StreakCalendar sessions={sessions} />

        <div className="grid md:grid-cols-2 gap-6">
          <BadgeCollection stats={stats} />
          <SessionHistory sessions={sessions} />
        </div>
      </main>
    </div>
  )
}
