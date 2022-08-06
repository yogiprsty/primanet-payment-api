require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (email, subject, context) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve('./app/mailviews/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./app/mail/views/'),
    };

    transporter.use('compile', hbs(handlebarOptions));

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      template: 'email',
      subject,
      context,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendEmail;
