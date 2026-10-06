import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

export function PortfolioBuilder() {
  const [theme, setTheme] = useState<'clean' | 'dark' | 'neon'>('clean')
  const [copied, setCopied] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Rahul Verma',
    role: 'Full Stack Web Developer & Open Source Contributor',
    about:
      'Passionate software engineer focused on building performant, human-centric web applications and scalable APIs. Former Geek Intern Virtual Intern.',
    skills: 'React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Git',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'rahul.verma@example.com',
    projects: [
      {
        title: 'Nexus E-Commerce Storefront',
        desc: 'Production headless web store with real-time cart state and Stripe payment authorization.',
        tech: 'Next.js, Tailwind, Stripe, Supabase',
        link: 'https://github.com',
      },
      {
        title: 'Pulse AI Workflow Engine',
        desc: 'Autonomous LLM agent application for document data extraction and report generation.',
        tech: 'React, Python, FastAPI, LangChain',
        link: 'https://github.com',
      },
      {
        title: 'Aether Cloud Observability Dashboard',
        desc: 'Real-time telemetry and cluster health monitoring with WebSocket data streaming.',
        tech: 'React, TypeScript, Chart.js, Docker',
        link: 'https://github.com',
      },
    ],
  })

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${profile.name} | Developer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-[#1A1715] font-sans p-8 max-w-4xl mx-auto">
  <header class="py-12 border-b border-[#E2DDD2]">
    <h1 class="text-4xl font-extrabold text-[#2D6A4F]">${profile.name}</h1>
    <p class="text-lg text-[#57534E] mt-2 font-medium">${profile.role}</p>
    <p class="text-[#57534E] text-sm mt-4 leading-relaxed">${profile.about}</p>
    <div class="flex gap-4 mt-6">
      <a href="${profile.github}" class="text-[#2D6A4F] hover:underline">GitHub</a>
      <a href="${profile.linkedin}" class="text-[#2D6A4F] hover:underline">LinkedIn</a>
      <a href="mailto:${profile.email}" class="text-[#2D6A4F] hover:underline">Email</a>
    </div>
  </header>
  <main class="py-12">
    <h2 class="text-2xl font-bold mb-4">Technical Skills</h2>
    <p class="text-[#57534E] mb-12">${profile.skills}</p>
    <h2 class="text-2xl font-bold mb-6">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${profile.projects
        .map(
          (p) => `
      <div class="p-6 rounded-xl bg-[#FAF7F2] border border-[#E2DDD2]">
        <h3 class="text-xl font-bold text-[#1A1715]">${p.title}</h3>
        <p class="text-xs text-[#2D6A4F] mt-1 font-semibold">${p.tech}</p>
        <p class="text-[#57534E] text-sm mt-3">${p.desc}</p>
      </div>`
        )
        .join('')}
    </div>
  </main>
</body>
</html>`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PublicLayout>
      <PageTitle title="Developer Portfolio Builder | Geek Intern" />

      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-2 px-3 py-1">
              One-Click Site Generator
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1715]">
              Developer <span className="italic font-serif text-[#8C4325]">Portfolio Builder</span>
            </h1>
            <p className="text-[#57534E] text-xs sm:text-sm mt-1">
              Customize your developer profile on the left and see your responsive site preview instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCopyCode}
              className="bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs px-5 h-10 rounded-full shadow-xs inline-flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML Code!' : 'Copy Website HTML'}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="bg-[#F5F2EB] text-[#1A1715] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Form (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 max-h-[85vh] overflow-y-auto pr-2">
            {/* Theme switcher */}
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-4 flex items-center justify-between shadow-xs">
              <span className="text-xs font-bold text-[#57534E]">Preview Style:</span>
              <div className="flex items-center gap-1.5">
                {(['clean', 'dark', 'neon'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      theme === t
                        ? 'bg-[#181615] text-white shadow-xs'
                        : 'bg-[#EBE6DC] text-[#57534E] hover:text-[#1A1715] border border-[#E2DDD2]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Info */}
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-5 flex flex-col gap-3 shadow-xs">
              <h3 className="text-sm font-bold text-[#1A1715] mb-1">Developer Details</h3>
              <Input
                placeholder="Your Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
              <Input
                placeholder="Professional Role / Headline"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
              <Textarea
                placeholder="Short Bio / About Me"
                rows={3}
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs"
              />
              <Input
                placeholder="Comma separated skills (React, Node, etc.)"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
            </div>

            {/* Social Links */}
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-5 flex flex-col gap-3 shadow-xs">
              <h3 className="text-sm font-bold text-[#1A1715] mb-1">Social & Contact Links</h3>
              <Input
                placeholder="GitHub Profile URL"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
              <Input
                placeholder="LinkedIn Profile URL"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
              <Input
                placeholder="Email Address"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-9"
              />
            </div>

            {/* Featured Projects */}
            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-5 flex flex-col gap-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#1A1715] mb-1">Featured Projects</h3>
              {profile.projects.map((proj, pIdx) => (
                <div key={pIdx} className="p-3 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2] flex flex-col gap-2">
                  <Input
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) => {
                      const copy = [...profile.projects]
                      copy[pIdx].title = e.target.value
                      setProfile({ ...profile, projects: copy })
                    }}
                    className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-8"
                  />
                  <Input
                    placeholder="Tech Stack"
                    value={proj.tech}
                    onChange={(e) => {
                      const copy = [...profile.projects]
                      copy[pIdx].tech = e.target.value
                      setProfile({ ...profile, projects: copy })
                    }}
                    className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs h-8"
                  />
                  <Textarea
                    placeholder="Project Description"
                    rows={2}
                    value={proj.desc}
                    onChange={(e) => {
                      const copy = [...profile.projects]
                      copy[pIdx].desc = e.target.value
                      setProfile({ ...profile, projects: copy })
                    }}
                    className="bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] placeholder:text-[#57534E]/60 focus:border-[#181615] focus:ring-[#181615] text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E2DDD2] bg-white overflow-hidden shadow-xl">
              {/* Browser mockup header */}
              <div className="bg-slate-100 border-b border-[#E2DDD2] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-slate-500 ml-2">
                    https://{profile.name.toLowerCase().replace(/\s+/g, '')}.dev
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] border-slate-300 text-[#57534E] bg-white">
                  Live View
                </Badge>
              </div>

              {/* Preview Content */}
              <div
                className={`p-8 sm:p-12 min-h-[700px] transition-colors ${
                  theme === 'dark'
                    ? 'bg-[#0b0f19] text-white'
                    : theme === 'neon'
                    ? 'bg-[#030712] text-cyan-50'
                    : 'bg-white text-[#1A1715]'
                }`}
              >
                {/* Hero / Header in preview */}
                <div className="border-b border-[#E2DDD2] pb-8 mb-8">
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8F3ED] text-[#2D6A4F] border border-[#C2E0D1] mb-4">
                    Available for hire
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-[#1A1715]">
                    {profile.name || 'Your Name'}
                  </h2>
                  <p className="text-base sm:text-lg text-[#2D6A4F] font-semibold mb-4">
                    {profile.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#57534E] max-w-xl leading-relaxed mb-6">
                    {profile.about}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#EBE6DC] hover:bg-[#EAE4D7] text-[#57534E] text-xs inline-flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#EBE6DC] hover:bg-[#EAE4D7] text-[#57534E] text-xs inline-flex items-center gap-1.5"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="p-2 rounded-lg bg-[#181615] hover:bg-[#2A2724] text-white text-xs inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>

                {/* Skills in preview */}
                <div className="mb-10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Core Technical Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(',').map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#EBE6DC] text-[#1A1715] border border-[#E2DDD2] text-xs font-semibold"
                      >
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Projects in preview */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                    Featured Projects
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.projects.map((p, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E2DDD2] flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-[#1A1715] mb-1">{p.title}</h4>
                          <span className="text-[10px] text-[#2D6A4F] font-semibold block mb-2">
                            {p.tech}
                          </span>
                          <p className="text-xs text-[#57534E] leading-relaxed">{p.desc}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#E2DDD2] flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">Live Repo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default PortfolioBuilder
