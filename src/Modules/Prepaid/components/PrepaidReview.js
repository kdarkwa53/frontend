
import { Modal, Button, Col, Row } from "antd";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Styles from "../../../Shared/Components/ReviewPopUp/ReviewPopUp.module.css"
import { submitPrepaid } from "../duck/action";



const PrepaidReview = ({ setReview, showReview, details, type }) => {
    const loading = useSelector((state) => state.prepaid.submittingPrepaid)
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(details)

    if(type==="json"){
        details = {
            ...details,
            address_info: details?.address_info ? JSON.parse(details?.address_info) : "",
            birth_info: details?.address_info ? JSON.parse(details?.birth_info) :"",
            customer_info: details?.customer_info ? JSON.parse(details?.customer_info): "",
            identification_info: details?.identification_info?JSON.parse(details?.identification_info): "",
            occupational_info: details?.occupational_info ? JSON.parse(details?.occupational_info) : "",
        }
    }




    const handleCancel = () => {
        setReview(false);
    };

    const onContinue = () => {
        dispatch(submitPrepaid(details, history))
    }

    return (
        <Modal
            visible={showReview}
            style={{ top: 100 }}
            footer={false}
            closable={false}
            onCancel={handleCancel}
            width={"60%"}

            bodyStyle={
                {
                    padding: 0
                }
            }
        >


            <div className={Styles.reviewCard}>
                <div>
                    <div className={Styles.header}>
                        <div className={Styles.secTitle}>
                            {type === "json"? "Preview": "Review"}
                        </div>
                        <div className={Styles.close} onClick={handleCancel}>x</div>
                    </div>

                    <div className={Styles.contentA}>

                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>

                                <div className={Styles.revSection}>
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Prepaid Type
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.prepaid_card_type}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Card Type
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.card_type}
                                            </div>
                                        </Col>
                                    </Row>

                                </div>

                                {/* BIO DATA */}

                                <div className={Styles.revSection}>
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Title
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.title}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Surname
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.surname}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Middle Name
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.middle_name}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                First Name
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.first_name}
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className={Styles.revRow}>
                                        <div className={Styles.revTitle}>
                                            Preferred name on card
                                        </div>
                                        <div className={Styles.revAns}>
                                            {details?.preferred_name_on_card}
                                        </div>
                                    </div>

                                </div>
                                <div className={Styles.revSection}>
                                    <Row className={Styles.revRow}>
                                        <div>
                                            <div className={Styles.revTitle}>
                                            Channel to be disable
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.channels}
                                            </div>
                                        </div>
                                        
                                    </Row>
                                </div>
                                <div className={Styles.revSection}>
                                    <Row className={Styles.revRow}>
                                        <div>
                                            <div className={Styles.revTitle}>
                                                Residential address (street)
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.address_info?.current_physical_address}
                                            </div>
                                        </div>

                                    </Row>
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Country
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.address_info?.country}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                City
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.address_info?.city}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Time at present address
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.address_info?.tme_at_present_address}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Residential status
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.address_info?.residential_status}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={Styles.revSection}>
                                    
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className={Styles.revTitle}>
                                                    Residence permit number
                                                </div>
                                                <div className={Styles.revAns}>
                                                {details?.identification_info?.residential_permit}
                                                </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Type of ID
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.identification_info?.id_type}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={Styles.revRow}>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                ID no
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.identification_info?.id_number}
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div className={Styles.revTitle}>
                                                Country of issue
                                            </div>
                                            <div className={Styles.revAns}>
                                                {details?.identification_info?.country_issue}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col className={Styles.dividerBar} xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div style={{marginLeft: "1em"}}>
                                    <div className={Styles.revSection}>
                                        <Row className={Styles.revRow}>
                                            <div>
                                                <div className={Styles.revTitle}>
                                                    Email address
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.occupational_info?.email}
                                                </div>
                                            </div>

                                        </Row>
                                        <Row className={Styles.revRow}>
                                            <div>
                                                <div className={Styles.revTitle}>
                                                    Occupation/Profession
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.occupational_info?.occupation}
                                                </div>
                                            </div>
                                        </Row>
                                        <Row className={Styles.revRow}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className={Styles.revTitle}>
                                                    Expected annual income
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {`GHS ${details?.occupational_info?.income}`}
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className={Styles.revTitle}>
                                                    Mobile number
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.occupational_info?.phone_number}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className={Styles.revSection}>
                                        <Row className={Styles.revRow}>
                                            <div>
                                                <div className={Styles.revTitle}>
                                                    Date  of birth
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.birth_info?.date_of_birth}
                                                </div>
                                            </div>

                                        </Row>
                                        <Row className={Styles.revRow}>
                                            <div>
                                                <div className={Styles.revTitle}>
                                                    Place of birth
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.birth_info?.place_of_birth}
                                                </div>
                                            </div>
                                        </Row>
                                        <Row className={Styles.revRow}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className={Styles.revTitle}>
                                                    Gender at birth
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.birth_info?.gender}
                                                </div>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <div className={Styles.revTitle}>
                                                    Nationality
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.customer_info?.nationality}
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* <Row className={Styles.revRow}>
                                            <div>
                                                <div className={Styles.revTitle}>
                                                    Are you a Javolin customer
                                                </div>
                                                <div className={Styles.revAns}>
                                                    {details?.customer_info?.are_you_a_customer}
                                                </div>
                                            </div>
                                                
                                        </Row> */}
                                    </div>
                                </div>
                               
                            </Col>
                        </Row>
                    </div>
                </div>
                {type !== "json" ? <Button
                    block
                    size="large"
                    style={{ maxWidth: "400px", margin: "auto", textAlign: "center", paddingBottom: "2em" }}
                    type="primary"
                    loading={loading}
                    onClick={onContinue}
                >
                    Apply for Prepaid
                </Button> : ""}
                
            </div>

        </Modal>
    )
}

export default PrepaidReview