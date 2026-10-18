import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  staticFile,
  Audio,
} from 'remotion';

const fontFaces = `
  @font-face {
    font-family: 'Raveo';
    src: url('${staticFile('fonts/variable/RaveoVF-subsetted.woff2')}') format('woff2');
    font-weight: 400 730;
    font-style: normal;
    font-display: swap;
  }
`;

export interface StompBeatDOGMProps {
  showParticles?: boolean;
}

const COLORS = {
  background: '#060503',
  foreground: '#f4efe6',
  accent: '#f97316',
  muted: '#c9b89b',
};

export const StompBeatDOGM: React.FC<StompBeatDOGMProps> = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Background Music - looped to cover full video duration */}
      <Audio src={staticFile('stomps-and-claps-percussion-and-rhythm-141190.mp3')} loop />

      {/* Scene 1: "You think in systems" (0-105 / 0-3.5s) */}
      <Sequence from={0} durationInFrames={105}>
        <Scene1Systems fps={fps} />
      </Sequence>

      {/* Scene 2: "You solve problems daily" (105-210 / 3.5-7s) */}
      <Sequence from={105} durationInFrames={105}>
        <Scene2Problems fps={fps} />
      </Sequence>

      {/* Scene 3: "You already think like a developer" (210-330 / 7-11s) */}
      <Sequence from={210} durationInFrames={120}>
        <Scene3Realization fps={fps} />
      </Sequence>

      {/* Scene 4: "Now learn to build like one" (330-450 / 11-15s) */}
      <Sequence from={330} durationInFrames={120}>
        <Scene4Build fps={fps} />
      </Sequence>

      {/* Scene 5: DOGM.AI Reveal (450-585 / 15-19.5s) */}
      <Sequence from={450} durationInFrames={135}>
        <Scene5Reveal fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (585-750 / 19.5-25s) */}
      <Sequence from={585} durationInFrames={165}>
        <Scene6CTA fps={fps} />
      </Sequence>

      <CornerAccents />
    </AbsoluteFill>
  );
};

// Animated corner accents
const CornerAccents: React.FC = () => {
  const frame = useCurrentFrame();
  const size = 18;
  const pulse = 1 + Math.sin(frame * 0.08) * 0.2;

  return (
    <>
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: size * pulse,
            height: size * pulse,
            backgroundColor: COLORS.accent,
            zIndex: 100,
          }}
        />
      ))}
    </>
  );
};

// Floating squares background
const FloatingSquares: React.FC<{ frame: number; count?: number; opacity?: number }> = ({
  frame,
  count = 12,
  opacity = 0.4,
}) => {
  const squares = Array.from({ length: count }, (_, i) => {
    const x = ((i * 137.5) % 100);
    const baseY = ((i * 97.3) % 100);
    const speed = 0.12 + (i % 4) * 0.06;
    const size = 20 + (i % 3) * 20;
    const delay = i * 10;
    const rotSpeed = (i % 2 === 0 ? 1 : -1) * (0.6 + (i % 3) * 0.3);

    const y = (baseY + (frame + delay) * speed) % 130 - 15;
    const xOff = Math.sin((frame + delay) * 0.02) * 15;
    const rot = (frame + delay) * rotSpeed;
    const scale = 1 + Math.sin((frame + delay) * 0.04) * 0.25;
    const op = interpolate(y, [-15, 15, 85, 115], [0, opacity, opacity, 0]);

    return { x: x + xOff, y, size, rot, scale, op };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {squares.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            border: `2px solid ${COLORS.accent}`,
            opacity: s.op,
            transform: `rotate(${s.rot}deg) scale(${s.scale})`,
          }}
        />
      ))}
    </div>
  );
};

// Screen shake helper
const useShake = (frame: number, triggers: number[], duration = 12, intensity = 1) => {
  let shake = 0;
  triggers.forEach((t) => {
    const diff = frame - t;
    if (diff >= 0 && diff < duration) shake = Math.max(shake, (duration - diff) * intensity);
  });
  return {
    x: Math.sin(frame * 12) * shake,
    y: Math.cos(frame * 15) * shake * 0.5,
  };
};

// ============ SCENE 1: SYSTEMS ============
const Scene1Systems: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Grid lines draw in
  const gridProgress = spring({ frame: frame - 5, fps, config: { damping: 30, stiffness: 60 } });

  // Text slams with more spacing
  const youSpring = spring({ frame: frame - 12, fps, config: { damping: 10, stiffness: 300 } });
  const thinkSpring = spring({ frame: frame - 28, fps, config: { damping: 8, stiffness: 350 } });
  const systemsSpring = spring({ frame: frame - 48, fps, config: { damping: 6, stiffness: 400 } });

  const shake = useShake(frame, [12, 28, 48], 10, 1.8);

  // Flash on "systems"
  const flash = interpolate(frame, [48, 52, 65], [0, 0.6, 0], { extrapolateRight: 'clamp' });

  // Subtle breathing after text lands
  const breathe = frame > 70 ? Math.sin((frame - 70) * 0.05) * 3 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      <FloatingSquares frame={frame} count={15} opacity={0.25} />

      {/* Flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.accent, opacity: flash, pointerEvents: 'none', zIndex: 50 }} />

      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridProgress * 0.15,
          backgroundImage: `
            linear-gradient(${COLORS.accent}20 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.accent}20 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Text stack */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10, transform: `translateY(${breathe}px)` }}>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 95,
            fontWeight: 500,
            color: COLORS.muted,
            transform: `scale(${interpolate(youSpring, [0, 1], [3.5, 1])}) rotate(${interpolate(youSpring, [0, 1], [-12, 0])}deg)`,
            opacity: interpolate(youSpring, [0, 0.2, 1], [0, 1, 1]),
          }}
        >
          You think
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 85,
            fontWeight: 500,
            color: COLORS.muted,
            transform: `scale(${interpolate(thinkSpring, [0, 1], [4, 1])})`,
            opacity: interpolate(thinkSpring, [0, 0.15, 1], [0, 1, 1]),
          }}
        >
          in
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 180,
            fontWeight: 700,
            color: COLORS.accent,
            transform: `scale(${interpolate(systemsSpring, [0, 1], [5.5, 1])}) rotate(${interpolate(systemsSpring, [0, 1], [10, 0])}deg)`,
            opacity: interpolate(systemsSpring, [0, 0.1, 1], [0, 1, 1]),
            letterSpacing: '-0.02em',
          }}
        >
          systems
        </div>
      </div>

      {/* Connecting lines - delayed and animated */}
      {frame > 60 && (
        <>
          <div
            style={{
              position: 'absolute',
              width: interpolate(frame, [60, 85], [0, 220], { extrapolateRight: 'clamp' }),
              height: 3,
              backgroundColor: COLORS.accent,
              top: '28%',
              left: '8%',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: interpolate(frame, [68, 93], [0, 200], { extrapolateRight: 'clamp' }),
              height: 3,
              backgroundColor: COLORS.accent,
              bottom: '26%',
              right: '10%',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              height: interpolate(frame, [75, 100], [0, 150], { extrapolateRight: 'clamp' }),
              width: 3,
              backgroundColor: COLORS.accent,
              top: '20%',
              right: '18%',
              opacity: 0.4,
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};

// ============ SCENE 2: PROBLEMS ============
const Scene2Problems: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const solveSpring = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 300 } });
  const problemsSpring = spring({ frame: frame - 32, fps, config: { damping: 6, stiffness: 350 } });
  const dailySpring = spring({ frame: frame - 55, fps, config: { damping: 10, stiffness: 250 } });

  const shake = useShake(frame, [10, 32], 12, 2);
  const flash = interpolate(frame, [32, 36, 50], [0, 0.65, 0], { extrapolateRight: 'clamp' });

  // Checkmarks appear with more spacing
  const checks = [
    { x: 12, y: 18, delay: 65 },
    { x: 85, y: 22, delay: 72 },
    { x: 15, y: 78, delay: 79 },
    { x: 88, y: 75, delay: 86 },
    { x: 50, y: 12, delay: 93 },
  ];

  // Breathing after landing
  const breathe = frame > 70 ? Math.sin((frame - 70) * 0.04) * 4 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      <FloatingSquares frame={frame} count={14} opacity={0.3} />

      {/* Flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.accent, opacity: flash, pointerEvents: 'none', zIndex: 50 }} />

      {/* Checkmarks */}
      {checks.map((c, i) => {
        const checkSpring = spring({ frame: frame - c.delay, fps, config: { damping: 10, stiffness: 180 } });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${c.x}%`,
              top: `${c.y}%`,
              fontSize: 55,
              color: COLORS.accent,
              opacity: checkSpring * 0.7,
              transform: `scale(${interpolate(checkSpring, [0, 1], [2.5, 1])}) rotate(${interpolate(checkSpring, [0, 1], [-25, 0])}deg)`,
            }}
          >
            ✓
          </div>
        );
      })}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10, transform: `translateY(${breathe}px)` }}>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 105,
            fontWeight: 600,
            color: COLORS.foreground,
            transform: `scale(${interpolate(solveSpring, [0, 1], [4.5, 1])}) translateY(${interpolate(solveSpring, [0, 1], [-120, 0])}px)`,
            opacity: interpolate(solveSpring, [0, 0.15, 1], [0, 1, 1]),
          }}
        >
          You solve
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 165,
            fontWeight: 700,
            color: COLORS.accent,
            transform: `scale(${interpolate(problemsSpring, [0, 1], [5.5, 1])})`,
            opacity: interpolate(problemsSpring, [0, 0.1, 1], [0, 1, 1]),
            letterSpacing: '-0.02em',
          }}
        >
          problems
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 72,
            fontWeight: 500,
            color: COLORS.muted,
            transform: `translateX(${interpolate(dailySpring, [0, 1], [100, 0])}px)`,
            opacity: dailySpring,
          }}
        >
          every single day
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: REALIZATION ============
const Scene3Realization: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const alreadySpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 180 } });
  const thinkSpring = spring({ frame: frame - 28, fps, config: { damping: 10, stiffness: 220 } });
  const developerSpring = spring({ frame: frame - 50, fps, config: { damping: 5, stiffness: 450 } });

  const shake = useShake(frame, [50], 18, 3);
  const flash = interpolate(frame, [50, 55, 72], [0, 0.85, 0], { extrapolateRight: 'clamp' });

  // Expanding rings on "developer" - more of them
  const rings = [0, 10, 20, 30].map((delay) => {
    const progress = interpolate(frame - 55 - delay, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return {
      size: 80 + progress * 700,
      opacity: interpolate(progress, [0, 0.25, 1], [0.9, 0.5, 0]),
    };
  });

  // Breathing
  const breathe = frame > 85 ? Math.sin((frame - 85) * 0.04) * 5 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      <FloatingSquares frame={frame} count={18} opacity={0.35} />

      {/* Flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.accent, opacity: flash, pointerEvents: 'none', zIndex: 50 }} />

      {/* Expanding rings */}
      {frame > 55 && rings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: ring.size,
            height: ring.size,
            border: `${5 - i}px solid ${COLORS.accent}`,
            opacity: ring.opacity,
            borderRadius: 0,
            transform: `rotate(${frame * 0.4 + i * 12}deg)`,
          }}
        />
      ))}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 10, transform: `translateY(${breathe}px)` }}>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 68,
            fontWeight: 500,
            color: COLORS.muted,
            opacity: alreadySpring,
            transform: `translateY(${interpolate(alreadySpring, [0, 1], [50, 0])}px)`,
          }}
        >
          You already think
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 78,
            fontWeight: 500,
            color: COLORS.muted,
            opacity: thinkSpring,
            transform: `translateX(${interpolate(thinkSpring, [0, 1], [-80, 0])}px)`,
          }}
        >
          like a
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 155,
            fontWeight: 700,
            color: COLORS.foreground,
            transform: `scale(${interpolate(developerSpring, [0, 1], [6.5, 1])}) rotate(${interpolate(developerSpring, [0, 1], [-15, 0])}deg)`,
            opacity: interpolate(developerSpring, [0, 0.08, 1], [0, 1, 1]),
            letterSpacing: '-0.02em',
          }}
        >
          developer
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          width: interpolate(frame, [80, 105], [0, 400], { extrapolateRight: 'clamp' }),
          height: 5,
          backgroundColor: COLORS.accent,
        }}
      />
    </AbsoluteFill>
  );
};

// ============ SCENE 4: BUILD ============
const Scene4Build: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const nowSpring = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 280 } });
  const learnSpring = spring({ frame: frame - 28, fps, config: { damping: 10, stiffness: 220 } });
  const buildSpring = spring({ frame: frame - 48, fps, config: { damping: 5, stiffness: 400 } });
  const oneSpring = spring({ frame: frame - 72, fps, config: { damping: 12, stiffness: 180 } });

  const shake = useShake(frame, [48], 15, 2.5);
  const flash = interpolate(frame, [48, 53, 68], [0, 0.75, 0], { extrapolateRight: 'clamp' });

  // Building blocks animation - more blocks with staggered timing
  const blocks = [
    // Bottom row
    { x: -200, y: 100, delay: 75, size: 55 },
    { x: -120, y: 100, delay: 79, size: 55 },
    { x: -40, y: 100, delay: 83, size: 55 },
    { x: 40, y: 100, delay: 87, size: 55 },
    { x: 120, y: 100, delay: 91, size: 55 },
    { x: 200, y: 100, delay: 95, size: 55 },
    // Middle row
    { x: -160, y: 35, delay: 99, size: 55 },
    { x: -80, y: 35, delay: 102, size: 55 },
    { x: 0, y: 35, delay: 105, size: 55 },
    { x: 80, y: 35, delay: 108, size: 55 },
    { x: 160, y: 35, delay: 111, size: 55 },
    // Top row
    { x: -120, y: -30, delay: 114, size: 55 },
    { x: -40, y: -30, delay: 116, size: 55 },
    { x: 40, y: -30, delay: 118, size: 55 },
    { x: 120, y: -30, delay: 120, size: 55 },
  ];

  // Breathing
  const breathe = frame > 90 ? Math.sin((frame - 90) * 0.04) * 4 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      <FloatingSquares frame={frame} count={16} opacity={0.3} />

      {/* Flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.accent, opacity: flash, pointerEvents: 'none', zIndex: 50 }} />

      {/* Building blocks */}
      {blocks.map((b, i) => {
        const blockSpring = spring({ frame: frame - b.delay, fps, config: { damping: 10, stiffness: 180 } });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${b.x}px)`,
              top: `calc(72% + ${b.y}px)`,
              width: b.size,
              height: b.size,
              backgroundColor: COLORS.accent,
              opacity: blockSpring * 0.85,
              transform: `translateY(${interpolate(blockSpring, [0, 1], [-250, 0])}px) scale(${blockSpring})`,
            }}
          />
        );
      })}

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10, transform: `translateY(${breathe}px)` }}>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 88,
            fontWeight: 600,
            color: COLORS.accent,
            transform: `scale(${interpolate(nowSpring, [0, 1], [3.5, 1])})`,
            opacity: interpolate(nowSpring, [0, 0.2, 1], [0, 1, 1]),
          }}
        >
          Now
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 75,
            fontWeight: 500,
            color: COLORS.muted,
            opacity: learnSpring,
            transform: `translateX(${interpolate(learnSpring, [0, 1], [80, 0])}px)`,
          }}
        >
          learn to
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 190,
            fontWeight: 700,
            color: COLORS.foreground,
            transform: `scale(${interpolate(buildSpring, [0, 1], [6, 1])}) rotate(${interpolate(buildSpring, [0, 1], [12, 0])}deg)`,
            opacity: interpolate(buildSpring, [0, 0.1, 1], [0, 1, 1]),
            letterSpacing: '-0.03em',
          }}
        >
          build
        </div>
        <div
          style={{
            fontFamily: 'Raveo, sans-serif',
            fontSize: 60,
            fontWeight: 500,
            color: COLORS.muted,
            opacity: oneSpring,
            transform: `translateY(${interpolate(oneSpring, [0, 1], [40, 0])}px)`,
          }}
        >
          like one
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: REVEAL ============
const Scene5Reveal: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Big logo slam
  const logoSpring = spring({ frame: frame - 15, fps, config: { damping: 5, stiffness: 350 } });

  // "Developers of Great Minds" word by word with more spacing
  const words = [
    { text: 'Developers', delay: 55, size: 58, color: COLORS.foreground },
    { text: 'of', delay: 68, size: 42, color: COLORS.muted },
    { text: 'Great', delay: 80, size: 70, color: COLORS.accent },
    { text: 'Minds', delay: 95, size: 75, color: COLORS.foreground },
  ];

  const shake = useShake(frame, [15, 55, 80, 95], 12, 2.2);
  const logoFlash = interpolate(frame, [15, 20, 35], [0, 0.85, 0], { extrapolateRight: 'clamp' });

  // Rotating frames
  const rot1 = frame * 0.2;
  const rot2 = -frame * 0.15;

  // Breathing
  const breathe = frame > 110 ? Math.sin((frame - 110) * 0.04) * 4 : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shake.x}px, ${shake.y}px)`,
      }}
    >
      <FloatingSquares frame={frame} count={22} opacity={0.4} />

      {/* Flash */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.accent, opacity: logoFlash, pointerEvents: 'none', zIndex: 50 }} />

      {/* Rotating frames */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          border: `5px solid ${COLORS.accent}`,
          opacity: interpolate(frame, [8, 25], [0, 0.6], { extrapolateRight: 'clamp' }),
          transform: `rotate(${rot1}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 650,
          height: 650,
          border: `3px solid ${COLORS.accent}`,
          opacity: interpolate(frame, [12, 30], [0, 0.4], { extrapolateRight: 'clamp' }),
          transform: `rotate(${rot2}deg)`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: 'Raveo, sans-serif',
          fontSize: 195,
          fontWeight: 700,
          color: COLORS.foreground,
          letterSpacing: '-0.02em',
          transform: `scale(${interpolate(logoSpring, [0, 1], [6.5, 1])}) rotate(${interpolate(logoSpring, [0, 1], [-18, 0])}deg) translateY(${breathe}px)`,
          opacity: interpolate(logoSpring, [0, 0.08, 1], [0, 1, 1]),
          zIndex: 10,
        }}
      >
        DOGM<span style={{ color: COLORS.accent }}>.AI</span>
      </div>

      {/* Accent line */}
      <div
        style={{
          width: interpolate(frame, [40, 60], [0, 360], { extrapolateRight: 'clamp' }),
          height: 5,
          backgroundColor: COLORS.accent,
          marginTop: 25,
          zIndex: 10,
        }}
      />

      {/* Tagline words */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '10px 18px',
          marginTop: 35,
          zIndex: 10,
          maxWidth: 750,
          transform: `translateY(${breathe}px)`,
        }}
      >
        {words.map((w, i) => {
          const wordSpring = spring({ frame: frame - w.delay, fps, config: { damping: 8, stiffness: 320 } });
          return (
            <div
              key={i}
              style={{
                fontFamily: 'Raveo, sans-serif',
                fontSize: w.size,
                fontWeight: w.text === 'of' ? 500 : 700,
                color: w.color,
                transform: `scale(${interpolate(wordSpring, [0, 1], [4, 1])}) rotate(${interpolate(wordSpring, [0, 1], [i % 2 === 0 ? 15 : -15, 0])}deg)`,
                opacity: interpolate(wordSpring, [0, 0.15, 1], [0, 1, 1]),
              }}
            >
              {w.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: CTA ============
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const containerSpring = spring({ frame: frame - 5, fps, config: { damping: 15, stiffness: 100 } });
  const tagSpring = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 130 } });
  const subSpring = spring({ frame: frame - 45, fps, config: { damping: 14, stiffness: 120 } });
  const ctaSpring = spring({ frame: frame - 70, fps, config: { damping: 8, stiffness: 160 } });
  const urlSpring = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 140 } });

  const pulse = 1 + Math.sin(frame * 0.1) * 0.05;
  const rot1 = frame * 0.12;
  const rot2 = -frame * 0.1;

  // Breathing
  const breathe = Math.sin(frame * 0.03) * 3;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <FloatingSquares frame={frame} count={25} opacity={0.35} />

      {/* Rotating frames */}
      <div
        style={{
          position: 'absolute',
          width: 950,
          height: 950,
          border: `4px solid ${COLORS.accent}`,
          opacity: containerSpring * 0.5,
          transform: `rotate(${rot1}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 780,
          height: 780,
          border: `3px solid ${COLORS.accent}`,
          opacity: containerSpring * 0.35,
          transform: `rotate(${rot2}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          border: `2px solid ${COLORS.accent}`,
          opacity: containerSpring * 0.2,
          transform: `rotate(${rot1 * 1.5}deg)`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: 'Raveo, sans-serif',
          fontSize: 130,
          fontWeight: 700,
          color: COLORS.foreground,
          letterSpacing: '-0.02em',
          opacity: containerSpring,
          transform: `scale(${containerSpring}) translateY(${breathe}px)`,
          zIndex: 10,
        }}
      >
        DOGM<span style={{ color: COLORS.accent }}>.AI</span>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: 'Raveo, sans-serif',
          fontSize: 42,
          fontWeight: 500,
          color: COLORS.muted,
          marginTop: 15,
          opacity: tagSpring,
          transform: `translateY(${interpolate(tagSpring, [0, 1], [30, 0]) + breathe}px)`,
          zIndex: 10,
        }}
      >
        Developers of Great Minds
      </div>

      {/* Subtext */}
      <div
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 22,
          color: COLORS.muted,
          marginTop: 12,
          letterSpacing: '0.12em',
          opacity: subSpring,
          transform: `translateY(${interpolate(subSpring, [0, 1], [25, 0])}px)`,
          zIndex: 10,
        }}
      >
        AI-NATIVE CODING BOOTCAMP
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 45,
          opacity: ctaSpring,
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.3, 1]) * pulse})`,
          zIndex: 10,
        }}
      >
        <div style={{ backgroundColor: COLORS.accent, padding: '26px 65px' }}>
          <span
            style={{
              fontFamily: 'Raveo, sans-serif',
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.background,
            }}
          >
            Start Building
          </span>
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 34,
          color: COLORS.accent,
          marginTop: 30,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [25, 0])}px)`,
          zIndex: 10,
        }}
      >
        dogm.ai
      </div>

      {/* Corner squares */}
      {[
        { top: 50, left: 50, delay: 120 },
        { top: 50, right: 50, delay: 130 },
        { bottom: 50, left: 50, delay: 140 },
        { bottom: 50, right: 50, delay: 150 },
      ].map((pos, i) => {
        const sqSpring = spring({ frame: frame - pos.delay, fps, config: { damping: 12, stiffness: 150 } });
        const { delay, ...position } = pos;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...position,
              width: 45,
              height: 45,
              border: `3px solid ${COLORS.accent}`,
              opacity: sqSpring * 0.7,
              transform: `rotate(${frame * 0.5 + i * 20}deg) scale(${sqSpring})`,
              zIndex: 5,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
