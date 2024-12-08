import moment from "moment-timezone";
import { JWT } from 'google-auth-library';
import { sendEmail } from "./emailSender";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { StripeMetadata } from "../../../src/features/register/models";
import { selectSpreadsheetDetails } from "../utils/registrationUtil";
import { getNodeEnvVariable } from "../utils/envUtil";

export async function writeToSpreadsheet(orderData: StripeMetadata, totalToPay: number): Promise<Boolean> {
    console.log("Running sheet netlify function...");

    const spreadsheetDetails = selectSpreadsheetDetails(orderData.formType);

    if (!spreadsheetDetails) {
        return false;
    }

    const { spreadsheetID, idType, registerType } = spreadsheetDetails

    try {
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
        }

        console.log("parsedData", parsedData)

        const addedRow = await sheet.addRow(parsedData);

        if (!addedRow) {
            console.log("Could not add row");
            return false;
        }
        console.log("Success adding row");
        const email_sent = await sendEmail(addedRow, registerType);
        if (email_sent) {
            console.log(`Row added. Email sent: ${email_sent}`)
            return true;
        } else {
            return false;
        }
    } catch (e: unknown) {
        console.error(e)
        return false;
    }
}
