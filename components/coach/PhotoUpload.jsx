'use client'

import { useState, useRef } from 'react'
import { Camera, X, Loader2, ImageIcon } from 'lucide-react'

export default function PhotoUpload({ onExtractedText, onImagePreview, disabled }) {
  const [preview, setPreview] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Show preview
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setPreview(dataUrl)
      onImagePreview?.(dataUrl)
    }
    reader.readAsDataURL(file)

    // Run OCR
    setProcessing(true)
    try {
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng')
      const { data: { text } } = await worker.recognize(file)
      await worker.terminate()

      const cleaned = text.trim()
      if (cleaned) {
        onExtractedText(cleaned)
      } else {
        setError("Couldn't read text from this photo. Try typing instead!")
      }
    } catch {
      setError('Failed to process photo. Try again or type your homework.')
    } finally {
      setProcessing(false)
    }

    // Reset file input so same file can be re-selected
    e.target.value = ''
  }

  const clearPreview = () => {
    setPreview(null)
    setError(null)
    onImagePreview?.(null)
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || processing}
      />

      {preview ? (
        <div className="relative inline-block">
          <button
            type="button"
            onClick={clearPreview}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10 hover:bg-red-400 transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          </div>
          {processing && (
            <div className="absolute inset-0 bg-dark-bg/70 rounded-xl flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-bright-cyan animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || processing}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-light-cream/50 hover:text-bright-cyan hover:border-bright-cyan/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Upload homework photo"
        >
          <Camera className="w-4 h-4" />
        </button>
      )}

      {processing && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-bright-cyan/70 bg-dark-bg/90 px-2 py-1 rounded">
          Analyzing photo...
        </div>
      )}

      {error && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-soft-pink/70 bg-dark-bg/90 px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
