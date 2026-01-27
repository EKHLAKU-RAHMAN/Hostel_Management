// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER2,
//       pass: process.env.EMAIL_PASS2
//     },
//     tls: {
//     rejectUnauthorized: false,
//   },
//   connectionTimeout: 30000,
//   greetingTimeout: 30000,
//   socketTimeout: 30000,
//   });

//   await transporter.sendMail({
//     from: `"Hostel Management" <${process.env.EMAIL_USER2}>`,
//     to,
//     subject,
//     html
//   });
// };

// module.exports = sendEmail;


// const { Resend } = require("resend");


// const resend = new Resend(process.env.Resend_API_KEY);

// module.exports = async function sendEmail({ to, subject, html }) {
//   return resend.emails.send({
//     // from: `Hostel ERP <${process.env.EMAIL_USER}>`,
//     from: "Hostel ERP <onboarding@resend.dev>",
//     to,
//     subject,
//     html,
//   });
// };


const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      // host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
      },
      connectionTimeout: 20000,
    });

    // 🔍 SMTP test
    await transporter.verify();
    console.log("✅ SMTP connected");

    await transporter.sendMail({
      from: `"Hostel Management" <${process.env.EMAIL_USER2}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent");
    return true;
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    return false;
  }
};

module.exports = sendEmail;


