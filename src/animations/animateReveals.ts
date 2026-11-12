import { gsap } from 'gsap';
import { animation } from '../config/animation';
export function animateReveals() {
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) =>
    gsap.from(el, {
      opacity: 0,
      y: animation.reveal.distance,
      duration: animation.reveal.duration,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    }),
  );
  gsap.utils
    .toArray<HTMLElement>('.section-heading h2,.welcome>.script,.family-heading')
    .forEach((el) =>
      gsap.from(el, {
        opacity: 0,
        y: 36,
        rotation: 4,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }),
    );
  gsap.utils.toArray<HTMLElement>('.countdown>div').forEach((el, i) =>
    gsap.from(el, {
      opacity: 0,
      y: 40,
      rotationX: -60,
      duration: 0.9,
      delay: 0.3 + i * 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
    }),
  );
  gsap.utils.toArray<HTMLElement>('.painted-frame').forEach((el) => {
    const shutters = el.querySelectorAll('.shutter');
    shutters.forEach((shutter, i) =>
      gsap.to(shutter, {
        xPercent: i ? 101 : -101,
        duration: 1.6,
        delay: 0.5,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }),
    );
  });
  gsap.utils.toArray<HTMLElement>('.rosette-reveal').forEach((el) =>
    gsap.from(el, {
      scale: 0.35,
      rotation: -40,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
    }),
  );
}
