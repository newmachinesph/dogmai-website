import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import AdminNotificationEmail from '@/emails/admin-notification';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM;
const smtpTo = process.env.SMTP_TO;

function missingEnv() {
  return !smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom || !smtpTo;
}

export async function POST(request: Request) {
  if (missingEnv()) {
    return NextResponse.json(
      {
        error: 'Email service is not configured.',
        missing: {
          SMTP_HOST: !smtpHost,
          SMTP_PORT: !smtpPort,
          SMTP_USER: !smtpUser,
          SMTP_PASS: !smtpPass,
          SMTP_FROM: !smtpFrom,
          SMTP_TO: !smtpTo,
        },
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { fullName, email, topic, message } = body as {
    fullName?: string;
    email?: string;
    topic?: string;
    message?: string;
  };

  if (!fullName || !email || !topic || !message) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    );
  }

  const portNumber = Number(smtpPort);
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number.isNaN(portNumber) ? 587 : portNumber,
    secure: portNumber === 465,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const safeTopic = String(topic).slice(0, 120);
  const safeName = String(fullName).slice(0, 120);
  const safeEmail = String(email).slice(0, 200);

  try {
    // Render admin notification email
    const adminEmailHtml = await render(
      AdminNotificationEmail({
        fullName: safeName,
        email: safeEmail,
        topic: safeTopic,
        message: String(message),
      })
    );

    // Render customer confirmation email
    const customerEmailHtml = await render(
      CustomerConfirmationEmail({
        fullName: safeName,
        topic: safeTopic,
        message: String(message),
      })
    );

    // Send admin notification
    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `Contact form: ${safeTopic}`,
      html: adminEmailHtml,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nTopic: ${safeTopic}\n\nMessage:\n${message}`,
    });

    // Send customer confirmation
    await transporter.sendMail({
      from: smtpFrom,
      to: safeEmail,
      subject: 'We received your message',
      html: customerEmailHtml,
      text: `Hi ${safeName},\n\nThanks for reaching out to DOGM.AI. We received your message and will reply within 1-2 business days.\n\nSummary:\nTopic: ${safeTopic}\n\nMessage:\n${message}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    const detail =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to send message.', detail },
      { status: 500 }
    );
  }
}
