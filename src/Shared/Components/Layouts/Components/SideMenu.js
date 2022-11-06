
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BriefCase, WalletIcon, Chart2, LogOutIcon } from "../../JavIcons"
import { Link } from "react-router-dom";
import { Menu, Divider } from "antd";
import Styles from "../../Menu/Menu.module.css"
import { useHistory } from "react-router";
import { userLogout } from "../../../../Modules/Login/duck/action";
import { setCurrentRoute } from "../../duck/action";
import SideMenuItem from "./MenuItem";

const SideMenu = () => {

    const text = useSelector((state) => state.language)
    const history = useHistory()
    const accountType = useSelector((state) => state?.user?.type)
    const current_route = useSelector((state) => state?.resources?.current_route)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(userLogout(history, accountType))
    };


  
    const handleMenuClick = (val) => {
        console.log(val)
        dispatch(setCurrentRoute(val))
        history.push(val)
    }

   


    const defaultMenuItem = {
        color: "#888B93",
    }

    const activeMenuItem = {
        color: "white",
        background: "#0032A0"
    }

    return (
        <>

            <SideMenuItem
                style={current_route === "/" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/")}
                icon={<Chart2 className={Styles.menuIcon} width="1.5em" height="1.5em" />}
                text={text.DASHBOARD}
            />
            <SideMenuItem
                style={current_route === "/portfolio" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/portfolio")}
                icon={<BriefCase className={Styles.menuIcon} width="1.5em" height="1.5em" />}
                text={text.PORTFOLIO}
            />
            <SideMenuItem
                style={current_route === "/wallet" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/wallet")}
                icon={<WalletIcon className={Styles.menuIcon} stroke="iconStroke" width="1.5em" height="1.5em" />}
                text={text.WALLET}
            />
            <SideMenuItem
                style={current_route === "/profile" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/profile")}
                icon={<Chart2 className={Styles.menuIcon} width="1.5em" height="1.5em" />}
                text={text.PROFILE}
            />



           
            <div className={Styles.bottomMenu}>
                <Divider />
                <Menu mode="inline" >
                    <Menu.Item key="2" icon={<LogOutIcon className={Styles.menuIcon} stroke="iconStroke" width="1em" height="1em" />}>
                        <Link className={Styles.menuText} onClick={logout} to="/" style={{ textDecoration: "none" }}>
                            {text.LOGOUT}
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </>
    )
}

export default SideMenu