import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { StickyContainer } from "../pages/Register"

export const RegisterInfoKids = () => {
  const { getPriceByProductName } = useProducts();
  return (
    <StickyContainer id="info-text">
      <hr className="register-divider"></hr>
      <h4>Anmälan för dig som är under 15</h4>
      <b>Datum: 12 juli</b>
      <p>Första start sker 10.30.</p>
      <p>
        Ett motionslopp för barn 2-15. Få en härlig dag i Hensmålas vackra natur med simning (eller löpning längs strandkanten för de små), cykling, löpning och samtidigt bidra till ALS-forskningen.
      </p>
      <p>
        För mer information om sträckorna gå till {" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="/om-ht/strackor">
          sträckor
        </Link>.
      </p>
      <p>
        Alla barn är vinnare och får en guldmedalj av choklad vid målgång.
        Det är obligatoriskt att att målsman ska vara med under loppet och kunna hjälpa barnet.
      </p>
      <b>
        Fotografering och videofilmning förekommer, meddela om du inte vill
        vara med.
      </b>
      <br></br>
      <br></br>
      <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
      <p><b style={{ fontSize: 20 }}>Startavgift: {getPriceByProductName("registration-fee-kids")}kr</b></p>
    </StickyContainer>
  )
}
