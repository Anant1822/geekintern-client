import { useEffect } from 'react'

interface PageTitleProps {
  title: string
  suffix?: string
}

export function PageTitle({ title, suffix = 'GeekIntern' }: PageTitleProps) {
  useEffect(() => {
    document.title = suffix ? `${title} | ${suffix}` : title
    return () => {
      document.title = 'GeekIntern | Virtual Tech Internships & Learning for Geeks'
    }
  }, [title, suffix])

  return null
}

export default PageTitle
