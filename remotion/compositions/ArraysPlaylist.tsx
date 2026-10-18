import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing,
} from 'remotion';

// PREMIUM COLOR PALETTE - Spotify/Music theme with glow variants
const COLORS = {
  deepPurple: '#2e1065',
  black: '#09090b',
  spotifyGreen: '#1DB954',
  spotifyGreenGlow: 'rgba(29, 185, 84, 0.6)',
  accentPurple: '#a855f7',
  accentPurpleGlow: 'rgba(168, 85, 247, 0.6)',
  accentPink: '#ec4899',
  accentPinkGlow: 'rgba(236, 72, 153, 0.6)',
  accentGreen: '#1DB954',
  accentGreenGlow: 'rgba(29, 185, 84, 0.6)',
  accentYellow: '#fbbf24',
  accentYellowGlow: 'rgba(251, 191, 36, 0.6)',
  codeGray: '#71717a',
  uiDark: '#18181b',
  uiDarker: '#27272a',
  textWhite: '#ffffff',
  textSecondary: '#a1a1aa',
  vibrantPink: '#be185d',
  vibrantPinkGlow: 'rgba(190, 24, 93, 0.6)',
  cyan: '#06b6d4',
  cyanGlow: 'rgba(6, 182, 212, 0.6)',
  orange: '#f97316',
  orangeGlow: 'rgba(249, 115, 22, 0.6)',
  gold: '#ffd700',
  goldGlow: 'rgba(255, 215, 0, 0.6)',
};

// Font faces
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

// Props type
interface ArraysPlaylistProps {
  showMusicNotes?: boolean;
}

// Playlist data - Filipino hits + trending songs
const PLAYLIST = [
  { title: 'Pantropiko', artist: 'BINI', duration: '3:18' },
  { title: 'Ere', artist: 'Juan Karlos', duration: '3:45' },
  { title: 'Raining in Manila', artist: 'Lola Amour', duration: '4:02' },
  { title: 'Pasilyo', artist: 'SunKissed Lola', duration: '3:33' },
  { title: 'Salamin', artist: 'BINI', duration: '3:28' },
];

// Enhanced spring configs for premium animations
const SPRING_CONFIGS = {
  bouncy: { damping: 8, stiffness: 120, mass: 0.8 },
  smooth: { damping: 20, stiffness: 200, mass: 1 },
  gentle: { damping: 25, stiffness: 150, mass: 1.2 },
  snappy: { damping: 15, stiffness: 300, mass: 0.5 },
  elastic: { damping: 10, stiffness: 100, mass: 1.5 },
  slam: { damping: 12, stiffness: 350, mass: 0.6 },
  wobbly: { damping: 6, stiffness: 100, mass: 1 },
  celebration: { damping: 7, stiffness: 80, mass: 0.9 },
};

// Sparkle Effect Component for celebrations
const SparkleEffect: React.FC<{ frame: number; count?: number; spread?: number }> = ({
  frame,
  count = 12,
  spread = 200,
}) => {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * 360,
    distance: 60 + (i % 3) * 40,
    delay: i * 2,
    size: 4 + (i % 3) * 3,
    color: [COLORS.accentPurple, COLORS.accentPink, COLORS.cyan, COLORS.accentGreen, COLORS.gold][i % 5],
    glow: [COLORS.accentPurpleGlow, COLORS.accentPinkGlow, COLORS.cyanGlow, COLORS.accentGreenGlow, COLORS.goldGlow][i % 5],
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {sparkles.map((sparkle, i) => {
        const progress = interpolate(frame - sparkle.delay, [0, 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(progress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
        const distance = sparkle.distance + progress * spread;
        const x = Math.cos((sparkle.angle * Math.PI) / 180) * distance;
        const y = Math.sin((sparkle.angle * Math.PI) / 180) * distance;
        const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.5, 0.3]);
        const rotate = progress * 360;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: sparkle.size,
              height: sparkle.size,
              borderRadius: '50%',
              background: sparkle.color,
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.glow}, 0 0 ${sparkle.size * 4}px ${sparkle.glow}`,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

// Confetti Effect for celebration moments
const ConfettiEffect: React.FC<{ frame: number; startFrame?: number }> = ({
  frame,
  startFrame = 0,
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const pieces = Array.from({ length: 30 }, (_, i) => ({
    x: 10 + (i * 47) % 80,
    delay: i * 1.5,
    speed: 2 + (i % 4),
    size: 8 + (i % 3) * 6,
    rotation: (i * 73) % 360,
    rotationSpeed: 5 + (i % 3) * 3,
    color: [COLORS.accentPurple, COLORS.accentPink, COLORS.cyan, COLORS.accentGreen, COLORS.accentYellow, COLORS.gold][i % 6],
    shape: i % 3, // 0 = circle, 1 = square, 2 = diamond
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {pieces.map((p, i) => {
        const y = -50 + (localFrame - p.delay) * p.speed;
        if (y < -50 || y > 120) return null;

        const opacity = interpolate(y, [-50, 0, 100, 120], [0, 1, 1, 0]);
        const sway = Math.sin((localFrame + p.delay) * 0.1) * 20;
        const rotate = p.rotation + (localFrame - p.delay) * p.rotationSpeed;
        const borderRadius = p.shape === 0 ? '50%' : p.shape === 1 ? '2px' : '0';
        const transform = p.shape === 2 ? `rotate(45deg)` : 'none';

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x + sway * 0.5}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius,
              transform: `rotate(${rotate}deg) ${transform}`,
              opacity,
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Pulse Ring Effect for emphasis
const PulseRing: React.FC<{ frame: number; delay?: number; color: string; glow: string }> = ({
  frame,
  delay = 0,
  color,
  glow,
}) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const rings = [0, 10, 20].map((ringDelay) => {
    const ringFrame = localFrame - ringDelay;
    if (ringFrame < 0) return null;

    const scale = interpolate(ringFrame, [0, 30], [0.5, 2], { extrapolateRight: 'clamp' });
    const opacity = interpolate(ringFrame, [0, 10, 30], [0, 0.8, 0], { extrapolateRight: 'clamp' });

    return { scale, opacity, key: ringDelay };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
      {rings.map((ring) => ring && (
        <div
          key={ring.key}
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: `3px solid ${color}`,
            boxShadow: `0 0 20px ${glow}, 0 0 40px ${glow}, inset 0 0 20px ${glow}`,
            transform: `scale(${ring.scale})`,
            opacity: ring.opacity,
          }}
        />
      ))}
    </div>
  );
};

export const ArraysPlaylist: React.FC<ArraysPlaylistProps> = ({
  showMusicNotes = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} showMusicNotes={showMusicNotes} />
      </Sequence>

      {/* Scene 2: The Playlist Visual (120-330 frames / 4-11 sec) */}
      <Sequence from={120} durationInFrames={210}>
        <Scene2Playlist fps={fps} showMusicNotes={showMusicNotes} />
      </Sequence>

      {/* Scene 3: Now In Code (330-570 frames / 11-19 sec) */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Array Actions (570-810 frames / 19-27 sec) */}
      <Sequence from={570} durationInFrames={240}>
        <Scene4Actions fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (810-930 frames / 27-31 sec) */}
      <Sequence from={810} durationInFrames={120}>
        <Scene5Aha fps={fps} showMusicNotes={showMusicNotes} />
      </Sequence>

      {/* Scene 6: CTA (930-1080 frames / 31-36 sec) */}
      <Sequence from={930} durationInFrames={150}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM COMPONENTS ============

// Animated Gradient Background with rotating conic gradient
const AnimatedGradientBg: React.FC<{ frame: number; intensity?: number }> = ({
  frame,
  intensity = 1
}) => {
  const rotation = (frame * 2) % 360;
  const pulse = Math.sin(frame * 0.05) * 0.15 + 0.85;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.3 * intensity,
        background: `conic-gradient(from ${rotation}deg at 50% 50%,
          ${COLORS.accentPurple} 0deg,
          ${COLORS.accentPink} 60deg,
          ${COLORS.cyan} 120deg,
          ${COLORS.accentGreen} 180deg,
          ${COLORS.accentYellow} 240deg,
          ${COLORS.vibrantPink} 300deg,
          ${COLORS.accentPurple} 360deg)`,
        filter: `blur(120px) brightness(${pulse})`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Premium Floating Particles with multi-color glow effects (music notes)
const PremiumFloatingParticles: React.FC<{
  frame: number;
  bright?: boolean;
  density?: number;
}> = ({ frame, bright = false, density = 20 }) => {
  const notes = ['♪', '♫', '🎵', '🎶'];
  const colors = [
    { color: COLORS.accentPurple, glow: COLORS.accentPurpleGlow },
    { color: COLORS.accentPink, glow: COLORS.accentPinkGlow },
    { color: COLORS.accentGreen, glow: COLORS.accentGreenGlow },
    { color: COLORS.cyan, glow: COLORS.cyanGlow },
    { color: COLORS.accentYellow, glow: COLORS.accentYellowGlow },
  ];

  const particles = Array.from({ length: density }, (_, i) => ({
    note: notes[i % notes.length],
    x: (i * 73) % 100,
    delay: i * 30,
    speed: 0.3 + (i % 5) * 0.12,
    size: 14 + (i % 4) * 10,
    colorSet: colors[i % colors.length],
    rotationSpeed: 0.03 + (i % 3) * 0.02,
    swayAmplitude: 10 + (i % 4) * 5,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = 110 - ((frame + p.delay) * p.speed) % 120;
        const x = p.x + Math.sin((frame + p.delay) * 0.03) * p.swayAmplitude;
        const baseOpacity = bright ? 0.7 : 0.4;
        const opacity = interpolate(y, [0, 30, 70, 100], [0, baseOpacity, baseOpacity, 0]);
        const rotate = Math.sin((frame + p.delay) * p.rotationSpeed) * 25;
        const scale = 1 + Math.sin((frame + p.delay) * 0.04) * 0.15;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              fontSize: p.size,
              opacity,
              transform: `rotate(${rotate}deg) scale(${scale})`,
              color: p.colorSet.color,
              filter: `drop-shadow(0 0 8px ${p.colorSet.glow}) drop-shadow(0 0 12px ${p.colorSet.glow})`,
              textShadow: `0 0 20px ${p.colorSet.glow}, 0 0 30px ${p.colorSet.glow}`,
            }}
          >
            {p.note}
          </div>
        );
      })}
    </div>
  );
};

// Glowing Orbs for ambient lighting
const GlowingOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  frame: number;
  pulseSpeed?: number;
}> = ({ x, y, size, color, glowColor, frame, pulseSpeed = 0.03 }) => {
  const pulse = 0.7 + Math.sin(frame * pulseSpeed) * 0.3;
  const drift = Math.sin(frame * 0.02) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(40px) brightness(${pulse})`,
        opacity: 0.6,
        transform: `translate(-50%, -50%) translateY(${drift}px)`,
        boxShadow: `0 0 ${size * 1.5}px ${glowColor}, 0 0 ${size * 2}px ${glowColor}`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Glass Card component for glass morphism effects
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: number;
}> = ({ children, style, glowColor = COLORS.accentPurpleGlow, intensity = 1 }) => {
  return (
    <div
      style={{
        background: `rgba(24, 24, 27, ${0.4 * intensity})`,
        backdropFilter: `blur(${20 * intensity}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${20 * intensity}px) saturate(180%)`,
        border: `1px solid rgba(255, 255, 255, ${0.1 * intensity})`,
        boxShadow: `
          0 8px 32px 0 rgba(0, 0, 0, 0.37),
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.1),
          0 0 40px ${glowColor}
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Gradient Text with WebkitBackgroundClip
const GradientText: React.FC<{
  children: string;
  colors: string[];
  style?: React.CSSProperties;
}> = ({ children, colors, style }) => {
  const gradient = `linear-gradient(135deg, ${colors.join(', ')})`;

  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// Scanline effect for terminal scenes
const ScanlineEffect: React.FC<{ frame: number; intensity?: number }> = ({
  frame,
  intensity = 0.05
}) => {
  const scanlinePosition = (frame * 3) % 120;

  return (
    <>
      {/* Static scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${intensity}) 2px,
            rgba(0, 0, 0, ${intensity}) 4px
          )`,
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      />

      {/* Moving scanline */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${scanlinePosition}%`,
          height: '2px',
          background: `linear-gradient(to bottom, transparent, ${COLORS.accentPurpleGlow}, transparent)`,
          boxShadow: `0 0 10px ${COLORS.accentPurpleGlow}`,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />
    </>
  );
};

// ============ SCENE 1: HOOK ============
const Scene1Hook: React.FC<{ fps: number; showMusicNotes: boolean }> = ({
  fps,
  showMusicNotes,
}) => {
  const frame = useCurrentFrame();

  // SLAM effect for headphone icon
  const iconSlam = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const iconY = interpolate(iconSlam, [0, 1], [-400, 0]);
  const iconScale = interpolate(iconSlam, [0, 0.5, 0.8, 1], [0.3, 1.4, 0.95, 1]);
  const iconRotate = interpolate(iconSlam, [0, 0.5, 1], [-45, 10, 0]);

  // Shockwave on impact
  const shockwaveScale = interpolate(frame, [8, 25], [0.5, 2.5], { extrapolateRight: 'clamp' });
  const shockwaveOpacity = interpolate(frame, [8, 25], [0.8, 0], { extrapolateRight: 'clamp' });

  // Word-by-word reveal with stagger
  const words = [
    { text: 'You', delay: 15, color: COLORS.textWhite },
    { text: 'already', delay: 22, gradient: [COLORS.accentPurple, COLORS.accentPink] },
    { text: 'use', delay: 29, gradient: [COLORS.accentPink, COLORS.cyan] },
    { text: 'arrays.', delay: 36, gradient: [COLORS.cyan, COLORS.accentGreen] },
  ];

  // Sub text with bounce and shuffle icon
  const subBounce = spring({
    frame: frame - 50,
    fps,
    config: SPRING_CONFIGS.elastic,
  });
  const subOpacity = interpolate(subBounce, [0, 1], [0, 1]);
  const subY = interpolate(subBounce, [0, 1], [50, 0]);
  const subScale = interpolate(subBounce, [0, 0.5, 1], [0.8, 1.05, 1]);

  // Shuffle icon wiggle
  const shuffleWiggle = Math.sin(frame * 0.3) * 8;
  const shuffleScale = 1 + Math.sin(frame * 0.15) * 0.1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepPurple} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Dual-layer animated gradient */}
      <AnimatedGradientBg frame={frame} intensity={1} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${COLORS.accentPurpleGlow} 0%, transparent 50%)`,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {showMusicNotes && <PremiumFloatingParticles frame={frame} density={30} bright />}

      {/* Multiple glowing ambient orbs */}
      <GlowingOrb x={15} y={25} size={350} color={COLORS.accentPurple} glowColor={COLORS.accentPurpleGlow} frame={frame} />
      <GlowingOrb x={85} y={30} size={280} color={COLORS.accentPink} glowColor={COLORS.accentPinkGlow} frame={frame} pulseSpeed={0.04} />
      <GlowingOrb x={50} y={80} size={320} color={COLORS.cyan} glowColor={COLORS.cyanGlow} frame={frame} pulseSpeed={0.035} />

      {/* Shockwave ring on impact */}
      {frame >= 8 && frame < 30 && (
        <div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `4px solid ${COLORS.accentPurple}`,
            boxShadow: `0 0 40px ${COLORS.accentPurpleGlow}, 0 0 80px ${COLORS.accentPurpleGlow}`,
            transform: `scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
            top: '35%',
            left: '50%',
            marginLeft: -100,
            marginTop: -100,
          }}
        />
      )}

      {/* Headphone icon with SLAM effect */}
      <div
        style={{
          transform: `translateY(${iconY}px) rotate(${iconRotate}deg) scale(${iconScale})`,
          marginBottom: 50,
          position: 'relative',
        }}
      >
        {/* Outer glow rings */}
        <div
          style={{
            position: 'absolute',
            inset: -40,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.accentPurpleGlow} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            opacity: 0.6 + Math.sin(frame * 0.1) * 0.2,
          }}
        />
        <div
          style={{
            fontSize: 160,
            filter: `
              drop-shadow(0 0 30px ${COLORS.accentPurpleGlow})
              drop-shadow(0 0 60px ${COLORS.accentPinkGlow})
              drop-shadow(0 10px 50px rgba(0, 0, 0, 0.5))
            `,
            transform: `rotate(${Math.sin(frame * 0.08) * 3}deg)`,
          }}
        >
          🎧
        </div>
      </div>

      {/* Word-by-word reveal with staggered animations */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {words.map((word, i) => {
          const wordSpring = spring({
            frame: frame - word.delay,
            fps,
            config: SPRING_CONFIGS.slam,
          });
          const wordScale = interpolate(wordSpring, [0, 1], [2.5, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 0.3, 1], [0, 1, 1]);
          const wordY = interpolate(wordSpring, [0, 1], [-30, 0]);

          const textStyle: React.CSSProperties = {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 68,
            letterSpacing: '-0.02em',
            display: 'inline-block',
            transform: `scale(${wordScale}) translateY(${wordY}px)`,
            opacity: wordOpacity,
          };

          if (word.gradient) {
            return (
              <span
                key={i}
                style={{
                  ...textStyle,
                  background: `linear-gradient(135deg, ${word.gradient.join(', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 30px ${word.gradient[0]})`,
                }}
              >
                {word.text}
              </span>
            );
          }

          return (
            <span
              key={i}
              style={{
                ...textStyle,
                color: word.color,
                textShadow: `
                  0 0 20px ${COLORS.accentPurpleGlow},
                  0 0 40px ${COLORS.accentPurpleGlow},
                  0 4px 30px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* Sub text with shuffle icon */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px) scale(${subScale})`,
          marginTop: 35,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 42,
            background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.vibrantPink}, ${COLORS.accentPurple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 25px ${COLORS.accentPinkGlow})`,
          }}
        >
          Every time Spotify plays the next song.
        </span>
        <span
          style={{
            fontSize: 44,
            transform: `rotate(${shuffleWiggle}deg) scale(${shuffleScale})`,
            filter: `drop-shadow(0 0 15px ${COLORS.accentPinkGlow})`,
          }}
        >
          🔀
        </span>
      </div>

      {/* Sparkle effect on text reveal */}
      {frame >= 40 && frame < 70 && (
        <SparkleEffect frame={frame - 40} count={16} spread={250} />
      )}
    </AbsoluteFill>
  );
};

// ============ SCENE 2: PLAYLIST VISUAL ============
const Scene2Playlist: React.FC<{ fps: number; showMusicNotes: boolean }> = ({
  fps,
  showMusicNotes,
}) => {
  const frame = useCurrentFrame();

  // SLAM entrance for phone
  const phoneSlam = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const phoneScale = interpolate(phoneSlam, [0, 0.5, 0.8, 1], [0.2, 1.15, 0.98, 1]);
  const phoneRotate = interpolate(phoneSlam, [0, 0.5, 1], [20, -8, 0]);
  const phoneY = interpolate(phoneSlam, [0, 1], [-100, 0]);

  // Phone glow pulse
  const phonePulse = 1 + Math.sin(frame * 0.08) * 0.05;

  // Index number callouts that appear one by one
  const indexCallouts = [0, 1, 2, 3, 4].map((idx) => ({
    index: idx,
    delay: 40 + idx * 15,
  }));

  // Bottom text word reveal
  const bottomWords = [
    { text: 'A', delay: 115, color: COLORS.textWhite },
    { text: 'list.', delay: 120, gradient: [COLORS.accentGreen, COLORS.cyan] },
    { text: 'In', delay: 127, color: COLORS.textWhite },
    { text: 'order.', delay: 132, gradient: [COLORS.accentPurple, COLORS.accentPink] },
    { text: "That's an", delay: 139, color: COLORS.textWhite },
    { text: 'array.', delay: 145, gradient: [COLORS.accentYellow, COLORS.orange] },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepPurple} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Enhanced dual-layer gradient */}
      <AnimatedGradientBg frame={frame} intensity={0.8} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${COLORS.cyanGlow} 0%, transparent 60%)`,
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {showMusicNotes && <PremiumFloatingParticles frame={frame} density={25} bright />}

      {/* Multiple ambient orbs */}
      <GlowingOrb x={10} y={30} size={380} color={COLORS.accentGreen} glowColor={COLORS.accentGreenGlow} frame={frame} />
      <GlowingOrb x={90} y={35} size={300} color={COLORS.cyan} glowColor={COLORS.cyanGlow} frame={frame} pulseSpeed={0.035} />
      <GlowingOrb x={50} y={85} size={350} color={COLORS.accentPurple} glowColor={COLORS.accentPurpleGlow} frame={frame} pulseSpeed={0.04} />

      {/* Phone mockup with SLAM entrance */}
      <div
        style={{
          transform: `scale(${phoneScale * phonePulse}) rotate(${phoneRotate}deg) translateY(${phoneY}px)`,
          position: 'relative',
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: -30,
            borderRadius: 60,
            background: `linear-gradient(135deg, ${COLORS.accentPurpleGlow}, ${COLORS.cyanGlow})`,
            filter: 'blur(40px)',
            opacity: 0.4 + Math.sin(frame * 0.06) * 0.15,
          }}
        />

        <PremiumPhoneMockup frame={frame}>
          {/* Enhanced playlist header */}
          <div
            style={{
              padding: '28px 32px',
              borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.15))',
              position: 'relative',
            }}
          >
            {/* Shimmer effect on header */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${COLORS.accentPurple}, transparent)`,
                opacity: 0.5,
              }}
            />
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 46,
                color: COLORS.textWhite,
                margin: 0,
                textShadow: `0 0 25px ${COLORS.accentPurpleGlow}`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              OPM Hits{' '}
              <span style={{
                transform: `rotate(${Math.sin(frame * 0.1) * 5}deg)`,
                display: 'inline-block',
              }}>
                🇵🇭
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 24,
                color: COLORS.textSecondary,
                margin: '14px 0 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{
                color: COLORS.accentGreen,
                fontWeight: 600,
                textShadow: `0 0 10px ${COLORS.accentGreenGlow}`,
              }}>5</span> songs • Ready to play
            </p>
          </div>

          {/* Playlist items with enhanced slide-in */}
          <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {PLAYLIST.map((song, index) => (
              <PremiumPlaylistItem
                key={index}
                index={index}
                song={song}
                frame={frame}
                fps={fps}
                delay={25 + index * 18}
                isPlaying={index === 0}
              />
            ))}
          </div>
        </PremiumPhoneMockup>

        {/* Floating index callouts */}
        {indexCallouts.map((callout) => {
          const calloutSpring = spring({
            frame: frame - callout.delay,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });
          const calloutOpacity = interpolate(calloutSpring, [0, 1], [0, 1]);
          const calloutScale = interpolate(calloutSpring, [0, 1], [0.5, 1]);
          const calloutX = -100 - Math.sin(frame * 0.05 + callout.index) * 5;

          if (frame < callout.delay) return null;

          return (
            <div
              key={callout.index}
              style={{
                position: 'absolute',
                left: calloutX,
                top: 145 + callout.index * 82,
                opacity: calloutOpacity,
                transform: `scale(${calloutScale})`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink})`,
                  padding: '10px 18px',
                  borderRadius: 14,
                  boxShadow: `0 0 20px ${COLORS.accentPurpleGlow}, 0 4px 15px rgba(0, 0, 0, 0.4)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.textWhite,
                }}>
                  [{callout.index}]
                </span>
                <span style={{
                  color: COLORS.textWhite,
                  fontSize: 14,
                  opacity: 0.8,
                }}>→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text with word-by-word reveal */}
      <div
        style={{
          marginTop: 45,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {bottomWords.map((word, i) => {
          const wordSpring = spring({
            frame: frame - word.delay,
            fps,
            config: SPRING_CONFIGS.snappy,
          });
          const wordOpacity = interpolate(wordSpring, [0, 1], [0, 1]);
          const wordY = interpolate(wordSpring, [0, 1], [25, 0]);
          const wordScale = interpolate(wordSpring, [0, 0.5, 1], [0.8, 1.1, 1]);

          const baseStyle: React.CSSProperties = {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 44,
            opacity: wordOpacity,
            transform: `translateY(${wordY}px) scale(${wordScale})`,
            display: 'inline-block',
          };

          if (word.gradient) {
            return (
              <span
                key={i}
                style={{
                  ...baseStyle,
                  background: `linear-gradient(135deg, ${word.gradient.join(', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 20px ${word.gradient[0]})`,
                }}
              >
                {word.text}
              </span>
            );
          }

          return (
            <span
              key={i}
              style={{
                ...baseStyle,
                color: word.color,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>

      {/* Pulse ring on final word */}
      {frame >= 145 && (
        <PulseRing frame={frame} delay={145} color={COLORS.accentYellow} glow={COLORS.accentYellowGlow} />
      )}
    </AbsoluteFill>
  );
};

// Premium Phone mockup with glass morphism
const PremiumPhoneMockup: React.FC<{ children: React.ReactNode; frame: number }> = ({ children, frame }) => {
  const pulse = 1 + Math.sin(frame * 0.05) * 0.03;

  return (
    <div
      style={{
        width: 560,
        position: 'relative',
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(circle at 50% 50%, ${COLORS.accentPurpleGlow}, transparent 70%)`,
          filter: `blur(30px)`,
          opacity: pulse,
        }}
      />

      <GlassCard
        style={{
          borderRadius: 44,
          overflow: 'hidden',
          border: `2px solid rgba(168, 85, 247, 0.4)`,
          position: 'relative',
        }}
        glowColor={COLORS.accentPurpleGlow}
        intensity={1.2}
      >
        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 24px',
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: COLORS.textWhite, fontWeight: 600 }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 12, color: COLORS.textWhite }}>📶</span>
            <span style={{ fontSize: 12, color: COLORS.textWhite }}>🔋</span>
          </div>
        </div>
        {children}
      </GlassCard>
    </div>
  );
};

// Premium Playlist item with enhanced visuals
const PremiumPlaylistItem: React.FC<{
  index: number;
  song: { title: string; artist: string; duration: string };
  frame: number;
  fps: number;
  delay: number;
  isPlaying?: boolean;
}> = ({ index, song, frame, fps, delay, isPlaying }) => {
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const translateX = interpolate(slideIn, [0, 1], [150, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Enhanced playing pulse
  const pulseScale = isPlaying
    ? 1 + Math.sin(frame * 0.2) * 0.04
    : 1;
  const glowIntensity = isPlaying
    ? 0.6 + Math.sin(frame * 0.3) * 0.4
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '20px 22px',
        background: isPlaying
          ? `rgba(168, 85, 247, 0.2)`
          : 'rgba(39, 39, 42, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: 16,
        opacity,
        transform: `translateX(${translateX}px) scale(${pulseScale})`,
        border: isPlaying
          ? `1px solid ${COLORS.accentPurple}`
          : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isPlaying
          ? `
            0 0 20px rgba(168, 85, 247, ${glowIntensity}),
            0 0 40px rgba(168, 85, 247, ${glowIntensity * 0.5}),
            inset 0 1px 1px rgba(255, 255, 255, 0.1)
          `
          : 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Index circle with glow */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: isPlaying
            ? `linear-gradient(135deg, ${COLORS.accentGreen}, ${COLORS.cyan})`
            : `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          boxShadow: isPlaying
            ? `0 0 20px ${COLORS.accentGreenGlow}, 0 4px 15px rgba(0, 0, 0, 0.3)`
            : `0 0 15px ${COLORS.accentPurpleGlow}, 0 4px 12px rgba(0, 0, 0, 0.3)`,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.black,
          }}
        >
          {index}
        </span>
      </div>

      {/* Song info */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 24,
            color: COLORS.textWhite,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: isPlaying ? `0 0 10px ${COLORS.accentGreenGlow}` : 'none',
          }}
        >
          {song.title}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: COLORS.textSecondary,
            marginTop: 4,
          }}
        >
          {song.artist}
        </div>
      </div>

      {/* Duration or playing indicator */}
      {isPlaying ? (
        <PremiumSoundWave frame={frame} />
      ) : (
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: COLORS.textSecondary,
            fontWeight: 500,
          }}
        >
          {song.duration}
        </span>
      )}
    </div>
  );
};

// Premium Sound wave with glow
const PremiumSoundWave: React.FC<{ frame: number; small?: boolean }> = ({ frame, small }) => {
  const barCount = 4;
  const size = small ? 14 : 22;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: small ? 2 : 4, height: size }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const height = 4 + Math.abs(Math.sin((frame + i * 10) * 0.3)) * (size - 4);
        const colors = [COLORS.accentGreen, COLORS.cyan, COLORS.accentGreen, COLORS.cyan];

        return (
          <div
            key={i}
            style={{
              width: small ? 3 : 4,
              height,
              background: `linear-gradient(180deg, ${colors[i]}, ${colors[i]}dd)`,
              borderRadius: 3,
              boxShadow: `0 0 8px ${COLORS.accentGreenGlow}, 0 0 12px ${COLORS.accentGreenGlow}`,
              transition: 'height 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        );
      })}
    </div>
  );
};

// ============ SCENE 3: CODE ============
const Scene3Code: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Phone shrinks and moves
  const phoneScale = interpolate(frame, [0, 35], [1, 0.6], { extrapolateRight: 'clamp' });
  const phoneX = interpolate(frame, [0, 35], [0, -280], { extrapolateRight: 'clamp' });

  // Code block appears
  const codeSpring = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const codeOpacity = interpolate(codeSpring, [0, 1], [0, 1]);
  const codeX = interpolate(codeSpring, [0, 1], [100, 0]);

  // Array declaration typing
  const arrayLines = [
    { text: 'let playlist = [', delay: 35 },
    { text: '  "Pantropiko",', delay: 50, songIndex: 0 },
    { text: '  "Ere",', delay: 62, songIndex: 1 },
    { text: '  "Raining in Manila",', delay: 74, songIndex: 2 },
    { text: '  "Pasilyo",', delay: 86, songIndex: 3 },
    { text: '  "Salamin"', delay: 98, songIndex: 4 },
    { text: ']', delay: 110 },
  ];

  // Index access examples
  const accessLines = [
    { text: 'playlist[0]  // "Pantropiko"', delay: 130, highlightIndex: 0 },
    { text: 'playlist[2]  // "Raining in Manila"', delay: 150, highlightIndex: 2 },
  ];

  // Determine which song to highlight
  let highlightedSong = -1;
  for (const line of [...arrayLines, ...accessLines]) {
    if (frame >= line.delay && 'songIndex' in line && line.songIndex !== undefined) {
      highlightedSong = line.songIndex;
    }
    if (frame >= line.delay && 'highlightIndex' in line && line.highlightIndex !== undefined) {
      highlightedSong = line.highlightIndex;
    }
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepPurple} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        gap: 20,
      }}
    >
      <AnimatedGradientBg frame={frame} intensity={0.5} />

      {/* Ambient orbs */}
      <GlowingOrb x={25} y={50} size={300} color={COLORS.accentYellow} glowColor={COLORS.accentYellowGlow} frame={frame} />
      <GlowingOrb x={75} y={50} size={320} color={COLORS.accentPurple} glowColor={COLORS.accentPurpleGlow} frame={frame} pulseSpeed={0.04} />

      {/* Mini phone */}
      <div
        style={{
          transform: `scale(${phoneScale}) translateX(${phoneX}px)`,
          transformOrigin: 'center',
          filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.5))',
        }}
      >
        <MiniPhonePlaylist highlightedIndex={highlightedSong} frame={frame} />
      </div>

      {/* Code block with glass morphism */}
      <div
        style={{
          opacity: codeOpacity,
          transform: `translateX(${codeX}px)`,
        }}
      >
        <GlassCard
          style={{
            borderRadius: 24,
            padding: '35px 40px',
            width: 620,
          }}
          glowColor={COLORS.accentPurpleGlow}
          intensity={1.3}
        >
          {/* Array declaration */}
          {arrayLines.map((line, i) => (
            <PremiumCodeLine key={i} {...line} frame={frame} fps={fps} />
          ))}

          {/* Spacing */}
          <div style={{ height: 24 }} />

          {/* Index access */}
          {accessLines.map((line, i) => (
            <PremiumCodeLine key={`access-${i}`} {...line} frame={frame} fps={fps} isAccess />
          ))}
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// Premium Code line with enhanced effects
const PremiumCodeLine: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
  isAccess?: boolean;
}> = ({ text, delay, frame, fps, isAccess }) => {
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Typewriter
  const charsToShow = Math.floor(
    interpolate(frame - delay, [0, 15], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);

  // Syntax highlight
  const highlighted = highlightArraySyntax(displayText, isAccess);

  if (frame < delay) return <div style={{ height: 42 }} />;

  return (
    <div style={{ opacity, minHeight: 42 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
          fontWeight: 600,
        }}
      >
        {highlighted}
        {frame - delay < 15 && (
          <span
            style={{
              color: COLORS.accentPurple,
              opacity: Math.floor((frame - delay) / 8) % 2,
              filter: `drop-shadow(0 0 8px ${COLORS.accentPurpleGlow})`,
            }}
          >
            |
          </span>
        )}
      </span>
    </div>
  );
};

// Enhanced Syntax highlighter with glow
const highlightArraySyntax = (code: string, isAccess?: boolean) => {
  if (isAccess) {
    const parts = code.split(/(playlist|\[\d+\]|\/\/.*)/);
    return parts.map((part, i) => {
      if (part === 'playlist') {
        return <span key={i} style={{ color: COLORS.textWhite, textShadow: `0 0 10px ${COLORS.accentPurpleGlow}` }}>{part}</span>;
      }
      if (part.match(/\[\d+\]/)) {
        return (
          <span key={i}>
            <span style={{ color: COLORS.textWhite }}>[</span>
            <span style={{
              color: COLORS.accentYellow,
              textShadow: `0 0 15px ${COLORS.accentYellowGlow}`,
              fontWeight: 700,
            }}>{part.slice(1, -1)}</span>
            <span style={{ color: COLORS.textWhite }}>]</span>
          </span>
        );
      }
      if (part.startsWith('//')) {
        return <span key={i} style={{ color: COLORS.codeGray, fontStyle: 'italic' }}>{part}</span>;
      }
      return <span key={i} style={{ color: COLORS.textWhite }}>{part}</span>;
    });
  }

  if (code.includes('let')) {
    const parts = code.split(/(let|playlist|=|\[|\])/);
    return parts.map((part, i) => {
      if (part === 'let') {
        return <span key={i} style={{
          color: COLORS.accentPurple,
          textShadow: `0 0 15px ${COLORS.accentPurpleGlow}`,
          fontWeight: 700,
        }}>{part}</span>;
      }
      if (part === 'playlist') {
        return <span key={i} style={{ color: COLORS.textWhite }}>{part}</span>;
      }
      return <span key={i} style={{ color: COLORS.textWhite }}>{part}</span>;
    });
  }

  if (code.includes('"')) {
    const parts = code.split(/(".*?")/);
    return parts.map((part, i) => {
      if (part.startsWith('"')) {
        return <span key={i} style={{
          color: COLORS.accentGreen,
          textShadow: `0 0 12px ${COLORS.accentGreenGlow}`,
        }}>{part}</span>;
      }
      return <span key={i} style={{ color: COLORS.textWhite }}>{part}</span>;
    });
  }

  return <span style={{ color: COLORS.textWhite }}>{code}</span>;
};

// Mini phone with premium glass effect
const MiniPhonePlaylist: React.FC<{ highlightedIndex: number; frame: number }> = ({
  highlightedIndex,
  frame,
}) => (
  <GlassCard
    style={{
      width: 300,
      borderRadius: 32,
      overflow: 'hidden',
    }}
    glowColor={COLORS.accentPurpleGlow}
    intensity={1.1}
  >
    {/* Header */}
    <div style={{
      padding: '14px 18px',
      borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
      background: 'rgba(0, 0, 0, 0.2)',
    }}>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: COLORS.textWhite,
          textShadow: `0 0 15px ${COLORS.accentPurpleGlow}`,
        }}
      >
        Road Trip 🚗
      </span>
    </div>

    {/* Songs */}
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {PLAYLIST.map((song, index) => {
        const isHighlighted = index === highlightedIndex;
        const pulseScale = isHighlighted ? 1 + Math.sin(frame * 0.25) * 0.03 : 1;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 12px',
              background: isHighlighted ? `rgba(168, 85, 247, 0.3)` : 'rgba(39, 39, 42, 0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: 10,
              transform: `scale(${pulseScale})`,
              border: isHighlighted ? `1px solid ${COLORS.accentPurple}` : '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: isHighlighted ? `0 0 20px ${COLORS.accentPurpleGlow}` : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: isHighlighted
                  ? `linear-gradient(135deg, ${COLORS.accentGreen}, ${COLORS.cyan})`
                  : `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: isHighlighted
                  ? `0 0 15px ${COLORS.accentGreenGlow}`
                  : `0 0 10px ${COLORS.accentPurpleGlow}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.black,
                }}
              >
                {index}
              </span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: COLORS.textWhite,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {song.title}
              </div>
            </div>
            {isHighlighted && <PremiumSoundWave frame={frame} small />}
          </div>
        );
      })}
    </div>
  </GlassCard>
);

// ============ SCENE 4: ARRAY ACTIONS ============
const Scene4Actions: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Track current playlist state
  const showOksigen = frame >= 45;
  const removedIndex1 = frame >= 90;
  const loopPhase = frame >= 120;

  let currentPlaylist = [...PLAYLIST];
  if (showOksigen) {
    currentPlaylist.push({ title: 'Cherry On Top', artist: 'BINI', duration: '2:58' });
  }
  if (removedIndex1) {
    currentPlaylist = currentPlaylist.filter((_, i) => i !== 1);
  }

  let loopHighlight = -1;
  if (loopPhase) {
    const loopFrame = frame - 120;
    loopHighlight = Math.floor(loopFrame / 10) % currentPlaylist.length;
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepPurple} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        gap: 35,
      }}
    >
      <AnimatedGradientBg frame={frame} intensity={0.7} />

      {/* Ambient orbs */}
      <GlowingOrb x={20} y={30} size={280} color={COLORS.accentGreen} glowColor={COLORS.accentGreenGlow} frame={frame} />
      <GlowingOrb x={80} y={70} size={300} color={COLORS.accentPink} glowColor={COLORS.accentPinkGlow} frame={frame} pulseSpeed={0.035} />

      {/* Phone with dynamic playlist */}
      <div style={{ transform: 'scale(0.85)', filter: 'drop-shadow(0 25px 70px rgba(0, 0, 0, 0.6))' }}>
        <DynamicPhonePlaylist
          playlist={currentPlaylist}
          highlightedIndex={loopHighlight}
          frame={frame}
          fps={fps}
          showAddAnimation={frame >= 40 && frame < 60}
          showRemoveAnimation={frame >= 75 && frame < 100}
          removedIndex={removedIndex1 ? -1 : 1}
        />
      </div>

      {/* Code actions */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          width: 580,
        }}
      >
        <PremiumActionBlock
          frame={frame}
          fps={fps}
          delay={0}
          code='playlist.push("Cherry On Top")'
          label="Add to end"
          icon="+"
          iconColor={COLORS.accentGreen}
          iconGlow={COLORS.accentGreenGlow}
        />

        <PremiumActionBlock
          frame={frame}
          fps={fps}
          delay={60}
          code="playlist.splice(1, 1)"
          label="Remove from anywhere"
          icon="−"
          iconColor={COLORS.accentPink}
          iconGlow={COLORS.accentPinkGlow}
        />

        <PremiumActionBlock
          frame={frame}
          fps={fps}
          delay={120}
          code={`playlist.forEach(song => {\n  play(song)\n})`}
          label="Loop through all"
          icon="↻"
          iconColor={COLORS.accentYellow}
          iconGlow={COLORS.accentYellowGlow}
          multiline
        />
      </div>
    </AbsoluteFill>
  );
};

// Premium Action block with glass morphism
const PremiumActionBlock: React.FC<{
  frame: number;
  fps: number;
  delay: number;
  code: string;
  label: string;
  icon: string;
  iconColor: string;
  iconGlow: string;
  multiline?: boolean;
}> = ({ frame, fps, delay, code, label, icon, iconColor, iconGlow, multiline }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const slideIn = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);
  const translateY = interpolate(slideIn, [0, 1], [40, 0]);

  // Label flash with glow
  const labelOpacity = interpolate(localFrame, [20, 30, 50, 55], [0, 1, 1, 0.8], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <GlassCard
        style={{
          borderRadius: 18,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 20,
        }}
        glowColor={iconGlow}
        intensity={1.2}
      >
        {/* Icon with glow */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            boxShadow: `
              0 0 20px ${iconGlow},
              0 0 40px ${iconGlow},
              0 4px 15px rgba(0, 0, 0, 0.4)
            `,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.black,
            }}
          >
            {icon}
          </span>
        </div>

        {/* Code and label */}
        <div style={{ flex: 1 }}>
          <pre
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: multiline ? 22 : 26,
              fontWeight: 600,
              color: COLORS.textWhite,
              margin: 0,
              whiteSpace: 'pre-wrap',
              textShadow: `0 0 15px ${iconGlow}`,
            }}
          >
            {code}
          </pre>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              color: iconColor,
              fontWeight: 700,
              opacity: labelOpacity,
              textShadow: `0 0 20px ${iconGlow}`,
            }}
          >
            {label}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// Dynamic phone playlist with premium effects
const DynamicPhonePlaylist: React.FC<{
  playlist: { title: string; artist: string; duration: string }[];
  highlightedIndex: number;
  frame: number;
  fps: number;
  showAddAnimation: boolean;
  showRemoveAnimation: boolean;
  removedIndex: number;
}> = ({
  playlist,
  highlightedIndex,
  frame,
  fps,
  showAddAnimation,
  showRemoveAnimation,
  removedIndex,
}) => (
  <GlassCard
    style={{
      width: 340,
      borderRadius: 36,
      overflow: 'hidden',
    }}
    glowColor={COLORS.accentPurpleGlow}
    intensity={1.2}
  >
    <div style={{
      padding: '16px 20px',
      borderBottom: `1px solid rgba(255, 255, 255, 0.05)`,
      background: 'rgba(0, 0, 0, 0.2)',
    }}>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: COLORS.textWhite,
          textShadow: `0 0 15px ${COLORS.accentPurpleGlow}`,
        }}
      >
        Road Trip 🚗
      </span>
    </div>

    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {playlist.map((song, index) => {
        const isHighlighted = index === highlightedIndex;
        const isNew = song.title === 'Oksigen';
        const isBeingRemoved = showRemoveAnimation && index === removedIndex;

        const pulseScale = isHighlighted ? 1 + Math.sin(frame * 0.3) * 0.04 : 1;
        const newScale = isNew && showAddAnimation
          ? spring({ frame: frame - 40, fps: 30, config: SPRING_CONFIGS.bouncy })
          : 1;
        const removeOpacity = isBeingRemoved
          ? interpolate(frame - 75, [0, 20], [1, 0], { extrapolateRight: 'clamp' })
          : 1;
        const removeX = isBeingRemoved
          ? interpolate(frame - 75, [0, 20], [0, 150], { extrapolateRight: 'clamp' })
          : 0;

        return (
          <div
            key={`${song.title}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              background: isHighlighted
                ? `rgba(168, 85, 247, 0.3)`
                : isNew
                  ? `rgba(74, 222, 128, 0.2)`
                  : 'rgba(39, 39, 42, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 12,
              transform: `scale(${pulseScale * (typeof newScale === 'number' ? newScale : 1)}) translateX(${removeX}px)`,
              opacity: removeOpacity,
              border: isHighlighted
                ? `1px solid ${COLORS.accentPurple}`
                : isNew
                  ? `1px solid ${COLORS.accentGreen}`
                  : '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: isHighlighted
                ? `0 0 20px ${COLORS.accentPurpleGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                : isNew
                  ? `0 0 20px ${COLORS.accentGreenGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                  : 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isHighlighted
                  ? `linear-gradient(135deg, ${COLORS.accentGreen}, ${COLORS.cyan})`
                  : `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: isHighlighted
                  ? `0 0 15px ${COLORS.accentGreenGlow}`
                  : `0 0 10px ${COLORS.accentPurpleGlow}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.black,
                }}
              >
                {index}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: COLORS.textWhite,
                }}
              >
                {song.title}
              </div>
            </div>
            {isHighlighted && <PremiumSoundWave frame={frame} small />}
          </div>
        );
      })}
    </div>
  </GlassCard>
);

// ============ SCENE 5: AHA MOMENT ============
const Scene5Aha: React.FC<{ fps: number; showMusicNotes: boolean }> = ({
  fps,
  showMusicNotes,
}) => {
  const frame = useCurrentFrame();

  // SLAM effect for main text
  const mainSlam = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const mainScale = interpolate(mainSlam, [0, 0.5, 0.8, 1], [3, 0.9, 1.05, 1]);
  const mainOpacity = interpolate(mainSlam, [0, 0.3, 1], [0, 1, 1]);

  // Flash effect on slam
  const flashOpacity = interpolate(frame, [0, 5, 15], [0, 0.8, 0], { extrapolateRight: 'clamp' });

  // Word-by-word reveal for main text
  const mainWords = [
    { text: 'An', delay: 0 },
    { text: 'array', delay: 5, gradient: [COLORS.accentPurple, COLORS.accentPink] },
    { text: 'is', delay: 10 },
    { text: 'a', delay: 13 },
    { text: 'playlist.', delay: 16, gradient: [COLORS.accentGreen, COLORS.cyan] },
  ];

  const points = [
    { emoji: '📋', text: 'Items in order', delay: 25, color: COLORS.accentPurple, glow: COLORS.accentPurpleGlow },
    { emoji: '🔢', text: 'Access by index', delay: 38, color: COLORS.accentGreen, glow: COLORS.accentGreenGlow },
    { emoji: '🔁', text: 'Loop through all', delay: 51, color: COLORS.cyan, glow: COLORS.cyanGlow },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepPurple} 0%, ${COLORS.vibrantPink} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        overflow: 'hidden',
      }}
    >
      {/* Enhanced animated gradient with celebration intensity */}
      <AnimatedGradientBg frame={frame} intensity={1.3} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${COLORS.goldGlow} 0%, transparent 50%)`,
          opacity: 0.2 + Math.sin(frame * 0.1) * 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Flash effect on impact */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'white',
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Confetti celebration */}
      <ConfettiEffect frame={frame} startFrame={5} />

      {showMusicNotes && <PremiumFloatingParticles frame={frame} bright density={35} />}

      {/* Multiple glowing orbs for celebration */}
      <GlowingOrb x={10} y={20} size={400} color={COLORS.accentPurple} glowColor={COLORS.accentPurpleGlow} frame={frame} />
      <GlowingOrb x={90} y={20} size={350} color={COLORS.accentPink} glowColor={COLORS.accentPinkGlow} frame={frame} pulseSpeed={0.04} />
      <GlowingOrb x={50} y={80} size={380} color={COLORS.cyan} glowColor={COLORS.cyanGlow} frame={frame} pulseSpeed={0.035} />
      <GlowingOrb x={30} y={60} size={250} color={COLORS.gold} glowColor={COLORS.goldGlow} frame={frame} pulseSpeed={0.05} />
      <GlowingOrb x={70} y={70} size={280} color={COLORS.accentGreen} glowColor={COLORS.accentGreenGlow} frame={frame} pulseSpeed={0.045} />

      {/* Main revelation with word-by-word reveal */}
      <div
        style={{
          marginBottom: 70,
          display: 'flex',
          gap: 18,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {mainWords.map((word, i) => {
          const wordSpring = spring({
            frame: frame - word.delay,
            fps,
            config: SPRING_CONFIGS.slam,
          });
          const wordScale = interpolate(wordSpring, [0, 0.5, 1], [2.5, 0.95, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 0.3, 1], [0, 1, 1]);
          const wordY = interpolate(wordSpring, [0, 1], [-20, 0]);

          const baseStyle: React.CSSProperties = {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            letterSpacing: '-0.02em',
            display: 'inline-block',
            transform: `scale(${wordScale}) translateY(${wordY}px)`,
            opacity: wordOpacity,
          };

          if (word.gradient) {
            return (
              <span
                key={i}
                style={{
                  ...baseStyle,
                  background: `linear-gradient(135deg, ${word.gradient.join(', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 40px ${word.gradient[0]}) drop-shadow(0 0 60px ${word.gradient[1]})`,
                }}
              >
                {word.text}
              </span>
            );
          }

          return (
            <span
              key={i}
              style={{
                ...baseStyle,
                color: COLORS.textWhite,
                textShadow: `
                  0 0 30px ${COLORS.accentPurpleGlow},
                  0 0 50px ${COLORS.accentPinkGlow},
                  0 4px 40px rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              {word.text}
            </span>
          );
        })}

        {/* Sparkle burst on "playlist" reveal */}
        {frame >= 16 && frame < 45 && (
          <SparkleEffect frame={frame - 16} count={20} spread={300} />
        )}
      </div>

      {/* Three points with enhanced glass cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
        {points.map((point, i) => {
          const pointSpring = spring({
            frame: frame - point.delay,
            fps,
            config: SPRING_CONFIGS.elastic,
          });
          const pointOpacity = interpolate(pointSpring, [0, 1], [0, 1]);
          const pointY = interpolate(pointSpring, [0, 1], [50, 0]);
          const pointScale = interpolate(pointSpring, [0, 0.5, 1], [0.8, 1.08, 1]);
          const pointX = interpolate(pointSpring, [0, 1], [i % 2 === 0 ? -100 : 100, 0]);

          // Emoji bounce
          const emojiBounce = Math.sin((frame - point.delay) * 0.2) * 4;
          const emojiRotate = Math.sin((frame - point.delay) * 0.15) * 8;

          return (
            <div
              key={i}
              style={{
                opacity: pointOpacity,
                transform: `translateY(${pointY}px) translateX(${pointX}px) scale(${pointScale})`,
              }}
            >
              <GlassCard
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '24px 40px',
                  borderRadius: 20,
                  minWidth: 380,
                }}
                glowColor={point.glow}
                intensity={1.4}
              >
                <span
                  style={{
                    fontSize: 52,
                    filter: `drop-shadow(0 0 20px ${point.glow})`,
                    transform: `translateY(${emojiBounce}px) rotate(${emojiRotate}deg)`,
                    display: 'inline-block',
                  }}
                >
                  {point.emoji}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 800,
                    fontSize: 40,
                    color: point.color,
                    textShadow: `
                      0 0 25px ${point.glow},
                      0 0 50px ${point.glow}
                    `,
                  }}
                >
                  {point.text}
                </span>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* Celebration pulse rings */}
      {frame >= 5 && <PulseRing frame={frame} delay={5} color={COLORS.accentPurple} glow={COLORS.accentPurpleGlow} />}
      {frame >= 55 && <PulseRing frame={frame} delay={55} color={COLORS.gold} glow={COLORS.goldGlow} />}
    </AbsoluteFill>
  );
};

// ============ SCENE 6: CTA ============
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Terminal entrance slam
  const terminalSlam = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const terminalScale = interpolate(terminalSlam, [0, 0.5, 0.8, 1], [0.5, 1.08, 0.98, 1]);
  const terminalY = interpolate(terminalSlam, [0, 1], [-80, 0]);

  const codeLines = [
    { text: 'playlist.push("yourCodingJourney")', delay: 8 },
    { text: '', delay: 25 },
    { text: '// Welcome to your next level', delay: 30 },
    { text: 'Now playing: DOGM.AI', delay: 40 },
  ];

  // Logo with slam entrance
  const logoSlam = spring({
    frame: frame - 50,
    fps,
    config: SPRING_CONFIGS.elastic,
  });
  const logoOpacity = interpolate(logoSlam, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSlam, [0, 0.5, 1], [0.5, 1.15, 1]);
  const logoY = interpolate(logoSlam, [0, 1], [30, 0]);

  // Glitch effect on logo
  const glitchOffset = frame % 120 < 5 ? Math.random() * 4 - 2 : 0;
  const glitchColor = frame % 120 < 5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        overflow: 'hidden',
      }}
    >
      {/* Enhanced gradient with spotlight */}
      <AnimatedGradientBg frame={frame} intensity={0.6} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 60%, ${COLORS.accentPurpleGlow} 0%, transparent 50%)`,
          opacity: 0.25,
          pointerEvents: 'none',
        }}
      />

      <ScanlineEffect frame={frame} intensity={0.1} />

      {/* Multiple ambient orbs */}
      <GlowingOrb x={20} y={40} size={450} color={COLORS.accentPurple} glowColor={COLORS.accentPurpleGlow} frame={frame} />
      <GlowingOrb x={80} y={40} size={380} color={COLORS.accentPink} glowColor={COLORS.accentPinkGlow} frame={frame} pulseSpeed={0.04} />
      <GlowingOrb x={50} y={85} size={350} color={COLORS.cyan} glowColor={COLORS.cyanGlow} frame={frame} pulseSpeed={0.035} />

      {/* Terminal with SLAM entrance */}
      <div
        style={{
          transform: `scale(${terminalScale}) translateY(${terminalY}px)`,
          position: 'relative',
        }}
      >
        {/* Outer glow halo */}
        <div
          style={{
            position: 'absolute',
            inset: -25,
            borderRadius: 35,
            background: `linear-gradient(135deg, ${COLORS.accentPurpleGlow}, ${COLORS.cyanGlow})`,
            filter: 'blur(35px)',
            opacity: 0.35 + Math.sin(frame * 0.06) * 0.1,
          }}
        />

        <GlassCard
          style={{
            borderRadius: 24,
            padding: '36px 48px',
            width: 880,
            position: 'relative',
          }}
          glowColor={COLORS.accentPurpleGlow}
          intensity={1.5}
        >
          {/* Terminal header with enhanced dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            borderBottom: `1px solid rgba(255, 255, 255, 0.08)`,
            paddingBottom: 16,
          }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { color: '#ef4444', shadow: '#ef4444' },
                { color: '#eab308', shadow: '#eab308' },
                { color: '#22c55e', shadow: '#22c55e' },
              ].map((dot, i) => (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${dot.color}, ${dot.color}cc)`,
                    boxShadow: `0 0 12px ${dot.shadow}, 0 0 20px ${dot.shadow}50`,
                  }}
                />
              ))}
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: COLORS.textSecondary,
              marginLeft: 16,
              opacity: 0.7,
            }}>
              DOGM-terminal
            </span>
          </div>

          {/* Code lines with enhanced typewriter */}
          {codeLines.map((line, i) => {
            const lineSpring = spring({
              frame: frame - line.delay,
              fps,
              config: SPRING_CONFIGS.snappy,
            });
            const lineOpacity = interpolate(lineSpring, [0, 1], [0, 1]);

            const charsToShow = Math.floor(
              interpolate(frame - line.delay, [0, 18], [0, line.text.length], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            );
            const displayText = line.text.substring(0, charsToShow);

            let highlighted: React.ReactNode = displayText;
            if (displayText.includes('playlist')) {
              const stringMatch = displayText.match(/".*"/)?.[0] || '';
              highlighted = (
                <>
                  <span style={{
                    color: COLORS.cyan,
                    textShadow: `0 0 12px ${COLORS.cyanGlow}`,
                  }}>playlist</span>
                  <span style={{ color: COLORS.textWhite }}>.</span>
                  <span style={{
                    color: COLORS.accentPurple,
                    textShadow: `0 0 15px ${COLORS.accentPurpleGlow}`,
                    fontWeight: 700,
                  }}>push</span>
                  <span style={{ color: COLORS.textWhite }}>(</span>
                  <span style={{
                    color: COLORS.accentGreen,
                    textShadow: `0 0 18px ${COLORS.accentGreenGlow}`,
                    fontWeight: 600,
                  }}>
                    {stringMatch}
                  </span>
                  <span style={{ color: COLORS.textWhite }}>)</span>
                </>
              );
            } else if (displayText.startsWith('//')) {
              highlighted = (
                <span style={{
                  color: COLORS.codeGray,
                  fontStyle: 'italic',
                }}>
                  {displayText}
                </span>
              );
            } else if (displayText.includes('Now playing')) {
              highlighted = (
                <>
                  <span style={{ color: COLORS.accentGreen, textShadow: `0 0 10px ${COLORS.accentGreenGlow}` }}>▶ </span>
                  <span style={{ color: COLORS.textSecondary }}>Now playing: </span>
                  <span style={{
                    background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple}, ${COLORS.cyan})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 800,
                    filter: `drop-shadow(0 0 25px ${COLORS.accentPinkGlow})`,
                  }}>DOGM.AI</span>
                </>
              );
            }

            if (frame < line.delay) return <div key={i} style={{ height: 44 }} />;

            return (
              <div key={i} style={{ opacity: lineOpacity, minHeight: 44 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 30,
                  fontWeight: 600,
                }}>
                  {highlighted}
                  {frame - line.delay < 18 && frame >= line.delay && line.text && (
                    <span
                      style={{
                        color: COLORS.accentGreen,
                        opacity: Math.floor((frame - line.delay) / 6) % 2,
                        filter: `drop-shadow(0 0 12px ${COLORS.accentGreenGlow})`,
                        fontWeight: 400,
                      }}
                    >
                      █
                    </span>
                  )}
                </span>
              </div>
            );
          })}

          {/* Enhanced sound wave visualizer */}
          {frame > 45 && (
            <div
              style={{
                marginTop: 30,
                display: 'flex',
                justifyContent: 'center',
                opacity: interpolate(frame, [45, 55], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <LargePremiumSoundWave frame={frame} />
            </div>
          )}
        </GlassCard>
      </div>

      {/* Logo with SLAM and glitch effect */}
      <div
        style={{
          marginTop: 55,
          opacity: logoOpacity,
          transform: `scale(${logoScale}) translateY(${logoY}px) translateX(${glitchOffset}px)`,
          position: 'relative',
        }}
      >
        {/* Glitch layers */}
        {glitchColor && (
          <>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 80,
                color: COLORS.cyan,
                letterSpacing: '-0.03em',
                opacity: 0.7,
                left: -3,
                top: 0,
              }}
            >
              DOGM.AI
            </span>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 900,
                fontSize: 80,
                color: COLORS.accentPink,
                letterSpacing: '-0.03em',
                opacity: 0.7,
                left: 3,
                top: 0,
              }}
            >
              DOGM.AI
            </span>
          </>
        )}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 80,
            background: `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink}, ${COLORS.cyan}, ${COLORS.accentGreen})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            filter: `
              drop-shadow(0 0 40px ${COLORS.accentPurpleGlow})
              drop-shadow(0 0 60px ${COLORS.accentPinkGlow})
            `,
            position: 'relative',
          }}
        >
          DOGM.AI
        </span>
      </div>


      {/* Sparkle effect on logo reveal */}
      {frame >= 50 && frame < 80 && (
        <SparkleEffect frame={frame - 50} count={16} spread={200} />
      )}
    </AbsoluteFill>
  );
};

// Large premium sound wave for CTA
const LargePremiumSoundWave: React.FC<{ frame: number }> = ({ frame }) => {
  const barCount = 24;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, height: 60 }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const height = 10 + Math.abs(Math.sin((frame + i * 6) * 0.25)) * 48;
        const colors = [
          { base: COLORS.accentPurple, glow: COLORS.accentPurpleGlow },
          { base: COLORS.accentPink, glow: COLORS.accentPinkGlow },
          { base: COLORS.cyan, glow: COLORS.cyanGlow },
          { base: COLORS.accentGreen, glow: COLORS.accentGreenGlow },
        ];
        const colorSet = colors[i % colors.length];

        return (
          <div
            key={i}
            style={{
              width: 5,
              height,
              background: `linear-gradient(180deg, ${colorSet.base}, ${colorSet.base}cc)`,
              borderRadius: 3,
              boxShadow: `
                0 0 15px ${colorSet.glow},
                0 0 25px ${colorSet.glow}
              `,
              transition: 'height 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        );
      })}
    </div>
  );
};
