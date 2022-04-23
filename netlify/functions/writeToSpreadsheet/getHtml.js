function getSoloHtml(data) {
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
            <h1>Hej ${data.name.split(" ")[0]}!</h1>
            <h2>
                Tack för din anmälan till Hensmåla Triathlon 2022!
            </h2>
            <p>
                Betala <b>${data.totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781.
            </p>
            <p>
                Vi kommer framöver att skicka ut ett mail med vidare information. Här är dina uppgifter:
            </p>
            <ul>
            <li>
                Namn: <b>${data.name}</b>
            </li>
            <li>
                Epost: <b>${data.email}</b>
            </li>
            <li>
                Födelsedatum: <b>${data.birthday}</b>
            </li>
            <li>
                Kön: <b>${data.gender}</b>
            </li>
            <li>
                Ort/klubb: <b>${data.city}</b>
            </li>
            <li>
                Tröjor: <b>${data.shirts}</b>
            </li>
            <li>
                Extra donation: <b>${data.extraDonation}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.info}</b>
            </li>
            </ul>
            <p>Starten går klockan 15.00, var gärna i god tid.</p>
            <p>Vi ses den 23e Juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}

function getTeamHtml(data) {
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
            <h1>Hej ${data.teamName}!</h1>
            <h2>
                Tack för er anmälan till Hensmåla Triathlon 2022!
            </h2>
            <p>
                Betala <b>${data.totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781.
            </p>
            <p>
                Vi kommer framöver att skicka ut ett mail med vidare information. Här är era uppgifter:
            </p>
            <b>Lagmedlem 1</b>
            <ul>
                <li>
                    Namn: <b>${data.name1}</b>
                </li>
                <li>
                    Epost: <b>${data.email1}</b>
                </li>
                <li>
                    Födelsedatum: <b>${data.birthday1}</b>
                </li>
                <li>
                    Ort/klubb: <b>${data.city1}</b>
                </li>
            </ul>
            <b>Lagmedlem 2</b>
            <ul>
                <li>
                    Namn: <b>${data.name2}</b>
                </li>
                <li>
                    Epost: <b>${data.email2}</b>
                </li>
                <li>
                    Födelsedatum: <b>${data.birthday2}</b>
                </li>
                <li>
                    Ort/klubb: <b>${data.city2}</b>
                </li>
            </ul>
            ${data.name3 !== "" ? 
            `<b>Lagmedlem 3</b>
            <ul>
                <li>
                    Namn: <b>${data.name3}</b>
                </li>
                <li>
                    Epost: <b>${data.email3}</b>
                </li>
                <li>
                    Födelsedatum: <b>${data.birthday3}</b>
                </li>
                <li>
                    Ort/klubb: <b>${data.city3}</b>
                </li>
            </ul>`
                : ""}
            <b>Övrigt</b>
            <li>
                Tröjor: <b>${data.shirts}</b>
            </li>
            <li>
                Extra donation: <b>${data.extraDonation}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.info}</b>
            </li>
            <p>Starten går klockan 15.00, var gärna i god tid.</p>
            <p>Vi ses den 23e Juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}
function getShirtHtml(data) {
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
            <h1>Hej ${data.name.split(" ")[0]}!</h1>
            <h2>
                Tack för din beställning av t-shirt för Hensmåla Triathlon 2022!
            </h2>
            <p>
                Betala <b>${data.totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781. När vi ser din beställning och verifierar din betalning lägger vi undan din beställning.
            </p>
            <p>
                Här är dina uppgifter:
            </p>
            <ul>
            <li>
                Namn: <b>${data.name}</b>
            </li>
            <li>
                Epost: <b>${data.email}</b>
            </li>
            <li>
                Tröjor: <b>${data.shirts}</b>
            </li>
            <li>
                Extra donation: <b>${data.extraDonation}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.info}</b>
            </li>
            </ul>
            <p>Förhoppningsvis ses vi 23:e juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}

function getXylemHtml(data) {
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
            <h1>Hej ${data.name.split(" ")[0]}!</h1>
            <h2>
                Tack för din anmälan till Hensmåla Triathlon 2022!
            </h2>
            <p>
                Eftersom du har anget <b style="color:#007fa8;">${process.env.REACT_APP_ALLOWED_COMPANY}</b> som klubb kommer du inte behöva betala för varken anmälningsavgift eller en t-shirt. 
            </p>
            ${data.totalToPay > 0 ? 
                `<p>Du har dock gjort extra tillägg till din anmälan i form av extra donation eller t-shirt och kan därför betala <b>${data.totalToPay}kr</b> till bankgiro 386-6563 eller swisha till 1234048781.</p>`
            : ""}
            <p>
                Vi kommer framöver att skicka ut ett mail med vidare information. Här är dina uppgifter:
            </p>
            <ul>
            <li>
                Namn: <b>${data.name}</b>
            </li>
            <li>
                Epost: <b>${data.email}</b>
            </li>
            <li>
                Födelsedatum: <b>${data.birthday}</b>
            </li>
            <li>
                Kön: <b>${data.gender}</b>
            </li>
            <li>
                Ort/klubb: <b>${data.city}</b>
            </li>
            <li>
                Tröjor: <b>${data.shirts}</b>
            </li>
            <li>
                Extra donation: <b>${data.extraDonation}kr</b>
            </li>
            <li>
                Övrig information: <b>${data.info}</b>
            </li>
            </ul>
            <p>Starten går klockan 15.00, var gärna i god tid.</p>
            <p>Vi ses den 23e Juli!</p>
            <img src="cid:logo" alt="Logga" width="200px"'/>
        </div>
    `);
}

exports.getSoloHtml = getSoloHtml;
exports.getTeamHtml = getTeamHtml;
exports.getShirtHtml = getShirtHtml;
exports.getXylemHtml = getXylemHtml;