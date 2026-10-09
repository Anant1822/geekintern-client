import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/components/layout/PublicLayout';
import PageTitle from '@/components/common/PageTitle';

export default function NotFound() {
  return (
    <PublicLayout>
      <PageTitle title="Page Not Found | Geek Intern" />
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F5F2EB] bg-dot-matrix relative overflow-hidden">
        {/* Ambient Blur Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-lift p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#E2DDD2] shadow-sm max-w-lg w-full text-center relative z-10"
        >
          {/* 404 illustration */}
          <div className="mb-6">
            <Badge className="bg-[#EBE6DC] text-[#181615] border border-[#E2DDD2] uppercase tracking-widest text-[11px] mb-4 px-3 py-1">
              Error 404
            </Badge>
            <div className="text-8xl sm:text-9xl font-extrabold text-[#1A1715] tracking-tight mb-2">404</div>
            <div className="w-16 h-1 bg-[#8C4325] mx-auto rounded-full" />
          </div>

          <h1 className="text-2xl font-bold text-[#1A1715] mb-3">
            Page Not Found
          </h1>
          <p className="text-[#57534E] mb-8 text-sm sm:text-base leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#181615] hover:bg-[#2A2724] text-[#FAF7F2] rounded-full font-semibold shadow-xs">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] hover:bg-[#EAE4D7] rounded-full">
              <Link to="/browse">
                <Search className="mr-2 h-4 w-4" />
                Browse Internships
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2DDD2]">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm text-[#57534E] hover:text-[#1A1715] transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Go back to previous page
            </button>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
