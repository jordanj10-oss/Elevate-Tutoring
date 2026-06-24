export const pricingPlans = [
  {
    id: 'pay-as-you-go',
    name: 'Pay-As-You-Go',
    subtitle: 'Flexible learning, no commitment',
    price: 45,
    unit: 'per session',
    stripeUrl: 'https://buy.stripe.com/8x214n14t3RN5RJ7bQ43S00',
    description: 'Perfect for students who need occasional help or want to try our service before committing.',
    features: [
      '1-hour tutoring sessions',
      'Choose any subject',
      'Any grade level',
      'Schedule at your convenience',
      'No long-term commitment',
      'Same-day booking available',
      'Free tutor matching'
    ],
    cta: 'Book a Session',
    highlighted: false
  },
  {
    id: 'subscription-4',
    name: 'Starter Pack',
    subtitle: 'Ideal for ongoing support',
    price: 155,
    unit: 'per month',
    sessions: '4 sessions/month',
    savings: 'Save 14%',
    stripeUrl: 'https://buy.stripe.com/5kQaEX14n1JFdk2VA43S01',
    description: 'Great for students who need regular weekly support in one or two subjects.',
    features: [
      '4 one-hour tutoring sessions per month',
      'Choose any subject',
      'Any grade level',
      'Priority scheduling',
      'Same tutor each session',
      'Free tutor matching',
      'Session progress tracking',
      'Cancel anytime'
    ],
    cta: 'Subscribe Now',
    highlighted: false
  },
  {
    id: 'subscription-8',
    name: 'Growth Pack',
    subtitle: 'Our most popular plan',
    price: 275,
    unit: 'per month',
    sessions: '8 sessions/month',
    savings: 'Save 24%',
    stripeUrl: 'https://buy.stripe.com/14A5kDdRf4VRfsj8fU43S02',
    description: 'Perfect for students tackling multiple subjects or preparing for major exams.',
    features: [
      '8 one-hour tutoring sessions per month',
      'Choose any subject',
      'Any grade level',
      'Priority scheduling',
      'Same tutor each session',
      'Free tutor matching',
      'Session progress tracking',
      'Monthly progress report',
      'Cancel anytime'
    ],
    cta: 'Subscribe Now',
    highlighted: true
  },
  {
    id: 'subscription-12',
    name: 'Accelerator Pack',
    subtitle: 'Maximum learning momentum',
    price: 375,
    unit: 'per month',
    sessions: '12 sessions/month',
    savings: 'Save 31%',
    stripeUrl: 'https://buy.stripe.com/14A14naF31JFa7Z8fU43S03',
    description: 'Best value for students who want intensive support across multiple subjects.',
    features: [
      '12 one-hour tutoring sessions per month',
      'Choose any subject',
      'Any grade level',
      'Priority scheduling',
      'Same tutor each session',
      'Free tutor matching',
      'Session progress tracking',
      'Monthly progress report',
      'Dedicated success coordinator',
      'Cancel anytime'
    ],
    cta: 'Subscribe Now',
    highlighted: false
  }
];

export const testPrepCourses = [
  {
    id: 'sat',
    name: 'SAT Prep Course',
    price: 599,
    sessions: '10 sessions',
    stripeUrl: 'https://buy.stripe.com/6oU7sLdRf9c72Fx1Rw43S04',
    description: 'Comprehensive SAT preparation covering Math, Reading, and Writing sections with practice tests and personalized feedback.',
    features: [
      '10 one-hour tutoring sessions',
      'Full-length practice tests',
      'Score improvement guarantee',
      'Personalized study plan',
      'Strategy guides included'
    ]
  },
  {
    id: 'act',
    name: 'ACT Prep Course',
    price: 599,
    sessions: '10 sessions',
    stripeUrl: 'https://buy.stripe.com/6oU7sLdRf9c72Fx1Rw43S04',
    description: 'Complete ACT preparation covering all sections with proven strategies and real practice materials.',
    features: [
      '10 one-hour tutoring sessions',
      'Full-length practice tests',
      'Score improvement guarantee',
      'Personalized study plan',
      'Strategy guides included'
    ]
  },
  {
    id: 'gre',
    name: 'GRE Prep Course',
    price: 749,
    sessions: '12 sessions',
    stripeUrl: 'https://buy.stripe.com/6oU7sLdRf9c72Fx1Rw43S04',
    description: 'Graduate-level preparation with focus on Verbal, Quantitative, and Analytical Writing sections.',
    features: [
      '12 one-hour tutoring sessions',
      'Full-length practice tests',
      'Score improvement guarantee',
      'Personalized study plan',
      'Strategy guides included',
      'Essay grading & feedback'
    ]
  },
  {
    id: 'gmat',
    name: 'GMAT Prep Course',
    price: 799,
    sessions: '12 sessions',
    stripeUrl: 'https://buy.stripe.com/6oU7sLdRf9c72Fx1Rw43S04',
    description: 'Business school preparation with adaptive strategies for the computer-adaptive test format.',
    features: [
      '12 one-hour tutoring sessions',
      'Full-length practice tests',
      'Score improvement guarantee',
      'Personalized study plan',
      'Strategy guides included',
      'Integrated Reasoning focus'
    ]
  },
  {
    id: 'lsat',
    name: 'LSAT Prep Course',
    price: 799,
    sessions: '12 sessions',
    stripeUrl: 'https://buy.stripe.com/6oU7sLdRf9c72Fx1Rw43S04',
    description: 'Law school preparation with intensive focus on Logic Games, Logical Reasoning, and Reading Comprehension.',
    features: [
      '12 one-hour tutoring sessions',
      'Full-length practice tests',
      'Score improvement guarantee',
      'Personalized study plan',
      'Strategy guides included',
      'Logic Games intensive'
    ]
  }
];