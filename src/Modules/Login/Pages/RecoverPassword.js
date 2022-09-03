import React from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import { Button, Input, Form } from "antd";
import { useHistory } from "react-router";


import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../duck/action";
const RecoverPassword = () => {
  const dispatch = useDispatch();
  const userlogin = useSelector((state) => state.login);
  const history = useHistory()

  const onFinish = (values) => {
    dispatch(recoverPassword(values, history));
    // console.log(values)

  };


  return (
    <>
      <div className={ThemeStyles.cardContent}>
        <div className={ThemeStyles.topSection}>
          <div className={ThemeStyles.authTitle}>
            Forgot Password
          </div>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <p className={ThemeStyles.subInfo}>
            We all forget sometimes. Enter your email and we will send you a link to reset your password
          </p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input size="large" placeholder="email" />
          </Form.Item>

          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={userlogin.recoverpass}
          >
            Send recovery link
          </Button>
        </Form>
        <p className={ThemeStyles.subInfo}>
          <Link to={"/login"}> return to login</Link>
        </p>
      </div>

    </>
  );
};

export default RecoverPassword;
