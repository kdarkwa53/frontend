import React from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import { Button, Input, Form } from "antd";
import { GoogleIcon } from "../../../Shared/Components/JavIcons";
import { Link, useHistory } from "react-router-dom";
import { busLogin } from "../duck/action";
import { useDispatch, useSelector } from "react-redux";

const BusLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userlogin = useSelector((state) => state.login);

    const onFinish = (values) => {
        dispatch(busLogin(values, history));
    };
    return (
        <>

            <div className={ThemeStyles.cardContent}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <div style={{ marginBottom: "1em" }}>
                        <div style={{ fontSize: "20px" }}>Business Account</div>
                        <div>
                            <Link style={{ fontSize: "12px" }} to="/login"> Login in as an individual?</Link>
                        </div>
                    </div>
                    <Form.Item
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: "Phone number is invalid!",
                                len: 10
                            },
                            {

                            },
                        ]}
                    >
                        <Input type="number" placeholder="phone" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="password" />
                    </Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={userlogin.loggingIn}
                    >
                        login
                    </Button>
                    <Link style={{ textDecoration: "none" }} to="/phone">
                        <Button className={ThemeStyles.socialButton} block>
                            <GoogleIcon width="1em" height="1em"></GoogleIcon>
                            continue with Google
                        </Button>
                    </Link>
                </Form>

                <div className={ThemeStyles.subInfo}>
                    <p>
                        <Link to={"/signup"}> Register here</Link>
                    </p>
                    <p>
                        <Link to={"/recover-password"}> forgot password</Link>
                    </p>
                </div>

            </div>

        </>
    );
};

export default BusLogin;
