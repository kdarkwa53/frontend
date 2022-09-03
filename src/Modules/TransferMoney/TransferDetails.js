import { Layout, Col, Input, Select, Spin, Form, Button } from 'antd';
import { useState } from 'react';
import { RightArrow } from "../../Shared/Components/JavIcons"
import Styles from "./TransferMoney.module.css"
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getReceiverName, momoTranfer } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
const { Option } = Select;

const TransferMoney = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    // const userDetails = useSelector((state) => state?.login?.user)
    const [loading, setLoading] = useState(false);
    const [recepient, setRecepient] = useState("");
    const [passcode, setPasscode] = useState(false)
    const [details, setDetails] = useState("")
    const btnLoading = useSelector((state) => state?.transfer?.sendingMomo)



    const handleGetRecepient = () => {
        const { momo_number, momo_network } = form.getFieldsValue()
        try {
            setLoading(true)
            dispatch(getReceiverName({ momo_number, momo_network })).then((res) => {
                console.log(res, momo_number, momo_network)
                setRecepient(res?.name)
                setLoading(false)
            })

        } catch (err) {
            setLoading(false)
        }


    }


    const onFinish = (values) => {
        setDetails(values)
        setPasscode(true)
    }


    const SpinLoader = () => {
        return (
            <Spin />
        )
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
                    <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                        Amount
                    </div>
                    <Input.Group size="large" compact>
                        <Select size="large" style={{ width: '17%' }} defaultValue="cedis">
                            <Option value="cedis">₵</Option>
                            <Option value="naira">₦</Option>
                            <Option value="dollar">$</Option>
                            <Option value="pound">£</Option>
                            <Option value="rand">R</Option>
                        </Select>
                        <Form.Item
                            name="amount"
                            style={{ width: "80%" }}
                            rules={[
                                { required: true },
                                {
                                    pattern: /^[1-9]+[0-9]*$/,
                                    message: `Input invalid`
                                }
                            ]}
                        >
                            <Input size="large" name='amount' style={{ width: '100%' }} type="number" addonAfter=".00" />
                        </Form.Item>
                    </Input.Group>
                    <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                        Phone Number
                    </div>
                    <Input.Group size="large" compact>
                        <Select size="large" defaultValue="cedis">
                            <Option value="cedis">+233</Option>
                            <Option value="naira">+234</Option>
                            <Option value="dollar">+1</Option>
                            <Option value="pound">+44</Option>
                            <Option value="rand">+27</Option>
                        </Select>
                        <Form.Item
                            name="momo_number"
                            style={{ width: "80%" }}
                            rules={[
                                {
                                    required: true,
                                    len: 10,
                                    message: "invalid number"
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} type="number" placeholder="mobile number" />
                        </Form.Item>
                    </Input.Group>
                    <>
                        <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                            Network
                        </div>
                        <Form.Item
                            name="momo_network"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select style={{ width: "100%" }} size="large" onSelect={handleGetRecepient} defaultValue="Select network">
                                <Option value="MTN">MTN</Option>
                                <Option disabled value="VODA">VODAFONE CASH</Option>
                                <Option disabled value="TIGO">AIRTELTIGO CASH</Option>
                            </Select>
                        </Form.Item>
                        <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                            Reciepient Name
                        </div>
                        {loading ? (<SpinLoader />) : (
                            <Input style={{ width: '100%' }} size="large" disabled name="recepient" value={recepient} />
                        )}
                        <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                            Remark
                        </div>
                        <Form.Item
                            name="remark"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} size="large" placeholder="enter remarks" />
                        </Form.Item>
                    </>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"

                    >
                        SUBMIT
                    </Button>
                </Form>
            </>
        )
    }

    const { Content } = Layout;
    const history = useHistory()


    return (
        <Content style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <PassCode isPassCodeVisible={passcode} setPassCodeVisible={setPasscode} details={details} form={form} action={momoTranfer} buttonloading={btnLoading} />
            <Col xs={24} sm={24} md={12} lg={9} xl={9} className={Styles.cardContent}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
                        <RightArrow width="15px" />
                    </div>
                    <div style={{ fontSize: "25px", fontWeight: "500" }}>
                        Transfer Mobile Money
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Payment />

                </div>
            </Col>
        </Content>
    )
};

export default TransferMoney