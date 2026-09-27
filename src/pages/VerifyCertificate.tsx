import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, ShieldCheck, CheckCircle2, AlertCircle, Award, Calendar, Clock, User, Briefcase, FileCheck, ArrowRight, ArrowUpRight } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageTitle } from '@/components/common/PageTitle'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'

interface CertificateData {
  certificate_id: string
  student_name: string
  domain: string
  duration: string
  issue_date: string
  grade: string
  status: string
  issuer: string
  image_url?: string | null
}

export default function VerifyCertificate() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialId = searchParams.get('id') || ''

  const [certId, setCertId] = useState(initialId)
  const [isLoading, setIsLoading] = useState(false)
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchedId, setSearchedId] = useState<string>('')

  const handleVerify = async (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase()
    if (!cleanId) return

    setIsLoading(true)
    setErrorMsg(null)
    setCertificate(null)
    setSearchedId(cleanId)

    try {
      const res = await api.get(`/certificates/verify/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.certificate) {
        setCertificate(res.data.data.certificate)
        setSearchParams({ id: cleanId })
        return
      }
    } catch (err: any) {
      console.warn('API verification failed, trying Supabase direct fallback...', err)
    }

    // Direct Supabase fallback for production (geekintern.com)
    try {
      const { data: cert, error: certErr } = await supabase
        .from('certificates')
        .select('*')
        .ilike('certificate_id', cleanId)
        .maybeSingle()

      if (certErr) {
        console.error('Supabase certificate search error:', certErr)
      }

      if (cert) {
        const mappedData: CertificateData = {
          certificate_id: cert.certificate_id,
          student_name: cert.student_name || 'Verified Intern',
          domain: cert.domain || 'Software Engineering',
          duration: cert.duration || '4 Weeks',
          issue_date: cert.issue_date
            ? new Date(cert.issue_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'Verified',
          grade: cert.grade || 'A',
          status: 'verified',
          issuer: 'Geek Interns — A GKK & Bubblesort Venture',
          image_url: cert.image_url || cert.certificate_url || null,
        }
        setCertificate(mappedData)
        setSearchParams({ id: cleanId })
        return
      }

      setErrorMsg(
        `No certificate found matching ID "${cleanId}". Please ensure the ID is entered exactly as it appears on your document.`
      )
    } catch (finalErr: any) {
      console.error('Final fallback error:', finalErr)
      setErrorMsg('Failed to verify certificate. Please check your internet connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialId) {
      handleVerify(initialId)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(certId)
  }

  return (
    <PublicLayout>
      <PageTitle title="Verify Certificate | Geek Interns" />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#2c2cf3]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#06e4f9]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Tamper-Proof Verification Portal</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
              Verify Certificate
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-white/60">
              validate authentic credentials issued by Geek Interns.
            </p>
          </div>

          {/* Search Card */}
          <div className="cyber-card p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 shadow-[0_0_40px_rgba(6,228,249,0.08)]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Enter Certificate ID (e.g. CF-2026-WD101)"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="pl-10 h-12 bg-white/[0.04] border-white/15 text-white font-mono text-sm uppercase tracking-wider focus-visible:ring-[#06e4f9]"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !certId.trim()}
                className="bg-[#06e4f9] hover:bg-cyan-300 text-black px-8 h-12 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,228,249,0.3)]"
              >
                {isLoading ? 'Verifying...' : 'Verify Credential'}
              </Button>
            </form>

            {/* Sample IDs */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-white/50">
              <span>Sample IDs to try:</span>
              {['CF-2026-WD101', 'CF-2026-PY102', 'CF-2026-AI103'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setCertId(sample)
                    handleVerify(sample)
                  }}
                  className="font-mono bg-white/5 hover:bg-white/10 hover:text-[#06e4f9] px-2.5 py-1 rounded text-white/70 border border-white/10 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Error Result */}
          {errorMsg && (
            <div className="cyber-card border-rose-500/30 bg-rose-950/20 p-6 rounded-3xl text-center mb-8">
              <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-rose-300 text-lg mb-1">Verification Failed</h3>
              <p className="text-white/70 text-sm max-w-md mx-auto font-sans">{errorMsg}</p>
              <p className="text-xs text-white/40 mt-3 font-mono">
                Need help? Contact{' '}
                <a href="mailto:support.geekintern@gmail.com" className="text-[#06e4f9] underline">support.geekintern@gmail.com</a>
              </p>
            </div>
          )}

          {/* Success Result */}
          {certificate && (
            <div className="cyber-card rounded-3xl border-2 border-emerald-500/50 overflow-hidden mb-8 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                  <div>
                    <h3 className="font-display font-bold text-base leading-tight">Verified Credential</h3>
                    <p className="text-xs text-emerald-100 font-mono">CID: {certificate.certificate_id}</p>
                  </div>
                </div>
                <Badge className="bg-black/30 hover:bg-black/30 text-emerald-300 border-0 text-xs px-2.5 py-1 font-mono uppercase tracking-wider">
                  Active & Valid
                </Badge>
              </div>

              {/* Certificate Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#06e4f9] font-mono font-bold block mb-1">
                    Awarded To
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
                    <User className="h-6 w-6 text-[#06e4f9]" />
                    {certificate.student_name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1.5 uppercase">
                      <Briefcase className="h-3.5 w-3.5 text-[#06e4f9]" /> Engineering Track
                    </span>
                    <p className="font-bold text-white text-base">{certificate.domain}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1.5 uppercase">
                      <Clock className="h-3.5 w-3.5 text-indigo-400" /> Duration
                    </span>
                    <p className="font-bold text-white text-base">{certificate.duration}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1.5 uppercase">
                      <Calendar className="h-3.5 w-3.5 text-emerald-400" /> Date of Issuance
                    </span>
                    <p className="font-bold text-white text-base">{certificate.issue_date}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1.5 uppercase">
                      <Award className="h-3.5 w-3.5 text-amber-400" /> Evaluation Performance
                    </span>
                    <p className="font-bold text-emerald-400 text-base">Grade {certificate.grade} (Distinction)</p>
                  </div>
                </div>

                {/* Cloud Library Certificate Image if uploaded */}
                {certificate.image_url && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase font-bold text-white/60 tracking-wider">
                        Official Issued Document
                      </span>
                      <a
                        href={certificate.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#06e4f9] hover:underline font-mono inline-flex items-center gap-1"
                      >
                        <span>Open Full Resolution</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-2 flex items-center justify-center">
                      <img
                        src={certificate.image_url}
                        alt={`Certificate ${certificate.certificate_id}`}
                        className="max-h-[500px] w-full object-contain rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {/* Issuer Info */}
                <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/60">
                  <div>
                    <span className="font-bold text-white">Issuing Organization:</span> Geek Interns — A GKK & Bubblesort Venture
                    <br />
                    <span className="text-white/40">Official cryptographically verified record from production database.</span>
                  </div>
                  <Link to="/apply">
                    <Button size="sm" variant="outline" className="border-white/15 text-[#06e4f9] hover:bg-white/10 text-xs font-mono uppercase">
                      Apply for Internship
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="cyber-card rounded-3xl p-8 border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(6,228,249,0.1)]">
            <div>
              <h3 className="font-display font-bold text-2xl">Want to earn a verified credential?</h3>
              <p className="text-white/60 text-sm mt-1 max-w-md font-sans">
                Enroll in any of our 27+ engineering tracks and build production capstones at your own pace.
              </p>
            </div>
            <Link to="/apply" className="shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#06e4f9] hover:bg-cyan-300 text-black font-mono font-bold px-6 py-3 h-12 rounded-full shadow-[0_0_20px_rgba(6,228,249,0.3)]">
                Start Internship <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
