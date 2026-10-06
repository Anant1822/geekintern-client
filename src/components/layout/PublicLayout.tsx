import { Header } from './Header'
import { Footer } from './Footer'

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F2EB] dark:bg-[#151311] text-[#1A1715] dark:text-[#FAF7F2] transition-colors duration-200">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}


export default PublicLayout
