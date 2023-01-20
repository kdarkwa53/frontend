import { Button, Form, Input, Row, Col, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { XIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addingUser, getRoles, getUsers, updateBusUser } from "./duck/action";


const EditUser = ({ isVisible, setIsModalVisible, editUser, setEditUser }) => {
    console.log(editUser)
    const dispatch = useDispatch()
    const rLoading = useSelector((state) => state?.userMgt?.addingUser)
    const users = useSelector((state) => state?.userMgt?.users)
    let userDetails = users[editUser.id]
    userDetails = {
        ...userDetails,
        role_id: userDetails?.role?.role_id
    }
    const [form] = useForm();
    useEffect(()=>{
        form.setFieldsValue(userDetails)
    }, [form, userDetails])

    
    
    const { Option } = Select
    const roles = useSelector((state) => state?.userMgt?.roles)
    const text = useSelector((state) => state?.language)
    const [disableBtn, setButtonDisable] = useState(true)

    

    

    

    let _roles = roles ? roles : {}

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false)
        
    }

    
    const showModal = () => {
        form.resetFields();
        setEditUser("")
        setIsModalVisible(true);
    };


    const handleformchange =()=>{
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setButtonDisable(hasErrors)
    }
    const onFinish = (val) => {
        // console.log(val, editUser.id)
        dispatch(updateBusUser(val, editUser.id)).then(()=>{
            setIsModalVisible(false)
        })
    }

    return (
        <>

            <Modal
                open={isVisible}
                onCancel={handleCancel}
                footer={false}
                width={"740px"}
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                bodyStyle={
                    {
                        padding: 0,
                        border: "16px 16px 0 0"
                    }
                }
            >
                <div className={Styles.header}>
                    <div className={Styles.secTitle}>{userDetails ? text["Edit user"] : text["Add new user"]}</div>
                </div>

                <Form
                    layout="vertical"
                    name="profile_form"
                    style={{ width: "100%" }}
                    form={form}
                    onFinish={onFinish}
                    onChange={handleformchange}
                    initialValues={
                        userDetails
                    }
                >
                    <div style={{ padding: "20px 70px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <Form.Item
                            name="full_name"
                            label={text["Full Name"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. Evans" />
                        </Form.Item>


                        <Form.Item
                            label={text["Email"]}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input disabled style={{ minWidth: "490px" }} size="large" placeholder="Eg. abc@zenithbank.com" />
                        </Form.Item>

                        <Form.Item
                            label={text["Phone Number"]}
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input disabled style={{ minWidth: "490px" }} size="large" placeholder="Eg. +1223449399304" />
                        </Form.Item>


                        <Form.Item
                            label={text["Role"]}
                            name="role_id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Select onChange={handleformchange} style={{ width: "100%" }} placeholder={text['Select role']} size="large" >
                                {
                                    Object.values(_roles)?.map((role) => {
                                        return (
                                            <Option key={role.id}> {role.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{ marginTop: "3em", padding: "5px 50px" }}
                            loading={rLoading}
                            shape="round"
                            disabled={disableBtn}
                        >
                            {editUser? text['Edit user'] : text['Add user'] }
                        </Button>
                    </div>

                </Form>

            </Modal>
        </>
    )
}

export default EditUser