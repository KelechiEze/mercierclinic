import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import logoIcon from '../assets/logo_icon_1782246015172.jpg';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onNavClick, onBookClick }: FooterProps) {
  const services = [
    { name: 'Back Pain & Sciatica Relief', id: 'services' },
    { name: 'Neck & Shoulder Stiffness', id: 'services' },
    { name: 'Migraines & Sinus Trouble', id: 'services' },
    { name: 'Chiropractic Adjustments', id: 'services' },
    { name: 'Deep Tissue Therapies', id: 'services' },
    { name: 'Spinal Decompression', id: 'services' },
  ];

  const quickLinks = [
    { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Services', action: () => onNavClick('services') },
    { name: 'Our Clinic', action: () => onNavClick('clinic') },
    { name: 'Our Team', action: () => onNavClick('dentists') },
    { name: 'Contact Us', action: onBookClick },
    { name: 'Privacy Policy', action: () => alert('Privacy Policy is currently under construction.') },
  ];

  return (
    <footer className="bg-[#fcfdfc] border-t border-gray-100 mt-20 pt-16 pb-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start pb-12 border-b border-gray-100">
        
        {/* Left Column: Brand Logo */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-white shadow-xs">
              <img
                src={logoIcon}
                alt="Mercier Chiropractic Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Services
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            {services.map((service, i) => (
              <li key={i}>
                <button
                  onClick={() => onNavClick('treatments')}
                  className="text-gray-500 hover:text-[#15803d] transition-colors cursor-pointer text-left"
                >
                  {service.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs font-sans">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <button
                  onClick={link.action}
                  className="text-gray-500 hover:text-[#15803d] transition-colors cursor-pointer text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Contact Info
          </h4>
          <ul className="space-y-3.5 text-xs font-sans text-gray-500">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <a href="mailto:info@mercierchiropractic.com" className="hover:text-[#15803d] transition-colors">
                info@mercierchiropractic.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <a href="tel:+16625629021" className="hover:text-[#15803d] transition-colors">
                +1 662-562-9021
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                559 N Robinson St,<br />
                Senatobia, MS 38668
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Mon, Tue, Wed, Fri: 8 AM–12 PM, 2–6 PM (Thu, Sat, Sun: Closed)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Social Media Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#15803d] hover:border-[#15803d] hover:bg-emerald-50/10 transition-all"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#15803d] hover:border-[#15803d] hover:bg-emerald-50/10 transition-all"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#15803d] hover:border-[#15803d] hover:bg-emerald-50/10 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright info */}
        <span className="text-xs font-sans text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} Mercier Chiropractic Clinic. All rights reserved.
        </span>

      </div>
    </footer>
  );
}
