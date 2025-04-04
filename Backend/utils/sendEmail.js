import nodemailer from 'nodemailer';

// Create a reusable email transport using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // or you can use other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,  // Your email address (make sure to set this in your .env file)
    pass: process.env.EMAIL_PASS,  // Your email password (set in .env file for security)
  },
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    // Setup email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to,                           // Receiver address
      subject,                      // Subject line
      text,                         // Plain text body
      html,                         // HTML body (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;  // Return the email info if needed
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
