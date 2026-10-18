import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

// Font face declarations
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

export interface VariablesExplainedProps {
  showAudioHints?: boolean;
}

// Premium color palette with enhanced glow variants
const COLORS = {
  background: '#0a0a0f',
  backgroundLight: '#12121a',
  surface: '#1a1a24',
  surfaceLight: '#24243a',
  text: '#ffffff',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
  accent: '#f97316',
  accentGlow: 'rgba(249, 115, 22, 0.5)',
  accentSoft: '#fb923c',
  secondary: '#8b5cf6',
  secondaryGlow: 'rgba(139, 92, 246, 0.5)',
  green: '#22c55e',
  greenGlow: 'rgba(34, 197, 94, 0.5)',
  blue: '#3b82f6',
  blueGlow: 'rgba(59, 130, 246, 0.5)',
  yellow: '#eab308',
  yellowGlow: 'rgba(234, 179, 8, 0.5)',
  cyan: '#06b6d4',
  cyanGlow: 'rgba(6, 182, 212, 0.5)',
  pink: '#ec4899',
  pinkGlow: 'rgba(236, 72, 153, 0.5)',
  purple: '#a855f7',
  purpleGlow: 'rgba(168, 85, 247, 0.5)',
  gradient1: '#1e1b4b',
  gradient2: '#312e81',
  gradient3: '#0c0a09',
};

// Enhanced spring configurations
const SPRING_CONFIGS = {
  bouncy: { damping: 8, stiffness: 120, mass: 0.8 },
  smooth: { damping: 20, stiffness: 180, mass: 1 },
  gentle: { damping: 25, stiffness: 150, mass: 1.2 },
  snappy: { damping: 15, stiffness: 280, mass: 0.5 },
  elastic: { damping: 10, stiffness: 100, mass: 1.5 },
  slam: { damping: 12, stiffness: 300, mass: 0.6 },
};

// ============================================
// PREMIUM COMPONENTS
// ============================================

// Enhanced animated gradient background with multiple layers
const AnimatedGradientBg: React.FC<{ frame: number; colors?: string[]; intensity?: number }> = ({
  frame,
  colors = [COLORS.gradient1, COLORS.gradient2, COLORS.secondary],
  intensity = 1,
}) => {
  const rotation = frame * 0.4;
  const scale = 1 + Math.sin(frame * 0.02) * 0.15;
  const pulse = 0.8 + Math.sin(frame * 0.03) * 0.2;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Primary rotating gradient */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors[0]} 0deg, ${colors[1]} 120deg, ${colors[2] || colors[0]} 240deg, ${colors[0]} 360deg)`,
          opacity: 0.35 * intensity * pulse,
          transform: `scale(${scale})`,
          filter: 'blur(100px)',
        }}
      />
      {/* Secondary counter-rotating gradient for depth */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-30%',
          width: '160%',
          height: '160%',
          background: `conic-gradient(from ${-rotation * 0.5}deg at 60% 40%, transparent 0deg, ${colors[1]}40 90deg, transparent 180deg, ${colors[2] || colors[0]}30 270deg, transparent 360deg)`,
          opacity: 0.25 * intensity,
          transform: `scale(${1 + Math.sin(frame * 0.025) * 0.1})`,
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
};

// Enhanced floating particles with multi-layer glow
const FloatingParticles: React.FC<{
  frame: number;
  count?: number;
  color?: string;
  glowColor?: string;
  speed?: number;
}> = ({ frame, count = 30, color = COLORS.accent, glowColor = COLORS.accentGlow, speed = 1 }) => {
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5;
    const x = (seed * 7.3) % 100;
    const baseY = (seed * 13.7) % 100;
    const size = 2 + (i % 5) * 1.5;
    const particleSpeed = (0.2 + (i % 5) * 0.08) * speed;
    const delay = seed % 100;

    const y = (baseY + frame * particleSpeed + delay) % 130 - 15;
    const wobbleX = Math.sin((frame + seed) * 0.025) * 20;
    const wobbleY = Math.cos((frame + seed) * 0.02) * 8;
    const pulse = 0.4 + Math.sin((frame + seed) * 0.06) * 0.6;
    const rotation = (frame + seed) * 0.5;

    // Fade in/out at edges
    const fadeOpacity = interpolate(y, [-15, 15, 100, 115], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x + wobbleX * 0.5}%`,
          top: `${y + wobbleY}%`,
          width: size * pulse,
          height: size * pulse,
          backgroundColor: color,
          borderRadius: '50%',
          opacity: fadeOpacity * pulse * 0.8,
          boxShadow: `
            0 0 ${size * 2}px ${glowColor},
            0 0 ${size * 4}px ${glowColor},
            0 0 ${size * 6}px ${glowColor}
          `,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles}
    </div>
  );
};

// Enhanced glowing orb with layered effects
const GlowingOrb: React.FC<{
  frame: number;
  x: string;
  y: string;
  color: string;
  glowColor?: string;
  size?: number;
  pulseSpeed?: number;
  driftSpeed?: number;
}> = ({ frame, x, y, color, glowColor, size = 400, pulseSpeed = 0.025, driftSpeed = 0.015 }) => {
  const pulse = 1 + Math.sin(frame * pulseSpeed) * 0.25;
  const driftX = Math.sin(frame * driftSpeed) * 25;
  const driftY = Math.cos(frame * driftSpeed * 0.8) * 15;
  const breathe = 0.35 + Math.sin(frame * 0.02) * 0.15;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size * pulse,
        height: size * pulse,
        background: `radial-gradient(circle, ${color} 0%, ${glowColor || color}50 40%, transparent 70%)`,
        transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px)`,
        opacity: breathe,
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Sparkle effect for celebration moments
const SparkleEffect: React.FC<{
  frame: number;
  x: number;
  y: number;
  delay?: number;
  color?: string;
  size?: number;
}> = ({ frame, x, y, delay = 0, color = COLORS.yellow, size = 30 }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const scale = interpolate(localFrame, [0, 8, 20], [0, 1.2, 0], {
    extrapolateRight: 'clamp',
  });
  const rotation = localFrame * 8;
  const opacity = interpolate(localFrame, [0, 5, 20], [0, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: size,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color})`,
        pointerEvents: 'none',
      }}
    >
      ✨
    </div>
  );
};

// Enhanced glass morphism container with animated border
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: number;
}> = ({ children, style, glowColor = COLORS.secondaryGlow, intensity = 1 }) => (
  <div
    style={{
      background: `rgba(26, 26, 36, ${0.6 * intensity})`,
      backdropFilter: `blur(${20 * intensity}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${20 * intensity}px) saturate(180%)`,
      borderRadius: 24,
      border: `1px solid rgba(255, 255, 255, ${0.1 * intensity})`,
      boxShadow: `
        0 25px 70px rgba(0, 0, 0, 0.5),
        0 0 50px ${glowColor},
        inset 0 1px 1px rgba(255, 255, 255, 0.1)
      `,
      ...style,
    }}
  >
    {children}
  </div>
);

// Enhanced premium code block with glow effect
const PremiumCodeBlock: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
}> = ({ children, style, glowColor = COLORS.secondaryGlow }) => (
  <div
    style={{
      background: 'rgba(10, 10, 15, 0.95)',
      backdropFilter: 'blur(15px)',
      padding: '28px 42px',
      borderRadius: 18,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: `
        0 15px 50px rgba(0, 0, 0, 0.6),
        0 0 30px ${glowColor},
        inset 0 1px 0 rgba(255, 255, 255, 0.08)
      `,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    {/* Subtle inner glow line */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
      }}
    />
    {children}
  </div>
);

// Enhanced premium tupperware container with 3D effect and animations
const PremiumTupperware: React.FC<{
  children: React.ReactNode;
  color: string;
  glowColor: string;
  frame: number;
  isActive?: boolean;
  scale?: number;
}> = ({ children, color, glowColor, frame, isActive = true, scale = 1 }) => {
  const pulse = isActive ? 1 + Math.sin(frame * 0.08) * 0.04 : 1;
  const glowIntensity = isActive ? 0.7 + Math.sin(frame * 0.1) * 0.3 : 0.4;
  const floatY = isActive ? Math.sin(frame * 0.05) * 3 : 0;
  const shimmerX = (frame * 2) % 300 - 50;

  return (
    <div
      style={{
        width: 280 * scale,
        height: 200 * scale,
        background: `linear-gradient(145deg, ${COLORS.surface} 0%, ${COLORS.backgroundLight} 100%)`,
        borderRadius: 24 * scale,
        border: `3px solid ${color}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `
          0 25px 60px rgba(0, 0, 0, 0.6),
          0 0 ${50 * glowIntensity}px ${glowColor},
          0 0 ${80 * glowIntensity}px ${glowColor},
          inset 0 -5px 0 rgba(0, 0, 0, 0.25),
          inset 0 2px 0 rgba(255, 255, 255, 0.15)
        `,
        position: 'relative',
        transform: `scale(${pulse}) translateY(${floatY}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Lid shine effect */}
      <div
        style={{
          position: 'absolute',
          top: 12 * scale,
          left: 24 * scale,
          right: 24 * scale,
          height: 6 * scale,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
          borderRadius: 4 * scale,
        }}
      />
      {/* Animated shimmer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: shimmerX,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
        }}
      />
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: -3,
          borderRadius: 27 * scale,
          border: `2px solid ${color}`,
          opacity: glowIntensity * 0.6,
          filter: 'blur(6px)',
          pointerEvents: 'none',
        }}
      />
      {/* Inner gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 3,
          borderRadius: 20 * scale,
          background: `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};

// Enhanced animated label tag with gradient and glow
const LabelTag: React.FC<{
  text: string;
  chars: number;
  color: string;
  glowColor?: string;
  frame: number;
  showCursor?: boolean;
}> = ({ text, chars, color, glowColor, frame, showCursor = true }) => {
  const pulseGlow = 0.4 + Math.sin(frame * 0.1) * 0.2;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        padding: '14px 32px',
        borderRadius: '14px 14px 0 0',
        marginBottom: -4,
        zIndex: 1,
        boxShadow: `
          0 -6px 25px ${glowColor || color}${Math.floor(pulseGlow * 255).toString(16).padStart(2, '0')},
          0 -2px 10px ${glowColor || color}60,
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top shine */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 26,
          color: COLORS.text,
          fontWeight: 600,
          textShadow: `0 2px 6px rgba(0,0,0,0.4), 0 0 20px ${glowColor || color}60`,
          letterSpacing: '-0.02em',
        }}
      >
        {text.slice(0, chars)}
        {showCursor && chars < text.length && (
          <span
            style={{
              opacity: Math.floor(frame / 10) % 2,
              color: COLORS.text,
              textShadow: `0 0 10px ${COLORS.text}`,
            }}
          >
            |
          </span>
        )}
      </span>
    </div>
  );
};

export const VariablesExplained: React.FC<VariablesExplainedProps> = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-180 frames / 0-6 sec) */}
      <Sequence from={0} durationInFrames={180}>
        <Scene1Hook fps={fps} />
      </Sequence>

      {/* Scene 2: The Tupperware (180-390 frames / 6-13 sec) */}
      <Sequence from={180} durationInFrames={210}>
        <Scene2Tupperware fps={fps} />
      </Sequence>

      {/* Scene 3: Change the Value (390-630 frames / 13-21 sec) */}
      <Sequence from={390} durationInFrames={240}>
        <Scene3ChangeValue fps={fps} />
      </Sequence>

      {/* Scene 4: More Examples (630-900 frames / 21-30 sec) */}
      <Sequence from={630} durationInFrames={270}>
        <Scene4Examples fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (900-1110 frames / 30-37 sec) */}
      <Sequence from={900} durationInFrames={210}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (1110-1290 frames / 37-43 sec) */}
      <Sequence from={1110} durationInFrames={180}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 1: Hook - Enhanced with premium animations
// ============================================
const Scene1Hook: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Enhanced slam animation with elastic spring
  const mainTextSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const mainTextScale = interpolate(mainTextSpring, [0, 1], [1.5, 1]);
  const mainTextOpacity = interpolate(mainTextSpring, [0, 0.3, 1], [0, 0.8, 1]);
  const mainTextBlur = interpolate(mainTextSpring, [0, 1], [10, 0]);

  // Word-by-word reveal for "variables"
  const variablesSpring = spring({
    frame: frame - 8,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const variablesScale = interpolate(variablesSpring, [0, 1], [0.5, 1]);
  const variablesRotate = interpolate(variablesSpring, [0, 1], [-10, 0]);

  // Sub text with bounce
  const subTextSpring = spring({
    frame: frame - 35,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const subTextOpacity = interpolate(subTextSpring, [0, 1], [0, 1]);
  const subTextY = interpolate(subTextSpring, [0, 1], [40, 0]);

  // Pulsing glow effect
  const glowPulse = 0.6 + Math.sin(frame * 0.12) * 0.4;

  // Emoji bounce at the end
  const emojiSpring = spring({
    frame: frame - 55,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const emojiScale = interpolate(emojiSpring, [0, 1], [0, 1]);
  const emojiRotate = interpolate(emojiSpring, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.secondary, COLORS.pink]} intensity={1.2} />
      <FloatingParticles frame={frame} count={25} color={COLORS.secondary} glowColor={COLORS.secondaryGlow} speed={0.8} />

      {/* Enhanced glowing orbs */}
      <GlowingOrb frame={frame} x="25%" y="30%" color={COLORS.secondary} glowColor={COLORS.secondaryGlow} size={550} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="75%" y="65%" color={COLORS.accent} glowColor={COLORS.accentGlow} size={450} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="50%" y="85%" color={COLORS.pink} glowColor={COLORS.pinkGlow} size={350} pulseSpeed={0.035} />

      {/* Main headline with slam effect */}
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 82,
          fontWeight: 800,
          color: COLORS.text,
          textAlign: 'center',
          margin: 0,
          transform: `scale(${mainTextScale})`,
          opacity: mainTextOpacity,
          filter: `blur(${mainTextBlur}px)`,
          textShadow: `
            0 0 ${60 * glowPulse}px ${COLORS.secondaryGlow},
            0 0 ${100 * glowPulse}px ${COLORS.secondaryGlow},
            0 6px 30px rgba(0,0,0,0.6)
          `,
          position: 'relative',
          zIndex: 10,
          letterSpacing: '-0.02em',
        }}
      >
        You already know{' '}
        <span
          style={{
            display: 'inline-block',
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.pink}, ${COLORS.purple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: `scale(${variablesScale}) rotate(${variablesRotate}deg)`,
            filter: `drop-shadow(0 0 30px ${COLORS.accentGlow}) drop-shadow(0 0 50px ${COLORS.pinkGlow})`,
          }}
        >
          variables
        </span>
        .
      </h1>

      {/* Sub text with gradient */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 46,
          fontWeight: 500,
          color: COLORS.textMuted,
          textAlign: 'center',
          marginTop: 40,
          opacity: subTextOpacity,
          transform: `translateY(${subTextY}px)`,
          textShadow: `0 0 30px ${COLORS.textDim}, 0 4px 15px rgba(0,0,0,0.4)`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        You just call them something else.
      </p>

      {/* Decorative emoji with bounce */}
      <div
        style={{
          marginTop: 45,
          fontSize: 75,
          transform: `scale(${emojiScale}) rotate(${emojiRotate}deg)`,
          filter: `drop-shadow(0 0 20px ${COLORS.yellowGlow})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        🤔
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: The Tupperware - Enhanced with 3D effects
// ============================================
const Scene2Tupperware: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Enhanced container entrance with elastic bounce
  const containerSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.elastic,
  });

  const containerScale = interpolate(containerSpring, [0, 1], [0.3, 1]);
  const containerRotate = interpolate(containerSpring, [0, 0.5, 1], [-15, 5, 0]);
  const containerOpacity = interpolate(containerSpring, [0, 0.3, 1], [0, 0.8, 1]);

  // Label typewriter with glow
  const labelText = 'leftover_adobo';
  const labelChars = Math.min(
    labelText.length,
    Math.floor(interpolate(frame, [25, 55], [0, labelText.length], { extrapolateRight: 'clamp' }))
  );

  // Food icon drop-in with bounce
  const foodSpring = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const foodOpacity = interpolate(foodSpring, [0, 0.5, 1], [0, 0.8, 1]);
  const foodScale = interpolate(foodSpring, [0, 1], [0.3, 1]);
  const foodY = interpolate(foodSpring, [0, 1], [-50, 0]);
  const foodRotate = interpolate(foodSpring, [0, 0.5, 1], [-20, 10, 0]);

  // Code typing with enhanced timing
  const codeText = 'let leftover_adobo = "adobo"';
  const codeStart = 65;
  const codeChars = Math.min(
    codeText.length,
    Math.floor(interpolate(frame, [codeStart, codeStart + 40], [0, codeText.length], { extrapolateRight: 'clamp' }))
  );

  // Code block entrance
  const codeSpring = spring({
    frame: frame - 60,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const codeY = interpolate(codeSpring, [0, 1], [30, 0]);
  const codeOpacity = interpolate(codeSpring, [0, 1], [0, 1]);

  // Hint text with spring
  const hintSpring = spring({
    frame: frame - 100,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const hintOpacity = interpolate(hintSpring, [0, 1], [0, 1]);
  const hintY = interpolate(hintSpring, [0, 1], [25, 0]);

  // Connection line animation
  const lineProgress = interpolate(frame, [55, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.accent, COLORS.yellow]} intensity={1.1} />
      <FloatingParticles frame={frame} count={20} color={COLORS.accent} glowColor={COLORS.accentGlow} speed={0.7} />

      {/* Enhanced orbs */}
      <GlowingOrb frame={frame} x="50%" y="35%" color={COLORS.accent} glowColor={COLORS.accentGlow} size={500} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="25%" y="70%" color={COLORS.yellow} glowColor={COLORS.yellowGlow} size={350} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="80%" y="25%" color={COLORS.pink} glowColor={COLORS.pinkGlow} size={300} pulseSpeed={0.035} />

      {/* Container with enhanced animation */}
      <div
        style={{
          transform: `scale(${containerScale}) rotate(${containerRotate}deg)`,
          opacity: containerOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Label tag with glow */}
        <LabelTag text={labelText} chars={labelChars} color={COLORS.accent} glowColor={COLORS.accentGlow} frame={frame} />

        {/* Tupperware container with food drop-in */}
        <PremiumTupperware color={COLORS.accent} glowColor={COLORS.accentGlow} frame={frame}>
          <span
            style={{
              fontSize: 85,
              opacity: foodOpacity,
              transform: `scale(${foodScale}) translateY(${foodY}px) rotate(${foodRotate}deg)`,
              filter: `drop-shadow(0 8px 15px rgba(0,0,0,0.4)) drop-shadow(0 0 20px ${COLORS.accentGlow})`,
            }}
          >
            🍖
          </span>
        </PremiumTupperware>
      </div>

      {/* Connection indicator */}
      <div
        style={{
          width: 3,
          height: 40 * lineProgress,
          background: `linear-gradient(180deg, ${COLORS.accent}, transparent)`,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 2,
          boxShadow: `0 0 15px ${COLORS.accentGlow}`,
          opacity: lineProgress,
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* Code block with enhanced entrance */}
      <div
        style={{
          transform: `translateY(${codeY}px)`,
          opacity: codeOpacity,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <PremiumCodeBlock glowColor={COLORS.accentGlow}>
          <code
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 38,
              color: '#e5e5e5',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: COLORS.purple, textShadow: `0 0 15px ${COLORS.purpleGlow}`, fontWeight: 600 }}>let</span>{' '}
            <span style={{ color: COLORS.blue, textShadow: `0 0 12px ${COLORS.blueGlow}` }}>
              {codeText.slice(4, 18).slice(0, Math.max(0, codeChars - 4))}
            </span>
            {codeChars > 18 && <span style={{ color: COLORS.textMuted }}> = </span>}
            {codeChars > 21 && (
              <span style={{ color: COLORS.green, textShadow: `0 0 15px ${COLORS.greenGlow}` }}>
                "{codeText.slice(23, -1).slice(0, codeChars - 23)}"
              </span>
            )}
            {frame >= codeStart && frame < codeStart + 40 && (
              <span style={{ color: COLORS.accent, opacity: Math.floor(frame / 8) % 2, textShadow: `0 0 10px ${COLORS.accent}` }}>|</span>
            )}
          </code>
        </PremiumCodeBlock>
      </div>

      {/* Hint text with enhanced styling */}
      <GlassCard
        style={{
          position: 'absolute',
          bottom: 80,
          padding: '24px 48px',
          opacity: hintOpacity,
          transform: `translateY(${hintY}px)`,
        }}
        glowColor={COLORS.accentGlow}
        intensity={0.8}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 36,
            color: COLORS.text,
            textAlign: 'center',
            margin: 0,
            fontWeight: 500,
          }}
        >
          You store something. You label it. That's a{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.yellow})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            variable
          </span>
          .
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Change the Value - Enhanced swap animation
// ============================================
const Scene3ChangeValue: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Enhanced swap with spring physics
  const swapSpring = spring({
    frame: frame - 25,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const swapProgress = interpolate(swapSpring, [0, 1], [0, 1]);

  // Old food exits with spin
  const oldFoodOpacity = interpolate(swapProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });
  const oldFoodScale = interpolate(swapProgress, [0, 0.5], [1, 0.3], { extrapolateRight: 'clamp' });
  const oldFoodRotate = interpolate(swapProgress, [0, 0.5], [0, 180], { extrapolateRight: 'clamp' });
  const oldFoodY = interpolate(swapProgress, [0, 0.5], [0, -80], { extrapolateRight: 'clamp' });

  // New food enters with bounce
  const newFoodOpacity = interpolate(swapProgress, [0.4, 0.8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const newFoodScale = interpolate(swapProgress, [0.4, 1], [0.2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const newFoodY = interpolate(swapProgress, [0.4, 1], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const newFoodRotate = interpolate(swapProgress, [0.4, 1], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Enhanced glitch effect for label
  const glitchPhase = frame >= 35 && frame <= 65;
  const glitchIntensity = glitchPhase ? Math.sin(frame * 12) * 8 : 0;
  const glitchSkew = glitchPhase ? Math.sin(frame * 15) * 3 : 0;
  const showRGBSplit = glitchPhase && frame % 3 < 2;

  const showNewLabel = frame > 60;
  const labelText = showNewLabel ? 'leftover_spaghetti' : 'leftover_adobo';
  const currentColor = showNewLabel ? COLORS.yellow : COLORS.accent;
  const currentGlow = showNewLabel ? COLORS.yellowGlow : COLORS.accentGlow;

  // Color transition for background
  const colorTransition = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Code typing
  const codeText = 'leftover_spaghetti = "spaghetti"';
  const codeStart = 75;
  const codeChars = Math.min(
    codeText.length,
    Math.floor(interpolate(frame, [codeStart, codeStart + 40], [0, codeText.length], { extrapolateRight: 'clamp' }))
  );

  // Code block entrance
  const codeSpring = spring({
    frame: frame - 70,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // Enhanced sparkle positions
  const sparkles = [
    { x: -80, y: -50, size: 45, delay: 0 },
    { x: 90, y: -35, size: 40, delay: 4 },
    { x: -50, y: 70, size: 35, delay: 8 },
    { x: 85, y: 55, size: 30, delay: 12 },
    { x: 0, y: -80, size: 35, delay: 6 },
    { x: -100, y: 20, size: 28, delay: 10 },
  ];

  // Message entrance
  const messageSpring = spring({
    frame: frame - 120,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg
        frame={frame}
        colors={colorTransition > 0.5 ? [COLORS.gradient1, COLORS.yellow, COLORS.accent] : [COLORS.gradient1, COLORS.accent, COLORS.pink]}
        intensity={1.1}
      />
      <FloatingParticles frame={frame} count={25} color={currentColor} glowColor={currentGlow} speed={0.9} />

      {/* Dynamic orbs based on state */}
      <GlowingOrb frame={frame} x="50%" y="35%" color={currentColor} glowColor={currentGlow} size={520} pulseSpeed={0.035} />
      <GlowingOrb frame={frame} x="20%" y="60%" color={COLORS.pink} glowColor={COLORS.pinkGlow} size={350} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="80%" y="70%" color={COLORS.cyan} glowColor={COLORS.cyanGlow} size={300} pulseSpeed={0.03} />

      {/* Container with enhanced swap */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Enhanced sparkle effects */}
        {sparkles.map((sparkle, i) => (
          <SparkleEffect
            key={i}
            frame={frame}
            x={sparkle.x + 140}
            y={sparkle.y + 120}
            delay={50 + sparkle.delay}
            color={COLORS.yellow}
            size={sparkle.size}
          />
        ))}

        {/* Label tag with enhanced glitch */}
        <div
          style={{
            background: `linear-gradient(135deg, ${showRGBSplit ? COLORS.cyan : currentColor}, ${currentColor}cc)`,
            padding: '14px 32px',
            borderRadius: '14px 14px 0 0',
            marginBottom: -4,
            zIndex: 1,
            transform: `translateX(${glitchIntensity}px) skewX(${glitchSkew}deg)`,
            boxShadow: `
              0 -6px 25px ${currentGlow},
              ${showRGBSplit ? `3px 0 0 ${COLORS.pink}, -3px 0 0 ${COLORS.cyan}` : 'none'}
            `,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glitch scanline */}
          {glitchPhase && (
            <div
              style={{
                position: 'absolute',
                top: `${(frame * 5) % 100}%`,
                left: 0,
                right: 0,
                height: 2,
                background: 'rgba(255,255,255,0.5)',
                pointerEvents: 'none',
              }}
            />
          )}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24,
              color: COLORS.text,
              fontWeight: 600,
              textShadow: glitchPhase
                ? `3px 0 ${COLORS.cyan}, -3px 0 ${COLORS.pink}, 0 0 20px ${currentGlow}`
                : `0 2px 6px rgba(0,0,0,0.4), 0 0 15px ${currentGlow}`,
              letterSpacing: '-0.02em',
            }}
          >
            {labelText}
          </span>
        </div>

        {/* Container with swap animation */}
        <PremiumTupperware color={currentColor} glowColor={currentGlow} frame={frame}>
          <div style={{ position: 'relative', width: 85, height: 85 }}>
            {/* Old food exiting */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: 85,
                opacity: oldFoodOpacity,
                transform: `translate(-50%, -50%) scale(${oldFoodScale}) rotate(${oldFoodRotate}deg) translateY(${oldFoodY}px)`,
                filter: `drop-shadow(0 8px 15px rgba(0,0,0,0.4)) drop-shadow(0 0 20px ${COLORS.accentGlow})`,
              }}
            >
              🍖
            </span>
            {/* New food entering */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: 85,
                opacity: newFoodOpacity,
                transform: `translate(-50%, -50%) scale(${newFoodScale}) rotate(${newFoodRotate}deg) translateY(${newFoodY}px)`,
                filter: `drop-shadow(0 8px 15px rgba(0,0,0,0.4)) drop-shadow(0 0 25px ${COLORS.yellowGlow})`,
              }}
            >
              🍝
            </span>
          </div>
        </PremiumTupperware>
      </div>

      {/* Code block with entrance */}
      <div
        style={{
          marginTop: 45,
          transform: `translateY(${interpolate(codeSpring, [0, 1], [25, 0])}px)`,
          opacity: interpolate(codeSpring, [0, 1], [0, 1]),
          position: 'relative',
          zIndex: 10,
        }}
      >
        <PremiumCodeBlock glowColor={COLORS.yellowGlow}>
          <code
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 36,
              color: '#e5e5e5',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: COLORS.blue, textShadow: `0 0 12px ${COLORS.blueGlow}` }}>
              {codeText.slice(0, 18).slice(0, codeChars)}
            </span>
            {codeChars > 18 && <span style={{ color: COLORS.textMuted }}> = </span>}
            {codeChars > 21 && (
              <span style={{ color: COLORS.green, textShadow: `0 0 15px ${COLORS.greenGlow}` }}>
                "{codeText.slice(22, -1).slice(0, codeChars - 22)}"
              </span>
            )}
            {frame >= codeStart && frame < codeStart + 40 && (
              <span style={{ color: COLORS.yellow, opacity: Math.floor(frame / 8) % 2, textShadow: `0 0 10px ${COLORS.yellow}` }}>|</span>
            )}
          </code>
        </PremiumCodeBlock>
      </div>

      {/* Success message with bounce */}
      <GlassCard
        style={{
          marginTop: 40,
          padding: '26px 50px',
          opacity: interpolate(messageSpring, [0, 1], [0, 1]),
          transform: `scale(${Math.min(messageSpring, 1)})`,
          position: 'relative',
          zIndex: 10,
        }}
        glowColor={COLORS.greenGlow}
        intensity={1.2}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 40,
            color: COLORS.text,
            fontWeight: 600,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: 36,
              filter: `drop-shadow(0 0 15px ${COLORS.greenGlow})`,
            }}
          >
            ✓
          </span>
          <span>
            Value changed.{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.cyan})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Same container.
            </span>
          </span>
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: More Examples - Enhanced staggered layout
// ============================================
const Scene4Examples: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const examples = [
    { icon: '💰', label: 'wallet', code: 'let wallet = 500', color: COLORS.green, glowColor: COLORS.greenGlow, valueType: 'number' },
    { icon: '😊', label: 'mood', code: 'let mood = "happy"', color: COLORS.yellow, glowColor: COLORS.yellowGlow, valueType: 'string' },
    { icon: '🎵', label: 'current_song', code: 'let current_song = "APT"', color: COLORS.purple, glowColor: COLORS.purpleGlow, valueType: 'string' },
  ];

  // Title entrance
  const titleSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // Bottom text with spring
  const bottomSpring = spring({
    frame: frame - 145,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.green, COLORS.purple]} intensity={1.1} />
      <FloatingParticles frame={frame} count={30} color={COLORS.cyan} glowColor={COLORS.cyanGlow} speed={0.7} />

      {/* Enhanced orbs */}
      <GlowingOrb frame={frame} x="15%" y="25%" color={COLORS.green} glowColor={COLORS.greenGlow} size={400} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="85%" y="45%" color={COLORS.yellow} glowColor={COLORS.yellowGlow} size={350} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="50%" y="85%" color={COLORS.purple} glowColor={COLORS.purpleGlow} size={400} pulseSpeed={0.035} />

      {/* Section title */}
      <div
        style={{
          marginBottom: 45,
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <GlassCard style={{ padding: '16px 36px' }} glowColor={COLORS.cyanGlow} intensity={0.8}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 24,
              color: COLORS.cyan,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {'</'} More Examples {'>'}
          </span>
        </GlassCard>
      </div>

      {/* Three containers with staggered animation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {examples.map((example, index) => (
          <PremiumExampleContainer
            key={index}
            icon={example.icon}
            label={example.label}
            code={example.code}
            color={example.color}
            glowColor={example.glowColor}
            valueType={example.valueType}
            delay={15 + index * 35}
            frame={frame}
            fps={fps}
            index={index}
          />
        ))}
      </div>

      {/* Bottom insight text */}
      <GlassCard
        style={{
          position: 'absolute',
          bottom: 70,
          padding: '24px 45px',
          opacity: interpolate(bottomSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(bottomSpring, [0, 1], [20, 0])}px)`,
        }}
        glowColor={COLORS.cyanGlow}
        intensity={0.9}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 36,
            color: COLORS.text,
            textAlign: 'center',
            margin: 0,
            fontWeight: 500,
          }}
        >
          Variables store{' '}
          <span style={{ color: COLORS.green, fontWeight: 700, textShadow: `0 0 15px ${COLORS.greenGlow}` }}>numbers</span>,{' '}
          <span style={{ color: COLORS.yellow, fontWeight: 700, textShadow: `0 0 15px ${COLORS.yellowGlow}` }}>text</span>,{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            anything
          </span>
          .
        </p>
      </GlassCard>
    </AbsoluteFill>
  );
};

// Enhanced premium example container component
const PremiumExampleContainer: React.FC<{
  icon: string;
  label: string;
  code: string;
  color: string;
  glowColor: string;
  valueType: string;
  delay: number;
  frame: number;
  fps: number;
  index: number;
}> = ({ icon, label, code, color, glowColor, valueType, delay, frame, fps, index }) => {
  // Enhanced spring with alternating directions
  const slideSpring = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const opacity = interpolate(slideSpring, [0, 0.3, 1], [0, 0.7, 1]);
  const translateX = interpolate(slideSpring, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);
  const translateY = interpolate(slideSpring, [0, 1], [30, 0]);
  const scale = interpolate(slideSpring, [0, 1], [0.85, 1]);
  const rotate = interpolate(slideSpring, [0, 1], [index % 2 === 0 ? -5 : 5, 0]);

  // Icon bounce
  const iconBounce = spring({
    frame: frame - delay - 10,
    fps,
    config: SPRING_CONFIGS.elastic,
  });
  const iconScale = interpolate(iconBounce, [0, 1], [0.3, 1]);

  // Floating animation
  const floatY = Math.sin((frame + index * 20) * 0.05) * 3;

  if (frame < delay) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY + floatY}px) scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      {/* Enhanced label tag */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          padding: '14px 28px',
          borderRadius: 14,
          boxShadow: `
            0 6px 25px ${glowColor},
            0 0 40px ${glowColor},
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shine effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            color: COLORS.text,
            fontWeight: 600,
            textShadow: `0 2px 6px rgba(0,0,0,0.4), 0 0 15px ${glowColor}`,
            letterSpacing: '-0.02em',
          }}
        >
          {label}
        </span>
      </div>

      {/* Mini container with enhanced effects */}
      <div
        style={{
          width: 100,
          height: 100,
          background: `linear-gradient(145deg, ${COLORS.surface} 0%, ${COLORS.backgroundLight} 100%)`,
          borderRadius: 22,
          border: `3px solid ${color}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `
            0 12px 40px rgba(0,0,0,0.4),
            0 0 40px ${glowColor},
            inset 0 -4px 0 rgba(0,0,0,0.2),
            inset 0 2px 0 rgba(255,255,255,0.1)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Inner gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 2,
            borderRadius: 19,
            background: `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
        <span
          style={{
            fontSize: 55,
            transform: `scale(${iconScale})`,
            filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 15px ${glowColor})`,
          }}
        >
          {icon}
        </span>
      </div>

      {/* Enhanced code block */}
      <PremiumCodeBlock style={{ padding: '14px 26px' }} glowColor={glowColor}>
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 26,
            color: '#e5e5e5',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: COLORS.purple, textShadow: `0 0 10px ${COLORS.purpleGlow}`, fontWeight: 600 }}>let</span>{' '}
          <span style={{ color: COLORS.blue, textShadow: `0 0 10px ${COLORS.blueGlow}` }}>{label}</span>
          <span style={{ color: COLORS.textMuted }}> = </span>
          <span
            style={{
              color: valueType === 'string' ? COLORS.green : COLORS.accent,
              textShadow: `0 0 12px ${valueType === 'string' ? COLORS.greenGlow : COLORS.accentGlow}`,
            }}
          >
            {code.split('= ')[1]}
          </span>
        </code>
      </PremiumCodeBlock>
    </div>
  );
};

// ============================================
// SCENE 5: The Aha Moment - Enhanced celebration
// ============================================
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Main text slam animation
  const mainSpring = spring({
    frame: frame - 15,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const mainScale = interpolate(mainSpring, [0, 1], [1.4, 1]);
  const mainOpacity = interpolate(mainSpring, [0, 0.3, 1], [0, 0.8, 1]);
  const mainBlur = interpolate(mainSpring, [0, 1], [8, 0]);

  // Glowing pulse effect
  const glowPulse = 0.7 + Math.sin(frame * 0.1) * 0.3;

  // Sub text with spring
  const subSpring = spring({
    frame: frame - 55,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [25, 0]);

  // Mini containers with enhanced animation
  const containerIcons = [
    { icon: '💰', color: COLORS.green, glowColor: COLORS.greenGlow },
    { icon: '😊', color: COLORS.yellow, glowColor: COLORS.yellowGlow },
    { icon: '🎵', color: COLORS.purple, glowColor: COLORS.purpleGlow },
  ];

  // Confetti/celebration particles
  const celebrationSparkles = Array.from({ length: 12 }, (_, i) => ({
    x: 50 + Math.cos((i / 12) * Math.PI * 2) * 200,
    y: 50 + Math.sin((i / 12) * Math.PI * 2) * 150,
    delay: 20 + i * 3,
    color: [COLORS.cyan, COLORS.pink, COLORS.yellow, COLORS.green][i % 4],
  }));

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.gradient1, COLORS.cyan, COLORS.purple]} intensity={1.3} />
      <FloatingParticles frame={frame} count={35} color={COLORS.cyan} glowColor={COLORS.cyanGlow} speed={1.1} />

      {/* Multiple celebration orbs */}
      <GlowingOrb frame={frame} x="50%" y="50%" color={COLORS.cyan} glowColor={COLORS.cyanGlow} size={700} pulseSpeed={0.04} />
      <GlowingOrb frame={frame} x="25%" y="35%" color={COLORS.pink} glowColor={COLORS.pinkGlow} size={400} pulseSpeed={0.03} />
      <GlowingOrb frame={frame} x="75%" y="65%" color={COLORS.purple} glowColor={COLORS.purpleGlow} size={450} pulseSpeed={0.035} />

      {/* Celebration sparkles */}
      {celebrationSparkles.map((sparkle, i) => (
        <SparkleEffect
          key={i}
          frame={frame}
          x={sparkle.x + Math.sin((frame + i * 10) * 0.03) * 30}
          y={sparkle.y + Math.cos((frame + i * 10) * 0.025) * 20}
          delay={sparkle.delay}
          color={sparkle.color}
          size={25 + (i % 3) * 10}
        />
      ))}

      {/* Mini containers floating at top with enhanced animation */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          display: 'flex',
          gap: 50,
          zIndex: 10,
        }}
      >
        {containerIcons.map((item, i) => {
          const containerSpring = spring({
            frame: frame - i * 8,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });
          const scale = interpolate(containerSpring, [0, 1], [0, 0.6]);
          const floatY = Math.sin((frame + i * 25) * 0.06) * 12;
          const floatRotate = Math.sin((frame + i * 30) * 0.04) * 8;

          return (
            <div
              key={i}
              style={{
                width: 95,
                height: 95,
                background: `linear-gradient(145deg, ${COLORS.surface} 0%, ${COLORS.backgroundLight} 100%)`,
                borderRadius: 22,
                border: `3px solid ${item.color}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: `
                  0 12px 40px rgba(0,0,0,0.4),
                  0 0 40px ${item.glowColor},
                  inset 0 -3px 0 rgba(0,0,0,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
                transform: `scale(${scale}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px ${item.glowColor})`,
                }}
              >
                {item.icon}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main revelation text with slam effect */}
      <h1
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 85,
          fontWeight: 800,
          color: COLORS.text,
          textAlign: 'center',
          margin: 0,
          opacity: mainOpacity,
          transform: `scale(${mainScale})`,
          filter: `blur(${mainBlur}px)`,
          textShadow: `
            0 0 ${60 * glowPulse}px ${COLORS.cyanGlow},
            0 0 ${100 * glowPulse}px ${COLORS.cyanGlow},
            0 6px 30px rgba(0,0,0,0.6)
          `,
          position: 'relative',
          zIndex: 10,
          letterSpacing: '-0.02em',
        }}
      >
        Boxes with{' '}
        <span
          style={{
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 30px ${COLORS.cyanGlow}) drop-shadow(0 0 50px ${COLORS.purpleGlow})`,
          }}
        >
          labels
        </span>
        .
      </h1>

      {/* Sub text with spring animation */}
      <GlassCard
        style={{
          marginTop: 45,
          padding: '26px 55px',
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
        glowColor={COLORS.cyanGlow}
        intensity={1.1}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 44,
            color: COLORS.text,
            textAlign: 'center',
            margin: 0,
            fontWeight: 600,
          }}
        >
          That's{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            all
          </span>{' '}
          a variable is.
        </p>
      </GlassCard>

      {/* Lightbulb emoji celebration */}
      <div
        style={{
          marginTop: 40,
          fontSize: 85,
          transform: `scale(${interpolate(spring({ frame: frame - 70, fps, config: SPRING_CONFIGS.elastic }), [0, 1], [0, 1])})`,
          filter: `drop-shadow(0 0 30px ${COLORS.yellowGlow}) drop-shadow(0 0 50px ${COLORS.yellowGlow})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        💡
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: CTA - Enhanced premium terminal
// ============================================
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Terminal lines with better content
  const line1 = '> Next lesson: What goes inside the box?';
  const line2 = '> Start learning now';

  const line1Chars = Math.min(
    line1.length,
    Math.floor(interpolate(frame, [12, 50], [0, line1.length], { extrapolateRight: 'clamp' }))
  );

  const line2Chars = Math.min(
    line2.length,
    Math.floor(interpolate(frame, [58, 85], [0, line2.length], { extrapolateRight: 'clamp' }))
  );

  // Terminal entrance with spring
  const terminalSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const terminalScale = interpolate(terminalSpring, [0, 1], [0.85, 1]);
  const terminalOpacity = interpolate(terminalSpring, [0, 1], [0, 1]);
  const terminalY = interpolate(terminalSpring, [0, 1], [30, 0]);

  // Logo entrance with bounce
  const logoSpring = spring({
    frame: frame - 80,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);

  // Cursor blink
  const cursorVisible = Math.floor(frame / 12) % 2 === 0;

  // Enhanced scanline effect
  const scanlineY = (frame * 2.5) % 120;

  // Pulsing glow
  const glowPulse = 0.6 + Math.sin(frame * 0.1) * 0.4;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.background, COLORS.green, COLORS.purple]} intensity={1.1} />
      <FloatingParticles frame={frame} count={35} color={COLORS.green} glowColor={COLORS.greenGlow} speed={0.7} />

      {/* Enhanced orbs */}
      <GlowingOrb frame={frame} x="50%" y="40%" color={COLORS.green} glowColor={COLORS.greenGlow} size={700} pulseSpeed={0.035} />
      <GlowingOrb frame={frame} x="20%" y="60%" color={COLORS.purple} glowColor={COLORS.purpleGlow} size={500} pulseSpeed={0.025} />
      <GlowingOrb frame={frame} x="80%" y="30%" color={COLORS.cyan} glowColor={COLORS.cyanGlow} size={450} pulseSpeed={0.03} />

      {/* Premium Terminal window */}
      <GlassCard
        style={{
          padding: 0,
          width: '90%',
          maxWidth: 950,
          overflow: 'hidden',
          transform: `scale(${terminalScale}) translateY(${terminalY}px)`,
          opacity: terminalOpacity,
          position: 'relative',
          zIndex: 10,
        }}
        glowColor={COLORS.greenGlow}
        intensity={1.3}
      >
        {/* Terminal header with enhanced styling */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 32px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff5f56, #e04040)',
            boxShadow: '0 0 16px #ff5f56, inset 0 1px 0 rgba(255,255,255,0.3)'
          }} />
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffbd2e, #e5a800)',
            boxShadow: '0 0 16px #ffbd2e, inset 0 1px 0 rgba(255,255,255,0.3)'
          }} />
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #27ca40, #1fa035)',
            boxShadow: '0 0 16px #27ca40, inset 0 1px 0 rgba(255,255,255,0.3)'
          }} />
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              color: COLORS.textDim,
              letterSpacing: '0.05em',
            }}
          >
            dogm-terminal v1.0
          </span>
        </div>

        {/* Terminal body with enhanced effects */}
        <div style={{ padding: 55, position: 'relative', minHeight: 200 }}>
          {/* Scanline effect */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${scanlineY}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.greenGlow}, transparent)`,
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />

          {/* Static scanlines overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.05) 2px,
                rgba(0, 0, 0, 0.05) 4px
              )`,
              pointerEvents: 'none',
              opacity: 0.4,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Line 1: Question */}
            <code
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 34,
                color: COLORS.green,
                textShadow: `0 0 ${20 * glowPulse}px ${COLORS.greenGlow}, 0 0 ${40 * glowPulse}px ${COLORS.greenGlow}`,
                letterSpacing: '-0.02em',
              }}
            >
              {line1.slice(0, line1Chars)}
              {frame >= 12 && frame < 50 && (
                <span style={{ color: COLORS.green, opacity: cursorVisible ? 1 : 0, textShadow: `0 0 10px ${COLORS.green}` }}>▊</span>
              )}
            </code>

            {/* Line 2: CTA */}
            {line1Chars >= line1.length && (
              <code
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 46,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: COLORS.textMuted }}>&gt; </span>
                <span style={{ color: COLORS.text }}>Start learning </span>
                <span
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.pink}, ${COLORS.purple})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 25px ${COLORS.accentGlow}) drop-shadow(0 0 40px ${COLORS.pinkGlow})`,
                  }}
                >
                  {line2.slice(17, 17 + Math.max(0, line2Chars - 17))}
                </span>
                {frame >= 58 && (
                  <span style={{
                    color: COLORS.accent,
                    opacity: cursorVisible ? 1 : 0,
                    textShadow: `0 0 15px ${COLORS.accent}`,
                  }}>▊</span>
                )}
              </code>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Enhanced Logo */}
      <div
        style={{
          marginTop: 55,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 75,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.pink}, ${COLORS.purple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            filter: `drop-shadow(0 0 30px ${COLORS.accentGlow}) drop-shadow(0 0 50px ${COLORS.pinkGlow})`,
          }}
        >
          DOGM.AI
        </span>
      </div>

    </AbsoluteFill>
  );
};
