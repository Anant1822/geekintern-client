import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PublicLayout from "@/components/layout/PublicLayout";
import { cn } from "@/lib/utils";

const LAST_UPDATED = "September 2024";

interface Section { id: string; title: string; }

const SECTIONS: Section[] = [
  { id: "acceptance",    title: "1. Acceptance of Terms" },
  { id: "service",       title: "2. Description of Service" },
  { id: "eligibility",   title: "3. Eligibility" },
  { id: "accounts",      title: "4. User Accounts" },
  { id: "fees",          title: "5. Application Fees" },
  { id: "payments",      title: "6. Payments and Billing" },
  { id: "listings",      title: "7. Internship Listings" },
  { id: "certificates",  title: "8. Certificates" },
  { id: "prohibited",    title: "9. Prohibited Activities" },
  { id: "privacy",       title: "10. Privacy" },
  { id: "liability",     title: "11. Limitation of Liability" },
  { id: "changes",       title: "12. Changes to Terms" },
  { id: "contact",       title: "13. Contact" },
];

interface SectionBlockProps { id: string; title: string; children: React.ReactNode; }
function SectionBlock({ id, title, children }: SectionBlockProps) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-bold text-[#1A1715] mb-3 pb-2 border-b border-[#E2DDD2]">{title}</h2>
      <div className="text-[#57534E] leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance");

  function handleNavClick(id: string) {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative bg-[#F5F2EB] bg-dot-matrix text-[#1A1715] py-16 px-4 border-b border-[#E2DDD2] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="text-[#8C4325] text-sm font-medium mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-[#1A1715]">Terms and Conditions</h1>
          <p className="text-[#57534E] text-sm">Last updated: {LAST_UPDATED}</p>
        </motion.div>
      </section>

      {/* Content */}
      <div className="bg-[#FAF7F2] min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar TOC */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-[#FAF7F2] border border-[#E2DDD2] rounded-xl p-4 shadow-xs">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contents</p>
                <nav className="space-y-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleNavClick(s.id)}
                      className={cn(
                        "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                        activeSection === s.id
                          ? "bg-[#181615] text-[#FAF7F2] font-medium"
                          : "text-[#57534E] hover:bg-[#EAE4D7]"
                      )}
                    >
                      {s.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="bg-[#FAF7F2] border border-[#E2DDD2] rounded-xl p-4 mb-8 text-sm text-[#1A1715] shadow-xs">
                Please read these Terms and Conditions carefully before using the Geek Intern platform.
                By accessing or using our services, you agree to be bound by these terms.
              </div>

            <SectionBlock id="acceptance" title="1. Acceptance of Terms">
              <p>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your")
                and Geek Intern Technologies ("Geek Intern", "we", "us", or "our"), governing your access to and use
                of the Geek Intern platform available at <strong>geekintern.com</strong> and related mobile or web applications
                (collectively, the "Platform").
              </p>
              <p>
                By registering for an account, browsing internship listings, submitting an application, or otherwise accessing the
                Platform in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                If you do not agree with any provision of these Terms, you must immediately discontinue use of the Platform.
              </p>
              <p>
                These Terms are governed by the laws of India, including the Information Technology Act, 2000 and the rules
                framed thereunder.
              </p>
            </SectionBlock>

            <SectionBlock id="service" title="2. Description of Service">
              <p>
                Geek Intern is an online developer learning and internship platform that provides college students ("Applicants")
                with hands-on software development projects, technical milestones, and verifiable credentials.
              </p>
              <p>
                <strong>Geek Intern is an educational and internship platform.</strong> We do not guarantee employment, job offers,
                or external company placements. Our role is to provide real-world project tasks, milestone verification, and career tools.
              </p>
              <p>
                We maintain quality standards for all project tracks and submissions published on the Platform to ensure authentic
                developer learning and portfolio value.
              </p>
            </SectionBlock>

            <SectionBlock id="eligibility" title="3. Eligibility">
              <p>
                To use the Geek Intern Platform as a student applicant, you must:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be enrolled in an accredited college or university as a student or a recent graduate;</li>
                <li>Be at least 18 years of age, or have obtained verifiable parental or guardian consent if you are below 18;</li>
                <li>Provide accurate, current, and complete information during registration;</li>
                <li>Not be barred from using our services under applicable laws.</li>
              </ul>
              <p>
                Geek Intern reserves the right to verify your eligibility at any time and to suspend or terminate accounts where
                eligibility cannot be confirmed.
              </p>
            </SectionBlock>

            <SectionBlock id="accounts" title="4. User Accounts">
              <p>
                To access most features of the Platform, you must create an account by providing a valid email address,
                mobile number, and academic details. You are responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintaining the confidentiality of your account credentials;</li>
                <li>All activities that occur under your account;</li>
                <li>Notifying us immediately at <a href="mailto:support.geekintern@gmail.com" className="text-[#2D6A4F] underline">support.geekintern@gmail.com</a> of any unauthorised use of your account.</li>
              </ul>
              <p>
                You may not share your account credentials with any third party. Each individual must maintain a separate
                account. Geek Intern shall not be liable for any loss or damage arising from your failure to maintain the security
                of your account.
              </p>
              <p>
                Geek Intern reserves the right to disable or delete accounts found to be in violation of these Terms, used
                fraudulently, or inactive for an extended period.
              </p>
            </SectionBlock>

            <SectionBlock id="fees" title="5. Application Fees & Access">
              <p>
                Applications to Geek Intern virtual internship programs and task tracks are free of cost.
              </p>
              <div className="bg-[#FAF7F2] border border-[#E2DDD2] rounded-lg p-4 my-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-semibold text-[#1A1715]">Internship Category</div>
                  <div className="font-semibold text-[#1A1715]">Application Fee</div>
                  <div className="text-[#57534E]">Standard Virtual Internships</div>
                  <div className="text-[#2D6A4F] font-semibold">Free (₹0)</div>
                  <div className="text-[#57534E]">Core Engineering Tracks</div>
                  <div className="text-[#2D6A4F] font-semibold">Free (₹0)</div>
                </div>
              </div>
              <p>
                Applying for an internship does not guarantee selection, interview, or any form of placement. Geek Intern
                does not charge any hidden fees for standard internship applications.
              </p>
            </SectionBlock>

            <SectionBlock id="payments" title="6. Payments and Billing">
              <p>
                All payments on the Platform are processed through secure third-party payment gateways (such as Razorpay or
                equivalent) that comply with PCI-DSS standards. Geek Intern does not store your payment card details on its servers.
              </p>
              <p>
                All fees are quoted and charged in Indian Rupees (INR) inclusive of applicable taxes, including Goods and
                Services Tax (GST) as applicable. A payment receipt and GST invoice will be sent to your registered email
                address upon successful payment.
              </p>
              <p>
                In the event of a payment failure, please check your bank statement before attempting another payment.
                For duplicate payments or technical errors, contact us at <a href="mailto:support.geekintern@gmail.com" className="text-[#2D6A4F] underline">support.geekintern@gmail.com</a>{" "}
                within 7 days of the transaction with your payment reference number.
              </p>
            </SectionBlock>

            <SectionBlock id="listings" title="7. Internship Listings">
              <p>
                Internship listings published on the Platform are provided by Internship Providers or Geek Intern tracks. Geek Intern conducts
                reasonable due diligence to verify the authenticity of project tracks and listings; however,
                we do not warrant, represent, or guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The accuracy, completeness, or currency of any internship description;</li>
                <li>That any internship will remain available or unfilled at the time of your application;</li>
                <li>That you will be shortlisted, interviewed, or selected for any external internship;</li>
                <li>The quality, duration, or outcome of any external internship experience;</li>
                <li>That any stipend mentioned will be paid as described.</li>
              </ul>
              <p>
                All external selection decisions are made solely by the Internship Provider. Geek Intern has no influence over and
                accepts no responsibility for selection or rejection decisions by third parties.
              </p>
            </SectionBlock>

            <SectionBlock id="certificates" title="8. Certificates">
              <p>
                Upon successful completion of an internship, Geek Intern may issue a digital internship completion certificate
                on behalf of or in partnership with the Internship Provider. The issuance of certificates is subject to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confirmation of satisfactory completion and milestone submission;</li>
                <li>Submission of any required completion documentation by the student;</li>
                <li>The student's account being in good standing.</li>
              </ul>
              <p>
                Geek Intern is not responsible for delays in certificate issuance caused by external providers failing to
                confirm completion. Students who believe their certificate has been unreasonably delayed may contact us at{" "}
                <a href="mailto:support.geekintern@gmail.com" className="text-[#2D6A4F] underline">support.geekintern@gmail.com</a>.
                Certificates issued through the Platform are digital only; physical certificates are not provided.
              </p>
            </SectionBlock>

            <SectionBlock id="prohibited" title="9. Prohibited Activities">
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Providing false, misleading, or inaccurate information in your profile or application;</li>
                <li>Applying to an internship on behalf of another person;</li>
                <li>Creating multiple accounts to circumvent application limits or suspensions;</li>
                <li>Attempting to reverse-engineer, scrape, or copy any content from the Platform;</li>
                <li>Using automated tools or bots to interact with the Platform;</li>
                <li>Interfering with or disrupting the Platform infrastructure;</li>
                <li>Using the Platform for any unlawful or fraudulent purpose;</li>
                <li>Harassing, abusing, or harming another person or communicating offensive content.</li>
              </ul>
            </SectionBlock>

            <SectionBlock id="ip" title="10. Intellectual Property">
              <p>
                All content on the Platform, including text, graphics, logos, icons, images, software, and compilations,
                is the property of Geek Intern or its content suppliers and is protected by Indian and international copyright
                and intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from, or publicly display any Platform
                content without our prior written consent.
              </p>
            </SectionBlock>

            <SectionBlock id="liability" title="11. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, Geek Intern, its directors, employees, and agents shall
                not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of
                profits, data, or goodwill, arising out of:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your access to or inability to access the Platform;</li>
                <li>Any conduct or content of any third party on the Platform;</li>
                <li>Any content obtained from the Platform;</li>
                <li>Unauthorised access, use, or alteration of your transmissions or content.</li>
              </ul>
              <p>
                In no event shall Geek Intern's aggregate liability exceed the amount paid by you to Geek Intern in the twelve
                (12) months preceding the claim.
              </p>
            </SectionBlock>

            <SectionBlock id="termination" title="12. Termination">
              <p>
                We may suspend or terminate your account and access to the Platform immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users or the Platform. You may request
                account deletion by contacting us.
              </p>
            </SectionBlock>

            <SectionBlock id="contact" title="13. Contact">
              <p>
                If you have any questions, concerns, or complaints regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-[#FAF7F2] border border-[#E2DDD2] rounded-lg p-4 mt-3 text-sm">
                <p className="font-semibold text-[#1A1715] mb-2">Geek Intern Technologies</p>
                <p>Email: <a href="mailto:support.geekintern@gmail.com" className="text-[#2D6A4F] underline">support.geekintern@gmail.com</a></p>
                <p>Address: Ambikapur, Chhattisgarh, India</p>
                <p className="mt-2 text-[#57534E]">Response time: Within 2–3 business days</p>
              </div>
            </SectionBlock>
          </main>
        </div>
      </div>
    </div>
    </PublicLayout>
  );
}
