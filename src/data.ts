import { Dentist, Service, Review } from './types';

export const DENTISTS: Dentist[] = [
  {
    id: 'dr-mercier',
    name: 'Dr. Douglas Mercier, DC',
    role: 'Lead Chiropractic Physician & Founder',
    image: '/images/dr_douglas_mercier_1782245484316.jpg',
    specialty: 'Spinal Adjustments & Musculoskeletal Care',
    rating: 4.9,
    reviewsCount: 158,
    bio: 'With years of clinical experience serving the Senatobia community, Dr. Mercier specializes in spinal adjustments, advanced manual therapies, and long-term pain relief.',
    education: 'Doctor of Chiropractic (DC)'
  },
  {
    id: 'dr-chen',
    name: 'Dr. Michael Chen',
    role: 'Rehabilitation Specialist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    specialty: 'Corrective Exercises & Physiotherapy',
    rating: 4.9,
    reviewsCount: 94,
    bio: 'Dr. Chen specializes in chiropractic rehabilitation, creating tailored corrective exercise plans to stabilize structural alignments and prevent recurring injuries.',
    education: 'Doctor of Physical Therapy (DPT); MS in Athletic Training'
  },
  {
    id: 'dr-ross',
    name: 'Dr. Alisa Ross',
    role: 'Myofascial & Soft Tissue Therapist',
    image: 'https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=600&auto=format&fit=crop',
    specialty: 'Myofascial Release & Deep Tissue Care',
    rating: 4.8,
    reviewsCount: 76,
    bio: 'Dr. Ross focuses on therapeutic soft tissue release and restorative muscle recovery to perfectly complement spinal alignments and speed up pain relief.',
    education: 'LMT; Board Certified in Therapeutic Massage and Bodywork'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'back-sciatica',
    title: 'Back Pain & Sciatica Relief',
    description: 'Stop living with shooting pain, lower back aches, or the agonizing effects of whiplash. We target the root causes of spine compression.',
    price: 'Insurance / CareCredit Approved',
    duration: '30 mins',
    iconName: 'Activity'
  },
  {
    id: 'neck-shoulder',
    title: 'Neck & Shoulder Stiffness',
    description: 'Restore your full range of motion and eliminate the constant tension built up from desk work or old injuries.',
    price: 'Insurance / CareCredit Approved',
    duration: '30 mins',
    iconName: 'Shield'
  },
  {
    id: 'migraines-sinus',
    title: 'Migraines & Sinus Trouble',
    description: 'Gentle adjustments help alleviate pressure, reducing the frequency of severe headaches, sinus pain, and allergy symptoms.',
    price: 'Insurance / CareCredit Approved',
    duration: '30 mins',
    iconName: 'Sparkles'
  },
  {
    id: 'consultation-full',
    title: 'Comprehensive Chiropractic Consultation',
    description: 'Includes a complete physical orthopedic assessment, digital posture scans, joint mobility check, and a bespoke treatment roadmap.',
    price: 'New Patient Special',
    duration: '45 mins',
    iconName: 'Sparkles'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    rating: 5,
    text: 'Dr. Mercier and his team completely transformed my physical health. The constant lower back pain is gone, and I have my full range of mobility back. Worth every single visit.',
    date: '3 weeks ago',
    service: 'Back Pain & Sciatica Relief',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    author: 'Marcus Brody',
    rating: 5,
    text: 'The precision of Dr. Mercier is unbelievable. I was highly skeptical about chiropractic adjustments, but the neck stiffness release is a night and day difference. Highly recommend!',
    date: '1 month ago',
    service: 'Neck & Shoulder Stiffness',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    author: 'Sophia Sterling',
    rating: 5,
    text: 'I used to get severe tension migraines weekly. Ever since I started regular adjustments here, the headaches are almost completely gone and my sinuses are clearer than ever.',
    date: '2 months ago',
    service: 'Migraines & Sinus Trouble',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  }
];

export const FAQS = [
  {
    question: 'How many visits will it take to feel relief?',
    answer: 'Many patients experience significant, noticeable relief within their very first adjustment. Long-standing spinal stiffness or chronic sciatica may take a few sessions to fully stabilize as your muscles and joints adapt.'
  },
  {
    question: 'Does Mercier Chiropractic Clinic accept insurance?',
    answer: 'Yes! We accept top insurance providers as well as CareCredit healthcare financing options. Our team handles all documentation and pre-approvals to make your care as stress-free as possible.'
  },
  {
    question: 'Are chiropractic spinal adjustments safe?',
    answer: 'Yes, chiropractic care is widely recognized as one of the safest, non-invasive, drug-free therapies available for joint and muscle discomfort. Dr. Mercier uses precise, gentle, and researched clinical techniques.'
  },
  {
    question: 'Do I need a referral from a medical doctor?',
    answer: 'No referral is required to visit our clinic. You can schedule your initial consultation directly with us to evaluate your symptoms and begin your personalized treatment plan.'
  }
];
