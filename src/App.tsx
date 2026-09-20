import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import LoadingPage from '@/components/common/LoadingPage'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import ErrorBoundary from '@/components/common/ErrorBoundary'

// Public Core Pages (Clean White Interface)
const Home = lazy(() => import('@/pages/Home'))
const BrowseInternships = lazy(() => import('@/pages/BrowseInternships'))
const InternshipDetail = lazy(() => import('@/pages/InternshipDetail'))
const Apply = lazy(() => import('@/pages/Apply'))
const VerifyCertificate = lazy(() => import('@/pages/VerifyCertificate'))
const VerifyOfferLetter = lazy(() => import('@/pages/VerifyOfferLetter'))
const StudentLogin = lazy(() => import('@/pages/StudentLogin'))
const StudentRegister = lazy(() => import('@/pages/StudentRegister'))
const CollegeRegister = lazy(() => import('@/pages/CollegeRegister'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Portfolio Pages
const WebPortfolio = lazy(() => import('@/pages/WebPortfolio'))
const AppPortfolio = lazy(() => import('@/pages/AppPortfolio'))
const CorePortfolio = lazy(() => import('@/pages/CorePortfolio'))

// Career Tools Suite
const CareerTools = lazy(() => import('@/pages/CareerTools'))
const ATSChecker = lazy(() => import('@/pages/ATSChecker'))
const ResumeBuilder = lazy(() => import('@/pages/ResumeBuilder'))
const PortfolioBuilder = lazy(() => import('@/pages/PortfolioBuilder'))

// Services & Industrial Training
const Services = lazy(() => import('@/pages/Services'))
const IndustrialTraining = lazy(() => import('@/pages/IndustrialTraining'))
const IndustrialTrainingProjects = lazy(() => import('@/pages/IndustrialTrainingProjects'))
const IndustrialTrainingVerification = lazy(() => import('@/pages/IndustrialTrainingVerification'))

// Community, Mentorship & Guidelines
const StudentReviews = lazy(() => import('@/pages/StudentReviews'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const Guidelines = lazy(() => import('@/pages/Guidelines'))
const Team = lazy(() => import('@/pages/Team'))

// Protected Student Pages
const StudentDashboard = lazy(() => import('@/pages/StudentDashboard'))

import { useAuthInit } from '@/hooks/useAuth'

export default function App() {
  useAuthInit()
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Public core routes */}
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/verification" element={<Navigate to="/verify" replace />} />
          <Route path="/verify-offer-letter" element={<VerifyOfferLetter />} />
          <Route path="/verify-offer" element={<Navigate to="/verify-offer-letter" replace />} />
          <Route path="/offer-letter" element={<Navigate to="/verify-offer-letter" replace />} />
          <Route path="/browse" element={<BrowseInternships />} />
          <Route path="/internships" element={<Navigate to="/browse" replace />} />
          <Route path="/internship/:id" element={<InternshipDetail />} />
          <Route path="/internships/guidelines" element={<Guidelines />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/portal" element={<StudentLogin />} />
          <Route path="/student-portal" element={<StudentLogin />} />
          <Route path="/college-register" element={<CollegeRegister />} />
          <Route path="/partner-with-us" element={<Navigate to="/college-register" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
          <Route path="/refund" element={<RefundPolicy />} />

          {/* Portfolio routes */}
          <Route path="/web-portfolio" element={<WebPortfolio />} />
          <Route path="/app-portfolio" element={<AppPortfolio />} />
          <Route path="/core-portfolio" element={<CorePortfolio />} />

          {/* Career Tools routes */}
          <Route path="/career" element={<CareerTools />} />
          <Route path="/careers" element={<CareerTools />} />
          <Route path="/careertools" element={<CareerTools />} />
          <Route path="/ats-checker" element={<ATSChecker />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/portfolio-builder" element={<PortfolioBuilder />} />

          {/* Services & Industrial Training */}
          <Route path="/services" element={<Services />} />
          <Route path="/industrial-training" element={<IndustrialTraining />} />
          <Route path="/industrial-training-projects" element={<IndustrialTrainingProjects />} />
          <Route path="/industrial-training-verification" element={<IndustrialTrainingVerification />} />

          {/* Reviews & Social Proof */}
          <Route path="/student-reviews" element={<StudentReviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faqs" element={<Navigate to="/faq" replace />} />

          {/* Protected student routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Explicitly block and 404 any admin paths */}
          <Route path="/admin/*" element={<NotFound />} />
          <Route path="/admin" element={<NotFound />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  )
}
