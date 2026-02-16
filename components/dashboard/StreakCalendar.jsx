'use client'

export default function StreakCalendar({ sessions }) {
  // Build a map of date -> session count for last 30 days
  const today = new Date()
  const days = []
  const activityMap = {}

  sessions.forEach((s) => {
    const date = new Date(s.completedAt).toISOString().split('T')[0]
    activityMap[date] = (activityMap[date] || 0) + 1
  })

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    days.push({
      date: key,
      count: activityMap[key] || 0,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
    })
  }

  const getIntensity = (count) => {
    if (count === 0) return 'bg-white/5'
    if (count === 1) return 'bg-bright-cyan/20'
    if (count === 2) return 'bg-bright-cyan/40'
    return 'bg-bright-cyan/70'
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-light-cream/70 mb-4">Activity (Last 30 Days)</h3>
      <div className="flex gap-1 flex-wrap">
        {days.map((day) => (
          <div
            key={day.date}
            className={`w-7 h-7 rounded-md ${getIntensity(day.count)} border border-white/5 transition-all hover:scale-110 cursor-default`}
            title={`${day.label}: ${day.count} session${day.count !== 1 ? 's' : ''}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-light-cream/30">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5" />
          <div className="w-3 h-3 rounded-sm bg-bright-cyan/20" />
          <div className="w-3 h-3 rounded-sm bg-bright-cyan/40" />
          <div className="w-3 h-3 rounded-sm bg-bright-cyan/70" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
