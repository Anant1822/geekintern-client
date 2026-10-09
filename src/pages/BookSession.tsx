import React, { useState } from 'react'
import {
  Clock,
  Video,
  CheckCircle2,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

const SESSION_TYPES = [
  {
    id: 'resume-review',
    title: 'Resume & GitHub Portfolio Audit',
    duration: '30 Minutes',
    price: 'Free with Internship',
    desc: 'Line-by-line review of your developer resume, GitHub readme quality, and project commit history to pass recruiter screens.',
  },
  {
    id: 'mock-interview',
    title: 'Technical Mock Coding Interview',
    duration: '45 Minutes',
    price: 'Free with Internship',
    desc: 'Simulated live technical coding interview with algorithmic problem solving, system design basics, and structured feedback.',
  },
  {
    id: 'career-roadmap',
    title: 'Career & Placement Roadmap',
    duration: '30 Minutes',
    price: 'Free with Internship',
    desc: 'Personalized guidance on choosing between Web, AI, Android, or Cloud tracks and planning off-campus placement strategy.',
  },
]

const MENTORS = [
  {
    name: 'Vikramaditya S.',
    role: 'Senior Software Engineer (Ex-Amazon)',
    domain: 'Full Stack & Cloud Architecture',
    rating: 4.9,
    sessions: '420+ Sessions',
  },
  {
    name: 'Priyanka Sen',
    role: 'Lead ML Engineer (Ex-Flipkart)',
    domain: 'AI, NLP & Predictive Modeling',
    rating: 5.0,
    sessions: '310+ Sessions',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Staff Mobile Architect',
    domain: 'Android Jetpack & Flutter Systems',
    rating: 4.9,
    sessions: '280+ Sessions',
  },
]

export function BookSession() {
  const [selectedSession, setSelectedSession] = useState(SESSION_TYPES[0].id)
  const [booked, setBooked] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Evening (6 PM - 9 PM)',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      alert('Please enter your name and email.')
    } else {
      setBooked(true)
    }
  }

  return (
    <PublicLayout>
      <PageTitle title="Book 1-on-1 Mentorship Session | Geek Intern" />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Personalized Engineering Guidance
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Book a 1-on-1 <span className="italic font-serif text-[#8C4325]">Mentorship Session</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Get your code reviewed, practice live mock interviews, and unblock your career roadmap with senior engineers and tech leaders.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[70vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Mentors & Session Tracks (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1715] mb-4">Choose Your Session Focus</h2>
              <div className="flex flex-col gap-4">
                {SESSION_TYPES.map((sess, idx) => (
                  <motion.div
                    key={sess.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedSession(sess.id)}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all card-lift ${
                      selectedSession === sess.id
                        ? 'bg-[#FAF7F2] border-[#181615] shadow-card ring-1 ring-[#181615]'
                        : 'bg-[#FAF7F2] border-[#E2DDD2] hover:border-[#181615]/40 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#1A1715]">{sess.title}</h3>
                      <span className="text-xs font-semibold text-[#2D6A4F] bg-[#E8F3ED] border border-[#C2E0D1] px-2.5 py-0.5 rounded-full">
                        {sess.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                      {sess.desc}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#57534E] font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#57534E]" />
                        {sess.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-[#8C4325]" />
                        Google Meet / Zoom
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mentor Profiles */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A1715] mb-4">Available Mentors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MENTORS.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] text-center shadow-card card-lift"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#181615] text-[#FAF7F2] font-bold flex items-center justify-center mx-auto mb-3 text-sm shadow-xs">
                      {m.name.charAt(0)}
                    </div>
                    <div className="font-bold text-sm text-[#1A1715]">{m.name}</div>
                    <div className="text-[11px] text-[#8C4325] font-medium mt-0.5">{m.role}</div>
                    <div className="text-[10px] text-[#57534E] mt-1">{m.domain}</div>
                    <div className="mt-3 pt-3 border-t border-[#E2DDD2] flex items-center justify-center gap-1 text-xs text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{m.rating} ({m.sessions})</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Form (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] p-8 shadow-card sticky top-24"
            >
              {booked ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F3ED] text-[#2D6A4F] flex items-center justify-center mx-auto mb-4 border border-[#C2E0D1]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1715] mb-2">Session Requested!</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                    Thank you, {form.name}. Our mentorship coordinator will reach out to your email ({form.email}) within 24 hours with the calendar invite.
                  </p>
                  <Button
                    onClick={() => setBooked(false)}
                    variant="outline"
                    className="border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] text-xs shadow-xs hover:bg-[#EAE4D7] rounded-full"
                  >
                    Book Another Session
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1715] mb-1">Reserve Your Slot</h3>
                    <p className="text-xs text-[#57534E]">Fill in your contact info to schedule.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1715] mb-1 block">Full Name</label>
                    <Input
                      required
                      placeholder="e.g. Rahul Verma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-white border-[#D6CFC4] text-[#1A1715] text-xs h-11 rounded-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1715] mb-1 block">Email Address</label>
                    <Input
                      required
                      type="email"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-white border-[#D6CFC4] text-[#1A1715] text-xs h-11 rounded-full"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1715] mb-1 block">WhatsApp / Phone</label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-white border-[#D6CFC4] text-[#1A1715] text-xs h-11 rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A1715] mb-1 block">Preferred Date</label>
                      <Input
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        className="bg-white border-[#D6CFC4] text-[#1A1715] text-xs h-11 rounded-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A1715] mb-1 block">Time Slot</label>
                      <select
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full bg-white border border-[#D6CFC4] text-[#1A1715] text-xs h-11 rounded-full px-3"
                      >
                        <option>Morning (10 AM - 1 PM)</option>
                        <option>Afternoon (2 PM - 5 PM)</option>
                        <option>Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A1715] mb-1 block">Specific Questions or GitHub Link</label>
                    <Textarea
                      rows={3}
                      placeholder="What would you like the mentor to review?"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="bg-white border-[#D6CFC4] text-[#1A1715] text-xs rounded-2xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-bold text-xs shadow-xs mt-2"
                  >
                    Confirm 1-on-1 Session Slot →
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default BookSession
