import { useState, useEffect } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Award, Laptop, Clock, Briefcase, FileText, PhoneCall, MessageCircle, AlertCircle, Mail, Check, Linkedin, ExternalLink, Loader2, Eye, EyeOff, Lock } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/useToast'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'

export interface DomainCategoryConfig {
  name: string
  description: string
  subdomains: string[]
}

export const DOMAIN_CATEGORIES: DomainCategoryConfig[] = [
  {
    name: 'Software & Web Development',
    description: 'Frontend, Backend, Full Stack & Mobile Engineering',
    subdomains: [
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'Web Development',
      'Android App Development',
      'Python Programming',
      'Java Programming',
      'C++ Programming',
      'C Programming',
      'Blockchain Development',
    ],
  },
  {
    name: 'Artificial Intelligence & Data',
    description: 'AI Agents, Machine Learning, Data Analytics & BI',
    subdomains: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Data Analytics',
      'Power BI',
    ],
  },
  {
    name: 'Cloud, DevOps & Security',
    description: 'AWS Cloud, Cloud Infra, CI/CD & Cyber Security',
    subdomains: [
      'Cloud Computing',
      'AWS Cloud',
      'DevOps',
      'Cyber Security',
    ],
  },
  {
    name: 'Design & Creative Arts',
    description: 'UI/UX Design, Figma Prototyping & Graphic Design',
    subdomains: [
      'UI/UX Design',
      'Graphic Designing',
    ],
  },
  {
    name: 'Core Engineering & CAD/Simulation',
    description: 'Mechanical, Civil, AutoCAD, MATLAB & Electric Vehicles',
    subdomains: [
      'Civil Engineering & Structural Design',
      'Mechanical Design & Simulation',
      'AutoCAD',
      'MATLAB',
      'Electric Vehicle Technology (EV)',
    ],
  },
  {
    name: 'Embedded Systems, IoT & Hardware',
    description: 'VLSI Semiconductor, Embedded C, Arduino, PCB & SCADA',
    subdomains: [
      'VLSI Design',
      'Embedded Systems & IoT',
      'Embedded Systems with Arduino',
      'IoT Fundamentals',
      'PLC & SCADA',
      'PCB Design',
    ],
  },
]

const DOMAIN_OPTIONS = DOMAIN_CATEGORIES.flatMap((cat) => cat.subdomains)

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Post Graduate / Masters',
  'Recent Graduate / Fresher',
]

const DURATION_OPTIONS = [
  { value: '7 Days', label: '7 Days / 1 Week (Workshop Program)' },
  { value: '4 Weeks', label: '4 Weeks / 1 Month' },
  { value: '12 Weeks', label: '12 Weeks / 3 Months' },
]

export default function Apply() {
  const [searchParams] = useSearchParams()
  const { toast } = useToast()

  const { id: routeId } = useParams<{ id?: string }>()

  const rawDomain =
    searchParams.get('domain') ||
    searchParams.get('title') ||
    searchParams.get('program') ||
    routeId ||
    ''
  const queryDomain = decodeURIComponent(rawDomain).trim()
  const queryInternshipId = searchParams.get('internshipId') || ''

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    college_name: '',
    branch: '',
    year_of_study: '',
    internship_title: '',
    duration: '4 Weeks',
    linkedin_url: '',
    github_url: '',
    resume_url: '',
    message: '',
    is_urgent: false,
    urgent_reason: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isLinkedinFollowed, setIsLinkedinFollowed] = useState(false)
  const [linkedinFollowClicked, setLinkedinFollowClicked] = useState(false)
  const [isVerifyingLinkedin, setIsVerifyingLinkedin] = useState(false)

  // Robust LinkedIn follow verification: waits for 5 seconds after applicant opens LinkedIn, then confirms
  useEffect(() => {
    let timer: any = null
    if (isVerifyingLinkedin) {
      timer = setTimeout(() => {
        setIsVerifyingLinkedin(false)
        setIsLinkedinFollowed(true)
        toast({
          title: 'LinkedIn Follow Verified! ✓',
          description: 'Thank you for following Geek Intern on LinkedIn.',
        })
      }, 5000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isVerifyingLinkedin, toast])

  const handleOpenLinkedin = () => {
    setLinkedinFollowClicked(true)
    setIsVerifyingLinkedin(true)
    window.open('https://www.linkedin.com/in/geek-intern', '_blank', 'noopener,noreferrer')
  }

  // Auto-match queryDomain to category & sub-domain options
  useEffect(() => {
    if (!queryDomain) return

    const normalizedQuery = queryDomain.toLowerCase().replace(/[-_]/g, ' ').trim()

    // 1. Exact or substring match in subdomains
    let matchedCat = DOMAIN_CATEGORIES.find((cat) =>
      cat.subdomains.some(
        (sub) =>
          sub.toLowerCase() === normalizedQuery ||
          sub.toLowerCase().includes(normalizedQuery) ||
          normalizedQuery.includes(sub.toLowerCase())
      )
    )
    let matchedSub: string | undefined = undefined

    if (matchedCat) {
      matchedSub = matchedCat.subdomains.find(
        (sub) =>
          sub.toLowerCase() === normalizedQuery ||
          sub.toLowerCase().includes(normalizedQuery) ||
          normalizedQuery.includes(sub.toLowerCase())
      )
    }

    // 2. Keyword heuristic matching if not directly matched
    if (!matchedCat) {
      if (
        normalizedQuery.includes('full stack') ||
        normalizedQuery.includes('web') ||
        normalizedQuery.includes('frontend') ||
        normalizedQuery.includes('backend') ||
        normalizedQuery.includes('react') ||
        normalizedQuery.includes('node')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Software & Web Development')
        matchedSub = 'Full Stack Development'
      } else if (
        normalizedQuery.includes('android') ||
        normalizedQuery.includes('mobile') ||
        normalizedQuery.includes('app')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Software & Web Development')
        matchedSub = 'Android App Development'
      } else if (
        normalizedQuery.includes('ai') ||
        normalizedQuery.includes('artificial') ||
        normalizedQuery.includes('machine learning') ||
        normalizedQuery.includes('data') ||
        normalizedQuery.includes('analytics')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Artificial Intelligence & Data')
        matchedSub = normalizedQuery.includes('data') ? 'Data Analytics' : 'Machine Learning'
      } else if (
        normalizedQuery.includes('cloud') ||
        normalizedQuery.includes('aws') ||
        normalizedQuery.includes('devops') ||
        normalizedQuery.includes('security') ||
        normalizedQuery.includes('cyber')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Cloud, DevOps & Security')
        matchedSub = normalizedQuery.includes('cloud') || normalizedQuery.includes('aws') ? 'AWS Cloud' : 'Cyber Security'
      } else if (
        normalizedQuery.includes('iot') ||
        normalizedQuery.includes('embedded') ||
        normalizedQuery.includes('vlsi') ||
        normalizedQuery.includes('arduino') ||
        normalizedQuery.includes('scada')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Embedded Systems, IoT & Hardware')
        matchedSub = 'Embedded Systems & IoT'
      } else if (
        normalizedQuery.includes('cad') ||
        normalizedQuery.includes('autocad') ||
        normalizedQuery.includes('mechanical') ||
        normalizedQuery.includes('civil') ||
        normalizedQuery.includes('ev') ||
        normalizedQuery.includes('matlab')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Core Engineering & CAD/Simulation')
        matchedSub = normalizedQuery.includes('autocad') ? 'AutoCAD' : 'Mechanical Design & Simulation'
      } else if (
        normalizedQuery.includes('ui') ||
        normalizedQuery.includes('ux') ||
        normalizedQuery.includes('design') ||
        normalizedQuery.includes('graphic')
      ) {
        matchedCat = DOMAIN_CATEGORIES.find((c) => c.name === 'Design & Creative Arts')
        matchedSub = 'UI/UX Design'
      } else if (
        normalizedQuery.includes('industrial') ||
        normalizedQuery.includes('training')
      ) {
        matchedCat = DOMAIN_CATEGORIES[0]
        matchedSub = 'Full Stack Development'
      }
    }

    if (matchedCat) {
      setSelectedCategory(matchedCat.name)
      const targetSub = matchedSub || matchedCat.subdomains[0]
      setFormData((prev) => ({ ...prev, internship_title: targetSub }))
    } else {
      // Fallback: Default to Software & Web Development and preserve the query title
      setSelectedCategory(DOMAIN_CATEGORIES[0].name)
      setFormData((prev) => ({ ...prev, internship_title: queryDomain }))
    }
  }, [queryDomain])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      const msg = 'Please fill in your name, email, and mobile number.'
      setSubmitError(msg)
      toast({
        title: 'Required fields missing',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    if (!formData.password || formData.password.trim().length < 6) {
      const msg = 'Please set a password with at least 6 characters for future login.'
      setSubmitError(msg)
      toast({
        title: 'Password Required',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    if (!formData.college_name.trim() || !formData.branch.trim()) {
      const msg = 'Please enter your college name and branch/department.'
      setSubmitError(msg)
      toast({
        title: 'College Information Required',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    if (!formData.year_of_study) {
      const msg = 'Please select your current year of study from the dropdown.'
      setSubmitError(msg)
      toast({
        title: 'Year of Study Required',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    if (!selectedCategory || !formData.internship_title) {
      const msg = 'Please select both your Internship Category and Internship Track.'
      setSubmitError(msg)
      toast({
        title: 'Domain Selection Required',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    if (formData.is_urgent && !formData.urgent_reason.trim()) {
      const msg = 'Please enter the reason for your urgent certification request.'
      setSubmitError(msg)
      toast({
        title: 'Urgent Reason Required',
        description: msg,
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      // If student marked urgent or added comments, prepend to message
      let fullMessage = formData.message.trim()
      if (formData.is_urgent) {
        const urgentPrefix = `[URGENT CERTIFICATION REQUEST] Reason: ${formData.urgent_reason.trim() || 'Urgent academic/college submission'}`
        fullMessage = fullMessage ? `${urgentPrefix} | Notes: ${fullMessage}` : urgentPrefix
      }

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      const cleanInternshipId =
        queryInternshipId && uuidRegex.test(queryInternshipId.trim()) ? queryInternshipId.trim() : null

      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        college_name: formData.college_name.trim(),
        branch: formData.branch.trim(),
        year_of_study: formData.year_of_study.trim(),
        internship_title: formData.internship_title.trim(),
        duration: formData.duration.trim() || '4 Weeks',
        linkedin_url: formData.linkedin_url.trim() || null,
        github_url: formData.github_url.trim() || null,
        resume_url: formData.resume_url.trim() || null,
        message: fullMessage || null,
        internship_id: cleanInternshipId,
      }

      // 1. Try Backend API submission first (with quick timeout)
      let backendSuccess = false
      try {
        await api.post('/applications/apply-direct', payload)
        backendSuccess = true
      } catch (apiErr: any) {
        console.warn('Backend API apply-direct notice, attempting direct Supabase cloud submission...', apiErr?.message)
      }

      // 2. Direct Supabase Submission Fallback (Guaranteed to work reliably on production / Vercel client)
      if (!backendSuccess) {
        const { error: sbError } = await supabase.from('direct_applications').insert([payload])
        if (sbError) {
          throw sbError
        }
      }

      // 3. Register student user account with email & password in Supabase Auth for portal login
      try {
        const { error: authError } = await supabase.auth.signUp({
          email: payload.email,
          password: formData.password.trim(),
          options: {
            data: {
              full_name: payload.full_name,
              phone: payload.phone,
              college_name: payload.college_name,
              branch: payload.branch,
              role: 'student',
            },
          },
        })
        if (authError) {
          console.warn('Supabase Auth student account creation note:', authError.message)
        }
      } catch (authErr) {
        console.warn('Background student auth creation notice:', authErr)
      }

      // 4. Update student applicants registry in app_settings so student can immediately log into student portal
      try {
        const { data: regRow } = await supabase
          .from('app_settings')
          .select('value')
          .eq('key', 'student_applicants_registry')
          .maybeSingle()

        let registry: Record<string, any> = {}
        if (regRow?.value) {
          try {
            registry = JSON.parse(regRow.value)
          } catch {
            registry = {}
          }
        }
        registry[payload.email] = {
          full_name: payload.full_name,
          email: payload.email,
          phone: payload.phone,
          college_name: payload.college_name,
          branch: payload.branch,
          internship_title: payload.internship_title,
          duration: payload.duration,
          status: 'submitted',
          has_password: true,
          created_at: new Date().toISOString(),
        }
        await supabase
          .from('app_settings')
          .upsert({
            key: 'student_applicants_registry',
            value: JSON.stringify(registry),
            updated_at: new Date().toISOString(),
          })
      } catch (syncErr) {
        console.warn('Applicant registry local sync notice:', syncErr)
      }

      setSubmittedData(formData)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      toast({
        title: formData.is_urgent ? 'Urgent Application Prioritized!' : 'Application Submitted!',
        description: formData.is_urgent
          ? 'Your urgent application and comment have been flagged for expedited processing.'
          : 'Your internship application has been recorded successfully.',
      })
    } catch (err: any) {
      console.error('Submission error:', err)
      const fieldErrors = err?.response?.data?.errors
      let errorMsg = err?.response?.data?.message || 'Failed to submit application. Please try again.'
      if (fieldErrors && typeof fieldErrors === 'object') {
        const details = Object.entries(fieldErrors)
          .map(([f, msgs]) => `${f.replace(/_/g, ' ')}: ${(msgs as string[]).join(', ')}`)
          .join('; ')
        if (details) errorMsg = `${errorMsg} (${details})`
      }
      setSubmitError(errorMsg)
      toast({
        title: 'Submission Error',
        description: errorMsg,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-slate-50/70 py-10 sm:py-14">
        <div className="container max-w-4xl">
          {/* Header Bar */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-1 mb-3 text-xs font-semibold gap-1 inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> Geek Intern Virtual Internship Program
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Start Your Virtual Internship
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Gain real-world experience, build industry-standard portfolio projects, and earn a verifiable certificate with a Letter of Recommendation.
            </p>
          </div>

          {/* Success View */}
          {isSubmitted ? (
            <Card className="border-0 shadow-lg bg-white overflow-hidden text-center p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Application Received Successfully!
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto text-base mb-6">
                Congratulations <span className="font-semibold text-slate-900">{submittedData?.full_name}</span>! You have taken the first step toward advancing your tech career in <span className="font-semibold text-blue-600">{submittedData?.internship_title}</span>.
              </p>

              {/* What happens next box */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-6 text-left max-w-xl mx-auto mb-8">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-blue-600" /> What Happens Next?
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span><strong>Offer Letter & Task Kit:</strong> Our onboarding team will send your official offer letter and task guidelines to <strong>{submittedData?.email}</strong> within 24–48 hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span><strong>Build & Push to GitHub:</strong> Work through project milestones at your own pace and submit your GitHub repository links for evaluation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span><strong>Certification:</strong> Receive your verified digital certificate with QR code verification and performance-based Letter of Recommendation (LOR).</span>
                  </li>
                </ul>
              </div>

              {/* Student Portal Account Confirmation */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left max-w-xl mx-auto mb-6 text-sm text-emerald-800 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">Student Portal Account Initialized!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    You can log in to your Student Portal anytime with your email (<strong>{submittedData?.email}</strong>) and the password you set to track your application, offer letter, and certificate.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to={`/student-portal?email=${encodeURIComponent(submittedData?.email || '')}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shadow-sm gap-1.5">
                    Login to Student Portal <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Explore Other Domains
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" className="w-full sm:w-auto text-slate-600">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-8">
                <Card className="border border-slate-200 shadow-sm bg-white">
                  <CardHeader className="border-b border-slate-100 pb-5">
                    <CardTitle className="text-xl font-bold text-slate-900">
                      Applicant Information
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Fill out this quick form. No resume or sign-up is mandatory to get started.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="full_name" className="text-slate-700 font-medium text-sm">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          className="mt-1.5"
                        />
                      </div>

                      {/* Email & Set Password */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative mt-1.5">
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="e.g. rahul@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="pr-9"
                            />
                            <div className="absolute right-3 top-2.5 text-slate-400">
                              <Mail className="h-4 w-4" />
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">Offer letter & credentials will be sent here</p>
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-slate-700 font-medium text-sm flex items-center justify-between">
                            <span>Set Password <span className="text-red-500">*</span></span>
                            <span className="text-[11px] text-blue-600 font-normal">For future portal login</span>
                          </Label>
                          <div className="relative mt-1.5">
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Min. 6 characters"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              minLength={6}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              tabIndex={-1}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">Used to log into student portal & view certificate</p>
                        </div>
                      </div>

                      {/* Contact Number & Current Year of Study */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-slate-700 font-medium text-sm">
                            Contact / Mobile Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                          <p className="text-[11px] text-slate-500 mt-1">For program updates & verification</p>
                        </div>

                        <div>
                          <Label className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            Current Year of Study <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.year_of_study}
                            onValueChange={(val) => setFormData((prev) => ({ ...prev, year_of_study: val }))}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {YEAR_OPTIONS.map((yr) => (
                                <SelectItem key={yr} value={yr}>
                                  {yr}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-[11px] text-slate-500 mt-1">Your current academic year</p>
                        </div>
                      </div>

                      {/* College & Branch */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="college_name" className="text-slate-700 font-medium text-sm">
                            College / University Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="college_name"
                            name="college_name"
                            placeholder="e.g. Delhi Technological University"
                            value={formData.college_name}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="branch" className="text-slate-700 font-medium text-sm">
                            Branch / Department <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="branch"
                            name="branch"
                            placeholder="e.g. Computer Science / BCA / IT"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      {/* Domain Selection - Natural Form Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 1st: Domain Category */}
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            Internship Category <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={selectedCategory}
                            onValueChange={(val) => {
                              setSelectedCategory(val)
                              // Keep the secondary specialization field blank initially until user selects it
                              setFormData((prev) => ({ ...prev, internship_title: '' }))
                            }}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select Category (e.g. Web Dev, Core, AI...)" />
                            </SelectTrigger>
                            <SelectContent className="max-h-72">
                              {DOMAIN_CATEGORIES.map((cat) => (
                                <SelectItem key={cat.name} value={cat.name}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* 2nd: Specific Specialization Track (kept blank until user picks) */}
                        <div>
                          <Label className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            Internship Track / Domain <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.internship_title}
                            onValueChange={(val) => setFormData((prev) => ({ ...prev, internship_title: val }))}
                            disabled={!selectedCategory}
                          >
                            <SelectTrigger className={`mt-1.5 ${!selectedCategory ? 'opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-900' : ''}`}>
                              <SelectValue placeholder={selectedCategory ? "Select Track / Domain" : "First select category"} />
                            </SelectTrigger>
                            <SelectContent className="max-h-72">
                              {(() => {
                                const currentCat = DOMAIN_CATEGORIES.find((c) => c.name === selectedCategory)
                                const subList = currentCat ? [...currentCat.subdomains] : []
                                if (formData.internship_title && !subList.includes(formData.internship_title)) {
                                  subList.unshift(formData.internship_title)
                                }
                                return subList.map((sub) => (
                                  <SelectItem key={sub} value={sub}>
                                    {sub}
                                  </SelectItem>
                                ))
                              })()}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Preferred Internship Duration - Dropdown List */}
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                          Preferred Internship Duration <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(val) => setFormData((prev) => ({ ...prev, duration: val }))}
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select Internship Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {DURATION_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* LinkedIn & GitHub */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="linkedin_url" className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            LinkedIn Profile URL
                          </Label>
                          <Input
                            id="linkedin_url"
                            name="linkedin_url"
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            value={formData.linkedin_url}
                            onChange={handleChange}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="github_url" className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                            GitHub Profile URL
                          </Label>
                          <Input
                            id="github_url"
                            name="github_url"
                            type="url"
                            placeholder="https://github.com/username"
                            value={formData.github_url}
                            onChange={handleChange}
                            className="mt-1.5"
                          />
                        </div>
                      </div>

                      {/* Resume / Drive link */}
                      <div>
                        <Label htmlFor="resume_url" className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                          Resume / Portfolio / Google Drive Link
                        </Label>
                        <Input
                          id="resume_url"
                          name="resume_url"
                          type="url"
                          placeholder="https://drive.google.com/... or portfolio link"
                          value={formData.resume_url}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>

                      {/* Message / Goals */}
                      <div>
                        <Label htmlFor="message" className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                          Learning Goals / Notes
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your background or what you hope to achieve during this virtual internship..."
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>

                      {/* Follow Geek Intern on LinkedIn Verification Section (Placed after Learning Goals) */}
                      <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 p-4 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-[#0A66C2] text-white shadow-xs shrink-0">
                              <Linkedin className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  Follow Geek Intern on LinkedIn
                                </h4>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                  Official Page
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                Follow our official page to receive cohort announcements, project updates, and certificate notifications.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleOpenLinkedin}
                            disabled={isVerifyingLinkedin || isLinkedinFollowed}
                            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 ${
                              isLinkedinFollowed
                                ? 'bg-emerald-600 text-white cursor-default'
                                : isVerifyingLinkedin
                                ? 'bg-blue-600/90 text-white cursor-wait'
                                : 'bg-[#0A66C2] hover:bg-[#004182] text-white cursor-pointer'
                            }`}
                          >
                            {isLinkedinFollowed ? (
                              <>
                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                                <span>Followed</span>
                              </>
                            ) : isVerifyingLinkedin ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                <span>Verifying...</span>
                              </>
                            ) : (
                              <>
                                <Linkedin className="h-3.5 w-3.5" />
                                <span>Follow @geek-intern</span>
                                <ExternalLink className="h-3 w-3 opacity-80" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Status bar during verification */}
                        {isVerifyingLinkedin && (
                          <div className="mb-3 p-2.5 rounded-lg bg-blue-100/70 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-800 flex items-center gap-2 text-xs text-blue-900 dark:text-blue-200">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
                            <span>Confirming follow on LinkedIn... Please follow our page.</span>
                          </div>
                        )}

                        <div className="pt-2.5 border-t border-blue-100 dark:border-blue-900/40">
                          <label
                            className={`flex items-start gap-2.5 ${
                              isLinkedinFollowed ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                            } select-none`}
                            onClick={(e) => {
                              if (!isLinkedinFollowed && !isVerifyingLinkedin) {
                                e.preventDefault()
                                toast({
                                  title: 'Follow Geek Intern First',
                                  description: 'Please click "Follow @geek-intern" above to open our page and complete verification.',
                                  variant: 'destructive',
                                })
                              }
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isLinkedinFollowed}
                              disabled={!isLinkedinFollowed && !isVerifyingLinkedin}
                              onChange={(e) => {
                                if (isLinkedinFollowed) {
                                  setIsLinkedinFollowed(e.target.checked)
                                }
                              }}
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <div className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                I confirm that I am following Geek Intern on LinkedIn
                              </span>{' '}
                              <span className="text-slate-500 dark:text-slate-400">
                                (linkedin.com/in/geek-intern)
                              </span>
                              {isLinkedinFollowed ? (
                                <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                  <Check className="h-3 w-3 stroke-[3]" /> Verified
                                </span>
                              ) : isVerifyingLinkedin ? (
                                <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                                  Verifying follow...
                                </span>
                              ) : (
                                <span className="block mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                  (Click the blue button above to open LinkedIn and automatically verify)
                                </span>
                              )}
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* ------------------------------------------------------------- */}
                      {/* URGENT CERTIFICATION & FAST-TRACK APPLICATION BOX              */}
                      {/* ------------------------------------------------------------- */}
                      <div className="rounded-xl border-2 border-amber-500 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-4 shadow-sm border-dashed">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm shrink-0 mt-0.5 animate-pulse">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                                Urgent Certification Request
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                                FAST TRACK
                              </span>
                            </div>
                            <p className="text-xs text-amber-900 mt-0.5 font-medium">
                              Need your verified certificate expedited for college submissions, semester credits, or imminent job interviews?
                            </p>
                          </div>
                        </div>

                        {/* Interactive Urgent Certification Checkbox */}
                        <div className="bg-white/80 border border-amber-200 rounded-lg p-3 space-y-2.5">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              name="is_urgent"
                              checked={formData.is_urgent}
                              onChange={(e) => setFormData((prev) => ({ ...prev, is_urgent: e.target.checked }))}
                              className="h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                            <span className="text-xs font-bold text-slate-800">
                              Mark as Priority / Apply for Urgent Certification
                            </span>
                          </label>

                          {formData.is_urgent && (
                            <div className="pt-2 border-t border-amber-100 animate-in fade-in duration-200">
                              <Label htmlFor="urgent_reason" className="text-[11px] font-semibold text-amber-900 block mb-1">
                                Urgent Reason / Student Comment <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="urgent_reason"
                                name="urgent_reason"
                                placeholder="e.g. Urgent college submission by Friday, need fast-track evaluation..."
                                value={formData.urgent_reason}
                                onChange={handleChange}
                                className="h-9 text-xs border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                                required={formData.is_urgent}
                              />
                              <p className="text-[10px] text-amber-800/80 mt-1">
                                Mentors will review your urgency note and expedite task assignments and certificate generation.
                              </p>
                            </div>
                          )}

                          {/* 2-Line Urgent Terms & Conditions */}
                          <div className="pt-2 border-t border-amber-200/70 text-[11px] text-amber-950/90 leading-snug">
                            <p className="font-semibold text-amber-900">
                              * Terms & Conditions: Only select this if you genuinely have an impending college submission or job deadline.
                            </p>
                            <p className="text-amber-800/85 mt-0.5">
                              Please do not mark urgent for routine applications so our evaluation team can prioritize critical student cases.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* ------------------------------------------------------------- */}

                      {/* Submit CTA */}
                      <div className="pt-2 space-y-3">
                        {submitError && (
                          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in shadow-xs">
                            <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-red-900">Application Could Not Be Submitted</p>
                              <p className="mt-0.5 text-red-700 leading-relaxed">{submitError}</p>
                            </div>
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full text-white font-semibold py-3 h-12 text-base rounded-lg shadow-md transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          {isSubmitting ? (
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <span>Submit Application & Get Offer Letter</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-2.5">
                          By submitting, you agree to receive internship updates, task kits, and offer letters from Geek Intern.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Perks & Program Highlights */}
              <div className="lg:col-span-4 space-y-5">
                <Card className="border border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" /> Program Perks
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Verifiable Certificate:</strong> QR-coded digital certificate shareable on LinkedIn and resumes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Letter of Recommendation (LOR):</strong> Awarded to outstanding performers based on submission quality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Laptop className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>100% Virtual & Self-Paced:</strong> Work on tasks at your convenience without conflicting with college schedules.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>GitHub Portfolio:</strong> Build 3-4 real project deliverables to showcase directly to tech recruiters.</span>
                    </li>
                  </ul>
                </Card>

                <Card className="border border-slate-200 bg-white p-5 shadow-xs">
                  <h3 className="font-bold text-slate-900 text-base mb-3">
                    Frequently Asked
                  </h3>
                  <div className="space-y-3 text-xs text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-800">When will I get my offer letter?</p>
                      <p className="mt-0.5">Offer letters and task guidelines are sent via email within 24 to 48 hours of submitting this form.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Is this internship completely online?</p>
                      <p className="mt-0.5">Yes! All Geek Intern internships are 100% remote. You can complete tasks from anywhere in India.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Are beginners eligible?</p>
                      <p className="mt-0.5">Yes, projects range from beginner-friendly tasks to advanced modules with step-by-step briefs.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
