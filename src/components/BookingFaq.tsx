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
    id: 'cheap-hotels',
    question: 'How do I find budget-friendly suites on Bare-harmony?',
    answer: 'You can easily find budget-friendly options by sorting our hotel choices by "Price (lowest first)" or customizing our interactive filters such as the price-range slider. This helps you locked in the best possible rate matching your ideal spend.'
  },
  {
    id: 'hotel-deals',
    question: 'Where can I find special resort deals on Bare-harmony?',
    answer: 'Our dedicated "Last minute hotels near you" section showcases highly discounted rates for upcoming weekend stays. You can also spot verified local promotions and early-bird rates featured across our curated Swiss destinations.'
  },
  {
    id: 'listed-hotels',
    question: 'How many hotel room listings are available on Bare-harmony?',
    answer: "There are currently 21,936,990 hotel room listings on Bare-harmony, so you'll always be able to find the perfect hotel – wherever you're going!"
  }
];

const COLUMN_2_FAQS: FaqItemData[] = [
  {
    id: 'search-hotel',
    question: 'How do I search for and book a stay on Bare-harmony?',
    answer: 'Simply use our main search companion: enter your destination city, set your stay dates using our custom calendar picker, modify guest counts, and view real-time suite availability. To confirm, process a high-fidelity card check-out.'
  },
  {
    id: 'last-minute',
    question: 'How do I find cheap last-minute hotels on Bare-harmony?',
    answer: 'Our highlighted weekend deals section is updated dynamically with properties offering vacant suites at discounted, eye-catching rates. Direct booking on Bare-harmony secures instant confirmation and easy confirmation slips.'
  },
  {
    id: 'trust-reviews',
    question: 'Why should I trust Bare-harmony\'s guest reviews?',
    answer: 'All our reviews are verified for absolute authenticity. Guest feedback can only be submitted by travelers who have processed their reservations through Bare-harmony and completed their physical stay duration.'
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
