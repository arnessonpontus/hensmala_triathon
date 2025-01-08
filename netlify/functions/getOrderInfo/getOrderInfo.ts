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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
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
        return {
          statusCode: 200,
          body: JSON.stringify({ orderType: s.sheetName, ...foundRow.toObject() }),
        };
      }
    } catch (error) {
      console.error("Error retrieving order info:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to getting order info" }),
      };
    }
  }
  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Could not find entry with specified order id" }),
  };
}
