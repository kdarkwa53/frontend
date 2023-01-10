import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button, Radio } from "antd"
import { useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { REACT_APP_GOOGLE_API_URL } from "../../../helpers/contants"
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { saveKCYValues } from "../duck/action"







const BankSettlement = ({ form }) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.kyc.values)

    const data = formValues?.bankSettlement ? formValues?.bankSettlement : []

    const openNewUserForm = () => {
        form.setFieldsValue({
            bankSettlement: ""
        })
        setShowForm(true)
    }

    const handleFormSubmit = () => {
        let values = form.getFieldValue('bankSettlement')
        let bankSettlement = formValues?.bankSettlement

    

        console.log('values: ', values)
        if (values.id !== undefined) {
            // Editing an item
            let bankSettlement_ = bankSettlement
            bankSettlement_.splice(values.id, 1, values)
            dispatch(saveKCYValues({
                ...formValues,
                user_roles: bankSettlement_
            }))
        }
        else {
            // normal save 
            const new_values = bankSettlement !== undefined ? bankSettlement?.concat(values) : [values]
            dispatch(saveKCYValues({
                ...formValues,
                bankSettlement: new_values
            }))
        }

        setShowForm(false)

    }

    // function to show the edit form prepopulated
    const handleEditForm = (item_id) => {
        const bankSettlement = formValues?.bankSettlement

        // Changes date format to moment
        const editValues = {
            ...bankSettlement[item_id],
            id: item_id,
        }

        console.log({
            ...bankSettlement[item_id],
            id: item_id,
        })
        form.setFieldsValue({
            bankSettlement: editValues
        })
        setShowForm(true)
    }

    const BankSettlementForms = ({ form }) => {
        return (
            <>
                <div className={Styles.formRow}>
                    <Input hidden name={['bankSettlement', 'id']} />
                    <Row gutter={[32, 4]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Bank name">
                                <Form.Item
                                    name={['bankSettlement', 'bank_name']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label="Bank Address"
                                name={['bankSettlement', 'bank_address']}
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
                            <Form.Item label="Account number" rules={[{ required: true }]} name={['bankSettlement', 'account_number']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Currency of account" rules={[{ required: true }]} name={['bankSettlement', 'account_currency']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
                            <Form.Item
                                label="Type of transaction"
                                name={['bankSettlement', 'type_of_transaction']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Radio.Group style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="transit">Transit</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="aba">ABA</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="fedwire">Fedwire</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="sort_code_number">Sort Code Number</Radio>
                                        </Col>

                                    </Row>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
                            <Form.Item
                                label="Settlement method"
                                name={['bankSettlement', 'settlement_method']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="ach">ACH</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="wire">Wire</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="draft">Draft</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="check">Check</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="electronic_bill_payment">Electronic bill payment</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="checkmatic">Checkmatic</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="reverse_wire_drawdown">Reverse wire drawdown</Checkbox>
                                        </Col>

                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>

                    </Row>


                </div>

                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            // htmlType="submit"
                            size="large"
                            onClick={handleFormSubmit}

                        >
                            Save
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    const BankSettlementList = ({ onCLickEdit }) => {
        return (
            <>
                {data.map((item, i) => {
                    return (
                        <Col key={i} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <KYCListCard onCLickEdit={onCLickEdit}  name={item.bank_name} id={i}/>
                        </Col>
                    )
                })}
                <div onClick={openNewUserForm} className={Styles.kycSubNote}> <PlusIcon height={'1em'} width={'1em'} color={'#0032A0'} /> Add another user</div>
                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
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
            </>

        )
    }

    const formState = data.length === 0
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showForm, setShowForm] = useState(formState)

  

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>BANKING & SETTLEMENT</p>
            <h5 >Banking & Settlement Information</h5>
            {
                showForm ? (
                    <BankSettlementForms form={form} />
                ) :
                    <BankSettlementList onCLickEdit={handleEditForm} />
            }
        </div>
    )
}


export default BankSettlement