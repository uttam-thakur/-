import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { sections } from '../config/sections';
import { animateEntrance } from '../animations/animateEntrance';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useReducedMotion } from './useReducedMotion';
export function useEntrance(rootRef: RefObject<HTMLDivElement | null>) {
  const [opened, setOpened] = useState(() => !sections.entrance);
  const [opening, setOpening] = useState(false);
  const entranceRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const idle = useRef<gsap.core.Timeline | null>(null);
  const context = useRef<gsap.Context | null>(null);
  const focusFrame = useRef(0);
  const reducedMotion = useReducedMotion();
  useBodyScrollLock(!opened);
  useEffect(() => {
    if (opened || busy.current || reducedMotion || !rootRef.current) return;
    const scope = gsap.context(() => {
      idle.current = gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          '.gate-breath',
          { scale: 1.12 },
          { scale: 1, duration: 2.8, ease: 'power2.out' },
        )
        .to('.gate-breath', {
          scale: 1.05,
          duration: 5.6,
          ease: 'sine.inOut',
        })
        .to('.gate-breath', { scale: 1, duration: 5.6, ease: 'sine.inOut' });
    }, rootRef.current);
    return () => scope.revert();
  }, [opened, reducedMotion, rootRef]);
  useEffect(
    () => () => {
      context.current?.revert();
      cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  function open() {
    if (busy.current || !rootRef.current) return;
    busy.current = true;
    setOpening(true);
    // Freeze the idle pose without reverting it before the opening timeline takes over.
    idle.current?.pause();
    const finish = () => {
      setOpened(true);
      window.scrollTo(0, 0);
      focusFrame.current = requestAnimationFrame(() => {
        const target = rootRef.current?.querySelector<HTMLElement>(
          '#invitation-title,[data-section]',
        );
        target?.focus({ preventScroll: true });
      });
    };
    if (reducedMotion) {
      finish();
      return;
    }
    context.current = animateEntrance(rootRef.current, entranceRef.current, finish);
  }
  return { opened, opening, entranceRef, open };
}
