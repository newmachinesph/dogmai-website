'use client';

import { useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import { getDayContent, getWeekContent, type DayContent } from '../curriculumData';
import presentationStyles from '../PresentationStyles';

// Emoji mappings for topics
const topicEmojis: Record<string, string> = {
  'internet': '🌐',
  'dns': '📖',
  'server': '🖥️',
  'client': '💻',
  'http': '📡',
  'html': '🏗️',
  'css': '🎨',
  'javascript': '⚡',
  'react': '⚛️',
  'node': '🟢',
  'database': '🗄️',
  'api': '🔌',
  'git': '📚',
  'deploy': '🚀',
  'test': '🧪',
  'security': '🔒',
  'form': '📝',
  'route': '🛣️',
  'state': '🧠',
  'component': '🧩',
  'hook': '🪝',
  'style': '💅',
  'animation': '✨',
  'auth': '🔐',
  'upload': '📤',
  'debug': '🔍',
  'default': '📌',
};

function getEmojiForTopic(topic: string): string {
  const lowerTopic = topic.toLowerCase();
  for (const [key, emoji] of Object.entries(topicEmojis)) {
    if (lowerTopic.includes(key)) return emoji;
  }
  return topicEmojis.default;
}

// Phase colors
const phaseColors: Record<number, { bg: string; text: string; name: string }> = {
  1: { bg: 'rgba(34, 197, 94, 0.2)', text: '#22c55e', name: 'Core Foundations' },
  2: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6', name: 'Frontend Development' },
  3: { bg: 'rgba(168, 85, 247, 0.2)', text: '#a855f7', name: 'Backend & Databases' },
};

export default function DayPresentation() {
  const params = useParams();
  const dayParam = params.day as string;

  // Handle both "day1" format and just "1" format
  const dayNumber = parseInt(dayParam.replace('day', ''), 10);

  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);

  const dayContent = getDayContent(dayNumber);
  const weekContent = dayContent ? getWeekContent(dayContent.week) : undefined;

  useEffect(() => {
    if (deckRef.current && !revealRef.current && dayContent) {
      revealRef.current = new Reveal(deckRef.current, {
        hash: true,
        slideNumber: true,
        progress: true,
        controls: true,
        center: true,
        transition: 'slide',
        backgroundTransition: 'fade',
        width: 1280,
        height: 720,
      });
      revealRef.current.initialize();
    }

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, [dayContent]);

  if (!dayContent || !weekContent) {
    notFound();
  }

  const phase = phaseColors[weekContent.phase];
  const nextDay = getDayContent(dayNumber + 1);

  return (
    <>
      <style jsx global>{presentationStyles}</style>

      <a href="/presentations" className="back-button">
        ← Back
      </a>
      <a href={`/api/generate-pptx/day${dayNumber}`} className="download-button">
        ↓ Download PPTX
      </a>

      <div className="reveal" ref={deckRef}>
        <div className="slides">

          {/* Slide 1: Title */}
          <section className="center-slide">
            <div style={{ marginBottom: '10px' }}>
              <span className="phase-badge" style={{ background: phase.text, color: weekContent.phase === 1 ? '#000' : '#fff' }}>
                Phase {weekContent.phase}: {phase.name}
              </span>
            </div>
            <div className="section-label">// WEEK {dayContent.week} • DAY {dayContent.dayOfWeek}</div>
            <div className="accent-line" style={{ margin: '0 auto 20px' }}></div>
            <h1>{dayContent.title}</h1>
            <p style={{ fontSize: '1.2em', color: '#d8c9b0' }}>{dayContent.subtitle}</p>
            <p style={{ fontSize: '1em', marginTop: '20px' }}>{dayContent.description}</p>
            <div style={{ marginTop: '60px' }}>
              <p style={{ fontSize: '1.2em', color: '#f4efe6', fontWeight: 'bold' }}>DOGM.AI</p>
              <p className="mono text-muted" style={{ fontSize: '0.8em' }}>AI-Native Coding Bootcamp</p>
            </div>
          </section>

          {/* Slide 2: Agenda */}
          <section>
            <div className="section-label">// TODAY'S AGENDA</div>
            <h2>What We'll Learn Today</h2>
            <div style={{ marginTop: '30px' }}>
              {dayContent.topics.map((topic, idx) => (
                <div key={idx} className="agenda-item">
                  <span style={{ fontSize: '1.5em' }}>{getEmojiForTopic(topic)}</span>
                  <span className="text-green" style={{ fontSize: '1.2em', fontWeight: 'bold', minWidth: '40px' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '1.1em' }}>{topic}</span>
                </div>
              ))}
            </div>
            {dayContent.project && (
              <div className="highlight-box" style={{ marginTop: '20px' }}>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: '1.3em', marginRight: '10px' }}>🚀</span>
                  <span className="text-green" style={{ fontWeight: 'bold' }}>PROJECT: </span>
                  {dayContent.project}
                </p>
              </div>
            )}
          </section>

          {/* Slides 3-7: Topic Details - Generate based on topics */}
          {dayContent.topics.map((topic, idx) => (
            <section key={idx}>
              <div className="section-label">// TOPIC {idx + 1}</div>
              <h2>{topic}</h2>
              <div className="flex-center" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <span style={{ fontSize: '6em' }}>{getEmojiForTopic(topic)}</span>
              </div>
              <div className="info-box">
                <p style={{ fontSize: '1.1em', margin: 0 }}>
                  Let's explore this topic in detail...
                </p>
              </div>
            </section>
          ))}

          {/* Project Slide */}
          {dayContent.project && (
            <section>
              <div className="section-label">// HANDS-ON PROJECT 🚀</div>
              <h2>Let's Build Something!</h2>
              <div className="highlight-box" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '3em' }}>🚀</span>
                  <div>
                    <h3 className="text-green" style={{ margin: 0 }}>{dayContent.project}</h3>
                  </div>
                </div>
                <p className="mono text-muted">
                  Apply what you've learned by building a real project!
                </p>
              </div>
              <div className="warning-box" style={{ marginTop: '20px' }}>
                <p style={{ margin: 0 }}>
                  <span className="text-orange" style={{ fontWeight: 'bold' }}>Remember: </span>
                  Write every line yourself. No copy-pasting! 💪
                </p>
              </div>
            </section>
          )}

          {/* Key Takeaways */}
          <section>
            <div className="section-label">// KEY TAKEAWAYS 🧠</div>
            <h2>What We Learned Today</h2>
            <div style={{ marginTop: '30px' }}>
              {dayContent.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="takeaway-item">
                  <span className="text-green" style={{ fontSize: '1.3em' }}>✓</span>
                  <span style={{ fontSize: '1.1em' }}>{takeaway}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What's Next */}
          <section>
            <div className="section-label">// COMING UP NEXT ⏭️</div>
            <h2>Preview: {nextDay ? `Day ${nextDay.day}` : 'Next Session'}</h2>
            <div className="warning-box" style={{ marginTop: '30px' }}>
              <h3 className="text-orange" style={{ marginTop: 0 }}>
                {nextDay?.title || dayContent.nextDayPreview}
              </h3>
              <p className="mono" style={{ fontSize: '1.1em' }}>
                {dayContent.nextDayPreview}
              </p>
            </div>
            {dayContent.homework && dayContent.homework.length > 0 && (
              <div className="highlight-box" style={{ marginTop: '20px' }}>
                <h3 className="text-green" style={{ marginTop: 0 }}>📚 HOMEWORK</h3>
                <ol className="mono">
                  {dayContent.homework.map((hw, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{hw}</li>
                  ))}
                </ol>
              </div>
            )}
          </section>

          {/* Thank You */}
          <section className="center-slide">
            <div style={{ fontSize: '5em', marginBottom: '20px' }}>🎉</div>
            <div className="section-label">// END OF DAY {dayContent.day}</div>
            <div className="accent-line" style={{ margin: '20px auto' }}></div>
            <h1>Great Job Today!</h1>
            <p style={{ fontSize: '1.2em' }}>Any questions? Let's discuss! 🙋</p>
            <div className="flex-center" style={{ marginTop: '40px', marginBottom: '40px' }}>
              <span style={{ fontSize: '3em' }}>👏</span>
              <span style={{ fontSize: '3em' }}>🚀</span>
              <span style={{ fontSize: '3em' }}>💪</span>
            </div>
            <div>
              <p style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#f4efe6' }}>DOGM.AI</p>
              <p className="mono text-muted">hello@dogm.ai • dogm.ai</p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
