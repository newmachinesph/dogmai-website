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

// Premium spring configurations for different animation feels
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

// Premium color palette with glow variants
const COLORS = {
  // Base colors
  greenLight: '#bbf7d0',
  redLight: '#fecaca',
  greenTrue: '#22c55e',
  greenCode: '#4ade80',
  redFalse: '#ef4444',
  redCode: '#f87171',
  codeBlue: '#60a5fa',
  codeYellow: '#fbbf24',
  codePurple: '#a78bfa',
  lightBg: '#fafafa',
  darkBg: '#0a0a0a',
  darkGreen: '#166534',
  textLight: '#ffffff',
  textDark: '#171717',
  gray: '#71717a',
  cardBg: '#ffffff',

  // Glow variants
  greenGlow: 'rgba(34, 197, 94, 0.6)',
  greenGlowBright: 'rgba(34, 197, 94, 0.9)',
  redGlow: 'rgba(239, 68, 68, 0.6)',
  redGlowBright: 'rgba(239, 68, 68, 0.9)',
  pinkGlow: 'rgba(236, 72, 153, 0.6)',
  blueGlow: 'rgba(96, 165, 250, 0.5)',
  yellowGlow: 'rgba(251, 191, 36, 0.5)',
  purpleGlow: 'rgba(167, 139, 250, 0.5)',

  // Accent glow for true/false
  accentGlowTrue: 'rgba(34, 197, 94, 0.8)',
  accentGlowFalse: 'rgba(239, 68, 68, 0.8)',

  // Gold for premium highlights
  gold: '#ffd700',
  goldGlow: 'rgba(255, 215, 0, 0.6)',
};

// Font faces
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

// Props type
interface BooleansYesNoProps {
  showFloatingSymbols?: boolean;
}

export const BooleansYesNo: React.FC<BooleansYesNoProps> = ({
  showFloatingSymbols = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} />
      </Sequence>

      {/* Scene 2: Daily Questions (120-360 frames / 4-12 sec) */}
      <Sequence from={120} durationInFrames={240}>
        <Scene2Questions fps={fps} showFloatingSymbols={showFloatingSymbols} />
      </Sequence>

      {/* Scene 3: Now In Code (360-600 frames / 12-20 sec) */}
      <Sequence from={360} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Boolean Logic Visualized (600-810 frames / 20-27 sec) */}
      <Sequence from={600} durationInFrames={210}>
        <Scene4Logic fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (810-900 frames / 27-30 sec) */}
      <Sequence from={810} durationInFrames={90}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (900-1020 frames / 30-34 sec) */}
      <Sequence from={900} durationInFrames={120}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM COMPONENTS ============

// Animated gradient background with conic rotation
const AnimatedGradientBg: React.FC<{ frame: number; colors: string[] }> = ({ frame, colors }) => {
  const rotation = (frame * 2) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors.join(', ')})`,
        opacity: 0.15,
      }}
    />
  );
};

// Premium floating particles with multi-color glow
const PremiumFloatingParticles: React.FC<{ frame: number; colors?: string[] }> = ({
  frame,
  colors = [COLORS.greenGlow, COLORS.redGlow, COLORS.blueGlow, COLORS.yellowGlow]
}) => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    delay: i * 20,
    speed: 0.15 + (i % 5) * 0.05,
    size: 8 + (i % 4) * 4,
    color: colors[i % colors.length],
    glowSize: 20 + (i % 3) * 10,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const progress = ((frame + p.delay) * p.speed) % 200;
        const y = (p.y + progress) % 110;
        const x = p.x + Math.sin((frame + p.delay) * 0.02) * 8;
        const opacity = interpolate(y, [0, 50, 100], [0, 0.4, 0]);
        const scale = interpolate(y, [0, 50, 100], [0.5, 1, 0.5]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${p.glowSize}px ${p.color}`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};

// Glowing orb for ambient lighting
const GlowingOrb: React.FC<{
  x: string;
  y: string;
  size: number;
  color: string;
  intensity?: number;
  pulseSpeed?: number;
  frame?: number;
}> = ({ x, y, size, color, intensity = 0.6, pulseSpeed = 0.05, frame = 0 }) => {
  const pulse = Math.sin(frame * pulseSpeed) * 0.2 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: intensity,
        transform: `translate(-50%, -50%) scale(${pulse})`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Glass card with glassmorphism effect
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: number;
}> = ({ children, style, glowColor, intensity = 0.1 }) => {
  return (
    <div
      style={{
        background: `rgba(255, 255, 255, ${intensity})`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: glowColor
          ? `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 40px ${glowColor}`
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Sparkle effect component for celebration moments
const SparkleEffect: React.FC<{ frame: number; count?: number; spread?: number }> = ({
  frame,
  count = 12,
  spread = 150,
}) => {
  const sparkles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const delay = i * 3;
    const distance = spread + Math.sin(i * 1.5) * 30;
    return { angle, delay, distance, size: 4 + (i % 3) * 2 };
  });

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none' }}>
      {sparkles.map((sparkle, i) => {
        const progress = Math.max(0, (frame - sparkle.delay) / 20);
        const x = Math.cos(sparkle.angle) * sparkle.distance * Math.min(progress, 1);
        const y = Math.sin(sparkle.angle) * sparkle.distance * Math.min(progress, 1);
        const opacity = progress > 0 ? Math.max(0, 1 - progress * 0.8) : 0;
        const scale = progress > 0 ? 1 + progress * 0.5 : 0;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: sparkle.size,
              height: sparkle.size,
              borderRadius: '50%',
              backgroundColor: COLORS.gold,
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity,
              boxShadow: `0 0 ${sparkle.size * 3}px ${COLORS.goldGlow}, 0 0 ${sparkle.size * 6}px ${COLORS.goldGlow}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Confetti effect for celebrations
const ConfettiEffect: React.FC<{ frame: number; startFrame?: number }> = ({
  frame,
  startFrame = 0,
}) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const confetti = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 67) % 100 - 50,
    color: [COLORS.gold, COLORS.greenCode, COLORS.codeYellow, COLORS.textLight][i % 4],
    delay: (i * 2) % 15,
    speed: 3 + (i % 4),
    wobble: (i % 5) * 0.3,
    size: 8 + (i % 4) * 3,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {confetti.map((c, i) => {
        const adjustedFrame = localFrame - c.delay;
        if (adjustedFrame < 0) return null;

        const y = adjustedFrame * c.speed;
        const x = c.x + Math.sin(adjustedFrame * c.wobble * 0.1) * 30;
        const rotation = adjustedFrame * 10 * (i % 2 === 0 ? 1 : -1);
        const opacity = Math.max(0, 1 - y / 600);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: y - 50,
              width: c.size,
              height: c.size * 0.6,
              backgroundColor: c.color,
              borderRadius: 2,
              transform: `rotate(${rotation}deg)`,
              opacity,
              boxShadow: `0 0 8px ${c.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Pulse ring effect
const PulseRing: React.FC<{
  frame: number;
  delay?: number;
  color?: string;
  maxSize?: number;
}> = ({ frame, delay = 0, color = COLORS.greenGlow, maxSize = 300 }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const progress = Math.min(localFrame / 30, 1);
  const size = progress * maxSize;
  const opacity = 1 - progress;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
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

// Shockwave ring effect for impact moments
const ShockwaveRing: React.FC<{
  frame: number;
  delay?: number;
  color?: string;
}> = ({ frame, delay = 0, color = COLORS.goldGlow }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 25) return null;

  const progress = localFrame / 25;
  const size = 50 + progress * 400;
  const opacity = (1 - progress) * 0.8;
  const thickness = Math.max(1, 8 - progress * 7);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${thickness}px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        opacity,
        boxShadow: `0 0 30px ${color}`,
        pointerEvents: 'none',
      }}
    />
  );
};

// ============ SCENE 1: HOOK ============
const Scene1Hook: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // YES/NO background text
  const bgOpacity = interpolate(frame, [0, 20], [0, 0.2], { extrapolateRight: 'clamp' });

  // SLAM entrance for main text - dramatic scale from 2.5x with rotation
  const textSlam = spring({
    frame: frame - 8,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const textScale = interpolate(textSlam, [0, 1], [2.5, 1]);
  const textRotation = interpolate(textSlam, [0, 1], [-8, 0]);
  const textOpacity = interpolate(frame, [8, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Flash effect on SLAM impact
  const flashOpacity = interpolate(
    frame,
    [8, 12, 18],
    [0, 0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Sub text fades in with bounce
  const subSlam = spring({
    frame: frame - 45,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const subOpacity = interpolate(frame, [45, 55], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(subSlam, [0, 1], [40, 0]);
  const subScale = interpolate(subSlam, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, #166534 50%, #7f1d1d 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.greenTrue, COLORS.greenLight, COLORS.redLight, COLORS.redFalse, COLORS.greenTrue]}
      />

      {/* Glowing orbs for ambient lighting */}
      <GlowingOrb x="20%" y="30%" size={400} color={COLORS.greenGlow} frame={frame} pulseSpeed={0.03} />
      <GlowingOrb x="80%" y="70%" size={400} color={COLORS.redGlow} frame={frame} pulseSpeed={0.04} />

      {/* Premium floating particles */}
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.greenGlowBright, COLORS.redGlowBright]}
      />

      {/* Background YES/NO text with glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          opacity: bgOpacity,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 220,
              color: COLORS.greenTrue,
              textShadow: `0 0 60px ${COLORS.greenGlow}, 0 0 120px ${COLORS.greenGlow}`,
            }}
          >
            YES
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 220,
              color: COLORS.redFalse,
              textShadow: `0 0 60px ${COLORS.redGlow}, 0 0 120px ${COLORS.redGlow}`,
            }}
          >
            NO
          </span>
        </div>
      </div>

      {/* Flash effect on SLAM */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${COLORS.goldGlow} 0%, transparent 70%)`,
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* Shockwave on SLAM impact */}
      <div style={{ position: 'absolute', top: '45%', left: '50%', zIndex: 15 }}>
        <ShockwaveRing frame={frame} delay={10} color={COLORS.goldGlow} />
        <ShockwaveRing frame={frame} delay={14} color={COLORS.greenGlow} />
      </div>

      {/* Main text with glass card - SLAM entrance */}
      <GlassCard
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale}) rotate(${textRotation}deg)`,
          padding: '40px 60px',
          zIndex: 10,
        }}
        glowColor={frame > 10 ? COLORS.goldGlow : COLORS.blueGlow}
        intensity={0.15}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 56,
            background: `linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.gold} 50%, ${COLORS.greenCode} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 40px ${COLORS.goldGlow}`,
          }}
        >
          Your brain runs on booleans.
        </span>
      </GlassCard>

      {/* Sparkles after SLAM */}
      {frame > 12 && (
        <div style={{ position: 'absolute', top: '45%', left: '50%', zIndex: 12 }}>
          <SparkleEffect frame={frame - 12} count={16} spread={200} />
        </div>
      )}

      {/* Sub text with gradient and bounce */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px) scale(${subScale})`,
          marginTop: 30,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 36,
            color: COLORS.textLight,
            textShadow: `0 0 20px ${COLORS.greenGlow}, 0 4px 20px rgba(0, 0, 0, 0.5)`,
          }}
        >
          True or false. That&apos;s it.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: DAILY QUESTIONS ============
const Scene2Questions: React.FC<{ fps: number; showFloatingSymbols: boolean }> = ({
  fps,
  showFloatingSymbols,
}) => {
  const frame = useCurrentFrame();

  const questions = [
    { text: 'Is it Friday?', answer: true, emoji: '🎉', delay: 0 },
    { text: 'Do I have money?', answer: false, emoji: '💸', delay: 45 },
    { text: 'Am I hungry?', answer: true, emoji: '🍕', delay: 90 },
    { text: 'Did my crush reply?', answer: false, emoji: '📱', delay: 135 },
  ];

  // Bottom text
  const bottomOpacity = interpolate(frame, [165, 175], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, ${COLORS.darkBg} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Glowing orbs */}
      <GlowingOrb x="15%" y="20%" size={350} color={COLORS.greenGlow} frame={frame} />
      <GlowingOrb x="85%" y="80%" size={350} color={COLORS.pinkGlow} frame={frame} />

      {showFloatingSymbols && <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.greenGlow, COLORS.redGlow, COLORS.yellowGlow]}
      />}

      {/* Question cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          width: '100%',
          maxWidth: 900,
          zIndex: 10,
        }}
      >
        {questions.map((q, i) => (
          <QuestionCard
            key={i}
            question={q.text}
            answer={q.answer}
            emoji={q.emoji}
            delay={q.delay}
            frame={frame}
            fps={fps}
            fromLeft={i % 2 === 0}
          />
        ))}
      </div>

      {/* Bottom text with gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          opacity: bottomOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 28,
            background: `linear-gradient(90deg, ${COLORS.greenCode} 0%, ${COLORS.redCode} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 30px ${COLORS.greenGlow}`,
          }}
        >
          Yes or no. True or false. Every question.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Question card component with premium effects
const QuestionCard: React.FC<{
  question: string;
  answer: boolean;
  emoji: string;
  delay: number;
  frame: number;
  fps: number;
  fromLeft: boolean;
}> = ({ question, answer, emoji, delay, frame, fps, fromLeft }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  // Card flip in with enhanced spring
  const flipIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 150, mass: 0.9 },
  });
  const rotateY = interpolate(flipIn, [0, 1], [fromLeft ? -90 : 90, 0]);
  const cardOpacity = interpolate(flipIn, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  // Random tilt for organic feel
  const tilt = ((delay % 5) - 2) * 0.6;

  // Answer stamp appears
  const stampDelay = 20;
  const showStamp = localFrame > stampDelay;
  const stampScale = spring({
    frame: localFrame - stampDelay,
    fps,
    config: { damping: 10, stiffness: 250, mass: 0.7 },
  });
  const stampRotation = answer ? -5 : 5;

  // Confetti for true answers
  const showConfetti = answer && localFrame > stampDelay + 10;

  const glowColor = answer ? COLORS.accentGlowTrue : COLORS.accentGlowFalse;

  return (
    <div
      style={{
        perspective: 1200,
        width: '100%',
      }}
    >
      <GlassCard
        style={{
          padding: '32px 44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: cardOpacity,
          transform: `rotateY(${rotateY}deg) rotate(${tilt}deg)`,
          transformStyle: 'preserve-3d',
        }}
        glowColor={showStamp ? glowColor : undefined}
        intensity={0.12}
      >
        {/* Question */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 52, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>{emoji}</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 36,
              color: COLORS.textLight,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {question}
          </span>
        </div>

        {/* Answer stamp with premium glow */}
        {showStamp && (
          <div
            style={{
              transform: `scale(${Math.min(stampScale, 1)}) rotate(${stampRotation}deg)`,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 32px',
              borderRadius: 35,
              background: answer
                ? `linear-gradient(135deg, ${COLORS.greenTrue} 0%, ${COLORS.greenCode} 100%)`
                : `linear-gradient(135deg, ${COLORS.redFalse} 0%, ${COLORS.redCode} 100%)`,
              boxShadow: `0 0 30px ${glowColor}, 0 4px 20px rgba(0,0,0,0.3)`,
              border: `2px solid ${answer ? COLORS.greenCode : COLORS.redCode}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: COLORS.textLight,
                textShadow: `0 0 10px ${glowColor}`,
              }}
            >
              {answer ? 'TRUE' : 'FALSE'}
            </span>
            <span style={{ fontSize: 28, color: COLORS.textLight }}>
              {answer ? '✓' : '✗'}
            </span>
          </div>
        )}

        {/* Mini confetti */}
        {showConfetti && <MiniConfetti frame={localFrame - stampDelay - 10} />}
      </GlassCard>
    </div>
  );
};

// Mini confetti with glow
const MiniConfetti: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: (i % 6) * 20 - 50,
    angle: i * 30,
    color: i % 3 === 0 ? COLORS.greenTrue : i % 3 === 1 ? COLORS.codeYellow : COLORS.greenCode,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        top: '50%',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const progress = Math.min(frame / 25, 1);
        const x = p.x * progress * 2.5;
        const y = -40 * progress + 25 * progress * progress;
        const opacity = 1 - progress;
        const rotate = p.angle + frame * 8;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: p.color,
              borderRadius: 3,
              transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
              opacity,
              boxShadow: `0 0 10px ${p.color}`,
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

  // Mini cards at top
  const miniCards = [
    { text: 'Friday?', answer: true },
    { text: 'Money?', answer: false },
    { text: 'Hungry?', answer: true },
    { text: 'Reply?', answer: false },
  ];

  // Code lines
  const codeLines = [
    { text: 'let isFriday = true', delay: 20, highlightCard: 0 },
    { text: 'let hasMoney = false', delay: 40, highlightCard: 1 },
    { text: 'let isHungry = true', delay: 60, highlightCard: 2 },
    { text: 'let crushReplied = false', delay: 80, highlightCard: 3 },
  ];

  // If statement
  const ifLines = [
    { text: '', delay: 110 },
    { text: 'if (isFriday && !hasMoney) {', delay: 115 },
    { text: '  cry()', delay: 130 },
    { text: '}', delay: 140 },
  ];

  // Determine highlighted card
  let highlightedCard = -1;
  for (const line of codeLines) {
    if (frame >= line.delay && frame < line.delay + 20) {
      highlightedCard = line.highlightCard;
    }
  }

  // Annotations
  const showAnnotations = frame > 125;
  const showResult = frame > 150;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 40%, #1a1a2e 0%, ${COLORS.darkBg} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
      }}
    >
      {/* Glowing orbs */}
      <GlowingOrb x="10%" y="20%" size={400} color={COLORS.blueGlow} frame={frame} pulseSpeed={0.04} />
      <GlowingOrb x="90%" y="80%" size={400} color={COLORS.purpleGlow} frame={frame} pulseSpeed={0.03} />

      <BinaryRain frame={frame} />

      {/* Scanline effect */}
      <Scanlines />

      {/* Mini cards row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          marginBottom: 30,
          marginTop: 40,
          zIndex: 10,
        }}
      >
        {miniCards.map((card, i) => {
          const isHighlighted = highlightedCard === i;
          const glowColor = card.answer ? COLORS.accentGlowTrue : COLORS.accentGlowFalse;

          return (
            <GlassCard
              key={i}
              style={{
                padding: '18px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: isHighlighted
                  ? `2px solid ${card.answer ? COLORS.greenCode : COLORS.redCode}`
                  : '2px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              glowColor={isHighlighted ? glowColor : undefined}
              intensity={0.08}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.textLight,
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                {card.text}
              </span>
              <span
                style={{
                  fontSize: 22,
                  color: card.answer ? COLORS.greenCode : COLORS.redCode,
                  filter: `drop-shadow(0 0 8px ${card.answer ? COLORS.greenGlow : COLORS.redGlow})`,
                }}
              >
                {card.answer ? '✓' : '✗'}
              </span>
            </GlassCard>
          );
        })}
      </div>

      {/* Code block */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GlassCard
          style={{
            padding: '44px 52px',
            width: 920,
          }}
          glowColor={COLORS.blueGlow}
          intensity={0.08}
        >
          {/* Variable declarations */}
          {codeLines.map((line, i) => (
            <BooleanCodeLine key={i} text={line.text} delay={line.delay} frame={frame} fps={fps} />
          ))}

          {/* If statement */}
          {ifLines.map((line, i) => (
            <BooleanCodeLine
              key={`if-${i}`}
              text={line.text}
              delay={line.delay}
              frame={frame}
              fps={fps}
              isIfStatement
            />
          ))}

          {/* Annotations with glow */}
          {showAnnotations && (
            <div
              style={{
                display: 'flex',
                gap: 35,
                marginTop: 24,
                opacity: interpolate(frame, [125, 135], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <Annotation symbol="&&" meaning="AND" />
              <Annotation symbol="!" meaning="NOT" />
            </div>
          )}

          {/* Result with glow */}
          {showResult && (
            <div
              style={{
                marginTop: 24,
                opacity: interpolate(frame, [150, 160], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 26,
                  color: COLORS.gray,
                  textShadow: `0 0 10px ${COLORS.yellowGlow}`,
                }}
              >
                {'// Output: crying 😭'}
              </span>
            </div>
          )}
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// Scanline effect for terminal scenes
const Scanlines: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 100,
      }}
    />
  );
};

// Boolean code line with enhanced syntax highlighting
const BooleanCodeLine: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
  isIfStatement?: boolean;
}> = ({ text, delay, frame, fps, isIfStatement }) => {
  if (!text) return <div style={{ height: 28 }} />;

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Typewriter
  const charsToShow = Math.floor(
    interpolate(frame - delay, [0, 20], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);

  // Syntax highlight
  const highlighted = highlightBooleanSyntax(displayText, isIfStatement);

  if (frame < delay) return <div style={{ height: 48 }} />;

  return (
    <div style={{ opacity, minHeight: 48 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36 }}>
        {highlighted}
        {frame - delay < 20 && (
          <span
            style={{
              color: COLORS.codeBlue,
              opacity: Math.floor((frame - delay) / 8) % 2,
              textShadow: `0 0 10px ${COLORS.blueGlow}`,
            }}
          >
            |
          </span>
        )}
      </span>
    </div>
  );
};

// Enhanced syntax highlighter with glow
const highlightBooleanSyntax = (code: string, isIfStatement?: boolean) => {
  if (isIfStatement) {
    // Handle if statement
    const parts = code.split(/(if|&&|!|\(|\)|{|})/);
    return parts.map((part, i) => {
      if (part === 'if') {
        return (
          <span key={i} style={{ color: COLORS.codeBlue, textShadow: `0 0 10px ${COLORS.blueGlow}` }}>
            {part}
          </span>
        );
      }
      if (part === '&&' || part === '!') {
        return (
          <span key={i} style={{ color: COLORS.codeYellow, textShadow: `0 0 10px ${COLORS.yellowGlow}` }}>
            {part}
          </span>
        );
      }
      if (['(', ')', '{', '}'].includes(part)) {
        return (
          <span key={i} style={{ color: COLORS.gray }}>
            {part}
          </span>
        );
      }
      return (
        <span key={i} style={{ color: COLORS.textLight }}>
          {part}
        </span>
      );
    });
  }

  // Handle variable declarations
  const parts = code.split(/(let|true|false|=)/);
  return parts.map((part, i) => {
    if (part === 'let') {
      return (
        <span key={i} style={{ color: COLORS.codePurple, textShadow: `0 0 10px ${COLORS.purpleGlow}` }}>
          {part}
        </span>
      );
    }
    if (part === 'true') {
      return (
        <span key={i} style={{ color: COLORS.greenCode, textShadow: `0 0 15px ${COLORS.greenGlow}` }}>
          {part}
        </span>
      );
    }
    if (part === 'false') {
      return (
        <span key={i} style={{ color: COLORS.redCode, textShadow: `0 0 15px ${COLORS.redGlow}` }}>
          {part}
        </span>
      );
    }
    if (part === '=') {
      return (
        <span key={i} style={{ color: COLORS.codeYellow }}>
          {part}
        </span>
      );
    }
    return (
      <span key={i} style={{ color: COLORS.textLight }}>
        {part}
      </span>
    );
  });
};

// Annotation component with glow
const Annotation: React.FC<{ symbol: string; meaning: string }> = ({ symbol, meaning }) => (
  <GlassCard
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 20px',
    }}
    glowColor={COLORS.yellowGlow}
    intensity={0.1}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 22,
        color: COLORS.codeYellow,
        textShadow: `0 0 12px ${COLORS.yellowGlow}`,
      }}
    >
      {symbol}
    </span>
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 19,
        color: COLORS.gray,
      }}
    >
      = {meaning}
    </span>
  </GlassCard>
);

// ============ SCENE 4: LOGIC VISUALIZED ============
const Scene4Logic: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Three demos - extended for readability
  const demoAnd = frame >= 0 && frame < 70;
  const demoOr = frame >= 70 && frame < 140;
  const demoNot = frame >= 140;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, ${COLORS.darkBg} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      {/* Glowing orbs */}
      <GlowingOrb x="25%" y="25%" size={450} color={COLORS.yellowGlow} frame={frame} />
      <GlowingOrb x="75%" y="75%" size={450} color={COLORS.purpleGlow} frame={frame} />

      {/* Demo 1: AND */}
      {demoAnd && <AndDemo frame={frame} fps={fps} />}

      {/* Demo 2: OR */}
      {demoOr && <OrDemo frame={frame - 70} fps={fps} />}

      {/* Demo 3: NOT */}
      {demoNot && <NotDemo frame={frame - 140} fps={fps} />}
    </AbsoluteFill>
  );
};

// AND Demo with premium effects
const AndDemo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const switch1On = frame > 10;
  const switch2On = frame > 20;
  const showResult1 = frame > 30;
  const switch2Off = frame > 40;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 35,
      }}
    >
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 58,
          background: `linear-gradient(135deg, ${COLORS.codeYellow} 0%, ${COLORS.codeBlue} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textShadow: `0 0 30px ${COLORS.yellowGlow}`,
        }}
      >
        AND (&&)
      </h2>

      <div style={{ display: 'flex', gap: 55, alignItems: 'center' }}>
        <ToggleSwitch label="Hungry" isOn={switch1On} frame={frame} fps={fps} />
        <span style={{ fontSize: 44, color: COLORS.codeYellow, textShadow: `0 0 20px ${COLORS.yellowGlow}` }}>&&</span>
        <ToggleSwitch label="Has Food" isOn={switch2On && !switch2Off} frame={frame} fps={fps} />
      </div>

      <div style={{ fontSize: 44, color: COLORS.textLight, textShadow: `0 0 15px ${COLORS.blueGlow}` }}>↓</div>

      {showResult1 && (
        <GlassCard
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '22px 44px',
          }}
          glowColor={switch2Off ? COLORS.accentGlowFalse : COLORS.accentGlowTrue}
          intensity={0.15}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 46,
              color: switch2Off ? COLORS.redFalse : COLORS.greenTrue,
              textShadow: switch2Off
                ? `0 0 15px ${COLORS.redFalse}, 0 0 30px ${COLORS.redGlow}, 0 0 50px ${COLORS.redGlow}`
                : `0 0 15px ${COLORS.greenTrue}, 0 0 30px ${COLORS.greenGlow}, 0 0 50px ${COLORS.greenGlow}`,
            }}
          >
            {switch2Off ? 'SAD ✗' : 'EAT ✓'}
          </span>
        </GlassCard>
      )}

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
          color: COLORS.gray,
          marginTop: 14,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        hungry && hasFood = {switch2Off ? 'false' : switch1On && switch2On ? 'true' : '...'}
      </div>
    </div>
  );
};

// OR Demo with premium effects
const OrDemo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const switch1On = frame > 10;
  const switch2On = false;
  const showResult = frame > 25;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 35,
      }}
    >
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 58,
          background: `linear-gradient(135deg, ${COLORS.codeYellow} 0%, ${COLORS.codePurple} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textShadow: `0 0 30px ${COLORS.yellowGlow}`,
        }}
      >
        OR (||)
      </h2>

      <div style={{ display: 'flex', gap: 55, alignItems: 'center' }}>
        <ToggleSwitch label="Weekend" isOn={switch1On} frame={frame} fps={fps} />
        <span style={{ fontSize: 44, color: COLORS.codeYellow, textShadow: `0 0 20px ${COLORS.yellowGlow}` }}>||</span>
        <ToggleSwitch label="Holiday" isOn={switch2On} frame={frame} fps={fps} />
      </div>

      <div style={{ fontSize: 44, color: COLORS.textLight, textShadow: `0 0 15px ${COLORS.blueGlow}` }}>↓</div>

      {showResult && (
        <GlassCard
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '22px 44px',
          }}
          glowColor={COLORS.accentGlowTrue}
          intensity={0.15}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 46,
              color: COLORS.greenTrue,
              textShadow: `0 0 15px ${COLORS.greenTrue}, 0 0 30px ${COLORS.greenGlow}, 0 0 50px ${COLORS.greenGlow}`,
            }}
          >
            NO WORK ✓
          </span>
        </GlassCard>
      )}

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
          color: COLORS.gray,
          marginTop: 14,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        weekend || holiday = true
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 28,
          color: COLORS.greenCode,
          textShadow: `0 0 15px ${COLORS.greenGlow}`,
        }}
      >
        Either one = still true
      </div>
    </div>
  );
};

// NOT Demo with premium effects
const NotDemo: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const switchOn = frame > 10;
  const showFlip = frame > 25;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 35,
      }}
    >
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 58,
          background: `linear-gradient(135deg, ${COLORS.codeYellow} 0%, ${COLORS.redCode} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          textShadow: `0 0 30px ${COLORS.yellowGlow}`,
        }}
      >
        NOT (!)
      </h2>

      <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <ToggleSwitch label="Busy" isOn={switchOn} frame={frame} fps={fps} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              color: COLORS.greenCode,
              textShadow: `0 0 12px ${COLORS.greenGlow}`,
            }}
          >
            true
          </span>
        </div>

        {showFlip && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 44, color: COLORS.codeYellow, textShadow: `0 0 20px ${COLORS.yellowGlow}` }}>!</span>
              <span style={{ fontSize: 44, color: COLORS.textLight, textShadow: `0 0 15px ${COLORS.blueGlow}` }}>→</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <ToggleSwitch label="!Busy" isOn={false} frame={frame} fps={fps} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  color: COLORS.redCode,
                  textShadow: `0 0 12px ${COLORS.redGlow}`,
                }}
              >
                false
              </span>
            </div>
          </>
        )}
      </div>

      {showFlip && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 32,
            color: COLORS.codeYellow,
            marginTop: 24,
            textShadow: `0 0 20px ${COLORS.yellowGlow}`,
          }}
        >
          NOT flips the value
        </div>
      )}
    </div>
  );
};

// Premium toggle switch with glow effects
const ToggleSwitch: React.FC<{
  label: string;
  isOn: boolean;
  frame: number;
  fps: number;
}> = ({ label, isOn, frame, fps }) => {
  const togglePosition = spring({
    frame: isOn ? frame : 0,
    fps,
    config: { damping: 18, stiffness: 250, mass: 0.7 },
  });
  const knobX = interpolate(togglePosition, [0, 1], [6, 42]);
  const bgGradient = isOn
    ? `linear-gradient(135deg, ${COLORS.greenTrue} 0%, ${COLORS.greenCode} 100%)`
    : `linear-gradient(135deg, #3f3f46 0%, ${COLORS.gray} 100%)`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.textLight,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: 80,
          height: 44,
          borderRadius: 22,
          background: bgGradient,
          position: 'relative',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOn
            ? `0 0 25px ${COLORS.accentGlowTrue}, 0 4px 15px rgba(0,0,0,0.3)`
            : '0 4px 10px rgba(0,0,0,0.2)',
          border: `2px solid ${isOn ? COLORS.greenCode : 'rgba(255, 255, 255, 0.1)'}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: knobX,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            boxShadow: `0 0 15px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0,0,0,0.3)`,
          }}
        />
      </div>
    </div>
  );
};

// ============ SCENE 5: AHA MOMENT ============
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Word-by-word SLAM for main text
  const words = ['A', 'boolean', 'is', 'a', 'yes', 'or', 'no.'];
  const wordDelays = [0, 4, 8, 10, 13, 17, 20];

  // Flash on first SLAM
  const flashOpacity = interpolate(
    frame,
    [0, 4, 10],
    [0, 0.5, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const points = [
    { emoji: '✓', text: 'True = yes, on, 1', color: COLORS.greenCode, delay: 28, glow: COLORS.greenGlow },
    { emoji: '✗', text: 'False = no, off, 0', color: COLORS.redCode, delay: 38, glow: COLORS.redGlow },
    { emoji: '🧠', text: 'Your brain does this all day', color: COLORS.textLight, delay: 48, glow: COLORS.blueGlow },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #1a3a1a 0%, ${COLORS.darkBg} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.greenTrue, COLORS.darkGreen, COLORS.greenCode, COLORS.darkGreen, COLORS.greenTrue]}
      />

      {/* Multiple glowing orbs */}
      <GlowingOrb x="50%" y="50%" size={600} color={COLORS.greenGlow} intensity={0.4} frame={frame} pulseSpeed={0.02} />
      <GlowingOrb x="20%" y="30%" size={300} color={COLORS.blueGlow} frame={frame} pulseSpeed={0.04} />
      <GlowingOrb x="80%" y="70%" size={300} color={COLORS.goldGlow} frame={frame} pulseSpeed={0.03} />

      {/* Animated toggle in background */}
      <AnimatedToggleBg frame={frame} />

      {/* Flash effect on SLAM */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 40%, ${COLORS.goldGlow} 0%, transparent 60%)`,
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

      {/* Confetti celebration */}
      <ConfettiEffect frame={frame} startFrame={5} />

      {/* Pulse rings on revelation */}
      <div style={{ position: 'absolute', top: '35%', left: '50%', zIndex: 5 }}>
        <PulseRing frame={frame} delay={3} color={COLORS.goldGlow} maxSize={400} />
        <PulseRing frame={frame} delay={8} color={COLORS.greenGlow} maxSize={500} />
      </div>

      {/* Main revelation with word-by-word SLAM */}
      <GlassCard
        style={{
          marginBottom: 60,
          zIndex: 10,
          padding: '40px 50px',
          position: 'relative',
        }}
        glowColor={COLORS.goldGlow}
        intensity={0.15}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {words.map((word, i) => {
            const wordSlam = spring({
              frame: frame - wordDelays[i],
              fps,
              config: SPRING_CONFIGS.slam,
            });
            const wordScale = interpolate(wordSlam, [0, 1], [2.5, 1]);
            const wordRotation = interpolate(wordSlam, [0, 1], [i % 2 === 0 ? -10 : 10, 0]);
            const wordOpacity = interpolate(frame - wordDelays[i], [0, 3], [0, 1], { extrapolateRight: 'clamp' });

            // Highlight "yes" and "no" with different colors
            const isYes = word === 'yes';
            const isNo = word === 'no.';
            const wordColor = isYes ? COLORS.greenCode : isNo ? COLORS.redCode : COLORS.textLight;
            const wordGlow = isYes ? COLORS.greenGlow : isNo ? COLORS.redGlow : COLORS.goldGlow;

            return (
              <span
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 58,
                  color: wordColor,
                  opacity: wordOpacity,
                  transform: `scale(${wordScale}) rotate(${wordRotation}deg)`,
                  display: 'inline-block',
                  textShadow: `0 0 30px ${wordGlow}`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Sparkles after reveal */}
        {frame > 22 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <SparkleEffect frame={frame - 22} count={20} spread={250} />
          </div>
        )}
      </GlassCard>

      {/* Three points with enhanced animations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 10 }}>
        {points.map((point, i) => {
          const pointSlam = spring({
            frame: frame - point.delay,
            fps,
            config: SPRING_CONFIGS.bouncy,
          });
          const pointOpacity = interpolate(frame, [point.delay, point.delay + 8], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const pointScale = interpolate(pointSlam, [0, 1], [0.5, 1]);
          const pointX = interpolate(pointSlam, [0, 1], [i % 2 === 0 ? -50 : 50, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: pointOpacity,
                transform: `translateX(${pointX}px) scale(${pointScale})`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <span style={{
                fontSize: 40,
                filter: `drop-shadow(0 0 15px ${point.glow})`
              }}>
                {point.emoji}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 36,
                  color: point.color,
                  textShadow: `0 0 20px ${point.glow}, 0 4px 15px rgba(0,0,0,0.5)`,
                }}
              >
                {point.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Animated toggle background with premium glow
const AnimatedToggleBg: React.FC<{ frame: number }> = ({ frame }) => {
  const isOn = Math.floor(frame / 20) % 2 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.12,
      }}
    >
      <div
        style={{
          width: 240,
          height: 120,
          borderRadius: 60,
          background: isOn
            ? `linear-gradient(135deg, ${COLORS.greenTrue} 0%, ${COLORS.greenCode} 100%)`
            : `linear-gradient(135deg, #3f3f46 0%, ${COLORS.gray} 100%)`,
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOn
            ? `0 0 60px ${COLORS.greenGlow}`
            : '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: isOn ? 128 : 12,
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 4px 15px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    </div>
  );
};

// ============ SCENE 6: CTA ============
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: 'readyToLearn = true', delay: 0 },
    { text: '', delay: 12 },
    { text: 'if (readyToLearn) {', delay: 15 },
    { text: '  visit("DOGM.AI")', delay: 25 },
    { text: '}', delay: 32 },
  ];

  const showResult = frame > 45;

  // SLAM entrance for logo
  const logoSlam = spring({
    frame: frame - 48,
    fps,
    config: SPRING_CONFIGS.slam,
  });
  const logoScale = interpolate(logoSlam, [0, 1], [3, 1]);
  const logoRotation = interpolate(logoSlam, [0, 1], [-12, 0]);
  const logoOpacity = interpolate(frame, [48, 52], [0, 1], { extrapolateRight: 'clamp' });

  // Flash on logo SLAM
  const flashOpacity = interpolate(
    frame,
    [48, 52, 58],
    [0, 0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // RGB glitch effect for logo
  const glitchActive = frame > 50 && frame < 60;
  const glitchOffset = glitchActive ? Math.sin(frame * 2) * 3 : 0;

  // Teaser bounce in
  const teaserSlam = spring({
    frame: frame - 60,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const teaserOpacity = interpolate(frame, [60, 65], [0, 1], { extrapolateRight: 'clamp' });
  const teaserScale = interpolate(teaserSlam, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, ${COLORS.darkBg} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Glowing orbs */}
      <GlowingOrb x="30%" y="30%" size={500} color={COLORS.greenGlow} frame={frame} />
      <GlowingOrb x="70%" y="70%" size={500} color={COLORS.goldGlow} frame={frame} />

      {/* Scanlines for terminal feel */}
      <Scanlines />

      {/* Flash effect on logo SLAM */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 70%, ${COLORS.goldGlow} 0%, transparent 60%)`,
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 25,
        }}
      />

      {/* Terminal with glass effect */}
      <GlassCard
        style={{
          padding: '32px 40px',
          width: 800,
          border: `2px solid ${COLORS.greenCode}`,
        }}
        glowColor={COLORS.greenGlow}
        intensity={0.08}
      >
        {/* Terminal dots with glow */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            boxShadow: '0 0 10px #ef4444',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#eab308',
            boxShadow: '0 0 10px #eab308',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 10px #22c55e',
          }} />
        </div>

        {/* Code lines */}
        {codeLines.map((line, i) => (
          <BooleanCodeLine
            key={i}
            text={line.text}
            delay={line.delay}
            frame={frame}
            fps={fps}
            isIfStatement={line.text.includes('if') || line.text.includes('visit') || line.text === '}'}
          />
        ))}

        {/* Result with glow */}
        {showResult && (
          <div
            style={{
              marginTop: 18,
              opacity: interpolate(frame, [45, 55], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 26,
                color: COLORS.gray,
                textShadow: `0 0 15px ${COLORS.yellowGlow}`,
              }}
            >
              {'// Output: new skills 🚀'}
            </span>
          </div>
        )}
      </GlassCard>

      {/* Shockwave on logo SLAM */}
      <div style={{ position: 'absolute', top: '70%', left: '50%', zIndex: 20 }}>
        <ShockwaveRing frame={frame} delay={50} color={COLORS.goldGlow} />
        <ShockwaveRing frame={frame} delay={54} color={COLORS.greenGlow} />
      </div>

      {/* Logo with SLAM entrance and RGB glitch */}
      <div
        style={{
          marginTop: 45,
          opacity: logoOpacity,
          transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
          position: 'relative',
          zIndex: 15,
        }}
      >
        {/* RGB glitch layers */}
        {glitchActive && (
          <>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 68,
                color: 'rgba(255, 0, 0, 0.5)',
                letterSpacing: '-0.02em',
                transform: `translateX(${-glitchOffset}px)`,
                filter: 'blur(1px)',
              }}
            >
              DOGM.AI
            </span>
            <span
              style={{
                position: 'absolute',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 68,
                color: 'rgba(0, 255, 255, 0.5)',
                letterSpacing: '-0.02em',
                transform: `translateX(${glitchOffset}px)`,
                filter: 'blur(1px)',
              }}
            >
              DOGM.AI
            </span>
          </>
        )}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 68,
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.greenCode} 50%, ${COLORS.gold} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            textShadow: `0 0 40px ${COLORS.goldGlow}`,
            filter: `drop-shadow(0 0 30px ${COLORS.goldGlow})`,
            position: 'relative',
          }}
        >
          DOGM.AI
        </span>
      </div>

      {/* Sparkles after logo SLAM */}
      {frame > 52 && (
        <div style={{ position: 'absolute', top: '68%', left: '50%', zIndex: 18 }}>
          <SparkleEffect frame={frame - 52} count={18} spread={200} />
        </div>
      )}

      {/* Teaser with bounce */}
      <div
        style={{
          marginTop: 24,
          opacity: teaserOpacity,
          transform: `scale(${teaserScale})`,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            color: COLORS.gray,
            textShadow: `0 0 10px ${COLORS.blueGlow}`,
          }}
        >
          Next: How to check your work
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ HELPER COMPONENTS ============

// Binary rain effect with glow
const BinaryRain: React.FC<{ frame: number }> = ({ frame }) => {
  const columns = Array.from({ length: 25 }, (_, i) => ({
    x: i * 4 + 2,
    speed: 0.4 + (i % 5) * 0.15,
    offset: i * 60,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.12,
      }}
    >
      {columns.map((col, i) => {
        const chars = Array.from({ length: 12 }, (_, j) => ({
          char: j % 2 === 0 ? '0' : '1',
          y: ((frame * col.speed + col.offset + j * 60) % 2200) - 100,
        }));

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${col.x}%`,
              top: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chars.map((c, j) => (
              <span
                key={j}
                style={{
                  position: 'absolute',
                  top: c.y,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  color: c.char === '1' ? COLORS.greenCode : COLORS.redCode,
                  textShadow: c.char === '1'
                    ? `0 0 8px ${COLORS.greenGlow}`
                    : `0 0 8px ${COLORS.redGlow}`,
                }}
              >
                {c.char}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
