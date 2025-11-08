const transactionsData = [
  // ---- Crunchyroll Premium Subscriptions ----
  {
    id: 'CRTXN300001',
    date: '2025-11-02T11:30:00Z',
    customer: 'Akira Tanaka',
    description: 'Monthly Subscription - Crunchyroll Mega Fan',
    amount: 9.99,
    currency: 'USD',
    country: 'Japan',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'CRTXN300002',
    date: '2025-11-01T09:50:00Z',
    customer: 'Sophia Johnson',
    description: 'Annual Subscription - Crunchyroll Ultimate Fan',
    amount: 99.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Pending'
  },
  {
    id: 'CRTXN300003',
    date: '2025-10-31T16:10:00Z',
    customer: 'Rohan Mehta',
    description: 'Quarterly Subscription - Crunchyroll Fan Tier',
    amount: 24.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300004',
    date: '2025-10-30T14:40:00Z',
    customer: 'Emma Carter',
    description: 'Monthly Subscription - Crunchyroll Fan Tier',
    amount: 7.99,
    currency: 'GBP',
    country: 'UK',
    paymentMethod: 'Debit Card',
    cardType: 'Visa',
    status: 'Failed'
  },
  {
    id: 'CRTXN300005',
    date: '2025-10-29T18:25:00Z',
    customer: 'Lucas White',
    description: 'Subscription Refund - Mega Fan Tier',
    amount: 9.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Amex',
    status: 'Chargeback Completed'
  },

  // ---- Anime Merchandise Purchases ----
  {
    id: 'CRTXN300006',
    date: '2025-10-28T10:15:00Z',
    customer: 'Hannah Lee',
    description: 'Purchase - Demon Slayer T-shirt (Limited Edition)',
    amount: 29.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300007',
    date: '2025-10-27T12:40:00Z',
    customer: 'Karan Patel',
    description: 'Purchase - Attack on Titan Hoodie',
    amount: 49.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Pending'
  },
  {
    id: 'CRTXN300008',
    date: '2025-10-26T17:20:00Z',
    customer: 'Olivia Smith',
    description: 'Purchase - One Piece Collector Figure Set',
    amount: 89.99,
    currency: 'EUR',
    country: 'Germany',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Failed'
  },
  {
    id: 'CRTXN300009',
    date: '2025-10-25T09:50:00Z',
    customer: 'Riya Mehta',
    description: 'Purchase - Naruto Headband Replica',
    amount: 19.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300010',
    date: '2025-10-24T15:30:00Z',
    customer: 'Ethan Clark',
    description: 'Purchase - Crunchyroll Exclusive Hoodie',
    amount: 59.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Chargeback Initiated'
  },

  // ---- Movie & Event Tickets ----
  {
    id: 'CRTXN300011',
    date: '2025-10-23T13:25:00Z',
    customer: 'Priya Singh',
    description: 'Ticket - Jujutsu Kaisen 0 Movie (Premium Seat)',
    amount: 14.99,
    currency: 'EUR',
    country: 'France',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Success'
  },
  {
    id: 'CRTXN300012',
    date: '2025-10-22T18:00:00Z',
    customer: 'Daniel Lee',
    description: 'Ticket - My Hero Academia: World Heroes Mission',
    amount: 12.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Pending'
  },
  {
    id: 'CRTXN300013',
    date: '2025-10-21T19:15:00Z',
    customer: 'Ananya Gupta',
    description: 'Virtual Screening - Solo Leveling Premiere',
    amount: 5.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300014',
    date: '2025-10-20T20:50:00Z',
    customer: 'Noah Smith',
    description: 'Ticket - Chainsaw Man Special Event',
    amount: 11.99,
    currency: 'CAD',
    country: 'Canada',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Failed'
  },
  {
    id: 'CRTXN300015',
    date: '2025-10-19T14:05:00Z',
    customer: 'Emma Jones',
    description: 'Ticket Refund - Crunchyroll Expo 2025',
    amount: 49.99,
    currency: 'EUR',
    country: 'Germany',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Chargeback Completed'
  },

  // ---- Gift Cards & Store Credits ----
  {
    id: 'CRTXN300016',
    date: '2025-10-18T12:00:00Z',
    customer: 'Liam Johnson',
    description: 'Purchase - $50 Crunchyroll Gift Card',
    amount: 50.0,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'CRTXN300017',
    date: '2025-10-17T10:35:00Z',
    customer: 'Ava Brown',
    description: 'Purchase - $25 Crunchyroll Gift Card',
    amount: 25.0,
    currency: 'GBP',
    country: 'UK',
    paymentMethod: 'Credit Card',
    cardType: 'Amex',
    status: 'Pending'
  },
  {
    id: 'CRTXN300018',
    date: '2025-10-16T09:45:00Z',
    customer: 'Rahul Verma',
    description: 'Redemption - Crunchyroll Gift Card',
    amount: 25.0,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'Gift Card',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300019',
    date: '2025-10-15T16:20:00Z',
    customer: 'Sophia Williams',
    description: 'Purchase - Crunchyroll Store Credit $100',
    amount: 100.0,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300020',
    date: '2025-10-14T13:15:00Z',
    customer: 'David Kim',
    description: 'Purchase - Crunchyroll Gift Card $75',
    amount: 75.0,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Chargeback Initiated'
  },

  // ---- Add-ons & Loyalty Perks ----
  {
    id: 'CRTXN300021',
    date: '2025-10-13T09:50:00Z',
    customer: 'Oliver Davis',
    description: 'Add-on - Offline Downloads Feature',
    amount: 2.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'CRTXN300022',
    date: '2025-10-12T18:40:00Z',
    customer: 'Emily Carter',
    description: 'Add-on - Ad-Free Streaming Upgrade',
    amount: 1.99,
    currency: 'AUD',
    country: 'Australia',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Pending'
  },
  {
    id: 'CRTXN300023',
    date: '2025-10-11T20:15:00Z',
    customer: 'Rohit Sharma',
    description: 'Add-on - Exclusive Simulcast Access',
    amount: 3.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'CRTXN300024',
    date: '2025-10-10T11:55:00Z',
    customer: 'Olivia Martinez',
    description: 'Perk Redemption - Loyalty Points',
    amount: 0.0,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Reward Points',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300025',
    date: '2025-10-09T08:45:00Z',
    customer: 'Ethan Clark',
    description: 'Add-on - Early Episode Access',
    amount: 1.49,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Failed'
  },
  {
    id: 'CRTXN300026',
    date: '2025-10-08T15:25:00Z',
    customer: 'Riya Mehta',
    description: 'Purchase - One Piece Keychain Set',
    amount: 12.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300027',
    date: '2025-10-07T12:10:00Z',
    customer: 'Daniel Lee',
    description: 'Purchase - Spy x Family Poster Pack',
    amount: 19.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Pending'
  },
  {
    id: 'CRTXN300028',
    date: '2025-10-06T09:20:00Z',
    customer: 'Ananya Gupta',
    description: 'Annual Subscription - Crunchyroll Mega Fan',
    amount: 99.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'CRTXN300029',
    date: '2025-10-05T10:40:00Z',
    customer: 'Noah Smith',
    description: 'Quarterly Subscription - Crunchyroll Fan',
    amount: 24.99,
    currency: 'CAD',
    country: 'Canada',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Chargeback Completed'
  },
  {
    id: 'CRTXN300030',
    date: '2025-10-04T08:30:00Z',
    customer: 'Liam Johnson',
    description: 'Monthly Subscription - Crunchyroll Mega Fan',
    amount: 9.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  }
];

export default transactionsData;
