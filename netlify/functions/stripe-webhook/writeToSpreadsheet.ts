import moment from "moment-timezone";
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { StripeMetadata } from "../../../src/features/register/models";
import { selectSpreadsheetDetails } from "../utils/registrationUtil";
import { getNodeEnvVariable } from "../utils/envUtil";

export async function writeToSpreadsheet(orderData: StripeMetadata, totalToPay: number, orderID: string): Promise<GoogleSpreadsheetRow<Record<string, any>>> {
  console.log("Running sheet netlify function...");

  try {
    const spreadsheetDetails = selectSpreadsheetDetails(orderData.formType);
    if (!spreadsheetDetails) {
      throw new Error("Could not find spread sheet data");
    }
    const { spreadsheetID, idType } = spreadsheetDetails

    const serviceAccountAuth = new JWT({
      email: getNodeEnvVariable("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      key: getNodeEnvVariable("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(spreadsheetID, serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const lastRow = rows[rows.length - 1];

    // Get the number only and not the letter
    const idNumber = lastRow ? parseInt(lastRow.get('id').substring(1)) : 0;

    const parsedData = {
      ...orderData,
      id: idType + (idNumber + 1).toString(),
      uploadTime: moment().tz("Europe/Stockholm").format("YYYY-MM-DD HH:mm"),
      totalToPay: totalToPay,
      orderID
    }

    console.log("parsedData", parsedData)

    const addedRow = await sheet.addRow(parsedData);

    if (!addedRow) {
      throw new Error("Could not add row");
    }
    console.log("Row Added");
    return addedRow;

  } catch (e: unknown) {
    throw new Error("An unknown error occured: " + e);
  }
}
