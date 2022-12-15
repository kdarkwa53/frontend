


import { Button, Col, Form, Input, Modal, Row } from "antd"
import MainStyles from "../../Shared/Components/Menu/Menu.module.css"
import Styles from "../TransferMoney/TransferMoney.module.css"

import { XIcon } from "../../Shared/Components/JavIcons";
import JavContentTitle from "../../Shared/Components/JavContentTitle";
import { useDispatch, useSelector } from "react-redux";
import { addBeneValues, validateIBAN } from "./duck/action";
import { useHistory } from "react-router";
import { useState } from "react";
import BeneficiaryQuestionsPopUp from "./BeneficiaryQuestionsPopUp";



const IBANPopUp = ({ isVisible, setVisible,type}) => {

    const [isQuestionsVisible, setBeneQuestions] = useState(false)
    const ShowBankDetails = ({ibanDetails})=>{

        return(
            <div>
    
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Account Number
                    </div>
                    <div>
                        {ibanDetails?.accountNumber}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Bank Name
                    </div>
                    <div>
                        {ibanDetails?.bankName}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Branch Code
                    </div>
                    <div>
                        {ibanDetails?.branchCode}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Bank Address
                        </div>
                        <div>
                        {ibanDetails?.bankAddress}
                        </div>
                    </div>
                
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Country Name
                    </div>
                    <div>
                        {ibanDetails?.countryName}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Postal Code 
                    </div>
                    <div>
                        {ibanDetails?.postalCode}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Routing Number 
                    </div>
                    <div>
                        {ibanDetails?.routingNumber}
                    </div>
                </div>
                <div className={Styles.ibanRow}>
                    <div className={Styles.ibanTitle}>
                        Swift BIC 
                    </div>
                    <div>
                        {ibanDetails?.swiftBIC}
                    </div>
                </div>
            </div>
        )
    }

    const handleCancel = () => {
        setVisible(false);
    };

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.transfer.validatingIBAN)
    const iban = useSelector((state) => state?.transfer?.filteredRules?.iban)
    const [ibanDetails, setIBANDetails] = useState('')
    const [disableValidate, setDisableValidate] = useState(true)
    const [disableContinue, setContinueDisable] = useState(true)



    const onClickValidate = () => {
        let values = form.getFieldValue('ibanDetails')
        try {
            dispatch(validateIBAN(values)).then((val) => {
                setIBANDetails(val)
                if(val){
                    setContinueDisable(false)
                }
            })
        } catch (error) {
            setContinueDisable(true)
        }
       
    }

    const onFinish = (values) => {
            const details = JSON.stringify(ibanDetails)
            dispatch(addBeneValues(
                {
                    ibanDetails: details
                }
            ))
            setVisible(false)
            setBeneQuestions(true)
            
            
            // history.push({pathname:'/beneficiary', state:{type:type}})
    }

    const handleFormChange = () => {
        const fieldVals = form.getFieldValue('ibanDetails')
        let disabled = (fieldVals === undefined || fieldVals === '') 
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        const disable = hasErrors || disabled
        setDisableValidate(disable)
    }



    const rules = []

    if (iban?.validationRules) {
        iban?.validationRules.map((rule => {
            return(
                rules.push(
                    {
                        pattern: rule?.regEx,
                        message: rule?.errorMessage
                    }
                )
            )}))
    }


    return (
        <>
            <BeneficiaryQuestionsPopUp isVisible={isQuestionsVisible} setVisible={setBeneQuestions} />
            <Modal open={isVisible} onCancel={handleCancel}
                footer={false}
                centered
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                bodyStyle={
                    {
                        padding: 0,
                        border: "16px 16px 0 0"
                    }
                }

                width="1000px"
            >
                <div className={MainStyles.jav_modal_header}>
                    <div className={MainStyles.jav_modal_secTitle}>IBAN Details</div>
                </div>

                <div style={{padding: "2em"}}>

                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                    onFieldsChange={handleFormChange}
                                >

                                    <div >
                                        <JavContentTitle title={"Beneficiary Information"} />
                                        <div style={{padding: "1em 0"}}> IBAN number</div>
                                        <Row gutter={[32, 16]}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={18}>
                                                <Form.Item
                                                    name={'ibanDetails'}
                                                    rules={rules}
                                                >
                                                    <Input size='large' />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                                                <Button
                                                    type="primary"
                                                    loading={loading}
                                                    block
                                                    size="large"
                                                    onClick={onClickValidate}
                                                    disabled={disableValidate}
                                                >
                                                    Validate IBAN
                                                </Button>
                                            </Col>
                                        </Row>
                                        
                                    

                                    {ibanDetails ? 
                                        (<ShowBankDetails ibanDetails={ibanDetails} />)
                                     : ""}

                                       
                                    </div>
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                            <Button
                                                type="primary"
                                                style={{width:"400px", marginTop: "2em"}}
                                                shape="round"
                                                htmlType="submit"
                                                size="large"
                                                disabled={disableContinue}
                                            >
                                                Continue
                                            </Button>
                                    </div>

                                </Form>

                            </div>

            </Modal>
        </>

    )

}


export default IBANPopUp