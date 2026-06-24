import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface PromoBannerProps {
  onBookClick: () => void;
}

export default function PromoBanner({ onBookClick }: PromoBannerProps) {
  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
  ];

  return (
    <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-12">
      <motion.div
        className="w-full rounded-[36px] bg-[#15803d] p-6 sm:p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Background blobs for premium depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Macro Smile Image */}
          <div className="lg:col-span-4 shrink-0">
            <motion.div
              className="rounded-[24px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-square bg-emerald-950/20 border border-emerald-600/30 shadow-inner"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/promo_signup_wellness_1782245500504.jpg`}
                alt="Mercier Chiropractic Treatment Room"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right Column: Text, Ratings & Button */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:pl-4">
            
            <div className="space-y-6 max-w-xl">
              {/* Heading */}
              <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-[42px] leading-[1.1] tracking-tight text-white">
                Live Life Without the Ache. Request Your Appointment Today.
              </h2>

              {/* Review Avatars & Rating Info */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Avatars Stack */}
                <div className="flex -space-x-2.5">
                  {avatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Reviewer ${i + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-[#15803d] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>

                {/* Rating Info */}
                <div className="flex flex-col text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>4.9</span>
                    <div className="flex text-amber-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs text-emerald-100 font-medium mt-0.5">
                    Rated 4.9/5 by the Senatobia Community
                  </span>
                </div>
              </div>
            </div>

            {/* Book Button */}
            <div className="shrink-0 pt-2 md:pt-0 self-start md:self-center">
              <motion.button
                onClick={onBookClick}
                className="px-8 py-4 sm:px-9 sm:py-4.5 bg-white text-[#15803d] hover:bg-[#b6f05e] hover:text-emerald-950 font-sans font-bold text-sm sm:text-base rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Online
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </motion.button>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
