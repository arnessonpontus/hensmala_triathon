import { Container, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

const result_years = [2024, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];

export const Results = () => {
  return (
    <Container className="p-4">
      <h1 className="m-4">Tidigare års resultat</h1>
      <Card>
        <CardBody>
          <ListGroup>
            {result_years.map((year) => {
              return (
                <ListGroupItem
                  target="_blank"
                  rel="noopener noreferrer"
                  key={year}
                  tag="a"
                  href={
                    "/results/" +
                    year +
                    "_resultat_hensmala_triathlon.pdf"
                  }
                >
                  {year}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
}
