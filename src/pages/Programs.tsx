/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Download, Calendar, DollarSign, MapPin, User, ChevronRight, CheckCircle, ShieldAlert, Award
} from 'lucide-react';
import { Coach, ClassSchedule } from '../types';

import kidsPathwayImg from '../assets/images/kids_pathway_player_1781504530272.jpg';
import juniorPathwayImg from '../assets/images/junior_pathway_player_1781504547865.jpg';
import elitePathwayImg from '../assets/images/elite_pathway_player_1781504567042.jpg';
import eliteProPathwayImg from '../assets/images/elitepro_pathway_player_1781504587654.jpg';

interface ProgramsProps {
  coaches: Coach[];
  classes: ClassSchedule[];
  setCurrentPage: (page: string) => void;
}

interface ProgramCardProps {
  key?: string;
  prog: {
    id: string;
    title: string;
    ageLimit: string;
    fee: string;
    admission: string;
    headline: string;
    tagline: string;
    description: string;
    curriculumPoints: string[];
    assignedCoachId: string;
    scheduleDays: string;
    location: string;
    imgUrl: string;
  };
  coaches: Coach[];
  setCurrentPage: (page: string) => void;
  handleDownload: (progTitle: string) => void;
  downloadSuccess: string | null;
}

function ProgramCard({ prog, coaches, setCurrentPage, handleDownload, downloadSuccess }: ProgramCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of each individual card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Calculate parallax y translation mapping scroll progress
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div 
      ref={cardRef}
      id={`program-card-${prog.id}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-secondary-navy/20 border border-white/10 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-accent-blue/20 transition-all glow-border"
    >
      
      {/* Left side Image block styled with extra scale to avoid edges during parallax movement */}
      <div className="lg:col-span-4 relative h-64 lg:h-auto min-h-[250px] overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#011B41]/90 via-[#011B41]/20 to-transparent z-10" />
        <motion.img 
          src={prog.imgUrl} 
          alt={prog.title} 
          style={{ y: yParallax, scale: 1.25 }}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800";
          }}
        />
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <span className="font-mono text-[9px] text-accent-blue font-black tracking-[0.2em] uppercase block mb-1">
            {prog.tagline}
          </span>
          <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase leading-tight tracking-tight">
            {prog.title}
          </h3>
        </div>
      </div>

      {/* Center info block: program details */}
      <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-accent-blue/15 text-accent-blue font-mono text-[10px] font-black px-3 py-1 rounded">
            SQUAD: {prog.id}
          </span>
          <span className="text-white/60 font-mono text-xs flex items-center gap-1">
            <Calendar size={13} className="text-accent-blue" />
            {prog.ageLimit}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-accent-blue font-sans text-xs font-black tracking-wider uppercase">
            &rdquo;{prog.headline}&rdquo;
          </span>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            {prog.description}
          </p>
        </div>

        {/* Curriculum list check indicators */}
        <div className="space-y-3 pt-2">
          <h4 className="font-mono text-[11px] font-black text-white/50 uppercase tracking-wider">
            Key Development Benchmarks:
          </h4>
          <div className="space-y-2">
            {prog.curriculumPoints.map((pt, index) => (
              <div key={index} className="flex items-start space-x-2.5">
                <CheckCircle size={14} className="text-accent-blue shrink-0 mt-0.5" />
                <span className="text-white/70 text-xs leading-relaxed font-sans">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PDF download and Action buttons */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
          <button
            id={`btn-download-pdf-${prog.id}`}
            onClick={() => handleDownload(prog.title)}
            className="bg-secondary-navy/80 hover:bg-secondary-navy text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border border-white/10 flex items-center space-x-2 min-h-[38px] cursor-pointer text-[10px] transition-all"
          >
            <Download size={13} className="text-accent-blue" />
            <span>Download Syllabus PDF</span>
          </button>

          <button
            id={`btn-join-program-${prog.id.replace(' ', '-')}`}
            onClick={() => setCurrentPage('registration')}
            className="bg-accent-blue hover:bg-accent-blue/95 text-[#011B41] font-display font-black uppercase text-xs tracking-widest px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-1.5 min-h-[38px] cursor-pointer text-[10px]"
          >
            <span>Register for {prog.id} Squad</span>
            <ChevronRight size={13} />
          </button>
          
          {downloadSuccess === prog.title && (
            <span className="text-green-400 font-mono text-[10px] flex items-center gap-1 animate-pulse">
              ✓ BCFA-{prog.id.replace(' ', '')}-2026.pdf
            </span>
          )}
        </div>

      </div>

    </motion.div>
  );
}

export default function Programs({ coaches, classes, setCurrentPage }: ProgramsProps) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const programsDetailed = [
    {
      id: 'KIDS',
      title: 'Fun Futsal Foundation',
      ageLimit: 'Under 6 Years Old (Anak usia dibawah 6 tahun)',
      fee: 'IDR 550.000 / Month',
      admission: 'IDR 350.000 (Includes Jersey Kit)',
      headline: 'Fun & Coordination Games',
      tagline: 'Tumbuh Bahagia & Aktif',
      description: 'Memperkenalkan keceriaan dunia futsal sejak usia sedini mungkin. Fokus utama adalah pada koordinasi motorik kasar, kelincahan dasar, pemahaman spasial, dan sosialisasi anak melalui elemen permainan bola yang menyenangkan.',
      curriculumPoints: [
        'Mengembangkan keterampilan motorik dasar, lari koordinatif, dan keseimbangan tubuh',
        'Membangun kontrol bola awal secara menyenangkan dengan stimulasi kaki aktif',
        'Melatih rasa percaya diri anak ketika bergerak dan bekerja sama dalam kelompok kecil',
        'Sosialisasi ceria melalui pengenalan awal permainan bola futsal interaktif'
      ],
      assignedCoachId: 'c3',
      scheduleDays: 'Saturday & Sunday: 08:30 - 10:00 WIB',
      location: 'GOR Pajajaran Indoor Futsal Arena, Court A',
      imgUrl: kidsPathwayImg
    },
    {
      id: 'JUNIOR',
      title: 'Technical Mastery Prep',
      ageLimit: 'Under 10 Years Old (Anak usia dibawah 10 tahun)',
      fee: 'IDR 650.000 / Month',
      admission: 'IDR 350.000 (Includes Jersey Kit)',
      headline: 'Teknik Dasar & Sol Control',
      tagline: 'Fondasi Teknik & Disiplin',
      description: 'Langkah awal pematangan teknik futsal anak. Mulai memperkenalkan kontrol bola presisi menggunakan permukaan sol sepatu (sole control), teknik operan dasar yang akurat, serta pergerakan dinamis tanpa bola.',
      curriculumPoints: [
        'Menguasai penerimaan bola menggunakan sol sepatu (sole reception) secara mulus',
        'Melatih akurasi operan kaki bagian dalam (short passing) serta komunikasi lapangan',
        'Menanamkan sportivitas tinggi, kedisiplinan berolahraga, dan fokus saat bertanding',
        'Pengenalan dasar formasi sederhana futsal & mini games evaluasi serasi'
      ],
      assignedCoachId: 'c2',
      scheduleDays: 'Tuesday & Friday: 16:00 - 17:30 WIB',
      location: 'GOR Pajajaran - Court B',
      imgUrl: juniorPathwayImg
    },
    {
      id: 'ELITE',
      title: 'Advanced Talent Development',
      ageLimit: 'Under 13 Years Old (Anak usia dibawah 13 tahun)',
      fee: 'IDR 750.000 / Month',
      admission: 'IDR 400.000 (Elite Home/Away Jersey Pack)',
      headline: 'Akurasi, Kecepatan, & Visi',
      tagline: 'Akurasi, Kecepatan, & Visi',
      description: 'Memasuki tahap pematangan mekanik dan pemahaman taktis intensif. Pemain diajarkan duel satu lawan satu (1v1), pengambilan keputusan cepat di bawah tekanan tempo, serta peningkatan akselerasi fisik.',
      curriculumPoints: [
        'Mengasah kecerdasan kognitif di lapangan (split-second decision making)',
        'Melatih pola transisi ofensif-defensif dan duel perebutan bola secara taktis',
        'Meningkatkan kapasitas stamina, kelincahan gerak, dan kontrol bola berkelanjutan',
        'Simulasi game bertekanan tempo tinggi & penempatan posisi ideal transisi'
      ],
      assignedCoachId: 'c1',
      scheduleDays: 'Wednesday: 16:30 - 18:30 & Saturday: 10:30 - 12:30 WIB',
      location: 'Pajajaran Futsal Arena (Sempur)',
      imgUrl: elitePathwayImg
    },
    {
      id: 'ELITE PRO',
      title: 'Pre-Professional Pathway',
      ageLimit: 'Under 15 Years Old (Anak usia dibawah 15 tahun)',
      fee: 'IDR 850.000 / Month',
      admission: 'IDR 400.000 (Complete Performance Activewear)',
      headline: 'Skema Rotasi & Set-Piece Kompleks',
      tagline: 'Gerbang Menuju Profesional',
      description: 'Menyiapkan talenta terbaik menuju persaingan profesional dan level kompetisi nasional kelas atas. Difokuskan pada pemahaman formasi rotasi futsal modern yang kompleks, taktik set-piece, analisis video pertandingan, serta pematangan ketahanan mental juara.',
      curriculumPoints: [
        'Memahami rotasi taktis penuh secara dinamis (Alas, Fixo, dan Pivot)',
        'Pemolesan skema taktik khusus, analisis visual permainan, dan strategi set-piece',
        'Mempersiapkan fisik kelas atlet dan ketahanan mental tanding di kancah nasional',
        'Analisis rekaman video taktis langsung pasca-tanding untuk perbaikan formasi'
      ],
      assignedCoachId: 'c2',
      scheduleDays: 'Monday & Thursday: 18:30 - 20:30 WIB',
      location: 'Sentul Sports Park - Pitch 1',
      imgUrl: eliteProPathwayImg
    },
    {
      id: 'PRO PIPELINE',
      title: 'Professional Pathway Division',
      ageLimit: '16+ (Subject to Scout Evaluation)',
      fee: 'Fully Subsidized / Gratis Biaya',
      admission: 'Complimentary sponsored equipment / Hasil Seleksi',
      headline: 'Jejaring Pro Club & Karir Atlet',
      tagline: 'Karir & Liga Nasional',
      description: 'Program pembinaan karir olahraga khusus berjejaring langsung dengan agen olahraga futsal nasional, pemandu bakat (scouts) profesional, dan keikutsertaan turnamen elit nasional.',
      curriculumPoints: [
        'Direct linkages dengan agen profesional & scouts resmi klub liga nasional',
        'Uji tanding kompetitif reguler menghadapi tim cadangan pro league senior',
        'Sesi evaluasi visual performa analitik & bimbingan nutrisi kebugaran khusus',
        'Program porsi fisik intensif kelas atlet pro dengan target kesiapan tanding'
      ],
      assignedCoachId: 'c1',
      scheduleDays: 'Thursday: 19:30 - 21:30 & Saturday: 16:00 - 18:00 WIB',
      location: 'Pajajaran Futsal Arena - Main Court',
      imgUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleDownload = (progTitle: string) => {
    setDownloadSuccess(progTitle);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div id="programs-view-container" className="glow-entrance">
      
      {/* Editorial Hero banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            ACCREDITED DEVELOPMENT CURRICULUMS
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            TRAINING PROGRAMS
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            Carefully crafted sports methodology pathways for boys and girls. Our structured systems are optimized yearly with modern athletic standards of individual ball coordination.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {programsDetailed.map((prog) => (
            <ProgramCard
              key={prog.id}
              prog={prog}
              coaches={coaches}
              setCurrentPage={setCurrentPage}
              handleDownload={handleDownload}
              downloadSuccess={downloadSuccess}
            />
          ))}
        </div>
      </section>

      {/* Structured Trial FAQ Section */}
      <section className="py-20 bg-secondary-navy/40 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Award size={40} className="text-accent-blue mx-auto" />
          <h2 className="font-display font-black text-3xl text-white uppercase">
            NOT SURE WHICH PROGRAM FITS BEST?
          </h2>
          <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed">
            Every child is allowed **one trial session completely free of charge**. Our technical coaches will evaluate your child&apos;s physical speed, coordination thresholds, and game intelligence to place them into their optimal development squad.
          </p>
          <div className="pt-2">
            <button
              id="programs-trial-btn"
              onClick={() => setCurrentPage('registration')}
              className="bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase tracking-wider text-xs px-8 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
            >
              Request Assessment & Trial
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
