const nodemailer = require("nodemailer")

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "localhost",
            service:"hotmail",
            port: 587, 
            auth: {
                user: "alceucaterca@hotmail.com",
                pass: "*****",
            },
        });

        await transporter.sendMail({
            from: "alceucaterca@hotmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;

