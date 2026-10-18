import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// D pattern from LogoIcon - 7 cols x 9 rows
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

// Logo component using dots
const DogmLogo: React.FC<{ dotSize?: number; spacing?: number }> = ({ dotSize = 4, spacing = 6 }) => {
  const dots: React.ReactElement[] = [];

  dPattern.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 1) {
        // Orange for outer curve (matches LogoIcon logic)
        const isOuterCurve = colIdx >= 4 || (rowIdx <= 1 && colIdx >= 3) || (rowIdx >= 7 && colIdx >= 3);
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
              backgroundColor: isOuterCurve ? '#f97316' : '#ffffff',
            }}
          />
        );
      }
    });
  });

  return (
    <View style={{ width: 7 * spacing, height: 9 * spacing, position: 'relative' }}>
      {dots}
    </View>
  );
};

// Premium color palette matching website
const colors = {
  black: '#060503',
  darkBg: '#0a0a0a',
  cream: '#f4efe6',
  orange: '#f97316',
  orangeLight: '#fb923c',
  orangeDark: '#ea580c',
  green: '#22c55e',
  greenLight: '#4ade80',
  textMuted: '#c9b89b',
  textLight: '#d8c9b0',
  border: '#2e2e2e',
  borderLight: '#3e3e3e',
  accent: 'rgba(249, 115, 22, 0.15)',
  accentGreen: 'rgba(34, 197, 94, 0.12)',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.black,
    color: colors.cream,
    paddingTop: 40,
    paddingBottom: 60,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'Helvetica',
  },
  // Cover page styles
  coverPage: {
    backgroundColor: colors.black,
    color: colors.cream,
    padding: 0,
    fontFamily: 'Helvetica',
  },
  coverContent: {
    padding: 50,
    paddingTop: 50,
  },
  coverAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 6,
    backgroundColor: colors.orange,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 14,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.cream,
  },
  coverSubtitle: {
    fontSize: 11,
    color: colors.orange,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 6,
    letterSpacing: -1,
  },
  coverTagline: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 30,
    fontFamily: 'Helvetica',
  },
  // Header styles
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
    borderBottomStyle: 'solid',
    paddingBottom: 12,
  },
  headerWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
    borderBottomStyle: 'solid',
    paddingBottom: 12,
  },
  headerLogoSmall: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 10,
    color: colors.orange,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
  // Section styles
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionLine: {
    height: 2,
    width: 30,
    backgroundColor: colors.orange,
  },
  sectionTitle: {
    fontSize: 9,
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 10,
    fontFamily: 'Courier',
  },
  // Typography
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 6,
  },
  heading4: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 9,
    color: colors.textLight,
    lineHeight: 1.5,
    marginBottom: 6,
    fontFamily: 'Courier',
  },
  // List styles
  list: {
    marginLeft: 10,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 9,
    color: colors.textLight,
    marginBottom: 4,
    fontFamily: 'Courier',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 14,
    color: colors.green,
    fontWeight: 'bold',
  },
  listText: {
    flex: 1,
    color: colors.textLight,
  },
  // Box styles
  box: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  highlightBox: {
    backgroundColor: colors.accentGreen,
    borderWidth: 2,
    borderColor: colors.green,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  premiumBox: {
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    borderLeftStyle: 'solid',
    padding: 12,
    marginBottom: 10,
  },
  // Grid styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  gridItem: {
    flex: 1,
    minWidth: '22%',
    maxWidth: '24%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 10,
  },
  stat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 2,
  },
  statOrange: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 8,
    color: colors.textMuted,
    fontFamily: 'Courier',
    textTransform: 'uppercase',
  },
  // Week box for syllabus
  weekBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  // Phase box for curriculum
  phaseBox: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  phaseNumber: {
    fontSize: 9,
    color: colors.orange,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    marginBottom: 2,
  },
  phaseSubtitle: {
    fontSize: 11,
    color: colors.green,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phaseDesc: {
    fontSize: 9,
    color: colors.textLight,
    fontFamily: 'Courier',
    lineHeight: 1.4,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopStyle: 'solid',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: colors.textMuted,
    fontFamily: 'Courier',
  },
  footerBrand: {
    fontSize: 8,
    color: colors.orange,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  pageNumber: {
    fontSize: 8,
    color: colors.textMuted,
    fontFamily: 'Courier',
  },
  // Pricing specific
  priceMain: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: 2,
  },
  priceOrange: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    marginBottom: 2,
  },
  priceSub: {
    fontSize: 9,
    color: colors.textMuted,
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  priceVat: {
    fontSize: 8,
    color: colors.textLight,
    fontFamily: 'Courier',
  },
  // Step box
  stepBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor: colors.green,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.green,
    marginBottom: 2,
    fontFamily: 'Courier',
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  // Callout
  callout: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 6,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.orange,
    borderStyle: 'dashed',
  },
  // FAQ item
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor: colors.orange,
    borderRadius: 4,
    padding: 10,
    marginBottom: 6,
  },
});

// Logo as base64 - using a simple "D" placeholder since we can't load external files in PDF
// In production, you would use: Image src="/android-chrome-512x512.png"

export const DOGMPDFDocument: React.FC = () => (
  <Document>
    {/* Page 1: Cover */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverAccent} />
      <View style={styles.coverContent}>
        <View style={styles.logoContainer}>
          <View style={{ marginRight: 14 }}>
            <DogmLogo dotSize={5} spacing={7} />
          </View>
          <Text style={styles.logoText}>DOGM.AI</Text>
        </View>

        <Text style={styles.coverSubtitle}>AI-Native Coding Bootcamp</Text>
        <Text style={styles.coverTitle}>Learn to Build.</Text>
        <Text style={styles.coverTitle}>Think Like a Developer.</Text>
        <Text style={styles.coverTagline}>Master fundamentals. Build real skills. Use AI strategically.</Text>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.statOrange}>20</Text>
            <Text style={styles.statLabel}>Weeks</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.stat}>25</Text>
            <Text style={styles.statLabel}>Seats Only</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.stat}>100%</Text>
            <Text style={styles.statLabel}>Fully Remote</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.stat}>Part-time</Text>
            <Text style={styles.statLabel}>Beginner-Friendly</Text>
          </View>
        </View>

        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.cream, marginBottom: 6 }}>
            What Makes DOGM.AI Different
          </Text>
          <Text style={{ fontSize: 9, color: colors.textLight, fontFamily: 'Courier', lineHeight: 1.5 }}>
            Most bootcamps promise: "Just prompt AI and it'll write your code!" That's not learning — that's outsourcing your brain. We teach fundamentals first, then show you how to use AI strategically. You'll become a developer who uses AI, not someone who needs it.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>THE DOGM.AI APPROACH</Text>
        </View>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Learn Core Fundamentals — How does a web app actually work?</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Build With Your Hands — Write every line yourself</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Use AI Strategically — Once you understand fundamentals</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>✓</Text>
            <Text style={styles.listText}>Become a Developer Who Uses AI — Not someone who needs it</Text>
          </View>
        </View>

        <View style={styles.callout}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.orange, marginBottom: 4 }}>
            COHORT 1 NOW ENROLLING
          </Text>
          <Text style={{ fontSize: 9, color: colors.textLight, fontFamily: 'Courier' }}>
            Limited to 25 seats • 100% Fully Remote • Applications Open
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>1 / 11</Text>
      </View>
    </Page>

    {/* Page 2: Curriculum Overview */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>20-Week Learning Journey</Text>
        <Text style={styles.title}>Curriculum Overview</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.phaseBox}>
          <Text style={styles.phaseNumber}>PHASE 1: WEEKS 1–4</Text>
          <Text style={styles.phaseSubtitle}>Core Foundations</Text>
          <Text style={styles.phaseDesc}>HTML, CSS, JavaScript basics, Git version control, Development environment setup</Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseNumber}>PHASE 2: WEEKS 5–10</Text>
          <Text style={styles.phaseSubtitle}>Frontend Development</Text>
          <Text style={styles.phaseDesc}>React components, State management, Routing & navigation, Responsive design</Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseNumber}>PHASE 3: WEEKS 11–15</Text>
          <Text style={styles.phaseSubtitle}>Backend & Databases</Text>
          <Text style={styles.phaseDesc}>Server-side programming, REST API design, Database modeling, Authentication</Text>
        </View>

        <View style={styles.phaseBox}>
          <Text style={styles.phaseNumber}>PHASE 4: WEEKS 16–20</Text>
          <Text style={styles.phaseSubtitle}>Capstone Project</Text>
          <Text style={styles.phaseDesc}>Planning your app, Building full features, Deploying online, Portfolio presentation</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>AI INTEGRATION TIMELINE</Text>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Weeks 1-4: Pure Fundamentals</Text>
          <Text style={styles.paragraph}>No AI crutches. Understand what code is. Build muscle memory. Write every line yourself.</Text>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Weeks 5-10: Assisted Learning</Text>
          <Text style={styles.paragraph}>AI becomes your study partner. Explains errors, suggests alternatives. But you write all the logic.</Text>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Weeks 11-20: Strategic AI Use</Text>
          <Text style={styles.paragraph}>Use AI like a pro: handle boilerplate, speed up tasks, debug faster. You make all architectural decisions.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>2 / 11</Text>
      </View>
    </Page>

    {/* Page 3: Weeks 1-5 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Detailed Syllabus</Text>
        <Text style={styles.title}>Weeks 1-5</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 1: Web Fundamentals & HTML</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>How the internet works: DNS, servers, browsers</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>HTML structure and semantic elements</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Forms, tables, and accessibility basics</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Build your first webpage</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 2: CSS Fundamentals</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Box model, positioning, and layout</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Flexbox and Grid systems</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Responsive design with media queries</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Style a multi-page website</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 3: JavaScript Basics</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Variables, data types, and operators</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Functions, loops, and conditionals</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>DOM manipulation and events</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Interactive calculator app</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 4: Git & Advanced JavaScript</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Git basics: commits, branches, merges</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Arrays, objects, and data structures</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Async JavaScript and Promises</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Weather app using API</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 5: Introduction to React</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Component-based architecture</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>JSX syntax and props</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>State and event handling</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Todo list application</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>3 / 11</Text>
      </View>
    </Page>

    {/* Page 4: Weeks 6-10 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Detailed Syllabus</Text>
        <Text style={styles.title}>Weeks 6-10</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 6: React Hooks & State Management</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>useState, useEffect, and custom hooks</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Context API for global state</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Component lifecycle and side effects</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Shopping cart with state</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 7: Routing & Navigation</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>React Router fundamentals</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Dynamic routes and parameters</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Protected routes and navigation</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Multi-page blog application</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 8: API Integration</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>REST APIs and HTTP methods</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Fetch API and axios library</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Error handling and loading states</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Movie database app</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 9: Form Handling & Validation</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Controlled vs uncontrolled components</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Form validation and error messages</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>File uploads and multi-step forms</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: User registration system</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 10: Advanced Styling & UI</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>CSS-in-JS and styled components</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Tailwind CSS framework</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Animations and transitions</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Portfolio website</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>4 / 11</Text>
      </View>
    </Page>

    {/* Page 5: Weeks 11-15 */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Detailed Syllabus</Text>
        <Text style={styles.title}>Weeks 11-15</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 11: Backend Fundamentals</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Node.js and Express.js setup</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Server architecture and routing</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Middleware and request handling</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Basic REST API server</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 12: Database Design</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>SQL vs NoSQL databases</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Database schema design</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>CRUD operations and queries</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Blog with database</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 13: Authentication & Security</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Password hashing and encryption</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>JWT tokens and sessions</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>OAuth and social login</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Secure login system</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 14: Full-Stack Integration</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Connecting frontend to backend</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>CORS and API security</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>File uploads and storage</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Full-stack social app</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 15: Testing & Debugging</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Unit testing with Jest</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Integration and E2E testing</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Debugging tools and strategies</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Project: Test suite for your app</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>5 / 11</Text>
      </View>
    </Page>

    {/* Page 6: Weeks 16-20 Capstone */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Detailed Syllabus</Text>
        <Text style={styles.title}>Weeks 16-20: Capstone</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.callout}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.orange, marginBottom: 3 }}>YOUR CAPSTONE PROJECT</Text>
          <Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier', lineHeight: 1.4 }}>Build a production-ready app from scratch. Your portfolio piece to show employers.</Text>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 16: Project Planning & Design</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Define scope, database schema, API design</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>UI/UX wireframes and project setup</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 17: Core Features Development</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Build backend API and authentication</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Create main UI and code review session</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 18: Advanced Features</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Add secondary and real-time features</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Optimize performance, user testing</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 19: Deployment & DevOps</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Deploy to production (Vercel/Netlify)</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Database hosting, domain, and SSL setup</Text></View>
          </View>
        </View>

        <View style={styles.weekBox}>
          <Text style={styles.heading4}>Week 20: Portfolio & Graduation</Text>
          <View style={styles.list}>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Polish, documentation, presentation prep</Text></View>
            <View style={styles.listItem}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>Final demo and graduation ceremony</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>6 / 11</Text>
      </View>
    </Page>

    {/* Page 7: Schedule & Format */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Time Commitment</Text>
        <Text style={styles.title}>Schedule & Format</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>WEEKLY SCHEDULE</Text>
        </View>

        <View style={styles.highlightBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, color: colors.green }}>WEEKDAY SESSIONS: MON-THU</Text>
          <Text style={{ fontSize: 13, color: colors.cream, marginBottom: 4, fontWeight: 'bold' }}>7:00 PM - 9:30 PM (10 hours/week)</Text>
          <Text style={styles.paragraph}>Live remote sessions via video. Interactive lectures, live coding demonstrations, Q&A sessions, and collaborative problem-solving. All sessions are recorded.</Text>
        </View>

        <View style={styles.highlightBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, color: colors.green }}>SATURDAY DEEP-DIVE</Text>
          <Text style={{ fontSize: 13, color: colors.cream, marginBottom: 4, fontWeight: 'bold' }}>9:00 AM - 3:00 PM (6 hours/week)</Text>
          <Text style={styles.paragraph}>Hands-on labs, pair programming, project work, and direct mentorship. Build together with your cohort online.</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>FORMAT</Text>
        </View>

        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: colors.cream, marginBottom: 4 }}>100% Fully Remote</Text>
          <Text style={{ fontSize: 9, color: colors.textLight, fontFamily: 'Courier', lineHeight: 1.5 }}>
            25 seats available • Join from anywhere in the Philippines • All sessions via live video • No commute required • Recordings available for all sessions
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>WHAT YOU NEED</Text>
        </View>

        <View style={styles.list}>
          <View style={styles.listItem}><Text style={styles.bullet}>✓</Text><Text style={styles.listText}>Laptop (Mac or Windows, at least 8GB RAM)</Text></View>
          <View style={styles.listItem}><Text style={styles.bullet}>✓</Text><Text style={styles.listText}>Stable internet connection for remote sessions</Text></View>
          <View style={styles.listItem}><Text style={styles.bullet}>✓</Text><Text style={styles.listText}>20-22 hours per week commitment (classes + practice)</Text></View>
          <View style={styles.listItem}><Text style={styles.bullet}>✓</Text><Text style={styles.listText}>Willingness to struggle through hard problems</Text></View>
          <View style={styles.listItem}><Text style={styles.bullet}>✓</Text><Text style={styles.listText}>No coding experience required — we start from zero</Text></View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>7 / 11</Text>
      </View>
    </Page>

    {/* Page 8: Pricing */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Investment in Your Future</Text>
        <Text style={styles.title}>Pricing</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>PAYMENT OPTIONS</Text>
        </View>

        <View style={styles.highlightBox}>
          <Text style={{ fontSize: 10, color: colors.green, marginBottom: 8, fontWeight: 'bold', fontFamily: 'Courier' }}>✓ RECOMMENDED — SAVE PHP5,000</Text>
          <Text style={styles.priceOrange}>PHP40,000</Text>
          <Text style={styles.priceSub}>One-time full payment</Text>
          <Text style={styles.priceVat}>Inclusive of 12% VAT • All fees included</Text>
        </View>

        <View style={styles.box}>
          <Text style={{ fontSize: 10, color: colors.textMuted, marginBottom: 8, fontWeight: 'bold', fontFamily: 'Courier' }}>INSTALLMENT PLAN</Text>
          <Text style={styles.priceMain}>PHP9,000</Text>
          <Text style={styles.priceSub}>per month × 5 months = PHP45,000 total</Text>
          <Text style={styles.priceVat}>Inclusive of 12% VAT • First payment at enrollment</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>WHAT'S INCLUDED</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>20 Weeks of Instruction</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>100% Live Remote Sessions</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Complete Course Materials</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>All Session Recordings</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Code Reviews & Debugging</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Capstone Project Support</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Portfolio Guidance</Text></View>
          <View style={styles.gridItem}><Text style={{ fontSize: 9, fontWeight: 'bold', color: colors.green, marginBottom: 2 }}>✓</Text><Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Lifetime Alumni Access</Text></View>
        </View>
      </View>

      <View style={styles.callout}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: colors.orange, marginBottom: 3 }}>7-DAY REFUND POLICY</Text>
        <Text style={{ fontSize: 8, color: colors.textLight, fontFamily: 'Courier' }}>Full refund available within 7 days of cohort start date. After that, no refunds. See dogm.ai/refund-policy for details.</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>8 / 11</Text>
      </View>
    </Page>

    {/* Page 9: Enrollment Process */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Getting Started</Text>
        <Text style={styles.title}>Enrollment Process</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: colors.cream, marginBottom: 4 }}>No Interviews. No Hoops. Just Sign Up.</Text>
          <Text style={{ fontSize: 9, color: colors.textLight, fontFamily: 'Courier', lineHeight: 1.5 }}>
            We believe in keeping things simple. If you're committed to learning, that's all we need to know. Three simple steps and you're in.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>3 SIMPLE STEPS</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepNumber}>STEP 1: FILL OUT THE FORM</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.cream, marginBottom: 4 }}>Takes about 1 minute</Text>
          <Text style={styles.paragraph}>Quick enrollment form. Basic info and your commitment level. No essays, no stress. Just tell us you're ready to learn.</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepNumber}>STEP 2: COMPLETE PAYMENT</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.cream, marginBottom: 4 }}>Secure your spot</Text>
          <Text style={styles.paragraph}>We send payment details via email. Choose full payment (PHP40,000 — save PHP5,000) or installment (PHP9,000/month × 5). Your spot is reserved once payment is confirmed.</Text>
        </View>

        <View style={styles.stepBox}>
          <Text style={styles.stepNumber}>STEP 3: YOU'RE IN</Text>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.cream, marginBottom: 4 }}>Welcome aboard</Text>
          <Text style={styles.paragraph}>You'll receive pre-course prep materials immediately. Get familiar with the tools, join the community, and get ready for week one. That's it — you're officially a DOGM.AI student.</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.callout}>
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.orange, marginBottom: 4 }}>READY TO START?</Text>
        <Text style={{ fontSize: 9, color: colors.textLight, fontFamily: 'Courier' }}>Visit dogm.ai/enroll to begin your application. Limited to 25 seats per cohort.</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>9 / 11</Text>
      </View>
    </Page>

    {/* Page 10: FAQ */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Questions & Answers</Text>
        <Text style={styles.title}>FAQ</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.faqItem}>
          <Text style={styles.heading4}>Do I need coding experience?</Text>
          <Text style={styles.paragraph}>No! We start from absolute zero. If you can use a computer and browser, you're ready. We teach everything from the ground up.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>Will I be job-ready after 20 weeks?</Text>
          <Text style={styles.paragraph}>This program teaches fundamentals, not job readiness. You'll have strong foundations and a portfolio project. Job readiness requires continued practice beyond the bootcamp.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>Do you offer job placement?</Text>
          <Text style={styles.paragraph}>No. We teach skills, not job guarantees. We'll help with portfolio and interview prep, but the world decides if you're ready for work. We're honest about this.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>What if I miss a session?</Text>
          <Text style={styles.paragraph}>All sessions are recorded. You can catch up on your own time. However, live participation is strongly encouraged for the best learning experience.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>Can I get a refund?</Text>
          <Text style={styles.paragraph}>Full refund available within 7 days of cohort start date. After that, no refunds. See dogm.ai/refund-policy for complete details.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>What programming language will I learn?</Text>
          <Text style={styles.paragraph}>JavaScript — the most versatile language for web development. You'll use it for frontend (React), backend (Node.js), and full-stack applications.</Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.heading4}>How is this different from other bootcamps?</Text>
          <Text style={styles.paragraph}>We don't promise shortcuts. We teach fundamentals first, then strategic AI use. You'll understand what you're building, not just copy-paste code from AI.</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>10 / 11</Text>
      </View>
    </Page>

    {/* Page 11: Contact / CTA */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Get In Touch</Text>
        <Text style={styles.title}>Start Your Journey</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.highlightBox}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.cream, marginBottom: 10 }}>Join DOGM.AI Cohort 1</Text>
          <Text style={{ fontSize: 10, color: colors.textLight, fontFamily: 'Courier', marginBottom: 4 }}>Applications are now open. Limited to 25 seats.</Text>
          <Text style={{ fontSize: 10, color: colors.textLight, fontFamily: 'Courier' }}>100% Fully Remote • Part-time • Beginner-friendly</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
        </View>

        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.orange, marginBottom: 6 }}>Email</Text>
          <Text style={{ fontSize: 13, color: colors.cream, fontFamily: 'Courier' }}>hello@dogm.ai</Text>
        </View>

        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.orange, marginBottom: 6 }}>Website</Text>
          <Text style={{ fontSize: 13, color: colors.cream, fontFamily: 'Courier' }}>dogm.ai</Text>
        </View>

        <View style={styles.premiumBox}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: colors.orange, marginBottom: 6 }}>Enroll Now</Text>
          <Text style={{ fontSize: 13, color: colors.cream, fontFamily: 'Courier' }}>dogm.ai/enroll</Text>
        </View>
      </View>

      <View style={styles.callout}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.orange, marginBottom: 6, textAlign: 'center' }}>BECOME A DEVELOPER WHO USES AI.</Text>
        <Text style={{ fontSize: 10, color: colors.textLight, fontFamily: 'Courier', textAlign: 'center', lineHeight: 1.5 }}>Not someone who needs it. Master fundamentals. Build real skills. Use AI strategically.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.gridItem}><Text style={styles.statOrange}>20</Text><Text style={styles.statLabel}>Weeks</Text></View>
        <View style={styles.gridItem}><Text style={styles.stat}>25</Text><Text style={styles.statLabel}>Seats Only</Text></View>
        <View style={styles.gridItem}><Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.cream, marginBottom: 2 }}>PHP40,000</Text><Text style={styles.statLabel}>Full Payment</Text></View>
        <View style={styles.gridItem}><Text style={styles.stat}>100%</Text><Text style={styles.statLabel}>Fully Remote</Text></View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>DOGM.AI</Text>
        <Text style={styles.footerText}>hello@dogm.ai</Text>
        <Text style={styles.pageNumber}>11 / 11</Text>
      </View>
    </Page>
  </Document>
);

export default DOGMPDFDocument;
