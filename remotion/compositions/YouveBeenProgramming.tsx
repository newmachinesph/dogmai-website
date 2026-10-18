import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Easing,
} from 'remotion';

// Enhanced font face declarations
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

export interface YouveBeenProgrammingProps {
  showCodeRain?: boolean;
}

// Premium color palette
const COLORS = {
  background: '#0a0a0f',
  backgroundAlt: '#12121a',
  surface: '#1a1a24',
  surfaceHover: '#252532',
  foreground: '#ffffff',
  foregroundMuted: '#e4e4e7',
  accent: '#f97316',
  accentGlow: 'rgba(249, 115, 22, 0.4)',
  accentSoft: '#fb923c',
  secondary: '#8b5cf6',
  secondaryGlow: 'rgba(139, 92, 246, 0.3)',
  muted: '#71717a',
  mutedLight: '#a1a1aa',
  code: '#22c55e',
  codeGlow: 'rgba(34, 197, 94, 0.4)',
  codeAlt: '#4ade80',
  cursor: '#f97316',
  blue: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
  cyan: '#06b6d4',
  gradient1: '#1e1b4b',
  gradient2: '#0c0a09',
  gold: '#ffd700',
  goldGlow: 'rgba(255, 215, 0, 0.6)',
};

// Enhanced spring configurations for premium animations
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

export const YouveBeenProgramming: React.FC<YouveBeenProgrammingProps> = ({
  showCodeRain = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Alarm Snooze (0-90 frames / 0-3 sec) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1Alarm fps={fps} />
      </Sequence>

      {/* Scene 2: Daily Routines (90-330 frames / 3-11 sec) */}
      <Sequence from={90} durationInFrames={240}>
        <Scene2Routines fps={fps} />
      </Sequence>

      {/* Scene 3: Revelation (330-450 frames / 11-15 sec) */}
      <Sequence from={330} durationInFrames={120}>
        <Scene3Revelation fps={fps} />
      </Sequence>

      {/* Scene 4: CTA with Logo (450-600 frames / 15-20 sec) */}
      <Sequence from={450} durationInFrames={150}>
        <Scene4CTA fps={fps} showCodeRain={showCodeRain} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM HELPER COMPONENTS ============

// Sparkle effect component
const SparkleEffect: React.FC<{
  frame: number;
  count?: number;
  color?: string;
  area?: { x: number; y: number; width: number; height: number };
}> = ({ frame, count = 12, color = COLORS.gold, area = { x: 20, y: 20, width: 60, height: 60 } }) => {
  const sparkles = Array.from({ length: count }, (_, i) => {
    const baseX = area.x + ((i * 37) % area.width);
    const baseY = area.y + ((i * 53) % area.height);
    const twinkleSpeed = 0.15 + (i % 3) * 0.05;
    const twinkleOffset = i * 20;
    const opacity = Math.max(0, Math.sin((frame + twinkleOffset) * twinkleSpeed)) * 0.9;
    const scale = 0.5 + Math.sin((frame + twinkleOffset) * twinkleSpeed * 0.7) * 0.5;
    const rotation = (frame + twinkleOffset) * 2;

    return { x: baseX, y: baseY, opacity, scale, rotation };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {sparkles.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            transform: `scale(${s.scale}) rotate(${s.rotation}deg)`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
              fill={color}
              filter={`drop-shadow(0 0 4px ${color})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Confetti effect component
const ConfettiEffect: React.FC<{
  frame: number;
  startFrame?: number;
  count?: number;
}> = ({ frame, startFrame = 0, count = 40 }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const confettiColors = [COLORS.accent, COLORS.pink, COLORS.gold, COLORS.code, COLORS.cyan, COLORS.purple];

  const confetti = Array.from({ length: count }, (_, i) => {
    const startX = 50 + (Math.sin(i * 2.4) * 30);
    const startY = 40;
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.3;
    const speed = 2 + (i % 5) * 0.8;
    const gravity = 0.15;

    const x = startX + Math.cos(angle) * speed * localFrame * 0.5;
    const y = startY + Math.sin(angle) * speed * localFrame * 0.3 + gravity * localFrame * localFrame * 0.01;
    const rotation = localFrame * (5 + i % 10);
    const opacity = interpolate(localFrame, [0, 20, 80, 120], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
    const color = confettiColors[i % confettiColors.length];
    const size = 8 + (i % 4) * 4;
    const isCircle = i % 3 === 0;

    return { x, y, rotation, opacity, color, size, isCircle };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 90 }}>
      {confetti.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.isCircle ? c.size : c.size * 0.6,
            backgroundColor: c.color,
            borderRadius: c.isCircle ? '50%' : 2,
            opacity: c.opacity,
            transform: `rotate(${c.rotation}deg)`,
            boxShadow: `0 0 6px ${c.color}`,
          }}
        />
      ))}
    </div>
  );
};

// Pulse ring effect
const PulseRing: React.FC<{
  frame: number;
  startFrame: number;
  color?: string;
  maxSize?: number;
  duration?: number;
}> = ({ frame, startFrame, color = COLORS.accent, maxSize = 400, duration = 40 }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const progress = localFrame / duration;
  const size = interpolate(progress, [0, 1], [0, maxSize]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 0.6, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        opacity,
        boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Shockwave ring effect
const ShockwaveRing: React.FC<{
  frame: number;
  startFrame: number;
  color?: string;
  maxSize?: number;
  duration?: number;
}> = ({ frame, startFrame, color = COLORS.gold, maxSize = 600, duration = 30 }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const progress = Easing.out(Easing.cubic)(localFrame / duration);
  const size = maxSize * progress;
  const opacity = interpolate(localFrame, [0, duration * 0.3, duration], [0.8, 0.4, 0]);
  const borderWidth = interpolate(localFrame, [0, duration], [8, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        opacity,
        boxShadow: `0 0 30px ${color}`,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};

// Animated gradient background
const AnimatedGradientBg: React.FC<{ frame: number; colors?: string[] }> = ({
  frame,
  colors = [COLORS.background, COLORS.gradient1]
}) => {
  const rotation = frame * 0.5;
  const scale = 1 + Math.sin(frame * 0.02) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors[0]} 0deg, ${colors[1]} 180deg, ${colors[0]} 360deg)`,
        opacity: 0.3,
        transform: `scale(${scale})`,
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Floating particles
const FloatingParticles: React.FC<{
  frame: number;
  count?: number;
  color?: string;
  glowColor?: string;
}> = ({
  frame,
  count = 30,
  color = COLORS.accent,
  glowColor = COLORS.accentGlow
}) => {
  const particles = Array.from({ length: count }, (_, i) => {
    const x = ((i * 137.5) % 100);
    const baseY = ((i * 97.3) % 100);
    const speed = 0.2 + (i % 5) * 0.1;
    const size = 2 + (i % 4) * 2;
    const delay = i * 20;

    const y = (baseY + (frame + delay) * speed) % 120 - 10;
    const xOffset = Math.sin((frame + delay) * 0.03) * 15;
    const opacity = interpolate(y, [-10, 20, 80, 110], [0, 0.6, 0.6, 0]);
    const pulse = 1 + Math.sin((frame + delay) * 0.1) * 0.3;

    return { x: x + xOffset, y, size: size * pulse, opacity };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${glowColor}`,
          }}
        />
      ))}
    </div>
  );
};

// Glowing orb
const GlowingOrb: React.FC<{
  x: string;
  y: string;
  size: number;
  color: string;
  frame: number;
  delay?: number;
}> = ({ x, y, size, color, frame, delay = 0 }) => {
  const pulse = 1 + Math.sin((frame + delay) * 0.05) * 0.2;
  const opacity = 0.3 + Math.sin((frame + delay) * 0.03) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        transform: 'translate(-50%, -50%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Premium code syntax highlighter
const highlightCode = (code: string) => {
  const keywords = ['while', 'if', 'catch', 'err', 'true', 'false', 'return', 'const', 'let', 'var', 'function'];
  const values = ['true', 'false', 'Infinity', 'null', 'undefined'];
  const parts = code.split(/(\s+|\(|\)|{|}|;|,|\.|=|=>|\[|\])/g);

  return parts.map((part, i) => {
    let color = COLORS.foreground;
    let fontWeight: number | string = 400;
    let textShadow = 'none';

    if (['(', ')', '{', '}', ';', ',', '.', '=>', '[', ']'].includes(part)) {
      color = COLORS.muted;
    } else if (keywords.includes(part)) {
      color = COLORS.purple;
      fontWeight = 500;
    } else if (values.includes(part)) {
      color = COLORS.accent;
      fontWeight = 600;
      textShadow = `0 0 10px ${COLORS.accentGlow}`;
    } else if (part.includes('_') || /\w+(?=\()/.test(part)) {
      color = COLORS.blue;
    } else if (/^\d+$/.test(part)) {
      color = COLORS.accentSoft;
    }

    return (
      <span key={i} style={{ color, fontWeight, textShadow }}>
        {part}
      </span>
    );
  });
};

// ============ SCENE 1: ALARM ============
const Scene1Alarm: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // SLAM entrance animation for alarm icon
  const iconSlam = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const iconScale = interpolate(iconSlam, [0, 1], [2.5, 1]);
  const iconOpacity = interpolate(iconSlam, [0, 0.3, 1], [0, 1, 1]);
  const iconRotation = interpolate(iconSlam, [0, 1], [15, 0]);

  // Dynamic ring animation (more intense)
  const ringIntensity = Math.abs(Math.sin(frame * 0.5)) * 18;
  const ringRotation = Math.sin(frame * 0.6) * ringIntensity;

  // Shake effect when snooze appears (more dramatic)
  const shakeStart = 55;
  const shakeActive = frame > shakeStart && frame < shakeStart + 25;
  const shakeX = shakeActive ? Math.sin(frame * 5) * 8 : 0;
  const shakeY = shakeActive ? Math.cos(frame * 6) * 6 : 0;

  // Enhanced glow pulse
  const glowPulse = 0.4 + Math.sin(frame * 0.2) * 0.3;

  // Text animations with SLAM spring
  const line1Spring = spring({
    frame: frame - 15,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const line2Spring = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  // Typewriter effect for code
  const line1Text = 'if (alarm == true)';
  const line2Text = 'snooze()';
  const line1Chars = Math.floor(interpolate(frame - 20, [0, 25], [0, line1Text.length], { extrapolateRight: 'clamp' }));
  const line2Chars = Math.floor(interpolate(frame - 50, [0, 15], [0, line2Text.length], { extrapolateRight: 'clamp' }));

  // Flash effect on slam
  const flashOpacity = interpolate(frame, [0, 5, 15], [0.8, 0.3, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.background, COLORS.secondary]} />
      <FloatingParticles frame={frame} count={25} color={COLORS.secondary} glowColor={COLORS.secondaryGlow} />

      {/* SLAM flash effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.accent,
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {/* Shockwave on entrance */}
      <ShockwaveRing frame={frame} startFrame={3} color={COLORS.accent} maxSize={500} duration={25} />

      {/* Glow behind alarm (enhanced) */}
      <div
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, ${COLORS.goldGlow} 40%, transparent 70%)`,
          opacity: glowPulse,
          filter: 'blur(40px)',
        }}
      />

      {/* Alarm Icon with SLAM effect */}
      <div
        style={{
          fontSize: 160,
          marginBottom: 50,
          opacity: iconOpacity,
          transform: `scale(${iconScale}) rotate(${ringRotation + iconRotation}deg)`,
          filter: `drop-shadow(0 0 40px ${COLORS.accentGlow}) drop-shadow(0 0 80px ${COLORS.goldGlow})`,
        }}
      >
        ⏰
      </div>

      {/* Sparkles around alarm */}
      {frame > 10 && (
        <SparkleEffect
          frame={frame}
          count={8}
          color={COLORS.gold}
          area={{ x: 35, y: 25, width: 30, height: 30 }}
        />
      )}

      {/* Code block with glass effect */}
      <div
        style={{
          background: 'rgba(26, 26, 36, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          padding: '32px 48px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          transform: `translateY(${interpolate(line1Spring, [0, 1], [30, 0])}px)`,
          opacity: line1Spring,
        }}
      >
        {/* Line 1 */}
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 40,
              color: COLORS.foreground,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: COLORS.purple }}>if</span>
            <span style={{ color: COLORS.muted }}> (</span>
            <span style={{ color: COLORS.foreground }}>{line1Text.slice(4, 4 + Math.max(0, line1Chars - 4)).replace('(', '').replace(')', '')}</span>
            {line1Chars > 4 && <span style={{ color: COLORS.muted }}>)</span>}
            {frame - 20 < 25 && frame >= 20 && (
              <span style={{ color: COLORS.cursor, opacity: Math.floor(frame / 8) % 2 }}>|</span>
            )}
          </span>
        </div>

        {/* Line 2 */}
        {frame >= 45 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: line2Spring,
              transform: `translateX(${interpolate(line2Spring, [0, 1], [-20, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 40,
                color: COLORS.muted,
                marginRight: 16,
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 40,
                color: COLORS.code,
                textShadow: `0 0 20px ${COLORS.codeGlow}`,
              }}
            >
              {line2Text.slice(0, line2Chars)}
              {frame - 50 < 15 && frame >= 50 && (
                <span style={{ color: COLORS.cursor, opacity: Math.floor(frame / 8) % 2 }}>|</span>
              )}
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: ROUTINES ============
const Scene2Routines: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: 'morning_routine.execute()', icon: '☀️', color: COLORS.accentSoft },
    { text: 'while (hungry) { checkFridge(); }', icon: '🍕', color: COLORS.pink },
    { text: 'scroll(instagram, duration=Infinity)', icon: '📱', color: COLORS.blue },
    { text: 'if (boss.isWatching) { pretendToWork(); }', icon: '💼', color: COLORS.purple },
    { text: 'sleep.catch(err => coffee.drink())', icon: '☕', color: COLORS.cyan },
  ];

  // Title animation
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '50px 60px',
        backgroundColor: COLORS.background,
      }}
    >
      <AnimatedGradientBg frame={frame} colors={[COLORS.background, COLORS.gradient1]} />

      {/* Ambient glow orbs */}
      <GlowingOrb x="80%" y="20%" size={400} color={COLORS.purple} frame={frame} />
      <GlowingOrb x="20%" y="80%" size={350} color={COLORS.accent} frame={frame} delay={30} />

      {/* Section title with premium styling */}
      <div
        style={{
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            background: 'rgba(249, 115, 22, 0.1)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: 35,
            padding: '12px 28px',
          }}
        >
          <span style={{ fontSize: 24 }}>{'</>'}</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              color: COLORS.accent,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Your daily algorithms
          </span>
        </div>
      </div>

      {/* Code lines with staggered animation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
        {codeLines.map((line, index) => {
          const delay = 25 + index * 28;
          return (
            <PremiumCodeLine
              key={index}
              text={line.text}
              icon={line.icon}
              accentColor={line.color}
              delay={delay}
              frame={frame}
              fps={fps}
              index={index}
            />
          );
        })}
      </div>

      {/* Bottom prompt - part of the flow */}
      {frame > 200 && (
        <div
          style={{
            marginTop: 30,
            opacity: interpolate(frame, [200, 215], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              background: 'rgba(26, 26, 36, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: 12,
              padding: '16px 24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ color: COLORS.accent, fontSize: 18 }}>❯</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                color: COLORS.mutedLight,
              }}
            >
              You do this every day...
              <span style={{ color: COLORS.cursor, opacity: Math.floor(frame / 15) % 2 }}>_</span>
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Premium code line component
const PremiumCodeLine: React.FC<{
  text: string;
  icon: string;
  accentColor: string;
  delay: number;
  frame: number;
  fps: number;
  index: number;
}> = ({ text, icon, accentColor, delay, frame, fps, index }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return <div style={{ height: 64 }} />;

  const slideSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const translateX = interpolate(slideSpring, [0, 1], [-80, 0]);
  const opacity = interpolate(slideSpring, [0, 1], [0, 1]);

  // Icon bounce
  const iconBounce = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  // Typewriter effect
  const charsToShow = Math.floor(interpolate(localFrame, [5, 30], [0, text.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  }));
  const displayText = text.slice(0, charsToShow);

  // Glow effect on entrance
  const glowIntensity = interpolate(localFrame, [0, 10, 40], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Hover-like effect
  const isActive = localFrame < 50;
  const activeScale = isActive ? 1.02 : 1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        opacity,
        transform: `translateX(${translateX}px) scale(${activeScale})`,
        transition: 'transform 0.2s ease',
      }}
    >
      {/* Line number */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          color: COLORS.muted,
          minWidth: 36,
          textAlign: 'right',
          opacity: 0.5,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon with bounce */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
          border: `1px solid ${accentColor}40`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 32,
          transform: `scale(${Math.min(iconBounce, 1)})`,
          boxShadow: `0 0 20px ${accentColor}30`,
        }}
      >
        {icon}
      </div>

      {/* Code container */}
      <div
        style={{
          flex: 1,
          background: 'rgba(26, 26, 36, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: 14,
          padding: '18px 24px',
          border: `1px solid rgba(255, 255, 255, ${0.05 + glowIntensity * 0.1})`,
          boxShadow: `0 0 ${30 * glowIntensity}px ${accentColor}30`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow sweep */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${(localFrame / 40) * 100 - 50}%`,
            width: '50%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
            opacity: glowIntensity,
            pointerEvents: 'none',
          }}
        />

        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {highlightCode(displayText)}
          {localFrame < 30 && (
            <span style={{ color: COLORS.cursor, opacity: Math.floor(localFrame / 8) % 2 }}>|</span>
          )}
        </span>
      </div>
    </div>
  );
};

// ============ SCENE 3: REVELATION ============
const Scene3Revelation: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Gradient transition
  const gradientProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });

  // Word-by-word SLAM animation for main text
  const words = ["You've", "been", "programming", "your", "whole", "life."];
  const wordDelays = [5, 12, 20, 50, 58, 66];

  // Sub text with SLAM
  const subSpring = spring({
    frame: frame - 75,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  // Accent line
  const lineWidth = spring({
    frame: frame - 90,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Celebration effects trigger
  const celebrationStart = 30;

  // Flash on "programming" word
  const programmingFlash = interpolate(frame, [20, 25, 35], [0, 0.5, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        background: `linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.gradient1} ${gradientProgress * 100}%)`,
      }}
    >
      <FloatingParticles frame={frame} count={50} />

      {/* Flash effect on programming word */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${COLORS.gold} 0%, transparent 60%)`,
          opacity: programmingFlash,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {/* Pulse rings on celebration */}
      <PulseRing frame={frame} startFrame={celebrationStart} color={COLORS.accent} maxSize={500} duration={45} />
      <PulseRing frame={frame} startFrame={celebrationStart + 10} color={COLORS.pink} maxSize={600} duration={50} />
      <PulseRing frame={frame} startFrame={celebrationStart + 20} color={COLORS.gold} maxSize={700} duration={55} />

      {/* Confetti celebration */}
      <ConfettiEffect frame={frame} startFrame={celebrationStart + 5} count={50} />

      {/* Central glow (enhanced) */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, ${COLORS.goldGlow} 30%, transparent 70%)`,
          opacity: 0.5 + Math.sin(frame * 0.1) * 0.2,
          filter: 'blur(80px)',
        }}
      />

      {/* Main headline with word-by-word SLAM animation */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          maxWidth: 950,
        }}
      >
        {words.map((word, index) => {
          const wordSpring = spring({
            frame: frame - wordDelays[index],
            fps,
            config: word === 'programming' ? SPRING_CONFIGS.slam : SPRING_CONFIGS.snappy,
          });

          const wordScale = interpolate(wordSpring, [0, 1], [word === 'programming' ? 2.5 : 1.8, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 0.3, 1], [0, 1, 1]);
          const wordRotation = interpolate(wordSpring, [0, 1], [word === 'programming' ? 10 : 5, 0]);

          const isProgramming = word === 'programming';
          const isNewLine = word === 'your';

          return (
            <React.Fragment key={index}>
              {isNewLine && <div style={{ width: '100%', height: 10 }} />}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isProgramming ? 60 : 52,
                  fontWeight: 800,
                  color: COLORS.foreground,
                  letterSpacing: '-0.02em',
                  textShadow: isProgramming
                    ? `0 0 40px ${COLORS.accentGlow}, 0 0 80px ${COLORS.goldGlow}`
                    : '0 4px 30px rgba(0, 0, 0, 0.5)',
                  opacity: wordOpacity,
                  transform: `scale(${wordScale}) rotate(${wordRotation}deg)`,
                  display: 'inline-block',
                  ...(isProgramming && {
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold}, ${COLORS.pink})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }),
                }}
              >
                {word}
              </span>
            </React.Fragment>
          );
        })}
      </div>

      {/* Sparkles around programming word */}
      {frame > 25 && (
        <SparkleEffect
          frame={frame}
          count={15}
          color={COLORS.gold}
          area={{ x: 25, y: 35, width: 50, height: 30 }}
        />
      )}

      {/* Sub headline with SLAM */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 32,
          color: COLORS.mutedLight,
          textAlign: 'center',
          marginTop: 40,
          opacity: subSpring,
          transform: `translateY(${interpolate(subSpring, [0, 1], [30, 0])}px) scale(${interpolate(subSpring, [0, 1], [1.3, 1])})`,
          fontWeight: 400,
        }}
      >
        You just didn't know the{' '}
        <span
          style={{
            color: COLORS.code,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            textShadow: `0 0 20px ${COLORS.codeGlow}`,
          }}
        >
          syntax
        </span>
        .
      </p>

      {/* Animated accent line */}
      <div
        style={{
          width: interpolate(lineWidth, [0, 1], [0, 180]),
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.pink})`,
          marginTop: 50,
          borderRadius: 2,
          boxShadow: `0 0 20px ${COLORS.accentGlow}`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============ SCENE 4: CTA ============
const Scene4CTA: React.FC<{ fps: number; showCodeRain: boolean }> = ({ fps, showCodeRain }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // SLAM logo animation
  const logoSlam = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.slam,
  });

  const logoScale = interpolate(logoSlam, [0, 1], [3, 1]);
  const logoOpacity = interpolate(logoSlam, [0, 0.2, 1], [0, 1, 1]);
  const logoRotation = interpolate(logoSlam, [0, 1], [-8, 0]);

  // Tagline with SLAM
  const taglineSpring = spring({
    frame: frame - 50,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // CTA button with celebration
  const ctaSpring = spring({
    frame: frame - 85,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  // Enhanced pulsing glow
  const glowPulse = 0.7 + Math.sin(frame * 0.1) * 0.3;

  // Flash effect on logo slam
  const logoFlash = interpolate(frame, [5, 10, 20], [0.7, 0.3, 0], { extrapolateRight: 'clamp' });

  // Glitch effect for logo (RGB split)
  const glitchActive = frame > 10 && frame < 25;
  const glitchOffset = glitchActive ? Math.sin(frame * 3) * 4 : 0;

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
      {showCodeRain && <PremiumCodeRain frame={frame} width={width} height={height} />}

      {/* Flash effect on slam */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.gold,
          opacity: logoFlash,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />

      {/* Shockwave on logo entrance */}
      <ShockwaveRing frame={frame} startFrame={8} color={COLORS.gold} maxSize={700} duration={35} />

      {/* Pulse rings */}
      <PulseRing frame={frame} startFrame={15} color={COLORS.accent} maxSize={500} duration={50} />
      <PulseRing frame={frame} startFrame={25} color={COLORS.pink} maxSize={600} duration={55} />

      {/* Central glow (enhanced) */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.goldGlow} 0%, ${COLORS.accentGlow} 40%, transparent 70%)`,
          opacity: glowPulse,
          filter: 'blur(60px)',
        }}
      />

      {/* Logo with SLAM and glitch effect */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          zIndex: 10,
          position: 'relative',
        }}
      >
        {/* RGB glitch layers */}
        {glitchActive && (
          <>
            <h1
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontSize: 130,
                fontWeight: 900,
                color: 'rgba(255, 0, 0, 0.5)',
                letterSpacing: '-0.03em',
                margin: 0,
                transform: `translateX(${-glitchOffset}px)`,
                mixBlendMode: 'screen',
              }}
            >
              DOGM.AI
            </h1>
            <h1
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontSize: 130,
                fontWeight: 900,
                color: 'rgba(0, 255, 255, 0.5)',
                letterSpacing: '-0.03em',
                margin: 0,
                transform: `translateX(${glitchOffset}px)`,
                mixBlendMode: 'screen',
              }}
            >
              DOGM.AI
            </h1>
          </>
        )}
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 130,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${COLORS.foreground} 0%, ${COLORS.gold} 50%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            margin: 0,
            filter: `drop-shadow(0 0 60px ${COLORS.goldGlow}) drop-shadow(0 0 100px ${COLORS.accentGlow})`,
          }}
        >
          DOGM.AI
        </h1>
      </div>

      {/* Sparkles around logo */}
      {frame > 15 && (
        <SparkleEffect
          frame={frame}
          count={16}
          color={COLORS.gold}
          area={{ x: 25, y: 35, width: 50, height: 25 }}
        />
      )}

      {/* Accent bar (enhanced) */}
      <div
        style={{
          width: interpolate(logoSlam, [0, 1], [0, 280]),
          height: 6,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, ${COLORS.accent}, ${COLORS.gold}, transparent)`,
          marginTop: 30,
          borderRadius: 3,
          zIndex: 10,
          boxShadow: `0 0 30px ${COLORS.goldGlow}`,
        }}
      />

      {/* Tagline with SLAM */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 34,
          color: COLORS.mutedLight,
          textAlign: 'center',
          marginTop: 40,
          opacity: taglineSpring,
          transform: `translateY(${interpolate(taglineSpring, [0, 1], [25, 0])}px) scale(${interpolate(taglineSpring, [0, 1], [1.2, 1])})`,
          zIndex: 10,
          letterSpacing: '0.02em',
        }}
      >
        Learn the real{' '}
        <span style={{ color: COLORS.code, textShadow: `0 0 15px ${COLORS.codeGlow}` }}>syntax</span>.
      </p>

      {/* Confetti on CTA appearance */}
      <ConfettiEffect frame={frame} startFrame={90} count={45} />

      {/* CTA Button with enhanced animation */}
      <div
        style={{
          marginTop: 55,
          opacity: ctaSpring,
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.6, 1])})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.accent}, ${COLORS.pink})`,
            borderRadius: 50,
            padding: '22px 55px',
            boxShadow: `0 15px 50px ${COLORS.goldGlow}, 0 5px 30px ${COLORS.accentGlow}`,
            border: `2px solid rgba(255, 215, 0, 0.3)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${((frame - 85) * 3) % 200 - 50}%`,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              pointerEvents: 'none',
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.foreground,
              letterSpacing: '0.05em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            dogm.ai/enroll
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Premium code rain effect
const PremiumCodeRain: React.FC<{ frame: number; width: number; height: number }> = ({
  frame,
  width,
  height,
}) => {
  const columns = 25;
  const chars = '01{}[]()<>=;:,./_+-*&|!?@#$%アイウエオカキクケコ';

  const rainDrops = Array.from({ length: columns * 3 }, (_, i) => {
    const columnIndex = i % columns;
    const x = (columnIndex / columns) * width + 30;
    const speed = 1.5 + (i % 5) * 0.5;
    const offset = (i * 97) % (height * 2);
    const y = ((frame * speed + offset) % (height + 600)) - 300;
    const char = chars[(i + Math.floor(frame / 5)) % chars.length];
    const opacity = interpolate(y, [-100, 100, height - 200, height], [0, 0.25, 0.25, 0]);
    const brightness = i < columns ? 1 : 0.5;

    return { x, y, char, opacity: opacity * brightness };
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity: 0.5 }}>
      {rainDrops.map((drop, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: drop.x,
            top: drop.y,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: i < 25 ? COLORS.code : COLORS.accent,
            opacity: drop.opacity,
            textShadow: `0 0 8px ${i < 25 ? COLORS.codeGlow : COLORS.accentGlow}`,
          }}
        >
          {drop.char}
        </span>
      ))}
    </AbsoluteFill>
  );
};
