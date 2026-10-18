import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
  Hr,
  Link,
  Button,
} from '@react-email/components';

interface SyllabusDownloadProps {
  email: string;
  downloadUrl: string;
}

export default function SyllabusDownload({
  email,
  downloadUrl,
}: SyllabusDownloadProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>DOGM.AI</Text>
            <Hr style={headerDivider} />
            <Text style={headerTitle}>Your Syllabus is Ready</Text>
            <Text style={headerSubtitle}>Everything you need to know about our curriculum</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hi there,</Text>

            <Text style={paragraph}>
              Thanks for your interest in DOGM.AI. We've prepared our complete curriculum syllabus for you to review.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightTitle}>📄 WHAT'S INSIDE</Text>
              <Text style={highlightText}>
                <strong style={strong}>Complete 20-Week Breakdown</strong><br />
                Week-by-week topics, projects, and learning outcomes.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>Tech Stack Details</strong><br />
                Every framework, tool, and technology you'll master.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>Project Portfolio</strong><br />
                The 6 apps you'll build and deploy online.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>Career Preparation</strong><br />
                How we prepare you for developer roles.
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button href={downloadUrl} style={button}>
                Download Syllabus (PDF)
              </Button>
            </Section>

            <Hr style={divider} />

            <Text style={sectionTitle}>NEXT STEPS</Text>

            <Text style={paragraph}>
              Ready to apply? Here's what you need to know:
            </Text>

            <Section style={summaryBox}>
              <Text style={summaryLabel}>COHORT 1:</Text>
              <Text style={summaryValue}>Applications now open</Text>

              <Text style={summaryLabel}>LOCATION:</Text>
              <Text style={summaryValue}>Philippines</Text>

              <Text style={summaryLabel}>CAPACITY:</Text>
              <Text style={summaryValue}>25 seats available</Text>

              <Text style={summaryLabel}>DURATION:</Text>
              <Text style={summaryValue}>20 weeks</Text>

              <Text style={summaryLabel}>FORMAT:</Text>
              <Text style={summaryValue}>Hybrid - Remote weekdays + On-site Saturdays</Text>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              <strong style={strong}>Have questions?</strong> Check our{' '}
              <Link href="https://dogm.ai/contact#faq" style={link}>
                FAQ page
              </Link>
              {' '}or reply to this email. We typically respond within 24 hours.
            </Text>

            <Text style={paragraph}>
              Want to see our full curriculum online? Visit our{' '}
              <Link href="https://dogm.ai/curriculum" style={link}>
                curriculum page
              </Link>
              {' '}or explore{' '}
              <Link href="https://dogm.ai/our-system" style={link}>
                how we teach
              </Link>
              .
            </Text>

            <Section style={calloutBox}>
              <Text style={calloutText}>
                💰 <strong>Early Bird Discount:</strong> Save ₱5,000 with full payment. Limited to 25 seats only.
              </Text>
            </Section>

            <Section style={ctaSection}>
              <Button href="https://dogm.ai/enroll" style={ctaButton}>
                Apply Now
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>DOGM.AI</Text>
            <Text style={footerTagline}>
              Learning to code is hard. We make it real.
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href="https://dogm.ai" style={footerLink}>
                Home
              </Link>
              {' • '}
              <Link href="https://dogm.ai/curriculum" style={footerLink}>
                Curriculum
              </Link>
              {' • '}
              <Link href="https://dogm.ai/cohorts" style={footerLink}>
                Cohorts
              </Link>
              {' • '}
              <Link href="https://dogm.ai/contact" style={footerLink}>
                Contact
              </Link>
            </Text>
            <Text style={footerMuted}>
              You received this email because you requested our syllabus at dogm.ai
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles matching DOGM.AI theme
const main = {
  backgroundColor: '#060503',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 20px',
};

const container = {
  backgroundColor: '#0d0906',
  border: '1px solid #2e2e2e',
  borderRadius: '8px',
  maxWidth: '600px',
  margin: '0 auto',
  overflow: 'hidden',
};

const header = {
  backgroundColor: '#060503',
  padding: '40px 40px 36px',
  textAlign: 'center' as const,
};

const logo = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f4efe6',
  margin: '0 0 20px 0',
  letterSpacing: '0.1em',
};

const headerDivider = {
  borderColor: '#f97316',
  borderWidth: '2px',
  margin: '0 auto 24px',
  width: '60px',
};

const headerTitle = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#f4efe6',
  margin: '0 0 12px 0',
  lineHeight: '1.2',
};

const headerSubtitle = {
  fontSize: '15px',
  color: '#c9b89b',
  margin: '0',
  lineHeight: '1.5',
};

const content = {
  padding: '40px 40px 24px',
};

const greeting = {
  fontSize: '18px',
  color: '#f4efe6',
  fontWeight: '600',
  margin: '0 0 24px 0',
};

const paragraph = {
  fontSize: '15px',
  color: '#d8c9b0',
  lineHeight: '1.7',
  margin: '0 0 20px 0',
};

const strong = {
  color: '#f97316',
  fontWeight: '600',
};

const link = {
  color: '#f97316',
  textDecoration: 'underline',
};

const divider = {
  borderColor: '#2e2e2e',
  margin: '32px 0',
};

const highlightBox = {
  backgroundColor: '#060503',
  border: '2px solid #f97316',
  borderRadius: '8px',
  padding: '28px',
  marginTop: '24px',
  marginBottom: '32px',
};

const highlightTitle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#f97316',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
  letterSpacing: '0.1em',
};

const highlightText = {
  fontSize: '14px',
  color: '#d8c9b0',
  lineHeight: '1.7',
  margin: '0 0 16px 0',
  fontFamily: 'monospace',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '32px',
};

const button = {
  backgroundColor: '#f97316',
  color: '#ffffff',
  padding: '16px 32px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-block',
};

const sectionTitle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#f97316',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '0 0 20px 0',
  fontFamily: 'monospace',
};

const summaryBox = {
  backgroundColor: '#060503',
  border: '1px solid #2e2e2e',
  borderRadius: '6px',
  padding: '24px',
};

const summaryLabel = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#a8987a',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '16px 0 6px 0',
  fontFamily: 'monospace',
};

const summaryValue = {
  fontSize: '15px',
  color: '#f4efe6',
  margin: '0',
};

const calloutBox = {
  backgroundColor: 'rgba(249, 115, 22, 0.1)',
  border: '1px solid rgba(249, 115, 22, 0.3)',
  borderRadius: '6px',
  padding: '20px',
  marginTop: '24px',
};

const calloutText = {
  fontSize: '14px',
  color: '#f4efe6',
  lineHeight: '1.7',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const ctaButton = {
  backgroundColor: '#f97316',
  color: '#ffffff',
  padding: '14px 40px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '15px',
  display: 'inline-block',
};

const footer = {
  padding: '32px 40px',
  borderTop: '1px solid #2e2e2e',
  textAlign: 'center' as const,
};

const footerBrand = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#f4efe6',
  margin: '0 0 8px 0',
  letterSpacing: '0.05em',
};

const footerTagline = {
  fontSize: '13px',
  color: '#a8987a',
  margin: '0 0 20px 0',
  fontStyle: 'italic',
};

const footerDivider = {
  borderColor: '#2e2e2e',
  margin: '20px 0',
};

const footerLinks = {
  fontSize: '13px',
  color: '#c9b89b',
  margin: '0 0 16px 0',
};

const footerLink = {
  color: '#c9b89b',
  textDecoration: 'none',
};

const footerMuted = {
  fontSize: '11px',
  color: '#a8987a',
  margin: '0',
  fontFamily: 'monospace',
};
