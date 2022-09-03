import { Modal, Input, Button, Radio, Space } from "antd";
import React, { useState } from "react"
import { Form } from "antd";
import SwipeableViews from 'react-swipeable-views';
import { useDispatch, useSelector } from "react-redux";
import { RightArrow } from "../../Shared/Components/JavIcons"
import Styles from "./PreQualification.module.css"
import SlideTemplate from "./Components/SlideTemplate";
import validateMessages from "../../helpers/validateMessages";
import ProgressBar from "../../Shared/Components/ProgressBar";
// import { setPin } from "./duck/action"

import {
    showErrorNotification,
} from "../../Shared/actions/alert.actions"


const BusinessPreqModal = ({ showModal, setModal }) => {
    const state = useSelector((state) => state.pin)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [indexValue, setIndexValue] = useState(0)
    // const [answered, setAnswered] = useState(false)
    const [info, setInfo] = useState({ loanAmount: "" })
    const [formState, setFormState] = useState("")
    const [progress, setProgress] = useState(10)


    const handleValueChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        console.log(value)
        // setAnswered(true)
        setInfo(
            {
                ...info,
                [name]: value
            }
        )
    }



    const handleCancel = () => {
        setModal(false);
    };


    const handleNext = () => {
        form
            .validateFields()
            .then((values) => {

                if (indexValue < 14) {
                    setFormState({
                        ...formState,
                        ...values,
                    })
                    nextSlide()
                } else {
                    // onCreate(values, form);
                }
            })
            .catch((info) => {
                dispatch(showErrorNotification(info.errorFields[0].errors))
            });

    }





    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        let newProgress = progress
        newProgress += 10
        setProgress(newProgress)
        setIndexValue(newIndex)
    }

    const prevSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex - 1

        setIndexValue(newIndex)
    }


    return (
        <Modal
            visible={showModal}
            okButtonProps={{ loading: state.settingPin }}
            onCancel={handleCancel}
            width={1000}

            footer={null}
            closable={false}
        >

            <Form
                form={form}
                name="normal_login"
                className={Styles.preq_bg}
                // onFinish={handleNext}
                validateMessages={validateMessages}
            >
                {indexValue > 0 ? (
                    <div style={{ cursor: 'pointer' }} className={Styles.back} onClick={prevSlide}>
                        <RightArrow color="gray" width="10px" />
                        <div> back</div>
                    </div>
                ) : ""}
                <ProgressBar size="sm" percentage={progress}></ProgressBar>
                <div className={Styles.contentArea}>

                    <SwipeableViews
                        axis='x'
                        index={indexValue}
                        width="1000px"
                    >
                        <SlideTemplate
                            question="What is the legal name of your business?"
                            answer={
                                // <Form.Item style={{ width: "100%" }} rules={[{ required: "true" }]} name="businessName">
                                <Input onChange={handleValueChange} size="large" value={info["businessName"]} name='businessName' />
                                // </Form.Item>
                            }
                        />
                        <SlideTemplate
                            question="Who is the primary owner of the business?"
                            answer={
                                <Input onChange={handleValueChange} size="large" value={info["owner"]} name='owner' />}
                        />
                        <SlideTemplate
                            question="Please provide phone numbers for the business office and primary owner"
                            answer={
                                // <Form.Item style={{ width: "100%" }} rules={[{ required: "true" }]} name="phone">
                                <Input onChange={handleValueChange} size="large" value={info["phone"]} name='phone' />
                                // </Form.Item>
                            }
                        />
                        <SlideTemplate
                            question="What’s the physical address of the business?"
                            answer={
                                // <Form.Item style={{ width: "100%" }} rules={[{ required: "true" }]} name="address">
                                <Input onChange={handleValueChange} size="large" value={info["address"]} name='address' />
                                // </Form.Item>
                            }
                        />
                        <SlideTemplate
                            question="Is this an import or export trading businesses?"
                            answer={
                                // <Form.Item style={{ width: "100%" }} rules={[{ required: "true" }]} name="businessType">
                                <Radio.Group size="large" value={info["businessType"]} name="businessType" onChange={handleValueChange} >
                                    <Space direction="vertical">
                                        <Radio.Button style={{ width: "300px" }} value="export">Export</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="import">Import</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="other">Other</Radio.Button>
                                    </Space>
                                </Radio.Group>
                                // </Form.Item>
                            }


                        />


                        <SlideTemplate
                            question="What is the type of business?"
                            answer={
                                <Input onChange={handleValueChange} size="large" value={info["otherBusiness"]} name='otherBusiness' />}
                        />
                        <SlideTemplate
                            question="What product do you import or export?"
                            answer={
                                <Input onChange={handleValueChange} size="large" value={info["busProducts"]
                                } name='busProducts' />}
                        />


                        <SlideTemplate
                            question="How many years have you been in this business??"
                            answer={
                                <Input onChange={handleValueChange} size="large" value={info["businessYears"]} name='businessYears' />}
                        />
                        <SlideTemplate
                            question="What product or service do you need from Javolin?"
                            answer={
                                <Radio.Group size="large" onChange={handleValueChange} name="javProduct" value={info["javProduct"]} >
                                    <Space direction="vertical">
                                        <Radio.Button style={{ width: "300px" }} value="loan">Loan</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="import">Credit or Debit Card</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="collection">Payment Collection</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="biometric">Biometric Solutions</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="remittance">Remittance services</Radio.Button>
                                    </Space>
                                </Radio.Group>
                            }
                        />
                        <SlideTemplate
                            question="Do you have cash or other collateral for the loan?"
                            answer={
                                <Radio.Group size="large" name="hasCollateral" value={info["hasCollateral"]} onChange={handleValueChange} >
                                    <Space direction="vertical">
                                        <Radio.Button style={{ width: "300px" }} value="yes">Yes</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="no">No</Radio.Button>
                                    </Space>
                                </Radio.Group>
                            }
                        />
                        <SlideTemplate
                            question="What size loan do you need?"
                            answer={
                                <Input onChange={handleValueChange} size="large" value={info["loanSize"]} name='loanSize' />


                            }
                        />
                        <SlideTemplate
                            question="Do you already have an established bank account with a current bank?"
                            answer={
                                <Radio.Group size="large" name="hasBankAccount" value={info["hasBankAccount"]} onChange={handleValueChange} >
                                    <Space direction="vertical">
                                        <Radio.Button style={{ width: "300px" }} value="yes">Yes</Radio.Button>
                                        <Radio.Button style={{ width: "300px" }} value="no">No</Radio.Button>
                                    </Space>
                                </Radio.Group>
                            }
                        />

                        <SlideTemplate
                            question="Name of bank?"
                            answer={
                                < Input onChange={handleValueChange} size="large" value={info["bankName"]} name='bankName' />}
                        />
                    </SwipeableViews>
                    <Button onClick={handleNext} htmlType="submit" className={Styles.button} type="primary" size="small">Continue</Button>
                </div>
            </Form>
        </Modal>
    )
}

export default BusinessPreqModal

