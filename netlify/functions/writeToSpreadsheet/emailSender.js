var nodemailer = require("nodemailer");
function sendEmail(addedRow) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILER_USER,
      pass: process.env.EMAILER_PASSWORD,
    },
  });

  let name = "";
  if (addedRow.name) {
    name = addedRow.name.split(" ")[0];
  } else if (addedRow.teamName) {
    name = addedRow.teamName;
  }

  let html = `
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head> 
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sunday Confirm Email</title>
  <style type="text/css">
  h1 {
      color: #fff;
  }
  </style>

    <h1>
        Tack för din anmälan till Hensmåla Triathlon 2021, ${name}!
    </h1>
    <p>
        Vi ses i 10e juli!
    </p>
    <b>
        Ditt ID är ${addedRow.id}
    </b>
  `;

  const email = addedRow.email ? addedRow.email : addedRow.email1;

  var mailOptions = {
    from: "Hensmåla Triathlon",
    to: email,
    subject: "Tack för din amälan!",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
