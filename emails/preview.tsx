/**
 * Email Template Preview Helper
 *
 * This file helps you preview your email templates in the browser.
 * To use:
 * 1. Import your email template
 * 2. Add sample data
 * 3. Open this in your browser to see the rendered email
 */

import AdminNotificationEmail from './admin-notification';
import CustomerConfirmationEmail from './customer-confirmation';

// Sample data for preview
const sampleData = {
  fullName: 'Jane Dela Cruz',
  email: 'jane@example.com',
  topic: 'Enrollment and schedule',
  message: 'Hi! I\'m interested in the next cohort starting in February. Can you share more details about the schedule and payment options?\n\nI work full-time but want to transition into tech. Would this program work for someone with my schedule?\n\nThanks!',
};

// Export both templates for preview
export function AdminPreview() {
  return <AdminNotificationEmail {...sampleData} />;
}

export function CustomerPreview() {
  return <CustomerConfirmationEmail {...sampleData} />;
}

// Default export for easy preview
export default function EmailPreview() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '40px' }}>
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'monospace', marginBottom: '20px' }}>
          Admin Notification Email Preview
        </h1>
        <AdminPreview />
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'monospace', marginBottom: '20px' }}>
          Customer Confirmation Email Preview
        </h1>
        <CustomerPreview />
      </div>
    </div>
  );
}
