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


const {Resend} = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

 const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "Hostel ERP <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

module.exports = sendEmail;




