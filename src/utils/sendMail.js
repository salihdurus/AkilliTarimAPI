const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    })
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log("Hata Çıktı Mail Gönderilemedi : ", err);
        console.log("info : ", info);
        return true
    })
}
module.exports = sendEmail;