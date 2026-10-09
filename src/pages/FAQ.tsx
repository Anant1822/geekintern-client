import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Award,
  Clock,
  Laptop
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

interface FAQItem {
  id: number
  category: string
  question: string
  answer: string
}

const FAQ_DATA: FAQItem[] = [
  // 1. Application & Eligibility
  {
    id: 1,
    category: 'Application & Eligibility',
    question: 'Who is eligible to apply for Geek Intern virtual internships?',
    answer:
      'Any student pursuing a Diploma, B.Tech, BE, BCA, MCA, BSc CS/IT, or equivalent degrees from any accredited college or university across India is eligible. There is no minimum CGPA requirement, and students from 1st to final year may participate.'
  },
  {
    id: 2,
    category: 'Application & Eligibility',
    question: 'Do I need prior work experience or advanced coding skills to apply?',
    answer:
      'No prior commercial experience is required. Basic understanding of your selected domain (e.g. basic HTML/CSS for web, basic syntax for Python/Java/C++) is enough. The tasks are designed incrementally—starting with foundational problem statements and progressing to full-featured projects.'
  },
  {
    id: 3,
    category: 'Application & Eligibility',
    question: 'How long does it take to receive the official Offer Letter after applying?',
    answer:
      'After submitting your application details on the portal, your verified Offer Letter is generated and sent directly to your registered email address within 24 to 48 hours, detailing your chosen track, cohort dates, and internship guidelines.'
  },
  {
    id: 4,
    category: 'Application & Eligibility',
    question: 'Can I apply for more than one technical domain simultaneously?',
    answer:
      'We strongly recommend focusing on one technical domain per cohort to ensure you can complete all task requirements and build high-quality portfolio projects with clean Git histories. However, once you complete a domain, you can immediately enroll in another track.'
  },

  // 2. Internship Tasks & Workflow
  {
    id: 5,
    category: 'Internship Workflow',
    question: 'Is the internship 100% remote and self-paced?',
    answer:
      'Yes, 100% of the program is conducted online. There are no mandatory live meetings at rigid hours. You can comfortably balance your coursework, college lectures, and semester examination preparations while submitting project milestones before the cohort deadline.'
  },
  {
    id: 6,
    category: 'Internship Workflow',
    question: 'What kind of projects and assignments will I work on?',
    answer:
      'You will be assigned 3 to 4 progressive industry-standard problem statements. For example, in Web Development you might build responsive UI dashboards, user authentication systems with JWT, and API-connected database apps. In Python/ML, you work on real exploratory data analysis and scikit-learn prediction pipelines.'
  },
  {
    id: 7,
    category: 'Internship Workflow',
    question: 'Where and how do I submit my completed project tasks?',
    answer:
      'You submit your work by providing your public GitHub repository link (showing your clean commit history and a descriptive README.md) and, where applicable, a live deployment link (Vercel, Netlify, Render) or a brief 2-minute video walkthrough.'
  },
  {
    id: 8,
    category: 'Internship Workflow',
    question: 'What happens if my college semester exams clash with the deadline?',
    answer:
      'We understand university schedules vary across states. If your semester mid-terms or final practical exams clash with your submission window, you can request an extension or cohort rollover by emailing support.geekintern@gmail.com with your student details.'
  },

  // 3. Certificates & Verification
  {
    id: 9,
    category: 'Certificates & Verification',
    question: 'Is the completion certificate recognized for college credits and semester submissions?',
    answer:
      'Yes. Geek Intern completion certificates include your full legal name, college affiliation, internship domain, duration, unique Certificate ID (CID), and a cryptographically generated QR verification code. It is widely accepted by university placement cells, academic coordinators, and HODs for mandatory summer internship requirements.'
  },
  {
    id: 10,
    category: 'Certificates & Verification',
    question: 'How can recruiters and employers verify my certificate credentials?',
    answer:
      'Anyone—including HR recruiters and college faculties—can visit our official Certificate Verification portal at /verify and enter your Certificate ID (CID) to view verified credential badges, issue date, and student particulars.'
  },
  {
    id: 11,
    category: 'Certificates & Verification',
    question: 'Do top performers receive a Letter of Recommendation (LOR)?',
    answer:
      'Yes. Interns who complete all project milestones with high code quality, clean architectural patterns, and thoughtful README documentation are awarded a merit-based Letter of Recommendation (LOR) alongside their verified certificate.'
  },
  {
    id: 12,
    category: 'Certificates & Verification',
    question: 'How long does evaluation take after I submit my project?',
    answer:
      'Our technical team reviews submissions to verify repository authenticity, functional deliverables, and code cleanliness. Verification is typically completed within 3 to 5 business days, after which your certificate is released.'
  },

  // 4. College NOC & Partnerships
  {
    id: 13,
    category: 'College & Support',
    question: 'Does Geek Intern sign or provide college NOC / Internship Approval forms?',
    answer:
      'Yes. If your college Training and Placement Cell (TPO) requires an official institutional approval form or NOC acknowledgment, you can email your college template to support.geekintern@gmail.com and our team will stamp and sign it for you.'
  },
  {
    id: 14,
    category: 'College & Support',
    question: 'How can colleges or universities partner with Geek Intern for batch enrollments?',
    answer:
      'Institutions and departmental coordinators can submit a partnership inquiry via our Partner With Us page (/college-register) or contact us directly. We provide streamlined batch onboarding, progress tracking, and consolidated completion reports for departmental records.'
  },
  {
    id: 15,
    category: 'College & Support',
    question: 'How do I contact student support if I encounter technical issues or errors?',
    answer:
      'You can reach our dedicated helpdesk directly at support.geekintern@gmail.com or via the Contact page (/contact). Our support team actively responds to student queries within 24 business hours.'
  },
  {
    id: 16,
    category: 'College & Support',
    question: 'Can I request a correction if there is a spelling mistake in my name or college on the certificate?',
    answer:
      'Yes, absolutely. If you notice a typo in your name, university, or college roll number, email support.geekintern@gmail.com with your registered email and CID within 7 days. Our administration will re-issue the corrected certificate free of charge.'
  }
]

const CATEGORIES = [
  'All Questions',
  'Application & Eligibility',
  'Internship Workflow',
  'Certificates & Verification',
  'College & Support'
]

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All Questions')
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState<number | null>(1)

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCategory =
        activeCategory === 'All Questions' || item.category === activeCategory
      const matchSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <PublicLayout>
      <PageTitle title="Frequently Asked Questions | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Help Center & Guidelines
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Frequently Asked <span className="italic font-serif text-[#8C4325]">Questions</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our virtual internship tracks, offer letter dispatch, project submissions, college NOCs, and verifiable certificate credentials.
          </p>

          {/* Quick Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. certificate, college, NOC, tasks)..."
              className="pl-11 h-12 rounded-full border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] shadow-xs text-sm focus:border-[#181615] focus:ring-[#181615]"
            />
          </div>
        </motion.div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#181615] text-white shadow-xs'
                    : 'bg-[#EBE6DC] text-[#57534E] hover:text-[#1A1715] hover:bg-[#EAE4D7] border border-[#E2DDD2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center text-[#57534E]">
              <HelpCircle className="w-12 h-12 text-[#78716C] mx-auto mb-3" />
              <p className="text-base font-semibold">No questions found matching "{searchQuery}"</p>
              <p className="text-xs text-[#78716C] mt-1">Try searching for broader terms or reset filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory('All Questions')
                  setSearchQuery('')
                }}
                className="mt-4 text-xs border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] rounded-full hover:bg-[#EAE4D7]"
              >
                View All Questions
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openId === faq.id
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className={`rounded-3xl border transition-all duration-200 overflow-hidden card-lift ${
                      isOpen
                        ? 'border-[#181615] bg-[#FAF7F2] shadow-card'
                        : 'border-[#E2DDD2] bg-[#FAF7F2] hover:border-[#D6CFC4] shadow-xs'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1A1715] hover:text-[#8C4325] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#2D6A4F] shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#78716C] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#181615]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#E2DDD2] bg-[#F5F2EB]/60">
                        <p>{faq.answer}</p>
                        <div className="mt-3 inline-block">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#57534E] bg-[#EBE6DC] px-2 py-0.5 rounded-full border border-[#E2DDD2]">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Need More Assistance Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-16 rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card card-lift"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#181615] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1715]">Still Have Questions?</h3>
                <p className="text-xs text-[#57534E] mt-0.5">
                  Our student support helpdesk is available to assist you with any specific queries.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <a href="mailto:support.geekintern@gmail.com" className="w-full md:w-auto">
                <Button className="w-full md:w-auto bg-[#181615] hover:bg-[#2A2724] text-white text-xs font-semibold h-11 px-6 rounded-full shadow-xs">
                  Email Support Team
                </Button>
              </a>
              <Link to="/contact" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto border-[#D6CFC4] bg-[#FAF7F2] hover:bg-[#EAE4D7] text-[#1A1715] text-xs font-semibold h-11 px-6 rounded-full">
                  Contact Page →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default FAQ
