import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Clock,
  User, Briefcase, FileCheck, ArrowRight, Download, Printer, ExternalLink,
  Sparkles, Mail, Building, FileText, Share2
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface OfferLetterData {
  letter_id: string
  student_name: string
  email: string
  domain: string
  duration: string
  start_date: string
  stipend: string
  status: string
  issuer: string
  image_url?: string | null
  created_at?: string
}

export default function VerifyOfferLetter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialId = searchParams.get('id') || ''

  const [letterId, setLetterId] = useState(initialId)
  const [isLoading, setIsLoading] = useState(false)
  const [offerLetter, setOfferLetter] = useState<OfferLetterData | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [searchedId, setSearchedId] = useState<string>('')
  const [copiedLink, setCopiedLink] = useState(false)

  const handleVerify = async (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase()
    if (!cleanId) return

    setIsLoading(true)
    setErrorMsg(null)
    setOfferLetter(null)
    setSearchedId(cleanId)

    try {
      const res = await api.get(`/certificates/verify-offer-letter/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.offer_letter) {
        setOfferLetter(res.data.data.offer_letter)
        setSearchParams({ id: cleanId })
        return
      }
    } catch (err: any) {
      console.warn('API verification failed, trying Supabase direct fallback...', err)
    }

    // Direct Supabase fallback for production (geekintern.com)
    try {
      const { data: settingRow } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'offer_letters_library')
        .maybeSingle()

      if (settingRow?.value) {
        const olMap = JSON.parse(settingRow.value)
        const letter = olMap[cleanId] || Object.values(olMap).find(
          (l: any) => (l.letter_id || '').toUpperCase() === cleanId
        ) as any

        if (letter) {
          setOfferLetter({
            letter_id: letter.letter_id,
            student_name: letter.student_name,
            email: letter.email || '',
            domain: letter.domain,
            duration: letter.duration || '4 Weeks',
            start_date: letter.start_date || '',
            stipend: letter.stipend || 'Unpaid / Performance Based',
            status: letter.status || 'verified',
            issuer: 'Geek Interns Human Resources — A GKK & Bubblesort Venture',
            image_url: letter.image_url || null,
          })
          setSearchParams({ id: cleanId })
          return
        }
      }
      setErrorMsg(`Offer Letter ID "${cleanId}" not found in Geek Intern verification records.`)
    } catch (err: any) {
      console.error('Direct offer letter verification error:', err)
      setErrorMsg(`Offer Letter ID "${cleanId}" could not be verified.`)
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
    handleVerify(letterId)
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <PublicLayout>
      <PageTitle title="Verify Internship Offer Letter | Geek Interns" />

      {/* Atmospheric Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#2c2cf3]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-[#06e4f9]/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Document Verification</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
              Verify Offer Letter
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-white/60">
              validate authentic onboarding documents issued by Geek Interns.
            </p>
          </div>

          {/* Search Card */}
          <div className="cyber-card p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 shadow-[0_0_40px_rgba(6,228,249,0.08)]">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Enter Offer Letter ID (e.g. GI-OL-2026-DEMO1)"
                  value={letterId}
                  onChange={(e) => setLetterId(e.target.value)}
                  className="pl-10 h-12 bg-white/[0.04] border-white/15 text-white font-mono text-sm uppercase tracking-wider focus-visible:ring-[#06e4f9]"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !letterId.trim()}
                className="h-12 px-8 bg-[#06e4f9] hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,228,249,0.3)] transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Verify Document
                  </span>
                )}
              </Button>
            </form>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Looking for a certificate? <Link to="/verify" className="text-[#06e4f9] hover:underline font-bold">Verify Certificate ↗</Link></span>
              <span>Format: GI-OL-YYYY-XXXXX</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="cyber-card border-rose-500/30 bg-rose-950/20 p-6 rounded-3xl mb-8 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-rose-300 text-sm">Offer Letter Not Found</h3>
                <p className="text-xs text-white/70 mt-1 leading-relaxed font-sans">{errorMsg}</p>
                <p className="text-xs text-white/40 mt-2 font-mono">
                  Please verify the exact reference code provided in your official email communication.
                </p>
              </div>
            </div>
          )}

          {/* Verified Offer Letter Card */}
          {offerLetter && (
            <div className="space-y-6">
              {/* Verification Status Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-white">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold uppercase tracking-wider">
                      Verified Authentic Internship Offer Letter
                    </h3>
                    <p className="text-xs text-emerald-300 font-mono">Issued and digitally sealed by Geek Interns</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="text-xs font-mono uppercase tracking-wider border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 h-9"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    {copiedLink ? 'Link Copied!' : 'Share Link'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.print()}
                    variant="outline"
                    className="text-xs font-mono uppercase tracking-wider border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 h-9"
                  >
                    <Printer className="h-3 w-3 mr-1" />
                    Print
                  </Button>
                </div>
              </div>

              {/* Cloud Uploaded Document Banner (if image/PDF exists) */}
              {offerLetter.image_url && (
                <div className="cyber-card rounded-3xl border border-white/15 overflow-hidden">
                  <div className="bg-white/[0.03] border-b border-white/10 p-4 flex flex-row items-center justify-between">
                    <div>
                      <div className="text-sm font-display font-bold text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#06e4f9]" />
                        Original Cloud Document
                      </div>
                      <div className="text-xs font-mono text-white/50">
                        Official document hosted in Geek Interns cloud archive
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={offerLetter.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#06e4f9] hover:underline font-mono inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>High-Res</span>
                      </a>
                      <a
                        href={offerLetter.image_url}
                        download={`Offer_Letter_${offerLetter.letter_id}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-[#06e4f9] hover:bg-cyan-300 text-black text-xs font-mono font-bold h-8 gap-1.5">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-black/40 flex items-center justify-center">
                    {offerLetter.image_url.endsWith('.pdf') ? (
                      <iframe
                        src={offerLetter.image_url}
                        title={`Offer Letter ${offerLetter.letter_id}`}
                        className="w-full h-[650px] rounded-xl border border-white/10"
                      />
                    ) : (
                      <img
                        src={offerLetter.image_url}
                        alt={`Offer Letter ${offerLetter.letter_id}`}
                        className="max-h-[750px] w-auto max-w-full rounded-xl shadow-md object-contain border border-white/10"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Verified Record Metadata Card */}
              <div className="cyber-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
                {/* Top header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#06e4f9] tracking-widest uppercase block mb-1">
                      Internship Engagement Record
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      {offerLetter.domain} Intern
                    </h2>
                    <p className="text-xs text-white/50 font-sans mt-0.5">
                      Issued by <strong className="text-white">{offerLetter.issuer}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-white/40 block uppercase">Verification Code</span>
                    <span className="font-mono font-bold text-[#06e4f9] text-base bg-white/5 px-3 py-1 rounded-xl border border-[#06e4f9]/30 inline-block mt-0.5">
                      {offerLetter.letter_id}
                    </span>
                  </div>
                </div>

                {/* Candidate & Term Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/10 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase font-bold">Candidate Name</span>
                    <span className="font-bold text-white text-sm mt-1 block">{offerLetter.student_name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase font-bold">Program Duration</span>
                    <span className="font-bold text-white text-sm mt-1 block">{offerLetter.duration || '4 Weeks'}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase font-bold">Commencement Date</span>
                    <span className="font-bold text-white text-sm mt-1 block">
                      {offerLetter.start_date ? formatDate(offerLetter.start_date) : 'Immediate'}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] font-mono uppercase font-bold">Stipend / Terms</span>
                    <span className="font-bold text-emerald-400 text-sm mt-1 block">{offerLetter.stipend || 'Performance Based'}</span>
                  </div>
                </div>

                {!offerLetter.image_url && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/60 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>This internship offer is verified in Geek Interns official records. The formal onboarding package is sent directly to the candidate.</span>
                  </div>
                )}
              </div>

              {/* Student Portal CTA */}
              <div className="cyber-card p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-display font-bold text-base text-white">Are you the candidate named on this document?</p>
                  <p className="text-white/60 font-sans mt-0.5">Sign into the student portal to track onboarding, tasks, and future certificates.</p>
                </div>
                <Link to={`/student-portal`}>
                  <Button size="sm" className="bg-[#06e4f9] hover:bg-cyan-300 text-black font-mono font-bold uppercase tracking-wider gap-1.5 text-xs h-10 px-5 rounded-full">
                    Open Student Portal
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
