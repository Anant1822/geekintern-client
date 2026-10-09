import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Star,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { ALL_STUDENT_REVIEWS, StudentReviewItem } from '@/data/reviewsData'
import { motion } from 'framer-motion'

const DOMAIN_FILTERS = [
  'All Reviews',
  'Full Stack Web Development',
  'Python & Machine Learning',
  'Android Development',
  'Frontend Development',
  'Java Programming',
  'Data Science & Analytics',
  'C++ Systems & DSA',
  'Cloud & DevOps',
  'UI/UX Design & Figma'
]

const REVIEWS_PER_PAGE = 18

export function StudentReviews() {
  const [activeFilter, setActiveFilter] = useState('All Reviews')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return ALL_STUDENT_REVIEWS.filter((rev) => {
      const matchFilter = activeFilter === 'All Reviews' || rev.domain === activeFilter
      const matchSearch =
        searchQuery.trim() === '' ||
        rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.domain.toLowerCase().includes(searchQuery.toLowerCase())

      return matchFilter && matchSearch
    })
  }, [activeFilter, searchQuery])

  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE) || 1
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE
    return filtered.slice(start, start + REVIEWS_PER_PAGE)
  }, [filtered, currentPage])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <PublicLayout>
      <PageTitle title="500+ Authentic Student Reviews & Feedback | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] dark:bg-[#151311] bg-dot-matrix text-[#1A1715] dark:text-[#FAF7F2] border-b border-[#E2DDD2] dark:border-stone-800 overflow-hidden">
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
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Verified Experiences
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715] dark:text-[#FAF7F2]">
            Learner <span className="italic font-serif text-[#8C4325]">Reviews & Stories</span>
          </h1>
          <p className="text-[#57534E] dark:text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Read over 500 genuine experiences written by engineering and computer science students across India who built real projects, verified their skills, and earned accredited internship credentials.
          </p>

          {/* Rating Summary */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-[#1A1715] dark:text-white">4.9</span>
              <div className="flex flex-col items-start">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-[#57534E] dark:text-stone-400 mt-0.5">Overall Rating</span>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[#E2DDD2] dark:bg-stone-800" />
            <div className="text-left">
              <div className="text-sm font-bold text-[#1A1715] dark:text-white">{ALL_STUDENT_REVIEWS.length}+ Organic Student Reviews</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">98.4% Verified Completion Rate</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs & Review Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[60vh] transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Search bar & domain filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search college, student, or keyword..."
                className="pl-10 h-10 rounded-full border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] placeholder:text-[#57534E]/60 text-xs shadow-xs"
              />
            </div>

            <div className="text-xs text-[#57534E] font-medium">
              Showing <span className="font-bold text-[#1A1715]">{filtered.length}</span> reviews
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-start gap-2 mb-10 pb-2 overflow-x-auto">
            {DOMAIN_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f
                    ? 'bg-[#181615] text-white shadow-xs'
                    : 'bg-[#EBE6DC] text-[#57534E] hover:text-[#1A1715] hover:bg-[#E2DDD2] border border-[#E2DDD2]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {paginatedReviews.length === 0 ? (
            <div className="py-20 text-center text-[#57534E]">
              <p className="text-base font-semibold">No reviews matching your search criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveFilter('All Reviews')
                  setSearchQuery('')
                  setCurrentPage(1)
                }}
                className="mt-4 text-xs border-slate-200 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedReviews.map((rev, idx) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-stone-800 p-6 sm:p-7 flex flex-col justify-between hover:border-[#181615]/40 transition-all shadow-xs hover:shadow-card-hover group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-[#2D6A4F] dark:text-emerald-400 bg-[#E8F3ED] dark:bg-emerald-950/60 border border-[#C2E0D1] dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Intern</span>
                      </span>
                    </div>

                    <p className="text-[#57534E] dark:text-stone-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2DDD2] dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#1A1715] dark:text-[#FAF7F2]">{rev.name}</div>
                      <div className="text-xs font-semibold text-[#2D6A4F] dark:text-emerald-400 mt-0.5">{rev.domain}</div>
                      <div className="text-[11px] text-[#57534E] dark:text-stone-400 mt-0.5 leading-snug">{rev.college}</div>
                    </div>
                    <div className="text-[10px] text-[#57534E] dark:text-stone-400 font-medium">{rev.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 px-4 rounded-full border-[#D6CFC4] bg-[#FAF8F5] text-xs text-[#1A1715] disabled:opacity-40 hover:bg-[#EAE4D7]"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#57534E] px-3">
                Page <span className="text-[#1A1715] font-bold px-1">{currentPage}</span> of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-4 rounded-full border-[#D6CFC4] bg-[#FAF8F5] text-xs text-[#1A1715] disabled:opacity-40 hover:bg-[#EAE4D7]"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-10 text-center max-w-4xl mx-auto shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1A1715]">Ready to Write Your Success Story?</h3>
            <p className="text-[#57534E] text-sm max-w-xl mx-auto mb-6">
              Join thousands of ambitious students gaining hands-on software development experience.
            </p>
            <Link to="/apply">
              <Button className="h-11 px-8 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs shadow-xs">
                Start Your Internship Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default StudentReviews

