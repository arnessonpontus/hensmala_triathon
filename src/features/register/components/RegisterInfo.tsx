import { Link } from "react-router-dom"
import { Col } from "reactstrap"
import usePrices from "../hooks/usePrices";

interface RegisterInfoProps {
  type: "team" | "solo"
}

export const RegisterInfo = ({ type }: RegisterInfoProps) => {
  const { getPriceByName } = usePrices();
  return (
    <Col id="info-text" style={{ marginTop: "2vh" }}>
      <hr className="register-divider"></hr>
      {type === "solo" ?
        <h3>Anmäl dig till Hensmåla Triathlon 2024</h3>
        :
        <h3>Anmäl er som Lag (2-3 pers.)</h3>
      }
      <b>Datum: 20 juli</b>
      <p>
        Ett motionslopp för alla, motionär som elit. Få en härlig dag i Hensmålas vackra natur med simning (340m), cykling (9.2km), löpning (6.5km) och samtidigt bidra till ALS-forskningen.
      </p>
      <p>
        När du anmälder sig som individuell deltagare utför du alla tre
        grenar på egen hand. För mer information om sträckorna och
        tävlingsregler kan du gå in{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="/om-ht/hem">
          HÄR
        </Link>.
      </p>
      <p>
        Det kommer komma ett bekräftelse-email med din angiva information och{" "}
        <b>betalningsuppgifter</b> då anmälan är gjord. Betala gärna direkt i samband med anmälan. När tävlingen närmar
        sig kommer yttligare information skickas ut via mail till alla
        deltagare.
      </p>
      <p>Första start sker 15.00.</p>
      <b>
        Fotografering och videofilmning förekommer, meddela om du inte vill
        vara med.
      </b>
      <br></br>
      <br></br>
      <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
      <b style={{ fontSize: 20 }}>Startavgift: {getPriceByName("registration-fee-solo")}kr</b>
    </Col>
  )
}
