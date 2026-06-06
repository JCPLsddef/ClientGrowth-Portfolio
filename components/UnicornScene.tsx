"use client";

import { useEffect, useId, useRef, useState } from "react";

const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.1/dist/unicornStudio.umd.js";

// Juan's headshot. Doubles as the static fallback shown while the WebGL scene
// loads, on failure, or under reduced motion. Same image the scene distorts.
const FALLBACK_IMG = "/juan.jpg";

let sdkPromise: Promise<void> | null = null;

function loadSDK(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as unknown as { UnicornStudio?: unknown }).UnicornStudio) {
    return Promise.resolve();
  }
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SDK_URL;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Unicorn Studio SDK failed to load"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type UnicornStudioSDK = {
  addScene: (opts: Record<string, unknown>) => Promise<{ destroy?: () => void }>;
};

export default function UnicornScene({
  className = "",
  alt = "Juan-Carlos Portillo-Laflamme, founder of Client Growth",
}: {
  className?: string;
  alt?: string;
}) {
  const targetId = "unicorn-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const reducedMotion = usePrefersReducedMotion();
  const sceneRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;

    loadSDK()
      .then(() => {
        if (cancelled) return undefined;
        const US = (window as unknown as { UnicornStudio?: UnicornStudioSDK })
          .UnicornStudio;
        if (!US) return undefined;
        return US.addScene({
          elementId: targetId,
          filePath: "/jcpl-effect.json",
          fps: 60,
          scale: 1,
          dpi: Math.min(window.devicePixelRatio || 1, 1.5),
          lazyLoad: true,
        });
      })
      .then((scene) => {
        if (!scene) return;
        if (cancelled) {
          scene.destroy?.();
          return;
        }
        sceneRef.current = scene;
      })
      .catch((err) => {
        // On any failure the static fallback image remains visible.
        console.warn("UnicornScene:", err);
      });

    return () => {
      cancelled = true;
      sceneRef.current?.destroy?.();
      sceneRef.current = null;
    };
  }, [targetId, reducedMotion]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Static photo: visible until the WebGL canvas paints over it, and the
          only thing shown under reduced motion or if the scene fails. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMG}
        alt={alt}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* Unicorn Studio renders its canvas into this element. */}
      <div id={targetId} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
