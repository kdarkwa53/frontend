import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
} from "mdbreact";

import { withRouter } from "react-router-dom";

const Navbar = () => {
  return (
    <MDBNavbar color="white" dark expand="md">
      <div className="container">
        <MDBNavbarBrand>
          <a href="/">
            <img
              src="/javolin_logo.png"
              width="300"
              alt="logo"
              className="img-fluid "
            ></img>
          </a>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <MDBNavItem></MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/" className="green-text font-weight-bold">
              About
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/signup" className="green-text font-weight-bold">
              Join now
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to="/login" className="green-text font-weight-bold">
              Sign in
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light teal-text" to="#!">
              <MDBIcon fab icon="google-plus-g" />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </div>
    </MDBNavbar>
  );
};
export default withRouter(Navbar);
