import useProducts from "../hooks/useProducts";
import { StickyContainer } from "../pages/Register"

export const RegisterInfoKids = () => {
  const { getPriceByProductName } = useProducts();
  return (
    <StickyContainer id="info-text">
      <hr className="register-divider"></hr>
      <h4>Anmälan för dig som är under 15 till Hensmåla Triathlon 2025</h4>
      <b>Datum: 12 juli</b>
      <p>Första start sker 11.00.</p>
      <p>
        Ett motionslopp för barn 9-15. Få en härlig dag i Hensmålas vackra natur med simning (eller löpning längs strandkanten för de små), cykling, löpning och samtidigt bidra till ALS-forskningen.
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
