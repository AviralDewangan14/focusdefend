export interface PricingPlan {
  id: 'basic' | 'pro_monthly' | 'pro_annual' | 'family_annual';
  name: string;
  tagline: string;
  amountINR: number; // In rupees
  amountPaise: number; // In paise for Razorpay
  amountUSD: number; // In USD
  amountCents: number; // In cents for Stripe
  interval: 'month' | 'year' | 'forever';
  durationDays: number;
  highlight?: boolean;
  badge?: string;
  description: string;
  features: string[];
  limits: {
    restrictedApps: number | 'unlimited';
    aiQuestions: 'standard' | 'unlimited_advanced';
    childrenCount: number;
    parentAlerts: boolean;
    analyticsHistoryDays: number;
  };
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    tagline: 'Standard focus habits',
    amountINR: 0,
    amountPaise: 0,
    amountUSD: 0,
    amountCents: 0,
    interval: 'forever',
    durationDays: 3650,
    highlight: false,
    description: 'Essential focus barriers for disciplined learning.',
    features: [
      '2 Restricted Distraction Apps',
      'Objective Curriculum Questions',
      'Standard 7-Day Activity History',
      'Native Android Barrier Service',
      'Community & Support Access',
    ],
    limits: {
      restrictedApps: 2,
      aiQuestions: 'standard',
      childrenCount: 1,
      parentAlerts: false,
      analyticsHistoryDays: 7,
    },
  },
  pro_monthly: {
    id: 'pro_monthly',
    name: 'Focus Pro Monthly',
    tagline: 'Flexible month-to-month',
    amountINR: 199,
    amountPaise: 19900,
    amountUSD: 4.99,
    amountCents: 499,
    interval: 'month',
    durationDays: 30,
    highlight: false,
    description: 'Unlimited app blocking and AI evaluation for active sprint cycles.',
    features: [
      'Unlimited Restricted Distraction Apps',
      'Subjective & Essay Question Evaluation',
      'Real-Time Guardian Remote Alerts & Push',
      'Detailed 30-Day Focus & Study Analytics',
      'Cross-Device Instant Sync',
    ],
    limits: {
      restrictedApps: 'unlimited',
      aiQuestions: 'unlimited_advanced',
      childrenCount: 1,
      parentAlerts: true,
      analyticsHistoryDays: 30,
    },
  },
  pro_annual: {
    id: 'pro_annual',
    name: 'Focus Pro Annual',
    tagline: 'Best value for students & families',
    amountINR: 1499,
    amountPaise: 149900,
    amountUSD: 19.99,
    amountCents: 1999,
    interval: 'year',
    durationDays: 365,
    highlight: true,
    badge: 'Most Popular (Save 37%)',
    description: 'The complete study protection system for serious exam preparation and daily discipline.',
    features: [
      'Everything in Pro Monthly',
      'Full 365-Day Academic Coverage',
      'AI Practice Question Engine (Unlimited)',
      'Weekly Study & Focus Progress Reports',
      'Priority OTA Channel & Early Feature Access',
      'Dedicated 24/7 Guardian Concierge Support',
    ],
    limits: {
      restrictedApps: 'unlimited',
      aiQuestions: 'unlimited_advanced',
      childrenCount: 2,
      parentAlerts: true,
      analyticsHistoryDays: 365,
    },
  },
  family_annual: {
    id: 'family_annual',
    name: 'Guardian Family Pass',
    tagline: 'Complete household protection',
    amountINR: 2999,
    amountPaise: 299900,
    amountUSD: 39.99,
    amountCents: 3999,
    interval: 'year',
    durationDays: 365,
    highlight: false,
    badge: 'Multi-Child (Up to 5 Devices)',
    description: 'Supervise all student devices in the household under a single guardian account.',
    features: [
      'Up to 5 Connected Student Devices',
      'Shared Master PIN Protection',
      'Family-Wide App Restrictions & Curfews',
      'Individual Weekly Progress Reports',
      'Centralized Guardian Control Dashboard',
      'All Pro Features on Every Child Device',
    ],
    limits: {
      restrictedApps: 'unlimited',
      aiQuestions: 'unlimited_advanced',
      childrenCount: 5,
      parentAlerts: true,
      analyticsHistoryDays: 365,
    },
  },
};

export function getPlanById(planId: string): PricingPlan {
  return PRICING_PLANS[planId] || PRICING_PLANS.pro_annual;
}
