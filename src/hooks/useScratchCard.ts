import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { copy } from '../content/invitation';
import type { PointerEvent } from 'react';
export function useScratchCard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const moves = useRef(0);
  const dragging = useRef(false);
  const revealStarted = useRef(false);
  const [burst, setBurst] = useState<{
    x: number;
    y: number;
  } | null>(null);
  function revealDate() {
    if (revealStarted.current) return;
    revealStarted.current = true;
    const rect = canvas.current?.getBoundingClientRect();
    if (rect) setBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setRevealed(true);
  }
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, 420, 280);
    g.addColorStop(0, '#aa182e');
    g.addColorStop(1, '#dca336');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 420, 280);
    ctx.fillStyle = '#ffffff25';
    for (let x = 0; x < 420; x += 16)
      for (let y = 0; y < 280; y += 16) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, 7);
        ctx.fill();
      }
    ctx.fillStyle = '#fbe7ad';
    ctx.font = '18px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(copy.scratch.cover, 210, 145);
  }, []);
  function scratch(e: PointerEvent<HTMLCanvasElement>) {
    if (!dragging.current) return;
    const c = canvas.current!,
      r = c.getBoundingClientRect(),
      ctx = c.getContext('2d')!;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(
      ((e.clientX - r.left) * 420) / r.width,
      ((e.clientY - r.top) * 280) / r.height,
      24,
      0,
      7,
    );
    ctx.fill();
    if (++moves.current % 12 === 0) {
      const pixels = ctx.getImageData(0, 0, 420, 280).data;
      let clear = 0,
        total = 0;
      for (let i = 3; i < pixels.length; i += 64) {
        total++;
        if (pixels[i] < 128) clear++;
      }
      if (clear / total > 0.35) revealDate();
    }
  }
  return { canvas, revealed, burst, dragging, scratch, revealDate };
}
