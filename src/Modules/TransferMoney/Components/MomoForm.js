import { Input, Select, Form, Spin } from 'antd';
import { useState } from 'react';
import Styles from "../TransferMoney.module.css"
import CountryCode from '../../../Shared/Components/CountryCode/CountryCode';
import { getAccountHolderName } from "../duck/action"
import { useDispatch, useSelector } from "react-redux"
const { Option } = Select;


const MomoForms = ({ form }) => {
    const [recepient, setRecepient] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const state = useSelector((state) => state?.resources?.banksAndMomos)

    const handleGetRecepient = () => {
        const { momo_number, momo_network } = form.getFieldsValue()
        try {
            setLoading(true)
            dispatch(getAccountHolderName({ bank_code: momo_network, bank_number: momo_number })).then((res) => {
                setRecepient(res?.name)
                form.setFieldsValue({
                    recepient: res?.name
                })
                setLoading(false)
            })
        } catch (err) {
            setLoading(false)
        }
    }

    const momos = state?.filter((account) => {
        return account.type === "momo"
    })
    const resetNameField = () => {
        form.setFieldsValue({
            recepient: ""
        })
    }
    return (
        <>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Phone Number</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="momo_number"
                        rules={[
                            {
                                required: true,
                                len: 10,
                                message: "invalid number"
                            },
                        ]}
                    >

                        <Input onChange={resetNameField}  prefix={<CountryCode />} size="large" type="number" placeholder="mobile number" />
                    </Form.Item>
                </div>
            </div>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Momo Network</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="momo_network"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select size="large" onChange={resetNameField} placeholder="Select network">
                            {momos?.map((momo) => {
                                
                                return (
                                    <Option key={momo.code} value={momo.code}>{momo.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Account Name</div>
                <div className={Styles.inputContainer}>
                    {loading ? (<Spin />) : (
                        <Form.Item
                            onClick={handleGetRecepient}
                            name="recepient"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input style={{ color: recepient ? "black" : "inherit" }} size="large" disabled />
                        </Form.Item>
                    )}
                </div>
            </div>
        </>
    )
}

export default MomoForms