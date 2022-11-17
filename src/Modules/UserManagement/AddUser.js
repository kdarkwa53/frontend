import { Button, Form, Input, Row, Col, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { XIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addingUser, updateBusUser } from "./duck/action";


const AddUser = ({ isVisible, setIsModalVisible, editUser  }) => {
    const [form] = useForm();
    const dispatch = useDispatch()
    const { Option } = Select
    const roles = useSelector((state) => state?.userMgt?.roles)
    const users = useSelector((state) => state?.userMgt?.users)
    const userDetails = users[editUser]
    
    form.setFieldsValue(userDetails)
    const rLoading = useSelector((state) => state?.userMgt?.addingUser)

    let _roles = roles ? roles : {}

    const handleCancel = () => {
        setIsModalVisible(false)
        form.resetFields()
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (val) => {
        if(editUser){
            form.resetFields()
            setIsModalVisible(false)
            return(
                dispatch(updateBusUser(val, editUser) )
            )
        }
        dispatch(addingUser(val)).then((res) => {
            if (res) {
                form.resetFields()
                setIsModalVisible(false)
            }

        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>

            <Button style={{background: "#0032A0", fontSize: "16px"}}  onClick={showModal} type="primary" size="large" shape="round" >
                Add new user
            </Button>
            <Modal
                visible={isVisible}
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
                    <div className={Styles.secTitle}>Add new user</div>
                </div>

                <Form
                    layout="vertical"
                    name="profile_form"
                    style={{ width: "100%" }}
                    form={form}
                    onFinish={onFinish}
                >
                    <div style={{ padding: "20px 70px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
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
                            label="Last Name"
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. Asante" />
                        </Form.Item>


                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. abc@zenithbank.com" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. +1223449399304" />
                        </Form.Item>


                        <Form.Item
                            label="Role"
                            name="role_id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Select style={{ width: "100%" }} placeholder='Select role' size="large" name="country" >
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
                        >
                            Add User
                        </Button>
                    </div>

                </Form>

            </Modal>
        </>
    )
}

export default AddUser