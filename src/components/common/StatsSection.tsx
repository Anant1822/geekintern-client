import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
}

const DEFAULT_STATS: Stat[] = [
  { label: 'Students Registered', value: 5000, suffix: '+' },
  { label: 'Internship Listings', value: 200, suffix: '+' },
  { label: 'Partner Colleges', value: 50, suffix: '+' },
  { label: 'Successful Placements', value: 1000, suffix: '+' },
]

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function StatCounter({ value, suffix = '', prefix = '', duration = 1500 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const steps = 60
    const increment = value / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [hasStarted, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

interface StatsSectionProps {
  stats?: Stat[]
  className?: string
  dark?: boolean
}

export function StatsSection({ stats = DEFAULT_STATS, className, dark = false }: StatsSectionProps) {
  return (
    <div className={cn('py-12 bg-dot-matrix', className)}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="text-center p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-[#292524] shadow-xs hover:shadow-card-hover transition-all duration-300"
            >
              <p className={cn(
                'text-3xl sm:text-5xl font-extrabold mb-2 tracking-tight',
                dark ? 'text-white' : 'text-[#1A1715] dark:text-[#FAF7F2]'
              )}>
                <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className={cn(
                'text-xs sm:text-sm font-medium',
                dark ? 'text-white/70' : 'text-[#57534E] dark:text-[#A8A29E]'
              )}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default StatsSection
