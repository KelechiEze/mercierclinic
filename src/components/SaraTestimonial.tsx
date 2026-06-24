import { motion } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';

export default function SaraTestimonial() {
  const tags = ['Sciatica Care', 'Spinal adjustment', 'Myofascial Therapy'];

  return (
    <section id="clinic" className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-12">
      <motion.div
        className="w-full rounded-[36px] bg-[#15803d] p-6 sm:p-10 md:p-14 text-white shadow-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: Image with glass badge */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              className="rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-[4/5] bg-emerald-950/20 border border-emerald-600/20"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/images/patient_sara_chiro_1782245520252.jpg"
                alt="Sara, Chiropractic Patient"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Floating Badge (Glassmorphic) on Bottom-Left */}
            <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/30 border border-white/20 px-4 py-2.5 rounded-full flex items-center gap-2 text-white shadow-lg pointer-events-none">
              <div className="w-5 h-5 rounded-full bg-emerald-500/80 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#b6f05e]" />
              </div>
              <span className="text-xs font-sans font-bold tracking-tight">2026 Top Chiropractic Clinic ↗</span>
            </div>
          </div>

          {/* Right Column: Quotes and Details */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
            
            {/* Stars */}
            <div className="space-y-4">
              <div className="flex items-center text-amber-300 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Main Quote */}
              <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-[34px] leading-snug tracking-tight text-white max-w-2xl">
                “Super clean clinic and a very friendly staff. Dr. Mercier took time to listen, offered options, and made sure I was comfortable the whole visit.”
              </h3>
            </div>

            {/* Second Paragraph */}
            <div className="space-y-4">
              <p className="font-sans text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                “They didn’t rush anything. Every option was explained clearly, and the results speak for themselves.”
              </p>

              {/* Author */}
              <p className="text-sm font-sans font-bold text-[#b6f05e]">
                — Sara, 57
              </p>
            </div>

            {/* Tags on Bottom-Right */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-emerald-600/30">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 text-xs text-white bg-white/5 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
