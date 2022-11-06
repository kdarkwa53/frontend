import { Layout, Col, Input, Select, Form, Button } from 'antd';
import React, { useState } from 'react';
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { airtimeTransfer, getTransactionFee } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import CountryCode from '../../Shared/Components/CountryCode/CountryCode';
// import Currencies from '../../Shared/Components/Currencies';
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';

const { Option } = Select;

const AirtimeTransfer = () => {
    const [form] = Form.useForm();

    const [passcode, setPasscode] = useState(false)
    const [review, setReview] = useState(false)
    const [details, setDetails] = useState("")
    const btnLoading = useSelector((state) => state?.transfer?.sendingAirtime)
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)

    const [sourceWallet, setsourcewallet] = useState('')
    const dispatch = useDispatch()

    const onFinish = (values) => {

        if (values?.amount > sourceWallet?.current_balance) {
            dispatch(showErrorNotification("Insufficient balance"))
            return
        }
        
        const network = form.getFieldValue("network")

       

        try {
            dispatch(getTransactionFee({
                "module": "PURCHASE_AIRTIME",
                "amount": values?.amount,
                "currency_id": 2
            })).then((fee) => {
                let info = {
                    "action": "Buy Airtime",
                    "operation": "Sending",
                    "fee": fee,
                    "to": {
                        "title": `${network} Airtime`,
                        "subTitle": values?.number,
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
                    "info": values
                }
                setDetails(info)
                setReview(true)
            })
        } catch (error) {
            dispatch(showErrorNotification('An error occurred. Try again later!'))
        }
    }



    const Payment = () => {
        return (
            <>
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    style={{ width: "100%" }}
                    onFinish={onFinish}
                >

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Account</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={"source"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <JavolinAccounts setsourcewallet={setsourcewallet} />
                            </Form.Item>
                            {/* <JavolinAccounts setsourcewallet={setsourcewallet} /> */}
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
                                <Input prefix={"₵"} width="100%" size="large" name='amount' type="number" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Phone Number</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="number"
                                rules={[
                                    {
                                        required: true,
                                        len: 10,
                                        message: "invalid number"
                                    },
                                ]}
                            >

                                <Input prefix={<CountryCode />} size="large" type="number" placeholder="mobile number" />
                            </Form.Item>
                        </div>
                    </div>


                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Network</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="network"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }} size="large" defaultValue="Select network">
                                    <Option value="MTN">MTN</Option>
                                    <Option value="VODA">VODA</Option>
                                    <Option value="TIGO">AIRTELTIGO</Option>
                                    <Option value="GLO">GLO</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Reference</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="remark"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large" placeholder="enter remarks" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.buttonContainter}>
                        <div className={Styles.tnxButton}>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                size="large"
                                loading={feeLoading}
                            >
                                Buy Airtime
                            </Button>
                        </div>
                    </div>
                </Form>
            </>
        )
    }

    const { Content } = Layout;


    return (
        <Content>
            <ReviewPopUp setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
            <PassCode
                isPassCodeVisible={passcode}
                setPassCodeVisible={setPasscode}
                details={details?.info}
                form={form}
                action={airtimeTransfer}
                buttonloading={btnLoading}
            />
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Buy Airtime</span>
                    </div>
                </div>

                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} g={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Payment />

                        </div>
                    </Col>
                </div>
            </div>
            {/* </Card> */}
        </Content>
    )
};

export default AirtimeTransfer