import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

let prisma
try {
  prisma = require('../../../../lib/prisma').default
} catch {
  // DB not available
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!prisma) {
    // No database — acknowledge but don't persist
    return NextResponse.json({ id: 'no-db', badge: 'Homework Hero' })
  }

  const { subject, description, tasks, badge } = await request.json()

  const coachSession = await prisma.coachSession.create({
    data: {
      userId: session.user.id,
      subject: subject || 'General',
      description: description || '',
      tasks: JSON.stringify(tasks || []),
      badge: badge || 'Homework Hero',
    },
  })

  // Update user stats
  try {
    const today = new Date().toISOString().split('T')[0]
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })

    const taskCount = (tasks || []).filter((t) => t.type === 'task').length
    let newStreak = 1

    if (user?.lastActiveDate) {
      const lastDate = new Date(user.lastActiveDate)
      const todayDate = new Date(today)
      const diff = (todayDate - lastDate) / 86400000

      if (diff === 0) {
        newStreak = user.streak || 1
      } else if (diff === 1) {
        newStreak = (user.streak || 0) + 1
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        streak: newStreak,
        totalTasksCompleted: { increment: taskCount },
        lastActiveDate: today,
      },
    })
  } catch {
    // Stats update is non-critical
  }

  return NextResponse.json({ id: coachSession.id, badge: coachSession.badge })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!prisma) {
    return NextResponse.json([])
  }

  const sessions = await prisma.coachSession.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: 'desc' },
    take: 50,
  })

  return NextResponse.json(
    sessions.map((s) => ({
      ...s,
      tasks: JSON.parse(s.tasks),
    }))
  )
}
