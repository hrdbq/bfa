/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Instagram, Youtube, Clock, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/images/academy_logo_1781504822680.jpg';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setIsAdminMode: (isAdmin: boolean) => void;
}

export default function Footer({ setCurrentPage, setIsAdminMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handlePageClick = (pageId: string) => {
    setIsAdminMode(false);
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000d21] border-t border-white/10 pt-16 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Presentation Columns */}
          <div className="md:col-span-1 space-y-4" id="footer-branding">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImg} 
                alt="Bogor Futsal Academy" 
                className="w-[46px] h-[46px] rounded-full object-cover border border-white/20 shadow-md"
              />
              <div>
                <h4 className="font-display font-black text-sm tracking-wider uppercase">
                  BOGOR CITY
                </h4>
                <p className="font-display text-[10px] font-bold text-accent-blue tracking-[0.2em] uppercase leading-none mt-0.5">
                  FUTSAL ACADEMY
                </p>
              </div>
            </div>
            
            <p className="text-white/60 text-xs leading-relaxed font-sans">
              West Java's premier futsal academy. Developing high-tactical awareness, elite motor skills, and champion character inside active youth athletes.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-navy hover:bg-accent-blue hover:text-primary-navy flex items-center justify-center transition-all min-h-[40px]"
                id="social-ig"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-navy hover:bg-accent-blue hover:text-primary-navy flex items-center justify-center transition-all min-h-[40px]"
                id="social-yt"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-navy hover:bg-accent-blue hover:text-primary-navy flex items-center justify-center transition-all min-h-[40px]"
                id="social-tt"
              >
                <span className="font-black text-xs">𝕏</span>
              </a>
            </div>
          </div>

          {/* Nav Shortcut Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent-blue">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button 
                  onClick={() => handlePageClick('home')}
                  className="hover:text-accent-blue hover:underline cursor-pointer min-h-[30px] inline-flex items-center"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('programs')}
                  className="hover:text-accent-blue hover:underline cursor-pointer min-h-[30px] inline-flex items-center"
                >
                  Training Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('coaches')}
                  className="hover:text-accent-blue hover:underline cursor-pointer min-h-[30px] inline-flex items-center"
                >
                  Elite Coaches & Staff
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('events')}
                  className="hover:text-accent-blue hover:underline cursor-pointer min-h-[30px] inline-flex items-center"
                >
                  Events & Tournaments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('gallery')}
                  className="hover:text-accent-blue hover:underline cursor-pointer min-h-[30px] inline-flex items-center"
                >
                  Media Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Info Categories and Shortcuts */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent-blue">
              Age Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button 
                  onClick={() => handlePageClick('programs')}
                  className="hover:text-accent-blue text-left block cursor-pointer min-h-[30px]"
                >
                  <span className="font-bold text-white block">U6 - U9 Years</span>
                  <span className="opacity-75">Fun Futsal Foundation</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('programs')}
                  className="hover:text-accent-blue text-left block cursor-pointer min-h-[30px]"
                >
                  <span className="font-bold text-white block">U10 - U15 Years</span>
                  <span className="opacity-75">Technical & Tactical Dev.</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageClick('programs')}
                  className="hover:text-accent-blue text-left block cursor-pointer min-h-[30px]"
                >
                  <span className="font-bold text-white block">U16 - U18 & Elite</span>
                  <span className="opacity-75">Performance & Pro Pathway</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Venue Physical Address Coordinates */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent-blue">
              Academy Venue
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-accent-blue shrink-0 mt-0.5" />
                <span>
                  <strong>GOR Pajajaran Arena:</strong><br />
                  Jl. Pemuda No.15, Tanah Sareal, Kota Bogor, Jawa Barat 16161
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={15} className="text-accent-blue shrink-0" />
                <span>+62 812-8888-0112</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={15} className="text-accent-blue shrink-0" />
                <span>info@bogorcityfutsal.id</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock size={15} className="text-accent-blue shrink-0" />
                <span>Office: Mon - Sat: 08:30 - 18:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sponsor/Partner Logos Small Band - Gray scale styling */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-accent-blue" />
            <span className="text-[11px] font-mono text-white/45 tracking-widest uppercase">
              RECOGNIZED INDONESIAN GOLD BRAND ACADEMY
            </span>
          </div>
          <div className="text-[11px] font-mono text-white/45">
            Designed for Athletic Excellence • Powered by Professional Coaches
          </div>
        </div>

        {/* End Credits copyright bar */}
        <div className="border-t border-white/5 pt-8 text-center text-[11px] text-white/45 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Bogor City Futsal Academy (BCFA). All rights reserved.</p>
          <div className="flex space-x-6">
            <button 
              onClick={() => handlePageClick('contact')} 
              className="hover:text-white cursor-pointer min-h-[30px]"
            >
              FAQ Support
            </button>
            <button 
              onClick={() => setIsAdminMode(true)} 
              className="hover:text-accent-blue text-accent-blue/80 font-bold transition-all cursor-pointer min-h-[30px]"
            >
              Staff Portal Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
