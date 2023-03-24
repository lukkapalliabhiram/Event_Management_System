const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alia.schroeder@ethereal.email',
        pass: 'kVBkWbUmz8zhbgr3QP'
    }
});

module.exports = async (senderAddress,s, t) => {
    let error = false;

    try{
        let info = await transporter.sendMail({
            from: '"Hanabi Yuga" <alia.schroeder@ethereal.email>', // sender address
            to: senderAddress, // list of receivers
            subject: s, // Subject line
            html: t, // html body
          });
    }
    catch(e){
        error = true;
    }

}