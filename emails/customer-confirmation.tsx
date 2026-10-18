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

interface CustomerConfirmationEmailProps {
  fullName: string;
  topic: string;
  message: string;
}

export default function CustomerConfirmationEmail({
  fullName,
  topic,
  message,
}: CustomerConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with orange accent */}
          <Section style={header}>
            <Text style={logo}>DOGM.AI</Text>
            <Hr style={headerDivider} />
            <Text style={headerTitle}>Message Received</Text>
            <Text style={headerSubtitle}>We'll get back to you within 1-2 business days</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {fullName},</Text>

            <Text style={paragraph}>
              Thanks for reaching out. We've received your message and one of our team members will respond soon.
            </Text>

            <Text style={paragraph}>
              In the meantime, feel free to explore our{' '}
              <Link href="https://dogm.ai/curriculum" style={link}>
                curriculum
              </Link>
              {' '}or browse our{' '}
              <Link href="https://dogm.ai/contact#faq" style={link}>
                frequently asked questions
              </Link>
              .
            </Text>

            <Hr style={divider} />

            {/* Summary box */}
            <Section style={summaryBox}>
              <Text style={summaryTitle}>YOUR MESSAGE SUMMARY</Text>

              <Text style={summaryLabel}>TOPIC:</Text>
              <Text style={summaryValue}>{topic}</Text>

              <Text style={summaryLabel}>MESSAGE:</Text>
              <Section style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </Section>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              If you need immediate assistance, you can email us directly at{' '}
              <Link href="mailto:hello@dogm.ai" style={link}>
                hello@dogm.ai
              </Link>
              .
            </Text>
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
              <Link href="https://dogm.ai/contact" style={footerLink}>
                Contact
              </Link>
            </Text>
            <Text style={footerMuted}>
              This email was sent because you submitted a contact form at dogm.ai
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

const summaryBox = {
  backgroundColor: '#060503',
  border: '1px solid #2e2e2e',
  borderRadius: '6px',
  padding: '24px',
};

const summaryTitle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#f97316',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '0 0 20px 0',
  fontFamily: 'monospace',
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

const messageBox = {
  backgroundColor: '#0d0906',
  border: '1px solid #2e2e2e',
  borderRadius: '4px',
  padding: '16px',
  marginTop: '8px',
};

const messageText = {
  fontSize: '14px',
  color: '#c9b89b',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  fontFamily: 'monospace',
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
