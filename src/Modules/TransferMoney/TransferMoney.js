import { Layout, Col, Input, Form, Button, Divider } from 'antd';
import { useState } from 'react';
import { ArrowDownCircle } from "../../Shared/Components/JavIcons"
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { accountTranfer, getTransactionFee } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import Currencies from '../../Shared/Components/Currencies';
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';
import JavolinAccountsFiltered from '../../Shared/Components/Accounts/JavolinAccountsFiltered';







const TransferMoney = () => {
    const [form] = Form.useForm();

    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    const btnLoading = useSelector((state) => state?.transfer?.sendingAirtime)
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)
    const [sourceWallet, setsourcewallet] = useState('')
    const [destWallet, setDestWallet] = useState('')
    const [review, setReview] = useState(false)
    const dispatch = useDispatch()

    const onFinish = (values) => {
        if (parseInt(values?.amount) > sourceWallet?.current_balance) {
            dispatch(showErrorNotification("Insufficient balance"))
            return
        }

        values = {
            ...values,
            "source": sourceWallet,
            "destination"
                : destWallet
        }
       
        try {
            dispatch(getTransactionFee({
                "module": "JAVOLIN_TO_JAVOLIN_TRANSFER",
                "amount": values?.amount,
                "currency_id": 2
            })).then((fee) => {
                let info = {
                    "action": "Transfer Money",
                    "operation": "Transfer Money",
                    "fee": fee,
                    "to": {
                        "msg": "Destination",
                        "title": destWallet?.name,
                        "subTitle": `GHS ${destWallet?.current_balance}`,
                        "acc_num": destWallet?.account_number ? `****${destWallet?.account_number?.substring(6)}` : undefined,
                        "image_url": destWallet?.wallet_logo ? `${REACT_APP_ASSETS_API_URL}${destWallet?.wallet_logo}` : undefined
                    },
                    "from": {
                        "msg": "Source",
                        "title": sourceWallet?.name,
                        "subTitle": `GHS ${sourceWallet?.current_balance}`,
                        "acc_num": sourceWallet?.account_number ? `****${sourceWallet?.account_number?.substring(6)}` : undefined,
                        "image_url": sourceWallet?.wallet_logo ? `${REACT_APP_ASSETS_API_URL}${sourceWallet?.wallet_logo}` : undefined
                    },
                    "info": values,

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
                <ReviewPopUp setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
                <PassCode
                    isPassCodeVisible={passcode}
                    setPassCodeVisible={setPasscode}
                    details={details}
                    form={form}
                    action={accountTranfer}
                    buttonloading={btnLoading} />

                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    style={{ width: "100%" }}
                    onFinish={onFinish}
                    
                >
                    <div style={{display: "flex",  justifyContent: "center", alignItems: "center" }}>
                    <div className={Styles.sectionBox}>
                        <p>Source</p>
                                        <div className={Styles.secRow}>
                                            <div className={Styles.sectionB}>
                                                <div className={Styles.circle}></div>
                                            </div>
                                            
                                        </div>
                        <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Transfer From</div>
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

                    </div>
                   
                    <Divider>
                        <ArrowDownCircle width="2em" color="#63B344" />
                    </Divider>
                    
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className={Styles.sectionBox}>
                        <p>Destination</p>
                        <div className={Styles.secRow}>
                                            <div className={Styles.sectionB}>
                                                <div className={Styles.circle}></div>
                                            </div>
                                            
                                        </div>
                        <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Transfer To</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name={"destination"}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    {/* <JavolinAccounts setsourcewallet={setDestWallet} /> */}
                                    <JavolinAccountsFiltered setsourcewallet={setDestWallet} choosenwallet={sourceWallet.id} />
                                </Form.Item>
                            </div>
                        </div>

                    </div>
                    </div>
                   
                    
                    
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                size="large"
                                loading={feeLoading}

                            >
                                Transfer Money
                            </Button>
                 
                </Form>

            </>
        )
    }

    const { Content } = Layout;


    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Transfer Money</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Payment />

                        </div>
                    </Col>
                </div>
            </div>
        </Content>
    )
};

export default TransferMoney