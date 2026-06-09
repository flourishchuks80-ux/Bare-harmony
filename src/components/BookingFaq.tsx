import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

const COLUMN_1_FAQS: FaqItemData[] = [
  {
    id: 'room-preferences',
    question: 'How do I request specific suite preferences or dietary amenities?',
    answer: 'You can specify room demands (such as high-floor preference, hypoallergenic linens, or baby cots) directly during checkout. If you have dietary rules, our concierge will coordinate directly with the resort\'s dining staff before your arrival.'
  },
  {
    id: 'flexible-cancellations',
    question: 'How does the flexible cancellation policy work for premium resorts?',
    answer: 'Most boutique resorts on Bare-harmony offer complimentary cancellation up to 48 hours prior to physical check-in. The precise cancellation window is clearly presented on your official digital stay voucher.'
  },
  {
    id: 'curated-selection',
    question: 'How does Bare-harmony curate its portfolio of Spain & Australia hotels?',
    answer: 'We hand-select only independent, high-grade architectural landmarks that combine supreme contemporary boutique comfort with classic local identity. Each property is audited for design superiority and wellness excellence.'
  }
];

const COLUMN_2_FAQS: FaqItemData[] = [
  {
    id: 'booking-process',
    question: 'How do I search for and book a stay on Bare-harmony?',
    answer: 'Simply enter your destination city (e.g. Sydney, Barcelona, Madrid), select your dates using our custom calendar companion, and review real-time availability. Confirmation is instant, and your official stay voucher compiles immediately.'
  },
  {
    id: 'payment-currencies',
    question: 'Can I pay for my reservation in multiple currencies?',
    answer: 'Yes, our platform supports live conversions across multiple major global currencies (USD, EUR, AUD, GBP, CHF) directly within the user interface, ensuring pricing is clear and has no hidden conversion overheads.'
  },
  {
    id: 'voucher-delivery',
    question: 'How will my official confirmation voucher be delivered?',
    answer: 'Immediately upon processing, the web app presents a complete premium digital voucher. You can download this voucher, launch an instant WhatsApp direct sync with our booking desk, or export details to your digital calendar.'
  }
];

export default function BookingFaq() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaqId(prev => (prev === id ? null : id));
  };

  const renderFaqGroup = (items: FaqItemData[]) => {
    return (
      <div 
        id="faq-accordion-group"
        className="bg-white border border-[#E7E7E7] rounded-[8px] overflow-hidden flex flex-col shadow-2xs"
      >
        {items.map((item, idx) => {
          const isOpen = activeFaqId === item.id;
          const isLast = idx === items.length - 1;

          return (
            <div 
              key={item.id} 
              className={`flex flex-col ${!isLast ? 'border-b border-[#E7E7E7]' : ''}`}
            >
              {/* Accordion Row Header */}
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="w-full flex justify-between items-center px-[20px] py-[18px] hover:bg-slate-50/50 transition duration-150 cursor-pointer text-left select-none outline-none"
                aria-expanded={isOpen}
              >
                <span 
                  className="text-[16px] font-bold text-[#1A1A1A] pr-4 leading-[1.4]"
                  style={{
                    fontFamily: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                  }}
                >
                  {item.question}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-[#4A4A4A] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-booking-blue' : ''}`}
                />
              </button>

              {/* Accordion Expanding Panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden bg-slate-50/60"
                  >
                    <div className="px-[20px] pb-[18px] text-[14px] text-[#595959] leading-[1.6]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="booking-faq-section"
      className="w-full bg-white py-12 border-b border-[#E7E7E7]"
      style={{
        fontFamily: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* FAQs Header */}
        <div id="faq-header" className="mb-[24px]">
          <h2 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight leading-[1.3]">
            FAQs about hotels on Bare-harmony
          </h2>
        </div>

        {/* Dynamic Accordion Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-start">
          {renderFaqGroup(COLUMN_1_FAQS)}
          {renderFaqGroup(COLUMN_2_FAQS)}
        </div>

      </div>
    </section>
  );
}
