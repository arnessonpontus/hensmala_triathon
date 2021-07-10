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
  <title>HT Confirm Email</title>
  </head>
  <style type="text/css">
  </style>
  <div>
    <h1>Hej ${name}!</h1>
    <h2>
        Tack för din anmälan till Hensmåla Triathlon 2021 - Corona Edition!
    </h2>
    <p>
        Din tid kommer nu att utvärderas av oss och se till så att den inte krockar med för många andra deltagare.
    </p>
    <p>
      Betala 250kr till bankgiro 386-6563 eller swisha till 1236882088.
    </p>
    <p>
      Vi kommer efter detta att skicka ut ett mail med vidare information. Här är dina uppgifter:
    </p>
    <ul>
      <li>
        Namn: <b>${addedRow.name}</b>
      </li>
      <li>
        Epost: <b>${addedRow.email}</b>
      </li>
      <li>
        Födelsedatum: <b>${addedRow.birthday}</b>
      </li>
      <li>
        Kön: <b>${addedRow.gender}</b>
      </li>
      <li>
        Ort/klubb: <b>${addedRow.city}</b>
      </li>
      <li>
        Tid för genomförande: <b>${addedRow.time}</b>
      </li>
      <li>
        Övrig information: <b>${addedRow.info}</b>
      </li>
    </ul>
    <p>Lycka till!</p>
    <img src="https://www.hensmalatriathlon.se/images/corona_hen.png" alt="Logga" width="200px"'/>
    </div>
  `;

    const email = addedRow.email ? addedRow.email : addedRow.email1;

    var mailOptions = {
      from: process.env.EMAILER_USER,
      to: email,
      subject: "Tack för din anmälan!",
      html: html,
      bcc: [process.env.EMAILER_USER],
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
