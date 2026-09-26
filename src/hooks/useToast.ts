import { useCallback } from 'react'
import { toast as globalToast } from '@/components/ui/toaster'

export interface Toast {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

export function useToast() {
  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    globalToast(props)
  }, [])

  const success = useCallback(
    (title: string, description?: string) => globalToast({ title, description, variant: 'success' }),
    []
  )

  const error = useCallback(
    (title: string, description?: string) => globalToast({ title, description, variant: 'destructive' }),
    []
  )

  return { toast, success, error, dismiss: () => {} }
}

