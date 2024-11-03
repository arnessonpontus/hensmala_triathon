import { OrderShirtState } from "./OrderShirt";
import { RegisterFormSoloState } from "./RegisterFormSolo";
import { RegisterFormTeamState } from "./RegisterFormTeam";
import { FormType, Shirt, orderDetails } from "./models";

export const SHIRT_PRICE_COTTON = 220;
export const SHIRT_PRICE_FUNCTIONAL = 290;
export const CAP_PRICE = 250;

// Stringify the shirt selection for easier storage
export function shirtArrayToString(shirts: Shirt[]) {
  return shirts.filter(s => s.type && s.size).map(shirt => `${shirt.type} ${shirt.size} ${shirt.material}`).join(', ')
}

// Checks if at lease one shirt is selected
export function isShirtSelected(shirts: Shirt[]) {
  for (let shirt of shirts) {
    if (shirt.size !== null && shirt.type !== null) {
      return true;
    }
  }
  return false
}

function writeToSpreadsheet(
  formType: FormType,
  data: orderDetails, // TODO: OrderShirtState?
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

  // Deep copy and replace shirts array to string for easier handling
  const dataToSend = JSON.parse(JSON.stringify(formData));
  dataToSend.shirts = shirtArrayToString(dataToSend.shirts);

  // Add total cost to easier see correct payment has been made
  dataToSend["totalToPay"] = totalToPay;

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

export function scrollToInfo(elementID: string) {
  const yOffset = -30;
  const element = document.getElementById(elementID);
  const y = (element?.getBoundingClientRect().top ?? 0) + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

export const calcShirtPrice = (shirts: Shirt[]) => {
  const shirtAmount = shirts.reduce((acc, shirt) => {
    if (shirt.size && shirt.type && shirt.material) {
      if (shirt.material === 'bomull') {
        return acc + SHIRT_PRICE_COTTON;
      } else {
        return acc + SHIRT_PRICE_FUNCTIONAL
      }
    } else {
      return acc;
    }
  }, 0);
  return shirtAmount;
}

export const spaceToDash = (str: string) => {
  return str.replace(/\s+/g, '-');
}