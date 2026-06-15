/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  dob: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  ageCategory: string; // 'U6-U9' | 'U10-U12' | 'U13-U15' | 'U16-U18' | 'Elite'
  status: 'Active' | 'Injured' | 'Inactive';
  joiningDate: string;
  notes?: string;
}

export interface Registration {
  id: string;
  studentName: string;
  dob: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  ageCategory: string;
  packageType: 'Trial' | 'Monthly' | 'Quarterly' | 'Annual';
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  amountPaid: number;
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface ClassSchedule {
  id: string;
  name: string;
  ageCategory: string;
  schedule: string;
  capacity: number;
  currentCount: number;
  coachId: string;
  venue: string;
}

export interface Coach {
  id: string;
  name: string;
  position: string;
  license: string;
  experience: string;
  specialization: string;
  achievements: string[];
  imageUrl: string;
  bio: string;
}

export interface AcademyEvent {
  id: string;
  title: string;
  type: 'Tournament' | 'Match' | 'Camp' | 'Workshop';
  date: string;
  time: string;
  location: string;
  opponent?: string;
  status: 'Upcoming' | 'Past';
  result?: string;
  details: string;
  imageUrl: string;
}

export interface PaymentRecord {
  id: string;
  studentName: string;
  billingMonth: string;
  amount: number;
  packageType: 'Trial' | 'Monthly' | 'Quarterly' | 'Annual';
  date: string;
  method: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Training' | 'Matches' | 'Events' | 'Champions' | 'Facilities';
  imageUrl: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'News' | 'Match Reports' | 'Training Tips' | 'Spotlight' | 'Resources';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  type: 'Main' | 'Equipment' | 'Partner';
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Archived';
}
