import { NextResponse } from 'next/server';
import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import SyllabusEmail from '@/emails/syllabus-download';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate Gmail-only
    if (!email || !email.endsWith('@gmail.com')) {
      return NextResponse.json(
        { error: 'Only Gmail addresses are accepted' },
        { status: 400 }
      );
    }

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Generate the download URL
    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/DOGM-Bootcamp-Brochure.pdf`;

    // Render email HTML
    const emailHtml = await render(SyllabusEmail({ email, downloadUrl }));

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'DOGM.AI <hello@dogm.ai>',
      to: email,
      subject: 'Your DOGM.AI Syllabus is Ready',
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending syllabus email:', error);
    return NextResponse.json(
      { error: 'Failed to send syllabus' },
      { status: 500 }
    );
  }
}
