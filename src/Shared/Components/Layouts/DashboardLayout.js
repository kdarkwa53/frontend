import React from "react";
import { Route } from "react-router-dom";
import { Layout, Row, Col, Select } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";
import { useSelector } from "react-redux";
import flag from "../../../assets/flag.png"



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
                <div className={Styles.topBar}>
                                    <div className={Styles.def_curr}>
                                        <img width={"20"} src={flag} alt="flag"/>
                                        USD 1
                                    </div>
                                    <marquee>
                                        <div style={{display: "flex", justifyContent: "space-around"}}>

                                                <div>
                                                    {/* <span style={{ fontWeight: "bold" }}>USD</span> 10.05 */}
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>EUR</span> 1.06
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>GBP</span>  0.91
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CAD</span>   1.38
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>AED</span> 3.86
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CNY</span> 7.32
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CFA</span> 691.95
                                                </div>
                                                </div>
                                    </marquee>
                </div>
                <Row style={{background: "#F8F8F8"}}>
                    <div className={Styles.middleCol} >
                      
                        <div className={Styles.layoutContainer}>
                               
                            <div className={Styles.topNav}>
                                {title}
                               
                            </div>
                            <span style={{fontSize: "20px", fontWeight: "700", color: "#727986"}} >Home</span>

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