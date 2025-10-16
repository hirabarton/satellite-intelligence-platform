"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * CosmicNoirNetwork
 * A single-file React + SVG animation that evokes the "cosmic noir intelligence network"
 * look: a glowing stacked core above Earth, radiating links to pulsing nodes in orbit.
 *
 * Drop this component anywhere in a React/Next.js app. It is self‑contained (no Tailwind required),
 * but plays nicely with Tailwind if you have it. The scene scales responsively.
 */

export default function CosmicNoirNetwork({
  width = 1024,
  height = 1024,
  glow = "#18a8ff", // electric blue
  glowSoft = "#7fd3ff",
  background = "#030510",
  stars = 140,
  nodeCount = 28,
}: {
  width?: number;
  height?: number;
  glow?: string;
  glowSoft?: string;
  background?: string;
  stars?: number;
  nodeCount?: number;
}) {
  const view = `0 0 ${width} ${height}`;
  const cx = width / 2;
  const cy = height * 0.56; // center above the Earth horizon

  // Deterministic scattered nodes (FIRST ITERATION style)
  const nodes = React.useMemo(() => {
    const rOuter = Math.min(width, height) * 0.42;
    const out: Array<{ x: number; y: number; a: number }> = [];
    for (let i = 0; i < nodeCount; i++) {
      const a = (i / nodeCount) * Math.PI * 2 + (i % 3) * 0.09;
      const jitter = (Math.sin(i * 13.37) + Math.cos(i * 7.11)) * 0.04;
      const rr = rOuter * (0.78 + 0.16 * Math.sin(i * 1.618));
      out.push({ x: cx + rr * Math.cos(a + jitter), y: cy - rr * Math.sin(a + jitter), a });
    }
    return out;
  }, [nodeCount, width, height, cx, cy]);

  // Background stars (twinkling) - using deterministic pseudo-random for SSR compatibility
  const twinkles = React.useMemo(() => {
    const out: Array<{ x: number; y: number; r: number; d: number }> = [];
    for (let i = 0; i < stars; i++) {
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedX = Math.sin(i * 12.9898) * 43758.5453;
      const seedY = Math.sin(i * 78.233) * 43758.5453;
      const seedR = Math.sin(i * 23.142) * 43758.5453;
      const seedD = Math.sin(i * 56.789) * 43758.5453;
      
      const x = (seedX - Math.floor(seedX)) * width;
      const y = (seedY - Math.floor(seedY)) * (height * 0.9);
      const r = 0.6 + (seedR - Math.floor(seedR)) * 1.4;
      const d = 2 + (seedD - Math.floor(seedD)) * 4; // duration jitter
      out.push({ x, y, r, d });
    }
    return out;
  }, [stars, width, height]);

  // City lights along the Earth limb (subtle) - using deterministic pseudo-random for SSR compatibility
  const lights = React.useMemo(() => {
    const pts: Array<{ x: number; y: number; r: number; o: number }> = [];
    const rx = width * 0.8;
    const ry = height * 0.26;
    const cxE = cx;
    const cyE = height * 0.9;
    for (let i = 0; i < 90; i++) {
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedT = Math.sin(i * 31.415) * 43758.5453;
      const seedY = Math.sin(i * 92.653) * 43758.5453;
      const seedR = Math.sin(i * 18.284) * 43758.5453;
      const seedO = Math.sin(i * 47.129) * 43758.5453;
      
      const t = (seedT - Math.floor(seedT)) * Math.PI; // visible half ellipse
      const x = cxE + rx * Math.cos(t);
      const y = cyE + ry * Math.sin(t) + ((seedY - Math.floor(seedY)) - 0.5) * 8;
      const r = 0.7 + (seedR - Math.floor(seedR)) * 1.3;
      const o = 0.5 + (seedO - Math.floor(seedO)) * 0.45;
      pts.push({ x, y, r, o });
    }
    return pts;
  }, [width, height, cx]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      style={{ background, borderRadius: 24, overflow: "hidden" }}
      aria-label="Cosmic noir intelligence network animation"
    >
      <svg viewBox={view} width="100%" height="100%" role="img">
        <defs>
          {/* Soft vignette */}
          <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor={background} stopOpacity="0" />
            <stop offset="80%" stopColor="#000" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
          </radialGradient>

          {/* Star + node glow */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} stopOpacity="1" />
            <stop offset="60%" stopColor={glow} stopOpacity="0.35" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          {/* Earth gradients (added, so Earth is visible) */}
          <radialGradient id="earthBody" cx="50%" cy="85%" r="85%">
            <stop offset="0%" stopColor="#021528" />
            <stop offset="60%" stopColor="#021528" />
            <stop offset="100%" stopColor="#000408" />
          </radialGradient>
          <radialGradient id="earthGlow" cx="50%" cy="85%" r="80%">
            <stop offset="0%" stopColor={glowSoft} stopOpacity="0.55" />
            <stop offset="60%" stopColor={glowSoft} stopOpacity="0.12" />
            <stop offset="100%" stopColor={glowSoft} stopOpacity="0" />
          </radialGradient>

          {/* Line gradient for flow effect */}
          <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowSoft} stopOpacity="0" />
            <stop offset="35%" stopColor={glow} stopOpacity="0.9" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </linearGradient>

          {/* Core prism glow */}
          <radialGradient id="core" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={glow} stopOpacity="1" />
            <stop offset="60%" stopColor={glow} stopOpacity="0.35" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          <filter id="blur-3" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="blur-8" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Space backdrop */}
        <rect x="0" y="0" width={width} height={height} fill={background} />
        <rect x="0" y="0" width={width} height={height} fill="url(#vignette)" />

        {/* Twinkling stars */}
        {twinkles.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="url(#nodeGlow)" className={`twinkle tw-${i % 7}`} />
        ))}

        {/* Earth: visible body, glow, and lights */}
        <g>
          <ellipse cx={cx} cy={height * 0.9} rx={width * 0.85} ry={height * 0.28} fill="url(#earthBody)" />
          <ellipse cx={cx} cy={height * 0.88} rx={width * 0.75} ry={height * 0.22} fill="url(#earthGlow)" filter="url(#blur-8)" />
          {lights.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={glow} opacity={p.o} />
          ))}
        </g>

        {/* Radiating links (FIRST ITERATION style) */}
        <g>
          {nodes.map((n, i) => {
            const d = `M ${cx} ${cy} Q ${cx + (n.x - cx) * 0.25} ${cy - 40} ${n.x} ${n.y}`;
            const len = Math.hypot(n.x - cx, n.y - cy);
            return (
              <path key={i} d={d} fill="none" stroke="url(#flow)" strokeWidth={1.6} strokeLinecap="round" className="flow" style={{ strokeDasharray: `${Math.max(30, len * 0.18)} ${Math.max(100, len * 0.82)}`, animationDelay: `${(i % 7) * 0.35}s` }} />
            );
          })}
        </g>

        {/* Orbiting nodes (static scatter, pulsing) */}
        <g>
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={12} fill="url(#nodeGlow)" opacity="0.9" />
              <circle cx={n.x} cy={n.y} r={2.2} fill={glow} className={`pulse p-${i % 5}`} />
            </g>
          ))}
        </g>

        {/* Central stacked core */}
        <g transform={`translate(${cx}, ${cy - 16})`}>
          <circle r={70} fill="url(#core)" filter="url(#blur-8)" opacity="0.9" />
          {[-48, -12, 24].map((y, i) => (
            <g key={i} transform={`translate(0, ${y})`}>
              <polygon points="0,-40 46, -16 0, 8 -46, -16" fill={glow} opacity="0.15" filter="url(#blur-3)" />
              <polygon points="0,-34 40, -12 0, 10 -40, -12" fill="none" stroke={glow} strokeOpacity="0.9" strokeWidth={1.6} />
              <polygon points="0,10 40, -12 40, 6 0, 28 -40, 6 -40, -12" fill={glow} opacity="0.05" />
            </g>
          ))}
          <path d={`M 0 28 C -6 52, 6 62, 0 ${height * 0.32}`} fill="none" stroke={glow} strokeOpacity="0.6" strokeWidth={1.4} className="beam" />
        </g>
      </svg>

      <style jsx>{`
        .pulse { animation: pulse 2.3s ease-in-out infinite; transform-origin: center; }
        .p-0 { animation-delay: 0s; }
        .p-1 { animation-delay: 0.35s; }
        .p-2 { animation-delay: 0.7s; }
        .p-3 { animation-delay: 1.05s; }
        .p-4 { animation-delay: 1.4s; }

        .flow { animation: dash 4.8s linear infinite; opacity: 0.85; }

        .twinkle { animation: twinkle 3.4s ease-in-out infinite; }
        .tw-0 { animation-duration: 3s; }
        .tw-1 { animation-duration: 3.6s; }
        .tw-2 { animation-duration: 4.2s; }
        .tw-3 { animation-duration: 5s; }
        .tw-4 { animation-duration: 3.3s; }
        .tw-5 { animation-duration: 4.8s; }
        .tw-6 { animation-duration: 6s; }

        .beam { animation: beam 2.8s ease-in-out infinite; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(24,168,255,0.0)); }
          50% { transform: scale(1.9); filter: drop-shadow(0 0 6px rgba(24,168,255,0.9)); }
        }

        @keyframes dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }

        @keyframes beam {
          0%, 100% { stroke-opacity: 0.25; }
          50% { stroke-opacity: 0.85; }
        }
      `}</style>
    </motion.div>
  );
}