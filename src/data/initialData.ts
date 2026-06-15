/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Registration, ClassSchedule, Coach, AcademyEvent, PaymentRecord, GalleryItem, BlogPost, Sponsor, ContactInquiry } from '../types';

export const INITIAL_COACHES: Coach[] = [
  {
    id: 'c1',
    name: 'Andra Wijaya',
    position: 'Head Coach & Technical Director',
    license: 'AFC Futsal Level 2 License',
    experience: '12 Years Professional Coaching',
    specialization: 'Tactical Playbook & Youth Pathway',
    achievements: [
      'Led West Java Futsal Team to Gold Medal at National Games (PON)',
      'Former Professional Futsal Player (Pro Futsal League Ind.)',
      'Certified Youth Elite Coach'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500',
    bio: 'Coach Andra believes that disciplined practice and understanding the tactical rhythms of the game are what separate great players from champions. He spent a decade playing at the national level before dedicating his life to cultivating West Java\'s future elite athletes.'
  },
  {
    id: 'c2',
    name: 'Rian Pratama',
    position: 'Elite Performance Lead Coach',
    license: 'AFC Futsal Level 1 License',
    experience: '8 Years Development Coaching',
    specialization: 'Technical Speed, Footwork & Ball Mastery',
    achievements: [
      'Developed 14 players currently signed to Pro League Academies',
      'Futsal tactics panelist for regional sports programs'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500',
    bio: 'Focusing on split-second control and decision making, Coach Rian pushes U13 to U18 players to reach their maximum athletic potential. His sessions are intense, extremely structured, and completely ball-centric.'
  },
  {
    id: 'c3',
    name: 'Siti Rahmawati',
    position: 'Youth Development Coordinator (U6 - U12)',
    license: 'S-C License / Youth Grassroots Specialist',
    experience: '6 Years Grassroots Coaching',
    specialization: 'Motor Skills, Agility & Mental Preparedness',
    achievements: [
      'Pioneered the "Fun Futsal" play-centric learning program in Bogor schools',
      'Certified Senior Instructor for physical education'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500',
    bio: 'Siti is passionate about introducing the absolute joy of futsal to children at their earliest developmental stages. She builds confidence, motor skills, and robust collaboration guidelines that extend far beyond the pitch.'
  },
  {
    id: 'c4',
    name: 'Dr. Teddy Setiawan',
    position: 'Academy Physiotherapist & Conditioning Coach',
    license: 'M.Sc. Sports Medicine / Performance Physio',
    experience: '10 Years Sports Rehab',
    specialization: 'Injury Prevention, Strength & Conditioning',
    achievements: [
      'Official Medical Team Member for Bogor Regional Olympics delegation',
      'Expert in short-muscle fatigue rehabilitation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    bio: 'Dr. Teddy designs individual recovery and core-strength programs ensuring academy players perform at 100% capacity while preventing common knee and ankle stress issues common to futsal court surfaces.'
  }
];

export const INITIAL_CLASSES: ClassSchedule[] = [
  {
    id: 'cl1',
    name: 'U6-U9 Foundation',
    ageCategory: 'U6-U9',
    schedule: 'Saturday & Sunday: 08:30 - 10:00 WIB',
    capacity: 25,
    currentCount: 18,
    coachId: 'c3',
    venue: 'GOR Pajajaran - Indoors Futsal Arena, Court A'
  },
  {
    id: 'cl2',
    name: 'U10-U12 Technical Elite',
    ageCategory: 'U10-U12',
    schedule: 'Tuesday & Friday: 16:00 - 17:30 WIB',
    capacity: 25,
    currentCount: 22,
    coachId: 'c2',
    venue: 'GOR Pajajaran - Court B'
  },
  {
    id: 'cl3',
    name: 'U13-U15 Advanced Tactical',
    ageCategory: 'U13-U15',
    schedule: 'Wednesday: 16:30 - 18:30 & Saturday: 10:30 - 12:30 WIB',
    capacity: 20,
    currentCount: 17,
    coachId: 'c1',
    venue: 'Pajajaran Futsal Arena (Sempur)'
  },
  {
    id: 'cl4',
    name: 'U16-U18 High Performance',
    ageCategory: 'U16-U18',
    schedule: 'Monday & Thursday: 18:30 - 20:30 WIB',
    capacity: 20,
    currentCount: 16,
    coachId: 'c2',
    venue: 'Sentul Sports Park - Pitch 1'
  },
  {
    id: 'cl5',
    name: 'Elite Pathway League Development',
    ageCategory: 'Elite',
    schedule: 'Thursday: 19:30 - 21:30 & Saturday: 16:00 - 18:00 WIB',
    capacity: 15,
    currentCount: 12,
    coachId: 'c1',
    venue: 'Pajajaran Futsal Arena - Main Exhibition Court'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st1',
    name: 'Raffi Ahmad Saputra',
    dob: '2015-04-12',
    parentName: 'Budi Saputra',
    parentPhone: '+62 812-3456-7890',
    parentEmail: 'budi.saputra@gmail.com',
    ageCategory: 'U10-U12',
    status: 'Active',
    joiningDate: '2025-01-10',
    notes: 'Incredible speed. Naturally left-footed. Needs refinement on defensive tracking.'
  },
  {
    id: 'st2',
    name: 'Muhammad Faiz',
    dob: '2012-09-05',
    parentName: 'Hendra Setiawan',
    parentPhone: '+62 821-9876-5432',
    parentEmail: 'hendra.s@yahoo.com',
    ageCategory: 'U13-U15',
    status: 'Active',
    joiningDate: '2024-06-15',
    notes: 'Team captain quality. Displays exceptional tactical reading. Highly disciplined.'
  },
  {
    id: 'st3',
    name: 'Kevin Jonathan',
    dob: '2018-11-22',
    parentName: 'Susila Jonathan',
    parentPhone: '+62 856-1122-3344',
    parentEmail: 's.jonathan@outlook.com',
    ageCategory: 'U6-U9',
    status: 'Active',
    joiningDate: '2025-10-01',
    notes: 'Very enthusiastic. Loves dribbling. Focuses on motor drills.'
  },
  {
    id: 'st4',
    name: 'Dimas Anggara',
    dob: '2009-02-18',
    parentName: 'Rudi Anggara',
    parentPhone: '+62 813-5566-7788',
    parentEmail: 'rudi.angg@gmail.com',
    ageCategory: 'U16-U18',
    status: 'Injured',
    joiningDate: '2024-02-10',
    notes: 'Mild right ankle strain. Under physiotherapy guidance by Dr. Teddy.'
  },
  {
    id: 'st5',
    name: 'Arya Permana',
    dob: '2008-07-30',
    parentName: 'Gunawan Permana',
    parentPhone: '+62 878-4433-2211',
    parentEmail: 'gu.permana@hotmail.com',
    ageCategory: 'Elite',
    status: 'Active',
    joiningDate: '2023-08-12',
    notes: 'Scouted by regional league scouts. Focus on offensive finishing and leadership.'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg1',
    studentName: 'Farhan Ramadhan',
    dob: '2014-08-20',
    parentName: 'Ahmad Ramadhan',
    parentPhone: '+62 811-1223-3445',
    parentEmail: 'ahmad.ram@gmail.com',
    ageCategory: 'U10-U12',
    packageType: 'Monthly',
    status: 'Approved',
    date: '2026-06-12',
    amountPaid: 650000,
    paymentStatus: 'Paid'
  },
  {
    id: 'reg2',
    studentName: 'Zacky Wijaya',
    dob: '2011-03-15',
    parentName: 'Tomi Wijaya',
    parentPhone: '+62 812-9900-8877',
    parentEmail: 'tomi.w@gmail.com',
    ageCategory: 'U13-U15',
    packageType: 'Trial',
    status: 'Pending',
    date: '2026-06-14',
    amountPaid: 0,
    paymentStatus: 'Unpaid'
  },
  {
    id: 'reg3',
    studentName: 'Gibran Al-Ghifari',
    dob: '2017-05-30',
    parentName: 'Eko Al-Ghifari',
    parentPhone: '+62 819-2233-4455',
    parentEmail: 'eko.ghifari@live.com',
    ageCategory: 'U6-U9',
    packageType: 'Quarterly',
    status: 'Pending',
    date: '2026-06-13',
    amountPaid: 1800000,
    paymentStatus: 'Paid'
  }
];

export const INITIAL_EVENTS: AcademyEvent[] = [
  {
    id: 'ev1',
    title: 'Bogor Youth Championship Futsal 2026',
    type: 'Tournament',
    date: '2026-07-18',
    time: '08:00 - 17:00 WIB',
    location: 'GOR Pajajaran Indoor Stadium',
    status: 'Upcoming',
    details: 'The ultimate annual regional futsal trophy for West Java sports academies. Bogor City Futsal Academy will deploy three age-category squads (U12, U15, U18) to contest the coveted trophy.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ev2',
    title: 'Friendly Match: BCFA Elite vs Jakarta Junior Academy',
    type: 'Match',
    date: '2026-06-25',
    time: '19:00 - 21:00 WIB',
    location: 'Pajajaran Futsal Arena',
    opponent: 'Jakarta Junior Futsal Academy',
    status: 'Upcoming',
    details: 'High-intensity exhibition preparation match for the league squad. An excellent platform for head scouts to benchmark technical positioning under match situations.',
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ev3',
    title: 'Sempur Summer Training Intensive Camp',
    type: 'Camp',
    date: '2026-07-01',
    time: '07:30 - 11:30 WIB (Daily)',
    location: 'Bogor Sports Performance Center',
    status: 'Upcoming',
    details: 'A rigid 5-day developmental routine centering physical conditioning, maximum ball tracking, nutrition clinics, and psychological preparation led by professional coaches.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ev4',
    title: 'West Java Junior Elite League Finals',
    type: 'Tournament',
    date: '2026-05-10',
    time: '15:00 WIB',
    location: 'Siliwangi Court Stadium, Bandung',
    opponent: 'Bandung Raya Futsal Club U18',
    status: 'Past',
    result: 'Won 5-3 vs Bandung Raya U18',
    details: 'An absolute thriller. After trailing 1-2 in the first-half, BCFA U18 mounted a masterful counter-attack press in the final ten minutes, securing thirty consecutive passes and scoring three spectacular decisive goals.',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1200'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'p1',
    studentName: 'Raffi Ahmad Saputra',
    billingMonth: 'June 2026',
    amount: 650000,
    packageType: 'Monthly',
    date: '2026-06-03',
    method: 'Mandiri Bank Transfer',
    status: 'Paid'
  },
  {
    id: 'p2',
    studentName: 'Muhammad Faiz',
    billingMonth: 'June 2026',
    amount: 1800000,
    packageType: 'Quarterly',
    date: '2026-06-01',
    method: 'BCA Virtual Account',
    status: 'Paid'
  },
  {
    id: 'p3',
    studentName: 'Dimas Anggara',
    billingMonth: 'June 2026',
    amount: 650000,
    packageType: 'Monthly',
    date: '2026-06-10',
    method: 'Credit Card / Midtrans',
    status: 'Pending'
  },
  {
    id: 'p4',
    studentName: 'Kevin Jonathan',
    billingMonth: 'May 2026',
    amount: 650000,
    packageType: 'Monthly',
    date: '2026-05-15',
    method: 'Cash',
    status: 'Paid'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'U12 Technical Agility Training Drill',
    category: 'Training',
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600',
    date: '2026-05-20'
  },
  {
    id: 'g2',
    title: 'Champions Ceremony - West Java Gold Cup',
    category: 'Champions',
    imageUrl: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600',
    date: '2026-05-10'
  },
  {
    id: 'g3',
    title: 'Intense Tactical Briefing with Coach Wijaya',
    category: 'Training',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600',
    date: '2026-04-18'
  },
  {
    id: 'g4',
    title: 'U15 Squad Opening Match Goal Celebration',
    category: 'Matches',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
    date: '2026-04-12'
  },
  {
    id: 'g5',
    title: 'GOR Pajajaran - Modern Futsal Pitch Setup',
    category: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600',
    date: '2026-01-15'
  },
  {
    id: 'g6',
    title: 'Parent Advisory Council Workshop Day',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    date: '2026-03-24'
  }
];

export const INITIAL_BLOG: BlogPost[] = [
  {
    id: 'b1',
    title: 'Mastering the Futsal "Sole Roll": Why Touch Surface Matters',
    category: 'Training Tips',
    excerpt: 'Deep dive into why rolling the ball under the sole of your foot is the core foundation of professional futsal, and how to perfect it in daily training.',
    content: `In the lightning-fast environment of futsal, every tenth of a second determines whether you retain possession or suffer an immediate counter-attack. The standard football habit of control with the inside or instep of the foot restricts your immediate kinetic angle. 

    The 'Sole Roll' is the primary signature of elite futsal players worldwide. Why?
    1. **Immediate Shielding:** By resting your sole on the ball, you maintain physical separation between defender and object.
    2. **Multi-directional Trajectory:** The sole lets you roll the ball forward, backward, left, or right in a fluid 360-degree arc without resetting your stance.
    3. **Misdirection:** Under sole control, minor shifts of your weight look identical to direct passing motions, forcing the defender to commit prematurely.

    How to perfect this at home:
    - Work on continuous lateral rolling back and forth on a hard surface for 10 minutes daily.
    - Focus on maintaining high body stability. Your hips should stay lowered, while your arms are prepared to buffer contact.
    - Alternate with blind sole touches (eyes up and monitoring the environment, never staring down at your feet).`,
    author: 'Coach Andra Wijaya',
    date: '2026-06-10',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'Recap: How BCFA U18 Stunned Bandung in the Finals',
    category: 'Match Reports',
    excerpt: 'An inside look at the tactical adjustment Coach Rian Pratama made during halftime to overcome Bandung Raya\'s high defensive press, winning the championship cup.',
    content: `It was a high-octane battle of nerves in Bandung. For the first twenty minutes, our U18 squad appeared suffocated by Bandung Raya\'s physical 1-2-2 press structure. We fell behind 1-2 due to simple passing transition lag near our own circle.

    At halftime, Coach Rian adjusted the pivot mechanism:
    - **Rotational Shift:** Instructed our wingers (alas) to cut horizontally inside simultaneously rather than staying deep, clearing absolute path for our pivot to drop.
    - **Transition Speed:** Demanded 2-touch soccer in our own half.
    - **Goalkeeper Participation:** Handed our keeper the liberty to act as a fifth runner (flying goalkeeper) to create numeric overload.

    The outcome was masterful. Bandung's energy depleted trying to close the spatial traps, allowing Farhan to strike consecutive brace goals at the 12th and 18th minutes of the second period. Final scoreboard reading 5-3, placing Bogor City Futsal Academy as regional champions yet again!`,
    author: 'Coach Rian Pratama',
    date: '2026-05-12',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    title: 'A Parent\'s Guide to Futsal vs. Soccer Pathing',
    category: 'Resources',
    excerpt: 'Why starting your child with futsal at age 6-12 yields much higher coordination, reaction speeds, and ball mastery indicators than standard outdoor soccer.',
    content: `Many parents ask us: "Why should my child play futsal instead of starting immediately in a massive 11v11 grass field soccer routine?"

    Statistics and international research (including testimonials from legends like Messi, Neymar, and Ronaldinho) prove that futsal is the absolute cradle of world-class coordination:
    - **600% More Touches:** A child in a futsal game receives, passes, and dribbles the ball nearly six times more frequently than in a regular field soccer match. Higher touches translate code directly into faster neurological adaptation.
    - **Tight-Space Decision Making:** Futsal is played within strict boundaries. There is no sideline buffer. Your child learns to think under heavy pressure.
    - **No Flat Recovery:** Because there are fewer players, everyone is constantly dynamic. Defending, transitioning, and scoring are team-wide responsibilities.

    At Bogor City Futsal Academy, we structure our programs to ensure the motor coordination built in futsal seamlessly prepares your athlete for professional pursuits—whether on the indoor court or transitioning eventually to the soccer field.`,
    author: 'Siti Rahmawati',
    date: '2026-04-05',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: 'sp1',
    name: 'Spec Futsal Indonesia',
    logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150', // Red shoe for footwear sponsor vibe
    websiteUrl: 'https://specs.id',
    type: 'Equipment'
  },
  {
    id: 'sp2',
    name: 'Bogor Hydro Mineral Water',
    logoUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=150', // Drink bottle vibe
    websiteUrl: 'https://bogorhydro.id',
    type: 'Main'
  },
  {
    id: 'sp3',
    name: 'Sentul Sports Center Arena',
    logoUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=150', // Sport crest vibe
    websiteUrl: 'https://sentulsportscenter.co.id',
    type: 'Partner'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'in1',
    name: 'Hadi Wijatno',
    email: 'hadi.wij@gmail.com',
    phone: '+62 811-7788-9900',
    subject: 'U8 Trial Registration Inquiry',
    message: 'Hello, my son is 7 years old and has never played futsal before. I wanted to verify if the Sunday morning class is suitable for absolute beginners or if he needs previous experience.',
    date: '2026-06-14 10:45',
    status: 'New'
  },
  {
    id: 'in2',
    name: 'Theresa Amelia',
    email: 'theresa.amel@outlook.com',
    phone: '+62 878-1122-3344',
    subject: 'Corporate Tournament Collaboration',
    message: 'We are organizing an inter-enterprise friendship cup next quarter and are looking to hire BCFA certified staff to officiate and coordinate referee services. Let us know who to contact.',
    date: '2026-06-12 14:10',
    status: 'Read'
  }
];
