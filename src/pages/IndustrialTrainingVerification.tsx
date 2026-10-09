import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { PageTitle } from '@/components/common/PageTitle'
import api from '@/services/api'
import { motion } from 'framer-motion'

export function IndustrialTrainingVerification() {
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanId = certId.trim().toUpperCase()
    if (!cleanId) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await api.get(`/certificates/verify/${encodeURIComponent(cleanId)}`)
      if (res.data?.success && res.data?.data?.certificate) {
        setResult(res.data.data.certificate)
      } else {
        setError(`Credential ID "${cleanId}" not found in Geek Intern records.`)
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || `Credential ID "${cleanId}" could not be verified.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      <PageTitle title="Industrial Training Certificate Verification | Geek Intern" />

      {/* Header */}
      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] border-b border-[#E2DDD2] relative overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="bg-[#E8F3ED] text-[#2D6A4F] border border-[#C2E0D1] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
              Official Credential Verification
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-[#1A1715]">
              Industrial Training <span className="italic font-serif text-[#8C4325]">Verification</span>
            </h1>
            <p className="text-[#57534E] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Validate the authenticity of university training completion certificates and letters issued by Geek Intern.
            </p>

            <form onSubmit={handleVerify} className="max-w-lg mx-auto mt-8 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  placeholder="Enter Certificate ID (e.g. CF-2026-WD101)"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="pl-10 h-12 bg-[#FAF7F2] border-[#D6CFC4] text-[#1A1715] rounded-full shadow-xs"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-full bg-[#181615] hover:bg-[#2A2724] text-white font-semibold text-xs shadow-xs"
              >
                {loading ? 'Verifying...' : 'Verify Now'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] text-[#1A1715] min-h-[50vh]">
        <div className="max-w-2xl mx-auto">
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-[#FAF7F2] border border-[#C2E0D1] p-8 shadow-card card-lift"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-[#E2DDD2]">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F3ED] text-[#2D6A4F] flex items-center justify-center border border-[#C2E0D1]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1715]">Verified Authentic Credential</h3>
                  <p className="text-xs text-[#57534E]">Validated against Geek Intern official cryptographic registry</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 text-sm">
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Candidate Name:</span>
                  <span className="font-bold text-[#1A1715]">{result.student_name}</span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Certificate ID:</span>
                  <span className="font-mono text-[#2D6A4F] font-bold">{result.certificate_id}</span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Technical Domain:</span>
                  <span className="font-semibold text-[#1A1715]">{result.domain}</span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Program Duration:</span>
                  <span className="font-semibold text-[#1A1715]">{result.duration}</span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Issue Date:</span>
                  <span className="text-[#1A1715]">{result.issue_date}</span>
                </div>
                <div>
                  <span className="text-xs text-[#57534E] block mb-0.5">Evaluation Grade:</span>
                  <span className="text-[#2D6A4F] font-bold">{result.grade || 'A+'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DDD2] text-center">
                <Link to="/verify">
                  <Button variant="outline" className="border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] text-xs shadow-xs rounded-full hover:bg-[#EAE4D7]">
                    Standard Verification Portal
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-rose-50 border border-rose-200 p-6 text-center shadow-sm"
            >
              <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1A1715] mb-1">Verification Failed</h3>
              <p className="text-xs text-rose-600">{error}</p>
            </motion.div>
          )}
        </div>
      </section>
    </PublicLayout>
  )
}

export default IndustrialTrainingVerification
