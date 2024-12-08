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
