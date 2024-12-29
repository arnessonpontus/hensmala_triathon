import { JWT } from "google-auth-library";
import { FormType } from "../../../src/features/register/models";
import { getNodeEnvVariable } from "./envUtil";

export function selectSpreadsheetDetails(formType: string): { spreadsheetID: string, idType: string; registerType: FormType } | false {
  switch (formType) {
    case FormType.Solo:
      return {
        spreadsheetID: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_SOLO"),
        idType: "S",
        registerType: FormType.Solo,
      };
    case FormType.Team:
      return {
        spreadsheetID: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_TEAM"),
        idType: "T",
        registerType: FormType.Team,
      };
    case FormType.MerchOrder:
      return {
        spreadsheetID: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_MERCH_ORDER"),
        idType: "O",
        registerType: FormType.MerchOrder,
      };
    default:
      return false;
  }
}

export const getServiceAccountJWT = () => {
  return new JWT({
    email: getNodeEnvVariable("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: getNodeEnvVariable("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
}

export const getAllSheets = (): { sheetName: FormType, sheetId: string }[] => {
  return [
    { sheetName: FormType.Solo, sheetId: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_SOLO") },
    { sheetName: FormType.Team, sheetId: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_TEAM") },
    { sheetName: FormType.MerchOrder, sheetId: getNodeEnvVariable("GOOGLE_SPREADSHEET_ID_MERCH_ORDER") },
  ]
}

