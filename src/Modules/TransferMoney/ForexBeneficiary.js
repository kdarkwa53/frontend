import Styles from "./TransferMoney.module.css"
import { Layout, Col, Select, Form, Button } from 'antd';
import InternationalBankTransferForm from "./Components/InternationalBankTranferForm";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";


const ForexBeneficiary = () => {
    const [form] = Form.useForm();
    const bene = useSelector((state) => state?.transfer?.beneficiaries)

    const history = useHistory()
    const onFinish = (values) => {
        const id = values.beneficiary_account
        const beneficiary = bene[id]
        history.push({
            pathname: '/send-money/forex',
            state: beneficiary
        })
    }
    const { Content } = Layout
    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Forex</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>

                                <Form
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                >


                                    <div className={Styles.sectionBox}>
                                        <p>Destination Account</p>

                                        <InternationalBankTransferForm type={'forex'}  />
                                    </div>
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton}>
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                            >
                                                Continue
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
}

export default ForexBeneficiary