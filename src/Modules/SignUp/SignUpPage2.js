import ThemeStyles from "../../style/Auth.module.css";
import { Button, Input, Form, DatePicker, Checkbox, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "./duck/action";
import Logo from "../../assets/javolin_logo.png";
import { REACT_APP_GOOGLE_API_URL } from "../../helpers/contants";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { Link, useHistory } from "react-router-dom";


const IndividualRegistrationDetails = () => {
    const {Option} = Select
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)

    const _currencies = currencies ? currencies : {}
    return (

        <>
            <Form.Item label="Email">
                <Form.Item
                    name="email"
                    noStyle
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Email address not valid",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Eg. jamesjones@gmail.com" />
                </Form.Item>
            </Form.Item>

            <Form.Item label="Physical Address">
                <Form.Item
                    noStyle
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your physical address",
                        },
                    ]}
                >
                    <div>
                        <GooglePlacesAutocomplete

                            selectProps={{
                                styles: {
                                    input: (provided) => ({
                                        ...provided,
                                        borderRadius: "8px",
                                        minHeight: "60px",
                                        backgroundColor: "#F7F7F7"
                                    }),

                                },
                            }}

                            apiKey={REACT_APP_GOOGLE_API_URL}
                        />
                    </div>
                </Form.Item>

            </Form.Item>
            <Form.Item label="Date of Birth">
                <Form.Item
                    noStyle
                    name="date_of_birth"
                    rules={[
                        {
                            required: true,
                            message: "Please select your date of birth!",
                        },
                    ]}
                >
                    <DatePicker size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
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
                <Checkbox className={[ThemeStyles.subInfo, ThemeStyles.agreement]}>
                    I agree with your <a className={ThemeStyles.subBoldGray} target="_blank" rel="noreferrer" href="https://www.javolin.com/terms">Terms of Service</a>   and
                    <a target="_blank" className={ThemeStyles.subBoldGray} rel="noreferrer" href="https://www.javolin.com/policy"> Privacy Notice</a>
                </Checkbox>
            </Form.Item>

        </>
    )
}


const SignUpPage2 = (props) => {
    const { state } = props.location
    const dispatch = useDispatch();
    const history = useHistory();
    const signupState = useSelector((state) => state.userSignUp);
    const { signingUp } = signupState;

    const accountType = useSelector((state) => state?.user?.type)

    const onFinish = (values) => {
        
        let date_of_birth = { "date_of_birth": values.date_of_birth._d.toISOString().slice(0, 10).toString() }
        values = { ...state, ...values, ...date_of_birth }
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
                            Register as individual
                        </div>
                      
                    </div>
                    <div style={{ marginTop: "2em" }}>
                        <IndividualRegistrationDetails />

                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="login-form-button"
                            loading={signingUp}
                            style={{ marginTop: "1em" }}
                        >
                            <span >Sign up</span>
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

export default SignUpPage2;
