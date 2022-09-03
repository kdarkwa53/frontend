import { Input, Form, Button, Divider, Radio, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Currencies from '../../../Shared/Components/Currencies';
import { ArrowDownCircle } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import { savePrepaid } from '../duck/action';


const PrepaidPage2 = ({details, setDetails}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const history = useHistory() //._d.toISOString().slice(0, 10).toString()
    const onFinish = (values) => {
        values = { ...details, ...values, address_info: { ...values.address_info, tme_at_present_address: values.address_info.tme_at_present_address}}
        setDetails(values)
        dispatch(savePrepaid(values))
        history.push("/prepaid/apply/3")
        scrollToTop()
    };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        window.scrollTop = 0;
    }
    const checkboxOptions = ['Own residence', 'Tenant'];

    return (
        <>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                style={{ width: "100%" }}
                onFinish={onFinish}
                initialValues={details}
            >

                <div className={Styles.sectionBox}>
                    <p>Address</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Residential address(Street)</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["address_info","current_physical_address"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" placeholder="Eg. Nhyira Street" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Country</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["address_info", "country"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                    <Input width="100%" size="large" disabled />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>City</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["address_info", "city"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='city' placeholder="Eg. Accra" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Time at present address</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["address_info", "tme_at_present_address"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <DatePicker size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Residential status</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["address_info", "residential_status"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group options={checkboxOptions} />
                            </Form.Item>
                        </div>
                    </div>
                </div>


                <Divider>
                    <ArrowDownCircle width="2em" color="#63B344" />
                </Divider>

                <div className={Styles.sectionBox}>
                    <p>Occupational Info</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Email</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["occupational_info", "email"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='email' placeholder="Eg. matilda.ern@gmail.com" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Occupation/Profession</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["occupational_info", "occupation"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='occupation' placeholder="Eg. Accountant" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Expected annual income</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["occupational_info", "income"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input prefix={<Currencies />} size="large" name='income' placeholder="48000" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Mobile Number</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                            name={["occupational_info", "phone_number"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large" />
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


export default PrepaidPage2