import { Col, Row, Form, Select, Input, Checkbox, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import { saveKCYValues } from "../duck/action"



const ForeignExchange = ({form}) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.kyc.values)
    const {Option} = Select
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    const _currencies = currencies ? currencies : {}


    const handleFormSubmit = () => {
        let foreign_exchange = form.getFieldValue('foreignExchangeAndPayments')
            dispatch(saveKCYValues({
                ...formValues,
                foreignExchangeAndPayments: foreign_exchange
            }))
        }

    

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>FOREIGN EXCHANGE</p>
          

            <div className={Styles.formRow}>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="Purpose of transaction"
                            name={['foreignExchangeAndPayments', 'purpose']}
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
                        <Form.Item label="Currencies needed" rules={[{ required: true }]} name={['foreignExchangeAndPayments', 'currency']}>
                        <Select
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select currencies"
                            >
                                {
                            Object.values(_currencies)?.map((item) => {
                                return (
                                    <Option value={item.ISO} key={item.ISO}>{`${item.name} (${item.symbol})`} </Option>
                                )
                            })
                        }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="Countries which funds are expected to go to"
                            name={['foreignExchangeAndPayments', 'expected_funds_to']}
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
                        <Form.Item label="Countries which funds are expected to come from" rules={[{ required: true }]} name={['foreignExchangeAndPayments', 'expected_funds_from']}>
                            <Input size="large" />
                        </Form.Item>
                    </Col>
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


export default ForeignExchange