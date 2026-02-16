import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

const taskTemplates = {
  math: {
    subject: 'Math',
    tasks: [
      { id: 1, text: 'Read the problem out loud (yes, really!)', type: 'task', duration: '2 min' },
      { id: 2, text: 'Write down what you know and what you need to find', type: 'task', duration: '3 min' },
      { id: 3, text: 'Try the first step - just ONE step!', type: 'task', duration: '5 min' },
      { id: 4, text: 'Quick break! Do 10 jumping jacks', type: 'break', duration: '1 min' },
      { id: 5, text: 'Keep going - solve the next part', type: 'task', duration: '5 min' },
      { id: 6, text: 'Check your work by plugging the answer back in', type: 'task', duration: '3 min' },
    ],
  },
  reading: {
    subject: 'Reading',
    tasks: [
      { id: 1, text: 'Skim the headings and bold words first', type: 'task', duration: '2 min' },
      { id: 2, text: 'Read the first paragraph slowly', type: 'task', duration: '3 min' },
      { id: 3, text: 'Write ONE sentence about what you just read', type: 'task', duration: '2 min' },
      { id: 4, text: 'Stretch break! Touch your toes 5 times', type: 'break', duration: '1 min' },
      { id: 5, text: 'Read the next section', type: 'task', duration: '5 min' },
      { id: 6, text: 'Write a quick summary in your own words', type: 'task', duration: '3 min' },
      { id: 7, text: 'Answer the questions using your notes', type: 'task', duration: '5 min' },
    ],
  },
  writing: {
    subject: 'Writing',
    tasks: [
      { id: 1, text: 'Brain dump! Write every idea for 2 minutes (no editing!)', type: 'task', duration: '2 min' },
      { id: 2, text: 'Pick your best 3 ideas and circle them', type: 'task', duration: '2 min' },
      { id: 3, text: 'Write your topic sentence (just ONE sentence)', type: 'task', duration: '3 min' },
      { id: 4, text: 'Dance break! Play your favorite song and move', type: 'break', duration: '2 min' },
      { id: 5, text: 'Write the body - one paragraph at a time', type: 'task', duration: '8 min' },
      { id: 6, text: 'Deep breath break - breathe in 4, hold 4, out 4', type: 'break', duration: '1 min' },
      { id: 7, text: 'Write your conclusion', type: 'task', duration: '3 min' },
      { id: 8, text: 'Read it out loud and fix anything that sounds weird', type: 'task', duration: '3 min' },
    ],
  },
  science: {
    subject: 'Science',
    tasks: [
      { id: 1, text: 'Read the assignment instructions twice', type: 'task', duration: '3 min' },
      { id: 2, text: 'List the key vocabulary words', type: 'task', duration: '3 min' },
      { id: 3, text: 'Answer the easiest question first (confidence boost!)', type: 'task', duration: '5 min' },
      { id: 4, text: 'Wiggle break! Shake out your hands and roll your shoulders', type: 'break', duration: '1 min' },
      { id: 5, text: 'Tackle the next question - use your textbook if stuck', type: 'task', duration: '5 min' },
      { id: 6, text: 'Draw a diagram or picture if it helps', type: 'task', duration: '3 min' },
      { id: 7, text: 'Review all answers one more time', type: 'task', duration: '3 min' },
    ],
  },
  general: {
    subject: 'Homework',
    tasks: [
      { id: 1, text: 'Read the instructions carefully (highlight key words)', type: 'task', duration: '3 min' },
      { id: 2, text: 'Break it into parts - what needs to happen first?', type: 'task', duration: '2 min' },
      { id: 3, text: 'Start with the easiest part (warm-up!)', type: 'task', duration: '5 min' },
      { id: 4, text: 'Movement break! Walk around the room once', type: 'break', duration: '1 min' },
      { id: 5, text: 'Work on the next section', type: 'task', duration: '8 min' },
      { id: 6, text: 'Breathing break - box breathing for 1 minute', type: 'break', duration: '1 min' },
      { id: 7, text: 'Finish up and double-check everything', type: 'task', duration: '5 min' },
    ],
  },
}

function detectSubject(description) {
  const text = description.toLowerCase()
  if (/math|algebra|geometry|calcul|equation|fraction|number/.test(text)) return 'math'
  if (/read|book|chapter|novel|story|comprehension|literature/.test(text)) return 'reading'
  if (/writ|essay|paragraph|paper|report|journal/.test(text)) return 'writing'
  if (/science|biology|chemistry|physics|lab|experiment/.test(text)) return 'science'
  return 'general'
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { description, extractedText } = await request.json()
  const combinedText = [description, extractedText].filter(Boolean).join(' ').trim()
  if (!combinedText) {
    return NextResponse.json({ error: 'Please describe your homework' }, { status: 400 })
  }

  const subject = detectSubject(combinedText)
  const template = taskTemplates[subject]

  return NextResponse.json({
    subject: template.subject,
    description: combinedText,
    tasks: template.tasks,
    boMessage: `Okay, I see ${template.subject.toLowerCase()} homework! I broke it into ${template.tasks.filter(t => t.type === 'task').length} mini-tasks with breaks built in. You got this! Let's start with step 1.`,
  })
}
