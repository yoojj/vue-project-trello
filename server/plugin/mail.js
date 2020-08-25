const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({

    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,

});



exports.send = (option) => {

    return new Promise( (resolve, reject) => {

        const mailOption = {
            form: process.env.MAIL_USER,
            to: option.to,
            subject: option.subject,
            text: option.text || null,
            html: option.html || null,
            attachments : [{
                filename : option.fileName || null,
                path : option.filePath || null,
            }],
        };

        transport.sendMail( mailOption, (err, info) => {

            err ? reject(err) : resolve(info);

            transport.close();

        });

    });

};
