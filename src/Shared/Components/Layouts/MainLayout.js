import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import MenuBar from "../Menu/Menu";
import Styles from "../Menu/Menu.module.css"




const MainLayout = ({ children, title, ...rest }) => {



    const { Header } = Layout

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout" >
                <Header style={{
                    position: 'fixed', padding: 0, background: "white", width: "100%", boxShadow: "0 10px 20px rgba(161, 161, 161, 0.2)", zIndex: 2
                }} >
                    <MenuBar />
                </Header>
                <div style={{ background: "#ffffff", minHeight: "100vh" }}>

                    <div className={Styles.layoutContainer}>

                        <div style={{ marginTop: "8em" }}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className="alan-btn"> </div>
            </Layout>
        </Layout>
    );
}

const MainLayoutRoute = ({ component: Component, title, ...rest }) => {
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

export default MainLayoutRoute