import { Col, Row, Form, Select, Input, Checkbox, Button, Radio } from "antd"
import { useState } from "react"
import IntlTelInput from "react-intl-tel-input"
import { useDispatch, useSelector } from "react-redux"
import GoogleAPIAddressInput from "../../../Shared/Components/GoogleAPIAddressInput/GoogleAPIAddressInput"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import { saveKCYValues } from "../duck/action"



const ClientInformation = ({ form }) => {
    const dispatch = useDispatch()
    const [phoneValid, setPhoneValid] = useState('')
    const [intNum, setIntNum] = useState("")
    const formValues = useSelector((state) => state.kyc.values)
    const handleFormSubmit = () => {
        const values = form.getFieldValue('clientInformation')
        console.log(values)
        dispatch(saveKCYValues({
            ...formValues,
            clientInformation: {
                ...values,
                street_address: values?.street_address?.label,
                business_number: intNum
            }
        }))
    }

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>Business Details</p>

            <div className={Styles.formRow}>
                <h5>Business Information</h5>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="Client Organization’s Complete Legal name"
                            name={['clientInformation', 'legal_name']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="DBA / Trade Name">
                            <Form.Item rules={[{ required: true }]} noStyle name={['clientInformation', 'trade_name']}>
                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
            </div>

            <div className={Styles.formRow}>
                <h5>Contact / Address Information</h5>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="Address"
                            name={['clientInformation', 'address']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <GoogleAPIAddressInput  default={formValues?.clientInformation?.street_address}  />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Business Telephone number" 
                        rules={[{ required: true }
                        
                        ]
                        
                        } 
                        name={['clientInformation', 'business_telephone_number']}>
                            <Input size="large" placeholder="+12345678910"/>
                        </Form.Item>
                    </Col>


                    {/* <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="City/Town" rules={[{ required: true }]} name={['clientInformation', 'city']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="State/Region" rules={[{ required: true }]} name={['clientInformation', 'region']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col> */}
                </Row>
                {/* <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            label="Zip Code"
                            name={['clientInformation', 'zip_code']}
                            
                        >

                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Country" rules={[{ required: true }]} name={['clientInformation', 'country']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Business Telephone number" rules={[{ required: true }]} name={['clientInformation', 'busines_number']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Email Address" name={['clientInformation', 'email_address']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                </Row> */}

            </div>
            <div className={Styles.formRow}>
                <h5>Legal Structure</h5>

                <Row gutter={[32, 16]}>
                    <Form.Item
                        name={['clientInformation', 'legal_structure']}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Radio.Group style={{ width: '100%' }}>
                            <Row gutter={[32, 16]}>
                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="corporation">Corporation/Ltd</Radio>
                                </Col>


                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="limited_liability_company">Limited Liability Company</Radio>
                                </Col>
                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="publicly_traded">Publicly Traded</Radio>
                                </Col>
                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="partnership">Partnership</Radio>
                                </Col>
                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="trust">Trust</Radio>
                                </Col>
                                <Col span={8}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="non_profit">Non-Profit</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>

                        {/* <Radio.Group style={{ width: '100%' }}>
                            <Row gutter={[32, 16]}>
                                <Col style={{ width: "100%" }} span={12}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="yes">Yes</Radio>
                                </Col>
                                <Col span={12}>
                                    <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="no">No</Radio>
                                </Col>
                            </Row>
                        </Radio.Group> */}

                    </Form.Item>
                </Row>

            </div>
            <div className={Styles.formRow}>
                <h5>Business Identity</h5>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            label="Tax ID/ EIN"
                            name={['clientInformation', 'tax_id']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Client Primary Activities" rules={[{ required: true }]} name={['clientInformation', 'primary_activities']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Website link" name={['clientInformation', 'website_link']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item
                            label="Country of Formation"
                            name={['clientInformation', 'formation_country']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            <Input size="large" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="State/Region Of Formation" rules={[{ required: true }]} name={['clientInformation', 'formation_state']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Business Incorporation number" rules={[{ required: true }]} name={['clientInformation', 'incorporation_number']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                        <Form.Item label="Type of Business" rules={[{ required: true }]} name={['clientInformation', 'business_type']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col> */}
                </Row>


            </div>
            <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                <div className={Styles.tnxButton3}>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        size="large"
                        onClick={handleFormSubmit}

                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default ClientInformation