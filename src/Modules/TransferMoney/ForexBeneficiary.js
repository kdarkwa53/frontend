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


                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div className={Styles.sectionBox}>
                                        <p>Destination Account</p>
                                        <div className={Styles.secRow}>
                                            <div className={Styles.sectionB}>
                                                <div className={Styles.circle}></div>
                                            </div>
                                        </div>

                                        <InternationalBankTransferForm type={'forex'}  />
                                    </div>
                                   
                                            <Button
                                                type="primary"
                                                style={{width: "400px"}}
                                                htmlType="submit"
                                                shape="round"
                                                size="large"
                                            >
                                                Continue
                                            </Button>
                               
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