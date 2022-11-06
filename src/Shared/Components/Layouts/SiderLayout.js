import React from "react";
import { Layout } from "antd";
import Styles from "../Menu/Menu.module.css"
import Logo from "../../../assets/javolin_logo_rev.svg";

import SideMenu from "./Components/SideMenu";
import { useSelector } from "react-redux";
import BusinessSideMenu from "./Components/BusinessSideMenu";
import Cookies from "js-cookie";


const SiderLayout = ({ children, menuRoute }) => {

    const accountType = Cookies.get('userType')

    const { Sider } = Layout


    return (
        <Layout style={{ height: '100vh' }}>
            <Sider
            width={300}
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
                {accountType === 'business' ? 
                    <BusinessSideMenu menuRoute={menuRoute} />
                        : 
                    <SideMenu menuRoute={menuRoute} />
                }
                
            </Sider>
            {children}
        </Layout>
    );
}


export default SiderLayout