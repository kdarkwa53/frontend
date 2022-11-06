// import { Form as TablerForm } from "tabler-react";
import React from "react";
import { Row, Col, Form, Input, Select, Radio, DatePicker, InputNumber } from 'antd';

const { Option } = Select;


const HomeInformation = ({ state, setFormState }) => {
  // const [homeInfoState, setHomeInfoState] = useState({ hasHome: "no", hasMortgage: "no" })
  const dateFormat = 'YYYY/MM/DD';

  const handleDataChange = (e) => {
    let target = e.target
    let value = target.value
    let name = target.name
    setFormState({
      ...state,
      home_information: {
        ...state.home_information,
        [name]: value
      }
    })
  }

  const handleHasHome = name => (value) => {
    setFormState({
      ...state,
      home_information: {
        ...state.home_information,
        [name]: value
      }
    })
  }

  // const handleDateChange = name => (date, dateString) => {
  //   setHomeInfoState({
  //     ...homeInfoState,
  //     [name]: dateString
  //   })
  //   console.log(homeInfoState.homeAcquiredDate)
  // }
  // const handleHasHome = (value) => {
  //   setFormState({
  //     ...state,
  //     hasHome: value,
  //   });
  // };

  // const handleIsTitleOwner = (e) => {
  //   let value = e.target.value
  //   setFormState({
  //     ...state,
  //     hasTitleInName: value,
  //   });
  // };

  // const handleHasMortgage = (e) => {
  //   let value = e.target.value
  //   setFormState({
  //     ...state,
  //     hasMortgage: value,
  //   });
  // };
  let homeInformation = state.home_information !== "undefined" ? state.home_information : {}

  return (
    <div>

      <Row>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label="Where do you live?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'country']}>
              <Select name="country" >
                <Option value="Ghana">Ghana</Option>
                <Option value="USA">USA</Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="South Africa">South Africa</Option>
                <Option value="Nigeria">Nigeria</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="What do you want to do?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'homeServiceType']}>
              <Radio.Group >
                <Radio
                  value="Buy a Home"
                >
                  Buy a Home
            </Radio>
                <Radio
                  value="Refinance a Home"
                >
                  Refinance a Home
            </Radio>
                <Radio
                  value="Take Equity/Cash out of a Home"
                >
                  Take Equity/Cash out of a Home
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Type of Home">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'HomeType']} >
              <Radio.Group >
                <Radio
                  value="Single Family Detached Home"
                >
                  Single Family Detached Home
            </Radio>
                <Radio
                  value="Townhouse/Attached Home"
                >
                  Townhouse/Attached Home
            </Radio>
                <Radio
                  value="Condominium"
                >
                  Condominium
            </Radio>
                <Radio
                  value="Family Home"
                >
                  Family Home
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="What are you using this Home for?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'homePurpose']}>
              <Radio.Group name="homePurpose" >
                <Radio
                  value="Primary Residence for myself"
                >
                  Primary Residence for myself
            </Radio>
                <Radio
                  value="Vacation/Second Home"

                >
                  Vacation/Second Home
            </Radio>
                <Radio

                  value="Investment/Rental Home"

                >
                  Investment/Rental Home
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Have you found a Home Yet?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'haveFoundHome']}>
              <Radio.Group  >
                <Radio value="yes" >
                  Yes
            </Radio>
                <Radio value="no" >
                  No
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item name={['home_information', 'buyingHomeAddress']} label="What is the legal address of the home you want to buy, refinance or take cash out of?">
            <Input placeholder="full address" name={['home_information', 'buyingHomeAddress']} />
          </Form.Item>
        </Col>
      </Row>
      <Col span={24}>
        <Form.Item name={['home_information', 'loanTerms']} label="Available loan terms">
          <Radio.Group >
            <Radio
              value="10"
            >
              10 years
          </Radio>
            <Radio

              value="15"
            >
              15 years
          </Radio>
            <Radio
              value="20"
            >
              20 years
          </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item name={['home_information', 'isHelpNeededToFindHome']} label="Do you need help finding a Home to buy, do you need help with building your dream Home ">
          <Radio.Group  >
            <Radio
              value="yes"
            >
              Yes
          </Radio>
            <Radio
              value="no"
            >
              No
          </Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      {/* <Col width={12}>
        <Form.Item label="Do you currently own a Home? ">
          <Radio isInline label="yes" name="isHavingHomeNow" value="yes" />
          <Radio isInline label="no" name="isHavingHomeNow" value="no" />
        </Form.Item>
      </Col>
      <Col width={12}>
        <Form.Item label="Are you a first time Home buyer?">
          <Radio
            isInline
            label="yes"
            name="isFirstTimeBuyer"
            value="yes"
          />
          <Radio isInline label="no" name="isFirstTimeBuyer" value="no" />
        </Form.Item>
      </Col> */}
      {/* <Col width={12}>
        <Form.Item label="Do you have an uncompleted building you want to complete?">
          <Radio
            isInline
            label="yes"
            name="hasUncompletedBuilding"
            value="yes"
          />
          <Radio
            isInline
            label="no"
            name="hasUncompletedBuilding"
            value="no"
          />
        </Form.Item>
      </Col> */}
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item hasFeedback label="Which of the following describes your house ownership?">
          <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'hasHome']}>
            <Select name="hasHome" onChange={handleHasHome("hasHome")}>
              <Option >Select Option</Option>
              <Option value="I currently own a completed home"> I currently own a completed home</Option>
              <Option value="I am a first time buyer">I am a first time buyer</Option>
              <Option value="I have an uncompleted building I want to complete"> I have an uncompleted building I want to complete</Option>
            </Select>
          </Form.Item>
        </Form.Item>
      </Col>
      {homeInformation.hasHome === "I currently own a completed home" ? (
        <Col span={24}>
          <Form.Item label="Do you have a mortgage on the home?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'hasMortgage']}  >
              <Radio.Group name="hasMortgage" onChange={handleDataChange}>
                <Radio
                  value="yes"
                >
                  Yes
            </Radio>
                <Radio
                  value="no"
                >
                  No
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      ) : (
        ""
      )}
      {homeInformation.hasMortgage === "yes" ? (
        <Col width={12}>
          <Form.Item label="Is the Official Title/Ownership of this Home in your Name?">
            <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'hasTitleInName']}>
              <Radio.Group name="hasTitleInName" onChange={handleDataChange}>
                <Radio
                  value="yes"
                >
                  Yes
            </Radio>
                <Radio
                  value="no"
                >
                  No
            </Radio>
              </Radio.Group>
            </Form.Item>
          </Form.Item>
        </Col>
      ) : (
        ""
      )}
      {homeInformation.hasTitleInName === "yes" ? (
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item label="What is the legal name of the official title?">
              <Form.Item rules={[{ required: true }]} noStyle name={['home_information', 'titleLegalName']}  >
                <Input
                  placeholder="Enter Name on Land Title"
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}
      {homeInformation.hasHome === "homeComplete" ? (
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item name={['home_information', 'homeAcquiredDate']} label="When did you buy or build your bome?">
              <DatePicker
                name="homeAcquiredDate"
                // onChange={handleDateChange("homeAcquiredDate")}
                format={dateFormat}
              // value={homeInfoState.homeAcquiredDate}
              />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ""
      )}

      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item name={['home_information', 'howIsYourCredit']} label="How is Your Credit?">
          <Select  >
            <Option value="Excellent">Excellent</Option>
            <Option value="Good">Good</Option>
            <Option value="Average">Average</Option>
            <Option value="No Credit. Building one now">No Credit. Building one now</Option>
          </Select>
        </Form.Item>
      </Col>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item label="How much are you seeking to receive for your mortgage (USD)">
            <Form.Item rules={[{ required: true }]} noStyle name={'loan_amount'}  >
              <InputNumber
                placeholder="Enter Name on Land Title"
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default HomeInformation;
