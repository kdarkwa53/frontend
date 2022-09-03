import { Modal, Button } from "antd";
import React, { useState } from "react"
import ThemeStyles from "../../style/Auth.module.css";
import { Form, Input, } from "antd";
import SwipeableViews from 'react-swipeable-views';
import Styles from "./Pin.module.css"
import { useDispatch, useSelector } from "react-redux";
import { ShieldIcon } from "../../Shared/Components/JavIcons"
import { setPin } from "./duck/action"
import SuccessTransaction from "./SuccessTransaction"


import {
    showErrorNotification,
} from "../actions/alert.actions";
import ErrorAlert from "./ErrorAlert";



const SetPin = ({ handleFocus, name, title, action, onClickAction, hasError, loadingBtn, pinTrim,}) => {
    return (
        <>
            <div className={Styles.center} style={{ marginTop: "70px" }}>
                <p style={{ width: "300px", textAlign: "center" }} className={Styles.subTitle}>
                    {title}
                </p>
                <Form.Item
                    name={name}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the code here",
                        },
                        () => ({
                            validator(_, value) {
                                if (name === "confirm_pin") {
                                    if (
                                        !value ||
                                        pinTrim === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two pins that you entered do not match!"
                                        )
                                    );
                                }

                            },
                        }),
                    ]}
                >
                    <div className={ThemeStyles.pinInput}>
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(0, e.target)} />
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(1, e.target)} />
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(2, e.target)} />
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(3, e.target)} />
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(4, e.target)} />
                        <Input size="large" maxLength={1} type="number" name={name} onChange={(e) => handleFocus(5, e.target)} />
                    </div>
                    <ErrorAlert msg={hasError?.msg} show={hasError?.isError} />
                </Form.Item>
                <Button
                    block
                    size="large"
                    style={{ marginTop: "2em" }}
                    type="primary"
                    onClick={onClickAction}
                    loading={loadingBtn}
                >
                    {action}
                </Button>
            </div>
        </>
    )
}

const SetPinMessage = ({ handleCancel, next }) => {
    return (
        <>
            <div className={Styles.center}>
                <div className={Styles.iconCircle}>
                    <ShieldIcon style={{ border: "1px" }} width="4em" height="auto" color="#DB211E" />
                </div>
                <h2 className={Styles.title}>Secure your account</h2>
                <p style={{ color: "#888B93", }} className="textCenter">You must set a new PIN to secure your account and be able to perform your first transaction.</p>
                <Button
                    block
                    size="large"
                    style={{ marginTop: "2em" }}
                    type="primary"
                    onClick={next}
                >
                    Set new PIN
                </Button>
                {/* <div onClick={handleCancel} className={Styles.footer}>Set later</div> */}
            </div>
        </>
    )
}

const SetPinSuccess = ({ pin }) => {
    return (
        <>
            <SuccessTransaction
                titleT="PIN Set Successful"
                msg={
                    <>You have successfully reset your pin.
                        Your new pin is <span style={{ fontWeight: "bold", color: "#000C26" }}>{pin}</span>.
                        You are ready to perform your first transaction.
                    </>
                }
            />
        </>
    )
}

const Pin = ({ isPinSetVisible, setIsPinSetVisible, showSecurityQuestions}) => {
    const state = useSelector((state) => state.pin)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [pinTrim, setPinTrim] = useState('')
    const [indexValue, setIndexValue] = useState(0)
    const [hasError, setError] = useState({ isError: false, msg: "" })
    let codeP = []
    let codeP2 = []


    const handleCancel = () => {
        setIsPinSetVisible(false);
        showSecurityQuestions(true)
    };

    const onCreate = () => {
        let confirmPin = codeP2.toString().replaceAll(',', '')

        if (pinTrim !== confirmPin) {
            dispatch(
                showErrorNotification("Pin did not match")
            );
            setError({ isError: true, msg: "Pin did not match" })
            prevSlide()

        } else {
            dispatch(setPin({ "passcode": pinTrim }, nextSlide))
        }

    }
    const handleOk = () => {
        if (indexValue < 1) {
            nextSlide()
        } else {
            if (indexValue === 1) {
                if (codeP.length < 6 && !pinTrim) {
                    setError({ isError: true, msg: "6-digit pin must be set" })
                } else {
                    setError({ isError: false, msg: "" })
                    setPinTrim(codeP.toString().replaceAll(',', ''))
                    nextSlide()
                }
            } else if (indexValue === 2) {
                if (codeP2.length < 6 && !pinTrim) {
                    setError({ isError: true, msg: "6-digit pin must be set" })
                } else {
                    onCreate()
                }
            }
        }
    }

    const handleFocus = (i, e) => {

        let name = e.name
        if (name === "pin") {
            codeP[i] = e.value
        } else if (name === "confirm_pin") {
            codeP2[i] = e.value
        }

        if (e.nextSibling)
            e.nextSibling.focus()

    }



    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }

    const prevSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex - 1
        setIndexValue(newIndex)
    }

    return (
        <Modal
            visible={isPinSetVisible}
            className={Styles.popupModals}
            footer={false}
            closable={indexValue < 4 ? false : true}
            centered
            maskClosable={indexValue < 3 ? false: true}
            onCancel={handleCancel}>
                

            <Form
                form={form}
                name="normal_login"
                // className={indexValue === 3 ? Styles.star_bg : ""}
            >
                <SwipeableViews
                    axis='x'
                    index={indexValue}
                >
                    <SetPinMessage handleCancel={handleCancel} next={nextSlide} />
                    <SetPin handleFocus={handleFocus} name="pin"
                        title="Enter a 6-digit PIN that you can remember"
                        action="Set pin"
                        onClickAction={handleOk}
                        hasError={hasError}
                    />
                    <SetPin handleFocus={handleFocus} name="confirm_pin"
                        title="Re-enter the 6-digit PIN you chose"
                        action="Confirm pin"
                        onClickAction={handleOk}
                        hasError={hasError}
                        loadingBtn={state.settingPin}
                        pinTrim={pinTrim}
                    />
                    <SetPinSuccess pin={pinTrim} />
                </SwipeableViews>
            </Form>
        </Modal>
    )
}

export default Pin

