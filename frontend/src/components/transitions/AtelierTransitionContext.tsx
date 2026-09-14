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

  // 1. Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 2. Programmatic navigation function
  const navigate = useCallback(
    (href: string) => {
      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      // Clean target path without query or hash for room lookup
      const urlPath = href.split("?")[0].split("#")[0] || "/";
      const nextRoom = getRoomInfo(urlPath);

      setTargetRoom(nextRoom);
      setStatus("closing");
      pendingHrefRef.current = href;

      // Clear any prior safety timer
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

      // Phase 1: Shutter Close & Refraction Wipe (~240ms)
      setTimeout(() => {
        // Native View Transition support if available in browser
        if (typeof document !== "undefined" && "startViewTransition" in document) {
          (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
            router.push(href);
          });
        } else {
          router.push(href);
        }

        // Phase 2: Shutter opens on the new room
        setTimeout(() => {
          setStatus("opening");

          // Phase 3: Transition settles into idle state (~300ms)
          setTimeout(() => {
            setStatus("idle");
            setTargetRoom(null);
            isNavigatingRef.current = false;
            pendingHrefRef.current = null;
          }, 320);
        }, 100);
      }, 240);

      // Safety fail-safe timeout in case of aborted navigation (e.g. 1500ms)
      safetyTimerRef.current = setTimeout(() => {
        setStatus("idle");
        setTargetRoom(null);
        isNavigatingRef.current = false;
        pendingHrefRef.current = null;
      }, 1500);
    },
    [router, prefersReducedMotion]
  );

  // 3. Reset transition on pathname change (e.g. browser back/forward buttons)
  useEffect(() => {
    if (!isNavigatingRef.current && status !== "idle") {
      setStatus("idle");
      setTargetRoom(null);
    }
  }, [pathname, status]);

  // 4. Global link click interceptor for seamless internal links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd, ctrl, shift, alt)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.defaultPrevented) return;

      // Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Ignore external links, mailto, tel, downloads, or target="_blank"
      if (anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;
      if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || rawHref.startsWith("http")) return;

      // Parse target URL
      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href, window.location.origin);

        // If link targets the exact same path and only changes hash (in-page jump), do not intercept
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.hash) {
          return;
        }

        // If link is exactly the current URL, ignore
        if (targetUrl.pathname === currentUrl.pathname && !targetUrl.search && !targetUrl.hash) {
          return;
        }

        // Internal cross-room link detected: intercept and run exhibition transition
        e.preventDefault();
        navigate(rawHref);
      } catch {
        // Fallback to default browser action if URL parsing fails
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
      {/* Visual Exhibition Transition Overlay */}
      <AtelierTransitionOverlay
        status={status}
        targetRoom={targetRoom}
        prefersReducedMotion={prefersReducedMotion}
      />
      {children}
    </AtelierTransitionContext.Provider>
  );
}
