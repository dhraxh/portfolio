"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; base: number; phase: number; speed: number; drift: number };

/** Event name the navbar's fun button dispatches to make the stars "warp". */
export const WARP_EVENT = "starfield:warp";

/**
 * Lightweight canvas starfield: a few hundred twinkling dots that drift
 * slowly upward. Pauses when the tab is hidden and renders a single static
 * frame for users who prefer reduced motion.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();
    let warp = 0; // 0..1, decays back to 0 after a warp burst

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const widthChanged = window.innerWidth !== width;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile URL bars change only the height — keep the same stars then.
      if (!widthChanged && stars.length) return;

      const count = Math.min(Math.round((width * height) / 6000), 320);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() < 0.85 ? Math.random() * 0.6 + 0.6 : Math.random() * 0.7 + 1.2,
        base: Math.random() * 0.5 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5,
        drift: Math.random() * 6 + 2,
      }));
    };

    const draw = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      warp = Math.max(0, warp - dt * 0.6);
      const boost = 1 + warp * warp * 60;

      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        if (!reduceMotion) {
          s.y -= s.drift * dt * boost;
          if (s.y < -4) {
            s.y = height + 4;
            s.x = Math.random() * width;
          }
        }
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t / 1000 * s.speed + s.phase);
        ctx.globalAlpha = Math.min(1, s.base * twinkle + warp * 0.4);
        ctx.fillStyle = "#fff";
        if (warp > 0.05) {
          // stretch stars into short streaks while warping
          ctx.fillRect(s.x - s.r / 2, s.y, s.r, s.r + warp * s.drift * 4);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (reduceMotion) draw(last);
      else raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const onResize = () => {
      resize();
      if (reduceMotion) draw(performance.now());
    };
    const onWarp = () => {
      if (!reduceMotion) warp = 1;
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener(WARP_EVENT, onWarp);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(WARP_EVENT, onWarp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
