import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Star,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Code2,
  Terminal,
  Cpu,
  Globe,
  Smartphone,
  ChevronDown,
  FileText,
  TrendingUp,
  BrainCircuit,
  Bot,
  UserCheck,
  MailCheck,
  GitBranch,
  BadgeCheck,
  Zap,
  Check,
  X,
  Server,
  Cloud,
  ExternalLink,
  MessageSquare,
  Send,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { SectionCanvas } from '@/components/common/SectionCanvas'
import { AlumniFloatingWidget } from '@/components/common/AlumniFloatingWidget'

// ==========================================
// 1. DATA DEFINITIONS (EXACT GKK MIRROR)
// ==========================================

// Left Sticky Side Navigation
const LEFT_NAV_ITEMS = [
  { name: 'Home', desc: 'Main Page', targetId: 'hero-section' },
  { name: 'About', desc: 'Our Mission', targetId: 'about-section' },
  { name: 'Curriculum', desc: 'What We Do', targetId: 'services-section' },
  { name: 'Alumni', desc: 'Past Interns', targetId: 'alumni-section' },
  { name: 'Blog', desc: 'Dev Insights', path: '/blog' },
]

// Right Sticky Side Navigation
const RIGHT_NAV_ITEMS = [
  { name: 'Apply', desc: 'Join Cohort 2026', path: '/apply' },
  { name: 'Verify', desc: 'Recruiter CID Portal', path: '/verify' },
  { name: 'Career Tools', desc: 'AI Resume & Portfolio', path: '/resume-builder' },
  { name: 'Contact', desc: 'Get In Touch', targetId: 'contact-section' },
  { name: 'Guidelines', desc: 'Rules & Rubrics', path: '/guidelines' },
]

// Bottom Continuous Marquee Ticker Items
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

// Bento Section Cards (Exact GKK Bento Architecture)
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

// Services / Curriculum Cards
const CURRICULUM_TRACKS = [
  {
    id: '01',
    title: 'PROMPT ENGINEERING & LLMs',
    description: 'Master AI prompt design, LLM workflows, fine-tuning techniques, and autonomous AI-driven automation systems.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    domain: 'Generative AI & LLM Systems',
  },
  {
    id: '02',
    title: 'FULL STACK WEB DEVELOPMENT',
    description: 'Build complete web applications from frontend to backend. Master React 19, Node.js, relational databases, and deployment pipelines.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    domain: 'Full Stack Development',
  },
  {
    id: '03',
    title: 'APP DEVELOPMENT',
    description: 'Create cross-platform mobile apps with React Native and Flutter. Ship to both iOS App Store and Google Play Store.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    domain: 'Android App Development',
  },
  {
    id: '04',
    title: 'UI/UX & DESIGN SYSTEMS',
    description: 'Design and implement beautiful, accessible interfaces. Learn Figma, design tokens, interaction states, and frontend architecture.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop',
    domain: 'UI/UX Design',
  },
  {
    id: '05',
    title: 'CLOUD & DEVOPS ENGINEERING',
    description: 'Architect resilient cloud infrastructure on AWS and Cloudflare with Docker, automated CI/CD pipelines, and zero-downtime releases.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    domain: 'DevOps',
  },
  {
    id: '06',
    title: 'CYBERSECURITY & DEFENSIVE OPS',
    description: 'Defend web applications through vulnerability auditing, OWASP Top 10 mitigation, penetration testing, and network security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    domain: 'Cyber Security',
  },
]

// Alumni / Intern Testimonials
const ALUMNI_LIST = [
  {
    id: 'alum-1',
    name: 'Aarav Singhania',
    college: 'IIT Roorkee',
    domain: 'Full Stack Web Development',
    outcome: 'Software Engineer at Google Cloud',
    quote: 'The hands-on project tasks mirrored real production tickets. Building a full-stack platform with authentication and database schemas made all the difference during my technical interviews.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    company: 'Google',
  },
  {
    id: 'alum-2',
    name: 'Meera Nambiar',
    college: 'BITS Pilani',
    domain: 'Machine Learning & AI',
    outcome: 'Applied ML Intern at Microsoft',
    quote: 'The curriculum pushed me to implement neural network architectures from scratch rather than just running pre-made notebooks. Having a verifiable QR certificate helped me secure an off-campus ML internship.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    company: 'Microsoft',
  },
  {
    id: 'alum-3',
    name: 'Tanmay Deshmukh',
    college: 'COEP Technological University',
    domain: 'Android App Development',
    outcome: 'Mobile Systems at Amazon',
    quote: 'The freedom to complete assignments alongside my university semester exams was fantastic. Geek Intern provided clear task guidelines and prompt credential verification upon submission.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    company: 'Amazon',
  },
  {
    id: 'alum-4',
    name: 'Priyanshu Sharma',
    college: 'VIT Vellore',
    domain: 'Cloud Native & DevOps',
    outcome: 'Systems Engineer at TCS Digital',
    quote: 'Deploying Docker containers and writing GitHub Action pipelines to AWS gave me exact production answers for technical rounds.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    company: 'TCS',
  },
  {
    id: 'alum-5',
    name: 'Ananya Verma',
    college: 'DTU Delhi',
    domain: 'Data Science & Analytics',
    outcome: 'Data Analyst at Infosys',
    quote: 'The mentor code reviews were ruthlessly constructive. My Git commit hygiene and system design clarity skyrocketed.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    company: 'Infosys',
  },
]

// Comparison Table Data
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

// Roadmap Guide Steps
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

// Expert Quotes
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

// FAQ Items
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
    answer: 'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) structure digital content into direct, highly authoritative Q&A formats, step-by-step guides, and data-rich comparisons so AI models (ChatGPT, Perplexity, Google SGE) easily cite and recommend your brand.',
  },
  {
    category: 'Outcomes & Placement',
    question: 'What career outcomes can I expect after completing a Geek Internship?',
    answer: "Graduates exit with real production commits, a verifiable GitHub portfolio, strong system design fundamentals, and direct referral opportunities through Geek Interns and GKK's hiring network.",
  },
]

// ==========================================
// 2. REUSABLE GKK-STYLE INTERACTIVE COMPONENTS
// ==========================================

// Exact 3D Vertical Text-Flip Button (di from GKK)
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
    <motion.div
      onClick={onClick}
      className={`group relative w-full sm:w-auto cursor-pointer ${className}`}
      whileHover="hovered"
      initial="initial"
    >
      <div
        className={`relative overflow-hidden ${bg} w-full sm:w-auto px-5 md:px-8 py-3 rounded-full uppercase font-black text-[10px] md:text-xs tracking-[0.1em] no-underline border ${border} ${shadow} text-center flex items-center justify-center transition-transform active:scale-95`}
      >
        <div className="relative block overflow-hidden w-full font-inter">
          <motion.div
            variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {text}
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 w-full"
            variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {text}
          </motion.div>
        </div>
      </div>
      <div
        className={`absolute inset-0 ${
          primary ? 'bg-[#22d87a]' : 'bg-white'
        } opacity-0 group-hover:opacity-25 blur-2xl rounded-full transition-opacity duration-500 pointer-events-none`}
      />
    </motion.div>
  )
}

// Exact Side Navigation Item (Yl from GKK)
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
    <motion.div
      className="group relative py-3 cursor-pointer"
      onClick={onClick}
      whileHover="hover"
      initial="initial"
    >
      <div
        className={`flex items-center gap-4 ${
          side === 'right' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <motion.div
          variants={{
            initial: { width: '24px', height: '4px', backgroundColor: 'rgba(255,255,255,0.25)' },
            hover: { width: '56px', height: '4px', backgroundColor: '#22d87a' },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-full shrink-0"
        />
        <div
          className={`flex flex-col justify-center ${
            side === 'right' ? 'items-end' : 'items-start'
          }`}
        >
          <motion.span
            variants={{
              initial: { opacity: 0.7, color: '#f0efe9', x: 0 },
              hover: { opacity: 1, color: '#ffffff', x: side === 'left' ? 8 : -8 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-xs md:text-sm font-black font-inter uppercase tracking-[0.2em] whitespace-nowrap"
          >
            {name}
          </motion.span>
          <motion.div
            variants={{
              initial: { opacity: 0, height: 0, y: -4 },
              hover: { opacity: 0.9, height: 'auto', y: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <span className="text-[10px] md:text-[11px] font-bold text-[#22d87a] uppercase tracking-widest mt-0.5 block font-inter whitespace-nowrap">
              {desc}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
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

  // Scroll Helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Alumni horizontal scroll progress
  const alumniRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: alumniRef,
    offset: ['start start', 'end end'],
  })
  const alumniX = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus('submitting')
    setTimeout(() => {
      setContactStatus('success')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }, 1200)
  }

  return (
    <PublicLayout>
      <PageTitle
        title="Code. Build. Deploy. | A GKK & Bubblesort Venture"
        suffix="Geek Interns"
      />

      {/* Floating Alumni Widget (Matches GKK bottom-left widget) */}
      <AlumniFloatingWidget onClick={() => scrollTo('alumni-section')} />

      {/* ---------------- SECTION 1: HERO SECTION (Exact Yx Clone) ---------------- */}
      <section
        id="hero-section"
        className="relative min-h-screen bg-[#0c0c0f] text-[#f0efe9] flex flex-col justify-between overflow-hidden pt-20 md:pt-28"
      >
        {/* Interactive Dot Grid Background */}
        <SectionCanvas dotColor="rgba(240,239,233,0.08)" accentColor="rgba(34,216,122,0.4)" />

        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[#000000] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        {/* Left Sticky Navigation Widget (Desktop) */}
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

        {/* Right Sticky Navigation Widget (Desktop) */}
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
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center">
          {/* Glowing gradient blur behind title */}
          <div className="relative flex flex-col items-center leading-none select-none w-full">
            <div className="absolute -inset-x-10 top-8 h-24 md:h-32 rounded-full bg-gradient-to-r from-[#22d87a]/20 via-[#06e4f9]/15 to-[#22d87a]/20 blur-3xl pointer-events-none" />

            {/* Line 1: JOIN THE */}
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(34px,5vw,72px)] md:text-[6rem] lg:text-8xl font-black font-inter tracking-tighter mb-0 md:mb-2 text-[#f0efe9] uppercase"
            >
              JOIN THE
            </motion.h2>

            {/* Line 2: GEEK INTERNS */}
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(68px,12vw,190px)] leading-[0.85] font-black font-inter tracking-tighter text-[#f0efe9] uppercase [text-shadow:0_8px_30px_rgba(0,0,0,0.5)]"
            >
              GEEK
            </motion.h1>

            {/* Line 3: Italic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="text-[13px] md:text-xl lg:text-[24px] font-cormorant italic text-[#f0efe9]/80 max-w-2xl mx-auto mt-6 md:mt-8 font-medium px-4 text-center tracking-normal leading-relaxed"
            >
              Build real projects. Ship production code. Launch your tech career.
            </motion.p>
          </div>

          {/* Action Buttons (FlipButton text-flip 3D hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 md:mt-14 relative z-30 flex flex-col items-center gap-4 w-full px-4 max-w-[500px] md:max-w-none mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 flex-wrap w-full">
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

            {/* Already Approved link */}
            <Link
              to="/verify"
              className="mt-2 text-[#f0efe9] text-xs sm:text-sm font-medium hover:opacity-80 transition-opacity border-b border-transparent hover:border-white/20 pb-0.5 font-inter"
            >
              Already Approved or Need Verification?{' '}
              <span className="text-[#22d87a] font-bold underline decoration-[#22d87a]/50">
                Verify Document Here
              </span>
            </Link>

            {/* Student Portal Button */}
            <Link
              to="/student-portal"
              className="mt-1 px-6 py-2 bg-transparent border border-white/10 text-[#f0efe9] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#13131a] hover:text-[#f0efe9] hover:border-white/30 transition-all flex items-center gap-2 font-inter"
            >
              <span>Student Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#22d87a]" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Marquee Ticker (Exact Hx Clone) */}
        <div className="relative w-full z-20 border-t border-white/5 bg-[#0c0c0f] py-4 overflow-hidden">
          <div className="marquee-track flex items-center gap-8">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={idx}
                className={`text-xs font-bold tracking-[0.12em] uppercase font-inter whitespace-nowrap ${
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
        className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden flex flex-col justify-center py-16 md:py-28"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.07)" accentColor="rgba(34,216,122,0.4)" />

        {/* Giant Watermark Text (GEEK) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0 overflow-hidden flex justify-center items-center">
          <span className="text-[40vw] font-black text-[rgba(240,239,233,0.03)] leading-none tracking-tighter whitespace-nowrap font-inter">
            GEEK
          </span>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 md:px-12 relative z-10 flex flex-col justify-center">
          {/* Header */}
          <div className="relative z-10 mb-12 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-[11vw] md:text-[8rem] font-black tracking-tighter leading-[0.88] uppercase bg-gradient-to-b from-[#f0efe9] to-[#f0efe9]/50 bg-clip-text text-transparent font-inter"
            >
              CODE
              <br />
              BUILD
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-[8vw] md:text-[6rem] font-cormorant italic font-light tracking-tight leading-[0.9] text-[#06e4f9]"
            >
              deploy & grow.
            </motion.h2>
          </div>

          {/* 5-Card Bento Grid */}
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
            >
              {BENTO_CARDS.map((card, i) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.06 * i }}
                  className="rounded-2xl border border-white/10 bg-[#12121e]/80 backdrop-blur-sm p-6 md:p-8 hover:border-[#22d87a]/40 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-[#f0efe9] font-inter">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#f0efe9]/70 leading-relaxed font-inter">
                    {card.text}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: CURRICULUM & MASTERY (Exact ey / ServicesPage Clone) ---------------- */}
      <section
        id="services-section"
        className="relative min-h-screen bg-[#0a0a0f] text-[#f0efe9] py-20 md:py-28 px-4 md:px-12 overflow-hidden border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(6,228,249,0.4)" />

        {/* Serrated triangular top divider */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white/[0.03] flex flex-col justify-end overflow-hidden z-10 pointer-events-none">
          <div className="flex flex-row absolute -bottom-5 -left-4">
            {[...Array(40)].map((_, r) => (
              <div key={r} className="w-10 h-10 bg-[#0a0a0f] transform rotate-45 -mr-5" />
            ))}
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 relative z-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-xs font-bold tracking-widest text-[#22d87a] uppercase mb-4 block font-inter"
              >
                PROGRAM CURRICULUM
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
                className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-[#f0efe9] font-inter"
              >
                What You Will Master
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
              className="text-sm md:text-base text-white/50 max-w-sm text-left md:text-right font-inter font-medium leading-relaxed"
            >
              Master in-demand tech skills through real projects. Build, ship, and grow with expert mentorship.
            </motion.p>
          </div>

          {/* Grid of Square Track Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-16">
            {CURRICULUM_TRACKS.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/apply?domain=${encodeURIComponent(track.domain)}`)}
              >
                {/* Square Image container */}
                <div className="relative aspect-square bg-[#12121e] mb-6 overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#06e4f9]/50 transition-colors">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span className="absolute bottom-4 right-4 text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors font-inter">
                    {track.id}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:underline decoration-2 underline-offset-4 text-[#f0efe9] font-inter">
                  {track.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed max-w-xs font-inter">
                  {track.description}
                </p>
              </motion.div>
            ))}

            {/* Ready to Start Coding Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="relative aspect-square bg-gradient-to-br from-[#12121e] to-black p-8 flex flex-col justify-between group overflow-hidden rounded-2xl border border-white/15 hover:border-[#22d87a]/60 transition-colors"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4 md:mb-6 font-inter">
                  Ready to
                  <br />
                  Start
                  <br />
                  Coding?
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs font-inter">
                  Applications are reviewed on a rolling basis. Build verifiable production experience starting today.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <FlipButton
                  text="APPLY NOW"
                  primary
                  onClick={() => navigate('/apply')}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: OUR ALUMNI / INTERNS (Exact ty / AlumniSection Clone) ---------------- */}
      <section
        ref={alumniRef}
        id="alumni-section"
        className="relative min-h-[160vh] bg-[#0c0c0f] text-[#f0efe9] border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(34,216,122,0.3)" />

        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Header Overlay */}
          <div className="absolute top-12 left-6 md:top-20 md:left-20 z-20 mix-blend-difference">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase font-inter">
                OUR ALUMNI
              </h2>
              <p className="text-xs md:text-base text-white/60 mt-3 max-w-md font-inter">
                Your spot is waiting. Join Geek Interns and become our next verified success story.
              </p>
            </motion.div>
          </div>

          {/* Horizontal Scrolling Track */}
          <motion.div
            style={{ x: alumniX }}
            className="flex gap-6 md:gap-12 pl-6 md:pl-[36vw] pt-24"
          >
            {ALUMNI_LIST.map((alum) => (
              <div
                key={alum.id}
                className="w-[300px] sm:w-[380px] shrink-0 rounded-3xl border border-white/10 bg-[#12121e]/90 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#22d87a]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={alum.avatar}
                      alt={alum.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#22d87a]"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-white font-inter">{alum.name}</h4>
                      <p className="text-xs font-mono text-[#06e4f9]">{alum.college}</p>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-1 inline-block">
                        {alum.outcome}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 italic leading-relaxed font-inter mb-4">
                    “{alum.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <span>{alum.domain}</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    Verified <Check className="w-3.5 h-3.5 text-[#22d87a]" />
                  </span>
                </div>
              </div>
            ))}

            <div className="w-[12vw] shrink-0" />
          </motion.div>

          {/* Bottom right indicator */}
          <div className="absolute bottom-10 right-10 z-20 hidden md:block">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white font-inter">
                Scroll to Explore
              </span>
              <div className="h-px w-12 bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: COMPARISON ANALYSIS (Exact sy / ComparisonSection Clone) ---------------- */}
      <section
        id="comparison-section"
        className="py-20 px-4 md:px-12 bg-[#0a0a0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(34,216,122,0.4)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // COMPARATIVE GEO ANALYSIS
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Traditional vs. Geek Real-World Ecosystem
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mt-3 font-inter">
              A side-by-side comparison formatted for direct indexing by search engines, recruiters, and engineering teams.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Evaluation Criteria
                  </th>
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Traditional Internships / Courses
                  </th>
                  <th className="p-5 font-mono text-xs uppercase tracking-wider text-[#22d87a] font-bold">
                    Geek Real-World Ecosystem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm md:text-base font-inter">
                {COMPARISON_ROWS.map((row, idx) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      row.highlight ? 'bg-[#22d87a]/[0.03]' : ''
                    }`}
                  >
                    <td className="p-5 font-semibold text-neutral-200">{row.feature}</td>
                    <td className="p-5 text-neutral-400">{row.traditional}</td>
                    <td className="p-5 font-bold text-[#22d87a] flex items-center gap-2">
                      <span>✓</span> {row.geek}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: THE ENGINEERING ROADMAP (Exact oy / InternshipGuide Clone) ---------------- */}
      <section
        id="guide-section"
        className="py-20 px-4 md:px-12 bg-[#0c0c0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(6,228,249,0.3)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-14 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#06e4f9] uppercase font-bold">
              // Step-by-Step GEO Framework
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              The Geek Engineering Roadmap
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mt-3 font-inter">
              A structured, step-by-step breakdown of how Geek Interns transforms software learners into production-ready engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROADMAP_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-lg relative group hover:border-[#06e4f9]/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#06e4f9] to-transparent font-mono opacity-80">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-100 mb-3 group-hover:text-[#06e4f9] transition-colors font-inter">
                  {step.title}
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-inter">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: EXPERT INSIGHTS & LEADERSHIP (Exact ly / ExpertQuotes Clone) ---------------- */}
      <section
        id="expert-quotes"
        className="py-20 px-4 md:px-12 bg-[#0a0a0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(34,216,122,0.3)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // E-E-A-T & Industry Authority
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Expert Insights & Engineering Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERT_QUOTES.map((q, idx) => (
              <motion.div
                key={q.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-md flex flex-col justify-between"
              >
                <p className="text-neutral-300 text-base md:text-lg italic leading-relaxed mb-6 font-inter">
                  “{q.quote}”
                </p>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-bold text-neutral-100 font-inter">{q.author}</h4>
                    <p className="text-xs text-neutral-400 font-mono">{q.role}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#22d87a] bg-[#22d87a]/10 px-3 py-1 rounded-full border border-[#22d87a]/20">
                    {q.stats}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: AEO & LLM SEARCH OPTIMIZED FAQ (Exact ay / GEOFAQ Clone) ---------------- */}
      <section
        id="faq-section"
        className="py-20 px-4 md:px-12 bg-[#0c0c0f] text-[#f0efe9] relative overflow-hidden border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(34,216,122,0.3)" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12 text-center md:text-left">
            <span className="text-xs font-mono tracking-widest text-[#22d87a] uppercase font-bold">
              // AEO & LLM Search Optimized
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mt-2 bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent font-inter">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-2xl mt-3 font-inter">
              Direct answers to critical questions parsed for AI search engines, recruiters, and ambitious engineers.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="border border-white/10 rounded-2xl bg-neutral-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#22c55e]/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#06e4f9] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-neutral-100 font-inter">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 border-[#22c55e] text-[#22c55e]' : 'text-neutral-400'
                      }`}
                    >
                      ↓
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-neutral-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4 font-inter">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 9: EXCLUSIVE LEAD MAGNET BANNER (Exact uy / GEOCtaBanner Clone) ---------------- */}
      <section
        id="geo-cta-banner"
        className="py-16 px-4 md:px-12 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white border-y border-white/10 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#06e4f9]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e] font-mono text-xs uppercase tracking-widest mb-4 font-bold">
            Exclusive Lead Magnet & Guide
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4 font-inter">
            Want to Master LLM & AI Search Optimization?
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-inter">
            Get our detailed framework document covering AEO, GEO, LLMO, AISEO, and E-E-A-T. Explore with Geek Interns.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link to="/guidelines">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#22c55e] text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(34,197,94,0.3)] cursor-pointer font-inter uppercase"
              >
                <span>💬 Explore Engineering Framework Guide</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 10: APPLY CTA SECTION (Exact Jx Clone) ---------------- */}
      <section
        id="cta-section"
        className="relative min-h-screen flex items-center justify-center bg-[#12121e] text-[#f0efe9] overflow-hidden py-24"
      >
        <SectionCanvas dotColor="rgba(34,216,122,0.08)" accentColor="rgba(34,216,122,0.4)" />

        {/* Ambient floating green dots */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(20)].map((_, c) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: c * 0.05,
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 2,
              }}
              className="absolute w-1.5 h-1.5 bg-[#22d87a] rounded-full"
              style={{ left: `${(c * 13) % 100}%`, top: `${(c * 17) % 100}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[90vw] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col items-center justify-center mb-16"
          >
            <div className="overflow-hidden">
              <motion.h2
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-4xl md:text-8xl font-black font-inter tracking-tighter mb-4 text-[#f0efe9]"
              >
                JOIN THE
              </motion.h2>
            </div>

            {/* GEEK with animated underline */}
            <div className="overflow-hidden relative">
              <motion.h2
                variants={{
                  hidden: { y: 100, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-[80px] md:text-[240px] leading-[0.85] font-black font-inter tracking-tighter text-[#f0efe9] uppercase"
              >
                GEEK
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-2 left-0 w-full h-2 md:h-4 bg-[#22d87a] origin-left"
              />
            </div>

            <motion.p
              variants={{
                hidden: { y: 100, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="text-base md:text-3xl font-cormorant italic text-[#f0efe9]/80 max-w-2xl mx-auto mt-8 md:mt-12 font-medium"
            >
              Build real projects. Ship production code. Launch your tech career.
            </motion.p>
          </motion.div>

          {/* Dual 3D Offset Shadow CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full px-4 max-w-[400px] md:max-w-none mx-auto"
          >
            {/* Button 1: White 3D Block */}
            <motion.a
              href="/apply"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-block cursor-pointer no-underline w-full md:w-auto"
            >
              <div className="absolute inset-0 bg-[#0a0a0f] translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3 transition-transform group-hover:translate-x-3 md:group-hover:translate-x-4 group-hover:translate-y-3 md:group-hover:translate-y-4" />
              <div className="relative bg-[#ffffff] px-6 py-4 md:px-12 md:py-6 border-2 border-white transition-all w-full flex items-center justify-center">
                <span className="text-base sm:text-lg md:text-2xl text-black font-black font-inter tracking-tighter uppercase text-center">
                  APPLY FOR INTERNSHIP
                </span>
              </div>
            </motion.a>

            {/* Button 2: Neon Emerald 3D Block */}
            <motion.a
              href="/verify"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-block cursor-pointer no-underline w-full md:w-auto mt-2 md:mt-0"
            >
              <div className="absolute inset-0 bg-[#0a0a0f] translate-x-2 md:translate-x-3 translate-y-2 md:translate-y-3 transition-transform group-hover:translate-x-3 md:group-hover:translate-x-4 group-hover:translate-y-3 md:group-hover:translate-y-4" />
              <div className="relative bg-[#22d87a] px-6 py-4 md:px-12 md:py-6 border-2 border-[#22d87a] transition-all w-full flex items-center justify-center">
                <span className="text-base sm:text-lg md:text-2xl text-black font-black font-inter tracking-tighter uppercase text-center">
                  VERIFY CREDENTIALS
                </span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SECTION 11: CONTACT SECTION (Exact ry Clone) ---------------- */}
      <section
        id="contact-section"
        className="min-h-screen bg-[#0a0a0f] text-[#f0efe9] py-20 md:py-28 px-4 md:px-12 relative overflow-hidden flex items-center justify-center border-t border-white/5"
      >
        <SectionCanvas dotColor="rgba(240,239,233,0.06)" accentColor="rgba(34,216,122,0.3)" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <motion.h1
              initial={{ opacity: 0, rotateX: 90, y: -20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100, duration: 0.8 }}
              className="text-3xl md:text-7xl font-light tracking-tight mb-4 md:mb-6 text-[#f0efe9] font-inter"
            >
              Get in Touch with Geek Interns
            </motion.h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium font-inter">
              Have a question about internships, applications, or university collaborations?
              <br />
              We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Direct Inquiries */}
            <div className="lg:col-span-5 space-y-10 pt-4">
              <div className="border-b border-white/10 pb-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4 font-inter">
                  Direct Inquiries
                </h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2 font-inter">
                      Study & Student Enquiry
                    </p>
                    <a
                      href="mailto:support.geekintern@gmail.com"
                      className="text-xl md:text-2xl font-medium text-[#f0efe9] hover:text-[#06e4f9] transition-colors break-words font-inter"
                    >
                      support.geekintern@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2 font-inter">
                      Business & Corporate Partners
                    </p>
                    <a
                      href="mailto:contact@geekintern.com"
                      className="text-xl md:text-2xl font-medium text-[#f0efe9] hover:text-[#22d87a] transition-colors break-words font-inter"
                    >
                      contact@geekintern.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/10 pb-8">
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4 font-inter">
                  Working Hours
                </h3>
                <p className="text-xl font-medium text-[#f0efe9] mb-1 font-inter">
                  Monday — Friday
                </p>
                <span className="text-xs font-mono text-[#22d87a]">
                  10:00 AM — 07:00 PM IST
                </span>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#12121e]/90 backdrop-blur-md">
                <h3 className="text-2xl font-bold mb-6 font-inter text-white">
                  Send a Direct Message
                </h3>

                {contactStatus === 'success' ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-white font-inter">Message Delivered</h4>
                    <p className="text-xs text-white/60 mt-1 font-inter">
                      Thank you for reaching out. An engineering advisor will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase text-white/60 mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-white/60 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-white/60 mb-2">
                        Your Inquiry or Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us about your questions or domain interest..."
                        className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/15 text-white font-inter text-sm focus:outline-none focus:border-[#22d87a]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactStatus === 'submitting'}
                      className="w-full py-4 rounded-full bg-[#22d87a] text-black font-inter font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,216,122,0.3)]"
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

      {/* ---------------- SECTION 12: FOOTER (Exact Zx Clone) ---------------- */}
      <footer className="relative bg-[#0a0a0f] text-[#f0efe9] border-t border-white/10 py-16 md:py-32 flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Col 1 */}
            <div>
              <h3 className="text-3xl md:text-5xl font-black font-inter mb-4 text-white">
                GEEK
              </h3>
              <p className="text-sm font-cormorant italic text-white/60 leading-relaxed">
                Learn. Build. Ship.
                <br />
                Launch your tech career.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 font-inter text-[#22d87a]">
                Connect
              </h4>
              <ul className="space-y-3 font-inter">
                {[
                  { name: 'Engineering Blog', url: '/blog' },
                  { name: 'LinkedIn', url: 'https://in.linkedin.com/in/geek-intern' },
                  { name: 'X (Twitter)', url: 'https://twitter.com/geekintern' },
                  { name: 'Instagram', url: 'https://instagram.com/geekintern' },
                  { name: 'GitHub', url: 'https://github.com/Anant1822/geekintern-client' },
                  { name: 'Email', url: 'mailto:support.geekintern@gmail.com' },
                ].map((item) => (
                  <li key={item.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={item.url}
                      target={item.name === 'Email' ? '_self' : '_blank'}
                      rel={item.name === 'Email' ? undefined : 'noopener noreferrer'}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 text-sm"
                    >
                      <span className="w-4 h-[1px] bg-white/40" />
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 font-inter text-[#06e4f9]">
                Contact
              </h4>
              <div className="space-y-4 text-white/60 text-sm font-inter">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                    Study Enquiry
                  </p>
                  <a
                    href="mailto:support.geekintern@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    support.geekintern@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                    Business Enquiry
                  </p>
                  <a
                    href="mailto:contact@geekintern.com"
                    className="hover:text-white transition-colors"
                  >
                    contact@geekintern.com
                  </a>
                </div>
                <div className="pt-2">
                  <p>India • Remote Engineering Ecosystem</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-inter">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p>© 2026 Geek Interns. All rights reserved.</p>
              <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold font-mono">
                A GKK & Bubblesort Venture
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </PublicLayout>
  )
}

export default Home
