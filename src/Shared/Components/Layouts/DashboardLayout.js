import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Row, Col, Select, Dropdown, Button } from "antd";
import DefaultMenu from "../Menu/DefaultMenu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";
import { useDispatch, useSelector } from "react-redux";
import flag from "../../../assets/flag.png"
import { getRunningHeader } from "../duck/action";



const DashboardLayout = ({ children, RightSider, menuRoute, title, ...rest }) => {

    const { Option } = Select
    const text = useSelector((state) => state?.language)
    const defaultCurrencies = useSelector((state) => state?.resources?.defaultCurrencies)
    const base_currency = useSelector((state) => state?.resources?.base_currency)
    const runningCurrencies = useSelector((state) => state?.resources?.running_header)
    const loadingCurrencies = useSelector((state) => state?.resources?.loadingRunningHeader)
    const items = []
    const [baseCurrency, setBaseCurrency] = useState(base_currency)
    const dispatch = useDispatch()

    const handleCurrencyChange = (cur) => {
        dispatch(getRunningHeader(cur))
        setBaseCurrency(cur)
    }
    
    Object.values(defaultCurrencies).forEach((cur, i) => {
        const item = cur.ISO ? cur?.ISO : cur?.symbol
        items.push({
            key: i,
            label: (
                <div onClick={() => handleCurrencyChange(item)}>
                    {item}
                </div>
            ),

        })
    })


    return (

        <SiderLayout menuRoute={menuRoute} >
            <Layout className={`${Styles.rightSiderLayout} site-layout`} >
                <div className={Styles.headerTop}>
                    <div className={Styles.defaultMenu}>
                        <DefaultMenu />
                    </div>
                </div>
                <div style={{background: loadingCurrencies ? "#bbbdd3" : "#000B6B"}}  className={Styles.topBar}>

                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                        arrow
                    >
                        <div className={Styles.def_curr}>
                            {/* <img width={"20"} src={flag} alt="flag" /> */}
                            {`${baseCurrency} 1`}
                        </div>
                    </Dropdown>
                    <div className={`running-header`}>
                        <div className="marquee">
                            <div>
                                {runningCurrencies?.map((item) => {
                                    return (
                                        <>{item?.currency} <span className="marq-rates">  {item?.amount} </span> </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="marquee marquee2">
                            <div>
                                {runningCurrencies?.map((item) => {
                                    return (
                                        <>{item?.currency} <span className="marq-rates">  {item?.amount} </span> </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div >
                <Row style={{ background: "#F8F8F8" }}>
                    <div style={{ background: "#E0EAFF" }} className={Styles.middleCol} >

                        <div className={Styles.layoutContainer}>
                            <div className={Styles.topNav}>
                                {title}
                            </div>
                            <span style={{ fontSize: "20px", fontWeight: "700", color: "#727986" }} >{text["Home"]}</span>

                            <div className={Styles.layoutContent}>
                                {children}
                            </div>

                        </div>

                    </div>

                </Row>
            </Layout >
        </SiderLayout >
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