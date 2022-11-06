import BusinessSideMenu from "./BusinessSideMenu"
import React from "react";
import { Layout } from "antd";
import Styles from "../../Menu/Menu.module.css"
import Logo from "../../../../assets/javolin_logo.png";



const BusinessSider = (menuRoute)=>{
    const { Sider } = Layout
    return(
        <Sider
            width={254}
            style={{
                backgroundColor: "#000638",
                position: 'fixed',
                height: '100vh',
                zIndex: "1"
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
            }}
            onCollapse={(collapsed, type) => {
            }}
        >
            <div className={Styles.logoWrapper}>
                <img src={Logo} alt="logo" className={Styles.logo} />
            </div>
            <div className="logo" />
                <BusinessSideMenu menuRoute={menuRoute} />
        </Sider>
    )
}

export default BusinessSider