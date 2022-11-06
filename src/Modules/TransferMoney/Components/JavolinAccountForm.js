import { Input, Form, Spin } from 'antd';
import React, { useState } from 'react';
import Styles from "../TransferMoney.module.css"
import { getJavRecepientName } from "../duck/action"
import { useDispatch } from "react-redux"
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { formatNumber } from '../../../helpers/contants';


const JavolinAccountForm = ({ form, setIntNum }) => {
    const [recepient, setRecepient] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

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

        // console.log(phone_number)

     

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
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Phone Number</div>
                <div className={Styles.inputContainer}>
                    {/* <Form.Item
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                len: 10,
                                message: "invalid number"
                            },
                        ]}
                    >
                        <Input prefix={<CountryCode />} size="large" type="number" onMouseOut={handleGetRecepient} placeholder="mobile number" />
                    </Form.Item> */}

                    <Form.Item
                        name="phone_number"
                        // validateTrigger={true}
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
                                            "Phone number is invalid"
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
                                    // setIntNum(fnum)
                                    setIntNum.current = fnum
                                    setPhoneValid(isval)
                                    resetNameField()
                                    // phone = fnum
                                    // phoneValid = isval
                                }}
                            />
                        </div>
                    </Form.Item>

                </div>
            </div>

            {/* <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Recepient</div>
                <div className={Styles.inputContainer}>
                    {loading ? (<Spin />) : (
                        <Form.Item
                            name="recepient"
                            onClick={handleGetRecepient}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}

                        >
                            <Input style={{ color: recepient ? "black" : "inherit" }} size="large" disabled />
                        </Form.Item>
                    )}
                </div> */}
            {/* </div> */}
        </>
    )
}

export default React.memo(JavolinAccountForm) 