import React, { useState, useMemo, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Newspaper,
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen,
  Tag,
  Code2,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  category: 'Engineering' | 'Web & Cloud' | 'AI & Data' | 'Career & Resume' | 'Internship Guides'
  readTime: string
  date: string
  author: {
    name: string
    role: string
    avatar: string
  }
  featured?: boolean
  tags: string[]
  content: {
    introduction: string
    sections: {
      heading: string
      body: string
      codeSnippet?: {
        language: string
        code: string
      }
      bulletPoints?: string[]
    }[]
    takeaways: string[]
    recommendedTrack?: {
      title: string
      domain: string
    }
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-land-first-tech-internship-2026',
    title: 'How to Land Your First Virtual Tech Internship in 2026: The Complete Roadmap',
    subtitle: 'Proven strategies for college students to stand out, build verifiable GitHub proof-of-work, and secure verified remote internship offers.',
    category: 'Internship Guides',
    readTime: '7 min read',
    date: 'Sep 24, 2026',
    featured: true,
    author: {
      name: 'Priya Sharma',
      role: 'Head of Talent & Engineering Mentorship',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Internships', 'Career Advice', 'Resume Building', 'GitHub'],
    content: {
      introduction:
        'Landing your first technical internship is often described as a catch-22: companies require prior experience, but how do you get experience without an internship? In 2026, the hiring landscape has fundamentally changed. Traditional paper resumes are heavily filtered by automated ATS algorithms, while genuine engineering recruiters look for demonstrable proof-of-work, public GitHub commits, and structured project deployments.',
      sections: [
        {
          heading: '1. Shift from Tutorial Hell to Proof-of-Work',
          body: 'Watching 40 hours of video courses without writing standalone code leaves you unprepared for technical interviews. Recruiters want to see that you can troubleshoot real bugs, manage dependencies, and write clear README documentation for your applications.',
          bulletPoints: [
            'Pick one core domain (Full Stack, Data Analytics, Android, or AI) and commit to it for 4–8 weeks.',
            'Deploy your work live on platforms like Vercel, Render, or Netlify with working database backends.',
            'Maintain a clean Git history with atomic conventional commit messages (feat:, fix:, chore:).'
          ]
        },
        {
          heading: '2. The Structure of a High-Impact Project Repository',
          body: 'When evaluators review your GitHub profile, the README file is your digital storefront. An exceptional repository README should include architectural diagrams, prerequisites, environment variables configuration, and API route tables.',
          codeSnippet: {
            language: 'markdown',
            code: `# Project Name - Full Stack Microservice\n\n## Architecture Overview\n- Frontend: React 18 + TypeScript + Tailwind CSS\n- Backend: Express.js REST API with JWT Auth\n- Database: PostgreSQL with Supabase RLS policies\n- Verification: 95% unit test coverage with Vitest\n\n## Quick Start\n\`\`\`bash\npnpm install\npnpm run dev\n\`\`\``
          }
        },
        {
          heading: '3. Leverage Virtual Structured Internships',
          body: 'Structured virtual internships bridge the gap between academic theory and corporate expectations. By completing milestone-based problem statements with task evaluations and receiving verified certificates, you create third-party verification that validates your skills to future employers.'
        }
      ],
      takeaways: [
        'Prioritize shipping 2 high-quality full-stack projects over 10 trivial boilerplate apps.',
        'Always provide live demonstration links and comprehensive README documentation.',
        'Use verified virtual internship credentials to validate your independent problem-solving skills on LinkedIn and your resume.'
      ],
      recommendedTrack: {
        title: 'Full Stack Web Development',
        domain: 'Full Stack Development'
      }
    }
  },
  {
    slug: 'from-zero-to-full-stack-web-dev',
    title: 'From Zero to Full-Stack: Building Scalable React, Node.js & PostgreSQL Projects',
    subtitle: 'A practical architecture guide on building modern, robust production web platforms with TypeScript and secure databases.',
    category: 'Web & Cloud',
    readTime: '9 min read',
    date: 'Sep 22, 2026',
    author: {
      name: 'Anand Verma',
      role: 'Lead Architect, Geek Intern',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Web Dev'],
    content: {
      introduction:
        'The modern web stack has coalesced around TypeScript, component-driven client applications, stateless RESTful or GraphQL backends, and relational SQL engines. Building an enterprise-grade web application requires understanding authentication flows, Row Level Security (RLS), and database normalization.',
      sections: [
        {
          heading: '1. Designing the Relational Schema First',
          body: 'Before writing frontend UI components, always sketch your database schema. Normalize your tables, identify primary and foreign keys, and establish indexes on columns that will be queried repeatedly in WHERE or JOIN clauses.'
        },
        {
          heading: '2. Implementing Secure API Endpoints',
          body: 'Ensure every incoming request body is validated strictly on the server using schema validators like Zod. Never trust client-side data validation alone.',
          codeSnippet: {
            language: 'typescript',
            code: `import { z } from 'zod';\n\nexport const CreateApplicationSchema = z.object({\n  full_name: z.string().trim().min(2),\n  email: z.string().trim().email(),\n  phone: z.string().trim().min(10),\n  year_of_study: z.string().min(1),\n});\n\nexport type CreateApplicationInput = z.infer<typeof CreateApplicationSchema>;`
          }
        },
        {
          heading: '3. Managing Asynchronous State with Clean React Hooks',
          body: 'Separate UI presentation from data orchestration. Encapsulate API communication inside dedicated service modules and custom hooks with proper loading, error, and caching handling.'
        }
      ],
      takeaways: [
        'Always validate data at runtime on both client and server boundaries.',
        'Use relational PostgreSQL for structured data requiring transactional guarantees and integrity.',
        'Structure reusable component design systems for maintainable user interfaces.'
      ],
      recommendedTrack: {
        title: 'Full Stack Web Development',
        domain: 'Full Stack Development'
      }
    }
  },
  {
    slug: 'mastering-git-github-for-interns',
    title: 'Mastering Git & GitHub: How Interns Build Collaborative Repositories That Impress Recruiters',
    subtitle: 'Level up your version control skills beyond git push: feature branches, merge conflicts, pull request reviews, and GitHub Actions CI/CD.',
    category: 'Engineering',
    readTime: '6 min read',
    date: 'Sep 19, 2026',
    author: {
      name: 'Karthik Nair',
      role: 'Open Source Lead & DevOps Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Git', 'GitHub', 'CI/CD', 'Open Source', 'Best Practices'],
    content: {
      introduction:
        'Almost every software company utilizes Git for collaboration. Yet many students only learn `git add .`, `git commit -m "update"`, and `git push origin main`. In a professional development environment, committing directly to main is often forbidden. Learning industry-standard Git hygiene immediately sets you apart from your peers.',
      sections: [
        {
          heading: '1. The Power of Conventional Commits',
          body: 'Standardized commit messages allow automated changelog generation and make debugging git log effortless.',
          bulletPoints: [
            'feat: Introduce student certificate verification QR lookup',
            'fix: Resolve JWT authorization header timeout on expired sessions',
            'docs: Update local setup and environment variable instructions in README',
            'refactor: Abstract reusable database client connection pool'
          ]
        },
        {
          heading: '2. Handling Branching and Pull Requests',
          body: 'Always create isolated topic branches for features (`feature/auth-otp`) or bug fixes (`fix/form-validation`). Submit comprehensive Pull Requests that describe the rationale, testing steps, and screenshots.'
        }
      ],
      takeaways: [
        'Never commit sensitive API keys or .env files to public repositories.',
        'Write descriptive commit messages that explain the "why", not just the "what".',
        'Set up automated GitHub Actions to run tests and linters on every pull request.'
      ],
      recommendedTrack: {
        title: 'DevOps & Cloud Computing',
        domain: 'DevOps'
      }
    }
  },
  {
    slug: 'ai-agents-llm-roadmaps-engineering-students',
    title: 'Artificial Intelligence in 2026: Why Engineering Students Must Learn LLM APIs & Vector Databases',
    subtitle: 'Move beyond basic Python notebooks. Understand semantic embeddings, retrieval augmented generation (RAG), and agentic workflows.',
    category: 'AI & Data',
    readTime: '8 min read',
    date: 'Sep 15, 2026',
    author: {
      name: 'Dr. Arvind Rao',
      role: 'AI Research Advisor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Artificial Intelligence', 'LLM', 'Python', 'Vector DB', 'Machine Learning'],
    content: {
      introduction:
        'Artificial Intelligence has transitioned from isolated research labs into everyday software engineering. Modern applications do not just execute deterministic logic—they query embeddings, evaluate semantic queries, and coordinate multi-agent tasks to solve complex user problems.',
      sections: [
        {
          heading: '1. What is RAG (Retrieval-Augmented Generation)?',
          body: 'Rather than fine-tuning massive models, RAG retrieves relevant proprietary documents from a vector store (such as pgvector) and injects them directly into the LLM context prompt for grounded, hallucination-free answers.'
        },
        {
          heading: '2. Hands-on Vector Search in PostgreSQL',
          body: 'With pgvector, developers can store and query vector embeddings alongside traditional relational user records without managing multiple isolated databases.',
          codeSnippet: {
            language: 'sql',
            code: `-- Semantic similarity search with pgvector\nSELECT title, summary, 1 - (embedding <=> query_embedding) AS similarity\nFROM knowledge_articles\nWHERE 1 - (embedding <=> query_embedding) > 0.82\nORDER BY similarity DESC\nLIMIT 5;`
          }
        }
      ],
      takeaways: [
        'Learn how vector embeddings represent high-dimensional semantic meaning.',
        'Understand token optimization and prompt engineering techniques.',
        'Build practical RAG and analytical pipelines that solve genuine data processing bottlenecks.'
      ],
      recommendedTrack: {
        title: 'Artificial Intelligence & Machine Learning',
        domain: 'Artificial Intelligence'
      }
    }
  },
  {
    slug: 'high-converting-resume-bullet-points',
    title: 'How to Turn Your Virtual Internship Project into a High-Converting Resume Bullet Point',
    subtitle: 'Stop writing "Made an e-commerce website". Use the Google XYZ formula to create metrics-driven portfolio descriptions that recruiters notice.',
    category: 'Career & Resume',
    readTime: '5 min read',
    date: 'Sep 10, 2026',
    author: {
      name: 'Meera Patel',
      role: 'Technical Recruiter & Career Coach',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['Resume Tips', 'ATS Scanners', 'Interviews', 'Career Growth'],
    content: {
      introduction:
        'A hiring manager reviews a resume for an average of 6 to 8 seconds. If your projects look like generic classroom homework assignments, your application is passed over. You must translate technical effort into measurable business and performance outcomes.',
      sections: [
        {
          heading: '1. The Google XYZ Resume Formula',
          body: 'Frame your experience as: "Accomplished [X], as measured by [Y], by doing [Z]".',
          bulletPoints: [
            'Weak: "Created an online bookstore application using Node.js and MongoDB."',
            'Strong: "Engineered a full-stack e-commerce engine with Redis caching, reducing search latency by 45% for a catalog of 10,000+ products."',
            'Weak: "Worked on frontend design with React."',
            'Strong: "Architected a responsive dashboard in React & TypeScript with accessible UI components, boosting Lighthouse performance score from 68 to 98."'
          ]
        },
        {
          heading: '2. Include Verifiable Proof Links',
          body: 'Always link your live deployment URL, GitHub repository, and verified internship certificate credential link directly beneath each project header.'
        }
      ],
      takeaways: [
        'Quantify achievements with real numbers: response times, test coverage, dataset sizes, and user milestones.',
        'Tailor bullet points to emphasize relevant skills from the target job description.',
        'Link official digital verification codes to prove authenticity.'
      ],
      recommendedTrack: {
        title: 'Career Acceleration Tools',
        domain: 'Full Stack Development'
      }
    }
  },
  {
    slug: 'cracking-technical-interviews-interns',
    title: 'Cracking Technical Interviews: Data Structures, System Design Basics & Mock Drills',
    subtitle: 'A structured 30-day playbook covering the 12 most critical coding patterns, time complexity analysis, and behavioral interview questions.',
    category: 'Career & Resume',
    readTime: '10 min read',
    date: 'Sep 05, 2026',
    author: {
      name: 'Rohan Gupta',
      role: 'Ex-FAANG Mentor & Technical Trainer',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    tags: ['DSA', 'System Design', 'Interview Prep', 'Algorithms'],
    content: {
      introduction:
        'Technical coding rounds can feel overwhelming if you try to memorize hundreds of problems. Instead, master core algorithmic patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Depth-First Search, and Hash Maps. These patterns solve over 80% of common coding questions.',
      sections: [
        {
          heading: '1. The Top Patterns You Must Master',
          body: 'Focus your preparation on patterns rather than memorizing individual LeetCode problems.',
          bulletPoints: [
            'Two Pointers: Target sum in sorted arrays, palindrome validation, string reversal.',
            'Sliding Window: Substrings with K distinct characters, maximum sum subarray of size K.',
            'Hash Tables & Frequency Counting: Anagram grouping, two sum, deduplication in linear time O(N).',
            'Breadth-First Search (BFS): Level-order tree traversal, shortest path in unweighted graphs.'
          ]
        },
        {
          heading: '2. Behavioral Questions and the STAR Method',
          body: 'Engineering teams evaluate cultural alignment and teamwork. Structure your responses around Situation, Task, Action, and Result (STAR) when recounting past project roadblocks or deadlines.'
        }
      ],
      takeaways: [
        'Always communicate your thought process aloud before writing code.',
        'Analyze and state both Time and Space Complexity (Big-O) explicitly.',
        'Test your solution with edge cases: empty arrays, single elements, and negative values.'
      ],
      recommendedTrack: {
        title: 'Core Programming & DSA',
        domain: 'Python Programming'
      }
    }
  }
]

const CATEGORIES = [
  'All',
  'Internship Guides',
  'Web & Cloud',
  'Engineering',
  'AI & Data',
  'Career & Resume'
] as const

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)

  // Current active post if viewing a specific article
  const activePost = useMemo(() => {
    if (!slug) return null
    return BLOG_POSTS.find((p) => p.slug === slug) || null
  }, [slug])

  // Filtered posts for list view
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Featured post
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0]
  }, [])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  return (
    <PublicLayout>
      <PageTitle
        title={
          activePost
            ? `${activePost.title} | Geek Intern Tech Blog`
            : 'Tech Blog & Engineering Roadmaps | Geek Intern'
        }
      />

      <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 py-10 sm:py-16 transition-colors duration-200">
        <div className="container max-w-6xl px-4 sm:px-6">
          {/* ARTICLE VIEW */}
          {activePost ? (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Top breadcrumb & back button */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/blog')}
                  className="gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-xs font-semibold pl-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Articles
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="text-xs h-8 gap-1.5 border-slate-200 dark:border-slate-800"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    {copiedLink ? 'Link Copied!' : 'Share Article'}
                  </Button>
                </div>
              </div>

              {/* Main Article Container */}
              <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-12 shadow-sm space-y-8">
                {/* Header */}
                <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-2.5 py-0.5">
                      {activePost.category}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {activePost.readTime}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {activePost.date}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {activePost.title}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {activePost.subtitle}
                  </p>

                  {/* Author Card */}
                  <div className="flex items-center gap-3.5 pt-2">
                    <img
                      src={activePost.author.avatar}
                      alt={activePost.author.name}
                      className="h-11 w-11 rounded-full object-cover border-2 border-blue-500/20 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {activePost.author.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {activePost.author.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                  <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-medium bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-2xl border-l-4 border-blue-600">
                    {activePost.content.introduction}
                  </p>
                </div>

                {/* Body Sections */}
                <div className="space-y-8 pt-2">
                  {activePost.content.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3.5">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {section.heading}
                      </h2>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        {section.body}
                      </p>

                      {section.bulletPoints && (
                        <ul className="space-y-2.5 my-3 pl-2">
                          {section.bulletPoints.map((pt, ptIdx) => (
                            <li key={ptIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.codeSnippet && (
                        <div className="rounded-xl overflow-hidden bg-slate-950 text-slate-100 border border-slate-800 shadow-md my-4">
                          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                            <span>{section.codeSnippet.language}</span>
                            <span className="text-[11px] text-slate-500">Source Example</span>
                          </div>
                          <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-emerald-400">
                            <code>{section.codeSnippet.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Key Takeaways Box */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-base">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Key Takeaways & Action Items
                  </div>
                  <ul className="space-y-2.5">
                    {activePost.content.takeaways.map((item, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {tIdx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> Tags:
                  </span>
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Internship Track Call to Action */}
                {activePost.content.recommendedTrack && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-blue-200">
                        Ready to apply this in practice?
                      </span>
                      <h3 className="text-lg font-bold mt-0.5">
                        Build projects in {activePost.content.recommendedTrack.title}
                      </h3>
                      <p className="text-xs text-blue-100 mt-1 max-w-md">
                        Join Geek Intern's verified virtual internship program. Receive real problem statements, mentor reviews, and verified ISO credentials.
                      </p>
                    </div>
                    <Link
                      to={`/apply?domain=${encodeURIComponent(activePost.content.recommendedTrack.domain)}`}
                      className="shrink-0"
                    >
                      <Button className="bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs h-10 px-5 gap-1.5 shadow-sm">
                        Apply for Track
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </article>
            </div>
          ) : (
            /* BLOG LIST VIEW */
            <div className="space-y-12">
              {/* Header Hero */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                  <Newspaper className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Geek Intern Knowledge Base & Career Guides
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Tech Insights & Career Roadmaps
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Curated technical playbooks, architectural walkthroughs, and step-by-step career guidance designed to help college students and engineering interns build industry-ready portfolios.
                </p>

                {/* Search Input */}
                <div className="relative max-w-xl mx-auto pt-3">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search articles by title, topic, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-white dark:bg-slate-900 text-sm shadow-xs border-slate-200 dark:border-slate-800"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Featured Post Card (shown when category is 'All' and no search filter) */}
              {selectedCategory === 'All' && !searchQuery && featuredPost && (
                <Card className="border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:to-slate-900 shadow-sm overflow-hidden rounded-3xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500 text-white text-[11px] font-bold">
                          Featured Guide
                        </Badge>
                        <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-200 text-[11px]">
                          {featuredPost.category}
                        </Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        <Link
                          to={`/blog/${featuredPost.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {featuredPost.title}
                        </Link>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {featuredPost.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            className="h-9 w-9 rounded-full object-cover border"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {featuredPost.date}
                            </p>
                          </div>
                        </div>

                        <Link to={`/blog/${featuredPost.slug}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-9 px-4 gap-1.5 font-semibold">
                            Read Guide
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-4 hidden lg:flex items-center justify-center p-6 bg-blue-100/50 dark:bg-slate-800/80 rounded-2xl border border-blue-200/60 dark:border-slate-700 text-center">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                          <BookOpen className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Verified Engineering Track
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Complete real project problem statements, submit GitHub repositories, and get ISO verified certification.
                        </p>
                        <Link to="/apply" className="inline-block pt-1">
                          <span className="text-xs font-bold text-blue-600 hover:underline">
                            Explore Internship Tracks ↗
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Grid of Articles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
                    </span>
                  </h3>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <Newspaper className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                      No matching articles found
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      We couldn't find any articles matching "{searchQuery}". Try searching for terms like "React", "Internships", "Resume", or "AI".
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory('All')
                        setSearchQuery('')
                      }}
                      className="mt-4 text-xs"
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <Card
                        key={post.slug}
                        className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all rounded-2xl overflow-hidden group"
                      >
                        <CardHeader className="p-5 pb-3 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className="text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {post.category}
                            </Badge>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>

                          <CardTitle className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </CardTitle>

                          <CardDescription className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {post.subtitle}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="h-7 w-7 rounded-full object-cover border"
                            />
                            <div>
                              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-none">
                                {post.author.name}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {post.date}
                              </p>
                            </div>
                          </div>

                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            <span>Read</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Newsletter / Updates Section */}
              <div className="rounded-3xl bg-slate-900 dark:bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Stay Ahead in Tech
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Receive Weekly Engineering & Career Briefs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Get hand-picked GitHub problem statements, interview breakdown guides, and announcements about upcoming virtual internship batches delivered to your inbox.
                  </p>
                </div>
                <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter your college or personal email"
                    className="h-10 text-xs bg-slate-800 border-slate-700 text-white w-full sm:w-64"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-10 px-5 font-semibold">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
