// Vendora Configuration File

// Your deployed Google Apps Script URL
export const API_URL = 'https://script.google.com/macros/s/AKfycbwd2WZK2PO4sYhM9w6mfCxhUPls1g-uDaP5__BhmfS1IDpWgJu5T677im63vzJooSrH/exec';

// Theme Colors - Vendora Brand
export const COLORS = {
  primary: '#6366F1', // Indigo - Professional, trustworthy
  secondary: '#8B5CF6', // Purple - Premium
  accent: '#F59E0B', // Amber - Call to action
  success: '#10B981', // Green - Success states
  cream: '#FFF8E7',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6B7280'
};

// Social Links
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/2348028265637', // Update with your number
  email: 'vendora.ui.inc@gmail.com',
  supportEmail: 'vendora.ui.inc@gmail.com'
};

// Hall Options for Checkout (University of Ibadan)
export const HALLS = [
  'Outside School (Off-Campus)',
  'Independence Hall',
  'Nnamdi Azikwe Hall',
  'Sultan Bello Hall',
  'Kuti Hall',
  'Mellanby Hall',
  'Lord Tedder Hall',
  'Queens Elizabeth Hall',
  'Queen Idia Hall',
  'Awolowo Hall',
  'I.T.H Hall',
  'Talent Hall',
  'Alexander Brown Hall',
  'Tafawa Balewa Hall',
  'Abubakar Abdusalami Hall',
  'Ogunsheye P.G Hall',
  'Alumni P.G Hall',
  'International P.G Hall',
  "St. Anne's Private Hostel"
];

// Categories
export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Food',
  'Beauty',
  'Books',
  'Accessories',
  'Other'
];

// Payment Methods
export const PAYMENT_METHODS = {
  COD: 'Cash on Delivery',
  TRANSFER: 'Bank Transfer'
};

// COD Maximum Amount
export const COD_MAX_AMOUNT = 50000;

// Delivery Timeline
export const DELIVERY_DAYS = '2-4 days';

// Vendor Pricing Tiers
export const PRICING_TIERS = {
  STARTER: {
    name: 'Starter',
    price: 3000,
    features: [
      'Basic storefront',
      'Order management',
      'Standard delivery',
      'Manual support'
    ],
    description: 'Perfect for getting started'
  },
  GROWTH: {
    name: 'Growth',
    price: 7000,
    features: [
      'Everything in Starter',
      '🔥 Priority listing',
      'Reduced delivery fees',
      'Weekly sales analytics',
      'Faster support'
    ],
    description: 'Most popular - Sell 3-5x more',
    badge: 'MOST POPULAR'
  },
  PRO: {
    name: 'Pro',
    price: 15000,
    features: [
      'Everything in Growth',
      '👑 Featured seller badge',
      'Top placement everywhere',
      'Promo campaigns',
      'Custom store URL',
      'Priority support'
    ],
    description: 'Dominate your category',
    badge: 'BEST VALUE'
  }
};

// Platform Fee (for transparency)
export const PLATFORM_FEE = 0.0075; // 0.75%

// App Info
export const APP_INFO = {
  name: 'Vendora',
  tagline: 'Revenue Infrastructure for Campus Vendors',
  description: 'Vendora handles your storefront, orders, and delivery so you can focus on selling more.',
  university: 'University of Ibadan'
};
