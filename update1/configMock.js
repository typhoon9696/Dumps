export const mockConfig = {
  enable_3ds: true,
  enable_avs: false,
  webhook_url: 'https://api.crunchyroll.com/webhook',
  webhook_secret: 'whsec_************',
  selected_events: ['transaction.succeeded','transaction.failed'],
  recent_deliveries: [
    { time: '2 min ago', event: 'tx.succeeded', status: 200 },
    { time: '5 min ago', event: 'tx.failed', status: 500 },
  ],
  dynamic_rules: [
    { country: 'CA', skip_3ds: true, force_avs: false },
    { country: 'US', skip_3ds: true, force_avs: true },
    { country: 'GB', skip_3ds: false, force_avs: true },
  ],
  paymentMethods: {}
};