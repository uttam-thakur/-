import { animation } from '../config/animation';
export function advanceTimelineSpring(
  position: number,
  velocity: number,
  target: number,
  seconds: number,
) {
  const { stiffness, damping } = animation.timeline;
  const discriminant = Math.sqrt(damping * damping - 4 * stiffness);
  const slow = (-damping + discriminant) / 2;
  const fast = (-damping - discriminant) / 2;
  const displacement = position - target;
  const a = (velocity - fast * displacement) / (slow - fast);
  const b = displacement - a;
  const slowDecay = Math.exp(slow * seconds);
  const fastDecay = Math.exp(fast * seconds);
  return {
    position: target + a * slowDecay + b * fastDecay,
    velocity: a * slow * slowDecay + b * fast * fastDecay,
  };
}
