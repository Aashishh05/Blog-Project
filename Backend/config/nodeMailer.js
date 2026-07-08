import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 578,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error", error);
  } else {
    console.log("SMTP connected successfully");
  }
});
