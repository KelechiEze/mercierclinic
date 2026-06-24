import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DENTISTS } from '../data';

// ✅ FIX: Replace these broken imports:
// import drMercierImg from '../assets/dr_douglas_mercier_1782245484316.jpg';
// import drChenImg from '../assets/dentist_michael_1782241708510.jpg';
// import drRossImg from '../assets/dentist_tracy_1782241692402.jpg';

// ✅ With Unsplash URLs for professional headshots:
const drMercierImg = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop&crop=face";
const drChenImg = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&h=1000&fit=crop&crop=face";
const drRossImg = "https://kelechieze.wordpress.com/wp-content/uploads/2026/06/jsk.jpeg";

const dentistImages: Record<string, string> = {
  'dr-mercier': drMercierImg,
  'dr-chen': drChenImg,
  'dr-ross': drRossImg,
};

interface DentalExpertsProps {
  onDentistSelect: (dentistId: string) => void;
}

export default function DentalExperts({ onDentistSelect }: DentalExpertsProps) {
  const experts = DENTISTS;

  return (
    <section id="dentists" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#15803d] rounded-full text-xs font-bold font-mono tracking-wider">
          <span>◆</span> OUR TEAM
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight leading-tight">
          Meet Our Chiropractic & Wellness Experts
        </h2>
      </div>

      {/* Grid of Specialists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experts.map((expert, idx) => {
          const resolvedImage = dentistImages[expert.id] || expert.image;
          return (
            <motion.div
              key={expert.id}
              onClick={() => onDentistSelect(expert.id)}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              {/* Image Box */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                <img
                  src={resolvedImage}
                  alt={expert.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Profile Info */}
              <div className="p-5 flex items-center justify-between gap-4 border-t border-gray-50 bg-white">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-[15px] sm:text-base text-gray-900 group-hover:text-[#15803d] transition-colors duration-300">
                    {expert.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium font-sans">
                    {expert.role}
                  </p>
                </div>

                {/* Float Arrow button */}
                <div className="w-8 h-8 rounded-full bg-slate-50 text-gray-400 group-hover:bg-[#15803d]/10 group-hover:text-[#15803d] flex items-center justify-center transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Underneath Message & Action */}
      <div className="text-center max-w-3xl mx-auto pt-6 space-y-6">
        <p className="font-sans text-base sm:text-lg md:text-[19px] leading-relaxed text-gray-600">
          <span className="text-[#15803d] font-bold">Our promise:</span> You'll never feel rushed here. We explain options clearly, plan carefully, and deliver treatment with steady hands and modern tools.
        </p>

        {/* Specialists Button */}
        <div>
          <button
            onClick={() => onDentistSelect('')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#15803d] hover:bg-[#166534] text-white font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-[#15803d]/20 hover:-translate-y-0.5 cursor-pointer group"
          >
            Our Specialists
            <span className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </div>

    </section>
  );
}