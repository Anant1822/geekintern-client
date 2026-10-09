import {
  ShieldCheck, Globe2, Briefcase, Clock, Filter, AlertTriangle,
  UserCheck, Search, FileText, Award, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MissionCardProps { icon: React.ReactNode; title: string; description: string; accent: "teal" | "amber" | "navy"; }
function MissionCard({ icon, title, description, accent }: MissionCardProps) {
  const colors = {
    teal:  { bar: "bg-[#2D6A4F]", icon: "bg-[#E8F3ED] text-[#2D6A4F]" },
    amber: { bar: "bg-[#8C4325]", icon: "bg-[#F0E6DC] text-[#8C4325]" },
    navy:  { bar: "bg-[#181615]", icon: "bg-[#EBE6DC] text-[#181615]" },
  };
  return (
    <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl card-lift overflow-hidden">
      <div className={cn("h-1.5 w-full", colors[accent].bar)} />
      <CardContent className="pt-8 pb-8 flex flex-col gap-3">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-[#E2DDD2]", colors[accent].icon)}>{icon}</div>
        <h3 className="font-bold text-[#1A1715] text-lg">{title}</h3>
        <p className="text-[#57534E] text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

interface PainPointProps { icon: React.ReactNode; text: string; }
function PainPoint({ icon, text }: PainPointProps) {
  return (
    <div className="flex items-start gap-4 bg-[#FAF7F2] rounded-2xl p-5 shadow-xs border border-[#E2DDD2] card-lift">
      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0 mt-0.5">{icon}</div>
      <p className="text-[#57534E] font-medium leading-relaxed">{text}</p>
    </div>
  );
}

interface StepCardProps { step: number; title: string; description: string; }
function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#181615] font-mono font-bold text-lg flex items-center justify-center mb-4 shadow-xs border border-[#E2DDD2]">{step}</div>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface CompareListProps { items: string[]; color: "navy" | "teal"; }
function CompareList({ items, color }: CompareListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-[#57534E]">
          <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0 mt-0.5", color === "navy" ? "text-[#181615]" : "text-[#2D6A4F]")} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <PublicLayout>
      {/* 1. Hero */}
      <section className="relative bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-5xl mx-auto px-4 py-24 text-center z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] mb-5 text-xs tracking-widest uppercase">Our Story</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight text-[#1A1715] tracking-tight">
            About <span className="italic font-serif text-[#8C4325]">Geek Intern</span>
          </h1>
          <p className="text-lg md:text-xl text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            A practical engineering internship platform built for college students and graduates — project-focused, verified, and accessible.
          </p>
        </motion.div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#F0E6DC] text-[#8C4325] border-[#E4D5C7] mb-4">How It Started</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1715] mb-5 leading-tight">
              Built to Solve Real Engineering Challenges
            </h2>
            <div className="space-y-4 text-[#57534E] leading-relaxed">
              <p>
                Geek Intern was founded to help engineering students build real-world software projects that employers actually care about. Students from universities across India often struggle to bridge the gap between textbook theory and practical repository development.
              </p>
              <p>
                We built Geek Intern to change that. Our platform offers{" "}
                <span className="font-semibold text-[#1A1715]">domain-specific technical tracks</span> — covering full stack development, Python, AI, embedded systems, VLSI, and cloud engineering with real GitHub deliverables.
              </p>
              <p>
                Every internship project on Geek Intern is{" "}
                <span className="font-semibold text-[#1A1715]">evaluated on quality code and documentation</span>. We provide transparent milestones, official offer letters, and verifiable credentials with unique QR verification.
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-xs flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-20 h-20 rounded-2xl bg-[#181615] text-white flex items-center justify-center shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-[#1A1715]">500+</p>
                <p className="text-[#57534E] text-sm mt-1">Verified Internships Listed</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-[#F5F2EB] rounded-xl p-4 text-center shadow-xs border border-[#E2DDD2]">
                  <p className="text-2xl font-bold text-[#2D6A4F]">200+</p>
                  <p className="text-xs text-[#57534E] mt-1">Partner Colleges</p>
                </div>
                <div className="bg-[#F5F2EB] rounded-xl p-4 text-center shadow-xs border border-[#E2DDD2]">
                  <p className="text-2xl font-bold text-[#8C4325]">15+</p>
                  <p className="text-xs text-[#57534E] mt-1">Branches Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="py-20 px-4 bg-[#EBE6DC]">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] mb-4">Our Mission</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1715] mb-4">
            Connecting Every Student to Opportunity
          </h2>
          <p className="text-[#57534E] max-w-2xl mx-auto">
            We believe that every college student in India deserves a fair shot at a quality internship —
            regardless of which city they study in or which college they attend.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <MissionCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Verified Opportunities"
            description="Every internship on our platform is manually reviewed for authenticity. We verify company existence, contact details, and internship legitimacy before listing."
            accent="teal"
          />
          <MissionCard
            icon={<Globe2 className="w-6 h-6" />}
            title="Accessible to All"
            description="Students from any college — Tier 1, Tier 2, or Tier 3 — and any branch can discover internships perfectly matched to their academic background."
            accent="amber"
          />
          <MissionCard
            icon={<Award className="w-6 h-6" />}
            title="Career Readiness"
            description="We prepare students for professional environments with guidance on applications, resumes, and what to expect during the internship journey."
            accent="navy"
          />
        </div>
      </section>

      {/* 4. Problem We Solve */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-red-50 text-red-700 border-red-200 mb-4">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1715] mb-4">
              What Students Face Today
            </h2>
            <p className="text-[#57534E] max-w-2xl mx-auto">
              The internship search in India is broken for most students. Here's what we set out to fix.
            </p>
          </div>
          <div className="space-y-4">
            <PainPoint
              icon={<Clock className="w-5 h-5" />}
              text="Students spend weeks — sometimes months — searching across dozens of scattered platforms for internships relevant to their branch and location, with little to no success."
            />
            <PainPoint
              icon={<Filter className="w-5 h-5" />}
              text="Most internship platforms don't filter by engineering branch or academic specialisation. A Mechanical Engineering student is shown the same listings as a Computer Science student."
            />
            <PainPoint
              icon={<AlertTriangle className="w-5 h-5" />}
              text="Fake internship listings are rampant. Students pay upfront fees only to receive fake certificates or no communication at all — wasting time, money, and morale."
            />
          </div>
        </div>
      </section>

      {/* 5. How Geek Intern Works */}
      <section className="py-20 px-4 bg-[#181615] text-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <Badge className="bg-[#FAF7F2]/20 text-white border-0 mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Geek Intern Works</h2>
          <p className="text-white/75 max-w-2xl mx-auto">A straightforward 4-stage process from onboarding to certified completion.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-white/20 pointer-events-none" />
          <StepCard step={1} title="Choose Your Track" description="Select from 30+ domain specializations that align with your career goals." />
          <StepCard step={2} title="Receive Task Brief" description="Get your digital Offer Letter and project problem statements delivered directly to your inbox." />
          <StepCard step={3} title="Build on GitHub" description="Develop your project milestone by milestone, commit clean code, and write clear documentation." />
          <StepCard step={4} title="Verify & Showcase" description="Submit your project link, receive evaluation feedback, and get your verifiable certificate." />
        </div>
      </section>

      {/* 6. For Students vs For Colleges */}
      <section className="py-20 px-4 bg-[#EBE6DC] border-b border-[#E2DDD2]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1715] mb-4">
              Built for Engineering Students & Institutions
            </h2>
            <p className="text-[#57534E] max-w-xl mx-auto">
              Whether you're a student looking for hands-on project experience or a college placement coordinator,
              Geek Intern provides the right framework.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
            >
              <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl card-lift overflow-hidden">
                <div className="h-2 bg-[#2D6A4F]" />
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F3ED] border border-[#C2E0D1] flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-[#2D6A4F]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1715]">For Students</h3>
                  </div>
                  <CompareList color="teal" items={[
                    "Domain-specific engineering project tracks",
                    "Real GitHub code repositories to showcase in interviews",
                    "Free, instant online application process",
                    "Student portal to track tasks and submissions",
                    "Verifiable Certificate of Completion with unique CID",
                    "Prompt email and message support",
                    "Accepted by universities for internship credits",
                    "Mobile-friendly student portal",
                  ]} />
                  <Button asChild className="mt-8 bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs w-full">
                    <Link to="/browse">Browse Tracks <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl card-lift overflow-hidden">
                <div className="h-2 bg-[#181615]" />
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EBE6DC] border border-[#E2DDD2] flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#1A1715]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1715]">For Colleges</h3>
                  </div>
                  <CompareList color="navy" items={[
                    "Placement coordinator dashboard",
                    "Real-time student progress tracking",
                    "Branch-wise performance analytics and reports",
                    "Bulk student onboarding assistance",
                    "College NOC and credit fulfillment support",
                    "Customized internship cohorts for departments",
                    "Free partnership onboarding for colleges",
                    "Direct priority support channel",
                  ]} />
                  <Button asChild className="mt-8 bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs w-full">
                    <Link to="/college-register">Partner With Us <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 px-4 bg-[#FAF7F2] border-t border-[#E2DDD2]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#F0E6DC] border border-[#E4D5C7] flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[#8C4325]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1715] mb-4">Ready to Build Real Projects?</h2>
          <p className="text-[#57534E] mb-8 leading-relaxed">
            Join thousands of engineering students who leveled up their skills and built portfolios with Geek Intern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs px-8">
              <Link to="/browse">Explore Tracks <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#D6CFC4] text-[#1A1715] hover:bg-[#EAE4D7] rounded-full font-semibold px-8">
              <Link to="/college-register">Partner as College</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
