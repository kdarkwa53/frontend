import { Layout, Col, Modal } from 'antd';
import { useState } from 'react';
import { MomoIcon, RightArrow, CardPaymentIcon } from "../../Shared/Components/JavIcons"
import PaymentOptionCard from "../../Shared/Components/PaymentOptionCard"
import Styles from "./ChoosePaymentOption.module.css"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addDeposit } from "./duck/action"

const ChoosePaymentOption = () => {
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [paymentOption, setPaymentOption] = useState(false);
    const [details, setDetails] = useState({ date: "", payment_method: "", amount: "" })

    const showModal = (option) => {
        setIsModalVisible(true);
        setDetails({
            ...details,
            payment_method: option
        })
        // setPaymentOption(option)
    };

    const handleOk = () => {
        // setIsModalVisible(false);

        dispatch(addDeposit(details, history))
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };






    const Payment = () => {

        return (
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Coming Soon
                </p>
            </Modal>
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
            <Col xs={24} sm={24} md={12} lg={9} xl={9} className={Styles.cardContent}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
                    <div style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
                        <RightArrow width="15px" />
                    </div>
                    <div style={{ fontSize: "25px", fontWeight: "500" }}>
                        Choose method
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <PaymentOptionCard onClick={() => history.push("/make-deposit")} icon={<MomoIcon weight="30px" />} label={"Mobile Money"} />
                    <PaymentOptionCard onClick={() => showModal("card")} icon={<CardPaymentIcon width="30px" />} label={"Debit/Credit Card"} />
                </div>
                <Payment />
            </Col>
        </Content>
    )
};

export default ChoosePaymentOption