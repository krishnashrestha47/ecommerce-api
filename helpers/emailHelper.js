import nodemailer from "nodemailer";

const emailProcessor = async (emailData) => {
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
  let info = await transporter.sendMail(emailData);

  console.log("Message sent: %s", info.messageId);
  //preview only available when sending through an Ethereal account
  console.log("Preview URL : %s", nodemailer.getTestMessageUrl(info));
};

export const sendMail = async (emailData) => {
  const mailBody = {
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
  };

  emailProcessor(mailBody);
};

//userInfo should have email, fName
export const profileUpdateNotification = async (userInfo) => {
  const mailBody = {
    from: '"Laptop store 💻 " kendra.beer50@ethereal.email', // sender address
    to: userInfo.email, // list of receivers
    subject: "Profile Update Notification", // Subject line
    text: `Hi there, your profile has just been updated, If it wasn't you, please contact administration immediately`, // plain text body
    html: `<p>Hi ${emailData.fName}</p>
        <br/>
        <br/>
        Please follow the link below to verify your email, so that you can login to your account.
        <br/>
        <br/>
kind regards,
Laptop store team
        `, // html body
  };

  emailProcessor(mailBody);
};

//userInfo should have email, fName
export const otpNotification = async (userInfo) => {
  const mailBody = {
    from: '"Laptop store 💻 " kendra.beer50@ethereal.email', // sender address
    to: userInfo.email, // list of receivers
    subject: "Profile Update Notification", // Subject line
    text: `Hi there, here is the OTP as per your request ${userInfo.token}, If it wasn't you, please contact administration immediately`, // plain text body
    html: `<p>Hi there,</p>
        <br/>
        <br/>
        here is the OTP as per your request ${userInfo.token}
        <br/>
        <br/>
kind regards,
Laptop store team
        `, // html body
  };

  emailProcessor(mailBody);
};
