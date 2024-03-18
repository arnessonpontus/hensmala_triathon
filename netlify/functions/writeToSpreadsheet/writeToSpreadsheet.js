if (!process.env.NETLIFY) {
  require("dotenv").config();
}
var moment = require("moment-timezone");

// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set");
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error("no GOOGLE_PRIVATE_KEY env var set");
  // spreadsheet key is the long id in the sheets URL
if (!process.env.GOOGLE_SPREADSHEET_ID_SOLO_2022)
  throw new Error("no GOOGLE_SPREADSHEET_ID_SOLO_2022 env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_TEAM_2022)
  throw new Error("no GOOGLE_SPREADSHEET_ID_TEAM_2022 env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER)
  throw new Error("no GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER env var set");

// TODO: Check spreadsheet after upgrade
const { GoogleSpreadsheet } = require("google-spreadsheet");
const sendEmail = require("./emailSender");

function appendZero(str) {
  return parseInt(str) < 10 ? "0" + str : str;
}

function handleBirthday(data, type) {
  if (type == "team") {
    data["birthday1"] =
      data["year1"] + "-" + appendZero(data["month1"]) + "-" + appendZero(data["day1"]);
    data["birthday2"] =
      data["year2"] + "-" + appendZero(data["month2"]) + "-" + appendZero(data["day2"]);
    data["birthday3"] =
      data["year3"] + "-" + appendZero(data["month3"]) + "-" + appendZero(data["day3"]);
  } else if (type == "solo") {
    data["birthday"] = data["year"] + "-" + appendZero(data["month"]) + "-" + appendZero(data["day"]);
  }

  return data;
}

exports.handler = async (event, context, callback) => {
  let spreadsheetID = "";
  let idType  = "";
  console.log("Running sheet netlify function...");

  const registerType = event.queryStringParameters.type;

  switch (registerType) {
    case "solo":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_SOLO_2022;
      idType = "S";
      break;
    case "team":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TEAM_2022;
      idType = "T";
      break;
    case "tshirt_order":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER;
      idType = "O";
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

    // Get the number only and not the letter
    const idNumber = lastRow ? parseInt(lastRow.id.substring(1)) : 0;

    data = handleBirthday(data, registerType);

    data["id"] = idType + (idNumber + 1).toString();
    data["uploadTime"] = moment()
      .tz("Europe/Stockholm")
      .format("YYYY-MM-DD HH:mm");

    const addedRow = await sheet.addRow(data);
    console.log(addedRow)

    if (addedRow) {
      console.log("Success adding row");
      const email_sent = await sendEmail(addedRow, registerType);
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
