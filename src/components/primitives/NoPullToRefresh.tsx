"use client";

import { useEffect } from "react";

/**
 * Blocks iOS Safari's native pull-to-refresh.
 *
 * CSS `overscroll-behavior-y: contain` (in globals.css) stops pull-to-refresh
 * on Android/Chrome, but iOS Safari ignores that property for the root
 * document. So on touch devices we watch for a downward drag that begins while
 * the page is already scrolled to the very top and cancel it - that gesture is
 * only ever an attempt to overscroll into a reload. Dragging up (to scroll the
 * page down) and any drag inside a nested scrollable area are left untouched,
 * so normal scrolling is unaffected.
 */
export function NoPullToRefresh() {
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // ignore pinch / multi-touch
      const dy = (e.touches[0]?.clientY ?? 0) - startY;
      if (dy <= 0) return; // only a downward pull can trigger refresh

      const scroller = document.scrollingElement || document.documentElement;
      if (scroller.scrollTop > 0) return; // not at the top - let it scroll

      // Allow the gesture if it started inside something that can still scroll up.
      let node: HTMLElement | null = e.target as HTMLElement | null;
      while (node && node !== document.body) {
        const oy = getComputedStyle(node).overflowY;
        if ((oy === "auto" || oy === "scroll") && node.scrollTop > 0) return;
        node = node.parentElement;
      }

      if (e.cancelable) e.preventDefault();
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return null;
}
