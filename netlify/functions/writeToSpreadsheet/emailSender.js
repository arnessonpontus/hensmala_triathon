var nodemailer = require("nodemailer");

// Click on this link to enable applications to access the email account:
// https://accounts.google.com/b/0/DisplayUnlockCaptcha

// required env vars
if (!process.env.EMAILER_USER) throw new Error("no EMAILER_USER env var set");
// required env vars
if (!process.env.EMAILER_PASSWORD)
  throw new Error("no EMAILER_PASSWORD env var set");

function sendEmail(addedRow) {
  return new Promise((resolve, reject) => {
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
      from: process.env.EMAILER_USER,
      to: email,
      subject: "Tack för din amälan!",
      html: html,
    };

    console.log("Sending email...");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email: ", error);
        reject();
      } else {
        console.log("Email sent to : " + email + " : " + info.response);
        resolve();
      }
    });
  });
}

module.exports = sendEmail;
