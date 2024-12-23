import { Link } from "react-router-dom"
import { Col } from "reactstrap"
import usePrices from "../hooks/usePrices";
import { SwishQrImage } from "./SwishQrImage";

interface RegisterInfoProps {
  type: "team" | "solo"
}

export const RegisterInfo = ({ type }: RegisterInfoProps) => {
  const { getPriceByName } = usePrices();
  return (
    <Col id="info-text" style={{ marginTop: "2vh" }}>
      <hr className="register-divider"></hr>
      {type === "solo" ?
        <h3>Anmäl dig till Hensmåla Triathlon 2025</h3>
        :
        <h3>Anmäl er som Lag (2-3 pers.)</h3>
      }
      <b>Datum: 12 juli</b>
      <p>
        Ett motionslopp för alla, motionär som elit. Få en härlig dag i Hensmålas vackra natur med simning (340m), cykling (9.2km), löpning (6.5km) och samtidigt bidra till ALS-forskningen.
      </p>
      {type === "solo" ?
        <p>När du anmälder sig som individuell deltagare utför du alla tre
          grenar på egen hand.</p>
        :
        <p>När ni anmälder er som ett lag med tre personer utför ni en gren var. Om ni är två personer kör en persson två grenar och den andra en gren, i vilken ordning ni vill.</p>
      }
      <p>
        För mer information om sträckorna och
        tävlingsregler kan du gå in{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="/om-ht/hem">
          HÄR
        </Link>.
      </p>
      <p>
        Om du beställt kläder ska dessa upphämtas på plats i Hensmåla via dig själv eller någon bekant, <b>vi skickar alltså tyvärr inte kläderna.</b>
      </p>
      <p>Första start sker 15.00.</p>
      <b>
        Fotografering och videofilmning förekommer, meddela om du inte vill
        vara med.
      </b>
      <br></br>
      <br></br>
      <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
      <p><b style={{ fontSize: 20 }}>Startavgift: {type === "solo" ? getPriceByName("registration-fee-solo") : getPriceByName("registration-fee-team")}kr</b> (Höjs med 100kr efter 1/3)</p>
      <p>Donera gärna även en slant via Swish om du känner för det!</p>
      <SwishQrImage />
    </Col>
  )
}
