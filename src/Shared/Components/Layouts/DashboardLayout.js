import React from "react";
import { Route } from "react-router-dom";
import { Layout, Row, Col, Select } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";
import { useSelector } from "react-redux";



const DashboardLayout = ({ children, RightSider, menuRoute, title, ...rest }) => {

    const { Option } = Select
    const state = useSelector((state) => state?.resources)
    const currencies = state?.defaultCurrencies ? state?.defaultCurrencies : {}
    console.log("Yo: ", currencies)
    const newCurr = useSelector((state) => state?.user?.default_savings_wallet?.currency_id)
    console.log("Yo: ", newCurr)


    return (

        <SiderLayout menuRoute={menuRoute} >
            <Layout className={`${Styles.rightSiderLayout} site-layout`} >
                <div className={Styles.headerTop}>
                    <div className={Styles.defaultMenu}>
                        <DefaultMenu />
                    </div>
                </div>
                <Row style={{background: "#F8F8F8"}}>
                    <div className={Styles.middleCol} >
                        <div style={{ background: "#F8F8F8" }} className={Styles.topBar}>

                        </div>

                        <div className={Styles.layoutContainer}>

                            <div className={Styles.topNav}>
                                {title}
                            </div>

                            <div className={Styles.layoutContent}>
                                {children}
                            </div>

                        </div>

                    </div>

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