import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  Sparkles,
  Award,
  Compass,
  Layers,
  BookOpen,
  CheckCircle2,
  FileText,
  Users,
  Briefcase,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Mail,
  Phone,
  Newspaper,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

export function Header() {
  const [fullMenuOpen, setFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, profile, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setFullMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isLinkActive = (path: string) => {
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-white/10 text-[#f0efe9]',
          scrolled ? 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-1' : 'py-0'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo on Left */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2.5 outline-none group"
              >
                <Logo variant="light" size="md" />
                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-sm md:text-base tracking-wider uppercase text-white group-hover:text-[#06e4f9] transition-colors">
                      Geek Interns
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                    Code. Build. Deploy.
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
              <Link
                to="/browse"
                className={cn(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[#06e4f9] hover:bg-white/5',
                  isLinkActive('/browse') ? 'text-[#06e4f9] bg-white/10 font-bold border border-[#06e4f9]/30' : 'text-[#f0efe9]/80'
                )}
              >
                Tracks
              </Link>

              <Link
                to="/about"
                className={cn(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[#06e4f9] hover:bg-white/5',
                  isLinkActive('/about') ? 'text-[#06e4f9] bg-white/10 font-bold border border-[#06e4f9]/30' : 'text-[#f0efe9]/80'
                )}
              >
                Mission
              </Link>

              <a
                href="/#comparison-section"
                className="px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[#06e4f9] hover:bg-white/5 text-[#f0efe9]/80"
              >
                Comparison
              </a>

              <Link
                to="/student-reviews"
                className={cn(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[#06e4f9] hover:bg-white/5',
                  isLinkActive('/student-reviews') ? 'text-[#06e4f9] bg-white/10 font-bold border border-[#06e4f9]/30' : 'text-[#f0efe9]/80'
                )}
              >
                Reviews
              </Link>

              <Link
                to="/student-portal"
                className={cn(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-emerald-400 hover:bg-emerald-500/10 inline-flex items-center gap-1',
                  isLinkActive('/student-portal') || isLinkActive('/login') ? 'text-emerald-400 bg-emerald-500/15 font-bold border border-emerald-500/40' : 'text-[#f0efe9]/80'
                )}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Portal</span>
              </Link>

              <Link
                to="/blog"
                className={cn(
                  'px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[#06e4f9] hover:bg-white/5',
                  isLinkActive('/blog') ? 'text-[#06e4f9] bg-white/10 font-bold border border-[#06e4f9]/30' : 'text-[#f0efe9]/80'
                )}
              >
                Blog
              </Link>
            </nav>

            {/* Right Side CTAs & GKK Iconic Menu Button */}
            <div className="flex items-center gap-3">
              {/* Primary Apply Button */}
              <Link to="/apply">
                <Button className="h-9 px-4 sm:px-5 rounded-full bg-gradient-to-r from-[#2c2cf3] via-[#06e4f9] to-[#22c55e] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(6,228,249,0.3)] hover:shadow-[0_0_30px_rgba(6,228,249,0.6)] hover:scale-105 active:scale-95 transition-all">
                  <span>Apply Now</span>
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>

              {/* User Account if authenticated */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#06e4f9]/40 text-xs text-white"
                  >
                    <span className="font-mono">{profile?.full_name?.split(' ')[0] || 'User'}</span>
                    <ChevronDown className="h-3 w-3 text-white/60" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/15 bg-[#12121e] p-2 shadow-2xl z-50">
                      {isAdmin ? (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-blue-400" />
                          <span>Admin Console</span>
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* GKK Iconic Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setFullMenuOpen(!fullMenuOpen)}
                className="flex items-center gap-2 group cursor-pointer px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#06e4f9]/50 hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle Fullscreen Navigation Menu"
              >
                <span className="text-xs font-mono font-bold tracking-widest uppercase transition-colors group-hover:text-[#06e4f9] text-[#f0efe9]">
                  {fullMenuOpen ? 'CLOSE' : 'MENU'}
                </span>
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border border-[#f0efe9]/60 flex items-center justify-center transition-all duration-300 text-[#f0efe9]',
                    fullMenuOpen ? 'rotate-45 border-[#06e4f9] text-[#06e4f9]' : 'group-hover:border-[#06e4f9] group-hover:text-[#06e4f9]'
                  )}
                >
                  <span className="text-sm leading-none font-bold">+</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* GKK Fullscreen Curtain Menu Overlay */}
      {fullMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-y-auto animate-in fade-in duration-300 text-[#f0efe9]">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link to="/" onClick={() => setFullMenuOpen(false)} className="flex items-center gap-3">
              <Logo variant="light" size="md" />
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-lg tracking-wider uppercase text-white">
                  Geek Interns
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">
                  A GKK & Bubblesort Venture
                </span>
              </div>
            </Link>

            <button
              onClick={() => setFullMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:border-[#06e4f9] hover:bg-[#06e4f9]/10 transition-all text-xs font-mono font-bold tracking-widest text-white"
            >
              <span>CLOSE</span>
              <span className="text-base leading-none text-[#06e4f9]">✕</span>
            </button>
          </div>

          {/* Center Main Links & Information Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 my-auto">
            {/* Left Big Nav Links */}
            <div className="lg:col-span-7 flex flex-col gap-2 md:gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-2">
                // System Navigation
              </span>

              {[
                { num: '01', name: 'Home Overview', desc: 'Code. Build. Deploy.', href: '/' },
                { num: '02', name: 'About Mission', desc: 'Why Geek Interns Exists', href: '/about' },
                { num: '03', name: 'Internship Tracks', desc: 'Full Stack, AI, Cloud & Mobile', href: '/browse' },
                { num: '04', name: 'Comparison Matrix', desc: 'Traditional Courses vs Geek Interns', href: '/#comparison-section' },
                { num: '05', name: 'Student Reviews', desc: 'Verified Alumni & Testimonials', href: '/student-reviews' },
                { num: '06', name: 'Student Portal', desc: 'Secure OTP Login & Verified Certificate', href: '/student-portal' },
                { num: '07', name: 'Engineering Blog', desc: 'Career Insights, Architecture & Roadmaps', href: '/blog' },
                { num: '08', name: 'Apply for Internship', desc: 'Join the Next Residency Cohort', href: '/apply' },
                { num: '09', name: 'Contact & Enquiry', desc: 'Support & Institutional Partnerships', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.num}
                  to={item.href}
                  onClick={() => setFullMenuOpen(false)}
                  className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-[#06e4f9]/40 transition-all"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-white/30 group-hover:text-[#06e4f9] transition-colors">
                      {item.num}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight text-white/90 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                      {item.name}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-mono text-white/40 group-hover:text-[#06e4f9] transition-colors">
                    {item.desc} ↗
                  </span>
                </Link>
              ))}
            </div>

            {/* Right Information & Lead Magnet Box */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 bg-[#12121e]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Residency Open 2026</span>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
                  Ready to deploy your future?
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Build production-grade applications, earn verifiable GitHub pull request credentials, and work directly with engineering mentors.
                </p>

                <div className="flex flex-col gap-3">
                  <Link to="/apply" onClick={() => setFullMenuOpen(false)}>
                    <Button className="w-full h-11 bg-gradient-to-r from-[#2c2cf3] to-[#06e4f9] hover:shadow-[0_0_25px_rgba(6,228,249,0.5)] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl">
                      Apply for Internship ↗
                    </Button>
                  </Link>
                  <Link to="/student-portal" onClick={() => setFullMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-11 border-white/15 hover:border-emerald-500 hover:bg-emerald-500/10 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl">
                      Student Verification Portal
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Contact info and Socials */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="text-xs font-mono text-white/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#06e4f9]" />
                    <span>Study Enquiry: <a href="mailto:support.geekintern@gmail.com" className="text-white hover:underline">support.geekintern@gmail.com</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Helpline: <a href="tel:+919477564633" className="text-white hover:underline">+91 9477564633</a></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://in.linkedin.com/in/geek-intern"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Anant1822/geekintern-client"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/geekintern"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-white/40">
            <span>© {new Date().getFullYear()} Geek Interns. All rights reserved.</span>
            <span className="text-emerald-400">A GKK & Bubblesort Venture</span>
          </div>
        </div>
      )}
    </>
  )
}
