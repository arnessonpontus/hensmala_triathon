import { DataToSend, FormType, OrderShirtState, RegisterFormSoloState, RegisterFormTeamState } from "../models";
import { shirtArrayToString } from "../utils";

export const SHIRT_PRICE_COTTON = 220;
export const SHIRT_PRICE_FUNCTIONAL = 290;
export const CAP_PRICE = 250;

function writeToSpreadsheet(
    formType: FormType,
    data: DataToSend,
    token: string,
    setLoadingCallback: (value: boolean) => void,
    doneCallback: () => void,
  ) {
    fetch(`/.netlify/functions/writeToSpreadsheet/?type=${formType}&token=${token}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          doneCallback();
        } else {
          alert(
            "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmalatriathlon@gmail.com."
          );
        }
      })
      .catch((error) => alert(error))
      .finally(() => setLoadingCallback(false));
  };
  
  export function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    formType: FormType,
    formData: OrderShirtState | RegisterFormSoloState | RegisterFormTeamState,
    totalToPay: number,
    setLoadingCallback: (value: boolean) => void,
    doneCallback: () => void,
  ) {
    e.preventDefault();
    setLoadingCallback(true);
  
    formData.shirtsString = shirtArrayToString(formData.shirts);
  
    // Add total cost to easier see correct payment has been made
    const dataToSend: DataToSend = {...formData, totalToPay: totalToPay};
  
    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute("6LcKIqQZAAAAAK88TdJkAsZAOZ4YLSf7VFqtXMNz", {
          action: "submit",
        })
        .then((token: any) => {
          writeToSpreadsheet(formType, dataToSend, token, setLoadingCallback, doneCallback);
        });
    });
  };
