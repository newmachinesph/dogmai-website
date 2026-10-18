import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface InfoSessionProps {
  cohortName: string;
  startDate: string;
  seatsAvailable: number;
}

export const InfoSession: React.FC<InfoSessionProps> = ({
  cohortName,
  startDate,
  seatsAvailable,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene timing
  const introEnd = 90; // 3 seconds
  const statsEnd = 240; // 8 seconds
  const whatYouLearnEnd = 480; // 16 seconds
  const scheduleEnd = 660; // 22 seconds
  const ctaEnd = 900; // 30 seconds

  // Intro animation (0-3s)
  const introOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const introScale = spring({
    frame: frame,
    fps,
    config: {
      damping: 200,
    },
  });

  // Stats animation (3-8s)
  const statsOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // What you learn animation (8-16s)
  const whatYouLearnOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Schedule animation (16-22s)
  const scheduleOpacity = interpolate(frame, [480, 510], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // CTA animation (22-30s)
  const ctaOpacity = interpolate(frame, [660, 690], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const ctaScale = spring({
    frame: frame - 660,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060503' }}>
      {/* Intro Scene (0-3s) */}
      {frame < introEnd && (
        <AbsoluteFill
          style={{
            opacity: introOpacity,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${introScale})`,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: 120,
                fontWeight: 'bold',
                color: '#f4efe6',
                marginBottom: 40,
                letterSpacing: '0.1em',
              }}
            >
              DOGM.AI
            </h1>
            <div
              style={{
                width: 200,
                height: 4,
                background: '#f97316',
                margin: '0 auto 40px',
              }}
            />
            <h2
              style={{
                fontSize: 48,
                color: '#d8c9b0',
                fontFamily: 'monospace',
                fontWeight: 400,
              }}
            >
              {cohortName} Cohort Info Session
            </h2>
          </div>
        </AbsoluteFill>
      )}

      {/* Stats Scene (3-8s) */}
      {frame >= introEnd && frame < statsEnd && (
        <AbsoluteFill
          style={{
            opacity: statsOpacity,
            padding: '80px 100px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 50 }}>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#f4efe6',
                marginBottom: 20,
              }}
            >
              Program Overview
            </h2>
            <div style={{ width: 120, height: 3, background: '#f97316' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 50,
            }}
          >
            <StatCard number="20" label="Weeks" delay={0} frame={frame - introEnd} fps={fps} />
            <StatCard number="3" label="Cities" delay={10} frame={frame - introEnd} fps={fps} />
            <StatCard number={seatsAvailable.toString()} label="Seats Available" delay={20} frame={frame - introEnd} fps={fps} />
            <StatCard number="Part-time" label="For Beginners" delay={30} frame={frame - introEnd} fps={fps} />
          </div>
        </AbsoluteFill>
      )}

      {/* What You Learn Scene (8-16s) */}
      {frame >= statsEnd && frame < whatYouLearnEnd && (
        <AbsoluteFill
          style={{
            opacity: whatYouLearnOpacity,
            padding: '80px 100px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 50 }}>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#f4efe6',
                marginBottom: 20,
              }}
            >
              What You'll Build
            </h2>
            <div style={{ width: 120, height: 3, background: '#f97316' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
            <BulletPoint text="6 Apps You'll Build" delay={0} frame={frame - statsEnd} fps={fps} />
            <BulletPoint text="Web Development Stack" delay={15} frame={frame - statsEnd} fps={fps} />
            <BulletPoint text="AI Tools (Weeks 5+)" delay={30} frame={frame - statsEnd} fps={fps} />
            <BulletPoint text="Deploy Your Projects" delay={45} frame={frame - statsEnd} fps={fps} />
          </div>
        </AbsoluteFill>
      )}

      {/* Schedule Scene (16-22s) */}
      {frame >= whatYouLearnEnd && frame < scheduleEnd && (
        <AbsoluteFill
          style={{
            opacity: scheduleOpacity,
            padding: '80px 100px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: '#f4efe6',
                marginBottom: 20,
              }}
            >
              Schedule
            </h2>
            <div style={{ width: 120, height: 3, background: '#f97316' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <ScheduleItem
              day="Mon-Fri"
              time="6:00 PM - 9:00 PM"
              detail="Remote sessions"
              delay={0}
              frame={frame - whatYouLearnEnd}
              fps={fps}
            />
            <ScheduleItem
              day="Saturday"
              time="9:00 AM - 3:00 PM"
              detail={`On-site in ${cohortName}`}
              delay={20}
              frame={frame - whatYouLearnEnd}
              fps={fps}
            />
          </div>

          <div
            style={{
              marginTop: 50,
              padding: 30,
              background: 'rgba(249, 115, 22, 0.1)',
              border: '2px solid rgba(249, 115, 22, 0.3)',
              borderRadius: 12,
            }}
          >
            <p
              style={{
                fontSize: 28,
                color: '#f4efe6',
                fontFamily: 'monospace',
              }}
            >
              Start Date: {startDate}
            </p>
          </div>
        </AbsoluteFill>
      )}

      {/* CTA Scene (22-30s) */}
      {frame >= scheduleEnd && (
        <AbsoluteFill
          style={{
            opacity: ctaOpacity,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${ctaScale})`,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                color: '#f4efe6',
                marginBottom: 40,
              }}
            >
              Ready to Start?
            </h2>
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#060503',
                background: '#f97316',
                padding: '30px 80px',
                borderRadius: 16,
                marginBottom: 50,
              }}
            >
              Apply Now
            </div>
            <p
              style={{
                fontSize: 36,
                color: '#d8c9b0',
                fontFamily: 'monospace',
              }}
            >
              dogm.ai/enroll
            </p>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// Helper Components
const StatCard: React.FC<{
  number: string;
  label: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ number, label, delay, frame, fps }) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <div
      style={{
        background: '#0d0906',
        border: '2px solid #2e2e2e',
        borderRadius: 12,
        padding: 50,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: '#f4efe6',
          marginBottom: 15,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#a8987a',
          fontFamily: 'monospace',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const BulletPoint: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, delay, frame, fps }) => {
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 25,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 40,
          color: '#f97316',
        }}
      >
        →
      </div>
      <div
        style={{
          fontSize: 36,
          color: '#d8c9b0',
          fontFamily: 'monospace',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const ScheduleItem: React.FC<{
  day: string;
  time: string;
  detail: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ day, time, detail, delay, frame, fps }) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <div
      style={{
        background: '#0d0906',
        border: '2px solid #2e2e2e',
        borderRadius: 12,
        padding: 40,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: '#f97316',
          marginBottom: 15,
          fontFamily: 'monospace',
        }}
      >
        {day}
      </div>
      <div
        style={{
          fontSize: 36,
          color: '#f4efe6',
          marginBottom: 12,
        }}
      >
        {time}
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#a8987a',
          fontFamily: 'monospace',
        }}
      >
        {detail}
      </div>
    </div>
  );
};
