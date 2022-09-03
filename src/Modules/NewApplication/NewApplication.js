import React, { useState } from "react";

import "tabler-react/dist/Tabler.css";
import { Select, Layout, Form, Button } from "antd";

import { Page } from "tabler-react";
import Styles from "./ServiceSelection.module.css";
import { Link } from "react-router-dom";
const { Content } = Layout;

const NewApplication = () => {
  const [products, setProducts] = useState(false);

  const handleOthersClicked = () => {
    setProducts(true);
  };

  const { Option } = Select;

  return (
    <>
      <Page.Content title="New Application">
        <Content
          style={{
            minHeight: 300,
            padding: "50px",
            margin: "1em",
            backgroundColor: "white",
          }}
        >
          <div className={Styles.centerSide}>
            {!products ? (
              <div>
                <div className={Styles.statement}>
                  Please select an option below to continue
                </div>

                <div className={Styles.serviceCard}>
                  <Link to="/apply">
                    <p>I want to apply for a mortgage</p>
                  </Link>
                </div>

                <div
                  onClick={handleOthersClicked}
                  className={Styles.serviceCard}
                >
                  <p>I want to apply for other financial products</p>
                </div>
                {/* </div> */}
              </div>
            ) : (
              <Form layout="vertical">
                <Form.Item
                  name="products"
                  label="Select one of the financial products"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select defaultValue="auto">
                    <Option value="auto">Auto Loan</Option>
                    <Option value="trader"> Traders loan</Option>
                    <Option value="funeral"> Funeral loan</Option>
                    <Option value="personal"> Personal loan</Option>
                    <Option value="student">
                      {" "}
                      Students and Educational loan
                    </Option>
                    <Option value="appliance">
                      Home Appliance, Furnishing and TV Loan
                    </Option>
                    <Option value="appliance">Agricultural loans </Option>
                  </Select>
                </Form.Item>
                <Button type="primary">submit</Button>
              </Form>
            )}
          </div>
        </Content>
      </Page.Content>
    </>
  );
};

export default NewApplication;
