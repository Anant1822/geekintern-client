import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  Globe,
  Smartphone,
  Cpu,
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  Code2,
  Zap,
  TrendingUp,
  CircuitBoard,
  Server,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile' | 'core'>('all')

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <PublicLayout>
      <PageTitle
        title="Project Portfolios | Web, Mobile & Core Engineering | Geek Intern"
        suffix="geekintern.com"
      />

      <div className="min-h-screen bg-[#F5F2EB] dark:bg-[#151311] text-[#1A1715] dark:text-[#FAF7F2] transition-colors duration-200">
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD2] dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#181614] overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBE6DC] dark:bg-stone-800/80 border border-[#D6CFC4] dark:border-stone-700 text-[#181615] dark:text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-emerald-400" />
              <span>Real Engineering Capstones • Verified Repositories</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A1715] dark:text-white leading-[1.15] mb-5 font-sans"
            >
              Geek Intern Project{' '}
              <span className="font-serif italic font-bold text-[#8C4325] dark:text-[#D97745]">
                Portfolios
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-[#57534E] dark:text-stone-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Explore the real-world software applications, mobile platforms, and hardware systems
              engineered by our interns. Built to production standards, deployed live, and backed by
              verifiable Git histories.
            </motion.p>

            {/* Quick Navigation Jump Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection('web-section')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#EBE6DC] dark:bg-stone-800 text-[#1A1715] dark:text-[#FAF7F2] hover:bg-[#181615] hover:text-white dark:hover:bg-stone-700 transition-colors shadow-xs border border-[#D6CFC4] dark:border-stone-700 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-emerald-400" />
                <span>1. Web Development</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('mobile-section')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#EBE6DC] dark:bg-stone-800 text-[#1A1715] dark:text-[#FAF7F2] hover:bg-[#181615] hover:text-white dark:hover:bg-stone-700 transition-colors shadow-xs border border-[#D6CFC4] dark:border-stone-700 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                <span>2. Mobile Applications</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('core-section')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#EBE6DC] dark:bg-stone-800 text-[#1A1715] dark:text-[#FAF7F2] hover:bg-[#181615] hover:text-white dark:hover:bg-stone-700 transition-colors shadow-xs border border-[#D6CFC4] dark:border-stone-700 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-[#8C4325] dark:text-[#D97745]" />
                <span>3. Core Engineering & Hardware</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: WEB DEVELOPMENT PORTFOLIO */}
        {/* ========================================================= */}
        <section id="web-section" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD2] dark:border-stone-800">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3ED] dark:bg-emerald-950/60 border border-[#C2E0D1] dark:border-emerald-800 text-[#2D6A4F] dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Section 01 • Web & Cloud Engineering</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1715] dark:text-white tracking-tight">
                  Web Development Portfolio
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  Full-stack SaaS platforms, real-time analytics engines, AI agent workflows, and
                  decentralized applications designed with production-grade backend architectures.
                </p>
              </div>

              <Link to="/web-portfolio" className="shrink-0">
                <Button className="h-10 px-5 rounded-full bg-[#181615] hover:bg-[#2A2724] dark:bg-[#FAF7F2] text-white dark:text-[#181615] text-xs font-semibold shadow-xs inline-flex items-center gap-1.5">
                  <span>Explore Full Web Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Featured Web Projects Grid (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {/* Web Project 1: Pulse AI Agent */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      Enterprise LegalTech
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#2D6A4F] dark:text-emerald-400">
                      RAG & Vector Search
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    Pulse AI — Autonomous Contract Intelligence
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Multi-tenant generative AI platform that ingests PDF contracts, parses unstructured clauses with LangChain, and provides cited risk summaries via vector similarity.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['React 18', 'FastAPI', 'Python', 'pgvector', 'Docker'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2D6A4F] dark:text-emerald-400 text-[11px]">
                    10x Faster Audit Review
                  </span>
                  <Link to="/web-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Web Project 2: DevSprint Task Management */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      Productivity SaaS
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#2D6A4F] dark:text-emerald-400">
                      Real-Time WebSockets
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    DevSprint — Agile Kanban & Team Orchestration
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Collaborative project workspace featuring drag-and-drop sprint boards, automated GitHub PR linking, burndown chart analytics, and live activity streams.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Next.js 14', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2D6A4F] dark:text-emerald-400 text-[11px]">
                    Sub-40ms Live Sync
                  </span>
                  <Link to="/web-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Web Project 3: CloudOps Monitoring */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      DevOps & Infra
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#2D6A4F] dark:text-emerald-400">
                      Cluster Telemetry
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    CloudOps — Kubernetes Telemetry Dashboard
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Container observability dashboard streaming pod CPU/memory utilization, alerting on HTTP 5xx spikes, and monitoring automated deployment rollbacks.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['React', 'Go', 'Prometheus', 'Grafana', 'Kubernetes'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2D6A4F] dark:text-emerald-400 text-[11px]">
                    99.98% High Availability
                  </span>
                  <Link to="/web-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: MOBILE APPLICATION PORTFOLIO */}
        {/* ========================================================= */}
        <section id="mobile-section" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD2] dark:border-stone-800 bg-[#FAF7F2] dark:bg-[#181614]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] dark:bg-blue-950/60 border border-[#BFDBFE] dark:border-blue-800 text-[#1D4ED8] dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Section 02 • Mobile & App Engineering</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1715] dark:text-white tracking-tight">
                  Mobile App Development Portfolio
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  Native Android and cross-platform Flutter/React Native mobile applications built with
                  biometric authentication, offline sync engines, and reactive UI architecture.
                </p>
              </div>

              <Link to="/app-portfolio" className="shrink-0">
                <Button className="h-10 px-5 rounded-full bg-[#181615] hover:bg-[#2A2724] dark:bg-[#FAF7F2] text-white dark:text-[#181615] text-xs font-semibold shadow-xs inline-flex items-center gap-1.5">
                  <span>Explore Full App Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Featured App Projects Grid (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {/* App Project 1: FinTrack Wallet */}
              <div className="bg-white dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      FinTech
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#1D4ED8] dark:text-blue-400">
                      Flutter • iOS & Android
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    FinTrack — Crypto & Digital Wallet
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    High-security decentralized mobile wallet enabling asset transfers, biometric FaceID validation, live candlestick order feeds, and offline balance caching.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Flutter', 'Dart', 'Web3.dart', 'Firebase', 'Bloc'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1D4ED8] dark:text-blue-400 text-[11px]">
                    Biometric Protected
                  </span>
                  <Link to="/app-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* App Project 2: FitPulse Companion */}
              <div className="bg-white dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      Health & Fitness
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#1D4ED8] dark:text-blue-400">
                      React Native • Expo
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    FitPulse — Smart Workout & Diet Coach
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Personalized fitness mobile application offering custom rep trackers, background audio pacing, Apple Health / Google Fit step sync, and macro meal logs.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['React Native', 'TypeScript', 'Redux Toolkit', 'SQLite'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1D4ED8] dark:text-blue-400 text-[11px]">
                    HealthKit Integration
                  </span>
                  <Link to="/app-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* App Project 3: AgriConnect Marketplace */}
              <div className="bg-white dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      AgriTech
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#1D4ED8] dark:text-blue-400">
                      Android Native • Kotlin
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    AgriConnect — Direct Farm Mandi B2B App
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Multilingual Android mobile platform connecting rural farmers to buyers with live APMC crop pricing, multilingual voice assistance, and localized weather alerts.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1D4ED8] dark:text-blue-400 text-[11px]">
                    Multilingual & Offline-First
                  </span>
                  <Link to="/app-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: CORE ENGINEERING & HARDWARE PORTFOLIO */}
        {/* ========================================================= */}
        <section id="core-section" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2DDD2] dark:border-stone-800">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] dark:bg-amber-950/60 border border-[#FDE68A] dark:border-amber-800 text-[#92400E] dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Section 03 • Core Engineering & Hardware</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1715] dark:text-white tracking-tight">
                  Core Engineering & Hardware Portfolio
                </h2>
                <p className="text-sm sm:text-base text-[#57534E] dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  Embedded systems, VLSI semiconductor logic, robotics, IoT telemetry, and electric vehicle
                  subsystem simulations engineered by mechanical, electronics, and core engineering interns.
                </p>
              </div>

              <Link to="/core-portfolio" className="shrink-0">
                <Button className="h-10 px-5 rounded-full bg-[#181615] hover:bg-[#2A2724] dark:bg-[#FAF7F2] text-white dark:text-[#181615] text-xs font-semibold shadow-xs inline-flex items-center gap-1.5">
                  <span>Explore Full Core Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Featured Core Projects Grid (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {/* Core Project 1: RISC-V Processor */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      VLSI & Semiconductors
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#8C4325] dark:text-[#D97745]">
                      Verilog • RV32I ISA
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    32-Bit Pipelined RISC-V Processor Core
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Designed a 5-stage pipelined microarchitecture processor core supporting the RV32I instruction set with full data hazard forwarding and branch prediction.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Verilog HDL', 'ModelSim', 'Xilinx Vivado', 'GTKWave', 'FPGA'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#8C4325] dark:text-[#D97745] text-[11px]">
                    100 MHz Timing Closure
                  </span>
                  <Link to="/core-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Core Project 2: Autonomous Industrial AGV */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      Robotics & Control
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#8C4325] dark:text-[#D97745]">
                      ROS 2 • LiDAR SLAM
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    Autonomous Mobile Robot (AMR / AGV)
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    Autonomous factory floor transport robot featuring 2D LiDAR simultaneous localization and mapping (SLAM), obstacle collision avoidance, and wheel odometry PID.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['ROS 2', 'Python', 'C++', 'Gazebo', 'Nav2', 'STM32'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#8C4325] dark:text-[#D97745] text-[11px]">
                    ±15mm Navigation Precision
                  </span>
                  <Link to="/core-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Core Project 3: Smart Grid EV BMS */}
              <div className="bg-[#FAF7F2] dark:bg-[#1A1816] rounded-2xl border border-[#E2DDD2] dark:border-stone-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#181615] dark:hover:border-stone-600 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[11px] font-semibold bg-[#EBE6DC] dark:bg-stone-800 border-[#D6CFC4] text-[#1A1715] dark:text-stone-200">
                      EV & Battery Tech
                    </Badge>
                    <span className="text-[11px] font-semibold text-[#8C4325] dark:text-[#D97745]">
                      Embedded C • CAN Bus
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1715] dark:text-white group-hover:text-[#8C4325] dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
                    Lithium-Ion Battery Management System (BMS)
                  </h3>

                  <p className="text-xs text-[#57534E] dark:text-stone-300 leading-relaxed mb-4">
                    16-cell EV battery management controller with active voltage balancing, State of Charge (SOC) Kalman filtering estimation, and CAN bus isolation.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Embedded C', 'STM32', 'FreeRTOS', 'CAN 2.0B', 'Altium'].map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-[#EBE6DC] dark:bg-stone-800 text-[#57534E] dark:text-stone-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#8C4325] dark:text-[#D97745] text-[11px]">
                    Overvoltage & Thermal Fault Cutoff
                  </span>
                  <Link to="/core-portfolio" className="text-[#1A1715] dark:text-stone-200 font-semibold hover:underline inline-flex items-center gap-1">
                    Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOTTOM CALL TO ACTION */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] dark:bg-[#181614]">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#181615] dark:bg-stone-900 border border-[#2A2724] dark:border-stone-800 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Build Production Software for Your Resume</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Ready to Engineer Your Own Capstone Project?
            </h2>

            <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Enroll in a verified virtual internship track. Complete structured problem statements, commit code to GitHub, and receive recognized credentials with verifiable Certificate IDs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/apply">
                <Button className="h-11 px-7 rounded-full bg-[#FAF7F2] hover:bg-white text-[#181615] font-bold text-xs shadow-lg inline-flex items-center gap-2">
                  <span>Apply for an Internship Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" className="h-11 px-6 rounded-full border-stone-600 bg-transparent text-white hover:bg-white/10 text-xs font-semibold">
                  Browse All 35+ Domains
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}

export default Portfolio
