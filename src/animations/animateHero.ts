import { gsap } from 'gsap';
export function animateHero(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>('.hero');
  if (hero) {
    gsap.to('.hero-sky', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.palace', {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero-names', {
      y: 450,
      ease: 'none',
      scrollTrigger: { start: 0, end: 900, scrub: true },
    });
    gsap.to('.hero-names', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { start: 120, end: 520, scrub: true },
    });
  }
}
