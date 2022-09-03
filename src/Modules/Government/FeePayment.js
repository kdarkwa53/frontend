import { Layout, Col, Input, Select, Form, Button, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { ArrowDownCircle } from "../../Shared/Components/JavIcons"
import Styles from "../TransferMoney/TransferMoney.module.css"
import { useDispatch, useSelector } from 'react-redux';
// import { bankTranfer, getTransactionFee, javolinTranfer, momoTranfer2 } from "./duck/action"
import PassCode from "../../Shared/Components/PassCode"
import Currencies from '../../Shared/Components/Currencies';
import JavolinAccounts from '../../Shared/Components/Accounts/JavolinAccounts';

// import MomoForms from './Components/MomoForm';
// import JavolinAccountForm from './Components/JavolinAccountForm';
// import BankOptionForm from './Components/BankOptionFrom';
// import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';
import { REACT_APP_ASSETS_API_URL } from '../../helpers/contants';
import { showErrorNotification } from '../../Shared/actions/alert.actions';
import MomoForms from '../TransferMoney/Components/MomoForm';
import BankOptionForm from '../TransferMoney/Components/BankOptionFrom';
import CardFrom from '../TransferMoney/Components/CardForm';
import CashFrom from '../TransferMoney/Components/CashForm';



const { Option } = Select;



const FeePayment = () => {
    const [form] = Form.useForm();
    const { Content } = Layout;
    const [paymentOption, setPaymentOption] = useState('')


    const handlePaymentOptionChange = (e) => {
        setPaymentOption(e)
    }

    const tnxType = {
        "javolin": {
            "form": "",
            "type": "JAVOLIN_TO_JAVOLIN_TRANSFER"
        },
        "momo": {
            "form": <MomoForms form={form} />,
            "type": "SEND_MOMO"
        },
        "bank": {
            "form": <BankOptionForm form={form} />,
            "type": "SEND_BANK"
        },
        "prepaid": {
            "form": <CardFrom form={form} />,
            "type": "SEND_BANK"
        },
        "cash": {
            "form": <CashFrom form={form} />,
            "type": "SEND_BANK"
        },
    }

     return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Trader Fee</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>
                                
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                >
                                    <div className={Styles.sectionBox}>
                                        <p>Paying as Individual</p>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>ID Type</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="id_type"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: "100%" }} size="large"  placeholder="Select ID Type">
                                                        <Option value="javolin">Driver License</Option>
                                                         <Option value="javolin">National ID</Option>
                                                         <Option value="javolin">Passport</Option>
                                                         <Option value="javolin">Voter ID</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>ID Card Number</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="id_number"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Input width="100%" size="large" name='id_number' placeholder='Eg. 024 110 2210' type="number" />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className={Styles.itemRow}>
                                            <div className={Styles.inputLabel}>Assembly / District</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                    name="district"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                    <Select style={{ width: "100%" }} size="large" placeholder='Select assembly/ district'>
                                                         <option value='Adansi South'>Adansi South </option>
                                                         <option value='Afigya-Kwabre'>Afigya-Kwabre</option>
                                                         <option value='Ahafo Ano North'>Ahafo Ano North</option>
                                                         <option value='Amansie Central'>Amansie Central </option>
                                                         <option value='Afigya-Kwabre'>Afigya-Kwabre</option>
                                                         <option value='Adansi North'>Adansi North </option>
                                                         <option value='Amansie West'>Amansie West  </option>
                                                         <option value='Asante Akim South'>Asante Akim South </option>
                                                         <option value='Atwima Kwanwoma'>Atwima Kwanwoma</option>
                                                         <option value='Atwima Mponua'>Atwima Mponua  </option>
                                                         <option value='Atwima Nwabiagya'>Atwima Nwabiagya  </option>
                                                         <option value='Bosome Freho'>Bosome Freho  </option>
                                                         <option value='Bosomtwe'>Bosomtwe  </option>
                                                         <option value='Ejura Sekyedumase'>Ejura Sekyedumase   </option>
                                                         <option value='Kwabre'>Kwabre   </option>
                                                         <option value='Offinso North'>Offinso North   </option>
                                                         <option value='Sekyere Afram Plains '>Sekyere Afram Plains  </option>
                                                         <option value='Sekyere Central '>Sekyere Central  </option>
                                                         <option value='Sekyere East'>Sekyere East  </option>
                                                         <option value='Sekyere South'>Sekyere South  </option>
                                                         <option value='Asunafo South'>Asunafo South  </option>
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>         
                                    <div className={Styles.sectionBox}>
                                        <p>Payment Option</p>
                                        <div className={Styles.itemRow}>
                                             <div className={Styles.inputLabel}>How do you want to pay?</div>
                                            <div className={Styles.inputContainer}>
                                                <Form.Item
                                                     name="payment_option"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        },
                                                    ]}
                                                >
                                                     <Select style={{ width: "100%" }} size="large" onChange={handlePaymentOptionChange} placeholder="Select payment type">
                                                         
                                                        <Option value="momo">Mobile Money (Momo) Account</Option>
                                                        <Option value="prepaid">Prepaid Visa Card</Option>
                                                         {/* <Option value="javolin">Javolin Account</Option> */}
                                                         <Option value="bank">Bank Account</Option>
                                                         <Option value="cash">Cash</Option>
                                                        
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                        </div>

                                         {tnxType[paymentOption]?.form}

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
                                    </div>  
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2}>
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
};

export default FeePayment