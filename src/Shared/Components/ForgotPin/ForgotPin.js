


import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react"
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { changePin, verifySecurityQuestion } from "../../../Modules/Profile/duck/action";
import Styles from "../../../Modules/Profile/Profile.module.css"
import { setPin } from "../duck/action";
import SuccessTransaction from "../SuccessTransaction";




const ForgotPin = () => {
    const state = useSelector((state) => state?.resources?.userSecurityQuestions)
    const profileLoading = useSelector((state) => state?.profile?.updatingProfile)
    const loading = useSelector((state) => state.pin.settingPin)
    const [isVisible, setVisible] = useState(false)
    
    const handleCancel = () => {
        setVisible(false);
    };

    const showModal = ()=>{
        setVisible(true)
    }

    const questions = Object.values(state)
   
    const randomQuestion = questions[0]
    const [indexValue, setIndexValue] = useState(0)
    const dispatch = useDispatch()
    const [form] = useForm();




    const onFinish = (values) => {
        console.log("here")
        dispatch(setPin({ "passcode": values.passcode }, nextSlide))
    }

    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }

    const onSubmitSecurityAnswer = (values) => {
        values = {
            ...values,
            security_question_id: randomQuestion?.id
        }
        dispatch(verifySecurityQuestion(values, nextSlide))
    }

    const Question = ({question})=>{
        return(
            
                    <div key={question?.id}>
                        
                        <div className={Styles.editTitle}>Forgot Pin</div>
                        <Form
                            // form={form}
                            layout="vertical"
                            name="profile_form"
                            style={{ width: "100%" }}
                            // form={[useForm]}
                            onFinish={onSubmitSecurityAnswer}
                        >

                            <div className={Styles.subMsg}>You will need to answer this question to reset your pin</div>

                            <div>
                                <div className={Styles.inputTitle}>Question</div>

                                <div className={Styles.inputMsg}>{question?.question}</div>

                            </div>

                            <div>
                                <div className={Styles.inputTitle}>Answer</div>
                                <Form.Item
                                    name="answer"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" placeholder='Enter answer' />
                                </Form.Item>
                            </div>

                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                size="large"
                                style={{ marginTop: "1em" }}
                                loading={profileLoading}
                            >
                                Continue
                            </Button>
                            {/* <div className={Styles.editFooter}>Use security questions instead</div> */}
                        </Form>
                    </div>
          
        )
    }

    const SetPinSuccess = ({ pin }) => {
        return (
            <>
                <SuccessTransaction
                    titleT="PIN Reset Successful"
                    msg={
                        <>You have successfully reset your pin.
                            Your new pin is <span style={{ fontWeight: "bold", color: "#000C26" }}>{pin}</span>.
                        </>
                    }
                />
            </>
        )
    }
    const SetPin = ()=>{
        return(
            <Form
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                onFinish={onFinish}
            >

                <div className={Styles.editTitle}>Set Pin</div>
                <div>
                    
                    <div className={Styles.inputTitle}>Pin</div>
                    <Form.Item
                        noStyle
                        name="passcode"
                        rules={[
                            {
                                required: true,

                            },
                        ]}
                    >
                        <OtpInput
                            inputStyle={{ width: "100%", padding: "1em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                            containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "5px", width: "100%", maxWidth: "450px", margin: "0.5em" }}
                            numInputs={6}
                        />
                    </Form.Item>
                    <div className={Styles.inputTitle}>Confirm Pin</div>
                    <Form.Item
                        noStyle
                        name="confirm_passcode"
                        dependencies={["passcode"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your pin!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("passcode") === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two pins that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <OtpInput
                            inputStyle={{ width: "100%", padding: "1em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                            containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "5px", width: "100%", maxWidth: "450px", margin: "0.5em" }}
                            numInputs={6}
                        />
                    </Form.Item>




                </div>

                

                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    style={{ marginTop: "1em" }}
                    loading={loading}
                >
                    Submit
                </Button>
            </Form>
        )
       
    }
    return (
        <>
        <p style={{ color: "#0032A0", margin: "1em 0", cursor: "pointer"}} onClick={showModal}>
            Forgot PIN
        </p>
        <Modal
            visible={isVisible}
            centered
            footer={false}
            closable={false}
            onCancel={handleCancel}
        >

                <SwipeableViews
                    axis='x'
                    index={indexValue}
                    width="1000px"
                >
                    <Question question={questions[0]} />
                    <Question question={questions[1]} />
                    <Question question={questions[3]} />
                    <SetPin/>
                    <SetPinSuccess pin={form.getFieldValue("passcode")} />

                   
                </SwipeableViews>


        </Modal>
        </>
    )
}

export default ForgotPin