import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring, Sequence, Audio, staticFile } from 'remotion';

// Font families
const fonts = {
  sans: 'Raveo, sans-serif',
  mono: 'JetBrains Mono, monospace',
};

export interface FullInfoSessionProps {
  cohortName: string;
  startDate: string;
  seatsAvailable: number;
}

// Design tokens for 720p (1280x720)
const colors = {
  bg: '#060503',
  bgCard: '#0d0906',
  bgCardHover: '#151210',
  text: '#f4efe6',
  textMuted: '#d8c9b0',
  textFaded: '#a8987a',
  accent: '#f97316',
  accentGlow: 'rgba(249, 115, 22, 0.3)',
  accentGreen: '#34d399',
  accentGreenGlow: 'rgba(52, 211, 153, 0.3)',
  accentRed: '#ef4444',
  accentRedGlow: 'rgba(239, 68, 68, 0.3)',
  border: '#2e2e2e',
  borderLight: '#3a3a3a',
};

export const FullInfoSession: React.FC<FullInfoSessionProps> = ({
  cohortName,
  startDate,
  seatsAvailable,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PAUSE = 30;
  const dur = [150, 480, 240, 390, 360, 270, 360, 240, 330, 390, 390, 450, 360];
  const starts: number[] = [0];
  for (let i = 0; i < 12; i++) {
    starts.push(starts[i] + dur[i] + PAUSE);
  }

  const audio = {
    s1: { start: starts[0], frames: dur[0] },
    s2: { start: starts[1], frames: dur[1] },
    s3: { start: starts[2], frames: dur[2] },
    s4: { start: starts[3], frames: dur[3] },
    s5: { start: starts[4], frames: dur[4] },
    s6: { start: starts[5], frames: dur[5] },
    s7: { start: starts[6], frames: dur[6] },
    s8: { start: starts[7], frames: dur[7] },
    s9: { start: starts[8], frames: dur[8] },
    s10: { start: starts[9], frames: dur[9] },
    s11: { start: starts[10], frames: dur[10] },
    s12: { start: starts[11], frames: dur[11] },
    s13: { start: starts[12], frames: dur[12] },
  };

  const TOTAL_FRAMES = starts[12] + dur[12];

  const t = {
    intro: { start: audio.s1.start, duration: audio.s2.start - audio.s1.start },
    problem: { start: audio.s2.start, duration: audio.s3.start - audio.s2.start },
    solution: { start: audio.s3.start, duration: audio.s4.start - audio.s3.start },
    overview: { start: audio.s4.start, duration: audio.s5.start - audio.s4.start },
    phases: { start: audio.s5.start, duration: audio.s9.start - audio.s5.start },
    techStack: { start: audio.s9.start, duration: audio.s10.start - audio.s9.start },
    schedule: { start: audio.s10.start, duration: audio.s11.start - audio.s10.start },
    projects: { start: audio.s11.start, duration: audio.s12.start - audio.s11.start },
    pricing: { start: audio.s12.start, duration: audio.s13.start - audio.s12.start },
    cta: { start: audio.s13.start, duration: TOTAL_FRAMES - audio.s13.start },
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily: fonts.sans }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
          @font-face {
            font-family: 'Raveo';
            src: url('${staticFile('fonts/variable/RaveoVF.woff2')}') format('woff2');
            font-weight: 400 730;
            font-style: normal;
            font-display: swap;
          }
        `}
      </style>

      {/* Audio tracks */}
      <Sequence from={audio.s1.start}><Audio src={staticFile('infosession/speech1.mp3')} /></Sequence>
      <Sequence from={audio.s2.start}><Audio src={staticFile('infosession/speech2.mp3')} /></Sequence>
      <Sequence from={audio.s3.start}><Audio src={staticFile('infosession/speech3.mp3')} /></Sequence>
      <Sequence from={audio.s4.start}><Audio src={staticFile('infosession/speech4.mp3')} /></Sequence>
      <Sequence from={audio.s5.start}><Audio src={staticFile('infosession/speech5.mp3')} /></Sequence>
      <Sequence from={audio.s6.start}><Audio src={staticFile('infosession/speech6.mp3')} /></Sequence>
      <Sequence from={audio.s7.start}><Audio src={staticFile('infosession/speech7.mp3')} /></Sequence>
      <Sequence from={audio.s8.start}><Audio src={staticFile('infosession/speech8.mp3')} /></Sequence>
      <Sequence from={audio.s9.start}><Audio src={staticFile('infosession/speech9.mp3')} /></Sequence>
      <Sequence from={audio.s10.start}><Audio src={staticFile('infosession/speech10.mp3')} /></Sequence>
      <Sequence from={audio.s11.start}><Audio src={staticFile('infosession/speech11.mp3')} /></Sequence>
      <Sequence from={audio.s12.start}><Audio src={staticFile('infosession/speech12.mp3')} /></Sequence>
      <Sequence from={audio.s13.start}><Audio src={staticFile('infosession/speech13.mp3')} /></Sequence>

      <Sequence from={t.intro.start} durationInFrames={t.intro.duration}>
        <IntroScene frame={frame - t.intro.start} fps={fps} />
      </Sequence>
      <Sequence from={t.problem.start} durationInFrames={t.problem.duration}>
        <ProblemScene frame={frame - t.problem.start} fps={fps} />
      </Sequence>
      <Sequence from={t.solution.start} durationInFrames={t.solution.duration}>
        <SolutionScene frame={frame - t.solution.start} fps={fps} />
      </Sequence>
      <Sequence from={t.overview.start} durationInFrames={t.overview.duration}>
        <OverviewScene frame={frame - t.overview.start} fps={fps} seatsAvailable={seatsAvailable} />
      </Sequence>
      <Sequence from={t.phases.start} durationInFrames={t.phases.duration}>
        <PhasesScene frame={frame - t.phases.start} fps={fps} phaseBoundaries={[0, audio.s6.start - audio.s5.start, audio.s7.start - audio.s5.start, audio.s8.start - audio.s5.start, audio.s9.start - audio.s5.start]} />
      </Sequence>
      <Sequence from={t.techStack.start} durationInFrames={t.techStack.duration}>
        <TechStackScene frame={frame - t.techStack.start} fps={fps} />
      </Sequence>
      <Sequence from={t.schedule.start} durationInFrames={t.schedule.duration}>
        <ScheduleScene frame={frame - t.schedule.start} fps={fps} />
      </Sequence>
      <Sequence from={t.projects.start} durationInFrames={t.projects.duration}>
        <ProjectsScene frame={frame - t.projects.start} fps={fps} />
      </Sequence>
      <Sequence from={t.pricing.start} durationInFrames={t.pricing.duration}>
        <PricingScene frame={frame - t.pricing.start} fps={fps} />
      </Sequence>
      <Sequence from={t.cta.start} durationInFrames={t.cta.duration}>
        <CTAScene frame={frame - t.cta.start} fps={fps} cohortName={cohortName} startDate={startDate} seatsAvailable={seatsAvailable} />
      </Sequence>
    </AbsoluteFill>
  );
};

// Scene 1: Intro - Full centered with subtle gradient
const IntroScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const glowIntensity = interpolate(frame, [0, 60, 120], [0, 1, 0.7]);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, ${colors.bgCard} 0%, ${colors.bg} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity,
      transform: `scale(${scale})`,
    }}>
      <h1 style={{
        fontSize: 100,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 16,
        letterSpacing: '0.15em',
        textShadow: `0 0 ${40 * glowIntensity}px ${colors.accentGlow}`,
      }}>
        DOGM.AI
      </h1>
      <div style={{
        width: 180,
        height: 4,
        background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        marginBottom: 24,
        boxShadow: `0 0 20px ${colors.accentGlow}`,
      }} />
      <p style={{ fontSize: 32, color: colors.textMuted, fontFamily: fonts.mono, letterSpacing: '0.05em' }}>
        AI-Native Coding Bootcamp
      </p>
      <p style={{ fontSize: 20, color: colors.textFaded, fontFamily: fonts.mono, marginTop: 40, opacity: 0.8 }}>
        Everything you need to know
      </p>
    </AbsoluteFill>
  );
};

// Scene 2: Problem - Left-aligned with dramatic reveal
const ProblemScene: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const slideIn = interpolate(frame, [0, 30], [-50, 0], { extrapolateRight: 'clamp' });

  const problems = [
    "You can't debug",
    "You can't think independently",
    "You become dependent on AI",
    "AI replaces you",
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.bg} 0%, #0a0705 100%)`,
      padding: '60px 100px',
      opacity,
    }}>
      <div style={{ transform: `translateX(${slideIn}px)`, marginBottom: 40 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accentRed}15`,
          border: `1px solid ${colors.accentRed}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accentRed, fontFamily: fonts.mono, fontWeight: 600 }}>
            // THE PROBLEM
          </span>
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 700, color: colors.text, marginBottom: 12, lineHeight: 1.2 }}>
          Everyone's using AI to code.
        </h2>
        <h3 style={{ fontSize: 30, color: colors.textMuted, fontWeight: 400 }}>
          But without fundamentals...
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {problems.map((problem, i) => {
          const itemOpacity = interpolate(frame, [60 + i * 40, 90 + i * 40], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          const itemSlide = interpolate(frame, [60 + i * 40, 90 + i * 40], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: itemOpacity,
              transform: `translateX(${itemSlide}px)`,
              background: `linear-gradient(90deg, ${colors.accentRed}08, transparent)`,
              padding: '14px 20px',
              borderLeft: `3px solid ${colors.accentRed}`,
              borderRadius: '0 8px 8px 0',
            }}>
              <span style={{ fontSize: 22, color: colors.accentRed, fontWeight: 700 }}>✗</span>
              <span style={{ fontSize: 26, color: colors.text, fontFamily: fonts.mono }}>{problem}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Solution - Centered with emphasis
const SolutionScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps, config: { damping: 200 } });
  const firstWordScale = spring({ frame: frame - 20, fps, config: { damping: 150 } });
  const secondWordScale = spring({ frame: frame - 50, fps, config: { damping: 150 } });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, #0a0806 0%, ${colors.bg} 70%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity,
      transform: `scale(${scale})`,
    }}>
      <div style={{
        display: 'inline-block',
        background: `${colors.accentGreen}15`,
        border: `1px solid ${colors.accentGreen}40`,
        borderRadius: 6,
        padding: '6px 14px',
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 14, color: colors.accentGreen, fontFamily: fonts.mono, fontWeight: 600 }}>
          // THE SOLUTION
        </span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 30, color: colors.textMuted, marginBottom: 4 }}>Learn to code</p>
        <h1 style={{
          fontSize: 72,
          fontWeight: 700,
          color: colors.accent,
          marginBottom: 4,
          transform: `scale(${firstWordScale})`,
          textShadow: `0 0 40px ${colors.accentGlow}`,
        }}>
          FIRST.
        </h1>
        <p style={{ fontSize: 30, color: colors.textMuted, marginBottom: 4 }}>Then use AI</p>
        <h1 style={{
          fontSize: 72,
          fontWeight: 700,
          color: colors.accent,
          transform: `scale(${secondWordScale})`,
          textShadow: `0 0 40px ${colors.accentGlow}`,
        }}>
          strategically.
        </h1>
      </div>

      <p style={{
        fontSize: 20,
        color: colors.textFaded,
        fontFamily: fonts.mono,
        marginTop: 28,
        padding: '10px 22px',
        background: `${colors.accent}10`,
        borderRadius: 8,
      }}>
        Build WITH AI, not depend on it.
      </p>
    </AbsoluteFill>
  );
};

// Scene 4: Overview - Grid with animated cards
const OverviewScene: React.FC<{ frame: number; fps: number; seatsAvailable: number }> = ({ frame, fps, seatsAvailable }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const stats = [
    { number: '20', label: 'Weeks', color: colors.accent },
    { number: '100%', label: 'Remote', color: colors.accentGreen },
    { number: seatsAvailable.toString(), label: 'Seats', color: '#60a5fa' },
    { number: '320+', label: 'Hours', color: '#a78bfa' },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, #080604 100%)`,
      padding: '50px 80px',
      opacity,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // THE PROGRAM
          </span>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: colors.text }}>
          Part-Time. Beginner-Friendly.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, flex: 1 }}>
        {stats.map((stat, i) => {
          const cardScale = spring({ frame: frame - 30 - i * 15, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{
              background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
              border: `2px solid ${stat.color}30`,
              borderRadius: 16,
              padding: '35px 20px',
              transform: `scale(${cardScale})`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: `0 8px 32px ${stat.color}15`,
            }}>
              <div style={{
                fontSize: 56,
                fontWeight: 700,
                color: stat.color,
                textShadow: `0 0 30px ${stat.color}40`,
                marginBottom: 8,
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: 18, color: colors.textFaded, fontFamily: fonts.mono, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 22, color: colors.textMuted, marginTop: 30, textAlign: 'center' }}>
        No prior coding experience required.
      </p>
    </AbsoluteFill>
  );
};

// Scene 5: Phases - Full card with progress indicator
const PhasesScene: React.FC<{ frame: number; fps: number; phaseBoundaries: number[] }> = ({ frame, fps, phaseBoundaries }) => {
  const phases = [
    { num: 1, name: 'Foundations', weeks: '1-4', items: ['HTML, CSS, JavaScript', 'Git & Version Control'], ai: 'No AI allowed', color: colors.accentRed },
    { num: 2, name: 'Interactive Apps', weeks: '5-10', items: ['React & Components', 'APIs & State'], ai: 'AI as study partner', color: colors.accent },
    { num: 3, name: 'Backend Power', weeks: '11-15', items: ['Node.js & PostgreSQL', 'Authentication'], ai: 'Strategic AI use', color: colors.accentGreen },
    { num: 4, name: 'Ship It', weeks: '16-20', items: ['Full-stack capstone', 'Deploy portfolio'], ai: 'Leverage AI fully', color: '#60a5fa' },
  ];

  let phaseIndex = 0;
  let phaseFrame = frame;
  for (let i = 0; i < 4; i++) {
    if (frame >= phaseBoundaries[i] && frame < phaseBoundaries[i + 1]) {
      phaseIndex = i;
      phaseFrame = frame - phaseBoundaries[i];
      break;
    }
  }
  const currentPhase = phases[phaseIndex];
  const opacity = interpolate(phaseFrame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const cardSlide = interpolate(phaseFrame, [0, 25], [40, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.bg} 0%, #080604 100%)`,
      padding: '50px 80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // THE 4 PHASES
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {phases.map((p, i) => (
            <div key={i} style={{
              flex: 1,
              height: 8,
              background: i <= phaseIndex ? p.color : colors.border,
              borderRadius: 4,
              transition: 'background 0.3s',
              boxShadow: i <= phaseIndex ? `0 0 12px ${p.color}50` : 'none',
            }} />
          ))}
        </div>
      </div>

      <div style={{
        flex: 1,
        opacity,
        transform: `translateY(${cardSlide}px)`,
        background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
        border: `2px solid ${currentPhase.color}50`,
        borderRadius: 20,
        padding: 40,
        boxShadow: `0 12px 48px ${currentPhase.color}20`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: `${currentPhase.color}20`,
              border: `2px solid ${currentPhase.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: currentPhase.color,
            }}>
              {currentPhase.num}
            </div>
            <h3 style={{ fontSize: 36, fontWeight: 700, color: colors.text }}>
              {currentPhase.name}
            </h3>
          </div>
          <span style={{
            fontSize: 20,
            color: currentPhase.color,
            fontFamily: fonts.mono,
            background: `${currentPhase.color}15`,
            padding: '8px 16px',
            borderRadius: 8,
          }}>
            Weeks {currentPhase.weeks}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          {currentPhase.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: `${currentPhase.color}08`,
              padding: '16px 24px',
              borderRadius: 12,
              borderLeft: `4px solid ${currentPhase.color}`,
            }}>
              <span style={{ color: currentPhase.color, fontSize: 24 }}>→</span>
              <span style={{ fontSize: 26, color: colors.text }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 24,
          background: `${currentPhase.color}15`,
          border: `1px solid ${currentPhase.color}40`,
          borderRadius: 12,
          padding: '14px 24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          alignSelf: 'flex-start',
        }}>
          <span style={{ fontSize: 20, color: colors.textMuted }}>AI Policy:</span>
          <span style={{ fontSize: 20, color: currentPhase.color, fontFamily: fonts.mono, fontWeight: 600 }}>
            {currentPhase.ai}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Tech Stack - Modern grid
const TechStackScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const techs = [
    { name: 'JavaScript', color: '#facc15' },
    { name: 'React', color: '#22d3ee' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'Node.js', color: '#4ade80' },
    { name: 'PostgreSQL', color: '#60a5fa' },
    { name: 'Git', color: '#fb923c' },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, #080604 100%)`,
      padding: '50px 80px',
      opacity,
    }}>
      <div style={{ marginBottom: 35 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // TECH STACK
          </span>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: colors.text }}>
          Industry-Standard Tools
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {techs.map((tech, i) => {
          const cardScale = spring({ frame: frame - 40 - i * 12, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
              border: `2px solid ${tech.color}40`,
              borderRadius: 14,
              padding: '28px 24px',
              transform: `scale(${cardScale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              boxShadow: `0 4px 24px ${tech.color}15`,
            }}>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: tech.color,
                boxShadow: `0 0 16px ${tech.color}60`,
              }} />
              <span style={{ fontSize: 26, fontWeight: 600, color: colors.text }}>{tech.name}</span>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 22, color: colors.textMuted, marginTop: 40, textAlign: 'center' }}>
        Skills employers actually want.
      </p>
    </AbsoluteFill>
  );
};

// Scene 7: Schedule
const ScheduleScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const schedules = [
    { day: 'Mon-Thu', time: '7:00 - 9:30 PM', detail: 'Live remote sessions', delay: 25 },
    { day: 'Saturday', time: '9 AM - 3 PM', detail: 'Deep-dive workshops', delay: 50 },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, #080604 100%)`,
      padding: '50px 80px',
      opacity,
    }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // SCHEDULE
          </span>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: colors.text }}>
          Fits Your Life
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {schedules.map((s, i) => {
          const cardScale = spring({ frame: frame - s.delay, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{
              background: `linear-gradient(90deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
              border: `2px solid ${colors.border}`,
              borderRadius: 16,
              padding: '28px 32px',
              transform: `scale(${cardScale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 40,
            }}>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.accent,
                fontFamily: fonts.mono,
                minWidth: 140,
                padding: '10px 20px',
                background: `${colors.accent}15`,
                borderRadius: 10,
                textAlign: 'center',
              }}>
                {s.day}
              </div>
              <div>
                <div style={{ fontSize: 28, color: colors.text, fontWeight: 600 }}>{s.time}</div>
                <div style={{ fontSize: 18, color: colors.textFaded, fontFamily: fonts.mono }}>{s.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 30,
        padding: '22px 32px',
        background: `linear-gradient(90deg, ${colors.accent}15, ${colors.accentGreen}15)`,
        border: `2px solid ${colors.accent}30`,
        borderRadius: 14,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 24, color: colors.text }}>
          <strong style={{ color: colors.accent }}>16 hrs/week</strong> structured learning + independent practice
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Projects
const ProjectsScene: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const projects = [
    { name: 'Your first live website', icon: '🌐' },
    { name: 'Interactive web application', icon: '⚡' },
    { name: 'Full-stack prototype', icon: '🔧' },
    { name: 'Complete capstone project', icon: '🚀' },
  ];

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${colors.bg} 0%, #080604 100%)`,
      padding: '50px 80px',
      opacity,
    }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // WHAT YOU'LL BUILD
          </span>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: colors.text }}>
          4 Real, Deployable Projects
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {projects.map((project, i) => {
          const itemOpacity = interpolate(frame, [40 + i * 35, 70 + i * 35], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          const itemSlide = interpolate(frame, [40 + i * 35, 70 + i * 35], [30, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              opacity: itemOpacity,
              transform: `translateX(${itemSlide}px)`,
              background: `linear-gradient(135deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
              border: `2px solid ${colors.accentGreen}30`,
              borderRadius: 14,
              padding: '24px 28px',
            }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                background: `${colors.accentGreen}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}>
                {project.icon}
              </div>
              <span style={{ fontSize: 24, color: colors.text, fontWeight: 500 }}>{project.name}</span>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 20, color: colors.textMuted, marginTop: 30, textAlign: 'center' }}>
        Portfolio-ready work you can show employers.
      </p>
    </AbsoluteFill>
  );
};

// Scene 9: Pricing
const PricingScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const priceScale = spring({ frame: frame - 35, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, #0a0806 0%, ${colors.bg} 70%)`,
      padding: '50px 80px',
      opacity,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 25, textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          background: `${colors.accent}15`,
          border: `1px solid ${colors.accent}40`,
          borderRadius: 6,
          padding: '6px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: fonts.mono, fontWeight: 600 }}>
            // YOUR INVESTMENT
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 40, justifyContent: 'center', transform: `scale(${priceScale})`, flex: 1, alignItems: 'center' }}>
        <div style={{
          textAlign: 'center',
          background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
          border: `3px solid ${colors.accent}`,
          borderRadius: 20,
          padding: '35px 45px',
          minWidth: 280,
          boxShadow: `0 12px 48px ${colors.accentGlow}`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            background: colors.accent,
            color: colors.bg,
            fontSize: 12,
            fontWeight: 700,
            padding: '6px 16px',
            borderRadius: 20,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Best Value
          </div>
          <div style={{ fontSize: 20, color: colors.textFaded, marginBottom: 8 }}>Full Payment</div>
          <div style={{ fontSize: 18, color: colors.textMuted }}>PHP</div>
          <div style={{ fontSize: 64, fontWeight: 700, color: colors.accent, textShadow: `0 0 30px ${colors.accentGlow}` }}>40,000</div>
          <div style={{ fontSize: 18, color: colors.accentGreen, fontWeight: 600 }}>Save ₱5,000</div>
        </div>

        <div style={{
          textAlign: 'center',
          background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
          border: `3px solid ${colors.border}`,
          borderRadius: 20,
          padding: '35px 45px',
          minWidth: 280,
        }}>
          <div style={{ fontSize: 20, color: colors.textFaded, marginBottom: 8 }}>Installment</div>
          <div style={{ fontSize: 18, color: colors.textMuted }}>PHP</div>
          <div style={{ fontSize: 64, fontWeight: 700, color: colors.text }}>9,000</div>
          <div style={{ fontSize: 18, color: colors.textFaded }}>× 5 months</div>
        </div>
      </div>

      <div style={{
        marginTop: 25,
        padding: '18px 28px',
        background: `linear-gradient(90deg, ${colors.accentGreen}10, ${colors.accent}10)`,
        border: `2px solid ${colors.accentGreen}30`,
        borderRadius: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40 }}>
          {['Live instruction', 'Code reviews', 'Mentor support', 'Career guidance'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: colors.accentGreen, fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 17, color: colors.text }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: CTA
const CTAScene: React.FC<{ frame: number; fps: number; cohortName: string; startDate: string; seatsAvailable: number }> = ({ frame, fps, startDate, seatsAvailable }) => {
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps, config: { damping: 200 } });
  const buttonPulse = interpolate(frame % 60, [0, 30, 60], [1, 1.06, 1]);
  const glowIntensity = interpolate(frame % 90, [0, 45, 90], [0.5, 1, 0.5]);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at center, #0c0906 0%, ${colors.bg} 60%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity,
      transform: `scale(${scale})`,
    }}>
      <h1 style={{
        fontSize: 90,
        fontWeight: 700,
        color: colors.text,
        marginBottom: 8,
        letterSpacing: '0.15em',
        textShadow: `0 0 ${50 * glowIntensity}px ${colors.accentGlow}`,
      }}>
        DOGM.AI
      </h1>
      <div style={{
        width: 120,
        height: 4,
        background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        marginBottom: 35,
        boxShadow: `0 0 20px ${colors.accentGlow}`,
      }} />

      <h2 style={{ fontSize: 36, color: colors.text, marginBottom: 10, fontWeight: 500 }}>
        Don't let AI replace you.
      </h2>
      <h3 style={{ fontSize: 32, color: colors.accentGreen, marginBottom: 35, fontWeight: 600 }}>
        Learn to control it.
      </h3>

      <div style={{
        background: `linear-gradient(180deg, ${colors.bgCard} 0%, ${colors.bg} 100%)`,
        border: `2px solid ${colors.border}`,
        borderRadius: 16,
        padding: '24px 40px',
        marginBottom: 30,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 26, color: colors.text, marginBottom: 8, fontWeight: 600 }}>
          Cohort 1 · {startDate}
        </div>
        <div style={{ fontSize: 20, color: colors.textFaded }}>
          {seatsAvailable} seats · PHP 40,000
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${colors.accent} 0%, #ea580c 100%)`,
        color: colors.bg,
        fontSize: 30,
        fontWeight: 700,
        padding: '18px 65px',
        borderRadius: 40,
        transform: `scale(${buttonPulse})`,
        boxShadow: `0 8px 32px ${colors.accentGlow}`,
      }}>
        ENROLL NOW
      </div>

      <p style={{ fontSize: 22, color: colors.textMuted, fontFamily: fonts.mono, marginTop: 30 }}>
        dogm.ai/enroll
      </p>
    </AbsoluteFill>
  );
};
