import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Clock, IndianRupee, Heart, BadgeCheck,
  Calendar, Users, Wifi, Monitor, Building2
} from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import type { Internship } from '@/types'
import {
  cn, formatCurrency, formatDate, formatDuration,
  getWorkModeLabel, isDeadlinePassed, truncateText
} from '@/lib/utils'
import { internshipsService } from '@/services/internships'
import { useAuth } from '@/hooks/useAuth'

interface InternshipCardProps {
  internship: Internship
  className?: string
  onSaveToggle?: (id: string, saved: boolean) => void
}

const WorkModeIcon = ({ mode }: { mode: string }) => {
  if (mode === 'remote') return <Wifi className="h-3 w-3" />
  if (mode === 'onsite') return <Building2 className="h-3 w-3" />
  return <Monitor className="h-3 w-3" />
}

export function InternshipCard({ internship, className, onSaveToggle }: InternshipCardProps) {
  const { isAuthenticated } = useAuth()
  const [isSaved, setIsSaved] = useState(internship.is_saved ?? false)
  const [savingLoading, setSavingLoading] = useState(false)
  const deadlinePassed = isDeadlinePassed(internship.application_deadline)

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return
    setSavingLoading(true)
    try {
      if (isSaved) {
        await internshipsService.unsaveInternship(internship.id)
        setIsSaved(false)
        onSaveToggle?.(internship.id, false)
      } else {
        await internshipsService.saveInternship(internship.id)
        setIsSaved(true)
        onSaveToggle?.(internship.id, true)
      }
    } catch {
      // ignore
    } finally {
      setSavingLoading(false)
    }
  }

  const skills = internship.required_skills || (internship as any).skills_required || []
  const seatsTotal = internship.seats_total || (internship as any).max_applicants || 0
  const seatsFilled = internship.seats_filled || 0
  const seatsLeft = seatsTotal - seatsFilled
  const isAlmostFull = seatsTotal > 0 && seatsLeft <= 3 && seatsLeft > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={cn('internship-card flex flex-col h-full overflow-hidden bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524] rounded-2xl shadow-xs hover:border-[#181615]/40 transition-all duration-300', className)}>
      <CardContent className="pt-5 pb-3 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {internship.is_verified && (
                <BadgeCheck className="h-4 w-4 text-[#2D6A4F] shrink-0" aria-label="Verified" />
              )}
              {internship.is_featured && (
                <Badge variant="amber" className="text-[10px] py-0 bg-[#F0E6DC] text-[#8C4325] border-[#E4D5C7]">Featured</Badge>
              )}
              {internship.category && (
                <Badge variant="teal" className="text-[10px] py-0 bg-[#E8F3ED] text-[#2D6A4F] border-[#C2E0D1]">{internship.category.name}</Badge>
              )}
            </div>
            <h3 className="font-semibold text-base text-[#1A1715] dark:text-[#FAF7F2] leading-snug">
              <Link
                to={`/internship/${internship.id}`}
                className="hover:text-[#8C4325] transition-colors line-clamp-2"
              >
                {internship.title}
              </Link>
            </h3>
            <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mt-0.5 truncate">{internship.provider_name}</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleSaveToggle}
              disabled={savingLoading}
              className={cn(
                'p-1.5 rounded-full transition-colors shrink-0 mt-0.5',
                isSaved
                  ? 'text-red-500 hover:text-red-400'
                  : 'text-muted-foreground hover:text-red-400'
              )}
              aria-label={isSaved ? 'Unsave internship' : 'Save internship'}
            >
              <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
            </button>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.slice(0, 3).map((skill: string) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-[#EBE6DC] dark:bg-[#292524] px-2.5 py-0.5 text-[11px] font-medium text-[#57534E] dark:text-[#A8A29E]"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="text-[11px] text-[#57534E] dark:text-[#A8A29E]">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
          {/* Work mode + location */}
          <div className="flex items-center gap-1.5 text-xs text-[#57534E] dark:text-[#A8A29E]">
            <WorkModeIcon mode={internship.work_mode} />
            <span>{getWorkModeLabel(internship.work_mode)}</span>
          </div>
          {internship.location && (
            <div className="flex items-center gap-1.5 text-xs text-[#57534E] dark:text-[#A8A29E]">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{internship.location}</span>
            </div>
          )}
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-xs text-[#57534E] dark:text-[#A8A29E]">
            <Clock className="h-3 w-3 shrink-0" />
            <span>{formatDuration(internship.duration_weeks)}</span>
          </div>
          {/* Stipend */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <IndianRupee className="h-3 w-3 shrink-0 text-[#2D6A4F]" />
            <span className={internship.is_paid ? 'text-[#2D6A4F]' : 'text-[#57534E] dark:text-[#A8A29E]'}>
              {internship.is_paid && internship.stipend_amount
                ? `${formatCurrency(internship.stipend_amount)}/mo`
                : 'Unpaid'}
            </span>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <Calendar className="h-3 w-3 text-[#57534E] dark:text-[#A8A29E] shrink-0" />
          <span className={cn('text-xs', deadlinePassed ? 'text-red-500 font-medium' : 'text-[#57534E] dark:text-[#A8A29E]')}>
            {deadlinePassed ? 'Deadline passed' : `Apply by ${formatDate(internship.application_deadline)}`}
          </span>
        </div>

        {isAlmostFull && !deadlinePassed && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <Users className="h-3 w-3 text-orange-500 shrink-0" />
            <span className="text-xs text-orange-600 font-medium">Only {seatsLeft} seats left!</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 pb-4 px-6 flex items-center justify-between gap-2 border-t border-[#E2DDD2] dark:border-[#292524] mt-0">
        <div className="text-xs flex items-center gap-1.5 font-medium text-[#2D6A4F]">
          <BadgeCheck className="w-3.5 h-3.5" />
          <span>Verified Program</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="text-xs h-8 rounded-full border-[#D6CFC4] bg-[#FAF8F5] hover:bg-[#EAE4D7] text-[#1A1715]"
          >
            <Link to={`/internship/${internship.id}`}>
              Details
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            disabled={deadlinePassed || internship.has_applied}
            className={cn(
              deadlinePassed && 'opacity-50 cursor-not-allowed',
              !deadlinePassed && 'bg-[#181615] hover:bg-[#2A2724] text-white font-medium text-xs h-8 rounded-full shadow-xs'
            )}
          >
            <Link to={`/apply?domain=${encodeURIComponent(internship.title)}&internshipId=${internship.id}`}>
              Apply Now
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
    </motion.div>
  )
}

// Skeleton version
export function InternshipCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="pt-5 pb-3">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex gap-1.5 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 ml-auto" />
      </CardFooter>
    </Card>
  )
}
