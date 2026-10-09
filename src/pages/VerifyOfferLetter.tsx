import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search, ShieldCheck, CheckCircle2, AlertCircle, Send, Calendar, Clock,
  User, Briefcase, FileCheck, ArrowRight, Download, Printer, ExternalLink,
  Sparkles, Mail, Building, FileText, Share2
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'
import { supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

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
            issuer: 'Geek Intern Human Resources',
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

  // Auto-verify if ID is passed in query string
  useEffect(() => {
    if (initialId) {
      handleVerify(initialId)
    }
  }, [initialId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleVerify(letterId)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <PublicLayout>
      <PageTitle title="Verify Internship Offer Letter | Geek Intern Verification Portal" />

      <div className="min-h-screen bg-[#F5F2EB] dark:bg-[#151311] py-12 sm:py-16 text-[#1A1715] dark:text-[#FAF7F2] relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-4xl px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-stone-800 text-[#57534E] dark:text-stone-300 text-xs font-semibold mb-4 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Geek Intern Official Document Verification
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1715] dark:text-[#FAF7F2] tracking-tight">
              Verify Internship <span className="font-serif italic">Offer Letter</span>
            </h1>
            <p className="mt-3 text-[#57534E] dark:text-stone-400 text-sm sm:text-base leading-relaxed">
              Validate internship engagement and onboarding documents issued by Geek Intern. Enter the unique Offer Letter ID printed on the official letter or document header.
            </p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border border-[#E2DDD2] dark:border-stone-800 shadow-card bg-[#FAF7F2] dark:bg-[#1C1A17] mb-8 rounded-3xl card-lift">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78716C]" />
                    <Input
                      placeholder="Enter Offer Letter ID (e.g. GI-OL-2026-DEMO1)"
                      value={letterId}
                      onChange={(e) => setLetterId(e.target.value)}
                      className="pl-10 h-11 text-sm sm:text-base uppercase font-mono tracking-wide bg-white dark:bg-stone-900 border-[#D6CFC4] dark:border-stone-700 rounded-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !letterId.trim()}
                    className="h-11 px-7 bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-sm shadow-xs rounded-full transition-all"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                <div className="mt-3 flex items-center justify-between text-xs text-[#78716C] dark:text-stone-400">
                  <span>Looking for a certificate instead? <Link to="/verify" className="text-[#1A1715] dark:text-white hover:underline font-medium">Verify Certificate ↗</Link></span>
                  <span className="font-mono text-[11px] text-[#78716C]">Format: GI-OL-YYYY-XXXXX</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-red-200 bg-red-50/70 mb-8 rounded-2xl shadow-sm">
                <CardContent className="p-5 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 text-sm">Offer Letter Not Found</h3>
                    <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{errorMsg}</p>
                    <p className="text-xs text-red-600 mt-2">
                      Please double-check the Offer Letter ID. If you recently received your offer letter, please verify the exact reference code provided in your email.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Verified Offer Letter Card */}
          {offerLetter && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Verification Status Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 card-lift">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Verified Authentic Internship Offer Letter</h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">Issued and digitally sealed by Geek Intern</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 h-8 rounded-full"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    {copiedLink ? 'Link Copied!' : 'Share Verification Link'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.print()}
                    variant="outline"
                    className="text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 h-8 rounded-full"
                  >
                    <Printer className="h-3 w-3 mr-1" />
                    Print / Save
                  </Button>
                </div>
              </div>

              {/* Cloud Uploaded Document Banner (if image/PDF exists) */}
              {offerLetter.image_url && (
                <Card className="border border-[#E2DDD2] dark:border-stone-800 shadow-card bg-[#FAF7F2] dark:bg-[#1C1A17] overflow-hidden rounded-3xl card-lift">
                  <CardHeader className="bg-[#EBE6DC] dark:bg-stone-900 border-b border-[#E2DDD2] dark:border-stone-700 p-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-bold text-[#1A1715] dark:text-[#FAF7F2] flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1A1715] dark:text-stone-300" />
                        Original Cloud Document
                      </CardTitle>
                      <CardDescription className="text-xs text-[#57534E] dark:text-stone-400">
                        Official document hosted in Geek Intern cloud archive
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={offerLetter.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#1A1715] dark:text-stone-300 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open High-Res ↗
                      </a>
                      <a
                        href={offerLetter.image_url}
                        download={`Offer_Letter_${offerLetter.letter_id}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-[#181615] hover:bg-[#2A2724] text-white text-xs h-8 gap-1.5 rounded-full">
                          <Download className="h-3.5 w-3.5" />
                          Download Document
                        </Button>
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 bg-[#F5F2EB] dark:bg-stone-950 flex items-center justify-center">
                    {offerLetter.image_url.endsWith('.pdf') ? (
                      <iframe
                        src={offerLetter.image_url}
                        title={`Offer Letter ${offerLetter.letter_id}`}
                        className="w-full h-[650px] rounded-xl border border-[#E2DDD2] dark:border-stone-800"
                      />
                    ) : (
                      <img
                        src={offerLetter.image_url}
                        alt={`Offer Letter ${offerLetter.letter_id}`}
                        className="max-h-[750px] w-auto max-w-full rounded-xl shadow-md object-contain border border-[#E2DDD2] dark:border-stone-800"
                      />
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Verified Record Metadata Card */}
              <div className="bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-card space-y-6 card-lift">
                {/* Top header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2DDD2] dark:border-stone-800 pb-5">
                  <div>
                    <span className="text-xs font-bold text-[#9E4A2B] tracking-wider uppercase">
                      Internship Engagement Record
                    </span>
                    <h2 className="text-2xl font-bold text-[#1A1715] dark:text-[#FAF7F2] mt-1">
                      {offerLetter.domain} Intern
                    </h2>
                    <p className="text-xs text-[#57534E] dark:text-stone-400 mt-0.5">
                      Issued by <strong className="text-[#1A1715] dark:text-white">{offerLetter.issuer}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#78716C] block uppercase">Verification Code</span>
                    <span className="font-mono font-bold text-[#1A1715] dark:text-stone-200 text-base bg-[#EBE6DC] dark:bg-stone-800 px-3 py-1 rounded-full border border-[#E2DDD2] dark:border-stone-700 inline-block">
                      {offerLetter.letter_id}
                    </span>
                  </div>
                </div>

                {/* Candidate & Term Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#EBE6DC] dark:bg-stone-900/60 p-4 rounded-2xl border border-[#E2DDD2] dark:border-stone-800 text-xs">
                  <div>
                    <span className="text-[#78716C] block text-[10px] uppercase font-medium">Candidate Name</span>
                    <span className="font-bold text-[#1A1715] dark:text-[#FAF7F2] text-sm mt-0.5 block">{offerLetter.student_name}</span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block text-[10px] uppercase font-medium">Program Duration</span>
                    <span className="font-bold text-[#1A1715] dark:text-[#FAF7F2] text-sm mt-0.5 block">{offerLetter.duration || '4 Weeks'}</span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block text-[10px] uppercase font-medium">Commencement Date</span>
                    <span className="font-bold text-[#1A1715] dark:text-[#FAF7F2] text-sm mt-0.5 block">
                      {offerLetter.start_date ? formatDate(offerLetter.start_date) : 'Immediate'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#78716C] block text-[10px] uppercase font-medium">Stipend / Terms</span>
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 text-sm mt-0.5 block">{offerLetter.stipend || 'Performance Based'}</span>
                  </div>
                </div>

                {!offerLetter.image_url && (
                  <div className="p-4 rounded-2xl bg-[#EBE6DC] dark:bg-stone-900/60 border border-[#E2DDD2] dark:border-stone-800 text-xs text-[#57534E] dark:text-stone-300 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>This internship offer was verified in Geek Intern official records. The physical/digital offer document is issued directly to the candidate by the administration.</span>
                  </div>
                )}
              </div>

              {/* Student Portal CTA */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-[#E2DDD2] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs card-lift">
                <div>
                  <p className="font-bold text-[#1A1715] dark:text-white">Are you the candidate named on this document?</p>
                  <p className="text-[#57534E] dark:text-stone-400 mt-0.5">Sign into the student portal to track onboarding, tasks, and future certificates.</p>
                </div>
                <Link to={`/student-login?email=${encodeURIComponent(offerLetter.email || '')}`}>
                  <Button size="sm" className="bg-[#181615] hover:bg-[#2A2724] text-white gap-1.5 text-xs rounded-full">
                    Open Student Portal
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
