"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * CosmicNoirNetworkV3 - Enhanced Earth Edition
 * 
 * Mirrors the attached cosmic network image with:
 * - Animated Earth with realistic texture and rotation
 * - Stacked geometric core matching the reference
 * - Network nodes with enhanced effects
 * - Improved lighting and atmosphere
 */

export default function CosmicNoirNetworkV3({
  width = 1024,
  height = 1024,
  glow = "#18a8ff",
  glowSoft = "#7fd3ff",
  background = "#030510",
  stars = 160,
  nodeCount = 24,
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
  const cy = height * 0.45; // Moved up to match reference image

  // Animation refs
  const earthRef = useRef<SVGGElement>(null);
  const earthOrbitRef = useRef<SVGGElement>(null);
  const universeRef = useRef<SVGGElement>(null);
  const connectionRef = useRef<SVGLineElement>(null);
  const coreNodesRef = useRef<SVGGElement>(null);
  const earthNodesRef = useRef<SVGGElement>(null);

  // Current Earth position for node calculations
  const earthPosRef = useRef({ x: cx, y: cy + height * 0.15 });

  // Animate Earth rotation, orbital motion, and node orbits
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.0001;
      
      // Earth texture rotation (slow)
      if (earthRef.current) {
        earthRef.current.style.transform = `rotate(${time * 8}deg)`;
      }
      
      // Earth orbital motion around the stack
      const orbitRadius = 220;
      const orbitSpeed = time * 0.25; // Slower orbit
      const earthX = cx + Math.cos(orbitSpeed) * orbitRadius;
      const earthY = cy + height * 0.15 + Math.sin(orbitSpeed) * orbitRadius * 0.4;
      
      // Update Earth position reference
      earthPosRef.current = { x: earthX, y: earthY };
      
      if (earthOrbitRef.current) {
        earthOrbitRef.current.style.transform = `translate(${earthX - cx}px, ${earthY - (cy + height * 0.15)}px)`;
      }
      
      // Update dynamic connection line
      if (connectionRef.current) {
        connectionRef.current.setAttribute('x1', earthX.toString());
        connectionRef.current.setAttribute('y1', earthY.toString());
        connectionRef.current.setAttribute('x2', cx.toString());
        connectionRef.current.setAttribute('y2', cy.toString());
      }
      
      // Animate core nodes orbiting around the stack
      if (coreNodesRef.current) {
        const coreNodeElements = coreNodesRef.current.children;
        coreNodes.forEach((node, i) => {
          if (coreNodeElements[i]) {
            const nodeAngle = time * node.orbitSpeed + (i / coreNodes.length) * Math.PI * 2;
            const nodeX = cx + Math.cos(nodeAngle) * node.orbitRadius;
            const nodeY = cy - 60 + Math.sin(nodeAngle) * node.orbitRadius * 0.5;
            (coreNodeElements[i] as SVGElement).style.transform = `translate(${nodeX - cx}px, ${nodeY - (cy - 60)}px)`;
          }
        });
      }
      
      // Animate nodes orbiting around Earth
      if (earthNodesRef.current) {
        const earthNodeElements = earthNodesRef.current.children;
        earthNodes.forEach((node, i) => {
          if (earthNodeElements[i]) {
            const nodeAngle = time * node.orbitSpeed + node.angle;
            const nodeX = earthX + Math.cos(nodeAngle) * node.radius;
            const nodeY = earthY + Math.sin(nodeAngle) * node.radius * 0.7;
            (earthNodeElements[i] as SVGElement).style.transform = `translate(${nodeX - earthX}px, ${nodeY - earthY}px)`;
          }
        });
      }

      // Animate celestial bodies (planets and moon)
      celestialBodies.forEach((body, i) => {
        const bodyElement = document.getElementById(`celestial-${body.name}`);
        if (bodyElement) {
          const orbitAngle = time * body.orbitSpeed;
          const bodyX = cx + Math.cos(orbitAngle) * body.orbitRadius;
          const bodyY = cy + Math.sin(orbitAngle) * body.orbitRadius * 0.6;
          bodyElement.style.transform = `translate(${bodyX - cx}px, ${bodyY - cy}px)`;
        }
      });
      
      // Universe/background slow rotation
      if (universeRef.current) {
        universeRef.current.style.transform = `rotate(${time * 1.5}deg)`;
        universeRef.current.style.transformOrigin = `${cx}px ${cy}px`;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [cx, cy, height]);

  // Network nodes - enhanced with variable dynamics
  const coreNodes = useMemo(() => {
    const out: Array<{ x: number; y: number; level: number; orbitRadius: number; orbitSpeed: number; colorVariant: number; size: number; pulsePhase: number }> = [];
    
    // Core orbital nodes (around the stack)
    for (let i = 0; i < Math.floor(nodeCount * 0.6); i++) {
      const angle = (i / Math.floor(nodeCount * 0.6)) * Math.PI * 2;
      const orbitRadius = 160 + Math.sin(i * 1.8) * 30;
      const x = cx + orbitRadius * Math.cos(angle);
      const y = cy - 60 + orbitRadius * Math.sin(angle) * 0.5;
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedL = Math.sin(i * 12.345) * 43758.5453;
      const seedS = Math.sin(i * 67.891) * 43758.5453;
      const seedC = Math.sin(i * 23.456) * 43758.5453;
      const seedZ = Math.sin(i * 78.912) * 43758.5453;
      const seedP = Math.sin(i * 34.567) * 43758.5453;
      
      const level = Math.floor((seedL - Math.floor(seedL)) * 4); // Increased levels
      const orbitSpeed = 0.1 + (seedS - Math.floor(seedS)) * 0.4; // More speed variation
      const colorVariant = Math.floor((seedC - Math.floor(seedC)) * 5); // Color variants
      const size = 3 + (seedZ - Math.floor(seedZ)) * 6; // Variable node sizes
      const pulsePhase = (seedP - Math.floor(seedP)) * Math.PI * 2; // Deterministic pulse timing
      out.push({ x, y, level, orbitRadius, orbitSpeed, colorVariant, size, pulsePhase });
    }
    
    return out;
  }, [nodeCount, cx, cy]);

  // Earth orbital nodes
  const earthNodes = useMemo(() => {
    const out: Array<{ angle: number; radius: number; level: number; orbitSpeed: number; colorVariant: number; size: number; pulsePhase: number }> = [];
    
    // Nodes that orbit around Earth
    for (let i = 0; i < Math.floor(nodeCount * 0.4); i++) {
      const angle = (i / Math.floor(nodeCount * 0.4)) * Math.PI * 2;
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedR = Math.sin(i * 45.123) * 43758.5453;
      const seedL = Math.sin(i * 89.456) * 43758.5453;
      const seedS = Math.sin(i * 12.789) * 43758.5453;
      const seedC = Math.sin(i * 56.012) * 43758.5453;
      const seedZ = Math.sin(i * 34.345) * 43758.5453;
      const seedP = Math.sin(i * 78.678) * 43758.5453;
      
      const radius = 60 + (seedR - Math.floor(seedR)) * 40;
      const level = Math.floor((seedL - Math.floor(seedL)) * 4);
      const orbitSpeed = 0.2 + (seedS - Math.floor(seedS)) * 0.5; // Faster earth nodes
      const colorVariant = Math.floor((seedC - Math.floor(seedC)) * 5);
      const size = 2 + (seedZ - Math.floor(seedZ)) * 4; // Smaller earth nodes
      const pulsePhase = (seedP - Math.floor(seedP)) * Math.PI * 2;
      out.push({ angle, radius, level, orbitSpeed, colorVariant, size, pulsePhase });
    }
    
    return out;
  }, [nodeCount]);

  // Distant planets and moon
  const celestialBodies = useMemo(() => {
    return [
      { 
        name: 'moon', 
        x: cx + 300, 
        y: cy - 100, 
        radius: width * 0.06, 
        orbitRadius: 320, 
        orbitSpeed: 0.15, 
        color: '#E8E8E8',
        glowColor: '#FFFFFF'
      },
      { 
        name: 'mars', 
        x: cx - 450, 
        y: cy + 200, 
        radius: width * 0.08, 
        orbitRadius: 480, 
        orbitSpeed: 0.08, 
        color: '#CD5C5C',
        glowColor: '#FF6B6B'
      },
      { 
        name: 'jupiter', 
        x: cx + 600, 
        y: cy - 300, 
        radius: width * 0.12, 
        orbitRadius: 650, 
        orbitSpeed: 0.04, 
        color: '#DAA520',
        glowColor: '#FFD700'
      }
    ];
  }, [cx, cy, width]);

  // Enhanced multi-layer starfield
  const stars_field = useMemo(() => {
    const out: Array<{ x: number; y: number; r: number; intensity: number; layer: number }> = [];
    const totalStars = stars * 3; // Triple the star count
    
    for (let i = 0; i < totalStars; i++) {
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedL = Math.sin(i * 91.234) * 43758.5453;
      const seedX = Math.sin(i * 56.789) * 43758.5453;
      const seedY = Math.sin(i * 12.345) * 43758.5453;
      const seedR = Math.sin(i * 67.890) * 43758.5453;
      const seedI = Math.sin(i * 23.456) * 43758.5453;
      
      const layer = Math.floor((seedL - Math.floor(seedL)) * 3); // 0=distant, 1=mid, 2=near
      const baseSize = layer === 0 ? 0.3 : layer === 1 ? 0.8 : 1.2;
      const baseIntensity = layer === 0 ? 0.2 : layer === 1 ? 0.5 : 0.8;
      
      out.push({
        x: (seedX - Math.floor(seedX)) * width,
        y: (seedY - Math.floor(seedY)) * height,
        r: baseSize + (seedR - Math.floor(seedR)) * (layer + 0.5),
        intensity: baseIntensity + (seedI - Math.floor(seedI)) * 0.4,
        layer
      });
    }
    return out;
  }, [stars, width, height]);

  // Earth surface network points (relative to Earth center)
  const earthNetwork = useMemo(() => {
    const points: Array<{ x: number; y: number; intensity: number }> = [];
    const earthRadius = width * 0.15; // Smaller since Earth will orbit
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI; // Half circle for visible surface
      // Use deterministic pseudo-random based on index to avoid hydration issues
      const seedR = Math.sin(i * 98.765) * 43758.5453;
      const seedI = Math.sin(i * 43.210) * 43758.5453;
      
      const r = earthRadius * (0.9 + (seedR - Math.floor(seedR)) * 0.1);
      const x = r * Math.cos(angle);
      const y = -r * Math.sin(angle) * 0.3; // Flatten for sphere perspective
      points.push({ 
        x, 
        y, 
        intensity: 0.6 + (seedI - Math.floor(seedI)) * 0.4 
      });
    }
    return points;
  }, [width]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ background, borderRadius: 16, overflow: "hidden" }}
      className="relative"
    >
      <svg viewBox={view} width="100%" height="100%">
        <defs>
          {/* Enhanced gradients */}
          <radialGradient id="nodeGlow-v3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow} stopOpacity="1" />
            <stop offset="70%" stopColor={glow} stopOpacity="0.6" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="coreGlow-v3" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor={glow} stopOpacity="0.9" />
            <stop offset="50%" stopColor={glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          {/* Earth texture pattern */}
          <pattern id="earthTexture-v3" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill="#001122"/>
            <circle cx="20" cy="30" r="8" fill="#003366" opacity="0.6"/>
            <circle cx="70" cy="20" r="12" fill="#002244" opacity="0.4"/>
            <circle cx="50" cy="70" r="15" fill="#001133" opacity="0.8"/>
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="#004477" strokeWidth="2" fill="none" opacity="0.3"/>
          </pattern>

          <radialGradient id="earthGlow-v3" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor={glowSoft} stopOpacity="0.9" />
            <stop offset="40%" stopColor={glow} stopOpacity="0.6" />
            <stop offset="70%" stopColor={glow} stopOpacity="0.3" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="earthHalo-v3" cx="50%" cy="50%" r="90%">
            <stop offset="0%" stopColor={glow} stopOpacity="0" />
            <stop offset="60%" stopColor={glow} stopOpacity="0.4" />
            <stop offset="80%" stopColor={glowSoft} stopOpacity="0.6" />
            <stop offset="100%" stopColor={glowSoft} stopOpacity="0" />
          </radialGradient>

          <radialGradient id="earthAtmosphere-v3" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="70%" stopColor={glowSoft} stopOpacity="0.2" />
            <stop offset="90%" stopColor={glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={glow} stopOpacity="0" />
          </radialGradient>

          {/* Celestial body gradients */}
          <radialGradient id="moonGradient-v3" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F5F5F5" />
            <stop offset="60%" stopColor="#E8E8E8" />
            <stop offset="100%" stopColor="#C0C0C0" />
          </radialGradient>
          
          <radialGradient id="marsGradient-v3" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF8C69" />
            <stop offset="60%" stopColor="#CD5C5C" />
            <stop offset="100%" stopColor="#8B0000" />
          </radialGradient>
          
          <radialGradient id="jupiterGradient-v3" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFE4B5" />
            <stop offset="40%" stopColor="#DAA520" />
            <stop offset="80%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8B7355" />
          </radialGradient>

          {/* Enhanced node color variants */}
          <radialGradient id="nodeVariant0-v3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0080FF" stopOpacity="0.6" />
          </radialGradient>
          
          <radialGradient id="nodeVariant1-v3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF1744" stopOpacity="0.6" />
          </radialGradient>
          
          <radialGradient id="nodeVariant2-v3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#26A69A" stopOpacity="0.6" />
          </radialGradient>
          
          <radialGradient id="nodeVariant3-v3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF8F00" stopOpacity="0.6" />
          </radialGradient>
          
          <radialGradient id="nodeVariant4-v3" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#B39DDB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7B1FA2" stopOpacity="0.6" />
          </radialGradient>

          <linearGradient id="connection-v3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowSoft} stopOpacity="0" />
            <stop offset="50%" stopColor={glow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={glowSoft} stopOpacity="0" />
          </linearGradient>

          <filter id="glow-v3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="earthGlowFilter-v3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Space background with stars */}
        <rect width={width} height={height} fill={background}/>
        
        {/* Deep space background layer */}
        <g className="deep-space-layer" style={{ transform: 'scale(0.8)', transformOrigin: 'center', opacity: 0.3 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <circle
              key={`deep-${i}`}
              cx={Math.random() * width}
              cy={Math.random() * height}
              r={20 + Math.random() * 40}
              fill="none"
              stroke={glowSoft}
              strokeWidth="0.5"
              opacity="0.2"
              className={`deep-nebula nebula-${i % 4}`}
            />
          ))}
        </g>

        {/* Mid-space layer */}
        <g className="mid-space-layer" style={{ transform: 'scale(0.9)', transformOrigin: 'center', opacity: 0.5 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={`mid-${i}`}
              d={`M ${Math.random() * width} ${Math.random() * height} Q ${Math.random() * width} ${Math.random() * height} ${Math.random() * width} ${Math.random() * height}`}
              fill="none"
              stroke={glow}
              strokeWidth="0.3"
              opacity="0.15"
              className={`energy-stream stream-${i % 3}`}
            />
          ))}
        </g>

        {/* Universe background - enhanced multi-layer starfield */}
        <g ref={universeRef}>
          {stars_field.map((star, i) => (
            <circle 
              key={i} 
              cx={star.x} 
              cy={star.y} 
              r={star.r} 
              fill={star.layer === 2 ? glow : star.layer === 1 ? glowSoft : '#FFFFFF'} 
              opacity={star.intensity}
              className={`star star-${i % 12} star-layer-${star.layer}`}
              filter={star.layer === 2 ? "url(#glow-v3)" : undefined}
            />
          ))}
        </g>

        {/* Orbiting Earth with enhanced atmospheric effects */}
        <g ref={earthOrbitRef}>
          {/* Outer atmospheric halo */}
          <circle 
            r={width * 0.22} 
            fill="url(#earthHalo-v3)" 
            opacity="0.6"
          />
          
          {/* Middle atmospheric layer */}
          <circle 
            r={width * 0.19} 
            fill="url(#earthAtmosphere-v3)" 
            opacity="0.7"
          />
          
          {/* Inner atmosphere glow */}
          <circle 
            r={width * 0.18} 
            fill="url(#earthGlow-v3)" 
            filter="url(#earthGlowFilter-v3)" 
            opacity="0.8"
          />
          
          {/* Earth body with rotating texture */}
          <g ref={earthRef}>
            <circle r={width * 0.15} fill="url(#earthTexture-v3)" opacity="0.9"/>
            <circle r={width * 0.15} fill="#001122" opacity="0.2"/>
          </g>
          
          {/* Earth surface glow ring */}
          <circle 
            r={width * 0.16} 
            fill="none" 
            stroke={glow} 
            strokeWidth="1.5" 
            opacity="0.6"
            className="earth-rim"
          />
          
          {/* Earth network points (relative positioning) */}
          {earthNetwork.map((point, i) => (
            <g key={i}>
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="2" 
                fill={glow} 
                opacity={point.intensity}
                className={`earth-node pulse-${i % 4}`}
              />
            </g>
          ))}
          
          {/* Orbital trail */}
          <circle 
            cx={cx} 
            cy={cy + height * 0.15} 
            r="200" 
            fill="none" 
            stroke={glow} 
            strokeWidth="1" 
            opacity="0.1"
            strokeDasharray="5,10"
            className="earth-orbit-trail"
          />
        </g>

        {/* Distant celestial bodies */}
        {celestialBodies.map((body, i) => (
          <g key={body.name} id={`celestial-${body.name}`}>
            {/* Body atmosphere/glow */}
            <circle 
              r={body.radius * 1.3} 
              fill={body.glowColor} 
              opacity="0.3"
              filter="url(#glow-v3)"
            />
            
            {/* Main body */}
            <circle 
              r={body.radius} 
              fill={`url(${body.name}Gradient-v3)`} 
              opacity="0.9"
            />
            
            {/* Surface details for larger bodies */}
            {body.name === 'jupiter' && (
              <>
                <ellipse 
                  rx={body.radius * 0.8} 
                  ry={body.radius * 0.2} 
                  cy={-body.radius * 0.3}
                  fill="#8B7355" 
                  opacity="0.4"
                />
                <ellipse 
                  rx={body.radius * 0.9} 
                  ry={body.radius * 0.15} 
                  cy={body.radius * 0.2}
                  fill="#DAA520" 
                  opacity="0.3"
                />
              </>
            )}
            
            {/* Orbital trail */}
            <circle 
              cx={cx} 
              cy={cy} 
              r={body.orbitRadius} 
              fill="none" 
              stroke={body.glowColor} 
              strokeWidth="0.5" 
              opacity="0.1"
              strokeDasharray="3,15"
              className={`${body.name}-orbit-trail`}
            />
          </g>
        ))}

        {/* Dynamic connection from Earth to Core */}
        <line 
          ref={connectionRef}
          x1={cx} 
          y1={cy + height * 0.15} 
          x2={cx} 
          y2={cy} 
          stroke="url(#connection-v3)" 
          strokeWidth="3" 
          opacity="0.7"
          className="dynamic-connection"
        />

        {/* Enhanced stacked geometric core */}
        <g transform={`translate(${cx}, ${cy})`}>
          {/* Core glow */}
          <circle r="80" fill="url(#coreGlow-v3)" filter="url(#glow-v3)" opacity="0.7"/>
          
          {/* Stacked cubes/diamonds matching reference */}
          {[60, 30, 0, -30].map((yOffset, i) => (
            <g key={i} transform={`translate(0, ${yOffset})`} className={`core-level-${i}`}>
              {/* Main cube shape */}
              <path 
                d="M-25,-15 L0,-30 L25,-15 L25,15 L0,30 L-25,15 Z" 
                fill={glow} 
                fillOpacity={0.2 - i * 0.03}
                stroke={glow} 
                strokeWidth="2" 
                strokeOpacity={0.8 - i * 0.1}
                filter="url(#glow-v3)"
              />
              {/* Top face */}
              <path 
                d="M-25,-15 L0,-30 L25,-15 L0,0 Z" 
                fill={glow} 
                fillOpacity={0.4 - i * 0.05}
              />
              {/* Side face */}
              <path 
                d="M0,0 L25,-15 L25,15 L0,30 Z" 
                fill={glow} 
                fillOpacity={0.1 - i * 0.02}
              />
            </g>
          ))}
          
          {/* Central energy pillar */}
          <line 
            x1="0" 
            y1="80" 
            x2="0" 
            y2="200" 
            stroke="url(#connection-v3)" 
            strokeWidth="4" 
            opacity="0.8"
            className="central-beam"
          />
          
          {/* Core orbital rings */}
          <circle 
            r="120" 
            fill="none" 
            stroke={glow} 
            strokeWidth="1" 
            opacity="0.3" 
            strokeDasharray="3,6"
            className="core-ring-1"
          />
          <circle 
            r="180" 
            fill="none" 
            stroke={glow} 
            strokeWidth="1" 
            opacity="0.2" 
            strokeDasharray="5,10"
            className="core-ring-2"
          />
        </g>

        {/* Network nodes with enhanced connections */}
        {coreNodes.map((node: { x: number; y: number; level: number; orbitRadius: number; orbitSpeed: number; colorVariant: number; size: number; pulsePhase: number }, i: number) => (
          <g key={i}>
            {/* Enhanced connection to core */}
            <path 
              d={`M ${cx} ${cy} Q ${cx + (node.x - cx) * 0.3} ${cy - 50} ${node.x} ${node.y}`}
              fill="none" 
              stroke="url(#connection-v3)" 
              strokeWidth="2" 
              opacity="0.8"
              className={`connection connection-${i % 6}`}
            />
            
            {/* Data flow particle */}
            <circle 
              r="2" 
              fill={`url(#nodeVariant${node.colorVariant}-v3)`}
              opacity="0.9"
              className={`data-particle particle-${i % 4}`}
            >
              <animateMotion 
                dur={`${3 + (i % 3)}s`} 
                repeatCount="indefinite"
                path={`M ${cx} ${cy} Q ${cx + (node.x - cx) * 0.3} ${cy - 50} ${node.x} ${node.y}`}
              />
            </circle>
            
            {/* Enhanced node glow */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r={node.size * 2.5} 
              fill={`url(#nodeVariant${node.colorVariant}-v3)`} 
              opacity="0.6"
              className={`node-glow glow-${node.colorVariant}`}
            />
            
            {/* Node core with variable size */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r={node.size} 
              fill={`url(#nodeVariant${node.colorVariant}-v3)`} 
              className={`node-pulse pulse-${node.level} variant-${node.colorVariant}`}
            />
            
            {/* Dynamic node ring */}
            <circle 
              cx={node.x} 
              cy={node.y} 
              r={node.size * 1.8} 
              fill="none" 
              stroke={`url(#nodeVariant${node.colorVariant}-v3)`} 
              strokeWidth="1.5" 
              opacity="0.7"
              className={`node-ring ring-${node.colorVariant} ring-pulse-${i % 4}`}
            />
          </g>
        ))}

        {/* Earth orbital nodes */}
        <g ref={earthNodesRef}>
          {earthNodes.map((node, i) => (
            <g key={`earth-node-${i}`}>
              {/* Connection to Earth */}
              <path 
                d={`M ${cx} ${cy + height * 0.15} Q ${cx + Math.cos(node.angle) * node.radius * 0.5} ${cy + height * 0.15 - 30} ${cx + Math.cos(node.angle) * node.radius} ${cy + height * 0.15 + Math.sin(node.angle) * node.radius * 0.7}`}
                fill="none" 
                stroke="url(#connection-v3)" 
                strokeWidth="1" 
                opacity="0.4"
                className={`earth-connection connection-${i % 4}`}
              />
              
              {/* Node glow */}
              <circle 
                cx={cx + Math.cos(node.angle) * node.radius} 
                cy={cy + height * 0.15 + Math.sin(node.angle) * node.radius * 0.7} 
                r="12" 
                fill="url(#nodeGlow-v3)" 
                opacity="0.6"
              />
              
              {/* Enhanced node core */}
              <circle 
                cx={cx + Math.cos(node.angle) * node.radius} 
                cy={cy + height * 0.15 + Math.sin(node.angle) * node.radius * 0.7} 
                r={node.size} 
                fill={`url(#nodeVariant${node.colorVariant}-v3)`} 
                className={`earth-node-pulse pulse-${node.level} variant-${node.colorVariant}`}
              />
              
              {/* Enhanced node ring */}
              <circle 
                cx={cx + Math.cos(node.angle) * node.radius} 
                cy={cy + height * 0.15 + Math.sin(node.angle) * node.radius * 0.7} 
                r={node.size * 1.6} 
                fill="none" 
                stroke={`url(#nodeVariant${node.colorVariant}-v3)`} 
                strokeWidth="1.2" 
                opacity="0.6"
                className={`earth-node-ring ring-${node.colorVariant} earth-ring-pulse-${i % 3}`}
              />
            </g>
          ))}
        </g>
      </svg>

      <style jsx>{`
        .star { animation: twinkle 3s ease-in-out infinite; }
        .star-0 { animation-delay: 0s; animation-duration: 2.5s; }
        .star-1 { animation-delay: 0.3s; animation-duration: 3.2s; }
        .star-2 { animation-delay: 0.6s; animation-duration: 4.1s; }
        .star-3 { animation-delay: 0.9s; animation-duration: 2.8s; }
        .star-4 { animation-delay: 1.2s; animation-duration: 3.7s; }
        .star-5 { animation-delay: 1.5s; animation-duration: 4.5s; }
        .star-6 { animation-delay: 1.8s; animation-duration: 3.1s; }
        .star-7 { animation-delay: 2.1s; animation-duration: 5.2s; }

        .earth-rim { animation: glow-pulse 4s ease-in-out infinite; }
        .earth-connection { animation: data-flow 3s linear infinite; }
        .earth-node-pulse { animation: earth-node-pulse 2.5s ease-in-out infinite; }
        .earth-node-ring { animation: earth-ring-pulse 3.5s ease-in-out infinite; }

        /* Enhanced node animations */
        .node-glow { animation: node-glow-pulse 3s ease-in-out infinite; }
        .glow-0 { animation-delay: 0s; }
        .glow-1 { animation-delay: 0.6s; }
        .glow-2 { animation-delay: 1.2s; }
        .glow-3 { animation-delay: 1.8s; }
        .glow-4 { animation-delay: 2.4s; }

        .ring-pulse-0 { animation: ring-pulse-0 2s ease-in-out infinite; }
        .ring-pulse-1 { animation: ring-pulse-1 2.3s ease-in-out infinite; }
        .ring-pulse-2 { animation: ring-pulse-2 2.7s ease-in-out infinite; }
        .ring-pulse-3 { animation: ring-pulse-3 3.1s ease-in-out infinite; }

        /* Star layer animations */
        .star-layer-0 { animation: distant-twinkle 4s ease-in-out infinite; }
        .star-layer-1 { animation: mid-twinkle 3s ease-in-out infinite; }
        .star-layer-2 { animation: near-twinkle 2s ease-in-out infinite; }

        /* Depth layer animations */
        .deep-space-layer { animation: deep-drift 30s linear infinite; }
        .mid-space-layer { animation: mid-drift 20s linear infinite reverse; }
        
        .deep-nebula { animation: nebula-pulse 8s ease-in-out infinite; }
        .nebula-0 { animation-delay: 0s; }
        .nebula-1 { animation-delay: 2s; }
        .nebula-2 { animation-delay: 4s; }
        .nebula-3 { animation-delay: 6s; }
        
        .energy-stream { animation: stream-flow 6s ease-in-out infinite; }
        .stream-0 { animation-delay: 0s; }
        .stream-1 { animation-delay: 2s; }
        .stream-2 { animation-delay: 4s; }
        
        .data-particle { animation: particle-pulse 2s ease-in-out infinite; }
        .particle-0 { animation-delay: 0s; }
        .particle-1 { animation-delay: 0.5s; }
        .particle-2 { animation-delay: 1s; }
        .particle-3 { animation-delay: 1.5s; }
        .earth-node { animation: pulse 2s ease-in-out infinite; }
        .earth-connection { animation: flow 3s linear infinite; }
        .orbital-trail { animation: orbit-glow 6s ease-in-out infinite; }
        .dynamic-connection { animation: energy-pulse 2s ease-in-out infinite; }

        .pulse-0 { animation-delay: 0s; }
        .pulse-1 { animation-delay: 0.5s; }
        .pulse-2 { animation-delay: 1s; }
        .pulse-3 { animation-delay: 1.5s; }

        .core-level-0 { animation: float 6s ease-in-out infinite; }
        .core-level-1 { animation: float 6s ease-in-out infinite 0.5s; }
        .core-level-2 { animation: float 6s ease-in-out infinite 1s; }
        .core-level-3 { animation: float 6s ease-in-out infinite 1.5s; }

        .central-beam { animation: beam-pulse 3s ease-in-out infinite; }
        .core-ring-1 { animation: ring-rotate 20s linear infinite; }
        .core-ring-2 { animation: ring-rotate 30s linear infinite reverse; }

        .node-pulse { animation: node-pulse 2.5s ease-in-out infinite; }
        .node-ring { animation: ring-expand 4s ease-in-out infinite; }

        .connection { animation: data-flow 5s linear infinite; }
        .connection-0 { animation-delay: 0s; }
        .connection-1 { animation-delay: 0.8s; }
        .connection-2 { animation-delay: 1.6s; }
        .connection-3 { animation-delay: 2.4s; }
        .connection-4 { animation-delay: 3.2s; }
        .connection-5 { animation-delay: 4s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes glow-pulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.8; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-8px) rotateY(180deg); }
        }

        @keyframes beam-pulse {
          0%, 100% { stroke-opacity: 0.3; }
          50% { stroke-opacity: 0.9; }
        }

        @keyframes node-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @keyframes ring-expand {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes data-flow {
          0% { stroke-dasharray: 0 100; }
          50% { stroke-dasharray: 50 50; }
          100% { stroke-dasharray: 100 0; }
        }

        @keyframes flow {
          0% { opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { opacity: 0.2; }
        }

        @keyframes orbit-glow {
          0%, 100% { stroke-opacity: 0.1; }
          50% { stroke-opacity: 0.4; }
        }

        @keyframes energy-pulse {
          0%, 100% { stroke-opacity: 0.3; stroke-width: 2; }
          50% { stroke-opacity: 0.9; stroke-width: 4; }
        }

        @keyframes ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes earth-node-pulse {
          0%, 100% { opacity: 0.8; r: 3; }
          50% { opacity: 1; r: 4; }
        }

        @keyframes earth-ring-pulse {
          0%, 100% { opacity: 0.4; stroke-width: 1; }
          50% { opacity: 0.7; stroke-width: 1.5; }
        }

        @keyframes node-glow-pulse {
          0%, 100% { opacity: 0.4; r: attr(r); }
          50% { opacity: 0.8; r: calc(attr(r) * 1.2); }
        }

        @keyframes ring-pulse-0 {
          0%, 100% { opacity: 0.7; stroke-width: 1.5; }
          50% { opacity: 1; stroke-width: 2; }
        }

        @keyframes ring-pulse-1 {
          0%, 100% { opacity: 0.6; stroke-width: 1.2; }
          50% { opacity: 0.9; stroke-width: 1.8; }
        }

        @keyframes ring-pulse-2 {
          0%, 100% { opacity: 0.5; stroke-width: 1; }
          50% { opacity: 0.8; stroke-width: 1.6; }
        }

        @keyframes ring-pulse-3 {
          0%, 100% { opacity: 0.4; stroke-width: 0.8; }
          50% { opacity: 0.7; stroke-width: 1.4; }
        }

        @keyframes distant-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        @keyframes mid-twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        @keyframes near-twinkle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes deep-drift {
          0% { transform: scale(0.8) rotate(0deg); }
          100% { transform: scale(0.8) rotate(360deg); }
        }

        @keyframes mid-drift {
          0% { transform: scale(0.9) rotate(0deg); }
          100% { transform: scale(0.9) rotate(-360deg); }
        }

        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.1; stroke-width: 0.5; }
          50% { opacity: 0.3; stroke-width: 1; }
        }

        @keyframes stream-flow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }

        @keyframes particle-pulse {
          0%, 100% { opacity: 0.9; r: 2; }
          50% { opacity: 1; r: 3; }
        }
      `}</style>
    </motion.div>
  );
}