import { Drawer, Form, Button, Col, Row, Input } from "antd";
import Styles from "./MortgageApply.module.css";

import React, { useState } from "react";

const ApproveLoanDrawer = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginTop: "2em" }}
        className={Styles.saveButton}
        onClick={showDrawer}
      >
        Preapprove
      </Button>
      <Drawer
        title="Approval Details"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Loan Amount"
                rules={[{ required: true, message: "Loan amount" }]}
              >
                <Input
                  addonBefore="$"
                  value="30,000"
                  placeholder="Please loan amount"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Duration"
                label="Years"
                rules={[{ required: true, message: "Please enter duration" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter repayment duration"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fees"
                label="Fees (Legal and Facility)"
                rules={[{ required: true, message: "Please select fees" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter fees"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deposit"
                label="Required Down Payment"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter required downpayment"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="monthly"
                label="Monthly Installment"
                rules={[{ required: true, message: "Please " }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter monthly installment"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="interest"
                label="Interest Rate"
                rules={[
                  {
                    required: true,
                    message: "Please choose the interest rate",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Please enter required downpayment"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Loan Conditions"
                rules={[
                  {
                    required: true,
                    message: "please enter loan conditions",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter loan conditions"
                />
              </Form.Item>
              <Form.Item
                name="notes"
                label="Notes"
                rules={[
                  {
                    required: true,
                    message: "please enter terms and conditions",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please notes" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ApproveLoanDrawer;
