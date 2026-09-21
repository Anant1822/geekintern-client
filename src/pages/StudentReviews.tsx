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
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 uppercase tracking-widest text-[11px] mb-4 px-3 py-1 font-semibold">
            Verified Experiences
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-950 dark:text-white">
            Learner <span className="text-blue-600 dark:text-blue-400">Reviews & Stories</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Read over 500 genuine experiences written by engineering and computer science students across India who built real projects, verified their skills, and earned accredited internship credentials.
          </p>

          {/* Rating Summary */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">4.9</span>
              <div className="flex flex-col items-start">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Overall Rating</span>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-left">
              <div className="text-sm font-bold text-slate-900 dark:text-white">{ALL_STUDENT_REVIEWS.length}+ Organic Student Reviews</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">98.4% Verified Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Review Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-[60vh] transition-colors">
        <div className="max-w-7xl mx-auto">
          {/* Search bar & domain filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search college, student, or keyword..."
                className="pl-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs"
              />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> reviews
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
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          {paginatedReviews.length === 0 ? (
            <div className="py-20 text-center text-slate-500 dark:text-slate-400">
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
              {paginatedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs hover:shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Intern</span>
                      </span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">{rev.domain}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{rev.college}</div>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{rev.date}</div>
                  </div>
                </div>
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
                className="h-9 px-3 rounded-lg border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>

              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 px-3">
                Page <span className="text-slate-950 dark:text-white font-bold px-1">{currentPage}</span> of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3 rounded-lg border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-950 dark:text-white">Ready to Write Your Success Story?</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto mb-6">
              Join thousands of ambitious students gaining hands-on software development experience.
            </p>
            <Link to="/apply">
              <Button className="h-11 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/25">
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

