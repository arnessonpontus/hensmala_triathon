import { GoogleSpreadsheetRow } from "google-spreadsheet";

export function getPaymentString(hasAllowedCompany: boolean, totalToPay: number) {
  if (hasAllowedCompany) {
    return (
      `<p>
        Eftersom du har anget <b style="color:#007fa8;">${process.env.VITE_ALLOWED_COMPANY}</b> som klubb är anmälningsavgiften gratis. 
      </p>
      ${totalToPay > 0 ?
        `<p>Du har dock gjort extra tillägg till din anmälan i form av extra donation, t-shirt eller keps och behöver därför betala <b>${totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781.</p>`
        : ""}
        <p>`)
  } else {
    return (
      `<p>
        Betala <b>${totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781.
       </p>`
    );
  }
}

export function getSoloHtml(data: GoogleSpreadsheetRow<Record<string, any>>, hasAllowedCompany: boolean) {
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
            <h1>Hej ${data.get('name').split(" ")[0]}!</h1>
            <h2>
                Tack för din anmälan till Hensmåla Triathlon 2024!
            </h2>
            ${getPaymentString(hasAllowedCompany, data.get('totalToPay'))}
            <p>
                Vi kommer framöver att skicka ut ett mail med vidare information. Här är dina uppgifter:
            </p>
            <ul>
            <li>
                Namn: <b>${data.get('name')}</b>
            </li>
            <li>
                Epost: <b>${data.get('email')}</b>
            </li>
            <li>
                Födelsedatum: <b>${data.get('birthday')}</b>
            </li>
            <li>
                Kön: <b>${data.get('gender')}</b>
            </li>
            <li>
                Ort/klubb: <b>${data.get('city')}</b>
            </li>
            <li>
                Tröjor: <b>${data.get('shirts') ? data.get('shirts') : '0'}</b>
            </li>
            <li>
                Kepsar: <b>${data.get('numCaps')}</b>
            </li>
            <li>
                Extra donation: <b>${data.get('extraDonation')}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.get('info')}</b>
            </li>
            </ul>
            <p>Starten går klockan 15.00, var gärna i god tid.</p>
            <p>Vi ses den 20e Juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}

export function getTeamHtml(data: GoogleSpreadsheetRow<Record<string, any>>, hasAllowedCompany: boolean) {
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
                Tack för er anmälan till Hensmåla Triathlon 2024!
            </h2>
            ${getPaymentString(hasAllowedCompany, data.get('totalToPay'))}
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
                Tröjor: <b>${data.get('shirts') ? data.get('shirts') : '0'}</b>
            </li>
            <li>
                Kepsar: <b>${data.get('numCaps')}</b>
            </li>
            <li>
                Extra donation: <b>${data.get('extraDonation')}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.get('info')}</b>
            </li>
            <p>Starten går klockan 15.00, var gärna i god tid.</p>
            <p>Vi ses den 20e Juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
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
            <h1>Hej ${data.get('name').split(" ")[0]}!</h1>
            <h2>
                Tack för din beställning av t-shirt eller keps för Hensmåla Triathlon 2024!
            </h2>
            <p>
                Betala <b>${data.get('totalToPay')}kr</b> till bankgiro 386-6563 eller swisha till 1234048781. När vi ser din beställning och verifierar din betalning lägger vi undan din beställning.
            </p>
            <p>
                Här är dina uppgifter:
            </p>
            <ul>
            <li>
                Namn: <b>${data.get('name')}</b>
            </li>
            <li>
                Epost: <b>${data.get('email')}</b>
            </li>
            <li>
                Tröjor: <b>${data.get('shirts') ? data.get('shirts') : '0'}</b>
            </li>
            <li>
                Kepsar: <b>${data.get('numCaps')}</b>
            </li>
            <li>
                Extra donation: <b>${data.get('extraDonation')}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.get('info')}</b>
            </li>
            </ul>
            <p>Förhoppningsvis ses vi 20:e juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}
