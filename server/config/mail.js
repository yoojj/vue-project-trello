require('dotenv').config();
const nodemailer = require('nodemailer');



nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
});
