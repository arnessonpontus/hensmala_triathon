const nodemailer = require("nodemailer");
const { getSoloHtml, getTeamHtml, getShirtHtml, getExceptionCompanyHtml } = require('./getHtml')

// Click on this link to enable applications to access the email account:
// https://accounts.google.com/b/0/DisplayUnlockCaptcha

// required env vars
if (!process.env.EMAILER_USER) throw new Error("no EMAILER_USER env var set");
// required env vars
if (!process.env.EMAILER_PASSWORD)
  throw new Error("no EMAILER_PASSWORD env var set");
if (!process.env.VITE_ALLOWED_COMPANY)
  throw new Error("no VITE_ALLOWED_COMPANY env var set");

function sendEmail(addedRow, registerType) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAILER_USER,
        pass: process.env.EMAILER_PASSWORD,
      },
    });

    // TODO: Send to all members?
    const email = addedRow.get('email') ? addedRow.get('email') : addedRow.get('email1');

    const mailSubject = registerType === "tshirt_order" ? "Tack för din beställning!" : "Tack för din anmälan!"

    let html = "";

    if (registerType === "team") {
        const hasAllowedCompany = addedRow.get('city1')?.toLowerCase().includes(process.env.VITE_ALLOWED_COMPANY.toLowerCase()) || 
                                  addedRow.get('city2')?.toLowerCase().includes(process.env.VITE_ALLOWED_COMPANY.toLowerCase()) || 
                                  addedRow.get('city3')?.toLowerCase().includes(process.env.VITE_ALLOWED_COMPANY.toLowerCase());
        html = getTeamHtml(addedRow, hasAllowedCompany);
    } else if (registerType === "tshirt_order") {
        html = getShirtHtml(addedRow);
    } else {
      const hasAllowedCompany = addedRow.get('city')?.toLowerCase().includes(process.env.VITE_ALLOWED_COMPANY.toLowerCase())
      html = getSoloHtml(addedRow, hasAllowedCompany);
    }

    const mailOptions = {
      from: process.env.EMAILER_USER,
      to: email,
      subject: mailSubject,
      html: html,
      bcc: [],
      // TODO: bcc: [process.env.EMAILER_USER],
      attachments: [{
        filename: 'logga.png',
        path: __dirname +'/logga.png',
        cid: 'logo'
   }]
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
