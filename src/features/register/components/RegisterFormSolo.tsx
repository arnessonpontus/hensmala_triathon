import { FormGroup, Label, Input } from "reactstrap";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import { FormElementsProps } from "./RegisterForm";

export const RegisterFormSolo = ({ handleChange }: FormElementsProps) => {
  return (
    <>
      <FormGroup>
        <Label for="name">Namn*</Label>
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
        <Label for="email">Epost*</Label>
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
        <Label for="birthdayID">Födelsedatum*</Label>
        <div style={{ display: "flex" }}>
          <YearPicker
            required
            handleChange={handleChange}
            elemName="year1" />
          <MonthPicker
            required
            handleChange={handleChange}
            elemName="month1"
          />
          <DayPicker
            required
            handleChange={handleChange}
            elemName="day1" />
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="genderSelection">Kön*</Label>
        <Input
          required
          type="select"
          name="gender"
          id="genderSelection"
          defaultValue={""}
          onChange={handleChange}
        >
          <option disabled value="">
            Välj kön
          </option>
          <option value="Herr">Herr</option>
          <option value="Dam">Dam</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="city"> Ort (klubb)</Label>
        <Input
          type="text"
          name="city1"
          id="city1"
          placeholder="Hensmåla löparförening"
          onChange={handleChange}
        />
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
