import React, { useEffect, useState } from "react";
import ThemeStyles from "../../style/Auth.module.css";
import { Button, Input, Form } from "antd";
import { ArrowRight2 } from "../../Shared/Components/JavIcons";

import Logo from "../../assets/javolin_logo.png";
import { useSelector } from "react-redux";

import 'react-intl-tel-input/dist/main.css';

import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import ComingSoonPopUp from "../../Shared/Components/ComingSoonPopUp/ComingSoonPopUp";
// import IntInputPhoneNumber from "../../Shared/Components/IntInputPhoneNumber/IntInputPhoneNumber";





const IndividualRegistrationDetails = ({ setNum }) => {

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



  return (
    <>
      <Form.Item label="First name">
        <Form.Item
          name="first_name"
          noStyle
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input size="large" placeholder="First Name" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Last Name">
        <Form.Item
          name="last_name"
          noStyle
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input size="large" placeholder="Last Name" />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Phone number">
        <Form.Item
          noStyle
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
              // nationalMode="true"
              separateDialCode={true}
              preferredCountries={['gh', 'us', 'ng', 'sn', 'gb']}
              defaultCountry={defaultCountry.toLocaleLowerCase() ?? null}
              formatOnInit={true}
              onPhoneNumberChange={(isval, val, cdata, fnum) => {
                setNum({phone_number: fnum,
                  country_code: cdata?.iso2})
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
              message: "password must have at least one lower case, upper case, digit and must be at least 8 characters",
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

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

    </>
  )
}

const SignUp = () => {
  const history = useHistory();
  const signupState = useSelector((state) => state.userSignUp);
  const [intNum, setIntNum] = useState({ phone_number: "", country_code: ""})
  const [isVisible, setVisible] = useState(false)

  const { signingUp } = signupState;

  const onFinish = (values) => {
    values = { ...values, ...intNum }

    history.push({
      pathname: "/signUp/2",
      state: values
    })
  };


  return (
    <>
      <div className={ThemeStyles.cardContent}>
        <div className={ThemeStyles.smallScreenLogo}>
          <img src={Logo} alt="javolin logo" />
        </div>
        {/* <ComingSoonPopUp isVisible={isVisible} setVisible={setVisible}/> */}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >

          <div className={ThemeStyles.topSection}>
            <div className={ThemeStyles.authTitle}>
              Register as Individual
            </div>
            {/* <div className={ThemeStyles.socials}>
              <div className={ThemeStyles.circles}>
                <img src={Google} alt="Google icon" />
              </div>
              <div className={ThemeStyles.circles}>
                <img src={Facebook} alt="Facebook icon" />
              </div>
              <div className={ThemeStyles.circles}>
                <img src={Linkedin} alt="Linkedin icon" />
              </div>
            </div> */}
          </div>
          <div >
            <IndividualRegistrationDetails setNum={setIntNum} />
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              className="login-form-button"
              loading={signingUp}
              style={{ marginTop: "2em" }}
            >
              <span style={{ marginRight: "2em" }} >Continue</span>
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

export default SignUp;
