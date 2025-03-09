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

  if (event.httpMethod !== 'GET') {
    return createJsonResponse(405, { error: "Method not allowed" });
  }

  const { orderId } = event.queryStringParameters || {};
  console.log("Looking for order", orderId)

  for (const s of getAllSheets()) {
    try {
      const doc = new GoogleSpreadsheet(s.sheetId, getServiceAccountJWT());
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      const rows = await sheet.getRows();
      const foundRow = rows.find(row => row.get("orderID") === orderId);
      if (foundRow) {
        return createJsonResponse(200, { orderType: s.sheetName, ...foundRow.toObject() });
      }
    } catch (error) {
      console.error("Error retrieving order info:", error);
      return createJsonResponse(500, { error: "Failed to getting order info" });
    }
  }
  return createJsonResponse(404, { error: "Could not find entry with specified order id" });
}
