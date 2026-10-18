import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  staticFile,
  Img,
} from 'remotion';

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

export interface DeveloperIntroProps {
  name: string;
  title: string;
  email: string;
  website: string;
}

// Light mode colors
const COLORS = {
  background: '#ffffff',
  foreground: '#1a1a1a',
  accent: '#f97316', // Orange
  secondary: '#3b82f6', // Blue
  muted: '#6b7280',
  lightGray: '#f3f4f6',
  border: '#e5e7eb',
};

export const DeveloperIntro: React.FC<DeveloperIntroProps> = ({
  name = 'Llino Del Rosario',
  title = 'Full-Stack & AI Engineer',
  email = 'llino.delrosario.gadia@gmail.com',
  website = 'llinodelrosario.vercel.app',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Font injection */}
      <style dangerouslySetInnerHTML={{ __html: fontFaces }} />

      {/* Background subtle pattern */}
      <BackgroundPattern width={width} height={height} frame={frame} />

      {/* Scene 1: Opening (0-5s / 0-150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <OpeningScene name={name} title={title} />
      </Sequence>

      {/* Scene 2: The Hook (5-18s / 150-540 frames) */}
      <Sequence from={150} durationInFrames={390}>
        <HookScene />
      </Sequence>

      {/* Scene 3: What I Do (18-33s / 540-990 frames) */}
      <Sequence from={540} durationInFrames={450}>
        <WhatIDoScene />
      </Sequence>

      {/* Scene 4: Why Work With Me (33-48s / 990-1440 frames) */}
      <Sequence from={990} durationInFrames={450}>
        <WhyWorkWithMeScene />
      </Sequence>

      {/* Scene 5: Closing & CTA (48-58s / 1440-1740 frames) */}
      <Sequence from={1440} durationInFrames={300}>
        <ClosingScene />
      </Sequence>

      {/* Scene 6: End Card (58-63s / 1740-1890 frames) */}
      <Sequence from={1740} durationInFrames={150}>
        <EndCardScene email={email} website={website} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Background pattern with animated dots
const BackgroundPattern: React.FC<{ width: number; height: number; frame: number }> = ({
  width,
  height,
  frame,
}) => {
  const opacity = interpolate(frame, [0, 30], [0, 0.4], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width={width} height={height}>
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill={COLORS.border} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </AbsoluteFill>
  );
};

// Scene 1: Opening - "Hey, I'm Lli"
const OpeningScene: React.FC<{ name: string; title: string }> = ({ name, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [20, 50], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [20, 40], [0, 1], {
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
        gap: 40,
      }}
    >
      {/* Profile Image */}
      <div
        style={{
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `6px solid ${COLORS.accent}`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          }}
        >
          <Img src={staticFile('developer/dev-image.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Name and Title */}
      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.foreground,
            margin: 0,
            marginBottom: 10,
          }}
        >
          Hey, I'm {name}
        </h1>
        <p
          style={{
            fontSize: 48,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.accent,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 36,
            fontFamily: 'Geist Mono, monospace',
            color: COLORS.muted,
            margin: 0,
            marginTop: 20,
          }}
        >
          Based in Manila 🇵🇭
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The Hook - Journey from Pascal to AI
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const title2Opacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const title3Opacity = interpolate(frame, [210, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const title4Opacity = interpolate(frame, [300, 320], [0, 1], {
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
        padding: 80,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1400 }}>
        {/* Line 1 */}
        <div style={{ opacity: title1Opacity, marginBottom: 40 }}>
          <p
            style={{
              fontSize: 56,
              fontFamily: 'Raveo, sans-serif',
              color: COLORS.foreground,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            I've been coding since I was <span style={{ color: COLORS.accent, fontWeight: 700 }}>15</span>
          </p>
        </div>

        {/* Line 2 */}
        <div style={{ opacity: title2Opacity, marginBottom: 40 }}>
          <p
            style={{
              fontSize: 48,
              fontFamily: 'Raveo, sans-serif',
              color: COLORS.muted,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Started with <span style={{ color: COLORS.secondary, fontWeight: 600 }}>Pascal</span>, back when{' '}
            <span style={{ fontStyle: 'italic' }}>floppy disks</span> were still a thing 💾
          </p>
        </div>

        {/* Line 3 */}
        <div style={{ opacity: title3Opacity, marginBottom: 40 }}>
          <p
            style={{
              fontSize: 56,
              fontFamily: 'Raveo, sans-serif',
              color: COLORS.foreground,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Fast forward to today...
          </p>
        </div>

        {/* Line 4 */}
        <div style={{ opacity: title4Opacity }}>
          <p
            style={{
              fontSize: 64,
              fontFamily: 'Raveo, sans-serif',
              color: COLORS.accent,
              margin: 0,
              lineHeight: 1.4,
              fontWeight: 700,
            }}
          >
            9+ years building web apps, automating workflows,
            <br />
            and integrating AI into real-world products
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: What I Do - Tech stack and experience
const WhatIDoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const techLogos = [
    'react.svg',
    'nextjs.svg',
    'nodejs.svg',
    'typescript.svg',
    'python.svg',
    'postgresql.svg',
    'mongodb.svg',
    'docker.svg',
  ];

  const industries = [
    { icon: '💰', name: 'FinTech', delay: 60 },
    { icon: '⚖️', name: 'Legal Tech', delay: 75 },
    { icon: '📚', name: 'Ed Tech', delay: 90 },
    { icon: '🛍️', name: 'E-Commerce', delay: 105 },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      {/* Header */}
      <div style={{ opacity: headerOpacity, marginBottom: 60 }}>
        <h2
          style={{
            fontSize: 72,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.foreground,
            margin: 0,
            marginBottom: 20,
          }}
        >
          What I Do
        </h2>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: COLORS.accent,
          }}
        />
      </div>

      {/* Tech Stack Logos */}
      <div style={{ marginBottom: 80 }}>
        <p
          style={{
            fontSize: 36,
            fontFamily: 'Geist Mono, monospace',
            color: COLORS.muted,
            marginBottom: 40,
          }}
        >
          I specialize in the React ecosystem:
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 30,
            justifyContent: 'flex-start',
          }}
        >
          {techLogos.map((logo, index) => (
            <TechLogo key={index} logo={logo} delay={index * 10 + 40} frame={frame} fps={fps} />
          ))}
        </div>
      </div>

      {/* Industries */}
      <div>
        <p
          style={{
            fontSize: 36,
            fontFamily: 'Geist Mono, monospace',
            color: COLORS.muted,
            marginBottom: 30,
          }}
        >
          Experience across industries:
        </p>
        <div
          style={{
            display: 'flex',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {industries.map((industry, index) => (
            <IndustryBadge
              key={index}
              icon={industry.icon}
              name={industry.name}
              delay={industry.delay}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          marginTop: 60,
          opacity: interpolate(frame, [150, 170], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <p
          style={{
            fontSize: 44,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.foreground,
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          From AI-powered accounting platforms to scaling marketing bots
          <br />
          to <span style={{ color: COLORS.accent, fontWeight: 700 }}>thousands of accounts daily</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Tech Logo Component
const TechLogo: React.FC<{
  logo: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ logo, delay, frame, fps }) => {
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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: COLORS.lightGray,
          borderRadius: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          border: `2px solid ${COLORS.border}`,
        }}
      >
        <Img
          src={staticFile(`developer/logos/${logo}`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

// Industry Badge Component
const IndustryBadge: React.FC<{
  icon: string;
  name: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, name, delay, frame, fps }) => {
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
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.accent,
          borderRadius: 50,
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <span style={{ fontSize: 40 }}>{icon}</span>
        <span
          style={{
            fontSize: 32,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.background,
            fontWeight: 600,
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

// Scene 4: Why Work With Me
const WhyWorkWithMeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const text1Opacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const text2Opacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const text3Opacity = interpolate(frame, [200, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      {/* Header */}
      <div style={{ opacity: headerOpacity, marginBottom: 80 }}>
        <h2
          style={{
            fontSize: 72,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.foreground,
            margin: 0,
            marginBottom: 20,
          }}
        >
          What Sets Me Apart?
        </h2>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: COLORS.accent,
          }}
        />
      </div>

      {/* Point 1 */}
      <div style={{ opacity: text1Opacity, marginBottom: 50 }}>
        <p
          style={{
            fontSize: 56,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.foreground,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          I don't just <span style={{ color: COLORS.accent, fontWeight: 700 }}>write code</span>
        </p>
      </div>

      {/* Point 2 */}
      <div style={{ opacity: text2Opacity, marginBottom: 50 }}>
        <p
          style={{
            fontSize: 56,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.foreground,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          I <span style={{ color: COLORS.secondary, fontWeight: 700 }}>understand the business</span>
        </p>
      </div>

      {/* Point 3 */}
      <div style={{ opacity: text3Opacity }}>
        <p
          style={{
            fontSize: 48,
            fontFamily: 'Raveo, sans-serif',
            color: COLORS.muted,
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 500,
          }}
        >
          I take time to learn your goals and deliver solutions
          <br />
          that actually <span style={{ color: COLORS.accent, fontWeight: 700 }}>move the needle</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Closing & CTA
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Pulsing effect
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.08, 1]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        opacity,
      }}
    >
      <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
        <p
          style={{
            fontSize: 48,
            fontFamily: 'Geist Mono, monospace',
            color: COLORS.muted,
            marginBottom: 30,
          }}
        >
          So if you're looking for someone who can
        </p>

        <h2
          style={{
            fontSize: 80,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.foreground,
            margin: 0,
            marginBottom: 20,
          }}
        >
          <span style={{ color: COLORS.accent }}>Build</span>,{' '}
          <span style={{ color: COLORS.secondary }}>Automate</span>, and{' '}
          <span style={{ color: COLORS.accent }}>Ship</span>
        </h2>

        <div
          style={{
            marginTop: 60,
            transform: `scale(${pulse})`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.accent,
              borderRadius: 20,
              padding: '30px 80px',
              display: 'inline-block',
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontFamily: 'Raveo, sans-serif',
                fontWeight: 700,
                color: COLORS.background,
              }}
            >
              Let's Talk
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: End Card
const EndCardScene: React.FC<{ email: string; website: string }> = ({ email, website }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const textOpacity = interpolate(frame, [20, 40], [0, 1], {
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
        gap: 60,
      }}
    >
      {/* Small profile image */}
      <div
        style={{
          transform: `scale(${imageScale})`,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid ${COLORS.accent}`,
          }}
        >
          <Img src={staticFile('developer/dev-image.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Contact info */}
      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
        }}
      >
        <h3
          style={{
            fontSize: 64,
            fontFamily: 'Raveo, sans-serif',
            fontWeight: 700,
            color: COLORS.foreground,
            margin: 0,
            marginBottom: 40,
          }}
        >
          Llino Del Rosario
        </h3>

        <div
          style={{
            backgroundColor: COLORS.lightGray,
            borderRadius: 16,
            padding: '40px 60px',
            border: `2px solid ${COLORS.border}`,
          }}
        >
          <p
            style={{
              fontSize: 36,
              fontFamily: 'Geist Mono, monospace',
              color: COLORS.accent,
              margin: 0,
              marginBottom: 20,
            }}
          >
            {email}
          </p>
          <p
            style={{
              fontSize: 36,
              fontFamily: 'Geist Mono, monospace',
              color: COLORS.secondary,
              margin: 0,
            }}
          >
            {website}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
