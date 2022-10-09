import React from "react";
import { Route } from "react-router-dom";
import { Layout, Row, Col, Select } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";
import { useSelector } from "react-redux";



const DashboardLayout = ({ children, RightSider, menuRoute, title, ...rest }) => {

    const {Option} = Select
const state = useSelector((state) => state?.resources)
const currencies = state?.defaultCurrencies ? state?.defaultCurrencies : {}
console.log("Yo: ",currencies)
const newCurr = useSelector((state) => state?.user?.default_savings_wallet?.currency_id)
console.log("Yo: ",newCurr)


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
                        <div style={{ background: "white" }} className={Styles.topBar}>
                             {currencies ? (
                            <Select style={{ width: 84 , marginRight: 10}} defaultValue={newCurr}>
                                {
                                    Object?.values(currencies)?.map((currency) => {
                                        return (
                                            < Option key={currency?.id} value={currency?.id}>{currency?.ISO}</Option>
                                        )

                                    })
                                }

                            </Select>
                        ) : ""} 
                        <marquee>
                            <div style={{display: "flex", justifyContent: "space-around"}}>

                            
                                    <div>
                                        {/* <span style={{ fontWeight: "bold" }}>USD</span> 10.05 */}
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>EUR</span> 1.04
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>GBP</span>  0.90
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>CAD</span>   0.72
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>AED</span> 3.84
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>CNY</span> 7.29
                                    </div>
                                    </div>
                         </marquee>
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
                    </Col>
                    <Col className={Styles.siderContainer} xs={24} sm={24} md={24} lg={8} xl={8}>
                        <RightSider />
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