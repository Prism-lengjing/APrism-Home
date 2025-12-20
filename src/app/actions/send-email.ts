"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

interface ActionState {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ContactFormData]?: string[];
  };
}

export async function sendEmailAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data: ContactFormData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // Simple Validation
  if (!data.email || !data.message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  try {
    // Check if SMTP environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials not found. Logging email content instead.");
        console.log("----------------------------------------");
        console.log("📧 NEW CONTACT FORM SUBMISSION");
        console.log(`From: ${data.firstName} ${data.lastName} <${data.email}>`);
        console.log(`Message: ${data.message}`);
        console.log("----------------------------------------");
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: "Message sent successfully (Simulation mode - Check console).",
        };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${data.firstName} ${data.lastName}" <${process.env.SMTP_USER}>`, // Sender address (must be authenticated user usually)
      replyTo: data.email,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Receiver
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      text: `
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        
        Message:
        ${data.message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
