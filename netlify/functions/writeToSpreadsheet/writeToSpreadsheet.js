if (!process.env.NETLIFY) {
  require("dotenv").config();
}
var moment = require("moment-timezone");

// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set");
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error("no GOOGLE_PRIVATE_KEY env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_2021)
  // spreadsheet key is the long id in the sheets URL
  throw new Error("no GOOGLE_SPREADSHEET_ID_2021 env var set");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const sendEmail = require("./emailSender");

function handleBirthday(data) {
  const month =
    parseInt(data["month"]) < 10 ? "0" + data["month"] : data["month"];
  const day = parseInt(data["day"]) < 10 ? "0" + data["day"] : data["day"];

  data["birthday"] = data["year"] + "-" + month + "-" + day;

  return data;
}

exports.handler = async (event, context, callback) => {
  let spreadsheetID = "";
  console.log("Running sheet netlify function...");

  // Not used this year
  // const registerType = event.queryStringParameters.type;

  spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_2021;

  try {
    const doc = new GoogleSpreadsheet(spreadsheetID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    let data = JSON.parse(event.body);

    const rows = await sheet.getRows();

    const lastRow = rows[rows.length - 1];

    const id = lastRow ? lastRow.id : "0";
    //const idType = id.substring(0, 1);

    const idNumber = parseInt(id.substring(1));

    data = handleBirthday(data);

    console.log(data);

    // Not the best id solution but nice looking instead of random
    data["id"] = (idNumber ? idNumber : 0 + 1).toString();
    data["uploadTime"] = moment()
      .tz("Europe/Stockholm")
      .format("YYYY-MM-DD HH:mm");

    const addedRow = await sheet.addRow(data);

    if (addedRow) {
      console.log("Success adding row");
      const email_sent = await sendEmail(addedRow);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Row added. Email sent: ${email_sent}`,
        }),
      };
    } else {
      console.log("Could not add row");
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: `Could not add row`,
        }),
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString(),
    };
  }
};
