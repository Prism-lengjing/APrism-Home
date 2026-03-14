"use server";

import nodemailer from "nodemailer";
import { getEmailTemplate } from "@/lib/email-templates";

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
      subject: `来自官网的新消息: ${data.firstName} ${data.lastName}`,
      text: `
        姓名: ${data.firstName} ${data.lastName}
        邮箱: ${data.email}
        
        消息内容:
        ${data.message}
      `,
      html: getEmailTemplate(
        "收到新的联系表单提交",
        `
          <h1>新消息提醒</h1>
          <p>您收到了一封来自官网联系表单的新邮件。</p>
          <table class="info-table">
            <tr>
              <td class="info-label">姓名</td>
              <td>${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td class="info-label">邮箱</td>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
          </table>
          <p><strong>消息内容：</strong></p>
          <p style="white-space: pre-wrap; background: #fafafa; padding: 16px; border-radius: 8px; font-size: 14px; color: #444;">${data.message}</p>
        `,
        `来自 ${data.firstName} ${data.lastName} 的新消息`
      ),
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
