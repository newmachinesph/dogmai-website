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

interface AdminEnrollmentNotificationProps {
  fullName: string;
  email: string;
  phone: string;
  paymentPlan: string;
  experience: string;
  goal: string;
}

export default function AdminEnrollmentNotification({
  fullName,
  email,
  phone,
  paymentPlan,
  experience,
  goal,
}: AdminEnrollmentNotificationProps) {
  const paymentPlanLabels: Record<string, string> = {
    full: 'Full payment',
    installment: 'Installment plan',
  };

  const experienceLabels: Record<string, string> = {
    beginner: 'Beginner (no coding yet)',
    some: 'Some experience',
    'career-shift': 'Career shifter',
    developer: 'Working developer',
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
            <Text style={headerTitle}>New Enrollment Application</Text>
            <Text style={headerSubtitle}>Cohort 1 - Applications Open</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Section style={urgentBanner}>
              <Text style={urgentText}>
                🔔 New application received - Review and follow up within 24 hours
              </Text>
            </Section>

            <Text style={sectionTitle}>APPLICANT DETAILS</Text>

            <Text style={label}>FULL NAME:</Text>
            <Text style={value}>{fullName}</Text>

            <Hr style={divider} />

            <Text style={label}>EMAIL:</Text>
            <Text style={value}>
              <Link href={`mailto:${email}`} style={emailLink}>
                {email}
              </Link>
            </Text>

            <Hr style={divider} />

            <Text style={label}>PHONE:</Text>
            <Text style={value}>
              <Link href={`tel:${phone}`} style={emailLink}>
                {phone}
              </Link>
            </Text>

            <Hr style={divider} />

            <Text style={label}>PREFERRED PAYMENT:</Text>
            <Text style={value}>{paymentPlanLabels[paymentPlan] || paymentPlan}</Text>

            <Hr style={divider} />

            <Text style={label}>EXPERIENCE LEVEL:</Text>
            <Text style={value}>{experienceLabels[experience] || experience}</Text>

            <Hr style={divider} />

            <Text style={label}>GOALS & MOTIVATION:</Text>
            <Section style={messageBox}>
              <Text style={messageText}>{goal || 'Not provided'}</Text>
            </Section>

            <Hr style={divider} />

            <Section style={actionBox}>
              <Text style={actionTitle}>NEXT STEPS:</Text>
              <Text style={actionText}>
                1. Review application details<br />
                2. Send payment instructions to {email}<br />
                3. Schedule follow-up call if needed<br />
                4. Confirm seat reservation after payment
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Reply directly to {email} or call {phone}
            </Text>
            <Text style={footerMuted}>
              Enrollment form submission • {new Date().toLocaleString()}
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

const urgentBanner = {
  backgroundColor: '#f97316',
  borderRadius: '6px',
  padding: '16px 20px',
  marginBottom: '32px',
};

const urgentText = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#0d0906',
  margin: '0',
  textAlign: 'center' as const,
};

const sectionTitle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#f97316',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '0 0 24px 0',
  fontFamily: 'monospace',
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

const actionBox = {
  backgroundColor: '#060503',
  border: '2px solid #f97316',
  borderRadius: '6px',
  padding: '24px',
  marginTop: '32px',
};

const actionTitle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#f97316',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  margin: '0 0 16px 0',
  fontFamily: 'monospace',
};

const actionText = {
  fontSize: '14px',
  color: '#d8c9b0',
  lineHeight: '1.8',
  margin: '0',
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
