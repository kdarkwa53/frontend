
import Styles from "./Menu.module.css";
import React from "react";
import UserMenu from "./UserMenu";
// import LangDropDown from "../LangDropDown";
import Logo from "../../../assets/javolin_logo.png"
import LangDropDown from "../LangDropDown";
import { NotificationIcon } from "../JavIcons";



const DefaultMenu = () => {

    return (
        <>
            <div >
                <div className={Styles.head}>
                    <div className={Styles.container2}>

                        <div className={Styles.sideHeader2}>
                                <div className={Styles.mobileLogoHeafer}>
                                    <img src={Logo} alt="logo" />
                                </div>
                            <div className={Styles.langMenu}>
                                <LangDropDown />
                            </div>



                            <div>
                                <div className={Styles.circle}>
                                    <NotificationIcon width="1.2em"  height="1.2em" className="javIcon" />
                                </div>
                            </div>
                            <div className={Styles.userMenu}>
                                <UserMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DefaultMenu;
