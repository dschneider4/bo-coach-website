import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'
import prisma from '../../../../lib/prisma'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
