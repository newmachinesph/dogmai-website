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

export interface IfElseOutfitProps {
  showWeatherParticles?: boolean;
}

// Premium Colors with Glow Variants
const COLORS = {
  // Base colors
  deepDark: '#0a0a0f',
  deepPurple: '#1e1b4b',
  midnightBlue: '#0f172a',
  richPurple: '#4c1d95',

  // Accent colors
  cyanBlue: '#06b6d4',
  cyanBlueGlow: 'rgba(6, 182, 212, 0.6)',
  electricPurple: '#a855f7',
  electricPurpleGlow: 'rgba(168, 85, 247, 0.6)',
  neonGreen: '#10b981',
  neonGreenGlow: 'rgba(16, 185, 129, 0.6)',
  hotPink: '#ec4899',
  hotPinkGlow: 'rgba(236, 72, 153, 0.6)',
  goldenYellow: '#fbbf24',
  goldenYellowGlow: 'rgba(251, 191, 36, 0.6)',

  // Text colors
  textLight: '#ffffff',
  textGray: '#94a3b8',

  // Code syntax colors
  codeBlue: '#60a5fa',
  codeGreen: '#4ade80',
  codeYellow: '#fbbf24',
  codeGray: '#94a3b8',
  codePink: '#f472b6',

  // Gold accent
  gold: '#ffd700',
  goldGlow: 'rgba(255, 215, 0, 0.6)',
};

// Enhanced Spring Configs for Premium Animations
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

export const IfElseOutfit: React.FC<IfElseOutfitProps> = ({
  showWeatherParticles = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} showWeatherParticles={showWeatherParticles} />
      </Sequence>

      {/* Scene 2: The Decision Tree (120-300 frames / 4-10 sec) */}
      <Sequence from={120} durationInFrames={180}>
        <Scene2DecisionTree fps={fps} />
      </Sequence>

      {/* Scene 3: Now In Code (300-540 frames / 10-18 sec) */}
      <Sequence from={300} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Interactive Sim (540-810 frames / 18-27 sec) */}
      <Sequence from={540} durationInFrames={270}>
        <Scene4Simulation fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (810-930 frames / 27-31 sec) */}
      <Sequence from={810} durationInFrames={120}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (930-1080 frames / 31-36 sec) */}
      <Sequence from={930} durationInFrames={150}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================
// PREMIUM COMPONENTS
// ============================================

// Animated Gradient Background with Conic Rotation
const AnimatedGradientBg: React.FC<{
  variant?: 'purple' | 'blue' | 'green' | 'pink';
  speed?: number;
}> = ({ variant = 'purple', speed = 0.5 }) => {
  const frame = useCurrentFrame();
  const rotation = (frame * speed) % 360;

  const gradients = {
    purple: `conic-gradient(from ${rotation}deg at 50% 50%, ${COLORS.deepDark} 0deg, ${COLORS.deepPurple} 90deg, ${COLORS.richPurple} 180deg, ${COLORS.deepPurple} 270deg, ${COLORS.deepDark} 360deg)`,
    blue: `conic-gradient(from ${rotation}deg at 50% 50%, ${COLORS.deepDark} 0deg, ${COLORS.midnightBlue} 90deg, #1e3a8a 180deg, ${COLORS.midnightBlue} 270deg, ${COLORS.deepDark} 360deg)`,
    green: `conic-gradient(from ${rotation}deg at 50% 50%, ${COLORS.deepDark} 0deg, #064e3b 90deg, #065f46 180deg, #064e3b 270deg, ${COLORS.deepDark} 360deg)`,
    pink: `conic-gradient(from ${rotation}deg at 50% 50%, ${COLORS.deepDark} 0deg, #831843 90deg, #9f1239 180deg, #831843 270deg, ${COLORS.deepDark} 360deg)`,
  };

  return (
    <AbsoluteFill
      style={{
        background: gradients[variant],
        opacity: 0.7,
      }}
    />
  );
};

// Premium Floating Particles with Multi-Color Glow
const PremiumFloatingParticles: React.FC<{
  count?: number;
  colors?: Array<{ base: string; glow: string }>;
  speed?: number;
}> = ({
  count = 30,
  colors = [
    { base: COLORS.cyanBlue, glow: COLORS.cyanBlueGlow },
    { base: COLORS.electricPurple, glow: COLORS.electricPurpleGlow },
    { base: COLORS.neonGreen, glow: COLORS.neonGreenGlow },
    { base: COLORS.hotPink, glow: COLORS.hotPinkGlow },
  ],
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const x = (i * 37) % 100;
    const startY = (i * 67) % 100;
    const particleSpeed = speed + (i % 5) * 0.1;
    const size = 4 + (i % 4) * 3;
    const y = (startY + frame * particleSpeed) % 110 - 5;
    const opacity = interpolate(y, [0, 50, 100], [0.2, 0.8, 0.2]);
    const colorIndex = i % colors.length;
    const color = colors[colorIndex];

    // Horizontal drift
    const drift = Math.sin((frame + i * 10) * 0.02) * 5;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `calc(${x}% + ${drift}px)`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color.base,
          opacity,
          filter: 'blur(1px)',
          boxShadow: `0 0 ${size * 3}px ${color.glow}, 0 0 ${size * 6}px ${color.glow}`,
        }}
      />
    );
  });

  return <AbsoluteFill style={{ overflow: 'hidden' }}>{particles}</AbsoluteFill>;
};

// Glowing Orb for Ambient Lighting
const GlowingOrb: React.FC<{
  x: string | number;
  y: string | number;
  size: number;
  color: string;
  glowColor: string;
  blur?: number;
  opacity?: number;
}> = ({ x, y, size, color, glowColor, blur = 100, opacity = 0.4 }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.05) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        left: typeof x === 'number' ? x : x,
        top: typeof y === 'number' ? y : y,
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        backgroundColor: color,
        opacity,
        filter: `blur(${blur}px)`,
        boxShadow: `0 0 ${size * 2}px ${glowColor}, 0 0 ${size * 4}px ${glowColor}`,
      }}
    />
  );
};

// Glass Card with Glassmorphism
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  blur?: number;
}> = ({ children, style, glowColor = COLORS.cyanBlueGlow, blur = 10 }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${glowColor}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Gradient Text Helper
const GradientText: React.FC<{
  children: React.ReactNode;
  gradient: string;
  style?: React.CSSProperties;
}> = ({ children, gradient, style }) => {
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

// Scanline Effect for Terminal Scenes
const ScanlineEffect: React.FC<{ opacity?: number; speed?: number }> = ({
  opacity = 0.05,
  speed = 2
}) => {
  const frame = useCurrentFrame();
  const position = (frame * speed) % 200;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: `${position}%`,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(to bottom, transparent, ${COLORS.cyanBlue}${Math.floor(opacity * 255).toString(16)}, transparent)`,
          filter: 'blur(1px)',
        }}
      />
      {/* Static scanlines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
          opacity: opacity * 2,
        }}
      />
    </AbsoluteFill>
  );
};

// Premium Sparkle Effect Component
const SparkleEffect: React.FC<{
  x: number | string;
  y: number | string;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ x, y, delay = 0, size = 20, color = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps: 30,
    config: SPRING_CONFIGS.celebration,
  });

  const rotation = interpolate(adjustedFrame, [0, 30], [0, 180]);
  const opacity = interpolate(adjustedFrame, [0, 10, 25, 35], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        filter: `drop-shadow(0 0 ${size / 2}px ${color})`,
      }}
    >
      {/* Four-pointed star */}
      <svg viewBox="0 0 24 24" fill={color}>
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  );
};

// Premium Confetti Effect Component
const ConfettiEffect: React.FC<{
  startFrame?: number;
  duration?: number;
  count?: number;
}> = ({ startFrame = 0, duration = 45, count = 50 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - startFrame;

  if (adjustedFrame < 0 || adjustedFrame > duration) return null;

  const confettiColors = [
    COLORS.gold,
    COLORS.cyanBlue,
    COLORS.electricPurple,
    COLORS.hotPink,
    COLORS.neonGreen,
    COLORS.goldenYellow,
  ];

  const particles = Array.from({ length: count }, (_, i) => {
    const startX = 540 + (Math.random() - 0.5) * 200;
    const startY = 960;
    const angle = (Math.PI / 4) + (Math.random() * Math.PI / 2);
    const velocity = 15 + Math.random() * 25;
    const gravity = 0.5;

    const x = startX + Math.cos(angle) * velocity * adjustedFrame * 0.5;
    const y = startY - Math.sin(angle) * velocity * adjustedFrame + gravity * adjustedFrame * adjustedFrame * 0.3;
    const rotation = adjustedFrame * (10 + i % 20);
    const size = 8 + (i % 4) * 4;
    const color = confettiColors[i % confettiColors.length];
    const opacity = interpolate(adjustedFrame, [0, 10, duration - 10, duration], [0, 1, 1, 0]);

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: i % 3 === 0 ? '50%' : 2,
          transform: `rotate(${rotation}deg)`,
          opacity,
          boxShadow: `0 0 ${size}px ${color}`,
        }}
      />
    );
  });

  return <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>{particles}</AbsoluteFill>;
};

// Premium Pulse Ring Component
const PulseRing: React.FC<{
  x: number | string;
  y: number | string;
  delay?: number;
  color?: string;
  maxSize?: number;
}> = ({ x, y, delay = 0, color = COLORS.gold, maxSize = 300 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = interpolate(adjustedFrame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(adjustedFrame, [0, 10, 40], [0, 0.8, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: maxSize * scale,
        height: maxSize * scale,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        opacity,
        transform: 'translate(-50%, -50%)',
        boxShadow: `0 0 30px ${color}, inset 0 0 30px ${color}`,
      }}
    />
  );
};

// Shockwave Ring Effect
const ShockwaveRing: React.FC<{
  delay?: number;
  color?: string;
}> = ({ delay = 0, color = COLORS.cyanBlue }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const scale = interpolate(adjustedFrame, [0, 30], [0.5, 2.5], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(adjustedFrame, [0, 5, 30], [0, 0.6, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `4px solid ${color}`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        boxShadow: `0 0 40px ${color}, 0 0 80px ${color}`,
      }}
    />
  );
};

// ============================================
// SCENE 1: Hook - Premium Version with SLAM Effects
// ============================================
const Scene1Hook: React.FC<{ fps: number; showWeatherParticles: boolean }> = ({
  fps,
  showWeatherParticles,
}) => {
  const frame = useCurrentFrame();

  // SLAM entrance animation for main text
  const slamScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const slamRotation = interpolate(
    spring({ frame, fps, config: SPRING_CONFIGS.slam }),
    [0, 1],
    [-5, 0]
  );

  const mainTextScale = interpolate(slamScale, [0, 1], [2.5, 1]);

  // Word-by-word reveal for headline
  const headlineWords = ['Your', 'brain', 'already', 'knows'];
  const wordDelay = 4; // frames between each word

  // Sub text fade with enhanced timing
  const subTextOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subTextY = interpolate(frame, [40, 55], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Question marks animation
  const questionMarks = ['?', '?', '?'];

  // Person silhouette with SLAM entrance
  const personOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const personScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  // if-else keyword SLAM effect
  const ifElseDelay = headlineWords.length * wordDelay + 5;
  const ifElseScale = spring({
    frame: frame - ifElseDelay,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const ifElseGlow = interpolate(frame - ifElseDelay, [0, 15, 30], [0, 1, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} 0%, ${COLORS.deepPurple} 50%, ${COLORS.richPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="purple" speed={0.3} />

      {/* Premium floating particles */}
      {showWeatherParticles && <PremiumFloatingParticles count={40} speed={0.2} />}

      {/* Shockwave ring on SLAM */}
      <ShockwaveRing delay={ifElseDelay} color={COLORS.electricPurple} />

      {/* Glowing orbs for ambient lighting */}
      <GlowingOrb
        x="10%"
        y="20%"
        size={300}
        color={COLORS.electricPurple}
        glowColor={COLORS.electricPurpleGlow}
        opacity={0.3}
      />
      <GlowingOrb
        x="85%"
        y="70%"
        size={250}
        color={COLORS.cyanBlue}
        glowColor={COLORS.cyanBlueGlow}
        opacity={0.25}
      />

      {/* Sparkles around if-else keyword */}
      {frame > ifElseDelay && (
        <>
          <SparkleEffect x="38%" y="58%" delay={ifElseDelay + 5} size={25} color={COLORS.gold} />
          <SparkleEffect x="62%" y="55%" delay={ifElseDelay + 8} size={20} color={COLORS.cyanBlue} />
          <SparkleEffect x="35%" y="62%" delay={ifElseDelay + 12} size={18} color={COLORS.hotPink} />
          <SparkleEffect x="65%" y="60%" delay={ifElseDelay + 15} size={22} color={COLORS.electricPurple} />
        </>
      )}

      {/* Person silhouette with question marks - SLAM entrance */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          opacity: personOpacity,
          transform: `scale(${interpolate(personScale, [0, 1], [1.8, 1])})`,
        }}
      >
        {/* Glass card for person */}
        <GlassCard
          style={{
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          glowColor={COLORS.electricPurpleGlow}
          blur={15}
        >
          {/* Simple person silhouette with glow */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.cyanBlue} 0%, ${COLORS.electricPurple} 100%)`,
              margin: '0 auto 10px',
              boxShadow: `0 0 30px ${COLORS.cyanBlueGlow}, 0 0 60px ${COLORS.electricPurpleGlow}`,
            }}
          />
          <div
            style={{
              width: 120,
              height: 150,
              background: `linear-gradient(135deg, ${COLORS.cyanBlue} 0%, ${COLORS.electricPurple} 100%)`,
              borderRadius: '30px 30px 0 0',
              margin: '0 auto',
              boxShadow: `0 0 30px ${COLORS.cyanBlueGlow}, 0 0 60px ${COLORS.electricPurpleGlow}`,
            }}
          />
        </GlassCard>

        {/* Question marks with premium glow and SLAM */}
        {questionMarks.map((q, i) => {
          const floatY = Math.sin((frame + i * 20) * 0.1) * 15;
          const delay = i * 8;
          const qOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const qScale = spring({
            frame: frame - delay,
            fps,
            config: SPRING_CONFIGS.slam,
          });

          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: -80 + floatY,
                left: 30 + i * 45,
                fontSize: 50,
                color: COLORS.cyanBlue,
                opacity: qOpacity,
                fontWeight: 'bold',
                textShadow: `0 0 20px ${COLORS.cyanBlueGlow}, 0 0 40px ${COLORS.cyanBlueGlow}, 0 0 60px ${COLORS.cyanBlueGlow}`,
                transform: `scale(${interpolate(qScale, [0, 1], [2, 1])})`,
                filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))',
              }}
            >
              {q}
            </span>
          );
        })}
      </div>

      {/* Main headline with word-by-word reveal */}
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.textLight,
          textAlign: 'center',
          margin: 0,
          marginTop: 400,
          lineHeight: 1.2,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 16px',
        }}
      >
        {/* Word-by-word reveal with SLAM */}
        {headlineWords.map((word, i) => {
          const wordStart = i * wordDelay;
          const wordScale = spring({
            frame: frame - wordStart,
            fps,
            config: SPRING_CONFIGS.slam,
          });
          const wordOpacity = interpolate(frame - wordStart, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                transform: `scale(${interpolate(wordScale, [0, 1], [1.8, 1])})`,
                textShadow: `0 0 20px ${COLORS.electricPurpleGlow}, 0 0 40px ${COLORS.cyanBlueGlow}`,
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
        {/* if-else keyword with special SLAM */}
        <span
          style={{
            display: 'inline-block',
            opacity: interpolate(frame - ifElseDelay, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${interpolate(ifElseScale, [0, 1], [2.5, 1])}) rotate(${interpolate(ifElseScale, [0, 1], [-10, 0])}deg)`,
          }}
        >
          <GradientText
            gradient={`linear-gradient(90deg, ${COLORS.cyanBlue} 0%, ${COLORS.electricPurple} 50%, ${COLORS.hotPink} 100%)`}
            style={{
              fontWeight: 800,
              textShadow: `0 0 ${30 + ifElseGlow * 40}px ${COLORS.electricPurpleGlow}, 0 0 ${50 + ifElseGlow * 60}px ${COLORS.cyanBlueGlow}`,
            }}
          >
            if-else
          </GradientText>
        </span>
        <span
          style={{
            opacity: interpolate(frame - ifElseDelay - 3, [0, 5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            textShadow: `0 0 20px ${COLORS.electricPurpleGlow}`,
          }}
        >
          .
        </span>
      </h1>

      {/* Sub text with enhanced glow */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 38,
          color: COLORS.textLight,
          textAlign: 'center',
          marginTop: 24,
          opacity: subTextOpacity,
          transform: `translateY(${subTextY}px)`,
          textShadow: `0 0 15px ${COLORS.cyanBlueGlow}, 0 0 30px ${COLORS.electricPurpleGlow}`,
        }}
      >
        You use it every morning.
      </p>

      {/* Closet icon with glass card - SLAM entrance */}
      <GlassCard
        style={{
          position: 'absolute',
          bottom: 120,
          padding: '20px 40px',
          opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(
            spring({ frame: frame - 50, fps, config: SPRING_CONFIGS.bouncy }),
            [0, 1],
            [1.5, 1]
          )})`,
        }}
        glowColor={COLORS.neonGreenGlow}
      >
        <div style={{ fontSize: 70, filter: `drop-shadow(0 0 20px ${COLORS.neonGreenGlow})` }}>
          👔👗🧥
        </div>
      </GlassCard>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: Decision Tree - Premium Version
// ============================================
const Scene2DecisionTree: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Weather window
  const windowOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const windowScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });

  // Node appearances
  const node1Opacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });
  const node2Opacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });
  const node3Opacity = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: 'clamp' });

  // Path highlight (travels through "raining" path)
  const pathProgress = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} 0%, ${COLORS.deepPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="blue" speed={0.4} />

      {/* Premium particles */}
      <PremiumFloatingParticles
        count={25}
        speed={0.25}
        colors={[
          { base: COLORS.cyanBlue, glow: COLORS.cyanBlueGlow },
          { base: COLORS.neonGreen, glow: COLORS.neonGreenGlow },
        ]}
      />

      {/* Ambient orbs */}
      <GlowingOrb
        x="15%"
        y="30%"
        size={350}
        color={COLORS.cyanBlue}
        glowColor={COLORS.cyanBlueGlow}
        opacity={0.2}
      />
      <GlowingOrb
        x="80%"
        y="60%"
        size={280}
        color={COLORS.neonGreen}
        glowColor={COLORS.neonGreenGlow}
        opacity={0.2}
      />

      {/* Weather window - Glass card */}
      <GlassCard
        style={{
          marginTop: 60,
          padding: '20px 40px',
          opacity: windowOpacity,
          transform: `scale(${Math.min(windowScale, 1)})`,
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}
        glowColor={COLORS.cyanBlueGlow}
        blur={15}
      >
        <span style={{ fontSize: 45, filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))' }}>🌧️</span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 28,
            color: COLORS.textLight,
            fontWeight: 700,
            textShadow: `0 0 15px ${COLORS.cyanBlueGlow}`,
          }}
        >
          Today's Weather: Rainy
        </span>
      </GlassCard>

      {/* Flowchart */}
      <div
        style={{
          marginTop: 50,
          position: 'relative',
          width: 900,
          height: 1200,
        }}
      >
        {/* Decision Node 1: Is it raining? */}
        <DecisionDiamond
          x={450}
          y={100}
          text="Is it raining?"
          opacity={node1Opacity}
          isHighlighted={pathProgress > 0}
          fps={fps}
          frame={frame}
        />

        {/* Arrows from node 1 */}
        <Arrow
          startX={350}
          startY={180}
          endX={200}
          endY={320}
          label="YES"
          opacity={node1Opacity}
          progress={pathProgress}
          isHighlighted={pathProgress > 0.3}
        />
        <Arrow
          startX={550}
          startY={180}
          endX={700}
          endY={320}
          label="NO"
          opacity={node1Opacity}
          progress={1}
          isHighlighted={false}
        />

        {/* Result Node: Jacket (YES branch) */}
        <ResultBox
          x={200}
          y={350}
          icon="🧥"
          label="Wear jacket"
          opacity={node2Opacity}
          isHighlighted={pathProgress > 0.6}
          fps={fps}
          frame={frame}
        />

        {/* Decision Node 2: Is it hot? (NO branch) */}
        <DecisionDiamond
          x={700}
          y={350}
          text="Is it hot?"
          opacity={node2Opacity}
          isHighlighted={false}
          size="small"
          fps={fps}
          frame={frame}
        />

        {/* Arrows from node 2 */}
        <Arrow
          startX={600}
          startY={430}
          endX={500}
          endY={550}
          label="YES"
          opacity={node2Opacity}
          progress={1}
          isHighlighted={false}
        />
        <Arrow
          startX={800}
          startY={430}
          endX={850}
          endY={550}
          label="NO"
          opacity={node2Opacity}
          progress={1}
          isHighlighted={false}
        />

        {/* Result: Shorts */}
        <ResultBox
          x={500}
          y={580}
          icon="🩳"
          label="Wear shorts"
          opacity={node3Opacity}
          isHighlighted={false}
          fps={fps}
          frame={frame}
        />

        {/* Result: Bahala na */}
        <ResultBox
          x={850}
          y={580}
          icon="👕"
          label="Bahala na"
          opacity={node3Opacity}
          isHighlighted={false}
          showFlag
          fps={fps}
          frame={frame}
        />
      </div>
    </AbsoluteFill>
  );
};

// Premium Decision Diamond Component with Glow
const DecisionDiamond: React.FC<{
  x: number;
  y: number;
  text: string;
  opacity: number;
  isHighlighted: boolean;
  size?: 'normal' | 'small';
  fps: number;
  frame: number;
}> = ({ x, y, text, opacity, isHighlighted, size = 'normal', fps, frame }) => {
  const scale = size === 'small' ? 0.85 : 1;
  const dimensions = size === 'small' ? 140 : 160;

  const pulse = isHighlighted ? 1 + Math.sin(frame * 0.15) * 0.05 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - dimensions / 2,
        top: y,
        width: dimensions,
        height: dimensions,
        opacity,
        transform: `scale(${scale * pulse}) rotate(45deg)`,
        background: isHighlighted
          ? `linear-gradient(135deg, ${COLORS.cyanBlue} 0%, ${COLORS.electricPurple} 100%)`
          : `linear-gradient(135deg, ${COLORS.cyanBlue}dd 0%, ${COLORS.electricPurple}dd 100%)`,
        borderRadius: 20,
        border: isHighlighted ? `2px solid ${COLORS.cyanBlue}` : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isHighlighted
          ? `0 0 40px ${COLORS.cyanBlueGlow}, 0 0 80px ${COLORS.electricPurpleGlow}, 0 8px 30px rgba(0,0,0,0.3)`
          : `0 0 20px ${COLORS.cyanBlueGlow}50, 0 8px 30px rgba(0,0,0,0.2)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          transform: 'rotate(-45deg)',
          fontFamily: "'Inter', sans-serif",
          fontSize: size === 'small' ? 18 : 22,
          fontWeight: 700,
          color: COLORS.textLight,
          textAlign: 'center',
          padding: 10,
          textShadow: isHighlighted
            ? `0 0 15px ${COLORS.cyanBlueGlow}, 0 0 30px ${COLORS.electricPurpleGlow}`
            : `0 0 10px ${COLORS.cyanBlueGlow}`,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Premium Result Box Component with Glass Effect
const ResultBox: React.FC<{
  x: number;
  y: number;
  icon: string;
  label: string;
  opacity: number;
  isHighlighted: boolean;
  showFlag?: boolean;
  fps: number;
  frame: number;
}> = ({ x, y, icon, label, opacity, isHighlighted, showFlag, fps, frame }) => {
  const pulse = isHighlighted ? 1 + Math.sin(frame * 0.3) * 0.08 : 1;
  const iconScale = spring({
    frame: frame - (isHighlighted ? 0 : 1000),
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });

  return (
    <GlassCard
      style={{
        position: 'absolute',
        left: x - 90,
        top: y,
        width: 180,
        opacity,
        transform: `scale(${pulse})`,
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
      glowColor={isHighlighted ? COLORS.neonGreenGlow : COLORS.cyanBlueGlow}
      blur={15}
    >
      <div
        style={{
          fontSize: 60,
          transform: `scale(${isHighlighted ? Math.min(iconScale, 1) : 1})`,
          filter: isHighlighted
            ? `drop-shadow(0 0 20px ${COLORS.neonGreenGlow}) drop-shadow(0 0 40px ${COLORS.neonGreenGlow})`
            : 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.textLight,
          textAlign: 'center',
          textShadow: isHighlighted
            ? `0 0 15px ${COLORS.neonGreenGlow}`
            : `0 0 10px ${COLORS.cyanBlueGlow}`,
        }}
      >
        {label}
      </span>
      {showFlag && (
        <span style={{ fontSize: 20, opacity: 0.9, filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' }}>
          🇵🇭
        </span>
      )}
    </GlassCard>
  );
};

// Premium Arrow Component with Glow
const Arrow: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  label: string;
  opacity: number;
  progress: number;
  isHighlighted: boolean;
}> = ({ startX, startY, endX, endY, label, opacity, progress, isHighlighted }) => {
  const pathLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        opacity,
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${startX}-${startY}`}
          markerWidth="12"
          markerHeight="8"
          refX="11"
          refY="4"
          orient="auto"
        >
          <polygon
            points="0 0, 12 4, 0 8"
            fill={isHighlighted ? COLORS.neonGreen : COLORS.cyanBlue}
            filter={isHighlighted ? `drop-shadow(0 0 6px ${COLORS.neonGreenGlow})` : 'none'}
          />
        </marker>
        {isHighlighted && (
          <filter id={`glow-${startX}-${startY}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={isHighlighted ? COLORS.neonGreen : COLORS.cyanBlue}
        strokeWidth={isHighlighted ? 6 : 4}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
        markerEnd={`url(#arrowhead-${startX}-${startY})`}
        style={{
          filter: isHighlighted
            ? `drop-shadow(0 0 10px ${COLORS.neonGreenGlow}) drop-shadow(0 0 20px ${COLORS.neonGreenGlow})`
            : `drop-shadow(0 0 5px ${COLORS.cyanBlueGlow})`,
        }}
      />
      <text
        x={midX}
        y={midY - 12}
        textAnchor="middle"
        fill={isHighlighted ? COLORS.neonGreen : COLORS.textLight}
        fontFamily="'Inter', sans-serif"
        fontSize="20"
        fontWeight="bold"
        style={{
          filter: isHighlighted
            ? `drop-shadow(0 0 10px ${COLORS.neonGreenGlow})`
            : `drop-shadow(0 0 8px ${COLORS.cyanBlueGlow})`,
        }}
      >
        {label}
      </text>
    </svg>
  );
};

// ============================================
// SCENE 3: Now In Code - Premium Version
// ============================================
const Scene3Code: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Background transition
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Code lines
  const codeLines = [
    { text: 'let weather = "raining"', start: 30, duration: 30, highlight: 0 },
    { text: '', start: 65, duration: 5, highlight: -1 },
    { text: 'if (weather === "raining") {', start: 70, duration: 35, highlight: 1 },
    { text: '  wear("jacket")', start: 110, duration: 25, highlight: 1 },
    { text: '} else if (weather === "hot") {', start: 140, duration: 35, highlight: 2 },
    { text: '  wear("shorts")', start: 180, duration: 25, highlight: 2 },
    { text: '} else {', start: 210, duration: 15, highlight: 3 },
    { text: '  wear("anything")  // bahala na', start: 230, duration: 30, highlight: 3 },
    { text: '}', start: 265, duration: 5, highlight: -1 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} 0%, ${COLORS.midnightBlue} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="blue" speed={0.5} />

      {/* Scanline effect for terminal aesthetic */}
      <ScanlineEffect opacity={0.08} speed={3} />

      {/* Premium particles */}
      <PremiumFloatingParticles
        count={20}
        speed={0.15}
        colors={[
          { base: COLORS.codeBlue, glow: COLORS.cyanBlueGlow },
          { base: COLORS.codeGreen, glow: COLORS.neonGreenGlow },
          { base: COLORS.codePink, glow: COLORS.hotPinkGlow },
        ]}
      />

      {/* Ambient orbs */}
      <GlowingOrb
        x="5%"
        y="15%"
        size={400}
        color={COLORS.cyanBlue}
        glowColor={COLORS.cyanBlueGlow}
        opacity={0.15}
      />
      <GlowingOrb
        x="90%"
        y="75%"
        size={350}
        color={COLORS.electricPurple}
        glowColor={COLORS.electricPurpleGlow}
        opacity={0.15}
      />

      {/* Mini clothing icons at top - Glass cards */}
      <div
        style={{
          marginTop: 60,
          display: 'flex',
          gap: 50,
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {[
          { icon: '🧥', condition: 'raining', active: true, color: COLORS.cyanBlue, glowColor: COLORS.cyanBlueGlow },
          { icon: '🩳', condition: 'hot', active: false, color: COLORS.goldenYellow, glowColor: COLORS.goldenYellowGlow },
          { icon: '👕', condition: 'else', active: false, color: COLORS.hotPink, glowColor: COLORS.hotPinkGlow },
        ].map((item, i) => {
          const isActive = codeLines.some(
            (line) =>
              line.highlight === i + 1 &&
              frame >= line.start &&
              frame < line.start + line.duration + 20
          );

          const itemScale = spring({
            frame: frame - (isActive ? codeLines.find(l => l.highlight === i + 1)?.start || 0 : 1000),
            fps,
            config: { damping: 10, stiffness: 150, mass: 0.6 },
          });

          return (
            <GlassCard
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                padding: '20px 25px',
                opacity: isActive ? 1 : 0.5,
                transform: `scale(${isActive ? Math.min(itemScale, 1.15) : 1})`,
                transition: 'opacity 0.3s',
              }}
              glowColor={isActive ? item.glowColor : COLORS.cyanBlueGlow}
              blur={12}
            >
              <span
                style={{
                  fontSize: 55,
                  filter: isActive
                    ? `drop-shadow(0 0 20px ${item.glowColor}) drop-shadow(0 0 40px ${item.glowColor})`
                    : 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  color: isActive ? item.color : COLORS.codeGray,
                  fontWeight: 700,
                  textShadow: isActive ? `0 0 15px ${item.glowColor}` : 'none',
                }}
              >
                {item.condition}
              </span>
            </GlassCard>
          );
        })}
      </div>

      {/* Code block - Premium glass card */}
      <GlassCard
        style={{
          marginTop: 70,
          padding: 40,
          width: '95%',
          maxWidth: 1000,
          opacity: interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' }),
          backgroundColor: 'rgba(10, 10, 15, 0.7)',
        }}
        glowColor={COLORS.cyanBlueGlow}
        blur={20}
      >
        {/* Code editor header */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
            boxShadow: '0 0 10px #ff5f56',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            boxShadow: '0 0 10px #ffbd2e',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#27ca40',
            boxShadow: '0 0 10px #27ca40',
          }} />
        </div>

        {codeLines.map((line, index) => (
          <CodeLineIfElse
            key={index}
            text={line.text}
            startFrame={line.start}
            duration={line.duration}
            frame={frame}
            fps={fps}
          />
        ))}
      </GlassCard>
    </AbsoluteFill>
  );
};

// Premium Code line with enhanced syntax highlighting
const CodeLineIfElse: React.FC<{
  text: string;
  startFrame: number;
  duration: number;
  frame: number;
  fps: number;
}> = ({ text, startFrame, duration, frame, fps }) => {
  if (frame < startFrame) return <div style={{ height: 42 }} />;

  const progress = Math.min(1, (frame - startFrame) / duration);
  const visibleChars = Math.floor(text.length * progress);
  const displayText = text.slice(0, visibleChars);

  // Enhanced syntax highlighting with glow effects
  const highlightSyntax = (code: string) => {
    if (!code) return null;

    const highlighted = code
      .replace(
        /(let|if|else)/g,
        `<span style="color: ${COLORS.codeBlue}; text-shadow: 0 0 10px ${COLORS.cyanBlueGlow}; font-weight: 700;">$1</span>`
      )
      .replace(
        /("[\w\s]*")/g,
        `<span style="color: ${COLORS.codeGreen}; text-shadow: 0 0 10px ${COLORS.neonGreenGlow}; font-weight: 600;">$1</span>`
      )
      .replace(
        /(\/\/.*)/g,
        `<span style="color: ${COLORS.codeGray}; font-style: italic;">$1</span>`
      )
      .replace(
        /(wear|weather)/g,
        `<span style="color: ${COLORS.codeYellow}; text-shadow: 0 0 10px ${COLORS.goldenYellowGlow}; font-weight: 600;">$1</span>`
      )
      .replace(
        /(===)/g,
        `<span style="color: ${COLORS.codePink}; text-shadow: 0 0 10px ${COLORS.hotPinkGlow}; font-weight: 700;">$1</span>`
      );

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div style={{ minHeight: 42, marginBottom: 8 }}>
      <code
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
          color: COLORS.textLight,
          whiteSpace: 'pre',
          lineHeight: 1.5,
        }}
      >
        {highlightSyntax(displayText)}
        {progress < 1 && (
          <span style={{
            color: COLORS.cyanBlue,
            opacity: frame % 30 < 15 ? 1 : 0,
            textShadow: `0 0 15px ${COLORS.cyanBlueGlow}`,
          }}>
            |
          </span>
        )}
      </code>
    </div>
  );
};

// ============================================
// SCENE 4: Interactive Simulation - Premium Version
// ============================================
const Scene4Simulation: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Three rounds - extended timing for readability
  const rounds = [
    {
      weather: '🌧️',
      label: 'Rainy',
      result: '🧥',
      resultLabel: 'jacket',
      start: 0,
      codeLine: 'wear("jacket")',
      color: COLORS.cyanBlue,
      glowColor: COLORS.cyanBlueGlow,
    },
    {
      weather: '☀️',
      label: 'Sunny',
      result: '🩳',
      resultLabel: 'shorts',
      start: 90,
      codeLine: 'wear("shorts")',
      color: COLORS.goldenYellow,
      glowColor: COLORS.goldenYellowGlow,
    },
    {
      weather: '⛅',
      label: 'Cloudy',
      result: '👕',
      resultLabel: 'anything',
      start: 180,
      codeLine: 'wear("anything")',
      color: COLORS.hotPink,
      glowColor: COLORS.hotPinkGlow,
    },
  ];

  const currentRound = rounds.findIndex((r, i) => {
    const nextStart = rounds[i + 1]?.start ?? 270;
    return frame >= r.start && frame < nextStart;
  });

  const round = rounds[Math.max(0, currentRound)];
  const roundFrame = frame - round.start;

  // Weather animation with better spring config
  const weatherScale = spring({
    frame: roundFrame,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.8 },
  });

  // Result animation with better spring config
  const resultOpacity = interpolate(roundFrame, [25, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resultScale = spring({
    frame: roundFrame - 25,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7 },
  });

  // Confetti - extended timing
  const showConfetti = roundFrame > 50 && roundFrame < 75;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} 0%, ${COLORS.midnightBlue} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="purple" speed={0.6} />

      {/* Scanline effect */}
      <ScanlineEffect opacity={0.06} speed={2.5} />

      {/* Premium particles */}
      <PremiumFloatingParticles
        count={30}
        speed={0.2}
        colors={[
          { base: round.color, glow: round.glowColor },
          { base: COLORS.electricPurple, glow: COLORS.electricPurpleGlow },
        ]}
      />

      {/* Dynamic ambient orb */}
      <GlowingOrb
        x="50%"
        y="50%"
        size={500}
        color={round.color}
        glowColor={round.glowColor}
        opacity={0.2}
      />

      {/* Mini code reference - Glass card */}
      <GlassCard
        style={{
          padding: '20px 35px',
          marginTop: 60,
        }}
        glowColor={roundFrame > 30 ? COLORS.neonGreenGlow : round.glowColor}
        blur={15}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 24,
            color: roundFrame > 30 ? COLORS.neonGreen : COLORS.textLight,
            fontWeight: 700,
            textShadow: roundFrame > 30
              ? `0 0 20px ${COLORS.neonGreenGlow}, 0 0 40px ${COLORS.neonGreenGlow}`
              : `0 0 15px ${round.glowColor}`,
          }}
        >
          {round.codeLine}
        </code>
      </GlassCard>

      {/* Round indicator */}
      <div
        style={{
          marginTop: 50,
          display: 'flex',
          gap: 25,
        }}
      >
        {rounds.map((r, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: i === currentRound ? r.color : 'rgba(255,255,255,0.2)',
              boxShadow: i === currentRound
                ? `0 0 15px ${r.glowColor}, 0 0 30px ${r.glowColor}`
                : 'none',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Weather display - Glass card */}
      <GlassCard
        style={{
          marginTop: 80,
          padding: '45px 70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${Math.min(weatherScale, 1)})`,
        }}
        glowColor={round.glowColor}
        blur={20}
      >
        <div
          style={{
            fontSize: 150,
            marginBottom: 30,
            filter: `drop-shadow(0 0 35px ${round.glowColor}) drop-shadow(0 0 70px ${round.glowColor})`,
          }}
        >
          {round.weather}
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 48,
            fontWeight: 800,
            color: round.color,
            textShadow: `0 0 15px ${round.color}, 0 0 30px ${round.glowColor}, 0 0 50px ${round.glowColor}`,
            WebkitTextStroke: `1px ${round.color}`,
          }}
        >
          {round.label}
        </span>
      </GlassCard>

      {/* Arrow */}
      <div
        style={{
          marginTop: 50,
          fontSize: 70,
          color: round.color,
          opacity: interpolate(roundFrame, [15, 25], [0, 1], { extrapolateRight: 'clamp' }),
          textShadow: `0 0 20px ${round.glowColor}, 0 0 40px ${round.glowColor}`,
          filter: `drop-shadow(0 0 15px ${round.glowColor})`,
        }}
      >
        ↓
      </div>

      {/* Result - Glass card */}
      <GlassCard
        style={{
          marginTop: 50,
          padding: '35px 50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: resultOpacity,
          transform: `scale(${Math.min(resultScale, 1)})`,
        }}
        glowColor={COLORS.neonGreenGlow}
        blur={18}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
            filter: `drop-shadow(0 0 30px ${COLORS.neonGreenGlow}) drop-shadow(0 0 60px ${COLORS.neonGreenGlow})`,
          }}
        >
          {round.result}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <GradientText
            gradient={`linear-gradient(90deg, ${COLORS.neonGreen} 0%, ${COLORS.cyanBlue} 100%)`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            {round.resultLabel}
          </GradientText>
          <span style={{
            fontSize: 40,
            filter: `drop-shadow(0 0 15px ${COLORS.neonGreenGlow})`,
          }}>
            ✅
          </span>
        </div>
      </GlassCard>

      {/* Premium confetti */}
      {showConfetti && <PremiumConfetti color={round.color} glowColor={round.glowColor} />}
    </AbsoluteFill>
  );
};

// Premium confetti component with glow
const PremiumConfetti: React.FC<{ color: string; glowColor: string }> = ({ color, glowColor }) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 30 }, (_, i) => {
    const x = 540 + (Math.sin(i * 1.5) * 250);
    const startY = 1200;
    const y = startY - frame * 10 - (i % 6) * 35;
    const rotation = frame * 12 + i * 40;
    const colors = [COLORS.neonGreen, COLORS.goldenYellow, COLORS.cyanBlue, COLORS.hotPink, COLORS.electricPurple];
    const particleColor = colors[i % colors.length];
    const size = 15 + (i % 3) * 5;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x + Math.sin(frame * 0.25 + i) * 30,
          top: y,
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${particleColor}, ${colors[(i + 1) % colors.length]})`,
          borderRadius: i % 3 === 0 ? '50%' : '2px',
          transform: `rotate(${rotation}deg)`,
          opacity: interpolate(frame, [0, 12, 18], [0, 1, 0]),
          boxShadow: `0 0 ${size}px ${glowColor}, 0 0 ${size * 2}px ${glowColor}`,
        }}
      />
    );
  });

  return <AbsoluteFill style={{ overflow: 'hidden' }}>{particles}</AbsoluteFill>;
};

// ============================================
// SCENE 5: The Aha Moment - Premium Version with Celebrations
// ============================================
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Background gradient
  const gradientProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // SLAM entrance for main text
  const mainScale = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const mainOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Flash effect on aha moment
  const flashOpacity = interpolate(frame, [5, 12, 25], [0, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Second line typewriter - word by word
  const line2Words = ['Your', 'brain', 'checks', 'conditions', 'all', 'day.'];
  const line2Start = 25;
  const wordDelay = 4;

  // Third line with SLAM
  const line3Start = 50;
  const line3Scale = spring({
    frame: frame - line3Start,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const line3Opacity = interpolate(frame, [line3Start, line3Start + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} ${(1 - gradientProgress) * 30}%, ${COLORS.richPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Flash effect on aha */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, ${COLORS.gold} 0%, transparent 70%)`,
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Animated gradient background */}
      <AnimatedGradientBg variant="purple" speed={0.4} />

      {/* Premium particles */}
      <PremiumFloatingParticles
        count={35}
        speed={0.25}
      />

      {/* Confetti celebration */}
      <ConfettiEffect startFrame={8} duration={50} count={60} />

      {/* Pulse rings on aha */}
      <PulseRing x="50%" y="40%" delay={5} color={COLORS.gold} maxSize={500} />
      <PulseRing x="50%" y="40%" delay={12} color={COLORS.electricPurple} maxSize={450} />
      <PulseRing x="50%" y="40%" delay={19} color={COLORS.cyanBlue} maxSize={400} />

      {/* Multiple ambient orbs */}
      <GlowingOrb
        x="20%"
        y="25%"
        size={450}
        color={COLORS.electricPurple}
        glowColor={COLORS.electricPurpleGlow}
        opacity={0.25}
      />
      <GlowingOrb
        x="75%"
        y="65%"
        size={400}
        color={COLORS.cyanBlue}
        glowColor={COLORS.cyanBlueGlow}
        opacity={0.2}
      />
      <GlowingOrb
        x="50%"
        y="50%"
        size={350}
        color={COLORS.hotPink}
        glowColor={COLORS.hotPinkGlow}
        opacity={0.15}
      />

      {/* Celebration sparkles */}
      <SparkleEffect x="25%" y="30%" delay={10} size={30} color={COLORS.gold} />
      <SparkleEffect x="75%" y="25%" delay={15} size={25} color={COLORS.cyanBlue} />
      <SparkleEffect x="20%" y="60%" delay={20} size={22} color={COLORS.hotPink} />
      <SparkleEffect x="80%" y="55%" delay={25} size={28} color={COLORS.electricPurple} />
      <SparkleEffect x="50%" y="20%" delay={18} size={24} color={COLORS.neonGreen} />

      {/* Main text with SLAM entrance and premium gradient */}
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 72,
          fontWeight: 800,
          textAlign: 'center',
          margin: 0,
          opacity: mainOpacity,
          transform: `scale(${interpolate(mainScale, [0, 1], [2.5, 1])}) rotate(${interpolate(mainScale, [0, 1], [-8, 0])}deg)`,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.cyanBlue} 30%, ${COLORS.electricPurple} 60%, ${COLORS.hotPink} 100%)`}
          style={{
            textShadow: `0 0 40px ${COLORS.goldGlow}, 0 0 60px ${COLORS.electricPurpleGlow}, 0 0 90px ${COLORS.cyanBlueGlow}`,
          }}
        >
          If this, then that.
        </GradientText>
      </h1>

      {/* Second line with word-by-word reveal */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 44,
          color: COLORS.textLight,
          textAlign: 'center',
          marginTop: 40,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 12px',
        }}
      >
        {line2Words.map((word, i) => {
          const wordStart = line2Start + i * wordDelay;
          const wordScale = spring({
            frame: frame - wordStart,
            fps,
            config: SPRING_CONFIGS.snappy,
          });
          const wordOpacity = interpolate(frame - wordStart, [0, 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: wordOpacity,
                transform: `scale(${interpolate(wordScale, [0, 1], [1.5, 1])}) translateY(${interpolate(wordScale, [0, 1], [-20, 0])}px)`,
                textShadow: `0 0 20px ${COLORS.cyanBlueGlow}, 0 0 40px ${COLORS.electricPurpleGlow}`,
              }}
            >
              <GradientText
                gradient={`linear-gradient(90deg, ${COLORS.textLight} 0%, ${COLORS.cyanBlue} 100%)`}
              >
                {word}
              </GradientText>
            </span>
          );
        })}
      </p>

      {/* Third line with SLAM */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 38,
          textAlign: 'center',
          marginTop: 35,
          opacity: line3Opacity,
          transform: `scale(${interpolate(line3Scale, [0, 1], [1.3, 1])})`,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.textGray} 0%, ${COLORS.neonGreen} 100%)`}
          style={{
            textShadow: `0 0 20px ${COLORS.neonGreenGlow}`,
          }}
        >
          Code just writes it down.
        </GradientText>
      </p>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: CTA - Premium Version with SLAM & Glitch
// ============================================
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // SLAM entrance for terminal
  const terminalScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  // Terminal lines
  const lines = [
    { text: '> condition: curious', color: COLORS.neonGreen, glowColor: COLORS.neonGreenGlow, start: 8 },
    { text: '> action: learn more', color: COLORS.goldenYellow, glowColor: COLORS.goldenYellowGlow, start: 22 },
    { text: '> DOGM.AI', color: COLORS.hotPink, glowColor: COLORS.hotPinkGlow, start: 38 },
  ];

  // Cursor blink
  const cursorVisible = frame % 20 < 10;

  // Glitch effect for DOGM.AI
  const glitchActive = frame > 38 && frame % 45 < 4;
  const glitchOffset = glitchActive ? Math.sin(frame * 10) * 3 : 0;

  // Next lesson hint with SLAM
  const hintStart = 52;
  const hintScale = spring({
    frame: frame - hintStart,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const hintOpacity = interpolate(frame, [hintStart, hintStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo SLAM
  const logoStart = 58;
  const logoScale = spring({
    frame: frame - logoStart,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const logoOpacity = interpolate(frame, [logoStart, logoStart + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.deepDark} 0%, #050508 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg variant="purple" speed={0.3} />

      {/* Scanline effect for terminal */}
      <ScanlineEffect opacity={0.1} speed={4} />

      {/* Premium particles */}
      <PremiumFloatingParticles
        count={25}
        speed={0.18}
      />

      {/* Shockwave on terminal appear */}
      <ShockwaveRing delay={0} color={COLORS.cyanBlue} />

      {/* Ambient orbs */}
      <GlowingOrb
        x="15%"
        y="20%"
        size={380}
        color={COLORS.neonGreen}
        glowColor={COLORS.neonGreenGlow}
        opacity={0.2}
      />
      <GlowingOrb
        x="82%"
        y="75%"
        size={350}
        color={COLORS.hotPink}
        glowColor={COLORS.hotPinkGlow}
        opacity={0.18}
      />

      {/* Celebration sparkles */}
      <SparkleEffect x="30%" y="35%" delay={40} size={22} color={COLORS.gold} />
      <SparkleEffect x="70%" y="30%" delay={45} size={20} color={COLORS.cyanBlue} />
      <SparkleEffect x="25%" y="65%" delay={50} size={18} color={COLORS.hotPink} />

      {/* Terminal window - Premium glass card with SLAM */}
      <GlassCard
        style={{
          padding: 40,
          width: '90%',
          maxWidth: 900,
          backgroundColor: 'rgba(10, 10, 15, 0.85)',
          transform: `scale(${interpolate(terminalScale, [0, 1], [2, 1])}) rotate(${interpolate(terminalScale, [0, 1], [-5, 0])}deg)`,
          opacity: interpolate(terminalScale, [0, 0.3], [0, 1]),
        }}
        glowColor={COLORS.cyanBlueGlow}
        blur={20}
      >
        {/* Terminal header with animated glow */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 30, alignItems: 'center' }}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
            boxShadow: '0 0 15px #ff5f56, 0 0 30px #ff5f5680',
          }} />
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            boxShadow: '0 0 15px #ffbd2e, 0 0 30px #ffbd2e80',
          }} />
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#27ca40',
            boxShadow: '0 0 15px #27ca40, 0 0 30px #27ca4080',
          }} />
          <span style={{
            marginLeft: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            color: COLORS.textGray,
            letterSpacing: '0.1em',
          }}>
            decision.sh
          </span>
        </div>

        {/* Terminal lines with enhanced typewriter and glow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {lines.map((line, i) => {
            const progress = Math.min(1, Math.max(0, (frame - line.start) / 12));
            const visibleChars = Math.floor(line.text.length * progress);
            const lineScale = spring({
              frame: frame - line.start,
              fps,
              config: SPRING_CONFIGS.snappy,
            });

            if (frame < line.start) return <div key={i} style={{ height: i === 2 ? 60 : 42 }} />;

            // Special glitch effect for DOGM.AI line
            const isLogoLine = i === 2;
            const glitchStyle = isLogoLine && glitchActive ? {
              transform: `translateX(${glitchOffset}px)`,
              textShadow: `${-glitchOffset}px 0 ${COLORS.cyanBlue}, ${glitchOffset}px 0 ${COLORS.hotPink}, 0 0 30px ${line.glowColor}`,
            } : {};

            return (
              <code
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: isLogoLine ? 52 : 32,
                  fontWeight: isLogoLine ? 800 : 600,
                  color: line.color,
                  textShadow: `0 0 20px ${line.glowColor}, 0 0 40px ${line.glowColor}, 0 0 60px ${line.glowColor}`,
                  transform: `scale(${interpolate(lineScale, [0, 1], [1.3, 1])})`,
                  transformOrigin: 'left center',
                  ...glitchStyle,
                }}
              >
                {line.text.slice(0, visibleChars)}
                {progress < 1 && (
                  <span style={{
                    opacity: frame % 15 < 8 ? 1 : 0,
                    color: line.color,
                    textShadow: `0 0 15px ${line.glowColor}`,
                  }}>
                    █
                  </span>
                )}
                {isLogoLine && progress >= 1 && (
                  <span style={{
                    opacity: cursorVisible ? 1 : 0,
                    textShadow: `0 0 15px ${line.glowColor}`,
                  }}>
                    _
                  </span>
                )}
              </code>
            );
          })}
        </div>
      </GlassCard>

      {/* Next lesson hint with SLAM entrance */}
      <p
        style={{
          marginTop: 50,
          fontFamily: "'Inter', sans-serif",
          fontSize: 28,
          textAlign: 'center',
          opacity: hintOpacity,
          transform: `scale(${interpolate(hintScale, [0, 1], [1.5, 1])}) translateY(${interpolate(hintScale, [0, 1], [20, 0])}px)`,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.cyanBlue} 0%, ${COLORS.electricPurple} 50%, ${COLORS.hotPink} 100%)`}
          style={{
            textShadow: `0 0 25px ${COLORS.cyanBlueGlow}, 0 0 50px ${COLORS.electricPurpleGlow}`,
          }}
        >
          Next: What if you need to repeat something?
        </GradientText>
      </p>

      {/* Logo/handle with glass card - SLAM entrance */}
      <GlassCard
        style={{
          marginTop: 35,
          opacity: logoOpacity,
          padding: '18px 40px',
          transform: `scale(${interpolate(logoScale, [0, 1], [2, 1])}) rotate(${interpolate(logoScale, [0, 1], [8, 0])}deg)`,
        }}
        glowColor={COLORS.goldGlow}
        blur={15}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.cyanBlue} 50%, ${COLORS.hotPink} 100%)`}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 26,
            letterSpacing: '0.15em',
            fontWeight: 800,
            textShadow: `0 0 25px ${COLORS.goldGlow}, 0 0 50px ${COLORS.cyanBlueGlow}`,
          }}
        >
          dogm.ai/enroll
        </GradientText>
      </GlassCard>
    </AbsoluteFill>
  );
};
