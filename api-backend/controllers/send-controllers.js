const nodemailer = require("nodemailer");

const sendmail = async (req,res)=>{
    let config = 
    {
        host: "smpt.gmail.com",
        port: 465,
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    }
    console.log(config);
    let transporter = nodemailer.createTransport(config);
        let message ={
        from: process.env.USER,
        to: "aakashmalhotra312000@gmail.com",
        subject: "OTP details",
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    let info = await transporter.sendMail(message)
    res.json({msg: "got mail"})

}

module.exports = sendmail;


// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//    const userMail =  process.env.USER;

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: userMail, // generated ethereal user
//             pass: process.env.PASS, // generated ethereal password
//         },
//     });

//     // send mail with defined transport object
//     let mailOptions = {
//         from: '"testing mode👻" <aakashmalhotra2863@gmail.com>', // sender address
//         to: "manishsheela902@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     }
//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) console.log(err)
//         else {
//             res.send('email sent');
//         }
//     })

// }



