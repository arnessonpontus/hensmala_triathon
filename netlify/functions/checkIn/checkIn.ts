import { Handler } from '@netlify/functions';
import { getNodeEnvVariable } from "../utils/envUtil";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { getAllSheets, getServiceAccountJWT } from '../utils/registrationUtil';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: '',
    };
  }

   const requestApiKey = event.headers['x-api-key'];
   if (requestApiKey !== getNodeEnvVariable("CUSTOM_API_KEY")) {
     return {
       statusCode: 403,
       body: JSON.stringify({ error: 'Forbidden: Invalid API Key' }),
     };
   }

  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { formType, formId } = JSON.parse(event.body ?? "");
    console.log("Cheking in", formType, formId)
  
    const gSheet = getAllSheets().find(s => s.sheetName === formType)
    if (!gSheet) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Could not find entry with specified sheet id" }),
      };
    }

    const doc = new GoogleSpreadsheet(gSheet.sheetId, getServiceAccountJWT());
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const foundRow = rows.find(row => row.get("id") === formId);
    if (foundRow) {
      foundRow.set("incheckad", "JA")
      foundRow.save();
      return {
        statusCode: 200,
        body: JSON.stringify({orderType: gSheet.sheetName, ...foundRow.toObject()}),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Could not find entry with specified id" }),
      };
    }
  } catch (error) {
    console.error("Error checkin in:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to check in" }),
    };
  }
}
