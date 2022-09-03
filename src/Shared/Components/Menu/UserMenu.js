import { Badge, Avatar } from "antd";
import React from "react";
import styles from "./Menu.module.css"; // Import css modules stylesheet as styles
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const userDetails = useSelector((state) => state?.user);
  // const text = useSelector((state) => state.language)
  const accountType = userDetails?.type


  return (
    <div className={styles.userDetails}>
      <div >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>

          <div style={{ display: "flex", alignItems: "center" }} >
            <div className={styles.userName}>
              {
                accountType === "business" ? userDetails?.business_name : userDetails?.first_name
              }
            </div>
          </div>

          <div className={styles.avatar}>
            <span>
              <Badge style={{ backgroundColor: "green" }} dot>
                <Avatar src={userDetails?.image_url} icon={<UserOutlined />} />
              </Badge>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
