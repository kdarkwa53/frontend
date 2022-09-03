import { Layout, Col, Input, Select, Form, Button, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { ArrowDownCircle } from "../../Shared/Components/JavIcons"
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { bankTranfer, getTransactionFee, javolinTranfer, momoTranfer2 } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import Currencies from '../../Shared/Components/Currencies';
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';

import MomoForms from './Components/MomoForm';
import JavolinAccountForm from './Components/JavolinAccountForm';
import BankOptionForm from './Components/BankOptionFrom';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';
import { DynamicAPIDropdown, DynamicForm } from './Components/DynamicForms/DynamicForms';
import ShowBeneficiaryModal from './Components/ShowBeneficiaryModal';



const { Option } = Select;



const SendMoney2 = () => {
    const [form] = Form.useForm();

    const data = {
        "id": "bankRegion",
        "regEx": "^.{0,100}$",
        "isRequired": false,
        "errorMessage": "State/Province must be less than 100 characters",
        "isRequiredInValueSet": false,
        "links": [
            {
                "rel": "REGIONS",
                "uri": "https://crossborder.beta.corpay.com/api/268710/0/regions?country=GH",
                "method": "GET",
                "javolinRoute": "/api/business/rules-regions"
            }
        ],
        "validationRules": [
            {
                "regEx": "^.{0,100}$",
                "errorMessage": "State/Province must be less than 100 characters"
            },
            {
                "regEx": "^[^<>\\x22]*$",
                "errorMessage": "The following characters are not allowed: <,>, \""
            }
        ]
    }
    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    const javLoading = useSelector((state) => state?.transfer?.sendingJavolin)
    const momoLoading = useSelector((state) => state?.transfer?.sendingMomo)
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)
    const [review, setReview] = useState(false)
    const [destination, setDestination] = useState('')
    const phoneNum = useRef("");
    const dispatch = useDispatch()



    const [sourceWallet, setsourcewallet] = useState('')

    const SelectTranxType = () => {
        return (
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Transaction Type</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="transaction_type"
                        rules={[
                            { required: true },

                        ]}
                    >
                        <Select style={{ width: "100%" }} size="large" onChange={handleTypeChange} placeholder="Select type">
                            <Option value="local">Domestic</Option>
                            {/* <Option value="international">International</Option>  */}
                            {/* for only business now */}
                        </Select>
                    </Form.Item>
                </div>
            </div>
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
            "type": "JAVOLIN_TO_JAVOLIN_TRANSFER"
        },
        "momo": {
            "form": <MomoForms form={form} />,
            "action": momoTranfer2,
            "loading": momoLoading,
            "type": "SEND_MOMO"
        },
        "bank": {
            "form": <SelectTranxType />,
            "action": bankTranfer,
            "loading": momoLoading,
            "type": "SEND_BANK"
        },

        // "momo": <MomoForms form={form} />,
        // "bank": <BankOptionForm form={form} />
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
        if (values?.amount > sourceWallet?.current_balance) {
            dispatch(showErrorNotification("Insufficient balance"))
            return
        }
        if (destination === "javolin") {
            values = { ...values, ...{ "phone_number": phoneNum.current }, acc_name: values?.recepient }
        }



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
        setDestination(e)
    }

    const [showModal, setModal] = useState(false)
    const [showLocal, setLocal] = useState(false)
    const handleTypeChange = (e) => {
        if (e === "international") {
            setModal(true)
            setLocal(false)
        } else {
            setLocal(true)
            setModal(false)
        }
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
                                >
                                    <div className={Styles.sectionBox}>
                                        <p>Source</p>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Send From</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name={["from", "account"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <JavolinAccounts setsourcewallet={setsourcewallet} />
                                                </Form.Item>
                                            </div>
                                        </div>



                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Amount</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="amount"
                                                    rules={[
                                                        { required: true },
                                                        {
                                                            pattern: /^[1-9]+[0-9]*$/,
                                                            message: `Input invalid`
                                                        }
                                                    ]}
                                                >
                                                    <Input prefix={<Currencies />} width="100%" size="large" name='amount' type="number" />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Note <span style={{ color: "#888B93" }}>(optional)</span> </div>
                                            <div className={Styles.inputContainer}>
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
                                            </div>
                                        </div>
                                    </div>

                                    <Divider >
                                        <ArrowDownCircle width="2em" color="#63B344" />
                                    </Divider>

                                    <div className={Styles.sectionBox}>
                                        <p>Destination</p>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Send to</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="destination"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: "100%" }} size="large" onChange={handleDestinationChange} placeholder="destination">
                                                        <Option value="javolin">Other Javolin Account</Option>
                                                        <Option value="momo">Mobile Money (Momo) Account</Option>
                                                        <Option value="prepaid">Prepaid Visa Card</Option>
                                                        <Option value="bank">Bank Account</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {tnxType[destination]?.form}

                                        {showLocal ? (
                                            <BankOptionForm form={form} />
                                        ) : ""}

                                        <ShowBeneficiaryModal isVisible={showModal} setIsModalVisible={setModal} />

                                    </div>
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2}>
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                loading={feeLoading}

                                            >
                                                Send Money
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

export default SendMoney2