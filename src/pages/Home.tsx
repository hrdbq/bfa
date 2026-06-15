/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Shield, Calendar, Users, Trophy, ChevronRight, Play, CheckCircle2, Star, Quote, ArrowRight, Activity, Zap, MapPin, Clock
} from 'lucide-react';
import heroImg from '../assets/images/hero_futsal_player_1781501597832.jpg';
import heroVideo from '../assets/images/video.mp4';
import kidsPathwayImg from '../assets/images/kids_pathway_player_1781504530272.jpg';
import juniorPathwayImg from '../assets/images/junior_pathway_player_1781504547865.jpg';
import elitePathwayImg from '../assets/images/elite_pathway_player_1781504567042.jpg';
import eliteProPathwayImg from '../assets/images/elitepro_pathway_player_1781504587654.jpg';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  sponsors: any[];
}

export default function Home({ setCurrentPage, sponsors }: HomeProps) {
  const [activeAgeCategory, setActiveAgeCategory] = useState('Kids');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animated stats initial states (simulating ticker)
  const [enrollCount, setEnrollCount] = useState(250);
  const [coachCount, setCoachCount] = useState(4);
  const [sessionCount, setSessionCount] = useState(8500);
  const [trophyCount, setTrophyCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnrollCount(prev => (prev < 520 ? prev + 3 : 520));
      setCoachCount(prev => (prev < 15 ? prev + 1 : 15));
      setSessionCount(prev => (prev < 12500 ? prev + 45 : 12500));
      setTrophyCount(prev => (prev < 45 ? prev + 1 : 45));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const whyChooseUsData = [
    {
      title: 'Licensed Pro Coaches',
      description: 'Instruction led exclusively by AFC Futsal License holders and former Professional League athletes equipped with modern youth pedagogy.',
      icon: <Award className="text-accent-blue" size={28} />
    },
    {
      title: 'Modern Structured Curriculum',
      description: 'Progressive training blocks targeting rapid cognitive split-decision capabilities, physical explosiveness, and ultimate ball mastery.',
      icon: <Shield className="text-accent-blue" size={28} />
    },
    {
      title: 'Tournament Exposure',
      description: 'Continuous integration in competitive leagues and regional futsal showcases ensuring high-intensity match experience.',
      icon: <Trophy className="text-accent-blue" size={28} />
    },
    {
      title: 'Professional Pathways',
      description: 'Direct corporate ties to scouts, official sports clubs, and youth registries preparing players for future occupational sports roles.',
      icon: <Zap className="text-accent-blue" size={28} />
    }
  ];

  const ageData: { [key: string]: any } = {
    'Kids': {
      title: 'Fun Futsal Foundation',
      ageLabel: 'Akreditasi: Anak usia dibawah 6 tahun',
      description: 'Memperkenalkan keceriaan dunia futsal sejak usia sedini mungkin. Fokus utama adalah pada koordinasi motorik kasar, kelincahan dasar, pemahaman spasial, dan sosialisasi anak melalui elemen permainan bola yang menyenangkan.',
      goals: [
        'Mengembangkan keterampilan motorik dasar, lari koordinatif, dan keseimbangan tubuh',
        'Membangun kontrol bola awal secara menyenangkan dengan stimulasi kaki aktif',
        'Melatih rasa percaya diri anak ketika bergerak dan bekerja sama dalam kelompok kecil'
      ],
      focus: '90% Fun & Coordination Games, 10% Ball Contact',
      sessions: '2 Sesi per minggu (60 menit per sesi)',
      imgUrl: kidsPathwayImg,
      tagline: 'Tumbuh Bahagia & Aktif'
    },
    'Junior': {
      title: 'Technical Mastery Prep',
      ageLabel: 'Akreditasi: Anak usia dibawah 10 tahun',
      description: 'Langkah awal pematangan teknik futsal anak. Mulai memperkenalkan kontrol bola presisi menggunakan permukaan sol sepatu (sole control), teknik operan dasar yang akurat, serta pergerakan dinamis tanpa bola.',
      goals: [
        'Menguasai penerimaan bola menggunakan sol sepatu (sole reception) secara mulus',
        'Melatih akurasi operan kaki bagian dalam (short passing) serta komunikasi lapangan',
        'Menanamkan sportivitas tinggi, kedisiplinan berolahraga, dan fokus saat bertanding'
      ],
      focus: '60% Teknik Dasar Futsal, 20% Strategi Sederhana, 20% Mini Games',
      sessions: '2 Sesi per minggu + Weekend Exhibition Match',
      imgUrl: juniorPathwayImg,
      tagline: 'Fondasi Teknik & Disiplin'
    },
    'Elite': {
      title: 'Advanced Talent Development',
      ageLabel: 'Akreditasi: Anak usia dibawah 13 tahun',
      description: 'Memasuki tahap pematangan mekanik dan pemahaman taktis intensif. Pemain diajarkan duel satu lawan satu (1v1), pengambilan keputusan cepat di bawah tekanan tempo, serta peningkatan akselerasi fisik.',
      goals: [
        'Mengasah kecerdasan kognitif di lapangan (split-second decision making)',
        'Melatih pola transisi ofensif-defensif dan duel perebutan bola secara taktis',
        'Meningkatkan kapasitas stamina, kelincahan gerak, dan kontrol bola berkelanjutan'
      ],
      focus: '40% Transisi Taktis, 40% Penguasaan Bola Intensif, 20% Simulasi Kompetisi',
      sessions: '3 Sesi per minggu + Keikutsertaan Liga Internal',
      imgUrl: elitePathwayImg,
      tagline: 'Akurasi, Kecepatan, & Visi'
    },
    'Elite Pro': {
      title: 'Pre-Professional Pathway',
      ageLabel: 'Akreditasi: Anak usia dibawah 15 tahun',
      description: 'Menyiapkan talenta terbaik menuju persaingan profesional dan level kompetisi nasional kelas atas. Difokuskan pada pemahaman formasi rotasi futsal modern yang kompleks, taktik set-piece, analisis video pertandingan, serta pematangan ketahanan mental juara.',
      goals: [
        'Memahami rotasi taktis penuh secara dinamis (Alas, Fixo, dan Pivot)',
        'Pemolesan skema taktik khusus, analisis visual permainan, dan strategi set-piece',
        'Mempersiapkan fisik kelas atlet dan ketahanan mental tanding di kancah nasional'
      ],
      focus: '30% Strategi & Set-Pieces, 40% Fisik & Conditioning, 30% Turnamen Regulasi',
      sessions: '3 - 4 Sesi intensif per minggu + Turnamen Regional/Nasional',
      imgUrl: eliteProPathwayImg,
      tagline: 'Gerbang Menuju Profesional'
    }
  };

  const currentAge = ageData[activeAgeCategory] || ageData['Kids'];

  const timelineSteps = [
    {
      num: '01',
      title: 'Technical Foundation',
      desc: 'Developing absolute comfort with both feet using the sole, instep, and external surfaces of the foot in tight spaces.'
    },
    {
      num: '02',
      title: 'Tactical Intelligence',
      desc: 'Teaching spatial rotation, visual scanner habits, passing lane alignment, and numeric overload equations.'
    },
    {
      num: '03',
      title: 'Physical Conditioning',
      desc: 'Futsal-specific cardiovascular intervals, sharp multidirectional accelerations, and core injury-prevention rehab.'
    },
    {
      num: '04',
      title: 'Mental Resilience',
      desc: 'Acquiring focused team synchronization, coping with mistake stress, and maintaining discipline under physical exhaustion.'
    },
    {
      num: '05',
      title: 'Competitive Peak',
      desc: 'Active deployment in national tournaments, scouts exhibitions, state-level leagues, and high-intensity match structures.'
    }
  ];

  const testimonials = [
    {
      quote: "Enrolling Kimi in BCFA was the best sports decision we have made. The facility at GOR Pajajaran is top-notch, but the genuine care, discipline, and detailed progress review given by Coach Siti are what really changed his confidence.",
      author: "Hendra Wijaya",
      role: "Father of Kimi (U9 Squad)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=155"
    },
    {
      quote: "The tactical rotations I learned here allowed me to make a seamless transition into state-level trials. The coaches don't just instruct, they review session videos with you to pinpoint exact errors in your visual tracking.",
      author: "Farhan Saputra",
      role: "BCFA Elite U18 Captain",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=155"
    },
    {
      quote: "BCFA stands out because of its absolute professionalism. There is no flat larping or disorganized practice. Everything from schedule clocks to physiotherapy and tournament registrations is transparently communicated to parents.",
      author: "Amelia Siregar",
      role: "Mother of Zacky (U13 Squad)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=155"
    }
  ];

  return (
    <div id="home-view-container" className="glow-entrance">
      
      {/* SECTION 1 - HERO */}
      <section 
        id="home-hero-section" 
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-primary-navy"
      >
        {/* Background Sports Video / Imagery */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/95 via-primary-navy/80 to-primary-navy/60 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover object-center"
          >
            <source 
              src={heroVideo} 
              type="video/mp4" 
            />
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-boys-playing-futsal-in-an-indoor-court-41584-large.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Hero details card */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 text-left w-full">
          <div className="max-w-4xl space-y-6">

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.95]">
              DEVELOP SKILLS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-blue to-accent-blue/80">BUILD CHARACTER.</span><br />
              CREATE CHAMPIONS.
            </h1>

            <p className="text-white/80 font-sans text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
              Professional futsal training designs engineered to unlock every player&apos;s potential through highly structured licensing coach models, tactical game curriculums, and national match exposure in Bogor.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-join-trial-btn"
                onClick={() => setCurrentPage('registration')}
                className="bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase tracking-wider text-sm px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-accent-blue/20 min-h-[48px] cursor-pointer"
              >
                <span>Join Free Trial Class</span>
                <ArrowRight size={16} />
              </button>

              <button
                id="hero-explore-programs-btn"
                onClick={() => setCurrentPage('programs')}
                className="bg-secondary-navy hover:bg-secondary-navy/80 text-white font-display font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer"
              >
                <span>Explore Curriculums</span>
              </button>
            </div>

            {/* Live Stats Row with incremental counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10 mt-12 max-w-3xl">
              <div id="stat-students">
                <span className="block font-display font-black text-3xl sm:text-4xl text-accent-blue">
                  {enrollCount}+
                </span>
                <span className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mt-1">
                  Active Enrolled Students
                </span>
              </div>
              <div id="stat-coaches">
                <span className="block font-display font-black text-3xl sm:text-4xl text-white">
                  {coachCount}
                </span>
                <span className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mt-1">
                  AFC Certified Coaches
                </span>
              </div>
              <div id="stat-sessions">
                <span className="block font-display font-black text-3xl sm:text-4xl text-accent-blue">
                  {(sessionCount / 1000).toFixed(1)}k+
                </span>
                <span className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mt-1">
                  Completed Drills
                </span>
              </div>
              <div id="stat-trophies">
                <span className="block font-display font-black text-3xl sm:text-4xl text-white">
                  {trophyCount}+
                </span>
                <span className="block text-white/50 font-mono text-[10px] uppercase tracking-wider mt-1">
                  Championship Gold Titles
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 - WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24 bg-primary-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 via-transparent to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block">
              COORDINATION • TECHNIQUE • MINDSET
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              WHY ELITE FUTSAL PATHS BEGIN WITH BCFA
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We operate differently than casual football clubs. Our primary core dedication is sports science efficiency, individual physical confidence, and a continuous pipeline pathway toward Indonesian national systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CARD 1 (5/12 Columns) - Vertical Card (Licensed Pro Coaching) */}
            <div 
              id="why-card-pedagogy"
              className="lg:col-span-5 bg-[#031633]/90 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl relative"
            >
              {/* Header with Slanted Banner at absolute top-0 left-0 */}
              <div className="absolute top-0 left-0 z-20 font-sans">
                <div 
                  className="bg-accent-blue text-primary-navy font-display font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2"
                  style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
                >
                  PRO PEDAGOGY
                </div>
              </div>
              
              {/* Sports Imagery - Full Bleed blending like Cards 2 & 3 */}
              <div className="relative h-60 w-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#031633] via-transparent to-transparent z-10" />
                <img 
                  src={juniorPathwayImg} 
                  alt="Licensed Pro Coaches" 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Text */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-tight">
                    Licensed Pro Coaching Cadre
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                    Instruction is led exclusively by AFC Futsal License holders and former Professional League athletes equipped with modern sports pedagogy. We drill tactical split-second reactions.
                  </p>
                </div>
                
                <div className="w-full h-[1px] bg-white/5 my-2" />

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      const coachesSec = document.getElementById('coaches');
                      if (coachesSec) {
                        coachesSec.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setCurrentPage('coaches');
                      }
                    }}
                    className="text-accent-blue font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>MEET THE COACHES</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2 (7/12 Columns) - Horizontal Split Card (Structured Curriculum) */}
            <div 
              id="why-card-systems"
              className="lg:col-span-7 bg-[#031633]/90 border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row h-full shadow-2xl relative"
            >
              {/* Slanted Banner overlay exactly at top-0 left-0 */}
              <div className="absolute top-0 left-0 z-20 font-sans">
                <div 
                  className="bg-accent-blue text-primary-navy font-display font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2"
                  style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
                >
                  SYSTEMS LAB
                </div>
              </div>

              {/* Left Side: Portrait Image */}
              <div className="w-full md:w-5/12 relative min-h-[220px] md:min-h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#031633] z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031633] via-transparent to-transparent z-10 md:hidden" />
                <img 
                  src={kidsPathwayImg} 
                  alt="Structured Curriculum" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Side: Editorial Content Details */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative z-10">

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-none">
                      STRUCTURED
                    </h3>
                    <span className="font-display font-black text-accent-blue text-2xl uppercase tracking-tight block mt-1">
                      CURRICULUM
                    </span>
                    <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest block mt-2">
                      COGNITIVE SPORT DEVELOPMENT
                    </span>
                  </div>

                  <div className="w-12 h-1 bg-accent-blue rounded" />

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                    Progressive training blocks targeting rapid cognitive split-decision capabilities, physical explosiveness, and ultimate ball mastery.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      const progsSec = document.getElementById('programs');
                      if (progsSec) {
                        progsSec.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setCurrentPage('programs');
                      }
                    }}
                    className="bg-white hover:bg-accent-blue hover:text-primary-navy text-primary-navy font-display font-black text-xs uppercase tracking-wider px-5 py-3 rounded shadow transition-all flex items-center justify-between gap-3 min-h-[44px] cursor-pointer group"
                  >
                    <span>EXPLORE PROGRAMS</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 3 (7/12 Columns) - Horizontal Split Card (Tournament Exposure), reversed for visual rhythm */}
            <div 
              id="why-card-exposure"
              className="lg:col-span-7 bg-[#031633]/90 border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row h-full shadow-2xl relative"
            >
              {/* Slanted Banner overlay at top-0 left-0 */}
              <div className="absolute top-0 left-0 z-20 font-sans">
                <div 
                  className="bg-accent-blue text-primary-navy font-display font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2"
                  style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
                >
                  MATCH STRESS
                </div>
              </div>

              {/* Left Side: Content Details on desktop/tablet */}
              <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative z-10 order-2 md:order-1">

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-none">
                      TOURNAMENT
                    </h3>
                    <span className="font-display font-black text-accent-blue text-2xl uppercase tracking-tight block mt-1">
                      EXPOSURE
                    </span>
                    <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest block mt-2">
                      COMPETITIVE ARENAS & TROPHIES
                    </span>
                  </div>

                  <div className="w-12 h-1 bg-accent-blue rounded" />

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                    Continuous integration in competitive regional leagues and national futsal showcases ensuring high-intensity match experience.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      const eventsSec = document.getElementById('events');
                      if (eventsSec) {
                        eventsSec.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setCurrentPage('events');
                      }
                    }}
                    className="bg-white hover:bg-accent-blue hover:text-primary-navy text-primary-navy font-display font-black text-xs uppercase tracking-wider px-5 py-3 rounded shadow transition-all flex items-center justify-between gap-3 min-h-[44px] cursor-pointer group"
                  >
                    <span>VIEW EVENTS MAP</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Landscape/Portrait Image */}
              <div className="w-full md:w-5/12 relative min-h-[220px] md:min-h-full order-1 md:order-2">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#031633] z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031633] via-transparent to-transparent z-10 md:hidden" />
                <img 
                  src={elitePathwayImg} 
                  alt="Tournament Exposure" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* CARD 4 (5/12 Columns) - Vertical Card (Scout Pipelines & Bridge) */}
            <div 
              id="why-card-pathways"
              className="lg:col-span-5 bg-[#031633]/90 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl relative"
            >
              {/* Header with Slanted Banner at absolute top-0 left-0 */}
              <div className="absolute top-0 left-0 z-20 font-sans">
                <div 
                  className="bg-accent-blue text-primary-navy font-display font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2"
                  style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
                >
                  SCOUT PLATFORMS
                </div>
              </div>
              
              {/* Sports Imagery - Full Bleed blending like Cards 2 & 3 */}
              <div className="relative h-60 w-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#031633] via-transparent to-transparent z-10" />
                <img 
                  src={eliteProPathwayImg} 
                  alt="Professional Pathways" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Text */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-tight">
                    Professional Feeder Pathways
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                    Direct corporate ties to scouts, official sports clubs, and youth registries preparing gifted players for future occupational sport roles both national and international.
                  </p>
                </div>
                
                <div className="w-full h-[1px] bg-white/5 my-2" />

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      const regSec = document.getElementById('registration');
                      if (regSec) {
                        regSec.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setCurrentPage('registration');
                      }
                    }}
                    className="text-accent-blue font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>JOIN PRE-REGISTRATION</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 - PLAYER DEVELOPMENT PATHWAY (Immersive Interactive Showcase) */}
      <section id="development-pathway" className="py-24 bg-primary-navy border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-widest block">
              AGE-SPECIFIC ADAPTATIONS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              PLAYER ROADMAP PATHWAY
            </h2>
            <p className="text-white/60 text-xs sm:text-sm">
              Each program is carefully optimized for its specific physical, tactical, and sensory age thresholds. Click our selectors below to explore our system.
            </p>
          </div>

          {/* Interactive Core Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-secondary-navy/30 border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-10 relative lg:min-h-[610px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* Left Column: Cinematic photography */}
              <motion.div 
                key={`${activeAgeCategory}-img`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-5 relative min-h-[350px] lg:h-full rounded-2xl overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent z-10 opacity-70" />
                <img 
                  src={currentAge.imgUrl} 
                  alt={currentAge.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to gradient if image fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                
                {/* Overlay Accent text */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <span className="font-mono text-xs text-accent-blue font-bold tracking-widest uppercase block mb-1">
                    {currentAge.tagline}
                  </span>
                  <p className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase leading-tight">
                    {currentAge.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Column: Interactive Menu & Details Inside the Card */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:pl-4 lg:h-full relative z-10">
              
              {/* Minimalist Flat Tab Selector Menu with Underline - Aligned Left inside Card */}
              <div id="pathway-menu" className="border-b border-white/10 overflow-x-auto scrollbar-none pb-0.5">
                <div className="flex space-x-6 min-h-[44px] items-center">
                  {['Kids', 'Junior', 'Elite', 'Elite Pro'].map((cat) => {
                    const isActive = activeAgeCategory === cat;
                    return (
                      <button
                        key={cat}
                        id={`age-btn-${cat.replace(' ', '-')}`}
                        onClick={() => setActiveAgeCategory(cat)}
                        className={`relative pb-3 pt-1 font-display text-xs sm:text-sm font-black uppercase tracking-wider transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                          isActive ? 'text-accent-blue' : 'text-white/55 hover:text-white'
                        }`}
                      >
                        <span>{cat}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="roadmapActiveTabLine"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic parameters details */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${activeAgeCategory}-details`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                      <span className="bg-accent-blue text-[#011B41] font-mono text-[10px] font-black px-2.5 py-1 rounded">
                        {activeAgeCategory} SQUAD
                      </span>
                      <span className="text-white/40 font-mono text-xs">{currentAge.ageLabel}</span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
                      {currentAge.title}
                    </h3>

                    <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
                      {currentAge.description}
                    </p>

                    {/* Core checklist goals */}
                    <div className="space-y-2.5 bg-[#000d21]/40 p-4 sm:p-5 rounded-2xl border border-white/5">
                      <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-blue flex items-center gap-1.5">
                        <Activity size={14} /> Key Development Benchmarks:
                      </h5>
                      <ul className="space-y-2 mt-2 font-sans text-xs text-white/70">
                        {currentAge.goals.map((g: string, i: number) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 size={14} className="text-accent-blue mt-0.5 shrink-0" />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Operational stats parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#000d21]/30 p-3 rounded-xl border border-white/5">
                        <span className="text-white/40 font-mono text-[10px] uppercase block">Training Intensity Weight</span>
                        <span className="text-white font-display text-xs font-bold block mt-1">{currentAge.focus}</span>
                      </div>
                      <div className="bg-[#000d21]/30 p-3 rounded-xl border border-white/5">
                        <span className="text-white/40 font-mono text-[10px] uppercase block">Operational Schedule</span>
                        <span className="text-white font-display text-xs font-bold block mt-1">{currentAge.sessions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      id="pathway-apply-btn"
                      onClick={() => setCurrentPage('registration')}
                      className="bg-accent-blue hover:bg-accent-blue/90 text-[#011B41] font-display font-black uppercase text-xs tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300 text-center min-h-[44px] cursor-pointer"
                    >
                      JOIN TRIAL SQUAD
                    </button>
                    <button
                      id="pathway-more-btn"
                      onClick={() => setCurrentPage('programs')}
                      className="bg-transparent hover:bg-white/5 text-white font-display font-bold uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 text-center border border-white/20 min-h-[44px] cursor-pointer"
                    >
                      View Class Curriculum
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION - CLASSES & PRACTICE VENUE */}
      <section id="classes" className="py-24 bg-primary-navy relative border-t border-b border-white/10">
        <div className="absolute inset-0 bg-radial-gradient from-accent-blue/5 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block">
              TRAINING VENUE & PRACTICE WINDOWS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase">
              CLASSES & VENUE
            </h2>
            <p className="text-white/60 text-sm font-sans">
              All tactical drill modules are coordinated at our premium parquet court with state-of-the-art sports science infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Interactive Practice Venue Map (70% - 8/12 Columns) */}
            <div className="lg:col-span-8 flex flex-col justify-between bg-secondary-navy/40 border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 shadow-2xl relative min-h-[460px] group glow-border">
              {/* Slanted Accent-Blue Header */}
              <div className="absolute top-0 left-0 z-20 font-sans">
                <div 
                  className="bg-accent-blue text-primary-navy font-display font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2"
                  style={{ clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)' }}
                >
                  OFFICIAL PITCH
                </div>
              </div>

              {/* Top Right Label */}
              <div className="absolute top-4 right-4 sm:right-8 z-20 flex items-center space-x-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ACTIVE COMPLEX</span>
              </div>

              <div className="space-y-6 flex-grow pt-8">
                {/* Embedded Map / Styled Map Wrapper */}
                <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                  <iframe 
                    title="Sentul Sports Center Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.266228308422!2d106.8436021!3d-6.6138407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1ce818c3937%3A0xe5a3c63102ef1fd3!2sSentul%20Sports%20Club!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                    className="absolute inset-0 w-full h-full border-0 grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 transition-all duration-700" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Subtle decorative overlay border */}
                  <div className="absolute inset-0 border-2 border-white/5 rounded-2xl pointer-events-none" />
                </div>

                {/* Venue Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                      <MapPin size={18} className="text-accent-blue" />
                      SENTUL SPORTS CENTER ARENA
                    </h4>
                    <p className="text-white/60 text-xs sm:text-sm font-sans max-w-xl">
                      Jl. Sentul Raya block B-3, Sentul City, Kec. Babakan Madang, Kabupaten Bogor, Jawa Barat 16810, Indonesia.
                    </p>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Sentul+Sports+Club" 
                    target="_blank" 
                    rel="noreferrer"
                    className="sm:self-end bg-white/10 hover:bg-accent-blue hover:text-primary-navy text-white font-mono text-[10px] sm:text-xs font-bold tracking-wider px-4 py-2.5 rounded-xl border border-white/10 hover:border-accent-blue/20 transition-all text-center whitespace-nowrap min-h-[40px] cursor-pointer"
                  >
                    GET DIRECTIONS
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: High-Intensity Schedule (30% - 4/12 Columns) */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-secondary-navy/40 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative min-h-[460px] group glow-border">
              {/* Corner Counter Indicator */}
              <div className="absolute top-4 right-4 z-20">
                <span className="text-white/30 font-mono text-xs font-bold">SCHED //</span>
              </div>

              {/* Title Section */}
              <div className="space-y-4 pt-4">
                <div className="inline-flex items-center space-x-1.5 bg-accent-blue/15 border border-accent-blue/30 px-2.5 py-1 rounded-md">
                  <Calendar size={13} className="text-accent-blue" />
                  <span className="font-mono text-[9px] font-bold text-accent-blue uppercase tracking-widest">WIB STANDARDS</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-none">
                    WEEKLY PRACTICE
                  </h3>
                  <span className="font-display font-black text-accent-blue text-2xl uppercase tracking-tight block mt-1">
                    WINDOWS
                  </span>
                  <p className="text-white/50 text-[10px] font-mono uppercase tracking-widest mt-1">
                    Systematic Cognitive Drills
                  </p>
                </div>
              </div>

              {/* Schedule blocks */}
              <div className="space-y-4 my-8 flex-grow">
                
                {/* Session 1: Monday */}
                <div className="bg-[#000d21]/50 border border-white/5 rounded-xl p-4 hover:border-accent-blue/20 transition-all relative overflow-hidden group/item">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-xl pointer-events-none group-hover/item:bg-accent-blue/10 transition-colors" />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display font-black text-sm text-accent-blue tracking-wide uppercase">MONDAY</span>
                    <span className="bg-white/5 border border-white/10 font-mono text-[9px] text-white/50 px-2 py-0.5 rounded-full uppercase">Tactical Day</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white mt-1">
                    <Clock size={14} className="text-accent-blue/70" />
                    <span className="font-mono text-xs font-bold sm:text-sm">16:00 - 18:00 WIB</span>
                  </div>
                  <p className="text-white/50 text-[10px] font-sans mt-2">
                    Focus: Ball mastery, dynamic technical repetition, positional discipline.
                  </p>
                </div>

                {/* Session 2: Thursday */}
                <div className="bg-[#000d21]/50 border border-white/5 rounded-xl p-4 hover:border-accent-blue/20 transition-all relative overflow-hidden group/item">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-xl pointer-events-none group-hover/item:bg-accent-blue/10 transition-colors" />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display font-black text-sm text-accent-blue tracking-wide uppercase">THURSDAY</span>
                    <span className="bg-white/5 border border-white/10 font-mono text-[9px] text-white/50 px-2 py-0.5 rounded-full uppercase">Cognition Day</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white mt-1">
                    <Clock size={14} className="text-accent-blue/70" />
                    <span className="font-mono text-xs font-bold sm:text-sm">16:00 - 18:00 WIB</span>
                  </div>
                  <p className="text-white/50 text-[10px] font-sans mt-2">
                    Focus: Rapid cognitive decision play, physical explosiveness grids.
                  </p>
                </div>

                {/* Session 3: Saturday */}
                <div className="bg-[#000d21]/50 border border-white/5 rounded-xl p-4 hover:border-accent-blue/20 transition-all relative overflow-hidden group/item">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-xl pointer-events-none group-hover/item:bg-accent-blue/10 transition-colors" />
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display font-black text-sm text-accent-blue tracking-wide uppercase">SATURDAY</span>
                    <span className="bg-white/5 border border-white/10 font-mono text-[9px] text-white/50 px-2 py-0.5 rounded-full uppercase">Match-Play Day</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white mt-1">
                    <Clock size={14} className="text-accent-blue/70" />
                    <span className="font-mono text-xs font-bold sm:text-sm">08:00 - 10:00 WIB</span>
                  </div>
                  <p className="text-white/50 text-[10px] font-sans mt-2">
                    Focus: Tactical split-seconds match execution, physical performance tests.
                  </p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button 
                  onClick={() => setCurrentPage('registration')}
                  className="w-full bg-[#031633] border border-white/10 text-white hover:bg-accent-blue hover:text-primary-navy hover:border-accent-blue font-display font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 flex items-center justify-between min-h-[44px] cursor-pointer group"
                >
                  <span>RESERVE TRAINING SLOT</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 - TRAINING METHODOLOGY TIMELINE */}
      <section id="training-methodology" className="py-24 bg-secondary-navy/20 relative">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-widest block">
              SPORTS SCIENCE TRAINING BLUEPRINT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase">
              THE 5 PILLARS OF BCFA DRILLS
            </h2>
            <p className="text-white/60 text-sm">
              Our professional training blocks don&apos;t rely on random pick-up matching. Every session is systematically mapped into five fundamental steps of progression.
            </p>
          </div>

          <div className="relative border-l-2 border-accent-blue/20 ml-4 md:ml-12 pl-6 md:pl-12 space-y-12">
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx} 
                id={`timeline-step-${idx}`}
                className="relative group hover:transform hover:translate-x-1 transition-transform"
              >
                {/* Large indicator dot on the timeline line */}
                <div className="absolute -left-[35px] md:-left-[59px] top-1 w-6 h-6 rounded-full bg-primary-navy border-2 border-accent-blue flex items-center justify-center font-mono text-[9px] font-bold text-accent-blue transition-all group-hover:bg-accent-blue group-hover:text-primary-navy">
                  ✓
                </div>
                
                {/* Content block */}
                <div className="bg-secondary-navy/40 border border-white/5 rounded-2xl p-6 md:p-8 glow-border">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-display font-black text-2xl text-accent-blue/40 tracking-wider">
                      {step.num}
                    </span>
                    <h4 className="font-display font-extrabold text-lg sm:text-xl text-white uppercase group-hover:text-accent-blue transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 - ACHIEVEMENTS */}
      <section id="achievements" className="py-24 bg-primary-navy border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale contrast-125" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-widest block">
                EXCELLENCE IN CONTESTS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase leading-none">
                BOGOR&apos;S DOMINANT<br />
                ACADEMY RECORD
              </h2>
              <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
                Bogor City Futsal Academy isn&apos;t just about coordination instruction; we enter competitive situations to verify our player development. Historically, our junior squads consistently rank at top podiums across regional, state, and invitational championships.
              </p>
              
              <div className="space-y-3.5 bg-secondary-navy/60 p-5 rounded-2xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <Trophy size={18} className="text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold text-white text-sm uppercase">West Java State Youth Cup (U18)</h5>
                    <p className="text-white/60 text-xs mt-0.5">Consecutive Gold Podiums: 2024, 2025, 2026</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3.5 flex items-start space-x-3">
                  <Star size={18} className="text-accent-blue shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display font-bold text-white text-sm uppercase">Regional Junior Cup MVP Selection</h5>
                    <p className="text-white/60 text-xs mt-0.5">BCFA Academy student Raffi Saputra selected as 2025 regional Golden Boot winner</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="bg-secondary-navy/40 p-6 rounded-2xl border border-white/5 text-center space-y-2">
                <Trophy size={36} className="text-accent-blue mx-auto mb-2" />
                <h4 className="font-display font-black text-3xl text-white uppercase">12+ GOLD</h4>
                <p className="text-white/50 text-[10px] uppercase font-mono tracking-widest">Regional Cups</p>
              </div>
              <div className="bg-secondary-navy/40 p-6 rounded-2xl border border-white/5 text-center space-y-2">
                <Award size={36} className="text-accent-blue mx-auto mb-2" />
                <h4 className="font-display font-black text-3xl text-white uppercase">50+ PROS</h4>
                <p className="text-white/50 text-[10px] uppercase font-mono tracking-widest">Scouted Into National Registry</p>
              </div>
              <div className="bg-secondary-navy/40 p-6 rounded-2xl border border-white/5 text-center space-y-2">
                <Users size={36} className="text-accent-blue mx-auto mb-2" />
                <h4 className="font-display font-black text-3xl text-white uppercase">98.2%</h4>
                <p className="text-white/50 text-[10px] uppercase font-mono tracking-widest">Parent Trust Indicators</p>
              </div>
              <div className="bg-secondary-navy/40 p-6 rounded-2xl border border-white/5 text-center space-y-2">
                <CheckCircle2 size={36} className="text-accent-blue mx-auto mb-2" />
                <h4 className="font-display font-black text-3xl text-white uppercase">100%</h4>
                <p className="text-white/50 text-[10px] uppercase font-mono tracking-widest">Licensed Curriculums</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 - TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#000d21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-widest block">
              TRUSTED BY BOGOR FAMILIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase">
              WHAT PARENTS & LEAD ATHLETES SAY
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Slide showcase area */}
            <div className="lg:col-span-8 bg-secondary-navy/30 border border-white/10 rounded-3xl p-6 sm:p-10 relative">
              <Quote className="absolute top-6 right-6 text-accent-blue/15 scale-150" size={54} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-1.5">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-accent-blue text-accent-blue" />
                    ))}
                  </div>

                  <p className="font-sans text-sm sm:text-lg text-white/95 leading-relaxed italic">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                    <img 
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent-blue/30"
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-white uppercase">
                        {testimonials[activeTestimonial].author}
                      </h4>
                      <p className="text-accent-blue/80 font-mono text-xs">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector column */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  id={`testimonial-selector-${idx}`}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer min-h-[70px] ${
                    activeTestimonial === idx
                      ? 'bg-secondary-navy border-accent-blue/60 text-white'
                      : 'bg-transparent border-white/10 text-white/50 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="font-display font-bold text-xs uppercase block">{t.author}</span>
                  <span className="text-[10px] font-mono block mt-0.5 opacity-70">{t.role}</span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7 - PARTNERS & SPONSORS */}
      <section id="sponsors-partners" className="py-16 bg-secondary-navy/10 border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-mono text-[10px] uppercase font-bold text-white/40 tracking-[0.25em] mb-10">
            OFFICIAL AFFILIATIONS & EQUIPMENT SPONSORS
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {sponsors && sponsors.length > 0 ? (
              sponsors.map((spr) => (
                <a
                  key={spr.id}
                  href={spr.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center space-y-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                >
                  <img 
                    src={spr.logoUrl} 
                    alt={spr.name} 
                    className="h-10 w-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                  />
                  <span className="font-display font-extrabold text-[10px] text-white/60 tracking-wider uppercase group-hover:text-accent-blue">
                    {spr.name}
                  </span>
                </a>
              ))
            ) : (
              // Fallback responsive sponsor badges
              <div className="flex items-center space-x-12">
                <span className="font-display font-black text-white/30 text-lg uppercase tracking-widest">SPECS FUTSAL</span>
                <span className="font-display font-black text-white/30 text-lg uppercase tracking-widest">BOGOR HYDRO</span>
                <span className="font-display font-black text-white/30 text-lg uppercase tracking-widest">SENTUL SPORT</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8 - FINAL CTA BANNER */}
      <section id="final-conversion-cta" className="py-24 bg-primary-navy relative overflow-hidden">
        {/* Abstract design element to look premium */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-blue/5 skew-x-12 pointer-events-none" />
        <div className="absolute bottom-1/2 left-10 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="max-w-4xl mx-auto space-y-8">
            <Trophy size={48} className="text-accent-blue mx-auto animate-bounce duration-1000" />
            
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.3em] block">
                LIMITED CAPACITY AVAILABLE ONLINE
              </span>
              <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
                READY TO START YOUR ATHLETIC JOURNEY?
              </h2>
              <p className="text-white/80 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mt-2">
                Unlock rapid athletic reflexes, extreme spatial intelligence, and professional character. Register today to lock down your first trial session completely free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="final-register-btn"
                onClick={() => setCurrentPage('registration')}
                className="w-full sm:w-auto bg-accent-blue hover:bg-accent-blue/90 text-primary-navy font-display font-black uppercase text-sm tracking-widest px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-accent-blue/20 min-h-[50px] cursor-pointer"
              >
                REGISTER ATHLETE TODAY
              </button>

              <button
                id="final-contact-btn"
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto bg-secondary-navy hover:bg-secondary-navy/80 text-white font-display font-bold uppercase text-sm tracking-wider px-10 py-5 rounded-xl transition-all duration-300 border border-white/20 min-h-[50px] cursor-pointer"
              >
                Inquire via Desk Support
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-white/50 text-xs font-mono">
              <span>✓ Certified trial packet includes jersey loan</span>
              <span>✓ Medical & sports insurance coordinates active</span>
              <span>✓ Monthly flexible membership options available</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
