import { Star, GraduationCap, Calendar } from 'lucide-react';
import { DENTISTS } from '../data';

interface DentistGridProps {
  onDentistSelect: (dentistId: string) => void;
}

export default function DentistGrid({ onDentistSelect }: DentistGridProps) {
  return (
    <section id="dentists" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-gray-100 bg-[#fbfcfb]/40">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1 bg-[#15803d]/10 px-3 py-1 rounded-full text-[#15803d] font-sans font-semibold text-xs tracking-wider uppercase mb-3">
          <Star className="w-3.5 h-3.5 fill-current" /> OUR CHIROPRACTIC EXPERTS
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-none">
          Meet Our Specialists
        </h2>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          Our clinicians are board-certified leaders in chiropractic spinal adjustments, physical rehabilitation, corrective exercises, and therapeutic deep tissue release.
        </p>
      </div>

      {/* Grid of Dentist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DENTISTS.map((dentist) => (
          <div
            key={dentist.id}
            className="group rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <img
                src={dentist.image}
                alt={dentist.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs font-semibold text-amber-500 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-current" /> {dentist.rating}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div>
                  <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-[#15803d] transition-colors leading-tight">
                    {dentist.name}
                  </h3>
                  <span className="text-[11.5px] font-semibold text-[#15803d] tracking-wide block mt-0.5 uppercase">
                    {dentist.role}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {dentist.bio}
                </p>

                {/* Credentials */}
                <div className="flex items-start gap-2 text-[10.5px] text-gray-500 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                  <GraduationCap className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="leading-normal">{dentist.education}</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onDentistSelect(dentist.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#142216] text-white hover:text-[#b6f05e] font-sans font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
