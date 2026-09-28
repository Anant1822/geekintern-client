import React from 'react'

const ALUMNI_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
]

interface AlumniFloatingWidgetProps {
  onClick?: () => void
}

export function AlumniFloatingWidget({ onClick }: AlumniFloatingWidgetProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      const el = document.getElementById('alumni-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
      <div className="relative rounded-full p-[1.5px]">
        {/* Pulsing neon gradient ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#22c55e] via-[#06e4f9] to-[#22c55e] opacity-80 blur-[3px] animate-pulse" />

        <button
          type="button"
          onClick={handleClick}
          className="relative rounded-full border border-white/10 bg-[#12121e]/95 backdrop-blur-md px-3 py-2 md:px-4 md:py-2.5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] hover:border-[#22c55e] cursor-pointer"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center">
              {ALUMNI_AVATARS.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Intern"
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-[#0a0a0f] ${
                    idx > 0 ? '-ml-2.5' : ''
                  }`}
                />
              ))}
            </div>
            <div className="pr-1 text-left">
              <p className="text-sm md:text-[15px] font-semibold text-[#f0efe9] leading-tight font-inter">
                Meet our alumni
              </p>
              <p className="text-[11px] md:text-xs text-[#f0efe9]/60 font-inter">
                Tap to explore their journey
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AlumniFloatingWidget
