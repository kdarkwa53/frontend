import { Drawer, Form, Col, Row, Button, Modal } from "antd";
import Styles from "./MortgageApply.module.css";

import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { acceptMortgage, applyForPreApproval, declineMortgage } from "../duck/action"



const ApproveLoanDrawer = ({ approveDetails }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const apply = useSelector((state) => state?.acceptMortgage);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const showConfirm = e => {
    confirm({
      title: 'Confirmation?',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${e.replaceAll("_"," ")}?`,
      onOk() {
        if (e === "ACCEPT") {
          dispatch(acceptMortgage(approveDetails.application_id, approveDetails.bank_id, setVisible))
        }
        else if (e === "DECLINE") {
          dispatch(declineMortgage(approveDetails.application_id, approveDetails.bank_id, setVisible))
        }
        else if (e ==="APPLY_FOR_APPROVAL"){
          dispatch(applyForPreApproval(approveDetails.application_id, approveDetails.bank_id, setVisible))
        }
      },
      onCancel() {
      },
      // okButtonProps: {
      //   loading: action
      // },
    });
  }


  return (
    <>
      <EyeOutlined className={Styles.saveButton} onClick={showDrawer} />

      <Drawer
        title={`${approveDetails.status}: ${approveDetails.bank.name}`}
        width="50%"
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
              close
          </Button>
            {approveDetails.status === "PRE_APPROVE" || approveDetails.status === "PRE_APPROVED" ? (
              <>
                <Button loading={apply.appyingForApproval} onClick={() => showConfirm("APPLY_FOR_APPROVAL")} type="primary">
                  Apply for Approval
              </Button>

                <Button loading={apply.decliningApplication} style={{ marginLeft: "1em" }} onClick={() => showConfirm("DECLINE")} value="decline" name="DECLINE" type="primary">
                  Decline
              </Button>
              </>
            ) : ""}
            {approveDetails.status === "APPROVE" || approveDetails.status === "APPROVED" ? (
              <>
                <Button loading={apply.acceptingApplication} onClick={() => showConfirm("ACCEPT")} type="primary">
                  Accept
                </Button>

                <Button loading={apply.decliningApplication} style={{ marginLeft: "1em" }} onClick={() => showConfirm("DECLINE")} value="decline" name="DECLINE" type="primary">
                  Decline
                </Button>
              </>
            ) : ""}

          </div>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Loan Amount">
                <div className={Styles.approveResponse}>{`GHS ${approveDetails.loan_amount}`}</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Duration" label="Years">
                <div className={Styles.approveResponse}>{approveDetails.years}</div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="fees" label="Fees (Legal and Facility)">
                <div className={Styles.approveResponse}>GHS 3000</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="deposit" label="Required Down Payment">
                <div className={Styles.approveResponse}>GHS 50000</div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="monthly"
                label="Monthly Installment"
              >
                <div className={Styles.approveResponse}>{`GHS ${approveDetails.monthly_installment}`}</div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="interest" label="Interest Rate">
                <div className={Styles.approveResponse}>{`${approveDetails.interest_rate}%`}</div>{" "}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="Loan Conditions">
                <div className={Styles.notesBox}>
                  {approveDetails.years}
                </div>
              </Form.Item>
              <Form.Item name="notes" label="Notes">
                <div className={Styles.notesBox}>
                  {approveDetails.notes}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>


      </Drawer>
    </>
  );
};


export default ApproveLoanDrawer;
