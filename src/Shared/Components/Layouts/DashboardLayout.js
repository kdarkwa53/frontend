import React from "react";
import { Route } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";



const DashboardLayout = ({ children, RightSider, menuRoute, title, ...rest }) => {
   



    
    return (

        <SiderLayout menuRoute={menuRoute} >
            <Layout className={`${Styles.rightSiderLayout} site-layout`} >
                <div className={Styles.headerTop}>
                    <div className={Styles.defaultMenu}>
                        <DefaultMenu />
                    </div>
                </div>
                <Row>
                    <Col style={{ background: "#FAFAFB" }} xs={24} sm={24} md={24} lg={16} xl={16}>
                        <div className={Styles.middleCol} >
                            <div className={Styles.layoutContainer}>
                                <div className={Styles.topNav}>
                                    {title}
                                </div>
                                <div className={Styles.layoutContent}>
                                    {children}
                                </div>

                            </div>

                        </div>
                    </Col>
                    <Col className={Styles.siderContainer} xs={24} sm={24} md={24} lg={8} xl={8}>
                        <RightSider/>
                    </Col>
                </Row>
            </Layout>
        </SiderLayout>
    );

}

// SiderLayout.SiderContainer = (props) => <div className={Styles.siderContainer}>8eojhfn</div>
const DashboardLayoutRoute = ({ component: Component, RightSider, menuRoute, title, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <DashboardLayout RightSider={RightSider} menuRoute={menuRoute} title={title}>
                    <Component {...props} />
                </DashboardLayout>
            )}
        />
    );
}

export default DashboardLayoutRoute