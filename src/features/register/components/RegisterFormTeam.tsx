import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import { FormElementsProps } from "./RegisterForm";

export const RegisterFormTeam = ({handleChange}: FormElementsProps) => {

  const renderMemberFields = () => {
    return [1, 2, 3].map((num) => {
      return (
        <div key={num} style={{ marginBottom: "20px" }}>
          <Label for={`teamMember${num}`}>Lagmedlem {num}</Label>
          {num === 3 ? <i> (Ej för lag med endast två deltagare)</i> : null}
          <Card id={`teamMember${num}`} style={{ backgroundColor: `#dfeff${num * 3}` }}>
            <CardBody>
              <FormGroup>
                <Label for={`name${num}`}>Namn*</Label>
                <Input
                  required={num !== 3}
                  type="text"
                  name={`name${num}`}
                  id={`name${num}`}
                  placeholder="Förnamn Efternamn"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`email${num}`}>Epost*</Label>
                <Input
                  required={num !== 3}
                  type="email"
                  name={`email${num}`}
                  id={`email${num}`}
                  placeholder="din.email@gmail.com"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`birthdayID${num}`}>Födelsedatum*</Label>
                <div style={{ display: "flex" }}>
                  <YearPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`year${num}`}
                  />
                  <MonthPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`month${num}`}
                  />
                  <DayPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`day${num}`}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for={`city${num}`}> Ort (klubb)</Label>
                <Input
                  type="text"
                  name={`city${num}`}
                  id={`city${num}`}
                  placeholder="Hensmåla löparförening"
                  onChange={handleChange}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </div>
      )
    })
  }

  return (
    <>
      <FormGroup>
        <Label for="teamName">Lagnamn*</Label>
        <Input
          required={true}
          type="text"
          name="teamName"
          id="teamName"
          placeholder="Gubbaflås"
          onChange={handleChange}
        />
      </FormGroup>
      {renderMemberFields()}
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
}
