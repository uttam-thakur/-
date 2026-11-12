import { useState, useRef, useEffect, type HTMLAttributes } from 'react';
import { invitationConfig } from '../config/invitation';
import { useReducedMotion } from './useReducedMotion';
import { galleryOffset, wrapIndex } from '../helpers/gallery';
export function useGallery(count: number) {
  const [selected, setSelected] = useState(0),
    [zoom, setZoom] = useState(false),
    [paused, setPaused] = useState(false);
  const active = wrapIndex(selected, count),
    reducedMotion = useReducedMotion();
  const swipe = useRef<number | null>(null),
    dragged = useRef(false);
  const move = (direction: number) =>
    setSelected((value) => wrapIndex(value + direction, count));
  useEffect(() => {
    if (zoom || paused || count < 2 || reducedMotion) return;
    const timer = setInterval(
      () => setSelected((value) => wrapIndex(value + 1, count)),
      invitationConfig.galleryInterval,
    );
    return () => clearInterval(timer);
  }, [zoom, paused, count, reducedMotion]);
  function select(index: number) {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    galleryOffset(index, active, count) === 0 ? setZoom(true) : setSelected(index);
  }
  const stageProps: HTMLAttributes<HTMLDivElement> = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
    },
    onPointerDown: (event) => {
      swipe.current = event.clientX;
      dragged.current = false;
    },
    onPointerUp: (event) => {
      const start = swipe.current;
      if (start !== null && Math.abs(event.clientX - start) > 45) {
        dragged.current = true;
        move(event.clientX < start ? 1 : -1);
      }
      swipe.current = null;
    },
    onPointerCancel: () => {
      swipe.current = null;
    },
    onKeyDown: (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    },
  };
  return {
    active,
    zoom,
    stageProps,
    move,
    select,
    setSelected,
    close: () => setZoom(false),
  };
}
