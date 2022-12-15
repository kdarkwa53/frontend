/* eslint-disable react-hooks/exhaustive-deps */



import { Layout, Col, Input, Form, Button, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import JavContentTitle from '../../../../Shared/Components/JavContentTitle';
import Styles from "../../../TransferMoney/TransferMoney.module.css"
import { addBeneValues, validateIBAN } from '../../duck/action';





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
const IbanValidation = (props) => {
    const type = props?.location?.state?.type

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.transfer.validatingIBAN)
    const iban = useSelector((state) => state?.transfer?.filteredRules?.iban)
    const [ibanDetails, setIBANDetails] = useState('')
    const [disableValidate, setDisableValidate] = useState(true)
    const [disableContinue, setContinueDisable] = useState(true)

    const history = useHistory()


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
            history.push({pathname:'/beneficiary', state:{type:type}})
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



    const { Content } = Layout;

    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Send Money</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>

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
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2}>
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                disabled={disableContinue}
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </div>

                                </Form>

                            </>

                        </div>
                    </Col>
                </div>
            </div>
        </Content>
    )
};

export default IbanValidation