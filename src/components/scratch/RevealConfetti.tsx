import { useConfetti } from '../../hooks/useConfetti';
import { createPortal } from 'react-dom';
export default function RevealConfetti({ origin }: { origin: { x: number; y: number } }) {
  const { canvas, active } = useConfetti(origin);
  return active
    ? createPortal(
        <canvas ref={canvas} className="reveal-confetti" aria-hidden="true" />,
        document.body,
      )
    : null;
}
