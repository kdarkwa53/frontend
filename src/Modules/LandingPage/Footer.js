import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const Footer = (props) => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 footers">
      <MDBContainer className="footer-content text-center text-md-left">
        <MDBRow>
          <MDBCol md="4" className="contact">
            <h5 className="title">Contact Us</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <MDBIcon
                  icon="map-marker-alt"
                  size="2x"
                  className="light-green-text d-inline mr-2"
                />
                <p className="d-inline">Legon-Hills,Accra 94126, Ghana</p>
              </li>
              <li>
                <MDBIcon
                  icon="phone"
                  size="2x"
                  className="light-green-text  mr-2 d-inline"
                />
                <p className="d-inline">+ 233 234 567 89</p>
              </li>
              <li className="d-inline">
                <MDBIcon
                  icon="envelope"
                  size="2x"
                  className="light-green-text  mr-2 d-inline"
                />
                <p className="d-inline">contact@example.com</p>
              </li>
            </ul>
            <a href="/" className="d-inline ">
              <img alt="appstore" src="/appstore.svg" width="150"></img>
            </a>
            <a href="/" className="d-inline ">
              <img alt="playstore" src="/playstore.png" width="150"></img>
            </a>
          </MDBCol>
          <MDBCol md="4" className="company">
            <h5 className="title">Company</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/">About Us</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Terms of Service</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Privacy Policy</a>
              </li>
              <li className="list-unstyled">
                <a href="/">FAQs</a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol md="4" className="community">
            <h5 className="title">Community</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <MDBIcon
                  fab
                  icon="facebook"
                  size="2x"
                  className="light-green-text d-inline mr-2"
                />
                <p className="d-inline">facebook</p>
              </li>
              <li>
                <MDBIcon
                  fab
                  icon="linkedin"
                  size="2x"
                  className="light-green-text  mr-2 d-inline"
                />
                <p className="d-inline">linkedin</p>
              </li>
              <li>
                <MDBIcon
                  fab
                  icon="instagram"
                  size="2x"
                  className="light-green-text  mr-2 d-inline"
                />
                <p className="d-inline">Instagram</p>
              </li>
              <li className="d-inline">
                <MDBIcon
                  fab
                  icon="twitter"
                  size="2x"
                  className="light-green-text  mr-2 d-inline"
                />
                <p className="d-inline">Twitter</p>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.Javolin.com"> Javolin.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
