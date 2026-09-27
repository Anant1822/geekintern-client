import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  Database,
  Smartphone,
  ChevronRight,
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
  Briefcase,
  Users,
  Compass,
  Check,
  X,
  Server,
  Cloud,
  BarChart3,
  Wrench,
  BatteryCharging,
  Network,
  CircuitBoard,
  Gauge,
  Building2,
  Palette,
  QrCode,
  Search,
  Lock,
  ExternalLink,
  Flame,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

// Animated Counter Component
function AnimatedStat({
  target,
  decimals = 0,
  suffix = '',
  duration = 1800,
}: {
  target: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return
    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames))
      const currentVal = target * Math.min(progress, 1)

      if (frame >= totalFrames) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(currentVal)
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  const formattedValue =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString('en-US')

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
      {formattedValue}
      <span className="text-[#06e4f9]">{suffix}</span>
    </div>
  )
}

const STATS = [
  { target: 80000, suffix: '+', label: 'Students Joined', sub: 'Across 500+ technical colleges' },
  { target: 6500, suffix: '+', label: 'Verified Credentials', sub: 'Cryptographically signed CIDs' },
  { target: 750, suffix: '+', label: 'Hiring Partners', sub: 'Startups & global tech firms' },
  { target: 99.4, decimals: 1, suffix: '%', label: 'Verification Rate', sub: 'Zero fraud tolerance standard' },
]

const CATEGORY_TABS = [
  'All Tracks',
  'Software & Web',
  'AI & Data',
  'Cloud & DevOps',
  'Design & Creative',
  'Core Engineering',
  'Embedded & IoT',
]

const DOMAIN_PROGRAMS = [
  // 1. Web & Software Engineering
  {
    title: 'Frontend Development',
    category: 'Software & Web',
    description: 'Build responsive, ultra-fast web interfaces using React 19, TypeScript, Tailwind CSS, and state management.',
    badge: 'Popular',
    icon: Globe,
    stack: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
  },
  {
    title: 'Backend Development',
    category: 'Software & Web',
    description: 'Design robust server architectures, RESTful APIs, JWT auth, and relational schemas with Node.js and PostgreSQL.',
    badge: 'High Demand',
    icon: Server,
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Full Stack Development',
    category: 'Software & Web',
    description: 'Master end-to-end architectures uniting modern React frontends with high-scale backends and cloud storage.',
    badge: 'Comprehensive',
    icon: Code2,
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Android App Development',
    category: 'Software & Web',
    description: 'Engineer native mobile applications with Kotlin, Jetpack Compose, asynchronous coroutines, and REST integrations.',
    badge: 'Mobile',
    icon: Smartphone,
    stack: ['Kotlin', 'Compose', 'Coroutines', 'Retrofit'],
  },
  {
    title: 'Python Systems & Automation',
    category: 'Software & Web',
    description: 'Write clean, modular code for algorithmic backends, automated bot workers, and file processing systems.',
    badge: 'Versatile',
    icon: Terminal,
    stack: ['Python', 'FastAPI', 'Celery', 'PyTest'],
  },
  {
    title: 'Enterprise Java Engineering',
    category: 'Software & Web',
    description: 'Enterprise software development, Spring Boot microservices, multithreading, and scalable backend structures.',
    badge: 'Enterprise',
    icon: Cpu,
    stack: ['Java 21', 'Spring Boot', 'Kafka', 'Hibernate'],
  },
  {
    title: 'C++ Systems Programming',
    category: 'Software & Web',
    description: 'Build high-performance applications, low-latency system software, and memory-safe algorithms using modern C++20.',
    badge: 'Systems',
    icon: Terminal,
    stack: ['Modern C++', 'STL', 'CMake', 'Valgrind'],
  },
  {
    title: 'Blockchain & Web3 Engineering',
    category: 'Software & Web',
    description: 'Develop decentralized applications (dApps), Solidity smart contracts, and cryptographic verification on EVM chains.',
    badge: 'Web3',
    icon: Code2,
    stack: ['Solidity', 'Hardhat', 'Ethers.js', 'IPFS'],
  },

  // 2. AI, Machine Learning & Data
  {
    title: 'Generative AI & LLM Systems',
    category: 'AI & Data',
    description: 'Develop production AI agents, LangChain/LlamaIndex RAG workflows, prompt pipelines, and vector database search.',
    badge: 'Cutting Edge',
    icon: BrainCircuit,
    stack: ['LangChain', 'OpenAI', 'Pinecone', 'Python'],
  },
  {
    title: 'Machine Learning Engineering',
    category: 'AI & Data',
    description: 'Train predictive models, implement deep neural networks, tune hyperparameters, and deploy inference microservices.',
    badge: 'High Impact',
    icon: Bot,
    stack: ['PyTorch', 'Scikit-Learn', 'MLflow', 'FastAPI'],
  },
  {
    title: 'Data Science & Statistical Modeling',
    category: 'AI & Data',
    description: 'Extract actionable intelligence from complex datasets using statistical modeling, Pandas, NumPy, and Scipy.',
    badge: 'Analytics',
    icon: TrendingUp,
    stack: ['Pandas', 'NumPy', 'SciPy', 'Jupyter'],
  },
  {
    title: 'Data Analytics & SQL Warehousing',
    category: 'AI & Data',
    description: 'Perform exploratory data analysis, clean structured datasets, run complex SQL queries, and build BI summaries.',
    badge: 'Business Tech',
    icon: BarChart3,
    stack: ['PostgreSQL', 'BigQuery', 'Tableau', 'dbt'],
  },
  {
    title: 'Power BI Enterprise Reporting',
    category: 'AI & Data',
    description: 'Build interactive executive business dashboards, DAX queries, and real-time KPI monitors for enterprise data.',
    badge: 'BI Suite',
    icon: BarChart3,
    stack: ['Power BI', 'DAX', 'Power Query', 'SQL'],
  },

  // 3. Cloud, DevOps & Security
  {
    title: 'Cloud Computing & Architecture',
    category: 'Cloud & DevOps',
    description: 'Architect scalable cloud environments, virtual VPC instances, serverless computing, and distributed object storage.',
    badge: 'Cloud Infra',
    icon: Cloud,
    stack: ['AWS', 'Cloudflare', 'Terraform', 'Serverless'],
  },
  {
    title: 'AWS Cloud Engineering',
    category: 'Cloud & DevOps',
    description: 'Deploy resilient cloud architectures with AWS EC2, S3, IAM security roles, Lambda functions, and RDS databases.',
    badge: 'AWS Certified',
    icon: Cloud,
    stack: ['AWS EC2', 'Lambda', 'S3', 'RDS Aurora'],
  },
  {
    title: 'DevOps & CI/CD Pipelines',
    category: 'Cloud & DevOps',
    description: 'Automate GitHub Actions CI/CD workflows, Docker containerization, Kubernetes orchestration, and observability.',
    badge: 'Automation',
    icon: Sparkles,
    stack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus'],
  },
  {
    title: 'Cyber Security & Ethical Hacking',
    category: 'Cloud & DevOps',
    description: 'Defend web applications and infrastructure through vulnerability audits, network defense, and OWASP Top 10 mitigations.',
    badge: 'Security',
    icon: ShieldCheck,
    stack: ['OWASP', 'Burp Suite', 'Wireshark', 'Metasploit'],
  },

  // 4. Design & Creative
  {
    title: 'UI/UX Design Systems',
    category: 'Design & Creative',
    description: 'Craft intuitive digital user experiences, interactive component libraries, design systems, and Figma prototypes.',
    badge: 'Creative',
    icon: Layers,
    stack: ['Figma', 'Design Tokens', 'Prototyping', 'User Research'],
  },
  {
    title: 'Graphic Design & Brand Identity',
    category: 'Design & Creative',
    description: 'Create compelling visual assets, digital branding, marketing graphics, vector illustrations, and typography compositions.',
    badge: 'Visual Arts',
    icon: Palette,
    stack: ['Illustrator', 'Photoshop', 'Brand Systems', 'Typography'],
  },

  // 5. Core Engineering & Simulation
  {
    title: 'Civil Engineering & Structural Design',
    category: 'Core Engineering',
    description: 'Analyze structural loads, foundation designs, concrete modeling, and civil architectural drawings to code.',
    badge: 'Civil Eng',
    icon: Building2,
    stack: ['STAAD Pro', 'ETABS', 'AutoCAD Civil', 'BIM'],
  },
  {
    title: 'Mechanical Design & Simulation',
    category: 'Core Engineering',
    description: 'Model 3D mechanical assemblies, stress analyses, thermal simulations, and kinematic mechanisms for fabrication.',
    badge: 'Mechanical',
    icon: Wrench,
    stack: ['SolidWorks', 'ANSYS', 'CATIA', 'GD&T'],
  },
  {
    title: 'AutoCAD Industrial Drafting',
    category: 'Core Engineering',
    description: 'Generate precision 2D drafting schematics and 3D architectural/mechanical layouts to international drafting standards.',
    badge: 'Drafting',
    icon: Layers,
    stack: ['AutoCAD 2025', '2D Drafting', 'Isometric', '3D Modeling'],
  },
  {
    title: 'MATLAB Numerical Computing',
    category: 'Core Engineering',
    description: 'Implement mathematical matrix computations, dynamic signal processing, and Simulink control system simulations.',
    badge: 'Scientific',
    icon: Gauge,
    stack: ['MATLAB', 'Simulink', 'Signal Proc', 'Control Systems'],
  },
  {
    title: 'Electric Vehicle Technology (EV)',
    category: 'Core Engineering',
    description: 'Explore battery management systems (BMS), electric powertrains, regenerative braking, and EV charging architectures.',
    badge: 'Future Tech',
    icon: BatteryCharging,
    stack: ['BMS', 'Inverters', 'CAN Bus', 'Lithium Cells'],
  },

  // 6. Embedded Systems, Hardware & IoT
  {
    title: 'VLSI Design & Semiconductor',
    category: 'Embedded & IoT',
    description: 'Design digital logic circuits, Verilog/VHDL hardware architectures, FPGA synthesis, and semiconductor layout verification.',
    badge: 'Semiconductor',
    icon: Cpu,
    stack: ['Verilog', 'VHDL', 'FPGA', 'ModelSim'],
  },
  {
    title: 'Embedded Systems & IoT',
    category: 'Embedded & IoT',
    description: 'Interface microcontrollers with sensor networks, wireless telemetry protocols (MQTT/HTTP), and cloud dashboards.',
    badge: 'Embedded',
    icon: Network,
    stack: ['ESP32', 'C/C++', 'MQTT', 'FreeRTOS'],
  },
  {
    title: 'PCB Design & Circuit Fabrication',
    category: 'Embedded & IoT',
    description: 'Create multi-layer circuit schematics, component footprints, routing topologies, and production Gerber files.',
    badge: 'Electronics',
    icon: CircuitBoard,
    stack: ['KiCad', 'Altium', 'Gerber', 'SMD Assembly'],
  },
]

const COMPARISONS = [
  {
    feature: 'Project Scope',
    traditional: 'Generic Todo apps & calculator clones copied from video tutorials',
    geekInterns: 'Production microservices, RAG LLM agents, and live cloud databases',
  },
  {
    feature: 'Code Reviews',
    traditional: 'Automated multiple-choice questions or zero feedback on code quality',
    geekInterns: 'Strict GitHub PR reviews, architecture feedback, and linting audits',
  },
  {
    feature: 'Deployment',
    traditional: 'Runs on localhost:3000 only; submitted as raw zip files or screenshots',
    geekInterns: 'Live production cloud URLs with SSL, custom domains, and CI/CD pipelines',
  },
  {
    feature: 'Credential Validity',
    traditional: 'Static image or unverified PDF without tamper protection',
    geekInterns: 'Cryptographically verifiable CID with instant recruiter lookup portal',
  },
  {
    feature: 'Work Culture',
    traditional: 'Isolated passive video watching with zero accountability',
    geekInterns: 'Agile sprints, Git branching, issue tracking, and production milestones',
  },
  {
    feature: 'Hiring Readiness',
    traditional: 'Fails practical coding rounds due to lack of git & system experience',
    geekInterns: 'Interview-ready with demonstrable GitHub commits and live URLs',
  },
]

const JOURNEY_STEPS = [
  {
    step: '01',
    word: 'Apply',
    tagline: 'Instant Registration',
    icon: UserCheck,
    detail: 'Choose your desired specialization from 27+ engineering tracks and submit your application in under 2 minutes with zero gatekeeping.',
  },
  {
    step: '02',
    word: 'Onboard',
    tagline: 'Offer & Task Dossier',
    icon: MailCheck,
    detail: 'Receive your verified digital Offer Letter alongside curated real-world problem statements, GitHub starter templates, and milestone rubrics.',
  },
  {
    step: '03',
    word: 'Build',
    tagline: 'Practical Code Work',
    icon: GitBranch,
    detail: 'Develop production-ready modules, implement industry best practices, solve real constraints, and maintain a public Git commit history.',
  },
  {
    step: '04',
    word: 'Submit',
    tagline: 'Review & Evaluation',
    icon: Code2,
    detail: 'Push your completed code to GitHub, deploy the live demo to the cloud, record an architectural walkthrough, and submit for evaluation.',
  },
  {
    step: '05',
    word: 'Verify',
    tagline: 'Tamper-Proof CID',
    icon: BadgeCheck,
    detail: 'Receive your official Certificate of Completion equipped with a tamper-proof digital Certificate ID (CID) verifiable by recruiters worldwide.',
  },
  {
    step: '06',
    word: 'Accelerate',
    tagline: 'Career & LOR',
    icon: Award,
    detail: 'Earn formal Letters of Recommendation (LOR), pass ATS resume filters with our AI scanner, and get showcased on the Geek Intern talent network.',
  },
]

const EXPERT_QUOTES = [
  {
    quote:
      'The software industry doesn’t need more candidates who watched 40 hours of passive videos. It hires developers who understand production latency, clean git rebase workflows, and automated CI pipelines.',
    author: 'Mentorship Lead',
    role: 'Staff Systems Architect, Geek Interns',
    tag: 'Engineering Council',
  },
  {
    quote:
      'Every intern here commits to real git repositories and deploys to staging clouds. The confidence jump between day one and final project submission is what makes our graduates stand out.',
    author: 'Core Platform Lead',
    role: 'A GKK & Bubblesort Venture',
    tag: 'Technical Director',
  },
]

const STUDENT_TESTIMONIALS = [
  {
    name: 'Aarav Singhania',
    college: 'IIT Roorkee',
    domain: 'Full Stack Web Development',
    rating: 5,
    quote:
      'The hands-on project tasks mirrored real production tickets. Building a full-stack platform with authentication and database schemas made all the difference during my technical interviews.',
  },
  {
    name: 'Meera Nambiar',
    college: 'BITS Pilani',
    domain: 'Machine Learning & AI',
    rating: 5,
    quote:
      'The curriculum pushed me to implement neural network architectures from scratch rather than just running pre-made notebooks. Having a verifiable QR certificate helped me secure an off-campus ML internship.',
  },
  {
    name: 'Tanmay Deshmukh',
    college: 'COEP Technological University',
    domain: 'Android App Development',
    rating: 5,
    quote:
      'The freedom to complete assignments alongside my university semester exams was fantastic. Geek Intern provided clear task guidelines and prompt credential verification upon submission.',
  },
]

const CAREER_TOOLS = [
  {
    title: 'ATS Resume Score Checker',
    desc: 'Benchmark your developer resume against real engineering job descriptions. Get instant keyword matching and score recommendations.',
    tag: 'Free AI Scanner',
    actionText: 'Scan Resume Free',
    href: '/ats-checker',
    icon: CheckCircle2,
    gradient: 'from-blue-600/20 to-cyan-600/20',
  },
  {
    title: 'Developer Resume Builder',
    desc: 'Create clean, recruiter-approved developer resumes tailored for ATS parsers. Includes live side-by-side preview and PDF export.',
    tag: 'Interactive Builder',
    actionText: 'Build My Resume',
    href: '/resume-builder',
    icon: FileText,
    gradient: 'from-indigo-600/20 to-purple-600/20',
  },
  {
    title: 'Portfolio Website Builder',
    desc: 'Transform your GitHub repositories and projects into an elegant personal developer portfolio ready to share with hiring managers.',
    tag: 'Portfolio Generator',
    actionText: 'Create Portfolio',
    href: '/portfolio-builder',
    icon: Layers,
    gradient: 'from-emerald-600/20 to-teal-600/20',
  },
]

const FAQS = [
  {
    question: 'How do I apply for a Geek Intern Virtual Internship?',
    answer:
      'Simply click "Apply for Cohort" or select any engineering track. Fill out your educational details, choose your specialization, and submit. There are no prerequisite entrance tests or restrictive gatekeeping.',
  },
  {
    question: 'Is the virtual internship program remote and self-paced?',
    answer:
      'Yes, 100% of our internships are conducted remotely. You can comfortably plan your schedule around college coursework, laboratory sessions, and semester examinations while meeting weekly project milestones.',
  },
  {
    question: 'How are the certificates and offer letters verified by employers?',
    answer:
      'Every credential issued by Geek Intern carries a unique Certificate ID (CID) and cryptographic QR code. Recruiters can verify authenticity in seconds through our permanent public verification portal at /verify and /verify-offer-letter.',
  },
  {
    question: 'What is the duration of the internship programs?',
    answer:
      'Standard tracks are structured across 4-week or 8-week durations depending on project scope. Flexible submissions allow driven engineers to finish milestones early without administrative bottlenecks.',
  },
  {
    question: 'Can I get a formal Letter of Recommendation (LOR)?',
    answer:
      'Yes. Top-performing interns who demonstrate clean commit histories, well-architected systems, and thorough documentation receive a formal Letter of Recommendation (LOR) alongside their verified certificate.',
  },
  {
    question: 'Can I submit this internship to my college for academic credit?',
    answer:
      'Absolutely. Our internships comply with standard university internship guidelines (AICTE / UGC format), and we issue official digital Offer Letters, milestone rubrics, and Completion Certificates acceptable across 500+ universities.',
  },
]

export function Home() {
  const [activeCategory, setActiveCategory] = useState('All Tracks')
  const [showAllDomains, setShowAllDomains] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [verifyIdInput, setVerifyIdInput] = useState('')
  const navigate = useNavigate()

  const allFilteredPrograms =
    activeCategory === 'All Tracks'
      ? DOMAIN_PROGRAMS
      : DOMAIN_PROGRAMS.filter((p) => p.category === activeCategory)

  const visiblePrograms = showAllDomains
    ? allFilteredPrograms
    : allFilteredPrograms.slice(0, 9)

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!verifyIdInput.trim()) return
    const id = verifyIdInput.trim().toUpperCase()
    if (id.includes('OFFER') || id.startsWith('OFF-') || id.startsWith('GKK-OFF')) {
      navigate(`/verify-offer-letter?id=${encodeURIComponent(id)}`)
    } else {
      navigate(`/verify?id=${encodeURIComponent(id)}`)
    }
  }

  return (
    <PublicLayout>
      <PageTitle
        title="Code. Build. Deploy. | A GKK & Bubblesort Venture"
        suffix="Geek Interns"
      />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#2c2cf3]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#06e4f9]/10 rounded-full blur-[160px]" />
        <div className="absolute top-[65%] -right-48 w-[600px] h-[600px] bg-[#22c55e]/08 rounded-full blur-[160px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
      </div>

      <div className="relative z-10">
        {/* ---------------- 1. HERO SECTION ---------------- */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(6,228,249,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06e4f9] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06e4f9]"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold">
                A GKK & BUBBLESORT VENTURE
              </span>
              <span className="text-white/30 text-xs">•</span>
              <span className="font-mono text-xs text-white/70">
                COHORT 2026 ADMISSIONS OPEN
              </span>
            </motion.div>

            {/* Kinetic Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3 mb-6"
            >
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[1.05]">
                JOIN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#06e4f9] to-[#2c2cf3]">GEEK INTERNS</span>
              </h1>
              <p className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#06e4f9] via-sky-200 to-indigo-300">
                where convention collapses and engineering begins.
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[#f0efe9]/70 font-sans leading-relaxed mb-10"
            >
              Transform from a tutorial consumer into a battle-tested software engineer.
              Work in agile squads, ship production code to live cloud infrastructure, and earn
              cryptographically verified credentials recognized across the tech industry.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#2c2cf3] via-[#06e4f9] to-[#2c2cf3] bg-[length:200%_auto] text-black font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(6,228,249,0.4)] hover:shadow-[0_0_50px_rgba(6,228,249,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Apply for Cohort 2026</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#tracks"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full cyber-glass text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 hover:border-[#06e4f9]/50 transition-all duration-300"
              >
                <span>Explore Tracks</span>
                <ChevronDown className="w-4 h-4 text-[#06e4f9]" />
              </a>

              <Link
                to="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/[0.02] border border-white/10 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider hover:border-white/30 transition-all duration-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verify Credential CID</span>
              </Link>
            </motion.div>

            {/* Bento Counter Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="cyber-card p-6 text-left rounded-2xl relative overflow-hidden group hover:border-[#06e4f9]/40"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#06e4f9]/5 rounded-bl-full pointer-events-none group-hover:bg-[#06e4f9]/10 transition-colors" />
                  <AnimatedStat
                    target={stat.target}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                  <div className="font-mono text-xs uppercase tracking-wider text-white/90 font-bold mt-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-white/50 font-sans mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ---------------- 2. KINETIC MISSION BENTO GRID ("CODE BUILD deploy & grow.") ---------------- */}
        <section className="py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2cf3]/10 border border-[#2c2cf3]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                // THE GEEK INTERNS MANIFESTO
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-2">
                CODE BUILD
              </h2>
              <div className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#06e4f9] font-normal mb-6">
                deploy & grow.
              </div>
              <p className="text-white/60 font-sans text-base sm:text-lg max-w-2xl mx-auto">
                We bridge the gap between academic theory and real-world high-scale production engineering.
                Here is why thousands of aspiring developers choose Geek Interns over outdated bootcamps.
              </p>
            </div>

            {/* 5-Card Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 (Span 2) */}
              <div className="md:col-span-2 cyber-card p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#06e4f9]/50 group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#2c2cf3]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2c2cf3]/20 transition-all" />
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold">
                    01 / THE CORE PROBLEM
                  </span>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80 font-mono text-[11px]">
                    Experience Paradox
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
                  Why Geek Interns Exists
                </h3>
                <p className="text-white/70 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
                  Traditional engineering colleges teach syntax from outdated textbooks. The industry hires for
                  distributed architecture, system design, CI/CD pipelines, and asynchronous pull request reviews.
                  We eliminate the entry-level experience paradox by giving you genuine production exposure before your first job.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#2c2cf3] flex items-center justify-center font-mono text-xs font-bold text-white border-2 border-[#0a0a0f]">G</div>
                    <div className="w-8 h-8 rounded-full bg-[#06e4f9] flex items-center justify-center font-mono text-xs font-bold text-black border-2 border-[#0a0a0f]">K</div>
                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center font-mono text-xs font-bold text-black border-2 border-[#0a0a0f]">I</div>
                  </div>
                  <span className="text-xs font-mono text-white/50">Trusted by students in 500+ universities</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="cyber-card p-8 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#06e4f9]/50 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold">
                    02 / METHODOLOGY
                  </span>
                  <GitBranch className="w-5 h-5 text-[#06e4f9]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  How We Train
                </h3>
                <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed">
                  No passive video watching. You pull tickets from project sprint boards, write clean typed code, open pull requests, and survive ruthless peer code reviews.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#06e4f9]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Agile sprints & Git workflow</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="cyber-card p-8 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#22c55e]/50 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    03 / DELIVERABLES
                  </span>
                  <Terminal className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  What You Build
                </h3>
                <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed">
                  Full-stack microservices, autonomous LLM agent pipelines, resilient cloud infrastructure, and high-performance mobile apps with live URLs.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Production-deployed capstones</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="cyber-card p-8 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#2c2cf3]/50 group">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold">
                    04 / IMPACT
                  </span>
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Career Outcome
                </h3>
                <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed">
                  Graduates who speak the language of senior engineers. Resumes backed by live GitHub repositories, tamper-proof CIDs, and recruiter recommendations.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-indigo-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifiable developer portfolio</span>
                </div>
              </div>

              {/* Card 5 (Span 2) */}
              <div className="md:col-span-2 cyber-card p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#06e4f9]/50 group bg-gradient-to-br from-[#12121e] via-[#12121e] to-[#1a1a2e]">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold">
                    05 / BACKED BY GKK
                  </span>
                  <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[11px]">
                    Verified Venture
                  </Badge>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                  A GKK & Bubblesort Venture
                </h3>
                <p className="text-white/70 font-sans text-base leading-relaxed max-w-2xl">
                  Engineered under the umbrella of GKK & Bubblesort, combining rigorous engineering standards with modern product incubation.
                  Every credential is cryptographically anchored, permanently verifiable, and recognized by hiring managers.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/verify"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#06e4f9] hover:underline"
                  >
                    <span>Check Verification Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-white/20">|</span>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white/70 hover:text-white"
                  >
                    <span>Learn About the Venture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 3. THE COMPARISON SECTION ---------------- */}
        <section className="py-20 md:py-28 relative bg-[#0a0a0f]/80 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06e4f9]/10 border border-[#06e4f9]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                // THE PARADIGM SHIFT
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
                Why Geek Interns Is Different
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-white/60">
                beyond the surface of traditional bootcamps.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="max-w-5xl mx-auto cyber-card rounded-3xl overflow-hidden border border-white/10 divide-y divide-white/10 shadow-2xl">
              {/* Header Row */}
              <div className="grid grid-cols-12 bg-white/[0.02] p-5 sm:p-6 font-mono text-xs uppercase tracking-wider text-white/50">
                <div className="col-span-4 sm:col-span-3 font-bold text-white">Dimension</div>
                <div className="col-span-4 sm:col-span-4 text-rose-400">Traditional Online Courses</div>
                <div className="col-span-4 sm:col-span-5 text-[#06e4f9] font-bold flex items-center gap-1">
                  <span>Geek Interns Experience</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Rows */}
              {COMPARISONS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-5 sm:p-6 items-center gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-4 sm:col-span-3 font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {row.feature}
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-xs sm:text-sm text-white/50 flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-5 text-xs sm:text-sm text-[#f0efe9] font-medium flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#06e4f9] shrink-0 mt-0.5" />
                    <span>{row.geekInterns}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-[#06e4f9] hover:bg-white/10 hover:border-[#06e4f9]/50 transition-all"
              >
                <span>Ready to build real software? Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- 4. ENGINEERING TRACKS & DISCIPLINES ---------------- */}
        <section id="tracks" className="py-20 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06e4f9]/10 border border-[#06e4f9]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                  // SPECIALIZED DISCIPLINES
                </div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                  Engineering Tracks
                </h2>
                <p className="font-serif italic text-2xl sm:text-3xl text-white/60 mt-1">
                  choose your arena and master your craft.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORY_TABS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setShowAllDomains(false)
                    }}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-[#06e4f9] text-black font-bold shadow-[0_0_20px_rgba(6,228,249,0.35)]'
                        : 'bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Tracks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePrograms.map((program, idx) => {
                const IconComponent = program.icon
                const displayIndex = (idx + 1).toString().padStart(2, '0')

                return (
                  <div
                    key={program.title}
                    className="cyber-card p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#06e4f9]/50 flex flex-col justify-between group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#06e4f9]/5 rounded-bl-full pointer-events-none group-hover:bg-[#06e4f9]/10 transition-colors" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-white/40 tracking-wider">
                          TRACK {displayIndex}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-white/15 bg-white/5 text-[#06e4f9] font-mono text-[11px]"
                        >
                          {program.badge}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06e4f9] group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                            {program.category}
                          </span>
                          <h3 className="font-display font-bold text-xl text-white group-hover:text-[#06e4f9] transition-colors">
                            {program.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {program.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[11px] font-mono text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        to={`/apply?domain=${encodeURIComponent(program.title)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#06e4f9] hover:text-white transition-colors"
                      >
                        <span>Apply For Track</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>

                      <span className="text-[11px] font-mono text-white/40">
                        4-8 WEEKS • REMOTE
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Show All Toggle */}
            {allFilteredPrograms.length > 9 && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => setShowAllDomains(!showAllDomains)}
                  variant="outline"
                  className="rounded-full px-8 py-3 bg-white/5 border border-white/15 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 hover:border-[#06e4f9]/50"
                >
                  {showAllDomains
                    ? 'Show Less Tracks'
                    : `View All ${allFilteredPrograms.length} Engineering Tracks`}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- 5. THE 6-STEP STUDENT JOURNEY ---------------- */}
        <section className="py-20 md:py-32 relative bg-[#0a0a0f]/90 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                // THE PLAYBOOK
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
                How It Works
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-white/60">
                from instant enrollment to verified industry proof.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {JOURNEY_STEPS.map((step, idx) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={step.step}
                    className="cyber-card p-8 rounded-3xl relative overflow-hidden border border-white/10 hover:border-[#06e4f9]/50 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display font-black text-4xl text-white/20 group-hover:text-[#06e4f9] transition-colors">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06e4f9]">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">
                      {step.word}
                    </h3>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------------- 6. INSTANT CREDENTIAL VERIFICATION & TRUST CENTER ---------------- */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cyber-card p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden shadow-[0_0_50px_rgba(6,228,249,0.1)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#06e4f9]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PERMANENT RECRUITER VERIFICATION</span>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                  Verify Any Credential
                </h2>
                <p className="font-serif italic text-xl sm:text-2xl text-white/60">
                  cryptographically secured proof of engineering capability.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleVerifySubmit} className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-white/[0.04] border border-white/15">
                  <div className="flex items-center gap-3 px-3 w-full">
                    <Search className="w-5 h-5 text-white/40 shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter Certificate ID or Offer Letter ID (e.g. GKK-2025-001)"
                      value={verifyIdInput}
                      onChange={(e) => setVerifyIdInput(e.target.value)}
                      className="bg-transparent text-white placeholder-white/40 text-sm font-mono w-full focus:outline-none py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#06e4f9] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(6,228,249,0.3)]"
                  >
                    Verify Now
                  </button>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
                <div className="space-y-1">
                  <div className="text-white font-mono text-xs font-bold uppercase tracking-wider">
                    Tamper-Proof CID
                  </div>
                  <div className="text-xs text-white/50">Cryptographically unique hash for every issued certificate</div>
                </div>
                <div className="space-y-1">
                  <div className="text-white font-mono text-xs font-bold uppercase tracking-wider">
                    Instant Validation
                  </div>
                  <div className="text-xs text-white/50">One-click lookup for hiring managers and recruiters</div>
                </div>
                <div className="space-y-1">
                  <div className="text-white font-mono text-xs font-bold uppercase tracking-wider">
                    Official Recognition
                  </div>
                  <div className="text-xs text-white/50">Accepted by 500+ universities for semester credit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 7. EXPERT QUOTES & MENTORSHIP COUNCIL ---------------- */}
        <section className="py-20 md:py-28 relative bg-[#0a0a0f]/80 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2c2cf3]/10 border border-[#2c2cf3]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                // VOICES FROM THE ARENA
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
                Voices of Engineering
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-white/60">
                what mentors and developers say about the standard.
              </p>
            </div>

            {/* Proof Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {EXPERT_QUOTES.map((quote, idx) => (
                <div
                  key={idx}
                  className="cyber-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between"
                >
                  <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed italic mb-8">
                    “{quote.quote}”
                  </p>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-[#06e4f9] font-bold">
                      {quote.author}
                    </div>
                    <div className="text-xs text-white/50 font-sans mt-0.5">
                      {quote.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STUDENT_TESTIMONIALS.map((review, idx) => (
                <div
                  key={idx}
                  className="cyber-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                    “{review.quote}”
                  </p>
                  <div className="pt-3 border-t border-white/10">
                    <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      {review.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#06e4f9]">
                      {review.domain} • {review.college}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 8. DEVELOPER CAREER TOOLS ---------------- */}
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06e4f9]/10 border border-[#06e4f9]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                // FREE ECOSYSTEM UTILITIES
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
                Developer Career Tools
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-white/60">
                built to accelerate your engineering journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAREER_TOOLS.map((tool, idx) => {
                const ToolIcon = tool.icon
                return (
                  <div
                    key={tool.title}
                    className="cyber-card p-8 rounded-3xl border border-white/10 hover:border-[#06e4f9]/50 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06e4f9] mb-6 group-hover:scale-110 transition-transform">
                        <ToolIcon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-white/15 bg-white/5 text-white/70 font-mono text-[10px] uppercase mb-3">
                        {tool.tag}
                      </Badge>
                      <h3 className="font-display font-bold text-2xl text-white mb-3">
                        {tool.title}
                      </h3>
                      <p className="text-white/60 font-sans text-sm leading-relaxed mb-6">
                        {tool.desc}
                      </p>
                    </div>

                    <Link
                      to={tool.href}
                      className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#06e4f9] hover:text-black hover:border-transparent transition-all"
                    >
                      <span>{tool.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------------- 9. GEO FAQ ACCORDION ---------------- */}
        <section className="py-20 md:py-28 relative bg-[#0a0a0f]/80 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06e4f9]/10 border border-[#06e4f9]/30 text-xs font-mono uppercase tracking-widest text-[#06e4f9] mb-4">
                // INTEL & CLARIFICATIONS
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
                Frequently Answered
              </h2>
              <p className="font-serif italic text-2xl sm:text-3xl text-white/60">
                clear answers. zero ambiguity.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = faqOpen === idx
                return (
                  <div
                    key={idx}
                    className="cyber-card rounded-2xl border border-white/10 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setFaqOpen(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4"
                    >
                      <span className="font-mono text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#06e4f9] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-6 text-white/70 font-sans text-sm leading-relaxed border-t border-white/5 pt-4"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------------- 10. HIGH-IMPACT CYBER CTA BANNER ---------------- */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="cyber-card p-10 sm:p-16 rounded-3xl border border-white/20 relative overflow-hidden text-center shadow-[0_0_80px_rgba(6,228,249,0.2)]">
              {/* Internal glowing gradient meshes */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#2c2cf3]/30 via-[#06e4f9]/30 to-[#22c55e]/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-xs font-mono uppercase tracking-widest text-[#06e4f9]">
                  <Flame className="w-3.5 h-3.5 text-[#06e4f9]" />
                  <span>LIMITED SQUAD CAPACITY FOR COHORT 2026</span>
                </div>

                <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-tight">
                  Ready to Deploy <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06e4f9] via-white to-sky-300">
                    Your Future?
                  </span>
                </h2>

                <p className="font-serif italic text-2xl sm:text-3xl text-white/70 max-w-xl mx-auto">
                  step into the arena and ship code that matters.
                </p>

                <p className="max-w-xl mx-auto text-white/60 font-sans text-sm sm:text-base leading-relaxed">
                  Join thousands of ambitious developers who transformed their portfolios with production-grade experience and cryptographically verifiable credentials.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/apply"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#2c2cf3] via-[#06e4f9] to-[#2c2cf3] bg-[length:200%_auto] text-black font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(6,228,249,0.4)] hover:shadow-[0_0_50px_rgba(6,228,249,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <span>Apply for Cohort 2026</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/browse"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full cyber-glass text-white font-mono text-sm uppercase tracking-wider hover:bg-white/10 hover:border-[#06e4f9]/50 transition-all duration-300"
                  >
                    <span>Browse All Programs</span>
                    <ArrowUpRight className="w-4 h-4 text-[#06e4f9]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
export default Home
