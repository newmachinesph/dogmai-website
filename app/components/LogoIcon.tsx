'use client';

import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 32, className = '' }: LogoIconProps) {
  // D pattern from logo-generator
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

  const dotRadius = 3.5;
  const spacing = 10;
  const cols = 7;
  const rows = 9;
  const width = cols * spacing;
  const height = rows * spacing;

  const dots: React.ReactElement[] = [];

  dPattern.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 1) {
        const x = colIdx * spacing + spacing / 2;
        const y = rowIdx * spacing + spacing / 2;

        // Orange for outer curve (matches logo-generator logic)
        const isOuterCurve = colIdx >= 4 || (rowIdx <= 1 && colIdx >= 3) || (rowIdx >= 7 && colIdx >= 3);

        dots.push(
          <circle
            key={`${rowIdx}-${colIdx}`}
            cx={x}
            cy={y}
            r={dotRadius}
            fill={isOuterCurve ? '#f97316' : '#ffffff'}
          />
        );
      }
    });
  });

  return (
    <svg
      width={size}
      height={size * (height / width)}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-label="DOGM.AI Logo"
    >
      {dots}
    </svg>
  );
}
