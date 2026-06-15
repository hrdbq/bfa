/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Mail, Calendar, UserCheck, Star, Sparkles, PhoneCall, ChevronRight, X 
} from 'lucide-react';
import { Coach } from '../types';

interface CoachesProps {
  coaches: Coach[];
  setCurrentPage: (page: string) => void;
}

export default function Coaches({ coaches, setCurrentPage }: CoachesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  // Filters the coaches based on category choice
  const filteredCoaches = coaches.filter(c => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Tactical') return c.position.includes('Head') || c.position.includes('Elite');
    if (selectedCategory === 'Youth') return c.position.includes('Youth') || c.license.includes('Grassroots');
    if (selectedCategory === 'Medical') return c.position.includes('Physio') || c.position.includes('Rehab');
    return true;
  });

  return (
    <div id="coaches-view-container" className="glow-entrance">
      
      {/* Editorial Hero Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            TECHNICAL LEADERSHIP & ACCREDITED PEDAGOGY
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            COACHES & STAFF
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            Our staff members are certified directly by the Asian Football Confederation (AFC) and the Indonesian Futsal Federation. We operate on professional athletic guidelines ensuring maximum tactical and safety progression.
          </p>
        </div>
      </section>

      {/* Head Coach Editorial Message Box */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-secondary-navy to-[#000d21] rounded-3xl p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 max-w-sm mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-accent-blue/30 aspect-square lg:aspect-auto lg:h-[350px]">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500" 
                alt="Head Coach Andra Wijaya" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-mono text-[9px] text-accent-blue font-bold tracking-widest uppercase block mb-1">FOUNDER & DIRECTOR</span>
                <h4 className="font-display font-black text-base text-white uppercase tracking-tight">COACH ANDRA WIJAYA</h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Technical Director Message</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3.5xl text-white uppercase tracking-tight leading-tighter">
              &ldquo;DISCIPLINE IS THE SEED; CHAMPIONS ARE THE HARVEST.&rdquo;
            </h3>
            
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
              Selamat Datang to Bogor City Futsal Academy. My absolute priority when designing this sports pathway was ensuring our curriculum does not simulate simple, uncoordinated kick-around play. Futsal requires extreme visual tracking, split-second speed adjustments, and rigorous physical coordination.
            </p>
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
              We look at player development as an investment in character, timing, and structural intelligence. Whether your child aspires to play professionally in the Pro Futsal League of Indonesia, or they simply want to develop high-level coordinate reflexes alongside disciplined team habits—BCFA provides the absolute environment of excellence.
            </p>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/5 font-mono text-xs text-white/50">
              <div>
                <span className="font-bold text-white block">Coach Andra Wijaya</span>
                <span className="text-[11px] text-accent-blue/80">AFC Futsal Level 2 License Holder • Ex-PON Coach</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Filtering Tabs */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex w-full items-center justify-between flex-wrap gap-4">
          <h4 className="font-mono text-xs font-bold text-white/40 uppercase tracking-widest">
            FILTER ACADEMY SQUAD OFFICERS:
          </h4>
          
          <div className="flex items-center bg-[#000d21]/60 p-1 rounded-lg border border-white/10 overflow-x-auto scrollbar-none gap-1">
            {[
              { id: 'All', label: 'All Staff' },
              { id: 'Tactical', label: 'Tactical Lead Coaches' },
              { id: 'Youth', label: 'Youth Grassroots Team' },
              { id: 'Medical', label: 'Medical & Conditioning' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`filter-btn-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[35px] whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-accent-blue text-primary-navy font-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCoaches.map((c) => (
            <div 
              key={c.id} 
              id={`coach-card-${c.id}`}
              className="bg-secondary-navy/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-accent-blue/30 transition-all flex flex-col justify-between glow-border group"
            >
              
              {/* Photo Area */}
              <div className="relative aspect-square overflow-hidden bg-[#000d21]">
                <img 
                  src={c.imageUrl} 
                  alt={c.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // fallbacks
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent opacity-80" />
                
                {/* Specific License Floating Tag */}
                <span className="absolute top-4 left-4 bg-accent-blue text-primary-navy font-mono font-black text-[9px] px-2.5 py-1 rounded shadow-md tracking-wider">
                  {c.license}
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-mono text-[9px] text-accent-blue uppercase tracking-widest block font-extrabold">{c.position}</span>
                  <h4 className="font-display font-black text-lg text-white uppercase tracking-tight mt-0.5">{c.name}</h4>
                </div>
              </div>

              {/* Bio & stats information snippet */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 gap-2 border-b border-white/5 pb-3">
                    <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider block">Specialization Field</span>
                    <span className="text-white font-display text-xs font-bold uppercase block text-accent-blue">
                      {c.specialization}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider block">Key Achievements</span>
                    <ul className="space-y-1 text-white/70 text-[11px] font-sans">
                      {c.achievements.slice(0, 2).map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <ShieldCheck size={12} className="text-accent-blue shrink-0 mt-0.5" />
                          <span className="leading-tight">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    id={`btn-coach-bio-${c.id}`}
                    onClick={() => setSelectedCoach(c)}
                    className="w-full py-2 bg-secondary-navy hover:bg-white/5 text-white/80 hover:text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider border border-white/10 transition-all min-h-[40px] cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>Read Executive Bio</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Core Bio Modal Box for individual staff details */}
      <AnimatePresence>
        {selectedCoach && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-secondary-navy max-w-2xl w-full rounded-2xl overflow-hidden border border-white/15 relative text-left shadow-2xl"
            >
              
              {/* Close icon */}
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-4 right-4 p-2 bg-primary-navy rounded-full border border-white/10 text-white/50 hover:text-white transition-all min-h-[40px] cursor-pointer"
                title="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8">
                
                <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:h-full rounded-xl overflow-hidden">
                  <img 
                    src={selectedCoach.imageUrl} 
                    alt={selectedCoach.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="bg-accent-blue/15 text-accent-blue font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {selectedCoach.license}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                      {selectedCoach.name}
                    </h3>
                    <p className="text-white/40 font-mono text-[11px] uppercase tracking-wider">{selectedCoach.position}</p>
                  </div>

                  <p className="text-white/85 font-sans text-xs sm:text-sm leading-relaxed italic border-l-2 border-accent-blue pl-3">
                    &ldquo;{selectedCoach.bio}&rdquo;
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <h5 className="font-mono text-[10px] font-bold text-accent-blue uppercase tracking-wider">Historical Records:</h5>
                    <ul className="space-y-1 text-white/70 text-xs font-sans">
                      {selectedCoach.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 size={13} className="text-accent-blue shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-xs font-mono text-white/40 flex justify-between items-center bg-primary-navy/40 px-3 py-2 rounded-lg">
                    <span>Exp: {selectedCoach.experience}</span>
                    <span>Spec: {selectedCoach.specialization}</span>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Quick helper
function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <span className={`inline-block w-4 h-4 rounded-full bg-accent-blue/10 flex items-center justify-center font-bold text-accent-blue text-[9px] ${className}`}>
      ✓
    </span>
  );
}
