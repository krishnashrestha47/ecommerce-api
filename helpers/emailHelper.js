import nodemailer from "nodemailer";

export const sendMail = async (emailData) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: +process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Laptop store 💻 " kendra.beer50@ethereal.email', // sender address
    to: "kendra.beer50@ethereal.email", // list of receivers
    subject: "Please verify your email", // Subject line
    text: `Hi there, please follow the link to verify your email ${emailData.url}`, // plain text body
    html: `<p>Hi ${emailData.fName}</p>
        <br/>
        <br/>
        Please follow the link below to verify your email, so that you can login to your account.
        <br/>
        <br/>
        <a href ="${emailData.url}">${emailData.url}</a>
        <br/>
        <br/>
kind regards,
Laptop store team
        `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));
};
