if (!process.env.NETLIFY) {
  require("dotenv").config();
}
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import moment from "moment-timezone";
import { JWT } from 'google-auth-library';
import axios from "axios";
import { FormType } from "../../../src/features/register/models";
import { appendZero } from "../../../src/utils";
import { sendEmail } from "./emailSender";
import { GoogleSpreadsheet } from "google-spreadsheet";

// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set");
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error("no GOOGLE_PRIVATE_KEY env var set");
// spreadsheet key is the long id in the sheets URL
if (!process.env.GOOGLE_SPREADSHEET_ID_SOLO_2024)
  throw new Error("no GOOGLE_SPREADSHEET_ID_SOLO_2024 env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_TEAM_2024)
  throw new Error("no GOOGLE_SPREADSHEET_ID_TEAM_2024 env var set");
if (!process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER)
  throw new Error("no GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER env var set");

function handleBirthday(data: any, type: FormType) {
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

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Check recaptcha from token
  try {
    const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.VITE_RECAPTCHA_SECRET}&response=${event.queryStringParameters?.token}`);
    if (result.data.score < 0.5) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Are you a robot?",
        }),
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not verify captcha.",
      }),
    }
  }

  let spreadsheetID = "";
  let idType = "";

  console.log("Running sheet netlify function...");

  const registerTypeParam = event.queryStringParameters?.type;
  let registerType: FormType = "solo";

  switch (registerTypeParam) {
    case "solo":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_SOLO_2024!;
      idType = "S";
      break;
    case "team":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TEAM_2024!;
      idType = "T";
      registerType = "team";
      break;
    case "tshirt_order":
      spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER!;
      idType = "O";
      registerType = "tshirt_order";
      break;
    default:
      return {
        statusCode: 400,
        body: "No valid registration type",
      };
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(spreadsheetID, serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // TODO: Handle types
    let parsedData: any = null;

    try {
      parsedData = JSON.parse(event.body ?? "");
    } catch (error) {
      return {
        statusCode: 400,
        body: "Invalid JSON",
      };
    }

    const rows = await sheet.getRows();
    const lastRow = rows[rows.length - 1];

    // Get the number only and not the letter
    const idNumber = lastRow ? parseInt(lastRow.get('id').substring(1)) : 0;

    parsedData = handleBirthday(parsedData, registerType);

    parsedData["id"] = idType + (idNumber + 1).toString();
    parsedData["uploadTime"] = moment()
      .tz("Europe/Stockholm")
      .format("YYYY-MM-DD HH:mm");

    console.log("parsedData", parsedData)

    const addedRow = await sheet.addRow(parsedData);

    if (addedRow) {
      console.log("Success adding row");
      const email_sent = await sendEmail(addedRow, registerTypeParam);
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
  } catch (e: unknown) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `An unknown error occured`,
      }),
    };
  }
};

export { handler };
