import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { FormType, StripeMetadata } from "../../../src/features/register/models";
import { getSoloHtml, getTeamHtml, getShirtHtml, getRegistrationErrorHtml } from "./getHtml";
import { createTransport } from "nodemailer";
import { getNodeEnvVariable } from "../utils/envUtil";

// Click on this link to enable applications to access the email account:
// https://accounts.google.com/b/0/DisplayUnlockCaptcha

export async function sendEmail(addedRow: GoogleSpreadsheetRow<Record<string, any>>, registerType: FormType): Promise<void> {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: getNodeEnvVariable("EMAILER_USER"),
        pass: getNodeEnvVariable("EMAILER_PASSWORD"),
      },
    });

    // TODO: Send to all members?
    const email = addedRow.get('email1')

    const mailSubject = registerType === FormType.MerchOrder ? "Tack för din beställning!" : "Tack för din anmälan!"

    let html = "";

    if (registerType === "team") {
      html = getTeamHtml(addedRow);
    } else if (registerType === FormType.MerchOrder) {
      html = getShirtHtml(addedRow);
    } else {
      html = getSoloHtml(addedRow);
    }
    const mailOptions = {
      from: getNodeEnvVariable("EMAILER_USER"),
      to: email,
      subject: mailSubject,
      html: html,
      bcc: [getNodeEnvVariable("EMAILER_USER")],
      attachments: [{
        filename: 'logga.png',
        path: __dirname + '/assets/logga.png',
        cid: 'logo'
      }]
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent to: ", email);
}

export function sendEmailToUsInCaseOfError(paymentName: string | null | undefined, paymentMail: string | null | undefined, paymentPhone: string | null | undefined, metadata?: StripeMetadata) {
  return new Promise<void>((resolve, reject) => {
    var transporter = createTransport({
      service: "gmail",
      auth: {
        user: getNodeEnvVariable("EMAILER_USER"),
        pass: getNodeEnvVariable("EMAILER_PASSWORD"),
      },
    });

    const mailSubject = "FEL VID REGISTRERING"
    const html = getRegistrationErrorHtml(metadata?.name1 ?? "", metadata?.email1 ?? "", metadata?.city1 ?? "", paymentName, paymentMail, paymentPhone)
    const mailOptions = {
      from: getNodeEnvVariable("EMAILER_USER"),
      to: getNodeEnvVariable("EMAILER_USER"),
      subject: mailSubject,
      html: html,
      bcc: [],
    };

    console.log("Sending email...");
    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
      if (error) {
        console.log("Error sending email: ", error);
        reject();
      } else {
        console.log("Email sent to : " + getNodeEnvVariable("EMAILER_USER") + " : " + info.response);
        resolve();
      }
    });
  });
}
