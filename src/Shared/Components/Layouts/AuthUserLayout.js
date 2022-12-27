import React from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import Logo from "../../../assets/javolin_rev.png";
import { Route } from "react-router-dom";
import { Row, Col } from "antd";
import Ring from "../../../assets/ring.png"

const AuthUserLayout = ({ children, title, ...rest }) => {

    return (
        <>
            <div className={ThemeStyles.auth_bg}>
                <div className={ThemeStyles.overlay}>
                    <Row className={ThemeStyles.authRow}>

                        <Col xs={24} sm={24} md={24} className={ThemeStyles.containerLeft}>
                            <div className={ThemeStyles.container}>
                                <div className={ThemeStyles.rightSide}>
                                    <div className={ThemeStyles.signupCard}>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </Col>
                            <Col lg={12} className={ThemeStyles.containerRight}>
                                <div className={ThemeStyles.welcomeMsg}>
                                    {/* {title === "login" ? ( */}
                                    <div className={ThemeStyles.welcomeLogo}>
                                        <img src={Logo} alt="javolin polychrome-logo" />
                                    </div>
                                    {/* ) : ""} */}
                                    <div className={ThemeStyles.welcomeTitle}>Welcome to<span style={{ color: "#6CC24A" }}> JAVOLIN</span> </div>
                                    <div className={ThemeStyles.welcomeBody}> Financial services you can trust.</div>
                                </div>
                            </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

const AuthUserLayoutRoute = ({ component: Component, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <AuthUserLayout title={title}>
                    <Component {...props} />
                </AuthUserLayout>
            )}
        />
    );
}

export default AuthUserLayoutRoute