import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Star } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
    } else {
      setOpenIndex(idx);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto border-t border-gray-100">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1 bg-[#15803d]/10 px-3 py-1 rounded-full text-[#15803d] font-sans font-semibold text-xs tracking-wider uppercase mb-3">
          <HelpCircle className="w-3.5 h-3.5" /> TREATMENT ACCESSIBILITY
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight leading-none">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-gray-500 mt-2">
          Everything you need to know about spinal care, adjustments, and modern chiropractic healing.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-[#15803d] bg-white shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 bg-white/50'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-sans font-semibold text-[13.5px] sm:text-sm text-gray-800 hover:text-[#15803d] transition-colors leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'text-[#15803d] rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
