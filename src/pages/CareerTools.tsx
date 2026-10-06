import React from 'react'
import { Link } from 'react-router-dom'
import {
  FileCheck,
  FileText,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BrainCircuit
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const TOOLS = [
  {
    title: 'ATS Resume Score Checker',
    description:
      'Upload your resume and benchmark it against real job descriptions. Get a detailed breakdown of keyword matches, formatting readability, and missing skills to pass recruiter screening.',
    icon: FileCheck,
    path: '/ats-checker',
    tag: 'Popular',
    color: 'text-[#181615]', bg: 'bg-[#EBE6DC]', border: 'border-[#E2DDD2]', btnBg: 'bg-[#181615] hover:bg-[#2A2724]',
    action: 'Scan Resume Free',
  },
  {
    title: 'Interactive Resume Builder',
    description:
      'Build clean, professional, ATS-optimized developer resumes in minutes. Choose proven tech templates, edit your achievements in real-time, and download your recruiter-ready PDF.',
    icon: FileText,
    path: '/resume-builder',
    tag: 'Free Tool',
    color: 'text-[#8C4325]', bg: 'bg-[#F0E6DC]', border: 'border-[#E2DDD2]', btnBg: 'bg-[#181615] hover:bg-[#2A2724]',
    action: 'Build My Resume',
  },
  {
    title: 'Developer Portfolio Builder',
    description:
      'Turn your GitHub repositories, technical skills, and internship certificates into an elegant personal portfolio website ready to impress prospective hiring managers.',
    icon: Layers,
    path: '/portfolio-builder',
    tag: 'Instant Setup',
    color: 'text-[#2D6A4F]', bg: 'bg-[#E8F3ED]', border: 'border-[#E2DDD2]', btnBg: 'bg-[#181615] hover:bg-[#2A2724]',
    action: 'Generate Portfolio',
  },
]

const BENEFITS = [
  {
    icon: BrainCircuit,
    title: 'Bypass Automated Filters',
    desc: 'Over 75% of tech applications are filtered before human eyes see them. Our tools help you match algorithmic keywords accurately.',
  },
  {
    icon: TrendingUp,
    title: 'Higher Interview Call Rate',
    desc: 'Students utilizing ATS-optimized resumes and interactive GitHub project portfolios experience 3x more interview callbacks.',
  },
  {
    icon: ShieldCheck,
    title: '100% Free for Learners',
    desc: 'All Geek Intern career acceleration utilities are completely free to use without hidden paywalls or subscription traps.',
  },
]

export function CareerTools() {
  return (
    <PublicLayout>
      <PageTitle title="Free AI Career Tools | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Career Acceleration Suite
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Free AI <span className="italic font-serif text-[#8C4325]">Career Tools</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Maximize your chances of landing high-paying developer roles with our purpose-built technical preparation toolkit.
          </p>
        </div>
      </section>

      {/* Tools Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.map((tool, idx) => {
              const IconComp = tool.icon
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-xs`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] bg-[#EBE6DC] px-2.5 py-1 rounded-full border border-[#E2DDD2]">
                        {tool.tag}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1A1715] mb-3">{tool.title}</h2>
                    <p className="text-[#57534E] text-sm leading-relaxed mb-8">
                      {tool.description}
                    </p>
                  </div>
                  <Link to={tool.path}>
                    <Button className={`w-full ${tool.btnBg} text-white font-semibold text-xs h-11 rounded-full shadow-xs inline-flex items-center justify-center gap-2`}>
                      <span>{tool.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Value Props */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#E2DDD2] pt-16">
            {BENEFITS.map((item, idx) => {
              const BIcon = item.icon
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#EBE6DC] text-[#181615] flex items-center justify-center shrink-0 mt-1 border border-[#E2DDD2]">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1715] mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default CareerTools
