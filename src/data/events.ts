export type WeddingEvent = {
  id: string;
  name: string;
  icon?: string;
  startsAt: string;
  endsAt?: string;
  venueId: string;
  dress: string;
  note?: string;
  fontSize?: string;
};

export const events: WeddingEvent[] = [
  {
    id: 'haldi',
    icon: '🌼',
    // name: 'Haldi & Matkod',
    name: 'हल्दी एवं मटकोड़',
    startsAt: '2026-11-28T10:00:00+05:30',
    venueId: 'residence',
    dress: 'Yellow',
    note: 'Family only',
  },
  {
    id: 'mehndi',
    icon: '🌿',
    name: 'Mehndi & Ghreetdhari',
    // name: 'मेहंदी और घृतढारी',
    startsAt: '2026-11-29T16:00:00+05:30',
    venueId: 'lawns',
    dress: 'Green & Gold',

  },
  {
    id: 'sangeet',
    icon: '🎶',
    name: 'Barat & Wedding',
    // name: 'बारात और विवाह',
    startsAt: '2026-11-30T19:00:00+05:30',
    venueId: 'lawns',
    dress: 'Festive Indo-Western',
  },
  {
    id: 'wedding',
    icon: '🔥',
    name: 'Reception',
    // name: 'प्रीतिभोज',
    startsAt: '2026-11-30T19:00:00+05:30',
    endsAt: '2026-12-02T23:00:00+05:30',
    venueId: 'banquet',
    dress: 'Traditional Formal',
  },
  
];

