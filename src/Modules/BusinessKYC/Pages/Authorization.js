import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button } from "antd"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { saveKCYValues, submitKYCForm } from "../duck/action"
import moment from 'moment';
import { useHistory } from "react-router"
import SignatureCanvas from 'react-signature-canvas'












const Authorization = ({ form }) => {
    const formValues = useSelector((state) => state.kyc.values)
    const user = useSelector((state) => state.user)
    const subLoading = useSelector((state) => state.kyc.submittingKyc)
    const signatories = formValues?.authorizationAndCertification?.signatories ? formValues?.authorizationAndCertification?.signatories : []
    let authorization_information = formValues?.authorizationAndCertification
    let signatories_details = authorization_information?.signatories
    const history = useHistory()
    const dispatch = useDispatch()
    let sigPad = {}

    const handleFormSubmit = () => {

        let values = form.getFieldValue('authorizationAndCertification')
        // change moment date format
        values = {
            ...values,
            signatories: {
                ...values.signatories,
                date_signed: values.signatories.date_signed._d.toISOString().slice(0, 10).toString(),
                dob: values.signatories.dob._d.toISOString().slice(0, 10).toString(),
                signature: sigPad ? getSignatureImage() : signatories_details[values.signatories.id]?.signature
            }
        }
        
        if (values.signatories.id !== undefined) {
            // Editing an item
            let signatoriesDetails = signatories_details
            signatoriesDetails.splice(values.signatories.id, 1, values.signatories)
            dispatch(saveKCYValues({
                ...formValues,
                authorizationAndCertification: {
                    ...values,
                    signatories: signatoriesDetails
                }
            }))
        }
        else {
            // normal save 
            const new_values = signatories_details !== undefined ? signatories_details?.concat(values.signatories) : [values.signatories]
            dispatch(saveKCYValues({
                ...formValues,
                authorizationAndCertification: {
                    ...values,
                    signatories: new_values
                }
            }))
        }

        setShowForm(false)

    }

    
    const clearSignature=()=>{
        sigPad.clear()
    }

  

    const clearEditSignature = ()=>{
        setSignImage(undefined)
    }
    const getSignatureImage = ()=>{
        return sigPad.getTrimmedCanvas().toDataURL('image/png')
    }
    const SignatoryDetailsForm = ({ form }) => {
        return (
            <div className={Styles.formRow}>
                <h5>Signatory Details</h5>
                <Input hidden name={['authorizationAndCertification', 'signatories', 'id']} />
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Client's Complete Legal Name">
                            <Form.Item
                                name={['authorizationAndCertification', 'legal_name']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Date Signed">
                            <Form.Item rules={[{ required: true }]} noStyle name={['authorizationAndCertification', 'signatories', 'date_signed']}>
                                <DatePicker size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Full Legal name">
                            <Form.Item
                                name={['authorizationAndCertification', 'signatories', 'full_name']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Date of birth">
                            <Form.Item rules={[{ required: true }]} noStyle name={['authorizationAndCertification', 'signatories', 'dob']}>
                                <DatePicker size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Job Title">
                            <Form.Item
                                name={['authorizationAndCertification', 'signatories', 'job_title']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Email">
                            <Form.Item rules={[{ required: true }]} noStyle name={['authorizationAndCertification', 'signatories', 'email']}>
                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Complete residential address">
                            <Form.Item
                                name={['authorizationAndCertification', 'signatories', 'residential_address']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col style={{ border: "solid 1px black" }} xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Signature">
                            <Form.Item rules={[{ required: true }]} noStyle name={['authorizationAndCertification', 'signatories', 'signature']}>
                               
                                {signImage ? (
                                    <>
                                    <img src={signImage} alt="signature"/>
                                     <div style={{ cursor: "pointer", color: "#0032A0"}} onClick={clearEditSignature}>clear</div>
                                    </>
                               ):
                               <>
                                    <SignatureCanvas 
                                    canvasProps = {{ width: 500, height: 200, className: 'sigCanvas' }}
                                ref={(ref) => { sigPad = ref }}
                                    />   
                                     <div style={{ cursor: "pointer", color: "#0032A0"}} onClick={clearSignature}>clear</div>
                                </>                        
                               }
                                
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    
                </Row>
                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            // htmlType="submit"
                            style={{marginTop: "2em"}}
                            size="large"
                            onClick={handleFormSubmit}

                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const openNewUserForm = () => {
        form.setFieldsValue({
            authorizationAndCertification: {
                ...authorization_information,
                signatories: ""
            }
        })
        setShowForm(true)
    }


    const handleKYCsubmit = ()=>{
        console.log(formValues)
        debugger
        // dispatch(submitKYCForm(formValues, history))
    }
    const SignatoryList = ({ onCLickEdit }) => {
        return (
            <>
                <h5>List of Signatories</h5>
                {signatories.map((item, i) => {
                    return (
                        <Col key={i} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <KYCListCard onCLickEdit={onCLickEdit} name={item.full_name} id={i} />
                        </Col>
                    )
                })}
                <div onClick={openNewUserForm} className={Styles.kycSubNote}> <PlusIcon height={'1em'} width={'1em'} color={'#0032A0'} />Add another Signatory</div>
                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"
                            loading={subLoading}
                            onClick={handleKYCsubmit}

                        >
                            Submit
                        </Button>
                    </div>
                </div>

            </>

        )
    }

    const AgreementForms = () => {
        return (
            <>
            <h5 className={Styles.kycnotes}> <span style={{ fontWeight: "900" }}>Beneficial Owners: </span>
                    The Client authorizes Cambridge to open an account for foreign currency exchange and global payment transactions whereby 
                    Client shall be acting as principal, for and on its own behalf, and not on behalf of any third party, and to rely on all 
                    orders and instructions from anyone Cambridge reasonably believes is an Authorized User or Administrator of the Client. The 
                    Client certifies that (please check all the boxes):
                    </h5>

                <div className={Styles.formRow}>
                    <Row gutter={[32, 16]}>
                        <Form.Item
                            
                            name={['authorizationAndCertification', 'agreement_check']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            
                            
                            <Col >
                            
                                    <Checkbox onChange={(e)=>console.log(e)} value={"see"} style={{ padding: '0.7em' }}>All statements in this Agreement, and any other information and documentation submitted in support of this Agreement, are true and correct.</Checkbox>
                            
                            </Col>
                            
                                    
                        </Form.Item>
                    </Row>
                    <Row gutter={[32, 16]}>
                        <Form.Item
                            name={['authorizationAndCertification', 'read_and_understood_check']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            
                            <Col >
                            
                                    <Checkbox onChange={(e)=>console.log(e)} value={"sede"}  style={{ padding: '0.7em' }}>
                                    Client has read, understood and hereby accepts the attached terms and conditions
                                    </Checkbox>
                            
                            </Col>
                            

                        </Form.Item>
                    </Row>
                    <Row gutter={[32, 16]}>
                        <Form.Item
                            name={['authorizationAndCertification', 'privacy_read_check']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >

                            
                            <Col >
                            
                                    <Checkbox value={"seee"}  style={{ padding: '0.7em' }}>
                                    It consents to the Privacy Notice at https://javolin.com/privacy
                                </Checkbox>
                            
                            </Col>

                            
                        </Form.Item>
                    </Row>
                    <Row gutter={[32, 16]}>
                        <Form.Item
                            name={['authorizationAndCertification', 'authority_check']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            
                            <Col >
                            
                                    <Checkbox value={"stee"}  style={{ padding: '0.7em' }}>
                                    The individual(s) signing this application have the authority to bind the Client to the terms of this Agreement (supporting documentation may be requested)
                                </Checkbox>
                            
                            </Col>
                            

                        </Form.Item>
                    </Row>
                </div>


            </>
        )
    }


    const formState = signatories.length === 0
    const [showForm, setShowForm] = useState(formState)
    const [signImage, setSignImage] = useState()

    

    const handleEditForm = (item_id) => {
        let authorization_information = formValues?.authorization_information.signatories

        const editValues = {
            ...authorization_information[item_id],
            id: item_id,
            date_signed: moment(authorization_information[item_id].date_signed, 'YYYY-MM-DD'),
            dob: moment(authorization_information[item_id].dob, 'YYYY-MM-DD')
        }

        form.setFieldsValue({
            authorization_information: {
                ...authorization_information,
                signatories: editValues
            }

        })
        //Display image on canvas
        
        setShowForm(true)
        setSignImage(authorization_information[item_id].signature)
        // sigPad.fromDataURL(authorization_information?.signature)
    }

    const SignatoryListDetails = () => {
        return (

            showForm ? (
                <SignatoryDetailsForm form={form} />
            ) :
                <SignatoryList onCLickEdit={handleEditForm} />

        )
    }
   
    

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>Ownership</p>
            <AgreementForms />

           
            <SignatoryListDetails />
       


        </div>
    )
}


export default Authorization