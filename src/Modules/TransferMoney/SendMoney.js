import { Layout, Col, Input, InputNumber, Select, Form, Button, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { ArrowDownCircle } from "../../Shared/Components/JavIcons"
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { bankTranfer, getTransactionFee, javolinTranfer, momoTranfer2 } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';

import MomoForms from './Components/MomoForm';
import JavolinAccountForm from './Components/JavolinAccountForm';
import BankOptionForm from './Components/BankOptionFrom';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';

import InternationalBankTransferForm from './Components/InternationalBankTranferForm';
import { useHistory } from 'react-router';
import { showErrorNotification } from '../../Shared/actions/alert.actions';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';

import JavContentTitle from "../../Shared/Components/JavContentTitle"


const { Option } = Select;



const SendMoney = (props) => {

    const [form] = Form.useForm();


    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    let defaultWallet = useSelector((state) => state?.user?.default_savings_wallet)
    const javLoading = useSelector((state) => state?.transfer?.sendingJavolin)
    const momoLoading = useSelector((state) => state?.transfer?.sendingMomo)
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)
    let wallets = useSelector((state) => state?.resources?.wallets)
    const [review, setReview] = useState(false)
    const [destination, setDestination] = useState('')
    const phoneNum = useRef("")
    const history = useHistory()
    const dispatch = useDispatch()
    const text = useSelector((state) => state.language)




    const [sourceWallet, setsourcewallet] = useState('')
    const [showLocal, setLocal] = useState('')
    let defWallet = useSelector((state) => state?.user?.default_savings_wallet)
    const bene = useSelector((state) => state?.transfer?.beneficiaries)



    const handleChangeBeneList = (e) => {
        console.log('e', e)
    }

    const SendFrom = () => {
        let currencies = useSelector((state) => state?.resources?.defaultCurrencies)
        return (
            <>

                <Row style={{ marginTop: "1em" }} gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item
                            label={text["Send From"]}
                        >
                            <Form.Item
                                noStyle
                                name={["from", "account"]}
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
                        <Form.Item label={text["Amount"]} >
                            <Form.Item
                                name="amount"

                                rules={[
                                    { required: true },
                                    {
                                        pattern: /^[1-9]+[0-9]*$/,
                                        message: `${text["Input invalid"]}`
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} prefix={currencies[defaultWallet?.currency_id].ISO} width="100%" size="large" name='amount' type="number" />
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item label={`${text["Note"]} (${text["optional"]}) `} >
                            <Form.Item
                                name="note"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='note' placeholder="Eg. Stipend" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
            </>

        )
    }

    const SelectTranxType = () => {
        return (
            <>

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label={[text["Transaction Type"]]} >
                        <Form.Item
                            name="transaction_type"
                            rules={[
                                { required: true },

                            ]}
                        >
                            <Select style={{ width: "100%" }} size="large" onChange={handleTypeChange} placeholder="Select type">
                                <Option disabled value="default">{text["Select transaction type"]}</Option>
                                <Option value="local">{text["Domestic"]}</Option>
                                <Option value="international">{text["International"]}</Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                </Col>
            </>

        )
    }





    const type = {
        "javolin": 'JAVOLIN_TO_JAVOLIN_TRANSFER',
        "bank": 'SEND_BANK',
        "momo": 'SEND_MOMO'
    }
    const tnxType = {
        "javolin": {
            "form": <JavolinAccountForm setIntNum={phoneNum} form={form} />,
            "action": javolinTranfer,
            "loading": javLoading,
            "type": "JAVOLIN_TO_JAVOLIN_TRANSFER",
            "send_from": <SendFrom />
        },
        "momo": {
            "form": <MomoForms form={form} />,
            "action": momoTranfer2,
            "loading": momoLoading,
            "type": "SEND_MOMO",
            "send_from": <SendFrom />
        },
        "bank": {
            "form": <SelectTranxType />,
            "action": bankTranfer,
            "loading": momoLoading,
            "type": "SEND_BANK"
        },
    }

    const bankTranxType = {
        local: <BankOptionForm form={form} />,
        international: <InternationalBankTransferForm handleChangeBeneList={handleChangeBeneList} form={form} />
    }


    const setReviewSubTitle = (values) => {
        if (values.destination === "javolin") {
            return values?.phone_number
        } else if (values.destination === "bank") {
            return values.acc_number
        } else if (values.destination === "momo") {
            return values?.momo_number
        }
    }

    const onFinish = (values) => {
        console.log(values)
        // if (values?.amount > sourceWallet?.current_balance){
        //     dispatch(showErrorNotification("Insufficient balance"))
        //     return
        // }
        if (destination === "javolin") {
            values = { ...values, ...{ "phone_number": phoneNum.current }, acc_name: values?.recepient }
        }


        // Route to international transfer page
        if (showLocal === 'international') {
            const id = values.beneficiary_account
            const beneficiary = bene[id]
            history.push({
                pathname: '/send-money/international',
                state: beneficiary
            })
            return
        }

        // other send money options
        try {
            dispatch(getTransactionFee({
                "module": type[destination],
                "amount": values?.amount,
                "currency_id": 2
            })).then((fee) => {
                let info = {
                    "action": "Send Money",
                    "operation": "Sending",
                    "fee": fee,
                    "to": {
                        "msg": "Sending to",
                        "title": values?.acc_name,
                        "subTitle": setReviewSubTitle(values),
                        "acc_num": "",
                        "image_url": ""
                    },
                    "from": {
                        "msg": "Sending from",
                        "title": sourceWallet?.name,
                        "subTitle": `GHS ${sourceWallet?.current_balance}`,
                        "acc_num": `****${sourceWallet?.account_number?.substring(6)}`,
                        "image_url": `${REACT_APP_ASSETS_API_URL}${sourceWallet?.wallet_logo}`
                    },
                    "info": values,

                }
                console.log(info)
                setDetails(info)
                setReview(true)
            })
        } catch (error) {
            dispatch(showErrorNotification('An error occurred. Try again later!'))
        }
    }

    const handleDestinationChange = (e) => {
        if (e !== 'bank') {
            setLocal('')
        }
        setDestination(e)
    }

    const handleTypeChange = (e) => {
        setLocal(e)
    }





    const { Content } = Layout;

    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>{text["Send Money"]}</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <div style={{ width: "100%" }} className={Styles.cardContent}>
                        <div style={{ padding: "0 3em", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>
                                <ReviewPopUp setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
                                <PassCode
                                    isPassCodeVisible={passcode}
                                    setPassCodeVisible={setPasscode}
                                    details={details}
                                    form={form}
                                    action={tnxType[destination]?.action}
                                    buttonloading={tnxType[destination]?.loading}
                                />
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                    initialValues={{
                                        'transaction_type': 'default',
                                        'beneficiary': defWallet?.id,
                                        'from': { account: wallets?.length === 1 ? defWallet?.id : '' }
                                    }}
                                >
                                    <JavContentTitle title={text["Destination"]} />
                                    <Row style={{ marginTop: "1em" }} gutter={[32, 16]}>
                                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                            <Form.Item label={text["Send to"]}>
                                                <Form.Item
                                                    name="destination"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: "100%" }} size="large" onChange={handleDestinationChange} placeholder={text["Destination"]}>
                                                        <Option value="javolin">{text["Other Javolin Account"]}</Option>
                                                        <Option value="momo">{text["Mobile Money (Momo) Account"]}</Option>
                                                        <Option value="prepaid">{text["Prepaid Visa Card"]}</Option>
                                                        <Option value="bank">{text["Bank Account"]}</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Form.Item>
                                        </Col>

                                            {tnxType[destination]?.form}
                                        </Row>

                                        {/* show the local or international form */}
                                        <Col>
                                            {bankTranxType[showLocal]}
                                        </Col>


                                        {tnxType[destination]?.send_from}

                                    
                                        {showLocal === 'local' ? (
                                            <>
                                                <JavContentTitle title={text["Source"]} />
                                                <Row>
                                                    <SendFrom />
                                                </Row>

                                            </>

                                        ) : ""}
                                    <div className={Styles.sectionBox}>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button
                                                shape="round"
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                style={{ width: "400px" }}
                                                loading={feeLoading}

                                            >
                                                {text["Continue"]}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
};

export default SendMoney