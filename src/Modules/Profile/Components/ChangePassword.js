

import { Form, Input, Button } from 'antd'
import {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, verifySecurityQuestion } from '../duck/action'
import Styles from "../Profile.module.css"
import SwipeableViews from 'react-swipeable-views';
import { useForm } from 'antd/lib/form/Form'


const ChangePassword = () => {
    const dispatch = useDispatch()

    const text = useSelector((state) => state?.language)


    const state = useSelector((state) => state?.resources?.userSecurityQuestions)
    const profileLoading = useSelector((state) => state?.profile?.updatingProfile)

    const questions = Object.values(state)
    const [formOne] = useForm();
    const [formTwo] = useForm();
    const randomQuestion = questions[0]
    const [indexValue, setIndexValue] = useState(0)
  
    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }

    const onSubmitSecurityAnswer = (values)=>{
        values = {
            ...values,
            security_question_id: randomQuestion?.id
        }
        dispatch(verifySecurityQuestion(values, nextSlide))
    }

    const onSubmitPasswordChange = (values) => {

        dispatch(changePassword(values, formTwo))
    }


    

    return (
        <>
            <SwipeableViews
                axis='x'
                index={indexValue}
                width="1000px"
            >
                <div>
                        <div className={Styles.editTitle}>{text.CHANGE_PASSWORD}</div>
                        <Form
                            // form={form}
                            layout="vertical"
                            name="profile_form"
                            style={{ width: "100%" }}
                        form={formOne}
                        onFinish={onSubmitSecurityAnswer}
                        >

                            <div className={Styles.subMsg}>{text.CHANGE_PASSWORD_MSG}</div>

                            <div>
                                <div className={Styles.inputTitle}>{text.QUESTION}</div>

                                <div className={Styles.inputMsg}>{randomQuestion?.question}</div>

                            </div>

                            <div>
                                <div className={Styles.inputTitle}>{text.ANSWER}</div>
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
                                {text.CONTINUE}
                            </Button>
                            {/* <div className={Styles.editFooter}>Use security questions instead</div> */}
                        </Form>
                </div>
                <div>
                        <Form
                            // form={form}
                            layout="vertical"
                            name="profile_form"
                            style={{ width: "100%" }}
                        onFinish={onSubmitPasswordChange}
                        form={formTwo}
                        >

                        <div className={Styles.subMsg}>{text.SECURITY_QUESTIONS_INTRO}</div>

                            <div>
                                <div className={Styles.inputTitle}>{text.OLD_PASSWORD}</div>
                                <Form.Item
                                name="current_password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                <Input.Password type={'password'} size="large" placeholder='Enter your current password' />
                                </Form.Item>
                            </div>

                            <div>
                            <div className={Styles.inputTitle}>{text.NEW_PASSWORD}</div>
                                <Form.Item
                                name="new_password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                <Input.Password type={'password'} size="large" placeholder='Enter new password' />
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
                            {text.SUBMIT}
                            </Button>
                        </Form>
                </div>
            </SwipeableViews>
          
        </>
    )
}

export default ChangePassword