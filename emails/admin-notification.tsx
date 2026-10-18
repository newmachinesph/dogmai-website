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

interface AdminNotificationEmailProps {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}

export default function AdminNotificationEmail({
  fullName,
  email,
  topic,
  message,
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with orange accent */}
          <Section style={header}>
            <Text style={logo}>DOGM.AI</Text>
            <Hr style={headerDivider} />
            <Text style={headerTitle}>New Contact Submission</Text>
            <Text style={headerSubtitle}>Someone just reached out via the contact form</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={label}>FROM:</Text>
            <Text style={value}>{fullName}</Text>

            <Hr style={divider} />

            <Text style={label}>EMAIL:</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>
            </Text>

            <Hr style={divider} />

            <Text style={label}>TOPIC:</Text>
            <Text style={value}>{topic}</Text>

            <Hr style={divider} />

            <Text style={label}>MESSAGE:</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{message}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Reply directly to {email} or use your email client's reply function.
            </Text>
            <Text style={footerMuted}>
              Sent from DOGM.AI contact form • {new Date().toLocaleString()}
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

const label = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#a8987a',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 8px 0',
  fontFamily: 'monospace',
};

const value = {
  fontSize: '16px',
  color: '#f4efe6',
  margin: '0 0 24px 0',
  lineHeight: '1.6',
};

const emailLink = {
  color: '#f97316',
  textDecoration: 'none',
};

const divider = {
  borderColor: '#2e2e2e',
  margin: '24px 0',
};

const messageBox = {
  backgroundColor: '#060503',
  border: '1px solid #2e2e2e',
  borderRadius: '6px',
  padding: '20px',
  marginTop: '12px',
};

const messageText = {
  fontSize: '15px',
  color: '#d8c9b0',
  lineHeight: '1.7',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  fontFamily: 'monospace',
};

const footer = {
  padding: '24px 40px 32px',
  borderTop: '1px solid #2e2e2e',
};

const footerText = {
  fontSize: '14px',
  color: '#c9b89b',
  margin: '0 0 12px 0',
  lineHeight: '1.5',
};

const footerMuted = {
  fontSize: '12px',
  color: '#a8987a',
  margin: '0',
  fontFamily: 'monospace',
};
