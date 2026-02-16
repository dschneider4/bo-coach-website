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
    take: 20,
  })

  return NextResponse.json(
    sessions.map((s) => ({
      ...s,
      tasks: JSON.parse(s.tasks),
    }))
  )
}
