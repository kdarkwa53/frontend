import React, { useState } from "react";

import "tabler-react/dist/Tabler.css";
import { Steps, Button, Layout, Form, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Page } from "tabler-react";
import HomeInformation from "./HomeInformation";
import PersonalDetails from "./PersonalDetails";
import EmploymentInformation from "./EmploymentInformation";
import AssectDeclaration from "./AssetDeclaration";
import DocumentUpload from "./DocumentUpload";
import Styles from "./MortgageApply.module.css";
import validateMessages from "../../../helpers/validateMessages"
import { useDispatch, useSelector } from "react-redux";
import PreviewSubmission from "./PreviewSubmission"
import {
  showErrorNotification,
} from "../../../Shared/actions/alert.actions";
// import { submitMortgageApplication } from "../duck/action"

const { confirm } = Modal;


const { Step } = Steps;
const { Content } = Layout;

function isJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

const formatJSONobject = (defaultState) => {
  let { home_information, guarantors_details, co_applications, monthly_installment, employee_details, asset_declaration, documents } = defaultState

  home_information = isJson(home_information)
  guarantors_details = isJson(guarantors_details)
  co_applications = isJson(co_applications)
  employee_details = isJson(employee_details)
  asset_declaration = isJson(asset_declaration)
  documents = isJson(documents)
  monthly_installment = isJson(monthly_installment)


  return defaultState = {
    ...defaultState,
    home_information: { ...home_information },
    guarantors_details: { ...guarantors_details },
    co_applications: { ...co_applications },
    employee_details: { ...employee_details },
    asset_declaration: { ...asset_declaration },
    monthly_installment: { ...monthly_installment },
    documents: { ...documents },
  }

}
const MorgageApplicationForm = (props) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const apply = useSelector((state) => state?.submittedApplications)
  const { id } = props.match.params;


  let defaultState = id ? apply?.entities?.applications[id] : {
    service_type: "MORTGAGE",
    home_information: { hasHome: "" },
    employee_details: { occupation: "" },
    asset_declaration: { hasBankAccount: "", hasDownPayment: "", gift_details: "", wantJavolinSavings: "" },
    // co_applications: undefined,
    monthly_installment: "",
    guarantors_details: "",
    documents: {
      idDoc: "",
      utilityBillDoc: "",
      bankStatementDoc: "",
      paycheckDoc: "",
      taxDoc: ""
    }
  }


  let formData = id ? formatJSONobject(defaultState) : defaultState


  const [state, setFormState] = useState(formData);
  const [loading, setLoading] = useState(false);

  function showConfirm() {
    confirm({
      title: 'Do you Want to save and continue later?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        state["progress"] = "30"
        setLoading(true)
        console.log(state)
        // dispatch(submitMortgageApplication(state, history, setLoading))
        // history.push('/applications')
      },
      onCancel() {
      },
      okButtonProps: {
        loading: apply.submittingApplication
      },
    });
  }

  const next = () => {
    scrollToTop()
    setCurrent(current + 1);
  };

  const prev = () => {
    scrollToTop()
    setCurrent(current - 1);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    window.scrollTop = 0;
  }
  const onFinish = (values) => {
    setFormState({
      ...state,
      ...values,
    })

 
    next()
  };

  const onFinishFailed = (errorInfo) => {
    dispatch(showErrorNotification("Action Failed", "Some required fields are empty"))
  };

  const steps = [
    {
      title: "Home Information",
      content: <HomeInformation state={state} setFormState={setFormState} />,
    },
    {
      title: "Personal Details",
      content: <PersonalDetails state={state} setFormState={setFormState} />,
    },
    {
      title: "Employment information",
      content: <EmploymentInformation state={state} setFormState={setFormState} />,
    },
    {
      title: "Assets Declaration",
      content: <AssectDeclaration state={state} setFormState={setFormState} />,
    },
    {
      title: "Document upload",
      content: <DocumentUpload state={state} setFormState={setFormState} />,
    },
  ];

  return (
    <>
      <Page.Content title="Applications Forms">
        <Steps progressDot responsive="true" current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Content
          style={{
            minHeight: 300,
            padding: "50px",
            margin: "1em",
            backgroundColor: "white",
          }}
        >
          <Form
            form={form}
            name="dynamic_form_nest_item"
            layout="vertical"
            onFinish={onFinish}
            validateMessages={validateMessages}
            onFinishFailed={onFinishFailed}
            initialValues={formData}
          >
            <div className={Styles.saveSection}>
              <Button type="primary" className={Styles.saveButton}>
                Save
              </Button>
              <Button htmlType="submit" loading={loading} onClick={showConfirm} >Save and Continue later</Button>
            </div>
            <div className="">{steps[current].content}</div>
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <PreviewSubmission data={state} />
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Form>
        </Content>
      </Page.Content>
    </>
  );
};

export default MorgageApplicationForm;
