import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

// Premium Color Palette with Glow Variants
const COLORS = {
  // Base colors
  darkBlue: '#0c4a6e',
  terminalBg: '#050505',
  editorBg: '#0a0a0a',

  // Premium Matrix-style greens with glows
  consoleGreen: '#00ff41',
  consoleGreenGlow: 'rgba(0, 255, 65, 0.6)',
  matrixGreen: '#00ff41',
  matrixDark: '#003b00',

  // Enhanced accent colors with glows
  errorRed: '#ff3366',
  errorRedGlow: 'rgba(255, 51, 102, 0.6)',
  warningYellow: '#ffcc00',
  warningYellowGlow: 'rgba(255, 204, 0, 0.6)',
  successGreen: '#00ff88',
  successGreenGlow: 'rgba(0, 255, 136, 0.6)',

  // Premium purples and blues with glows
  codePurple: '#c792ea',
  codePurpleGlow: 'rgba(199, 146, 234, 0.6)',
  codeBlue: '#82aaff',
  codeBlueGlow: 'rgba(130, 170, 255, 0.6)',
  accentCyan: '#00ffff',
  accentCyanGlow: 'rgba(0, 255, 255, 0.6)',
  accentPink: '#ff00ff',
  accentPinkGlow: 'rgba(255, 0, 255, 0.6)',

  // Gradients
  textLight: '#ffffff',
  textGlow: 'rgba(255, 255, 255, 0.9)',
  gray: '#71717a',
  darkGradient1: '#0a0a0a',
  darkGradient2: '#1a0a2e',
  darkGradient3: '#16213e',

  // Glass morphism
  glassWhite: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

// Font faces
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

// Props type
interface ConsoleLogThinkingProps {
  showFloatingLogs?: boolean;
}

export const ConsoleLogThinking: React.FC<ConsoleLogThinkingProps> = ({
  showFloatingLogs = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} />
      </Sequence>

      {/* Scene 2: Thinking Out Loud IRL (120-360 frames / 4-12 sec) */}
      <Sequence from={120} durationInFrames={240}>
        <Scene2ThinkingIRL fps={fps} />
      </Sequence>

      {/* Scene 3: Now In Code (360-600 frames / 12-20 sec) */}
      <Sequence from={360} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Debugging In Action (600-810 frames / 20-27 sec) */}
      <Sequence from={600} durationInFrames={210}>
        <Scene4Debugging fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (810-900 frames / 27-30 sec) */}
      <Sequence from={810} durationInFrames={90}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (900-1020 frames / 30-34 sec) */}
      <Sequence from={900} durationInFrames={120}>
        <Scene6CTA fps={fps} showFloatingLogs={showFloatingLogs} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM COMPONENTS ============

// Animated gradient background with conic rotation
const AnimatedGradientBg: React.FC<{ frame: number; colors?: string[] }> = ({
  frame,
  colors = [COLORS.darkGradient1, COLORS.darkGradient2, COLORS.darkGradient3]
}) => {
  const rotation = (frame * 0.5) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors[0]} 0deg, ${colors[1]} 120deg, ${colors[2]} 240deg, ${colors[0]} 360deg)`,
        opacity: 0.8,
      }}
    />
  );
};

// Glowing orb for ambient lighting
const GlowingOrb: React.FC<{
  x: string;
  y: string;
  size: number;
  color: string;
  glowColor: string;
  frame: number;
  pulseSpeed?: number;
}> = ({ x, y, size, color, glowColor, frame, pulseSpeed = 0.05 }) => {
  const pulse = 1 + Math.sin(frame * pulseSpeed) * 0.3;
  const drift = Math.sin(frame * 0.02) * 20;

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
        filter: `blur(40px)`,
        boxShadow: `0 0 ${size}px ${glowColor}, 0 0 ${size * 2}px ${glowColor}`,
        transform: `translateX(${drift}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Glass card with backdrop blur and glassmorphism
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
  glowColor?: string;
}> = ({ children, style = {}, borderColor = COLORS.glassBorder, glowColor }) => {
  return (
    <div
      style={{
        background: COLORS.glassWhite,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
        borderRadius: 20,
        boxShadow: glowColor
          ? `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Gradient text using webkit background clip
const GradientText: React.FC<{
  children: React.ReactNode;
  gradient: string;
  style?: React.CSSProperties;
}> = ({ children, gradient, style = {} }) => {
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

// Premium floating particles with multi-color glow
const PremiumFloatingParticles: React.FC<{
  frame: number;
  particleType?: 'log' | 'bubble' | 'dot';
  count?: number;
}> = ({ frame, particleType = 'log', count = 12 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    x: (i * 8.33) % 100,
    y: (i * 12.5) % 100,
    delay: i * 20,
    color: [
      COLORS.consoleGreen,
      COLORS.codePurple,
      COLORS.codeBlue,
      COLORS.accentCyan,
      COLORS.warningYellow,
      COLORS.accentPink,
    ][i % 6],
    glowColor: [
      COLORS.consoleGreenGlow,
      COLORS.codePurpleGlow,
      COLORS.codeBlueGlow,
      COLORS.accentCyanGlow,
      COLORS.warningYellowGlow,
      COLORS.accentPinkGlow,
    ][i % 6],
    size: 4 + (i % 3) * 2,
    speed: 0.2 + (i % 4) * 0.1,
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
        const floatY = ((frame + p.delay) * p.speed) % 120;
        const floatX = p.x + Math.sin((frame + p.delay) * 0.02) * 3;
        const opacity = interpolate(floatY, [0, 30, 90, 120], [0, 0.6, 0.6, 0]);
        const pulse = 1 + Math.sin((frame + p.delay) * 0.1) * 0.3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${floatX}%`,
              top: `${floatY}%`,
              opacity,
            }}
          >
            {particleType === 'log' ? (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: p.color,
                  textShadow: `0 0 10px ${p.glowColor}, 0 0 20px ${p.glowColor}`,
                  transform: `scale(${pulse})`,
                }}
              >
                console.log()
              </div>
            ) : (
              <div
                style={{
                  width: p.size * pulse,
                  height: p.size * pulse,
                  borderRadius: '50%',
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.glowColor}, 0 0 20px ${p.glowColor}`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Enhanced scanline effect for terminal
const TerminalScanlines: React.FC<{ frame: number; intensity?: number }> = ({
  frame,
  intensity = 0.03
}) => {
  const scanlinePosition = (frame * 2) % 100;

  return (
    <>
      {/* Horizontal scanlines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.15) 3px
          )`,
          pointerEvents: 'none',
          opacity: intensity,
        }}
      />

      {/* Moving scanline */}
      <div
        style={{
          position: 'absolute',
          top: `${scanlinePosition}%`,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            ${COLORS.consoleGreenGlow} 50%,
            transparent 100%
          )`,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

// ============ SCENE 1: HOOK ============
const Scene1Hook: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Enhanced spring animations
  const headScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });

  const textSlam = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18, stiffness: 250, mass: 1.2 },
  });
  const textScale = interpolate(textSlam, [0, 1], [1.8, 1]);
  const textOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [45, 60], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkGradient1} 0%, ${COLORS.darkGradient2} 50%, ${COLORS.darkGradient3} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg frame={frame} />

      {/* Glowing orbs for ambient lighting */}
      <GlowingOrb
        x="10%"
        y="20%"
        size={300}
        color={COLORS.codePurple}
        glowColor={COLORS.codePurpleGlow}
        frame={frame}
      />
      <GlowingOrb
        x="80%"
        y="70%"
        size={250}
        color={COLORS.codeBlue}
        glowColor={COLORS.codeBlueGlow}
        frame={frame}
        pulseSpeed={0.03}
      />

      {/* Premium floating particles */}
      <PremiumFloatingParticles frame={frame} particleType="bubble" count={15} />

      {/* Person head with thoughts */}
      <div
        style={{
          transform: `scale(${headScale})`,
          marginBottom: 30,
          position: 'relative',
          zIndex: 10,
          filter: 'drop-shadow(0 10px 40px rgba(199, 146, 234, 0.4))',
        }}
      >
        <div style={{ fontSize: 120 }}>🤔</div>
        <ThinkingDots frame={frame} />
      </div>

      {/* Main text with premium glow */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.codeBlue} 50%, ${COLORS.codePurple} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 64,
            textShadow: `0 0 30px ${COLORS.codeBlueGlow}, 0 0 60px ${COLORS.codePurpleGlow}, 0 4px 20px rgba(0, 0, 0, 0.5)`,
            letterSpacing: '-0.02em',
          }}
        >
          You already know how to debug.
        </GradientText>
      </div>

      {/* Sub text with glow */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 24,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 38,
            color: COLORS.accentCyan,
            textShadow: `0 0 20px ${COLORS.accentCyanGlow}, 0 0 40px ${COLORS.accentCyanGlow}`,
            letterSpacing: '-0.01em',
          }}
        >
          You talk to yourself.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Enhanced thinking dots with glow
const ThinkingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 1, 2];

  return (
    <div
      style={{
        position: 'absolute',
        top: -40,
        right: -30,
        display: 'flex',
        gap: 10,
      }}
    >
      {dots.map((i) => {
        const delay = i * 10;
        const opacity = Math.sin((frame + delay) * 0.15) * 0.5 + 0.5;
        const y = Math.sin((frame + delay) * 0.1) * 6;
        const pulse = 1 + Math.sin((frame + delay) * 0.12) * 0.2;

        return (
          <div
            key={i}
            style={{
              width: 16 * pulse,
              height: 16 * pulse,
              borderRadius: '50%',
              backgroundColor: COLORS.accentCyan,
              opacity,
              transform: `translateY(${y}px)`,
              boxShadow: `0 0 20px ${COLORS.accentCyanGlow}, 0 0 40px ${COLORS.accentCyanGlow}`,
            }}
          />
        );
      })}
    </div>
  );
};

// ============ SCENE 2: THINKING OUT LOUD IRL ============
const Scene2ThinkingIRL: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const bubbles = [
    { text: 'Okay, rice is in...', icon: '🍚', delay: 0, mood: 'neutral' },
    { text: 'Water looks right...', icon: '💧', delay: 40, mood: 'neutral' },
    { text: 'Wait, did I add salt?', icon: '🧂❓', delay: 80, mood: 'warning' },
    { text: 'AH. No salt. That\'s the problem.', icon: '❗', delay: 120, mood: 'error' },
    { text: 'Fixed!', icon: '✨', delay: 160, mood: 'success' },
  ];

  const bottomOpacity = interpolate(frame, [165, 175], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkGradient1} 0%, ${COLORS.darkGradient2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient */}
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.darkGradient1, COLORS.darkGradient3, COLORS.darkGradient2]}
      />

      {/* Glowing orbs */}
      <GlowingOrb
        x="20%"
        y="30%"
        size={200}
        color={COLORS.warningYellow}
        glowColor={COLORS.warningYellowGlow}
        frame={frame}
      />
      <GlowingOrb
        x="75%"
        y="60%"
        size={180}
        color={COLORS.successGreen}
        glowColor={COLORS.successGreenGlow}
        frame={frame}
        pulseSpeed={0.04}
      />

      {/* Cooking person */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 60,
          marginBottom: 20,
          zIndex: 10,
        }}
      >
        <div style={{
          fontSize: 120,
          position: 'relative',
          filter: 'drop-shadow(0 10px 30px rgba(255, 204, 0, 0.3))',
        }}>
          👨‍🍳
          <div
            style={{
              position: 'absolute',
              right: -80,
              top: -10,
              fontSize: 70,
            }}
          >
            🍳
          </div>
        </div>
      </div>

      {/* Thought bubbles */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          paddingTop: 20,
          zIndex: 10,
        }}
      >
        {bubbles.map((bubble, i) => (
          <PremiumThoughtBubble
            key={i}
            text={bubble.text}
            icon={bubble.icon}
            delay={bubble.delay}
            mood={bubble.mood as 'neutral' | 'warning' | 'error' | 'success'}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      {/* Bottom text with gradient and glow */}
      <div
        style={{
          textAlign: 'center',
          paddingBottom: 60,
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.textLight} 0%, ${COLORS.accentCyan} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            textShadow: `0 0 20px ${COLORS.accentCyanGlow}, 0 4px 15px rgba(0, 0, 0, 0.4)`,
          }}
        >
          You checked each step. Out loud. That&apos;s debugging.
        </GradientText>
      </div>
    </AbsoluteFill>
  );
};

// Premium thought bubble with glass morphism
const PremiumThoughtBubble: React.FC<{
  text: string;
  icon: string;
  delay: number;
  mood: 'neutral' | 'warning' | 'error' | 'success';
  frame: number;
  fps: number;
}> = ({ text, icon, delay, mood, frame, fps }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const popIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.9 },
  });
  const scale = interpolate(popIn, [0, 1], [0, 1]);
  const wobble = Math.sin(localFrame * 0.08) * 1.5;
  const floatY = Math.sin(localFrame * 0.04) * 4;

  const moodStyles = {
    neutral: {
      border: COLORS.codeBlue,
      glow: COLORS.codeBlueGlow,
      text: COLORS.textLight,
    },
    warning: {
      border: COLORS.warningYellow,
      glow: COLORS.warningYellowGlow,
      text: COLORS.warningYellow,
    },
    error: {
      border: COLORS.errorRed,
      glow: COLORS.errorRedGlow,
      text: COLORS.errorRed,
    },
    success: {
      border: COLORS.successGreen,
      glow: COLORS.successGreenGlow,
      text: COLORS.successGreen,
    },
  };

  const style = moodStyles[mood];

  return (
    <GlassCard
      borderColor={style.border}
      glowColor={style.glow}
      style={{
        transform: `scale(${scale}) rotate(${wobble}deg) translateY(${floatY}px)`,
        padding: '24px 34px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'relative',
      }}
    >
      <span style={{ fontSize: 46, filter: `drop-shadow(0 0 10px ${style.glow})` }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 30,
          color: style.text,
          textShadow: `0 0 15px ${style.glow}, 0 2px 10px rgba(0, 0, 0, 0.3)`,
        }}
      >
        {text}
      </span>
    </GlassCard>
  );
};

// ============ SCENE 3: CODE ============
const Scene3Code: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: 'function cookRice(water, salt) {', delay: 10 },
    { text: '  console.log("Water added:", water)', delay: 30 },
    { text: '  console.log("Salt added:", salt)', delay: 50 },
    { text: '  if (!salt) {', delay: 70 },
    { text: '    console.log("ERROR: No salt!")', delay: 85 },
    { text: '  }', delay: 95 },
    { text: '  return "rice"', delay: 105 },
    { text: '}', delay: 115 },
    { text: 'cookRice("2 cups", false)', delay: 130 },
  ];

  const consoleOutputs = [
    { text: '> Water added: 2 cups', delay: 145, isError: false },
    { text: '> Salt added: false', delay: 155, isError: false },
    { text: '> ERROR: No salt!', delay: 165, isError: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.terminalBg,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Glowing orbs in background */}
      <GlowingOrb
        x="5%"
        y="15%"
        size={150}
        color={COLORS.codePurple}
        glowColor={COLORS.codePurpleGlow}
        frame={frame}
      />
      <GlowingOrb
        x="90%"
        y="80%"
        size={120}
        color={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        frame={frame}
      />

      {/* Editor section (top 55%) with glass morphism */}
      <div
        style={{
          flex: 0.55,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <GlassCard
          borderColor={COLORS.glassBorder}
          style={{
            margin: 20,
            marginBottom: 10,
            flex: 1,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* Editor top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 24px',
              background: 'rgba(0, 0, 0, 0.4)',
              borderBottom: `1px solid ${COLORS.glassBorder}`,
            }}
          >
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
              boxShadow: '0 0 10px rgba(255, 95, 86, 0.5)',
            }} />
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
              boxShadow: '0 0 10px rgba(255, 189, 46, 0.5)',
            }} />
            <div style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#27ca3f',
              boxShadow: '0 0 10px rgba(39, 202, 63, 0.5)',
            }} />
            <span
              style={{
                marginLeft: 16,
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: COLORS.gray,
                textShadow: '0 0 5px rgba(113, 113, 122, 0.3)',
              }}
            >
              cookRice.js
            </span>
          </div>

          {/* Code content */}
          <div style={{ padding: '20px 28px', flex: 1, overflow: 'hidden' }}>
            {codeLines.map((line, i) => (
              <PremiumEditorCodeLine
                key={i}
                text={line.text}
                delay={line.delay}
                lineNumber={i + 1}
                frame={frame}
                fps={fps}
              />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Console section (bottom 45%) with Matrix-style glass morphism */}
      <div
        style={{
          flex: 0.45,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <GlassCard
          borderColor={COLORS.consoleGreen}
          glowColor={COLORS.consoleGreenGlow}
          style={{
            margin: 20,
            marginTop: 10,
            flex: 1,
            borderRadius: 16,
            overflow: 'hidden',
            background: 'rgba(0, 59, 0, 0.1)',
          }}
        >
          {/* Scanlines for terminal effect */}
          <TerminalScanlines frame={frame} intensity={0.05} />

          {/* Console header */}
          <div
            style={{
              padding: '12px 24px',
              borderBottom: `1px solid ${COLORS.consoleGreen}`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(0, 255, 65, 0.05)',
            }}
          >
            <span style={{
              color: COLORS.consoleGreen,
              fontSize: 16,
              textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
            }}>
              ●
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: COLORS.consoleGreen,
                textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
                fontWeight: 600,
              }}
            >
              Console
            </span>
          </div>

          {/* Console output */}
          <div style={{ padding: '20px 28px', flex: 1 }}>
            {consoleOutputs.map((output, i) => (
              <PremiumConsoleOutput
                key={i}
                text={output.text}
                delay={output.delay}
                isError={output.isError}
                frame={frame}
                fps={fps}
              />
            ))}
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// Premium editor code line with enhanced syntax highlighting
const PremiumEditorCodeLine: React.FC<{
  text: string;
  delay: number;
  lineNumber: number;
  frame: number;
  fps: number;
}> = ({ text, delay, lineNumber, frame, fps }) => {
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideX = interpolate(frame, [delay, delay + 15], [-10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const charsToShow = Math.floor(
    interpolate(frame - delay, [0, 25], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);
  const highlighted = highlightPremiumSyntax(displayText);

  if (frame < delay) return <div style={{ height: 40 }} />;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      opacity,
      height: 40,
      transform: `translateX(${slideX}px)`,
    }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          color: COLORS.gray,
          width: 40,
          textAlign: 'right',
          marginRight: 24,
          opacity: 0.4,
          textShadow: `0 0 5px ${COLORS.gray}`,
        }}
      >
        {lineNumber}
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28 }}>
        {highlighted}
      </span>
    </div>
  );
};

// Premium console output with glow
const PremiumConsoleOutput: React.FC<{
  text: string;
  delay: number;
  isError: boolean;
  frame: number;
  fps: number;
}> = ({ text, delay, isError, frame, fps }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const slideIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 180, mass: 1 },
  });
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);
  const slideX = interpolate(slideIn, [0, 1], [-20, 0]);

  const errorPulse = isError ? 1 + Math.sin(localFrame * 0.2) * 0.08 : 1;

  const charsToShow = Math.floor(
    interpolate(localFrame, [0, 18], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);

  const color = isError ? COLORS.errorRed : COLORS.consoleGreen;
  const glow = isError ? COLORS.errorRedGlow : COLORS.consoleGreenGlow;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${errorPulse}) translateX(${slideX}px)`,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 14,
        paddingLeft: isError ? 20 : 0,
        borderLeft: isError ? `4px solid ${color}` : 'none',
        boxShadow: isError ? `0 0 20px ${glow}` : 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
          color: color,
          textShadow: `0 0 15px ${glow}, 0 0 30px ${glow}`,
          fontWeight: isError ? 700 : 500,
        }}
      >
        {displayText}
      </span>
    </div>
  );
};

// Enhanced syntax highlighter with glow effects
const highlightPremiumSyntax = (code: string) => {
  const parts = code.split(/(function|if|return|console\.log|true|false|".*?"|'.*?'|\(|\)|{|})/g);

  return parts.map((part, i) => {
    if (part === 'function' || part === 'if' || part === 'return') {
      return (
        <span
          key={i}
          style={{
            color: COLORS.codePurple,
            textShadow: `0 0 10px ${COLORS.codePurpleGlow}`,
            fontWeight: 600,
          }}
        >
          {part}
        </span>
      );
    }
    if (part === 'console.log') {
      return (
        <span
          key={i}
          style={{
            color: COLORS.warningYellow,
            textShadow: `0 0 15px ${COLORS.warningYellowGlow}, 0 0 30px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}
        >
          {part}
        </span>
      );
    }
    if (part === 'true') {
      return (
        <span
          key={i}
          style={{
            color: COLORS.successGreen,
            textShadow: `0 0 10px ${COLORS.successGreenGlow}`,
          }}
        >
          {part}
        </span>
      );
    }
    if (part === 'false') {
      return (
        <span
          key={i}
          style={{
            color: COLORS.errorRed,
            textShadow: `0 0 10px ${COLORS.errorRedGlow}`,
          }}
        >
          {part}
        </span>
      );
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return (
        <span
          key={i}
          style={{
            color: COLORS.consoleGreen,
            textShadow: `0 0 8px ${COLORS.consoleGreenGlow}`,
          }}
        >
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
};

// ============ SCENE 4: DEBUGGING IN ACTION ============
const Scene4Debugging: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Extended stages for better readability
  const stage1 = frame >= 0 && frame < 70;
  const stage2 = frame >= 70 && frame < 140;
  const stage3 = frame >= 140;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.terminalBg} 0%, ${COLORS.darkGradient2} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient */}
      <AnimatedGradientBg frame={frame} />

      {/* Premium particles */}
      <PremiumFloatingParticles frame={frame} particleType="dot" count={20} />

      {/* Glowing orbs */}
      <GlowingOrb
        x="15%"
        y="25%"
        size={200}
        color={COLORS.errorRed}
        glowColor={COLORS.errorRedGlow}
        frame={frame}
      />
      <GlowingOrb
        x="80%"
        y="70%"
        size={180}
        color={COLORS.successGreen}
        glowColor={COLORS.successGreenGlow}
        frame={frame}
      />

      <div style={{ zIndex: 10 }}>
        {stage1 && <PremiumDebugStage1 frame={frame} fps={fps} />}
        {stage2 && <PremiumDebugStage2 frame={frame - 70} fps={fps} />}
        {stage3 && <PremiumDebugStage3 frame={frame - 140} fps={fps} />}
      </div>
    </AbsoluteFill>
  );
};

// Premium Debug Stage 1
const PremiumDebugStage1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ opacity, textAlign: 'center' }}>
      <GlassCard
        borderColor={COLORS.codeBlue}
        glowColor={COLORS.codeBlueGlow}
        style={{
          padding: '34px 48px',
          marginBottom: 28,
        }}
      >
        <pre
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 32,
            color: COLORS.textLight,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <span style={{
            color: COLORS.codePurple,
            textShadow: `0 0 10px ${COLORS.codePurpleGlow}`,
            fontWeight: 600,
          }}>
            let
          </span> total = 10 +{' '}
          <span style={{
            color: COLORS.consoleGreen,
            textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
          }}>
            &quot;5&quot;
          </span>
          {'\n'}
          <span style={{
            color: COLORS.warningYellow,
            textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}>
            console.log
          </span>
          <span style={{ color: COLORS.gray }}>(</span>
          <span style={{ color: COLORS.consoleGreen }}>&quot;Total is:&quot;</span>, total
          <span style={{ color: COLORS.gray }}>)</span>
        </pre>
      </GlassCard>

      <GlassCard
        borderColor={COLORS.errorRed}
        glowColor={COLORS.errorRedGlow}
        style={{
          padding: '24px 40px',
          marginBottom: 28,
          background: 'rgba(255, 51, 102, 0.05)',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 30,
            color: COLORS.consoleGreen,
            textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
          }}
        >
          {'>'} Total is: <span style={{
            color: COLORS.errorRed,
            textShadow: `0 0 20px ${COLORS.errorRedGlow}, 0 0 40px ${COLORS.errorRedGlow}`,
            fontWeight: 700,
          }}>
            105
          </span>
        </span>
      </GlassCard>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <span style={{ fontSize: 60, filter: 'drop-shadow(0 0 10px rgba(255, 51, 102, 0.5))' }}>
          😕
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            color: COLORS.errorRed,
            textShadow: `0 0 20px ${COLORS.errorRedGlow}`,
            fontWeight: 700,
          }}
        >
          Wait... that&apos;s wrong
        </span>
      </div>
    </div>
  );
};

// Premium Debug Stage 2
const PremiumDebugStage2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const lightbulbScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 180, mass: 0.8 },
  });

  return (
    <div style={{ opacity, textAlign: 'center' }}>
      <GlassCard
        borderColor={COLORS.warningYellow}
        glowColor={COLORS.warningYellowGlow}
        style={{
          padding: '30px 44px',
          marginBottom: 28,
        }}
      >
        <pre
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            color: COLORS.textLight,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <span style={{
            color: COLORS.warningYellow,
            textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}>
            console.log
          </span>
          <span style={{ color: COLORS.gray }}>(</span>
          <span style={{ color: COLORS.consoleGreen }}>&quot;Type of 10:&quot;</span>,{' '}
          <span style={{ color: COLORS.codePurple }}>typeof</span> 10
          <span style={{ color: COLORS.gray }}>)</span>
          {'\n'}
          <span style={{
            color: COLORS.warningYellow,
            textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}>
            console.log
          </span>
          <span style={{ color: COLORS.gray }}>(</span>
          <span style={{ color: COLORS.consoleGreen }}>&quot;Type of &apos;5&apos;:&quot;</span>,{' '}
          <span style={{ color: COLORS.codePurple }}>typeof</span>{' '}
          <span style={{ color: COLORS.consoleGreen }}>&quot;5&quot;</span>
          <span style={{ color: COLORS.gray }}>)</span>
        </pre>
      </GlassCard>

      <GlassCard
        borderColor={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        style={{
          padding: '24px 40px',
          marginBottom: 28,
          background: 'rgba(0, 255, 65, 0.03)',
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              color: COLORS.consoleGreen,
              textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
            }}
          >
            {'>'} Type of 10: <span style={{
              color: COLORS.codeBlue,
              textShadow: `0 0 10px ${COLORS.codeBlueGlow}`,
            }}>
              number
            </span>
          </span>
        </div>
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              color: COLORS.consoleGreen,
              textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
            }}
          >
            {'>'} Type of &apos;5&apos;: <span style={{
              color: COLORS.warningYellow,
              textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
            }}>
              string
            </span>
          </span>
        </div>
      </GlassCard>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <span
          style={{
            fontSize: 60,
            transform: `scale(${Math.min(lightbulbScale, 1)})`,
            filter: lightbulbScale > 0.5
              ? `drop-shadow(0 0 20px ${COLORS.warningYellowGlow}) drop-shadow(0 0 40px ${COLORS.warningYellowGlow})`
              : 'none',
          }}
        >
          💡
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 32,
            color: COLORS.warningYellow,
            textShadow: `0 0 20px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}
        >
          AH. String + number = concat
        </span>
      </div>
    </div>
  );
};

// Premium Debug Stage 3
const PremiumDebugStage3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const showConfetti = frame > 35;

  return (
    <div style={{ opacity, textAlign: 'center', position: 'relative' }}>
      {showConfetti && <PremiumConfetti frame={frame - 35} />}

      <GlassCard
        borderColor={COLORS.successGreen}
        glowColor={COLORS.successGreenGlow}
        style={{
          padding: '34px 48px',
          marginBottom: 28,
          background: 'rgba(0, 255, 136, 0.05)',
        }}
      >
        <pre
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 30,
            color: COLORS.textLight,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <span style={{
            color: COLORS.codePurple,
            textShadow: `0 0 10px ${COLORS.codePurpleGlow}`,
            fontWeight: 600,
          }}>
            let
          </span> total = 10 +{' '}
          <span style={{
            color: COLORS.codeBlue,
            textShadow: `0 0 10px ${COLORS.codeBlueGlow}`,
          }}>
            Number
          </span>
          <span style={{ color: COLORS.gray }}>(</span>
          <span style={{ color: COLORS.consoleGreen }}>&quot;5&quot;</span>
          <span style={{ color: COLORS.gray }}>)</span>
          {'\n'}
          <span style={{
            color: COLORS.warningYellow,
            textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
            fontWeight: 700,
          }}>
            console.log
          </span>
          <span style={{ color: COLORS.gray }}>(</span>
          <span style={{ color: COLORS.consoleGreen }}>&quot;Total is:&quot;</span>, total
          <span style={{ color: COLORS.gray }}>)</span>
        </pre>
      </GlassCard>

      <GlassCard
        borderColor={COLORS.successGreen}
        glowColor={COLORS.successGreenGlow}
        style={{
          padding: '24px 40px',
          marginBottom: 28,
          background: 'rgba(0, 255, 136, 0.08)',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 30,
            color: COLORS.consoleGreen,
            textShadow: `0 0 15px ${COLORS.consoleGreenGlow}`,
          }}
        >
          {'>'} Total is: <span style={{
            color: COLORS.successGreen,
            textShadow: `0 0 20px ${COLORS.successGreenGlow}, 0 0 40px ${COLORS.successGreenGlow}`,
            fontWeight: 700,
          }}>
            15
          </span>
        </span>
      </GlassCard>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <span style={{
          fontSize: 60,
          filter: `drop-shadow(0 0 20px ${COLORS.successGreenGlow})`,
        }}>
          ✅
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 34,
            color: COLORS.successGreen,
            textShadow: `0 0 20px ${COLORS.successGreenGlow}`,
            fontWeight: 700,
          }}
        >
          Bug found. Bug fixed.
        </span>
      </div>
    </div>
  );
};

// Premium confetti with glow effects
const PremiumConfetti: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i * 40) % 1000 - 500,
    speed: 3 + (i % 5),
    color: [
      COLORS.successGreen,
      COLORS.warningYellow,
      COLORS.codeBlue,
      COLORS.codePurple,
      COLORS.accentCyan,
      COLORS.accentPink,
    ][i % 6],
    glowColor: [
      COLORS.successGreenGlow,
      COLORS.warningYellowGlow,
      COLORS.codeBlueGlow,
      COLORS.codePurpleGlow,
      COLORS.accentCyanGlow,
      COLORS.accentPinkGlow,
    ][i % 6],
    rotation: i * 45,
    size: 8 + (i % 3) * 4,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: -150,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {particles.map((p, i) => {
        const y = frame * p.speed;
        const x = p.x + Math.sin(frame * 0.1 + i) * 40;
        const rotate = p.rotation + frame * 8;
        const opacity = Math.max(0, 1 - frame / 70);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: 3,
              transform: `rotate(${rotate}deg)`,
              opacity,
              boxShadow: `0 0 10px ${p.glowColor}, 0 0 20px ${p.glowColor}`,
            }}
          />
        );
      })}
    </div>
  );
};

// ============ SCENE 5: AHA MOMENT ============
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const mainScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 180, mass: 1 },
  });

  const points = [
    { emoji: '🔍', text: 'Check what\'s happening', delay: 20 },
    { emoji: '🐛', text: 'Find where it broke', delay: 35 },
    { emoji: '✅', text: 'Confirm it\'s fixed', delay: 50 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.darkGradient1} 0%, ${COLORS.darkGradient2} 50%, ${COLORS.darkGradient3} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient */}
      <AnimatedGradientBg frame={frame} />

      {/* Premium particles */}
      <PremiumFloatingParticles frame={frame} particleType="log" count={15} />

      {/* Glowing orbs */}
      <GlowingOrb
        x="20%"
        y="20%"
        size={300}
        color={COLORS.warningYellow}
        glowColor={COLORS.warningYellowGlow}
        frame={frame}
      />
      <GlowingOrb
        x="75%"
        y="75%"
        size={280}
        color={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        frame={frame}
      />

      {/* Transformation icon */}
      <PremiumTransformingIcon frame={frame} />

      {/* Main revelation with premium gradient text */}
      <div
        style={{
          transform: `scale(${mainScale})`,
          marginBottom: 60,
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.consoleGreen} 0%, ${COLORS.warningYellow} 50%, ${COLORS.consoleGreen} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 56,
            textShadow: `0 0 30px ${COLORS.consoleGreenGlow}, 0 0 60px ${COLORS.warningYellowGlow}, 0 8px 30px rgba(0, 0, 0, 0.5)`,
            letterSpacing: '-0.02em',
          }}
        >
          console.log = thinking out loud
        </GradientText>
      </div>

      {/* Three points with glass cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 10 }}>
        {points.map((point, i) => {
          const pointOpacity = interpolate(frame, [point.delay, point.delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const pointY = interpolate(frame, [point.delay, point.delay + 15], [30, 0], {
            extrapolateRight: 'clamp',
          });

          const colors = [
            { border: COLORS.codeBlue, glow: COLORS.codeBlueGlow },
            { border: COLORS.errorRed, glow: COLORS.errorRedGlow },
            { border: COLORS.successGreen, glow: COLORS.successGreenGlow },
          ];

          return (
            <GlassCard
              key={i}
              borderColor={colors[i].border}
              glowColor={colors[i].glow}
              style={{
                opacity: pointOpacity,
                transform: `translateY(${pointY}px)`,
                padding: '20px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{
                  fontSize: 42,
                  filter: `drop-shadow(0 0 15px ${colors[i].glow})`,
                }}>
                  {point.emoji}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 34,
                    color: COLORS.textLight,
                    textShadow: `0 0 15px ${colors[i].glow}`,
                  }}
                >
                  {point.text}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Premium transforming icon with glow
const PremiumTransformingIcon: React.FC<{ frame: number }> = ({ frame }) => {
  const morph = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const pulse = 1 + Math.sin(frame * 0.1) * 0.15;

  return (
    <div
      style={{
        marginBottom: 40,
        fontSize: 70,
        transform: `scale(${pulse})`,
        filter: morph < 0.5
          ? `drop-shadow(0 0 20px ${COLORS.codePurpleGlow}) drop-shadow(0 0 40px ${COLORS.codePurpleGlow})`
          : `drop-shadow(0 0 20px ${COLORS.consoleGreenGlow}) drop-shadow(0 0 40px ${COLORS.consoleGreenGlow})`,
      }}
    >
      {morph < 0.5 ? '💭' : '🖥️'}
    </div>
  );
};

// ============ SCENE 6: CTA ============
const Scene6CTA: React.FC<{ fps: number; showFloatingLogs: boolean }> = ({ fps, showFloatingLogs }) => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: 'console.log("Ready to code?")', delay: 0 },
    { text: '', delay: 15 },
    { text: '> Ready to code?', delay: 20, isOutput: true },
  ];

  const logoOpacity = interpolate(frame, [45, 55], [0, 1], { extrapolateRight: 'clamp' });
  const teaserOpacity = interpolate(frame, [55, 65], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.terminalBg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient */}
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.terminalBg, COLORS.matrixDark, COLORS.darkGradient2]}
      />

      {/* Glowing orbs */}
      <GlowingOrb
        x="10%"
        y="30%"
        size={250}
        color={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        frame={frame}
      />
      <GlowingOrb
        x="85%"
        y="60%"
        size={220}
        color={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        frame={frame}
        pulseSpeed={0.04}
      />

      {/* Premium floating log particles */}
      {showFloatingLogs && <PremiumFloatingParticles frame={frame} particleType="log" count={18} />}

      {/* Premium terminal with Matrix-style glass morphism */}
      <GlassCard
        borderColor={COLORS.consoleGreen}
        glowColor={COLORS.consoleGreenGlow}
        style={{
          padding: '32px 44px',
          width: 800,
          background: 'rgba(0, 59, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Terminal scanlines */}
        <TerminalScanlines frame={frame} intensity={0.04} />

        {/* Terminal dots with glow */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
            boxShadow: '0 0 15px rgba(255, 95, 86, 0.6)',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
            boxShadow: '0 0 15px rgba(255, 189, 46, 0.6)',
          }} />
          <div style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#27ca3f',
            boxShadow: '0 0 15px rgba(39, 202, 63, 0.6)',
          }} />
        </div>

        {/* Code lines with premium styling */}
        {codeLines.map((line, i) => {
          const lineOpacity = interpolate(frame, [line.delay, line.delay + 12], [0, 1], {
            extrapolateRight: 'clamp',
          });

          if (!line.text) return <div key={i} style={{ height: 24 }} />;

          const isOutput = 'isOutput' in line && line.isOutput;

          return (
            <div key={i} style={{ opacity: lineOpacity, minHeight: 40 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  color: isOutput ? COLORS.consoleGreen : COLORS.textLight,
                  textShadow: isOutput
                    ? `0 0 15px ${COLORS.consoleGreenGlow}, 0 0 30px ${COLORS.consoleGreenGlow}`
                    : 'none',
                }}
              >
                {isOutput ? (
                  line.text
                ) : (
                  <>
                    <span style={{
                      color: COLORS.warningYellow,
                      textShadow: `0 0 15px ${COLORS.warningYellowGlow}`,
                      fontWeight: 700,
                    }}>
                      console.log
                    </span>
                    <span style={{ color: COLORS.gray }}>(</span>
                    <span style={{
                      color: COLORS.consoleGreen,
                      textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
                    }}>
                      &quot;Ready to code?&quot;
                    </span>
                    <span style={{ color: COLORS.gray }}>)</span>
                  </>
                )}
                {!isOutput && frame - line.delay < 18 && (
                  <span
                    style={{
                      color: COLORS.consoleGreen,
                      opacity: Math.floor((frame - line.delay) / 10) % 2,
                      textShadow: `0 0 10px ${COLORS.consoleGreenGlow}`,
                    }}
                  >
                    |
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </GlassCard>

      {/* Logo with premium gradient and glow */}
      <div
        style={{
          marginTop: 50,
          opacity: logoOpacity,
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.consoleGreen} 0%, ${COLORS.accentCyan} 50%, ${COLORS.consoleGreen} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            letterSpacing: '-0.03em',
            textShadow: `0 0 30px ${COLORS.consoleGreenGlow}, 0 0 60px ${COLORS.consoleGreenGlow}, 0 0 90px ${COLORS.accentCyanGlow}`,
          }}
        >
          DOGM.AI
        </GradientText>
      </div>

      {/* Teaser with glow */}
      <div style={{ marginTop: 24, opacity: teaserOpacity, zIndex: 10 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            color: COLORS.gray,
            textShadow: `0 0 10px rgba(113, 113, 122, 0.5)`,
          }}
        >
          Start debugging your future.
        </span>
      </div>
    </AbsoluteFill>
  );
};
