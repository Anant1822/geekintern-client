import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { motion } from 'framer-motion'

const CAPSTONES = [
  {
    title: 'Hospital Patient Queue & EHR System',
    track: 'Full Stack Web Engineering',
    college: 'Anna University, Chennai',
    description:
      'Digital patient triage and medical records management with real-time queue broadcasting, encrypted prescription lockers, and doctor availability schedules.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'AI Pneumonia & Chest X-Ray Classifier',
    track: 'AI & Data Science',
    college: 'Delhi Technological University',
    description:
      'Computer vision deep learning model utilizing PyTorch ResNet50 to identify lung opacity abnormalities from DICOM scans with 94.2% validation accuracy.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Docker'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Campus Food Delivery & Parcel Runner',
    track: 'Android Architecture',
    college: 'Vellore Institute of Technology',
    description:
      'University student hyper-local delivery app facilitating food orders from campus canteens with hostel room pinpoints and student wallet balances.',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Google Maps'],
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Smart Smart Grid & Solar Inverter Telemetry',
    track: 'Embedded Systems & IoT',
    college: 'National Institute of Technology, Surat',
    description:
      'Industrial sensor dashboard monitoring solar panel voltage, battery cell state-of-charge, and grid injection status over MQTT and cellular telemetry.',
    tech: ['Embedded C', 'ESP32', 'FreeRTOS', 'MQTT', 'InfluxDB'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop',
  },
]

export function IndustrialTrainingProjects() {
  return (
    <PublicLayout>
      <PageTitle title="Industrial Training Capstone Projects | Geek Intern" />

      {/* Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Student Showcase
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Industrial Training <span className="italic font-serif text-[#8C4325]">Capstone Projects</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real-world capstones built by engineering students under senior industry mentors during their university-mandated training period.
          </p>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPSTONES.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] hover:border-[#181615] overflow-hidden flex flex-col justify-between shadow-card card-lift transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#EBE6DC]">
                  <img src={cap.image} alt={cap.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-[#8C4325]">{cap.track}</span>
                      <span className="text-[11px] text-[#57534E] font-medium">{cap.college}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1715] mb-3">{cap.title}</h3>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                      {cap.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cap.tech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full bg-[#EBE6DC] text-[#57534E] text-[11px] font-semibold border border-[#E2DDD2]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#E2DDD2] flex items-center justify-between">
                    <span className="text-xs text-[#2D6A4F] font-semibold">Verified Capstone</span>
                    <Link to="/apply?program=industrial-training" className="text-xs font-bold text-[#8C4325] hover:underline">
                      Enroll in Track →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default IndustrialTrainingProjects
