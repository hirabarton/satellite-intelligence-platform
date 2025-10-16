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
      const baseX = rect.width / 2;
      const baseY = rect.height / 2;
      
      // Add floating motion to the right and back
      const floatOffset = Math.sin(time * 0.003) * 40; // Slow, gentle floating motion
      const centerX = baseX + floatOffset;
      const centerY = baseY;
      const stackRotation = time * 0.005;
      
      // Draw multiple stacked cubes with different sizes and rotations - much larger sizes
      const cubes = [
        { size: 90, yOffset: -135, rotation: stackRotation, opacity: 0.9 },
        { size: 140, yOffset: -45, rotation: stackRotation * 0.7, opacity: 0.8 },
        { size: 200, yOffset: 45, rotation: stackRotation * 0.5, opacity: 0.7 },
        { size: 110, yOffset: 135, rotation: stackRotation * 0.3, opacity: 0.6 }
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
        <div className="flex items-center space-x-3">
          <Image 
            src="/logo.svg" 
            alt="NoirStack Logo" 
            width={32}
            height={32}
            className="h-8 w-auto filter brightness-0 invert"
          />
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
            NOIR<span className="text-blue-400">STACK</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-8 font-[family-name:var(--font-inter)]">
          <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
            Platform
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </a>
          <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
            Solutions
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </a>
          <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
            Intelligence
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </a>
          <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
            Analytics
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </a>
          <a href="#" className="relative text-white/80 hover:text-blue-400 transition-all duration-300 group">
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></span>
          </a>
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
          <h1 className="text-6xl md:text-8xl font-light text-white mb-4 tracking-tight font-[family-name:var(--font-montserrat)]">
            Building Tomorrow's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
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
            Seeing Beyond the Visible
          </h2>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed font-[family-name:var(--font-inter)]">
            Advanced satellite constellation delivering real-time intelligence through cutting-edge orbital technology. 
            Our sophisticated analytics platform offers unparalleled monitoring capabilities and flexible data 
            collection, ensuring you get the insights you need when it matters most.
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
            <span className="relative z-10">Explore Platform</span>
          </button>
          <button className="group relative px-8 py-4 border border-blue-400 text-blue-400 hover:bg-blue-400/10 hover:text-blue-300 rounded-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/30 font-[family-name:var(--font-inter)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 rounded-lg border border-blue-400/50 group-hover:border-blue-300/80 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"></div>
            <span className="relative z-10">View Intelligence</span>
          </button>
        </motion.div>
      </div>

      {/* Professional studio overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20 pointer-events-none" />
    </div>
  );
}