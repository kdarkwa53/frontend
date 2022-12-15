import { Layout, Col, Input, InputNumber, Select, Form, Button, Row, Alert, } from 'antd';
import React, { useEffect, useState } from 'react';
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { bookRate, getBeneficiaries, getRate, getTransactionFee, instructCorpayment } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';

import {
    PlusCircleOutlined
} from '@ant-design/icons';

import "../../Shared/Components/Accounts/JavolinAccounts.css"
import { Timer } from '../../Shared/Components/Timer';
import ReviewPopUpInt from '../../Shared/Components/ReviewPopUp/ReviewForex';
import JavContentTitle from '../../Shared/Components/JavContentTitle';
import { useHistory } from 'react-router';
import JavolinAccountCurrencyFiltered from '../../Shared/Components/Accounts/JavolinAccountCurrencyFiltered';
import { getWallets } from '../../Shared/Components/duck/action';
import AddBenefeciaryPopUp from './AddBenefeciaryPopUp';
import IBANPopUp from './IBANPopUp';
import { getPendingTransactions } from '../UserManagement/duck/action';

const { Option } = Select;



const InstructForex = (props) => {

    const state = props?.location?.state
    console.log("state: ", state )
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
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)

    const bene = useSelector((state) => state?.transfer?.beneficiaries)
    const beneficiaries = bene ? bene : {}
    const history = useHistory()

    const [bene_detatils, set_beneDetails] = useState(state?.currency)
    const [disableAmount, setDisableAmount] = useState(true)
    const [disableBeneAmount, setDisableBeneAmount] = useState(state ? true : false)

    const [isVisible, setVisible] = useState()





    useEffect(()=>{
        dispatch(getBeneficiaries())
        dispatch(getWallets())
        dispatch(getPendingTransactions())
    },[dispatch])
    
    const onFinish = (values) => {
        // if (values?.amount > sourceWallet?.current_balance) {
        //     dispatch(showErrorNotification("Insufficient balance"))
        //     return
        // }


        console.log("source",sourceWallet)
        values = {
            ...values,
            ...defaultValues
        }


        try {
            
                setSubDetails(
                    {
                        order_id: state?.deal?.orderNumber,
                        amount: state?.rate?.recipient_without_fees?.amount,
                        beneficiary_id: bene_detatils?.id,
                        wallet_id: sourceWallet=== "EXTERNAL_WIRE" ? "EXTERNAL_WIRE" : sourceWallet?.id
                    }
                )
                // show review screen  
                    dispatch(getTransactionFee({
                        "reference": state?.deal?.orderNumber,
                        "module": "FOREX",
                        "amount": state?.rate?.sender_without_fees?.amount,
                        "currency_id": 1,
                    })).then((fee) => {
                        console.log(fee)
                        let info = {
                            "action": "Confirm trade",
                            "operation": "Sending",
                            "fee": fee,
                            "to": {
                                "msg": "Beneficiary Account",
                                "title": bene_detatils?.name,
                                "subTitle": bene_detatils?.account_number,
                                "acc_num": "",
                                "image_url": "",
                                "bank_location": bene_detatils?.address,
                                "bank_name": bene_detatils?.bank_name
                            },
                            "from": {
                                "msg": "Source Account",
                                "title": sourceWallet==="EXTERNAL_WIRE" ? "EXTERNAL WIRE" : sourceWallet?.name,
                                "subTitle": sourceWallet==="EXTERNAL_WIRE" ? "EXTERNAL WIRE" : `${currencies[sourceWallet?.currency_id]?.ISO} ${sourceWallet?.current_balance}`,
                                "acc_num": sourceWallet==="EXTERNAL_WIRE" ? "" : `****${sourceWallet?.account_number?.slice(-4)}`,
                                "image_url": `${REACT_APP_ASSETS_API_URL}${sourceWallet?.wallet_logo}`,
                                "currency": sourceWallet==="EXTERNAL_WIRE" ? state.rate.sender.currency : currencies[sourceWallet?.currency_id]?.ISO
                            },
                            "info": values,
                            'settlement': state?.rate?.recipient
                        }
                        setDetails(info)

                        if (fee) {
                            setReview(true)
                        }

                    })

        } catch (error) {
            dispatch(showErrorNotification('An error occurred. Try again later!'))
        }


    }
    const sel = { title: "selectedCard", lineHeight: "cardLeftHemSelected" }

   

    
    const handleFormChange = () => {
        const fieldVals = form.getFieldValue('amount')
        const beneField = form.getFieldValue('beneficiary')
        let disabled = (fieldVals === undefined || fieldVals === '') && (beneField === undefined || beneField === '')
        setCheckDisabled(disabled)
    }


    const handleChangeBene = (e) => {
        if (e === "new") {
            // history.push("/business/pre-rules")
            setVisible(true)
        }
        else {
            set_beneDetails(beneficiaries[e])
            setDisableBeneAmount(false)

        }
    }

    const handleAccountChange = () => {
        setDisableAmount(false)

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
                        <span className={Styles.titleCard}>Forex</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <div style={{ width: "100%" }} className={Styles.cardContent}>
                        <div style={{ padding: "0 3em", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

                            <>
                                <ReviewPopUpInt setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
                                <AddBenefeciaryPopUp isVisible={isVisible} setVisible={setVisible} />
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
                                        accountNumber: state?.accountNumber,
                                        beneficiary_account: state?.id,
                                        from_account: Object?.keys(wallets)?.length === 1 ? defaultWallet?.id : '',
                                        amount: Number(state.rate.sender.amount).toFixed(2),
                                        beneficiary: Number(state?.rate?.recipient.amount).toFixed(2),
                                        rate: `${Number(state?.rate?.javolin_rate[1]).toFixed(4)} / ${Number(state?.rate?.javolin_rate[0]).toFixed(4)}`

                                    }}
                                >
                                    <Alert
                                        message={`You are seeking to buy ${state?.rate?.recipient.currency} hence the beneficiary account you select or add should be a ${state?.rate?.recipient.currency} account` }
                                        type="warning"
                                        closable
                                        style={{fontSize: "15px", margin:"1em 0"}}
                                        />

                                    <JavContentTitle title="Beneficiary Details" />

                                    <Row style={{ marginTop: "1em" }} gutter={[32, 16]}>
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
                                                    <Select onChange={handleChangeBene} size="large" className="c_select" style={{ width: "100%" }} 
                                                    
                                                        placeholder={`Select bank account with buying currency (${state?.rate?.recipient.currency})`}
                                                        >
                                                       
                                                        <Option  value='new'  > <PlusCircleOutlined /> {'Add New Beneficiary'}</Option>
                                                        {Object.values(beneficiaries)?.map((bene) => {
                                                            if (bene?.currency === state?.rate?.recipient.currency){
                                                                return (
                                                                    <Option value={bene?.id} key={bene?.id}>
                                                                        <div className={`cardTile ${sel.title}`}>
                                                                            <div className="cardLeftHem">
                                                                                <div className={`cardName ${sel.lineHeight}`} >{bene?.name}</div>
                                                                                <div className={`currencyName ${sel.lineHeight}`}  >{`currency: ${bene?.currency}`}</div>
                                                                            </div>
                                                                            <div className="cardRightHem">
                                                                                <div className={`accountNumber ${sel.lineHeight}`}  >
                                                                                    {bene?.account_number ? bene?.account_number : ""}
                                                                                </div>
                                                                               
                                                                                <div className={`bankName ${sel.lineHeight}`}  >{bene?.bank_name}</div>
                                                                            </div>
                                                                        </div>
                                                                    </Option>
                                                                )
                                                            }
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>

                                        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Transaction Type">
                                                <Form.Item
                                                    noStyle
                                                >
                                                    <Select style={{ width: "100%" }} size="large" defaultValue={'international'} placeholder="Select type">
                                                        <Option value="international">International</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Form.Item>

                                        </Col> */}

                                    </Row>
                                    
                                    <Alert
                                        message={`You are seeking to sell ${state?.rate?.sender.currency} hence the your source account should be a ${state?.rate?.sender.currency} account` }
                                        type="warning"
                                        closable
                                        style={{fontSize: "15px", margin:"1em 0"}}
                                        />
                                    <JavContentTitle title="Sending Info" />

                                    <Row style={{ marginTop: "1em" }} gutter={[32, 16]}>
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
                                                    <JavolinAccountCurrencyFiltered currency={state.rate.sender.currency} onChange={handleAccountChange} setsourcewallet={setsourcewallet} />
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label={state.rate.sender.currency ? `Amount (${state.rate.sender.currency})` : "Amount"}>
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
                                                        disabled
                                                        style={{ width: "100%", color: "black" }}
                                                        formatter={value => `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        size="large" name='amount'
                                                    />
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={[32, 16]}>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label= {state.rate.recipient.currency ? `Beneficiary Receives (${state.rate.recipient.currency})` : "Beneficiary Receives "}>
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
                                                        disabled
                                                        style={{ width: "100%", color: "black" }}
                                                        formatter={value => `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} width="100%" size="large" className={Styles.placeholder} name='beneficiary' />
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label="Rate">

                                                <Form.Item
                                                    name={'rate'}
                                                >
                                                    <Input style={{ width: "100%", color: "black" }} disabled size="large" className={Styles.placeholder} />
                                                </Form.Item>


                                            </Form.Item>
                                        </Col>

                                    </Row>










                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            type="primary"
                                            shape='round'
                                            style={{ width: "400px" }}
                                            block
                                            htmlType="submit"
                                            size="large"
                                            loading={feeLoading}
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

export default InstructForex