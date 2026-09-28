import React from 'react'

interface SectionCanvasProps {
  dotColor?: string
  accentColor?: string
}

export function SectionCanvas({
  dotColor = 'rgba(240, 239, 233, 0.07)',
}: SectionCanvasProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
        backgroundSize: '40px 40px',
      }}
    />
  )
}

export default SectionCanvas
