import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button } from "antd"
import { useState } from "react"
import moment from 'moment';
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { useDispatch, useSelector } from "react-redux";
import { saveKCYValues } from "../duck/action";



   







const UserRoles = ({ form }) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.kyc.values)

    const UserRoleForms = () => {
        const { Option } = Select

        const handleFormSubmit = () => {
            let values = form.getFieldValue('user_roles')
            let user_roles = formValues?.user_roles
            
            // change moment date format
            values = {
                ...values,
                date_of_birth: values.date_of_birth._d.toISOString().slice(0, 10).toString()
            }

            console.log('values: ', values)
            if(values.id !== undefined){
                // Editing an item
                let userRoles = user_roles
                userRoles.splice(values.id, 1, values)
                console.log("newVal: ", userRoles)
                dispatch(saveKCYValues({
                    ...formValues,
                    user_roles: userRoles
                }))
            }
            else{
                // normal save 
                const new_values = user_roles !== undefined ? user_roles?.concat(values) : [values]
                dispatch(saveKCYValues({
                    ...formValues,
                    user_roles: new_values
                }))
            }
                       
            setShowForm(false)

        }
        return (
            <>

                <div className={Styles.formRow}>
                    <Input hidden name={['user_roles', 'id']}/>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="User Type">
                                <Form.Item
                                    name={['user_roles', 'user_type']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select size="large">
                                        <Option value="super admin">Super Admin</Option>
                                        <Option value="admin">Admin</Option>
                                        <Option value="user">User</Option>
                                    </Select>

                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className={Styles.formRow}>
                    <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label="Full Legal Name"
                                name={['user_roles', 'full_legal_name']}
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
                            <Form.Item label="Occupation/Job Titile" rules={[{ required: true }]} name={['user_roles', 'job_title']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Date of Birth" rules={[{ required: true }]} name={['user_roles', 'date_of_birth']}>
                                <DatePicker onChange={(d, ds) => console.log(ds)} size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Physical Address">
                                <Form.Item
                                    noStyle
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your physical address",
                                        },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Email" rules={[{ required: true }]} name={['user_roles', 'email']}>
                                <Input type={'email'} size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Phone Number" rules={[{ required: true }]} name={['user_roles', 'phone_number']}>
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
    const data = formValues?.user_roles ? formValues?.user_roles : []

    const openNewUserForm = ()=>{
        form.setFieldsValue({
            user_roles: ""
        })
        setShowForm(true)
    }
    
    const UserList = ({ onCLickEdit }) => {
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

    const formState = data.length === 0
    const [showForm, setShowForm] = useState(formState)

    // function to show the edit form prepopulated
    const handleEditForm =(item_id)=>{
        const user_roles = formValues?.user_roles

        // Changes date format to moment
        const editValues = {
            ...user_roles[item_id],
            id: item_id,
            date_of_birth: moment(user_roles[item_id].date_of_birth, 'YYYY-MM-DD')
        }
        form.setFieldsValue({
            user_roles: editValues
        })
        setShowForm(true)
    }

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <p>USER ROLES & PERMISSIONS</p>
            <h5 className={Styles.kycnotes}>Business must appoint at least one Authorised user</h5>
            {
                showForm ? (
                    <UserRoleForms/>
                ):
                    <UserList onCLickEdit = {handleEditForm} />
            }
        </div>
    )
}


export default UserRoles