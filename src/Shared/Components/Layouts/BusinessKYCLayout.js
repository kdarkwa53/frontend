import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import MenuBar from "../Menu/Menu";
import Styles from "../Menu/Menu.module.css"
import Logo from "../../../assets/javolin_logo_rev.svg"



const MainLayout = ({ children, title, ...rest }) => {



    const { Header } = Layout

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout" >
                <Header style={{
                    position: 'fixed', padding: 0, background: "white", width: "100%", zIndex: 2
                }} >
                    <MenuBar />
                </Header>
                <div className={Styles.subHeader}>
                </div>
                <div className={Styles.subHeaderSticky}>
                    <div className={Styles.subHeaderRow}>
                        <div>
                            {title}
                        </div>
                        <img src={Logo} alt="javolin logo"/>
                    </div>
                </div>
                <div style={{ background: "#ffffff", minHeight: "100vh" }}>

                    <div className={`${Styles.layoutContainer} ${Styles.bkycArea}`}>

                        <div className={Styles.kycContentArea} style={{ marginTop: "3em" }}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className="alan-btn"> </div>
            </Layout>
        </Layout>
    );
}

const BusinessKYCLayout = ({ component: Component, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <MainLayout title={title}>
                    <Component {...props} />
                </MainLayout>
            )}
        />
    );
}


export default BusinessKYCLayout