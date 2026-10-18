import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';
import AdminEnrollmentNotification from '@/emails/admin-enrollment-notification';
import EnrolleeConfirmation from '@/emails/enrollee-confirmation';

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

  const { fullName, email, phone, paymentPlan, experience, goal } = body as {
    fullName?: string;
    email?: string;
    phone?: string;
    paymentPlan?: string;
    experience?: string;
    goal?: string;
  };

  if (!fullName || !email || !phone || !paymentPlan || !experience) {
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

  const safeName = String(fullName).slice(0, 120);
  const safeEmail = String(email).slice(0, 200);
  const safePhone = String(phone).slice(0, 50);
  const safePaymentPlan = String(paymentPlan).slice(0, 50);
  const safeExperience = String(experience).slice(0, 50);
  const safeGoal = goal ? String(goal).slice(0, 1000) : '';

  try {
    // Render admin notification email
    const adminEmailHtml = await render(
      AdminEnrollmentNotification({
        fullName: safeName,
        email: safeEmail,
        phone: safePhone,
        paymentPlan: safePaymentPlan,
        experience: safeExperience,
        goal: safeGoal,
      })
    );

    // Render enrollee confirmation email
    const enrolleeEmailHtml = await render(
      EnrolleeConfirmation({
        fullName: safeName,
        paymentPlan: safePaymentPlan,
      })
    );

    // Send admin notification
    await transporter.sendMail({
      from: smtpFrom,
      to: smtpTo,
      replyTo: `${safeName} <${safeEmail}>`,
      subject: `New Enrollment: ${safeName}`,
      html: adminEmailHtml,
      text: `New Enrollment Application\n\nName: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone}\nPayment Plan: ${safePaymentPlan}\nExperience: ${safeExperience}\n\nGoals:\n${safeGoal}`,
    });

    // Send enrollee confirmation
    await transporter.sendMail({
      from: smtpFrom,
      to: safeEmail,
      subject: 'Application Received - DOGM.AI Cohort 1',
      html: enrolleeEmailHtml,
      text: `Hi ${safeName},\n\nThanks for applying to DOGM.AI Cohort 1. We've received your enrollment application and will review it within the next 24 hours.\n\nWhat happens next:\n1. Review (24 hours) - We'll review your application and send payment instructions\n2. Payment - Once you complete payment, your seat is secured\n3. Confirmation - You'll receive a confirmation packet with cohort details\n4. Start - Cohort 1 details will be sent upon confirmation\n\nQuestions? Reply to this email or contact us at hello@dogm.ai.\n\nDOGM.AI\nLearning to code is hard. We make it real.`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Enrollment email failed', error);
    const detail =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to send enrollment confirmation.', detail },
      { status: 500 }
    );
  }
}
