'use client';

import Image from 'next/image';

export default function PhilippinesGlobe() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Philippines SVG Map */}
      <div className="relative w-full max-h-[400px] flex items-center justify-center">
        <Image
          src="/philippines.svg"
          alt="Philippines Map"
          width={400}
          height={400}
          className="w-auto h-full max-h-[400px] object-contain"
          style={{
            filter: 'brightness(0) saturate(100%) invert(55%) sepia(88%) saturate(2071%) hue-rotate(360deg) brightness(100%) contrast(95%)',
          }}
        />

        {/* Manila Marker */}
        <div
          className="absolute w-4 h-4 bg-white rounded-full animate-pulse"
          style={{
            top: '35%',
            left: '52%',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
          }}
          aria-label="Manila"
        />

        {/* Bacolod Marker */}
        <div
          className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
          style={{
            top: '52%',
            left: '48%',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
            animationDelay: '0.5s',
          }}
          aria-label="Bacolod"
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/80 border border-slate-800 rounded-lg p-3 font-mono text-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)' }}></div>
          <span className="text-slate-300">Manila</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)', animationDelay: '0.5s' }}></div>
          <span className="text-slate-300">Bacolod</span>
        </div>
      </div>
    </div>
  );
}
