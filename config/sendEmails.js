const nodemailer = require("nodemailer");
const GMAIL_USER = require("../config/keys").GMAIL_USER;
const GMAIL_PASS = require("../config/keys").GMAIL_PASS;
let error = false;
module.exports = async (senderAddress,s, t) => {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            }
        });
        let message = {
            from: `Hanabi Yuga<meruanu97@gmail.com>`, // sender address
            to: senderAddress, // list of receivers
            subject: s, // Subject line
            html: t, // html bodyr
        };
        await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return process.exit(1);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }
    catch(e){
        console.log("send email error"+e);
        error = true;
    }
    return error
}