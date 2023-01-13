import React from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import { Button, Form, } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { resendOTP, verifyPhone } from "../duck/action"
import PhoneImage from "../../../assets/phoneVer.png"
import Logo from "../../../assets/javolin_logo.png";
import OtpInput from "react-otp-input";
import { formatNumber } from "../../../helpers/contants";


const PhoneVerification = (props) => {
    const dispatch = useDispatch()
    const { state } = props.location
    console.log("state: ", state)
    const history = useHistory()
    const login = useSelector((state) => state?.login);

    const handleOPTResend = () => {
        dispatch(resendOTP(formatNumber(state?.phone_number)))
    }
    const onFinish = (values) => {
        let phoneNum =  state?.phone_number
        dispatch(verifyPhone(values?.pin, phoneNum, history))
    }
    return (
        <>
            <div className={ThemeStyles.cardContent}>
                <div className={ThemeStyles.smallScreenLogo}>
                    <img src={Logo} alt="javolin logo" />
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <div className={ThemeStyles.iconHead} style={{ display: "flex", justifyContent: "center" }}>
                        <img align="center" src={PhoneImage} alt="phone icon" />
                    </div>
                    <div style={{textAlign: "center"}} className={ThemeStyles.authTitle}>
                        Enter Verification Code
                    </div>
                    <p style={{ textAlign: "center" }} className={ThemeStyles.subInfo}>
                        We have sent a 6-digit code to your phone and email <span className={ThemeStyles.subBoldGray}> {`${state?.email} | ${state?.phone_number}`}</span>
                    </p>
                    <Form.Item
                        name={["pin"]}
                        rules={[
                            {
                                required: true,
                                message: "Please enter the 6-digit code here",
                            },
                        ]}
                    >
                        <OtpInput
                            inputStyle={{ width: "100%", padding: "1em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                            containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "5px", width: "100%", margin: "0.5em" }}
                            numInputs={6}
                        />
                    </Form.Item>

                    <Button
                        block
                        size="large"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={login.verifying}
                    >
                        submit
                    </Button>
                </Form>
                <div className={ThemeStyles.footerMsg}>
                    <div className={ThemeStyles.footerContent}>
                        Didn't receive code? <span style={{ color: '#467fcf', cursor: 'pointer' }} onClick={handleOPTResend}>Resend code to phone </span>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PhoneVerification;
