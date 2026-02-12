'use client'

type OptimizedVideoProps = {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  controls?: boolean
}

export default function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  controls = false,
}: OptimizedVideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted={autoPlay} // required only if autoplay is enabled
     
      playsInline
      preload="metadata"
      controls={controls}
      className={`w-full h-full object-cover ${className}`}
    />
  )
}
