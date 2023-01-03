import React, { useEffect, useState } from "react";
import ThemeStyles from "../../../style/Auth.module.css";
import { Button, Input, Form, Radio } from "antd";
import Logo from "../../../assets/javolin_logo.png";
import axios from "axios";

import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import { Link, useHistory } from "react-router-dom";
import { login, SET_USER_TYPE } from "../duck/action";
import { useDispatch, useSelector } from "react-redux";
import LangDropDown from "../../../Shared/Components/LangDropDown";


// import IntInputPhoneNumber from "../../../Shared/Components/IntInputPhoneNumber/IntInputPhoneNumber";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userlogin = useSelector((state) => state.login);
  const [intNum, setIntNum] = useState("")
  const [phoneValid, setPhoneValid] = useState('')
  const text = useSelector((state) => state?.language)

  // const [form] = Form.useForm();
  


  const [defaultCountry, setDefaultCountry] = useState('')
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

  const formatNumber = (num) => {
    num = num.replace(/\s/g, '')
    num = num.replaceAll("-", '')
    return num
  }

  const onFinish = (values) => {
    dispatch({
      type: SET_USER_TYPE,
      data: 'business'
    });
    values = { ...values, ...{ "phone_number": formatNumber(intNum) } }
    dispatch(login(values, history, 'business'));
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
          onFinish={onFinish}
          layout="vertical"
        >
          <div className={ThemeStyles.topSection}>
            <div style={{marginBottom: "1em"}}>
            <LangDropDown fullname/>
            </div>
          
            <div className={ThemeStyles.authTitle}>
              {text["Sign in"]}
            </div>
            <div className={ThemeStyles.subauthTitle}>
              {text["Sign in to start trading with us"]}
            </div>

          </div>
          {/* <div style={{ marginBottom: "3em" }}>
            <Radio.Group style={{ width: "100%", }} size="large" name="accType" onChange={handleAccountType} defaultValue={accountType}>
              <Radio.Button style={{ width: "50%" }} value="customer">Individual</Radio.Button>
              <Radio.Button style={{ width: "50%" }} value="business">Business</Radio.Button>
            </Radio.Group>
          </div> */}
          <Form.Item
            label={text["Phone number"]} 
          >
            <Form.Item
              noStyle
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: `${text["Phone number"]} ${text["is required"]}`
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
                  // nationalMode="true"
                  separateDialCode={true}
                  preferredCountries={['gh', 'us', 'ng', 'sn', 'gb']}
                  defaultCountry={defaultCountry.toLocaleLowerCase() ?? null}
                  formatOnInit={true}
                  onPhoneNumberChange={(isval, val, cdata, fnum) => {
                    setIntNum(fnum)
                    setPhoneValid(isval)
                  }}
                />
              </div>
              {/* <IntInputPhoneNumber value={form.getFieldValue("phone_number")} setNum={setIntNum} /> */}
            </Form.Item>

          </Form.Item>
          <Form.Item
            label="Password"
          >
            <Form.Item
              noStyle
              name="password"
              rules={[
                {
                  required: true,
                  message: text["Please input your password!"],
                }
              ]}
              hasFeedback
            >
              <Input.Password size="large" type={'password'} placeholder={text["password"]} />
            </Form.Item>
          </Form.Item>
          <div style={{textAlign: "right", fontWeight:450, fontSize: "20px"}}>
           <Link to='/forgot-password'>{text["Forgot Password?"]}</Link>
          </div>
          <Button
            block
            size="large"
            style={{ marginTop: "2em" }}
            type="primary"
            shape="round"
            htmlType="submit"
            className="login-form-button"
            loading={userlogin.loggingIn}
          >
            {text["Login"]}
          </Button>
          
        </Form>

        <div className={ThemeStyles.footerMsg}>
          <div className={ThemeStyles.footerContent}>
          {text["Don’t have an account?"]} <Link to={'/business/signUp'}> <span className={ThemeStyles.footerLink}>{text["Create account"]}</span> </Link>
          </div>
        </div>

      </div>

    </>
  );
};

export default Login;
