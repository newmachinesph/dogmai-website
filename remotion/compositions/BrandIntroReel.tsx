import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Sequence, staticFile } from 'remotion';

// Font face declarations for Remotion
const fontFaces = `
  @font-face {
    font-family: 'Raveo';
    src: url('${staticFile('fonts/variable/RaveoVF-subsetted.woff2')}') format('woff2');
    font-weight: 400 730;
    font-style: normal;
    font-display: swap;
  }
`;

export interface BrandIntroReelProps {
  headline: string;
  tagline: string;
}

// Brand colors
const COLORS = {
  background: '#060503',
  foreground: '#f4efe6',
  accent: '#f97316',
  muted: '#c9b89b',
  border: '#2e2e2e',
};

export const BrandIntroReel: React.FC<BrandIntroReelProps> = ({
  headline = 'DOGM.AI',
  tagline = 'Learn to build with AI',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Font injection */}
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Background Grid */}
      <BackgroundGrid frame={frame} width={width} height={height} />

      {/* Scene 1: Logo Reveal (0-2s) */}
      <Sequence from={0} durationInFrames={60}>
        <LogoReveal fps={fps} />
      </Sequence>

      {/* Scene 2: Headline (2-5s) */}
      <Sequence from={60} durationInFrames={90}>
        <HeadlineScene headline={headline} fps={fps} />
      </Sequence>

      {/* Scene 3: Features (5-11s) */}
      <Sequence from={150} durationInFrames={180}>
        <FeaturesScene fps={fps} />
      </Sequence>

      {/* Scene 4: CTA (11-15s) */}
      <Sequence from={330} durationInFrames={120}>
        <CTAScene tagline={tagline} fps={fps} />
      </Sequence>

      {/* Corner Accents */}
      <CornerAccents />
    </AbsoluteFill>
  );
};

// Background animated grid
const BackgroundGrid: React.FC<{ frame: number; width: number; height: number }> = ({
  frame,
  width,
  height,
}) => {
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.15], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: gridOpacity }}>
      <svg width={width} height={height}>
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={COLORS.border}
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </AbsoluteFill>
  );
};

// Corner accent squares
const CornerAccents: React.FC = () => {
  const size = 20;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: size,
          height: size,
          backgroundColor: COLORS.accent,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: size,
          height: size,
          backgroundColor: COLORS.accent,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: size,
          height: size,
          backgroundColor: COLORS.accent,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size,
          height: size,
          backgroundColor: COLORS.accent,
        }}
      />
    </>
  );
};

// Scene 1: Logo Reveal
const LogoReveal: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const lineWidth = spring({
    frame: frame - 20,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <h1
        style={{
          fontSize: 140,
          fontFamily: 'Raveo, sans-serif',
          fontWeight: 700,
          color: COLORS.foreground,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        DOGM.AI
      </h1>
      <div
        style={{
          width: 200 * lineWidth,
          height: 4,
          backgroundColor: COLORS.accent,
          marginTop: 30,
        }}
      />
      <p
        style={{
          fontSize: 32,
          color: COLORS.muted,
          fontFamily: 'Geist Mono, monospace',
          marginTop: 30,
          letterSpacing: '0.2em',
        }}
      >
        AI-NATIVE BOOTCAMP
      </p>
    </AbsoluteFill>
  );
};

// Scene 2: Headline
const HeadlineScene: React.FC<{ headline: string; fps: number }> = ({ headline, fps }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [0, 20], [50, 0], {
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
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <p
        style={{
          fontSize: 28,
          color: COLORS.accent,
          fontFamily: 'Geist Mono, monospace',
          letterSpacing: '0.3em',
          marginBottom: 30,
        }}
      >
        INTRODUCING
      </p>
      <h2
        style={{
          fontSize: 72,
          fontFamily: 'Raveo, sans-serif',
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: 'center',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        AI-Native Coding Bootcamp
      </h2>
      <div
        style={{
          width: 120,
          height: 4,
          backgroundColor: COLORS.accent,
          marginTop: 50,
        }}
      />
    </AbsoluteFill>
  );
};

// Scene 3: Features
const FeaturesScene: React.FC<{ fps: number }> = ({ fps }) => {
  const frame = useCurrentFrame();

  const features = [
    { icon: '20', text: 'Weeks of Training' },
    { icon: '25', text: 'Students Per Cohort' },
    { icon: '∞', text: 'Lifetime Community Access' },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      <p
        style={{
          fontSize: 28,
          color: COLORS.accent,
          fontFamily: 'Geist Mono, monospace',
          letterSpacing: '0.2em',
          marginBottom: 50,
        }}
      >
        WHAT YOU GET
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            text={feature.text}
            delay={index * 20}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const FeatureItem: React.FC<{
  icon: string;
  text: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, text, delay, frame, fps }) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          backgroundColor: COLORS.accent,
          borderRadius: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 42,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.background,
          }}
        >
          {icon}
        </span>
      </div>
      <span
        style={{
          fontSize: 42,
          fontFamily: 'Raveo, sans-serif',
          color: COLORS.foreground,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Scene 4: CTA
const CTAScene: React.FC<{ tagline: string; fps: number }> = ({ tagline, fps }) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Pulsing effect for CTA button
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.05, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <h2
        style={{
          fontSize: 64,
          fontFamily: 'Raveo, sans-serif',
          fontWeight: 700,
          color: COLORS.foreground,
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        {tagline}
      </h2>

      <p
        style={{
          fontSize: 32,
          fontFamily: 'Raveo, sans-serif',
          color: COLORS.muted,
          textAlign: 'center',
          marginBottom: 60,
          lineHeight: 1.5,
        }}
      >
        Fundamentals first.
        <br />
        Then strategic AI.
      </p>

      <div
        style={{
          backgroundColor: COLORS.accent,
          padding: '30px 80px',
          borderRadius: 16,
          transform: `scale(${pulse})`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.background,
          }}
        >
          Apply Now
        </span>
      </div>

      <p
        style={{
          fontSize: 36,
          color: COLORS.accent,
          fontFamily: 'Geist Mono, monospace',
          marginTop: 50,
        }}
      >
        dogm.ai
      </p>
    </AbsoluteFill>
  );
};
