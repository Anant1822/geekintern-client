import { Spinner } from '@/components/ui/spinner'

export function LoadingPage() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 gap-3">
      {/* Top minimal loading bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#181615]/10 dark:bg-[#FAF7F2]/10 overflow-hidden z-50">
        <div className="h-full bg-[#181615] dark:bg-[#FAF7F2] w-1/3 animate-pulse" />
      </div>
      <Spinner size="md" className="text-[#181615] dark:text-[#FAF7F2]" />
      <span className="text-xs text-[#57534E] dark:text-[#A8A29E] font-medium">Loading content...</span>
    </div>
  )
}

export default LoadingPage
