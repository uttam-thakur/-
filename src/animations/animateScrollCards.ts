import { gsap } from 'gsap';
import { animation } from '../config/animation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { invitationConfig } from '../config/invitation';
export function animateScrollCards() {
  const tickerCleanups: Array<() => void> = [];
  gsap.utils.toArray<HTMLElement>('.ceremony').forEach((el) => {
    const paper = el.querySelector<HTMLElement>('.scroll-paper')!;
    const roller = el.querySelector<HTMLElement>('.scroll-bottom')!;
    const scroll = el.querySelector<HTMLElement>('.royal-scroll')!;
    const lettering = el.querySelector<HTMLElement>('.event-copy')!;
    const state = { progress: 0 };
    const renderRoll = (progress: number) => {
      const visible = Math.min(1, Math.max(0, progress));
      const clipped = 100 * Math.max(0, 1 - (28 + 1152 * visible) / 1110);
      gsap.set(paper, { clipPath: `inset(0 0 ${clipped}% 0)` });
      gsap.set(roller, {
        y: -scroll.clientWidth * 1.125 * (1 - visible),
        rotation: -1.2 * (1 - visible),
      });
      gsap.set(lettering, { opacity: Math.min(1, Math.max(0, (visible - 0.45) / 0.4)) });
    };
    // Reference behavior: down opens, up closes over the same viewport interval.
    // After the opening interval, keep the card open while scrolling farther down.
    renderRoll(0);
    let target = 0,
      velocity = 0;
    const tick = (_time: number, delta: number) => {
      if (
        Math.abs(target - state.progress) < animation.scrollSpring.restDelta &&
        Math.abs(velocity) < 0.001
      )
        return;
      const dt = Math.min(delta / 1000, 0.032);
      const acceleration =
        animation.scrollSpring.stiffness * (target - state.progress) -
        animation.scrollSpring.damping * velocity;
      velocity += acceleration * dt;
      state.progress += velocity * dt;
      renderRoll(state.progress);
    };
    gsap.ticker.add(tick);
    tickerCleanups.push(() => gsap.ticker.remove(tick));
    ScrollTrigger.create({
      trigger: scroll,
      start: invitationConfig.scrollAnimation.start,
      end: invitationConfig.scrollAnimation.end,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        target = self.progress;
      },
      onRefresh: (self) => {
        target = self.progress;
        state.progress = target;
        velocity = 0;
        renderRoll(target);
      },
    });
  });
  return () => tickerCleanups.forEach((cleanup) => cleanup());
}
