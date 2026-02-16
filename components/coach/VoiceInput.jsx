'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'

export default function VoiceInput({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
  }, [onTranscript])

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }, [isListening])

  if (!supported) return null

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`p-3 rounded-xl transition-all duration-300 ${
        isListening
          ? 'bg-red-500/20 border border-red-500/50 text-red-400 shadow-lg shadow-red-500/20'
          : 'bg-white/5 border border-white/10 text-light-cream/50 hover:text-bright-cyan hover:border-bright-cyan/30'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
      title={isListening ? 'Stop recording' : 'Voice input'}
    >
      {isListening ? (
        <div className="relative">
          <MicOff className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full voice-pulse" />
        </div>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  )
}
