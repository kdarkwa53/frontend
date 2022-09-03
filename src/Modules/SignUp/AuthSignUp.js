import React from "react";
import ThemeStyles from "../../style/Auth.module.css";
import GlobalStyles from "../../style/Global.module.css";
import Logo from "../../assets/javolin_logo.png";
import { Grid } from "tabler-react";

import { Button, Form, Checkbox } from "antd";
const AuthSignUp = () => {
  return (
    <>
      <div>
        <Grid.Row>
          <Grid.Col className={ThemeStyles.sideImage} lg={6}>
            <div className={ThemeStyles.sideImage}></div>
          </Grid.Col>
          <Grid.Col lg={6}>
            <img src={Logo} alt="logo" className={GlobalStyles.logo} />
            <div className={ThemeStyles.container}>
              <div className={ThemeStyles.rightSide}>
                <div className={ThemeStyles.statement2}>Sign up</div>
                <div className={ThemeStyles.signupCard}>
                  <div className={ThemeStyles.cardContent}>
                    <div>
                      <Form>
                        <Form.Item name="terms" valuePropName="checked">
                          <Checkbox>
                            I agree to the Terms of Service, General Terms and
                            Conditions and Privacy Policy
                          </Checkbox>
                        </Form.Item>
                        <Form.Item name="features" valuePropName="checked">
                          <Checkbox>
                            Notify me about new features and special offers
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" block htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </div>
    </>
  );
};

export default AuthSignUp;
