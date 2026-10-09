import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FAQ } from '@/types'
import { cn } from '@/lib/utils'

const PLACEHOLDER_FAQS: FAQ[] = [
  {
    id: '1', question: 'How do I apply for an internship?', order_index: 1, is_active: true, category: 'general',
    answer: 'Browse internships on our platform, click on an internship you are interested in, and click the Apply button. You will be asked to pay the application fee (?100-?150) via Razorpay, after which your application will be submitted.'
  },
  {
    id: '2', question: 'What is the application fee for?', order_index: 2, is_active: true, category: 'payment',
    answer: 'The application fee covers screening, resume review, and coordination with the internship provider. It ranges from ?100 to ?150 per application depending on the internship.'
  },
  {
    id: '3', question: 'Are the internships paid or unpaid?', order_index: 3, is_active: true, category: 'general',
    answer: 'Both paid and unpaid internships are available on our platform. You can filter by "Paid" when browsing. Stipend amounts vary by role and company.'
  },
  {
    id: '4', question: 'Can my college partner with Geek Intern?', order_index: 4, is_active: true, category: 'college',
    answer: 'Yes! We partner with engineering and management colleges across India. Register your college using the College Registration form and our team will get in touch within 2 business days.'
  },
  {
    id: '5', question: 'What is the refund policy?', order_index: 5, is_active: true, category: 'payment',
    answer: 'Application fees are non-refundable as they cover processing costs. However, if an internship is cancelled by the provider, a full refund will be issued. Please read our Refund Policy for details.'
  },
  {
    id: '6', question: 'How long does it take to hear back after applying?', order_index: 6, is_active: true, category: 'general',
    answer: 'Typically within 7-14 business days. You will receive an email notification and your dashboard will be updated with the application status.'
  },
]

interface FAQAccordionProps {
  faqs?: FAQ[]
  className?: string
}

export function FAQAccordion({ faqs = PLACEHOLDER_FAQS, className }: FAQAccordionProps) {
  const activeFaqs = faqs.filter((f) => f.is_active).sort((a, b) => a.order_index - b.order_index)

  return (
    <div className={cn('w-full', className)}>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {activeFaqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-2xl border border-[#E2DDD2] dark:border-[#292524] bg-[#FAF7F2] dark:bg-[#1C1A17] px-5 sm:px-6 transition-all duration-300 hover:border-[#181615]/30 hover:shadow-xs overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-[#1A1715] dark:text-[#FAF7F2] hover:text-[#8C4325] dark:hover:text-[#FAF7F2] transition-colors py-4">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 pr-3 text-left">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#8C4325] bg-[#F0E6DC] dark:bg-[#8C4325]/20 dark:text-[#F0E6DC] px-2.5 py-0.5 rounded-full border border-[#E4D5C7] dark:border-stone-700 shrink-0">
                  {faq.category || 'FAQ'}
                </span>
                <span>{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed pb-4 pt-2 border-t border-[#E2DDD2]/60 dark:border-stone-800">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}


export default FAQAccordion
