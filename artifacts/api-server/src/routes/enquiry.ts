import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/enquiry", async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !service || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  const protonUser = process.env["PROTON_MAIL_USER"];
  const protonPass = process.env["PROTON_MAIL_PASSWORD"];

  if (!protonUser || !protonPass) {
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.protonmail.com",
    port: 587,
    secure: false,
    auth: {
      user: protonUser,
      pass: protonPass,
    },
  });

  try {
    await transporter.sendMail({
      from: "Árdíre Enquiries <enquiries@ardire.co.uk>",
      to: "enquiries@ardire.co.uk",
      replyTo: email,
      subject: `New Enquiry: ${service} — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 1px solid #c9a84c; padding-bottom: 12px; color: #c9a84c;">
            New Enquiry via Árdíre Website
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Area of Interest</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
          </table>
          <h3 style="color: #c9a84c; margin-bottom: 8px;">Message</h3>
          <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
          <p style="font-size: 12px; color: #999;">
            This enquiry was submitted via the contact form at ardire.co.uk
          </p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send enquiry email:", err);
    res.status(500).json({ error: "Failed to send enquiry. Please try again." });
  }
});

export default router;
