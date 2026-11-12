import { useSyncExternalStore } from 'react';
import { REDUCED_MOTION_QUERY } from '../constants/browser';
const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerSnapshot = () => false;
function subscribe(listener: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', listener);
  return () => query.removeEventListener('change', listener);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
