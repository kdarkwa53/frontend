import { Input, Select, Form, Button, Divider, Radio, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import {useState} from "react"
import { ArrowDownCircle } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import PrepaidReview from "../components/PrepaidReview"


const PrepaidPage3 = ({details, setDetails}) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const genderOptions = ['Male', 'Female'];
    // const booleanOptions = ['Yes', 'No']
    const loading = useSelector((state) => state.prepaid.submittingPrepaid)
    const [review, setReview] = useState(false)
    // const dispatch = useDispatch()
    const onFinish = (values) => {
        
        values = {
            ...details, 
            address_info:{
                ...details.address_info,
                tme_at_present_address: details.address_info?.tme_at_present_address._d?.toISOString().slice(0, 10).toString()
            },
            ...values, birth_info: {
                ...values.birth_info, date_of_birth: values.birth_info.date_of_birth._i, 
}}
        setDetails(values)
        setReview(true)
    };

    return (
        <>
            <PrepaidReview setReview={setReview} showReview={review} details={details}/>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                style={{ width: "100%" }}
                onFinish={onFinish}
                initialValues={details}
            >

                <div className={Styles.sectionBox}>
                    <p>Birth Info</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Date of Birth</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["birth_info","date_of_birth"]}
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
                        <div className={Styles.inputLabel}>Place of Birth</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["birth_info", "place_of_birth"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" placeholder="Eg. Ghana" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Gender at Birth</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["birth_info", "gender"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group options={genderOptions} />
                            </Form.Item>
                        </div>
                    </div>
                </div>


                <Divider>
                    <ArrowDownCircle width="2em" color="#63B344" />
                </Divider>

                <div className={Styles.sectionBox}>
                    <p>Customer Info</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Nationality</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["customer_info", "nationality"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" placeholder="Eg. Ghanaian" />
                            </Form.Item>
                        </div>
                    </div>

                    {/* <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Are you a Javolin Customer</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["customer_info", "are_you_a_customer"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group options={booleanOptions} />
                            </Form.Item>
                        </div>
                    </div> */}
                </div>

                <Divider>
                    <ArrowDownCircle width="2em" color="#63B344" />
                </Divider>

                <div className={Styles.sectionBox}>
                    <p>Identification</p>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Residence permit no.</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["identification_info", "residential_permit"]}
                            >
                                <Input width="100%" size="large" name='permit' placeholder="Eg. 1399193" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Type of ID</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["identification_info", "id_type"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }} size="large" placeholder="Select ID type">
                                    <Option value="nationalID">National ID</Option>
                                    <Option value="passport">International Passport</Option>
                                    <Option value="driversLicence">Drivers License</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>ID no.</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["identification_info", "id_number"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" placeholder="Eg. 1399193" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={Styles.itemRow}>
                        <div className={Styles.inputLabel}>Country of Issue</div>
                        <div className={Styles.inputContainer}>
                            <Form.Item
                                name={["identification_info", "country_issue"]}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input width="100%" size="large" name='countryOfIssue' placeholder="Eg. Ghana" />
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
                            loading={loading}
                        >
                            SAVE & CONTINUE
                        </Button>
                    </div>
                </div>
            </Form>

        </>
    )
}


export default PrepaidPage3