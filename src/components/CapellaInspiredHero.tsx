"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * CapellaInspiredHero - Satellite Intelligence Platform Hero
 * 
 * Inspired by Capella Space's clean, professional design with:
 * - Large hero section with satellite imagery overlay
 * - Subtle orbital animations
 * - Clean typography and modern layout
 * - Real-time data visualization elements
 * - Professional aerospace aesthetic
 */
export default function CapellaInspiredHero({
  width = 1920,
  height = 1080,
  glow = "#00A8FF",
  glowSoft = "#7FD3FF",
}: {
  width?: number;
  height?: number;
  glow?: string;
  glowSoft?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Avoid hydration issues by ensuring this only runs on client
    if (typeof window === 'undefined' || !isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const satellites: Array<{
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
    }> = [];

    // Bouncing intelligence nodes
    const bouncingNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseRadius: number;
      angle: number;
      bounceSpeed: number;
    }> = [];

    // Floating celestial bodies
    const celestialBodies: Array<{
      x: number;
      y: number;
      radius: number;
      orbitRadius: number;
      orbitSpeed: number;
      color: string;
      glowColor: string;
      angle: number;
    }> = [];

    // Background stars
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
    }> = [];

    // Right-side orbital dynamics system
    const orbitalNodes: Array<{
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      level: number;
    }> = [];

    // Floating intelligence particles - signals emanating from nodes
    const intelligenceParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      opacity: number;
      sourceType: 'satellite' | 'node' | 'orbital';
    }> = [];

    // Background motion particles for dynamic atmosphere
    const atmosphereParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      depth: number; // for parallax effect
    }> = [];

    // Initialize satellites with deterministic values to avoid hydration issues - now using celestial body orbits
    const rect = canvas.getBoundingClientRect();
    const orbitalCenter = { x: rect.width * 0.8, y: rect.height * 0.3 };
    const satelliteData = [
      { radius: 400, speed: 0.01, size: rect.width * 0.005, opacity: 0.4 },
      { radius: 500, speed: 0.008, size: rect.width * 0.004, opacity: 0.35 },
      { radius: 350, speed: 0.012, size: rect.width * 0.003, opacity: 0.45 },
      { radius: 600, speed: 0.006, size: rect.width * 0.006, opacity: 0.3 },
      { radius: 320, speed: 0.014, size: rect.width * 0.0035, opacity: 0.4 },
      { radius: 550, speed: 0.007, size: rect.width * 0.0045, opacity: 0.35 },
      { radius: 450, speed: 0.009, size: rect.width * 0.004, opacity: 0.38 },
      { radius: 380, speed: 0.011, size: rect.width * 0.0038, opacity: 0.42 }
    ];
    
    satelliteData.forEach((data, i) => {
      satellites.push({
        x: orbitalCenter.x,
        y: orbitalCenter.y,
        angle: (i / satelliteData.length) * Math.PI * 2,
        radius: data.radius,
        speed: data.speed,
        size: data.size,
        opacity: data.opacity
      });
    });

    // Initialize bouncing nodes with deterministic values
    for (let i = 0; i < 12; i++) {
      const baseRadius = 180 + (i * 23) % 120; // Deterministic radius variation
      const angle = (i / 12) * Math.PI * 2;
      const bounceSpeed = 0.01 + (i * 0.002);
      
      bouncingNodes.push({
        x: rect.width / 2 + Math.cos(angle) * baseRadius,
        y: rect.height / 2 + Math.sin(angle) * baseRadius,
        vx: ((i % 3) - 1) * 0.5, // Deterministic velocity
        vy: ((i % 2) - 0.5) * 0.3,
        size: 1.5 + (i % 4) * 0.5,
        opacity: 0.4 + (i * 0.03),
        baseRadius: baseRadius,
        angle: angle,
        bounceSpeed: bounceSpeed
      });
    }

    // Initialize floating celestial bodies - now using tight satellite orbits around center
    for (let i = 0; i < 8; i++) {
      celestialBodies.push({
        x: rect.width / 2,
        y: rect.height / 2,
        radius: rect.width * (0.008 + (i % 3) * 0.004), // Varied sizes
        orbitRadius: 200 + i * 60 + (i * 13) % 40, // Use original satellite orbital pattern
        orbitSpeed: 0.002 + (i * 0.0001), // Use original satellite speeds
        color: '#4169E1',
        glowColor: '#87CEEB',
        angle: (i / 8) * Math.PI * 2
      });
    }

    // Initialize background stars - reduced and more subtle
    for (let i = 0; i < 30; i++) {
      const seedX = Math.sin(i * 15.789) * 43758.5453;
      const seedY = Math.sin(i * 68.432) * 43758.5453;
      const seedS = Math.sin(i * 32.156) * 43758.5453;
      const seedO = Math.sin(i * 79.321) * 43758.5453;
      const seedP = Math.sin(i * 41.678) * 43758.5453;
      const seedT = Math.sin(i * 83.245) * 43758.5453;

      stars.push({
        x: (seedX - Math.floor(seedX)) * rect.width,
        y: (seedY - Math.floor(seedY)) * rect.height,
        size: 0.3 + (seedS - Math.floor(seedS)) * 0.8, // Smaller stars
        opacity: 0.1 + (seedO - Math.floor(seedO)) * 0.3, // Much more subtle
        twinklePhase: (seedP - Math.floor(seedP)) * Math.PI * 2,
        twinkleSpeed: 0.005 + (seedT - Math.floor(seedT)) * 0.01 // Slower twinkle
      });
    }

    // Initialize compact rotating orbital system
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const level = Math.floor(i / 2); // 2 nodes per level
      const baseRadius = 60 + level * 25;
      
      orbitalNodes.push({
        x: orbitalCenter.x,
        y: orbitalCenter.y,
        angle: angle,
        radius: baseRadius,
        speed: 0.02 - level * 0.005, // Inner orbits faster
        size: 2 - level * 0.3,
        opacity: 0.8 - level * 0.1,
        level: level
      });
    }

    // Initialize atmosphere particles for background motion
    for (let i = 0; i < 50; i++) {
      const seedX = Math.sin(i * 23.456) * 43758.5453;
      const seedY = Math.sin(i * 78.123) * 43758.5453;
      const seedVX = Math.sin(i * 45.789) * 43758.5453;
      const seedVY = Math.sin(i * 67.234) * 43758.5453;
      const seedS = Math.sin(i * 89.456) * 43758.5453;
      const seedO = Math.sin(i * 12.789) * 43758.5453;
      const seedD = Math.sin(i * 34.567) * 43758.5453;

      atmosphereParticles.push({
        x: (seedX - Math.floor(seedX)) * rect.width,
        y: (seedY - Math.floor(seedY)) * rect.height,
        vx: ((seedVX - Math.floor(seedVX)) - 0.5) * 0.5,
        vy: ((seedVY - Math.floor(seedVY)) - 0.5) * 0.5,
        size: 0.5 + (seedS - Math.floor(seedS)) * 2,
        opacity: 0.1 + (seedO - Math.floor(seedO)) * 0.3,
        depth: (seedD - Math.floor(seedD)) // 0 to 1, for parallax
      });
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Create deep black background like Capella's studio aesthetic
      const gradient = ctx.createRadialGradient(
        rect.width / 2, rect.height / 2, 0, 
        rect.width / 2, rect.height / 2, Math.max(rect.width, rect.height)
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.6, 'rgba(5, 5, 5, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add subtle film grain texture for studio quality
      ctx.globalAlpha = 0.015;
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = Math.random() * 0.3;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Draw background stars with twinkling effect
      stars.forEach((star, i) => {
        const twinkle = 1 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3;
        const starOpacity = star.opacity * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * twinkle, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw atmosphere particles with parallax effect
      atmosphereParticles.forEach((particle, i) => {
        // Update position with depth-based parallax
        const depthMultiplier = 0.5 + particle.depth * 0.5;
        particle.x += particle.vx * depthMultiplier;
        particle.y += particle.vy * depthMultiplier;

        // Wrap around screen edges
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;

        // Draw particle with depth-based opacity
        const finalOpacity = particle.opacity * (0.3 + particle.depth * 0.7);
        const particleSize = particle.size * (0.5 + particle.depth * 0.5);
        
        ctx.fillStyle = `rgba(59, 130, 246, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow for deeper particles
        if (particle.depth > 0.7) {
          const glowRadius = particleSize * 3;
          const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowRadius);
          glowGradient.addColorStop(0, `rgba(59, 130, 246, ${finalOpacity * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw orbital paths
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.1)';
      ctx.lineWidth = 1;
      satellites.forEach(sat => {
        ctx.beginPath();
        ctx.arc(rect.width / 2, rect.height / 2, sat.radius, 0, Math.PI * 2);
        ctx.setLineDash([5, 10]);
        ctx.stroke();
      });

      // Update and draw satellites
      satellites.forEach((sat, i) => {
        sat.angle += sat.speed;
        sat.x = orbitalCenter.x + Math.cos(sat.angle) * sat.radius;
        sat.y = orbitalCenter.y + Math.sin(sat.angle) * sat.radius;

        // Draw satellite glow
        const glowGradient = ctx.createRadialGradient(sat.x, sat.y, 0, sat.x, sat.y, sat.size * 4);
        glowGradient.addColorStop(0, `rgba(0, 168, 255, ${sat.opacity})`);
        glowGradient.addColorStop(1, 'rgba(0, 168, 255, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, sat.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw satellite core
        ctx.fillStyle = `rgba(0, 168, 255, ${sat.opacity + 0.3})`;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, sat.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection to center (data transmission)
        if (i % 2 === 0) {
          const connectionOpacity = 0.1 + 0.1 * Math.sin(time * 0.01 + i);
          ctx.strokeStyle = `rgba(127, 211, 255, ${connectionOpacity})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(rect.width / 2, rect.height / 2);
          ctx.lineTo(sat.x, sat.y);
          ctx.stroke();
        }

        // Generate intelligence particles from satellites (signals)
        if (Math.random() < 0.05) { // 5% chance per frame
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 1.5;
          intelligenceParticles.push({
            x: sat.x,
            y: sat.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 60 + Math.random() * 120,
            size: 0.8 + Math.random() * 1.2,
            opacity: 0.6 + Math.random() * 0.4,
            sourceType: 'satellite'
          });
        }
      });

      // Update and draw bouncing intelligence nodes
      bouncingNodes.forEach((node, i) => {
        // Update bouncing motion with orbital influence
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distFromCenter = Math.sqrt((node.x - centerX) ** 2 + (node.y - centerY) ** 2);
        
        // Add orbital influence to keep nodes in the satellite zone
        const orbitalInfluence = 0.001;
        const targetRadius = node.baseRadius + Math.sin(time * node.bounceSpeed + i) * 40;
        
        if (distFromCenter > targetRadius + 50) {
          // Pull back towards orbit
          const pullX = (centerX - node.x) * orbitalInfluence;
          const pullY = (centerY - node.y) * orbitalInfluence;
          node.vx += pullX;
          node.vy += pullY;
        } else if (distFromCenter < targetRadius - 50) {
          // Push away from center
          const pushX = (node.x - centerX) * orbitalInfluence;
          const pushY = (node.y - centerY) * orbitalInfluence;
          node.vx += pushX;
          node.vy += pushY;
        }

        // Add some randomized bounce behavior
        node.vx += Math.sin(time * 0.01 + i * 1.7) * 0.02;
        node.vy += Math.cos(time * 0.013 + i * 2.3) * 0.02;
        
        // Apply damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bouncing
        const margin = 100;
        if (node.x < margin || node.x > rect.width - margin) {
          node.vx *= -0.8;
          node.x = Math.max(margin, Math.min(rect.width - margin, node.x));
        }
        if (node.y < margin || node.y > rect.height - margin) {
          node.vy *= -0.8;
          node.y = Math.max(margin, Math.min(rect.height - margin, node.y));
        }

        // Draw bouncing node with pulsing effect
        const pulseScale = 1 + Math.sin(time * 0.05 + i * 0.8) * 0.3;
        const nodeSize = node.size * pulseScale;
        
        // Draw glow
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 6);
        nodeGlow.addColorStop(0, `rgba(0, 168, 255, ${node.opacity * 0.6})`);
        nodeGlow.addColorStop(0.7, `rgba(127, 211, 255, ${node.opacity * 0.3})`);
        nodeGlow.addColorStop(1, 'rgba(0, 168, 255, 0)');
        
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(0, 168, 255, ${node.opacity + 0.4})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections between nearby bouncing nodes
        bouncingNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2);
            if (distance < 150) {
              const connectionOpacity = (1 - distance / 150) * 0.15;
              ctx.strokeStyle = `rgba(127, 211, 255, ${connectionOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.setLineDash([1, 3]);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Generate intelligence particles from bouncing nodes
        if (Math.random() < 0.03) { // 3% chance per frame per node
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 1.0;
          intelligenceParticles.push({
            x: node.x,
            y: node.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 80 + Math.random() * 100,
            size: 0.6 + Math.random() * 0.8,
            opacity: 0.4 + Math.random() * 0.3,
            sourceType: 'node'
          });
        }
      });

      // Update and draw floating celestial bodies
      celestialBodies.forEach((body, i) => {
        // Update orbital position
        body.angle += body.orbitSpeed;
        body.x = rect.width / 2 + Math.cos(body.angle) * body.orbitRadius;
        body.y = rect.height / 2 + Math.sin(body.angle) * body.orbitRadius;

        // Draw celestial body glow - more subtle
        const bodyGlow = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, body.radius * 3);
        bodyGlow.addColorStop(0, body.glowColor + '50'); // Reduced from 80 to 50
        bodyGlow.addColorStop(0.7, body.glowColor + '20'); // Reduced from 40 to 20
        bodyGlow.addColorStop(1, body.glowColor + '00'); // Fully transparent
        
        ctx.fillStyle = bodyGlow;
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw celestial body core with subtle pulsing - more transparent
        const pulseScale = 1 + Math.sin(time * 0.02 + i * 1.5) * 0.1;
        ctx.fillStyle = body.color + '60'; // Make the core more transparent (60 = 37% opacity)
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Add a subtle inner glow - lighter
        const innerGlow = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, body.radius);
        innerGlow.addColorStop(0, body.glowColor + '80'); // Reduced from FF to 80
        innerGlow.addColorStop(1, body.color + '40'); // Reduced from 80 to 40
        
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius * pulseScale * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw compact rotating orbital system 
      // First draw the orbital rings
      for (let level = 0; level < 4; level++) {
        const ringRadius = 60 + level * 25;
        ctx.strokeStyle = `rgba(0, 168, 255, ${0.08 - level * 0.01})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(orbitalCenter.x, orbitalCenter.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update and draw orbiting nodes
      orbitalNodes.forEach((node, i) => {
        // Update orbital position with smooth rotation
        node.angle += node.speed;
        node.x = orbitalCenter.x + Math.cos(node.angle) * node.radius;
        node.y = orbitalCenter.y + Math.sin(node.angle) * node.radius;

        // Draw node with trailing effect
        const trailLength = 8;
        for (let t = 0; t < trailLength; t++) {
          const trailAngle = node.angle - (t * 0.05);
          const trailX = orbitalCenter.x + Math.cos(trailAngle) * node.radius;
          const trailY = orbitalCenter.y + Math.sin(trailAngle) * node.radius;
          const trailOpacity = node.opacity * (1 - t / trailLength) * 0.3;
          const trailSize = node.size * (1 - t / trailLength * 0.7);

          ctx.fillStyle = `rgba(0, 168, 255, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw main node with glow
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3);
        nodeGlow.addColorStop(0, `rgba(0, 168, 255, ${node.opacity})`);
        nodeGlow.addColorStop(0.7, `rgba(127, 211, 255, ${node.opacity * 0.5})`);
        nodeGlow.addColorStop(1, 'rgba(0, 168, 255, 0)');
        
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${node.opacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central hub with pulsing effect
      const pulseIntensity = 1 + Math.sin(time * 0.03) * 0.2;
      const centerGlow = ctx.createRadialGradient(orbitalCenter.x, orbitalCenter.y, 0, orbitalCenter.x, orbitalCenter.y, 30 * pulseIntensity);
      centerGlow.addColorStop(0, `rgba(0, 168, 255, ${0.9 * pulseIntensity})`);
      centerGlow.addColorStop(0.5, `rgba(127, 211, 255, ${0.5 * pulseIntensity})`);
      centerGlow.addColorStop(1, 'rgba(0, 168, 255, 0)');
      
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(orbitalCenter.x, orbitalCenter.y, 30 * pulseIntensity, 0, Math.PI * 2);
      ctx.fill();

      // Central core
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * pulseIntensity})`;
      ctx.beginPath();
      ctx.arc(orbitalCenter.x, orbitalCenter.y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw central stacked cube structure with floating animation
      const baseX = rect.width / 2 + (rect.width * 0.1); // Shift 10% to the right
      const baseY = rect.height / 2;
      
      // Add floating motion to the right and back
      const floatOffset = Math.sin(time * 0.003) * 40; // Slow, gentle floating motion
      const centerX = baseX + floatOffset;
      const centerY = baseY;
      const stackRotation = time * 0.005;
      
      // Draw multiple stacked cubes with different sizes and rotations - 20% larger sizes
      const cubes = [
        { size: 108, yOffset: -135, rotation: stackRotation, opacity: 0.9 }, // 90 * 1.2
        { size: 168, yOffset: -45, rotation: stackRotation * 0.7, opacity: 0.8 }, // 140 * 1.2
        { size: 240, yOffset: 45, rotation: stackRotation * 0.5, opacity: 0.7 }, // 200 * 1.2
        { size: 132, yOffset: 135, rotation: stackRotation * 0.3, opacity: 0.6 } // 110 * 1.2
      ];
      
      cubes.forEach((cube, index) => {
        const cubeX = centerX;
        const cubeY = centerY + cube.yOffset;
        
        // Create 3D cube effect with multiple faces
        ctx.save();
        ctx.translate(cubeX, cubeY);
        ctx.rotate(cube.rotation);
        
        // Draw cube faces with different shades for 3D effect - purplish theme
        // Front face
        const frontGradient = ctx.createLinearGradient(-cube.size/2, -cube.size/2, cube.size/2, cube.size/2);
        frontGradient.addColorStop(0, `rgba(65, 105, 225, ${cube.opacity})`);
        frontGradient.addColorStop(1, `rgba(75, 85, 206, ${cube.opacity * 0.8})`);
        
        ctx.fillStyle = frontGradient;
        ctx.fillRect(-cube.size/2, -cube.size/2, cube.size, cube.size);
        
        // Top face (lighter)
        const depthOffset = Math.max(25, cube.size * 0.2); // Scale depth with cube size
        ctx.fillStyle = `rgba(135, 206, 235, ${cube.opacity * 0.9})`;
        ctx.beginPath();
        ctx.moveTo(-cube.size/2, -cube.size/2);
        ctx.lineTo(-cube.size/2 + depthOffset, -cube.size/2 - depthOffset);
        ctx.lineTo(cube.size/2 + depthOffset, -cube.size/2 - depthOffset);
        ctx.lineTo(cube.size/2, -cube.size/2);
        ctx.closePath();
        ctx.fill();
        
        // Right face (darker)
        ctx.fillStyle = `rgba(48, 25, 132, ${cube.opacity * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(cube.size/2, -cube.size/2);
        ctx.lineTo(cube.size/2 + depthOffset, -cube.size/2 - depthOffset);
        ctx.lineTo(cube.size/2 + depthOffset, cube.size/2 - depthOffset);
        ctx.lineTo(cube.size/2, cube.size/2);
        ctx.closePath();
        ctx.fill();
        
        // Add glow effect around each cube
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cube.size * 1.8);
        glowGradient.addColorStop(0, `rgba(135, 206, 235, ${cube.opacity * 0.4})`);
        glowGradient.addColorStop(1, 'rgba(135, 206, 235, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, cube.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Add wireframe edges for more detail
        ctx.strokeStyle = `rgba(255, 255, 255, ${cube.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-cube.size/2, -cube.size/2, cube.size, cube.size);
        
        ctx.restore();
        
        // Draw energy beams connecting the cubes
        if (index < cubes.length - 1) {
          const nextCube = cubes[index + 1];
          const beamOpacity = 0.4 + 0.3 * Math.sin(time * 0.02 + index);
          
          ctx.strokeStyle = `rgba(135, 206, 235, ${beamOpacity})`;
          ctx.lineWidth = 3;
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(cubeX, cubeY + cube.size/2);
          ctx.lineTo(centerX, centerY + nextCube.yOffset - nextCube.size/2);
          ctx.stroke();
        }
      });
      
      // Draw central energy core at the heart of the stack - much larger and purple themed
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 70);
      coreGlow.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
      coreGlow.addColorStop(0.3, `rgba(135, 206, 235, 0.8)`);
      coreGlow.addColorStop(0.7, `rgba(65, 105, 225, 0.6)`);
      coreGlow.addColorStop(1, 'rgba(65, 105, 225, 0)');
      
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw intelligence particles (floating signals)
      for (let i = intelligenceParticles.length - 1; i >= 0; i--) {
        const particle = intelligenceParticles[i];
        particle.life++;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply slight drift and deceleration
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        particle.vy += 0.01; // slight gravity effect
        
        // Calculate life-based properties
        const lifeRatio = particle.life / particle.maxLife;
        const fadeIn = Math.min(particle.life / 10, 1); // Fade in over 10 frames
        const fadeOut = lifeRatio > 0.7 ? 1 - ((lifeRatio - 0.7) / 0.3) : 1; // Fade out in last 30%
        const currentOpacity = particle.opacity * fadeIn * fadeOut;
        const currentSize = particle.size * (1 - lifeRatio * 0.5); // Shrink over time
        
        // Remove dead particles
        if (particle.life >= particle.maxLife || currentOpacity <= 0.01) {
          intelligenceParticles.splice(i, 1);
          continue;
        }
        
        // Draw particle based on source type
        if (particle.sourceType === 'satellite') {
          // Satellite particles: bright blue with pulsing effect
          const pulse = 1 + Math.sin(time * 0.1 + particle.life * 0.2) * 0.3;
          const glowSize = currentSize * 4 * pulse;
          
          // Glow
          const particleGlow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize);
          particleGlow.addColorStop(0, `rgba(0, 168, 255, ${currentOpacity * 0.8})`);
          particleGlow.addColorStop(0.5, `rgba(127, 211, 255, ${currentOpacity * 0.4})`);
          particleGlow.addColorStop(1, 'rgba(0, 168, 255, 0)');
          
          ctx.fillStyle = particleGlow;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Core
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
          
        } else if (particle.sourceType === 'node') {
          // Node particles: softer cyan with trailing effect
          const trail = Math.max(0, 1 - lifeRatio * 2);
          
          // Draw trailing effect
          if (trail > 0) {
            ctx.strokeStyle = `rgba(127, 211, 255, ${currentOpacity * trail * 0.5})`;
            ctx.lineWidth = currentSize * 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
          }
          
          // Core particle
          ctx.fillStyle = `rgba(127, 211, 255, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw bouncing data nodes around the floating stack
      const dataNodeCount = 12;
      for (let i = 0; i < dataNodeCount; i++) {
        const baseAngle = (i / dataNodeCount) * Math.PI * 2;
        const baseRadius = 120 + Math.sin(time * 0.015 + i * 0.8) * 30; // Pulsing radius
        
        // Add bouncing motion with different frequencies for each node
        const bounceX = Math.sin(time * 0.008 + i * 1.2) * 25;
        const bounceY = Math.cos(time * 0.012 + i * 0.9) * 20;
        
        const nodeX = centerX + Math.cos(baseAngle) * baseRadius + bounceX;
        const nodeY = centerY + Math.sin(baseAngle) * baseRadius + bounceY;
        
        // Node size varies with time
        const nodeSize = 3 + Math.sin(time * 0.02 + i * 1.5) * 1.5;
        const nodeOpacity = 0.6 + Math.sin(time * 0.025 + i * 2.1) * 0.3;
        
        // Draw node glow
        const dataNodeGlow = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, nodeSize * 4);
        dataNodeGlow.addColorStop(0, `rgba(0, 168, 255, ${nodeOpacity * 0.8})`);
        dataNodeGlow.addColorStop(0.5, `rgba(127, 211, 255, ${nodeOpacity * 0.4})`);
        dataNodeGlow.addColorStop(1, 'rgba(0, 168, 255, 0)');
        
        ctx.fillStyle = dataNodeGlow;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, nodeSize * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node core
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connection to stack center with pulsing effect
        const connectionOpacity = 0.15 + 0.1 * Math.sin(time * 0.03 + i * 0.7);
        ctx.strokeStyle = `rgba(127, 211, 255, ${connectionOpacity})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeX, nodeY);
        ctx.stroke();
        
        // Draw connections between nearby data nodes
        for (let j = i + 1; j < Math.min(i + 3, dataNodeCount); j++) {
          const otherBaseAngle = (j / dataNodeCount) * Math.PI * 2;
          const otherBaseRadius = 120 + Math.sin(time * 0.015 + j * 0.8) * 30;
          const otherBounceX = Math.sin(time * 0.008 + j * 1.2) * 25;
          const otherBounceY = Math.cos(time * 0.012 + j * 0.9) * 20;
          
          const otherNodeX = centerX + Math.cos(otherBaseAngle) * otherBaseRadius + otherBounceX;
          const otherNodeY = centerY + Math.sin(otherBaseAngle) * otherBaseRadius + otherBounceY;
          
          const distance = Math.sqrt((nodeX - otherNodeX) ** 2 + (nodeY - otherNodeY) ** 2);
          if (distance < 100) {
            const linkOpacity = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = `rgba(59, 130, 246, ${linkOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(otherNodeX, otherNodeY);
            ctx.stroke();
          }
        }
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, isMounted]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="relative z-20 flex justify-between items-center px-12 py-6">
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo-blue.png" 
            alt="Noir Stack Logo" 
            width={48}
            height={48}
            className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
          />
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
            NOIR<span className="text-blue-400">STACK</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-[family-name:var(--font-inter)]">
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('lab')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Lab
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </a>
            {activeTooltip === 'lab' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Discover prototypes and experimental projects focused on pushing the boundaries of innovation and future advancements.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('solutions')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a href="/solutions" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Solutions
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </a>
            {activeTooltip === 'solutions' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Explore a range of tailored services designed to solve complex challenges through innovative technology and customized solutions.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setActiveTooltip('hub')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <a href="/hub" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
              Hub
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
            </a>
            {activeTooltip === 'hub' && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 w-80 z-50">
                <p className="text-sm text-white/90 leading-relaxed">
                  Explore a centralized space for resources, documentation, and community tools, designed for collaboration and continuous engagement.
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-blue-400/30 rotate-45"></div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowContactModal(true)}
            className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group"
          >
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </button>
          
          <button 
            onClick={() => setShowSubscribeModal(true)}
            className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group"
          >
            Subscribe
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </button>
        </nav>
      </header>

      {/* Animated Canvas Background - only render when mounted */}
      {isMounted && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Subtle blue atmospheric overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 75% 25%, rgba(147, 197, 253, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 70%)
          `,
          animation: 'pulse 12s ease-in-out infinite'
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-12 max-w-4xl ml-0 transform hover:translate-x-1 transition-transform duration-700">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-light text-white mb-4 tracking-tight font-[family-name:var(--font-montserrat)] leading-tight">
            Creating
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 pb-2">
              Intelligence
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-6 font-[family-name:var(--font-montserrat)]">
            Optical Precision, Infinite Horizons
          </h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed font-[family-name:var(--font-inter)]">
            Harnessing emerging technologies to break down complex challenges through intuitive solutions, 
            predictive insights, and scalable applications designed for unique visions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 font-[family-name:var(--font-inter)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-lg border border-blue-400/30 group-hover:border-blue-300/60 transition-colors duration-300"></div>
            <span className="relative z-10">Behind the Code</span>
          </button>
          <button className="group relative px-8 py-4 border border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/30 font-[family-name:var(--font-inter)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-lg border border-blue-400/50 group-hover:border-blue-300/80 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"></div>
            <span className="relative z-10">Intelligence in Action</span>
          </button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-blue-400/30 rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-montserrat)]">Schedule a Consultation</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Interested in personalized insights or a demo? Share your email, and we&apos;ll reach out to you.
            </p>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name (optional)"
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email *"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Send Consultation Request
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 border border-blue-400/30 rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-montserrat)]">Stay Informed</h3>
              <button 
                onClick={() => setShowSubscribeModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Sign up to receive the latest content, product innovations, and exclusive updates on upcoming developments.
            </p>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-blue-400/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Subscribe to Newsletter
              </button>
            </form>
            
            <p className="text-white/50 text-sm mt-4 text-center">
              You&apos;ll receive a welcome email after subscribing.
            </p>
          </motion.div>
        </div>
      )}

      {/* Professional studio overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20 pointer-events-none" />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 w-full max-w-lg relative"
          >
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-montserrat)]">
              Schedule a Consultation
            </h3>
            <p className="text-white/70 mb-6 font-[family-name:var(--font-inter)]">
              Interested in personalized insights, a demo, or discussing a project? Share your email and preferred time for a follow up.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Preferred Time & Date (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                  <input
                    type="time"
                    className="bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>
                <p className="text-white/50 text-xs mt-1">Or you can mention your availability in the message below</p>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="Any details, questions, or preferred time ranges..."
                ></textarea>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Project Requirements (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="Let us know if you have any specific requirements or ideas for the project you want to discuss..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-[family-name:var(--font-inter)]"
              >
                Schedule Consultation
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black/90 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 w-full max-w-md relative"
          >
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-montserrat)]">
              Stay Informed
            </h3>
            <p className="text-white/70 mb-6 font-[family-name:var(--font-inter)]">
              Sign up to receive the latest content, product innovations, and exclusive updates on upcoming developments.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2 font-[family-name:var(--font-inter)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black/50 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 font-[family-name:var(--font-inter)]"
              >
                Subscribe to Updates
              </button>
              
              <p className="text-white/50 text-xs text-center">
                You&apos;ll receive a welcome email and can unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-t from-black via-gray-900/80 to-transparent border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Image 
                  src="/logo.png" 
                  alt="NoirStack Logo" 
                  width={32}
                  height={32}
                  className="h-8 w-auto opacity-80 mix-blend-screen"
                />
                <div className="text-xl font-bold text-white">
                  NOIR<span className="text-blue-400">STACK</span>
                </div>
              </div>
              <p className="text-white/70 mb-6 text-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Advanced satellite constellation delivering real-time intelligence through cutting-edge orbital technology and innovative solutions.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white/70 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white/70 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white/70 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.965 1.404-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.130-2.607 7.464-6.227 7.464-1.216 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z."/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group">
                  <svg className="w-5 h-5 text-white/70 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.244 0C5.503.016.016 5.503 0 12.244.016 18.985 5.503 24.472 12.244 24.456S24.472 18.985 24.456 12.244C24.472 5.503 18.985.016 12.244 0zM9.836 19.22c-.976 0-1.767-.79-1.767-1.767s.79-1.767 1.767-1.767 1.767.79 1.767 1.767-.79 1.767-1.767 1.767zm8.73-3.458h-2.35c0-.992-.02-1.964-.058-2.887h2.252c.105.952.156 1.919.156 2.887zm-4.395 0h-2.535c-.173-.408-.356-.842-.544-1.299-.188-.458-.379-.936-.57-1.434h3.649v2.733zm0-4.094h-3.898c-.237-.817-.478-1.698-.717-2.64h4.615v2.64zm0-4.001h-4.757c-.188-.974-.372-2.008-.548-3.092h5.305v3.092zm2.045 8.095c.176-.408.349-.842.516-1.299.168-.458.334-.936.497-1.434h2.502c-.105.952-.156 1.919-.156 2.887h-3.359z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wide" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li><a href="/solutions" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Solutions</a></li>
                <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Lab</a></li>
                <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Hub</a></li>
                <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Contact</a></li>
                <li><button onClick={() => setShowSubscribeModal(true)} className="text-white/70 hover:text-blue-400 transition-colors text-sm text-left" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Subscribe</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wide" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Services
              </h4>
              <ul className="space-y-3">
                <li><a href="/solutions#ai" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>AI & Machine Learning</a></li>
                <li><a href="/solutions#quantum" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Quantum Computing</a></li>
                <li><a href="/solutions#development" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Custom Development</a></li>
                <li><a href="/solutions#analytics" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Data Analytics</a></li>
                <li><a href="#" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Consulting</a></li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wide" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Contact & Legal
              </h4>
              <ul className="space-y-3 mb-6">
                <li><button onClick={() => setShowContactModal(true)} className="text-white/70 hover:text-blue-400 transition-colors text-sm text-left" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Contact Us</button></li>
                <li><a href="mailto:info@noirstack.com" className="text-white/70 hover:text-blue-400 transition-colors text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>info@noirstack.com</a></li>
              </ul>
              
              <h5 className="text-white/80 font-medium mb-3 text-sm tracking-wide" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Legal
              </h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Privacy Policy</a></li>
                <li><a href="#" className="text-white/60 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Terms of Service</a></li>
                <li><a href="#" className="text-white/60 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Copyright © 2024 NoirStack. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Accessibility</a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Sitemap</a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors text-xs" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}