/**
 * Atelier Page Transition Context & Provider
 * Manages route transitions by coordinating a shutter wipe overlay, View Transitions API, and link click interception.
 */
"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RoomInfo, getRoomInfo } from "./rooms";
import AtelierTransitionOverlay from "./AtelierTransitionOverlay";

interface AtelierTransitionContextType {
  status: "idle" | "closing" | "opening";
  targetRoom: RoomInfo | null;
  navigate: (href: string) => void;
  isTransitioning: boolean;
  prefersReducedMotion: boolean;
}

const AtelierTransitionContext = createContext<AtelierTransitionContextType>({
  status: "idle",
  targetRoom: null,
  navigate: () => {},
  isTransitioning: false,
  prefersReducedMotion: false,
});

export function useAtelierTransition() {
  return useContext(AtelierTransitionContext);
}

export function AtelierTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = useState<"idle" | "closing" | "opening">("idle");
  const [targetRoom, setTargetRoom] = useState<RoomInfo | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isNavigatingRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Detect OS reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 2. Programmatic navigation executing 3-phase shutter transition
  const navigate = useCallback(
    (href: string) => {
      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      const urlPath = href.split("?")[0].split("#")[0] || "/";
      const nextRoom = getRoomInfo(urlPath);

      setTargetRoom(nextRoom);
      setStatus("closing");
      pendingHrefRef.current = href;

      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

      // Phase 1: Shutter Close & Refraction Wipe (~240ms)
      setTimeout(() => {
        if (typeof document !== "undefined" && "startViewTransition" in document) {
          (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
            router.push(href);
          });
        } else {
          router.push(href);
        }

        // Phase 2: Shutter reveals next room
        setTimeout(() => {
          setStatus("opening");

          // Phase 3: Transition settles into idle state (~320ms)
          setTimeout(() => {
            setStatus("idle");
            setTargetRoom(null);
            isNavigatingRef.current = false;
            pendingHrefRef.current = null;
          }, 320);
        }, 100);
      }, 240);

      // Fail-safe timeout preventing UI lockup
      safetyTimerRef.current = setTimeout(() => {
        setStatus("idle");
        setTargetRoom(null);
        isNavigatingRef.current = false;
        pendingHrefRef.current = null;
      }, 1500);
    },
    [router, prefersReducedMotion]
  );

  // 3. Reset transition state on pathname changes
  useEffect(() => {
    if (!isNavigatingRef.current && status !== "idle") {
      setStatus("idle");
      setTargetRoom(null);
    }
  }, [pathname, status]);

  // 4. Global click listener to intercept internal link clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("http")) return;

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href, window.location.origin);

        // Do not intercept hash jumps or same-page clicks
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.hash) return;
        if (targetUrl.pathname === currentUrl.pathname && !targetUrl.search && !targetUrl.hash) return;

        e.preventDefault();
        navigate(rawHref);
      } catch {
        // Fallback to default navigation
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: false });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [navigate]);

  return (
    <AtelierTransitionContext.Provider
      value={{
        status,
        targetRoom,
        navigate,
        isTransitioning: status !== "idle",
        prefersReducedMotion,
      }}
    >
      <AtelierTransitionOverlay
        status={status}
        targetRoom={targetRoom}
        prefersReducedMotion={prefersReducedMotion}
      />
      {children}
    </AtelierTransitionContext.Provider>
  );
}
