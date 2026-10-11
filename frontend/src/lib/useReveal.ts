'use client';

import { useEffect, useRef } from 'react';

/**
 * Shared IntersectionObserver instance for lightweight, zero-layout-jump editorial reveals.
 * Content starts visible in HTML for crawlers and slow connections,
 * then receives .reveal-img or .reveal-text followed by .is-in once intersecting.
 */
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver && typeof window !== 'undefined') {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );
  }
  return sharedObserver!;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  type: 'image' | 'text' = 'image'
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }

    // Apply baseline reveal class upon client mount
    if (type === 'image') {
      el.classList.add('reveal-img');
    } else {
      el.classList.add('reveal-text');
    }

    const observer = getSharedObserver();
    observerCallbacks.set(el, () => {
      el.classList.add('is-in');
    });
    observer.observe(el);

    return () => {
      observerCallbacks.delete(el);
      observer?.unobserve(el);
    };
  }, [type]);

  return ref;
}
