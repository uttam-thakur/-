import { useState } from 'react';
import { useEffect } from 'react';
import { primaryEvent } from '../helpers/presentation';
export function useCountdown() {
  const [left, setLeft] = useState<number[] | null>(null);
  useEffect(() => {
    function update() {
      let s = Math.max(
        0,
        Math.floor((new Date(primaryEvent().startsAt).getTime() - Date.now()) / 1000),
      );
      setLeft([
        Math.floor(s / 86400),
        Math.floor(s / 3600) % 24,
        Math.floor(s / 60) % 60,
        s % 60,
      ]);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return { left };
}
