import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class GetHere extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Hitta till Hensmåla</b>
            <p>
              Adressen är Hensmåla östergård 31. En liten by utanför Tingsryd
              längs väg 126.
            </p>
          </Col>
          <Col
            style={{
              marginTop: "5vh",
              marginBottom: "5vh",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe
                  title="getHere"
                  width="300"
                  height="300"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=hensm%C3%A5la%2031&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
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
