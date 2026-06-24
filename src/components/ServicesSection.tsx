import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Check, ChevronRight, Activity, Shield, Sparkles, Zap } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesSectionProps {
  onServiceSelect: (serviceId: string) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Label and Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1 bg-[#15803d]/10 px-3 py-1 rounded-full text-[#15803d] font-sans font-semibold text-xs tracking-wider uppercase mb-3">
          <Star className="w-3.5 h-3.5 fill-current" /> CLINICAL FOCUS & SOLUTIONS
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-none">
          Our Chiropractic Services
        </h2>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          Explore our range of clinical therapies designed to treat root stiffness, ease nerve impingements, and rebuild functional mobility safely.
        </p>
      </div>

      {/* Main Layout (Split View: left is active card selection, right is expanded interactive detail card) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column: Services selector list (2/5 size) */}
        <div className="lg:col-span-2 space-y-3">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center justify-between gap-4 ${
                selectedService.id === service.id
                  ? 'border-[#15803d] bg-white shadow-md'
                  : 'border-gray-100 hover:border-gray-200 bg-white/50 hover:bg-white'
              }`}
            >
              {selectedService.id === service.id && (
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#15803d]" />
              )}
              
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  selectedService.id === service.id
                    ? 'bg-[#15803d]/10 text-[#15803d]'
                    : 'bg-gray-50 text-gray-400 group-hover:bg-[#15803d]/5 group-hover:text-[#15803d]'
                }`}>
                  {renderIcon(service.iconName, 'w-5 h-5')}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[14.5px] text-gray-900 leading-snug">
                    {service.title}
                  </h3>
                  <span className="text-xs text-[#15803d] font-semibold block mt-0.5">
                    {service.price}
                  </span>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                selectedService.id === service.id ? 'text-[#15803d] translate-x-1' : 'text-gray-300 group-hover:text-gray-500'
              }`} />
            </button>
          ))}
        </div>

        {/* Right column: Beautiful active details panel (3/5 size) */}
        <div className="lg:col-span-3">
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xl flex flex-col justify-between min-h-[400px]"
          >
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#15803d]/10 text-[#15803d] flex items-center justify-center">
                    {renderIcon(selectedService.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">
                      {selectedService.title}
                    </h3>
                    <div className="flex items-center gap-3.5 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-300" /> {selectedService.duration}
                      </span>
                      <span>• Chiropractic Practice</span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Estimated Investment</span>
                  <span className="text-lg font-bold font-display text-[#15803d]">{selectedService.price}</span>
                </div>
              </div>

              {/* Description & Clinical Indicators */}
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2">Procedure Overview</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2.5">What is Included</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    {[
                      'Full orthopedic and chiropractic posture assessment',
                      'Digital diagnostic spinal scan & palpation',
                      'Tailored joint manipulation and spinal adjustments',
                      'Therapeutic myofascial trigger point release',
                      'Guided corrective rehabilitation home-exercise plan',
                      'Dedicated post-treatment wellness and posture guidance'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-[#15803d] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action booking trigger */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400 leading-snug text-center sm:text-left">
                Select this solution to launch our interactive booking scheduler with this service preselected.
              </span>
              <button
                onClick={() => onServiceSelect(selectedService.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#b6f05e] hover:bg-[#a3e635] text-[#0f172a] font-sans font-bold text-xs transition-all shadow hover:shadow-md cursor-pointer shrink-0 whitespace-nowrap active:scale-[0.98]"
              >
                Schedule This Treatment ↗
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
