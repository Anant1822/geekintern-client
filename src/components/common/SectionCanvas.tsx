import React, { useEffect, useRef } from 'react'

interface SectionCanvasProps {
  dotColor?: string
  accentColor?: string
}

export function SectionCanvas({
  dotColor = 'rgba(240, 239, 233, 0.08)',
  accentColor = 'rgba(34, 216, 122, 0.4)',
}: SectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.closest('section') || canvas.parentElement
    if (!parent) return

    let animationFrameId: number
    let dots: { x: number; y: number; baseDy: number; dy: number; r: number; phase: number; hover: boolean }[] = []
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      if (window.innerWidth < 768) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      dots = []

      const gap = 52
      const cols = Math.ceil(canvas.width / gap) + 1
      const rows = Math.ceil(canvas.height / gap) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * gap + (canvas.width - cols * gap) / 2,
            y: r * gap + (canvas.height - rows * gap) / 2,
            baseDy: 0,
            dy: 0,
            r: 1.2,
            phase: (c + r) * 0.15,
            hover: false,
          })
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    let time = 0
    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]
        const wave = Math.sin(time + dot.phase) * 2.5
        const curY = dot.y + wave

        // Check mouse distance
        const dx = mouse.x - dot.x
        const dy = mouse.y - curY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isHover = dist < 75

        ctx.beginPath()
        ctx.arc(dot.x, curY, isHover ? 2.5 : dot.r, 0, Math.PI * 2)

        if (isHover) {
          ctx.fillStyle = accentColor
          ctx.shadowBlur = 10
          ctx.shadowColor = accentColor
        } else {
          ctx.fillStyle = dotColor
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    if (window.innerWidth >= 768) {
      render()
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [dotColor, accentColor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default SectionCanvas
