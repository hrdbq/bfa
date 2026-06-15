/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, User, Phone, Mail, Award, Calendar, DollarSign, Sparkles, HelpCircle, ShieldAlert, Receipt, ChevronDown 
} from 'lucide-react';
import { Registration } from '../types';

interface RegistrationProps {
  onRegisterSubmit: (reg: Omit<Registration, 'id' | 'date' | 'status' | 'amountPaid' | 'paymentStatus'>) => void;
}

export default function RegistrationPage({ onRegisterSubmit }: RegistrationProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    ageCategory: 'U10-U12',
    packageType: 'Monthly' as 'Trial' | 'Monthly' | 'Quarterly' | 'Annual',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  const pricingTapes = [
    {
      id: 'Trial',
      title: 'Free Trial Session',
      price: 'IDR 0',
      period: 'Single Session',
      accent: false,
      perks: [
        'Single 90-minute technical evaluation drill',
        'Direct progress assessment by AFC coaches',
        'Complimentary training jersey loan for session',
        'No administrative sign-up required'
      ]
    },
    {
      id: 'Monthly',
      title: 'Standard Monthly',
      price: 'IDR 650.000',
      period: 'per Month',
      accent: true,
      perks: [
        '2 Scheduled training sessions per week',
        'Official match registration capability',
        'Direct parent progress reports quarterly',
        'Physiotherapy consultations under injury'
      ]
    },
    {
      id: 'Quarterly',
      title: 'Elite Quarterly',
      price: 'IDR 1.800.000',
      period: '3 Months (Save 8%)',
      accent: false,
      perks: [
        'All Monthly Tier Perks included',
        'Free official BCFA Home Match Player Jersey Kit',
        'Guaranteed exhibition match placements',
        'Prioritized academy event enrollments'
      ]
    },
    {
      id: 'Annual',
      title: 'Champion Annual',
      price: 'IDR 6.500.000',
      period: '12 Months (Save 17%)',
      accent: false,
      perks: [
        'Complete 1-year developmental progression curriculum',
        'Free Home + Away Jersey Kit + Futsal Team Socks',
        'Sponsored registration into West Java Gold Trophy',
        'Bi-weekly physical threshold bio-metrics reports'
      ]
    }
  ];

  const faqs = [
    {
      q: "What equipment must my child bring for their initial trial session?",
      a: "Your child should wear standard athletic shorts, t-shirt, and clean futsal flat rubber-soled shoes (non-marking). Please bring a reusable water bottle. We will provide training bibs and professional futsal balls. No studded soccer cleats are allowed on GOR Pajajaran's indoor parquet surfaces."
    },
    {
      q: "My child has never played futsal or soccer before. Can they enroll?",
      a: "Absolutely! Our U6-U9 (Fun Futsal Foundation) and U10-U12 classes are structured precisely to welcome beginners. Our head coaches prioritize motor coordination, speed timing, and spatial awareness before introducing complex match pressure."
    },
    {
      q: "How are parents informed about their child's athletic progress?",
      a: "We perform individual skill assessments and core physical coordinate evaluations quarterly. In our Admin CMS, our team registers active attendance and writes specific progress profiles, which are shared with parents through physical reports or via private email."
    },
    {
      q: "Is there medical staff present during training?",
      a: "Yes. Our academy has a dedicated physiotherapist, Dr. Teddy, present during training blocks at GOR Pajajaran Sempur. In addition, all enrolled academy athletes are coordinated under the academy&apos;s primary sports emergency protocols."
    },
    {
      q: "What is the cancellation or refund policy?",
      a: "Membership fees are charged at the beginning of each cycle. For quarterly and annual cycles, packages offer steep discounts but are non-refundable after the first thirty days. Trial sessions are 100% free with zero transactional obligations."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (pkgId: 'Trial' | 'Monthly' | 'Quarterly' | 'Annual') => {
    setFormData(prev => ({ ...prev, packageType: pkgId }));
    setStep(2); // advance to student information
  };

  const handleFormFinishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentPhone || !formData.parentEmail) {
      alert("Please ensure Student Name, Parent Phone, and Parent Email are compiled correctly.");
      return;
    }

    // Call state callback to register live entry
    onRegisterSubmit(formData);

    const refCode = 'BCFA-2026-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedRef(refCode);
    setFormCompleted(true);
    setStep(4); // Success step
  };

  const currentPackageInfo = pricingTapes.find(p => p.id === formData.packageType) || pricingTapes[1];

  return (
    <div id="registration-page-container" className="glow-entrance">
      
      {/* Editorial Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            SECURE ADMISSION PLATFORM
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            ACADEMY REGISTRATION & PRICING
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            Secure your athlete&apos;s roster registration inside Bogor&apos;s premier professional futsal system. Complete our 3-step dynamic checkout wizard to finalize initial training schedules.
          </p>
        </div>
      </section>

      {/* STEP LOGISTICS TRACKER PANEL (if form not finished) */}
      {!formCompleted && (
        <section className="max-w-4xl mx-auto px-4 pt-12">
          <div className="flex items-center justify-between bg-secondary-navy/40 border border-white/5 p-4 rounded-2xl">
            {[
              { num: 1, label: 'Choose Package' },
              { num: 2, label: 'Student Info' },
              { num: 3, label: 'Finalize & Review' }
            ].map(st => (
              <div key={st.num} className="flex items-center space-x-2">
                <span className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center border transition-all ${
                  step === st.num 
                    ? 'bg-accent-blue text-[#011B41] border-accent-blue font-black' 
                    : step > st.num 
                      ? 'bg-green-500/20 text-green-400 border-green-500' 
                      : 'bg-transparent text-white/30 border-white/10'
                }`}>
                  {step > st.num ? '✓' : st.num}
                </span>
                <span className={`hidden sm:inline font-display text-xs font-bold uppercase tracking-wider ${
                  step === st.num ? 'text-white' : 'text-white/40'
                }`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CORE DISPLAY ROUTER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CHOOSE TUITION PACKAGE */}
          {step === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              
              <div className="text-center max-w-2xl mx-auto">
                <span className="font-mono text-xs font-bold text-[#64B5E6] uppercase tracking-widest block">STEP 1</span>
                <h3 className="font-display font-black text-2xl text-white uppercase mt-1">
                  CHOOSE ACTIONABLE TRAINING PACKAGES
                </h3>
                <p className="text-white/50 text-xs font-mono mt-1">Select the membership duration that best matches your family targets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {pricingTapes.map((pkg) => (
                  <div 
                    key={pkg.id}
                    id={`price-card-${pkg.id}`}
                    className={`rounded-2xl p-6 border flex flex-col justify-between space-y-6 transition-all ${
                      pkg.accent 
                        ? 'bg-gradient-to-b from-[#082C5A] to-primary-navy border-accent-blue scale-102 shadow-xl shadow-accent-blue/10 relative' 
                        : 'bg-secondary-navy/30 border-white/10 hover:border-accent-blue/20'
                    }`}
                  >
                    {pkg.accent && (
                      <span className="absolute -top-3.5 right-6 bg-accent-blue text-primary-navy font-mono font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow">
                        Most Popular Group
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-white/40 font-mono text-[9px] uppercase block">Tuition Tier</span>
                        <h4 className="font-display font-black text-lg text-white uppercase tracking-tight mt-0.5">
                          {pkg.title}
                        </h4>
                      </div>

                      <div className="flex items-baseline space-x-1 py-2 border-b border-white/5">
                        <span className="font-display font-black text-2xl sm:text-3xl text-accent-blue tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-white/40 font-mono text-[10px] uppercase">
                          / {pkg.period}
                        </span>
                      </div>

                      <ul className="space-y-2 text-white/70 text-xs font-sans">
                        {pkg.perks.map((p, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check size={14} className="text-accent-blue shrink-0 mt-0.5" />
                            <span className="leading-normal">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      id={`price-select-btn-${pkg.id}`}
                      onClick={() => handlePackageSelect(pkg.id as any)}
                      className={`w-full py-3.5 rounded-xl font-display font-black uppercase text-xs tracking-widest transition-all min-h-[44px] cursor-pointer ${
                        pkg.accent 
                          ? 'bg-accent-blue text-[#011B41] hover:bg-accent-blue/90' 
                          : 'bg-secondary-navy hover:bg-secondary-navy/80 text-white border border-white/15'
                      }`}
                    >
                      GET {pkg.id} TRIAL NOW ➜
                    </button>

                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* STEP 2: STUDENT INFORMATION */}
          {step === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="max-w-xl mx-auto bg-secondary-navy/40 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6"
            >
              
              <div className="text-center">
                <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-widest leading-none">STEP 2</span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                  STUDENT & PARENT INFORMATION
                </h3>
                <p className="text-white/50 text-xs font-mono">Fill in vital contact fields. Checked accuracy helps us placement planning.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                
                <div id="form-group-student-name">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Student Athlete Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 text-accent-blue" size={16} />
                    <input 
                      type="text" 
                      name="studentName"
                      required
                      placeholder="e.g. Zacky Wijaya"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/35 min-h-[44px]"
                    />
                  </div>
                </div>

                <div id="form-group-student-dob">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Student Birthday (DOB) <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 text-accent-blue" size={16} />
                    <input 
                      type="date" 
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div id="form-group-parent-name">
                    <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Parent/Guardian Name <span className="text-red-400">*</span></label>
                    <input 
                      type="text" 
                      name="parentName"
                      required
                      placeholder="e.g. Tomi Wijaya"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/35 min-h-[44px]"
                    />
                  </div>

                  <div id="form-group-age-cat">
                    <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Squad Age Placement</label>
                    <select 
                      name="ageCategory"
                      value={formData.ageCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none min-h-[44px]"
                    >
                      <option value="U6-U9">U6 - U9 (Foundation)</option>
                      <option value="U10-U12">U10 - U12 (Technical)</option>
                      <option value="U13-U15">U13 - U15 (Advanced)</option>
                      <option value="U16-U18">U16 - U18 (Performance)</option>
                      <option value="Elite">Elite Development Group</option>
                    </select>
                  </div>
                </div>

                <div id="form-group-parent-phone">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Parent Phone / Whatsapp <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-accent-blue" size={16} />
                    <input 
                      type="tel" 
                      name="parentPhone"
                      required
                      placeholder="e.g. +62 812-9900-8877"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/35 min-h-[44px]"
                    />
                  </div>
                </div>

                <div id="form-group-parent-email">
                  <label className="text-white/60 font-mono text-[10px] uppercase block mb-1">Parent Active Email <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-accent-blue" size={16} />
                    <input 
                      type="email" 
                      name="parentEmail"
                      required
                      placeholder="e.g. tomi.w@gmail.com"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 bg-primary-navy/80 border border-white/15 rounded-xl text-white font-sans text-xs sm:text-sm focus:border-accent-blue focus:outline-none placeholder-white/35 min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white/70 hover:text-white rounded-xl text-xs font-bold uppercase transition-all min-h-[44px] cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="flex-grow py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-widest rounded-xl transition-all min-h-[44px] cursor-pointer"
                  >
                    Continue to Review ➜
                  </button>
                </div>

              </form>

            </motion.div>
          )}

          {/* STEP 3: REVIEW & FINALIZE PAYMENT PORTAL */}
          {step === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-secondary-navy/40 border border-white/15 rounded-3xl p-6 sm:p-10 space-y-6"
            >
              
              <div className="text-center">
                <span className="font-mono text-xs font-bold text-[#64B5E6] uppercase tracking-widest leading-none">STEP 3</span>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mt-1">
                  CONFIRM SQUAD ADMISSION DEMANDS
                </h3>
                <p className="text-white/50 text-xs font-mono">Verify inputs are properly compiled before issuing secure registration.</p>
              </div>

              {/* Review card */}
              <div className="p-5 bg-primary-navy/60 border border-white/5 rounded-2xl space-y-4">
                <h4 className="font-display font-extrabold text-sm text-accent-blue uppercase tracking-wider pb-2 border-b border-white/5">
                  Admission Metadata Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Athlete Student Name</span>
                    <span className="text-white font-bold block mt-0.5">{formData.studentName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Date of Birth (DOB)</span>
                    <span className="text-white block mt-0.5">{formData.dob}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Parent / Guardian Name</span>
                    <span className="text-white block mt-0.5">{formData.parentName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Contact Coordinates</span>
                    <span className="text-white/80 block mt-0.5 text-ellipsis overflow-hidden">{formData.parentPhone} • {formData.parentEmail}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Assigned Squad Level</span>
                    <span className="text-accent-blue font-bold font-display block mt-0.5 uppercase">{formData.ageCategory}</span>
                  </div>
                  <div>
                    <span className="text-white/40 font-mono text-[9px] uppercase block">Target Billing Cycle</span>
                    <span className="text-green-400 font-bold block mt-0.5 uppercase">{currentPackageInfo.title} ({currentPackageInfo.price})</span>
                  </div>
                </div>
              </div>

              {/* Direct payment simulated info */}
              <div className="bg-gradient-to-r from-accent-blue/10 to-transparent p-4 sm:p-5 rounded-xl border border-accent-blue/20 flex gap-3">
                <Sparkles size={20} className="text-accent-blue shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-black text-accent-blue uppercase tracking-wider block leading-none">SIMULATED ZERO TRANSFER PROTOCOL</span>
                  <p className="text-white/70 text-[11px] leading-relaxed font-sans">
                    Because this operates inside the **AI Studio Interactive Developer Sandbox**, clicking &ldquo;Finalize&rdquo; will immediately compile a real registration code and save it directly. No actual credit card transactions will occur. You are completely safe.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white/70 hover:text-white rounded-xl text-xs font-bold uppercase transition-all min-h-[44px] cursor-pointer"
                >
                  Edit Information
                </button>

                <button
                  onClick={handleFormFinishSubmit}
                  className="flex-grow py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-lg shadow-accent-blue/20 min-h-[44px] cursor-pointer"
                >
                  FINALIZE RESERVATION ➜
                </button>
              </div>

            </motion.div>
          )}

          {/* STEP 4: SUCCESS RECEIPT AND COORDINATES */}
          {step === 4 && (
            <motion.div 
              key="step-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto bg-gradient-to-b from-[#0c234a] to-primary-navy border border-green-500 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative"
            >
              
              {/* Confirms Badge */}
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto mb-2 animate-bounce">
                <Check size={32} />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.2em] block leading-none">RESERVATION SECURED</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  WELCOME TO THE ACADEMY!
                </h3>
                <p className="text-white/60 text-xs font-mono">
                  Receipt Code: <strong className="text-white font-bold">{generatedRef}</strong>
                </p>
              </div>

              {/* simulated receipt */}
              <div className="p-5 bg-black/60 border border-white/10 rounded-2xl text-left text-xs space-y-3.5">
                <span className="font-mono text-[9px] text-[#64B5E6] font-bold uppercase block leading-none tracking-widest border-b border-white/5 pb-2">
                  OFFICIAL ADMISSION RECEIPT
                </span>

                <div className="space-y-1.5 font-mono text-white/80">
                  <p className="flex justify-between"><span>Registrant Status:</span> <span className="text-yellow-400 font-bold uppercase">PENDING FIRST SESSION</span></p>
                  <p className="flex justify-between"><span>Student Name:</span> <span className="text-white font-bold">{formData.studentName}</span></p>
                  <p className="flex justify-between"><span>Age squad:</span> <span className="text-accent-blue font-bold uppercase">{formData.ageCategory}</span></p>
                  <p className="flex justify-between"><span>Billing cycle:</span> <span className="text-green-400 font-bold uppercase">{formData.packageType}</span></p>
                  <p className="flex justify-between"><span>Payment Indicator:</span> <span className="text-green-400 font-black">UNPAID (Pending Trial)</span></p>
                </div>

                <div className="border-t border-white/5 pt-3.5 text-[11px] text-white/55 font-sans leading-relaxed">
                  <strong>Reporting Instructions:</strong> Please report to <span className="text-white text-semibold">GOR Pajajaran Arena Sempur Office Pitch C</span> fifteen minutes prior to the scheduled training window of your squad. Present this code (<strong>{generatedRef}</strong>) to Coach Siti or Manager Teddy to receive your complimentary loan pack.
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setFormCompleted(false);
                    setFormData({
                      studentName: '',
                      dob: '',
                      parentName: '',
                      parentPhone: '',
                      parentEmail: '',
                      ageCategory: 'U10-U12',
                      packageType: 'Monthly',
                    });
                  }}
                  className="px-4 py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white/80 hover:text-white rounded-xl text-xs font-bold uppercase transition-all min-h-[44px] cursor-pointer"
                >
                  Register Another Athlete
                </button>

                <button
                  onClick={() => {
                    // Navigate to calendar matches
                    window.location.hash = '#events-view-container';
                    const el = document.getElementById('desktop-pub-nav');
                    if (el) {
                      // Trigger visual click helper
                      const navBtn = document.getElementById('nav-link-events');
                      if (navBtn) navBtn.click();
                    }
                  }}
                  className="flex-grow py-3 bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-widest rounded-xl transition-all min-h-[44px] cursor-pointer"
                >
                  View Active Match Dates ➜
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-20 bg-secondary-navy/40 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <HelpCircle size={36} className="text-[#64B5E6] mx-auto" />
            <h2 className="font-display font-black text-2xl sm:text-3.5xl text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-white/60 text-xs font-mono">Answers to popular questions from sports parents.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              
              return (
                <div 
                  key={index} 
                  id={`faq-${index}`}
                  className="bg-secondary-navy/30 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex justify-between items-center text-white hover:text-[#64B5E6] transition-all min-h-[50px] cursor-pointer"
                  >
                    <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-wide leading-tight">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[#64B5E6] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 pt-1 text-white/70 text-xs sm:text-sm leading-relaxed border-t border-white/5 font-sans"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
