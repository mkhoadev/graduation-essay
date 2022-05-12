const nodemailer = require("nodemailer");

const VerifyEmail = function (verify) {
  this.email = verify.email;
};

VerifyEmail.sendCode = (newverify, result) => {
  console.log(newverify);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mihkhoa2018@gmail.com",
      pass: "Dragon108",
    },
  });

  const code = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: "mihkhoa2018@gmail.com",
    to: newverify.email,
    subject: "Chào mừng bạn đến với SHOPHOES",
    text: `Mã xác thực tài khoản: ${code}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  result(null, {code: code.toString()});
};

module.exports = VerifyEmail;
