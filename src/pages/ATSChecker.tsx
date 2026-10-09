import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FileText,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

const PRESET_JOB_DESCRIPTIONS: { [key: string]: string } = {
  'frontend': `Looking for a Frontend Developer with strong skills in React, Next.js, TypeScript, and Tailwind CSS.
Key Responsibilities:
- Build responsive, accessible user interfaces for high-traffic web applications
- Integrate RESTful and GraphQL APIs with optimistic UI updates
- Optimize bundle size, core web vitals, and rendering performance
- Write clean unit and integration tests using Jest and React Testing Library
- Collaborate with product designers and backend engineers using Git and CI/CD`,

  'fullstack': `Full Stack Engineer sought with hands-on experience in Node.js, Express, React, PostgreSQL, and Docker.
Key Requirements:
- Develop microservices and RESTful API endpoints with JWT authentication
- Manage database schemas, indexes, and queries using PostgreSQL and Prisma or TypeORM
- Implement state management and responsive client pages with TypeScript
- Deploy cloud containerized apps on AWS or Docker environments
- Maintain git repositories with clean commit messages and pull request reviews`,

  'python': `Python & Data Science Developer opening for candidates skilled in Python, Pandas, NumPy, Scikit-learn, and FastAPI.
Key Requirements:
- Build machine learning predictive pipelines and data cleaning scripts
- Create high-performance REST APIs with FastAPI or Flask
- Analyze large tabular datasets and generate data visualizations with Matplotlib/Seaborn
- Experience with SQL database queries and Git version control`,
}

export function ATSChecker() {
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState(PRESET_JOB_DESCRIPTIONS['fullstack'])
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<{
    score: number
    keywordScore: number
    impactScore: number
    formatScore: number
    matchedKeywords: string[]
    missingKeywords: string[]
    suggestions: string[]
  } | null>(null)

  const handleScan = () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text to scan.')
      return
    }

    setAnalyzing(true)

    setTimeout(() => {
      const lowerResume = resumeText.toLowerCase()
      const techKeywords = [
        'react', 'next.js', 'typescript', 'javascript', 'html', 'css', 'tailwind',
        'node.js', 'express', 'python', 'fastapi', 'postgresql', 'mongodb', 'sql',
        'git', 'github', 'docker', 'aws', 'rest api', 'graphql', 'ci/cd', 'agile',
        'redux', 'jest', 'testing', 'performance', 'responsive', 'supabase'
      ]

      const matched: string[] = []
      const missing: string[] = []

      techKeywords.forEach((kw) => {
        if (lowerResume.includes(kw)) {
          matched.push(kw)
        } else if (jobDescription.toLowerCase().includes(kw)) {
          missing.push(kw)
        }
      })

      const actionVerbs = ['developed', 'built', 'created', 'implemented', 'optimized', 'designed', 'managed', 'engineered', 'deployed', 'scaled']
      let verbCount = 0
      actionVerbs.forEach((v) => {
        if (lowerResume.includes(v)) verbCount++
      })

      const hasMetrics = /\d+%|\d+x|\$\d+|\d+\s*users|\d+\s*ms/i.test(resumeText)

      const kwScore = Math.min(100, Math.round((matched.length / Math.max(matched.length + missing.length, 6)) * 100))
      const impScore = Math.min(100, (verbCount * 10) + (hasMetrics ? 20 : 0))
      const fmtScore = lowerResume.length > 500 ? 92 : 68
      const totalScore = Math.round((kwScore * 0.5) + (impScore * 0.3) + (fmtScore * 0.2))

      const suggestions: string[] = []
      if (missing.length > 0) {
        suggestions.push(`Consider adding target keywords found in the job description: ${missing.slice(0, 4).join(', ')}.`)
      }
      if (!hasMetrics) {
        suggestions.push('Add quantified metrics and outcomes (e.g. "Improved page load speed by 35%" or "Managed 10,000+ records").')
      }
      if (verbCount < 4) {
        suggestions.push('Use strong action verbs like "Architected", "Engineered", "Optimized", or "Deployed" at the start of bullet points.')
      }
      if (!lowerResume.includes('github') && !lowerResume.includes('linkedin')) {
        suggestions.push('Add clickable links to your GitHub profile and LinkedIn to build technical credibility.')
      }

      setResults({
        score: totalScore,
        keywordScore: kwScore,
        impactScore: impScore,
        formatScore: fmtScore,
        matchedKeywords: matched,
        missingKeywords: missing,
        suggestions,
      })
      setAnalyzing(false)
    }, 700)
  }

  const loadSampleResume = () => {
    setResumeText(`Rahul Verma
Email: rahul.verma@example.com | Phone: +91 98765 43210
GitHub: github.com/rahulverma | LinkedIn: linkedin.com/in/rahulverma

SUMMARY
Passionate Full Stack Developer with experience in React, TypeScript, Node.js, and PostgreSQL. Proven ability to build responsive web applications and scalable REST APIs.

TECHNICAL SKILLS
Languages & Frameworks: JavaScript, TypeScript, React, Next.js, Node.js, Express, HTML5, CSS3, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, Supabase, Git, GitHub, Docker
Concepts: RESTful APIs, Agile, CI/CD, Responsive Web Design

EXPERIENCE
Virtual Web Development Intern | Geek Intern (May 2024 - June 2024)
- Developed an E-Commerce storefront using Next.js and Tailwind CSS, improving mobile load times by 25%.
- Integrated RESTful APIs and Stripe checkout workflows for automated payment authorization.
- Built reusable UI components and managed global application state using React Context and hooks.
- Pushed clean version-controlled commits to GitHub and conducted code reviews with mentor feedback.

PROJECTS
TaskFlow - Kanban Project Management Tool
- Engineered a full-stack task manager with React, Node.js, and PostgreSQL supporting drag-and-drop cards.
- Implemented JWT authentication and role-based permissions, supporting 500+ active test users.

EDUCATION
Bachelor of Technology in Computer Science Engineering | CGPA: 8.7/10 (2021 - 2025)`)
  }

  return (
    <PublicLayout>
      <PageTitle title="ATS Resume Score Checker | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] dark:bg-[#151311] bg-dot-matrix text-[#1A1715] dark:text-[#FAF7F2] border-b border-[#E2DDD2] dark:border-stone-800 overflow-hidden">
        <motion.div
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/3 w-80 h-80 rounded-full bg-[#EBE6DC]/60 dark:bg-stone-900/40 blur-[90px] pointer-events-none -z-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#E8F3ED] text-[#2D6A4F] border border-[#C2E0D1] uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Applicant Tracking System Scanner
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#1A1715] dark:text-[#FAF7F2]">
            Check Your <span className="italic font-serif text-[#8C4325]">ATS Score</span>
          </h1>
          <p className="text-[#57534E] dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Over 75% of resumes are discarded by automated applicant tracking filters. Scan your resume text now and get instant keyword matching and scoring.
          </p>
        </motion.div>
      </section>

      {/* Main Scanner Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Column (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Resume text card */}
              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-[#1A1715] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Paste Your Resume Content</span>
                  </label>
                  <button
                    type="button"
                    onClick={loadSampleResume}
                    className="text-xs font-semibold text-[#2D6A4F] hover:text-[#181615] hover:underline"
                  >
                    Load Sample Resume
                  </button>
                </div>
                <Textarea
                  rows={10}
                  placeholder="Paste your plain resume text here (Personal details, summary, experience bullet points, skills, projects)..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] font-mono text-xs leading-relaxed rounded-xl placeholder:text-[#57534E]/60 focus:bg-[#FAF7F2] focus:border-[#181615] focus:ring-[#181615]"
                />
              </div>

              {/* Target Job Description card */}
              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <label className="text-sm font-bold text-[#1A1715] flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#8C4325]" />
                    <span>Target Job Description</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#57534E]">Presets:</span>
                    <button
                      type="button"
                      onClick={() => setJobDescription(PRESET_JOB_DESCRIPTIONS['fullstack'])}
                      className="px-2.5 py-1 rounded-md bg-[#EBE6DC] hover:bg-[#EAE4D7] text-[11px] text-[#1A1715] font-medium"
                    >
                      Full Stack
                    </button>
                    <button
                      type="button"
                      onClick={() => setJobDescription(PRESET_JOB_DESCRIPTIONS['frontend'])}
                      className="px-2.5 py-1 rounded-md bg-[#EBE6DC] hover:bg-[#EAE4D7] text-[11px] text-[#1A1715] font-medium"
                    >
                      Frontend
                    </button>
                    <button
                      type="button"
                      onClick={() => setJobDescription(PRESET_JOB_DESCRIPTIONS['python'])}
                      className="px-2.5 py-1 rounded-md bg-[#EBE6DC] hover:bg-[#EAE4D7] text-[11px] text-[#1A1715] font-medium"
                    >
                      Python
                    </button>
                  </div>
                </div>
                <Textarea
                  rows={6}
                  placeholder="Paste the job requirements from LinkedIn, Indeed, or the company portal..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] font-mono text-xs leading-relaxed rounded-xl placeholder:text-[#57534E]/60 focus:bg-[#FAF7F2] focus:border-[#181615] focus:ring-[#181615]"
                />
              </div>

              {/* Action Button */}
              <Button
                onClick={handleScan}
                disabled={analyzing}
                className="h-12 bg-[#181615] hover:bg-[#2A2724] text-white font-bold text-sm rounded-full shadow-xs inline-flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Keywords & Readability...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-5 h-5" />
                    <span>Scan ATS Compatibility Score Now</span>
                  </>
                )}
              </Button>
            </div>

            {/* Results Column (5 Cols) */}
            <div className="lg:col-span-5">
              {results ? (
                <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-6 flex flex-col gap-6 sticky top-24 shadow-sm">
                  {/* Score circle */}
                  <div className="flex items-center gap-5 p-4 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2]">
                    <div
                      className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 ${
                        results.score >= 80
                          ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                          : results.score >= 60
                          ? 'border-amber-500 text-amber-700 bg-amber-50'
                          : 'border-red-500 text-red-700 bg-red-50'
                      }`}
                    >
                      <span className="text-2xl font-extrabold">{results.score}%</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider">Score</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1715]">
                        {results.score >= 80
                          ? 'Excellent ATS Match'
                          : results.score >= 60
                          ? 'Moderate Compatibility'
                          : 'Requires Optimization'}
                      </h3>
                      <p className="text-xs text-[#57534E] mt-1">
                        {results.score >= 80
                          ? 'Your resume contains strong technical keywords and clear structure.'
                          : 'Implement the recommendations below to pass automatic algorithmic filtering.'}
                      </p>
                    </div>
                  </div>

                  {/* Sub Scores */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2] text-center">
                      <div className="text-xs text-[#57534E]">Keywords</div>
                      <div className="text-base font-bold text-[#2D6A4F] mt-1">{results.keywordScore}%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2] text-center">
                      <div className="text-xs text-[#57534E]">Impact Verbs</div>
                      <div className="text-base font-bold text-[#8C4325] mt-1">{results.impactScore}%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2] text-center">
                      <div className="text-xs text-[#57534E]">Readability</div>
                      <div className="text-base font-bold text-emerald-600 mt-1">{results.formatScore}%</div>
                    </div>
                  </div>

                  {/* Matched Keywords */}
                  <div>
                    <h4 className="text-xs font-bold text-[#57534E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Detected Technical Keywords ({results.matchedKeywords.length})</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {results.matchedKeywords.map((kw) => (
                        <span key={kw} className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  {results.missingKeywords.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-[#57534E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Recommended Keywords to Add</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {results.missingKeywords.map((kw) => (
                          <span key={kw} className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[11px] font-semibold border border-rose-200">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions list */}
                  <div>
                    <h4 className="text-xs font-bold text-[#57534E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Actionable Improvements</span>
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {results.suggestions.map((sug, i) => (
                        <li key={i} className="text-xs text-[#57534E] flex items-start gap-2 bg-[#F5F2EB] p-2.5 rounded-lg border border-[#E2DDD2]">
                          <span className="text-[#2D6A4F] font-bold">•</span>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link to Resume Builder */}
                  <div className="pt-2">
                    <Link to="/resume-builder">
                      <Button className="w-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs h-10 rounded-full shadow-xs">
                        Open Resume Builder to Fix Issues →
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 text-center flex flex-col items-center justify-center min-h-[360px] shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-[#EBE6DC] text-[#181615] flex items-center justify-center mb-4 border border-[#E2DDD2]">
                    <FileCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1715] mb-2">Ready to Scan</h3>
                  <p className="text-xs text-[#57534E] max-w-sm leading-relaxed mb-6">
                    Paste your resume text and optional target job requirements on the left, then click "Scan ATS Compatibility Score Now".
                  </p>
                  <Button
                    variant="outline"
                    onClick={loadSampleResume}
                    className="border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] text-xs shadow-xs hover:bg-[#EAE4D7] rounded-full"
                  >
                    Try with Demo Resume
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default ATSChecker
