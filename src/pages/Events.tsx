/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Trophy, ShieldAlert, BadgeInfo, Users, Award, ChevronRight, ChevronLeft, CheckCircle 
} from 'lucide-react';
import { AcademyEvent } from '../types';

import kidsPathwayImg from '../assets/images/kids_pathway_player_1781504530272.jpg';
import juniorPathwayImg from '../assets/images/junior_pathway_player_1781504547865.jpg';
import elitePathwayImg from '../assets/images/elite_pathway_player_1781504567042.jpg';
import eliteProPathwayImg from '../assets/images/elitepro_pathway_player_1781504587654.jpg';

interface EventsProps {
  events: AcademyEvent[];
  setCurrentPage: (page: string) => void;
}

export default function Events({ events, setCurrentPage }: EventsProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>('July 2026');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedDay, setSelectedDay] = useState<number | null>(18); // default selection for upcoming tournament

  // Filters events count
  const filteredEvents = events.filter(ev => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return ev.status === 'Upcoming';
    if (activeTab === 'past') return ev.status === 'Past';
    return true;
  });

  // Simulated July 2026 Calendar days matrix (starts on Wednesday)
  const calendarDays = [
    { day: null, hasEvent: false }, { day: null, hasEvent: false }, // empty cells padding
    { day: 1, hasEvent: true, title: 'Summer Training Camps start' }, 
    { day: 2, hasEvent: false }, { day: 3, hasEvent: false }, { day: 4, hasEvent: false }, { day: 5, hasEvent: false },
    { day: 6, hasEvent: false }, { day: 7, hasEvent: false }, { day: 8, hasEvent: false }, { day: 9, hasEvent: false },
    { day: 10, hasEvent: false }, { day: 11, hasEvent: false }, { day: 12, hasEvent: false }, { day: 13, hasEvent: false },
    { day: 14, hasEvent: false }, { day: 15, hasEvent: false }, { day: 16, hasEvent: false }, { day: 17, hasEvent: false },
    { day: 18, hasEvent: true, title: 'Bogor Youth Championships' }, 
    { day: 19, hasEvent: false }, { day: 20, hasEvent: false }, { day: 21, hasEvent: false }, { day: 22, hasEvent: false },
    { day: 23, hasEvent: false }, { day: 24, hasEvent: false }, 
    { day: 25, hasEvent: true, title: 'BCFA Elite Friendly Match' }, 
    { day: 26, hasEvent: false }, { day: 27, hasEvent: false }, { day: 28, hasEvent: false }, { day: 29, hasEvent: false },
    { day: 30, hasEvent: false }, { day: 31, hasEvent: false }
  ];

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    if (day === 18) return events.find(e => e.id === 'ev1');
    if (day === 25) return events.find(e => e.id === 'ev2');
    if (day === 1) return events.find(e => e.id === 'ev3');
    return null;
  };

  const currentDayEvent = getEventForDay(selectedDay);

  return (
    <div id="events-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            ACADEMIC MATCH SCHEDULES & WORKSHOPS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            EVENTS & MATCH CALENDAR
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            Track our tournament fixtures, parent workshops, friendly exhibition events, and youth training clinics. Come down and support Bogor&apos;s future champions live!
          </p>
        </div>
      </section>

      {/* Main interactive grid: Calendar on left, Event details/Filters on right */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Calendar Board Column (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-[#000d21]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Month Head block */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-accent-blue" size={20} />
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                  Interactive Fixtures Calendar
                </h3>
              </div>
              
              <div className="flex items-center space-x-2 bg-primary-navy/80 border border-white/10 px-3 py-1 rounded-lg font-mono text-xs text-white">
                <button className="opacity-40 hover:opacity-100 min-h-[30px] px-1" title="Previous Month">⟨</button>
                <span className="font-bold uppercase tracking-wider px-2">{selectedMonth}</span>
                <button className="opacity-40 hover:opacity-100 min-h-[30px] px-1" title="Next Month">⟩</button>
              </div>
            </div>

            {/* Calendar Days grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {['W', 'T', 'F', 'S', 'S', 'M', 'T'].map((dayName, idx) => (
                <span key={idx} className="font-mono text-[10px] font-black text-accent-blue/60 uppercase tracking-widest py-2">
                  {dayName}
                </span>
              ))}

              {calendarDays.map((dt, idx) => {
                const isSelected = selectedDay === dt.day;
                const hasEv = dt.hasEvent;
                
                return (
                  <button
                    key={idx}
                    id={`calendar-day-${dt.day || 'empty-' + idx}`}
                    disabled={!dt.day}
                    onClick={() => dt.day && setSelectedDay(dt.day)}
                    className={`aspect-square sm:p-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative flex flex-col items-center justify-center min-h-[44px] ${
                      !dt.day 
                        ? 'bg-transparent opacity-0 pointer-events-none' 
                        : isSelected 
                          ? 'bg-accent-blue text-primary-navy font-black shadow-lg shadow-accent-blue/25 scale-105 z-10 cursor-pointer' 
                          : hasEv 
                            ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30 hover:bg-accent-blue/25 cursor-pointer' 
                            : 'bg-secondary-navy/20 hover:bg-secondary-navy/60 text-white/70 cursor-pointer'
                    }`}
                  >
                    <span>{dt.day}</span>
                    {hasEv && !isSelected && (
                      <span className="absolute bottom-1 bg-accent-blue h-1 w-1 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Helper block for Selected Day */}
            <div className="bg-primary-navy/40 p-4 rounded-2xl border border-white/5 space-y-3">
              <h5 className="font-mono text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <BadgeInfo size={13} className="text-accent-blue" />
                Active date selection details:
              </h5>
              
              {currentDayEvent ? (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-display font-bold text-white uppercase text-xs sm:text-sm">
                      {currentDayEvent.title}
                    </span>
                    <span className="block text-[10px] font-mono text-white/40 mt-1 uppercase">
                      Type: {currentDayEvent.type} • Venue: {currentDayEvent.location}
                    </span>
                  </div>
                  
                  <button
                    id="calendar-event-view-more"
                    onClick={() => {
                      const el = document.getElementById(`event-card-${currentDayEvent.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2 text-accent-blue hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center min-h-[44px]"
                  >
                    <span>View Detail</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-white/40 text-xs font-mono">
                  No main events scheduled for {selectedMonth} {selectedDay || ''}. Select any highlighted blue date above.
                </p>
              )}
            </div>

          </div>

          {/* List display and filters section (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Page Filters tabs */}
            <div className="bg-[#000d21]/60 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1 w-full text-center">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'upcoming', label: 'Upcoming Only' },
                { id: 'past', label: 'Match Results' }
              ].map(tab => (
                <button
                  key={tab.id}
                  id={`event-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[40px] ${
                    activeTab === tab.id
                      ? 'bg-accent-blue text-primary-navy font-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scoreboard highlights block (displaying past events nicely) */}
            {activeTab !== 'upcoming' && (
              <div className="bg-gradient-to-br from-[#0c234a] to-primary-navy p-5 rounded-2xl border border-accent-blue/30 space-y-4">
                <span className="text-[10px] bg-accent-blue/15 border border-accent-blue/30 text-accent-blue font-mono px-2.5 py-1 rounded uppercase tracking-wider font-extrabold leading-none inline-block">
                  LATEST FIELD SCORE DIRECTORY
                </span>
                
                <div className="flex items-center justify-between text-center py-2">
                  <div className="space-y-1">
                    <span className="h-9 w-9 bg-accent-blue flex items-center justify-center rounded-lg font-display font-black text-primary-navy text-xs mx-auto">BC</span>
                    <span className="block font-display font-black text-xs text-white uppercase tracking-tight">BCFA U18</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-display font-black text-2xl text-white tracking-widest">
                      5 : 3
                    </span>
                    <span className="block text-[8px] font-mono text-green-400 uppercase tracking-widest">FINAL WINNER</span>
                  </div>

                  <div className="space-y-1">
                    <span className="h-9 w-9 bg-[#E1E5E8] flex items-center justify-center rounded-lg font-display font-black text-primary-navy text-[10px] mx-auto">BR</span>
                    <span className="block font-display font-black text-xs text-white/50 uppercase tracking-tight">BANDUNG R.</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/70 font-sans leading-relaxed text-center">
                  BCFA U18 clinched the gold trophy after scoring three outstanding clean goals during 2nd half fast transitions.
                </p>
              </div>
            )}

            <div className="bg-secondary-navy/20 p-5 rounded-2xl border border-white/5">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Quick Info Contacts</h4>
              <p className="text-white/60 text-xs mt-1">If your school desires friendly sparring matches against BCFA age squads, submit a coordinate request via the contact desk.</p>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className="mt-3 text-xs font-semibold text-accent-blue hover:underline uppercase flex items-center min-h-[40px] cursor-pointer"
              >
                Inquire Sparring Form ➜
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Seasonal Tournament Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="space-y-12">
          
          {/* Header block with official branding colors */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-accent-blue uppercase tracking-tight">
              Seasonal Tournament
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed max-w-5xl">
              Selain mengikuti event resmi lingkup akademi seperti LIGA AAFI, BOGOR FA juga mengikuti kejuaraan-kejuaraan lain di Kota Bogor di semua kategori usia seperti : Liga AFKOT Bogor, PSSI Cup Bogor, Summer Football Fest, dan kejuaraan lainnya.
            </p>
          </div>

          {/* 4-Column responsive poster cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: U-8 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={kidsPathwayImg} 
                  alt="U-8 Squad - Summer Football Fest" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-8
              </span>
            </div>

            {/* Card 2: U-10 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={juniorPathwayImg} 
                  alt="U-10 Squad - PSSI Cup Bogor" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-10
              </span>
            </div>

            {/* Card 3: U-13 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={elitePathwayImg} 
                  alt="U-13 Squad - PSSI Cup 2026 Bogor" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-13
              </span>
            </div>

            {/* Card 4: U-16 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={eliteProPathwayImg} 
                  alt="U-16 Squad - Liga AFKOT Bogor 2025" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-16
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
