import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

const TEAM_MEMBERS = [
  {
    name: 'Vikramaditya Sharma',
    role: 'Founder & Chief Technology Officer',
    bio: 'Former Senior Cloud Systems Architect with over a decade of engineering experience at multinational tech firms. Passionate about democratizing engineering internships.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    domain: 'System Architecture',
  },
  {
    name: 'Priyanka Sen',
    role: 'Head of AI & Curriculum Director',
    bio: 'Deep learning researcher and ex-FinTech ML lead. Designs real-world practical capstones that prepare college students for high-scale machine learning roles.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    domain: 'AI & Data Science',
  },
  {
    name: 'Harsh Vardhan',
    role: 'Lead Mobile Engineering Mentor',
    bio: 'Android & Flutter developer who has architected apps with over 5M+ Play Store downloads. Guides interns on clean architecture and performance profiling.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    domain: 'Mobile Systems',
  },
  {
    name: 'Ritika Roy',
    role: 'Director of University Partnerships',
    bio: 'Dedicated to connecting Indian colleges and university placement cells with verified industrial training programs and virtual internship tracks.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    domain: 'College Alliances',
  },
]

export function Team() {
  return (
    <PublicLayout>
      <PageTitle title="Meet Team Geek Intern | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            People Behind Geek Intern
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Meet Team <span className="italic font-serif text-[#8C4325]">Geek Intern</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A dedicated group of software architects, university mentors, and curriculum designers bridging academic study with actual engineering careers.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] overflow-hidden flex flex-col justify-between hover:border-[#181615] transition-all group shadow-card card-lift"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EBE6DC]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C4325] uppercase tracking-wider block mb-1">
                      {member.domain}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1715] mb-1">{member.name}</h3>
                    <p className="text-xs text-[#57534E] font-medium mb-3">{member.role}</p>
                    <p className="text-xs text-[#57534E] leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-20 rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] p-10 text-center max-w-4xl mx-auto shadow-card card-lift"
          >
            <h3 className="text-2xl font-bold mb-3 text-[#1A1715]">Want to Collaborate or Mentor?</h3>
            <p className="text-[#57534E] text-xs sm:text-sm max-w-lg mx-auto mb-6">
              We welcome experienced tech leads and university faculty interested in mentoring or partnering with Geek Intern.
            </p>
            <Link to="/contact">
              <Button className="h-11 px-8 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs shadow-xs">
                Contact the Team →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Team
