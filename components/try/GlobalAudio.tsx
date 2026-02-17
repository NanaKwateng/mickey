'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import { AudioLinesIcon } from '../ux/icons'

export default function GlobalAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Initialize audio only once
  useEffect(() => {
    const audio = new Audio('/audio/music.mp3')
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    const handleCanPlay = () => setIsReady(true)
    audio.addEventListener('canplaythrough', handleCanPlay)

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  const toggleAudio = async () => {
    const audio = audioRef.current
    if (!audio || !isReady) return

    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch (err) {
      console.warn('Audio playback blocked:', err)
    }
  }

  return (
    <Button
      onClick={toggleAudio}
      variant={"secondary"}
      size={"icon-sm"}
      aria-label="Toggle sound"
      className="rounded-full"
    >
      {/* <span
        className={`w-2 h-2 rounded-full transition ${
          isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/40'
        }`}
      /> */}
      {isPlaying ? <AudioLinesIcon /> : <Play />}
    </Button>
  )
}
