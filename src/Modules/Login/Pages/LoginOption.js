import React from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import { Button } from "antd";
import Logo from "../../../assets/javolin_logo.png";
import { Link } from "react-router-dom";

const LoginOption = () => {




    return (
        <>

            <div className={ThemeStyles.cardContent}>
                <div className={ThemeStyles.topSection}>
                    <div className={ThemeStyles.brandLogo}>
                        <img src={Logo} alt="logo" />
                    </div>
                    <div style={{ marginBottom: "3em" }} className={ThemeStyles.authTitle}>
                        Register as
                    </div>
                </div>
                <div>
                    <div className={ThemeStyles.optionButton}>
                        <Link to="/login">
                            <Button
                                block
                                size="large"
                                type="primary"

                            >
                                Individual
                            </Button>
                        </Link>
                    </div>
                    <div className={ThemeStyles.optionButton} >
                        <Link to="/business/login">
                            <Button
                                block
                                size="large"
                                style={{ background: "#E3F1FD", width: "100%" }}

                            >
                                Business
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={ThemeStyles.footerMsg}>
                    <div style={{ position: "absolute", bottom: "10%" }}>
                        Have an account? <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LoginOption;
