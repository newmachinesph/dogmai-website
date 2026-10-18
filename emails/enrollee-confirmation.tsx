import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface EnrolleeConfirmationProps {
  fullName: string;
  paymentPlan: string;
}

export default function EnrolleeConfirmation({
  fullName,
  paymentPlan,
}: EnrolleeConfirmationProps) {
  const paymentPlanLabels: Record<string, string> = {
    full: 'Full payment',
    installment: 'Installment plan',
  };

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>DOGM.AI</Text>
            <Hr style={headerDivider} />
            <Text style={headerTitle}>Application Received</Text>
            <Text style={headerSubtitle}>Welcome to the enrollment process</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {fullName},</Text>

            <Text style={paragraph}>
              Thanks for applying to DOGM.AI Cohort 1. We've received your enrollment application and will review it within the next 24 hours.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightTitle}>🎯 WHAT HAPPENS NEXT</Text>
              <Text style={highlightText}>
                <strong style={strong}>1. Review (24 hours)</strong><br />
                We'll review your application and send payment instructions to your email.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>2. Payment</strong><br />
                Once you complete payment, your seat is secured. Seats are first-come, first-served.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>3. Confirmation</strong><br />
                You'll receive a confirmation packet with your cohort details and prep materials.
              </Text>
              <Text style={highlightText}>
                <strong style={strong}>4. Start Date</strong><br />
                Cohort 1 start date will be confirmed in your enrollment packet. We'll send setup instructions before then.
              </Text>
            </Section>

            <Hr style={divider} />

            <Text style={sectionTitle}>YOUR APPLICATION SUMMARY</Text>

            <Section style={summaryBox}>
              <Text style={summaryLabel}>PREFERRED PAYMENT PLAN:</Text>
              <Text style={summaryValue}>{paymentPlanLabels[paymentPlan] || paymentPlan}</Text>

              <Text style={summaryLabel}>COHORT:</Text>
              <Text style={summaryValue}>Cohort 1 - Hybrid Format</Text>

              <Text style={summaryLabel}>DURATION:</Text>
              <Text style={summaryValue}>20 weeks</Text>

              <Text style={summaryLabel}>FORMAT:</Text>
              <Text style={summaryValue}>Remote weekdays, on-site Saturdays</Text>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              <strong style={strong}>Questions?</strong> Reply to this email or contact us at{' '}
              <Link href="mailto:hello@dogm.ai" style={link}>
                hello@dogm.ai
              </Link>
              .
            </Text>

            <Text style={paragraph}>
              In the meantime, check out our{' '}
              <Link href="https://dogm.ai/curriculum" style={link}>
                curriculum
              </Link>
              {' '}to see what you'll be building, or read our{' '}
              <Link href="https://dogm.ai/contact#faq" style={link}>
                FAQ
              </Link>
              {' '}for common questions.
            </Text>

            <Section style={calloutBox}>
              <Text style={calloutText}>
                💡 <strong>Early Bird Discount:</strong> Full payment saves ₱5,000. Limited time offer - ask us about this when we send payment instructions.
              </Text>
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
              <Link href="https://dogm.ai/our-system" style={footerLink}>
                Our System
              </Link>
              {' • '}
              <Link href="https://dogm.ai/contact" style={footerLink}>
                Contact
              </Link>
            </Text>
            <Text style={footerMuted}>
              This email was sent because you applied for enrollment at dogm.ai
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
