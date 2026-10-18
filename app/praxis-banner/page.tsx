'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import GIF from 'gif.js';

// ============================================================================
// PRAXIS PROGRAM - Banner Ad Generator
// Master Digital Skills Fast | Non-Tech Professionals
// Sizes: 336x280 (Medium Rectangle), 728x90 (Leaderboard)
// ============================================================================

type BannerSize = 'medium-rectangle' | 'leaderboard';

const BANNER_SIZES = {
  'medium-rectangle': { width: 336, height: 280, name: '336×280', desc: 'Medium Rectangle' },
  'leaderboard': { width: 728, height: 90, name: '728×90', desc: 'Leaderboard' },
};

const offerings = [
  'AI for Business',
  'Data Analytics',
  'Digital Marketing',
  'No-Code Dev',
  'Automation',
];

const taglines = [
  'Master Digital Skills Fast',
  'Learn by Doing',
  'From Zero to Pro',
  'Hands-On Training',
  'Real-World Projects',
];

export default function PraxisBannerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [viewMode, setViewMode] = useState<'offerings' | 'tagline' | 'minimal'>('offerings');
  const [bannerSize, setBannerSize] = useState<BannerSize>('medium-rectangle');
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const { width: WIDTH, height: HEIGHT } = BANNER_SIZES[bannerSize];

  // Praxis brand colors
  const PINK = '#ec4899';
  const PINK_LIGHT = '#f9a8d4';
  const BG_DARK = '#060503';
  const TEXT_LIGHT = '#f4efe6';
  const TEXT_MUTED = '#a8987a';

  // Draw DOGM logo (x, y is the CENTER position)
  const drawLogo = useCallback((ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number = 1) => {
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

    const dotRadius = 2.5 * scale;
    const spacing = 6.5 * scale;

    const logoWidth = 6 * spacing;
    const logoHeight = 8 * spacing;
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
          ctx.fillStyle = isOuterCurve ? PINK : '#ffffff';
          ctx.fill();
        }
      });
    });
  }, []);

  // Easing functions
  const easeOutCubic = useCallback((t: number): number => 1 - Math.pow(1 - t, 3), []);
  const easeInOutCubic = useCallback((t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, []);

  // Generate background particles
  const generateParticles = useCallback(() => {
    const particles: { x: number; y: number; size: number; brightness: number; speed: number }[] = [];
    const seed = 12345;
    for (let i = 0; i < 30; i++) {
      const pseudoRandom = (n: number) => {
        const x = Math.sin(seed + n * 9999) * 10000;
        return x - Math.floor(x);
      };
      particles.push({
        x: pseudoRandom(i * 3) * WIDTH,
        y: pseudoRandom(i * 3 + 1) * HEIGHT,
        size: 0.5 + pseudoRandom(i * 3 + 2) * 1.5,
        brightness: 0.1 + pseudoRandom(i * 5) * 0.3,
        speed: 0.5 + pseudoRandom(i * 7) * 1.5,
      });
    }
    return particles;
  }, [WIDTH, HEIGHT]);

  // Draw background
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    // Base dark background
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Animated gradient orbs
    const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.15;

    // Main pink orb (top-right)
    const mainOrb = ctx.createRadialGradient(
      WIDTH - 60, 60, 0,
      WIDTH - 60, 60, 120 * pulseScale
    );
    mainOrb.addColorStop(0, `${PINK}25`);
    mainOrb.addColorStop(0.5, `${PINK}10`);
    mainOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = mainOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Secondary orb (bottom-left)
    const secondOrb = ctx.createRadialGradient(
      60, HEIGHT - 60, 0,
      60, HEIGHT - 60, 100
    );
    secondOrb.addColorStop(0, `${PINK_LIGHT}15`);
    secondOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = secondOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Particles
    const particles = generateParticles();
    particles.forEach((particle, i) => {
      const twinkle = 0.5 + Math.sin(progress * Math.PI * 4 + i * 0.8) * 0.5;
      const alpha = particle.brightness * twinkle;
      const yOffset = (progress * particle.speed * 50) % HEIGHT;
      const y = (particle.y + yOffset) % HEIGHT;

      ctx.beginPath();
      ctx.arc(particle.x, y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
      ctx.fill();
    });

    // Subtle grid
    ctx.strokeStyle = `${PINK}08`;
    ctx.lineWidth = 0.5;
    const gridSize = 40;
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
  }, [generateParticles, WIDTH, HEIGHT]);

  // Draw offerings carousel view
  const drawOfferingsView = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    drawBackground(ctx, progress);

    const cycleProgress = progress * offerings.length;
    const activeIdx = Math.floor(cycleProgress) % offerings.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);
    const offering = offerings[activeIdx];

    const PADDING = 20;

    // Header - Logo and brand
    drawLogo(ctx, PADDING + 12, PADDING + 16, 0.8);

    // DOGM.AI text
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    const brandX = PADDING + 36;
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('DOGM', brandX, PADDING + 12);
    ctx.fillStyle = PINK;
    ctx.fillText('.', brandX + ctx.measureText('DOGM').width, PADDING + 12);
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('AI', brandX + ctx.measureText('DOGM.').width, PADDING + 12);

    // Praxis badge - minimal background
    ctx.fillStyle = `${PINK}15`;
    ctx.beginPath();
    ctx.roundRect(brandX, PADDING + 20, 46, 16, 8);
    ctx.fill();
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = PINK;
    ctx.fillText('PRAXIS', brandX + 5, PADDING + 31);

    // Main offering text with animation
    const mainTextY = 100;
    const scale = 1 + Math.sin(transitionProgress * Math.PI) * 0.03;
    ctx.save();
    ctx.translate(WIDTH / 2, mainTextY);
    ctx.scale(scale, scale);
    ctx.translate(-WIDTH / 2, -mainTextY);

    ctx.shadowColor = PINK;
    ctx.shadowBlur = 20;
    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const gradient = ctx.createLinearGradient(50, mainTextY - 20, WIDTH - 50, mainTextY + 20);
    gradient.addColorStop(0, PINK);
    gradient.addColorStop(1, PINK_LIGHT);
    ctx.fillStyle = gradient;
    ctx.fillText(offering, WIDTH / 2, mainTextY);
    ctx.shadowBlur = 0;
    ctx.restore();

    // Subtitle
    ctx.font = '11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('For Non-Tech Professionals', WIDTH / 2, mainTextY + 24);

    // Mini icons for offerings
    const iconY = 155;
    const iconSpacing = 45;
    const startX = WIDTH / 2 - (offerings.length - 1) * iconSpacing / 2;

    offerings.forEach((off, i) => {
      const iconX = startX + i * iconSpacing;
      const isActive = i === activeIdx;
      const size = isActive ? 7 : 4;

      // Glow for active
      if (isActive) {
        const glow = ctx.createRadialGradient(iconX, iconY, 0, iconX, iconY, 14);
        glow.addColorStop(0, `${PINK}40`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(iconX, iconY, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(iconX, iconY, size, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? PINK : `${PINK}40`;
      ctx.fill();

      // Progress ring
      if (isActive) {
        ctx.beginPath();
        ctx.arc(iconX, iconY, 11, -Math.PI / 2, -Math.PI / 2 + transitionProgress * Math.PI * 2);
        ctx.strokeStyle = PINK;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // CTA Button
    const btnY = 190;
    const btnWidth = 150;
    const btnHeight = 34;
    const btnX = (WIDTH - btnWidth) / 2;

    // Button glow animation
    const btnGlow = ctx.createRadialGradient(WIDTH / 2, btnY + btnHeight / 2, 0, WIDTH / 2, btnY + btnHeight / 2, 90);
    btnGlow.addColorStop(0, `${PINK}20`);
    btnGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = btnGlow;
    ctx.fillRect(0, btnY - 20, WIDTH, btnHeight + 40);

    // Button background
    const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX + btnWidth, btnY + btnHeight);
    btnGradient.addColorStop(0, PINK);
    btnGradient.addColorStop(1, '#db2777');
    ctx.fillStyle = btnGradient;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 8);
    ctx.fill();

    // Button text
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Start Learning →', WIDTH / 2, btnY + 21);

    // Footer
    ctx.font = '10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('dogm.ai/praxis', WIDTH / 2, HEIGHT - PADDING);

    setCurrentIndex(activeIdx);
  }, [drawBackground, drawLogo, WIDTH, HEIGHT]);

  // Draw tagline rotation view
  const drawTaglineView = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    drawBackground(ctx, progress);

    const cycleProgress = progress * taglines.length;
    const activeIdx = Math.floor(cycleProgress) % taglines.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);
    const tagline = taglines[activeIdx];

    const PADDING = 20;

    // Header - Logo and brand (same as offerings carousel)
    drawLogo(ctx, PADDING + 12, PADDING + 16, 0.8);

    // DOGM.AI text
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    const brandX = PADDING + 36;
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('DOGM', brandX, PADDING + 12);
    ctx.fillStyle = PINK;
    ctx.fillText('.', brandX + ctx.measureText('DOGM').width, PADDING + 12);
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('AI', brandX + ctx.measureText('DOGM.').width, PADDING + 12);

    // Praxis badge - minimal background
    ctx.fillStyle = `${PINK}15`;
    ctx.beginPath();
    ctx.roundRect(brandX, PADDING + 20, 46, 16, 8);
    ctx.fill();
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = PINK;
    ctx.fillText('PRAXIS', brandX + 5, PADDING + 31);
    ctx.textAlign = 'center';

    // "Time to" lead-in
    const leadY = 85;
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('Time to', WIDTH / 2, leadY);

    // "Upskill" as big hero text with glow
    const heroY = 130;
    ctx.shadowColor = PINK;
    ctx.shadowBlur = 40;
    ctx.font = 'bold 54px system-ui, -apple-system, sans-serif';
    const heroGradient = ctx.createLinearGradient(60, heroY - 30, WIDTH - 60, heroY + 10);
    heroGradient.addColorStop(0, PINK);
    heroGradient.addColorStop(1, PINK_LIGHT);
    ctx.fillStyle = heroGradient;
    ctx.fillText('Upskill', WIDTH / 2, heroY);
    ctx.shadowBlur = 0;

    // Animated tagline with fade
    const fadeIn = easeInOutCubic(Math.min(transitionProgress * 3, 1));
    const fadeOut = transitionProgress > 0.7 ? easeInOutCubic((transitionProgress - 0.7) / 0.3) : 0;
    const alpha = fadeIn * (1 - fadeOut);

    ctx.globalAlpha = alpha;
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText(tagline, WIDTH / 2, heroY + 34);
    ctx.globalAlpha = 1;

    // CTA
    const btnY = 190;
    const btnWidth = 130;
    const btnHeight = 30;
    const btnX = (WIDTH - btnWidth) / 2;

    const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX + btnWidth, btnY + btnHeight);
    btnGradient.addColorStop(0, PINK);
    btnGradient.addColorStop(1, '#db2777');
    ctx.fillStyle = btnGradient;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 6);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Join Bootcamp', WIDTH / 2, btnY + 19);

    // Footer
    ctx.font = '10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('dogm.ai/praxis', WIDTH / 2, HEIGHT - 14);
  }, [drawBackground, drawLogo, easeInOutCubic, WIDTH, HEIGHT]);

  // Draw minimal/compact view
  const drawMinimalView = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    drawBackground(ctx, progress);

    const PADDING = 16;

    // Pulsing center orb
    const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.2;
    const centerOrb = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, 0, WIDTH / 2, HEIGHT / 2, 90 * pulseScale);
    centerOrb.addColorStop(0, `${PINK}30`);
    centerOrb.addColorStop(0.5, `${PINK}10`);
    centerOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = centerOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Logo - centered at top
    drawLogo(ctx, WIDTH / 2, PADDING + 26, 0.9);

    // "Time to" small lead-in
    const leadY = 95;
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('Time to', WIDTH / 2, leadY);

    // "Upskill" with heavy glow
    const heroY = 140;
    ctx.shadowColor = PINK;
    ctx.shadowBlur = 45;
    ctx.font = 'bold 58px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const heroGrad = ctx.createLinearGradient(50, heroY - 30, WIDTH - 50, heroY + 20);
    heroGrad.addColorStop(0, PINK);
    heroGrad.addColorStop(0.5, PINK_LIGHT);
    heroGrad.addColorStop(1, PINK);
    ctx.fillStyle = heroGrad;
    ctx.fillText('Upskill', WIDTH / 2, heroY);
    ctx.shadowBlur = 0;

    // Rotating offering text
    const cycleProgress = progress * offerings.length;
    const activeIdx = Math.floor(cycleProgress) % offerings.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);

    const fadeIn = easeInOutCubic(Math.min(transitionProgress * 4, 1));
    const fadeOut = transitionProgress > 0.75 ? easeInOutCubic((transitionProgress - 0.75) / 0.25) : 0;

    ctx.globalAlpha = fadeIn * (1 - fadeOut);
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText(offerings[activeIdx], WIDTH / 2, heroY + 34);
    ctx.globalAlpha = 1;

    // CTA
    const btnY = 200;
    const btnWidth = 130;
    const btnHeight = 30;
    const btnX = (WIDTH - btnWidth) / 2;

    // Animated button border
    ctx.strokeStyle = PINK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 6);
    ctx.stroke();

    // Traveling highlight on button
    const highlightPos = (progress * 2) % 1;
    const highlightX = btnX + highlightPos * btnWidth;
    const highlight = ctx.createRadialGradient(highlightX, btnY + btnHeight / 2, 0, highlightX, btnY + btnHeight / 2, 30);
    highlight.addColorStop(0, `${PINK}40`);
    highlight.addColorStop(1, 'transparent');
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 6);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = PINK;
    ctx.fillText('Learn More', WIDTH / 2, btnY + 19);

    // Footer
    ctx.font = '10px monospace';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('dogm.ai/praxis', WIDTH / 2, HEIGHT - 14);
  }, [drawBackground, drawLogo, easeInOutCubic, WIDTH, HEIGHT]);

  // Draw horizontal leaderboard banner (728x90)
  const drawLeaderboardView = useCallback((ctx: CanvasRenderingContext2D, progress: number) => {
    // Background
    ctx.fillStyle = BG_DARK;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Animated gradient orb
    const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.15;
    const mainOrb = ctx.createRadialGradient(WIDTH - 100, HEIGHT / 2, 0, WIDTH - 100, HEIGHT / 2, 150 * pulseScale);
    mainOrb.addColorStop(0, `${PINK}20`);
    mainOrb.addColorStop(0.5, `${PINK}08`);
    mainOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = mainOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Left orb
    const leftOrb = ctx.createRadialGradient(50, HEIGHT / 2, 0, 50, HEIGHT / 2, 80);
    leftOrb.addColorStop(0, `${PINK_LIGHT}15`);
    leftOrb.addColorStop(1, 'transparent');
    ctx.fillStyle = leftOrb;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const cycleProgress = progress * offerings.length;
    const activeIdx = Math.floor(cycleProgress) % offerings.length;
    const transitionProgress = cycleProgress - Math.floor(cycleProgress);

    // Logo on left
    drawLogo(ctx, 35, HEIGHT / 2, 0.65);

    // DOGM.AI text
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    const brandX = 62;
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('DOGM', brandX, HEIGHT / 2 - 8);
    ctx.fillStyle = PINK;
    ctx.fillText('.', brandX + ctx.measureText('DOGM').width, HEIGHT / 2 - 8);
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText('AI', brandX + ctx.measureText('DOGM.').width, HEIGHT / 2 - 8);

    // Praxis badge - minimal background
    ctx.fillStyle = `${PINK}15`;
    ctx.beginPath();
    ctx.roundRect(brandX, HEIGHT / 2 + 2, 40, 13, 6);
    ctx.fill();
    ctx.font = 'bold 8px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = PINK;
    ctx.fillText('PRAXIS', brandX + 4, HEIGHT / 2 + 11);

    // Divider line
    ctx.strokeStyle = `${PINK}30`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(140, 15);
    ctx.lineTo(140, HEIGHT - 15);
    ctx.stroke();

    // "Time to" text
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText('Time to', 160, HEIGHT / 2 - 12);

    // "Upskill" hero text with glow
    ctx.shadowColor = PINK;
    ctx.shadowBlur = 25;
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    const heroGrad = ctx.createLinearGradient(160, 0, 320, 0);
    heroGrad.addColorStop(0, PINK);
    heroGrad.addColorStop(1, PINK_LIGHT);
    ctx.fillStyle = heroGrad;
    ctx.fillText('Upskill', 160, HEIGHT / 2 + 22);
    ctx.shadowBlur = 0;

    // Rotating offering with fade
    const fadeIn = easeInOutCubic(Math.min(transitionProgress * 4, 1));
    const fadeOut = transitionProgress > 0.75 ? easeInOutCubic((transitionProgress - 0.75) / 0.25) : 0;

    ctx.globalAlpha = fadeIn * (1 - fadeOut);
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_LIGHT;
    ctx.textAlign = 'center';
    ctx.fillText(offerings[activeIdx], 450, HEIGHT / 2 + 5);
    ctx.globalAlpha = 1;

    // CTA Button on right
    const btnWidth = 120;
    const btnHeight = 32;
    const btnX = WIDTH - btnWidth - 25;
    const btnY = (HEIGHT - btnHeight) / 2;

    const btnGradient = ctx.createLinearGradient(btnX, btnY, btnX + btnWidth, btnY + btnHeight);
    btnGradient.addColorStop(0, PINK);
    btnGradient.addColorStop(1, '#db2777');
    ctx.fillStyle = btnGradient;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 6);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Start Learning →', btnX + btnWidth / 2, btnY + 20);
  }, [drawLogo, easeInOutCubic, WIDTH, HEIGHT]);

  // Main draw function
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Use leaderboard view for horizontal banners
    if (bannerSize === 'leaderboard') {
      drawLeaderboardView(ctx, progress);
      return;
    }

    switch (viewMode) {
      case 'offerings':
        drawOfferingsView(ctx, progress);
        break;
      case 'tagline':
        drawTaglineView(ctx, progress);
        break;
      case 'minimal':
        drawMinimalView(ctx, progress);
        break;
    }
  }, [viewMode, bannerSize, drawOfferingsView, drawTaglineView, drawMinimalView, drawLeaderboardView, WIDTH, HEIGHT]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number | null = null;
    const itemCount = viewMode === 'tagline' ? taglines.length : offerings.length;
    const duration = animationSpeed * 1000 * itemCount;

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
      const itemCount = viewMode === 'tagline' ? taglines.length : offerings.length;
      drawFrame(currentIndex / itemCount + 0.01);
    }
  }, [isAnimating, currentIndex, viewMode, drawFrame]);

  // Download PNG
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `praxis-banner-${bannerSize}-${bannerSize === 'leaderboard' ? 'horizontal' : viewMode}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Export as GIF
  const exportAsGif = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || isExportingGif) return;

    setIsExportingGif(true);
    setExportProgress(0);

    const itemCount = viewMode === 'tagline' ? taglines.length : offerings.length;
    const duration = animationSpeed * itemCount;
    const fps = 15;
    const totalFrames = Math.min(Math.round(fps * duration), 120);
    const frameDelay = Math.round((duration * 1000) / totalFrames);

    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: WIDTH,
      height: HEIGHT,
      workerScript: '/gif.worker.js',
    });

    // Capture frames
    for (let i = 0; i < totalFrames; i++) {
      const progress = i / totalFrames;
      drawFrame(progress);

      gif.addFrame(canvas, { copy: true, delay: frameDelay });

      setExportProgress(Math.round((i / totalFrames) * 80));
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    gif.on('progress', (p: number) => {
      setExportProgress(80 + Math.round(p * 20));
    });

    gif.on('finished', (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `praxis-banner-${bannerSize}-${bannerSize === 'leaderboard' ? 'horizontal' : viewMode}-${Date.now()}.gif`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      setIsExportingGif(false);
      setExportProgress(0);

      if (isAnimating) {
        drawFrame(0);
      }
    });

    gif.render();
  }, [isExportingGif, viewMode, bannerSize, animationSpeed, drawFrame, isAnimating, WIDTH, HEIGHT]);

  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6]">
      <header className="border-b border-[#1a1815] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-pink-400">Praxis</span> Banner Generator
            </h1>
            <p className="text-sm text-[#6f6160] mt-1">{BANNER_SIZES[bannerSize].name} {BANNER_SIZES[bannerSize].desc}</p>
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
          {/* Canvas Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="flex justify-center">
                <div className="border border-[#1a1815] rounded-xl overflow-hidden bg-[#0a0805] p-8">
                  <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    className="block"
                    style={{ width: WIDTH, height: HEIGHT }}
                  />
                </div>
              </div>

              <p className="text-center text-xs text-[#6f6160] mt-4">
                Actual size: {WIDTH}×{HEIGHT}px
              </p>

              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  disabled={isExportingGif}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isAnimating
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                      : 'bg-[#1a1815] text-[#f4efe6] hover:bg-[#2a2520]'
                  } ${isExportingGif ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isAnimating ? '⏸' : '▶'}
                </button>
                <button
                  onClick={downloadImage}
                  disabled={isExportingGif}
                  className={`px-6 py-3 bg-[#1a1815] text-[#f4efe6] hover:bg-[#2a2520] rounded-lg font-medium transition-all ${isExportingGif ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  PNG
                </button>
                <button
                  onClick={exportAsGif}
                  disabled={isExportingGif}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isExportingGif
                      ? 'bg-pink-500/30 text-pink-300 cursor-wait'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:shadow-pink-500/25'
                  }`}
                >
                  {isExportingGif ? `GIF ${exportProgress}%` : 'Export GIF'}
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Banner Size */}
            <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
              <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">Banner Size</h2>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(BANNER_SIZES) as [BannerSize, typeof BANNER_SIZES[BannerSize]][]).map(([id, size]) => (
                  <button
                    key={id}
                    onClick={() => setBannerSize(id)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      bannerSize === id
                        ? 'bg-pink-500/20 border border-pink-500/50'
                        : 'bg-[#0d0906] border border-[#1a1815] hover:border-[#2a2520]'
                    }`}
                  >
                    <div className="font-medium text-sm">{size.name}</div>
                    <div className="text-xs text-[#6f6160]">{size.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode - only for medium rectangle */}
            {bannerSize === 'medium-rectangle' && (
              <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
                <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">Banner Style</h2>
                <div className="space-y-2">
                  {[
                    { id: 'offerings' as const, name: 'Offerings Carousel', desc: 'Cycles through skill areas' },
                    { id: 'tagline' as const, name: 'Tagline Rotation', desc: 'Animated taglines' },
                    { id: 'minimal' as const, name: 'Minimal Impact', desc: 'Clean & bold design' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        viewMode === mode.id
                          ? 'bg-pink-500/20 border border-pink-500/50'
                          : 'bg-[#0d0906] border border-[#1a1815] hover:border-[#2a2520]'
                      }`}
                    >
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs text-[#6f6160] mt-1">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Speed */}
            <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
              <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">Animation Speed</h2>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setAnimationSpeed(speed)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      animationSpeed === speed
                        ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                        : 'bg-[#0d0906] text-[#6f6160] border border-[#1a1815] hover:border-[#2a2520]'
                    }`}
                  >
                    {speed}s
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Capture - only for medium rectangle */}
            {bannerSize === 'medium-rectangle' && (
              <div className="p-5 bg-[#0a0805] rounded-xl border border-[#1a1815]">
                <h2 className="text-sm font-semibold text-[#a8987a] uppercase tracking-wider mb-4">
                  {viewMode === 'tagline' ? 'Capture Tagline' : 'Capture Offering'}
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {(viewMode === 'tagline' ? taglines : offerings).map((item, i) => (
                    <button
                      key={item}
                      onClick={() => {
                        setIsAnimating(false);
                        setCurrentIndex(i);
                      }}
                      className={`p-3 rounded-lg text-left transition-all ${
                        currentIndex === i && !isAnimating
                          ? 'bg-pink-500/20 border border-pink-500/50'
                          : 'bg-[#0d0906] border border-[#1a1815] hover:border-[#2a2520]'
                      }`}
                    >
                      <div className="font-medium text-sm text-pink-400">{item}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-4 bg-[#0a0805] rounded-lg border border-[#1a1815]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-sm text-[#a8987a]">Praxis Program</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#6f6160]">
                  <span className="text-[#a8987a]">Size:</span> {BANNER_SIZES[bannerSize].name} ({BANNER_SIZES[bannerSize].desc})
                </p>
                <p className="text-xs text-[#6f6160]">
                  <span className="text-[#a8987a]">Format:</span> Google Ads, Display Networks
                </p>
                <p className="text-xs text-[#6f6160]">
                  <span className="text-[#a8987a]">Target:</span> Non-Tech Professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
