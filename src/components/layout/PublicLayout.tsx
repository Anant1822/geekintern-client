import { Header } from './Header'
import { Footer } from './Footer'

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0f] text-[#f0efe9] selection:bg-[#06e4f9]/30 selection:text-white relative overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  )
}


export default PublicLayout
