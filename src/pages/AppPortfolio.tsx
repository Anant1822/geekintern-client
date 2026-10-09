import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Smartphone,
  Search,
  Sparkles,
  Github,
  Apple
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

interface MobileApp {
  id: string
  name: string
  category: string
  platforms: ('iOS' | 'Android' | 'Flutter' | 'React Native')[]
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl?: string
  featured?: boolean
}

const MOBILE_APPS: MobileApp[] = [
  {
    id: 'fintrack-wallet',
    name: 'FinTrack Crypto & Multi-Currency Wallet',
    category: 'FinTech',
    platforms: ['Flutter', 'iOS', 'Android'],
    description:
      'High-security decentralized digital wallet enabling token transfers, biometric face recognition authentication, real-time market candlestick feeds, and portfolio analytics.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Web3.dart', 'Bloc Pattern'],
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/fintrack-wallet',
    featured: true,
  },
  {
    id: 'fitpulse-companion',
    name: 'FitPulse Daily Workout & Gym Coach',
    category: 'Health & Fitness',
    platforms: ['React Native', 'iOS', 'Android'],
    description:
      'Interactive fitness companion with AI-curated workout splits, Apple HealthKit & Google Fit step synchronization, heart rate monitors, and calorie macros breakdown.',
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'HealthKit', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/fitpulse-companion',
    featured: true,
  },
  {
    id: 'quickbite-delivery',
    name: 'QuickBite On-Demand Food Delivery',
    category: 'Delivery & Logistics',
    platforms: ['Flutter', 'Android'],
    description:
      'Real-time courier and customer dispatch application featuring live GPS delivery driver tracking via Google Maps, customized restaurant menus, and payment checkouts.',
    technologies: ['Flutter', 'Google Maps API', 'Socket.io', 'Express.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/quickbite-delivery',
  },
  {
    id: 'devconnect-community',
    name: 'DevConnect Social Network for Engineers',
    category: 'Social Networking',
    platforms: ['React Native', 'iOS', 'Android'],
    description:
      'Mobile developer community platform offering real-time direct messaging, code snippet sharing with syntax highlights, community channels, and referral boards.',
    technologies: ['React Native', 'Supabase', 'PostgreSQL', 'Tailwind', 'Expo'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/devconnect-mobile',
    featured: true,
  },
  {
    id: 'zenmind-meditation',
    name: 'ZenMind Mindfulness & Sleep Tracker',
    category: 'Lifestyle',
    platforms: ['iOS'],
    description:
      'Audio-guided meditation and ambient white noise app with offline audio caching, daily mindfulness streaks, custom timer intervals, and soothing haptic feedback.',
    technologies: ['Swift', 'SwiftUI', 'AVFoundation', 'CoreData', 'Combine'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/zenmind-ios',
  },
  {
    id: 'agrisense-iot',
    name: 'AgriSense Smart Farming Telemetry',
    category: 'Agriculture & IoT',
    platforms: ['Android'],
    description:
      'Agricultural dashboard monitoring soil moisture, ambient humidity, automated sprinkler controls, and micro-climate forecasting using MQTT sensors.',
    technologies: ['Kotlin', 'Jetpack Compose', 'MQTT', 'Room DB', 'Retrofit'],
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop',
    githubUrl: 'https://github.com/geekintern-internships/agrisense-android',
  },
]

const PLATFORM_FILTERS = ['All Platforms', 'Flutter', 'React Native', 'iOS', 'Android']

export function AppPortfolio() {
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredApps = MOBILE_APPS.filter((app) => {
    const matchesPlatform =
      selectedPlatform === 'All Platforms' || app.platforms.includes(selectedPlatform as any)
    const matchesSearch =
      !searchQuery ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesPlatform && matchesSearch
  })

  return (
    <PublicLayout>
      <PageTitle title="Mobile App Portfolio | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] dark:bg-[#151311] bg-dot-matrix text-[#1A1715] dark:text-[#FAF7F2] border-b border-[#E2DDD2] dark:border-stone-800 overflow-hidden">
        <motion.div
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/3 w-80 h-80 rounded-full bg-[#EBE6DC]/60 dark:bg-stone-900/40 blur-[90px] pointer-events-none -z-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#E8F3ED] text-[#2D6A4F] border border-[#C2E0D1] uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Mobile Solutions
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715] dark:text-[#FAF7F2]">
            Mobile Application <span className="italic font-serif text-[#8C4325]">Portfolio</span>
          </h1>
          <p className="text-[#57534E] dark:text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            High-performance cross-platform and native iOS & Android applications engineered for speed, offline reliability, and delightful mobile UX.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search apps by stack (Flutter, Kotlin, React Native...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white dark:bg-[#1C1A17] border-slate-300 dark:border-stone-700 text-[#1A1715] dark:text-[#FAF7F2] placeholder:text-slate-400 rounded-full shadow-xs"
            />
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs & App Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {/* Platform Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {PLATFORM_FILTERS.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedPlatform === plat
                    ? 'bg-[#181615] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1A1715] hover:bg-[#EBE6DC] border border-[#E2DDD2]'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app) => (
              <article
                key={app.id}
                className="group rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] hover:border-[#181615]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-xs"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EBE6DC]">
                  <img
                    src={app.imageUrl}
                    alt={app.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md text-[11px] font-bold text-[#1A1715] border border-[#E2DDD2] shadow-xs">
                    {app.category}
                  </div>
                  {app.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] text-[10px] font-extrabold tracking-wide uppercase shadow-xs">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Platform badges */}
                    <div className="flex items-center gap-1.5 mb-3">
                      {app.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded-full bg-[#E8F3ED] text-[#2D6A4F] text-[10px] font-bold border border-[#C2E0D1]"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-[#1A1715] mb-2 group-hover:text-[#8C4325] transition-colors">
                      {app.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4 line-clamp-3">
                      {app.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {app.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-[#EBE6DC] text-[#57534E] text-[11px] font-semibold border border-[#E2DDD2]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#E2DDD2] flex items-center gap-2">
                    <Link
                      to={`/apply?domain=Android App Development`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white px-3 py-2.5 text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Learn Mobile Dev</span>
                    </Link>
                    {app.githubUrl && (
                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-full border border-[#E2DDD2] hover:bg-[#EBE6DC] text-[#57534E] hover:text-[#1A1715] transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-20 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1A1715]">Want to Build Android or Flutter Apps?</h3>
            <p className="text-[#57534E] text-sm max-w-xl mx-auto mb-6">
              Join Geek Intern mobile internship track and learn native Android, Kotlin, or Flutter architecture with real project deliverables.
            </p>
            <Link to="/apply?domain=Android App Development">
              <Button className="h-11 px-8 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs shadow-xs">
                Apply for Mobile Internship →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default AppPortfolio
