import moment from "moment-timezone";
import { JWT } from 'google-auth-library';
import { sendEmail } from "./emailSender";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { FormType, OrderShirtState, RegisterFormSoloState, RegisterFormTeamState, StripeMetadata } from "../../../src/features/register/models";


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

const appendZero = (str: string) => {
    return parseInt(str) < 10 ? "0" + str : str;
}

export async function writeToSpreadsheet(orderData: StripeMetadata, totalToPay: number): Promise<Boolean> {
    let spreadsheetID = "";
    let idType = "";
    console.log("Running sheet netlify function...");

    let registerType: FormType;
    let parsedData: { [key: string]: any } = {}; // Initialized as an empty object

    switch (orderData.formType) {
        case FormType.Solo:
            spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_SOLO_2024!;
            idType = "S";
            registerType = FormType.Solo
            break;
        case FormType.Team:
            spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TEAM_2024!;
            idType = "T";
            registerType = FormType.Team;
            break;
        case FormType.TShirtOrder:
            spreadsheetID = process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER!;
            idType = "O";
            registerType = FormType.TShirtOrder;
            break;
        default:
            return false;
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

        const rows = await sheet.getRows();
        const lastRow = rows[rows.length - 1];

        // Get the number only and not the letter
        const idNumber = lastRow ? parseInt(lastRow.get('id').substring(1)) : 0;

        parsedData = orderData;

        parsedData["id"] = idType + (idNumber + 1).toString();
        parsedData["uploadTime"] = moment()
            .tz("Europe/Stockholm")
            .format("YYYY-MM-DD HH:mm");
        parsedData["totalToPay"] = totalToPay;

        console.log("parsedData", parsedData)

        const addedRow = await sheet.addRow(parsedData);

        if (addedRow) {
            console.log("Success adding row");
            const email_sent = await sendEmail(addedRow, registerType);
            if (email_sent) {
                console.log(`Row added. Email sent: ${email_sent}`)
                return true;
            } else {
                return false;;
            }
        } else {
            console.log("Could not add row");
            return false;
        }
    } catch (e: unknown) {
        console.error(e)
        return false;
    }
}