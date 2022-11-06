/* eslint-disable react-hooks/exhaustive-deps */



import { Layout, Col, Select, Form, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Styles from "../../../TransferMoney/TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { beneficiaryQuestions, getDropdownListFromAPI, getPreRules } from '../../duck/action';
import { useHistory } from 'react-router';
import DynamicAPIDropdown from '../DynamicForms/DynamicAPIDropdown';
import DynamicDropdown from '../DynamicForms/DynamicDropdown';




const { Option } = Select;



const PrerulesQuestions = (props) => {
    const [disableButton, setButton] = useState(true)
    const type = props?.location?.state?.type
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const history = useHistory()

    const load = useSelector((state) => state?.transfer?.gettingBeneQuestions)
    const [methodList, setMethodList] = useState([])
    const [disPM, setDisPM] = useState(true)


    useEffect(()=>{
        dispatch(getPreRules())
    },[])

    const handleFormChange = (e) => {
        const changedField = e[0].name
        const fields = form.getFieldsValue()
        const fieldVals = Object.values(fields)
        const disP = fieldVals[0] === undefined || fieldVals[1] === undefined || fieldVals[2]=== undefined || fieldVals[3] === undefined
        const errors = fieldVals.includes(undefined)
        console.log(errors)
        setButton(errors)
        setDisPM(disP)

        if (!disP && changedField[0] !=='paymentMethods'){
            const link = `/api/business/rules-payment-methods?destinationCountry=${fields['destinationCountry']}&bankCurrency=${fields['bankCurrency']}&bankCountry=${fields['bankCountry']}`
            dispatch(getDropdownListFromAPI(link)).then((res) => {
                console.log('spy: ', res, fieldVals, link)

                form.setFieldsValue({
                    'paymentMethods':''
                })
                setMethodList(res)
            })
        }

    }

    const onFinish = (values) => {
        dispatch(beneficiaryQuestions(values, history, type))
    }


 
    const data = {
        "destinationCountry":{
            "id": "destinationCountry",
            "regEx": "",
            "isRequired": true,
            "defaultValue": "US",
            "isRequiredInValueSet": true,
            "links": [
                {
                    "rel": "COUNTRIES",
                    "uri": "https://crossborder.beta.corpay.com/api/268710/0/countries",
                    "method": "GET",
                    "javolinRoute": "/api/business/rules-countries"
                }
            ],
            "validationRules": [
                {
                    "regEx": "^[^<>\\x22]*$",
                    "errorMessage": "The following characters are not allowed: <,>, \""
                }
            ]
        },
        "bankCountry":{
            "id": "bankCountry",
            "regEx": "",
            "isRequired": true,
            "defaultValue": "US",
            "isRequiredInValueSet": true,
            "links": [
                {
                    "rel": "COUNTRIES",
                    "uri": "https://crossborder.beta.corpay.com/api/268710/0/countries",
                    "method": "GET",
                    "javolinRoute": "/api/business/rules-countries"
                }
            ],
            "validationRules": [
                {
                    "regEx": "^[^<>\\x22]*$",
                    "errorMessage": "The following characters are not allowed: <,>, \""
                }
            ]
        },
        "bankCurrency":{
            "id": "bankCurrency",
            "regEx": "",
            "isRequired": true,
            "defaultValue": "EUR",
            "isRequiredInValueSet": true,
            "links": [
                {
                    "rel": "CURRENCIES",
                    "uri": "https://crossborder.beta.corpay.com/api/268710/0/payCurrencies?product=Bene",
                    "method": "GET",
                    "javolinRoute": "/api/business/rules-currencies"
                }
            ],
            "validationRules": [
                {
                    "regEx": "^[^<>\\x22]*$",
                    "errorMessage": "The following characters are not allowed: <,>, \""
                }
            ]
        },
        "classification":{
            "id": "classification",
            "isRequired": true,
            "valueSet": [
                {
                    "id": "Business",
                    "name": "business"
                },
                {
                    "id": "Individual",
                    "name": "individual"
                }
            ]
        },

    }




    const { Content } = Layout;

    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>{ type === "forex" ? 'Forex': 'Send Money'}</span>
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
                                    
                                    <div className={Styles.sectionBox}>
                                        <p>{ type === "forex" ? 'Destination Account Information': 'Beneficiary Information'}</p>
                                        <DynamicAPIDropdown key={'destinationCountry'} val={data['destinationCountry']} />
                                        <DynamicAPIDropdown key={'bankCountry'} val={data['bankCountry']} />
                                        <DynamicAPIDropdown key={'bankCurrency'} val={data['bankCurrency']} />
                                        <DynamicDropdown key={'classification'} val={data['classification']} />
                                        <Form.Item
                                            name={'paymentMethods'}
                                            rules={[
                                                {required: true}
                                            ]}
                                            
                                            label={'Payment Methods'}
                                        >
                                            <Select
                                            disabled={disPM}
                                            size='large'
                                            >
                                                {
                                                    methodList?.map((option) => {
                                                        const fields = Object.entries(option)

                                                        return (
                                                            <Option key={fields[0][1]} value={fields[0][1]}>{fields[1][1]}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2}>
                                            <Button
                                                disabled={disableButton}
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                loading={load}
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

export default PrerulesQuestions