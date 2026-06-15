/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, MapPin, Send, HelpCircle, ShieldCheck, Check, MessageSquare 
} from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactProps {
  onInquirySubmit: (inq: Omit<ContactInquiry, 'id' | 'date' | 'status'>) => void;
}

export default function Contact({ onInquirySubmit }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please compile all mandatory fields.");
      return;
    }

    onInquirySubmit(formData);
    setFormSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  return (
    <div id="contact-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            TECHNICAL SUPPORT DESK DIRECTORY
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            CONTACT INQUIRIES
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            Have questions regarding training fees, age squad transfers, or trial jersey kits? Get in touch with our administrative desk or visit GOR Pajajaran Arena directly in Bogor.
          </p>
        </div>
      </section>

      {/* Main Coordinate layouts: Forms on Left, Info Coordinates on Right */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inquiry form block (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-[#000d21]/60 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold text-accent-blue uppercase tracking-widest block leading-none">SUBMIT DIRECT CASE</span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mt-1">
                ACADEMY COMMUNICATIONS FORM
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div id="contact-group-name">
                <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Your Human Name <span className="text-red-400">*</span></label>
                <input 
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Hadi Wijatno"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/30 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="contact-group-email">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Active Email</label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/30 min-h-[44px]"
                  />
                </div>

                <div id="contact-group-phone">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Phone / WhatsApp <span className="text-red-400">*</span></label>
                  <input 
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +62 811-7788-9900"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/30 min-h-[44px]"
                  />
                </div>
              </div>

              <div id="contact-group-subject">
                <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Inquiry Subject Theme</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:border-accent-blue focus:outline-none min-h-[44px]"
                >
                  <option value="">-- Choose Subject category --</option>
                  <option value="U6-U9 Trial Class Reservation">U6-U9 Trial Class Reservation</option>
                  <option value="U10-U15 Advanced Academy Placement">U10-U15 Advanced Academy Placement</option>
                  <option value="Corporate friendly Matches Selection">Corporate Friendly Matches Selection</option>
                  <option value="Invoice & Billing Queries">Invoice & Billing Queries</option>
                  <option value="General Sponsorship Collaboration">General Sponsorship Collaboration</option>
                </select>
              </div>

              <div id="contact-group-message">
                <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Detailed Message <span className="text-red-400">*</span></label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your athlete's coordinate records or target developmental questions..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-accent-blue/20 min-h-[48px] cursor-pointer"
              >
                <Send size={15} />
                <span>SUBMIT SECURE CASE FILE</span>
              </button>

              <AnimatePresence>
                {formSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-2.5 text-xs text-green-400 font-mono"
                  >
                    <Check size={16} />
                    <span>Inquiry logged successfully! Staff responds within twenty four hours. Check Admin CMS.</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>

          </div>

          {/* Contact coordinates and Google Maps (Right - 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct click directories */}
            <div className="bg-secondary-navy/30 border border-white/10 rounded-3xl p-6 space-y-6">
              <h4 className="font-display font-black text-sm text-white uppercase tracking-wider">
                Support desk direct channels
              </h4>
              
              <div className="space-y-4 text-xs">
                
                {/* Whatsapp */}
                <a 
                  href="https://wa.me/6281288880112"
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-start space-x-3.5 p-3 rounded-xl bg-primary-navy/55 border border-white/5 hover:border-accent-blue/40 transition-all cursor-pointer min-h-[50px]"
                >
                  <MessageSquare className="text-green-400 mt-0.5 shrink-0" size={18} />
                  <div>
                    <span className="font-display font-black text-xs text-white block uppercase">COACH WA DIRECT LINE</span>
                    <span className="text-[10px] text-white/50 font-mono block mt-0.5">+62 812-8888-0112</span>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:info@bogorcityfutsal.id"
                  className="flex items-start space-x-3.5 p-3 rounded-xl bg-primary-navy/55 border border-white/5 hover:border-accent-blue/40 transition-all cursor-pointer min-h-[50px]"
                >
                  <Mail className="text-accent-blue mt-0.5 shrink-0" size={18} />
                  <div>
                    <span className="font-display font-black text-xs text-white block uppercase">General Administration Email</span>
                    <span className="text-[10px] text-white/50 font-mono block mt-0.5">info@bogorcityfutsal.id</span>
                  </div>
                </a>

                {/* Address GOR */}
                <div className="flex items-start space-x-3.5 p-3 rounded-xl bg-primary-navy/55 border border-white/5">
                  <MapPin className="text-accent-blue mt-0.5 shrink-0" size={18} />
                  <div>
                    <span className="font-display font-black text-xs text-white block uppercase">Physical HQ Headquarters</span>
                    <p className="text-[10px] text-white/60 leading-relaxed font-sans mt-0.5">
                      GOR Pajajaran, Jl. Pemuda No.15, Sempur, Tanah Sareal, Kota Bogor 16161
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulating Interactive Google Map Widget */}
            <div className="bg-[#000d21]/60 border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#64B5E6] uppercase font-black tracking-widest pb-1">
                  OFFICIAL COORDINATES VIEWPORTS
                </span>
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
              </div>
              
              <div className="relative aspect-video rounded-2xl bg-secondary-navy/40 border border-white/5 overflow-hidden flex flex-col items-center justify-center text-center p-4">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-primary-navy/85 z-10" />
                  {/* Subtle map pattern */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600" 
                    alt="Bogor Road Coordinates blueprint" 
                    className="w-full h-full object-cover filter blur-[1px]"
                  />
                </div>
                
                <div className="relative z-20 space-y-2">
                  <MapPin size={28} className="text-accent-blue mx-auto animate-bounce" />
                  <span className="font-display font-black text-xs text-white uppercase block leading-none">
                    GOR PAJAJARAN ARENA
                  </span>
                  <span className="text-[9px] font-mono block text-[#64B5E6] mt-0.5">
                    Lat: -6.581258 • Long: 106.793284
                  </span>
                  <a 
                    href="https://maps.google.com/?q=GOR+Pajajaran+Bogor"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block px-4 py-1.5 bg-[#082C5A] hover:bg-accent-blue hover:text-primary-navy border border-white/10 rounded-lg text-[10px] font-mono tracking-wide uppercase transition-all min-h-[30px] cursor-pointer"
                  >
                    Open in Google Maps Direct
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[10px] font-mono text-white/40">
                <ShieldCheck size={14} className="text-accent-blue shrink-0" />
                <span>Complies with Indonesian Youth Sports League coordinates.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
