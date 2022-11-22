import { Modal } from "antd";
import React, { useState } from "react"
import { Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Styles from "./Pin.module.css"
import { useHistory } from "react-router";
import SwipeableViews from 'react-swipeable-views';
import SuccessTransaction from "./SuccessTransaction";
import OtpInput from "react-otp-input";
import ForgotPin from "./ForgotPin/ForgotPin";


const PassCode = ({ isPassCodeVisible, setPassCodeVisible, action, details, buttonloading, approving, showApproving }) => {
    const [indexValue] = useState(0)
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const error = useSelector((state) => state?.transfer.errMsg)


    const handleCancel = () => {
        setPassCodeVisible(false);
    };


    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const passcode = {
                    "app_passcode": values?.pin
                }
                let body = {
                    ...details,
                    ...passcode,
                }
                if (showApproving){
                    dispatch(action(body, setPassCodeVisible, showApproving, history))
                }else{
                    dispatch(action(body, setPassCodeVisible, form, history))
                }
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });

    }

    




    const EnterPin = React.memo(() => {
        return (
            <Form
                form={form}
                name="normal_login"
                className="login-form"
            >
                {/* <ReviewPopUp isPinSetVisible={isPassCodeVisible} setIsPinSetVisible={setPassCodeVisible} /> */}
                <div className={Styles.center} style={{ marginTop: "70px" }}>
                    <p style={{ width: "300px", textAlign: "center" }} className={Styles.subTitle}>
                        Enter your 6-digit PIN to complete transaction
                    </p>
                    <Form.Item
                        name="pin"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the code here",
                            },
                        ]}
                    >
                        <OtpInput
                            inputStyle={{ width: "100%", padding: "0.2em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                            containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "1px", width: "100%", maxWidth: "600px", margin: "0.2em" }}
                            numInputs={6}
                        />
                    </Form.Item>

                    <p style={{color: "red", fontSize: "15px", cursor: "pointer"}} className={Styles.errMessage}>
                        {/* {error} */}
                    </p>

                    <Button
                        block
                        size="large"
                        style={{ marginTop: "2em" }}
                        type="primary"
                        onClick={handleSubmit}
                        loading={buttonloading}

                    >
                        Confirm transaction
                    </Button>
                        <ForgotPin/>
                </div>
            </Form>
        )
    })
    return (
        <Modal
            style={{ top: 250 }}
            visible={isPassCodeVisible}
            footer={false}
            closable={false}
            onCancel={handleCancel}>

            <SwipeableViews
                axis='x'
                index={indexValue}
            >
                <EnterPin />
                <SuccessTransaction
                    titleT="Transaction successful"
                    msg=""
                    action="Go to history"
                    link="/transactions"
                />
            </SwipeableViews>
        </Modal>
    )
}

export default React.memo(PassCode)