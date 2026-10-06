import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  Github,
  Video,
  Award,
  ShieldAlert,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'

export function Guidelines() {
  return (
    <PublicLayout>
      <PageTitle title="Internship Guidelines & Task Submission Rules | Geek Intern" />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#EBE6DC] text-[#181615] border border-[#E2DDD2] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
            Program Guidelines & Rules
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A1715]">
            Internship <span className="text-[#FF4D5A]">Guidelines</span>
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about completing project tasks, repository documentation, video walkthroughs, and certificate issuance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#1A1715] min-h-[70vh]">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {/* Step 1 */}
          <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#EBE6DC] text-[#181615] border border-[#E2DDD2] flex items-center justify-center font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-[#1A1715]">Task Completion & Milestones</h2>
            </div>
            <p className="text-[#57534E] text-sm leading-relaxed mb-4">
              Upon receiving your Internship Offer Letter, you will receive structured task briefs categorized by difficulty (Level 1, Level 2, and Level 3 Capstone). You must complete the required minimum tasks to qualify for certification.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#57534E]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Follow the exact problem statement specifications outlined in the curriculum document.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>You can use any modern frameworks, libraries, or design toolkits relevant to your track.</span>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#EBE6DC] text-[#181615] border border-[#E2DDD2] flex items-center justify-center font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-[#1A1715] flex items-center gap-2">
                <Github className="w-6 h-6 text-[#1A1715]" />
                <span>GitHub Repository Requirements</span>
              </h2>
            </div>
            <p className="text-[#57534E] text-sm leading-relaxed mb-4">
              Each task must be hosted in a public GitHub repository. Evaluators will inspect commit history, project organization, and documentation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2]">
                <h4 className="font-bold text-[#1A1715] mb-2">Mandatory README Format</h4>
                <ul className="space-y-1.5 text-[#57534E] text-xs">
                  <li>• Project title & track name</li>
                  <li>• Detailed overview & features list</li>
                  <li>• Technologies used & versions</li>
                  <li>• Step-by-step setup / install guide</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2]">
                <h4 className="font-bold text-[#1A1715] mb-2">Commit Conventions</h4>
                <ul className="space-y-1.5 text-[#57534E] text-xs">
                  <li>• Multiple progressive commits (not 1 bulk commit)</li>
                  <li>• Descriptive messages (e.g. "feat: add user auth")</li>
                  <li>• Proper .gitignore excluding node_modules / build files</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] flex items-center justify-center font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-[#1A1715] flex items-center gap-2">
                <Video className="w-6 h-6 text-[#8C4325]" />
                <span>Video Demonstration & LinkedIn Post</span>
              </h2>
            </div>
            <p className="text-[#57534E] text-sm leading-relaxed mb-4">
              To verify authentic authorship, record a short 2 to 3 minute screen recording walkthrough explaining your code architecture and demonstrating the live running features.
            </p>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#57534E]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Share your project demo video on LinkedIn tagging @Geek Intern to showcase your work to hiring recruiters.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <span>Include your GitHub repository link and hashtags #geekintern #internship #developer.</span>
              </li>
            </ul>
          </div>

          {/* Step 4: Academic Integrity */}
          <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              <h2 className="text-xl font-bold text-[#1A1715]">Strict Anti-Plagiarism Policy</h2>
            </div>
            <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
              Copying another candidate's exact repository or submitting unmodified third-party templates will result in immediate disqualification and revocation of certification eligibility.
            </p>
          </div>

          {/* Step 5: Evaluation & Certification */}
          <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-[#1A1715]">Evaluation & Certificate Timeline</h2>
            </div>
            <p className="text-[#57534E] text-sm leading-relaxed mb-4">
              Submit your project repository and video links through the Task Submission form before your cohort closing deadline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2]">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1A1715]">
                <Clock className="w-5 h-5 text-[#8C4325]" />
                <span>Evaluation turnaround: <strong>3 to 5 business days</strong></span>
              </div>
              <Link to="/verify">
                <Button variant="outline" className="border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] text-xs shadow-xs hover:bg-[#EAE4D7] rounded-full">
                  Certificate Verification Portal →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default Guidelines
