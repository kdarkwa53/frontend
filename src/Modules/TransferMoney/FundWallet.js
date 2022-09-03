import { Layout, Col, Input, Select, Form, Button, Divider, Tag } from 'antd';
import { useState } from 'react';
import { ArrowDownCircle } from "../../Shared/Components/JavIcons"
import Styles from "./TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
import PassCode from "../../Shared/Components/PassCode"
import Currencies from '../../Shared/Components/Currencies';

import MomoForms from './Components/MomoForm';

// import CardFrom from './Components/CardForm';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { makeDeposit } from '../Savings/duck/action';
import AwaitDepositApproval from '../Savings/MakeDeposit/AwaitDepositApproval';
import { showErrorNotification } from '../../Shared/actions/alert.actions';
import { getPrepaidLink, getTransactionFee } from './duck/action';




const { Option } = Select;



const FundWallet = () => {
    const [form] = Form.useForm();
    const [review, setReview] = useState(false)

    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    const btnLoading = useSelector((state) => state?.savings?.makingDeposit)
    const getLoading = useSelector((state) => state?.savings?.gettingPLink)
    const feeLoading = useSelector((state) => state?.transfer?.gettingFee)
    let currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    let defaultWallet = useSelector((state) => state?.user?.default_savings_wallet)


    const [destination, setDestination] = useState('')
    const [sourceWallet, setsourcewallet] = useState('')
    const [approving, showApproving] = useState(false)
    const dispatch  = useDispatch()



    const sendingTo = {
        "momo": {
            "form": <MomoForms form={form} />,
            "action": makeDeposit
        }
        ,
        "card": {
            "form": "",
            "action": getPrepaidLink
        }
    }
    const onFinish = (values) => {

        if (destination === "momo"){
            try {
                dispatch(getTransactionFee({
                    "module": "JAVOLIN_TOP_UP",
                    "amount": values?.amount,
                    "currency_id": 2
                })).then((fee) => {
                    console.log(fee)
                    let info = {
                        "action": "Fund wallet",
                        "operation": "Sending",
                        "fee": fee,
                        "to": {
                            "msg": "Funding Account",
                            "title": sourceWallet?.name,
                            "subTitle": `GHS ${sourceWallet?.current_balance}`,
                            "acc_num": `****${sourceWallet?.account_number?.substring(6)}`,
                            "image_url": `${REACT_APP_ASSETS_API_URL}${sourceWallet?.wallet_logo}`
                        },
                        "from": {
                            "msg": "Funding source",
                            "title": values.source === "card" ? values?.card_name : "Mobile Money",
                            "subTitle": values.source === "momo" ? values?.momo_number : "",
                            "acc_num": values.source === "card" ? `****${values?.card_number.substr(0, 4)}` : "",
                            "image_url": ""
                        },
                        "info": values
                    }
                    setDetails(info)
                    setReview(true)
                })
            } catch (error) {
                dispatch(showErrorNotification('An error occurred. Try again later!'))
            }
        }else{
            setDetails(values)
            setPasscode(true)
        }


       

    }

    const handleDestinationChange = (e) => {
        setDestination(e)
    }







    const { Content } = Layout;

    const myStylesheet = {

    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
}
    

    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Fund My Wallet</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>
                                <AwaitDepositApproval approving={approving} showApproving={showApproving} />
                                <ReviewPopUp setReview={setReview} details={details} setPasscode={setPasscode} showReview={review} />
                                <PassCode isPassCodeVisible={passcode}
                                    setPassCodeVisible={setPasscode}
                                    details={details}
                                    form={form}
                                    action={destination==="momo" ? makeDeposit : getPrepaidLink}
                                    buttonloading={destination === "momo" ? btnLoading : getLoading}
                                    approving={approving}
                                    showApproving={showApproving}
                                />
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                >

                                    <div className={Styles.sectionBox}>
                                        <p>Funding Source</p>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Fund from</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="source"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: "100%" }} size="large" onChange={handleDestinationChange} placeholder="destination">
                                                        <Option value="momo">Mobile Money (Momo) </Option>
                                                        <Option value="card"> New Debit/Credit Card </Option>
                                                        {/* <Option value="bank"> <div style={myStylesheet.item}> <div>Bank Account </div><div> <Tag color={"processing"}>coming soon</Tag> </div> </div></Option> */}
                                                        <Option value="cash"> <div style={myStylesheet.item}> <div> Cash </div><div> <Tag color={"processing"}>coming soon</Tag> </div> </div></Option>

                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                        {sendingTo[destination]?.form}
                                    </div>

                                    <Divider>
                                        <ArrowDownCircle width="2em" color="#63B344" />
                                    </Divider>

                                    <div className={Styles.sectionBox}>
                                        <p>Funding Details</p>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Funding Destination</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name={"account"}
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
                                                    <Input prefix={currencies[defaultWallet?.currency_id].ISO} width="100%" size="large" name='amount' type="number" />
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
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2} >
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                loading={feeLoading}
                                            >
                                                Fund Wallet
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

export default FundWallet