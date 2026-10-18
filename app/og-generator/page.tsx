'use client';

import { useRef, useEffect, useState } from 'react';

export default function OGGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const generateOG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // OG Image dimensions (1200x630 is standard)
    const width = 1200;
    const height = 630;

    // Background - dark gradient like hero
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#060503');
    bgGradient.addColorStop(0.5, '#0a0705');
    bgGradient.addColorStop(1, '#060503');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Orange glow orb (top left)
    const orbGradient1 = ctx.createRadialGradient(300, 200, 0, 300, 200, 300);
    orbGradient1.addColorStop(0, 'rgba(249, 115, 22, 0.15)');
    orbGradient1.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = orbGradient1;
    ctx.beginPath();
    ctx.arc(300, 200, 300, 0, Math.PI * 2);
    ctx.fill();

    // Amber glow orb (bottom right)
    const orbGradient2 = ctx.createRadialGradient(900, 450, 0, 900, 450, 250);
    orbGradient2.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
    orbGradient2.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = orbGradient2;
    ctx.beginPath();
    ctx.arc(900, 450, 250, 0, Math.PI * 2);
    ctx.fill();

    // Subtle grid overlay
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Main text - "Developers"
    ctx.font = 'bold 90px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Gradient for "Developers" text
    const textGradient1 = ctx.createLinearGradient(0, 200, 0, 290);
    textGradient1.addColorStop(0, '#f4efe6');
    textGradient1.addColorStop(1, 'rgba(244, 239, 230, 0.4)');
    ctx.fillStyle = textGradient1;
    ctx.fillText('Developers', width / 2, 230);

    // Main text - "of Great Minds" with orange gradient
    const textGradient2 = ctx.createLinearGradient(300, 0, 900, 0);
    textGradient2.addColorStop(0, '#fb923c');
    textGradient2.addColorStop(0.5, '#fdba74');
    textGradient2.addColorStop(1, '#fbbf24');
    ctx.fillStyle = textGradient2;
    ctx.fillText('of Great Minds', width / 2, 340);

    // DOGMAI acronym row - centered layout
    const acronyms = [
      { letter: 'D', word: 'Discipline' },
      { letter: 'O', word: 'Outcome' },
      { letter: 'G', word: 'Growth' },
      { letter: 'M', word: 'Mastery' },
      { letter: 'A', word: 'Acceleration' },
      { letter: 'I', word: 'Intelligence' },
    ];

    const acronymY = 450;
    const totalItems = acronyms.length;
    const itemWidth = 150; // Width allocated per item
    const totalWidth = totalItems * itemWidth;
    const startX = (width - totalWidth) / 2;

    acronyms.forEach((item, i) => {
      const centerX = startX + i * itemWidth + itemWidth / 2;

      // Letter (orange)
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#fb923c';
      ctx.textAlign = 'center';
      ctx.fillText(item.letter, centerX - 45, acronymY);

      // Word (gray)
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#6f6160';
      ctx.textAlign = 'left';
      ctx.fillText(item.word, centerX - 35, acronymY);

      // Separator
      if (i < acronyms.length - 1) {
        ctx.fillStyle = '#3a3530';
        ctx.textAlign = 'center';
        ctx.fillText('|', centerX + itemWidth / 2, acronymY);
      }
    });

    // Website URL
    ctx.font = '20px monospace';
    ctx.fillStyle = '#a8987a';
    ctx.textAlign = 'center';
    ctx.fillText('dogm.ai', width / 2, 560);

    // Top accent line
    const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
    lineGradient.addColorStop(0, 'transparent');
    lineGradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.5)');
    lineGradient.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(width, 2);
    ctx.stroke();

    setIsGenerated(true);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'dogm-og-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    generateOG();
  }, []);

  return (
    <main className="min-h-screen bg-[#060503] text-[#f4efe6] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">OG Image Generator</h1>
        <p className="text-[#a8987a] mb-8">Generate Open Graph images for social sharing</p>

        <div className="space-y-6">
          {/* Canvas preview */}
          <div className="border border-[#1a1815] rounded-xl overflow-hidden">
            <canvas
              ref={canvasRef}
              width={1200}
              height={630}
              className="w-full h-auto"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={generateOG}
              className="px-6 py-3 bg-[#1a1815] rounded-lg font-medium text-[#f4efe6] hover:bg-[#2a2520] transition-colors"
            >
              Regenerate
            </button>
            <button
              onClick={downloadImage}
              disabled={!isGenerated}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg font-semibold text-[#0d0906] hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50"
            >
              Download PNG
            </button>
          </div>

          {/* Info */}
          <div className="p-4 bg-[#0a0805] rounded-lg border border-[#1a1815]">
            <p className="text-sm text-[#6f6160]">
              <span className="text-[#a8987a]">Dimensions:</span> 1200 × 630px (Standard OG image size)
            </p>
            <p className="text-sm text-[#6f6160] mt-1">
              <span className="text-[#a8987a]">Usage:</span> Place in /public/imgs/og-image.png for social sharing
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
