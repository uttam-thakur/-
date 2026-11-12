import { useEffect, useRef, useState } from 'react';
import { COPY_FEEDBACK_DURATION } from '../constants/browser';
export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
    } catch {
      setCopied(false);
    }
  }
  return { copied, copy };
}
