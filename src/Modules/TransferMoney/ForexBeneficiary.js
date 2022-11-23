import Styles from "./TransferMoney.module.css"
import { Layout, Col, Select, Form, Button } from 'antd';
import InternationalBankTransferForm from "./Components/InternationalBankTranferForm";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import JavContentTitle from "../../Shared/Components/JavContentTitle";


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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={Styles.cardContent}>
                        <div style={{ width: "100%", padding: "0 3em", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>

                                <Form
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                >


                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div className={Styles.sectionBox}>
                                    <JavContentTitle title="Beneficiary Account"/>
                                        
                                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            <InternationalBankTransferForm type={'forex'}  />
                                        </div>
                                        
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