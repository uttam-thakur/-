import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { advanceTimelineSpring } from '../helpers/timelineSpring';
import { animation } from '../config/animation';
export function animateTimeline(root: HTMLElement) {
  const timeline = root.querySelector<HTMLElement>('.event-timeline');
  if (!timeline) return () => {};
  let dispose = () => {};
  {
    const car = timeline.querySelector<HTMLElement>('.timeline-car');
    const progress = timeline.querySelector<HTMLElement>('.timeline-progress');
    let position = 0,
      velocity = 0,
      target = 0;
    let height = timeline.clientHeight;
    const setY = car ? gsap.quickSetter(car, 'y', 'px') : null;
    const setProgress = progress ? gsap.quickSetter(progress, 'scaleY') : null;
    if (car) gsap.set(car, { force3D: true });
    const render = () => {
      setY?.(position * height - (car?.offsetHeight ?? 0) * 0.12);
      setProgress?.(position);
    };
    const tick = (_time: number, deltaMs: number) => {
      if (
        Math.abs(target - position) < animation.timeline.restDelta &&
        Math.abs(velocity) < 0.001
      ) {
        if (position !== target) {
          position = target;
          velocity = 0;
          render();
        }
        return;
      }
      const next = advanceTimelineSpring(
        position,
        velocity,
        target,
        Math.min(deltaMs / 1000, 0.1),
      );
      position = next.position;
      velocity = next.velocity;
      render();
    };
    const trigger = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 60%',
      onUpdate: (self) => {
        target = self.progress;
      },
      onRefresh: (self) => {
        height = timeline.clientHeight;
        target = self.progress;
        render();
      },
    });
    position = target = trigger.progress;
    render();
    gsap.ticker.add(tick);
    dispose = () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
    gsap.utils.toArray<HTMLElement>('.timeline-jewel').forEach((el) =>
      gsap.from(el, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }),
    );
    gsap.utils.toArray<HTMLElement>('.event-date').forEach((el, i) =>
      gsap.from(el, {
        opacity: 0,
        x: i % 2 ? -40 : 40,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      }),
    );
  }
  return dispose;
}
