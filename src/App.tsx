import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, ArrowRight, Award, ArrowUpRight, Sparkles, Clock, Compass } from 'lucide-react';

import heroOne from './assets/hero_adjustment_one_1782245424393.jpg';
import heroTwo from './assets/hero_clinic_interior_1782245440403.jpg';
import heroThree from './assets/hero_happy_mobility_1782245456030.jpg';
import heroFour from './assets/hero_chiro_consultation_1782245469662.jpg';

import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import AboutModal from './components/AboutModal';
import ActiveBookings from './components/ActiveBookings';
import TreatmentsSection from './components/TreatmentsSection';
import SaraTestimonial from './components/SaraTestimonial';
import DentalExperts from './components/DentalExperts';
import ValuePropsSection from './components/ValuePropsSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

const HERO_IMAGES = [
  heroOne,
  heroTwo,
  heroThree,
  heroFour
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentHeroBgIndex, setCurrentHeroBgIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [refreshBookings, setRefreshBookings] = useState(0);

  // States to hold preselected dentist or service for booking
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedDentist, setPreselectedDentist] = useState<string>('');

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    // Background slideshow interval of 5 seconds
    const interval = setInterval(() => {
      setCurrentHeroBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const triggerBookingWithPreselection = (serviceId?: string, dentistId?: string) => {
    if (serviceId) setPreselectedService(serviceId);
    if (dentistId) setPreselectedDentist(dentistId);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setRefreshBookings(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f5] text-[#1a241b] relative pb-16 selection:bg-[#b6f05e] selection:text-[#0f172a]">
      {/* Navbar */}
      <Navbar
        onBookClick={() => triggerBookingWithPreselection('consultation-full')}
        onAboutClick={() => setAboutModalOpen(true)}
      />

      <main className="pt-24 sm:pt-28 md:pt-32 space-y-6">
        {/* Active Bookings Manager banner (shows up only if user has active bookings) */}
        <ActiveBookings
          refreshTrigger={refreshBookings}
          onCancelBooking={() => setRefreshBookings(prev => prev + 1)}
        />

        {/* 1. HERO SECTION CONTAINER */}
        <section id="home" className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative w-full rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#0f1a11] min-h-[500px] sm:min-h-[560px] md:min-h-[640px] flex items-center shadow-xl border border-emerald-950/20"
          >
            {/* Background Image Slideshow with Framer Motion Slide-out Transition */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentHeroBgIndex}
                  src={HERO_IMAGES[currentHeroBgIndex]}
                  alt="Dentix Restorative Space"
                  className="absolute inset-0 w-full h-full object-cover object-[center_right] sm:object-right"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 0.85 }}
                  exit={{ x: '-100%', opacity: 0 }}
                  transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              {/* Linear gradient overlay covering left-hand side for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 sm:via-black/65 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a11]/95 via-transparent to-transparent z-10 sm:hidden pointer-events-none" />
            </div>

            {/* Content (Z-INDEX 20) */}
            <div className="relative z-20 max-w-2xl px-6 sm:px-10 md:px-14 py-16 sm:py-20 text-white flex flex-col justify-between h-full">
              <div className="space-y-6 sm:space-y-8">
                {/* Title */}
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-[56px] leading-[1.05] tracking-tight text-white max-w-lg">
                  Live Life Without the Ache.
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-[13.5px] sm:text-[15px] leading-relaxed text-gray-300 max-w-md">
                  Get expert, personalized chiropractic care in Senatobia to relieve chronic pain, fix stiff joints, and restore your natural mobility today.
                </p>

                {/* Main Action Button */}
                <div className="space-y-3">
                  <button
                    onClick={() => triggerBookingWithPreselection('consultation-full')}
                    className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-[#b6f05e] hover:bg-[#a3e635] text-[#0f172a] font-sans font-bold text-sm sm:text-[14.5px] transition-all duration-300 shadow-lg hover:shadow-[#b6f05e]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                  >
                    Claim Your Relief Now
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0 transition-transform duration-300 group-hover:rotate-45">
                      ↗
                    </span>
                  </button>
                  <p className="text-[11px] text-gray-300 italic block">
                    *We accept top insurance providers & CareCredit healthcare financing.*
                  </p>
                </div>
              </div>

              {/* Bottom Group (Avatars & Google Rating) */}
              <div className="mt-14 sm:mt-20 flex flex-wrap items-center gap-5 pt-6 border-t border-white/10">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
                  ].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Reviewer Avatar"
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#0f1a11]"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-display font-bold text-sm text-white">4.9</span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 block font-medium">
                    Rated 4.9/5 by the Senatobia Community
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TRUST RATING BADGE ROW */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-2xs hover:shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-sans font-bold text-gray-900 leading-snug">4.9/5 Rated Practice</p>
                <p className="text-[11px] text-gray-400 font-medium">By the Senatobia Community</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-2xs hover:shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#15803d] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-sans font-bold text-gray-900 leading-snug">Fully Accessible Entry</p>
                <p className="text-[11px] text-gray-400 font-medium">Wheelchair Entry & Free On-Site Parking</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-2xs hover:shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50/70 flex items-center justify-center text-blue-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-sans font-bold text-gray-900 leading-snug">Free Client Wi-Fi</p>
                <p className="text-[11px] text-gray-400 font-medium">Available In-Clinic</p>
              </div>
            </div>
          </div>
        </section>


        {/* 2. EXPERT DENTAL TREATMENTS SECTION */}
        <TreatmentsSection
          onServiceSelect={(id) => triggerBookingWithPreselection(id)}
        />

        {/* 3. PATIENT TESTIMONIAL STORIES (SARA ACCURATE CLONE) */}
        <SaraTestimonial />

        {/* 4. SPECIALISTS GRID SECTION */}
        <DentalExperts
          onDentistSelect={(id) => triggerBookingWithPreselection(undefined, id)}
        />

        {/* 5. THREE VALUE CARDS SECTION */}
        <ValuePropsSection />

        {/* 6. PATIENT CASE STUDIES SECTION */}
        <CaseStudiesSection />

        {/* 7. PROMO SIGN UP BANNER */}
        <PromoBanner
          onBookClick={() => triggerBookingWithPreselection('consultation-full')}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onNavClick={(id) => {
          const element = document.getElementById(id);
          if (element) {
            const offset = 90; // offset for sticky navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }}
        onBookClick={() => triggerBookingWithPreselection('consultation-full')}
      />

      {/* MODALS */}
      <AnimatePresence>
        {bookingModalOpen && (
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => {
              setBookingModalOpen(false);
              setPreselectedService('');
              setPreselectedDentist('');
            }}
            onBookingSuccess={handleBookingSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutModalOpen && (
          <AboutModal
            isOpen={aboutModalOpen}
            onClose={() => setAboutModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Preloader with 3s slide-up reveal curtain */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
