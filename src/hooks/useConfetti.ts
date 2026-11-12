import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export function useConfetti(origin: { x: number; y: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(false);
      return;
    }
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const width = window.innerWidth,
      height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    el.width = width * ratio;
    el.height = height * ratio;
    ctx.scale(ratio, ratio);
    const colors = ['#e4b847', '#f7dc88', '#a51b38', '#ea658b', '#2c65ba', '#fff3c6'];
    const pieces = Array.from({ length: 110 }, (_, i) => {
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.2;
      const speed = 260 + Math.random() * 480;
      return {
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 12,
        size: 5 + Math.random() * 5,
        color: colors[i % colors.length],
      };
    });
    let frame = 0,
      start = 0,
      last = 0;
    function draw(now: number) {
      if (!start) {
        start = now;
        last = now;
      }
      const age = (now - start) / 1000,
        dt = Math.min((now - last) / 1000, 0.035);
      last = now;
      ctx!.clearRect(0, 0, width, height);
      if (age >= 3.6) {
        setActive(false);
        return;
      }
      ctx!.globalAlpha = Math.min(1, (3.6 - age) / 0.9);
      for (const p of pieces) {
        p.vx *= Math.exp(-0.65 * dt);
        p.vy += 530 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.spin * dt;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rotation);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(
          -p.size / 2,
          -p.size / 3,
          p.size,
          p.size * 0.65 * Math.cos(age * 8 + p.spin),
        );
        ctx!.restore();
      }
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [origin]);
  return { canvas, active };
}
