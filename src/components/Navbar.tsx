/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, X, LayoutDashboard, Home, BookOpen, Users, Calendar, Image, Mail, ArrowRight 
} from 'lucide-react';
import logoImg from '../assets/images/academy_logo_1781504822680.jpg';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
  pendingInquiriesCount: number;
  pendingRegistrationsCount: number;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isAdminMode,
  setIsAdminMode,
  pendingInquiriesCount,
  pendingRegistrationsCount
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav links for the public website with designated visual representation icons
  const pubLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'coaches', label: 'Coaches & Staff', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  const totalNotifications = pendingInquiriesCount + pendingRegistrationsCount;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#020e22]/90 backdrop-blur-md border-b border-white/5 shadow-xl' 
        : 'bg-transparent border-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-18' : 'h-24'
        }`}>
          
          {/* Logo Brand container */}
          <div 
            id="nav-logo"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
            <img 
              src={logoImg} 
              alt="Bogor Futsal Academy" 
              className="w-[46px] h-[46px] rounded-full object-cover border border-white/20"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-[0.14em] text-white uppercase leading-none">
                BOGOR FUTSAL
              </span>
              <span className="font-display text-[9px] font-black text-accent-blue uppercase tracking-[0.22em] block mt-1 leading-none">
                ACADEMY
              </span>
            </div>
          </div>

          {/* Desktop Nav Selection - Solid Minimal Link Menu with Underline */}
          {!isAdminMode && (
            <nav id="desktop-pub-nav" className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
              {pubLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-2 font-display text-[11px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer min-h-[38px] flex items-center justify-center ${
                      isActive
                        ? 'text-white font-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Area: Registration CTA or Admin/CMS status indicator */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAdminMode ? (
              <button
                id="nav-link-registration"
                onClick={() => handleLinkClick('registration')}
                className={`px-5 py-2.5 rounded-full font-display text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer min-h-[38px] flex items-center justify-center bg-accent-blue hover:bg-accent-blue/90 text-primary-navy shadow-lg font-black border border-accent-blue/10 hover:scale-[1.03] active:scale-[0.97] ${
                  currentPage === 'registration' ? 'ring-2 ring-white/50' : ''
                }`}
              >
                <span>REGISTRATION</span>
                <ArrowRight size={13} className="ml-1.5 animate-pulse" />
              </button>
            ) : (
              <div id="desktop-admin-indicator" className="flex items-center space-x-2 text-accent-blue bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <LayoutDashboard size={14} />
                <span className="font-display font-bold uppercase text-[10px] tracking-wider">CMS ACTIVE</span>
                {totalNotifications > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
            )}
          </div>

          {/* Hamburger Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-white/75 hover:text-white bg-white/10 hover:bg-white/15 border border-white/5 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu content */}
      {isOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-primary-navy/95 backdrop-blur-lg border-b border-white/10">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {!isAdminMode ? (
              pubLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-mobile-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left block px-4 py-3 rounded-xl font-display text-base font-bold uppercase tracking-wider min-h-[44px] ${
                    currentPage === link.id
                      ? 'bg-secondary-navy text-accent-blue border-l-4 border-accent-blue'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))
            ) : (
              <div className="p-4 space-y-4">
                <div className="bg-secondary-navy/60 p-3 rounded-lg border border-accent-blue/20 text-center">
                  <span className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">
                    CMS ADMIN HUB ACTIVE
                  </span>
                  <p className="text-[11px] text-white/60 mt-1">
                    Manage student roster, schedules, billing cycles, and media uploads below.
                  </p>
                </div>
              </div>
            )}
            
            {/* Quick action button inside drawer */}
            <div className="px-4 pt-4 border-t border-white/10 flex flex-col space-y-3">
              {!isAdminMode && (
                <button
                  id="drawer-trial-cta"
                  onClick={() => handleLinkClick('registration')}
                  className="w-full py-3 bg-accent-blue hover:bg-accent-blue/90 text-primary-navy rounded-xl font-display font-black text-sm uppercase tracking-[0.1em] text-center min-h-[44px]"
                >
                  JOIN FREE TRIAL
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
