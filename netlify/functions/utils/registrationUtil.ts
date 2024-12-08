import { FormType } from "../../../src/features/register/models";

export function selectSpreadsheetDetails(formType: string): { spreadsheetID: string, idType: string; registerType: FormType } | false {
  switch (formType) {
    case FormType.Solo:
      return {
        spreadsheetID: process.env.GOOGLE_SPREADSHEET_ID_S!,
        idType: "S",
        registerType: FormType.Solo,
      };
    case FormType.Team:
      return {
        spreadsheetID: process.env.GOOGLE_SPREADSHEET_ID_TEAM!,
        idType: "T",
        registerType: FormType.Team,
      };
    case FormType.TShirtOrder:
      return {
        spreadsheetID: process.env.GOOGLE_SPREADSHEET_ID_TSHIRT_ORDER!,
        idType: "O",
        registerType: FormType.TShirtOrder,
      };
    default:
      return false;
  }
}
