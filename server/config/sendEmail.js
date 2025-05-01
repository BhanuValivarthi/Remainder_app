const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dailyremainder007@gmail.com',
    pass: 'tsww bvvm qitn hdgj'
  }
});


const sendEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: 'dailyremainder007@gmail.com', 
      to: to,                       
      subject: subject,             
      text: message,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

module.exports = sendEmail;