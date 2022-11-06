import { Header } from "tabler-react";
import { Divider, Radio, Input, Select, Col, Row, Form } from "antd";
import React from "react";

const { Option } = Select;
const BankAccountDetails = () => {
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label="Which bank do you bank with?">
            <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "bankName"]}>
              <Input placeholder="Bank Name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label="Type of account?">
            <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "accountType"]}>
              <Select>
                <Option defaultValue>Select one below</Option>
                <Option value="Savings Account">Savings Account</Option>
                <Option value="Current Account"> Current Account</Option>
                <Option value="Investment Account">Investment Account</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label="What is the current balance in account now?">
            <Form.Item rules={[{ required: true, }]} noStyle name={["asset_declaration", "currentAccountBalance"]}>
              <Input addonBefore="USD" addonAfter=".00" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label="Where did you open this/these account(s)?">
            <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "placeOfAcount"]}>
              <Input placeholder="City and Country" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
const AssectDeclaration = ({ state, setFormState }) => {

  const handleDecisionChange = (e) => {
    const target = e.target;
    const value = target.value
    const name = target.name
    setFormState({
      ...state,
      asset_declaration: {
        ...state.asset_declaration,
        [name]: value
      }
    })

  }

  let { asset_declaration } = state

  return (
    <>
      <Divider orientation="left" plain>
        <Header.H3>Asset Declaration</Header.H3>
      </Divider>
      <Col span={24}>
        <Form.Item label="Do you have a bank account?">
          <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "hasBankAccount"]} >
            <Radio.Group name="hasBankAccount" onChange={handleDecisionChange}>
              <Radio
                value="yes"
              >Yes</Radio>
              <Radio
                value="no"
              >No</Radio>
            </Radio.Group>
          </Form.Item>
        </Form.Item>
      </Col>

      {asset_declaration.hasBankAccount === "yes" ? (
        <BankAccountDetails />
      ) : (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Form.Item label="Where do you have your money?">
              <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "moneyPlace"]}>
                <Input placeholder="Enter where you have your money" />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col span={24}>
          <Form.Item label="Do you have 20% downpayment for your target home price?">
            <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "hasDownPayment"]}>
              <Radio.Group name="hasDownPayment" onChange={handleDecisionChange}>
                <Radio
                  value="yes"
                >Yes</Radio>
                <Radio
                  value="no"
                >No</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      {asset_declaration.hasDownPayment !== "yes" ? (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col span={24}>
            <Form.Item label="Would you be interested in opening a savings account with Javolin?">
              <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "wantJavolinSavings"]}>
                <Radio.Group onChange={handleDecisionChange}
                  name="wantJavolinSavings">
                  <Radio
                    value="yes"
                  >Yes</Radio>
                  <Radio
                    value="no"
                  >No
              </Radio>
                </Radio.Group>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}

      {asset_declaration.wantJavolinSavings === "yes" ? (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="How much are you ready to deposit now?">
              <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "depositAmount"]}>
                <Input placeholder="Enter amount" />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col span={12}>
          <Form.Item label="Are you getting gift money or money contributions for your down payment?">
            <Form.Item rules={[{ required: true }]} noStyle name={["asset_declaration", "gettingGift"]}>
              <Radio.Group onChange={handleDecisionChange} name="gettingGift">
                <Radio
                  value="yes"
                >Yes</Radio>
                <Radio
                  value="no"
                >No</Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      {asset_declaration.gettingGift === "yes" ? (
        <>
          <Divider orientation="left" plain>
            <Header.H3>Gift Details</Header.H3>
          </Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item label="Who is giving you the gift money?" name={["asset_declaration", "gift_details", "donorName"]}>
                <Input placeholder="Enter Full Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item name={["asset_declaration", "gift_details", "donorRelationship"]} label="What is your relationship to the person giving you the gift for down payment?">
                <Input
                  placeholder=" Relationship with donor"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item label="His/Her Telephone number?" rules={[{ required: true }]} name={["asset_declaration", "gift_details", "donorPhone"]}>
                <Input
                  placeholder=" donor phone number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
            <Col xs={24} sm={24} md={12} lg={4} xl={4}>
              <Form.Item name={["asset_declaration", "gift_details", "donorStreet"]} label="Current physical address">
                <Input placeholder="street # and name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={4} xl={4}>
              <Form.Item name={["asset_declaration", "gift_details", "donorCity"]} label="Town/City">
                <Input placeholder="city" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item name={["asset_declaration", "gift_details", "donorRegion"]} label="Region">
                <Input placeholder="region" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8}>
              <Form.Item name={["asset_declaration", "gift_details", "donorEmail"]} rules={[{ required: true, type: "email" }]} label="Email">
                <Input placeholder="region" />
              </Form.Item>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AssectDeclaration;
