import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, MapPin, CheckCircle, AlertCircle,
  ArrowRight, HelpCircle, RefreshCw, Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SUBJECTS = [
  { value: "general", label: "General Enquiry" },
  { value: "technical", label: "Technical Issue" },
  { value: "payment", label: "Payment Issue" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional().refine(
    (val) => !val || val === "" || /^[6-9]\d{9}$/.test(val),
    "Enter a valid 10-digit mobile number"
  ),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message must be under 2000 characters"),
});

type FormValues = z.infer<typeof schema>;

interface InfoCardProps { icon: React.ReactNode; title: string; children: React.ReactNode; accent: string; }
function InfoCard({ icon, title, children, accent }: InfoCardProps) {
  return (
    <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl card-lift overflow-hidden">
      <div className={cn("h-1.5 w-full", accent)} />
      <CardContent className="pt-8 pb-8 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#EBE6DC] border border-[#E2DDD2] flex items-center justify-center">{icon}</div>
        <h3 className="font-bold text-[#1A1715] text-base">{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setServerError(null);
    try {
      await api.post("/contact", data);
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to send message. Please try again or email us directly.";
      setServerError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
  }

  function handleRetry() { setServerError(null); setSubmitted(false); reset(); }

  return (
    <PublicLayout>
      {/* 1. Hero */}
      <section className="relative bg-[#F5F2EB] text-[#1A1715] py-20 px-4 border-b border-[#E2DDD2] overflow-hidden bg-dot-matrix">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <Badge className="bg-[#F0E6DC] text-[#8C4325] border border-[#E4D5C7] mb-4 text-xs tracking-widest uppercase">Support</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-[#1A1715] tracking-tight">Get in <span className="font-serif italic text-[#8C4325]">Touch</span></h1>
          <p className="text-lg text-[#57534E] max-w-xl mx-auto leading-relaxed">
            Have a question or need help? Our team is here for you. Reach out through any of the channels below.
          </p>
        </motion.div>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="py-16 px-4 bg-[#EBE6DC] border-b border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            whileHover={{ y: -4 }}
          >
            <InfoCard icon={<Mail className="w-6 h-6 text-[#1A1715]" />} title="Email Us" accent="bg-[#181615]">
              <a href="mailto:support.geekintern@gmail.com" className="text-[#2D6A4F] text-sm font-semibold hover:underline break-all">
                support.geekintern@gmail.com
              </a>
              <p className="text-[#78716C] text-xs">We reply within 24 hours</p>
            </InfoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <InfoCard icon={<Clock className="w-6 h-6 text-[#2D6A4F]" />} title="Operating Hours" accent="bg-[#2D6A4F]">
              <p className="text-[#57534E] text-sm font-medium">Monday – Saturday</p>
              <p className="text-[#78716C] text-xs">9:00 AM – 7:00 PM IST</p>
            </InfoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            whileHover={{ y: -4 }}
          >
            <InfoCard icon={<MapPin className="w-6 h-6 text-[#8C4325]" />} title="Our Office" accent="bg-[#8C4325]">
              <address className="text-[#57534E] text-sm not-italic leading-relaxed">
                Geek Intern Technologies<br />
                Ambikapur, Chhattisgarh, India
              </address>
            </InfoCard>
          </motion.div>
        </div>
      </section>

      {/* 3. Contact Form */}
      <section className="py-16 px-4 bg-[#F5F2EB]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1715] mb-2">Send Us a Message</h2>
            <p className="text-[#57534E]">Fill out the form below and we'll get back to you promptly.</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl">
                <CardContent className="pt-12 pb-12 flex flex-col items-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#E8F3ED] border border-[#C2E0D1] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#2D6A4F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1715]">Message Received!</h3>
                  <p className="text-[#57534E] max-w-sm text-sm">
                    Thank you for reaching out. We have received your inquiry and our team will get back to you within 24 hours.
                  </p>
                  <Button onClick={handleRetry} variant="outline" className="mt-2 border-[#D6CFC4] bg-[#FAF8F5] text-[#1A1715] rounded-full hover:bg-[#EAE4D7]">
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border border-[#E2DDD2] bg-[#FAF7F2] shadow-card rounded-3xl">
                <CardContent className="p-8">
                  {serverError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-semibold text-[#1A1715]">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...register("name")}
                          aria-invalid={!!errors.name}
                          className="bg-white border-[#D6CFC4] text-[#1A1715] rounded-full h-11"
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold text-[#1A1715]">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email")}
                          aria-invalid={!!errors.email}
                          className="bg-white border-[#D6CFC4] text-[#1A1715] rounded-full h-11"
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold text-[#1A1715]">Phone Number <span className="text-[#78716C] font-normal">(Optional)</span></Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          {...register("phone")}
                          aria-invalid={!!errors.phone}
                          className="bg-white border-[#D6CFC4] text-[#1A1715] rounded-full h-11"
                        />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-xs font-semibold text-[#1A1715]">Subject <span className="text-red-500">*</span></Label>
                        <select
                          id="subject"
                          className="w-full h-11 px-4 rounded-full border border-[#D6CFC4] bg-white text-sm text-[#1A1715] focus:outline-none focus:ring-2 focus:ring-[#181615]"
                          {...register("subject")}
                        >
                          <option value="">Select subject...</option>
                          {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                        {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-semibold text-[#1A1715]">Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your question or issue in detail... (minimum 20 characters)"
                        rows={5}
                        {...register("message")}
                        aria-invalid={!!errors.message}
                        className="bg-white border-[#D6CFC4] text-[#1A1715] rounded-2xl"
                      />
                      {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-semibold bg-[#181615] hover:bg-[#2A2724] text-white rounded-full font-semibold shadow-xs">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending...
                        </span>
                      ) : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. FAQ Link */}
      <section className="py-12 px-4 bg-[#FAF7F2] border-t border-[#E2DDD2]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F0E6DC] border border-[#E4D5C7] flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-7 h-7 text-[#8C4325]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#1A1715] mb-1">Have a Common Question?</h3>
            <p className="text-[#57534E] text-sm">
              Before reaching out, check our frequently asked questions — you might find your answer instantly.
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#D6CFC4] bg-[#FAF8F5] text-[#8C4325] hover:bg-[#EAE4D7] rounded-full flex-shrink-0 font-semibold">
            <Link to="/#faq">Visit FAQ <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </motion.div>
      </section>
    </PublicLayout>
  );
}
