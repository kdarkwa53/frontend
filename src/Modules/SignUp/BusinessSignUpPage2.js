import React from "react";
import ThemeStyles from "../../style/Auth.module.css";
import { Button, Input, Form, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "./duck/action";
import Logo from "../../assets/javolin_logo.png";
import { Link, useHistory } from "react-router-dom";
import { REACT_APP_GOOGLE_API_URL } from "../../helpers/contants";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import LangDropDown from "../../Shared/Components/LangDropDown";



const BusinessRegistrationDetails = () => {
    const text = useSelector((state) => state?.language)
    return (
        <>
            <Form.Item label={text["Name of Business"]}>
                <Form.Item
                    name="business_name"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: text["Please input your business name!"],
                        },
                    ]}
                >
                    <Input size="large" placeholder={text["Enter business Name"]} />
                </Form.Item>
            </Form.Item>
            <Form.Item label={text["Type of business"]}>
                <Form.Item
                    name="business_type"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: text["Please input your business type!"],
                        },
                    ]}
                >
                    <Input size="large" placeholder={text["Enter business type"]} />
                </Form.Item>
            </Form.Item>
            <Form.Item label={text["Email"]}>
                <Form.Item
                    name="email"
                    noStyle
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: `${text["Email"]} ${text["is required"]}`,
                        },
                    ]}
                >
                    <Input size="large" placeholder="Eg. jamesjones@gmail.com" />
                </Form.Item>
            </Form.Item>

            <Form.Item label={text["Physical Address"]}>
                <Form.Item
                    noStyle
                    name="business_address"
                    rules={[
                        {
                            required: true,
                            message: text["Please enter your physical address"],
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
    const text = useSelector((state) => state?.language)
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
                    <div style={{marginBottom: "1em"}}>
                        <LangDropDown fullname/>
                        </div>
                        <div className={ThemeStyles.authTitle}>
                        {text["Register"]}
                        </div>
                        <div className={ThemeStyles.subauthTitle}>
                        {text["Create an account and start trading with us"]}
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
                            shape="round"
                            style={{ marginTop: "1em" }}
                        >
                            <span >{text["Continue"]}</span>
                        </Button>
                    </div>

                </Form>
                <div className={ThemeStyles.footerMsg}>
                    <div className={ThemeStyles.footerContent}>
                    {text["Already have an account?"]} <Link to='/login'> <span className={ThemeStyles.footerLink}>{text["Sign in"]}</span> </Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default BusinessSignUpPage2;
