import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.SEND
  },
});

export async function POST(request: Request) {
  try {
    const { fromName, fromEmail, subject, message } = await request.json();

    const from = `"${fromName}" <${fromEmail}>`;

    await transporter.sendMail({
      from,
      to: process.env.TO,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
