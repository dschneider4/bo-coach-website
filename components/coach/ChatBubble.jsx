'use client'

export default function ChatBubble({ message, sender, isTyping, image }) {
  const isBo = sender === 'bo'

  if (isTyping) {
    return (
      <div className="flex gap-3 items-start">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-cyan to-primary-blue flex items-center justify-center text-xs font-bold text-white shrink-0">
          Bo
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
          <div className="flex gap-1.5 typing-dots">
            <span className="w-2 h-2 bg-bright-cyan/60 rounded-full" />
            <span className="w-2 h-2 bg-bright-cyan/60 rounded-full" />
            <span className="w-2 h-2 bg-bright-cyan/60 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-3 items-start ${isBo ? '' : 'flex-row-reverse'}`}>
      {isBo ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-cyan to-primary-blue flex items-center justify-center text-xs font-bold text-white shrink-0">
          Bo
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-soft-pink to-warm-yellow flex items-center justify-center text-xs font-bold text-white shrink-0">
          You
        </div>
      )}
      <div
        className={`rounded-2xl px-4 py-3 max-w-[80%] chat-bubble-enter ${
          isBo
            ? 'bg-white/5 border border-white/10 rounded-tl-sm text-light-cream/90'
            : 'bg-gradient-to-r from-primary-blue/30 to-bright-cyan/20 border border-bright-cyan/20 rounded-tr-sm text-light-cream'
        }`}
      >
        {image && (
          <div className="mb-2 rounded-lg overflow-hidden max-w-[240px]">
            <img src={image} alt="Homework photo" className="w-full h-auto" />
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  )
}
