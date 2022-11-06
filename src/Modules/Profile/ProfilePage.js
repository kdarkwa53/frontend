import React, { useState } from "react"
import Styles from "./Profile.module.css"
import { Edit2Icon, HeadPhone, SMSEdit, UserTag } from "../../Shared/Components/JavIcons"
import { Avatar, Col, Row } from "antd";
import EditCard from "../../Shared/Components/EditCard/EditCard";
import ProfileDetails from "./Components/ProfileDetails";
import ChangeEmail from "./Components/ChangeEmail";
import ChangePhoneNumber from "./Components/ChangePhoneNumber";
import ChangePassword from "./Components/ChangePassword";
import ProfilePicturePopUp from "./Components/ProfilePicturePopUp";
import { useSelector } from "react-redux";
import ChangePin from "./Components/ChangePin";
import GetHelp from "./Components/GetHelp";

const ProfilePage = () => {

    const text = useSelector((state) => state?.language)

    const editSectionView = {
        "changeEmail": <ChangeEmail />,
        "changePassword": <ChangePassword />,
        "changePhone": <ChangePhoneNumber />,
        "profileDetails": <ProfileDetails />,
        "changePin": <ChangePin/>,
        "getHelp": <GetHelp/>
    }

    const handleViewChange = (val) => {
        setView(val)
    }

    const [view, setView] = useState("profileDetails")
    const [showPic, setShowPic] = useState('')
    const state = useSelector((state) => state?.user)
    const { first_name, last_name, email, phone_number } = state
    const handleShowPic = () => {
        setShowPic(true)
    }
    return (
        <>
            <ProfilePicturePopUp showPic={showPic} setShowPic={setShowPic} />
            <div className={Styles.pageContainer}>
                <div className={Styles.avatarSection}>
                    <div onClick={handleShowPic}>
                        <Avatar
                            size={{ xs: 120, sm: 120, md: 150, lg: 150, xl: 100, xxl: 200 }}
                            style={{
                                backgroundColor: '#0032A0',
                                marginRight: '1em'
                            }}
                            src={state?.image_url}

                        >
                            <span style={{ fontSize: "23px", fontWeight: "bold" }}>KT</span>
                        </Avatar>
                        <Avatar
                            size={{ xs: 24, sm: 24, md: 24, lg: 48, xl: 48, xxl: 48 }}
                            className={Styles.editAvatar}
                            icon={<Edit2Icon width="1em" color="#0032A0" />}

                        />
                    </div>
                    <div className={Styles.profileUserSum}>
                        <div className={Styles.profileSumName}>{`${first_name} ${last_name}`}</div>
                        <div className={Styles.profileSumEmail}>{email || phone_number}</div>
                    </div>
                </div>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <div className={Styles.profileSection}>
                            <div className={Styles.profSec}>
                                <EditCard
                                    icon={<UserTag width="1.5em" height="1.5em" color="" />}
                                    label={text.PERSONAL_INFO}
                                    background={view === "profileDetails" ? "#F0F4FD" : ""}
                                    onClick={(e) => handleViewChange("profileDetails")}
                                />
                                
                                {/* <EditCard
                                    icon={<CallReceived width="1.5em" height="1.5em" color="" />}
                                    background={view === "changePhone" ? "#F0F4FD" : ""}
                                    onClick={(e) => handleViewChange("changePhone")}
                                    label="Change phone number"
                                /> */}
                                <EditCard
                                    icon={<UserTag width="1.5em" height="1.5em" color="" />}
                                    background={view === "changePassword" ? "#F0F4FD" : ""}
                                    onClick={(e) => handleViewChange("changePassword")}
                                    label={text.CHANGE_PASSWORD}
                                />
                                <EditCard
                                    icon={<SMSEdit width="1.5em" height="1.5em" color="" />}
                                    background={view === "changePin" ? "#F0F4FD" : ""}
                                    onClick={(e) => handleViewChange("changePin")}
                                    label={text.CHANGE_PIN}
                                />
                                <EditCard
                                    icon={<HeadPhone width="1.5em" height="1.5em" color="" />}
                                    onClick={(e) => handleViewChange("getHelp")}
                                    label={text.GET_HELP}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <div className={Styles.editSection}>

                            {editSectionView[view]}
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default ProfilePage
