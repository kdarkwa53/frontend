import { Input, Select, Form, Spin, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanksAndMomos } from '../../../Shared/Components/duck/action';
import { getAccountHolderName } from "../../TransferMoney/duck/action"
import Styles from "../TransferMoney.module.css"
const { Option } = Select;


const BankOptionForm = ({ form }) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(
            getBanksAndMomos()
        )
    }, [dispatch])

    const state = useSelector((state) => state?.resources?.banksAndMomos)
    const [recepient, setRecepient] = useState()
    const [loading, setLoading] = useState()
    const text = useSelector((state)=> state.language)

    const handleGetRecepient = () => {
        const { bank_name, acc_number } = form.getFieldsValue()
        try {

            setLoading(true)
            dispatch(getAccountHolderName({ bank_code: bank_name, bank_number: acc_number })).then((res) => {
                setRecepient(res?.name)
                form.setFieldsValue({
                    acc_name: res?.name
                })
                setLoading(false)
            })
        } catch (err) {
            setLoading(false)

        }
    }

    const banks = state?.filter((bank) => {
        return bank.type === "bank"
    })


    const resetNameField = () => {
        form.setFieldsValue({
            recepient: ""
        })
    }

    return (
        <Row gutter={[32, 16]}>
            
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label={text["Bank"]}>
                    <Form.Item
                        name={text["bank_name"]}
                        onChange={resetNameField}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >

                        <Select showSearch
                         size="large" 
                         defaultValue={text["Select Bank"]}
                        optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                         >
                            {banks?.map((bank) => {
                                return (
                                    <Option key={bank.code} value={bank.code}>{bank.name}</Option>
                                )
                            })}
                        </Select>

                    </Form.Item>
                    </Form.Item>
                    </Col>
            
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label={text["Account Number"]}>
                    <Form.Item
                        name="acc_number"
                        onChange={resetNameField}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >

                        <Input size="large" type="number" placeholder="1223330031393" />
                    </Form.Item>
                    </Form.Item>
                </Col>
            
            
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item label={text["Account Name"]}>
                        {loading ? (<Spin />) : (
                            <Form.Item
                                name="acc_name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                onClick={handleGetRecepient}
                            >
                                <Input size="large" style={{ color: recepient ? "black" : "inherit" }} disabled placeholder="Eg. Drew Ansong" />
                            </Form.Item>
                        )}
                        </Form.Item>
                    </Col>
        </Row>
    )
}

export default BankOptionForm