

import { Modal, Form, Select, Button, Input, Divider } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { setSecurityQuestion } from '../duck/action';
import SwipeableViews from 'react-swipeable-views';
import "./SetSecurityQuestions.css"
import { useState } from 'react';
import SuccessTransaction from '../SuccessTransaction';
import { XIcon } from '../JavIcons';
import { useHistory } from 'react-router';



const SuccessQuestionsSet = ({ showModal, setModal }) => {
    
    return (
        <>
            <SuccessTransaction
                showModal={showModal}
                setShowModal={setModal}
                // handleClick={handleShowSuccessContinue}
                titleT="Security Questions Set Successfully"
                action={"continue"}
                msg={
                    <>You have successfully reset your security questions.
                    </>
                }
            />
        </>
    )
}

const SetSecurityQuestions = ({ isVisible, setIsModalVisible}) => {

    const { Option } = Select
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [indexValue, setIndexValue] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)


    const loading = useSelector((state) => state?.resources?.settingQuestion)
    const questions = useSelector((state) => state?.resources?.securityQuestions)

    const history = useHistory()
    const handleShowSuccess=()=>{
        // setShowSuccess(true)
        setIsModalVisible(false)
        history.push("/business/compliance")
        
    }

    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }

    const onFinish = (e) => {
        let nextMove = indexValue === 3 ? handleShowSuccess : nextSlide
        dispatch(setSecurityQuestion(e, form, nextMove))
        // if (indexValue === 3){
        //     setShowSuccess(true)
        //     // setIsModalVisible(false)
            
        // }
    }

    const handleCancel = ()=>{
        setIsModalVisible(false)
    }
    const Question = ({quesNum})=>{
        return(
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                style={{ width: "100%" }}
                onFinish={onFinish}
            >
                
                <div className="set-containter">
                    <h3 className="set-title">Set up your password reset questions</h3>
                    <p className='set-subtitle'>You will need to answer these question when you forget your password</p>
                    <div className="set-pager"><Divider ><span className='active-num'>{quesNum}</span> <span className='page-num'>/4</span></Divider></div>
                    <Form.Item
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: "Please select a question",
                            },

                        ]}>
                        <Select size='large' placeholder="Select a question" name="question" >
                            {
                                //dont display already answered questions
                                Object?.values(questions).filter(ques => ques?.selected !== false).map((ques)=>{
                                    return (
                                        <Option key={ques?.id} value={ques?.id}>{ques?.question}</Option>)
                               }
                                )}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        rules={[
                            {
                                required: true,
                                message: "Please select a question",
                            },

                        ]}>
                        <Input size="large" placeholder="Provide an answer" />
                    </Form.Item>

                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        size="large"
                        shape='round'
                        loading={loading}
                        style={{margin: "1em 0"}}
                    >
                        Save and Continue
                    </Button>
                </div>


            </Form>
        )
    }


    return (
        <>
            {/* <SuccessQuestionsSet
                showModal={true}
                setModal={setShowSuccess}
                /> */}
            <SuccessTransaction
                showModal={showSuccess }
                setShowModal={setShowSuccess}
                // handleClick={handleShowSuccessContinue}
                titleT="Security Questions Set Successfully"
                action={"continue"}
                msg={
                    <>You have successfully reset your security questions.
                    </>
                }
            />
            <Modal
                open={isVisible}
                onCancel={handleCancel}
                footer={false}
                closable={true}
                centered
                maskClosable={true}
                width={706}
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em"/>
                    </div>
                }
            >
                <SwipeableViews
                    axis='x'
                    index={indexValue}
                >
                    <Question quesNum="1"/>
                    <Question quesNum="2" />
                    <Question quesNum="3" />
                    <Question quesNum="4" />
                    <SuccessTransaction 
                        titleT="Security Questions Set"
                        msg="You have successfully set up your security questions. You will need them to reset your password if you forget it." 
                    />

                </SwipeableViews>
                   
            </Modal>
        </>
    )
}


export default SetSecurityQuestions