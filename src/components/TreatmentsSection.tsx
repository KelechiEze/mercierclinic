import { motion } from 'motion/react';
import { Star, ArrowUpRight, Activity, Shield, Sparkles, Heart } from 'lucide-react';
import { SERVICES } from '../data';

const IconMap: Record<string, any> = {
  Activity: Activity,
  Shield: Shield,
  Sparkles: Sparkles,
  Heart: Heart,
};

interface TreatmentsSectionProps {
  onServiceSelect: (serviceId: string) => void;
}

export default function TreatmentsSection({ onServiceSelect }: TreatmentsSectionProps) {
  // Use first 3 chiropractic services for the stacked list
  const treatments = SERVICES.filter(s => s.id !== 'consultation-full');

  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column */}
        <motion.div 
          className="lg:col-span-5 space-y-6 lg:sticky lg:top-32"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Rating Display */}
          <div className="flex items-center gap-2 bg-white/80 border border-gray-100 rounded-full px-4 py-2 w-fit shadow-2xs">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-sans font-bold text-gray-900">4.9</span>
            <span className="text-xs font-sans text-gray-400 font-medium">(158 Reviews)</span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[54px] text-gray-900 leading-[1.08] tracking-tight">
            Don't Let Pain <br />
            Dictate Your Day.
          </h2>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
            We use targeted spinal adjustments and specialized manual therapies to provide lasting relief from daily discomfort.
          </p>

          {/* All Services button */}
          <div className="pt-2">
            <button
              onClick={() => onServiceSelect('consultation-full')}
              className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#15803d] hover:bg-[#166534] text-white font-sans font-bold text-sm sm:text-[14.5px] transition-all duration-300 shadow-md hover:shadow-[#15803d]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
            >
              All Services
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Column (Stacked Cards) */}
        <div className="lg:col-span-7 space-y-5">
          {treatments.map((treatment, idx) => {
            const IconComponent = IconMap[treatment.iconName] || Activity;
            return (
              <motion.div
                key={treatment.id}
                onClick={() => onServiceSelect(treatment.id)}
                className="group p-5 sm:p-6 rounded-[28px] bg-white border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                {/* Subtle green line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#15803d] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 rounded-l-2xl" />

                {/* Elegant Icon Box */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shrink-0 bg-slate-50 flex items-center justify-center p-4 border border-gray-100 group-hover:bg-emerald-50 transition-colors duration-300">
                  <IconComponent className="w-10 h-10 text-[#15803d] transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Text content */}
                <div className="text-center sm:text-left flex-1 space-y-1.5 pr-2">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900 group-hover:text-[#15803d] transition-colors duration-300">
                    {treatment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                    {treatment.description}
                  </p>
                </div>

                {/* Hidden Action Indicator on Right (Desktop only) */}
                <div className="hidden sm:flex w-9 h-9 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#15803d]/10 group-hover:text-[#15803d] items-center justify-center transition-all duration-300 shrink-0 self-center">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
