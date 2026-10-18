import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';

// Shared styles
const colors = {
  bg: '#060503',
  bgCard: '#0d0906',
  text: '#f4efe6',
  textMuted: '#d8c9b0',
  textFaded: '#a8987a',
  accent: '#f97316',
  accentGreen: '#34d399',
  border: '#2e2e2e',
};

// =====================
// POST 1: HERO INTRO
// =====================
export const BootcampPost1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const taglineOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Accent line top */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          width: 80,
          height: 4,
          backgroundColor: colors.accent,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            fontSize: 140,
            fontWeight: 'bold',
            color: colors.text,
            letterSpacing: '0.08em',
            margin: 0,
          }}
        >
          DOGM.AI
        </h1>
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: 180,
          height: 4,
          backgroundColor: colors.accent,
          marginBottom: 40,
        }}
      />

      {/* Tagline */}
      <p
        style={{
          fontSize: 44,
          color: colors.textMuted,
          fontFamily: 'monospace',
          textAlign: 'center',
          margin: 0,
          opacity: taglineOpacity,
          marginBottom: 20,
        }}
      >
        100% Fully Remote
      </p>

      <p
        style={{
          fontSize: 52,
          color: colors.text,
          fontWeight: 'bold',
          textAlign: 'center',
          margin: 0,
          opacity: subtitleOpacity,
        }}
      >
        AI-Native Coding Bootcamp
      </p>

      {/* Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          backgroundColor: colors.bgCard,
          border: `2px solid ${colors.border}`,
          borderRadius: 12,
          padding: '20px 40px',
          opacity: subtitleOpacity,
        }}
      >
        <p
          style={{
            fontSize: 28,
            color: colors.accentGreen,
            fontFamily: 'monospace',
            margin: 0,
          }}
        >
          20-Week Part-Time Program
        </p>
      </div>

      {/* Page indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 60,
          display: 'flex',
          gap: 10,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === 0 ? colors.accent : colors.border,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =====================
// POST 2: WHAT YOU'LL LEARN
// =====================
export const BootcampPost2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { icon: '🌐', text: 'HTML, CSS & JavaScript' },
    { icon: '⚛️', text: 'React & Modern Frontend' },
    { icon: '🔧', text: 'Backend & Databases' },
    { icon: '🤖', text: 'AI Tools (Strategic Use)' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 50, height: 3, backgroundColor: colors.accent }} />
          <p
            style={{
              fontSize: 20,
              color: colors.accent,
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            // CURRICULUM
          </p>
        </div>
        <h2
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: colors.text,
            margin: 0,
          }}
        >
          What You'll Learn
        </h2>
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25, flex: 1 }}>
        {items.map((item, index) => {
          const itemOpacity = interpolate(frame, [10 + index * 8, 20 + index * 8], [0, 1], {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          });

          const itemScale = spring({
            frame: frame - (5 + index * 8),
            fps,
            config: { damping: 200 },
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: colors.bgCard,
                border: `2px solid ${colors.border}`,
                borderRadius: 16,
                padding: '35px 40px',
                display: 'flex',
                alignItems: 'center',
                gap: 25,
                opacity: itemOpacity,
                transform: `scale(${itemScale})`,
              }}
            >
              <span style={{ fontSize: 48 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 36,
                  color: colors.textMuted,
                  fontFamily: 'monospace',
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 30,
          padding: '20px 30px',
          backgroundColor: `${colors.accent}15`,
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: 8,
        }}
      >
        <p
          style={{
            fontSize: 26,
            color: colors.textMuted,
            fontFamily: 'monospace',
            margin: 0,
          }}
        >
          Fundamentals first. AI as accelerator, not crutch.
        </p>
      </div>

      {/* Page indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 60,
          display: 'flex',
          gap: 10,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === 1 ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === 1 ? colors.accent : colors.border,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =====================
// POST 3: PROGRAM DETAILS
// =====================
export const BootcampPost3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: '20', label: 'Weeks' },
    { value: '25', label: 'Seats' },
    { value: 'Hybrid', label: 'Remote + On-site' },
    { value: '₱40K', label: 'Full Payment' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 50, height: 3, backgroundColor: colors.accent }} />
          <p
            style={{
              fontSize: 20,
              color: colors.accent,
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            // PROGRAM DETAILS
          </p>
        </div>
        <h2
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: colors.text,
            margin: 0,
          }}
        >
          Part-Time. Beginner-Friendly.
        </h2>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 25,
          flex: 1,
        }}
      >
        {stats.map((stat, index) => {
          const cardScale = spring({
            frame: frame - (5 + index * 6),
            fps,
            config: { damping: 200 },
          });

          return (
            <div
              key={index}
              style={{
                backgroundColor: colors.bgCard,
                border: `2px solid ${colors.border}`,
                borderRadius: 16,
                padding: 35,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transform: `scale(${cardScale})`,
              }}
            >
              <p
                style={{
                  fontSize: 56,
                  fontWeight: 'bold',
                  color: colors.text,
                  margin: 0,
                  marginBottom: 10,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 24,
                  color: colors.textFaded,
                  fontFamily: 'monospace',
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Schedule Info */}
      <div
        style={{
          marginTop: 30,
          backgroundColor: colors.bgCard,
          border: `2px solid ${colors.accentGreen}50`,
          borderRadius: 16,
          padding: 30,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p
              style={{
                fontSize: 22,
                color: colors.accentGreen,
                fontFamily: 'monospace',
                margin: 0,
                marginBottom: 8,
              }}
            >
              WEEKDAYS 7-9:30 PM (Remote)
            </p>
            <p
              style={{
                fontSize: 22,
                color: colors.accentGreen,
                fontFamily: 'monospace',
                margin: 0,
              }}
            >
              SATURDAY 9 AM - 3 PM (On-site)
            </p>
          </div>
          <div
            style={{
              backgroundColor: colors.accentGreen,
              color: colors.bg,
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            16 hrs/week
          </div>
        </div>
      </div>

      {/* Page indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 60,
          display: 'flex',
          gap: 10,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === 2 ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === 2 ? colors.accent : colors.border,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =====================
// POST 4: CTA / ENROLL
// =====================
export const BootcampPost4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const textOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: colors.accent,
        }}
      />

      {/* Main content */}
      <div style={{ textAlign: 'center', opacity: textOpacity }}>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 'bold',
            color: colors.text,
            margin: 0,
            marginBottom: 20,
          }}
        >
          Ready to Learn to Code?
        </h2>
        <p
          style={{
            fontSize: 32,
            color: colors.textMuted,
            fontFamily: 'monospace',
            margin: 0,
            marginBottom: 50,
          }}
        >
          No shortcuts. No magic. Real skills.
        </p>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${ctaScale})`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            backgroundColor: colors.accent,
            color: colors.bg,
            fontSize: 48,
            fontWeight: 'bold',
            padding: '30px 80px',
            borderRadius: 16,
          }}
        >
          ENROLL NOW
        </div>
      </div>

      {/* URL */}
      <p
        style={{
          fontSize: 36,
          color: colors.textMuted,
          fontFamily: 'monospace',
          margin: 0,
          marginBottom: 40,
          opacity: textOpacity,
        }}
      >
        dogm.ai/enroll
      </p>

      {/* Benefits */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          opacity: textOpacity,
        }}
      >
        {['✓ Limited Seats', '✓ Early Bird Price', '✓ Starts Soon'].map((text, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: '12px 24px',
            }}
          >
            <p
              style={{
                fontSize: 22,
                color: colors.accentGreen,
                fontFamily: 'monospace',
                margin: 0,
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* Page indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          right: 60,
          display: 'flex',
          gap: 10,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: i === 3 ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === 3 ? colors.accent : colors.border,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
