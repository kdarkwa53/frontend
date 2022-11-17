import { Badge, Avatar, Dropdown, message } from "antd";
import React from "react";
import styles from "./Menu.module.css"; // Import css modules stylesheet as styles
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CaretDown, LogOutIcon, UserTag2 } from "../JavIcons";
import { useHistory } from "react-router";
import { userLogout } from "../../../Modules/Login/duck/action";


const UserMenu = () => {
  const userDetails = useSelector((state) => state?.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const accountType = userDetails?.type

  const logout = () => {
    dispatch(userLogout(history,"business"))
};
  const items = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserTag2 style={{width: "2em"}}/>,
      onClick: ()=> {
        history.push("/business/profile")
      }
    },
    {
      label: 'logout',
      key: '2',
      icon: <LogOutIcon className={styles.menuIcon} stroke="iconStroke" width="2em" height="2em" />,
      onClick: ()=> {
        logout()
      }
    },
   
  ];


  return (
    <div className={styles.userDetails}>
      <div >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>

          <div className={styles.avatar}>
            <span>
              <Badge style={{ backgroundColor: "green" }}>
                <Avatar src={userDetails?.image_url} icon={<UserOutlined />} />
              </Badge>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }} >
            <Dropdown
                menu={{
                  items,
                  // onClick,
                }}
                trigger={['click']}
              >
                <div className={styles.userName}>
                  {
                    accountType === "business" ? userDetails?.business_name : userDetails?.first_name
                  }
                  <div style={{marginLeft: "0.5em"}}>
                    <CaretDown width={"1em"} color="#727986" />
                  </div>
            </div>
          </Dropdown>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserMenu;
