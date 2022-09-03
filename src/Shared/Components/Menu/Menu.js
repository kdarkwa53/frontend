
import Styles from "./Menu.module.css";
import React from "react";
import UserMenu from "./UserMenu";
import LangDropDown from "../LangDropDown";
import { LeftArrowLinear, NotificationIcon } from "../JavIcons";
import { useHistory } from "react-router";



const MenuBar = () => {

  const history = useHistory()
  return (
    <>
      <div style={{ zIndex: 5 }} >
        <div className={Styles.head}>
          <div className={Styles.container}>
            <div className={Styles.header}>
              <div onClick={() => history.goBack()} className={Styles.backLink}>
                <LeftArrowLinear width="2em" /> <span style={{ marginLeft: "1em" }} >Back to home</span>
              </div>
              <div className={Styles.sideHeader}>
                <div className={Styles.langMenu}>
                  <LangDropDown />
                </div>
                <div>
                  <div>
                    <NotificationIcon width="1.2em" height="1.2em" className="javIcon" />
                  </div>
                </div>
                <div className={Styles.userMenu}>
                  <UserMenu />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
