'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LogOut, Home } from 'lucide-react'
import { signOut } from 'next-auth/react'
import CoachChat from '../../components/coach/CoachChat'

export default function CoachPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/coach')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-bright-cyan animate-pulse text-2xl font-mono">Bo_</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Coach header */}
      <header className="h-16 border-b border-white/5 px-4 flex items-center justify-between bg-dark-bg/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <a href="/" className="text-light-cream/40 hover:text-light-cream/70 transition-colors">
            <Home className="w-4 h-4" />
          </a>
          <span className="text-xl font-bold font-mono text-bright-cyan">
            Bo<span className="animate-pulse">_</span>
          </span>
          <span className="text-xs text-light-cream/30 hidden sm:inline">Coach Mode</span>
        </div>

        <div className="flex items-center gap-3">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-7 h-7 rounded-full border border-white/10"
            />
          )}
          <span className="text-sm text-light-cream/60 hidden sm:inline">
            {session.user?.name?.split(' ')[0]}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-light-cream/30 hover:text-soft-pink transition-colors p-1"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <CoachChat />
    </div>
  )
}
