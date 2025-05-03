
import { FormGroup, Label, Input } from "reactstrap";
import { YearPicker } from "./TimeAndDate";
import { FormElementsProps } from "./RegisterForm";

export const RegisterFormKids = ({ handleChange }: FormElementsProps) => {
  return (
    <>
      <FormGroup>
        <Label for="name">Namn (barnet)*</Label>
        <Input
          required={true}
          type="text"
          name="name1"
          id="name1"
          placeholder="Förnamn Efternamn"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Epost (Målsman)*</Label>
        <Input
          required={true}
          type="email"
          name="email1"
          id="email1"
          placeholder="din.email@gmail.com"
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Ålder vid genomförandet*</Label>
        <div style={{ display: "flex" }}>
          <YearPicker
            kidsMode
            required
            handleChange={handleChange}
            elemName="year1" />
        </div>
      </FormGroup>
      <FormGroup>
        <Label>Simkunnighet*</Label>
        <Input
          required
          type="select"
          name="swimLevel"
          defaultValue={""}
          onChange={handleChange}
        >
          <option disabled value="">
            Välj simkunnighet
          </option>
          <option value="Kan inte simma">Kan inte simma</option>
          <option value="Kan simma">Kan simma</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="info">Information</Label>
        <Input
          type="textarea"
          name="info"
          id="info"
          placeholder="T.ex. vilka du vill köra samtidigt som eller övrig info"
          onChange={handleChange}
        />
      </FormGroup>
    </>
  );
};
