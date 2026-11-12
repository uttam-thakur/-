import type { ComponentType } from 'react';
import type { ContentSectionId } from '../config/sections';
import DateSection from '../components/sections/DateSection';
import WelcomeSection from '../components/sections/WelcomeSection';
import CountdownSection from '../components/sections/CountdownSection';
import CoupleSection from '../components/sections/CoupleSection';
import FamilySection from '../components/sections/FamilySection';
import StorySection from '../components/sections/StorySection';
import FestivitiesSection from '../components/sections/FestivitiesSection';
import VenuesSection from '../components/sections/VenuesSection';
import ScratchCard from '../components/scratch/ScratchCard';
import Gallery from '../components/gallery/Gallery';
// import RSVP from '../components/rsvp/RsvpSection';
export const sectionRegistry: Record<ContentSectionId, ComponentType> = {
  date: DateSection,
  welcome: WelcomeSection,
  countdown: CountdownSection,
  couple: CoupleSection,
  family: FamilySection,
  story: StorySection,
  festivities: FestivitiesSection,
  venues: VenuesSection,
  scratchCard: ScratchCard,
  gallery: Gallery,
  // rsvp: RSVP,
};
