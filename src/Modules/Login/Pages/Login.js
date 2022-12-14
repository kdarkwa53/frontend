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


// import IntInputPhoneNumber from "../../../Shared/Components/IntInputPhoneNumber/IntInputPhoneNumber";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userlogin = useSelector((state) => state.login);
  const [intNum, setIntNum] = useState("")
  const [phoneValid, setPhoneValid] = useState('')
  const accountType = useSelector((state) => state?.user?.type)

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
    dispatch(login(values, history, accountType));
  };


  const handleAccountType = (e) => {
    const value = e.target.value

    dispatch({
      type: SET_USER_TYPE,
      data: value
    });
    
  }

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
            <div className={ThemeStyles.authTitle}>
              Login
            </div>
          
          </div>
          {/* <div style={{ marginBottom: "3em" }}>
            <Radio.Group style={{ width: "100%", }} size="large" name="accType" onChange={handleAccountType} defaultValue={accountType}>
              <Radio.Button style={{ width: "50%" }} value="customer">Individual</Radio.Button>
              <Radio.Button style={{ width: "50%" }} value="business">Business</Radio.Button>
            </Radio.Group>
          </div> */}
          <Form.Item
            label="Phone number"
          >
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
                  message: "Please input your password!",
                }
              ]}
              hasFeedback
            >
              <Input.Password size="large" type={'password'} placeholder="password" />
            </Form.Item>
          </Form.Item>
          <Button
            block
            size="large"
            style={{ marginTop: "2em" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={userlogin.loggingIn}
          >
            Login
          </Button>
          <div style={{textAlign: "center", marginTop: "0.5em", fontSize: "13px"}}>
           <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
        </Form>

        <div className={ThemeStyles.footerMsg}>
          <div className={ThemeStyles.footerContent}>
            New to Javolin? <Link to={'/business/signUp'}> Register as a Forex Trader</Link>
          </div>
        </div>

      </div>

    </>
  );
};

export default Login;
