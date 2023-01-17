import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import MenuBar from "../Menu/Menu";
import Styles from "../Menu/Menu.module.css"
import SiderLayout from "./SiderLayout";
import DefaultMenu from "../Menu/DefaultMenu";
import { useSelector } from "react-redux";




const MainLayout = ({ children, menuRoute, subtitle, breadSub, title, ...rest }) => {



    const { Header } = Layout
    const text = useSelector((state)=> state.language)

    return (
        <SiderLayout menuRoute={menuRoute} >
            <Layout className={`${Styles.rightSiderLayout} site-layout`} >
            <div className={Styles.headerTop}>
                    <div className={Styles.defaultMenu}>
                        <DefaultMenu />
                    </div>
                </div>
                <div style={{ height: "100%", background: "#E0EAFF" }}>
                    <div style={{padding: "1.5em 1.5em"}} className={Styles.runningHeader}>
                        <div style={{marginTop: "2em"}} className={Styles.runningTitle}>
                            <span style={{fontWeight: "700", fontSize: "28px", color: "white"}}>{title}</span> 
                        </div>
                        <div style={{color: "#BFC5D2"}} className={Styles.breadcrumb}>
                            {subtitle} {breadSub ? <span style={{fontWeight: "700"}}>{breadSub}</span> : "" }  
                        </div>
                    </div>

                    <div className={Styles.layoutContainer}>

                        <div style={{ marginTop: "-3em" }}>
                            {children}
                        </div>
                    </div>
                </div>

                <div className="alan-btn"> </div>
            </Layout>
        </SiderLayout>
    );
}

const MainLayoutRoute = ({ component: Component, title, subtitle, breadSub, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <MainLayout title={title} subtitle={subtitle} breadSub={breadSub} >
                    <Component {...props} />
                </MainLayout>
            )}
        />
    );
}

export default MainLayoutRoute