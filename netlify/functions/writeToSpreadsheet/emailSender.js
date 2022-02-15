var nodemailer = require("nodemailer");

// Click on this link to enable applications to access the email account:
// https://accounts.google.com/b/0/DisplayUnlockCaptcha

// required env vars
if (!process.env.EMAILER_USER) throw new Error("no EMAILER_USER env var set");
// required env vars
if (!process.env.EMAILER_PASSWORD)
  throw new Error("no EMAILER_PASSWORD env var set");

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
    const email = addedRow.email ? addedRow.email : addedRow.email1;

    var mailOptions = {
      from: process.env.EMAILER_USER,
      to: email,
      subject: "Tack för din anmälan!",
      html: getHtml(addedRow, registerType),
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

function getHtml(data, type) {
  let html = ``;
  if (type === "solo") {
      html = `
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
              <h1>Hej ${data.name.split(" ")[0]}!</h1>
              <h2>
                  Tack för din anmälan till Hensmåla Triathlon 2022!
              </h2>
              <p>
                  Betala 250kr till bankgiro 386-6563 eller swisha till 1236882088.
              </p>
              <p>
                  Vi kommer framöver att skicka ut ett mail med vidare information. Här är dina uppgifter:
              </p>
              <ul>
              <li>
                  Namn: <b>${data.name}</b>
              </li>
              <li>
                  Epost: <b>${data.email}</b>
              </li>
              <li>
                  Födelsedatum: <b>${data.birthday}</b>
              </li>
              <li>
                  Kön: <b>${data.gender}</b>
              </li>
              <li>
                  Ort/klubb: <b>${data.city}</b>
              </li>
              <li>
                  Övrig information: <b>${data.info}</b>
              </li>
              </ul>
              <p>Vi ses den 23e Juli!</p>
              <img src="https://www.hensmalatriathlon.se/images/corona_hen.png" alt="Logga" width="200px"'/>
          </div>
      `;
  } else {
      html = `
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
              <h1>Hej ${data.teamName}!</h1>
              <h2>
                  Tack för er anmälan till Hensmåla Triathlon 2022!
              </h2>
              <p>
                  Betala 400kr till bankgiro 386-6563 eller swisha till 1236882088.
              </p>
              <p>
                  Vi kommer framöver att skicka ut ett mail med vidare information. Här är era uppgifter:
              </p>
              <b>Lagmedlem 1</b>
              <ul>
                  <li>
                      Namn: <b>${data.name1}</b>
                  </li>
                  <li>
                      Epost: <b>${data.email1}</b>
                  </li>
                  <li>
                      Födelsedatum: <b>${data.birthday1}</b>
                  </li>
                  <li>
                      Ort/klubb: <b>${data.city1}</b>
                  </li>
              </ul>
              <b>Lagmedlem 2</b>
              <ul>
                  <li>
                      Namn: <b>${data.name2}</b>
                  </li>
                  <li>
                      Epost: <b>${data.email2}</b>
                  </li>
                  <li>
                      Födelsedatum: <b>${data.birthday2}</b>
                  </li>
                  <li>
                      Ort/klubb: <b>${data.city2}</b>
                  </li>
              </ul>
              ${data.name3 !== "" ? 
              `<b>Lagmedlem 3</b>
              <ul>
                  <li>
                      Namn: <b>${data.name3}</b>
                  </li>
                  <li>
                      Epost: <b>${data.email3}</b>
                  </li>
                  <li>
                      Födelsedatum: <b>${data.birthday3}</b>
                  </li>
                  <li>
                      Ort/klubb: <b>${data.city3}</b>
                  </li>
              </ul>`
               : null}
              <li>
                  Övrig information: <b>${data.info}</b>
              </li>
              
              <p>Vi ses den 23e Juli!</p>
              <img src="https://www.hensmalatriathlon.se/images/corona_hen.png" alt="Logga" width="200px"'/>
          </div>
      `;
  }

  return html;
}

module.exports = sendEmail;
