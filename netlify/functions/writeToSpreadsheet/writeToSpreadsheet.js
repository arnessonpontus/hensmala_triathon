if (!process.env.NETLIFY) {
  require("dotenv").config();
}
var moment = require("moment-timezone");

// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set");
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error("no GOOGLE_PRIVATE_KEY env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_SOLO)
  // spreadsheet key is the long id in the sheets URL
  throw new Error("no GOOGLE_SPREADSHEET_ID_SOLO env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_TEAM)
  // spreadsheet key is the long id in the sheets URL
  throw new Error("no GOOGLE_SPREADSHEET_ID_TEAM env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_KIDS)
  // spreadsheet key is the long id in the sheets URL
  throw new Error("no GOOGLE_SPREADSHEET_ID_KIDS env var set");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const sendEmail = require("./emailSender");

function handleBirthday(type, data) {
  if (type == "team") {
    data["birthday1"] =
      data["year1"] + "-" + data["month1"] + "-" + data["day1"];
    data["birthday2"] =
      data["year2"] + "-" + data["month2"] + "-" + data["day2"];
    data["birthday3"] =
      data["year3"] + "-" + data["month3"] + "-" + data["day3"];
  } else {
    data["birthday"] = data["year"] + "-" + data["month"] + "-" + data["day"];
  }
  return data;
}

exports.handler = async (event, context, callback) => {
  let spreadsheetID = "";

  const registerType = event.queryStringParameters.type;

  switch (registerType) {
    case "solo":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_SOLO;
      break;
    case "team":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TEAM;
      break;
    case "kids":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_KIDS;
      break;
    default:
      console.log("The type given is not valid!");
      break;
  }

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
    const id = lastRow.id;
    const idType = id.substring(0, 1);
    const idNumber = parseInt(id.substring(1));

    data = handleBirthday(registerType, data);

    // Not the best id solution but nice looking instead of random
    data["id"] = idType + (idNumber + 1).toString();
    data["time"] = moment().tz("Europe/Stockholm").format();

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
