const transactionsData = [
  // ---- PlayStation Console Purchases ----
  {
    id: 'TXN200001',
    date: '2025-11-02T10:15:00Z',
    customer: 'Rohit Sharma',
    description: 'Purchase - PS5 Console (Disc Edition)',
    amount: 499.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'TXN200002',
    date: '2025-11-01T09:40:00Z',
    customer: 'Ava Brown',
    description: 'Purchase - PS5 Digital Edition',
    amount: 399.99,
    currency: 'GBP',
    country: 'UK',
    paymentMethod: 'Credit Card',
    cardType: 'Amex',
    status: 'Pending'
  },
  {
    id: 'TXN200003',
    date: '2025-10-30T18:30:00Z',
    customer: 'Karan Patel',
    description: 'Purchase - PS5 Console Bundle',
    amount: 659.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'TXN200004',
    date: '2025-10-29T14:20:00Z',
    customer: 'Emma Jones',
    description: 'Purchase - PS5 Console',
    amount: 499.5,
    currency: 'EUR',
    country: 'Germany',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Failed'
  },
  {
    id: 'TXN200005',
    date: '2025-10-28T19:45:00Z',
    customer: 'Liam Johnson',
    description: 'Purchase - PS5 Console (Chargeback Initiated)',
    amount: 499.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Chargeback Initiated'
  },

  // ---- Controllers & Accessories ----
  {
    id: 'TXN200006',
    date: '2025-10-27T13:15:00Z',
    customer: 'Sophia Williams',
    description: 'Purchase - PS5 DualSense Controller',
    amount: 69.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Success'
  },
  {
    id: 'TXN200007',
    date: '2025-10-26T12:10:00Z',
    customer: 'Noah Smith',
    description: 'Purchase - PS5 Charging Dock',
    amount: 29.99,
    currency: 'CAD',
    country: 'Canada',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Pending'
  },
  {
    id: 'TXN200008',
    date: '2025-10-25T16:05:00Z',
    customer: 'Oliver Davis',
    description: 'Purchase - PS5 Controller Skin Set',
    amount: 14.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Failed'
  },
  {
    id: 'TXN200009',
    date: '2025-10-24T20:00:00Z',
    customer: 'Emily Carter',
    description: 'Purchase - Extra RAM Module for PS5 (16GB)',
    amount: 199.99,
    currency: 'AUD',
    country: 'Australia',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Success'
  },
  {
    id: 'TXN200010',
    date: '2025-10-23T15:50:00Z',
    customer: 'Lucas White',
    description: 'Purchase - PS5 SSD Expansion 2TB',
    amount: 249.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Amex',
    status: 'Chargeback Completed'
  },

  // ---- PlayStation Game Purchases ----
  {
    id: 'TXN200011',
    date: '2025-10-22T11:00:00Z',
    customer: 'Riya Mehta',
    description: 'Purchase - Spider-Man 2 (PS5)',
    amount: 69.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'TXN200012',
    date: '2025-10-21T10:45:00Z',
    customer: 'Ethan Clark',
    description: 'Purchase - God of War: Ragnarök (PS5)',
    amount: 69.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Pending'
  },
    {
    id: 'TXN200013',
    date: '2025-10-20T17:00:00Z',
    customer: 'Priya Singh',
    description: 'Purchase - Horizon Forbidden West (PS5)',
    amount: 59.99,
    currency: 'EUR',
    country: 'France',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Failed'
  },
  {
    id: 'TXN200014',
    date: '2025-10-19T21:25:00Z',
    customer: 'Daniel Lee',
    description: 'Purchase - Call of Duty: MW3 (PS5)',
    amount: 69.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'TXN200015',
    date: '2025-10-18T18:15:00Z',
    customer: 'Ananya Gupta',
    description: 'Purchase - FIFA 25 (PS5)',
    amount: 59.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Chargeback Initiated'
  },

  // ---- PS Plus & Game Pass Subscriptions ----
  {
    id: 'TXN200016',
    date: '2025-10-17T09:30:00Z',
    customer: 'Olivia Martinez',
    description: 'Monthly Subscription - PS Plus Premium',
    amount: 17.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'TXN200017',
    date: '2025-10-16T08:25:00Z',
    customer: 'Rahul Verma',
    description: 'Quarterly Subscription - PS Plus Extra',
    amount: 49.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Pending'
  },
  {
    id: 'TXN200018',
    date: '2025-10-15T19:00:00Z',
    customer: 'Emma Jones',
    description: 'Annual Subscription - PS Plus Deluxe',
    amount: 119.99,
    currency: 'EUR',
    country: 'Germany',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Success'
  },
  {
    id: 'TXN200019',
    date: '2025-10-14T11:10:00Z',
    customer: 'Lucas White',
    description: 'Monthly Subscription Renewal - PS Plus Premium',
    amount: 17.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Amex',
    status: 'Failed'
  },
  {
    id: 'TXN200020',
    date: '2025-10-13T17:30:00Z',
    customer: 'Sophia Williams',
    description: 'Subscription Refund - PS Plus Extra',
    amount: 49.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Chargeback Completed'
  },

  // ---- Add-ons & Game Credits ----
  {
    id: 'TXN200021',
    date: '2025-10-12T16:45:00Z',
    customer: 'David Kim',
    description: 'Purchase - 5000 PlayStation Store Credits',
    amount: 49.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  },
  {
    id: 'TXN200022',
    date: '2025-10-11T14:20:00Z',
    customer: 'Ethan Clark',
    description: 'Purchase - PS5 Cooling Stand',
    amount: 39.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Pending'
  },
  {
    id: 'TXN200023',
    date: '2025-10-10T10:00:00Z',
    customer: 'Riya Mehta',
    description: 'Purchase - Extra DualSense Controller',
    amount: 69.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'TXN200024',
    date: '2025-10-09T19:50:00Z',
    customer: 'Daniel Lee',
    description: 'Purchase - PS5 3D Pulse Headset',
    amount: 99.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'MasterCard',
    status: 'Failed'
  },
  {
    id: 'TXN200025',
    date: '2025-10-08T18:40:00Z',
    customer: 'Ananya Gupta',
    description: 'Purchase - PS5 Media Remote',
    amount: 29.99,
    currency: 'INR',
    country: 'India',
    paymentMethod: 'UPI',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'TXN200026',
    date: '2025-10-07T15:00:00Z',
    customer: 'Noah Smith',
    description: 'Purchase - PS Game: The Last of Us Part I',
    amount: 59.99,
    currency: 'CAD',
    country: 'Canada',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Chargeback Initiated'
  },
  {
    id: 'TXN200027',
    date: '2025-10-06T13:10:00Z',
    customer: 'Oliver Davis',
    description: 'Purchase - PS Game: Elden Ring',
    amount: 69.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'PayPal',
    cardType: 'N/A',
    status: 'Success'
  },
  {
    id: 'TXN200028',
    date: '2025-10-05T11:20:00Z',
    customer: 'Emma Jones',
    description: 'Monthly Subscription - PS Game Catalog',
    amount: 12.99,
    currency: 'EUR',
    country: 'Germany',
    paymentMethod: 'Debit Card',
    cardType: 'MasterCard',
    status: 'Success'
  },
  {
    id: 'TXN200029',
    date: '2025-10-04T08:40:00Z',
    customer: 'Liam Johnson',
    description: 'Purchase - PS5 Faceplate (Midnight Black)',
    amount: 54.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Pending'
  },
  {
    id: 'TXN200030',
    date: '2025-10-03T07:30:00Z',
    customer: 'Rohit Sharma',
    description: 'Annual Subscription - PS Plus Premium',
    amount: 119.99,
    currency: 'USD',
    country: 'US',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    status: 'Success'
  }
];

export default transactionsData;
