import { Col, Row, Form, Select, Input, Checkbox, DatePicker, Button } from "antd"
import { useEffect, useState } from "react"
import moment from 'moment';
import { PlusIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../TransferMoney/TransferMoney.module.css"
import KYCListCard from "../Components/KYCListCard"
import { useDispatch, useSelector } from "react-redux";
import { saveKCYValues } from "../duck/action";
import { addingUser, getRoles, updateBusUser } from "../../UserManagement/duck/action";
import AddRolePopUp from "./components/AddRolePopUp";
import { normalizeIdArrayData } from "../../../helpers/utils";



   







const UserRoles = ({ form }) => {
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.kyc.values)
    const rLoading = useSelector((state) => state?.userMgt?.addingUser)
    // useEffect(()=>{
    //     dispatch(getRoles())
    // }, [dispatch])

    const roles = useSelector((state) => state?.userMgt?.roles)
    let _roles = roles ? roles : {}
    const [visible, setVisible] = useState(false)
    const [disabledSave, setDisableSave] = useState(true)

    const UserRoleForms = () => {
        const { Option } = Select

        const handleChangeRole = (e)=>{
            if(e === "new"){
                setVisible(true)
            }
        }

        const onFormChange = (e)=>{
            if(e === "new"){
                setVisible(true)
            }
            const fields = form.getFieldValue('user_roles')
            const fieldVals = Object.values(fields)
            const disP = fieldVals[0] === undefined || fieldVals[1] === undefined || fieldVals[2]=== undefined || fieldVals[3] === undefined
            console.log(disP)
            setDisableSave(disP)
        }
        const handleFormSubmit = () => {
            let values = form.getFieldValue('user_roles')
          
            if(values.id !== undefined){
                // Editing an item
                dispatch(updateBusUser(values, values.id)).then((res)=>{
                        setShowForm(false)
                })
            }
            else{
                dispatch(addingUser(values)).then((res)=>{
                    if(res){
                        setShowForm(false)
                    }
                })
            }
        }
        return (
            <>
                <div className={Styles.formRow}>
                    <Input hidden name={['user_roles', 'id']}/>
                    {/* <Row gutter={[32, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Select User Role">
                                <Form.Item
                                    name={['user_roles', 'user_type']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                   
                                <Select onChange={handleChangeRole}   size="large" >
                                {
                                    Object.values(_roles)?.map((role) => {
                                        return (
                                            <Option key={role.id}> {role.name}</Option>
                                        )
                                    })
                                }
                                <Option key="new"> <span style={{color: "#2272F4"}}><PlusIcon width="1em" height="1em" color="#2272F4"/>Add new role</span> </Option>
                            </Select>

                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row> */}
                </div>

                <div className={Styles.formRow}>

                    <Row gutter={[32, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Select User Role">
                                <Form.Item
                                    name={['user_roles', 'role_id']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                   
                                <Select onChange={(e)=>{handleChangeRole(e) ; onFormChange()}}   size="large" >
                                {
                                    Object.values(_roles)?.map((role) => {
                                        return (
                                            <Option value={role.id} key={role.id}> {role.name}</Option>
                                        )
                                    })
                                }
                                <Option value={"new"} key="new"> <span style={{color: "#2272F4"}}><PlusIcon width="1em" height="1em" color="#2272F4"/>Add new role</span> </Option>
                            </Select>

                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label="Full Legal Name"
                                name={['user_roles', 'full_name']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input onChange={onFormChange} size="large" />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Occupation/Job Titile" rules={[{ required: true }]} name={['user_roles', 'job_title']}>
                                <Input size="large" />
                            </Form.Item>
                        </Col> */}
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Date of Birth" rules={[{ required: true }]} name={['user_roles', 'date_of_birth']}>
                                <DatePicker onChange={(d, ds) => console.log(ds)} size="large" placeholder="yyyy-mm-dd" style={{ width: "100%", background: "#F7F7F7" }} />
                            </Form.Item>
                        </Col> */}
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        </Col> */}
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Email" rules={[{ required: true }]} name={['user_roles', 'email']}>
                                <Input onChange={onFormChange} type={'email'} size="large" placeholder="eg. james@javolin.com" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item label="Phone Number" rules={[{ required: true }]} name={['user_roles', 'phone_number']}>
                                <Input onChange={onFormChange} size="large" placeholder="+233123456789" />
                            </Form.Item>
                        </Col>
                    </Row>


                </div>

                <div style={{ width: "100%" }} className={Styles.buttonContainter}>
                <div onClick={()=>setShowForm(false) } className={Styles.cancelBtn}>
                        Cancel
                    </div>
                    <div className={Styles.tnxButton3}>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"
                            loading={rLoading}
                            disabled={disabledSave}
                            onClick={handleFormSubmit}

                        >
                           {form.getFieldValue('user_roles').id ? "Update User" : "Add User"} 
                        </Button>
                    </div>
                </div>
            </>
        )
    }
    const users = useSelector((state) => state?.userMgt?.users)
    let data = users
        ? Object.values(users).map((user) => {
            return {
                key: user.id,
                full_name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                role_id: user?.is_parent? "1" : user?.role?.role?.id,
                id: user.id,
                is_parent: user.is_parent
                
            };
        })
        : [];
    const users_data = normalizeIdArrayData(data)

    const openNewUserForm = ()=>{
        form.setFieldsValue({
            user_roles: ""
        })
        setShowForm(true)
    }
    
    const UserList = ({ onCLickEdit }) => {
        return (
            <>
                {data.map((item) => {
                    return (
                        <Col key={item.id} xs={24} sm={24} md={12} lg={12} xl={12}>
                            <KYCListCard onCLickEdit={onCLickEdit} name={item.full_name} id={item.id} />
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
        const user = users_data[item_id]
        console.log(user)
        form.setFieldsValue({
            user_roles: user
        })
        setShowForm(true)
    }

    return (
        <div className={`${Styles.sectionBox} ${Styles.white}`}>
            <AddRolePopUp isVisible={visible} setIsModalVisible={setVisible} />

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