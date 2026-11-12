import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateBackground } from '../animations/animateBackground';
import { animateReveals } from '../animations/animateReveals';
import { animateHero } from '../animations/animateHero';
import { animateTimeline } from '../animations/animateTimeline';
import { animateDetails } from '../animations/animateDetails';
import { animateScrollCards } from '../animations/animateScrollCards';
import { useReducedMotion } from './useReducedMotion';
export function useInvitationAnimations(
  rootRef: RefObject<HTMLDivElement | null>,
  opened: boolean,
) {
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const root = rootRef.current;
    if (!opened || !root) return;
    gsap.registerPlugin(ScrollTrigger);
    let cleanupCards: () => void = () => {};
    let cleanupTimeline: () => void = () => {};
    const context = gsap.context(() => {
      animateBackground(root, reducedMotion);
      if (reducedMotion) return;
      animateReveals();
      animateHero(root);
      cleanupTimeline = animateTimeline(root);
      animateDetails(root);
      cleanupCards = animateScrollCards();
    }, root);
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(refresh);
    const images = Array.from(root.querySelectorAll('img'));
    images.forEach((image) => image.addEventListener('load', refresh, { once: true }));
    return () => {
      disposed = true;
      images.forEach((image) => image.removeEventListener('load', refresh));
      cleanupCards();
      cleanupTimeline();
      context.revert();
    };
  }, [rootRef, opened, reducedMotion]);
}
