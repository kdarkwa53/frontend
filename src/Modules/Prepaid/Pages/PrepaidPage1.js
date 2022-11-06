import { Input, Select, Form, Button, Divider, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ArrowDownCircle } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import { savePrepaid } from '../duck/action';


const PrepaidPage1 = ({details, setDetails}) => {
    const { Option } = Select;
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const history = useHistory()
    const onFinish = (values) => {
        values = {
            ...details, ...values, preferred_name_on_card: `${values.first_name} ${values.surname}`
}
        setDetails(values)
        dispatch(savePrepaid(values))
        history.push( {pathname:"/prepaid/apply/2"})
        scrollToTop()
    };

    const checkboxOptions = ['ATM', 'POS', 'WEB'];
    
    const scrollToTop = () => {
        window.scrollTo(0, 0);
        window.scrollTop = 0;
    }
    return (
        <>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                style={{ width: "100%" }}
                initialValues={details}
                onFinish={onFinish}
            >

                <div className={Styles.sectionBox}>
                    <p>CARD INFO</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Prepaid Card Type</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="prepaid_card_type"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" disabled />
                                {/* <Select style={{ width: "100%" }} size="large" placeholder="Select prepaid card type">
                                    <Option value="visa">Visa</Option>
                                    <Option value="mastercard">Mastercard</Option>
                                    <Option value="others">others</Option>
                                </Select> */}
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Card Type</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="card_type"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" disabled />
                                {/* <Select style={{ width: "100%" }} size="large" placeholder="Select card type">
                                    <Option value="personalized">Personalized</Option>
                                    <Option value="instant">Instant</Option>
                                </Select> */}
                            </Form.Item>
                        </div>
                    </div>
                </div>


                <Divider>
                    <ArrowDownCircle width="2em" color="#63B344" />
                </Divider>

                <div className={Styles.sectionBox}>
                    <p>BIO DATA</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Title</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }} size="large" placeholder="Select title">
                                    <Option value="mr">Mr</Option>
                                    <Option value="miss">Miss</Option>
                                    <Option value="ms">Ms.</Option>
                                    <Option value="dr">Dr.</Option>
                                    <Option value="prof">Prof.</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Surname</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='surname' placeholder="Eg. Albann" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Middle name</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="middle_name"
                            >
                                <Input width="100%" size="large" name='middleName' placeholder="Eg. Menns" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>First name</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='firstName' placeholder="Eg. George" />
                            </Form.Item>
                        </div>
                    </div>
                    {/* <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Preferred name on card</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="preferred_name_on_card"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='preferredName' placeholder="Eg. George Albann" />
                            </Form.Item>
                        </div>
                    </div> */}
                </div>

                <Divider>
                    <ArrowDownCircle width="2em" color="#63B344" />
                </Divider>

                <div className={Styles.sectionBox}>
                    <p>Channels</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Channel(s) to enable</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name="channels"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Checkbox.Group options={checkboxOptions} />

                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className={Styles.buttonContainter}>
                    <div >
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"
                            style={{ width: "400px" }}

                        >
                            SAVE & CONTINUE
                        </Button>
                    </div>
                </div>
            </Form>

        </>
    )
}


export default PrepaidPage1