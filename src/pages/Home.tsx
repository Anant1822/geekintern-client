import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Check,
  Send,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { SectionCanvas } from '@/components/common/SectionCanvas'
import { AlumniFloatingWidget } from '@/components/common/AlumniFloatingWidget'

// ==========================================
// 1. DATA DEFINITIONS (EXACT GKK MIRROR)
// ==========================================

const LEFT_NAV_ITEMS = [
  { name: 'Home', desc: 'Main Page', targetId: 'hero-section' },
  { name: 'About', desc: 'Our Mission', targetId: 'about-section' },
  { name: 'Curriculum', desc: 'What We Do', targetId: 'services-section' },
  { name: 'Alumni', desc: 'Past Interns', targetId: 'alumni-section' },
  { name: 'Blog', desc: 'Dev Insights', path: '/blog' },
]

const RIGHT_NAV_ITEMS = [
  { name: 'Apply', desc: 'Join Cohort 2026', path: '/apply' },
  { name: 'Verify', desc: 'Recruiter CID Portal', path: '/verify' },
  { name: 'Career Tools', desc: 'AI Resume & Portfolio', path: '/resume-builder' },
  { name: 'Contact', desc: 'Get In Touch', targetId: 'contact-section' },
  { name: 'Guidelines', desc: 'Rules & Rubrics', path: '/guidelines' },
]

const MARQUEE_ITEMS = [
  'Web Development',
  '·',
  'UI/UX Design',
  '·',
  'Full Stack Engineering',
  '·',
  'App Development',
  '·',
  'Generative AI & LLMs',
  '·',
  'Cloud & DevOps',
  '·',
  'Data Engineering',
  '·',
  'Cybersecurity',
  '·',
  'Software Internships',
  '·',
  'Design Internships',
  '·',
  'Marketing Internships',
  '·',
]

const BENTO_CARDS = [
  {
    title: 'Why Geek Interns Exists',
    text: 'Geek Interns was built to close the gap between classroom theory and industry execution. This is a do-first ecosystem where interns ship real features, contribute to active products, and graduate with proof of work, not just certificates.',
  },
  {
    title: 'How We Train',
    text: 'We blend structure with creative freedom. Interns work inside design-forward product environments, guided by mentors through practical workflows: planning, coding, reviews, deployment, and iteration.',
  },
  {
    title: 'What You Build',
    text: 'You build production-grade apps, UI systems, automation logic, and data-driven features across full-stack development, AI, UX, and cloud. Every task is selected to grow both technical depth and product thinking.',
  },
  {
    title: 'Career Outcome',
    text: 'By the end of the residency, you gain technical confidence, collaboration habits, and a portfolio mapped to modern hiring expectations. You learn how teams actually ship software in real timelines.',
  },
  {
    title: 'Our Mission & Venture',
    text: 'We are committed to building a high-standard community of engineers and creators who value craft, discipline, and impact. A GKK & Bubblesort Venture where ambitious learners transform into industry-ready builders.',
  },
]

const CURRICULUM_TRACKS = [
  {
    id: '01',
    title: 'PROMPT ENGINEERING & LLMs',
    description: 'Master AI prompt design, LLM workflows, fine-tuning techniques, and autonomous AI-driven automation systems.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    domain: 'Generative AI & LLM Systems',
  },
  {
    id: '02',
    title: 'FULL STACK WEB DEVELOPMENT',
    description: 'Build complete web applications from frontend to backend. Master React 19, Node.js, relational databases, and deployment pipelines.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    domain: 'Full Stack Development',
  },
  {
    id: '03',
    title: 'APP DEVELOPMENT',
    description: 'Create cross-platform mobile apps with React Native and Flutter. Ship to both iOS App Store and Google Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    domain: 'Android App Development',
  },
  {
    id: '04',
    title: 'UI/UX & DESIGN SYSTEMS',
    description: 'Design and implement beautiful, accessible interfaces. Learn Figma, design tokens, interaction states, and frontend architecture.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop',
    domain: 'UI/UX Design',
  },
  {
    id: '05',
    title: 'CLOUD & DEVOPS ENGINEERING',
    description: 'Architect resilient cloud infrastructure on AWS and Cloudflare with Docker, automated CI/CD pipelines, and zero-downtime releases.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    domain: 'DevOps',
  },
  {
    id: '06',
    title: 'CYBERSECURITY & DEFENSIVE OPS',
    description: 'Defend web applications through vulnerability auditing, OWASP Top 10 mitigation, penetration testing, and network security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    domain: 'Cyber Security',
  },
]

const ALUMNI_LIST = [
  {
    id: 'alum-1',
    name: 'Aarav Singhania',
    college: 'IIT Roorkee',
    domain: 'Full Stack Web Development',
    outcome: 'Software Engineer at Google Cloud',
    quote: 'The hands-on project tasks mirrored real production tickets. Building a full-stack platform with authentication and database schemas made all the difference during my technical interviews.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'alum-2',
    name: 'Meera Nambiar',
    college: 'BITS Pilani',
    domain: 'Machine Learning & AI',
    outcome: 'Applied ML Intern at Microsoft',
    quote: 'The curriculum pushed me to implement neural network architectures from scratch rather than just running pre-made notebooks. Having a verifiable QR certificate helped me secure an off-campus ML internship.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'alum-3',
    name: 'Tanmay Deshmukh',
    college: 'COEP Technological University',
    domain: 'Android App Development',
    outcome: 'Mobile Systems at Amazon',
    quote: 'The freedom to complete assignments alongside my university semester exams was fantastic. Geek Intern provided clear task guidelines and prompt credential verification upon submission.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'alum-4',
    name: 'Priyanshu Sharma',
    college: 'VIT Vellore',
    domain: 'Cloud Native & DevOps',
    outcome: 'Systems Engineer at TCS Digital',
    quote: 'Deploying Docker containers and writing GitHub Action pipelines to AWS gave me exact production answers for technical rounds.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
]

const COMPARISON_ROWS = [
  {
    feature: 'Primary Learning Focus',
    traditional: 'Pre-recorded lectures & multiple choice quizzes',
    geek: 'Live codebase contributions & real product features',
    highlight: true,
  },
  {
    feature: 'Project Complexity',
    traditional: 'Synthetic toy apps (Todo lists, basic calculators)',
    geek: 'Scalable full-stack apps, AI microservices, cloud deployments',
  },
  {
    feature: 'Mentorship & Reviews',
    traditional: 'Automated grading scripts or absent mentors',
    geek: '1-on-1 senior mentor reviews & engineering feedback',
  },
  {
    feature: 'Portfolio Verification',
    traditional: 'Generic completion certificates without hash',
    geek: 'Verifiable GitHub pull requests & live product links',
    highlight: true,
  },
  {
    feature: 'Career Transition',
    traditional: 'Theoretical knowledge with unverified experience',
    geek: 'Production-ready engineering habits & direct hiring network referrals',
  },
]

const ROADMAP_STEPS = [
  {
    number: '01',
    title: 'Selective Onboarding & Assessment',
    description: 'Ambition meets evaluation. Candidates complete practical coding benchmarks testing logic, system design awareness, and problem-solving velocity.',
    tag: 'Step 1: Onboarding',
  },
  {
    number: '02',
    title: 'Senior Mentor Pairing & Architecture Briefs',
    description: 'Receive direct mentorship from senior engineers. Define clean architecture, select modern tech stacks, and set up continuous integration pipelines.',
    tag: 'Step 2: Architecture',
  },
  {
    number: '03',
    title: 'Production Sprint Execution & Peer Reviews',
    description: 'Build features against real product requirements. Submit pull requests, undergo detailed code reviews, and refactor for performance and security.',
    tag: 'Step 3: Execution',
  },
  {
    number: '04',
    title: 'Live Deployment & Proof-of-Work Verification',
    description: 'Deploy live software to cloud infrastructure. Graduate with verifiable GitHub contributions, live URLs, and documented impact metrics.',
    tag: 'Step 4: Deployment',
  },
]

const EXPERT_QUOTES = [
  {
    quote: "The single biggest issue with modern tech hiring is that resume keywords don't equal software craftsmanship. At Geek Interns, we train engineers to read diffs, debug live services, and explain architectural tradeoffs.",
    author: 'Engineering Mentorship Lead',
    role: 'Geek Interns Technical Council',
    stats: '100+ Production Code Reviews',
  },
  {
    quote: 'AI search engines prioritize real experience and verifiable stats over generic claims. When our interns present their verified GitHub pull requests, recruiters immediately see true technical depth.',
    author: 'Bubblesort Ecosystem Advisor',
    role: 'Core Technical Architect',
    stats: '98.4% Internship Completion Success',
  },
]

const FAQ_ITEMS = [
  {
    category: 'Program Overview',
    question: 'What is Geek Interns and how does it optimize career readiness?',
    answer: 'Geek Interns is an elite software engineering internship ecosystem. Unlike traditional courses, interns write production code, participate in real code reviews, and ship live software to active users, closing the gap between university theory and high-tech hiring expectations.',
  },
  {
    category: 'Learning & Mentorship',
    question: 'What tech stack and methodologies do Geek interns work with?',
    answer: 'Interns master modern full-stack development using React, Next.js, Node.js, Python, Supabase, Tailwind CSS, Docker, and Generative AI APIs. Engineering workflows follow real-world Agile sprints, CI/CD automated deployments, and continuous peer code reviews.',
  },
  {
    category: 'Comparison & Value',
    question: 'How does Geek Interns differ from standard online courses or internships?',
    answer: 'Standard courses offer canned projects with synthetic data. Geek Interns provides real project repositories, 1-on-1 expert mentor pairing, actual user data handling, production deployment experience, and a verified proof-of-work portfolio.',
  },
  {
    category: 'AI & Search Optimization',
    question: 'What is Generative Engine Optimization (GEO) & AEO?',
    answer: 'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) structure digital content into direct, highly authoritative Q&A formats, step-by-step guides, and data-rich comparisons so AI models easily cite and recommend your engineering portfolio.',
  },
  {
    category: 'Outcomes & Placement',
    question: 'What career outcomes can I expect after completing a Geek Internship?',
    answer: "Graduates exit with real production commits, a verifiable GitHub portfolio, strong system design fundamentals, and direct referral opportunities through Geek Interns and GKK's hiring network.",
  },
]

// ==========================================
// 2. REUSABLE FAST 3D FLIP BUTTON (di)
// ==========================================

function FlipButton({
  text,
  onClick,
  primary = false,
  orange = false,
  className = '',
}: {
  text: string
  onClick?: (e: React.MouseEvent) => void
  primary?: boolean
  orange?: boolean
  className?: string
}) {
  let bg = 'bg-white text-black'
  let shadow = ''
  let border = 'border-white/10'

  if (primary) {
    bg = 'bg-[#22d87a] text-black'
    shadow = 'shadow-[0_0_20px_rgba(34,216,122,0.35)]'
    border = 'border-transparent'
  } else if (orange) {
    bg = 'bg-[#f97316] text-white'
    shadow = 'shadow-[0_0_20px_rgba(249,115,22,0.35)]'
    border = 'border-transparent'
  }

  return (
    <div
      onClick={onClick}
      className={`group relative w-full sm:w-auto cursor-pointer select-none ${className}`}
    >
      <div
        className={`relative overflow-hidden ${bg} w-full sm:w-auto px-5 md:px-8 py-3.5 rounded-full uppercase font-black text-[11px] md:text-xs tracking-[0.1em] border ${border} ${shadow} text-center flex items-center justify-center transition-all duration-200 active:scale-95`}
      >
        <div className="relative overflow-hidden w-full font-inter h-4 flex items-center justify-center">
          <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
            {text}
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
            {text}
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 ${
          primary ? 'bg-[#22d87a]' : orange ? 'bg-[#f97316]' : 'bg-white'
        } opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-300 pointer-events-none`}
      />
    </div>
  )
}

function SideNavItem({
  name,
  desc,
  side,
  onClick,
}: {
  name: string
  desc: string
  side: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <div
      className="group relative py-2.5 cursor-pointer select-none"
      onClick={onClick}
    >
      <div
        className={`flex items-center gap-3 ${
          side === 'right' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div
          className="h-[3px] w-5 rounded-full bg-white/25 transition-all duration-300 ease-out group-hover:w-12 group-hover:bg-[#22d87a] shrink-0"
        />
        <div
          className={`flex flex-col justify-center ${
            side === 'right' ? 'items-end' : 'items-start'
          }`}
        >
          <span
            className={`text-xs font-black font-inter uppercase tracking-[0.2em] whitespace-nowrap text-[#f0efe9]/70 transition-all duration-300 ease-out group-hover:text-white ${
              side === 'left' ? 'group-hover:translate-x-1.5' : 'group-hover:-translate-x-1.5'
            }`}
          >
            {name}
          </span>
          <div className="max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-6 opacity-0 group-hover:opacity-100">
            <span className="text-[10px] font-bold text-[#22d87a] uppercase tracking-widest mt-0.5 block font-inter whitespace-nowrap">
              {desc}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. MAIN COMPONENT EXPORT
// ==========================================

export function Home() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('submitting')
    setTimeout(() => {
      setContactStatus('success')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }, 1000)
  }

  return (
    <PublicLayout noPadding>
      <PageTitle
        title="Code. Build. Deploy. | A GKK & Bubblesort Venture"
        suffix="Geek Interns"
      />

      {/* Floating Alumni Widget (matches GKK, clean on all screen sizes) */}
      <AlumniFloatingWidget onClick={() => scrollTo('alumni-section')} />

      {/* ---------------- SECTION 1: HERO SECTION (Exact Yx Clone) ---------------- */}
      <section
        id="hero-section"
        className="relative min-h-[92vh] sm:min-h-screen bg-[#0c0c0f] text-[#f0efe9] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 md:pt-36 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.07)" />

        {/* Left Sticky Navigation Widget (Desktop only) */}
        <div className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 flex-col gap-2 z-30 hidden lg:flex">
          {LEFT_NAV_ITEMS.map((item) => (
            <SideNavItem
              key={item.name}
              name={item.name}
              desc={item.desc}
              side="left"
              onClick={() => {
                if (item.targetId) scrollTo(item.targetId)
                else if (item.path) navigate(item.path)
              }}
            />
          ))}
        </div>

        {/* Right Sticky Navigation Widget (Desktop only) */}
        <div className="absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 flex-col gap-2 z-30 hidden lg:flex">
          {RIGHT_NAV_ITEMS.map((item) => (
            <SideNavItem
              key={item.name}
              name={item.name}
              desc={item.desc}
              side="right"
              onClick={() => {
                if (item.targetId) scrollTo(item.targetId)
                else if (item.path) navigate(item.path)
              }}
            />
          ))}
        </div>

        {/* Hero Center Title & Interactive Actions */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto text-center">
          <div className="relative flex flex-col items-center leading-none select-none w-full">
            {/* Ambient blur glow */}
            <div className="absolute -inset-x-6 top-6 h-20 md:h-28 rounded-full bg-gradient-to-r from-[#22d87a]/20 via-[#06e4f9]/15 to-[#22d87a]/20 blur-3xl pointer-events-none" />

            {/* Line 1: JOIN THE */}
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-4xl md:text-6xl font-black font-inter tracking-tighter mb-1 md:mb-2 text-[#f0efe9] uppercase"
            >
              JOIN THE
            </motion.h2>

            {/* Line 2: GEEK INTERNS (Scaled safely for mobile screens) */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[140px] leading-[0.9] font-black font-inter tracking-tighter text-[#f0efe9] uppercase [text-shadow:0_8px_30px_rgba(0,0,0,0.5)]"
            >
              GEEK
            </motion.h1>

            {/* Line 3: Italic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-sm sm:text-lg md:text-2xl font-cormorant italic text-[#f0efe9]/80 max-w-xl mx-auto mt-4 md:mt-6 font-medium px-2 text-center leading-relaxed"
            >
              Build real projects. Ship production code. Launch your tech career.
            </motion.p>
          </div>

          {/* Action Buttons (Fast 3D text-flip, stacks on mobile) */}
          <div className="mt-8 md:mt-12 relative z-30 flex flex-col items-center gap-3 sm:gap-4 w-full px-2 max-w-[420px] md:max-w-none mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <FlipButton
                text="APPLY FOR INTERNSHIP"
                onClick={() => navigate('/apply')}
              />
              <FlipButton
                text="APPLY FOR TRAINING"
                primary
                onClick={() => navigate('/industrial-training')}
              />
              <FlipButton
                text="EXPLORE TRACKS"
                orange
                onClick={() => scrollTo('services-section')}
              />
            </div>

            {/* Verification Link */}
            <Link
              to="/verify"
              className="mt-2 text-[#f0efe9] text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity border-b border-transparent hover:border-white/20 pb-0.5 font-inter text-center"
            >
              Already Approved or Need Verification?{' '}
              <span className="text-[#22d87a] font-bold underline decoration-[#22d87a]/50">
                Verify Document Here
              </span>
            </Link>

            {/* Student Portal Button */}
            <Link
              to="/student-portal"
              className="mt-1 px-5 py-2 bg-transparent border border-white/10 text-[#f0efe9] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#13131a] hover:text-[#f0efe9] hover:border-white/30 transition-all flex items-center gap-2 font-inter"
            >
              <span>Student Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#22d87a]" />
            </Link>
          </div>
        </div>

        {/* Bottom Marquee Ticker */}
        <div className="relative w-full z-20 border-t border-white/5 bg-[#0c0c0f] py-3.5 overflow-hidden">
          <div className="marquee-track flex items-center gap-6 sm:gap-8">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={idx}
                className={`text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase font-inter whitespace-nowrap ${
                  item === '·'
                    ? 'text-white/20'
                    : idx % 8 === 0 || idx % 8 === 4
                    ? 'text-[#22d87a]'
                    : 'text-white/60'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: BENTO MISSION SECTION (Exact Kx Clone) ---------------- */}
      <section
        id="about-section"
        className="min-h-screen bg-[#0a0a0f] text-[#f0efe9] relative overflow-hidden flex flex-col justify-center py-16 sm:py-20 md:py-28 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        {/* Watermark text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0 overflow-hidden flex justify-center items-center">
          <span className="text-[25vw] md:text-[30vw] font-black text-white/[0.02] leading-none tracking-tighter whitespace-nowrap font-inter">
            GEEK
          </span>
        </div>

        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col justify-center">
          {/* Headline */}
          <div className="relative z-10 mb-10 md:mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.88] uppercase bg-gradient-to-b from-[#f0efe9] to-[#f0efe9]/50 bg-clip-text text-transparent font-inter">
              CODE
              <br />
              BUILD
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-cormorant italic font-light tracking-tight leading-[0.9] text-[#06e4f9] mt-1">
              deploy & grow.
            </h2>
          </div>

          {/* 5-Card Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {BENTO_CARDS.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-[#12121e]/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 hover:border-[#22d87a]/40 transition-colors"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2.5 text-[#f0efe9] font-inter">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-inter">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: CURRICULUM & MASTERY (Exact ey / ServicesPage Clone) ---------------- */}
      <section
        id="services-section"
        className="relative min-h-screen bg-[#0a0a0f] text-[#f0efe9] py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 overflow-hidden border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto pt-4 relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#22d87a] uppercase mb-2 block font-inter">
                PROGRAM CURRICULUM
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] text-[#f0efe9] font-inter">
                What You Will Master
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-sm font-inter leading-relaxed">
              Master in-demand tech skills through real projects. Build, ship, and grow with expert mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CURRICULUM_TRACKS.map((track) => (
              <div
                key={track.id}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-[#12121e]/60 p-4 sm:p-5 hover:border-[#06e4f9]/50 transition-all"
                onClick={() => navigate(`/apply?domain=${encodeURIComponent(track.domain)}`)}
              >
                <div className="relative aspect-video sm:aspect-square bg-[#0a0a0f] mb-4 overflow-hidden rounded-xl">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 right-3 text-4xl sm:text-5xl font-black text-white/15 group-hover:text-white/25 transition-colors font-inter">
                    {track.id}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight mb-1.5 group-hover:underline decoration-2 underline-offset-4 text-[#f0efe9] font-inter">
                  {track.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-inter">
                  {track.description}
                </p>
              </div>
            ))}

            {/* Ready to Start Coding Card */}
            <div className="relative aspect-video sm:aspect-square bg-gradient-to-br from-[#12121e] to-black p-6 sm:p-8 flex flex-col justify-between group overflow-hidden rounded-2xl border border-white/15 hover:border-[#22d87a]/60 transition-colors">
              <div>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-3 font-inter">
                  Ready to
                  <br />
                  Start Coding?
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-inter">
                  Applications are reviewed on a rolling basis. Build verifiable production experience starting today.
                </p>
              </div>

              <div className="pt-4">
                <FlipButton
                  text="APPLY NOW"
                  primary
                  onClick={() => navigate('/apply')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: OUR ALUMNI (Desktop Horizontal + Mobile Responsive) ---------------- */}
      <section
        id="alumni-section"
        className="relative bg-[#0c0c0f] text-[#f0efe9] border-t border-white/5 py-16 sm:py-20 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase font-inter">
              OUR ALUMNI
            </h2>
            <p className="text-xs sm:text-base text-white/60 mt-2 max-w-md font-inter">
              Your spot is waiting. Join Geek Interns and become our next verified success story.
            </p>
          </div>

          {/* Responsive Cards for All Screens (Zero scroll freeze or layout bugs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALUMNI_LIST.map((alum) => (
              <div
                key={alum.id}
                className="rounded-3xl border border-white/10 bg-[#12121e]/90 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-[#22d87a]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={alum.avatar}
                      alt={alum.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-[#22d87a]"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-white font-inter">{alum.name}</h4>
                      <p className="text-xs font-mono text-[#06e4f9]">{alum.college}</p>
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-1 inline-block">
                        {alum.outcome}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/70 italic leading-relaxed font-inter mb-4">
                    “{alum.quote}”
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <span>{alum.domain}</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    Verified <Check className="w-3.5 h-3.5 text-[#22d87a]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: COMPARISON SECTION (Desktop Table + Mobile Stacked Cards) ---------------- */}
      <section
        id="comparison-section"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#0a0a0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 sm:mb-14 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // COMPARATIVE GEO ANALYSIS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Traditional vs. Geek Real-World Ecosystem
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-2xl mt-2 font-inter">
              A side-by-side comparison formatted for direct indexing by search engines, recruiters, and engineering teams.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 sm:p-5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Evaluation Criteria
                  </th>
                  <th className="p-4 sm:p-5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Traditional Internships / Courses
                  </th>
                  <th className="p-4 sm:p-5 font-mono text-xs uppercase tracking-wider text-[#22d87a] font-bold">
                    Geek Real-World Ecosystem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-inter">
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      row.highlight ? 'bg-[#22d87a]/[0.03]' : ''
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-neutral-200">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-neutral-400">{row.traditional}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#22d87a] flex items-center gap-2">
                      <span>✓</span> {row.geek}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards (Clean, zero horizontal scroll blowout) */}
          <div className="block md:hidden space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.feature}
                className="rounded-2xl border border-white/10 bg-[#12121e]/80 p-5 space-y-3"
              >
                <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {row.feature}
                </div>
                <div className="text-xs text-white/50 flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{row.traditional}</span>
                </div>
                <div className="text-xs text-[#22d87a] font-semibold flex items-start gap-2 pt-1 border-t border-white/5">
                  <span className="shrink-0">✓</span>
                  <span>{row.geek}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: THE ENGINEERING ROADMAP (Exact oy Clone) ---------------- */}
      <section
        id="guide-section"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#0c0c0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 sm:mb-14 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#06e4f9] uppercase font-bold">
              // Step-by-Step GEO Framework
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              The Geek Engineering Roadmap
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-2xl mt-2 font-inter">
              A structured, step-by-step breakdown of how Geek Interns transforms software learners into production-ready engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {ROADMAP_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-lg relative group hover:border-[#06e4f9]/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#06e4f9] to-transparent font-mono opacity-80">
                    {step.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-100 mb-2 group-hover:text-[#06e4f9] transition-colors font-inter">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed font-inter">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: EXPERT INSIGHTS & LEADERSHIP (Exact ly Clone) ---------------- */}
      <section
        id="expert-quotes"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#0a0a0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 sm:mb-12 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // E-E-A-T & Industry Authority
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Expert Insights & Engineering Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {EXPERT_QUOTES.map((q) => (
              <div
                key={q.author}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md flex flex-col justify-between"
              >
                <p className="text-neutral-300 text-sm sm:text-base md:text-lg italic leading-relaxed mb-6 font-inter">
                  “{q.quote}”
                </p>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-100 font-inter">{q.author}</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-mono">{q.role}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#22d87a] bg-[#22d87a]/10 px-2.5 sm:px-3 py-1 rounded-full border border-[#22d87a]/20">
                    {q.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: AEO & LLM SEARCH OPTIMIZED FAQ (Exact ay Clone) ---------------- */}
      <section
        id="faq-section"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-[#0c0c0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 sm:mb-12 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // AEO & LLM Search Optimized
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-2xl mt-2 font-inter">
              Direct answers to critical questions parsed for AI search engines, recruiters, and ambitious engineers.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={faq.question}
                  className="border border-white/10 rounded-2xl bg-neutral-900/40 backdrop-blur-md overflow-hidden transition-all hover:border-[#22c55e]/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-3 cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#06e4f9] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-100 font-inter">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-200 shrink-0 text-xs ${
                        isOpen ? 'rotate-180 border-[#22c55e] text-[#22c55e]' : 'text-neutral-400'
                      }`}
                    >
                      ↓
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 font-inter">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 9: EXCLUSIVE LEAD MAGNET BANNER (Exact uy Clone) ---------------- */}
      <section
        id="geo-cta-banner"
        className="py-14 sm:py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white border-y border-white/10 relative overflow-hidden w-full max-w-full"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e] font-mono text-[11px] uppercase tracking-widest mb-3 font-bold">
            Exclusive Lead Magnet & Guide
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-3 font-inter">
            Want to Master LLM & AI Search Optimization?
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed font-inter">
            Get our detailed framework document covering AEO, GEO, LLMO, AISEO, and E-E-A-T. Explore with Geek Interns.
          </p>

          <Link to="/guidelines" className="inline-block">
            <div className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-[#22d87a] text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(34,216,122,0.3)] cursor-pointer font-inter uppercase">
              <span>💬 Explore Engineering Framework Guide</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------------- SECTION 10: APPLY CTA SECTION (Exact Jx Clone) ---------------- */}
      <section
        id="cta-section"
        className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center bg-[#12121e] text-[#f0efe9] overflow-hidden py-16 sm:py-24 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(34,216,122,0.08)" />

        <div className="relative z-10 w-full max-w-[90vw] mx-auto text-center">
          <div className="flex flex-col items-center justify-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-black font-inter tracking-tighter mb-2 text-[#f0efe9]">
              JOIN THE
            </h2>

            {/* GEEK with expanding green underline */}
            <div className="relative inline-block">
              <h2 className="text-6xl sm:text-8xl md:text-[180px] leading-[0.88] font-black font-inter tracking-tighter text-[#f0efe9] uppercase">
                GEEK
              </h2>
              <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-1.5 sm:h-3 bg-[#22d87a]" />
            </div>

            <p className="text-sm sm:text-2xl font-cormorant italic text-[#f0efe9]/80 max-w-xl mx-auto mt-6 sm:mt-8 font-medium">
              Build real projects. Ship production code. Launch your tech career.
            </p>
          </div>

          {/* Dual 3D Offset Shadow CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4 max-w-[360px] sm:max-w-none mx-auto">
            <Link
              to="/apply"
              className="group relative inline-block cursor-pointer no-underline w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#0a0a0f] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative bg-[#ffffff] px-6 py-3.5 sm:px-10 sm:py-5 border-2 border-white transition-all w-full flex items-center justify-center">
                <span className="text-sm sm:text-xl text-black font-black font-inter tracking-tighter uppercase text-center">
                  APPLY FOR INTERNSHIP
                </span>
              </div>
            </Link>

            <Link
              to="/verify"
              className="group relative inline-block cursor-pointer no-underline w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-[#0a0a0f] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
              <div className="relative bg-[#22d87a] px-6 py-3.5 sm:px-10 sm:py-5 border-2 border-[#22d87a] transition-all w-full flex items-center justify-center">
                <span className="text-sm sm:text-xl text-black font-black font-inter tracking-tighter uppercase text-center">
                  VERIFY CREDENTIALS
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 11: CONTACT SECTION (Exact ry Clone) ---------------- */}
      <section
        id="contact-section"
        className="min-h-screen bg-[#0a0a0f] text-[#f0efe9] py-16 sm:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden flex items-center justify-center border-t border-white/5 w-full max-w-full"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" />

        <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight mb-3 text-[#f0efe9] font-inter">
              Get in Touch with Geek Interns
            </h1>
            <p className="text-neutral-400 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-inter">
              Have a question about internships, applications, or university collaborations?
              <br className="hidden sm:block" />
              We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left: Direct Inquiries */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3 font-inter">
                  Direct Inquiries
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1 font-inter">
                      Study & Student Enquiry
                    </p>
                    <a
                      href="mailto:support.geekintern@gmail.com"
                      className="text-base sm:text-xl font-medium text-[#f0efe9] hover:text-[#06e4f9] transition-colors break-all font-inter"
                    >
                      support.geekintern@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1 font-inter">
                      Business & Corporate Partners
                    </p>
                    <a
                      href="mailto:contact@geekintern.com"
                      className="text-base sm:text-xl font-medium text-[#f0efe9] hover:text-[#22d87a] transition-colors break-all font-inter"
                    >
                      contact@geekintern.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2 font-inter">
                  Working Hours
                </h3>
                <p className="text-base sm:text-lg font-medium text-[#f0efe9] mb-1 font-inter">
                  Monday — Friday
                </p>
                <span className="text-xs font-mono text-[#22d87a]">
                  10:00 AM — 07:00 PM IST
                </span>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#12121e]/90 backdrop-blur-md">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 font-inter text-white">
                  Send a Direct Message
                </h3>

                {contactStatus === 'success' ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-base font-bold text-white font-inter">Message Delivered</h4>
                    <p className="text-xs text-white/60 mt-1 font-inter">
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-11 px-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full h-11 px-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/60 mb-1.5">
                        Your Inquiry or Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us about your questions..."
                        className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactStatus === 'submitting'}
                      className="w-full py-3.5 rounded-full bg-[#22d87a] text-black font-inter font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,216,122,0.3)]"
                    >
                      {contactStatus === 'submitting' ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Home
