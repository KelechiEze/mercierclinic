import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Menu, X } from 'lucide-react';

// ✅ Using the WordPress logo URL
const logoIcon = "https://kelechieze.wordpress.com/wp-content/uploads/2026/06/kilp-removebg-preview.png";

interface NavbarProps {
  onBookClick: () => void;
  onAboutClick: () => void;
}

export default function Navbar({ onBookClick, onAboutClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 md:px-8 py-4 ${
          isScrolled
            ? 'top-2 sm:top-3 md:top-4 max-w-5xl mx-auto'
            : 'max-w-7xl mx-auto'
        }`}
      >
        <div
          className={`w-full transition-all duration-300 flex items-center justify-between px-6 py-3.5 rounded-2xl ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-[#e2e8f0]/40'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-white transition-transform duration-300 group-hover:scale-105 shadow-xs">
              {typeof logoIcon === 'string' && logoIcon.startsWith('http') ? (
                <img
                  src={logoIcon}
                  alt="Mercier Chiropractic Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xl">{logoIcon}</span>
              )}
            </div>
          </div>

          {/* Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Services', id: 'services' },
              { label: 'Our Clinic', id: 'clinic' },
              { label: 'Our Team', id: 'dentists' },
              { label: 'News', id: 'news' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="font-sans text-[14px] font-medium text-[#4b5563] hover:text-[#15803d] transition-colors duration-200 cursor-pointer relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#15803d] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBookClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b6f05e] hover:bg-[#a3e635] text-[#0f172a] font-sans font-semibold text-[13.5px] transition-all duration-300 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer group"
            >
              Book Online
              <motion.span
                className="inline-block"
                animate={{ x: 0, y: 0 }}
                whileHover={{ x: 2, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                ↗
              </motion.span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#1a241b] hover:bg-black/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-30 mx-4 p-6 bg-white rounded-2xl shadow-xl border border-[#cbd5e1]/30 flex flex-col gap-4 md:hidden"
          >
            {[
              { label: 'Home', id: 'home' },
              { label: 'Services', id: 'services' },
              { label: 'Our Clinic', id: 'clinic' },
              { label: 'Our Team', id: 'dentists' },
              { label: 'News', id: 'news' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left font-display font-medium text-lg py-2 text-[#334155] hover:text-[#15803d] border-b border-gray-100 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 rounded-xl bg-[#b6f05e] text-[#0f172a] text-center font-semibold flex items-center justify-center gap-2 mt-2 shadow"
            >
              <Calendar className="w-4 h-4" />
              Book Online ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}