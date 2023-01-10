import { CONSTANTS } from "@firebase/util"
import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button, Radio } from "antd"
import { useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { REACT_APP_GOOGLE_API_URL } from "../../../helpers/contants"
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { saveKCYValues } from "../duck/action"










const Ownership = ({ form }) => {

    const formValues = useSelector((state) => state.kyc.values)
    const owners_ = formValues?.ownership?.owners ? formValues?.ownership?.owners : []
    const formState = owners_.length === 0
    const [showForm, setShowForm] = useState(formState)
    console.log('values form:',formValues)
    const [hasOver25Ownership, setHasOver25Ownership] = useState(formValues?.ownership?.has_owner)
   
    let ownership = formValues?.ownership
    let owner_details = ownership?.owners

    const OwnerDetailsForm = () => {
        const dispatch = useDispatch()

        const handleFormSubmit = () => {
            
            let values = form.getFieldValue('ownership')
        
            if (values.owner_details.id !== undefined) {
                // Editing an item
                let ownerDetails = owner_details
                ownerDetails.splice(values.owner_details.id, 1, values.owner_details)
                dispatch(saveKCYValues({
                    ...formValues,
                    ownership: {
                        ...values,
                        owners: ownerDetails
                    }
                }))
            }
            else {
                // normal save 
                const new_values = owner_details !== undefined ? owner_details?.concat(values.owner_details) : [values.owner_details]
                
                dispatch(saveKCYValues({
                    ...formValues,
                    ownership: {
                        ...values,
                        owners: new_values
                    }
                }))
                console.log(formValues.ownership)
            }

            setShowForm(false)

        }

        return (
            <div className={Styles.formRow}>
                <h5>Owner Details</h5>
                <Input hidden name={['ownership', 'owner_details', 'id']} />
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Full Legal Name">
                            <Form.Item
                                name={['ownership', 'owner_details', 'full_legal_name']}
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
                        <Form.Item label="Nationality/Citizenship">
                            <Form.Item rules={[{ required: true }]} noStyle name={['ownership', 'owner_details', 'nationality']}>
                                <Input size="large" />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label="Ownership Percentage (%)">
                            <Form.Item
                                name={['ownership', 'owner_details', 'ownership_percentage']}
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
                        <Form.Item label="Complete Residential Address">
                            <Form.Item rules={[{ required: true }]} noStyle name={['ownership', 'owner_details', 'residential_address']}>
                                <Input size="large" />
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
            ownership: {
                ...ownership,
                owner_details: ""
            }
        })
        setShowForm(true)
    }

    const OwnerList = ({ onCLickEdit }) => {
        return (
            <>
                <h5>List of Owners</h5>
                {owners_?.map((item, i) => {
                    return (
                        <Col key={i} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <KYCListCard onCLickEdit={onCLickEdit} name={item.full_legal_name} id={i} />
                        </Col>
                    )
                })}
                <div onClick={openNewUserForm} className={Styles.kycSubNote}> <PlusIcon height={'1em'} width={'1em'} color={'#0032A0'} /> Add another owner</div>
                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"

                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </>

        )
    }

    const OwnershipForms = () => {
        return (
            <>

                <div className={Styles.formRow}>

                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={32} lg={16} xl={16}>
                            <Form.Item
                                label="Owned by a publicly traded entity?"
                                name={['ownership', 'isPublicCompany']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col style={{ width: "100%" }} span={12}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="yes">Yes</Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="no">No</Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <Form.Item
                            
                                label="Symbol"
                                name={['ownership', 'symbol']}
                                
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={32} lg={32} xl={32}>
                            <Form.Item
                                label="Does any individual own 25% or more?"
                                name={['ownership', 'has_owner']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group onChange={handleOwnershipPercentage} style={{ width: '100%' }}>
                                    <Row gutter={[32, 16]}>
                                        <Col style={{ width: "100%" }} span={12}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="true">Yes</Radio>
                                        </Col>
                                        <Col span={12}>
                                            <Radio className={Styles.checkboxContainer} style={{ padding: '0.7em' }} value="false">No</Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                    </Row>
                </div>


            </>
        )
    }
 

    const handleEditForm = (item_id) => {
        
        const editValues = {
            ...owner_details[item_id],
            id: item_id,
        }

        console.log('editing: ',{
            ...ownership,
            owner_details: editValues
        })
        form.setFieldsValue({
            ownership: {
                ...ownership,
                owners: editValues
            }
             
        })
        setShowForm(true)
    }

    const ShowOwershipListDetails = () => {
        return (

            showForm ? (
                <OwnerDetailsForm  />
            ) :
                <OwnerList onCLickEdit={handleEditForm} />

        )
    }
    
    const handleOwnershipPercentage =(e)=>{
        setHasOver25Ownership(e.target.value)
    }

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>Ownership</p>
            <h5 className={Styles.kycnotes}> <span style={{fontWeight: "900"}}>Beneficial Owners: </span>
            Each individual who directly owns or controls 25% or more of the Client. Supporting documentation demonstrating beneficial ownership may be requested.</h5>
            <OwnershipForms />

            {hasOver25Ownership === 'true' ? (
                <ShowOwershipListDetails />
            ): ""}

            
        </div>
    )
}


export default Ownership