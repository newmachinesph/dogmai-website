import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';

// Premium color palette with glow variants
const COLORS = {
  // Deep cosmic backgrounds
  deepSpace: '#0a0a0f',
  darkPurple: '#1a0a1f',
  darkBrown: '#1c1005',
  darkerBrown: '#0c0602',

  // Warm glowing accents
  accentOrange: '#ff6b35',
  accentOrangeGlow: 'rgba(255, 107, 53, 0.5)',
  accentYellow: '#fbbf24',
  accentYellowGlow: 'rgba(251, 191, 36, 0.5)',
  accentGold: '#f59e0b',
  accentGoldGlow: 'rgba(245, 158, 11, 0.4)',

  // Code highlighting
  codeBlue: '#60a5fa',
  codeBlueGlow: 'rgba(96, 165, 250, 0.5)',
  codeCyan: '#22d3ee',
  codeCyanGlow: 'rgba(34, 211, 238, 0.5)',
  codeGreen: '#4ade80',
  codeGreenGlow: 'rgba(74, 222, 128, 0.5)',
  codePurple: '#a78bfa',
  codePurpleGlow: 'rgba(167, 139, 250, 0.5)',

  // Text colors
  textLight: '#ffffff',
  textGlow: 'rgba(255, 255, 255, 0.8)',
  textDim: '#9ca3af',

  // Glass morphism
  glassLight: 'rgba(255, 255, 255, 0.1)',
  glassDark: 'rgba(0, 0, 0, 0.4)',
  glassBorder: 'rgba(255, 255, 255, 0.18)',
};

// Font faces
const fontFaces = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
`;

// Props type
interface FunctionsRecipeProps {
  showSteamParticles?: boolean;
}

export const FunctionsRecipe: React.FC<FunctionsRecipeProps> = ({
  showSteamParticles = true,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Scene 1: Hook (0-120 frames / 0-4 sec) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook fps={fps} />
      </Sequence>

      {/* Scene 2: The Recipe Card (120-330 frames / 4-11 sec) */}
      <Sequence from={120} durationInFrames={210}>
        <Scene2RecipeCard fps={fps} />
      </Sequence>

      {/* Scene 3: Now In Code (330-570 frames / 11-19 sec) */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3Code fps={fps} showSteamParticles={showSteamParticles} />
      </Sequence>

      {/* Scene 4: Calling The Function (570-780 frames / 19-26 sec) */}
      <Sequence from={570} durationInFrames={210}>
        <Scene4Calls fps={fps} />
      </Sequence>

      {/* Scene 5: The Aha Moment (780-900 frames / 26-30 sec) */}
      <Sequence from={780} durationInFrames={120}>
        <Scene5Aha fps={fps} />
      </Sequence>

      {/* Scene 6: CTA (900-1050 frames / 30-35 sec) */}
      <Sequence from={900} durationInFrames={150}>
        <Scene6CTA fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ PREMIUM COMPONENTS ============

// Animated gradient background with conic rotation
const AnimatedGradientBg: React.FC<{ frame: number; variant?: 'warm' | 'cool' | 'dark' }> = ({
  frame,
  variant = 'warm'
}) => {
  const rotation = (frame * 0.5) % 360;

  const gradients = {
    warm: `conic-gradient(from ${rotation}deg at 50% 50%,
      ${COLORS.deepSpace},
      ${COLORS.darkBrown},
      #2d1810,
      ${COLORS.accentOrange}33,
      ${COLORS.darkBrown},
      ${COLORS.deepSpace})`,
    cool: `conic-gradient(from ${rotation}deg at 50% 50%,
      ${COLORS.deepSpace},
      ${COLORS.darkPurple},
      #1e1b4b,
      ${COLORS.codeBlue}33,
      ${COLORS.darkPurple},
      ${COLORS.deepSpace})`,
    dark: `conic-gradient(from ${rotation}deg at 50% 50%,
      ${COLORS.deepSpace},
      #0f0f14,
      #1a1a24,
      ${COLORS.accentGold}22,
      #0f0f14,
      ${COLORS.deepSpace})`,
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: gradients[variant],
        opacity: 0.6,
        filter: 'blur(80px)',
      }}
    />
  );
};

// Premium floating particles with multi-color glow
const PremiumFloatingParticles: React.FC<{ frame: number; colors?: string[] }> = ({
  frame,
  colors = [COLORS.accentOrange, COLORS.accentYellow, COLORS.codeCyan, COLORS.codePurple]
}) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    color: colors[i % colors.length],
    colorGlow: colors[i % colors.length] + '80',
    x: (i * 73) % 100,
    y: (i * 131) % 100,
    delay: i * 17,
    speed: 0.2 + (i % 5) * 0.15,
    size: 3 + (i % 4),
    orbitRadius: 20 + (i % 3) * 15,
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
        const yBase = ((frame + p.delay) * p.speed) % 120 - 10;
        const xOffset = Math.sin((frame + p.delay) * 0.02) * p.orbitRadius;
        const yOffset = Math.cos((frame + p.delay) * 0.03) * (p.orbitRadius * 0.5);
        const x = p.x + xOffset;
        const y = yBase + yOffset;
        const opacity = interpolate(y, [-5, 30, 80, 110], [0, 0.8, 0.6, 0]);
        const scale = interpolate(y, [0, 50, 100], [0.5, 1, 0.7]);

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
              boxShadow: `
                0 0 ${p.size * 3}px ${p.colorGlow},
                0 0 ${p.size * 6}px ${p.colorGlow},
                0 0 ${p.size * 9}px ${p.color}40
              `,
              filter: 'blur(0.5px)',
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
}> = ({ x, y, size, color, intensity = 1 }) => {
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
        opacity: 0.4 * intensity,
        filter: `blur(${size * 0.4}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Glass card component with morphism effects
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  animated?: boolean;
  frame?: number;
}> = ({ children, style, glowColor = COLORS.accentOrange, animated = false, frame = 0 }) => {
  const glowIntensity = animated ? 0.5 + Math.sin(frame * 0.1) * 0.3 : 0.5;

  return (
    <div
      style={{
        background: `${COLORS.glassDark}`,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${COLORS.glassBorder}`,
        borderRadius: 24,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 0 60px ${glowColor}${Math.floor(glowIntensity * 25).toString(16).padStart(2, '0')}
        `,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Glass shine effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};

// Gradient text effect
const GradientText: React.FC<{
  children: string;
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

// Enhanced spring animation configs
const springConfigs = {
  bouncy: { damping: 8, stiffness: 200, mass: 0.8 },
  smooth: { damping: 20, stiffness: 100, mass: 1 },
  snappy: { damping: 15, stiffness: 180, mass: 0.5 },
  elastic: { damping: 6, stiffness: 150, mass: 1.2 },
  gentle: { damping: 25, stiffness: 80, mass: 1.5 },
};

// ============ SCENE 1: HOOK ============
const Scene1Hook: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Recipe card/cookbook drops in with elastic bounce
  const bookDrop = spring({
    frame,
    fps,
    config: springConfigs.elastic,
  });
  const bookY = interpolate(bookDrop, [0, 1], [-300, 0]);
  const bookRotate = interpolate(bookDrop, [0, 1], [-25, 0]);
  const bookScale = interpolate(bookDrop, [0, 1], [0.7, 1]);

  // Main text slams in
  const textSlam = spring({
    frame: frame - 15,
    fps,
    config: springConfigs.snappy,
  });
  const textScale = interpolate(textSlam, [0, 1], [1.8, 1]);
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Sub text fades in
  const subOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [45, 65], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, ${COLORS.darkBrown} 50%, #2d1810 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Animated gradient background */}
      <AnimatedGradientBg frame={frame} variant="warm" />

      {/* Glowing orbs for ambient lighting */}
      <GlowingOrb x="10%" y="20%" size={400} color={COLORS.accentOrange} intensity={0.6} />
      <GlowingOrb x="80%" y="70%" size={350} color={COLORS.accentYellow} intensity={0.5} />

      {/* Premium floating particles */}
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.accentOrange, COLORS.accentYellow, COLORS.accentGold]}
      />

      {/* Cookbook icon with glow */}
      <div
        style={{
          transform: `translateY(${bookY}px) rotate(${bookRotate}deg) scale(${bookScale})`,
          marginBottom: 50,
          filter: `drop-shadow(0 20px 40px ${COLORS.accentOrangeGlow}) drop-shadow(0 0 60px ${COLORS.accentOrangeGlow})`,
        }}
      >
        <div style={{ fontSize: 140 }}>📖</div>
      </div>

      {/* Main text with glow effect */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            margin: 0,
            background: `linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.accentYellow} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `
              0 0 40px ${COLORS.accentYellowGlow},
              0 0 80px ${COLORS.accentOrangeGlow},
              0 10px 30px rgba(0,0,0,0.5)
            `,
            filter: `drop-shadow(0 0 20px ${COLORS.accentYellowGlow})`,
          }}
        >
          You already know functions.
        </h1>
      </div>

      {/* Sub text with gradient */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          marginTop: 32,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 42,
            background: `linear-gradient(90deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 4px 20px ${COLORS.accentOrangeGlow}`,
            filter: `drop-shadow(0 0 20px ${COLORS.accentOrangeGlow})`,
          }}
        >
          Lola taught you.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: RECIPE CARD ============
const Scene2RecipeCard: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Card slides in from bottom with bounce
  const cardSlide = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
  });
  const cardY = interpolate(cardSlide, [0, 1], [1000, 0]);
  const cardScale = interpolate(cardSlide, [0, 1], [0.9, 1]);

  const ingredients = [
    { icon: '🍗', name: 'chicken', delay: 20 },
    { icon: '🧄', name: 'garlic', delay: 35 },
    { icon: '🫗', name: 'soy sauce', delay: 50 },
    { icon: '🍶', name: 'vinegar', delay: 65 },
  ];

  const steps = [
    { num: 1, text: 'Marinate chicken', delay: 80 },
    { num: 2, text: 'Sauté garlic', delay: 92 },
    { num: 3, text: 'Add chicken', delay: 104 },
    { num: 4, text: 'Pour soy sauce + vinegar', delay: 116 },
    { num: 5, text: 'Simmer until done', delay: 128 },
  ];

  // Bottom text
  const bottomOpacity = interpolate(frame, [135, 150], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, ${COLORS.darkBrown} 50%, #2d1810 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <AnimatedGradientBg frame={frame} variant="warm" />
      <GlowingOrb x="15%" y="15%" size={450} color={COLORS.accentOrange} intensity={0.7} />
      <GlowingOrb x="85%" y="80%" size={400} color={COLORS.accentGold} intensity={0.6} />
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.accentOrange, COLORS.accentYellow, COLORS.accentGold]}
      />

      {/* Glass Recipe Card */}
      <GlassCard
        style={{
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          width: 950,
          padding: 0,
        }}
        glowColor={COLORS.accentOrange}
        animated={true}
        frame={frame}
      >
        {/* Orange accent gradient stripe with glow */}
        <div
          style={{
            height: 20,
            background: `linear-gradient(90deg, ${COLORS.accentOrange}, ${COLORS.accentYellow}, ${COLORS.accentGold})`,
            boxShadow: `0 0 30px ${COLORS.accentOrangeGlow}`,
          }}
        />

        {/* Card content */}
        <div style={{ padding: '40px 60px 50px' }}>
          {/* Title with gradient */}
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: 68,
              margin: '0 0 40px 0',
              textAlign: 'center',
              background: `linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.accentYellow} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 0 40px ${COLORS.accentYellowGlow}`,
              filter: `drop-shadow(0 0 30px ${COLORS.accentOrangeGlow})`,
            }}
          >
            🍲 Adobo
          </h2>

          {/* Ingredients */}
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                background: `linear-gradient(90deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
              }}
            >
              Ingredients
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {ingredients.map((ing, i) => (
                <IngredientItem key={i} {...ing} frame={frame} fps={fps} />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 28,
                background: `linear-gradient(90deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
              }}
            >
              Steps
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {steps.map((step, i) => (
                <StepItem key={i} {...step} frame={frame} fps={fps} />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Bottom text with glow */}
      <div
        style={{
          opacity: bottomOpacity,
          marginTop: 50,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 38,
            color: COLORS.textLight,
            textShadow: `
              0 0 30px ${COLORS.accentYellowGlow},
              0 4px 20px rgba(0,0,0,0.5)
            `,
          }}
        >
          Write once. Cook anytime.
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Ingredient item component with glass effect
const IngredientItem: React.FC<{
  icon: string;
  name: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, name, delay, frame, fps }) => {
  const bounce = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });
  const scale = interpolate(bounce, [0, 1], [0, 1]);
  const opacity = frame >= delay ? 1 : 0;
  const glowPulse = 0.7 + Math.sin((frame - delay) * 0.1) * 0.3;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: `${COLORS.glassLight}`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '12px 22px',
        borderRadius: 16,
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `
          0 4px 20px rgba(0,0,0,0.3),
          0 0 20px ${COLORS.accentOrangeGlow},
          0 0 0 1px rgba(255,255,255,0.1) inset
        `,
      }}
    >
      <span
        style={{
          fontSize: 32,
          filter: `drop-shadow(0 0 10px ${COLORS.accentOrangeGlow})`,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 24,
          color: COLORS.textLight,
          textShadow: `0 0 10px ${COLORS.textGlow}`,
        }}
      >
        {name}
      </span>
    </div>
  );
};

// Step item component with glass checkbox
const StepItem: React.FC<{
  num: number;
  text: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ num, text, delay, frame, fps }) => {
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.snappy,
  });
  const translateX = interpolate(slideIn, [0, 1], [-60, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Checkbox animation
  const checkDelay = delay + 10;
  const checkScale = spring({
    frame: frame - checkDelay,
    fps,
    config: springConfigs.bouncy,
  });
  const showCheck = frame >= checkDelay;
  const checkGlow = showCheck ? 0.7 + Math.sin((frame - checkDelay) * 0.15) * 0.3 : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      {/* Glass Checkbox */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          border: `2px solid ${showCheck ? COLORS.accentOrange : COLORS.glassBorder}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: showCheck
            ? `linear-gradient(135deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`
            : COLORS.glassLight,
          backdropFilter: 'blur(10px)',
          transform: `scale(${showCheck ? checkScale : 1})`,
          boxShadow: showCheck
            ? `0 0 ${30 * checkGlow}px ${COLORS.accentOrangeGlow}, 0 4px 15px rgba(0,0,0,0.4)`
            : 'none',
        }}
      >
        {showCheck && (
          <span
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 900,
              textShadow: `0 0 10px rgba(255,255,255,0.8)`,
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Step text */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 28,
          color: COLORS.textLight,
          textShadow: `0 0 15px ${COLORS.textGlow}, 0 2px 10px rgba(0,0,0,0.5)`,
        }}
      >
        {num}. {text}
      </span>
    </div>
  );
};

// ============ SCENE 3: CODE ============
const Scene3Code: React.FC<{ fps: number; showSteamParticles: boolean }> = ({
  fps,
  showSteamParticles,
}) => {
  const frame = useCurrentFrame();

  // Mini recipe card in corner
  const cardScale = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });
  const miniCardScale = interpolate(cardScale, [0, 1], [0.9, 0.38]);
  const miniCardX = interpolate(cardScale, [0, 1], [0, 320]);
  const miniCardY = interpolate(cardScale, [0, 1], [0, -600]);

  // Code typing
  const codeLines = [
    { text: 'function', type: 'keyword' },
    { text: ' adobo', type: 'function' },
    { text: '(', type: 'punctuation' },
    { text: 'chicken', type: 'param' },
    { text: ', ', type: 'punctuation' },
    { text: 'garlic', type: 'param' },
    { text: ', ', type: 'punctuation' },
    { text: 'soySauce', type: 'param' },
    { text: ', ', type: 'punctuation' },
    { text: 'vinegar', type: 'param' },
    { text: ') {', type: 'punctuation' },
  ];

  const codeBody = [
    { text: '  marinate(chicken)', delay: 40 },
    { text: '  saute(garlic)', delay: 60 },
    { text: '  add(chicken)', delay: 80 },
    { text: '  pour(soySauce, vinegar)', delay: 100 },
    { text: '  simmer()', delay: 120 },
    { text: '  return "delicious adobo 🍲"', delay: 140, hasReturn: true },
    { text: '}', delay: 155 },
  ];

  // Signature typing
  const sigOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, #0f0514 50%, ${COLORS.darkBrown} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
      }}
    >
      <AnimatedGradientBg frame={frame} variant="dark" />
      <GlowingOrb x="20%" y="30%" size={500} color={COLORS.codeCyan} intensity={0.5} />
      <GlowingOrb x="75%" y="60%" size={450} color={COLORS.accentOrange} intensity={0.4} />

      {showSteamParticles && <EnhancedSteamParticles frame={frame} />}
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.codeCyan, COLORS.codeBlue, COLORS.codePurple, COLORS.accentOrange]}
      />

      {/* Mini recipe card reference */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 40,
          transform: `scale(${miniCardScale}) translate(${miniCardX}px, ${miniCardY}px)`,
          opacity: 0.95,
        }}
      >
        <MiniRecipeCard />
      </div>

      {/* Glass Code block with scanlines */}
      <GlassCard
        style={{
          padding: '50px 60px',
          width: 980,
        }}
        glowColor={COLORS.codeCyan}
        animated={true}
        frame={frame}
      >
        {/* Scanline effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.15) 0px,
              rgba(0,0,0,0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        />

        {/* Function signature */}
        <div style={{ opacity: sigOpacity, marginBottom: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32 }}>
            {codeLines.map((part, i) => (
              <span
                key={i}
                style={{
                  color:
                    part.type === 'keyword'
                      ? COLORS.accentOrange
                      : part.type === 'function'
                        ? COLORS.accentYellow
                        : part.type === 'param'
                          ? COLORS.codeCyan
                          : COLORS.textLight,
                  textShadow:
                    part.type === 'keyword'
                      ? `0 0 20px ${COLORS.accentOrangeGlow}`
                      : part.type === 'function'
                        ? `0 0 20px ${COLORS.accentYellowGlow}`
                        : part.type === 'param'
                          ? `0 0 15px ${COLORS.codeCyanGlow}`
                          : `0 0 10px ${COLORS.textGlow}`,
                }}
              >
                {part.text}
              </span>
            ))}
          </span>
        </div>

        {/* Code body */}
        {codeBody.map((line, i) => (
          <CodeLine key={i} {...line} frame={frame} fps={fps} />
        ))}
      </GlassCard>

      {/* Cooking pot animation */}
      {frame > 100 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            right: 100,
            opacity: interpolate(frame, [100, 125], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <CookingPot frame={frame} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// Enhanced code line component with better glow
const CodeLine: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
  hasReturn?: boolean;
}> = ({ text, delay, frame, fps, hasReturn }) => {
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.snappy,
  });
  const translateX = interpolate(slideIn, [0, 1], [-40, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  // Typewriter effect
  const charsToShow = Math.floor(
    interpolate(frame - delay, [0, 25], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayText = text.substring(0, charsToShow);

  // Highlight syntax
  const highlightedText = highlightSyntax(displayText, hasReturn);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: 8,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 30,
        }}
      >
        {highlightedText}
        {frame - delay < 25 && frame >= delay && (
          <span
            style={{
              color: COLORS.accentOrange,
              opacity: Math.floor((frame - delay) / 10) % 2,
              textShadow: `0 0 15px ${COLORS.accentOrangeGlow}`,
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
const highlightSyntax = (code: string, hasReturn?: boolean) => {
  if (hasReturn) {
    const parts = code.split(/(return|".*")/);
    return parts.map((part, i) => {
      if (part === 'return') {
        return (
          <span
            key={i}
            style={{
              color: COLORS.accentOrange,
              textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
            }}
          >
            {part}
          </span>
        );
      } else if (part.startsWith('"')) {
        return (
          <span
            key={i}
            style={{
              color: COLORS.codeGreen,
              textShadow: `0 0 15px ${COLORS.codeGreenGlow}`,
            }}
          >
            {part}
          </span>
        );
      }
      return (
        <span
          key={i}
          style={{
            color: COLORS.textLight,
            textShadow: `0 0 10px ${COLORS.textGlow}`,
          }}
        >
          {part}
        </span>
      );
    });
  }

  // Function calls
  const match = code.match(/(\s*)(\w+)(\(.*\))?/);
  if (match) {
    return (
      <>
        <span
          style={{
            color: COLORS.textLight,
            textShadow: `0 0 10px ${COLORS.textGlow}`,
          }}
        >
          {match[1]}
        </span>
        <span
          style={{
            color: COLORS.codeBlue,
            textShadow: `0 0 15px ${COLORS.codeBlueGlow}`,
          }}
        >
          {match[2]}
        </span>
        <span
          style={{
            color: COLORS.textLight,
            textShadow: `0 0 10px ${COLORS.textGlow}`,
          }}
        >
          {match[3] || ''}
        </span>
      </>
    );
  }

  return (
    <span
      style={{
        color: COLORS.textLight,
        textShadow: `0 0 10px ${COLORS.textGlow}`,
      }}
    >
      {code}
    </span>
  );
};

// Mini recipe card with glass effect
const MiniRecipeCard: React.FC = () => (
  <GlassCard
    style={{
      width: 280,
      padding: 0,
    }}
    glowColor={COLORS.accentOrange}
  >
    <div
      style={{
        height: 10,
        background: `linear-gradient(90deg, ${COLORS.accentOrange}, ${COLORS.accentYellow})`,
        boxShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
      }}
    />
    <div style={{ padding: '14px 18px' }}>
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: COLORS.textLight,
          margin: 0,
          textShadow: `0 0 15px ${COLORS.textGlow}`,
        }}
      >
        🍲 Adobo
      </h4>
      <div
        style={{
          fontSize: 15,
          marginTop: 10,
          color: COLORS.textDim,
          textShadow: `0 0 10px ${COLORS.textGlow}`,
        }}
      >
        1. Marinate 2. Sauté 3. Add 4. Pour 5. Simmer
      </div>
    </div>
  </GlassCard>
);

// ============ SCENE 4: FUNCTION CALLS ============
const Scene4Calls: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Two main calls
  const calls = [
    { input: 'chicken, garlic, soy, vinegar', output: 'delicious adobo', emoji: '🍲', start: 0 },
    {
      input: 'pork, garlic, soy, vinegar',
      output: 'delicious pork adobo',
      emoji: '🍲',
      start: 60,
    },
  ];

  // Multiple pots section
  const showMultiple = frame > 100;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, #0f0514 50%, ${COLORS.darkBrown} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
      }}
    >
      <AnimatedGradientBg frame={frame} variant="dark" />
      <GlowingOrb x="25%" y="25%" size={450} color={COLORS.codeCyan} intensity={0.6} />
      <GlowingOrb x="70%" y="70%" size={500} color={COLORS.accentOrange} intensity={0.5} />
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.codeCyan, COLORS.accentOrange, COLORS.codeGreen, COLORS.accentYellow]}
      />

      {/* Function reference at top */}
      <GlassCard
        style={{
          padding: '20px 32px',
          marginBottom: 50,
          marginTop: 40,
        }}
        glowColor={COLORS.accentYellow}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 26,
            color: COLORS.accentYellow,
            textShadow: `0 0 20px ${COLORS.accentYellowGlow}`,
          }}
        >
          function adobo(chicken, garlic, soySauce, vinegar)
        </span>
      </GlassCard>

      {/* Call simulations */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 35,
          width: '100%',
          alignItems: 'center',
        }}
      >
        {calls.map((call, i) => (
          <FunctionCall key={i} {...call} frame={frame} fps={fps} />
        ))}
      </div>

      {/* Multiple calls section */}
      {showMultiple && (
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 28,
              color: COLORS.textLight,
              marginBottom: 25,
              textAlign: 'center',
              textShadow: `0 0 20px ${COLORS.codeCyanGlow}`,
            }}
          >
            adobo() adobo() adobo()
          </div>
          <div style={{ display: 'flex', gap: 35, justifyContent: 'center' }}>
            {[0, 1, 2].map((i) => {
              const potDelay = 120 + i * 12;
              const scale = spring({
                frame: frame - potDelay,
                fps,
                config: springConfigs.bouncy,
              });
              const glowIntensity = 0.7 + Math.sin((frame - potDelay) * 0.15) * 0.3;
              return (
                <div
                  key={i}
                  style={{
                    transform: `scale(${Math.min(scale, 1)})`,
                    fontSize: 70,
                    filter: `drop-shadow(0 0 ${40 * glowIntensity}px ${COLORS.accentOrangeGlow})`,
                  }}
                >
                  🍲
                </div>
              );
            })}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 32,
              textAlign: 'center',
              marginTop: 25,
              opacity: interpolate(frame, [135, 148], [0, 1], { extrapolateRight: 'clamp' }),
              background: `linear-gradient(90deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 0 30px ${COLORS.accentOrangeGlow}`,
              filter: `drop-shadow(0 0 20px ${COLORS.accentOrangeGlow})`,
            }}
          >
            Call it as many times as you want.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Enhanced function call component
const FunctionCall: React.FC<{
  input: string;
  output: string;
  emoji: string;
  start: number;
  frame: number;
  fps: number;
}> = ({ input, output, emoji, start, frame, fps }) => {
  const localFrame = frame - start;
  if (localFrame < 0) return null;

  const callOpacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Cooking animation
  const cookProgress = interpolate(localFrame, [12, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Result pop
  const resultScale = spring({
    frame: localFrame - 50,
    fps,
    config: springConfigs.bouncy,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 35,
        opacity: callOpacity,
      }}
    >
      {/* Call text in glass card */}
      <GlassCard
        style={{
          padding: '16px 26px',
        }}
        glowColor={COLORS.accentYellow}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 24,
          }}
        >
          <span
            style={{
              color: COLORS.accentYellow,
              textShadow: `0 0 20px ${COLORS.accentYellowGlow}`,
            }}
          >
            adobo
          </span>
          <span
            style={{
              color: COLORS.textLight,
              textShadow: `0 0 10px ${COLORS.textGlow}`,
            }}
          >
            (
          </span>
          <span
            style={{
              color: COLORS.codeCyan,
              textShadow: `0 0 15px ${COLORS.codeCyanGlow}`,
            }}
          >
            {input}
          </span>
          <span
            style={{
              color: COLORS.textLight,
              textShadow: `0 0 10px ${COLORS.textGlow}`,
            }}
          >
            )
          </span>
        </span>
      </GlassCard>

      {/* Arrow with glow */}
      <div
        style={{
          color: COLORS.accentOrange,
          fontSize: 36,
          opacity: cookProgress,
          textShadow: `0 0 30px ${COLORS.accentOrangeGlow}`,
        }}
      >
        →
      </div>

      {/* Cooking pot */}
      <div
        style={{
          position: 'relative',
          width: 90,
          height: 90,
        }}
      >
        <div
          style={{
            fontSize: 60,
            transform: `scale(${0.8 + cookProgress * 0.2})`,
            opacity: cookProgress,
            filter: `drop-shadow(0 0 30px ${COLORS.accentOrangeGlow})`,
          }}
        >
          🍳
        </div>
        {/* Enhanced steam while cooking */}
        {cookProgress > 0 && cookProgress < 1 && (
          <div
            style={{
              position: 'absolute',
              top: -25,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <EnhancedSteamWave frame={localFrame} />
          </div>
        )}
      </div>

      {/* Result with glass card */}
      {localFrame > 50 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            transform: `scale(${Math.min(resultScale, 1)})`,
          }}
        >
          <span
            style={{
              fontSize: 60,
              filter: `drop-shadow(0 0 30px ${COLORS.accentOrangeGlow})`,
            }}
          >
            {emoji}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: COLORS.textDim,
                textShadow: `0 0 10px ${COLORS.textGlow}`,
              }}
            >
              Output:
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: COLORS.codeGreen,
                textShadow: `0 0 20px ${COLORS.codeGreenGlow}`,
              }}
            >
              {output}
            </span>
          </div>
          <span
            style={{
              fontSize: 34,
              color: COLORS.codeGreen,
              textShadow: `0 0 25px ${COLORS.codeGreenGlow}`,
            }}
          >
            ✓
          </span>
        </div>
      )}
    </div>
  );
};

// ============ SCENE 5: AHA MOMENT ============
const Scene5Aha: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  // Main text scales in
  const mainScale = spring({
    frame,
    fps,
    config: springConfigs.elastic,
  });

  const points = [
    { emoji: '📝', text: 'Write the steps once', delay: 30 },
    { emoji: '📦', text: 'Give it a name', delay: 50 },
    { emoji: '🔁', text: 'Use it forever', delay: 70 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, #1a0a1f 30%, #2d1810 70%, #9a3412 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} variant="warm" />
      <GlowingOrb x="30%" y="30%" size={600} color={COLORS.accentOrange} intensity={0.8} />
      <GlowingOrb x="70%" y="65%" size={550} color={COLORS.accentYellow} intensity={0.7} />
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.accentOrange, COLORS.accentYellow, COLORS.accentGold]}
      />

      {/* Main revelation */}
      <div
        style={{
          transform: `scale(${mainScale})`,
          marginBottom: 70,
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 72,
            margin: 0,
            background: `linear-gradient(135deg, ${COLORS.textLight} 0%, ${COLORS.accentYellow} 50%, ${COLORS.accentOrange} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `
              0 0 60px ${COLORS.accentYellowGlow},
              0 0 100px ${COLORS.accentOrangeGlow}
            `,
            filter: `drop-shadow(0 0 40px ${COLORS.accentOrangeGlow}) drop-shadow(0 10px 30px rgba(0,0,0,0.5))`,
          }}
        >
          A function is a recipe.
        </h1>
      </div>

      {/* Three points with glass cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {points.map((point, i) => {
          const pointSpring = spring({
            frame: frame - point.delay,
            fps,
            config: springConfigs.bouncy,
          });
          const pointScale = interpolate(pointSpring, [0, 1], [0.8, 1]);
          const pointOpacity = interpolate(frame, [point.delay, point.delay + 18], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <GlassCard
              key={i}
              style={{
                opacity: pointOpacity,
                transform: `scale(${pointScale})`,
                padding: '18px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
              glowColor={COLORS.accentOrange}
              animated={true}
              frame={frame - point.delay}
            >
              <span
                style={{
                  fontSize: 48,
                  filter: `drop-shadow(0 0 20px ${COLORS.accentOrangeGlow})`,
                }}
              >
                {point.emoji}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 40,
                  color: COLORS.textLight,
                  textShadow: `0 0 20px ${COLORS.textGlow}`,
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
    { text: 'function learnToCode() {', delay: 0 },
    { text: '  return "new career"', delay: 18 },
    { text: '}', delay: 30 },
    { text: '', delay: 38 },
    { text: 'learnToCode()', delay: 42 },
    { text: '// DOGM.AI', delay: 58 },
  ];

  // Logo fade
  const logoOpacity = interpolate(frame, [65, 80], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = spring({
    frame: frame - 65,
    fps,
    config: springConfigs.bouncy,
  });

  // Teaser text
  const teaserOpacity = interpolate(frame, [80, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.deepSpace} 0%, ${COLORS.darkerBrown} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <AnimatedGradientBg frame={frame} variant="cool" />
      <GlowingOrb x="50%" y="50%" size={700} color={COLORS.codeCyan} intensity={0.6} />
      <PremiumFloatingParticles
        frame={frame}
        colors={[COLORS.codeCyan, COLORS.codeBlue, COLORS.codePurple, COLORS.accentOrange]}
      />

      {/* Terminal window with glass effect */}
      <GlassCard
        style={{
          padding: '40px 50px',
          width: 850,
        }}
        glowColor={COLORS.codeCyan}
        animated={true}
        frame={frame}
      >
        {/* Scanline effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.15) 0px,
              rgba(0,0,0,0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
            pointerEvents: 'none',
            opacity: 0.4,
          }}
        />

        {/* Terminal header */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 25 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              boxShadow: '0 0 15px #ef444480',
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#eab308',
              boxShadow: '0 0 15px #eab30880',
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 15px #22c55e80',
            }}
          />
        </div>

        {/* Code */}
        {codeLines.map((line, i) => {
          const lineOpacity = interpolate(frame, [line.delay, line.delay + 12], [0, 1], {
            extrapolateRight: 'clamp',
          });

          // Typewriter
          const charsToShow = Math.floor(
            interpolate(frame - line.delay, [0, 18], [0, line.text.length], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          );

          const displayText = line.text.substring(0, charsToShow);

          // Syntax highlight with glow
          let highlighted: React.ReactNode = displayText;
          if (displayText.includes('function')) {
            highlighted = (
              <>
                <span
                  style={{
                    color: COLORS.accentOrange,
                    textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
                  }}
                >
                  function
                </span>
                <span
                  style={{
                    color: COLORS.accentYellow,
                    textShadow: `0 0 20px ${COLORS.accentYellowGlow}`,
                  }}
                >
                  {displayText.replace('function', '')}
                </span>
              </>
            );
          } else if (displayText.includes('return')) {
            highlighted = (
              <>
                <span
                  style={{
                    color: COLORS.textLight,
                    textShadow: `0 0 10px ${COLORS.textGlow}`,
                  }}
                >
                  {' '}
                </span>
                <span
                  style={{
                    color: COLORS.accentOrange,
                    textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
                  }}
                >
                  return
                </span>
                <span
                  style={{
                    color: COLORS.codeGreen,
                    textShadow: `0 0 20px ${COLORS.codeGreenGlow}`,
                  }}
                >
                  {displayText.replace('  return', '')}
                </span>
              </>
            );
          } else if (displayText.includes('learnToCode')) {
            highlighted = (
              <span
                style={{
                  color: COLORS.accentYellow,
                  textShadow: `0 0 25px ${COLORS.accentYellowGlow}`,
                }}
              >
                {displayText}
              </span>
            );
          } else if (displayText.includes('//')) {
            highlighted = (
              <span
                style={{
                  color: COLORS.codeCyan,
                  textShadow: `0 0 20px ${COLORS.codeCyanGlow}`,
                }}
              >
                {displayText}
              </span>
            );
          } else {
            highlighted = (
              <span
                style={{
                  color: COLORS.textLight,
                  textShadow: `0 0 10px ${COLORS.textGlow}`,
                }}
              >
                {displayText}
              </span>
            );
          }

          return (
            <div key={i} style={{ opacity: lineOpacity, minHeight: 40 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 32,
                }}
              >
                {highlighted}
                {frame - line.delay < 18 && frame >= line.delay && line.text && (
                  <span
                    style={{
                      color: COLORS.accentOrange,
                      opacity: Math.floor((frame - line.delay) / 10) % 2,
                      textShadow: `0 0 20px ${COLORS.accentOrangeGlow}`,
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

      {/* Logo with gradient and glow */}
      <div
        style={{
          marginTop: 60,
          opacity: logoOpacity,
          transform: `scale(${Math.min(logoScale, 1)})`,
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 80,
            margin: 0,
            background: `linear-gradient(135deg, ${COLORS.accentOrange} 0%, ${COLORS.accentYellow} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            textShadow: `
              0 0 60px ${COLORS.accentOrangeGlow},
              0 0 100px ${COLORS.accentYellowGlow}
            `,
            filter: `drop-shadow(0 0 40px ${COLORS.accentOrangeGlow})`,
          }}
        >
          DOGM.AI
        </h1>
      </div>

      {/* Teaser */}
      <div
        style={{
          marginTop: 30,
          opacity: teaserOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            color: COLORS.textLight,
            textShadow: `0 0 20px ${COLORS.textGlow}, 0 4px 15px rgba(0,0,0,0.5)`,
          }}
        >
          Next: Where do you store all your ingredients?
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ ENHANCED HELPER COMPONENTS ============

// Enhanced steam particles with multi-color glow
const EnhancedSteamParticles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: 70 + i * 3,
    delay: i * 12,
    amplitude: 12 + (i % 4) * 6,
    color: i % 2 === 0 ? COLORS.accentOrange : COLORS.accentYellow,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 100,
        right: 80,
        width: 120,
        height: 250,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p, i) => {
        const y = 250 - ((frame + p.delay) * 2.5) % 250;
        const x = 60 + Math.sin((frame + p.delay) * 0.12) * p.amplitude;
        const opacity = interpolate(y, [0, 125, 250], [0, 0.7, 0]);
        const scale = interpolate(y, [0, 125, 250], [0.8, 1.2, 0.5]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `
                0 0 15px ${p.color}80,
                0 0 30px ${p.color}40
              `,
              filter: 'blur(2px)',
            }}
          />
        );
      })}
    </div>
  );
};

// Enhanced cooking pot with glow
const CookingPot: React.FC<{ frame: number }> = ({ frame }) => {
  const wobble = Math.sin(frame * 0.3) * 3;
  const glowPulse = 0.6 + Math.sin(frame * 0.2) * 0.4;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `rotate(${wobble}deg)`,
      }}
    >
      <EnhancedSteamWave frame={frame} />
      <div
        style={{
          fontSize: 100,
          filter: `drop-shadow(0 0 ${50 * glowPulse}px ${COLORS.accentOrangeGlow})`,
        }}
      >
        🍲
      </div>
    </div>
  );
};

// Enhanced steam wave with glow
const EnhancedSteamWave: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: -15 }}>
      {[0, 1, 2].map((i) => {
        const y = Math.sin((frame + i * 12) * 0.25) * 8 - 15;
        const opacity = 0.4 + Math.sin((frame + i * 25) * 0.12) * 0.3;
        const color = i % 2 === 0 ? COLORS.accentOrange : COLORS.accentYellow;

        return (
          <div
            key={i}
            style={{
              width: 4,
              height: 25,
              backgroundColor: color,
              borderRadius: 4,
              transform: `translateY(${y}px)`,
              opacity,
              boxShadow: `0 0 15px ${color}80, 0 0 30px ${color}40`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
};
