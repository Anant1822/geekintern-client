import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getInitials } from '@/lib/utils'
import type { Testimonial } from '@/types'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card className={cn('h-full flex flex-col bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524] rounded-2xl', className)}>
      <CardContent className="pt-6 flex-1 flex flex-col">
        {/* Rating stars */}
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < testimonial.rating
                  ? 'fill-[#D97706] text-[#D97706]'
                  : 'fill-muted text-muted-foreground'
              )}
            />
          ))}
          {testimonial.is_placeholder && (
            <Badge variant="outline" className="ml-2 text-[10px] bg-[#EBE6DC] text-[#57534E] border-[#E2DDD2]">Sample</Badge>
          )}
        </div>

        {/* Content */}
        <blockquote className="text-sm text-[#1A1715]/80 dark:text-[#FAF7F2]/80 leading-relaxed flex-1 mb-4">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#E2DDD2] dark:border-[#292524]">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar_url} alt={testimonial.student_name} />
            <AvatarFallback className="bg-[#181615] text-[#FAF7F2] text-xs font-semibold">
              {getInitials(testimonial.student_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-[#1A1715] dark:text-[#FAF7F2]">{testimonial.student_name}</p>
            <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">{testimonial.college_name}</p>
            <p className="text-xs text-[#2D6A4F] font-medium mt-0.5">{testimonial.internship_title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default TestimonialCard
