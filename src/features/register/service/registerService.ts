import { DataToSend, FormType, MerchOrderState, RegisterFormSoloState, RegisterFormTeamState } from "../models";
import { shirtArrayToString } from "../utils";

function writeToSpreadsheet(
  formType: FormType,
  data: DataToSend,
) {
  fetch(`/.netlify/functions/writeToSpreadsheet/?type=${formType}`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 200) {
      } else {
        alert(
          "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmalatriathlon@gmail.com."
        );
      }
    })
    .catch((error) => alert(error))
};

export function handleSubmit(
  formType: FormType,
  formData: MerchOrderState | RegisterFormSoloState | RegisterFormTeamState,
  totalToPay: number,
) {

  formData.shirtsString = shirtArrayToString(formData.shirts);

  // Add total cost to easier see correct payment has been made
  const dataToSend: DataToSend = { ...formData, totalToPay: totalToPay };


  writeToSpreadsheet(formType, dataToSend);

};
