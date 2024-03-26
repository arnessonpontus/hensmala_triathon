// Stringify the shirt selection for easier storage
export function shirtArrayToString (shirts){
  let shirtStr = ""
  let numConverted = 0;
  shirts.forEach((shirt) => {
    if (shirt.size !== null && shirt.type !== null) {
      if (numConverted++ === 0) {
        shirtStr += shirt.type + " " + shirt.size;
      } else {
        shirtStr += ", " + shirt.type + " " + shirt.size;
      }
    }
  });
  return shirtStr;
}

// Checks if at lease one shirt is selected
export function isShirtSelected(shirts) {
    for (let shirt of shirts) {
        if (shirt.size !== null && shirt.type !== null){
            return true;
        }
    }
    return false
}

function writeToSpreadsheet (formType, data, token, setLoadingCallback, doneCallback) {
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
    .finally(() => setLoadingCallback());
};

export function handleSubmit (e, formType, data, totalToPay, setLoadingCallback, doneCallback) {
  e.preventDefault();
  setLoadingCallback(true);

  // Deep copy and replace shirts array to string for easier handling
  const dataToSend = JSON.parse(JSON.stringify(data));
  dataToSend.shirts = shirtArrayToString(dataToSend.shirts);

  // Add total cost to easier see correct payment has been made
  dataToSend["totalToPay"] = totalToPay;

  window.grecaptcha.ready(() => {
    window.grecaptcha
      .execute("6LcKIqQZAAAAAK88TdJkAsZAOZ4YLSf7VFqtXMNz", {
        action: "submit",
      })
      .then((token) => {
        writeToSpreadsheet(formType, dataToSend, token, setLoadingCallback, doneCallback);
      });
  });
};

export function scrollToInfo(elementID) {
  const yOffset = -30;
  const element = document.getElementById(elementID);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({top: y, behavior: 'smooth'});
};