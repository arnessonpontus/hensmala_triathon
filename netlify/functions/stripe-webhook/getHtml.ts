import { GoogleSpreadsheetRow } from "google-spreadsheet";

const merchPickupText = "Kläder upphämtas av dig eller någon du känner hos Arnessons i Hensmåla. Vi skickar tyvärr inte några kläder."
const QrCodeText = "Använd den bifogade QR-koden på plats i hensmåla för enklare hantering."

const getRegisterMerchPickupText = (data: GoogleSpreadsheetRow<Record<string, any>>) => {
  return data.get('numCaps') != "0" || data.get('shirtsString') != "0" ? merchPickupText : ""
}

const getCouponCodeListItem = (code?: string) => {
  if (code && code != "") {
    return `
      <li>
        Företagskod: <b>${code}</b>
      </li>
    `
  } else {
    return ""
  }
}

export function getSoloHtml(data: GoogleSpreadsheetRow<Record<string, any>>) {
  return (`
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HT Confirm Email</title>
        </head>
        <style type="text/css">
        </style>
        <div>
          <h1>Hej ${data.get('name1').split(" ")[0]}!</h1>
          <h2>
              Tack för din anmälan till Hensmåla Triathlon 2025!
          </h2>
          <p>
              Vi kommer framöver att skicka ut ett mail med vidare information. Här är dina uppgifter:
          </p>
          <ul>
          <li>
              Namn: <b>${data.get('name1')}</b>
          </li>
          <li>
              Epost: <b>${data.get('email1')}</b>
          </li>
          <li>
              Födelsedatum: <b>${data.get('birthday1')}</b>
          </li>
          <li>
              Kön: <b>${data.get('gender')}</b>
          </li>
          <li>
              Ort/klubb: <b>${data.get('city1')}</b>
          </li>
          <li>
              Totalt betalat belopp: <b>${data.get('totalToPay')}kr</b>
          </li>
          <li>
              Tröjor: <b>${data.get('shirtsString') ? data.get('shirtsString') : '0'}</b>
          </li>
          <li>
              Kepsar: <b>${data.get('numCaps')}</b>
          </li>
          <li>
              Extra donation: <b>${data.get('extraDonation')}kr</b>
          </li>
          ${getCouponCodeListItem(data.get('couponCode'))}
          <li>
              Övrig information: <b>${data.get('info')}</b>
          </li>
          </ul>
          <p>Starten går klockan 15.00, var gärna i god tid.</p>
          <p>Vi ses den 12e Juli!</p>
          <p>${getRegisterMerchPickupText(data)}</p>
          <img src="cid:logo" alt="Logga" width="200px"'/>
          <p>${QrCodeText}</p>
        </div>
    `);
}

export function getTeamHtml(data: GoogleSpreadsheetRow<Record<string, any>>) {
  return (`
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HT Confirm Email</title>
        </head>
        <style type="text/css">
        </style>
        <div>
          <h1>Hej ${data.get('teamName')}!</h1>
          <h2>
              Tack för er anmälan till Hensmåla Triathlon 2025!
          </h2>
          <p>
              Vi kommer framöver att skicka ut ett mail med vidare information. Här är era uppgifter:
          </p>
          <b>Lagmedlem 1</b>
          <ul>
              <li>
                  Namn: <b>${data.get('name1')}</b>
              </li>
              <li>
                  Epost: <b>${data.get('email1')}</b>
              </li>
              <li>
                  Födelsedatum: <b>${data.get('birthday1')}</b>
              </li>
              <li>
                  Ort/klubb: <b>${data.get('city1')}</b>
              </li>
          </ul>
          <b>Lagmedlem 2</b>
          <ul>
              <li>
                  Namn: <b>${data.get('name2')}</b>
              </li>
              <li>
                  Epost: <b>${data.get('email2')}</b>
              </li>
              <li>
                  Födelsedatum: <b>${data.get('birthday2')}</b>
              </li>
              <li>
                  Ort/klubb: <b>${data.get('city2')}</b>
              </li>
          </ul>
      ${data.get('name3') !== "" ?
      `<b>Lagmedlem 3</b>
          <ul>
              <li>
                  Namn: <b>${data.get('name3')}</b>
              </li>
              <li>
                  Epost: <b>${data.get('email3')}</b>
              </li>
              <li>
                  Födelsedatum: <b>${data.get('birthday3')}</b>
              </li>
              <li>
                  Ort/klubb: <b>${data.get('city3')}</b>
              </li>
          </ul>`
      : ""}
          <b>Övrigt</b>
          <li>
              Totalt betalat belopp: <b>${data.get('totalToPay')}kr</b>
          </li>
          <li>
              Tröjor: <b>${data.get('shirtsString') ? data.get('shirtsString') : '0'}</b>
          </li>
          <li>
              Kepsar: <b>${data.get('numCaps')}</b>
          </li>
          <li>
              Extra donation: <b>${data.get('extraDonation')}kr</b>
          </li>
           ${getCouponCodeListItem(data.get('couponCode'))}
          <li>
              Övrig information: <b>${data.get('info')}</b>
          </li>
          <p>Starten går klockan 15.00, var gärna i god tid.</p>
          <p>Vi ses den 12e Juli!</p>
          <p>${getRegisterMerchPickupText(data)}</p>
          <img src="cid:logo" alt="Logga" width="200px"'/>
          <p>${QrCodeText}</p>
        </div>
    `);
}
export function getShirtHtml(data: GoogleSpreadsheetRow<Record<string, any>>) {
  return (`
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HT Confirm Email</title>
        </head>
        <style type="text/css">
        </style>
        <div>
          <h1>Hej ${data.get('name1').split(" ")[0]}!</h1>
          <h2>
              Tack för din beställning kläder för Hensmåla Triathlon 2025!
          </h2>
          <p>
              Här är dina uppgifter:
          </p>
          <ul>
          <li>
              Namn: <b>${data.get('name1')}</b>
          </li>
          <li>
              Epost: <b>${data.get('email1')}</b>
          </li>
          <li>
              Totalt betalat belopp: <b>${data.get('totalToPay')}kr</b>
          </li>
          <li>
              Tröjor: <b>${data.get('shirtsString') ? data.get('shirtsString') : '0'}</b>
          </li>
          <li>
              Kepsar: <b>${data.get('numCaps')}</b>
          </li>
          <li>
              Extra donation: <b>${data.get('extraDonation')}kr</b>
          </li>
           ${getCouponCodeListItem(data.get('couponCode'))}
          <li>
              Övrig information: <b>${data.get('info')}</b>
          </li>
          </ul>
          <p>Förhoppningsvis ses vi 12:e juli!</p>
          <p>${merchPickupText}</p>
          <img src="cid:logo" alt="Logga" width="200px"'/>
          <p>${QrCodeText}</p>
        </div>
    `);
}

export function getRegistrationErrorHtml(registrationName: string, registrationEmail: string, registrationCity: string, paymentName: any, paymentMail: any, paymentPhone: any) {
  return (`Något blev fel vid en registrering även om betalning gick igenom. Kontakta personen manuellt!
        <br>
        <b>Registrationsinformation</b>
        <ul>
          <li>
              Namn: <b>${registrationName}</b>
          </li>
          <li>
              Epost: <b>${registrationEmail}</b>
          </li>
          <li>
              Stad: <b>${registrationCity}</b>
          </li>
        </ul>
        <b>Betalningsinformation</b>
        <ul>
        <li>
            Namn: <b>${paymentName}</b>
        </li>
        <li>
            Epost: <b>${paymentMail}</b>
        </li>
        <li>
            Telefon: <b>${paymentPhone}</b>
        </li>
    </ul>
    `)

}
