import React from 'react'
import { Link } from 'react-router-dom'
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cpu,
  Layers,
  Megaphone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Application Development',
    subtitle: 'Modern, Scalable & High-Performance',
    desc: 'From high-converting e-commerce web applications to complex SaaS multi-tenant portals. Built with Next.js, React, TypeScript, and serverless cloud architectures.',
    deliverables: [
      'Next.js 14 & React SSR frontends',
      'High-throughput REST & GraphQL APIs',
      'PostgreSQL, Supabase & MongoDB databases',
      'Automated CI/CD deployment pipelines',
    ],
    color: 'text-[#181615]', bg: 'bg-[#EBE6DC]', border: 'border-[#E2DDD2]',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Engineering',
    subtitle: 'Cross-Platform & Native iOS/Android',
    desc: 'Deliver seamless smartphone experiences. We build with Flutter and React Native to minimize development overhead without sacrificing native 60fps performance.',
    deliverables: [
      'iOS & Android unified codebases',
      'Real-time GPS tracking & map overlays',
      'Biometric authentication & local encryption',
      'App Store & Play Store publishing support',
    ],
    color: 'text-[#2D6A4F]', bg: 'bg-[#E8F3ED]', border: 'border-[#E2DDD2]',
  },
  {
    icon: BrainCircuit,
    title: 'Custom AI & Agent Solutions',
    subtitle: 'Autonomous LLM Workflows & RAG',
    desc: 'Empower your company operations with autonomous agents, specialized LLM fine-tuning, knowledge-base search (RAG), and data extraction microservices.',
    deliverables: [
      'Document summarization & parsing agents',
      'Custom OpenAI, Anthropic & Llama integrations',
      'Vector database setups (pgvector, Pinecone)',
      'Human-in-the-loop task execution workflows',
    ],
    color: 'text-[#8C4325]', bg: 'bg-[#F0E6DC]', border: 'border-[#E2DDD2]',
  },
  {
    icon: Cpu,
    title: 'Cloud DevOps & Architecture',
    subtitle: 'Containerization & Infrastructure as Code',
    desc: 'Modernize legacy deployments, configure resilient AWS or GCP cloud environments, and establish zero-downtime rolling releases.',
    deliverables: [
      'Docker containerization & Kubernetes clusters',
      'Terraform & CloudFormation automation',
      'Microservice load balancing & caching',
      'Observability, logging & Prometheus alerts',
    ],
    color: 'text-[#181615]', bg: 'bg-[#EBE6DC]', border: 'border-[#E2DDD2]',
  },
  {
    icon: Layers,
    title: 'UI/UX Design Systems',
    subtitle: 'User Research & Modern Interfaces',
    desc: 'Design intuitive, accessible interfaces that delight users and convert visitors into long-term customers with comprehensive Figma design tokens.',
    deliverables: [
      'Interactive Figma prototypes & wireframes',
      'Complete component libraries & token kits',
      'Mobile-first responsive UX audits',
      'User journey mapping & friction elimination',
    ],
    color: 'text-[#8C4325]', bg: 'bg-[#F0E6DC]', border: 'border-[#E2DDD2]',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing & SEO',
    subtitle: 'Organic Growth & Paid Acquisition',
    desc: 'Drive qualified technical traffic and inbound leads through data-driven search engine optimization, content funnels, and performance marketing.',
    deliverables: [
      'Technical SEO audits & Core Web Vitals fixes',
      'High-intent content strategy & copywriting',
      'Conversion rate optimization (CRO)',
      'Analytics setup & ROI tracking dashboards',
    ],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Scope', desc: 'We examine your business requirements, timeline, and architectural specifications.' },
  { step: '02', title: 'Design & Prototype', desc: 'Wireframing, UX flows, and interactive mockups before writing a single line of code.' },
  { step: '03', title: 'Agile Engineering', desc: 'Two-week sprint cycles with live staging previews and continuous client feedback.' },
  { step: '04', title: 'QA & Launch', desc: 'Rigorous automated testing, security checks, and seamless cloud production rollout.' },
]

export function Services() {
  return (
    <PublicLayout>
      <PageTitle title="Professional Digital Solutions & Services | Geek Intern" />

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] uppercase tracking-widest text-[11px] mb-4 px-3 py-1 rounded-full">
            Digital Solutions
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Our Core <span className="font-serif italic text-[#8C4325]">Services</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We engineer high-impact software, mobile products, and AI solutions designed to accelerate growth, modernize operations, and elevate your brand.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/contact">
              <Button className="h-11 px-6 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white text-xs font-semibold shadow-xs">
                Discuss Your Project →
              </Button>
            </Link>
            <Link to="/web-portfolio">
              <Button variant="outline" className="h-11 px-6 rounded-full border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] text-xs font-semibold shadow-xs hover:bg-[#EAE4D7]">
                View Past Client Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#1A1715]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => {
              const IconComp = srv.icon
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border ${srv.border} p-8 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-sm`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${srv.bg} ${srv.color} flex items-center justify-center mb-6`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {srv.subtitle}
                    </span>
                    <h2 className="text-2xl font-bold text-[#1A1715] mb-3">{srv.title}</h2>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6">
                      {srv.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-100 mb-6">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                        Key Capabilities:
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {srv.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2 text-xs text-[#57534E]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm">
                      Request Consultation
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Process Section */}
          <div className="mt-28 border-t border-slate-200 pt-16">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <Badge className="bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-widest text-[11px] mb-3 px-3 py-1">
                How We Deliver
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1715]">
                Our Engineering <span className="text-[#2D6A4F]">Process</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-3xl font-extrabold text-[#2D6A4F]/30 mb-3 font-mono">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1715] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] p-10 text-center max-w-4xl mx-auto shadow-xs">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-[#1A1715]">Ready to Build Something Exceptional?</h3>
            <p className="text-[#57534E] text-sm max-w-lg mx-auto mb-6">
              Get in touch with our engineering architects today for a free project scoping and technical estimate.
            </p>
            <Link to="/contact">
              <Button className="h-11 px-8 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs shadow-xs">
                Contact Us Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Services
