import React from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Award,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const TRACKS = [
  {
    title: 'Full Stack Web Engineering Track',
    duration: '6 Weeks / 3 Months',
    eligibility: 'B.Tech / BCA / MCA / B.Sc IT',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    description: 'Comprehensive industry training focusing on end-to-end cloud applications, database indexing, API security, and scalable architecture.',
  },
  {
    title: 'AI, Machine Learning & Data Analytics',
    duration: '6 Weeks / 3 Months',
    eligibility: 'B.Tech / BCA / Data Science Students',
    technologies: ['Python', 'FastAPI', 'Pandas', 'Scikit-Learn', 'PyTorch', 'SQL'],
    description: 'Practical training covering predictive machine learning, deep learning model fine-tuning, automated pipelines, and interactive analytics dashboards.',
  },
  {
    title: 'Android & Native Mobile Architecture',
    duration: '6 Weeks / 3 Months',
    eligibility: 'Computer Science & IT Students',
    technologies: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Retrofit', 'Room DB'],
    description: 'Build enterprise-grade mobile applications with offline-first local synchronization, background workers, and clean MVVM architecture.',
  },
  {
    title: 'Embedded Systems & IoT Engineering',
    duration: '6 Weeks / 3 Months',
    eligibility: 'ECE / EEE / Mechanical / Mechatronics',
    technologies: ['Embedded C', 'ESP32 / Arduino', 'MQTT', 'FreeRTOS', 'Sensors'],
    description: 'Hands-on hardware firmware development, sensor telemetry over WiFi/BLE, real-time operating systems, and edge computing.',
  },
]

const PERKS = [
  {
    icon: ShieldCheck,
    title: 'University & College NOC Compliant',
    desc: 'Approved documentation satisfying semester internship training requirements for Indian technical universities (AKTU, VTU, JNTU, Anna Univ, etc.).',
  },
  {
    icon: Award,
    title: 'Official Industrial Training Certificate',
    desc: 'Receive an industry-recognized credential with a verifiable unique CID and QR code validateable online 24/7.',
  },
  {
    icon: FileCheck,
    title: 'Evaluation & Project Completion Report',
    desc: 'Get a formal project evaluation dossier, appraisal letter, and mentor remarks suitable for university viva and internal presentations.',
  },
  {
    icon: Users,
    title: '1-on-1 Mentorship & Code Review',
    desc: 'Weekly milestone evaluations with senior engineers to unblock technical hurdles, review git pull requests, and enforce clean coding standards.',
  },
]

export function IndustrialTraining() {
  return (
    <PublicLayout>
      <PageTitle title="Industrial Training + Internship Program | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            University Approved Curriculum
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Industrial Training + <span className="italic font-serif text-[#8C4325]">Internship Program</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridge academic theory and production software engineering. Fulfill university semester training requirements with real-world capstone projects and mentor guidance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/apply?program=industrial-training">
              <Button className="h-12 px-8 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs rounded-full shadow-xs">
                Apply For Industrial Training →
              </Button>
            </Link>
            <Link to="/industrial-training-projects">
              <Button variant="outline" className="h-12 px-8 rounded-full border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] text-xs font-semibold shadow-xs hover:bg-[#EAE4D7] rounded-full">
                View Project Showcase
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EBE6DC] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => {
              const PIcon = perk.icon
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-[#EBE6DC] text-[#181615] flex items-center justify-center mb-4 border border-[#E2DDD2]">
                    <PIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1715] mb-2">{perk.title}</h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">{perk.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-3 px-3 py-1">
              Curriculum Tracks
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1715]">
              Industrial Training <span className="italic font-serif text-[#8C4325]">Specializations</span>
            </h2>
            <p className="text-[#57534E] text-sm mt-3">
              Hands-on practical tracks aligned with real industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRACKS.map((track, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] hover:border-[#181615] transition-all flex flex-col justify-between shadow-xs hover:shadow-sm"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-[#8C4325] bg-[#F0E6DC] px-3 py-1 rounded-full border border-[#E4D5C7]">
                      {track.duration}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{track.eligibility}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A1715] mb-3">{track.title}</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                    {track.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Core Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-[#EBE6DC] text-[#57534E] text-xs font-semibold border border-[#E2DDD2]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link to={`/apply?program=${encodeURIComponent(track.title)}`}>
                    <Button className="w-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs h-10 rounded-full shadow-xs">
                      Enroll in this Track →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Box */}
          <div className="mt-16 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="text-left">
              <h4 className="text-lg font-bold text-[#1A1715] mb-1">Verify Industrial Training Certificate</h4>
              <p className="text-xs text-[#57534E]">
                Colleges and recruiters can validate student certificates and credentials in real-time.
              </p>
            </div>
            <Link to="/industrial-training-verification" className="shrink-0">
              <Button variant="outline" className="border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] text-xs px-6 shadow-xs hover:bg-[#EAE4D7] rounded-full">
                Verification Portal →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default IndustrialTraining
