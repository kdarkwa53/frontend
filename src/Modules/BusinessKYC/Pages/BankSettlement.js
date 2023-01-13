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

    const data = formValues?.bakingAndSettlement ? formValues?.bakingAndSettlement : []

    const openNewUserForm = () => {
        form.setFieldsValue({
            bakingAndSettlement: ""
        })
        setShowForm(true)
    }

    const handleFormSubmit = () => {
        let values = form.getFieldValue('bakingAndSettlement')
        let bakingAndSettlement = formValues?.bakingAndSettlement

    

        console.log('values: ', values)
        if (values.id !== undefined) {
            // Editing an item
            let bankSettlement_ = bakingAndSettlement
            bankSettlement_.splice(values.id, 1, values)
            dispatch(saveKCYValues({
                ...formValues,
                user_roles: bankSettlement_
            }))
        }
        else {
            // normal save 
            const new_values = bakingAndSettlement !== undefined ? bakingAndSettlement?.concat(values) : [values]
            dispatch(saveKCYValues({
                ...formValues,
                bakingAndSettlement: new_values
            }))
        }

        setShowForm(false)

    }

    // function to show the edit form prepopulated
    const handleEditForm = (item_id) => {
        const bankSettlement = formValues?.bakingAndSettlement

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
            bakingAndSettlement: editValues
        })
        setShowForm(true)
    }

    const BankSettlementForms = ({ form }) => {
        return (
            <>
                <div className={Styles.formRow}>
                    <Input hidden name={['bakingAndSettlement', 'id']} />
                    <Row gutter={[32, 4]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Bank name">
                                <Form.Item
                                    name={['bakingAndSettlement', 'bank_country']}
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
                            <Form.Item label="Bank name">
                                <Form.Item
                                    name={['bakingAndSettlement', 'bank_name']}
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
                                name={['bakingAndSettlement', 'bank_address']}
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
                            <Form.Item label="Account number" rules={[{ required: true }]} name={['bakingAndSettlement', 'account_number']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Account number" rules={[{ required: true }]} name={['bakingAndSettlement', 'account_holder_name']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Currency of account" rules={[{ required: true }]} name={['bakingAndSettlement', 'account_currency']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
                            <Form.Item
                                label="Type of transaction"
                                name={['bakingAndSettlement', 'type_of_transaction']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Radio.Group style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Transit">Transit</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="ABA">ABA</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Fedwire">Fedwire</Radio>
                                        </Col>
                                        <Col span={8}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Sort_Code_Number">Sort Code Number</Radio>
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
                                name={['bakingAndSettlement', 'settlement_method']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="ACH">ACH</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Wire">Wire</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Draft">Draft</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Check">Check</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Electronic_Bill_Payment">Electronic bill payment</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Checkmatic">Checkmatic</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="Reverse_Wire_Drawdown">Reverse wire drawdown</Checkbox>
                                        </Col>

                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        </Col>

                    </Row>


                </div>

                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                <div onClick={()=>setShowForm(false) } className={Styles.cancelBtn}>
                        Cancel
                    </div>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            shape="round"
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