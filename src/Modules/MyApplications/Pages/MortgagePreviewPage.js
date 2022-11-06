import { Header, Page, Container } from "tabler-react";
import { Row, Col, Divider, Card, Form, Badge } from "antd";
import ApplicationMenu from "./ApplicationMenu";
import { useSelector } from "react-redux"
import Styles from "./MortgageApply.module.css";
import { statusColor } from "../../../helpers/utils"
import { REACT_APP_BASE_API_URL } from "../../../helpers/contants";


const ColData = ({ label, res }) => {
  return (
    <>
      {res !== undefined ? (
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label={label}>
            <div className={Styles.approveResponse}>{res}</div>
          </Form.Item>
        </Col>
      ) : ""}

    </>
  )
}
const DocPair = ({ label, url, filename }) => {
  return (
    <>
      {url !== undefined ? (
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form.Item label={label}>
            <div> <a href={url} target="_blank" rel="noreferrer">{filename}</a> </div>
          </Form.Item>
        </Col>
      ) : ""}
    </>
  )
}

const changeToArray = (item) => {
  if (typeof item === 'object' && item !== null) {
    return Object.values(item)
  } else if (Array.isArray(item)) {
    return item
  }

}

const MortgagePreviewPage = (props) => {

  const user = useSelector((state) => state.user);


  const { id } = props.match.params;
  const submittedApplications = useSelector((state) => state?.submittedApplications?.entities)
  const applications = submittedApplications?.applications

  const applicationDetails = applications[id]
  let { home_information, guarantors_details, co_applications, employee_details, asset_declaration, documents } = applicationDetails

  home_information = JSON.parse(home_information)
  guarantors_details = JSON.parse(guarantors_details)
  co_applications = JSON.parse(co_applications)
  employee_details = JSON.parse(employee_details)
  asset_declaration = JSON.parse(asset_declaration)
  documents = JSON.parse(documents)

  co_applications = co_applications ? changeToArray(co_applications) : co_applications


  return (

    <>
      <ApplicationMenu nav="preview" applicationId={id} />
      <Page.Content title="Mortgage Application">

        <Container>
          <Badge.Ribbon color={statusColor(applicationDetails.status)} text={applicationDetails.status} >

            <Card title={`Application Reference:  ${applicationDetails.reference}`}>
              <Form layout="vertical">
                <Divider orientation="left" plain>
                  <Header.H3>Home Information</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <ColData label="Where do you live?" res={home_information?.country} />
                  <ColData label="What do you want to do?" res={home_information?.homeServiceType} />
                  <ColData label="Type of Home" res={home_information?.HomeType} />
                  <ColData label="What are you using this Home for?" res={home_information?.homePurpose} />
                  <ColData label="Have you found a Home Yet?" res={home_information?.haveFoundHome} />
                  <ColData label="What is the legal address of the home you want to buy, refinance or take cash out of?" res={home_information?.buyingHomeAddress} />
                  <ColData label="Do you need help finding a Home to buy, do you need help with building your dream Home " res={home_information?.isHelpNeededToFindHome} />
                  <ColData label="Which of the following describes your house ownership?" res={home_information?.hasHome} />
                  <ColData label="Do you have a mortgage on the home?" res={home_information?.hasMortgage} />
                  <ColData label="Is the Official Title/Ownership of this Home in your Name?" res={home_information?.hasTitleInName} />
                  <ColData label="What is the legal name of the official title?" res={home_information?.titleLegalName} />
                  <ColData label="How is Your Credit?" res={home_information?.howIsYourCredit} />
                </Row>

                <Divider orientation="left" plain>
                  <Header.H3>Personal Details</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <ColData label="First Name" res={user.first_name} />
                  <ColData label="Middle Name" res={user.middle_name} />
                  <ColData label="Last Name" res={user.last_name} />
                  <ColData label="Date of Birth" res={user.date_of_birth} />
                  <ColData label="Current physical address" res={user.address} />
                  <ColData label="Town/City" res={user.city} />
                  <ColData label="Region " res={user.region} />
                  {/* <ColData label="Date you started living at address" res={user.addressLivingDate} />
                        <ColData label="Personal ID" res={user.personalId} />
                        <ColData label="Enter ID number" res={user.idNumber} />
                        <ColData label="What is your marriage status?" res={user.marriageStatus} />
                        <ColData label="Legal Name of Spouse" res={user.spouseName} />
                        <ColData label="(Spouse) Phone" res={user.spouseName} />
                        <ColData label="(Spouse) email" res={user.spouseEmail} />
                        <ColData label="How many children do you have?" res={user.childrenNum} /> */}
                </Row>
                {co_applications !== undefined ? (
                  <div>
                    <Divider orientation="left" plain>
                      <Header.H3>Co-appliants's Details</Header.H3>
                    </Divider>

                    {co_applications.map((coapplicant, i) => {
                      return (
                        <Row key={i} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                          <Divider orientation="right" plain>
                            <p style={{ color: "#1890ff" }}>Co-Applicant {i + 1}</p>
                          </Divider>
                          <ColData label="First Name" res={coapplicant.coFname} />
                          <ColData label="Middle Name" res={coapplicant.coMname} />
                          <ColData label="Last Name" res={coapplicant.coLname} />
                          <ColData label="Date of Birth" res={coapplicant.coDOB} />
                          <ColData label="Current physical address" res={coapplicant.coStreet} />
                          <ColData label="Town/City" res={coapplicant.coCity} />
                          <ColData label="Region " res={coapplicant.coRegion} />
                          <ColData label="Date you started living at address" res={coapplicant.coAddressLivingDate} />
                          <ColData label="Which of the following housing Options apply to him/her?" res={coapplicant.coHousingStatus} />
                          <ColData label="How much does he/she pay for rent or mortgage per month?" res={coapplicant.coHousingMonthlyPayment} />
                          <ColData label="Personal ID" res={coapplicant.coPersonalId} />
                          <ColData label="Enter ID number" res={coapplicant.coIdNumber} />
                          <ColData label="What is your marriage status?" res={coapplicant.coMarriageStatus} />
                          {/* <ColData label="Legal Name of Spouse" res={coapplicant.spouseName} />
                                        <ColData label="(Spouse) Phone" res={coapplicant.spouseName} />
                                        <ColData label="(Spouse) email" res={coapplicant.spouseEmail} />
                                        <ColData label="How many children do you have?" res={coapplicant.childrenNum} /> */}
                        </Row>
                      )
                    })}

                  </div>
                ) : ""}

                <Divider orientation="left" plain>
                  <Header.H3>Guarantor's Details</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <ColData label="First Name" res={guarantors_details.guarantorFname} />
                  <ColData label="Middle Name" res={guarantors_details.guarantorMname} />
                  <ColData label="Last Name" res={guarantors_details.guarantorLname} />
                  <ColData label="Phone" res={guarantors_details.guarantorPhone} />
                  <ColData label="Email" res={guarantors_details.guarantorEmail} />
                  <ColData label="Current physical address" res={guarantors_details.guarantorStreet} />
                  <ColData label="Town/City" res={guarantors_details.guarantorCity} />
                  <ColData label="Region " res={guarantors_details.guarantorRegion} />
                </Row>
                <Divider orientation="left" plain>
                  <Header.H3>Employment Information</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <ColData label="Which of the following applies to you?" res={employee_details.occupation} />

                </Row>

                {employee_details.employee !== undefined ?

                  (
                    <>
                      <Divider />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Header.H4 > <span style={{ color: "rgb(24, 144, 255)" }} > Employer Information </span></Header.H4>
                      </Row>
                      <br />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <ColData label="Employer Name" res={employee_details.employee.employerName} />
                        <ColData label="Current physical address" res={employee_details.employee.employerStreetName} />
                        <ColData label="Town/City" res={employee_details.employee.employerCity} />
                        <ColData label="Region" res={employee_details.employee.employerRegion} />
                        <ColData label="Start Date" res={employee_details.employee.employmentStartDate} />
                        <ColData label="Current Job?" res={employee_details.employee.isCurrentJob} />
                        <ColData label="End Date" res={employee_details.employee.employmentEndDate} />
                        <ColData label="Enter job Position" res={employee_details.employee.positionAtWork} />
                        <ColData label="Years of experience in this industry" res={employee_details.employee.positionAtWork} />
                        <ColData label="What is your monthly salary, before taxes are taken out?" res={employee_details.employee.monthlySalary} />
                        <ColData label="Tel (HR/Manager/Company)" res={employee_details.employee.companyTelephone} />

                      </Row>
                    </>

                  ) : ""}

                {employee_details.selfEmployed !== undefined ?

                  (
                    <>
                      <Divider />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Header.H4> <span style={{ color: "rgb(24, 144, 255)" }} >Self Employment Information</span> </Header.H4>
                      </Row>
                      <br />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                        <ColData label="Name of Business" res={employee_details.selfEmployed.businessName} />
                        <ColData label="Tax Identification Number (TIN)" res={employee_details.selfEmployed.tin} />
                        <ColData label="Date You Registered Business" res={employee_details.selfEmployed.businessRegistrationDate} />
                        <ColData label="How many years have you been in business" res={employee_details.selfEmployed.yearsInBusiness} />
                        <ColData label="Type of business?" res={employee_details.selfEmployed.typeOfBusiness} />
                        <ColData label="Complete address of your business" res={employee_details.selfEmployed.businessAddress} />
                        <ColData label="Primary phone" res={employee_details.selfEmployed.selfEmployedPrimaryPhone} />
                        <ColData label="Secondary phone" res={employee_details.selfEmployed.selfEmployedSecondaryPhone} />
                        <ColData label="Email address" res={employee_details.selfEmployed.selfEmployedEmailAddress} />
                      </Row>
                    </>
                  ) : ""}


                <Divider orientation="left" plain>
                  <Header.H3>Asset Declaration</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <ColData label="Do you have a bank account?" res={asset_declaration.hasBankAccount} />
                  <ColData label="Which bank do you bank with?" res={asset_declaration.bankName} />
                  <ColData label="Type of account?" res={asset_declaration.accountType} />
                  <ColData label="What is the current balance in account now?" res={asset_declaration.currentAccountBalance} />
                  <ColData label="Phone" res={asset_declaration.guarantorPhone} />
                  <ColData label="Where did you open this/these account(s)?" res={asset_declaration.placeOfAcount} />
                  <ColData label="Where do you have your money?" res={asset_declaration.moneyPlace} />
                  <ColData label="Do you have 20% downpayment for your target home price?" res={asset_declaration.hasDownPayment} />
                  <ColData label="Would you be interested in opening a savings account with Javolin?" res={asset_declaration.wantJavolinSavings} />
                  <ColData label="How much are you ready to deposit now?" res={asset_declaration.depositAmount} />
                  <ColData label="Are you getting gift money or money contributions for your down payment?" res={asset_declaration.gettingGift} />
                </Row>
                {
                  asset_declaration.gettingGift === "yes" ? (
                    <>
                      <Divider />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Header.H4> <span style={{ color: "rgb(24, 144, 255)" }} >Gift Details</span> </Header.H4>
                      </Row>
                      <br />
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <ColData label="Who is giving you the gift money?" res={asset_declaration?.gift_details?.donorName} />
                        <ColData label="What is your relationship to the person giving you the gift for down payment?" res={asset_declaration?.gift_details?.donorRelationship} />
                        <ColData label="His/Her Telephone number?" res={asset_declaration?.gift_details?.donorPhone} />
                        <ColData label="Current physical address" res={asset_declaration?.gift_details?.donorStreet} />
                        <ColData label="Town/City" res={asset_declaration?.gift_details?.donorCity} />
                        <ColData label="Region" res={asset_declaration?.gift_details?.donorRegion} />
                        <ColData label="Email" res={asset_declaration?.gift_details?.donorEmail} />
                      </Row>
                    </>
                  ) : ""
                }


                <Divider orientation="left" plain>
                  <Header.H3>Document Upload</Header.H3>
                </Divider>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <DocPair filename="National ID" url={`${REACT_APP_BASE_API_URL}${documents.idDoc}`} />
                  <DocPair filename="Utility bill" url={`${REACT_APP_BASE_API_URL}${documents.utilityBillDoc}`} />
                  <DocPair filename="Bank Statement" url={`${REACT_APP_BASE_API_URL}${documents.bankStatementDoc}`} />
                  <DocPair filename="Paychecks" url={`${REACT_APP_BASE_API_URL}${documents.paycheckDoc}`} />
                  <DocPair filename="Tax Seturns" url={`${REACT_APP_BASE_API_URL}${documents.taxDoc}`} />
                </Row>
              </Form>

            </Card>
          </Badge.Ribbon>
        </Container>
      </Page.Content>
    </>
  );
};

export default MortgagePreviewPage;
