import React, { useEffect, useState } from "react";
import ThemeStyles from "../../style/Auth.module.css";
import { Button, Input, Form, Checkbox, Select } from "antd";
import { ArrowRight2 } from "../../Shared/Components/JavIcons";

import Logo from "../../assets/javolin_logo.png";
import { useDispatch, useSelector } from "react-redux";


import 'react-intl-tel-input/dist/main.css';

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import IntlTelInput from 'react-intl-tel-input';
import { signup } from "./duck/action";
// import IntInputPhoneNumber from "../../Shared/Components/IntInputPhoneNumber/IntInputPhoneNumber";





const BusinessRegistrationDetails = ({ setNum }) => {

    const { Option } = Select
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get("https://ipinfo.io/129.219.8.132?token=02dd2e3bea03bd");

                setDefaultCountry(data.country)
            } catch (error) {

            }
        }
        fetchData();
    }, [])
    const [defaultCountry, setDefaultCountry] = useState('')
    const [phoneValid, setPhoneValid] = useState('')


    const _currencies = currencies ? currencies : {}
    return (
        <>
            <Form.Item label="Full name">
                <Form.Item
                    name="full_name"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Full Name" />
                </Form.Item>
            </Form.Item>


            <Form.Item label="Phone number">
                <Form.Item
                    noStyle
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
                            // nationalMode="true"
                            separateDialCode={true}
                            preferredCountries={['gh', 'us', 'ng', 'sn', 'gb']}
                            defaultCountry={defaultCountry.toLocaleLowerCase() ?? null}
                            formatOnInit={true}
                            onPhoneNumberChange={(isval, val, cdata, fnum) => {
                                setNum(fnum)
                                setPhoneValid(isval)
                            }}
                        />
                    </div>
                    {/* <IntInputPhoneNumber value={form.getFieldValue("phone_number")} setNum={setIntNum} /> */}
                </Form.Item>
            </Form.Item>
            <Form.Item label="Password">
                <Form.Item
                    noStyle
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password size="large" placeholder="password" />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Confirm Password">
                <Form.Item
                    noStyle
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="re-enter password" />
                </Form.Item>
            </Form.Item>
            <Form.Item
                label="Currency"
            >
                <Form.Item
                    noStyle
                    name="currency_id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select placeholder="Select the default currency for your account" size="large">
                        {
                            Object.values(_currencies)?.map((item) => {
                                return (
                                    <Option value={item.id} key={item.id}>{`${item.name} (${item.symbol})`} </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
            >
                <Checkbox className={[ThemeStyles.subInfo, ThemeStyles.agreement]}> I agree with your <span className={ThemeStyles.subBoldGray}>Terms of Service</span>  and
                    <span className={ThemeStyles.subBoldGray}> Privacy Policy </span>
                </Checkbox>
            </Form.Item>

        </>
    )
}

const BusinessSignUp = (props) => {

    const [intNum, setIntNum] = useState("")


    const { state } = props.location
    const dispatch = useDispatch();
    const history = useHistory();
    const signupState = useSelector((state) => state.userSignUp);
    const { signingUp } = signupState;
    const accountType = useSelector((state)=> state?.user?.type)

    const onFinish = (values) => {


        values = { ...values, ...{ "phone_number": intNum, country_code: 'gh', date_of_birth: '1995-03-28', first_name: 'Sese', last_name: 'Smiths' } }
        values = { ...state, ...values }
        dispatch(signup(values, history, accountType));


    };


    return (
        <>
            <div className={ThemeStyles.cardContent}>
                <div className={ThemeStyles.smallScreenLogo}>
                    <img src={Logo} alt="javolin logo" />
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <div className={ThemeStyles.topSection}>
                        <div className={ThemeStyles.authTitle}>
                        Register
                        </div>
                    </div>
                    <div >
                        <BusinessRegistrationDetails setNum={setIntNum} />
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="login-form-button"
                            loading={signingUp}
                            style={{ marginTop: "2em" }}
                        >
                            <span style={{ marginRight: "2em" }} >Sign up</span>
                            <ArrowRight2 width="1.2em" height="1.2em" color="white" />
                        </Button>
                    </div>

                </Form>
                <div className={ThemeStyles.footerMsg}>
                    <div className={ThemeStyles.footerContent}>
                        Have an account? <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default BusinessSignUp;
