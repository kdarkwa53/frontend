import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react"
import ThemeStyles from "../../style/Auth.module.css";
import { Form, Input, } from "antd";
import SwipeableViews from 'react-swipeable-views';
import Styles from "./Pin.module.css"
import { useDispatch, useSelector } from "react-redux";
import { ShieldIcon, XIcon } from "../../Shared/Components/JavIcons"
import { getAllSecurityQuestions, setPin } from "./duck/action"
import SuccessTransaction from "./SuccessTransaction"


import {
    showErrorNotification,
} from "../actions/alert.actions";
import ErrorAlert from "./ErrorAlert";
import { TaskTodo } from "./InitialSetup/InitialSetup";



const SetPin = ({ handleFocus, name, desc, title, action, onClickAction, hasError, loadingBtn, pinTrim, progress,  }) => {
    return (
        <>
            <IntroHead
            bg={"#ECF7E8"}
            title={title}
            desc={"Set your PIN to secure your account"}
            children={progress}
            />
            <div className={Styles.center} style={{ marginTop: "70px" }}>
                <p style={{ fontSize: "24px", textAlign: "center", color: "#727986" }} className={Styles.subTitle}>
                {desc}
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
                    style={{margin: "2em 0 1em"  }}
                    type="primary"
                    onClick={onClickAction}
                    loading={loadingBtn}
                    shape="round"
                >
                    {action}
                </Button>
            </div>
        </>
    )
}

const IntroHead = ({title, desc, bg, children, close})=>{
    return(
            <div style={{background: bg}} className={Styles.head}>
                <div style={{padding: "10px 20px", width: "100%"}}>
                    <h2 style={{marginTop:"0"}} className={Styles.title}>{title}</h2>
                    <p className={Styles.subTitle}>{desc}</p>
                    {children}
                </div>
            </div>
    )
}
const SetPinMessage = ({ handleCancel, next }) => {
    return (
        <>
            <IntroHead
            bg={"linear-gradient(90deg, #FBED96 0%, #ABECD6 100%)"}
            title={"Welcome to Javolin Forex"}
            desc={"Welcome to Javolin. Get to know more about how to get started on our forex platform"}
            
            />
            <div className={Styles.center}>
                     <div style={{ fontSize: "20px", textAlign: "center", fontWeight: "450", color: "#727986" }}>WHAT'S NEXT</div>
                    <div style={{ fontSize: "28px", textAlign: "center", fontWeight: "700", color: "#0032A0" }}>Let’s secure your account</div>
                <div style={{ padding: "0 20px", width: "100%"}} >
                    <TaskTodo title={"Secure your Account"} desc="Choose a 6-digit PIN you will remember" fontSub={"20px"} />
                    <TaskTodo title={"Business KYC"} desc="Repeat your PIN to confirm" fontSub={"20px"} />
                </div>
                <Button
                    shape="round"
                    block
                    size="large"
                    style={{ margin: "2em 0 1em" }}
                    type="primary"
                    onClick={next}
                
                >
                    Continue
                </Button>
                {/* <div onClick={handleCancel} className={Styles.footer}>Set later</div> */}
            </div>
        </>
    )
}



const Pin = ({ isPinSetVisible, setIsPinSetVisible, showSecurityQuestions }) => {
    const state = useSelector((state) => state.pin)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [pinTrim, setPinTrim] = useState('')
    const [indexValue, setIndexValue] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const [hasError, setError] = useState({ isError: false, msg: "" })
    let codeP = []
    let codeP2 = []

    useEffect(()=>{
        dispatch(getAllSecurityQuestions())
    })

    const SetPinSuccess = ({showSuccess,setShowSuccess, showSecurityQuestions }) => {
        const handleShowSuccessContinue = ()=>{
            console.log('close and open questions')
            showSecurityQuestions(true)
            setShowSuccess(false)
        }
        return (
            <>
                <SuccessTransaction
                    showSuccess={showSuccess}
                    setShowSuccess ={setShowSuccess}
                    handleClick={handleShowSuccessContinue}
                    titleT="PIN Set Successful"
                    action={"continue"}
                    msg={
                        <>You have successfully reset your pin.
                        </>
                    }
                />
            </>
        )
    }

    const handleCancel = () => {
        setIsPinSetVisible(false);
    };
    const handleShowSuccess=()=>{
        // setShowSuccess(true)
        setIsPinSetVisible(false)
        showSecurityQuestions(true)
    }

    const onCreate = () => {
        let confirmPin = codeP2.toString().replaceAll(',', '')

        if (pinTrim !== confirmPin) {
            dispatch(
                showErrorNotification("Pin did not match")
            );
            setError({ isError: true, msg: "Pin did not match" })
            prevSlide()

        } else {
            dispatch(setPin({ "passcode": pinTrim }, handleShowSuccess))
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
            width={706}
            closable={true}
            centered
            closeIcon={
                <div className={Styles.circleClose}>
                    <XIcon width="1em" />
                 </div>
            }
            maskClosable={indexValue < 3 ? false : true}
            onCancel={handleCancel}
            bodyStyle={
                {
                    padding: "0"
                }
            }
        >



            <Form
                form={form}
                name="normal_login"
              >
                <SetPinSuccess 
                showSuccess={ showSuccess } 
                setShowSuccess={setShowSuccess} 
                showSecurityQuestions={showSecurityQuestions} 
                /> 

                <SwipeableViews
                    axis='x'
                    index={indexValue}
                >
                    <SetPinMessage handleCancel={handleCancel} next={nextSlide} />
                    <SetPin handleFocus={handleFocus} name="pin"
                        title="Set your PIN"
                        action="Set pin"
                        onClickAction={handleOk}
                        hasError={hasError}
                        desc={"Set your PIN to secure your account"}
                        progress={
                            <div className={Styles.progressBar}>
                                <div style={{marginRight: "0.2em"}} className={Styles.progress}>
                                </div>
                                <div style={{background: "#B8CDB2"}} className={Styles.progress}>
                                </div>
                            </div>
                        }
                    />
                    <SetPin handleFocus={handleFocus} name="confirm_pin"
                        title="Set your PIN"
                        action="Confirm pin"
                        onClickAction={handleOk}
                        hasError={hasError}
                        loadingBtn={state.settingPin}
                        pinTrim={pinTrim}
                        desc={"Repeat your PIN to confirm"}
                        progress={
                            <div className={Styles.progressBar}>
                                <div style={{marginRight: "0.2em"}} className={Styles.progress}>
                                </div>
                                <div  className={Styles.progress}>
                                </div>
                            </div>
                        }
                    />
                </SwipeableViews>
            </Form>
        </Modal>
    )
}

export default Pin

