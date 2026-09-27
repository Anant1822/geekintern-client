import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  Server,
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  BrainCircuit,
  Bot,
  TrendingUp,
  BarChart3,
  Cloud,
  ShieldCheck,
  Layers,
  Building2,
  Wrench,
  Gauge,
  BatteryCharging,
  Network,
  CircuitBoard,
  CheckCircle2,
  Palette,
  Filter,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { ALL_DOMAINS, CATEGORY_TABS } from '@/data/domains'

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Server,
  Code2,
  Smartphone,
  Terminal,
  Cpu,
  BrainCircuit,
  Bot,
  TrendingUp,
  BarChart3,
  Cloud,
  Sparkles,
  ShieldCheck,
  Layers,
  Palette,
  Building2,
  Wrench,
  Gauge,
  BatteryCharging,
  Network,
  CircuitBoard,
}

export default function BrowseInternships() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All Programs'
  const initialSearch = searchParams.get('q') || ''

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)

  const filteredDomains = useMemo(() => {
    return ALL_DOMAINS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All Programs' || item.category === activeCategory

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <PublicLayout>
      <PageTitle title="Engineering Tracks & Domains | Geek Interns" />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#2c2cf3]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#06e4f9]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10">
        {/* Hero / Header Section */}
        <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06e4f9]/10 border border-[#06e4f9]/30 text-[#06e4f9] text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>31 Specialized Engineering Tracks</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight mb-2">
              Browse All Internship <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06e4f9] via-sky-300 to-[#2c2cf3]">Tracks</span>
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-white/60 max-w-2xl mx-auto mb-8">
              select your discipline and build production software.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by track, tech, or skills (e.g. React, Python, EV, VLSI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-10 h-12 bg-white/[0.04] border-white/15 text-white placeholder-white/40 rounded-2xl text-sm font-mono focus-visible:ring-[#06e4f9]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Catalog View */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Pills Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/40 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#06e4f9]" />
              Filter:
            </div>
            {CATEGORY_TABS.map((tab) => {
              const count =
                tab === 'All Programs'
                  ? ALL_DOMAINS.length
                  : ALL_DOMAINS.filter((d) => d.category === tab).length

              return (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeCategory === tab
                      ? 'bg-[#06e4f9] text-black font-bold shadow-[0_0_20px_rgba(6,228,249,0.35)]'
                      : 'bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeCategory === tab
                        ? 'bg-black/20 text-black'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Results Count Bar */}
          <div className="flex items-center justify-between mb-8 text-xs font-mono uppercase tracking-wider text-white/40 border-b border-white/10 pb-3">
            <div>
              Showing <span className="font-bold text-white">{filteredDomains.length}</span> tracks in{' '}
              <span className="text-[#06e4f9] font-bold">{activeCategory}</span>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#06e4f9] hover:underline inline-flex items-center gap-1 font-bold"
              >
                <span>Clear search</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Grid of All Domain Programs */}
          {filteredDomains.length === 0 ? (
            <div className="text-center py-20 cyber-card rounded-3xl border border-white/10 p-8 max-w-lg mx-auto">
              <Code2 className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-display text-white">No Tracks Found</h3>
              <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto font-sans">
                We could not find any tracks matching &ldquo;{searchQuery}&rdquo;. Try another technology or browse all categories.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('All Programs')
                }}
                variant="outline"
                className="mt-6 text-xs font-mono uppercase tracking-wider h-10 rounded-full border-white/20 text-white hover:bg-white/10"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDomains.map((domain, idx) => {
                const IconComp = iconMap[domain.iconName] || Globe
                const displayNum = (idx + 1).toString().padStart(2, '0')

                return (
                  <div
                    key={domain.id}
                    className="cyber-card p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#06e4f9]/50 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#06e4f9]/5 rounded-bl-full pointer-events-none group-hover:bg-[#06e4f9]/10 transition-colors" />

                    <div>
                      {/* Top Row: Icon + Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-white/40 font-bold tracking-wider">
                          TRACK {displayNum}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {domain.category}
                          </span>
                          <span className="text-[10px] font-mono text-[#06e4f9] bg-[#06e4f9]/10 px-2 py-0.5 rounded border border-[#06e4f9]/30">
                            {domain.badge}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06e4f9] group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-[#06e4f9] transition-colors">
                          {domain.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-white/60 font-sans leading-relaxed mb-6">
                        {domain.description}
                      </p>

                      {/* Key Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {domain.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] text-white/70 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Bottom Meta & Apply Action */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{domain.duration}</span>
                      </div>

                      <Link
                        to={`/apply?domain=${encodeURIComponent(domain.title)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#06e4f9] hover:text-white transition-colors"
                      >
                        <span>Apply For Track</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
