'use client'

import { useEffect, useRef } from 'react'
import { useMotionPaused, useReducedMotion } from './MotionControls'

/** Preserve the original GIF, with a canvas frame while motion is paused. */
export default function AnimatedStudyImage({ src, alt }: { src: string; alt: string }) {
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const paused = useMotionPaused()
  const reduced = useReducedMotion()
  const freeze = paused || reduced
  const captureFrame = () => {
    const image = imageRef.current, canvas = canvasRef.current
    if (!image?.naturalWidth || !canvas) return
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    canvas.getContext('2d')?.drawImage(image, 0, 0)
  }
  useEffect(() => { if (freeze) captureFrame() }, [freeze])
  return <div className="modal-animated-image" data-frozen={freeze}>
    <canvas ref={canvasRef} role="img" aria-label={alt} />
    {/* eslint-disable-next-line @next/next/no-img-element -- original animated study asset */}
    <img ref={imageRef} src={src} alt={alt} onLoad={captureFrame} className="img-fluid modal-brief-image" />
  </div>
}
