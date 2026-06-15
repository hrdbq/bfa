/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserCheck, Calendar, Award, Trophy, DollarSign, Image, BookOpen, Handshake, Mail, 
  Trash2, UserPlus, Check, X, ShieldAlert, Plus, Edit2, RotateCcw, Building, FileText, CheckCircle, Clock 
} from 'lucide-react';
import { 
  Student, Registration, ClassSchedule, Coach, AcademyEvent, PaymentRecord, GalleryItem, BlogPost, Sponsor, ContactInquiry 
} from '../types';

interface AdminPortalProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  registrations: Registration[];
  setRegistrations: React.Dispatch<React.SetStateAction<Registration[]>>;
  classes: ClassSchedule[];
  setClasses: React.Dispatch<React.SetStateAction<ClassSchedule[]>>;
  coaches: Coach[];
  setCoaches: React.Dispatch<React.SetStateAction<Coach[]>>;
  events: AcademyEvent[];
  setEvents: React.Dispatch<React.SetStateAction<AcademyEvent[]>>;
  payments: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  blog: BlogPost[];
  setBlog: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  sponsors: Sponsor[];
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  inquiries: ContactInquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<ContactInquiry[]>>;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
}

export default function AdminPortal({
  students, setStudents,
  registrations, setRegistrations,
  classes, setClasses,
  coaches, setCoaches,
  events, setEvents,
  payments, setPayments,
  gallery, setGallery,
  blog, setBlog,
  sponsors, setSponsors,
  inquiries, setInquiries,
  isAdminMode, setIsAdminMode
}: AdminPortalProps) {
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  // Form toggles and states
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Individual Form Fields State
  const [studentForm, setStudentForm] = useState({
    name: '', dob: '', parentName: '', parentPhone: '', parentEmail: '', ageCategory: 'U10-U12', status: 'Active' as const, notes: ''
  });

  const [classForm, setClassForm] = useState({
    name: '', ageCategory: 'U10-U12', schedule: '', capacity: 25, coachId: 'c2', venue: ''
  });

  const [coachForm, setCoachForm] = useState({
    name: '', position: '', license: '', experience: '', specialization: '', achievements: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250'
  });

  const [eventForm, setEventForm] = useState({
    title: '', type: 'Tournament' as const, date: '', time: '', location: '', opponent: '', details: '', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600'
  });

  const [paymentForm, setPaymentForm] = useState({
    studentName: '', billingMonth: 'June 2026', amount: 650000, packageType: 'Monthly' as const, method: 'Direct Bank Transfer', status: 'Paid' as const
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'Training' as const, imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600', date: '2026-06-15'
  });

  const [blogForm, setBlogForm] = useState({
    title: '', category: 'News' as const, excerpt: '', content: '', author: 'BCFA Editor', readTime: '5 min read', imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800'
  });

  const [sponsorForm, setSponsorForm] = useState({
    name: '', websiteUrl: '', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150', type: 'Main' as const
  });

  // Attendance Tracker visual state
  const [selectedAttendanceClass, setSelectedAttendanceClass] = useState('cl2'); // U10-U12
  const [checkedAttendance, setCheckedAttendance] = useState<{ [key: string]: boolean }>({
    'st1': true, // Raffi Ahmad Saputra
    'st2': true  // Muhammad Faiz
  });

  const handleAlert = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  // CMS ACTION REGISTRATION: APPROVAL PIPELINE
  const handleApproveRegistration = (reg: Registration) => {
    // 1. Mark registration as approved
    setRegistrations(prev => prev.map(r => r.id === reg.id ? { ...r, status: 'Approved', paymentStatus: 'Paid' } : r));
    
    // 2. Generate new student entry live!
    const newStudent: Student = {
      id: 'st-' + Date.now(),
      name: reg.studentName,
      dob: reg.dob,
      parentName: reg.parentName,
      parentPhone: reg.parentPhone,
      parentEmail: reg.parentEmail,
      ageCategory: reg.ageCategory,
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0],
      notes: `Approved automatically via CMS Registration pipeline. Package type chosen: ${reg.packageType}`
    };

    setStudents(prev => [newStudent, ...prev]);

    // 3. Create initial payment record for the approved package
    const newPayment: PaymentRecord = {
      id: 'p-' + Date.now(),
      studentName: reg.studentName,
      billingMonth: 'June 2026',
      amount: reg.amountPaid > 0 ? reg.amountPaid : 650000,
      packageType: reg.packageType,
      date: new Date().toISOString().split('T')[0],
      method: 'Simulated Sandbox Checkout',
      status: reg.paymentStatus === 'Paid' ? 'Paid' : 'Pending'
    };

    setPayments(prev => [newPayment, ...prev]);
    handleAlert(`Approved ${reg.studentName} roster! Migrated student record live and logged invoice receipt.`);
  };

  const handleRejectRegistration = (id: string, name: string) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    handleAlert(`Roster registration for ${name} marked as Rejected.`);
  };

  // CMS ACTION: DELETE OPERATIONS
  const handleDeleteRow = (collectionName: string, id: string, name: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete this resource entry? (${name})`)) return;

    if (collectionName === 'students') setStudents(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'classes') setClasses(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'coaches') setCoaches(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'events') setEvents(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'payments') setPayments(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'gallery') setGallery(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'blog') setBlog(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'sponsors') setSponsors(prev => prev.filter(x => x.id !== id));
    if (collectionName === 'inquiries') setInquiries(prev => prev.filter(x => x.id !== id));
    
    handleAlert(`Resource successfully removed from active collections. (${name})`);
  };

  // CMS ACTION: ADD ADDITIONS
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Student = {
      id: 'st-' + Date.now(),
      ...studentForm,
      joiningDate: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [entry, ...prev]);
    setShowAddForm(false);
    setStudentForm({ name: '', dob: '', parentName: '', parentPhone: '', parentEmail: '', ageCategory: 'U10-U12', status: 'Active', notes: '' });
    handleAlert(`New Student Profile logged: ${entry.name}`);
  };

  const handleAddNewClass = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: ClassSchedule = {
      id: 'cl-' + Date.now(),
      ...classForm,
      currentCount: 0
    };
    setClasses(prev => [entry, ...prev]);
    setShowAddForm(false);
    setClassForm({ name: '', ageCategory: 'U10-U12', schedule: '', capacity: 25, coachId: 'c2', venue: '' });
    handleAlert(`New Class Schedule established: ${entry.name}`);
  };

  const handleAddNewCoach = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Coach = {
      id: 'c-' + Date.now(),
      ...coachForm,
      achievements: coachForm.achievements.split(',').map(a => a.trim()).filter(Boolean)
    };
    setCoaches(prev => [entry, ...prev]);
    setShowAddForm(false);
    setCoachForm({ name: '', position: '', license: '', experience: '', specialization: '', achievements: '', bio: '', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250' });
    handleAlert(`Academy Coach added: ${entry.name}`);
  };

  const handleAddNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: AcademyEvent = {
      id: 'ev-' + Date.now(),
      ...eventForm,
      status: 'Upcoming'
    };
    setEvents(prev => [entry, ...prev]);
    setShowAddForm(false);
    setEventForm({ title: '', type: 'Tournament', date: '', time: '', location: '', opponent: '', details: '', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600' });
    handleAlert(`Event entry created: ${entry.title}`);
  };

  const handleAddNewPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: PaymentRecord = {
      id: 'p-' + Date.now(),
      ...paymentForm,
      date: new Date().toISOString().split('T')[0]
    };
    setPayments(prev => [entry, ...prev]);
    setShowAddForm(false);
    setPaymentForm({ studentName: '', billingMonth: 'June 2026', amount: 650000, packageType: 'Monthly', method: 'Direct Bank Transfer', status: 'Paid' });
    handleAlert(`Invoice receipt manual logged: IDR ${entry.amount.toLocaleString()}`);
  };

  const handleAddNewGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: GalleryItem = {
      id: 'g-' + Date.now(),
      ...galleryForm,
    };
    setGallery(prev => [entry, ...prev]);
    setShowAddForm(false);
    setGalleryForm({ title: '', category: 'Training', imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600', date: '2026-06-15' });
    handleAlert(`Photography metadata added: ${entry.title}`);
  };

  const handleAddNewBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: BlogPost = {
      id: 'b-' + Date.now(),
      ...blogForm,
      date: new Date().toISOString().split('T')[0]
    };
    setBlog(prev => [entry, ...prev]);
    setShowAddForm(false);
    setBlogForm({ title: '', category: 'News', excerpt: '', content: '', author: 'BCFA Editor', readTime: '5 min read', imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800' });
    handleAlert(`CMS Article Published: ${entry.title}`);
  };

  const handleAddNewSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Sponsor = {
      id: 'sp-' + Date.now(),
      ...sponsorForm
    };
    setSponsors(prev => [entry, ...prev]);
    setShowAddForm(false);
    setSponsorForm({ name: '', websiteUrl: '', logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150', type: 'Main' });
    handleAlert(`Brand Sponsor recorded: ${entry.name}`);
  };

  // Visual modules select dropdown on responsive
  const adminModulesList = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: <Users size={16} /> },
    { id: 'students', label: 'Active Students', icon: <UserCheck size={16} /> },
    { id: 'registrations', label: 'Registrations Pipeline', icon: <ShieldAlert size={16} /> },
    { id: 'classes', label: 'Academy Classes', icon: <Calendar size={16} /> },
    { id: 'coaches', label: 'Coaches roster', icon: <Award size={16} /> },
    { id: 'attendance', label: 'Visual Attendance', icon: <Clock size={16} /> },
    { id: 'events', label: 'Events Fixtures', icon: <Trophy size={16} /> },
    { id: 'payments', label: 'Invoices Billing', icon: <DollarSign size={16} /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <Image size={16} /> },
    { id: 'blog', label: 'Editorial Blog', icon: <BookOpen size={16} /> },
    { id: 'sponsors', label: 'Sponsor Partners', icon: <Handshake size={16} /> },
    { id: 'inquiries', label: 'Contact Inquiries', icon: <Mail size={16} /> },
  ];

  const pendingRegsCount = registrations.filter(r => r.status === 'Pending').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div id="admin-view-container" className="glow-entrance min-h-[85vh] bg-[#000d21] text-white pt-24">
      
      {/* Top Admin warning notice */}
      <div className="bg-[#0c234a] border-b border-white/5 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <p className="font-mono text-white/50">
            Current Session Space: <span className="text-accent-blue font-bold">GOR Sempur HQ Database Server (Simulated State)</span>
          </p>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-accent-blue font-bold">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>SANDBOX SYNCHRONIZED RECEPTIVE READY</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR NAVIGATION COLUMN (Left - 3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            
            <div className="p-4 bg-secondary-navy rounded-xl border border-white/10 text-center">
              <span className="font-display font-black text-xs text-accent-blue tracking-wider block uppercase">BCFA CMS CONSOLE</span>
              <p className="text-[10px] text-white/45 mt-1 font-mono">Role: Super Administrator Mode Enabled</p>
            </div>

            {/* Modules dropdown selectors on mobile */}
            <div className="lg:hidden" id="mobile-module-selector">
              <label className="text-[9px] font-mono uppercase text-white/40 block mb-1">Select CMS Module Panel:</label>
              <select
                value={activeModule}
                onChange={(e) => {
                  setActiveModule(e.target.value);
                  setShowAddForm(false);
                }}
                className="w-full bg-[#082C5A] border border-white/10 rounded-xl px-4 py-3 text-sm font-display font-bold uppercase tracking-wider text-white focus:outline-none min-h-[44px]"
              >
                {adminModulesList.map(mod => (
                  <option key={mod.id} value={mod.id}>{mod.label}</option>
                ))}
              </select>
            </div>

            {/* Desktop modular layout */}
            <nav id="desktop-admin-sidebar" className="hidden lg:flex flex-col bg-secondary-navy/40 p-2 rounded-2xl border border-white/10 space-y-1">
              {adminModulesList.map((mod) => {
                const isActive = activeModule === mod.id;
                
                // notification alerts badge additions for specific mods
                let badge = null;
                if (mod.id === 'registrations' && pendingRegsCount > 0) {
                  badge = <span className="ml-auto bg-red-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">{pendingRegsCount}</span>;
                } else if (mod.id === 'inquiries' && newInquiriesCount > 0) {
                  badge = <span className="ml-auto bg-accent-blue text-[#011B41] font-mono text-[9px] px-1.5 py-0.5 rounded-full font-black">{newInquiriesCount}</span>;
                }

                return (
                  <button
                    key={mod.id}
                    id={`sidebar-tab-${mod.id}`}
                    onClick={() => {
                      setActiveModule(mod.id);
                      setShowAddForm(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-3.5 min-h-[44px] cursor-pointer ${
                      isActive 
                        ? 'bg-[#082C5A] text-accent-blue border-l-4 border-accent-blue' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mod.icon}
                    <span>{mod.label}</span>
                    {badge}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setIsAdminMode(false)}
              className="w-full text-center py-3 bg-[#000d21] text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 rounded-xl border border-white/10 min-h-[44px] cursor-pointer"
            >
              ← Back to Family Site
            </button>

          </div>

          {/* MAIN MODULE CONTENT CANVAS COLUMN (Right - 9 cols) */}
          <div className="lg:col-span-9 space-y-8 bg-secondary-navy/20 border border-white/10 rounded-3xl p-6 sm:p-8 min-h-[550px] relative">
            
            {/* Header Module Area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-4">
              <div>
                <span className="font-mono text-[9px] text-accent-blue font-bold uppercase tracking-widest leading-none">BCFA COLLECTION SERVICE</span>
                <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight mt-1">
                  {adminModulesList.find(m => m.id === activeModule)?.label}
                </h2>
              </div>

              {/* Sub actionable add items based on active module */}
              {activeModule !== 'dashboard' && activeModule !== 'registrations' && activeModule !== 'inquiries' && activeModule !== 'attendance' && (
                <button
                  id="cms-add-new-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-widest px-4 py-2.5 rounded-xl flex items-center space-x-1 min-h-[40px] cursor-pointer"
                >
                  {showAddForm ? <RotateCcw size={14} /> : <Plus size={14} />}
                  <span>{showAddForm ? 'Cancel Form' : `Add ${activeModule.charAt(0).toUpperCase() + activeModule.slice(1, -1)}`}</span>
                </button>
              )}
            </div>

            {/* Quick alert bar */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 bg-green-500/10 border border-green-500/35 rounded-xl text-xs text-green-400 font-mono flex items-center space-x-2"
                >
                  <CheckCircle size={14} />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---------------- MODULE DISPLAY ROUTER ---------------- */}

            {/* MODULE 1: CMS DASHBOARD OVERVIEW */}
            {activeModule === 'dashboard' && (
              <div className="space-y-8 animate-fade-in" id="module-dashboard-panel">
                
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-primary-navy/40 border border-white/10 p-5 rounded-xl text-center">
                    <Users size={24} className="text-accent-blue mx-auto mb-2" />
                    <span className="text-white/40 font-mono text-[10px] uppercase block leading-none">Total Students</span>
                    <span className="font-display font-black text-2xl text-white block mt-1">{students.length} Athletes</span>
                  </div>
                  <div className="bg-primary-navy/40 border border-white/10 p-5 rounded-xl text-center">
                    <ShieldAlert size={24} className="text-red-400 mx-auto mb-2" />
                    <span className="text-white/40 font-mono text-[10px] uppercase block leading-none">Pending Approvals</span>
                    <span className={`font-display font-black text-2xl block mt-1 ${pendingRegsCount > 0 ? 'text-red-400' : 'text-white'}`}>
                      {pendingRegsCount} Forms
                    </span>
                  </div>
                  <div className="bg-primary-navy/40 border border-white/10 p-5 rounded-xl text-center">
                    <Mail size={24} className="text-accent-blue mx-auto mb-2" />
                    <span className="text-white/40 font-mono text-[10px] uppercase block leading-none">New Inquiries</span>
                    <span className="font-display font-black text-2xl text-white block mt-1">{newInquiriesCount} Mailbox</span>
                  </div>
                  <div className="bg-primary-navy/40 border border-white/10 p-5 rounded-xl text-center">
                    <DollarSign size={24} className="text-green-400 mx-auto mb-2" />
                    <span className="text-white/40 font-mono text-[10px] uppercase block leading-none">Sim. Paid Billing</span>
                    <span className="font-display font-black text-xl text-white block mt-1.5 font-mono text-green-400">
                      IDR {payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Split list overview: Left Recent signups pending, Right recent enquiries */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Pipeline */}
                  <div className="bg-primary-navy/30 p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Recent Signup Inlets</span>
                      <span className="text-[10px] font-mono text-accent-blue font-bold">{pendingRegsCount} Pending approval</span>
                    </h4>

                    <div className="space-y-3">
                      {registrations.slice(0, 3).map((reg) => (
                        <div key={reg.id} className="p-3 bg-secondary-navy/45 border border-white/5 rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white block">{reg.studentName}</span>
                            <span className="text-[10px] text-white/50 block font-mono mt-0.5">Package: {reg.packageType} • Age: {reg.ageCategory}</span>
                          </div>

                          {reg.status === 'Pending' ? (
                            <button
                              id={`dash-approve-${reg.id}`}
                              onClick={() => handleApproveRegistration(reg)}
                              className="px-2.5 py-1.5 bg-green-500 hover:bg-green-600 text-white font-mono text-[9px] font-black uppercase rounded transition-all cursor-pointer min-h-[30px]"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="font-mono text-[9px] text-green-400 capitalize font-bold uppercase">{reg.status}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mail inbox */}
                  <div className="bg-primary-navy/30 p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Parent Inquiries Box</span>
                      <span className="text-[10px] font-mono text-accent-blue font-bold">{newInquiriesCount} New</span>
                    </h4>

                    <div className="space-y-3">
                      {inquiries.slice(0, 2).map((inq) => (
                        <div key={inq.id} className="p-3 bg-secondary-navy/45 border border-white/5 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="font-bold text-white block">{inq.name}</span>
                            <span className="text-[9px] text-[#64B5E6] font-mono uppercase">{inq.status} Inbox</span>
                          </div>
                          <p className="text-white/60 text-[11px] line-clamp-1 italic font-sans">{inq.message}</p>
                          
                          {inq.status === 'New' && (
                            <button
                              id={`dash-read-${inq.id}`}
                              onClick={() => {
                                setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, status: 'Read' } : i));
                                handleAlert(`Message from ${inq.name} logged as read.`);
                              }}
                              className="text-[9px] font-mono font-bold text-accent-blue uppercase hover:underline leading-none cursor-pointer min-h-[25px] flex items-center"
                            >
                              ✓ Mark as Read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* MODULE 2: STUDENTS */}
            {activeModule === 'students' && (
              <div className="space-y-6 animate-fade-in" id="module-students-panel">
                
                {/* Embedded ADD form if clicked */}
                {showAddForm && (
                  <form onSubmit={handleAddNewStudent} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Manual student registration</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Student Name</label>
                        <input required type="text" value={studentForm.name} onChange={(e) => setStudentForm(p => ({ ...p, name: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Date of Birth</label>
                        <input required type="date" value={studentForm.dob} onChange={(e) => setStudentForm(p => ({ ...p, dob: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Parent Name</label>
                        <input required type="text" value={studentForm.parentName} onChange={(e) => setStudentForm(p => ({ ...p, parentName: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Parent Phone</label>
                        <input required type="tel" value={studentForm.parentPhone} onChange={(e) => setStudentForm(p => ({ ...p, parentPhone: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Squad Group</label>
                        <select value={studentForm.ageCategory} onChange={(e) => setStudentForm(p => ({ ...p, ageCategory: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="U6-U9">U6-U9</option>
                          <option value="U10-U12">U10-U12</option>
                          <option value="U13-U15">U13-U15</option>
                          <option value="U16-U18">U16-U18</option>
                          <option value="Elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Health Status</label>
                        <select value={studentForm.status} onChange={(e) => setStudentForm(p => ({ ...p, status: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Active">Active</option>
                          <option value="Injured">Injured</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Save Student Profile
                    </button>
                  </form>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 font-mono text-white/40 uppercase">
                        <th className="py-3 px-2">Student Athlete</th>
                        <th className="py-3 px-2">Age category</th>
                        <th className="py-3 px-2">Primary Contact</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Removal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((st) => (
                        <tr key={st.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-2">
                            <span className="font-bold text-white block">{st.name}</span>
                            <span className="text-[10px] text-white/40 block font-mono">DOB: {st.dob}</span>
                          </td>
                          <td className="py-3 px-2 font-mono">{st.ageCategory}</td>
                          <td className="py-3 px-2">
                            <span className="block">{st.parentName}</span>
                            <span className="block text-[10px] text-white/40">{st.parentPhone}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              st.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                              {st.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              id={`delete-student-${st.id}`}
                              onClick={() => handleDeleteRow('students', st.id, st.name)}
                              className="p-1 px-2 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[30px]"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* MODULE 3: REGISTRATIONS PIPELINE */}
            {activeModule === 'registrations' && (
              <div className="space-y-6 animate-fade-in" id="module-registrations-panel">
                <p className="text-white/60 text-xs">These submissions came directly from family intakes complete checked receipts status. Click approve to integrate them live inside core training registries.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse font-sans">
                    <thead>
                      <tr className="border-b border-white/10 font-mono text-white/40 uppercase">
                        <th className="py-3 px-2">Student Name</th>
                        <th className="py-3 px-2">Category / package</th>
                        <th className="py-3 px-2">Parent Coordinate</th>
                        <th className="py-3 px-2">Pipeline Status</th>
                        <th className="py-3 px-2 text-right">Approval Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-2">
                            <span className="font-bold text-white block">{reg.studentName}</span>
                            <span className="text-[10px] text-white/40 block font-mono">DOB: {reg.dob}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="block font-bold text-accent-blue uppercase text-[10px]">{reg.ageCategory}</span>
                            <span className="block text-[10px] text-white/50">{reg.packageType} Pack</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="block font-mono text-[10px]">{reg.parentPhone}</span>
                            <span className="block text-[10px] text-white/35">{reg.parentEmail}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                              reg.status === 'Approved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-400/10 text-yellow-500'
                            }`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right space-x-1.5 whitespace-nowrap">
                            {reg.status === 'Pending' ? (
                              <>
                                <button
                                  id={`reg-appr-btn-${reg.id}`}
                                  onClick={() => handleApproveRegistration(reg)}
                                  className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white font-mono text-[10px] rounded uppercase cursor-pointer min-h-[30px]"
                                  title="Approve & Enroll"
                                >
                                  Approve
                                </button>
                                <button
                                  id={`reg-rej-btn-${reg.id}`}
                                  onClick={() => handleRejectRegistration(reg.id, reg.studentName)}
                                  className="px-2 py-1 bg-red-500/15 text-red-400 border border-red-500/20 font-mono text-[10px] rounded uppercase cursor-pointer min-h-[30px]"
                                  title="Reject signup"
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-white/40 font-mono text-[10px]">Processed ✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 4: CLASSES */}
            {activeModule === 'classes' && (
              <div className="space-y-6 animate-fade-in" id="module-classes-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewClass} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Setup new weekly schedule</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Class title name</label>
                        <input required type="text" value={classForm.name} onChange={(e) => setClassForm(p => ({ ...p, name: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Zoned Age Group</label>
                        <select value={classForm.ageCategory} onChange={(e) => setClassForm(p => ({ ...p, ageCategory: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="U6-U9">U6-U9</option>
                          <option value="U10-U12">U10-U12</option>
                          <option value="U13-U15">U13-U15</option>
                          <option value="U16-U18">U16-U18</option>
                          <option value="Elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Time Schedule Days</label>
                        <input required type="text" value={classForm.schedule} onChange={(e) => setClassForm(p => ({ ...p, schedule: e.target.value }))} placeholder="e.g. Tuesday & Friday: 16:00 - 17:3 WIB" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Physical Venue court</label>
                        <input required type="text" value={classForm.venue} onChange={(e) => setClassForm(p => ({ ...p, venue: e.target.value }))} placeholder="e.g. GOR Pajajaran Arena Court A" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Squad Slots Capacity</label>
                        <input required type="number" value={classForm.capacity} onChange={(e) => setClassForm(p => ({ ...p, capacity: parseInt(e.target.value) }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Specialist Coach Assigned ID</label>
                        <select value={classForm.coachId} onChange={(e) => setClassForm(p => ({ ...p, coachId: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          {coaches.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Publish Class Schedule
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classes.map((cls) => (
                    <div key={cls.id} className="p-5 bg-primary-navy/40 border border-white/10 rounded-2xl space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-[9px] text-[#64B5E6] font-bold uppercase">{cls.ageCategory} GRADE</span>
                          <h4 className="font-display font-black text-sm text-white uppercase">{cls.name}</h4>
                        </div>
                        
                        <button
                          id={`delete-class-${cls.id}`}
                          onClick={() => handleDeleteRow('classes', cls.id, cls.name)}
                          className="p-1 px-2 bg-red-500/10 text-red-400 hover:text-white rounded transition-all cursor-pointer min-h-[25px]"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      <div className="text-xs space-y-2 font-mono text-white/70">
                        <p>🕰 Schedule: <span className="text-white font-sans font-bold block">{cls.schedule}</span></p>
                        <p>📍 Location: <span className="text-white font-sans block">{cls.venue}</span></p>
                        <p>👥 Slots Filled: <span className="text-white block font-bold">{cls.currentCount} / {cls.capacity} students</span></p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* MODULE 5: COACHES */}
            {activeModule === 'coaches' && (
              <div className="space-y-6 animate-fade-in" id="module-coaches-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewCoach} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Register new academy staff</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Coach Profile Name</label>
                        <input required type="text" value={coachForm.name} onChange={(e) => setCoachForm(p => ({ ...p, name: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Official Position</label>
                        <input required type="text" value={coachForm.position} onChange={(e) => setCoachForm(p => ({ ...p, position: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Coaching License Level</label>
                        <input required type="text" value={coachForm.license} onChange={(e) => setCoachForm(p => ({ ...p, license: e.target.value }))} placeholder="e.g. AFC Futsal License Level 1" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Specialization Focus</label>
                        <input required type="text" value={coachForm.specialization} onChange={(e) => setCoachForm(p => ({ ...p, specialization: e.target.value }))} placeholder="e.g. Visual Tracking Coordination" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Experience Years</label>
                        <input required type="text" value={coachForm.experience} onChange={(e) => setCoachForm(p => ({ ...p, experience: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Honors/Achievements (Comma separated)</label>
                        <input type="text" value={coachForm.achievements} onChange={(e) => setCoachForm(p => ({ ...p, achievements: e.target.value }))} placeholder="Ex: West Java Gold Champion, PON Coach Certified" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Executive Bio</label>
                        <textarea required value={coachForm.bio} onChange={(e) => setCoachForm(p => ({ ...p, bio: e.target.value }))} rows={3} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none resize-none" />
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Save Coach Registry
                    </button>
                  </form>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 font-mono text-white/40 uppercase">
                        <th className="py-3 px-2">Coach / Staff</th>
                        <th className="py-3 px-2">Accreditation License</th>
                        <th className="py-3 px-2">Experience Specialties</th>
                        <th className="py-3 px-2 text-right">Removal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coaches.map((c) => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-2 flex items-center space-x-3">
                            <img src={c.imageUrl} className="h-9 w-9 rounded-full object-cover border border-white/10" alt="" />
                            <div>
                              <span className="font-bold text-white block">{c.name}</span>
                              <span className="text-[10px] text-white/40 block">{c.position}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className="bg-accent-blue/15 text-accent-blue font-mono font-bold text-[9px] px-2 py-0.5 rounded leading-none">
                              {c.license}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="block">{c.specialization}</span>
                            <span className="block text-[10px] text-white/40">History: {c.experience}</span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              id={`delete-coach-${c.id}`}
                              onClick={() => handleDeleteRow('coaches', c.id, c.name)}
                              className="p-1 px-2 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[30px]"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* MODULE 6: ATTENDANCE TRACKER MATCH EXECUTOR */}
            {activeModule === 'attendance' && (
              <div className="space-y-6 animate-fade-in" id="module-attendance-panel">
                <p className="text-white/60 text-xs">A comprehensive visual tool for coaches. Select active class timeslots, pull current student records allocated to their grade boundaries, check off attendance logs, and compile report coordinates directly.</p>

                <div className="p-4 bg-primary-navy/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <label className="text-[9px] font-mono uppercase text-white/40 block mb-1">Choose Active Training Class Schedule:</label>
                    <select
                      value={selectedAttendanceClass}
                      onChange={(e) => setSelectedAttendanceClass(e.target.value)}
                      className="bg-[#000d21] border border-white/10 rounded-lg px-3 py-2 text-xs font-display font-bold uppercase tracking-wider text-white focus:outline-none min-h-[38px] w-full sm:w-auto"
                    >
                      {classes.map(cl => (
                        <option key={cl.id} value={cl.id}>{cl.name} ({cl.schedule})</option>
                      ))}
                    </select>
                  </div>

                  <span className="text-xs font-mono text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1.5 rounded-lg font-bold uppercase leading-none">
                    Log Date: 15-June-2026 Today
                  </span>
                </div>

                {/* Students list */}
                <div className="p-5 bg-[#000d21]/60 border border-white/10 rounded-2xl space-y-4">
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                    Checked active student roster matching age category constraints
                  </h4>

                  <div className="space-y-2">
                    {students.map((student) => {
                      const isPresent = checkedAttendance[student.id];
                      
                      return (
                        <div key={student.id} className="p-3 bg-secondary-navy/40 border border-white/5 rounded-xl flex items-center justify-between">
                          <div>
                            <span className="font-display font-black text-xs text-white uppercase block leading-none">{student.name}</span>
                            <span className="text-[9px] font-mono text-white/40 block mt-1 uppercase">Allocated Category: {student.ageCategory}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              id={`att-present-btn-${student.id}`}
                              type="button"
                              onClick={() => setCheckedAttendance(prev => ({ ...prev, [student.id]: true }))}
                              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-black uppercase transition-all min-h-[32px] cursor-pointer ${
                                isPresent 
                                  ? 'bg-green-500 text-white font-black' 
                                  : 'bg-primary-navy/40 text-white/40 hover:text-white'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              id={`att-absent-btn-${student.id}`}
                              type="button"
                              onClick={() => setCheckedAttendance(prev => ({ ...prev, [student.id]: false }))}
                              className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase transition-all min-h-[32px] cursor-pointer ${
                                isPresent === false 
                                  ? 'bg-red-500 text-white font-bold' 
                                  : 'bg-primary-navy/40 text-white/40 hover:text-white'
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      id="submit-attendance-report-btn"
                      onClick={() => handleAlert("Logged attendance verification coordinates manually in simulated server logs.")}
                      className="bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-xs tracking-widest px-6 py-3 rounded-xl min-h-[44px] cursor-pointer"
                    >
                      Publish Daily Attendance Log ✓
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 7: EVENTS */}
            {activeModule === 'events' && (
              <div className="space-y-6 animate-fade-in" id="module-events-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewEvent} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Post new active fixture</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Fixture Match/Camp title</label>
                        <input required type="text" value={eventForm.title} onChange={(e) => setEventForm(p => ({ ...p, title: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Agenda Type</label>
                        <select value={eventForm.type} onChange={(e) => setEventForm(p => ({ ...p, type: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Tournament">Tournament</option>
                          <option value="Match">Friendly Match</option>
                          <option value="Camp">Conditioning Camp</option>
                          <option value="Workshop">Parent Seminar</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Date coordinates</label>
                        <input type="date" value={eventForm.date} onChange={(e) => setEventForm(p => ({ ...p, date: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Hours Window Time</label>
                        <input type="text" value={eventForm.time} onChange={(e) => setEventForm(p => ({ ...p, time: e.target.value }))} placeholder="e.g. 19:00 - 21:00 WIB" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Zoned Physical HQ Location</label>
                        <input required type="text" value={eventForm.location} onChange={(e) => setEventForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. GOR Pajajaran Arena Court A" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Exhibition opponent name</label>
                        <input type="text" value={eventForm.opponent} onChange={(e) => setEventForm(p => ({ ...p, opponent: e.target.value }))} placeholder="e.g. Jakarta Junior Team (Optional)" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Detailed Event Highlights Context</label>
                        <textarea required value={eventForm.details} onChange={(e) => setEventForm(p => ({ ...p, details: e.target.value }))} rows={3} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none resize-none" />
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Save Event Fixture Link
                    </button>
                  </form>
                )}

                <div className="space-y-4">
                  {events.map((ev) => (
                    <div key={ev.id} className="p-4 bg-primary-navy/40 border border-white/10 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="bg-accent-blue/15 text-accent-blue text-[9px] font-mono font-bold px-2 py-0.5 rounded mr-2 uppercase">
                          {ev.type}
                        </span>
                        <span className="text-white/40 font-mono text-[10px]">{ev.date}</span>
                        <h4 className="font-display font-black text-sm text-white uppercase mt-1 leading-none">{ev.title}</h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          id={`delete-event-${ev.id}`}
                          onClick={() => handleDeleteRow('events', ev.id, ev.title)}
                          className="p-2 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[38px] flex items-center justify-center"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* MODULE 8: PAYMENTS */}
            {activeModule === 'payments' && (
              <div className="space-y-6 animate-fade-in" id="module-payments-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewPayment} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Setup new billing invoice</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Student athlete name</label>
                        <input required type="text" value={paymentForm.studentName} onChange={(e) => setPaymentForm(p => ({ ...p, studentName: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Amount due IDR</label>
                        <input required type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm(p => ({ ...p, amount: parseInt(e.target.value) }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Cycle month billing</label>
                        <input required type="text" value={paymentForm.billingMonth} onChange={(e) => setPaymentForm(p => ({ ...p, billingMonth: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Package type grade</label>
                        <select value={paymentForm.packageType} onChange={(e) => setPaymentForm(p => ({ ...p, packageType: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Trial">Trial (Free)</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Annual">Annual</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Method used</label>
                        <input required type="text" value={paymentForm.method} onChange={(e) => setPaymentForm(p => ({ ...p, method: e.target.value }))} placeholder="BCA Virtual Account Trans." className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Status Receipt</label>
                        <select value={paymentForm.status} onChange={(e) => setPaymentForm(p => ({ ...p, status: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Overdue">Overdue</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Publish invoice audit
                    </button>
                  </form>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 font-mono text-white/40 uppercase">
                        <th className="py-3 px-2">Student / Invoice</th>
                        <th className="py-3 px-2">Cycles Level</th>
                        <th className="py-3 px-2">Amount Paid</th>
                        <th className="py-3 px-2">Status Trigger</th>
                        <th className="py-3 px-2 text-right">Removal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-2">
                            <span className="font-bold text-white block">{p.studentName}</span>
                            <span className="text-[10px] text-white/40 block">Logging date: {p.date} • Method: {p.method}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="block font-mono text-[10px]">{p.billingMonth}</span>
                            <span className="block text-[9px] font-bold text-accent-blue uppercase">{p.packageType} Cycle</span>
                          </td>
                          <td className="py-3 px-2 font-mono font-bold text-accent-blue">
                            IDR {p.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-2">
                            <button
                              id={`toggle-payment-status-${p.id}`}
                              onClick={() => {
                                const nextStatus = p.status === 'Paid' ? 'Pending' : p.status === 'Pending' ? 'Overdue' : 'Paid';
                                setPayments(prev => prev.map(x => x.id === p.id ? { ...x, status: nextStatus } : x));
                                handleAlert(`Toggle payment status for student: ${p.studentName}.`);
                              }}
                              className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold cursor-pointer min-h-[25px] ${
                                p.status === 'Paid' ? 'bg-green-500/10 text-green-400' : p.status === 'Pending' ? 'bg-yellow-400/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {p.status} ⇵
                            </button>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <button
                              id={`delete-payment-${p.id}`}
                              onClick={() => handleDeleteRow('payments', p.id, p.studentName + " " + p.billingMonth)}
                              className="p-1 px-2 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[30px]"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* MODULE 9: GALLERY */}
            {activeModule === 'gallery' && (
              <div className="space-y-6 animate-fade-in" id="module-gallery-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewGallery} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Upload media picture specifications</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Photography Card Title</label>
                        <input required type="text" value={galleryForm.title} onChange={(e) => setGalleryForm(p => ({ ...p, title: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Archive category</label>
                        <select value={galleryForm.category} onChange={(e) => setGalleryForm(p => ({ ...p, category: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Training">Training</option>
                          <option value="Matches">Matches</option>
                          <option value="Events">Events</option>
                          <option value="Champions">Champions</option>
                          <option value="Facilities">Facilities</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Photography Unsplash/File URL link</label>
                        <input required type="text" value={galleryForm.imageUrl} onChange={(e) => setGalleryForm(p => ({ ...p, imageUrl: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Publish Media Picture
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gallery.map((g) => (
                    <div key={g.id} className="bg-primary-navy/40 border border-white/10 rounded-xl overflow-hidden p-3 flex gap-4">
                      <img src={g.imageUrl} className="h-16 w-16 rounded-lg object-cover" alt="" />
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[8px] text-[#64B5E6] uppercase tracking-wider block leading-none">{g.category}</span>
                          <h4 className="font-display font-bold text-xs text-white uppercase mt-1 leading-tight">{g.title}</h4>
                        </div>
                        
                        <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
                          <span>Logged: {g.date}</span>
                          <button
                            id={`delete-gallery-${g.id}`}
                            onClick={() => handleDeleteRow('gallery', g.id, g.title)}
                            className="text-red-400 hover:text-white cursor-pointer min-h-[25px]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* MODULE 10: BLOG */}
            {activeModule === 'blog' && (
              <div className="space-y-6 animate-fade-in" id="module-blog-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewBlog} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Publish article guide</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Article Title Heading</label>
                          <input required type="text" value={blogForm.title} onChange={(e) => setBlogForm(p => ({ ...p, title: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Article Category</label>
                          <select value={blogForm.category} onChange={(e) => setBlogForm(p => ({ ...p, category: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                            <option value="News">Academy News</option>
                            <option value="Match Reports">Match Reports</option>
                            <option value="Training Tips">Training Tips</option>
                            <option value="Spotlight">Player Spotlight</option>
                            <option value="Resources">Parent Resources</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Staff Author Author</label>
                          <input required type="text" value={blogForm.author} onChange={(e) => setBlogForm(p => ({ ...p, author: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Read Time Duration</label>
                          <input type="text" value={blogForm.readTime} onChange={(e) => setBlogForm(p => ({ ...p, readTime: e.target.value }))} placeholder="Ex: 5 min read" className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Brief Excerpt paragraph</label>
                        <input required type="text" value={blogForm.excerpt} onChange={(e) => setBlogForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="A short description summarizing the main guide points." className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Main Formatted content body</label>
                        <textarea required value={blogForm.content} onChange={(e) => setBlogForm(p => ({ ...p, content: e.target.value }))} rows={6} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none resize-none" />
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Publish Article live
                    </button>
                  </form>
                )}

                <div className="space-y-4">
                  {blog.map((b) => (
                    <div key={b.id} className="p-4 bg-primary-navy/40 border border-white/10 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="text-white/40 font-mono text-[9px] block uppercase">Published: {b.date} • {b.category}</span>
                        <h4 className="font-display font-bold text-sm text-white uppercase mt-1 leading-none">{b.title}</h4>
                      </div>
                      
                      <button
                        id={`delete-blog-${b.id}`}
                        onClick={() => handleDeleteRow('blog', b.id, b.title)}
                        className="p-2 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[38px] flex items-center justify-center"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* MODULE 11: SPONSORS */}
            {activeModule === 'sponsors' && (
              <div className="space-y-6 animate-fade-in" id="module-sponsors-panel">
                
                {showAddForm && (
                  <form onSubmit={handleAddNewSponsor} className="p-6 bg-primary-navy/55 border border-accent-blue/30 rounded-2xl space-y-4">
                    <h3 className="font-display font-black text-xs uppercase tracking-wider text-accent-blue">Form: Setup partnership sponsor</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Sponsor Brand Name</label>
                        <input required type="text" value={sponsorForm.name} onChange={(e) => setSponsorForm(p => ({ ...p, name: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Company Website URL</label>
                        <input required type="text" value={sponsorForm.websiteUrl} onChange={(e) => setSponsorForm(p => ({ ...p, websiteUrl: e.target.value }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]" />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Partner Type Designation</label>
                        <select value={sponsorForm.type} onChange={(e) => setSponsorForm(p => ({ ...p, type: e.target.value as any }))} className="w-full text-xs p-2.5 bg-[#000d21] border border-white/10 rounded-lg focus:outline-none min-h-[40px]">
                          <option value="Main">Main Title sponsor</option>
                          <option value="Equipment">Equipment Sponsor</option>
                          <option value="Partner">General League Partner</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full p-2.5 bg-accent-blue text-primary-navy font-display font-black text-xs uppercase rounded-xl min-h-[44px] cursor-pointer">
                      Save Sponsor Logo
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {sponsors.map((spr) => (
                    <div key={spr.id} className="p-4 bg-primary-navy/40 border border-white/10 rounded-xl relative flex flex-col justify-between items-center text-center space-y-4">
                      <div className="absolute top-2 right-2">
                        <button
                          id={`delete-sponsor-${spr.id}`}
                          onClick={() => handleDeleteRow('sponsors', spr.id, spr.name)}
                          className="p-1 px-1.5 text-red-400 hover:text-white rounded hover:bg-red-500 transition-all cursor-pointer min-h-[25px]"
                        >
                          <X size={12} />
                        </button>
                      </div>

                      <img src={spr.logoUrl} className="h-10 w-24 object-contain filter invert opacity-50 hover:opacity-100" alt="" />
                      <div>
                        <h4 className="font-display font-bold text-xs text-white uppercase">{spr.name}</h4>
                        <span className="text-[8px] font-mono text-white/40 block mt-0.5">{spr.type} SPONSOR</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* MODULE 12: INQUIRIES */}
            {activeModule === 'inquiries' && (
              <div className="space-y-6 animate-fade-in" id="module-inquiries-panel">
                <p className="text-white/60 text-xs">A live pipeline representing parent messages submitted on the Contact platform. Read details, reply or toggle status modes.</p>

                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      className={`p-5 rounded-2xl border text-xs space-y-3.5 transition-all ${
                        inq.status === 'New' 
                          ? 'bg-secondary-navy/45 border-accent-blue/35' 
                          : 'bg-primary-navy/40 border-white/10 opacity-75'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-white text-sm block">{inq.name}</span>
                          <span className="text-[9px] text-white/40 block font-mono mt-0.5">Date: {inq.date} • Phone: {inq.phone} • Email: {inq.email}</span>
                        </div>

                        <div className="flex gap-2">
                          {inq.status === 'New' && (
                            <button
                              id={`read-inq-btn-${inq.id}`}
                              onClick={() => {
                                setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, status: 'Read' } : i));
                                handleAlert(`Inquiry of ${inq.name} marked as read.`);
                              }}
                              className="px-2 py-1 bg-[#082C5A] border border-[#64B5E6]/30 text-accent-blue hover:bg-[#64B5E6] hover:text-primary-navy font-mono text-[9px] rounded uppercase cursor-pointer min-h-[25px]"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            id={`delete-inq-${inq.id}`}
                            onClick={() => handleDeleteRow('inquiries', inq.id, inq.name + " message")}
                            className="p-1 px-2 hover:bg-red-500 hover:text-white text-red-400 rounded cursor-pointer min-h-[30px]"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-[#000d21] rounded-xl border border-white/5">
                        <p className="font-mono text-[9px] text-[#64B5E6] uppercase pb-1 border-b border-white/5 mb-1.5 font-bold leading-none">
                          Subject: {inq.subject || 'Direct General Inquiry'}
                        </p>
                        <p className="text-white/80 font-sans leading-relaxed italic">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Empty check states */}
            {activeModule !== 'dashboard' && activeModule !== 'attendance' && events.length === 0 && activeModule === 'events' && (
              <div className="text-center py-20">
                <span className="text-white/40 font-mono text-xs block">No items registered in active database. Click add resource above.</span>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
