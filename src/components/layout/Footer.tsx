import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, Twitter, Linkedin, Instagram, ArrowUpRight, Github, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { Logo } from '@/components/common/Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0f] text-[#f0efe9] border-t border-white/10 relative overflow-hidden">
      {/* Subtle ambient blur glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#06e4f9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="light" size="md" />
              <div>
                <span className="font-display font-black text-xl tracking-wider uppercase text-white block">
                  Geek Interns
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block">
                  A GKK & Bubblesort Venture
                </span>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-md font-sans">
              Where convention collapses and innovation begins. Geek Interns delivers production-grade software internships, live codebase contributions, and ISO-aligned verified credentials for modern engineering careers.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/apply"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-[#06e4f9] hover:bg-white/10 hover:border-[#06e4f9]/50 transition-all"
              >
                <span>Apply for Internship</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/student-portal"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Student Portal</span>
              </Link>
            </div>
          </div>

          {/* Programs Column */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#06e4f9] font-bold">
              Engineering Tracks
            </h3>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>
                <Link to="/browse?category=web" className="hover:text-white transition-colors">
                  Full Stack Development ↗
                </Link>
              </li>
              <li>
                <Link to="/browse?category=ai" className="hover:text-white transition-colors">
                  AI & Prompt Engineering ↗
                </Link>
              </li>
              <li>
                <Link to="/browse?category=cloud" className="hover:text-white transition-colors">
                  Cloud & DevOps Systems ↗
                </Link>
              </li>
              <li>
                <Link to="/browse?category=mobile" className="hover:text-white transition-colors">
                  Mobile App Engineering ↗
                </Link>
              </li>
              <li>
                <Link to="/browse?category=security" className="hover:text-white transition-colors">
                  Cybersecurity & Security ↗
                </Link>
              </li>
              <li>
                <Link to="/browse?category=design" className="hover:text-white transition-colors">
                  UI/UX & Design Systems ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Verification Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Verification & Docs
            </h3>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>
                <Link to="/verify" className="hover:text-white transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link to="/verify-offer-letter" className="hover:text-white transition-colors">
                  Verify Offer Letter
                </Link>
              </li>
              <li>
                <Link to="/internships/guidelines" className="hover:text-white transition-colors">
                  Program Guidelines
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Candidate FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Inquiries & Connect Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/70 font-bold">
              Connect & Support
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li>
                <span className="block text-white/40 text-[10px]">Study Enquiry:</span>
                <a href="mailto:support.geekintern@gmail.com" className="hover:text-white transition-colors text-white/80">
                  support.geekintern@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-white/40 text-[10px]">Helpline:</span>
                <a href="tel:+919477564633" className="hover:text-white transition-colors text-white/80">
                  +91 9477564633
                </a>
              </li>
              <li>
                <span className="block text-white/40 text-[10px]">Institutional:</span>
                <Link to="/college-register" className="hover:text-[#06e4f9] transition-colors text-white/80">
                  College Partnerships
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://in.linkedin.com/in/geek-intern"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Anant1822/geekintern-client"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/geekintern"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#06e4f9] hover:text-[#06e4f9] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {currentYear} Geek Interns. All rights reserved. Code. Build. Deploy.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">A GKK & Bubblesort Venture</span>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
