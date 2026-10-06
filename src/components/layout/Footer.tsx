import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, MessageCircle, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F4F5F1] dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-t border-zinc-200/90 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="auto" size="md" className="mb-4" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Hands-on remote engineering internships. Build real software projects, earn verified credentials, and prepare for tech industry roles.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link to="/apply">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
                  <span>Start Your Internship</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <Link to="/verify">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                  Verify Credentials
                </span>
              </Link>
            </div>
          </div>

          {/* Internships Column */}
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
              Internships
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/apply" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Apply for Internship
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Internship Tracks
                </Link>
              </li>
              <li>
                <Link to="/internships/guidelines" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Internship Guidelines
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium text-emerald-700 dark:text-emerald-400">
                  Student Certificate Portal
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Certificate Verification
                </Link>
              </li>
              <li>
                <Link to="/verify-offer-letter" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Offer Letter Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolio & Training Column */}
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
              Student Work & Training
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/web-portfolio" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Web Portfolio
                </Link>
              </li>
              <li>
                <Link to="/app-portfolio" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  App Portfolio
                </Link>
              </li>
              <li>
                <Link to="/core-portfolio" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Core Engineering Work
                </Link>
              </li>
              <li>
                <Link to="/industrial-training" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Industrial Training
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Development Services
                </Link>
              </li>
              <li>
                <Link to="/career-tools" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Career Tools Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
              Company & Help
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  About Geek Intern
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Mentors & Team
                </Link>
              </li>
              <li>
                <Link to="/college-register" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Partner Colleges
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Tech Blog & Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Contact & Help Desk
                </Link>
              </li>
              <li>
                <a href="mailto:support.geekintern@gmail.com" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  support.geekintern@gmail.com
                </a>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-zinc-200 dark:bg-zinc-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <p>&copy; {currentYear} Geek Intern. All rights reserved.</p>
            <span>•</span>
            <Link to="/admin/login" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a href="https://www.linkedin.com/in/geek-intern" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors" title="Follow Geek Intern on LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">Project-Based Learning & Verified Certifications</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
