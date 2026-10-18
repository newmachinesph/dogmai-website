import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { programs, ProgramSlug, ProgramData, CurriculumWeek } from '../programs/praxis/data/programs';

// D pattern from LogoIcon
const dPattern = [
  [1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 0],
];

interface ProgramColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentBg: string;
}

const programColorMap: Record<ProgramSlug, ProgramColors> = {
  'ai-agent-builder': {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    accent: '#8b5cf6',
    accentBg: 'rgba(139, 92, 246, 0.08)',
  },
  'ai-assisted-coding': {
    primary: '#06b6d4',
    primaryLight: '#22d3ee',
    primaryDark: '#0891b2',
    accent: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.08)',
  },
  'ai-media-studio': {
    primary: '#f59e0b',
    primaryLight: '#fbbf24',
    primaryDark: '#d97706',
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.08)',
  },
};

const DogmLogo: React.FC<{ dotSize?: number; spacing?: number; accentColor: string }> = ({
  dotSize = 4,
  spacing = 6,
  accentColor,
}) => {
  const dots: React.ReactElement[] = [];
  dPattern.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 1) {
        const isOuterCurve =
          colIdx >= 4 || (rowIdx <= 1 && colIdx >= 3) || (rowIdx >= 7 && colIdx >= 3);
        dots.push(
          <View
            key={`${rowIdx}-${colIdx}`}
            style={{
              position: 'absolute',
              left: colIdx * spacing,
              top: rowIdx * spacing,
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: isOuterCurve ? accentColor : '#1a1a1a',
            }}
          />
        );
      }
    });
  });
  return (
    <View style={{ width: 7 * spacing, height: 9 * spacing, position: 'relative' }}>{dots}</View>
  );
};

const createStyles = (c: ProgramColors) =>
  StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      paddingTop: 40,
      paddingBottom: 60,
      paddingLeft: 44,
      paddingRight: 44,
      fontFamily: 'Helvetica',
    },
    coverPage: {
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      padding: 0,
      fontFamily: 'Helvetica',
    },
    coverAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: 6,
      backgroundColor: c.primary,
    },
    coverContent: {
      padding: 50,
      paddingTop: 50,
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    logoSub: {
      fontSize: 10,
      color: c.primary,
      textTransform: 'uppercase',
      fontFamily: 'Courier',
      letterSpacing: 2,
      marginTop: 2,
    },
    coverBadge: {
      backgroundColor: c.accentBg,
      borderWidth: 1,
      borderColor: c.primary,
      borderStyle: 'solid',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 4,
      alignSelf: 'flex-start',
      marginBottom: 16,
    },
    coverBadgeText: {
      fontSize: 9,
      color: c.primary,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    coverTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    coverTagline: {
      fontSize: 14,
      color: '#555555',
      marginBottom: 24,
      lineHeight: 1.5,
    },
    coverDesc: {
      fontSize: 10,
      color: '#444444',
      lineHeight: 1.6,
      fontFamily: 'Courier',
      marginBottom: 24,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 20,
    },
    statBox: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      borderWidth: 1,
      borderColor: '#e5e5e5',
      borderStyle: 'solid',
      borderRadius: 6,
      padding: 12,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: c.primary,
      marginBottom: 2,
    },
    statLabel: {
      fontSize: 7,
      color: '#888888',
      fontFamily: 'Courier',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    // Header
    header: {
      marginBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: c.primary,
      borderBottomStyle: 'solid',
      paddingBottom: 12,
    },
    headerSub: {
      fontSize: 10,
      color: c.primary,
      textTransform: 'uppercase',
      fontFamily: 'Courier',
      letterSpacing: 2,
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginTop: 4,
      letterSpacing: -0.5,
    },
    // Section
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 4,
    },
    sectionLine: {
      height: 2,
      width: 28,
      backgroundColor: c.primary,
    },
    sectionTitle: {
      fontSize: 9,
      color: c.primary,
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginLeft: 10,
      fontFamily: 'Courier',
      fontWeight: 'bold',
    },
    // Typography
    heading3: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 6,
    },
    heading4: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#1a1a1a',
      marginBottom: 4,
    },
    paragraph: {
      fontSize: 9,
      color: '#444444',
      lineHeight: 1.6,
      marginBottom: 6,
      fontFamily: 'Courier',
    },
    // List
    list: {
      marginLeft: 8,
      marginBottom: 6,
    },
    listItem: {
      fontSize: 9,
      color: '#444444',
      marginBottom: 3,
      fontFamily: 'Courier',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    bullet: {
      width: 14,
      color: c.primary,
      fontWeight: 'bold',
    },
    listText: {
      flex: 1,
      color: '#444444',
    },
    checkBullet: {
      width: 14,
      color: '#16a34a',
      fontWeight: 'bold',
    },
    // Boxes
    weekBox: {
      backgroundColor: '#fafafa',
      borderWidth: 1,
      borderColor: '#e5e5e5',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderLeftColor: c.primary,
      borderRadius: 4,
      padding: 10,
      marginBottom: 8,
    },
    phaseBox: {
      backgroundColor: c.accentBg,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderStyle: 'solid',
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
    },
    phaseLabel: {
      fontSize: 9,
      color: c.primary,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 2,
    },
    phaseTitle: {
      fontSize: 12,
      color: '#1a1a1a',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    infoBox: {
      backgroundColor: '#f8f8f8',
      borderWidth: 1,
      borderColor: '#e5e5e5',
      borderStyle: 'solid',
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
    },
    accentBox: {
      backgroundColor: c.accentBg,
      borderLeftWidth: 3,
      borderLeftColor: c.primary,
      borderLeftStyle: 'solid',
      padding: 12,
      marginBottom: 10,
      borderRadius: 4,
    },
    highlightBox: {
      backgroundColor: 'rgba(22, 163, 74, 0.06)',
      borderWidth: 1,
      borderColor: '#16a34a',
      borderStyle: 'solid',
      borderRadius: 6,
      padding: 14,
      marginBottom: 12,
    },
    calloutBox: {
      backgroundColor: c.accentBg,
      borderRadius: 6,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.primary,
      borderStyle: 'dashed',
    },
    toolTag: {
      backgroundColor: '#f0f0f0',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 6,
      marginBottom: 6,
    },
    toolTagText: {
      fontSize: 8,
      color: '#555555',
      fontFamily: 'Courier',
    },
    divider: {
      height: 1,
      backgroundColor: '#e5e5e5',
      marginVertical: 12,
    },
    // Footer
    footer: {
      position: 'absolute',
      bottom: 25,
      left: 44,
      right: 44,
      borderTopWidth: 1,
      borderTopColor: '#e5e5e5',
      borderTopStyle: 'solid',
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerBrand: {
      fontSize: 8,
      color: c.primary,
      fontFamily: 'Courier',
      fontWeight: 'bold',
    },
    footerText: {
      fontSize: 8,
      color: '#999999',
      fontFamily: 'Courier',
    },
    pageNum: {
      fontSize: 8,
      color: '#999999',
      fontFamily: 'Courier',
    },
  });

// Group curriculum into phases
function groupByPhase(curriculum: CurriculumWeek[]): { phase: string; weeks: CurriculumWeek[] }[] {
  const groups: { phase: string; weeks: CurriculumWeek[] }[] = [];
  let currentPhase = '';
  curriculum.forEach((w) => {
    const phaseName = w.phase?.en || currentPhase;
    if (phaseName !== currentPhase) {
      currentPhase = phaseName;
      groups.push({ phase: phaseName, weeks: [w] });
    } else {
      if (groups.length === 0) groups.push({ phase: '', weeks: [] });
      groups[groups.length - 1].weeks.push(w);
    }
  });
  return groups;
}

// Split curriculum weeks into pages of ~4-5 items
function chunkWeeks(weeks: CurriculumWeek[], size: number): CurriculumWeek[][] {
  const chunks: CurriculumWeek[][] = [];
  for (let i = 0; i < weeks.length; i += size) {
    chunks.push(weeks.slice(i, i + size));
  }
  return chunks;
}

const Footer: React.FC<{ page: number; total: number; styles: ReturnType<typeof createStyles> }> = ({
  page,
  total,
  styles: s,
}) => (
  <View style={s.footer}>
    <Text style={s.footerBrand}>DOGM.AI — PRAXIS</Text>
    <Text style={s.footerText}>hello@dogm.ai</Text>
    <Text style={s.pageNum}>
      {page} / {total}
    </Text>
  </View>
);

export const PraxisProgramPDF: React.FC<{ slug: ProgramSlug }> = ({ slug }) => {
  const program = programs[slug];
  const c = programColorMap[slug];
  const s = createStyles(c);
  const curriculum = program.curriculum;
  const weekChunks = chunkWeeks(curriculum, 4);
  // total pages: cover + format + curriculum chunks + tools & outcomes + CTA
  const totalPages = 1 + 1 + weekChunks.length + 1 + 1;

  let pageIdx = 0;

  return (
    <Document>
      {/* PAGE: Cover */}
      <Page size="A4" style={s.coverPage}>
        <View style={s.coverAccent} />
        <View style={s.coverContent}>
          <View style={s.logoRow}>
            <View style={{ marginRight: 14 }}>
              <DogmLogo dotSize={5} spacing={7} accentColor={c.primary} />
            </View>
            <View>
              <Text style={s.logoText}>DOGM.AI</Text>
              <Text style={s.logoSub}>PRAXIS</Text>
            </View>
          </View>

          <View style={s.coverBadge}>
            <Text style={s.coverBadgeText}>{program.duration.en} · {program.totalHours} Hours · {program.weeklyHours} hrs/week</Text>
          </View>

          <Text style={s.coverTitle}>{program.name.en}</Text>
          <Text style={s.coverTagline}>{program.tagline.en}</Text>
          <Text style={s.coverDesc}>{program.description.en}</Text>

          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Text style={s.statValue}>{program.weeks}</Text>
              <Text style={s.statLabel}>Weeks</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>{program.totalHours}</Text>
              <Text style={s.statLabel}>Total Hours</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>{program.weeklyHours}</Text>
              <Text style={s.statLabel}>Hrs / Week</Text>
            </View>
            <View style={s.statBox}>
              <Text style={{ ...s.statValue, fontSize: 14 }}>Part-time</Text>
              <Text style={s.statLabel}>Format</Text>
            </View>
          </View>

          <View style={s.sectionHeader}>
            <View style={s.sectionLine} />
            <Text style={s.sectionTitle}>WHO IS THIS FOR?</Text>
          </View>
          <View style={s.accentBox}>
            <Text style={s.paragraph}>{program.target.en}</Text>
          </View>

          <View style={s.calloutBox}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', color: c.primary, marginBottom: 4 }}>
              NOW ENROLLING
            </Text>
            <Text style={{ fontSize: 9, color: '#555555', fontFamily: 'Courier' }}>
              Limited seats · 100% Remote · Part-time · Build your portfolio, not a certificate
            </Text>
          </View>
        </View>
        <Footer page={++pageIdx} total={totalPages} styles={s} />
      </Page>

      {/* PAGE: Format & Schedule */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerSub}>Program Format</Text>
          <Text style={s.headerTitle}>Weekly Structure & Commitment</Text>
        </View>

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>WEEKLY FORMAT</Text>
        </View>

        <View style={s.infoBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 }}>Live Sessions</Text>
          <Text style={s.paragraph}>{program.format.liveSessions.en}</Text>
        </View>
        <View style={s.infoBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 }}>Project Work</Text>
          <Text style={s.paragraph}>{program.format.projectWork.en}</Text>
        </View>
        <View style={s.infoBox}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 6 }}>Community</Text>
          <Text style={s.paragraph}>{program.format.community.en}</Text>
        </View>

        <View style={s.highlightBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#16a34a', marginBottom: 4 }}>
            WEEKLY DELIVERABLE
          </Text>
          <Text style={{ fontSize: 10, color: '#1a1a1a', fontWeight: 'bold', marginBottom: 4 }}>
            {program.format.deliverable.en}
          </Text>
          <Text style={{ fontSize: 9, color: '#555555', fontFamily: 'Courier' }}>
            Every week you ship something real. No theory-only weeks.
          </Text>
        </View>

        <View style={s.divider} />

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>WHAT YOU NEED</Text>
        </View>
        <View style={s.list}>
          <View style={s.listItem}><Text style={s.checkBullet}>✓</Text><Text style={s.listText}>Laptop (Mac or Windows, at least 8GB RAM)</Text></View>
          <View style={s.listItem}><Text style={s.checkBullet}>✓</Text><Text style={s.listText}>Stable internet connection for live sessions</Text></View>
          <View style={s.listItem}><Text style={s.checkBullet}>✓</Text><Text style={s.listText}>{program.weeklyHours} hours per week commitment</Text></View>
          <View style={s.listItem}><Text style={s.checkBullet}>✓</Text><Text style={s.listText}>Willingness to ship real projects every week</Text></View>
        </View>

        <Footer page={++pageIdx} total={totalPages} styles={s} />
      </Page>

      {/* PAGES: Curriculum */}
      {weekChunks.map((chunk, chunkIdx) => {
        const startWeek = chunk[0].week;
        const endWeek = chunk[chunk.length - 1].week;
        return (
          <Page key={chunkIdx} size="A4" style={s.page}>
            <View style={s.header}>
              <Text style={s.headerSub}>Curriculum</Text>
              <Text style={s.headerTitle}>
                {startWeek === endWeek ? `Week ${startWeek}` : `Weeks ${startWeek}–${endWeek}`}
              </Text>
            </View>

            {chunk.map((week) => {
              const hasPhase = week.phase?.en;
              return (
                <View key={week.week}>
                  {hasPhase && (
                    <View style={s.phaseBox}>
                      <Text style={s.phaseLabel}>{week.phase!.en}</Text>
                    </View>
                  )}
                  <View style={s.weekBox}>
                    <Text style={s.heading4}>
                      Week {week.week}: {week.title.en}
                    </Text>
                    <View style={s.list}>
                      {week.topics.en.map((topic, i) => (
                        <View key={i} style={s.listItem}>
                          <Text style={s.bullet}>•</Text>
                          <Text style={s.listText}>{topic}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
                      <Text style={{ fontSize: 8, color: c.primary, fontWeight: 'bold', fontFamily: 'Courier', marginRight: 4 }}>SHIP:</Text>
                      <Text style={{ fontSize: 8, color: '#555555', fontFamily: 'Courier', flex: 1 }}>{week.deliverable.en}</Text>
                    </View>
                  </View>
                </View>
              );
            })}

            <Footer page={++pageIdx} total={totalPages} styles={s} />
          </Page>
        );
      })}

      {/* PAGE: Tools & Outcomes */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerSub}>What You Get</Text>
          <Text style={s.headerTitle}>Tools & Graduation Outcomes</Text>
        </View>

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>TOOLS YOU&apos;LL MASTER</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
          {program.tools.map((tool, i) => (
            <View key={i} style={s.toolTag}>
              <Text style={s.toolTagText}>{tool}</Text>
            </View>
          ))}
        </View>

        <View style={s.divider} />

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>GRADUATION OUTCOMES</Text>
        </View>
        <Text style={{ fontSize: 10, color: '#444444', marginBottom: 12, lineHeight: 1.5 }}>
          By the end of this {program.weeks}-week program, you will have:
        </Text>
        {program.outcomes.en.map((outcome, i) => (
          <View key={i} style={{ ...s.infoBox, flexDirection: 'row', alignItems: 'flex-start', padding: 10 }}>
            <Text style={{ fontSize: 10, color: '#16a34a', fontWeight: 'bold', marginRight: 8 }}>✓</Text>
            <Text style={{ fontSize: 9, color: '#333333', fontFamily: 'Courier', flex: 1, lineHeight: 1.5 }}>{outcome}</Text>
          </View>
        ))}

        <Footer page={++pageIdx} total={totalPages} styles={s} />
      </Page>

      {/* PAGE: CTA / Contact */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerSub}>Get Started</Text>
          <Text style={s.headerTitle}>Enroll in {program.name.en}</Text>
        </View>

        <View style={s.highlightBox}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 }}>
            Ready to Start Building?
          </Text>
          <Text style={{ fontSize: 10, color: '#555555', fontFamily: 'Courier', marginBottom: 4 }}>
            {program.duration.en} · {program.totalHours} hours · {program.weeklyHours} hrs/week
          </Text>
          <Text style={{ fontSize: 10, color: '#555555', fontFamily: 'Courier' }}>
            100% Remote · Part-time · Ship every week
          </Text>
        </View>

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>HOW TO ENROLL</Text>
        </View>

        <View style={{ ...s.accentBox, marginBottom: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: c.primary, fontFamily: 'Courier', marginBottom: 2 }}>STEP 1</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 }}>Fill Out the Form</Text>
          <Text style={s.paragraph}>Quick enrollment form at dogm.ai. Takes about 1 minute.</Text>
        </View>
        <View style={{ ...s.accentBox, marginBottom: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: c.primary, fontFamily: 'Courier', marginBottom: 2 }}>STEP 2</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 }}>Complete Payment</Text>
          <Text style={s.paragraph}>Secure your spot with payment. Your seat is reserved once confirmed.</Text>
        </View>
        <View style={{ ...s.accentBox, marginBottom: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: c.primary, fontFamily: 'Courier', marginBottom: 2 }}>STEP 3</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 4 }}>You're In</Text>
          <Text style={s.paragraph}>Receive pre-course materials, join the community, and get ready for Week 1.</Text>
        </View>

        <View style={s.divider} />

        <View style={s.sectionHeader}>
          <View style={s.sectionLine} />
          <Text style={s.sectionTitle}>CONTACT</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <View style={{ ...s.infoBox, flex: 1 }}>
            <Text style={{ fontSize: 9, color: c.primary, fontWeight: 'bold', fontFamily: 'Courier', marginBottom: 4 }}>Email</Text>
            <Text style={{ fontSize: 11, color: '#1a1a1a', fontFamily: 'Courier' }}>hello@dogm.ai</Text>
          </View>
          <View style={{ ...s.infoBox, flex: 1 }}>
            <Text style={{ fontSize: 9, color: c.primary, fontWeight: 'bold', fontFamily: 'Courier', marginBottom: 4 }}>Website</Text>
            <Text style={{ fontSize: 11, color: '#1a1a1a', fontFamily: 'Courier' }}>dogm.ai</Text>
          </View>
          <View style={{ ...s.infoBox, flex: 1 }}>
            <Text style={{ fontSize: 9, color: c.primary, fontWeight: 'bold', fontFamily: 'Courier', marginBottom: 4 }}>Facebook</Text>
            <Text style={{ fontSize: 11, color: '#1a1a1a', fontFamily: 'Courier' }}>DoGMAIAcademy</Text>
          </View>
        </View>

        <View style={s.calloutBox}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: c.primary, marginBottom: 6, textAlign: 'center' }}>
            BUILD YOUR PORTFOLIO, NOT A CERTIFICATE.
          </Text>
          <Text style={{ fontSize: 10, color: '#555555', fontFamily: 'Courier', textAlign: 'center', lineHeight: 1.5 }}>
            Ship real projects. Every single week.
          </Text>
        </View>

        <Footer page={++pageIdx} total={totalPages} styles={s} />
      </Page>
    </Document>
  );
};

export default PraxisProgramPDF;
