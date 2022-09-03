import { Layout, Col, Form, } from 'antd';
import { useState } from 'react';
import { RightArrow } from "../../../Shared/Components/JavIcons"
import Styles from "../../../Modules/TransferMoney/TransferMoney.module.css"
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import { makeDeposit } from '../duck/action';
import PinCode from "../../../Shared/Components/PinCode"
import MakeDepositForm from './MakeDepositForm';
import AwaitDepositApproval from './AwaitDepositApproval';

import { useDispatch } from "react-redux";




const TransferMoney = () => {
    const [form] = Form.useForm();
    const [passcode, setPasscode] = useState(false)
    const [codeValue, setCodeValue] = useState("")
    const [details, setDetails] = useState("")
    const [approving, showApproving] = useState(false)

    const { Content } = Layout;
    const history = useHistory()
    const dispatch = useDispatch();

    const btnLoading = useSelector((state) => state?.savings?.makingDeposit)



    const onFinish = (values) => {
        setDetails(values)
        setPasscode(true)
    }


    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const passcode = {
                    "app_passcode": codeValue.substring(codeValue.length - 6, codeValue.length)
                }
                let body = {
                    ...details,
                    ...passcode,
                }

                dispatch(makeDeposit(body, setPasscode, showApproving, approving, history))
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });

    }




    return (
        <Content style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <PinCode
                isPassCodeVisible={passcode}
                setPassCodeVisible={setPasscode}
                form={form}
                handleSubmit={handleSubmit}
                buttonloading={btnLoading}
                codeValue={codeValue}
                setCodeValue={setCodeValue}
            />
            <Col xs={24} sm={24} md={12} lg={9} xl={9} className={Styles.cardContent}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
                    <div style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
                        <RightArrow width="15px" />
                    </div>
                    <div style={{ fontSize: "25px", fontWeight: "500" }}>
                        Make Deposit
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <MakeDepositForm handleFinish={onFinish} />
                </div>
            </Col>
            <AwaitDepositApproval approving={approving} showApproving={showApproving} />
        </Content>
    )
};

export default TransferMoney