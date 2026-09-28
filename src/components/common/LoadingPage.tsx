import { Spinner } from '@/components/ui/spinner'

export function LoadingPage() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 gap-3">
      {/* Top minimal loading bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600/20 overflow-hidden z-50">
        <div className="h-full bg-blue-600 w-1/3 animate-pulse" />
      </div>
      <Spinner size="md" className="text-blue-600" />
      <span className="text-xs text-slate-500 font-medium">Loading content...</span>
    </div>
  )
}

export default LoadingPage
