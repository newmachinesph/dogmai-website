'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';

// ============================================================================
// PRAXIS PROGRAMS - Facebook Post Generator (1080×1350)
// 3 promotional posts: AI Agent Builder, AI-Assisted Coding, AI Media Studio
// ============================================================================

const WIDTH = 1080;
const HEIGHT = 1350;

const BG_DARK = '#060503';
const TEXT_LIGHT = '#f4efe6';
const TEXT_MUTED = '#a8987a';

interface ProgramPost {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  duration: string;
  hours: string;
  commitment: string;
  color: { primary: string; secondary: string; glow: string };
  slug: string;
  image: string;
}

const programs: ProgramPost[] = [
  {
    name: 'AI Agent\nBuilder',
    tagline: 'Build autonomous AI agents that research, decide, execute, and report back.',
    description: 'The single most valuable skill in the market right now.',
    features: [
      'OpenAI Agents SDK',
      'Multi-Agent Orchestration',
      'MCP & Tool Integration',
      'Business Process Automation',
      'Production Deployment',
    ],
    duration: '10 WEEKS',
    hours: '~170 hrs',
    commitment: '15-20 hrs/week',
    color: { primary: '#8b5cf6', secondary: '#a78bfa', glow: '#7c3aed' },
    slug: 'ai-agent-builder',
    image: '/imgs/praxis/ai-agent-builder-hero.jpg',
  },
  {
    name: 'AI-Assisted\nCoding',
    tagline: 'Ship real products with AI — no CS degree required.',
    description: 'Build and deploy 7+ apps in 12 weeks using AI-assisted coding in VS Code.',
    features: [
      'AI-Assisted Coding in VS Code',
      'Full-Stack Apps with AI',
      'Cross-Platform Mobile Apps',
      'Auth, Payments & APIs',
      'Demo Day & Product Launch',
    ],
    duration: '12 WEEKS',
    hours: '~200 hrs',
    commitment: '15-20 hrs/week',
    color: { primary: '#06b6d4', secondary: '#67e8f9', glow: '#0891b2' },
    slug: 'ai-assisted-coding',
    image: '/imgs/praxis/ai-assisted-coding-hero.jpg',
  },
  {
    name: 'AI Content\n& Media Studio',
    tagline: 'Build a full creative studio powered by AI and code.',
    description: 'Build programmatic content pipelines that produce professional campaigns at scale.',
    features: [
      'AI Image & Video Generation',
      'Programmatic Video Pipelines',
      'Voice Synthesis & AI Music',
      'Code-Driven Content Automation',
      'Client Projects & Studio Launch',
    ],
    duration: '8 WEEKS',
    hours: '~140 hrs',
    commitment: '15-20 hrs/week',
    color: { primary: '#f59e0b', secondary: '#fbbf24', glow: '#d97706' },
    slug: 'ai-media-studio',
    image: '/imgs/praxis/ai-media-studio-hero.jpg',
  },
];

// DOGM logo pixel pattern
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

function drawLogo(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number, accentColor: string) {
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
        ctx.fillStyle = isOuterCurve ? accentColor : '#ffffff';
        ctx.fill();
      }
    });
  });
}

function drawPost(canvas: HTMLCanvasElement, program: ProgramPost, heroImg?: HTMLImageElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { primary, secondary, glow } = program.color;

  // === BACKGROUND ===
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle grid
  ctx.strokeStyle = `${primary}08`;
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= WIDTH; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }
  for (let y = 0; y <= HEIGHT; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  // === HERO IMAGE (screen blend — black pixels vanish, bright elements pop) ===
  if (heroImg) {
    const imgW = 520;
    const imgH = imgW * (heroImg.naturalHeight / heroImg.naturalWidth);
    const imgX = WIDTH - imgW + 20;
    const imgY = 100;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.75;
    ctx.drawImage(heroImg, imgX, imgY, imgW, imgH);
    ctx.restore();

    // Fade edges: left gradient to blend into background
    ctx.save();
    const fadeW = 180;
    const fadeGrad = ctx.createLinearGradient(imgX, 0, imgX + fadeW, 0);
    fadeGrad.addColorStop(0, BG_DARK);
    fadeGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fadeGrad;
    ctx.fillRect(imgX, imgY, fadeW, imgH);

    // Fade bottom edge
    const fadeBotGrad = ctx.createLinearGradient(0, imgY + imgH - 120, 0, imgY + imgH);
    fadeBotGrad.addColorStop(0, 'transparent');
    fadeBotGrad.addColorStop(1, BG_DARK);
    ctx.fillStyle = fadeBotGrad;
    ctx.fillRect(imgX, imgY + imgH - 120, imgW, 120);

    // Fade top edge
    const fadeTopGrad = ctx.createLinearGradient(0, imgY, 0, imgY + 60);
    fadeTopGrad.addColorStop(0, BG_DARK);
    fadeTopGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = fadeTopGrad;
    ctx.fillRect(imgX, imgY, imgW, 60);
    ctx.restore();
  }

  // === GRADIENT ORBS (drawn after hero image so they sit in front) ===
  // Large gradient orb top-right
  const orbX = WIDTH - 150;
  const orbY = 200;
  const mainOrb = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 500);
  mainOrb.addColorStop(0, `${primary}30`);
  mainOrb.addColorStop(0.4, `${primary}12`);
  mainOrb.addColorStop(1, 'transparent');
  ctx.fillStyle = mainOrb;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Secondary orb bottom-left
  const orb2 = ctx.createRadialGradient(150, HEIGHT - 300, 0, 150, HEIGHT - 300, 400);
  orb2.addColorStop(0, `${secondary}15`);
  orb2.addColorStop(1, 'transparent');
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Decorative particles
  const seed = program.slug.length * 1234;
  for (let i = 0; i < 40; i++) {
    const pseudoRandom = (n: number) => {
      const x = Math.sin(seed + n * 9999) * 10000;
      return x - Math.floor(x);
    };
    const px = pseudoRandom(i * 3) * WIDTH;
    const py = pseudoRandom(i * 3 + 1) * HEIGHT;
    const ps = 1 + pseudoRandom(i * 3 + 2) * 2.5;
    const pa = 0.05 + pseudoRandom(i * 5) * 0.15;
    ctx.beginPath();
    ctx.arc(px, py, ps, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${pa})`;
    ctx.fill();
  }

  // === HEADER: Logo + DOGM.AI + PRAXIS badge ===
  const PADDING = 60;
  const headerY = 70;

  drawLogo(ctx, PADDING + 24, headerY, 1.6, primary);

  ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const brandX = PADDING + 70;
  ctx.fillStyle = TEXT_LIGHT;
  ctx.fillText('DOGM', brandX, headerY - 10);
  ctx.fillStyle = primary;
  ctx.fillText('.', brandX + ctx.measureText('DOGM').width, headerY - 10);
  ctx.fillStyle = TEXT_LIGHT;
  ctx.fillText('AI', brandX + ctx.measureText('DOGM.').width, headerY - 10);

  // Praxis badge — centered below DOGM.AI
  const brandFullWidth = ctx.measureText('DOGM.AI').width;
  const brandCenterX = brandX + brandFullWidth / 2;
  const badgeW = 90;
  const badgeX = brandCenterX - badgeW / 2;
  ctx.fillStyle = `${primary}20`;
  ctx.beginPath();
  ctx.roundRect(badgeX, headerY + 8, badgeW, 28, 14);
  ctx.fill();
  ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = primary;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('PRAXIS', brandCenterX, headerY + 22);

  // === MISSION QUOTE (subtle, top-right) ===
  ctx.save();
  ctx.font = 'italic 15px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff25';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  const quoteLines = [
    '\u201CEmpowering individuals and organizations',
    'to unlock their highest potential through',
    'world-class training and development programs.\u201D',
  ];
  quoteLines.forEach((line, i) => {
    ctx.fillText(line, WIDTH - PADDING, 52 + i * 20);
  });
  ctx.restore();

  // === HORIZONTAL DIVIDER ===
  const dividerY = 140;
  const divGrad = ctx.createLinearGradient(PADDING, dividerY, WIDTH - PADDING, dividerY);
  divGrad.addColorStop(0, 'transparent');
  divGrad.addColorStop(0.3, `${primary}40`);
  divGrad.addColorStop(0.7, `${primary}40`);
  divGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, dividerY);
  ctx.lineTo(WIDTH - PADDING, dividerY);
  ctx.stroke();

  // === PROGRAM NAME (large) ===
  const nameY = 235;
  const nameLines = program.name.split('\n');

  // Glow behind text
  ctx.shadowColor = glow;
  ctx.shadowBlur = 60;
  ctx.font = 'bold 100px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const nameGrad = ctx.createLinearGradient(PADDING, nameY - 80, WIDTH - PADDING, nameY + 40);
  nameGrad.addColorStop(0, primary);
  nameGrad.addColorStop(1, secondary);
  ctx.fillStyle = nameGrad;

  nameLines.forEach((line, i) => {
    ctx.fillText(line, PADDING, nameY + i * 104);
  });
  ctx.shadowBlur = 0;

  // === TAGLINE ===
  const taglineY = nameY + nameLines.length * 104 + 22;
  ctx.font = '30px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = TEXT_LIGHT;
  ctx.textAlign = 'left';

  // Word-wrap tagline at ~40 chars
  const words = program.tagline.split(' ');
  const taglineLines: string[] = [];
  let currentLine = '';
  words.forEach((word) => {
    const test = currentLine ? `${currentLine} ${word}` : word;
    if (test.length > 42) {
      taglineLines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = test;
    }
  });
  if (currentLine) taglineLines.push(currentLine);

  taglineLines.forEach((line, i) => {
    ctx.fillText(line, PADDING, taglineY + i * 40);
  });

  // === DESCRIPTION (small) ===
  const descY = taglineY + taglineLines.length * 40 + 20;
  ctx.font = '24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = TEXT_MUTED;
  const descWords = program.description.split(' ');
  const descLines: string[] = [];
  let descLine = '';
  descWords.forEach((word) => {
    const test = descLine ? `${descLine} ${word}` : word;
    if (test.length > 50) {
      descLines.push(descLine);
      descLine = word;
    } else {
      descLine = test;
    }
  });
  if (descLine) descLines.push(descLine);

  descLines.forEach((line, i) => {
    ctx.fillText(line, PADDING, descY + i * 34);
  });

  // === FEATURES LIST ===
  const featuresY = descY + descLines.length * 34 + 40;

  // "What You'll Learn" label
  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = `${primary}90`;
  ctx.textAlign = 'left';
  ctx.fillText('WHAT YOU\'LL LEARN', PADDING, featuresY);

  program.features.forEach((feature, i) => {
    const fy = featuresY + 40 + i * 50;

    // Colored dot
    ctx.beginPath();
    ctx.arc(PADDING + 14, fy - 6, 8, 0, Math.PI * 2);
    ctx.fillStyle = `${primary}30`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(PADDING + 14, fy - 6, 4, 0, Math.PI * 2);
    ctx.fillStyle = primary;
    ctx.fill();

    // Feature text
    ctx.font = '28px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_LIGHT;
    ctx.fillText(feature, PADDING + 36, fy);
  });

  // === STATS BAR ===
  const statsY = featuresY + 40 + program.features.length * 50 + 40;

  // Stats background
  ctx.fillStyle = `${primary}10`;
  ctx.beginPath();
  ctx.roundRect(PADDING, statsY, WIDTH - PADDING * 2, 90, 16);
  ctx.fill();
  ctx.strokeStyle = `${primary}25`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(PADDING, statsY, WIDTH - PADDING * 2, 90, 16);
  ctx.stroke();

  const statsWidth = WIDTH - PADDING * 2;
  const statItems = [
    { label: 'Duration', value: program.duration },
    { label: 'Total', value: program.hours },
    { label: 'Weekly', value: program.commitment },
  ];

  statItems.forEach((stat, i) => {
    const sx = PADDING + (statsWidth / 3) * i + statsWidth / 6;

    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = primary;
    ctx.textAlign = 'center';
    ctx.fillText(stat.value, sx, statsY + 40);

    ctx.font = '18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = TEXT_MUTED;
    ctx.fillText(stat.label, sx, statsY + 66);

    // Vertical divider
    if (i < statItems.length - 1) {
      const divX = PADDING + (statsWidth / 3) * (i + 1);
      ctx.strokeStyle = `${primary}20`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(divX, statsY + 18);
      ctx.lineTo(divX, statsY + 72);
      ctx.stroke();
    }
  });

  // === CTA BUTTON ===
  const ctaY = statsY + 108;
  const ctaWidth = WIDTH - PADDING * 2;
  const ctaHeight = 80;

  // Button gradient
  const ctaGrad = ctx.createLinearGradient(PADDING, ctaY, PADDING + ctaWidth, ctaY + ctaHeight);
  ctaGrad.addColorStop(0, primary);
  ctaGrad.addColorStop(1, glow);
  ctx.fillStyle = ctaGrad;
  ctx.beginPath();
  ctx.roundRect(PADDING, ctaY, ctaWidth, ctaHeight, 16);
  ctx.fill();

  // Button glow
  ctx.shadowColor = primary;
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.roundRect(PADDING, ctaY, ctaWidth, ctaHeight, 16);
  ctx.fill();
  ctx.shadowBlur = 0;

  // CTA text
  ctx.font = 'bold 32px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Enroll Now  \u2192', WIDTH / 2, ctaY + ctaHeight / 2);

  // === FOOTER ===
  const footerY = HEIGHT - 55;

  // Divider
  const footDivGrad = ctx.createLinearGradient(PADDING, footerY - 30, WIDTH - PADDING, footerY - 30);
  footDivGrad.addColorStop(0, 'transparent');
  footDivGrad.addColorStop(0.3, `${primary}30`);
  footDivGrad.addColorStop(0.7, `${primary}30`);
  footDivGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = footDivGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PADDING, footerY - 30);
  ctx.lineTo(WIDTH - PADDING, footerY - 30);
  ctx.stroke();

  ctx.font = '22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = TEXT_MUTED;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Part-time  \u2022  Evening/Weekend  \u2022  Ship Weekly', WIDTH / 2, footerY - 2);

  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = primary;
  ctx.fillText(`dogm.ai/${program.slug}`, WIDTH / 2, footerY + 28);
}

function PostCanvas({ program, index }: { program: ProgramPost; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (canvasRef.current) drawPost(canvasRef.current, program, img);
    };
    img.onerror = () => {
      // Fallback: draw without image
      if (canvasRef.current) drawPost(canvasRef.current, program);
    };
    img.src = program.image;
  }, [program]);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `praxis-${program.slug}-fb-post-1080x1350.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold" style={{ color: program.color.primary }}>
        {index + 1}. {program.name.replace('\n', ' ')}
      </h2>
      <div className="border border-[#1a1815] rounded-xl overflow-hidden bg-[#0a0805] p-2">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="block"
          style={{ width: 360, height: 450 }}
        />
      </div>
      <button
        onClick={downloadPNG}
        className="px-6 py-3 rounded-lg font-semibold transition-all text-white hover:shadow-lg"
        style={{ background: `linear-gradient(135deg, ${program.color.primary}, ${program.color.glow})` }}
      >
        Download PNG (1080×1350)
      </button>
    </div>
  );
}

export default function PraxisFbPostsPage() {
  const downloadAll = () => {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach((canvas, i) => {
      const link = document.createElement('a');
      link.download = `praxis-${programs[i].slug}-fb-post-1080x1350.png`;
      link.href = canvas.toDataURL('image/png');
      setTimeout(() => link.click(), i * 200);
    });
  };

  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6]">
      <header className="border-b border-[#1a1815] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-pink-400">Praxis</span> Facebook Post Generator
            </h1>
            <p className="text-sm text-[#6f6160] mt-1">1080×1350 — 3 program promotional posts</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadAll}
              className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all"
            >
              Download All
            </button>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-[#a8987a] hover:text-[#f4efe6] border border-[#1a1815] rounded-lg hover:border-[#2a2520] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <PostCanvas key={program.slug} program={program} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
