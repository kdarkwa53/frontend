import { Header, Form as TForm } from "tabler-react";
import { Divider, Col, Row, Radio, Input, Form } from "antd";
import React, { useState } from "react";

const SelfEmployed = ({ state, setFormState }) => {
  // const handleChangeDate = name => (date, dateString) => {
  //   setFormState({
  //     ...state,
  //     [name]: dateString
  //   })
  // }
  // const handleDataChange = (e) => {
  //   let target = e.target
  //   let value = target.value
  //   let name = target.name
  //   setFormState({
  //     ...state,
  //     home_information: {
  //       ...state.home_information,
  //       [name]: value
  //     }
  //   })
  // }
  return (
    <>
      <Divider orientation="left" plain>
        <Header.H3>Self Employment Information</Header.H3>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Name of Business">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "businessName"]}>
              <Input placeholder="Business Name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Tax Identification Number (TIN)">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "tin"]}>
              <Input placeholder="Enter TIN " />
            </Form.Item>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Date You Registered Business">
            <Form.Item
              rules={[{ required: true }, { pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: "Date must follow yyyy-mm-dd format" }]}
              noStyle
              name={["employee_details", "selfEmployed", "businessRegistrationDate"]}
            >
              <TForm.MaskedInput
                name={["employee_details", "selfEmployed", "businessRegistrationDate"]}
                placeholder="yyyy-mm-dd"
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="How many years have you been in business">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "yearsInBusiness"]}>
              <Input
                placeholder="years in business"
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Type of business?">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "typeOfBusiness"]}>
              <Input
                placeholder="Enter the type of business you do"
              />
            </Form.Item>
          </Form.Item>

        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Complete address of your business">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "businessAddress"]}>
              <Input
                placeholder="Enter complete business address"
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Primary phone">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "selfEmployedPrimaryPhone"]}>
              <Input
                placeholder="0234567890"
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Secondary phone" name={["employee_details", "selfEmployed", "selfEmployedSecondaryPhone"]}>
            <Input
              placeholder="Primary Phone"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Email address">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "selfEmployed", "selfEmployedEmailAddress"]}>
              <Input
                placeholder="abc@example.com"
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const CurrentEmployment = ({ state, setFormState }) => {
  const [isCurrentJob, setIsCurrentJob] = useState(true)
  const [isCurWidth, setIsCurWidth] = useState(2)

  // const handleChangeDate = name => (date, dateString) => {
  //   setFormState({
  //     ...state,
  //     [name]: dateString
  //   })
  // }
  const handleIsCurrentJob = (e) => {
    const target = e.target;
    let result = target.value === "yes";
    setIsCurrentJob(result)

    if (result) {
      setIsCurWidth(4)
    } else {
      setIsCurWidth(2)
    }
  };

  return (
    <>
      <Divider orientation="left" plain>
        <Header.H3>Current Employment Information</Header.H3>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Employer Name">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "employerName"]}>
              <Input placeholder="Full-Name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Current physical address">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "employerStreetName"]}>
              <Input placeholder="street # and name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Form.Item label="Town/City">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "employerCity"]}>
              <Input placeholder="city" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Form.Item label="Region">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "employerRegion"]}>
              <Input placeholder="region" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={24} sm={24} md={6} lg={4} xl={6}>
          <Form.Item label="Start Date">
            <Form.Item
              rules={[{ required: true }, { pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: "Date must follow yyyy-mm-dd format" }]}
              noStyle
              name={["employee_details", "employee", "employmentStartDate"]}
            >
              <TForm.MaskedInput
                name={["employee_details", "employee", "employmentStartDate"]}
                placeholder="yyyy-mm-dd"
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col width={isCurWidth}>
          <Form.Item label="Current Job?">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "isCurrentJob"]}>
              <Radio.Group name="isCurrentJob" onChange={handleIsCurrentJob}>
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
        {!isCurrentJob ? (
          <Col xs={24} sm={24} md={4} lg={4} xl={8}>
            <Form.Item name="employmentEndDate" label="End Date">
              <Form.Item
                rules={[{ required: true }, { pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: "Date must follow yyyy-mm-dd format" }]}
                noStyle
                name={["employee_details", "employee", "employmentEndDate"]}
              >
                <TForm.MaskedInput
                  name={["employee_details", "employee", "employmentEndDate"]}
                  placeholder="yyyy-mm-dd"
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                  ]}
                />
              </Form.Item>
            </Form.Item>
          </Col>
        ) : (
          ""
        )}

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Position">
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "positionAtWork"]}>
              <Input
                placeholder="Enter job Position"
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Years of experience in this industry" name={["employee_details", "employee", "yrsExp"]}>
            <Input
              type="number"
              placeholder="Enter yrs of experience"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item
            label="What is your monthly salary, 
        before taxes are taken out?"
          >
            <Form.Item rules={[{ required: true }]} noStyle name={["employee_details", "employee", "monthlySalary"]}>
              <Input addonBefore="USD" addonAfter=".00" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Tel (HR/Manager/Company)" name={["employee_details", "employee", "companyTelephone"]}>
            <Input
              type="number"
              placeholder="Enter telephone number"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const EmploymentInformation = ({ state, setFormState }) => {

  const handleCheckEmploymentOption = (e) => {
    let target = e.target
    let value = target.value
    let name = target.name
    setFormState({
      ...state,
      employee_details: {
        ...state.employee_details,
        [name]: value
      }
    })
   }

  let occupation = state.employee_details.occupation
  return (

    <>
      <Divider orientation="left" plain>
        <Header.H3>Employment Information</Header.H3>
      </Divider>
      <Form.Item label="Which of the following applies to you?">
        <Form.Item name={["employee_details", "occupation"]} rules={[{ required: true }]} noStyle >
          <Radio.Group name="occupation" value={occupation} onChange={handleCheckEmploymentOption} >
            <Radio value="employee" >
              An employee
          </Radio>
            <Radio value="selfEmployed">
              Self Employed
          </Radio>
            <Radio value="both">
              Both
          </Radio>
          </Radio.Group>
        </Form.Item>
      </Form.Item>
      {/* {Object.values(formCategory).map((val) => {
        return val;
      })} */}
      {
        occupation === "employee" ? (
          <CurrentEmployment state={state} setFormState={setFormState} />
        ) : ""}
      {occupation === "selfEmployed" ? (
        <SelfEmployed />
      ) : ""}
      {occupation === "both" ? (
        <>
          <CurrentEmployment state={state} setFormState={setFormState} />
          <SelfEmployed />
        </>
      ) : ""}

    </>
  );
};

export default EmploymentInformation;
