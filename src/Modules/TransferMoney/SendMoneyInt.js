import { Layout, Col, Input, InputNumber, Select, Form, Button, Row, } from 'antd';
import React, { useState } from 'react';
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { bookRate, getRate, getTransactionFee, instructCorpayment } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';



import "../../Shared/Components/Accounts/JavolinAccounts.css"
import { Timer } from '../../Shared/Components/Timer';
import ReviewPopUpInt from '../../Shared/Components/ReviewPopUp/ReviewPopUpInt';
import JavContentTitle from '../../Shared/Components/JavContentTitle';

const { Option } = Select;



const SendMoneyInt = (props) => {

    const state = props?.location?.state
    console.log("Beneficiary: ", state)
    const [form] = Form.useForm()
    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    const [submitDetails, setSubDetails] = useState("")
    const [disableContinue, setDisCount] = useState(true)
    const bookingRate = useSelector((state) => state?.transfer?.bookingRate)
    const checkingRate = useSelector((state) => state?.transfer?.gettingRate)
    const instructingPayment = useSelector((state) => state?.transfer?.instructingPayment)
    const defaultValues = useSelector((state) => state?.transfer?.defaultValues)
    let defaultWallet = useSelector((state) => state?.user?.default_savings_wallet)
    let wallets = useSelector((state) => state?.resources?.wallets)
    const [review, setReview] = useState(false)
    const dispatch = useDispatch()
    const [checkDisabled, setCheckDisabled] = useState(true)
    const [showTimer, setShowTimer] = useState(false)
    const [sourceWallet, setsourcewallet] = useState(Object.keys(wallets).length === 1 ? wallets[defaultWallet?.id] : '')
    const [settlementDetails, setSettlementDetails] = useState()
    let currencies = useSelector((state) => state?.resources?.defaultCurrencies)






    const onFinish = (values) => {
        // if (values?.amount > sourceWallet?.current_balance) {
        //     dispatch(showErrorNotification("Insufficient balance"))
        //     return
        // }

        values = {
            ...values,
            ...defaultValues
        }


        try {
            dispatch(bookRate(
                {
                    "quote_id": values?.quote_id,
                }
            )).then((val) => {
                setSubDetails(
                    {
                        order_id: val?.response?.orderNumber,
                        amount: settlementDetails?.recipient_without_fees?.amount,
                        beneficiary_id: state?.id
                    }
                )
                // show review screen  
                console.log('order: ', val)
                if (val) {
                    dispatch(getTransactionFee({
                        "reference": val?.response?.orderNumber,
                        "module": "COREPAY",
                        "amount": settlementDetails?.sender_without_fees?.amount,
                        "currency_id": 1,
                    })).then((fee) => {
                        console.log(fee)
                        let info = {
                            "action": "Send Money",
                            "operation": "Sending",
                            "fee": fee,
                            "to": {
                                "msg": "Sending to",
                                "title": state?.name,
                                "subTitle": state?.account_number,
                                "acc_num": "",
                                "image_url": "",
                                "bank_location": state?.address1,
                                "bank_name": state?.bank_name
                            },
                            "from": {
                                "msg": "Sending from",
                                "title": sourceWallet?.name,
                                "subTitle": `${currencies[sourceWallet.currency_id].ISO} ${sourceWallet?.current_balance}`,
                                "acc_num": `****${sourceWallet?.account_number?.substring(6)}`,
                                "image_url": `${REACT_APP_ASSETS_API_URL}${sourceWallet?.wallet_logo}`,
                                "currency": currencies[sourceWallet.currency_id].ISO
                            },
                            "info": values,
                            'settlement': settlementDetails.recipient
                        }
                        setDetails(info)

                        if (fee) {
                            setReview(true)
                        }

                    })
                    reset()
                } else {

                    // Reset the action values: check rate and book deal and the fields
                    reset()
                }
            })

        } catch (error) {
            dispatch(showErrorNotification('An error occurred. Try again later!'))
        }


    }
    const sel = { title: "selectedCard", lineHeight: "cardLeftHemSelected" }

    const handleAmountChange = () => {
        form.setFieldsValue({
            beneficiary: '',
            rate: ''
        })
        setDisCount(true)
        setShowTimer(false)
    }


    const handleBeneChange = () => {
        form.setFieldsValue({
            amount: '',
            rate: ''
        })
        setDisCount(true)
        setShowTimer(false)
    }
    const handleFormChange = () => {
        const fieldVals = form.getFieldValue('amount')
        const beneField = form.getFieldValue('beneficiary')
        let disabled = (fieldVals === undefined || fieldVals === '') && (beneField === undefined || beneField === '')
        console.log('disable: ', disabled)
        setCheckDisabled(disabled)
    }

    const checkRate = () => {
        const values = form.getFieldsValue()
        const fieldVals = form.getFieldValue('amount')
        const beneField = form.getFieldValue('beneficiary')

        if (beneField === undefined || beneField === '') {
            const details = {
                "wallet_id": values?.from_account,
                "beneficiary_id": values?.beneficiary_account,
                "value": fieldVals,
                "lock": "wallet"
            }
            //  check rate if the amount is a valid input
            if (fieldVals !== undefined) {

                dispatch(getRate(details)).then((val) => {
                    console.log("quote: ", val)
                    form.setFieldsValue({
                        beneficiary: val?.recipient?.amount,
                        quote_id: val?.quoteId,
                        rate: `${Number(val?.javolin_rate[0]).toFixed(4)} / ${Number(val?.javolin_rate[1]).toFixed(4)}`
                        // rate: `${val?.recipient?.currency} 1 / ${val?.sender?.currency} ${val?.rate}`
                    })
                    setSettlementDetails(val)
                    setDisCount(false)
                    setShowTimer(true)
                })

            }
        } else if (fieldVals === undefined || fieldVals === '') {

            const details = {
                "wallet_id": values?.from_account,
                "beneficiary_id": values?.beneficiary_account,
                "value": beneField,
                "lock": "beneficiary"
            }
            if (beneField) {
                dispatch(getRate(details)).then((val) => {
                    form.setFieldsValue({
                        amount: val?.sender?.amount,
                        quote_id: val.quoteId,
                        rate: `${Number(val?.javolin_rate[0]).toFixed(4)} / ${Number(val?.javolin_rate[1]).toFixed(4)}`
                        // rate: `${val?.recipient?.currency} 1 / ${val?.sender?.currency} ${val?.rate}`
                    })
                    setSettlementDetails(val)
                    setDisCount(false)
                    setShowTimer(true)
                })

            }
        }
    }


    const reset = () => {
        form.setFieldsValue({
            beneficiary: '',
            amount: '',
            rate: ''
        })
        setDisCount(true)
        setCheckDisabled(true)
        setShowTimer(false)
    }

    const expireRate = () => {
        reset()
        dispatch(showErrorNotification('Rate has expired'))
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
                    <div style={{ width: "100%" }} className={Styles.cardContent}>
                        <div style={{ padding: "0 3em", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          
                            <>
                                <ReviewPopUpInt setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
                                <PassCode
                                    isPassCodeVisible={passcode}
                                    setPassCodeVisible={setPasscode}
                                    details={submitDetails}
                                    form={form}
                                    action={instructCorpayment}
                                    buttonloading={instructingPayment}

                                />
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                    onFieldsChange={handleFormChange}
                                    initialValues={{
                                        accountNumber: state.accountNumber,
                                        beneficiary_account: state.id,
                                        from_account: Object.keys(wallets).length === 1 ? defaultWallet?.id : ''
                                    }}
                                >
                                    <JavContentTitle title="Destination"/>

                                    <Row style={{marginTop: "1em"}} gutter={[32,16]}>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Send to">
                                        <Form.Item
                                            noStyle
                                        >
                                            <Select style={{ width: "100%" }} size="large" defaultValue={'bank'}>
                                                <Option value="bank">Bank</Option>
                                            </Select>
                                        </Form.Item>
                                        </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Beneficiary">
                                            <Form.Item
                                                name={"beneficiary_account"}
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                >
                                                <Select size="large" className="c_select" style={{ width: "100%" }} placeholder="Select Beneficiary">
                                                    <Option value={state?.id} key={state?.id}>
                                                        <div className={`cardTile ${sel.title}`}>
                                                            <div className="cardLeftHem">
                                                                <div className={`cardName ${sel.lineHeight}`} >{state?.name}</div>
                                                            </div>
                                                            <div className="cardRightHem">
                                                                <div className="accountNumber">
                                                                    {state?.account_number ? state?.account_number : ""}
                                                                </div>
                                                                <div className="cardDesign">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Option>

                                                </Select>
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Form.Item label="Transaction Type">
                                        <Form.Item
                                            noStyle
                                        >
                                            <Select style={{ width: "100%" }} size="large" defaultValue={'international'}  placeholder="Select type">
                                                <Option value="international">International</Option>
                                            </Select>
                                        </Form.Item>
                                        </Form.Item>
                                        
                                        </Col>

                                    </Row>

                                    <JavContentTitle title="Sending Info"/>

                                    <Row style={{marginTop: "1em"}} gutter={[32,16]}>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Sending From">
                                                <Form.Item
                                                    name={"from_account"}
                                                    noStyle
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <JavolinAccounts setsourcewallet={setsourcewallet} />
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label={currencies[sourceWallet?.currency_id]?.ISO ? `Amount (${currencies[sourceWallet?.currency_id]?.ISO})` : "Amount"}>
                                            <Form.Item
                                        name="amount"
                                        rules={[
                                            { required: true },
                                            {
                                                pattern: /^([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                                                message: `Input invalid`
                                            }
                                        ]}
                                    >

                                        <InputNumber
                                            style={{ width: "100%" }}
                                            formatter={value => `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} onChange={handleAmountChange}
                                            size="large" name='amount'
                                        />
                                    </Form.Item>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={[32,16]}>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}> 
                                            <Form.Item label= {state?.currency ? `Beneficiary Receives (${state?.currency})` : "Beneficiary Receives "}>
                                            <Form.Item
                                                        name="beneficiary"
                                                        noStyle
                                                        rules={[
                                                            {
                                                                required: true,
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            style={{ width: "100%" }}
                                                            formatter={value => `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} onChange={handleBeneChange} width="100%" size="large" className={Styles.placeholder} name='beneficiary' />
                                                    </Form.Item>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Rate">
                                            <Row gutter={[32, 16]}>
                                                <Col xs={24} sm={24} md={12} lg={15} xl={15}>
                                                    <Form.Item
                                                        name={'rate'}
                                                    >
                                                        <Input disabled width="100%" size="large" className={Styles.placeholder} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={9} xl={9}>
                                                    <Button shape='round' loading={checkingRate} onClick={checkRate} disabled={checkDisabled} style={{ width: "100%" }} size='large' type="primary">
                                                        Check Rate
                                                    </Button>
                                                </Col>
                                            </Row>
                                            {showTimer ? (
                                                <Timer reset={expireRate} />
                                            ) : ""}  
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                   





                                    

                                    
                                  
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button
                                            type="primary"
                                            shape='round'
                                            style={{ width: "400px" }}
                                            htmlType="submit"
                                            size="large"
                                            loading={bookingRate}
                                            disabled={disableContinue}

                                        >
                                            Continue
                                        </Button>
                                    </div>
                                        







                                    <Form.Item

                                        name="quote_id"

                                    >
                                        <Input hidden />
                                    </Form.Item>


                                </Form>

                            </>

                        </div>
                        
                    </div>
                </div>
            </div>
        </Content>
    )
};

export default SendMoneyInt