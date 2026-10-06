import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-[#FAF7F2] dark:bg-[#1C1A17] border-[#E2DDD2] dark:border-[#292524] text-[#1A1715] dark:text-[#FAF7F2]',
        destructive: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300 [&>svg]:text-red-600',
        success: 'border-[#C2E0D1] bg-[#E8F3ED] text-[#2D6A4F] dark:border-[#2D6A4F]/40 dark:bg-[#2D6A4F]/10 dark:text-[#C2E0D1] [&>svg]:text-[#2D6A4F]',
        warning: 'border-[#E4D5C7] bg-[#F0E6DC] text-[#8C4325] dark:border-[#8C4325]/40 dark:bg-[#8C4325]/10 dark:text-[#E4D5C7] [&>svg]:text-[#8C4325]',
        info: 'border-[#E2DDD2] bg-[#EBE6DC] text-[#57534E] dark:border-[#292524] dark:bg-[#1C1A17] dark:text-[#FAF7F2] [&>svg]:text-[#181615]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
