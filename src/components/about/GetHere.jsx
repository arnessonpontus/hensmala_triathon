import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class GetHere extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <h3>Hitta till Hensmåla</h3>
            <p>
              Hensmåla är en liten by utanför Tingsryd längs väg
              120. Adressen är: Hensmåla 31 36294 Tingsryd. 
            </p>
            <h3>Parkeringar</h3>
            <p>
              Parkeringar finns i närheten av tävlingsområdet. Skyltar visar
              parkeringsplatser. Följ funktionärernas anvisningar på plats.
            </p>
          </Col>
          <Col
            style={{
              marginTop: "5vh",
              marginBottom: "5vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="getHere"
                  width="300"
                  height="300"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=hensm%C3%A5la%2031&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                ></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GetHere;
