import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function animateBackground(root: HTMLElement, reducedMotion: boolean) {
  const flowers = root.querySelector<HTMLElement>('.mandalas');
  const middle = root.querySelector<HTMLElement>('.middle-sections');
  const footer = root.querySelector<HTMLElement>('.footer');
  const hero = root.querySelector<HTMLElement>('.hero');
  if (flowers && middle) {
    const visibility = () => {
      const h = window.innerHeight;
      const enter = hero
        ? gsap.utils.clamp(0, 1, (h - hero.getBoundingClientRect().bottom) / (h * 0.6))
        : 1;
      const leave = footer
        ? gsap.utils.clamp(0, 1, (h - footer.getBoundingClientRect().top) / (h * 0.25))
        : 0;
      gsap.set(flowers, { autoAlpha: enter * (1 - leave) });
    };
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: visibility,
      onRefresh: visibility,
    });
    visibility();
  }
  if (!reducedMotion) {
    if (flowers) {
      gsap.to('.mandala-right', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.5 },
      });
      gsap.to('.mandala-left', {
        rotation: -270,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.5 },
      });
    }
  }
}
