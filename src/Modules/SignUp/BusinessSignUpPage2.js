import React from "react";
import ThemeStyles from "../../style/Auth.module.css";
import { Button, Input, Form, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./duck/action";
import Logo from "../../assets/javolin_logo.png";
import { Link, useHistory } from "react-router-dom";
import { REACT_APP_GOOGLE_API_URL } from "../../helpers/contants";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



const BusinessRegistrationDetails = () => {
    return (
        <>
            <Form.Item label="Name of Business">
                <Form.Item
                    name="business_name"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "Please input your business name!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Business Name" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Type of business">
                <Form.Item
                    name="business_type"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "Please input your business type!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Type of Name" />
                </Form.Item>
            </Form.Item>
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
                    name="business_address"
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
            
        </>
    )
}


const BusinessSignUpPage2 = () => {
    const history = useHistory();
    const signupState = useSelector((state) => state.userSignUp);
    const { signingUp } = signupState;
    const onFinish = (values) => {
        history.push({
            pathname: "/business/signup/2",
            state: values
        })
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
                    <div style={{ marginTop: "2em" }}>
                        <BusinessRegistrationDetails />

                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="login-form-button"
                            
                            style={{ marginTop: "1em" }}
                        >
                            <span >Continue</span>
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

export default BusinessSignUpPage2;
