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
    const text = useSelector((state) => state?.language)

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
                                                    <span style={{ fontWeight: "bold" }}>EUR</span> 0.98
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>GBP</span>  0.85
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CAD</span>   1.41
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>AED</span> 3.84
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CNY</span> 7.3
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>CFA</span> 646.77
                                                </div>
                                                <div>
                                                    <span style={{ fontWeight: "bold" }}>GHS</span> 10.23
                                                </div>
                                                </div>
                                    </marquee>
                </div>
                <Row style={{background: "#F8F8F8"}}>
                    <div style={{background: "#E0EAFF"}} className={Styles.middleCol} >
                      
                        <div className={Styles.layoutContainer}>
                            <div className={Styles.topNav}>
                                {title}
                            </div>
                            <span style={{fontSize: "20px", fontWeight: "700", color: "#727986"}} >{text["Home"]}</span>

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