import React, { useEffect } from "react";
import { Route, } from "react-router-dom";
import { Layout, Row } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";

// import { removeCookies } from "../../../helpers/contants";



const DashboardLayout = ({ children, title, primary, menuRoute, background, ...rest }) => {
   

   

    const topHeight = primary  ? "" : "350px" 
    return (
        <SiderLayout menuRoute={menuRoute} >
            <Layout className={`${Styles.rightSiderLayout} site-layout`} >
                <div className={Styles.headerTop}>
                    <div className={Styles.defaultMenu}>
                        <DefaultMenu />
                    </div>
                </div>
                <Row>
                    <div style={{ width: "100%", overflowY: "scroll", overflowX: "hidden", background: background, height: topHeight }} >
                        <div className={Styles.layoutContainer}>
                            <div style={{ fontSize: "23px", color: "#000C26" }}>
                                {title}
                            </div>
                        </div>

                    </div>

                    <div className={Styles.pageContainer}>
                        {children}
                    </div>
                </Row>
                <div className="alan-btn"> </div>
            </Layout>
        </SiderLayout>
    );
}

const LayoutView = ({ component: Component, primary, menuRoute, background, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <DashboardLayout menuRoute={menuRoute} primary={primary} background={background} title={title}>
                    <Component {...props} />
                </DashboardLayout>
            )}
        />
    );
}

export default LayoutView