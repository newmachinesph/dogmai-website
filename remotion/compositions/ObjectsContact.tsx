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
  deepDark: '#050508',
  terminalBg: '#0a0a0f',
  darkPurple: '#1a0a2e',
  midPurple: '#2d1b4e',

  // Primary accent - Indigo/Blue theme
  accentBlue: '#6366f1',
  accentBlueGlow: 'rgba(99, 102, 241, 0.6)',
  accentIndigo: '#818cf8',
  accentIndigoGlow: 'rgba(129, 140, 248, 0.6)',

  // Secondary accents
  accentGreen: '#22c55e',
  accentGreenGlow: 'rgba(34, 197, 94, 0.6)',
  accentYellow: '#fbbf24',
  accentYellowGlow: 'rgba(251, 191, 36, 0.6)',
  accentPink: '#ec4899',
  accentPinkGlow: 'rgba(236, 72, 153, 0.6)',
  accentCyan: '#06b6d4',
  accentCyanGlow: 'rgba(6, 182, 212, 0.6)',
  accentOrange: '#f97316',
  accentOrangeGlow: 'rgba(249, 115, 22, 0.6)',

  // Text colors
  textLight: '#ffffff',
  textMuted: '#94a3b8',
  gray: '#71717a',

  // Glass morphism
  glassWhite: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

// Font faces
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

// Contact data
const CONTACTS = [
  { name: 'Mama', phone: '+63 917 123 4567', email: 'mama@gmail.com', emoji: '👩' },
  { name: 'Barkada GC', phone: '+63 918 888 1234', email: 'squad@gmail.com', emoji: '🎉' },
  { name: 'Boss', phone: '+63 919 555 0000', email: 'boss@company.com', emoji: '👔' },
];

// Props type
interface ObjectsContactProps {
  showFloatingIcons?: boolean;
}

// Spring configs
const SPRING_CONFIGS = {
  bouncy: { damping: 8, stiffness: 120, mass: 0.8 },
  smooth: { damping: 20, stiffness: 200, mass: 1 },
  gentle: { damping: 25, stiffness: 150, mass: 1.2 },
  snappy: { damping: 15, stiffness: 300, mass: 0.5 },
  elastic: { damping: 10, stiffness: 100, mass: 1.5 },
};

export const ObjectsContact: React.FC<ObjectsContactProps> = ({
  showFloatingIcons = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} showFloatingIcons={showFloatingIcons} />
      </Sequence>

      {/* Scene 2: Contact Card Visual (120-330 frames / 4-11 sec) */}
      <Sequence from={120} durationInFrames={210}>
        <Scene2ContactCard fps={fps} />
      </Sequence>

      {/* Scene 3: Now In Code (330-570 frames / 11-19 sec) */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3Code fps={fps} />
      </Sequence>

      {/* Scene 4: Properties Demo (570-810 frames / 19-27 sec) */}
      <Sequence from={570} durationInFrames={240}>
        <Scene4Properties fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (810-930 frames / 27-31 sec) */}
      <Sequence from={810} durationInFrames={120}>
        <Scene5Aha fps={fps} showFloatingIcons={showFloatingIcons} />
      </Sequence>

      {/* Scene 6: CTA (930-1080 frames / 31-36 sec) */}
      <Sequence from={930} durationInFrames={150}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM COMPONENTS ============

// Animated gradient background with conic rotation
const AnimatedGradientBg: React.FC<{ frame: number; colors?: string[]; opacity?: number }> = ({
  frame,
  colors = [COLORS.deepDark, COLORS.darkPurple, COLORS.midPurple],
  opacity = 0.8,
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
        opacity,
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
        filter: 'blur(40px)',
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

// Gradient text
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

// Premium floating particles with contact icons
const PremiumFloatingParticles: React.FC<{
  frame: number;
  particleType?: 'contact' | 'dot';
  count?: number;
}> = ({ frame, particleType = 'contact', count = 12 }) => {
  const icons = ['📱', '👤', '📞', '📧', '💬', '🔔'];
  const colors = [
    { color: COLORS.accentBlue, glow: COLORS.accentBlueGlow },
    { color: COLORS.accentIndigo, glow: COLORS.accentIndigoGlow },
    { color: COLORS.accentCyan, glow: COLORS.accentCyanGlow },
    { color: COLORS.accentGreen, glow: COLORS.accentGreenGlow },
    { color: COLORS.accentPink, glow: COLORS.accentPinkGlow },
    { color: COLORS.accentYellow, glow: COLORS.accentYellowGlow },
  ];

  const particles = Array.from({ length: count }, (_, i) => ({
    icon: icons[i % icons.length],
    x: (i * 8.33) % 100,
    y: (i * 12.5) % 100,
    delay: i * 20,
    colorSet: colors[i % colors.length],
    size: 16 + (i % 3) * 8,
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
            {particleType === 'contact' ? (
              <span
                style={{
                  fontSize: p.size,
                  filter: `drop-shadow(0 0 10px ${p.colorSet.glow})`,
                  transform: `scale(${pulse})`,
                  display: 'inline-block',
                }}
              >
                {p.icon}
              </span>
            ) : (
              <div
                style={{
                  width: p.size * 0.3 * pulse,
                  height: p.size * 0.3 * pulse,
                  borderRadius: '50%',
                  backgroundColor: p.colorSet.color,
                  boxShadow: `0 0 10px ${p.colorSet.glow}, 0 0 20px ${p.colorSet.glow}`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Terminal scanline effect
const TerminalScanlines: React.FC<{ frame: number; intensity?: number }> = ({
  frame,
  intensity = 0.03,
}) => {
  const scanlinePosition = (frame * 2) % 100;

  return (
    <>
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
            ${COLORS.accentBlueGlow} 50%,
            transparent 100%
          )`,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />
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

// Notification popup animation
const NotificationPopup: React.FC<{
  frame: number;
  fps: number;
  delay: number;
  contactName: string;
  emoji: string;
  type: 'call' | 'message' | 'email';
  x: number;
  y: number;
}> = ({ frame, fps, delay, contactName, emoji, type, x, y }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 60) return null;

  const popupSpring = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const fadeOut = interpolate(localFrame, [40, 60], [1, 0], { extrapolateRight: 'clamp' });
  const scale = interpolate(popupSpring, [0, 1], [0.5, 1]);
  const slideY = interpolate(popupSpring, [0, 1], [20, 0]);

  const icons = { call: '📞', message: '💬', email: '📧' };
  const labels = { call: 'Incoming call', message: 'New message', email: 'New email' };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + slideY,
        transform: `scale(${scale})`,
        opacity: fadeOut,
        zIndex: 100,
      }}
    >
      <GlassCard
        style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minWidth: 200,
        }}
        glowColor={COLORS.accentBlueGlow}
      >
        <span style={{ fontSize: 28 }}>{emoji}</span>
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.textLight,
            }}
          >
            {contactName}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: COLORS.textMuted,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>{icons[type]}</span>
            {labels[type]}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// Confetti effect for Aha moment
const ConfettiEffect: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const confettiColors = [
    COLORS.accentBlue,
    COLORS.accentPink,
    COLORS.accentYellow,
    COLORS.accentGreen,
    COLORS.accentCyan,
    COLORS.accentIndigo,
  ];

  const confetti = Array.from({ length: 40 }, (_, i) => {
    const x = 50 + (Math.sin(i * 2.5) * 40);
    const initialY = 50;
    const speed = 2 + (i % 4) * 0.5;
    const y = initialY + localFrame * speed;
    const rotation = (localFrame * (10 + i % 5)) % 360;
    const size = 8 + (i % 3) * 4;
    const drift = Math.sin(localFrame * 0.1 + i) * 30;
    const opacity = interpolate(localFrame, [0, 10, 50, 80], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
    const color = confettiColors[i % confettiColors.length];

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `calc(${x}% + ${drift}px)`,
          top: `${y}%`,
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          borderRadius: 2,
          opacity,
          transform: `rotate(${rotation}deg)`,
          boxShadow: `0 0 ${size}px ${color}`,
        }}
      />
    );
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {confetti}
    </div>
  );
};

// Data pulse ring animation
const DataPulseRing: React.FC<{ frame: number; x: string; y: string; color: string; delay?: number }> = ({
  frame,
  x,
  y,
  color,
  delay = 0,
}) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const rings = [0, 20, 40].map((ringDelay, i) => {
    const ringFrame = localFrame - ringDelay;
    if (ringFrame < 0) return null;

    const scale = interpolate(ringFrame, [0, 60], [0.5, 2], { extrapolateRight: 'clamp' });
    const opacity = interpolate(ringFrame, [0, 20, 60], [0, 0.6, 0], { extrapolateRight: 'clamp' });

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity,
          boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}`,
        }}
      />
    );
  });

  return <>{rings}</>;
};

// ============ SCENE 1: HOOK ============
const Scene1Hook: React.FC<{ fps: number; showFloatingIcons: boolean }> = ({
  fps,
  showFloatingIcons,
}) => {
  const frame = useCurrentFrame();

  // Phone icon bounce in
  const phoneSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const phoneScale = interpolate(phoneSpring, [0, 1], [0.3, 1]);
  const phoneRotate = interpolate(phoneSpring, [0, 1], [-20, 0]);

  // Main text slam
  const textSlam = spring({
    frame: frame - 20,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const textScale = interpolate(textSlam, [0, 1], [1.8, 1]);
  const textOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Sub text
  const subOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [50, 65], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepDark} 0%, ${COLORS.darkPurple} 50%, ${COLORS.midPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedGradientBg frame={frame} />

      {/* Glowing orbs */}
      <GlowingOrb
        x="15%"
        y="25%"
        size={350}
        color={COLORS.accentBlue}
        glowColor={COLORS.accentBlueGlow}
        frame={frame}
      />
      <GlowingOrb
        x="80%"
        y="70%"
        size={300}
        color={COLORS.accentIndigo}
        glowColor={COLORS.accentIndigoGlow}
        frame={frame}
        pulseSpeed={0.03}
      />

      {/* Floating particles */}
      {showFloatingIcons && <PremiumFloatingParticles frame={frame} count={18} />}

      {/* Phone icon with contacts */}
      <div
        style={{
          transform: `scale(${phoneScale}) rotate(${phoneRotate}deg)`,
          marginBottom: 40,
          position: 'relative',
          zIndex: 10,
          filter: `drop-shadow(0 20px 60px ${COLORS.accentBlueGlow})`,
        }}
      >
        <div style={{ fontSize: 140, position: 'relative' }}>
          📱
          {/* Data pulse rings */}
          <DataPulseRing frame={frame} x="50%" y="50%" color={COLORS.accentBlue} delay={20} />
        </div>
        {/* Contact bubbles */}
        <ContactBubbles frame={frame} fps={fps} />
      </div>

      {/* Notification popups */}
      <NotificationPopup
        frame={frame}
        fps={fps}
        delay={40}
        contactName="Mama"
        emoji="👩"
        type="call"
        x={150}
        y={300}
      />
      <NotificationPopup
        frame={frame}
        fps={fps}
        delay={55}
        contactName="Barkada GC"
        emoji="🎉"
        type="message"
        x={700}
        y={400}
      />

      {/* Main text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.accentBlue} 50%, ${COLORS.accentIndigo} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            textShadow: `0 0 30px ${COLORS.accentBlueGlow}, 0 0 60px ${COLORS.accentIndigoGlow}, 0 4px 20px rgba(0, 0, 0, 0.5)`,
            letterSpacing: '-0.02em',
          }}
        >
          You already use objects.
        </GradientText>
      </div>

      {/* Sub text */}
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
            fontSize: 44,
            color: COLORS.accentCyan,
            textShadow: `0 0 20px ${COLORS.accentCyanGlow}, 0 0 40px ${COLORS.accentCyanGlow}`,
            letterSpacing: '-0.01em',
          }}
        >
          Every time you save a contact.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Contact bubbles floating around phone
const ContactBubbles: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const bubbles = [
    { emoji: '👩', x: -70, y: -50, delay: 0 },
    { emoji: '👔', x: 80, y: -30, delay: 10 },
    { emoji: '🎉', x: 90, y: 90, delay: 20 },
  ];

  return (
    <>
      {bubbles.map((bubble, i) => {
        const bubbleSpring = spring({
          frame: frame - 30 - bubble.delay,
          fps,
          config: SPRING_CONFIGS.bouncy,
        });
        const scale = interpolate(bubbleSpring, [0, 1], [0, 1]);
        const floatY = Math.sin((frame + bubble.delay) * 0.08) * 8;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: bubble.x,
              top: bubble.y + floatY,
              transform: `scale(${Math.min(scale, 1)})`,
              fontSize: 42,
              filter: `drop-shadow(0 0 15px ${COLORS.accentBlueGlow})`,
            }}
          >
            {bubble.emoji}
          </div>
        );
      })}
    </>
  );
};

// ============ SCENE 2: CONTACT CARD VISUAL ============
const Scene2ContactCard: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Phone mockup appearance
  const phoneSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.elastic,
  });
  const phoneScale = interpolate(phoneSpring, [0, 1], [0.4, 1]);
  const phoneRotate = interpolate(phoneSpring, [0, 0.6, 1], [10, -3, 0]);

  // Bottom text
  const bottomOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepDark} 0%, ${COLORS.darkPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.deepDark, COLORS.midPurple, COLORS.darkPurple]}
      />

      {/* Glowing orbs */}
      <GlowingOrb
        x="20%"
        y="40%"
        size={400}
        color={COLORS.accentGreen}
        glowColor={COLORS.accentGreenGlow}
        frame={frame}
      />
      <GlowingOrb
        x="80%"
        y="60%"
        size={350}
        color={COLORS.accentCyan}
        glowColor={COLORS.accentCyanGlow}
        frame={frame}
        pulseSpeed={0.04}
      />

      {/* Phone with contact card */}
      <div
        style={{
          transform: `scale(${phoneScale}) rotate(${phoneRotate}deg)`,
          filter: 'drop-shadow(0 30px 80px rgba(0, 0, 0, 0.6))',
        }}
      >
        <PhoneMockup frame={frame} fps={fps} />
      </div>

      {/* Bottom text */}
      <div
        style={{
          marginTop: 50,
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 38,
            color: COLORS.textLight,
            textShadow: `0 0 20px ${COLORS.accentGreenGlow}, 0 4px 30px rgba(0, 0, 0, 0.5)`,
          }}
        >
          One contact.{' '}
          <GradientText gradient={`linear-gradient(90deg, ${COLORS.accentGreen}, ${COLORS.accentCyan})`}>
            Multiple properties.
          </GradientText>{' '}
          That&apos;s an{' '}
          <GradientText gradient={`linear-gradient(90deg, ${COLORS.accentBlue}, ${COLORS.accentIndigo})`}>
            object.
          </GradientText>
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Phone mockup with contact card
const PhoneMockup: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const pulse = 1 + Math.sin(frame * 0.05) * 0.02;

  const contact = CONTACTS[0]; // Mama contact

  return (
    <GlassCard
      style={{
        width: 420,
        borderRadius: 48,
        overflow: 'hidden',
        border: `2px solid ${COLORS.accentBlue}`,
        transform: `scale(${pulse})`,
      }}
      glowColor={COLORS.accentBlueGlow}
    >
      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          background: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: COLORS.textLight,
            fontWeight: 600,
          }}
        >
          9:41
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 12, color: COLORS.textLight }}>📶</span>
          <span style={{ fontSize: 12, color: COLORS.textLight }}>🔋</span>
        </div>
      </div>

      {/* Contact header */}
      <div
        style={{
          padding: '30px 24px',
          textAlign: 'center',
          borderBottom: `1px solid ${COLORS.glassBorder}`,
          background: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            fontSize: 100,
            marginBottom: 20,
            filter: `drop-shadow(0 0 20px ${COLORS.accentPinkGlow})`,
          }}
        >
          {contact.emoji}
        </div>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: 42,
            color: COLORS.textLight,
            margin: 0,
            textShadow: `0 0 15px ${COLORS.accentBlueGlow}`,
          }}
        >
          {contact.name}
        </h2>
      </div>

      {/* Contact details */}
      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ContactPropertyRow
          icon="📞"
          label="phone"
          value={contact.phone}
          frame={frame}
          fps={fps}
          delay={40}
        />
        <ContactPropertyRow
          icon="📧"
          label="email"
          value={contact.email}
          frame={frame}
          fps={fps}
          delay={70}
        />
      </div>
    </GlassCard>
  );
};

// Contact property row
const ContactPropertyRow: React.FC<{
  icon: string;
  label: string;
  value: string;
  frame: number;
  fps: number;
  delay: number;
}> = ({ icon, label, value, frame, fps, delay }) => {
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const translateX = interpolate(slideIn, [0, 1], [100, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  const isActive = frame > delay + 30;
  const glowIntensity = isActive ? 0.4 + Math.sin(frame * 0.2) * 0.2 : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '20px 24px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        opacity,
        transform: `translateX(${translateX}px)`,
        border: isActive ? `1px solid ${COLORS.accentGreen}` : '1px solid transparent',
        boxShadow: isActive ? `0 0 ${20 * glowIntensity}px ${COLORS.accentGreenGlow}` : 'none',
      }}
    >
      <span style={{ fontSize: 36, filter: `drop-shadow(0 0 8px ${COLORS.accentBlueGlow})` }}>
        {icon}
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            color: COLORS.accentYellow,
            textShadow: `0 0 8px ${COLORS.accentYellowGlow}`,
            marginBottom: 6,
          }}
        >
          .{label}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.textLight,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

// ============ SCENE 3: CODE ============
const Scene3Code: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Phone shrinks to side
  const phoneScale = interpolate(frame, [0, 40], [1, 0.55], { extrapolateRight: 'clamp' });
  const phoneX = interpolate(frame, [0, 40], [0, -250], { extrapolateRight: 'clamp' });

  // Code appears
  const codeOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });
  const codeX = interpolate(frame, [30, 50], [100, 0], { extrapolateRight: 'clamp' });

  const codeLines = [
    { text: 'let mama = {', delay: 50 },
    { text: '  name: "Mama",', delay: 70, highlight: 'name' },
    { text: '  phone: "+63 917 123 4567",', delay: 90, highlight: 'phone' },
    { text: '  email: "mama@gmail.com"', delay: 110, highlight: 'email' },
    { text: '}', delay: 130 },
  ];

  // Access examples
  const accessLines = [
    { text: 'mama.name   // "Mama"', delay: 160 },
    { text: 'mama.phone  // "+63 917..."', delay: 190 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.terminalBg,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        gap: 30,
      }}
    >
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.terminalBg, COLORS.darkPurple, COLORS.deepDark]}
        opacity={0.5}
      />

      {/* Glowing orbs */}
      <GlowingOrb
        x="10%"
        y="30%"
        size={200}
        color={COLORS.accentBlue}
        glowColor={COLORS.accentBlueGlow}
        frame={frame}
      />
      <GlowingOrb
        x="90%"
        y="70%"
        size={180}
        color={COLORS.accentYellow}
        glowColor={COLORS.accentYellowGlow}
        frame={frame}
      />

      {/* Mini phone */}
      <div
        style={{
          transform: `scale(${phoneScale}) translateX(${phoneX}px)`,
          filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.5))',
          zIndex: 10,
        }}
      >
        <MiniPhoneContact frame={frame} fps={fps} />
      </div>

      {/* Code block */}
      <div
        style={{
          opacity: codeOpacity,
          transform: `translateX(${codeX}px)`,
          zIndex: 10,
        }}
      >
        <GlassCard
          style={{
            padding: '36px 48px',
            width: 640,
          }}
          glowColor={COLORS.accentBlueGlow}
        >
          <TerminalScanlines frame={frame} intensity={0.03} />

          {/* Object declaration */}
          {codeLines.map((line, i) => (
            <ObjectCodeLine key={i} {...line} frame={frame} fps={fps} />
          ))}

          <div style={{ height: 24 }} />

          {/* Access examples */}
          {accessLines.map((line, i) => (
            <ObjectCodeLine key={`access-${i}`} {...line} frame={frame} fps={fps} isAccess />
          ))}
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// Mini phone with highlighted properties
const MiniPhoneContact: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const contact = CONTACTS[0];

  return (
    <GlassCard
      style={{
        width: 280,
        borderRadius: 32,
        overflow: 'hidden',
        border: `2px solid ${COLORS.accentBlue}`,
      }}
      glowColor={COLORS.accentBlueGlow}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ fontSize: 50, marginBottom: 8 }}>{contact.emoji}</div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 24,
            color: COLORS.textLight,
          }}
        >
          {contact.name}
        </div>
      </div>

      {/* Properties */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'phone', value: contact.phone, delay: 70 },
          { label: 'email', value: contact.email, delay: 85 },
        ].map((prop, i) => {
          const isHighlighted = frame >= prop.delay && frame < prop.delay + 20;
          const pulse = isHighlighted ? 1 + Math.sin((frame - prop.delay) * 0.4) * 0.05 : 1;

          return (
            <div
              key={i}
              style={{
                padding: '12px 14px',
                background: isHighlighted
                  ? `rgba(99, 102, 241, 0.2)`
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: 10,
                border: isHighlighted
                  ? `1px solid ${COLORS.accentBlue}`
                  : '1px solid transparent',
                transform: `scale(${pulse})`,
                boxShadow: isHighlighted ? `0 0 20px ${COLORS.accentBlueGlow}` : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: COLORS.accentYellow,
                  textShadow: `0 0 6px ${COLORS.accentYellowGlow}`,
                }}
              >
                .{prop.label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: COLORS.textLight,
                  marginTop: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {prop.value}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

// Object code line with syntax highlighting
const ObjectCodeLine: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
  highlight?: string;
  isAccess?: boolean;
}> = ({ text, delay, frame, fps, isAccess }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return <div style={{ height: 44 }} />;

  const slideIn = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Typewriter effect
  const charsToShow = Math.floor(
    interpolate(localFrame, [0, 20], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);

  const highlighted = highlightObjectSyntax(displayText, isAccess);

  return (
    <div style={{ opacity, minHeight: 44 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28 }}>
        {highlighted}
        {localFrame < 20 && (
          <span
            style={{
              color: COLORS.accentBlue,
              opacity: Math.floor(localFrame / 10) % 2,
              textShadow: `0 0 10px ${COLORS.accentBlueGlow}`,
            }}
          >
            |
          </span>
        )}
      </span>
    </div>
  );
};

// Syntax highlighter for objects
const highlightObjectSyntax = (code: string, isAccess?: boolean) => {
  if (isAccess) {
    // Handle access patterns: mama.name // "Mama"
    const parts = code.split(/(mama|\.name|\.phone|\.email|\/\/.*)/);
    return parts.map((part, i) => {
      if (part === 'mama') {
        return (
          <span key={i} style={{ color: COLORS.textLight, textShadow: `0 0 10px ${COLORS.accentBlueGlow}` }}>
            {part}
          </span>
        );
      }
      if (part.startsWith('.')) {
        return (
          <span key={i} style={{ color: COLORS.accentYellow, textShadow: `0 0 12px ${COLORS.accentYellowGlow}` }}>
            {part}
          </span>
        );
      }
      if (part.startsWith('//')) {
        return (
          <span key={i} style={{ color: COLORS.gray, fontStyle: 'italic' }}>
            {part}
          </span>
        );
      }
      return <span key={i} style={{ color: COLORS.textLight }}>{part}</span>;
    });
  }

  // Handle object declaration
  const parts = code.split(/(let|mama|{|}|:|,|".*?")/);
  return parts.map((part, i) => {
    if (part === 'let') {
      return (
        <span key={i} style={{ color: COLORS.accentBlue, textShadow: `0 0 15px ${COLORS.accentBlueGlow}`, fontWeight: 600 }}>
          {part}
        </span>
      );
    }
    if (part === 'mama') {
      return <span key={i} style={{ color: COLORS.textLight }}>{part}</span>;
    }
    if (part === '{' || part === '}') {
      return <span key={i} style={{ color: COLORS.gray }}>{part}</span>;
    }
    if (part === ':') {
      return <span key={i} style={{ color: COLORS.accentPink }}>{part}</span>;
    }
    if (part.startsWith('"')) {
      return (
        <span key={i} style={{ color: COLORS.accentGreen, textShadow: `0 0 10px ${COLORS.accentGreenGlow}` }}>
          {part}
        </span>
      );
    }
    // Property names
    if (part.trim().match(/^(name|phone|email)$/)) {
      return (
        <span key={i} style={{ color: COLORS.accentYellow, textShadow: `0 0 10px ${COLORS.accentYellowGlow}` }}>
          {part}
        </span>
      );
    }
    return <span key={i} style={{ color: COLORS.textLight }}>{part}</span>;
  });
};

// ============ SCENE 4: PROPERTIES DEMO ============
const Scene4Properties: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Three contacts appear in sequence
  const contactDelays = [0, 60, 120];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepDark} 0%, ${COLORS.darkPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <AnimatedGradientBg frame={frame} />

      {/* Glowing orbs */}
      <GlowingOrb
        x="20%"
        y="30%"
        size={300}
        color={COLORS.accentPink}
        glowColor={COLORS.accentPinkGlow}
        frame={frame}
      />
      <GlowingOrb
        x="80%"
        y="70%"
        size={280}
        color={COLORS.accentCyan}
        glowColor={COLORS.accentCyanGlow}
        frame={frame}
      />

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 52,
          color: COLORS.textLight,
          marginBottom: 60,
          textShadow: `0 0 20px ${COLORS.accentBlueGlow}`,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          zIndex: 10,
        }}
      >
        Objects can hold{' '}
        <GradientText gradient={`linear-gradient(90deg, ${COLORS.accentYellow}, ${COLORS.accentOrange})`}>
          any data
        </GradientText>
      </h2>

      {/* Contact cards grid */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          zIndex: 10,
        }}
      >
        {CONTACTS.map((contact, i) => (
          <PropertyContactCard
            key={i}
            contact={contact}
            delay={contactDelays[i]}
            frame={frame}
            fps={fps}
            index={i}
          />
        ))}
      </div>

      {/* Bottom code example */}
      <GlassCard
        style={{
          marginTop: 50,
          padding: '24px 36px',
          opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' }),
        }}
        glowColor={COLORS.accentGreenGlow}
      >
        <code
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 28,
            color: COLORS.textLight,
          }}
        >
          contacts[0]
          <span style={{ color: COLORS.accentYellow, textShadow: `0 0 10px ${COLORS.accentYellowGlow}` }}>
            .name
          </span>
          <span style={{ color: COLORS.gray }}> // </span>
          <span style={{ color: COLORS.accentGreen, textShadow: `0 0 10px ${COLORS.accentGreenGlow}` }}>
            &quot;Mama&quot;
          </span>
        </code>
      </GlassCard>
    </AbsoluteFill>
  );
};

// Property contact card
const PropertyContactCard: React.FC<{
  contact: (typeof CONTACTS)[0];
  delay: number;
  frame: number;
  fps: number;
  index: number;
}> = ({ contact, delay, frame, fps, index }) => {
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });
  const scale = interpolate(cardSpring, [0, 1], [0.5, 1]);
  const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

  const colors = [
    { border: COLORS.accentPink, glow: COLORS.accentPinkGlow },
    { border: COLORS.accentYellow, glow: COLORS.accentYellowGlow },
    { border: COLORS.accentCyan, glow: COLORS.accentCyanGlow },
  ];

  const colorSet = colors[index % colors.length];

  return (
    <GlassCard
      style={{
        width: 300,
        padding: '28px',
        transform: `scale(${Math.min(scale, 1)})`,
        opacity,
        border: `2px solid ${colorSet.border}`,
      }}
      glowColor={colorSet.glow}
    >
      {/* Avatar */}
      <div
        style={{
          fontSize: 70,
          textAlign: 'center',
          marginBottom: 20,
          filter: `drop-shadow(0 0 15px ${colorSet.glow})`,
        }}
      >
        {contact.emoji}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.textLight,
          textAlign: 'center',
          marginBottom: 20,
          textShadow: `0 0 10px ${colorSet.glow}`,
        }}
      >
        {contact.name}
      </div>

      {/* Properties */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: COLORS.accentYellow,
            }}
          >
            .phone
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: COLORS.textMuted }}>
            {contact.phone.substring(0, 12)}...
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: COLORS.accentYellow,
            }}
          >
            .email
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: COLORS.textMuted }}>
            {contact.email.substring(0, 12)}...
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

// ============ SCENE 5: AHA MOMENT ============
const Scene5Aha: React.FC<{ fps: number; showFloatingIcons: boolean }> = ({
  fps,
  showFloatingIcons,
}) => {
  const frame = useCurrentFrame();

  // Main text scale
  const mainScale = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.elastic,
  });

  const points = [
    { emoji: '📦', text: 'Group related data together', delay: 25, color: COLORS.accentBlue, glow: COLORS.accentBlueGlow },
    { emoji: '🔑', text: 'Access with dot notation', delay: 50, color: COLORS.accentYellow, glow: COLORS.accentYellowGlow },
    { emoji: '🔄', text: 'Update properties anytime', delay: 75, color: COLORS.accentGreen, glow: COLORS.accentGreenGlow },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepDark} 0%, ${COLORS.darkPurple} 50%, ${COLORS.midPurple} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} />
      {showFloatingIcons && <PremiumFloatingParticles frame={frame} particleType="dot" count={25} />}

      {/* Multiple glowing orbs */}
      <GlowingOrb x="20%" y="25%" size={400} color={COLORS.accentBlue} glowColor={COLORS.accentBlueGlow} frame={frame} />
      <GlowingOrb x="80%" y="75%" size={350} color={COLORS.accentIndigo} glowColor={COLORS.accentIndigoGlow} frame={frame} />

      {/* Main revelation */}
      <div
        style={{
          transform: `scale(${mainScale})`,
          marginBottom: 60,
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.accentBlue} 50%, ${COLORS.accentIndigo} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 68,
            textShadow: `0 0 40px ${COLORS.accentBlueGlow}, 0 0 80px ${COLORS.accentIndigoGlow}`,
            letterSpacing: '-0.02em',
          }}
        >
          An object = a contact card.
        </GradientText>
      </div>

      {/* Three points */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, zIndex: 10 }}>
        {points.map((point, i) => {
          const pointOpacity = interpolate(frame, [point.delay, point.delay + 15], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const pointY = interpolate(frame, [point.delay, point.delay + 15], [30, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <GlassCard
              key={i}
              style={{
                opacity: pointOpacity,
                transform: `translateY(${pointY}px)`,
                padding: '24px 40px',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
              borderColor={point.color}
              glowColor={point.glow}
            >
              <span
                style={{
                  fontSize: 52,
                  filter: `drop-shadow(0 0 15px ${point.glow})`,
                }}
              >
                {point.emoji}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 38,
                  color: COLORS.textLight,
                  textShadow: `0 0 15px ${point.glow}`,
                }}
              >
                {point.text}
              </span>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: CTA ============
const Scene6CTA: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const codeLines = [
    { text: 'yourFuture = {', delay: 0 },
    { text: '  skill: "coding",', delay: 15 },
    { text: '  mentor: "DOGM.AI"', delay: 30 },
    { text: '}', delay: 45 },
  ];

  const logoOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({
    frame: frame - 70,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const teaserOpacity = interpolate(frame, [100, 115], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.terminalBg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg
        frame={frame}
        colors={[COLORS.terminalBg, COLORS.darkPurple, COLORS.deepDark]}
        opacity={0.6}
      />

      {/* Glowing orbs */}
      <GlowingOrb
        x="15%"
        y="35%"
        size={300}
        color={COLORS.accentBlue}
        glowColor={COLORS.accentBlueGlow}
        frame={frame}
      />
      <GlowingOrb
        x="85%"
        y="65%"
        size={280}
        color={COLORS.accentIndigo}
        glowColor={COLORS.accentIndigoGlow}
        frame={frame}
      />

      {/* Terminal */}
      <GlassCard
        style={{
          padding: '36px 52px',
          width: 820,
          position: 'relative',
        }}
        glowColor={COLORS.accentBlueGlow}
      >
        <TerminalScanlines frame={frame} intensity={0.04} />

        {/* Terminal dots */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
              boxShadow: '0 0 15px rgba(255, 95, 86, 0.6)',
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
              boxShadow: '0 0 15px rgba(255, 189, 46, 0.6)',
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#27ca3f',
              boxShadow: '0 0 15px rgba(39, 202, 63, 0.6)',
            }}
          />
        </div>

        {/* Code lines */}
        {codeLines.map((line, i) => {
          const lineOpacity = interpolate(frame, [line.delay, line.delay + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div key={i} style={{ opacity: lineOpacity, minHeight: 48 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 32,
                  color: COLORS.textLight,
                }}
              >
                {highlightCTASyntax(line.text)}
              </span>
            </div>
          );
        })}
      </GlassCard>

      {/* Logo */}
      <div
        style={{
          marginTop: 50,
          opacity: logoOpacity,
          transform: `scale(${Math.min(logoScale, 1)})`,
          zIndex: 10,
        }}
      >
        <GradientText
          gradient={`linear-gradient(90deg, ${COLORS.accentBlue} 0%, ${COLORS.accentIndigo} 50%, ${COLORS.accentCyan} 100%)`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 80,
            letterSpacing: '-0.03em',
            textShadow: `0 0 30px ${COLORS.accentBlueGlow}, 0 0 60px ${COLORS.accentIndigoGlow}, 0 0 90px ${COLORS.accentCyanGlow}`,
          }}
        >
          DOGM.AI
        </GradientText>
      </div>

      {/* Teaser */}
      <div style={{ marginTop: 28, opacity: teaserOpacity, zIndex: 10 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 30,
            color: COLORS.textMuted,
            textShadow: `0 0 10px rgba(148, 163, 184, 0.5)`,
          }}
        >
          Start organizing your data.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// CTA syntax highlighter
const highlightCTASyntax = (code: string) => {
  if (code.includes('yourFuture')) {
    return (
      <>
        <span style={{ color: COLORS.accentBlue, textShadow: `0 0 15px ${COLORS.accentBlueGlow}`, fontWeight: 600 }}>
          yourFuture
        </span>
        <span style={{ color: COLORS.textLight }}> = </span>
        <span style={{ color: COLORS.gray }}>{'{'}</span>
      </>
    );
  }
  if (code.includes('skill')) {
    return (
      <>
        <span style={{ color: COLORS.textLight }}>  </span>
        <span style={{ color: COLORS.accentYellow, textShadow: `0 0 10px ${COLORS.accentYellowGlow}` }}>skill</span>
        <span style={{ color: COLORS.accentPink }}>:</span>
        <span style={{ color: COLORS.textLight }}> </span>
        <span style={{ color: COLORS.accentGreen, textShadow: `0 0 10px ${COLORS.accentGreenGlow}` }}>&quot;coding&quot;</span>
        <span style={{ color: COLORS.gray }}>,</span>
      </>
    );
  }
  if (code.includes('mentor')) {
    return (
      <>
        <span style={{ color: COLORS.textLight }}>  </span>
        <span style={{ color: COLORS.accentYellow, textShadow: `0 0 10px ${COLORS.accentYellowGlow}` }}>mentor</span>
        <span style={{ color: COLORS.accentPink }}>:</span>
        <span style={{ color: COLORS.textLight }}> </span>
        <span
          style={{
            background: `linear-gradient(90deg, ${COLORS.accentBlue}, ${COLORS.accentIndigo})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            filter: `drop-shadow(0 0 15px ${COLORS.accentBlueGlow})`,
          }}
        >
          &quot;DOGM.AI&quot;
        </span>
      </>
    );
  }
  if (code === '}') {
    return <span style={{ color: COLORS.gray }}>{'}'}</span>;
  }
  return <span style={{ color: COLORS.textLight }}>{code}</span>;
};
