import { DataToSend, FormType, OrderShirtState, RegisterFormSoloState, RegisterFormTeamState } from "../models";
import { shirtArrayToString } from "../utils";

function writeToSpreadsheet(
  formType: FormType,
  data: DataToSend,
) {
  fetch(`http://localhost:8888/.netlify/functions/writeToSpreadsheet/?type=${formType}`, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("Här brukade vi göra doneCallBack")
      } else {
        alert(
          "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmalatriathlon@gmail.com."
        );
      }
    })
    .catch((error) => alert(error))
    .finally(() => console.log("Här brukade vi setta loading callback"));
};

export function handleSubmit(
  formType: FormType,
  formData: OrderShirtState | RegisterFormSoloState | RegisterFormTeamState,
  totalToPay: number,
) {

  formData.shirtsString = shirtArrayToString(formData.shirts);

  // Add total cost to easier see correct payment has been made
  const dataToSend: DataToSend = { ...formData, totalToPay: totalToPay };


  writeToSpreadsheet(formType, dataToSend);

};
