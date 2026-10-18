"use client";

import { useRef, useEffect, useState } from "react";

export default function LogoGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  const WIDTH = 1200;
  const HEIGHT = 1200;

  useEffect(() => {
    const loadFont = async () => {
      try {
        const raveoFont = new FontFace(
          "Raveo",
          "url(/fonts/variable/RaveoVF.woff2) format('woff2-variations')",
          { weight: "400 730" }
        );
        await raveoFont.load();
        document.fonts.add(raveoFont);
        setFontLoaded(true);
      } catch (error) {
        console.error("Font loading failed:", error);
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;

    // Dark gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGradient.addColorStop(0, "#0a0a0a");
    bgGradient.addColorStop(0.5, "#111111");
    bgGradient.addColorStop(1, "#080808");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Central orange glow
    const glow = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 400
    );
    glow.addColorStop(0, "rgba(249, 115, 22, 0.2)");
    glow.addColorStop(0.5, "rgba(249, 115, 22, 0.08)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Abstract D logo using dots
    const dotSize = 28;
    const spacing = 65;
    const startX = centerX - spacing * 3;
    const startY = centerY - spacing * 4;

    // Draw glow behind the D
    ctx.shadowColor = "#f97316";
    ctx.shadowBlur = 40;

    // D shape using dot grid
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

    // Draw dots
    dPattern.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === 1) {
          const x = startX + colIdx * spacing;
          const y = startY + rowIdx * spacing;

          // Accent color for outer curve
          const isOuterCurve = colIdx >= 4 || (rowIdx <= 1 && colIdx >= 3) || (rowIdx >= 7 && colIdx >= 3);

          ctx.fillStyle = isOuterCurve ? "#f97316" : "#ffffff";
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });

    ctx.shadowBlur = 0;

    // Corner dots
    ctx.fillStyle = "#f97316";
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(60, 60, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(WIDTH - 60, 60, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(60, HEIGHT - 60, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(WIDTH - 60, HEIGHT - 60, 8, 0, Math.PI * 2);
    ctx.fill();

    // Corner lines
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 60);
    ctx.lineTo(180, 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(60, 80);
    ctx.lineTo(60, 180);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH - 80, 60);
    ctx.lineTo(WIDTH - 180, 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH - 60, 80);
    ctx.lineTo(WIDTH - 60, 180);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(80, HEIGHT - 60);
    ctx.lineTo(180, HEIGHT - 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(60, HEIGHT - 80);
    ctx.lineTo(60, HEIGHT - 180);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH - 80, HEIGHT - 60);
    ctx.lineTo(WIDTH - 180, HEIGHT - 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WIDTH - 60, HEIGHT - 80);
    ctx.lineTo(WIDTH - 60, HEIGHT - 180);
    ctx.stroke();

    ctx.globalAlpha = 1;

    // Edge accent lines
    const edgeLine = ctx.createLinearGradient(0, 0, WIDTH, 0);
    edgeLine.addColorStop(0, "transparent");
    edgeLine.addColorStop(0.3, "#f97316");
    edgeLine.addColorStop(0.7, "#f97316");
    edgeLine.addColorStop(1, "transparent");
    ctx.fillStyle = edgeLine;
    ctx.fillRect(0, HEIGHT - 5, WIDTH, 5);
    ctx.fillRect(0, 0, WIDTH, 5);
  }, [fontLoaded]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "DOGM-logo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs text-orange-500 tracking-widest mb-2">
          LOGO GENERATOR
        </p>
        <h1 className="text-3xl font-bold mb-1">DOGM.AI Logo</h1>
        <p className="text-gray-500 mb-8">Developers of Great Minds</p>

        <div className="border border-neutral-800 rounded-lg overflow-hidden mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-auto"
            style={{ aspectRatio: "1/1" }}
          />
        </div>

        <button
          onClick={download}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg text-lg"
        >
          Download PNG
        </button>

        <p className="text-center text-neutral-600 text-sm mt-4">
          1200 × 1200px
        </p>
      </div>
    </div>
  );
}
