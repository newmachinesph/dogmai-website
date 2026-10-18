'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import GIF from 'gif.js';

// ============================================================================
// DOGM ECOSYSTEM - LinkedIn Post Generator
// 8 Program Arms Showcase | 1080x1920
// ============================================================================

interface Program {
  name: string;
  latin: string;
  target: string;
  tagline: string;
  color: string;
  colorLight: string;
  active: boolean;
  offerings: string[];
}

const programs: Program[] = [
  {
    name: 'Elevare',
    latin: 'To lift, to elevate',
    target: 'Corporations & Teams',
    tagline: 'Leadership & Process Excellence',
    color: '#f97316',
    colorLight: '#fdba74',
    active: true,
    offerings: ['Corporate Training', 'Process Optimization', 'Executive Programs', 'Team Building', 'Bootcamps'],
  },
  {
    name: 'Ascenda',
    latin: 'To climb, to rise',
    target: 'Job Seekers & Professionals',
    tagline: 'Career Acceleration & Personal Branding',
    color: '#3b82f6',
    colorLight: '#93c5fd',
    active: true,
    offerings: ['Career Coaching', 'Personal Branding', 'Interview Mastery', 'LinkedIn Optimization', 'Freelancing'],
  },
  {
    name: 'Luminos',
    latin: 'Full of light, brilliant',
    target: 'Students & Youth',
    tagline: 'Leadership & Career Readiness',
    color: '#eab308',
    colorLight: '#fde047',
    active: false,
    offerings: ['Leadership Camps', 'Student Programs', 'Financial Literacy', 'Public Speaking', 'Career Readiness'],
  },
  {
    name: 'Initium',
    latin: 'Beginning, origin',
    target: 'Entrepreneurs & SMEs',
    tagline: 'Launch & Scale Your Business',
    color: '#22c55e',
    colorLight: '#86efac',
    active: true,
    offerings: ['Startup Bootcamps', 'Business Modeling', 'Pitch Training', 'E-commerce Skills', 'Growth Strategies'],
  },
  {
    name: 'Impetus',
    latin: 'Driving force, momentum',
    target: 'Sales Professionals',
    tagline: 'Close More Deals & Drive Revenue',
    color: '#ef4444',
    colorLight: '#fca5a5',
    active: false,
    offerings: ['Sales Fundamentals', 'Negotiation Skills', 'Key Account Mgmt', 'Sales Leadership', 'CRM Mastery'],
  },
  {
    name: 'Animus',
    latin: 'Mind, spirit, soul',
    target: 'Working Professionals',
    tagline: 'Wellness, Mindfulness & Mental Health',
    color: '#a855f7',
    colorLight: '#d8b4fe',
    active: false,
    offerings: ['Stress Management', 'Mindfulness', 'Work-Life Balance', 'Mental Health', 'Wellness Retreats'],
  },
  {
    name: 'Veritas',
    latin: 'Truth',
    target: 'Organizations & Leaders',
    tagline: 'Compliance, Ethics & Governance',
    color: '#14b8a6',
    colorLight: '#5eead4',
    active: false,
    offerings: ['Anti-Corruption', 'Data Privacy', 'Workplace Ethics', 'Governance', 'Risk Management'],
  },
  {
    name: 'Praxis',
    latin: 'Practice, action',
    target: 'Non-Tech Professionals',
    tagline: 'Master Digital Skills Fast',
    color: '#ec4899',
    colorLight: '#f9a8d4',
    active: true,
    offerings: ['AI for Business', 'Data Analytics', 'Digital Marketing', 'Automation Tools', 'No-Code Dev'],
  },
];

export default function LinkedInGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [viewMode, setViewMode] = useState<'single' | 'grid' | 'ecosystem'>('single');
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const WIDTH = 1080;
  const HEIGHT = 1920;

  // Draw DOGM logo (x, y is the CENTER position)
  const drawLogo = useCallback((ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number = 1, color?: string) => {
    const dPattern = [
      [1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 0],
    ];

    const dotRadius = 6 * scale;
    const spacing = 16 * scale;

    // Calculate logo dimensions to center it
    const logoWidth = 6 * spacing; // 7 columns = 6 gaps
    const logoHeight = 8 * spacing; // 9 rows = 8 gaps
    const startX = centerX - logoWidth / 2;
    const startY = centerY - logoHeight / 2;

    dPattern.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === 1) {
          const dotX = startX + colIdx * spacing;
          const dotY = startY + rowIdx * spacing;
          const isOuterCurve = colIdx >= 4 || (rowIdx <= 1 && colIdx >= 3) || (rowIdx >= 7 && colIdx >= 3);

          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = isOuterCurve ? (color || '#f97316') : '#ffffff';
          ctx.fill();
        }
      });
    });
  }, []);

  // Easing
  const easeOutCubic = useCallback((t: number): number => 1 - Math.pow(1 - t, 3), []);
  const easeInOutCubic = useCallback((t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, []);

  // Generate constellation pattern for a program (procedurally generated - spread across canvas)
  const generateConstellation = useCallback((programIndex: number, seed: number = 12345) => {
    const pseudoRandom = (n: number) => {
      const x = Math.sin(seed + programIndex * 1000 + n * 9999) * 10000;
      return x - Math.floor(x);
    };

    // Generate 12-18 stars spread across the canvas
    const numStars = 12 + Math.floor(pseudoRandom(0) * 7);
    const stars: { x: number; y: number; brightness: number }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: 0.05 + pseudoRandom(i * 3) * 0.9,
        y: 0.05 + pseudoRandom(i * 3 + 1) * 0.9,
        brightness: 0.2 + pseudoRandom(i * 3 + 2) * 0.5,
      });
    }

    // Generate sparse connections
    const connections: [number, number][] = [];
    for (let i = 0; i < numStars - 1; i++) {
      if (pseudoRandom(i * 7) > 0.5) {
        connections.push([i, i + 1]);
      }
    }
    // Fewer cross-connections
    for (let i = 0; i < numStars; i++) {
      for (let j = i + 2; j < numStars; j++) {
        if (pseudoRandom(i * 13 + j * 17) > 0.92) {
          connections.push([i, j]);
        }
      }
    }

    return { stars, connections };
  }, []);

  // Generate background stars (smaller, ambient stars across entire canvas)
  const backgroundStars = useCallback(() => {
    const points: { x: number; y: number; size: number; brightness: number }[] = [];
    const seed = 54321;
    for (let i = 0; i < 120; i++) {
      const pseudoRandom = (n: number) => {
        const x = Math.sin(seed + n * 9999) * 10000;
        return x - Math.floor(x);
      };
      points.push({
        x: pseudoRandom(i * 3) * WIDTH,
        y: pseudoRandom(i * 3 + 1) * HEIGHT,
        size: 0.3 + pseudoRandom(i * 3 + 2) * 1.5,
        brightness: 0.05 + pseudoRandom(i * 5) * 0.25,
      });
    }
    return points;
  }, []);

  // Draw constellations with morphing between patterns
  const drawConstellations = useCallback((
    ctx: CanvasRenderingContext2D,
    progress: number,
    programIndex: number,
    transitionProgress: number,
    color: string,
    colorLight: string
  ) => {
    const bgStars = backgroundStars();
    const currentConstellation = generateConstellation(programIndex);
    const nextConstellation = generateConstellation((programIndex + 1) % programs.length);

    // Constellation spans entire canvas with padding
    const padding = 60;

    // Draw ambient background stars with subtle twinkling
    bgStars.forEach((star, i) => {
      const twinkle = 0.6 + Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.4;
      const alpha = star.brightness * twinkle;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
      ctx.fill();
    });

    // Calculate fade for morphing
    const fadeOut = easeInOutCubic(transitionProgress);

    // Helper to get star position - spans full canvas
    const getStarPos = (star: { x: number; y: number }) => ({
      x: padding + star.x * (WIDTH - padding * 2),
      y: padding + star.y * (HEIGHT - padding * 2),
    });

    // Draw CURRENT constellation (fading out) - subtle
    const currentAlpha = 1 - fadeOut;
    if (currentAlpha > 0.01) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Subtle constellation lines
      currentConstellation.connections.forEach(([from, to]) => {
        const star1 = getStarPos(currentConstellation.stars[from]);
        const star2 = getStarPos(currentConstellation.stars[to]);

        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);

        // Soft outer glow
        ctx.strokeStyle = `${color}${Math.floor(currentAlpha * 8).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Thin inner line
        ctx.strokeStyle = `${color}${Math.floor(currentAlpha * 18).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Subtle constellation stars
      currentConstellation.stars.forEach((star, i) => {
        const pos = getStarPos(star);
        const twinkle = 0.7 + Math.sin(progress * Math.PI * 2 + i * 0.8) * 0.3;
        const starAlpha = star.brightness * twinkle * currentAlpha * 0.5;
        const starSize = 1.5 + star.brightness * 3;

        // Soft glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, starSize * 6);
        glow.addColorStop(0, `${color}${Math.floor(starAlpha * 30).toString(16).padStart(2, '0')}`);
        glow.addColorStop(0.5, `${color}${Math.floor(starAlpha * 10).toString(16).padStart(2, '0')}`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, starSize * 6, 0, Math.PI * 2);
        ctx.fill();

        // Small core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, starSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha * 0.8})`;
        ctx.fill();
      });

    }

    // Draw NEXT constellation (fading in) - subtle
    const nextAlpha = fadeOut;
    if (nextAlpha > 0.01) {
      nextConstellation.connections.forEach(([from, to]) => {
        const star1 = getStarPos(nextConstellation.stars[from]);
        const star2 = getStarPos(nextConstellation.stars[to]);

        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);

        ctx.strokeStyle = `${colorLight}${Math.floor(nextAlpha * 6).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = `${colorLight}${Math.floor(nextAlpha * 15).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nextConstellation.stars.forEach((star, i) => {
        const pos = getStarPos(star);
        const twinkle = 0.7 + Math.sin(progress * Math.PI * 2 + i * 0.8 + 2) * 0.3;
        const starAlpha = star.brightness * twinkle * nextAlpha * 0.5;
        const starSize = 1.5 + star.brightness * 3;

        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, starSize * 5);
        glow.addColorStop(0, `${colorLight}${Math.floor(starAlpha * 25).toString(16).padStart(2, '0')}`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, starSize * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, starSize * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha * 0.7})`;
        ctx.fill();
      });
    }

    // Subtle traveling particle along constellation lines
    const particleProgress = (progress * 1.5) % 1;
    const currentConnections = currentConstellation.connections;
    if (currentConnections.length > 0 && currentAlpha > 0.3) {
      const lineIdx = Math.floor(progress * 8) % currentConnections.length;
      const [fromIdx, toIdx] = currentConnections[lineIdx];
      const star1 = getStarPos(currentConstellation.stars[fromIdx]);
      const star2 = getStarPos(currentConstellation.stars[toIdx]);

      const px = star1.x + (star2.x - star1.x) * particleProgress;
      const py = star1.y + (star2.y - star1.y) * particleProgress;

      // Subtle particle glow
      const particleGlow = ctx.createRadialGradient(px, py, 0, px, py, 12);
      particleGlow.addColorStop(0, `${color}40`);
      particleGlow.addColorStop(0.5, `${color}15`);
      particleGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = particleGlow;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fill();

      // Tiny bright core
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.6)`;
      ctx.fill();
    }
  }, [backgroundStars, easeInOutCubic, generateConstellation]);

  // Draw background with program color
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, program: Program, progress: number, programIndex?: number, transitionProgress?: number) => {
    // Base dark background
    ctx.fillStyle = '#060503';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Animated gradient orbs
    const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;

    // Main color orb (top center)
    const mainOrb = ctx.createRadialGradient(
      WIDTH / 2, 350, 0,
      WIDTH / 2, 350, 450 * pulseScale
    );
    mainOrb.addColorStop(0, `${program.color}30`);
    mainOrb.addColorStop(0.5, `${program.color}15`);
    mainOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = mainOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Secondary orb (bottom)
    const secondOrb = ctx.createRadialGradient(
      WIDTH / 2, HEIGHT - 400, 0,
      WIDTH / 2, HEIGHT - 400, 350
    );
    secondOrb.addColorStop(0, `${program.colorLight}10`);
    secondOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = secondOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Corner accent orbs
    const corner1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
    corner1.addColorStop(0, `${program.color}08`);
    corner1.addColorStop(1, 'transparent');
    ctx.fillStyle = corner1;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const corner2 = ctx.createRadialGradient(WIDTH, HEIGHT, 0, WIDTH, HEIGHT, 300);
    corner2.addColorStop(0, `${program.color}08`);
    corner2.addColorStop(1, 'transparent');
    ctx.fillStyle = corner2;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Subtle grid pattern
    ctx.strokeStyle = `${program.color}04`;
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x <= WIDTH; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= HEIGHT; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }

    // Draw constellations
    if (programIndex !== undefined && transitionProgress !== undefined) {
      drawConstellations(ctx, progress, programIndex, transitionProgress, program.color, program.colorLight);
    }
  }, [drawConstellations]);

  // Draw single program showcase (main view)
  const drawSingleProgram = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    const cycleProgress = progress * programs.length;
    const activeIdx = Math.floor(cycleProgress) % programs.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);
    const program = programs[activeIdx];

    drawBackground(ctx, program, progress, activeIdx, transitionProgress);

    // ========== HEADER ==========
    // Logo
    drawLogo(ctx, WIDTH / 2, 130, 0.7, program.color);

    // Brand - DOGM.AI with colored dot
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const brandY = 250;
    const dogmWidth = ctx.measureText('DOGM').width;
    const dotWidth = ctx.measureText('.').width;
    const aiWidth = ctx.measureText('AI').width;
    const totalWidth = dogmWidth + dotWidth + aiWidth;
    const brandStartX = WIDTH / 2 - totalWidth / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('DOGM', brandStartX, brandY);
    ctx.fillStyle = program.color;
    ctx.fillText('.', brandStartX + dogmWidth, brandY);
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('AI', brandStartX + dogmWidth + dotWidth, brandY);
    ctx.textAlign = 'center';

    ctx.font = '20px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6f6160';
    ctx.fillText('Developers of Great Minds', WIDTH / 2, 285);

    // ========== ECOSYSTEM BADGE ==========
    ctx.fillStyle = `${program.color}20`;
    ctx.beginPath();
    ctx.roundRect(WIDTH / 2 - 120, 330, 240, 44, 22);
    ctx.fill();
    ctx.strokeStyle = `${program.color}40`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '18px monospace';
    ctx.fillStyle = program.color;
    ctx.fillText('THE DOGM ECOSYSTEM', WIDTH / 2, 358);

    // ========== PROGRAM NAME (Large) ==========
    const nameY = 520;
    const nameScale = 1 + Math.sin(transitionProgress * Math.PI) * 0.02;

    ctx.save();
    ctx.translate(WIDTH / 2, nameY);
    ctx.scale(nameScale, nameScale);
    ctx.translate(-WIDTH / 2, -nameY);

    // Glow effect
    ctx.shadowColor = program.color;
    ctx.shadowBlur = 60;
    ctx.font = 'bold 140px system-ui, -apple-system, sans-serif';
    const nameGradient = ctx.createLinearGradient(200, nameY - 60, 880, nameY + 20);
    nameGradient.addColorStop(0, program.color);
    nameGradient.addColorStop(1, program.colorLight);
    ctx.fillStyle = nameGradient;
    ctx.fillText(program.name, WIDTH / 2, nameY);
    ctx.shadowBlur = 0;
    ctx.restore();

    // Latin meaning
    ctx.font = 'italic 32px Georgia, serif';
    ctx.fillStyle = '#a8987a';
    ctx.fillText(`"${program.latin}"`, WIDTH / 2, nameY + 70);

    // ========== FOR TARGET ==========
    ctx.font = '32px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#c9b89b';
    ctx.fillText(`For ${program.target}`, WIDTH / 2, nameY + 140);

    // ========== OFFERINGS CARD ==========
    const cardY = nameY + 200;
    const cardHeight = 520;
    const cardX = 60;
    const cardWidth = WIDTH - 120;

    // Card background - flat top, rounded bottom
    ctx.fillStyle = 'rgba(13, 10, 8, 0.9)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, [0, 0, 24, 24]);
    ctx.fill();

    // Card border with gradient
    ctx.strokeStyle = `${program.color}40`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top accent bar - flat edges
    ctx.fillStyle = program.color;
    ctx.fillRect(cardX, cardY, cardWidth, 6);

    // Random sparkles along the top border
    const sparkleCount = 5;
    for (let i = 0; i < sparkleCount; i++) {
      // Pseudo-random position based on progress and index
      const seed = Math.sin(i * 12345 + Math.floor(progress * 8) * 9876) * 10000;
      const randomX = cardX + (seed - Math.floor(seed)) * cardWidth;

      // Twinkle effect - each sparkle has different phase
      const twinklePhase = progress * Math.PI * 6 + i * 1.5;
      const twinkle = Math.max(0, Math.sin(twinklePhase));

      if (twinkle > 0.3) {
        const sparkleSize = 8 + twinkle * 8;

        // Sparkle glow
        const sparkleGlow = ctx.createRadialGradient(randomX, cardY + 3, 0, randomX, cardY + 3, sparkleSize);
        sparkleGlow.addColorStop(0, `rgba(255, 255, 255, ${twinkle * 0.8})`);
        sparkleGlow.addColorStop(0.4, `${program.colorLight}${Math.floor(twinkle * 60).toString(16).padStart(2, '0')}`);
        sparkleGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = sparkleGlow;
        ctx.beginPath();
        ctx.arc(randomX, cardY + 3, sparkleSize, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(randomX, cardY + 3, 2 * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fill();
      }
    }

    // Card title
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.textAlign = 'left';
    ctx.fillText('What We Offer', 100, cardY + 70);

    // Offerings list with animated bullets
    const offeringsStartY = cardY + 130;
    program.offerings.forEach((offering, i) => {
      const itemY = offeringsStartY + i * 75;
      const animDelay = i * 0.1;
      const itemProgress = Math.max(0, Math.min(1, (transitionProgress - animDelay) * 2));
      const itemAlpha = easeOutCubic(itemProgress);

      ctx.globalAlpha = 0.6 + itemAlpha * 0.4;

      // Bullet circle
      ctx.fillStyle = program.color;
      ctx.beginPath();
      ctx.arc(120, itemY, 10, 0, Math.PI * 2);
      ctx.fill();

      // Checkmark in bullet
      ctx.strokeStyle = '#0d0906';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(115, itemY);
      ctx.lineTo(118, itemY + 4);
      ctx.lineTo(126, itemY - 5);
      ctx.stroke();

      // Offering text
      ctx.font = '40px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#f4efe6';
      ctx.fillText(offering, 150, itemY + 14);

      ctx.globalAlpha = 1;
    });

    // ========== PROGRESS DOTS ==========
    const dotsY = HEIGHT - 300;
    const dotSize = 14;
    const dotGap = 20;
    const totalDotsWidth = programs.length * dotSize + (programs.length - 1) * dotGap;
    const dotsStartX = (WIDTH - totalDotsWidth) / 2;

    programs.forEach((p, i) => {
      const dotX = dotsStartX + i * (dotSize + dotGap) + dotSize / 2;
      const isActive = i === activeIdx;

      // Dot
      ctx.beginPath();
      ctx.arc(dotX, dotsY, isActive ? dotSize / 2 + 3 : dotSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? p.color : 'rgba(111, 97, 96, 0.4)';
      ctx.fill();

      // Progress ring for active
      if (isActive) {
        ctx.beginPath();
        ctx.arc(dotX, dotsY, dotSize / 2 + 8, -Math.PI / 2, -Math.PI / 2 + transitionProgress * Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    // Program counter
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6f6160';
    ctx.fillText(`${activeIdx + 1} / ${programs.length}`, WIDTH / 2, dotsY + 50);

    // ========== FOOTER ==========
    // Divider
    const lineGradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.5, `${program.color}60`);
    lineGradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, HEIGHT - 180);
    ctx.lineTo(WIDTH - 80, HEIGHT - 180);
    ctx.stroke();

    // CTA
    ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('Explore Our Programs', WIDTH / 2, HEIGHT - 120);

    ctx.font = '28px monospace';
    ctx.fillStyle = program.color;
    ctx.fillText('dogm.ai/programs', WIDTH / 2, HEIGHT - 70);

    setCurrentIndex(activeIdx);
  }, [drawBackground, drawLogo]);

  // Draw grid view (all 8 programs)
  const drawGridView = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    // Cycling through programs for highlight effect
    const cycleProgress = progress * programs.length;
    const activeIdx = Math.floor(cycleProgress) % programs.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);
    const activeProgram = programs[activeIdx];

    // Background
    ctx.fillStyle = '#060503';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Animated gradient overlay based on active program
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGrad.addColorStop(0, `${activeProgram.color}08`);
    bgGrad.addColorStop(0.5, 'transparent');
    bgGrad.addColorStop(1, `${activeProgram.color}08`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw constellations (cycling through patterns like ecosystem view)
    drawConstellations(ctx, progress, activeIdx, transitionProgress, activeProgram.color, activeProgram.colorLight);

    // Header
    drawLogo(ctx, WIDTH / 2, 110, 0.7, activeProgram.color);

    // Brand - DOGM.AI with colored dot (color changes with active program)
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    const gridBrandY = 220;
    const gridDogmWidth = ctx.measureText('DOGM').width;
    const gridDotWidth = ctx.measureText('.').width;
    const gridAiWidth = ctx.measureText('AI').width;
    const gridTotalWidth = gridDogmWidth + gridDotWidth + gridAiWidth;
    const gridBrandStartX = WIDTH / 2 - gridTotalWidth / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('DOGM', gridBrandStartX, gridBrandY);
    ctx.fillStyle = activeProgram.color;
    ctx.fillText('.', gridBrandStartX + gridDogmWidth, gridBrandY);
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('AI', gridBrandStartX + gridDogmWidth + gridDotWidth, gridBrandY);
    ctx.textAlign = 'center';

    ctx.font = '20px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#6f6160';
    ctx.fillText('Developers of Great Minds', WIDTH / 2, 255);

    // Title
    ctx.font = 'bold 56px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('The DOGM Ecosystem', WIDTH / 2, 350);

    ctx.font = '28px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#a8987a';
    ctx.fillText('8 Program Arms • One Vision', WIDTH / 2, 400);

    // Grid of programs (2x4)
    const gridStartY = 480;
    const cardWidth = (WIDTH - 120 - 30) / 2;
    const cardHeight = 280;
    const gap = 30;

    programs.forEach((program, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 60 + col * (cardWidth + gap);
      const y = gridStartY + row * (cardHeight + gap);

      // Check if this card is active/highlighted
      const isActive = i === activeIdx;
      const isNext = i === (activeIdx + 1) % programs.length;

      // Pulse animation for active card
      const pulseScale = isActive ? 1 + Math.sin(transitionProgress * Math.PI) * 0.02 : 1;

      ctx.save();

      // Glow effect for active card
      if (isActive) {
        ctx.shadowColor = program.color;
        ctx.shadowBlur = 20 + Math.sin(transitionProgress * Math.PI * 2) * 10;
      }

      // Card background
      ctx.fillStyle = isActive ? 'rgba(13, 10, 8, 0.95)' : 'rgba(13, 10, 8, 0.85)';
      ctx.beginPath();
      ctx.roundRect(x, y, cardWidth, cardHeight, 16);
      ctx.fill();

      // Card border - brighter for active
      ctx.strokeStyle = isActive ? `${program.color}80` : `${program.color}30`;
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Color bar with animation
      ctx.fillStyle = program.color;
      ctx.beginPath();
      ctx.roundRect(x, y, 6, cardHeight, [16, 0, 0, 16]);
      ctx.fill();

      // Sparkles on active card's color bar
      if (isActive) {
        for (let s = 0; s < 3; s++) {
          const sparkleY = y + 30 + (cardHeight - 60) * ((transitionProgress + s * 0.3) % 1);
          const sparkleAlpha = Math.sin(((transitionProgress + s * 0.3) % 1) * Math.PI);
          if (sparkleAlpha > 0.2) {
            const sparkleGlow = ctx.createRadialGradient(x + 3, sparkleY, 0, x + 3, sparkleY, 12);
            sparkleGlow.addColorStop(0, `rgba(255, 255, 255, ${sparkleAlpha * 0.9})`);
            sparkleGlow.addColorStop(0.5, `${program.colorLight}${Math.floor(sparkleAlpha * 80).toString(16).padStart(2, '0')}`);
            sparkleGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = sparkleGlow;
            ctx.beginPath();
            ctx.arc(x + 3, sparkleY, 12, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Program name - always visible, brighter for active
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = isActive ? program.colorLight : program.color;
      ctx.fillText(program.name, x + 25, y + 70);

      // Latin - improved contrast
      ctx.font = 'italic 20px Georgia, serif';
      ctx.fillStyle = isActive ? '#c9b89b' : '#a8987a';
      ctx.fillText(`"${program.latin}"`, x + 25, y + 105);

      // For Target - combined single line
      ctx.font = '20px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = isActive ? '#f4efe6' : '#c9b89b';
      ctx.fillText(`For ${program.target}`, x + 25, y + 145);

      // Mini offerings (3 items) - larger font
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = isActive ? '#f4efe6' : '#e0d5c5';
      program.offerings.slice(0, 3).forEach((off, j) => {
        ctx.fillText(`• ${off}`, x + 25, y + 185 + j * 28);
      });

      ctx.restore();
    });

    // Progress indicator - which program is highlighted
    const dotsY = HEIGHT - 180;
    programs.forEach((program, i) => {
      const dotX = WIDTH / 2 - (programs.length - 1) * 12 + i * 24;
      const isActive = i === activeIdx;

      ctx.beginPath();
      ctx.arc(dotX, dotsY, isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? program.color : '#3a3530';
      ctx.fill();

      if (isActive) {
        // Glow around active dot
        const dotGlow = ctx.createRadialGradient(dotX, dotsY, 0, dotX, dotsY, 15);
        dotGlow.addColorStop(0, `${program.color}40`);
        dotGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = dotGlow;
        ctx.beginPath();
        ctx.arc(dotX, dotsY, 15, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Footer
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('Transform Your Organization', WIDTH / 2, HEIGHT - 120);

    ctx.font = '24px monospace';
    ctx.fillStyle = activeProgram.color;
    ctx.fillText('dogm.ai/programs', WIDTH / 2, HEIGHT - 70);
  }, [drawLogo, drawConstellations, easeOutCubic]);

  // Draw ecosystem overview
  const drawEcosystem = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    ctx.fillStyle = '#060503';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Animated central orb
    const orbPulse = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
    const centerOrb = ctx.createRadialGradient(WIDTH / 2, 700, 0, WIDTH / 2, 700, 400 * orbPulse);
    centerOrb.addColorStop(0, 'rgba(249, 115, 22, 0.15)');
    centerOrb.addColorStop(0.5, 'rgba(249, 115, 22, 0.05)');
    centerOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = centerOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw constellations (cycling through all patterns for ecosystem view)
    const ecosystemPatternIdx = Math.floor(progress * programs.length) % programs.length;
    const ecosystemTransition = (progress * programs.length) % 1;
    drawConstellations(ctx, progress, ecosystemPatternIdx, ecosystemTransition, '#f97316', '#fdba74');

    // Header
    drawLogo(ctx, WIDTH / 2, 110, 0.7);

    // Brand - DOGM.AI with colored dot
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    const ecoBrandY = 220;
    const ecoDogmWidth = ctx.measureText('DOGM').width;
    const ecoDotWidth = ctx.measureText('.').width;
    const ecoAiWidth = ctx.measureText('AI').width;
    const ecoTotalWidth = ecoDogmWidth + ecoDotWidth + ecoAiWidth;
    const ecoBrandStartX = WIDTH / 2 - ecoTotalWidth / 2;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('DOGM', ecoBrandStartX, ecoBrandY);
    ctx.fillStyle = '#f97316';
    ctx.fillText('.', ecoBrandStartX + ecoDogmWidth, ecoBrandY);
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('AI', ecoBrandStartX + ecoDogmWidth + ecoDotWidth, ecoBrandY);
    ctx.textAlign = 'center';

    // Main title
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('One Vision', WIDTH / 2, 340);

    const titleGrad = ctx.createLinearGradient(200, 0, 880, 0);
    titleGrad.addColorStop(0, '#fb923c');
    titleGrad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = titleGrad;
    ctx.fillText('Multiple Pathways', WIDTH / 2, 420);

    // Circular arrangement of programs
    const centerX = WIDTH / 2;
    const centerY = 920;
    const radius = 320;

    // Center text "DOGM" with tagline
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('DOGM', centerX, centerY - 10);

    // "DEVELOPERS OF GREAT MINDS" on two lines
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#a8987a';
    ctx.letterSpacing = '0.15em';
    ctx.fillText('DEVELOPERS OF', centerX, centerY + 35);
    ctx.fillText('GREAT MINDS', centerX, centerY + 58);

    // Programs in a circle with connecting lines
    programs.forEach((program, i) => {
      const angle = (i / programs.length) * Math.PI * 2 - Math.PI / 2;
      const animAngle = angle + progress * Math.PI * 2; // Full rotation
      const px = centerX + Math.cos(animAngle) * radius;
      const py = centerY + Math.sin(animAngle) * radius;

      // Connecting dotted line (ferris wheel style) with animated dash
      ctx.strokeStyle = `${program.color}60`;
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 8]);
      ctx.lineDashOffset = -progress * 100; // Animated marching effect
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      // Program node
      const nodeSize = 70;
      ctx.fillStyle = 'rgba(13, 10, 8, 0.95)';
      ctx.beginPath();
      ctx.arc(px, py, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = program.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Glow
      ctx.shadowColor = program.color;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(px, py, nodeSize - 10, 0, Math.PI * 2);
      ctx.strokeStyle = `${program.color}50`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Program initial
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = program.color;
      ctx.fillText(program.name[0], px, py + 16);

      // Program name below
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#f4efe6';
      ctx.fillText(program.name, px, py + nodeSize + 35);

    });

    // Tagline section
    const taglineY = 1480;
    ctx.textAlign = 'center';

    ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('Unlock Your Potential', WIDTH / 2, taglineY);

    ctx.font = '32px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#a8987a';
    ctx.fillText('Transform Your Future • Achieve Excellence', WIDTH / 2, taglineY + 55);

    // Footer
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#f4efe6';
    ctx.fillText('Explore The Ecosystem', WIDTH / 2, HEIGHT - 130);

    ctx.font = '28px monospace';
    ctx.fillStyle = '#f97316';
    ctx.fillText('dogm.ai/programs', WIDTH / 2, HEIGHT - 75);
  }, [drawLogo, drawConstellations]);

  // Main draw function
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    switch (viewMode) {
      case 'single':
        drawSingleProgram(ctx, progress);
        break;
      case 'grid':
        drawGridView(ctx, progress);
        break;
      case 'ecosystem':
        drawEcosystem(ctx, progress);
        break;
    }
  }, [viewMode, drawSingleProgram, drawGridView, drawEcosystem]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number | null = null;
    // All views cycle through programs, so use programs.length for proper timing
    const duration = animationSpeed * 1000 * programs.length;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      drawFrame(progress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animationSpeed, viewMode, drawFrame]);

  // Static draw when paused
  useEffect(() => {
    if (!isAnimating) {
      drawFrame(viewMode === 'single' ? currentIndex / programs.length + 0.01 : 0.5);
    }
  }, [isAnimating, currentIndex, viewMode, drawFrame]);

  // Download PNG
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `dogm-ecosystem-${viewMode}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Export as GIF
  const exportAsGif = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || isExportingGif) return;

    setIsExportingGif(true);
    setExportProgress(0);

    // GIF settings - match actual animation duration (all views cycle through programs)
    const duration = animationSpeed * programs.length;
    const fps = 10; // Lower fps for smoother feel and smaller file
    const totalFrames = Math.min(Math.round(fps * duration), 150); // Cap at 150 frames
    // Calculate delay to match original animation duration
    const frameDelay = Math.round((duration * 1000) / totalFrames);

    // Create GIF encoder - use smaller size for performance
    const scale = 0.5; // Render at 50% size for smaller file
    const gifWidth = Math.round(WIDTH * scale);
    const gifHeight = Math.round(HEIGHT * scale);

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: gifWidth,
      height: gifHeight,
      workerScript: '/gif.worker.js',
    });

    // Create a temporary canvas for scaled frames
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = gifWidth;
    tempCanvas.height = gifHeight;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      setIsExportingGif(false);
      return;
    }

    // Capture frames
    for (let i = 0; i < totalFrames; i++) {
      const progress = i / totalFrames;
      drawFrame(progress);

      // Scale down the frame
      tempCtx.drawImage(canvas, 0, 0, gifWidth, gifHeight);

      // Add frame to GIF
      gif.addFrame(tempCtx, { copy: true, delay: frameDelay });

      setExportProgress(Math.round((i / totalFrames) * 80)); // 80% for capturing

      // Small delay to prevent UI freeze
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Render GIF
    gif.on('progress', (p: number) => {
      setExportProgress(80 + Math.round(p * 20)); // Last 20% for encoding
    });

    gif.on('finished', (blob: Blob) => {
      // Download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `dogm-ecosystem-${viewMode}-${Date.now()}.gif`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      setIsExportingGif(false);
      setExportProgress(0);

      // Resume animation if it was playing
      if (isAnimating) {
        drawFrame(0);
      }
    });

    gif.render();
  }, [isExportingGif, viewMode, animationSpeed, drawFrame, isAnimating]);

  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6]">
      <header className="border-b border-[#1a1815] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">DOGM Ecosystem</h1>
            <p className="text-sm text-[#6f6160] mt-1">8 Program Arms | LinkedIn Post (1080×1920)</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 text-sm text-[#a8987a] hover:text-[#f4efe6] border border-[#1a1815] rounded-lg hover:border-[#2a2520] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Canvas */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="border border-[#1a1815] rounded-xl overflow-hidden bg-[#0a0805]">
                <canvas
                  ref={canvasRef}
                  width={WIDTH}
                  height={HEIGHT}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  disabled={isExportingGif}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isAnimating
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                      : 'bg-[#1a1815] text-[#f4efe6] hover:bg-[#2a2520]'
                  } ${isExportingGif ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isAnimating ? '⏸' : '▶'}
                </button>
                <button
                  onClick={downloadImage}
                  disabled={isExportingGif}
                  className={`flex-1 px-4 py-3 bg-[#1a1815] text-[#f4efe6] hover:bg-[#2a2520] rounded-lg font-medium transition-all ${isExportingGif ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  PNG
                </button>
                <button
                  onClick={exportAsGif}
                  disabled={isExportingGif}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                    isExportingGif
                      ? 'bg-orange-500/30 text-orange-300 cursor-wait'
                      : 'bg-gradient-to-r from-orange-500 to-orange-400 text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25'
                  }`}
                >
                  {isExportingGif ? `GIF ${exportProgress}%` : 'Export GIF'}
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* View Mode */}
            <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
              <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">View Mode</h2>
              <div className="space-y-2">
                {[
                  { id: 'single' as const, name: 'Single Program', desc: 'Animated showcase of each program' },
                  { id: 'grid' as const, name: 'Grid View', desc: 'All 8 programs at once' },
                  { id: 'ecosystem' as const, name: 'Ecosystem', desc: 'Circular visual with connections' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      viewMode === mode.id
                        ? 'bg-orange-500/20 border border-orange-500/50'
                        : 'bg-[#0d0906] border border-[#1a1815] hover:border-[#2a2520]'
                    }`}
                  >
                    <div className="font-medium">{mode.name}</div>
                    <div className="text-xs text-[#6f6160] mt-1">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Speed (for single mode) */}
            {viewMode === 'single' && (
              <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
                <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">Animation Speed</h2>
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        animationSpeed === speed
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                          : 'bg-[#0d0906] text-[#6f6160] border border-[#1a1815] hover:border-[#2a2520]'
                      }`}
                    >
                      {speed}s
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Capture (for single mode) */}
            {viewMode === 'single' && (
              <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
                <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">Capture Program</h2>
                <div className="grid grid-cols-2 gap-2">
                  {programs.map((program, i) => (
                    <button
                      key={program.name}
                      onClick={() => {
                        setIsAnimating(false);
                        setCurrentIndex(i);
                      }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        currentIndex === i && !isAnimating
                          ? 'border-2'
                          : 'bg-[#0d0906] border border-[#1a1815] hover:border-[#2a2520]'
                      }`}
                      style={{
                        borderColor: currentIndex === i && !isAnimating ? program.color : undefined,
                        backgroundColor: currentIndex === i && !isAnimating ? `${program.color}15` : undefined,
                      }}
                    >
                      <div className="font-medium text-sm" style={{ color: program.color }}>
                        {program.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-4 bg-[#0a0805] rounded-lg border border-[#1a1815]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-[#a8987a]">8 Program Arms</span>
              </div>
              <div>
                <p className="text-xs text-[#6f6160]">
                  <span className="text-[#a8987a]">Size:</span> 1080 × 1920px
                </p>
                <p className="text-xs text-[#6f6160] mt-1">
                  <span className="text-[#a8987a]">Format:</span> LinkedIn Story / Post
                </p>
                <p className="text-xs text-[#6f6160] mt-1">
                  <span className="text-[#a8987a]">★</span> Animated constellation backgrounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
