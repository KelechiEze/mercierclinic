import { motion } from 'motion/react';
import { X, Sparkles, MapPin, Clock, Phone, Heart, Award, Cpu } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="about-modal-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Heading */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#15803d]/10 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-[#15803d]" />
            </div>
            <h2 className="font-display font-bold text-xl text-gray-900 tracking-tight">
              About Mercier Chiropractic Clinic
            </h2>
          </div>

          {/* Content Layout (Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mission Card */}
            <div className="p-5 rounded-2xl bg-[#f6f8f5] border border-gray-100 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#15803d]">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-[11px] font-bold tracking-wider uppercase">Our Philosophy</span>
                </div>
                <h3 className="font-semibold text-sm text-gray-900">Your Path to Wellness Starts Here</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We believe that pain relief should be personal, effective, and accessible. We don't just mask your symptoms—we target the root cause of your discomfort in a friendly, welcoming environment.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center gap-2 text-[10px] text-gray-400">
                <Award className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Expert Care Led by Dr. Douglas Mercier, DC</span>
              </div>
            </div>

            {/* Tech Card */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[#b6f05e]">
                  <Cpu className="w-4 h-4" />
                  <span className="text-[11px] font-bold tracking-wider uppercase">Treatment Approach</span>
                </div>
                <h3 className="font-semibold text-sm text-white">Targeted Spinal & Manual Therapy</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We utilize specialized manual adjustments and deep tissue therapies to stabilize spinal alignment, reduce joint pressure, and restore natural biomechanical mobility.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-[#b6f05e]" />
                <span>Specialized sciatica & headache care protocols</span>
              </div>
            </div>

            {/* Visit Details Card */}
            <div className="p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
              <h4 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Operating Hours</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Mon, Tue, Wed, Fri:</span>
                  <span>8:00 AM – 12:00 PM, 2:00 PM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium">Thursday:</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="font-medium">Sat & Sun:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <h4 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Location & Contact</h4>
              <div className="space-y-3.5 mt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-600 leading-normal">
                    <strong>Mercier Chiropractic Clinic</strong> <br />
                    559 N Robinson St <br />
                    Senatobia, MS 38668
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#15803d]" />
                  <span className="text-xs font-semibold text-gray-800">+1 662-562-9021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-xs transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
