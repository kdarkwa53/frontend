import { Header, Form as TForm } from "tabler-react";
import { Divider, Form, Col, Row, Input, Select, DatePicker, Button, } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";



const { Option } = Select

const ApplicantDetails = ({ state, setFormState }) => {
  const user = useSelector((state) => state.user);

  const [isMarried, setIsMarriedState] = useState("")

  // const handleDataChange = (e) => {
  //   let target = e.target
  //   let value = target.value
  //   let name = target.name
  //   setFormState({
  //     ...state,
  //     home_information: {
  //       ...state.monthly_installment,
  //       [name]: value
  //     }
  //   })
  //   console.log(state)
  // }

  // const handleSelectData = name => (values) => {
  //   setFormState({
  //     ...state,
  //     home_information: {
  //       ...state.monthly_installment,
  //       [name]: values
  //     }
  //   })

  //   console.log(state)
  // }

  // const handleDateChange = name => (date, dateString) => {
  //   setFormState({
  //     ...state,
  //     home_information: {
  //       ...state.monthly_installment,
  //       [name]: dateString
  //     }
  //   })
  // }
  const handleIsMarried = (value) => {
    setIsMarriedState(
      value
    );
  };

  // const handleChangeDate = name => (date, dateString) => {
  //   setFormState({
  //     ...state,
  //     [name]: dateString
  //   })
  // }


  return (
    <>
      <Divider orientation="left" plain>
        <Header.H3>Personal Details</Header.H3>
      </Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="First Name">
            <Form.Item rules={[{ required: true }]} noStyle >
              <Input placeholder="First Name" name="first_name" value={user.first_name} />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Middle Name" >
            <Input placeholder="Middle Name" name="middle_name" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Last Name">
            <Form.Item rules={[{ required: true }]} noStyle  >
              <Input placeholder="Last Name" name="last_name" value={user.last_name} />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item label="Date of Birth">
            <Form.Item rules={[{ required: true, pattern: "/([12]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]|3[01]))/" }]} noStyle>
              <TForm.MaskedInput
                name="date_of_birth"
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
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item label="Current physical address">
            <Form.Item rules={[{ required: true }]} noStyle >
              <Input placeholder="street # and name" name="address" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item label="Town/City">
            <Form.Item rules={[{ required: true }]} noStyle>
              <Input placeholder="city" name="city" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item label="Region">
            <Form.Item rules={[{ required: true }]} noStyle >
              <Input placeholder="region" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
          <Form.Item label="Date you started living at address">
            <Form.Item rules={[{ required: true }]} noStyle >
              <DatePicker
                name="addressLivingDate"
                format="YYYY/MM/DD"
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={9} xl={9}>
          <Form.Item label="Which of the following housing Options apply to you?">
            <Form.Item rules={[{ required: true }]} noStyle name={["monthly_installment", "housingStatus"]} >
              <Select >
                <Option value="I own a house">I own a house</Option>
                <Option value="I rent">I rent</Option>
                <Option value="I live rent free">I live rent free</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12} lg={9} xl={9}>
          <Form.Item name={["monthly_installment", "housingMonthlyPayment"]} label="How much do you pay for rent or mortgage per month?">
            <Input addonBefore="USD" addonAfter=".00" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Personal ID">
            <Form.Item rules={[{ required: true }]} noStyle>
              <Select name="personalId">
                <Option defaultValue>Select one ID below</Option>
                <Option value="Passport">Passport</Option>
                <Option value="Voters ID">Voters ID</Option>
                <Option value="Driveres License">Drivers License</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="ID number">
            <Form.Item rules={[{ required: true }]} noStyle  >
              <Input placeholder="Enter ID number" name="idNumber" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="What is your marriage status?">
            <Form.Item rules={[{ required: true }]} noStyle  >
              <Select name="marriageStatus" onChange={handleIsMarried}>
                <Option defaultValue>Select one below</Option>
                <Option value="Married">Married</Option>
                <Option value="Single/Unmarried">Single/Unmarried</Option>
                <Option value="Widowed">Widowed</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      {isMarried === "Married" ? (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item label="Legal Name of Spouse">
              <Input placeholder="Fullname" name="spouseName" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item label="(Spouse) Phone">
              <Input placeholder="0234567890" name="spousePhone" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
            <Form.Item label="(Spouse) email">
              <Input placeholder="abc@example.com" name="spouseEmail" />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {isMarried === "Married" ? (
        <Row>
          <Col width={4}>
            <Form.Item label="How many children do you have?">
              <Input placeholder="" name="childrenNum" />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  )
}

const CopplicantDetails = ({ state, setFormState }) => {

  return (
    <Form.List name="co_applications"
    >
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (

            <div key={key}>

              <Divider orientation="left" plain>
                <>
                  <div >
                    <Header.H3 >
                      Co-Applicant {key + 1} Details
                      <DeleteOutlined style={{ color: "red", paddingLeft: "0.5em" }} onClick={() => remove(name)} />
                    </Header.H3>
                  </div>
                </>

              </Divider>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item {...restField}
                    name={[name, 'coFname']}
                    fieldKey={[fieldKey, 'coFname']} label="First Name">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coFname']} >
                      <Input placeholder="First Name" name={[name, 'coFname']} />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coMname']}
                    fieldKey={[fieldKey, 'coMname']}
                    label="Middle Name">
                    <Input placeholder="Middle Name" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coLname']}
                    fieldKey={[fieldKey, 'coLname']}
                    label="Last Name">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coLname']} >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coDOB']}
                    fieldKey={[fieldKey, 'coDOB']}
                    label="Date of Birth">
                    <Form.Item rules={[{ required: true }, { pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: "Date must follow yyyy-mm-dd format" }]} noStyle name={[name, 'coDOB']} >
                      <TForm.MaskedInput
                        name={[name, 'coDOB']}
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
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coStreet']}
                    fieldKey={[fieldKey, 'coStreet']}
                    label="Current physical address">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coStreet']} >
                      <Input placeholder="street # and name" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coCity']}
                    fieldKey={[fieldKey, 'coCity']} label="Town/City">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coCity']} >
                      <Input placeholder="city" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coRegion']}
                    fieldKey={[fieldKey, 'coRegion']}
                    label="Region">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coRegion']} >
                      <Input placeholder="region" />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={6} xl={6}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coAddressLivingDate']}
                    fieldKey={[fieldKey, 'coAddressLivingDate']}
                    label="Date you started living at address">

                    <Form.Item
                      rules={[{ required: true }, { pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, message: "Date must follow yyyy-mm-dd format" }]}
                      noStyle
                      name={[name, 'coAddressLivingDate']} >
                      <TForm.MaskedInput
                        name={[name, 'coDOB']}
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
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={9} xl={9}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coHousingStatus']}
                    fieldKey={[fieldKey, 'coHousingStatus']}
                    label="Which of the following housing Options apply to him/her?">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coHousingStatus']} >
                      <Select name="coHousingStatus">
                        <Option value="I own a house">I own a house</Option>
                        <Option value="I rent">I rent</Option>
                        <Option value="I live rent free">I live rent free</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={12} lg={9} xl={9}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coHousingMonthlyPayment']}
                    fieldKey={[fieldKey, 'coHousingMonthlyPayment']}
                    label="How much does he/she pay for rent or mortgage per month?">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coHousingMonthlyPayment']} >
                      <Input addonBefore="USD" addonAfter=".00" />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coPersonalId']}
                    fieldKey={[fieldKey, 'coPersonalId']}
                    label="Personal ID">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coPersonalId']} >
                      <Select name="coPersonalId">
                        <Option defaultValue>Select one ID below</Option>
                        <Option value="Passport">Passport</Option>
                        <Option value="Voters ID">Voters ID</Option>
                        <Option value="Driveres License">Drivers License</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coIdNumber']}
                    fieldKey={[fieldKey, 'coIdNumber']}
                    label="ID number">
                    <Form.Item rules={[{ required: true }]} noStyle name={[name, 'coIdNumber']} >

                      <Input placeholder="Enter ID number" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...restField}
                    name={[name, 'coMarriageStatus']}
                    fieldKey={[fieldKey, 'coMarriageStatus']}
                    label="What is your marriage status?">
                    <Select name="coMarriageStatus">
                      <Option defaultValue>Select one below</Option>
                      <Option value="Married">Married</Option>
                      <Option value="Single/Unmarried">Single/Unmarried</Option>
                      <Option value="Widowed">Widowed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {/* {state.isMarried ? (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'coSpouseName']}
                      fieldKey={[fieldKey, 'coSpouseName']}
                      label="Legal Name of Spouse">
                      <Input placeholder="Fullname" />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'coSpousePhone']}
                      fieldKey={[fieldKey, 'coSpousePhone']}
                      label="(Spouse) Phone">
                      <Input placeholder="0234567890" />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'coSpouseEmail']}
                      fieldKey={[fieldKey, 'coSpouseEmail']}
                      label="(Spouse) email">
                      <Input placeholder="abc@example.com" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )} */}
              {/* {state.isMarried ? (
                <Row>
                  <Col width={4}>
                    <Form.Item
                      {...restField}
                      name={[name, 'coChildrenNum']}
                      fieldKey={[fieldKey, 'coChildrenNum']}
                      label="How many children do you have?">
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                ""
              )} */}
            </div>

          ))}
          <Row>
            <Col width={6}>
              <Form.Item>
                <Button type="primary" onClick={(e) => { e.preventDefault(); add() }} icon={<PlusOutlined />}>
                  Add Co-Applicant
                </Button>
              </Form.Item>
            </Col>
          </Row>

        </>
      )}
    </Form.List>
  );
};

const GuarantorDetails = () => {
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="First Name">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorFname"]}>
              <Input placeholder="First Name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Middle Name" name={["guarantors_details", "guarantorMname"]}>
            <Input placeholder="Middle Name" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={8} xl={8}>
          <Form.Item label="Last Name">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorLname"]}>
              <Input name='guarantorLname' placeholder="Last Name" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={6} xl={6}>
          <Form.Item label="Phone">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorPhone"]}>
              <Input placeholder="0234567890" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={6} xl={6}>
          <Form.Item label="email">
            <Form.Item rules={[{ required: true, type: "email" }]} noStyle name={["guarantors_details", "guarantorEmail"]} >
              <Input name='guarantorEmail' placeholder="abc@example.com" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={6} xl={6}>
          <Form.Item label="Current physical address">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorStreet"]}>
              <Input placeholder="street # and name" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={6} xl={6}>
          <Form.Item label="Town/City">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorCity"]} >
              <Input placeholder="city" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={8} lg={6} xl={6}>
          <Form.Item label="Region">
            <Form.Item rules={[{ required: true }]} noStyle name={["guarantors_details", "guarantorRegion"]} >
              <Input placeholder="region" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

const PersonalDetails = ({ state, setFormState }) => {
  return (
    <>
      <ApplicantDetails state={state} setFormState={setFormState} />
      <CopplicantDetails state={state} setFormState={setFormState} />
      <Divider orientation="left" plain>
        <Header.H3>Guarantor's Details</Header.H3>
      </Divider>
      <GuarantorDetails />
    </>
  );
};

export default PersonalDetails;
