"use client";

import React, { useEffect, useRef } from "react";

interface Filament {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  color: string;
  glowColor: string;
  lineWidth: number;
  amplitude: number;
  frequency: number;
  phase: number;
  arcType: "amber" | "cyan";
  jitter: number;
}

export default function EnergyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Electric amber (#f59e0b) and Technical inspection cyan (#38bdf8) palette
    const filaments: Filament[] = Array.from({ length: 32 }, (_, i) => {
      const isAmber = i % 2 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 260 + 120,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.35 + 0.12) * (Math.random() > 0.5 ? 1 : -1),
        color: isAmber
          ? "rgba(245, 158, 11, 0.45)" // Amber Electric
          : "rgba(56, 189, 248, 0.40)", // Cyan Technical
        glowColor: isAmber
          ? "rgba(245, 158, 11, 0.7)"
          : "rgba(56, 189, 248, 0.65)",
        lineWidth: Math.random() * 1.5 + 0.9,
        amplitude: Math.random() * 24 + 10,
        frequency: Math.random() * 0.02 + 0.006,
        phase: Math.random() * Math.PI * 2,
        arcType: isAmber ? "amber" : "cyan",
        jitter: Math.random() * 0.8 + 0.2,
      };
    });

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isInteracting = false;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      isInteracting = true;
      if ("touches" in e && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      isInteracting = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric gradient with subtle electrical glow centers
      const radialGradient = ctx.createRadialGradient(
        width / 2, height * 0.35, 60,
        width / 2, height * 0.35, width * 0.85
      );
      radialGradient.addColorStop(0, "rgba(15, 23, 42, 0.65)");
      radialGradient.addColorStop(0.5, "rgba(11, 15, 23, 0.85)");
      radialGradient.addColorStop(1, "rgba(7, 10, 15, 0.98)");
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      time += 0.015;

      filaments.forEach((f) => {
        if (!prefersReducedMotion) {
          f.angle += f.speed * 0.015;
          f.phase += 0.025;

          if (isInteracting) {
            const dx = mouseX - f.x;
            const dy = mouseY - f.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 280) {
              const pull = (280 - dist) * 0.0007;
              f.x += dx * pull;
              f.y += dy * pull;
            }
          }

          // Gentle flow drift simulating safety electrical currents
          f.x += Math.cos(f.angle) * 0.55;
          f.y += Math.sin(f.angle) * 0.55;

          // Boundary wrap
          if (f.x < -120) f.x = width + 120;
          if (f.x > width + 120) f.x = -120;
          if (f.y < -120) f.y = height + 120;
          if (f.y > height + 120) f.y = -120;
        }

        // Draw electrical micro-arc / filament with high-voltage glow
        ctx.beginPath();
        ctx.lineWidth = f.lineWidth;
        ctx.strokeStyle = f.color;
        ctx.shadowColor = f.glowColor;
        ctx.shadowBlur = 14;

        const startX = f.x - (Math.cos(f.angle) * f.length) / 2;
        const startY = f.y - (Math.sin(f.angle) * f.length) / 2;

        ctx.moveTo(startX, startY);

        const segments = 16;
        for (let i = 0; i <= f.length; i += f.length / segments) {
          const progress = i / f.length;
          const currX = startX + Math.cos(f.angle) * i;
          const currY = startY + Math.sin(f.angle) * i;
          
          // Electrical wave oscillation + micro-voltage harmonic
          const primaryWave = Math.sin(progress * Math.PI * 4 + f.phase) * f.amplitude;
          const harmonic = Math.sin(progress * Math.PI * 10 - f.phase * 2) * (f.amplitude * 0.25);
          const totalWave = primaryWave + harmonic;

          const perpX = -Math.sin(f.angle) * totalWave;
          const perpY = Math.cos(f.angle) * totalWave;

          ctx.lineTo(currX + perpX, currY + perpY);
        }

        ctx.stroke();

        // High-energy incandescent node at the apex of filaments
        if (!prefersReducedMotion && Math.random() > 0.6) {
          const apexX = f.x + Math.sin(f.phase) * 6;
          const apexY = f.y + Math.cos(f.phase) * 6;
          ctx.beginPath();
          ctx.arc(apexX, apexY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = f.arcType === "amber" ? "#fef08a" : "#e0f2fe";
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
