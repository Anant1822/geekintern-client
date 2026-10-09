import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Copy,
  ExternalLink,
  Headphones,
  ShieldCheck,
  Check,
  Send,
  MapPin,
  ArrowRight,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/services/api";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/useToast";
import { motion } from "framer-motion";

const INQUIRY_TOPICS = [
  "General Inquiry",
  "Application & Status Check",
  "Offer Letter & Onboarding",
  "Certificate Verification & CID",
  "Internship Track & Curriculum",
  "College / University Partnership",
  "Grievance & Technical Issue",
];

const schema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  inquiry_topic: z.string().min(1, "Please select an inquiry topic"),
  ref_id: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be under 3000 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      inquiry_topic: "General Inquiry",
      message: "",
    },
  });

  const messageText = watch("message") || "";

  function handleCopy(emailToCopy: string) {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(emailToCopy);
      setCopiedEmail(emailToCopy);
      toast({
        title: "Email Copied! ✓",
        description: `${emailToCopy} copied to your clipboard.`,
      });
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  }

  async function onSubmit(data: FormValues) {
    setServerError(null);

    // Format message with metadata for administrative tracking
    let formattedMessage = data.message.trim();
    const metaParts = [`Topic: ${data.inquiry_topic}`];
    if (data.ref_id && data.ref_id.trim()) {
      metaParts.push(`Ref ID: ${data.ref_id.trim()}`);
    }
    formattedMessage = `[${metaParts.join(" | ")}]\n\n${formattedMessage}`;

    const payload = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      subject: data.subject.trim(),
      message: formattedMessage,
    };

    try {
      let backendSuccess = false;
      try {
        await api.post("/contact", payload);
        backendSuccess = true;
      } catch (apiErr: any) {
        console.warn("Backend /contact notice, trying Supabase direct insert fallback...", apiErr?.message);
      }

      // Supabase Direct Cloud Fallback (guaranteed to work reliably in production)
      if (!backendSuccess) {
        const { error: sbErr } = await supabase.from("contact_messages").insert([
          {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            subject: payload.subject,
            message: payload.message,
            status: "new",
          },
        ]);
        if (sbErr) throw sbErr;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast({
        title: "Message Dispatched Successfully! ✓",
        description: "Our support coordinators have received your query and will get back to you within 24 hours.",
      });
    } catch (err: any) {
      console.error("Contact submit error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send message. Please try again or reach out directly at support.geekintern@gmail.com";
      setServerError(msg);
      toast({ title: "Submission Failed", description: msg, variant: "destructive" });
    }
  }

  function handleReset() {
    setServerError(null);
    setSubmitted(false);
    reset();
  }

  return (
    <PublicLayout>
      <PageTitle
        title="Contact Us | Official Geek Intern Support Desk"
        suffix="geekintern.com"
      />

      <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Eyebrow & Hero Title */}
          <div className="mb-8 sm:mb-10 text-left">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#185333] dark:text-emerald-400 mb-2 flex items-center gap-1.5">
              <span>GET IN TOUCH / WE ARE HERE TO HELP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15] mb-3">
              Talk to the Geek Intern team.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Have a question about an internship program, application status, certificate verification, or partnership?
              <br className="hidden sm:inline" />
              Submit a message below or connect with our support desk directly through our verified channels.
            </p>
          </div>

          {/* 2-Column Main Layout: Left Form + Right Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Form) */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8 sm:p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#185333] dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Message Dispatched!
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you for contacting Geek Intern. Your message has been logged and routed to our support team.
                      We typically respond within 24 business hours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="rounded-lg text-xs font-semibold h-10 px-5 border-slate-300 dark:border-slate-700"
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Send Another Message
                      </Button>
                      <Link to="/student-portal">
                        <Button className="rounded-lg text-xs font-semibold h-10 px-5 bg-[#185333] hover:bg-[#124227] text-white">
                          Open Student Portal <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#185333] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          Send an Official Message
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          Fill out the details below. Our support coordinators route your message directly to the appropriate team.
                        </p>
                      </div>
                    </div>

                    {serverError && (
                      <Alert variant="destructive" className="mb-6 rounded-xl">
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>{serverError}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
                      {/* Row 1: Full Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            Your Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="e.g. Rahul Sharma"
                            {...register("name")}
                            className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm h-11 rounded-lg focus-visible:ring-emerald-600"
                          />
                          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="e.g. rahul@example.com"
                            {...register("email")}
                            className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm h-11 rounded-lg focus-visible:ring-emerald-600"
                          />
                          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                      </div>

                      {/* Row 2: Phone & Inquiry Topic */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                              Phone / WhatsApp
                            </Label>
                            <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register("phone")}
                            className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm h-11 rounded-lg focus-visible:ring-emerald-600"
                          />
                          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="inquiry_topic" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            Inquiry Topic <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <select
                              id="inquiry_topic"
                              {...register("inquiry_topic")}
                              className="w-full h-11 px-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer appearance-none pr-8"
                            >
                              {INQUIRY_TOPICS.map((topic) => (
                                <option key={topic} value={topic}>
                                  {topic}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                            </div>
                          </div>
                          {errors.inquiry_topic && <p className="text-xs text-red-500">{errors.inquiry_topic.message}</p>}
                        </div>
                      </div>

                      {/* Row 3: Application ID / Certificate ID (Optional) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ref_id" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            Application ID / Certificate ID
                          </Label>
                          <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                        </div>
                        <Input
                          id="ref_id"
                          placeholder="e.g. GEEK-APP-1234 or cert-987654"
                          {...register("ref_id")}
                          className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm h-11 rounded-lg focus-visible:ring-emerald-600"
                        />
                      </div>

                      {/* Row 4: Subject */}
                      <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="What is your inquiry about?"
                          {...register("subject")}
                          className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm h-11 rounded-lg focus-visible:ring-emerald-600"
                        />
                        {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                      </div>

                      {/* Row 5: Message Textarea */}
                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          How can we help? <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Provide as much detail as possible so we can assist you quickly..."
                          rows={5}
                          {...register("message")}
                          className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm rounded-lg resize-y focus-visible:ring-emerald-600 min-h-[120px]"
                        />
                        <div className="flex items-center justify-between pt-1">
                          {errors.message ? (
                            <p className="text-xs text-red-500">{errors.message.message}</p>
                          ) : (
                            <span />
                          )}
                          <span className="text-[11px] text-slate-400 font-mono">
                            {messageText.length} / 3000
                          </span>
                        </div>
                      </div>

                      {/* Action Row: Send Button + Security Note */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-11 px-6 rounded-lg bg-[#185333] hover:bg-[#124227] text-white font-semibold text-xs shadow-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Message</span>
                            </>
                          )}
                        </Button>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Your privacy is protected. No spam.</span>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column (Cards) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Single Official Contact Card: Admissions & Support Desk */}
              <Card className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-6">
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#185333] dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Official Admissions & Support Desk
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Direct verified inbox for candidates, applicants, verification, and partnerships.
                    </p>
                  </div>
                </div>

                {/* Email pill */}
                <div className="mb-4">
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-md px-3 py-1.5 inline-block select-all">
                    support.geekintern@gmail.com
                  </div>
                </div>

                {/* Buttons row */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy("support.geekintern@gmail.com")}
                    className="h-8 px-3 rounded-lg text-xs font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 gap-1.5"
                  >
                    {copiedEmail === "support.geekintern@gmail.com" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </Button>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support.geekintern@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 px-3 rounded-lg text-xs font-semibold bg-[#185333] hover:bg-[#124227] text-white gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Gmail</span>
                    </Button>
                  </a>

                  <a href="mailto:support.geekintern@gmail.com">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 rounded-lg text-xs font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Mail Client</span>
                    </Button>
                  </a>
                </div>
              </Card>

              {/* Card 2: Already Enrolled in an Internship? */}
              <Card className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl shadow-xs p-6">
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Already Enrolled in an Internship?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Get prioritized sprint assistance and 1-on-1 mentor guidance in your dashboard.
                    </p>
                  </div>
                </div>

                <Link to="/student-portal">
                  <Button
                    type="button"
                    className="w-full h-10 rounded-lg text-xs font-semibold bg-[#185333] hover:bg-[#124227] text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open Workspace Support Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </Card>

              {/* Operating Hours & Office Location Card */}
              <div className="bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold">Hours:</strong> Mon – Sat: 9:30 AM – 7:00 PM IST
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold">Headquarters:</strong> Geek Intern Tech Hub, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
