import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);
const swingEase = CustomEase.create('gate-swing', '0.65,0,0.35,1');
const pushEase = CustomEase.create('gate-push', '0.7,0,0.3,1');
import { animation } from '../config/animation';
import { sections } from '../config/sections';
export function animateEntrance(
  root: HTMLElement,
  entrance: HTMLElement | null,
  finish: () => void,
) {
  return gsap.context(() => {
    const tl = gsap.timeline({ onComplete: finish });
    // Each opening owns the outer camera; the paused idle transform is on a child.
    const breath = root.querySelector<HTMLElement>('.gate-breath');
    const initialScale = breath ? Number(gsap.getProperty(breath, 'scaleX')) : 1;
    gsap.set('.gate-scene', { scale: initialScale });
    if (breath) gsap.set(breath, { scale: 1 });
    tl.to('.gate-instruction,.gate-names', { opacity: 0, duration: 0.4 })
      .to(
        '.gate-left',
        {
          rotationY: 86,
          filter: 'brightness(.5)',
          duration: animation.gate.swing,
          ease: swingEase,
        },
        animation.gate.swingAt,
      )
      .to(
        '.gate-right',
        {
          rotationY: -86,
          filter: 'brightness(.5)',
          duration: animation.gate.swing,
          ease: swingEase,
        },
        animation.gate.swingAt,
      )
      .to(
        '.gate-scene',
        { scale: 1.1, duration: animation.gate.pushAt, ease: 'power1.out' },
        0,
      )
      .to(
        '.gate-scene',
        { scale: 7, duration: animation.gate.push, ease: pushEase },
        animation.gate.pushAt,
      )
      .to(
        '.gate-flood',
        { opacity: 1, duration: 1.2, ease: 'power1.in' },
        animation.gate.floodAt,
      )
      .to(entrance, { opacity: 0, duration: 1.1 }, animation.gate.done);
    tl.to(
      '.gate-seam',
      { opacity: 1, scaleY: 1, duration: 0.81, ease: 'power1.out' },
      0,
    ).to('.gate-seam', { opacity: 0, duration: 0.36 }, 1.44);
    if (sections.hero) {
      tl.fromTo(
        '.palace',
        { y: 300, opacity: 0, scale: 1.06 },
        { y: 0, opacity: 1, scale: 1, duration: 2.6, ease: 'power3.out' },
        animation.gate.done,
      );
      tl.fromTo(
        '.hero h1>span',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.4, ease: 'power3.out' },
        animation.gate.done + 0.2,
      );
      tl.fromTo(
        '.hero h1 em',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1 },
        animation.gate.done + 0.8,
      );
    }
  }, root);
}
