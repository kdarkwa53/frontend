
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BriefCase, WalletIcon, Chart2, LogOutIcon, People, ShieldSecurityIcon, UserTag2, Radar, Stack, WalletIconDas, RocketLaunch, UsersIcon, ListChecks, UserListsIcon } from "../../JavIcons"
import { Link } from "react-router-dom";
import { Menu, Divider } from "antd";
import Styles from "../../Menu/Menu.module.css"
import { useHistory } from "react-router";
import { useState } from "react";
import { userLogout } from "../../../../Modules/Login/duck/action";
import { setCurrentRoute } from "../../duck/action";
import MenuDropdownItem from "./MenuDropdownItem";
import SideMenuItem from "./MenuItem";
import AccessControl from "../../AccessControl/AccessControl";

const BusinessSideMenu = ({ menuRoute}) => {

    const text = useSelector((state) => state.language)
    const history = useHistory()
    const accountType = useSelector((state) => state?.user?.type)
    const current_route = useSelector((state) => state?.resources?.current_route)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(userLogout(history,accountType))
    };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
   
        getItem(text['User Management'], '/user', <People width={'1.5em'} height={'1.5em'} />, [
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['']}
                userPermissions={['VIEW_DASHBOARD']}
            >
                {getItem('User', '/user-management', <UserTag2 width={'1.5em'} height={'1.5em'}/>)}
            </AccessControl>
            ,
            getItem('Role', '/role-management', <ShieldSecurityIcon width={'1.5em'} height={'1.5em'}/>),
        ]),
       
    ];
    const handleMenuClick = (val) => {
        setCurrent(val)
        console.log(val)
        dispatch(setCurrentRoute(val))
        history.push(val)
    }

    const onClick = (e) => {
        console.log(e.key)
        setCurrentRoute(e.key)
        setCurrent(e.key)
        history.push(e.key)
    };

    const [current, setCurrent] = useState(menuRoute)

    const defaultMenuItem = {
        color: "#888B93",
    }

    const activeMenuItem = {
        color: "white",
        fontWeight: "700"
        // background: "#0032A0"
    }

    const menu_items = [
        
        {
            menu: 
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['VIEW_DASHBOARD']}
                userPermissions={['VIEW_DASHBOARD']}
            >
            <SideMenuItem
                            style={current_route === "/user-management" ? activeMenuItem : defaultMenuItem}
                            onClick={(e) => handleMenuClick("/user-management")}
                            icon={<ListChecks width={'1.5em'} height={'1.5em'} />}
                            text={text["Users"]}
                        />
            </AccessControl>,
            

            id: 1
              
        },
        {
            menu: <SideMenuItem
                style={current_route === "/role-management" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/role-management")}
                icon={<UserListsIcon width={'1.5em'} height={'1.5em'} />}
                text={text["Roles"]}
            />,
            id: 2
        }
    ]
    return (
        <>
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['VIEW_DASHBOARD']}
                userPermissions={['VIEW_DASHBOARD']}
            >
            <SideMenuItem 
                style={current_route === "/" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/")}
                icon={<Stack className={Styles.menuIcon} width="1.5em" height="1.5em" />}
                text={text.DASHBOARD}
            />
            </AccessControl>
            
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['VIEW_WALLET']}
                userPermissions={['VIEW_WALLET']}
            >
            <SideMenuItem
                style={current_route === "/business/wallet" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/business/wallet")}
                icon={<WalletIconDas className={Styles.menuIcon} stroke="iconStroke" width="1.5em" height="1.5em" />}
                text={text.WALLET}
            />
            </AccessControl>
            
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['VIEW_PENDING_TRANSACTIONS']}
                userPermissions={['VIEW_PENDING_TRANSACTIONS']}
            >
            <SideMenuItem
                style={current_route === "/business/requests" ? activeMenuItem : defaultMenuItem}
                onClick={(e) => handleMenuClick("/business/requests")}
                icon={<RocketLaunch className={Styles.menuIcon} width="1.5em" height="1.5em" />}
                text={text["Pending Requests"]}
            />
            </AccessControl>
            
            
     
            <AccessControl
                renderNoAccess={""}
                allowedPermissions={['USER_MANAGEMENT']}
                userPermissions={['USER_MANAGEMENT']}
            >
                <MenuDropdownItem
                head={{ title: text["User Management"], icon: <UsersIcon width={'1.5em'} height={'1.5em'} /> }}
                items={menu_items}
            />
            </AccessControl>
            
            
        </>
    )
}

export default BusinessSideMenu