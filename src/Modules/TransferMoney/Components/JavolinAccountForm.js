import { Input, Form, Spin, Col } from 'antd';
import React, { useState } from 'react';
import Styles from "../TransferMoney.module.css"
import { getJavRecepientName } from "../duck/action"
import { useDispatch, useSelector } from "react-redux"
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { formatNumber } from '../../../helpers/contants';


const JavolinAccountForm = ({ form, setIntNum }) => {
    const [recepient, setRecepient] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const text = useSelector((state) => state.language)

    let phone = ''
    // const [intNum, setIntNum] = useState("")
    const [phoneValid, setPhoneValid] = useState('')
    // let phoneValid = false

    const resetNameField = () => {
        form.setFieldsValue({
            recepient: ""})
    }

    const handleGetRecepient = () => {
        phone = phone.replace(/\s/g, '')
        phone = phone.replaceAll("-", '')

            try {
                setLoading(true)
                
                let formattedNum = formatNumber(setIntNum.current)
                dispatch(getJavRecepientName(formattedNum)).then((res) => {
                    setRecepient(res?.name)
                    form.setFieldsValue({
                        recepient: res?.name
                    })
                    setLoading(false)
                    // setIntNum(phoneNum)
                })
            } catch (err) {
                setLoading(false)
            }
    }

    return (
            <>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item label={text["Phone Number"]}>
                    <Form.Item
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                            },
                            () => ({
                                validator(_, value) {
                                    if (
                                        !value || phoneValid
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            text["Phone number is invalid"]
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <div className="intInputClass">
                            <IntlTelInput
                                containerClassName="intl-tel-input"
                                inputClassName="form-control"
                                separateDialCode={true}
                                preferredCountries={['gh', 'us', 'ng', 'sn', 'gb']}
                                defaultCountry='gh'
                                formatOnInit={true}
                                onPhoneNumberChange={(isval, val, cdata, fnum) => {
                                    setIntNum.current = fnum
                                    setPhoneValid(isval)
                                    resetNameField()
                                   
                                }}
                            />
                        </div>
                    </Form.Item>
                    </Form.Item>
                </Col>
        </>
    )
}

export default React.memo(JavolinAccountForm) 