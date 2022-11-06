import { Modal, Button } from "antd";
import React, { useState } from "react"
import ThemeStyles from "../../../style/Auth.module.css";
import { Form, Input, } from "antd";
import SwipeableViews from 'react-swipeable-views';
import Styles from "../Pin.module.css"
import { useDispatch } from "react-redux";
import { setPin } from "../duck/action"
import SuccessTransaction from "../SuccessTransaction"


import {
    showErrorNotification,
} from "../../actions/alert.actions";
import ErrorAlert from "../ErrorAlert";



const EnterOTP = ({ handleFocus, name, title, msg, action, onClickAction, hasError, loadingBtn }) => {
    return (
        <>
            <div className={Styles.center} style={{ marginTop: "70px" }}>
                <div className={Styles.title}>{title}</div>
                <p className={Styles.subTitle}>
                    {msg}
                </p>
                <Form.Item
                    name={name}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the code here",
                        },
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
                    <ErrorAlert msg="6-digit pin must be set" show={hasError} />
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


const SetPinSuccess = ({ email }) => {
    return (
        <>
            <SuccessTransaction
                titleT="Email sent"
                msg={
                    <>You have successfully change your email.
                        Your new pin is <span style={{ fontWeight: "bold", color: "#000C26" }}>{email}</span>.
                        You are ready to perform your first transaction.
                    </>
                }
            />
        </>
    )
}

const ChangeEmailPopUp = ({email}) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [pinTrim, setPinTrim] = useState('')
    const [indexValue, setIndexValue] = useState(0)
    const [hasError, setError] = useState(false)
    const [isPinSetVisible, setIsPinSetVisible] = useState(false)
    let codeP = []
    let codeP2 = []

    const showModal = () => {
        setIsPinSetVisible(true)
    }
    const handleCancel = () => {
        setIsPinSetVisible(false);
    };

    const onCreate = () => {
        let confirmPin = codeP2.toString().replaceAll(',', '')

        if (pinTrim !== confirmPin) {
            dispatch(
                showErrorNotification("Pin did not match")
            );


        } else {
            dispatch(setPin({ "passcode": pinTrim }, nextSlide))
        }

    }
    const handleOk = () => {
        if (indexValue < 1) {
            nextSlide()
        } else {
            if (indexValue === 1) {
                if (codeP.length < 6) {
                    setError(true)
                } else {
                    setError(false)
                    setPinTrim(codeP.toString().replaceAll(',', ''))
                    nextSlide()
                }
            } else if (indexValue === 2) {
                if (codeP2.length < 6) {
                    setError(true)
                } else {
                    onCreate();
                }
            }
        }
    }

    const handleFocus = (i, e) => {

        codeP[i] = e.value
        if (e.nextSibling)
            e.nextSibling.focus()

    }



    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }

    return (
        <>
            <Button
                type="primary"
                block
                htmlType="submit"
                size="large"
                style={{ marginTop: "1em" }}
                onClick={showModal}

            >
                Submit
            </Button>
            <Modal
                visible={isPinSetVisible}
                className={Styles.popupModals}
                footer={false}
                closable={false}
                onCancel={handleCancel}>

                <Form
                    form={form}
                    name="normal_login"
                    className={indexValue === 3 ? Styles.star_bg : ""}
                >
                    <SwipeableViews
                        axis='x'
                        index={indexValue}
                    >
                        <EnterOTP handleFocus={handleFocus} name="pin"
                            title="Check your email"
                            msg="We have sent a 6-digit code to your new email samteni@gmailcom"
                            action="Submit"
                            onClickAction={handleOk}
                            hasError={hasError}
                        />

                        <SetPinSuccess email="kwabenaadudarkwa@gmail.com" />
                    </SwipeableViews>
                </Form>
            </Modal>
        </>
    )
}

export default ChangeEmailPopUp

