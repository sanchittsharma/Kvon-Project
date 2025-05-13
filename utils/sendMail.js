const nodemailer=require("nodemailer")


const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: `sandbox.smtp.mailtrap.io`,
    port:2525,
    auth: {
      user: "07e3df1e3cb65d",          
      pass: "d824b153d48229"
    }
  });

  await transporter.sendMail({
    from: `demo support <support@gmail.com> ` ,
    to,
    subject,
    html
  });
};

module.exports = {sendEmail};
