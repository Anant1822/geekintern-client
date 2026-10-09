import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Award,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap,
  Calendar,
  AlertCircle,
  FileCheck,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Share2,
  Send,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import api from '@/services/api'
import { authService } from '@/services/auth'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/auth.store'

interface DirectApplication {
  id: string
  full_name: string
  email: string
  phone: string
  college_name: string
  branch: string
  internship_title: string
  duration: string
  status: string
  created_at: string
}

interface Certificate {
  id: string
  certificate_id: string
  student_name: string
  domain: string
  duration: string
  issue_date: string
  grade: string
  status: string
  image_url?: string | null
}

interface OfferLetter {
  id: string
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  image_url?: string | null
  uploaded_at?: string | null
}

interface PortalData {
  student: {
    name: string
    email: string
    phone: string
    college: string
    branch: string
  }
  applications: DirectApplication[]
  certificates: Certificate[]
  offer_letters?: OfferLetter[]
}

export default function StudentLogin() {
  const [searchParams] = useSearchParams()
  const initialIdentifier = searchParams.get('email') || searchParams.get('id') || ''

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [portalData, setPortalData] = useState<PortalData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'certificates' | 'offer_letters' | 'applications'>('certificates')
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [selectedOfferLetter, setSelectedOfferLetter] = useState<OfferLetter | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const certPrintRef = useRef<HTMLDivElement>(null)

  // Email Not Registered popup modal state
  const [showNotRegisteredModal, setShowNotRegisteredModal] = useState(false)
  const [notRegisteredEmail, setNotRegisteredEmail] = useState('')

  const { user: authUser, signOut: authSignOut } = useAuth()
  const setAuthUser = useAuthStore((s) => s.setUser)
  const setAuthAdmin = useAuthStore((s) => s.setAdmin)

  // Auto-populate email if passed in query param
  useEffect(() => {
    if (initialIdentifier && !email) {
      setEmail(initialIdentifier)
    }
  }, [initialIdentifier])

  // Check whether an email is registered / has an active application
  const checkIsStudentRegistered = async (userEmail: string): Promise<boolean> => {
    const cleanEmail = userEmail.trim().toLowerCase()
    if (!cleanEmail || !cleanEmail.includes('@')) return false

    // 1. Check backend API first if online
    try {
      const res = await api.post('/certificates/check-registered', { email: cleanEmail })
      if (res.data?.success && typeof res.data?.data?.isRegistered === 'boolean') {
        return res.data.data.isRegistered
      }
    } catch (apiErr: any) {
      if (apiErr?.response?.status === 404) {
        return false
      }
      console.warn('Backend check-registered notice, checking direct Supabase:', apiErr?.message)
    }

    // 2. Direct Supabase / Cloud Checks (Guaranteed to work on production / Vercel client)
    try {
      // A. Check student_applicants_registry in app_settings
      const { data: regRow } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'student_applicants_registry')
        .maybeSingle()

      if (regRow?.value) {
        try {
          const regMap = JSON.parse(regRow.value)
          if (regMap && regMap[cleanEmail]) {
            return true
          }
        } catch {}
      }

      // B. Check offer_letters_library in app_settings
      const { data: olSettingRow } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'offer_letters_library')
        .maybeSingle()

      if (olSettingRow?.value) {
        try {
          const olMap = JSON.parse(olSettingRow.value)
          const allLetters: any[] = Object.values(olMap)
          const hasLetter = allLetters.some(
            (l) => l.email && l.email.toLowerCase().trim() === cleanEmail
          )
          if (hasLetter) return true
        } catch {}
      }

      // C. Check direct_applications table
      try {
        const { data: directApps } = await supabase
          .from('direct_applications')
          .select('id')
          .ilike('email', cleanEmail)
          .limit(1)

        if (directApps && directApps.length > 0) {
          return true
        }
      } catch {}

      // D. Check certificates table
      try {
        const { data: certs } = await supabase
          .from('certificates')
          .select('id')
          .ilike('student_name', cleanEmail)
          .limit(1)

        if (certs && certs.length > 0) {
          return true
        }
      } catch {}
    } catch (directErr) {
      console.warn('Supabase direct registration check notice:', directErr)
    }

    return false
  }

  // Helper to load student records from backend or Supabase direct
  const loadPortalDataForUser = async (userEmail: string) => {
    const cleanEmail = userEmail.trim().toLowerCase()
    let loadedData: PortalData | null = null

    // 1. Try backend API first (when running with active backend)
    try {
      const res = await api.post('/certificates/portal-login', { identifier: cleanEmail })
      if (res.data?.success && res.data?.data) {
        loadedData = res.data.data
      }
    } catch (err: any) {
      console.warn('Backend portal-login unavailable, checking Supabase direct cloud records...', err?.message)
    }

    // 2. Direct Supabase Fallback (Guaranteed to work on production / Vercel client)
    if (!loadedData) {
      try {
        // A. Look up matching offer letters from app_settings
        let offerLetters: OfferLetter[] = []
        try {
          const { data: olSettingRow } = await supabase
            .from('app_settings')
            .select('value')
            .eq('key', 'offer_letters_library')
            .maybeSingle()

          if (olSettingRow?.value) {
            const olMap = JSON.parse(olSettingRow.value)
            const allLetters: any[] = Object.values(olMap)
            offerLetters = allLetters.filter(
              (l) => (l.email && l.email.toLowerCase().trim() === cleanEmail)
            )
          }
        } catch (olErr) {
          console.warn('Supabase offer letter lookup notice:', olErr)
        }

        // B. Look up applicant details from cloud registry or profile
        let studentApplicant: any = null
        try {
          const { data: regRow } = await supabase
            .from('app_settings')
            .select('value')
            .eq('key', 'student_applicants_registry')
            .maybeSingle()

          if (regRow?.value) {
            const regMap = JSON.parse(regRow.value)
            studentApplicant = regMap[cleanEmail] || null
          }
        } catch (regErr) {
          console.warn('Supabase applicants registry lookup notice:', regErr)
        }

        // C. Look up student name from applicant info or offer letter
        const studentName = studentApplicant?.full_name || offerLetters[0]?.student_name || 'Student'

        // D. Look up verified certificates matching student name
        let certificates: Certificate[] = []
        try {
          const { data: certData } = await supabase
            .from('certificates')
            .select('*')
            .ilike('student_name', studentName)

          if (certData && certData.length > 0) {
            // Enrich with cloud image url if available
            let imageMap: Record<string, { image_url: string }> = {}
            try {
              const { data: imgRow } = await supabase
                .from('app_settings')
                .select('value')
                .eq('key', 'certificate_images_library')
                .maybeSingle()
              if (imgRow?.value) {
                imageMap = JSON.parse(imgRow.value)
              }
            } catch {
              imageMap = {}
            }

            certificates = certData.map((c: any) => {
              const certKey = (c.certificate_id || '').toUpperCase().trim()
              return {
                ...c,
                image_url: imageMap[certKey]?.image_url || null,
              }
            })
          }
        } catch (certErr) {
          console.warn('Supabase certificates lookup notice:', certErr)
        }

        // Prepare applications list
        const applications: DirectApplication[] = studentApplicant
          ? [
              {
                id: studentApplicant.id || 'app_direct',
                full_name: studentApplicant.full_name || studentName,
                email: cleanEmail,
                phone: studentApplicant.phone || '',
                college_name: studentApplicant.college_name || '',
                branch: studentApplicant.branch || '',
                internship_title: studentApplicant.internship_title || offerLetters[0]?.domain || 'Virtual Internship',
                duration: studentApplicant.duration || offerLetters[0]?.duration || '4 Weeks',
                status: studentApplicant.status || 'offer_sent',
                created_at: studentApplicant.created_at || new Date().toISOString(),
              },
            ]
          : []

        // If we found any student records, build the portal dataset
        if (offerLetters.length > 0 || certificates.length > 0 || applications.length > 0 || studentApplicant) {
          loadedData = {
            student: {
              name: studentName,
              email: cleanEmail,
              phone: studentApplicant?.phone || '',
              college: studentApplicant?.college_name || '',
              branch: studentApplicant?.branch || '',
            },
            applications,
            certificates,
            offer_letters: offerLetters,
          }
        }
      } catch (directErr) {
        console.error('Supabase direct portal fetch error:', directErr)
      }
    }

    if (loadedData) {
      setPortalData(loadedData)
      if (loadedData.certificates && loadedData.certificates.length > 0) {
        setSelectedCert(loadedData.certificates[0])
        setActiveTab('certificates')
      } else if (loadedData.offer_letters && loadedData.offer_letters.length > 0) {
        setSelectedOfferLetter(loadedData.offer_letters[0])
        setActiveTab('offer_letters')
      } else {
        setActiveTab('applications')
      }
      if (loadedData.offer_letters && loadedData.offer_letters.length > 0) {
        setSelectedOfferLetter(loadedData.offer_letters[0])
      }
      return true
    }

    return false
  }

  // If already logged into Supabase Auth and no portal data loaded, load user's data
  useEffect(() => {
    if (authUser?.email && !portalData) {
      loadPortalDataForUser(authUser.email)
    }
  }, [authUser?.email])

  // Countdown timer for resending OTP
  useEffect(() => {
    let interval: any = null
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'forgot_password'>('login')

  // Forgot password OTP flow states
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotOtp, setForgotOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [forgotStep, setForgotStep] = useState<'request_otp' | 'verify_and_reset'>('request_otp')

  // Step 1: Handle Email and Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    if (!cleanPassword) {
      setErrorMsg('Please enter your password.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    // Check if the student is registered or applied
    try {
      const isRegistered = await checkIsStudentRegistered(cleanEmail)
      if (!isRegistered) {
        setIsLoading(false)
        setNotRegisteredEmail(cleanEmail)
        setShowNotRegisteredModal(true)
        setErrorMsg(`The email "${cleanEmail}" was not found in our records. Please submit an internship application first.`)
        return
      }
    } catch (checkErr) {
      console.warn('Registration pre-check notice:', checkErr)
    }

    let authenticated = false

    // 1. Authenticate with Supabase Auth
    try {
      const { data: authData, error: authError } = await authService.signIn(cleanEmail, cleanPassword)
      if (!authError && authData?.user) {
        authenticated = true
        setAuthUser(authData.user)
      } else if (authError) {
        console.warn('Supabase signIn notice:', authError.message)
      }
    } catch (sbErr: any) {
      console.warn('Supabase auth exception:', sbErr?.message)
    }

    // 2. Try backend verify-password endpoint
    if (!authenticated) {
      try {
        const res = await api.post('/certificates/verify-password', {
          email: cleanEmail,
          password: cleanPassword,
        })
        if (res.data?.success && res.data?.data) {
          authenticated = true
          const data: PortalData = res.data.data
          setPortalData(data)
          if (data.certificates && data.certificates.length > 0) {
            setSelectedCert(data.certificates[0])
            setActiveTab('certificates')
          } else if (data.offer_letters && data.offer_letters.length > 0) {
            setSelectedOfferLetter(data.offer_letters[0])
            setActiveTab('offer_letters')
          } else {
            setActiveTab('applications')
          }
          if (data.offer_letters && data.offer_letters.length > 0) {
            setSelectedOfferLetter(data.offer_letters[0])
          }
          setIsLoading(false)
          return
        }
      } catch (apiErr: any) {
        console.warn('Backend verify-password notice:', apiErr?.response?.data?.message)
      }
    }

    // 3. If authenticated via Supabase, load portal data
    if (authenticated) {
      const loaded = await loadPortalDataForUser(cleanEmail)
      setIsLoading(false)
      if (loaded) {
        return
      } else {
        setNotRegisteredEmail(cleanEmail)
        setShowNotRegisteredModal(true)
        setErrorMsg(`No active application or certificate records found for "${cleanEmail}".`)
        return
      }
    }

    setIsLoading(false)
    setErrorMsg('Invalid email or password. Please check your credentials or click "Forgot Password?".')
  }

  // Step 2: Handle Forgot Password - Send OTP
  const handleSendForgotPasswordOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const targetEmail = (forgotEmail || email).trim().toLowerCase()

    if (!targetEmail || !targetEmail.includes('@')) {
      setErrorMsg('Please enter your registered email address.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    // Check if the student is registered
    const isRegistered = await checkIsStudentRegistered(targetEmail)
    if (!isRegistered) {
      setIsLoading(false)
      setNotRegisteredEmail(targetEmail)
      setShowNotRegisteredModal(true)
      setErrorMsg(`The email "${targetEmail}" is not registered. Please submit an internship application.`)
      return
    }

    try {
      // 1. Dispatch via backend endpoint
      let dispatched = false
      try {
        const res = await api.post('/certificates/forgot-password-otp', { email: targetEmail })
        if (res.data?.success) {
          dispatched = true
        }
      } catch (apiErr: any) {
        console.warn('Backend forgot-password-otp notice:', apiErr?.message)
      }

      // 2. Fallback / supplementary reset email via Supabase Auth
      try {
        await authService.resetPassword(targetEmail)
        dispatched = true
      } catch (sbErr) {
        console.warn('Supabase resetPassword notice:', sbErr)
      }

      if (dispatched) {
        setForgotEmail(targetEmail)
        setForgotStep('verify_and_reset')
        setOtpTimer(60)
        setSuccessMsg(`A 6-digit password reset OTP code has been sent to ${targetEmail}. Please check your inbox or spam.`)
      } else {
        setErrorMsg('Unable to dispatch reset code at this moment. Please try again.')
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || 'Failed to dispatch reset code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 3: Handle Reset Password using OTP
  const handleResetPasswordWithOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const targetEmail = forgotEmail.trim().toLowerCase()
    const cleanOtp = forgotOtp.trim()
    const cleanPass = newPassword.trim()

    if (!cleanOtp || cleanOtp.length < 4) {
      setErrorMsg('Please enter the 6-digit OTP code sent to your email.')
      return
    }

    if (!cleanPass || cleanPass.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.')
      return
    }

    if (cleanPass !== confirmPassword.trim()) {
      setErrorMsg('Passwords do not match. Please re-enter.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    let resetSuccess = false

    // 1. Try backend reset-password-with-otp endpoint
    try {
      const res = await api.post('/certificates/reset-password-with-otp', {
        email: targetEmail,
        otp: cleanOtp,
        newPassword: cleanPass,
      })
      if (res.data?.success) {
        resetSuccess = true
      }
    } catch (apiErr: any) {
      console.warn('Backend reset-password-with-otp error:', apiErr?.response?.data?.message)
    }

    // 2. Try Supabase Auth verifyOtp with type 'recovery'
    if (!resetSuccess) {
      try {
        const { data: recData, error: recErr } = await supabase.auth.verifyOtp({
          email: targetEmail,
          token: cleanOtp,
          type: 'recovery',
        })
        if (!recErr && recData?.user) {
          const { error: updErr } = await supabase.auth.updateUser({ password: cleanPass })
          if (!updErr) {
            resetSuccess = true
          }
        }
      } catch (sbErr) {
        console.warn('Supabase recovery verifyOtp notice:', sbErr)
      }
    }

    setIsLoading(false)

    if (resetSuccess) {
      setSuccessMsg('Your password has been reset successfully! Please sign in with your new password.')
      setEmail(targetEmail)
      setPassword(cleanPass)
      setAuthMode('login')
      setForgotStep('request_otp')
      setForgotOtp('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setErrorMsg('Invalid or expired OTP code. Please check your email or request a new code.')
    }
  }


  const handlePrint = () => {
    window.print()
  }

  const handleShare = (certId: string) => {
    const url = `${window.location.origin}/verify?id=${encodeURIComponent(certId)}`
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white font-medium">Completed & Certified</Badge>
      case 'selected':
        return <Badge className="bg-[#181615] hover:bg-[#2A2724] text-white font-medium">Selected / In Progress</Badge>
      case 'under_review':
        return <Badge className="bg-amber-500 hover:bg-amber-500 text-white font-medium">Under Review</Badge>
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-500 text-white font-medium">Application Closed</Badge>
      default:
        return <Badge className="bg-slate-500 hover:bg-slate-500 text-white font-medium">Application Received</Badge>
    }
  }

  return (
    <PublicLayout>
      <PageTitle title="Student Login & Certificate Portal | Geek Intern" />

      <div className="min-h-[80vh] bg-[#F5F2EB] bg-dot-matrix py-10 md:py-16">
        {/* Email Not Registered / Applied Popup Modal */}
        <Dialog
          open={showNotRegisteredModal}
          onOpenChange={(open) => {
            setShowNotRegisteredModal(open)
            if (!open) {
              setOtpSent(false)
              setOtp('')
            }
          }}
        >
          <DialogContent className="sm:max-w-md p-6 bg-[#FAF7F2] border border-[#E2DDD2] shadow-2xl rounded-2xl">
            <DialogHeader className="space-y-3 text-center sm:text-center items-center">
              <div className="h-16 w-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="h-8 w-8" />
              </div>
              <DialogTitle className="text-xl font-bold text-[#1A1715]">
                Email Not Registered / Applied
              </DialogTitle>
              <DialogDescription className="text-sm text-[#57534E] leading-relaxed text-center">
                The email address{' '}
                <span className="font-semibold text-[#1A1715] bg-[#EBE6DC] px-2 py-0.5 rounded break-all">
                  {notRegisteredEmail || email}
                </span>{' '}
                was not found in our records. No internship application or enrolled student account exists with this email.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1 my-1">
              <p className="font-semibold flex items-center gap-1.5 text-amber-800">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-600" />
                Want to join Geek Intern?
              </p>
              <p className="text-amber-700 leading-relaxed">
                Submit your internship application in just 2 minutes to receive your offer letter and activate your student portal.
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2.5 pt-2 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowNotRegisteredModal(false)
                  setOtpSent(false)
                  setOtp('')
                }}
                className="w-full sm:w-1/2 border-[#D6CFC4] text-[#57534E] hover:bg-[#EBE6DC] font-medium"
              >
                Try Another Email
              </Button>
              <Button
                asChild
                className="w-full sm:w-1/2 bg-[#181615] hover:bg-[#2A2724] text-white font-semibold rounded-full shadow-xs"
              >
                <Link to={`/apply?email=${encodeURIComponent(notRegisteredEmail || email)}`}>
                  Apply for Internship <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBE6DC] border border-[#E2DDD2] text-[#2D6A4F] text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-[#2D6A4F]" />
              <span>Encrypted Student Credential Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1715] tracking-tight">
              Student Login & Certificate Access
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#57534E]">
              Sign in with your registered email and password to access your verified internship certificates, offer letters, and academic credentials.
            </p>
          </div>

          {!portalData ? (
            /* Student Authentication Card */
            <Card className="max-w-md mx-auto border-[#E2DDD2] shadow-xl bg-[#FAF7F2] rounded-2xl overflow-hidden">
              <div className="bg-[#181615] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    {authMode === 'login' ? (
                      <>
                        <Lock className="h-5 w-5 text-[#E2DDD2]" />
                        Student Account Login
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-5 w-5 text-amber-300" />
                        Reset Student Password
                      </>
                    )}
                  </h2>
                  <Badge className="bg-[#FAF7F2]/20 text-white text-[10px] border-0">256-bit Encrypted</Badge>
                </div>
                <p className="text-xs text-[#D6CFC4] mt-1">
                  {authMode === 'login'
                    ? 'Enter your email and password to access your credentials'
                    : 'Verify your identity via 6-digit OTP sent to your email'}
                </p>
              </div>

              <CardContent className="p-6 sm:p-8 space-y-5">
                {successMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                    <div className="leading-relaxed">{successMsg}</div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                    <div className="leading-relaxed">{errorMsg}</div>
                  </div>
                )}

                {authMode === 'login' ? (
                  /* Standard Email & Password Login Form */
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#57534E]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pr-10 h-11 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-sm"
                          disabled={isLoading}
                          required
                        />
                        <div className="absolute right-3 top-3 text-[#78716C]">
                          <Mail className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#57534E]">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setAuthMode('forgot_password')
                            setForgotEmail(email)
                            setForgotStep('request_otp')
                            setErrorMsg(null)
                            setSuccessMsg(null)
                          }}
                          className="text-[11px] text-[#2D6A4F] hover:text-[#2D6A4F] hover:underline font-semibold"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 h-11 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-sm"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-[#78716C] hover:text-[#57534E]"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || !email.trim() || !password.trim()}
                      className="w-full h-11 bg-[#181615] hover:bg-[#2A2724] text-white font-semibold rounded-full shadow-xs text-sm transition-all mt-2"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Logging In...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Sign In to Student Portal
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Forgot Password Flow (OTP based) */
                  <div className="space-y-4">
                    {forgotStep === 'request_otp' ? (
                      <form onSubmit={handleSendForgotPasswordOtp} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#57534E]">
                            Registered Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type="email"
                              placeholder="Enter your registered email"
                              value={forgotEmail || email}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              className="pr-10 h-11 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-sm"
                              disabled={isLoading}
                              required
                            />
                            <div className="absolute right-3 top-3 text-[#78716C]">
                              <Mail className="h-5 w-5" />
                            </div>
                          </div>
                          <p className="text-[11px] text-[#57534E]">
                            We will send a 6-digit verification code to reset your password.
                          </p>
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading || !(forgotEmail || email).trim()}
                          className="w-full h-11 bg-[#181615] hover:bg-[#2A2724] text-white font-semibold rounded-full shadow-xs text-sm transition-all"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending OTP...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Send Reset OTP Code
                              <Send className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleResetPasswordWithOtp} className="space-y-3.5">
                        <div className="bg-[#EBE6DC]/70 border border-[#E2DDD2] rounded-xl p-3 text-xs text-[#1A1715] flex items-center justify-between">
                          <div className="truncate mr-2">
                            Reset code sent to: <span className="font-semibold">{forgotEmail}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setForgotStep('request_otp')
                              setForgotOtp('')
                              setErrorMsg(null)
                            }}
                            className="text-[#2D6A4F] font-semibold underline shrink-0 hover:text-[#181615]"
                          >
                            Change
                          </button>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#57534E]">
                            Enter 6-Digit OTP Code <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            maxLength={6}
                            placeholder="• • • • • •"
                            value={forgotOtp}
                            onChange={(e) => setForgotOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            className="h-11 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-center font-mono text-lg tracking-[0.3em] font-bold"
                            disabled={isLoading}
                            autoFocus
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#57534E]">
                            New Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Input
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder="Minimum 6 characters"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="pr-10 h-10 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-sm"
                              disabled={isLoading}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-2.5 text-[#78716C] hover:text-[#57534E]"
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#57534E]">
                            Confirm New Password <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="password"
                            placeholder="Re-type your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-10 border-[#D6CFC4] bg-[#FAF7F2] text-[#1A1715] focus:border-[#181615] focus:ring-[#181615] text-sm"
                            disabled={isLoading}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isLoading || forgotOtp.length < 4 || newPassword.length < 6 || !confirmPassword}
                          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 text-sm transition-all mt-2"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Resetting Password...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Verify OTP & Set New Password
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                          )}
                        </Button>

                        <div className="text-center pt-1">
                          <button
                            type="button"
                            disabled={otpTimer > 0 || isLoading}
                            onClick={() => handleSendForgotPasswordOtp()}
                            className="text-xs text-[#2D6A4F] hover:underline disabled:text-[#78716C] font-medium"
                          >
                            {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Resend Verification Code'}
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login')
                          setErrorMsg(null)
                          setSuccessMsg(null)
                        }}
                        className="text-xs text-[#57534E] hover:text-[#1A1715] inline-flex items-center gap-1 font-medium"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to Password Sign In
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E2DDD2] flex flex-col gap-2.5 text-center">
                  <p className="text-xs text-[#57534E]">
                    Need to submit an internship application?{' '}
                    <Link to="/apply" className="font-semibold text-[#2D6A4F] hover:underline">
                      Apply Now ↗
                    </Link>
                  </p>
                  <p className="text-xs text-[#57534E]">
                    Recruiter or Verification Agency?{' '}
                    <Link to="/verify" className="font-semibold text-[#2D6A4F] hover:underline">
                      Public Certificate Verification ↗
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Student Portal Dashboard View */
            <div className="space-y-8">
              {/* Profile Card & Back Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F2] border border-[#E2DDD2] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#181615] text-white flex items-center justify-center font-bold text-xl shadow-md">
                    {portalData.student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#1A1715]">{portalData.student.name}</h2>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                        Verified Student
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#57534E] mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-[#78716C]" />
                        {portalData.student.email}
                      </span>
                      {portalData.student.college && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5 text-[#78716C]" />
                          {portalData.student.college}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setPortalData(null)
                      if (authUser) {
                        await authSignOut()
                      }
                    }}
                    className="text-xs text-[#57534E] border-[#E2DDD2] hover:bg-[#F5F2EB]"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                    Sign Out / Switch Student
                  </Button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#E2DDD2] pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('certificates')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'certificates'
                      ? 'bg-[#181615] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#EBE6DC]'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>Verified Certificates ({portalData.certificates.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('offer_letters')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'offer_letters'
                      ? 'bg-[#181615] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#EBE6DC]'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span>My Offer Letter ({(portalData.offer_letters || []).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('applications')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'applications'
                      ? 'bg-[#181615] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#EBE6DC]'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>My Applications ({portalData.applications.length})</span>
                </button>
              </div>

              {/* Tab 1: Certificates View */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  {portalData.certificates.length === 0 ? (
                    <Card className="border-dashed border-2 border-[#E2DDD2] bg-[#FAF7F2] p-8 text-center rounded-2xl">
                      <Award className="h-12 w-12 text-[#A8A29E] mx-auto mb-3" />
                      <h3 className="text-base font-bold text-[#1A1715]">Certificate In Progress</h3>
                      <p className="text-xs text-[#57534E] max-w-md mx-auto mt-1 mb-4">
                        Your internship application is active. Your verifiable certificate will automatically appear
                        here upon internship completion and review by the Geek Intern mentors.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab('applications')}
                        className="bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs text-xs"
                      >
                        Check Application Status
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Certificate Selector List (if multiple) */}
                      {portalData.certificates.length > 1 && (
                        <div className="space-y-3 lg:col-span-1">
                          <h4 className="text-xs font-bold text-[#57534E] uppercase tracking-wider">
                            Available Credentials
                          </h4>
                          {portalData.certificates.map((cert) => (
                            <div
                              key={cert.certificate_id}
                              onClick={() => setSelectedCert(cert)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedCert?.certificate_id === cert.certificate_id
                                  ? 'border-[#181615] bg-[#EBE6DC]/60 shadow-sm'
                                  : 'border-[#E2DDD2] bg-[#FAF7F2] hover:border-[#D6CFC4]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-[#1A1715]">{cert.domain}</span>
                                <Badge className="bg-emerald-600 text-white text-[10px]">Verified</Badge>
                              </div>
                              <p className="text-xs text-[#57534E] mt-1 font-mono">ID: {cert.certificate_id}</p>
                              <p className="text-xs text-[#78716C] mt-0.5">Issued: {cert.issue_date}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Certificate Card & Actions */}
                      <div className={portalData.certificates.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        {selectedCert && (
                          <div className="space-y-4">
                            {/* Actions toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2DDD2] shadow-sm">
                              <div>
                                <h3 className="text-sm font-bold text-[#1A1715]">Certificate Actions</h3>
                                <p className="text-xs text-[#57534E]">Official Geek Intern Certified Document</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleShare(selectedCert.certificate_id)}
                                  className="text-xs border-[#D6CFC4] text-[#57534E] hover:bg-[#F5F2EB]"
                                >
                                  <Share2 className="h-3.5 w-3.5 mr-1.5" />
                                  {copiedLink ? 'Link Copied!' : 'Share'}
                                </Button>
                                {selectedCert.image_url && (
                                  <a
                                    href={selectedCert.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5 mr-1.5" />
                                      Download Cloud Certificate
                                    </Button>
                                  </a>
                                )}
                                <Button
                                  size="sm"
                                  onClick={handlePrint}
                                  variant={selectedCert.image_url ? 'outline' : 'default'}
                                  className={selectedCert.image_url ? 'text-xs border-[#D6CFC4]' : 'bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs text-xs font-semibold shadow-sm'}
                                >
                                  <Download className="h-3.5 w-3.5 mr-1.5" />
                                  Print / Save PDF
                                </Button>
                                <Link to={`/verify?id=${encodeURIComponent(selectedCert.certificate_id)}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                  >
                                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                                    Public Verification Page
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Cloud Certificate Image Banner (if uploaded by Admin to cloud library) */}
                            {selectedCert.image_url && (
                              <div className="bg-[#FAF7F2] rounded-2xl border-2 border-emerald-500/40 p-4 sm:p-6 shadow-md">
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2DDD2]">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-emerald-600 text-white text-xs">
                                      Official Cloud Credential
                                    </Badge>
                                    <span className="text-xs text-[#57534E]">Issued by Geek Intern</span>
                                  </div>
                                  <a
                                    href={selectedCert.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#2D6A4F] hover:underline font-semibold inline-flex items-center gap-1"
                                  >
                                    Open Full Size ↗
                                  </a>
                                </div>
                                <div className="rounded-xl overflow-hidden bg-[#F5F2EB] border border-[#E2DDD2] flex items-center justify-center p-2">
                                  <img
                                    src={selectedCert.image_url}
                                    alt={`Certificate ${selectedCert.certificate_id}`}
                                    className="max-h-[600px] w-full object-contain rounded-lg shadow-xs"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Print / Visual Certificate Paper */}
                            <div
                              ref={certPrintRef}
                              className="bg-[#FAF7F2] border-8 border-double border-[#D6CFC4] rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center"
                              style={{ minHeight: '520px' }}
                            >
                              {/* Watermark Logo Background */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                                <Award className="h-96 w-96 text-[#1A1715]" />
                              </div>

                              {/* Corner Badges */}
                              <div className="flex items-center justify-between border-b-2 border-[#E2DDD2] pb-4 mb-6">
                                <div className="text-left">
                                  <span className="font-extrabold text-[#2D6A4F] tracking-wider text-sm sm:text-base">
                                    GEEK INTERN
                                  </span>
                                  <p className="text-[10px] text-[#78716C] uppercase tracking-widest">
                                    Virtual Internship Program
                                  </p>
                                </div>
                                <Badge className="bg-emerald-600 text-white font-mono text-xs px-3 py-1 shadow-sm">
                                  ID: {selectedCert.certificate_id}
                                </Badge>
                              </div>

                              {/* Certificate Header */}
                              <div className="space-y-2 my-4">
                                <h2 className="text-xs uppercase tracking-[0.25em] text-[#57534E] font-semibold">
                                  Certificate of Completion
                                </h2>
                                <p className="text-xs text-[#78716C] italic">This is to certify that</p>
                                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A1715] tracking-tight my-2">
                                  {selectedCert.student_name}
                                </h1>
                                <p className="text-xs sm:text-sm text-[#57534E] max-w-xl mx-auto leading-relaxed">
                                  has successfully completed the intensive practical virtual internship in{' '}
                                  <span className="font-bold text-[#2D6A4F]">{selectedCert.domain}</span> over a duration
                                  of <span className="font-semibold text-[#1A1715]">{selectedCert.duration}</span> with an
                                  overall evaluation grade of{' '}
                                  <span className="font-bold text-emerald-600">Grade {selectedCert.grade}</span>.
                                </p>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-3 gap-4 my-8 py-4 border-y border-[#E2DDD2]/80 max-w-lg mx-auto text-xs">
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Domain</span>
                                  <span className="font-bold text-[#1A1715]">{selectedCert.domain}</span>
                                </div>
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Issue Date</span>
                                  <span className="font-bold text-[#1A1715]">{selectedCert.issue_date}</span>
                                </div>
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Performance</span>
                                  <span className="font-bold text-emerald-600">Grade {selectedCert.grade}</span>
                                </div>
                              </div>

                              {/* Signatures & Seal */}
                              <div className="flex items-center justify-between pt-6 max-w-xl mx-auto text-xs">
                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-[#1A1715] text-sm">Geek Intern Mentor</span>
                                  </div>
                                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block mt-1">
                                    Program Director
                                  </span>
                                </div>

                                <div className="h-16 w-16 rounded-full border-2 border-emerald-500 bg-emerald-50/50 flex flex-col items-center justify-center text-emerald-700 shadow-sm">
                                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                  <span className="text-[8px] font-bold uppercase tracking-tighter">VERIFIED</span>
                                </div>

                                <div className="text-center">
                                  <div className="h-8 border-b border-slate-400 flex items-end justify-center pb-1">
                                    <span className="font-serif italic font-bold text-[#1A1715] text-sm">Academic Board</span>
                                  </div>
                                  <span className="text-[10px] text-[#78716C] uppercase tracking-wider block mt-1">
                                    Evaluation Committee
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Offer Letters View */}
              {activeTab === 'offer_letters' && (
                <div className="space-y-6">
                  {(!portalData.offer_letters || portalData.offer_letters.length === 0) ? (
                    <Card className="border-dashed border-2 border-[#E2DDD2] bg-[#FAF7F2] p-8 text-center rounded-2xl">
                      <Send className="h-12 w-12 text-[#A8A29E] mx-auto mb-3" />
                      <h3 className="text-base font-bold text-[#1A1715]">Offer Letter Under Processing</h3>
                      <p className="text-xs text-[#57534E] max-w-md mx-auto mt-1 mb-4">
                        Your application is currently under review by our mentors. Once selected, your official internship offer letter with verification code will appear here for instant download.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => setActiveTab('applications')}
                        className="bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs text-xs"
                      >
                        Check Application Progression
                      </Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Offer Letter Selector (if multiple) */}
                      {portalData.offer_letters.length > 1 && (
                        <div className="space-y-3 lg:col-span-1">
                          <h4 className="text-xs font-bold text-[#57534E] uppercase tracking-wider">
                            Available Offer Letters
                          </h4>
                          {portalData.offer_letters.map((letter) => (
                            <div
                              key={letter.letter_id}
                              onClick={() => setSelectedOfferLetter(letter)}
                              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedOfferLetter?.letter_id === letter.letter_id
                                  ? 'border-[#181615] bg-[#EBE6DC]/60 shadow-sm'
                                  : 'border-[#E2DDD2] bg-[#FAF7F2] hover:border-[#D6CFC4]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-[#1A1715]">{letter.domain}</span>
                                <Badge className="bg-[#181615] text-white text-[10px]">Official</Badge>
                              </div>
                              <p className="text-xs text-[#57534E] mt-1 font-mono">ID: {letter.letter_id}</p>
                              <p className="text-xs text-[#78716C] mt-0.5">Start: {letter.start_date || 'Immediate'}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Offer Letter Content & Actions */}
                      <div className={portalData.offer_letters.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        {selectedOfferLetter && (
                          <div className="space-y-4">
                            {/* Actions toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2DDD2] shadow-sm">
                              <div>
                                <h3 className="text-sm font-bold text-[#1A1715]">Internship Offer Letter</h3>
                                <p className="text-xs text-[#57534E]">Official Geek Intern Onboarding & Acceptance Document</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {selectedOfferLetter.image_url && (
                                  <a
                                    href={selectedOfferLetter.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="inline-flex"
                                  >
                                    <Button
                                      size="sm"
                                      className="bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs text-xs font-semibold shadow-sm"
                                    >
                                      <Download className="h-3.5 w-3.5 mr-1.5" />
                                      Download Official Document
                                    </Button>
                                  </a>
                                )}
                                <Button
                                  size="sm"
                                  onClick={handlePrint}
                                  variant="outline"
                                  className="text-xs border-[#D6CFC4] text-[#57534E] hover:bg-[#F5F2EB]"
                                >
                                  <Printer className="h-3.5 w-3.5 mr-1.5" />
                                  Print / Save PDF
                                </Button>
                                <Link to={`/verify-offer-letter?id=${encodeURIComponent(selectedOfferLetter.letter_id)}`} target="_blank">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs border-[#D6CFC4] text-[#2D6A4F] hover:bg-[#EBE6DC]"
                                  >
                                    <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-[#2D6A4F]" />
                                    Public Verification Page ↗
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            {/* Cloud Offer Letter Image Banner (if uploaded by Admin) */}
                            {selectedOfferLetter.image_url ? (
                              <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#181615]/30 p-4 sm:p-6 shadow-md">
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2DDD2]">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-[#181615] text-white text-xs">
                                      Official Offer Letter
                                    </Badge>
                                    <span className="text-xs text-[#57534E] font-mono font-bold text-[#2D6A4F]">
                                      Code: {selectedOfferLetter.letter_id}
                                    </span>
                                  </div>
                                  <a
                                    href={selectedOfferLetter.image_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-[#2D6A4F] hover:underline font-semibold inline-flex items-center gap-1"
                                  >
                                    Open Full Size ↗
                                  </a>
                                </div>
                                <div className="rounded-xl overflow-hidden bg-[#F5F2EB] border border-[#E2DDD2] flex items-center justify-center p-2">
                                  {selectedOfferLetter.image_url.endsWith('.pdf') ? (
                                    <iframe
                                      src={selectedOfferLetter.image_url}
                                      title="Offer Letter Document"
                                      className="w-full h-[650px] rounded-lg border"
                                    />
                                  ) : (
                                    <img
                                      src={selectedOfferLetter.image_url}
                                      alt={`Offer Letter ${selectedOfferLetter.letter_id}`}
                                      className="max-h-[700px] w-full object-contain rounded-lg shadow-xs"
                                    />
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {/* Letter Details Card */}
                            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E2DDD2] p-6 sm:p-8 shadow-sm space-y-6">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2DDD2] pb-4">
                                <div>
                                  <span className="text-xs font-bold text-[#2D6A4F] tracking-wider uppercase">
                                    Letter of Engagement / Internship Offer
                                  </span>
                                  <h2 className="text-xl font-bold text-[#1A1715] mt-1">
                                    {selectedOfferLetter.domain}
                                  </h2>
                                </div>
                                <div className="text-right">
                                  <span className="text-[11px] text-[#78716C] block uppercase">Reference Code</span>
                                  <span className="font-mono font-bold text-[#2D6A4F] text-sm">
                                    {selectedOfferLetter.letter_id}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F5F2EB] p-4 rounded-xl border border-[#E2DDD2] text-xs">
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Candidate</span>
                                  <span className="font-bold text-[#1A1715]">{selectedOfferLetter.student_name}</span>
                                </div>
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Duration</span>
                                  <span className="font-bold text-[#1A1715]">{selectedOfferLetter.duration || '4 Weeks'}</span>
                                </div>
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Start Date</span>
                                  <span className="font-bold text-[#1A1715]">{selectedOfferLetter.start_date || 'Immediate'}</span>
                                </div>
                                <div>
                                  <span className="text-[#78716C] block text-[10px] uppercase">Stipend</span>
                                  <span className="font-bold text-emerald-600">{selectedOfferLetter.stipend || 'Performance Based'}</span>
                                </div>
                              </div>

                                {!selectedOfferLetter.image_url && (
                                  <div className="p-4 rounded-xl bg-[#F5F2EB] border border-[#E2DDD2] text-xs text-[#57534E] flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-[#2D6A4F] shrink-0" />
                                    <span>Your official internship offer letter has been recorded by Geek Intern administration. The physical/digital copy will be provided by your coordinators.</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* Tab 3: Applications Tracker View */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  {portalData.applications.length === 0 ? (
                    <Card className="border-[#E2DDD2] bg-[#FAF7F2] p-8 text-center rounded-2xl">
                      <BookOpen className="h-12 w-12 text-[#A8A29E] mx-auto mb-3" />
                      <h3 className="text-base font-bold text-[#1A1715]">No Applications Found</h3>
                      <p className="text-xs text-[#57534E] mt-1 mb-4">
                        You have not submitted an application yet or your record was registered under another email.
                      </p>
                      <Link to="/apply">
                        <Button size="sm" className="bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs text-xs">
                          Apply for Internship Now ↗
                        </Button>
                      </Link>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {portalData.applications.map((app) => (
                        <Card key={app.id} className="border-[#E2DDD2] shadow-sm bg-[#FAF7F2] rounded-2xl overflow-hidden">
                          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2DDD2]">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-[#1A1715]">{app.internship_title}</h3>
                                {getStatusBadge(app.status)}
                              </div>
                              <p className="text-xs text-[#57534E] mt-1 flex items-center gap-2">
                                <span>Duration: {app.duration}</span>
                                <span>•</span>
                                <span>Applied on: {new Date(app.created_at).toLocaleDateString()}</span>
                              </p>
                            </div>

                            {app.status === 'completed' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setActiveTab('certificates')
                                  const matchingCert = portalData.certificates.find(
                                    (c) => c.domain === app.internship_title
                                  )
                                  if (matchingCert) setSelectedCert(matchingCert)
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Award className="h-3.5 w-3.5" />
                                View Certificate
                              </Button>
                            )}
                          </div>

                          {/* Progress Stages Tracker */}
                          <div className="p-5 sm:p-6 bg-[#F5F2EB]">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78716C] mb-3 block">
                              Application Progression
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['applied', 'submitted', 'under_review', 'selected', 'completed'].includes(
                                    app.status.toLowerCase()
                                  )
                                    ? 'bg-[#EBE6DC] border-[#E2DDD2] text-[#2D6A4F] font-semibold'
                                    : 'bg-[#FAF7F2] border-[#E2DDD2] text-[#78716C]'
                                }`}
                              >
                                <span className="text-xs block">1. Applied</span>
                                <span className="text-[10px] text-[#57534E] font-normal">Details Received</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['under_review', 'selected', 'completed'].includes(app.status.toLowerCase())
                                    ? 'bg-[#EBE6DC] border-[#E2DDD2] text-[#2D6A4F] font-semibold'
                                    : 'bg-[#FAF7F2] border-[#E2DDD2] text-[#78716C]'
                                }`}
                              >
                                <span className="text-xs block">2. Under Review</span>
                                <span className="text-[10px] text-[#57534E] font-normal">Profile Evaluation</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  ['selected', 'completed'].includes(app.status.toLowerCase())
                                    ? 'bg-[#EBE6DC] border-[#E2DDD2] text-[#2D6A4F] font-semibold'
                                    : 'bg-[#FAF7F2] border-[#E2DDD2] text-[#78716C]'
                                }`}
                              >
                                <span className="text-xs block">3. In Progress</span>
                                <span className="text-[10px] text-[#57534E] font-normal">Project & Tasks</span>
                              </div>

                              <div
                                className={`p-3 rounded-xl border text-center ${
                                  app.status.toLowerCase() === 'completed'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold'
                                    : 'bg-[#FAF7F2] border-[#E2DDD2] text-[#78716C]'
                                }`}
                              >
                                <span className="text-xs block">4. Certified</span>
                                <span className="text-[10px] text-[#57534E] font-normal">Certificate Issued</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
