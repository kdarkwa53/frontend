import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button } from "antd"
import { useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { useDispatch, useSelector } from "react-redux"
import { REACT_APP_GOOGLE_API_URL } from "../../../helpers/contants"
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { saveKCYValues } from "../duck/action"









const DirectorInformation = ({ form }) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.kyc.values)

    const DirectorForms = () => {
        return (
            <>
            <div className={Styles.formRow}>
                    <Input hidden name={['directors', 'id']} />
                    <h5>Director/Appointee  Details</h5>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label="Full Legal Name"
                                name={['directors', 'full_legal_name']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Occupation/Job Titile" rules={[{ required: true }]} name={['directors', 'job_title']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>


                </div>

                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"
                            onClick={handleFormSubmit}

                        >
                            Save
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    const data = formValues?.directors ? formValues?.directors : []

    const openNewUserForm = () => {
        form.setFieldsValue({
            directors: ""
        })
        setShowForm(true)
    }

    const DirectorList = ({ onCLickEdit }) => {
        return (
            <>
                {data.map((item, i) => {
                    return (
                        <Col key={i} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <KYCListCard onCLickEdit={onCLickEdit} name={item.full_legal_name} id={i} />
                        </Col>
                    )
                })}
                <div onClick={openNewUserForm} className={Styles.kycSubNote}> <PlusIcon height={'1em'} width={'1em'} color={'#0032A0'} /> Add another user</div>
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


    const handleFormSubmit = () => {
        let values = form.getFieldValue('directors')
        let directors = formValues?.directors

        console.log('hva: ', values)
        if (values.id !== undefined) {
            // Editing an item
            let _directors = directors
            _directors.splice(values.id, 1, values)
            dispatch(saveKCYValues({
                ...formValues,
                directors: _directors
            }))
        }
        else {
            // normal save 
            const new_values = directors !== undefined ? directors?.concat(values) : [values]
            dispatch(saveKCYValues({
                ...formValues,
                directors: new_values
            }))
        }

        setShowForm(false)

    }

    const formState = data.length === 0
    const [showForm, setShowForm] = useState(formState)

   

    // function to show the edit form prepopulated
    const handleEditForm = (item_id) => {
        const directors = formValues?.directors

        // Changes date format to moment
        const editValues = {
            ...directors[item_id],
            id: item_id
        }
        form.setFieldsValue({
            directors: editValues
        })
        setShowForm(true)
    }

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>DIRECTORS/APPOINTED OFFICERS</p>
            <h5 className={Styles.kycnotes}>Each individual with significant responsibility to control, manage or direct the Client’s business and 
            affairs: including any board of director members, senior office-holders such as CEO or president, chairperson,partner, etc.</h5>
            {
                showForm ? (
                    <DirectorForms />
                ) :
                    <DirectorList onCLickEdit={handleEditForm} />
            }
        </div>
    )
}


export default DirectorInformation