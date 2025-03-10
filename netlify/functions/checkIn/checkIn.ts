import { Handler } from '@netlify/functions';
import { getNodeEnvVariable } from "../utils/envUtil";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { getAllSheets, getServiceAccountJWT } from '../utils/registrationUtil';
import { createJsonResponse } from '../utils/responseUtil';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return createJsonResponse(200, "");
  }

   const requestApiKey = event.headers['x-api-key'];
   if (requestApiKey !== getNodeEnvVariable("CUSTOM_API_KEY")) {
    return createJsonResponse(403, { error: 'Forbidden: Invalid API Key' });
   }

  if (event.httpMethod !== 'PUT') {
    return createJsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const { formType, formId } = JSON.parse(event.body ?? "");
    console.log("Cheking in", formType, formId)
  
    const gSheet = getAllSheets().find(s => s.sheetName === formType)
    if (!gSheet) {
      return createJsonResponse(404, { error: "Could not find entry with specified sheet id" });
    }

    const doc = new GoogleSpreadsheet(gSheet.sheetId, getServiceAccountJWT());
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const foundRow = rows.find(row => row.get("id") === formId);
    if (foundRow) {
      foundRow.set("incheckad", "JA")
      foundRow.save();
      return createJsonResponse(200, {orderType: gSheet.sheetName, ...foundRow.toObject()});
    } else {
      return createJsonResponse(404, { error: "Could not find entry with specified id" });
    }
  } catch (error) {
    console.error("Error checkin in:", error);
    return createJsonResponse(500, { error: "Failed to check in" });
  }
}
