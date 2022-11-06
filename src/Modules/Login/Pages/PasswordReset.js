import React from "react";
import { Link } from "react-router-dom";
import Circle from "../../../Shared/Components/Circle/Circle";
import { SMSstarIcon } from "../../../Shared/Components/JavIcons";
import ThemeStyles from "../../../style/Auth.module.css";


const PasswordReset = (props) => {
  const { state } = props.location
  console.log(state)

  return (
    <>
      <div className={ThemeStyles.cardContent}>
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
          <div className={ThemeStyles.topSection}>
            <div className={ThemeStyles.authTitle}>
              Check you email
            </div>
          </div>
          <Circle color="#F1F8FE" size="100px" children={<SMSstarIcon width="2em" height="2em" color="#0032A0" />} />
          <p style={{textAlign: "center", marginTop: "2em"}} className={ThemeStyles.subInfo}>
            We have sent a link to <span style={{ color: "black" }}>{state?.email}.</span> Check your email.
          </p>
          <p className={ThemeStyles.subInfo}>
            <Link to={"/login"}> return to login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
