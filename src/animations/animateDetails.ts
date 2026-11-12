import { gsap } from 'gsap';
import { sections } from '../config/sections';
export function animateDetails(root: HTMLElement) {
  const footer = root.querySelector<HTMLElement>('.footer');
  gsap.utils.toArray<HTMLElement>('.venue-detail').forEach((el, i) =>
    gsap.from(el, {
      opacity: 0,
      y: 22,
      duration: 0.8,
      delay: (i % 4) * 0.15,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    }),
  );
  if (sections.rsvp)
    gsap.from('.rsvp-crest', {
      scale: 2.4,
      opacity: 0,
      rotation: -40,
      duration: 0.9,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: '.rsvp-section', start: 'top 85%', once: true },
    });
  if (footer)
    gsap.from(
      footer.querySelectorAll(
        '.footer-details > p,.footer-details > h2,.footer-details > button',
      ),
      {
        opacity: 0,
        y: 28,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: { trigger: footer, start: 'top 85%', once: true },
      },
    );
  if (footer)
    gsap.from('.desert', {
      opacity: 0,
      y: 60,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.desert', start: 'top 80%', once: true },
    });
}
