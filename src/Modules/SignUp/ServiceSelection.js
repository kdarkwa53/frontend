import React from "react";
import Styles from "./ServiceSelection.module.css";
import GlobalStyles from "../../style/Global.module.css";

import { Grid } from "tabler-react";
import Logo from "../../assets/javolin_logo.png";
const ServiceSelection = () => {
  return (
    <>
      <div>
        <Grid.Row>
          <Grid.Col className={Styles.sideImage} lg={6}>
            <div className={Styles.sideImage}></div>
          </Grid.Col>
          <Grid.Col lg={6}>
            <img src={Logo} alt="logo" className={GlobalStyles.logo} />
            <div className={Styles.container}>
              <div className={Styles.rightSide}>
                <div className={Styles.statement}>
                  Please select an option below to continue
                </div>
                <div className={Styles.serviceCard}>
                  <p>I want to apply for a mortgage</p>
                </div>
                <div className={Styles.serviceCard}>
                  <p>I want to apply for other financial products</p>
                </div>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </div>
    </>
  );
};

export default ServiceSelection;
