import { MDBFooter, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import Nav from "react-bootstrap/Nav";

function Footer() {
  return (
    <footer>
      <MDBFooter className="bg-dark text-center text-white">
        <MDBContainer className="p-4 pb-0">
          <section className="mb-4">
            <Nav className="me-auto">
              <Nav.Link
                href="/about"
                className="btn btn-outline-light btn-rounded m-2"
              >
                About
              </Nav.Link>
              <Nav.Link
                href="/favorite"
                className="btn btn-outline-light btn-rounded m-2"
              >
                FavoriteCardsPage
              </Nav.Link>
              <Nav.Link
                href="/myCards"
                className="btn btn-outline-light btn-rounded m-2"
              >
                MyCards
              </Nav.Link>
            </Nav>
          </section>
        </MDBContainer>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a className="text-white m-3"> Jenya Proviz</a>
        </div>
      </MDBFooter>
    </footer>
  );
}

export default Footer;
