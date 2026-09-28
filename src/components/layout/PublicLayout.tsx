import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PublicLayoutProps {
  children: React.ReactNode
  noPadding?: boolean
}

export function PublicLayout({ children, noPadding = false }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-[#f0efe9] selection:bg-[#06e4f9]/30 selection:text-white relative overflow-x-hidden w-full max-w-full">
      <Header />
      <main className={`flex-1 ${noPadding ? 'pt-0' : 'pt-16 md:pt-20'} w-full overflow-x-hidden`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
