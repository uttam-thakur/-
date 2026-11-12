/** Toggle a section without editing any TSX. Change contentOrder to reorder middle sections. */
export const sections: Record<
  | 'entrance'
  | 'ribbon'
  | 'hero'
  | 'date'
  | 'welcome'
  | 'countdown'
  | 'scratchCard'
  | 'couple'
  | 'family'
  | 'story'
  | 'festivities'
  | 'gallery'
  | 'venues'
  | 'rsvp'
  | 'footer'
  | 'flowers'
  | 'petals',
  boolean
> = {
  entrance: true,
  ribbon: false,
  hero: true,
  date: true,
  welcome: true,
  countdown: true,
  scratchCard: true,
  couple: true,
  family: true,
  story: true,
  festivities: true,
  gallery: true,
  venues: true,
  rsvp: true,
  footer: true,
  flowers: true,
  petals: true,
};
export type ContentSectionId =
  | 'date'
  | 'welcome'
  | 'countdown'
  | 'scratchCard'
  | 'couple'
  | 'family'
  | 'story'
  | 'festivities'
  | 'gallery'
  | 'venues'
  // | 'rsvp';
export const contentOrder: ContentSectionId[] = [
  'date',
  'welcome',
  'countdown',
  'scratchCard',
  'couple',
  'story',
  'family',
  'festivities',
  'gallery',
  'venues',
  // 'rsvp',
];
export function visibleContentSections() {
  return [...new Set(contentOrder)].filter((id) => sections[id]);
}
