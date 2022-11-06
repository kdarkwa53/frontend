import React from "react";
import ThemeStyles from "../../style/Auth.module.css";
import { Button, } from "antd";

import Logo from "../../assets/javolin_logo.png";

import { Link, useHistory } from "react-router-dom";








const SignUpHome = () => {


    const history = useHistory()
    const onClickIndividual = (e) => {
        e.preventDefault()
        history.push("/login")
    };

    const onClickBusiness = (e) => {
        e.preventDefault()
        history.push("/signup")
    }


    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "70%" }} className={ThemeStyles.cardContent}>
                <div className={ThemeStyles.topSection}>
                    <div> <img src={Logo} alt="javolin logo" /></div>

                </div>
                <div >
                    <div style={{ marginTop: "3em" }} className={ThemeStyles.authTitle}>
                        {/* Register as */}
                    </div>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="login-form-button"
                        onClick={onClickIndividual}
                    >
                        <span style={{ marginRight: "2em" }} >Login</span>
                    </Button>

                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="login-form-button"
                        style={{ marginBottom: "2em", marginTop: "2em", background: "#E3F1FD", color: "#0032A0", border: "none" }}
                        // style={{marginBottom: "2em", marginTop: "2em"}}
                        onClick={onClickBusiness}
                        // disabled
                    >
                        <span style={{ marginRight: "2em" }} >Register</span>
                    </Button>
                    <div className={ThemeStyles.footerMsg}>
                        <div className={ThemeStyles.footerContent}>
                            Have an account? <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </div>

                {/* </div> */}

            </div>

        </>
    );
};

export default SignUpHome;
