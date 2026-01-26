const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Hostel Management" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;


// const { Resend } = require("resend");

// const resend = new Resend(process.env.RE-EMAIL_API_KEY);

// module.exports = async function sendEmail({ to, subject, html }) {
//   return resend.emails.send({
//     from: `Hostel ERP <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };

