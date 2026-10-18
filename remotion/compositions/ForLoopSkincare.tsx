import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Easing,
} from 'remotion';

// Font face declarations
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Inter:wght@400;600;700;800&display=swap');
`;

export interface ForLoopSkincareProps {
  showSparkles?: boolean;
}

// Premium color palette with glow variants
const COLORS = {
  background: '#0a0a0f',
  backgroundLight: '#12121a',
  surface: '#1a1a24',
  lavender: '#e9d5ff',
  lavenderGlow: 'rgba(233, 213, 255, 0.4)',
  pink: '#ec4899',
  pinkGlow: 'rgba(236, 72, 153, 0.4)',
  pinkLight: '#fce7f3',
  darkPurple: '#1e1b4b',
  deepPurple: '#0f0a1e',
  text: '#ffffff',
  textDark: '#3b0764',
  textMuted: '#8b8ba3',
  accentPink: '#f472b6',
  accentPinkGlow: 'rgba(244, 114, 182, 0.4)',
  accentGreen: '#4ade80',
  accentGreenGlow: 'rgba(74, 222, 128, 0.4)',
  accentYellow: '#facc15',
  accentYellowGlow: 'rgba(250, 204, 21, 0.4)',
  accentPurple: '#a855f7',
  accentPurpleGlow: 'rgba(168, 85, 247, 0.4)',
  cyan: '#06b6d4',
  cyanGlow: 'rgba(6, 182, 212, 0.4)',
  gradient1: '#1e1b4b',
  gradient2: '#312e81',
  gold: '#ffd700',
  goldGlow: 'rgba(255, 215, 0, 0.6)',
};

// Premium spring configurations
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

// Product data
const PRODUCTS = [
  { icon: '🧴', name: 'cleanser', label: 'cleanser()' },
  { icon: '💧', name: 'toner', label: 'toner()' },
  { icon: '✨', name: 'serum', label: 'serum()' },
  { icon: '🧴', name: 'moisturizer', label: 'moisturizer()' },
];

// ============================================
// PREMIUM COMPONENTS
// ============================================

// Animated gradient background
const AnimatedGradientBg: React.FC<{ frame: number; colors?: string[]; opacity?: number }> = ({
  frame,
  colors = [COLORS.gradient1, COLORS.accentPurple, COLORS.gradient2],
  opacity = 0.4,
}) => {
  const rotation = frame * 0.4;
  const scale = 1 + Math.sin(frame * 0.015) * 0.15;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors[0]} 0deg, ${colors[1]} 120deg, ${colors[2]} 240deg, ${colors[0]} 360deg)`,
          opacity,
          transform: `scale(${scale})`,
          filter: 'blur(120px)',
        }}
      />
    </div>
  );
};

// Premium floating particles
const PremiumFloatingParticles: React.FC<{
  frame: number;
  count?: number;
  colors?: string[];
  glowColors?: string[];
}> = ({
  frame,
  count = 30,
  colors = [COLORS.accentPink, COLORS.accentPurple, COLORS.cyan],
  glowColors = [COLORS.accentPinkGlow, COLORS.accentPurpleGlow, COLORS.cyanGlow],
}) => {
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5;
    const x = (seed * 7.3) % 100;
    const baseY = (seed * 13.7) % 100;
    const size = 3 + (seed % 5);
    const speed = 0.25 + (seed % 0.4);
    const delay = seed % 100;
    const colorIndex = i % colors.length;

    const y = (baseY + frame * speed + delay) % 130 - 15;
    const wobble = Math.sin((frame + seed) * 0.025) * 20;
    const pulse = 0.4 + Math.sin((frame + seed) * 0.04) * 0.6;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x + wobble * 0.2}%`,
          top: `${y}%`,
          width: size,
          height: size,
          backgroundColor: colors[colorIndex],
          borderRadius: '50%',
          opacity: pulse * 0.6,
          boxShadow: `0 0 ${size * 4}px ${size * 1.5}px ${glowColors[colorIndex]}`,
          transform: `scale(${pulse})`,
        }}
      />
    );
  });

  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>{particles}</div>;
};

// Glowing orb
const GlowingOrb: React.FC<{
  frame: number;
  x: string;
  y: string;
  color: string;
  size?: number;
  pulseSpeed?: number;
}> = ({ frame, x, y, color, size = 400, pulseSpeed = 0.02 }) => {
  const pulse = 1 + Math.sin(frame * pulseSpeed) * 0.25;
  const drift = Math.sin(frame * 0.012) * 25;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size * pulse,
        height: size * pulse,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(-50%, -50%) translateX(${drift}px)`,
        opacity: 0.5,
        filter: 'blur(60px)',
      }}
    />
  );
};

// Glass morphism card
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}> = ({ children, style, glowColor = COLORS.accentPinkGlow }) => (
  <div
    style={{
      background: 'rgba(26, 26, 36, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: 24,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px ${glowColor}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// Premium code block
const PremiumCodeBlock: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: 'rgba(10, 10, 15, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '25px 35px',
      borderRadius: 20,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      ...style,
    }}
  >
    {children}
  </div>
);

// Sparkle effect component
const SparkleEffect: React.FC<{
  frame: number;
  x: string;
  y: string;
  delay?: number;
  color?: string;
}> = ({ frame, x, y, delay = 0, color = COLORS.gold }) => {
  const adjustedFrame = Math.max(0, frame - delay);
  const sparkleSpring = spring({
    frame: adjustedFrame,
    fps: 30,
    config: SPRING_CONFIGS.celebration,
  });

  const rotation = adjustedFrame * 8;
  const scale = interpolate(sparkleSpring, [0, 1], [0, 1.2]) * (1 + Math.sin(adjustedFrame * 0.3) * 0.2);
  const opacity = interpolate(adjustedFrame, [0, 10, 40, 60], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  if (adjustedFrame <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        fontSize: 40,
        filter: `drop-shadow(0 0 15px ${color})`,
        zIndex: 100,
      }}
    >
      ✨
    </div>
  );
};

// Confetti effect component
const ConfettiEffect: React.FC<{ frame: number; startFrame?: number }> = ({
  frame,
  startFrame = 0,
}) => {
  const adjustedFrame = frame - startFrame;
  if (adjustedFrame < 0) return null;

  const confetti = Array.from({ length: 25 }, (_, i) => {
    const seed = i * 73.7;
    const x = 20 + (seed * 2.3) % 60;
    const startY = -10;
    const endY = 120;
    const speed = 1.5 + (seed % 1.5);
    const wobbleSpeed = 0.08 + (seed % 0.04);
    const wobbleAmount = 15 + (seed % 25);
    const rotationSpeed = 4 + (seed % 6);
    const colors = [COLORS.accentPink, COLORS.accentPurple, COLORS.gold, COLORS.cyan, COLORS.accentGreen];
    const color = colors[i % colors.length];
    const size = 8 + (seed % 8);
    const delay = (seed % 15);

    const delayedFrame = Math.max(0, adjustedFrame - delay);
    const y = startY + delayedFrame * speed;
    const wobble = Math.sin(delayedFrame * wobbleSpeed) * wobbleAmount;
    const rotation = delayedFrame * rotationSpeed;
    const opacity = interpolate(delayedFrame, [0, 10, 60, 80], [0, 1, 1, 0], {
      extrapolateRight: 'clamp',
    });

    if (y > endY || delayedFrame <= 0) return null;

    const shapes = ['■', '●', '▲', '♦'];
    const shape = shapes[i % shapes.length];

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x + wobble * 0.3}%`,
          top: `${y}%`,
          transform: `rotate(${rotation}deg)`,
          fontSize: size,
          color,
          opacity,
          textShadow: `0 0 10px ${color}`,
        }}
      >
        {shape}
      </div>
    );
  });

  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 50 }}>{confetti}</div>;
};

// Pulse ring effect
const PulseRing: React.FC<{
  frame: number;
  x: string;
  y: string;
  delay?: number;
  color?: string;
  maxSize?: number;
}> = ({ frame, x, y, delay = 0, color = COLORS.accentPink, maxSize = 300 }) => {
  const adjustedFrame = Math.max(0, frame - delay);
  const progress = interpolate(adjustedFrame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const size = progress * maxSize;
  const opacity = interpolate(progress, [0, 0.3, 1], [0.8, 0.5, 0]);

  if (adjustedFrame <= 0 || progress >= 1) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        opacity,
        boxShadow: `0 0 30px ${color}, inset 0 0 30px ${color}`,
        zIndex: 90,
      }}
    />
  );
};

// Moon icon with glow
const GlowingMoon: React.FC<{ frame: number; opacity: number; rotation: number }> = ({
  frame,
  opacity,
  rotation,
}) => {
  const pulse = 1 + Math.sin(frame * 0.08) * 0.1;
  const glowIntensity = 0.5 + Math.sin(frame * 0.1) * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        right: 70,
        fontSize: 70,
        opacity,
        transform: `rotate(${rotation}deg) scale(${pulse})`,
        filter: `drop-shadow(0 0 ${30 * glowIntensity}px ${COLORS.accentYellowGlow})`,
      }}
    >
      🌙
    </div>
  );
};

export const ForLoopSkincare: React.FC<ForLoopSkincareProps> = ({
  showSparkles = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-90 frames / 0-3 sec) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Hook fps={fps} showSparkles={showSparkles} />
      </Sequence>

      {/* Scene 2: The Routine Visualized (90-330 frames / 3-11 sec) */}
      <Sequence from={90} durationInFrames={240}>
        <Scene2Routine fps={fps} showSparkles={showSparkles} />
      </Sequence>

      {/* Scene 3: Now In Code (330-570 frames / 11-19 sec) */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Loop Visualization (570-750 frames / 19-25 sec) */}
      <Sequence from={570} durationInFrames={180}>
        <Scene4LoopViz fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (750-900 frames / 25-30 sec) */}
      <Sequence from={750} durationInFrames={150}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (900-1050 frames / 30-35 sec) */}
      <Sequence from={900} durationInFrames={150}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 1: Hook
// ============================================
const Scene1Hook: React.FC<{ fps: number; showSparkles: boolean }> = ({ fps, showSparkles }) => {
  const frame = useCurrentFrame();

  // SLAM entrance for main text
  const slamSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const slamScale = interpolate(slamSpring, [0, 1], [2.5, 1]);
  const slamOpacity = interpolate(slamSpring, [0, 0.3, 1], [0, 1, 1]);
  const slamRotation = interpolate(slamSpring, [0, 1], [-8, 0]);

  // Word-by-word reveal for main text
  const mainWords = ['You', 'run', 'a', 'loop', 'every', 'night.'];
  const wordDelays = [0, 5, 10, 15, 22, 28];

  // Sub text with wobbly entrance
  const subTextSpring = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.wobbly,
  });

  const subTextOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subTextY = interpolate(subTextSpring, [0, 1], [40, 0]);
  const subTextRotation = interpolate(subTextSpring, [0, 1], [5, 0]);

  // Moon icon with enhanced entrance
  const moonSpring = spring({
    frame: frame - 8,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const moonOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const moonRotate = interpolate(moonSpring, [0, 1], [-45, 0]);
  const moonScale = interpolate(moonSpring, [0, 1], [0.3, 1]);
  const moonFloat = Math.sin(frame * 0.08) * 5;

  // Shockwave rings on SLAM (multiple)
  const shockwaveProgress = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const shockwave2Progress = interpolate(frame, [12, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing glow
  const glowPulse = 0.7 + Math.sin(frame * 0.12) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.pink, COLORS.lavender]} opacity={0.35} />
      {showSparkles && <PremiumFloatingParticles frame={frame} count={30} />}
      <GlowingOrb frame={frame} x="30%" y="30%" color={COLORS.accentPink} size={500} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="70%" y="70%" color={COLORS.accentPurple} size={450} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="50%" y="50%" color={COLORS.lavender} size={350} pulseSpeed={0.02} />

      {/* Shockwave ring effects on SLAM */}
      {frame >= 5 && frame < 40 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            width: shockwaveProgress * 900,
            height: shockwaveProgress * 900,
            borderRadius: '50%',
            border: `3px solid ${COLORS.accentPink}`,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - shockwaveProgress,
            boxShadow: `0 0 50px ${COLORS.accentPinkGlow}`,
            zIndex: 5,
          }}
        />
      )}
      {frame >= 12 && frame < 47 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            width: shockwave2Progress * 700,
            height: shockwave2Progress * 700,
            borderRadius: '50%',
            border: `2px solid ${COLORS.accentPurple}`,
            transform: 'translate(-50%, -50%)',
            opacity: (1 - shockwave2Progress) * 0.7,
            boxShadow: `0 0 30px ${COLORS.accentPurpleGlow}`,
            zIndex: 4,
          }}
        />
      )}

      {/* Moon icon with glow - enhanced with float */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: 70,
          fontSize: 80,
          opacity: moonOpacity,
          transform: `rotate(${moonRotate}deg) scale(${moonScale}) translateY(${moonFloat}px)`,
          filter: `drop-shadow(0 0 ${40 * glowPulse}px ${COLORS.accentYellowGlow})`,
        }}
      >
        🌙
      </div>

      {/* Main headline with word-by-word SLAM reveal */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 20px',
          position: 'relative',
          zIndex: 10,
          transform: `scale(${slamScale}) rotate(${slamRotation}deg)`,
          opacity: slamOpacity,
        }}
      >
        {mainWords.map((word, index) => {
          const wordSpring = spring({
            frame: frame - wordDelays[index],
            fps,
            config: SPRING_CONFIGS.slam,
          });

          const wordScale = interpolate(wordSpring, [0, 1], [1.8, 1]);
          const wordOpacity = interpolate(frame, [wordDelays[index], wordDelays[index] + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const wordY = interpolate(wordSpring, [0, 1], [-30, 0]);

          const isLoopWord = word === 'loop';

          return (
            <span
              key={index}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 64,
                fontWeight: 800,
                color: COLORS.text,
                transform: `translateY(${wordY}px) scale(${wordScale})`,
                opacity: wordOpacity,
                textShadow: `0 0 ${50 * glowPulse}px ${COLORS.accentPinkGlow}, 0 4px 20px rgba(0,0,0,0.5)`,
                display: 'inline-block',
                letterSpacing: '-0.02em',
                ...(isLoopWord && {
                  background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 25px ${COLORS.accentPinkGlow})`,
                }),
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Sub text with wobbly entrance */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 38,
          color: COLORS.textMuted,
          textAlign: 'center',
          marginTop: 35,
          opacity: subTextOpacity,
          transform: `translateY(${subTextY}px) rotate(${subTextRotation}deg)`,
          textShadow: '0 2px 15px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 10,
          fontWeight: 500,
        }}
      >
        You just don't call it that.
      </p>

      {/* Enhanced sparkle effects */}
      <SparkleEffect frame={frame} x="20%" y="30%" delay={18} color={COLORS.gold} />
      <SparkleEffect frame={frame} x="80%" y="35%" delay={25} color={COLORS.accentPink} />
      <SparkleEffect frame={frame} x="65%" y="60%" delay={32} color={COLORS.accentPurple} />
      <SparkleEffect frame={frame} x="35%" y="55%" delay={40} color={COLORS.cyan} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: The Routine Visualized
// ============================================
const Scene2Routine: React.FC<{ fps: number; showSparkles: boolean }> = ({ fps, showSparkles }) => {
  const frame = useCurrentFrame();

  // SLAM entrance for timeline
  const timelineSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const timelineScale = interpolate(timelineSpring, [0, 1], [0.8, 1]);
  const timelineOpacity = interpolate(timelineSpring, [0, 1], [0, 1]);

  // Section title with bounce
  const titleSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const titleY = interpolate(titleSpring, [0, 1], [-50, 0]);

  // Bottom text word-by-word
  const bottomWords = ['Same', 'steps.', 'Same', 'order.', 'Every', 'night.'];
  const bottomWordDelays = [150, 156, 162, 168, 175, 182];

  // Floating index callouts
  const indexCallouts = [
    { text: 'i = 0', x: '18%', y: '32%', delay: 35 },
    { text: 'i = 1', x: '85%', y: '42%', delay: 70 },
    { text: 'i = 2', x: '15%', y: '55%', delay: 105 },
    { text: 'i = 3', x: '88%', y: '65%', delay: 140 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.accentPink, COLORS.gradient2]} opacity={0.25} />
      {showSparkles && <PremiumFloatingParticles frame={frame} count={20} />}
      <GlowingOrb frame={frame} x="50%" y="50%" color={COLORS.accentPink} size={500} />

      {/* Floating index callouts */}
      {indexCallouts.map((callout, i) => {
        const calloutSpring = spring({
          frame: frame - callout.delay,
          fps,
          config: SPRING_CONFIGS.wobbly,
        });

        const calloutOpacity = interpolate(frame, [callout.delay, callout.delay + 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const calloutScale = interpolate(calloutSpring, [0, 1], [0.5, 1]);
        const calloutFloat = Math.sin((frame - callout.delay) * 0.08) * 8;

        if (frame < callout.delay) return null;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: callout.x,
              top: callout.y,
              opacity: calloutOpacity,
              transform: `scale(${calloutScale}) translateY(${calloutFloat}px)`,
              zIndex: 20,
            }}
          >
            <code
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                color: COLORS.cyan,
                background: 'rgba(6, 182, 212, 0.15)',
                padding: '6px 12px',
                borderRadius: 8,
                border: `1px solid ${COLORS.cyanGlow}`,
                boxShadow: `0 0 15px ${COLORS.cyanGlow}`,
              }}
            >
              {callout.text}
            </code>
          </div>
        );
      })}

      {/* Section title */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 36,
          color: COLORS.textMuted,
          marginBottom: 50,
          opacity: timelineOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: '0 2px 15px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 10,
          fontWeight: 500,
        }}
      >
        Your nightly routine:
      </p>

      {/* Timeline/Products */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 38,
          opacity: timelineOpacity,
          transform: `scale(${timelineScale * 1.15})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {PRODUCTS.map((product, index) => (
          <PremiumProductStep
            key={index}
            product={product}
            index={index}
            frame={frame}
            fps={fps}
            delay={index * 35}
          />
        ))}
      </div>

      {/* Bottom text with word-by-word reveal */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          display: 'flex',
          gap: '0 12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {bottomWords.map((word, index) => {
          const wordSpring = spring({
            frame: frame - bottomWordDelays[index],
            fps,
            config: SPRING_CONFIGS.bouncy,
          });

          const wordOpacity = interpolate(frame, [bottomWordDelays[index], bottomWordDelays[index] + 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const wordY = interpolate(wordSpring, [0, 1], [20, 0]);
          const wordScale = interpolate(wordSpring, [0, 1], [0.8, 1]);

          const isHighlight = word === 'Every' || word === 'night.';

          return (
            <span
              key={index}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 34,
                fontWeight: 600,
                color: isHighlight ? COLORS.accentPink : COLORS.text,
                opacity: wordOpacity,
                transform: `translateY(${wordY}px) scale(${wordScale})`,
                textShadow: isHighlight
                  ? `0 0 25px ${COLORS.accentPinkGlow}`
                  : '0 2px 12px rgba(0,0,0,0.5)',
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Premium product step component
const PremiumProductStep: React.FC<{
  product: (typeof PRODUCTS)[0];
  index: number;
  frame: number;
  fps: number;
  delay: number;
}> = ({ product, index, frame, fps, delay }) => {
  const slideSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(slideSpring, [0, 1], [150, 0]);
  const scale = interpolate(slideSpring, [0, 1], [0.9, 1]);

  // Glow effect
  const glowIntensity = interpolate(frame, [delay + 15, delay + 25, delay + 50], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Checkmark animation
  const checkSpring = spring({
    frame: frame - delay - 35,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const checkOpacity = interpolate(frame, [delay + 35, delay + 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
      }}
    >
      {/* Step number */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.text,
          boxShadow: `0 6px 25px ${COLORS.accentPinkGlow}`,
        }}
      >
        {index + 1}
      </div>

      {/* Product icon with glass morphism */}
      <div
        style={{
          position: 'relative',
          width: 95,
          height: 95,
          borderRadius: 24,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 10px 35px rgba(0,0,0,0.35), 0 0 ${45 * glowIntensity}px ${COLORS.accentPinkGlow}`,
        }}
      >
        <span style={{ fontSize: 52, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))' }}>
          {product.icon}
        </span>
      </div>

      {/* Label with code styling */}
      <GlassCard
        style={{ padding: '14px 28px' }}
        glowColor={COLORS.accentYellowGlow}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 26,
            color: COLORS.accentYellow,
            textShadow: `0 0 12px ${COLORS.accentYellowGlow}`,
          }}
        >
          {product.label}
        </code>
      </GlassCard>

      {/* Checkmark */}
      <div
        style={{
          opacity: checkOpacity,
          transform: `scale(${Math.min(checkSpring, 1.2)})`,
          fontSize: 38,
          filter: `drop-shadow(0 0 12px ${COLORS.accentGreenGlow})`,
        }}
      >
        ✅
      </div>
    </div>
  );
};

// ============================================
// SCENE 3: Now In Code
// ============================================
const Scene3Code: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Background transition with spring
  const bgSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const bgProgress = interpolate(bgSpring, [0, 1], [0, 1]);

  // Products shrink and move up with spring
  const productsSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const productsScale = interpolate(productsSpring, [0, 1], [1, 0.7]);
  const productsY = interpolate(productsSpring, [0, 1], [0, -280]);
  const productsOpacity = interpolate(frame, [0, 30], [1, 0.95], {
    extrapolateRight: 'clamp',
  });

  // Code block entrance with slam
  const codeBlockSpring = spring({
    frame: frame - 30,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const codeBlockScale = interpolate(codeBlockSpring, [0, 1], [0.85, 1]);
  const codeBlockRotation = interpolate(codeBlockSpring, [0, 1], [-2, 0]);

  // Code lines with typewriter - adjusted timing for better readability
  const codeLines = [
    { text: 'let steps = ["cleanser", "toner", "serum", "moisturizer"]', start: 45, duration: 60 },
    { text: '', start: 110, duration: 5 },
    { text: 'for (let i = 0; i < steps.length; i++) {', start: 118, duration: 50 },
    { text: '  apply(steps[i])', start: 172, duration: 32 },
    { text: '}', start: 208, duration: 8 },
  ];

  // Title entrance
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const titleOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);

  // Pulsing glow effect
  const glowPulse = 0.7 + Math.sin(frame * 0.1) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.gradient1, COLORS.accentPurple, COLORS.cyan]}
        opacity={0.25 + bgProgress * 0.1}
      />
      <PremiumFloatingParticles frame={frame} count={22} />
      <GlowingOrb frame={frame} x="50%" y="55%" color={COLORS.accentPurple} size={650} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="25%" y="70%" color={COLORS.accentPink} size={350} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="75%" y="40%" color={COLORS.cyan} size={300} pulseSpeed={0.02} />

      {/* Title */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 34,
          color: COLORS.textMuted,
          marginTop: 60,
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: '0 2px 15px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 10,
          fontWeight: 500,
        }}
      >
        Now in code:
      </p>

      {/* Mini products at top */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          transform: `scale(${productsScale}) translateY(${productsY}px)`,
          opacity: productsOpacity,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {PRODUCTS.map((product, i) => {
          // Highlight when being referenced - adjusted timing
          const highlightStart = 172 + i * 15;
          const isHighlighted = frame >= highlightStart && frame < highlightStart + 20;
          const pulse = isHighlighted ? 1 + Math.sin((frame - highlightStart) * 0.5) * 0.15 : 1;

          // Individual entrance animation
          const productSpring = spring({
            frame: frame - i * 5,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });

          const productScale = interpolate(productSpring, [0, 1], [0.5, 1]);

          return (
            <div
              key={i}
              style={{
                width: 85,
                height: 85,
                borderRadius: 22,
                background: isHighlighted
                  ? `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple})`
                  : 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(12px)',
                border: `3px solid ${isHighlighted ? COLORS.accentPink : 'rgba(255, 255, 255, 0.25)'}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: isHighlighted
                  ? `0 0 40px ${COLORS.accentPinkGlow}, 0 0 80px ${COLORS.accentPinkGlow}`
                  : '0 6px 25px rgba(0,0,0,0.35)',
                transform: `scale(${pulse * productScale})`,
                transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
              }}
            >
              <span style={{ fontSize: 42, filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.4))` }}>{product.icon}</span>
            </div>
          );
        })}
      </div>

      {/* Index labels under products */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          marginTop: 12,
          transform: `scale(${productsScale}) translateY(${productsY}px)`,
          opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: 'clamp' }),
          position: 'relative',
          zIndex: 10,
        }}
      >
        {PRODUCTS.map((_, i) => {
          const highlightStart = 172 + i * 15;
          const isHighlighted = frame >= highlightStart && frame < highlightStart + 20;

          return (
            <div
              key={i}
              style={{
                width: 85,
                textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                color: isHighlighted ? COLORS.accentYellow : COLORS.textMuted,
                textShadow: isHighlighted ? `0 0 12px ${COLORS.accentYellowGlow}` : 'none',
                fontWeight: isHighlighted ? 700 : 400,
              }}
            >
              [{i}]
            </div>
          );
        })}
      </div>

      {/* Code block with enhanced styling */}
      <GlassCard
        style={{
          marginTop: 50,
          padding: '35px 45px',
          width: '96%',
          maxWidth: 980,
          opacity: interpolate(frame, [30, 48], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${codeBlockScale}) rotate(${codeBlockRotation}deg)`,
          boxShadow: `0 25px 60px rgba(0, 0, 0, 0.5), 0 0 ${50 * glowPulse}px ${COLORS.accentPurpleGlow}`,
        }}
        glowColor={COLORS.accentPurpleGlow}
      >
        {/* Code block header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 25,
            paddingBottom: 18,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27ca40' }} />
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: COLORS.cyan,
              textShadow: `0 0 10px ${COLORS.cyanGlow}`,
            }}
          >
            routine.js
          </span>
        </div>

        {codeLines.map((line, index) => (
          <PremiumCodeLine
            key={index}
            text={line.text}
            startFrame={line.start}
            duration={line.duration}
            frame={frame}
          />
        ))}
      </GlassCard>

      {/* Loop arrow visualization - enhanced */}
      {frame >= 118 && <PremiumLoopArrow frame={frame - 118} />}

      {/* Sparkle effects */}
      <SparkleEffect frame={frame} x="18%" y="35%" delay={50} color={COLORS.accentPurple} />
      <SparkleEffect frame={frame} x="82%" y="40%" delay={65} color={COLORS.cyan} />
      <SparkleEffect frame={frame} x="15%" y="75%" delay={80} color={COLORS.accentPink} />
    </AbsoluteFill>
  );
};

// Premium code line with syntax highlighting
const PremiumCodeLine: React.FC<{
  text: string;
  startFrame: number;
  duration: number;
  frame: number;
}> = ({ text, startFrame, duration, frame }) => {
  if (frame < startFrame) return <div style={{ height: 48 }} />;

  const progress = Math.min(1, (frame - startFrame) / duration);
  const visibleChars = Math.floor(text.length * progress);
  const displayText = text.slice(0, visibleChars);

  // Line entrance animation
  const lineOpacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineX = interpolate(frame, [startFrame, startFrame + 15], [-15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Enhanced syntax highlighting using React elements
  const highlightSyntax = (code: string) => {
    if (!code) return null;

    // Tokenize the code
    const tokens: { text: string; type: 'keyword' | 'string' | 'identifier' | 'bracket' | 'default' }[] = [];
    let remaining = code;

    while (remaining.length > 0) {
      // Check for keywords
      const keywordMatch = remaining.match(/^(let|for|const)/);
      if (keywordMatch) {
        tokens.push({ text: keywordMatch[0], type: 'keyword' });
        remaining = remaining.slice(keywordMatch[0].length);
        continue;
      }

      // Check for strings
      const stringMatch = remaining.match(/^"[^"]*"/);
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], type: 'string' });
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Check for identifiers (steps, apply, length)
      const identifierMatch = remaining.match(/^(steps|apply|length)/);
      if (identifierMatch) {
        tokens.push({ text: identifierMatch[0], type: 'identifier' });
        remaining = remaining.slice(identifierMatch[0].length);
        continue;
      }

      // Check for brackets
      const bracketMatch = remaining.match(/^[\[\]{}()]/);
      if (bracketMatch) {
        tokens.push({ text: bracketMatch[0], type: 'bracket' });
        remaining = remaining.slice(1);
        continue;
      }

      // Default: take one character
      tokens.push({ text: remaining[0], type: 'default' });
      remaining = remaining.slice(1);
    }

    return tokens.map((token, i) => {
      switch (token.type) {
        case 'keyword':
          return (
            <span key={i} style={{ color: COLORS.accentPink, textShadow: `0 0 15px ${COLORS.accentPinkGlow}`, fontWeight: 600 }}>
              {token.text}
            </span>
          );
        case 'string':
          return (
            <span key={i} style={{ color: COLORS.accentGreen, textShadow: `0 0 12px ${COLORS.accentGreenGlow}` }}>
              {token.text}
            </span>
          );
        case 'identifier':
          return (
            <span key={i} style={{ color: COLORS.accentYellow, textShadow: `0 0 12px ${COLORS.accentYellowGlow}`, fontWeight: 500 }}>
              {token.text}
            </span>
          );
        case 'bracket':
          return (
            <span key={i} style={{ color: COLORS.textMuted }}>
              {token.text}
            </span>
          );
        default:
          return <span key={i}>{token.text}</span>;
      }
    });
  };

  return (
    <div
      style={{
        minHeight: 48,
        marginBottom: 14,
        opacity: lineOpacity,
        transform: `translateX(${lineX}px)`,
      }}
    >
      <code
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 26,
          color: COLORS.text,
          whiteSpace: 'pre',
          letterSpacing: '0.02em',
        }}
      >
        {highlightSyntax(displayText)}
        {progress < 1 && (
          <span
            style={{
              color: COLORS.accentPink,
              opacity: frame % 24 < 12 ? 1 : 0,
              textShadow: `0 0 10px ${COLORS.accentPinkGlow}`,
            }}
          >
            │
          </span>
        )}
      </code>
    </div>
  );
};

// Premium loop arrow component
const PremiumLoopArrow: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotation = interpolate(frame, [40, 120], [0, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const scale = interpolate(frame, [20, 45], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = 1 + Math.sin(frame * 0.12) * 0.12;
  const glowIntensity = 0.8 + Math.sin(frame * 0.15) * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        right: 40,
        top: '52%',
        opacity,
        transform: `rotate(${rotation}deg) scale(${scale * pulse})`,
        filter: `drop-shadow(0 0 ${25 * glowIntensity}px ${COLORS.accentPinkGlow})`,
        zIndex: 10,
      }}
    >
      <svg width="110" height="110" viewBox="0 0 90 90">
        <defs>
          <linearGradient id="arrowGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.accentPink} />
            <stop offset="50%" stopColor={COLORS.accentPurple} />
            <stop offset="100%" stopColor={COLORS.cyan} />
          </linearGradient>
        </defs>
        {/* Outer glow ring */}
        <circle
          cx="45"
          cy="45"
          r="38"
          fill="none"
          stroke={COLORS.accentPinkGlow}
          strokeWidth="8"
          opacity={0.2}
        />
        {/* Main arc */}
        <path
          d="M45 10 A35 35 0 1 1 44 10"
          fill="none"
          stroke="url(#arrowGradient3)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={200 - Math.min(rotation / 360, 1) * 200}
        />
        {/* Arrow head */}
        <polygon
          points="58,8 45,0 48,18"
          fill={COLORS.accentPink}
          transform="rotate(15, 45, 45)"
          style={{ filter: `drop-shadow(0 0 8px ${COLORS.accentPinkGlow})` }}
        />
      </svg>
    </div>
  );
};

// ============================================
// SCENE 4: Loop Visualization
// ============================================
const Scene4LoopViz: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Circle parameters - adjusted for better visibility
  const centerX = 540;
  const radius = 220;

  // Entrance animation
  const entranceSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(entranceSpring, [0, 1], [0, 1]);

  // Dot position (loops multiple times, speeding up)
  const loopSpeed = interpolate(frame, [0, 180], [0.5, 2.5], {
    extrapolateRight: 'clamp',
  });
  const angle = (frame * loopSpeed * 3) % 360;
  const angleRad = (angle * Math.PI) / 180;

  const dotX = centerX + Math.cos(angleRad - Math.PI / 2) * radius;
  const dotY = 300 + Math.sin(angleRad - Math.PI / 2) * radius;

  // Current index based on angle
  const currentIndex = Math.floor((angle / 360) * 4) % 4;

  // Day counter (accelerates)
  const dayCount = Math.min(365, Math.floor(frame * loopSpeed * 0.5));

  // Bottom text with word animation
  const bottomTextOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing glow for active station
  const pulseGlow = 1 + Math.sin(frame * 0.15) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.cyan, COLORS.accentPurple]} opacity={0.3} />
      <PremiumFloatingParticles frame={frame} count={25} />
      <GlowingOrb frame={frame} x="50%" y="55%" color={COLORS.cyan} size={600} />
      <GlowingOrb frame={frame} x="25%" y="40%" color={COLORS.accentPink} size={350} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="75%" y="65%" color={COLORS.accentPurple} size={400} pulseSpeed={0.03} />

      {/* Mini code at top */}
      <GlassCard
        style={{
          marginTop: 80,
          padding: '20px 35px',
          transform: `scale(${entranceScale})`,
          opacity: entranceOpacity,
        }}
        glowColor={COLORS.accentPinkGlow}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 26,
            color: COLORS.text,
          }}
        >
          <span style={{ color: COLORS.accentPink, textShadow: `0 0 10px ${COLORS.accentPinkGlow}` }}>for</span>
          {' (i = '}
          <span style={{
            color: COLORS.accentYellow,
            textShadow: `0 0 15px ${COLORS.accentYellowGlow}`,
            fontWeight: 700,
          }}>
            {currentIndex}
          </span>
          {'; i < 4; i++)'}
        </code>
      </GlassCard>

      {/* Counter display */}
      <div style={{
        marginTop: 35,
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        transform: `scale(${entranceScale})`,
        opacity: entranceOpacity,
      }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 58,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple}, ${COLORS.cyan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 25px ${COLORS.accentPinkGlow})`,
          }}
        >
          Day {dayCount}
        </span>
      </div>

      {/* Circular track - centered in view */}
      <svg
        width={1080}
        height={700}
        style={{
          position: 'absolute',
          top: 480,
          zIndex: 10,
          transform: `scale(${entranceScale})`,
          opacity: entranceOpacity,
        }}
      >
        {/* Outer glow ring */}
        <circle
          cx={centerX}
          cy={300}
          r={radius + 10}
          fill="none"
          stroke={COLORS.accentPurpleGlow}
          strokeWidth="20"
          opacity={0.15}
          filter="blur(15px)"
        />
        {/* Glowing circle track */}
        <circle
          cx={centerX}
          cy={300}
          r={radius}
          fill="none"
          stroke={COLORS.accentPurpleGlow}
          strokeWidth="6"
          opacity={0.4}
          filter="blur(6px)"
        />
        <circle
          cx={centerX}
          cy={300}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
          strokeDasharray="15 10"
        />

        {/* Product stations */}
        {PRODUCTS.map((product, i) => {
          const stationAngle = (i * 90 - 90) * (Math.PI / 180);
          const sx = centerX + Math.cos(stationAngle) * radius;
          const sy = 300 + Math.sin(stationAngle) * radius;
          const isActive = currentIndex === i;

          return (
            <g key={i}>
              {/* Outer glow when active */}
              {isActive && (
                <>
                  <circle cx={sx} cy={sy} r={65 * pulseGlow} fill={COLORS.accentPink} opacity={0.15} />
                  <circle cx={sx} cy={sy} r={55 * pulseGlow} fill={COLORS.accentPink} opacity={0.25} />
                </>
              )}
              {/* Station circle */}
              <circle
                cx={sx}
                cy={sy}
                r={45}
                fill={isActive ? COLORS.accentPink : 'rgba(255,255,255,0.12)'}
                stroke={isActive ? COLORS.accentPink : 'rgba(255,255,255,0.25)'}
                strokeWidth={isActive ? 3 : 2}
                style={{
                  filter: isActive ? `drop-shadow(0 0 30px ${COLORS.accentPinkGlow})` : 'none',
                }}
              />
            </g>
          );
        })}

        {/* Moving dot with trail effect */}
        <circle cx={dotX} cy={dotY} r={22} fill={COLORS.accentYellow} opacity={0.2} />
        <circle cx={dotX} cy={dotY} r={16} fill={COLORS.accentYellow} opacity={0.4} />
        <circle
          cx={dotX}
          cy={dotY}
          r={10}
          fill={COLORS.accentYellow}
          style={{ filter: `drop-shadow(0 0 25px ${COLORS.accentYellowGlow})` }}
        />
      </svg>

      {/* Product labels overlay */}
      <div style={{ position: 'absolute', top: 480, width: 1080, height: 700, zIndex: 11 }}>
        {PRODUCTS.map((product, i) => {
          const stationAngle = (i * 90 - 90) * (Math.PI / 180);
          const sx = centerX + Math.cos(stationAngle) * radius;
          const sy = 300 + Math.sin(stationAngle) * radius;
          const isActive = currentIndex === i;
          const activeScale = isActive ? 1.5 : 1;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: sx - 25,
                top: sy - 25,
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 34,
                transform: `scale(${activeScale * entranceScale})`,
                opacity: entranceOpacity,
                filter: isActive ? `drop-shadow(0 0 20px ${COLORS.accentPinkGlow})` : 'none',
                transition: 'transform 0.15s ease-out',
              }}
            >
              {product.icon}
            </div>
          );
        })}
      </div>

      {/* Bottom text with enhanced styling */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          fontFamily: "'Inter', sans-serif",
          fontSize: 36,
          color: COLORS.text,
          textAlign: 'center',
          opacity: bottomTextOpacity,
          fontWeight: 700,
          zIndex: 10,
        }}
      >
        <span style={{ textShadow: `0 0 20px rgba(255,255,255,0.5)` }}>It loops.</span>{' '}
        <span style={{ color: COLORS.cyan, textShadow: `0 0 25px ${COLORS.cyanGlow}` }}>Every.</span>{' '}
        <span style={{ color: COLORS.accentPink, textShadow: `0 0 25px ${COLORS.accentPinkGlow}` }}>Single.</span>{' '}
        <span style={{ color: COLORS.accentYellow, textShadow: `0 0 25px ${COLORS.accentYellowGlow}` }}>Night.</span>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: The Aha Moment
// ============================================
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // SLAM entrance for main text with extra impact
  const slamSpring = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const slamScale = interpolate(slamSpring, [0, 1], [2.5, 1]);
  const slamRotation = interpolate(slamSpring, [0, 1], [-5, 0]);
  const mainOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Flash effect on entrance - more intense
  const flashOpacity = interpolate(frame, [5, 8, 20], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Word-by-word reveal for main text
  const mainWords = ['A', 'loop', 'repeats', 'steps', 'for', 'you.'];
  const mainWordDelays = [5, 10, 16, 22, 28, 33];

  // Sub text with celebration entrance
  const subSpring = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.celebration,
  });

  const subOpacity = interpolate(frame, [45, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subY = interpolate(subSpring, [0, 1], [50, 0]);
  const subScale = interpolate(subSpring, [0, 1], [0.85, 1]);

  // Multiple sparkles with staggered timing - more sparkles
  const sparklePositions = [
    { x: '15%', y: '20%', delay: 12 },
    { x: '85%', y: '25%', delay: 18 },
    { x: '10%', y: '55%', delay: 25 },
    { x: '90%', y: '50%', delay: 32 },
    { x: '25%', y: '75%', delay: 40 },
    { x: '75%', y: '80%', delay: 48 },
    { x: '50%', y: '15%', delay: 55 },
  ];

  // Center celebration sparkle with enhanced animation
  const celebrationSparkleOpacity = interpolate(frame, [55, 65], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const celebrationSparkleRotation = frame * 5;
  const celebrationSparkleScale = 1.2 + Math.sin(frame * 0.15) * 0.3;

  // Light bulb moment effect
  const lightbulbSpring = spring({
    frame: frame - 8,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const lightbulbOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lightbulbScale = interpolate(lightbulbSpring, [0, 1], [0.3, 1]);
  const lightbulbGlow = 0.6 + Math.sin(frame * 0.12) * 0.4;

  // Pulsing background glow
  const bgPulse = 0.3 + Math.sin(frame * 0.08) * 0.1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.accentPink, COLORS.gold]} opacity={bgPulse} />
      <PremiumFloatingParticles frame={frame} count={35} />
      <GlowingOrb frame={frame} x="50%" y="45%" color={COLORS.gold} size={700} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="30%" y="35%" color={COLORS.accentPink} size={400} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="70%" y="60%" color={COLORS.accentPurple} size={450} pulseSpeed={0.02} />

      {/* Flash effect on slam - full screen burst */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 45%, ${COLORS.gold}, ${COLORS.accentPink} 40%, transparent 70%)`,
            opacity: flashOpacity,
            zIndex: 50,
          }}
        />
      )}

      {/* Confetti effect - starts earlier */}
      <ConfettiEffect frame={frame} startFrame={8} />

      {/* Multiple pulse rings for impact */}
      <PulseRing frame={frame} x="50%" y="42%" delay={5} color={COLORS.gold} maxSize={500} />
      <PulseRing frame={frame} x="50%" y="42%" delay={10} color={COLORS.accentPink} maxSize={400} />
      <PulseRing frame={frame} x="50%" y="42%" delay={15} color={COLORS.accentPurple} maxSize={350} />

      {/* Light bulb icon - aha moment */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          fontSize: 90,
          opacity: lightbulbOpacity,
          transform: `scale(${lightbulbScale})`,
          filter: `drop-shadow(0 0 ${50 * lightbulbGlow}px ${COLORS.goldGlow}) drop-shadow(0 0 ${80 * lightbulbGlow}px ${COLORS.accentYellowGlow})`,
          zIndex: 15,
        }}
      >
        💡
      </div>

      {/* Main text with word-by-word SLAM reveal */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 18px',
          position: 'relative',
          zIndex: 10,
          transform: `scale(${slamScale}) rotate(${slamRotation}deg)`,
          opacity: mainOpacity,
          marginTop: 80,
        }}
      >
        {mainWords.map((word, index) => {
          const wordSpring = spring({
            frame: frame - mainWordDelays[index],
            fps,
            config: SPRING_CONFIGS.slam,
          });

          const wordScale = interpolate(wordSpring, [0, 1], [1.8, 1]);
          const wordOpacity = interpolate(frame, [mainWordDelays[index], mainWordDelays[index] + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const wordY = interpolate(wordSpring, [0, 1], [-30, 0]);
          const wordRotation = interpolate(wordSpring, [0, 1], [8, 0]);

          const isLoopWord = word === 'loop';
          const isYouWord = word === 'you.';

          return (
            <span
              key={index}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 58,
                fontWeight: 800,
                color: COLORS.text,
                transform: `translateY(${wordY}px) scale(${wordScale}) rotate(${wordRotation}deg)`,
                opacity: wordOpacity,
                textShadow: `0 0 50px ${COLORS.accentPinkGlow}, 0 4px 20px rgba(0,0,0,0.5)`,
                display: 'inline-block',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                ...(isLoopWord && {
                  background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 30px ${COLORS.accentPinkGlow})`,
                }),
                ...(isYouWord && {
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.accentYellow})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 25px ${COLORS.goldGlow})`,
                }),
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Sub text with celebration entrance */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 36,
          color: COLORS.textMuted,
          textAlign: 'center',
          marginTop: 40,
          opacity: subOpacity,
          transform: `translateY(${subY}px) scale(${subScale})`,
          maxWidth: 850,
          textShadow: '0 2px 15px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 10,
          fontWeight: 500,
        }}
      >
        So you don't have to write them{' '}
        <span
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.accentPink})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
            filter: `drop-shadow(0 0 20px ${COLORS.goldGlow})`,
          }}
        >
          365 times
        </span>
        .
      </p>

      {/* Multiple sparkle effects around the scene */}
      {sparklePositions.map((pos, i) => (
        <SparkleEffect
          key={i}
          frame={frame}
          x={pos.x}
          y={pos.y}
          delay={pos.delay}
          color={i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.accentPink : COLORS.cyan}
        />
      ))}

      {/* Center celebration sparkle cluster */}
      <div
        style={{
          marginTop: 55,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 80,
            opacity: celebrationSparkleOpacity,
            transform: `rotate(${celebrationSparkleRotation}deg) scale(${celebrationSparkleScale})`,
            filter: `drop-shadow(0 0 40px ${COLORS.goldGlow})`,
          }}
        >
          ✨
        </div>
        {/* Orbiting mini sparkles */}
        {frame >= 65 && [0, 1, 2].map((i) => {
          const orbitAngle = (frame * 3 + i * 120) * (Math.PI / 180);
          const orbitRadius = 60;
          const orbitX = Math.cos(orbitAngle) * orbitRadius;
          const orbitY = Math.sin(orbitAngle) * orbitRadius * 0.5;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: 30,
                transform: `translate(-50%, -50%) translate(${orbitX}px, ${orbitY}px)`,
                opacity: 0.8,
                filter: `drop-shadow(0 0 15px ${COLORS.accentPinkGlow})`,
              }}
            >
              ✦
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: CTA
// ============================================
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // SLAM entrance for terminal with more impact
  const terminalSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const terminalScale = interpolate(terminalSpring, [0, 1], [1.4, 1]);
  const terminalOpacity = interpolate(terminalSpring, [0, 1], [0, 1]);
  const terminalRotation = interpolate(terminalSpring, [0, 1], [-4, 0]);

  // Terminal lines with enhanced timing - more time to read
  const lines = [
    { text: '> routine.complete()', color: COLORS.accentGreen, start: 10, typingSpeed: 20 },
    { text: '> Next: What if you want to skip a step?', color: COLORS.text, start: 35, typingSpeed: 25 },
    { text: '> DOGM.AI', color: COLORS.accentPink, start: 65, typingSpeed: 15 },
  ];

  // Cursor blink - faster
  const cursorVisible = frame % 16 < 8;

  // Logo with enhanced entrance
  const logoSpring = spring({
    frame: frame - 75,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const logoOpacity = interpolate(frame, [75, 88], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logoY = interpolate(logoSpring, [0, 1], [40, 0]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);

  // Scanline effect - faster
  const scanlineY = (frame * 5) % 100;

  // Glitch effect on logo - more frequent
  const glitchActive = frame >= 80 && frame % 35 < 5;
  const glitchOffset = glitchActive ? Math.sin(frame * 6) * 5 : 0;

  // Terminal header button pulse - enhanced
  const buttonPulse = 1 + Math.sin(frame * 0.18) * 0.2;

  // Pulsing terminal glow
  const terminalGlow = 0.8 + Math.sin(frame * 0.1) * 0.2;

  // Flash on terminal entrance
  const flashOpacity = interpolate(frame, [0, 5, 15], [0, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Success checkmark animation
  const checkmarkSpring = spring({
    frame: frame - 25,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const checkmarkOpacity = interpolate(frame, [25, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const checkmarkScale = interpolate(checkmarkSpring, [0, 1], [0.3, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.darkPurple} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.background, COLORS.gradient1, COLORS.accentGreen]} opacity={0.25} />
      <PremiumFloatingParticles frame={frame} count={20} />
      <GlowingOrb frame={frame} x="50%" y="40%" color={COLORS.accentGreen} size={500} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="25%" y="60%" color={COLORS.accentPink} size={350} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="75%" y="55%" color={COLORS.cyan} size={300} pulseSpeed={0.02} />

      {/* Flash effect on entrance */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 45%, ${COLORS.accentGreen}, transparent 60%)`,
            opacity: flashOpacity,
            zIndex: 50,
          }}
        />
      )}

      {/* Multiple pulse rings on terminal entrance */}
      <PulseRing frame={frame} x="50%" y="42%" delay={0} color={COLORS.accentGreen} maxSize={550} />
      <PulseRing frame={frame} x="50%" y="42%" delay={5} color={COLORS.cyan} maxSize={450} />

      {/* Terminal window with SLAM */}
      <GlassCard
        style={{
          padding: 0,
          width: '92%',
          maxWidth: 920,
          overflow: 'hidden',
          transform: `scale(${terminalScale}) rotate(${terminalRotation}deg)`,
          opacity: terminalOpacity,
          position: 'relative',
          zIndex: 10,
          boxShadow: `0 25px 70px rgba(0, 0, 0, 0.6), 0 0 ${60 * terminalGlow}px ${COLORS.accentGreenGlow}`,
        }}
        glowColor={COLORS.accentGreenGlow}
      >
        {/* Terminal header with animated buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '18px 26px',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
              boxShadow: `0 0 ${14 * buttonPulse}px #ff5f56`,
              transform: `scale(${buttonPulse})`,
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
              boxShadow: `0 0 ${14 * buttonPulse}px #ffbd2e`,
              transform: `scale(${buttonPulse})`,
            }}
          />
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#27ca40',
              boxShadow: `0 0 ${14 * buttonPulse}px #27ca40`,
              transform: `scale(${buttonPulse})`,
            }}
          />
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              color: COLORS.cyan,
              textShadow: `0 0 12px ${COLORS.cyanGlow}`,
              letterSpacing: '0.05em',
            }}
          >
            skincare-loop ~/routine
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: 40, position: 'relative' }}>
          {/* Multiple scanlines - enhanced */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${scanlineY}%`,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${COLORS.accentGreenGlow}, transparent)`,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${(scanlineY + 35) % 100}%`,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${COLORS.cyanGlow}, transparent)`,
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${(scanlineY + 70) % 100}%`,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${COLORS.accentPinkGlow}, transparent)`,
              opacity: 0.2,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {lines.map((line, i) => {
              const progress = Math.min(1, Math.max(0, (frame - line.start) / line.typingSpeed));
              const visibleChars = Math.floor(line.text.length * progress);

              if (frame < line.start) return null;

              // Line entrance spring
              const lineSpring = spring({
                frame: frame - line.start,
                fps,
                config: SPRING_CONFIGS.snappy,
              });

              const lineX = interpolate(lineSpring, [0, 1], [-25, 0]);
              const lineOpacity = interpolate(lineSpring, [0, 1], [0, 1]);

              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <code
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: i === 2 ? 42 : 28,
                      fontWeight: i === 2 ? 800 : 400,
                      color: line.color,
                      textShadow:
                        i === 2
                          ? `0 0 30px ${COLORS.accentPinkGlow}`
                          : i === 0
                          ? `0 0 20px ${COLORS.accentGreenGlow}`
                          : '0 0 10px rgba(255,255,255,0.3)',
                      transform: `translateX(${lineX}px)`,
                      opacity: lineOpacity,
                      display: 'block',
                    }}
                  >
                    {i === 2 && progress >= 1 ? (
                      <>
                        <span
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.accentPink}, ${COLORS.accentPurple}, ${COLORS.cyan})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: `drop-shadow(0 0 20px ${COLORS.accentPinkGlow})`,
                          }}
                        >
                          {line.text.slice(0, visibleChars)}
                        </span>
                        <span
                          style={{
                            color: COLORS.accentPink,
                            opacity: cursorVisible ? 1 : 0,
                            textShadow: `0 0 15px ${COLORS.accentPinkGlow}`,
                          }}
                        >
                          _
                        </span>
                      </>
                    ) : (
                      <>
                        {line.text.slice(0, visibleChars)}
                        {progress < 1 && (
                          <span
                            style={{
                              color: line.color,
                              opacity: cursorVisible ? 1 : 0.3,
                            }}
                          >
                            █
                          </span>
                        )}
                      </>
                    )}
                  </code>
                  {/* Success checkmark after first line completes */}
                  {i === 0 && progress >= 1 && (
                    <span
                      style={{
                        fontSize: 32,
                        opacity: checkmarkOpacity,
                        transform: `scale(${checkmarkScale})`,
                        filter: `drop-shadow(0 0 15px ${COLORS.accentGreenGlow})`,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Logo/handle with enhanced glitch effect */}
      <div
        style={{
          marginTop: 55,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px) scale(${logoScale}) translateX(${glitchOffset}px)`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Glitch layers - more prominent */}
        {glitchActive && (
          <>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                color: COLORS.cyan,
                letterSpacing: '0.15em',
                left: -3,
                top: -2,
                opacity: 0.8,
              }}
            >
              dogm.ai/enroll
            </span>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 28,
                color: COLORS.accentPink,
                letterSpacing: '0.15em',
                left: 3,
                top: 2,
                opacity: 0.8,
              }}
            >
              dogm.ai/enroll
            </span>
          </>
        )}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            background: `linear-gradient(135deg, ${COLORS.text}, ${COLORS.accentPink}, ${COLORS.cyan})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.15em',
            filter: `drop-shadow(0 0 25px ${COLORS.accentPinkGlow})`,
            fontWeight: 600,
          }}
        >
          dogm.ai/enroll
        </span>
      </div>

      {/* Enhanced sparkle effects */}
      <SparkleEffect frame={frame} x="25%" y="22%" delay={8} color={COLORS.accentGreen} />
      <SparkleEffect frame={frame} x="75%" y="28%" delay={15} color={COLORS.gold} />
      <SparkleEffect frame={frame} x="20%" y="70%" delay={25} color={COLORS.cyan} />
      <SparkleEffect frame={frame} x="80%" y="75%" delay={35} color={COLORS.accentPink} />

      {/* Arrow hint pointing to logo */}
      {frame >= 85 && (
        <div
          style={{
            position: 'absolute',
            bottom: 200,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: interpolate(frame, [85, 95], [0, 1], { extrapolateRight: 'clamp' }),
            animation: 'bounce 1s infinite',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: COLORS.accentPink,
              filter: `drop-shadow(0 0 15px ${COLORS.accentPinkGlow})`,
              transform: `translateY(${Math.sin(frame * 0.15) * 8}px)`,
            }}
          >
            ↓
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
