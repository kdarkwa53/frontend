import { Button, Form, Input, Row, Col, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { XIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addingUser, getRoles, updateBusUser } from "./duck/action";


const AddUser = ({ isVisible, setIsModalVisible, editUser  }) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getRoles())
    }, [dispatch])

    const [form] = useForm();
    
    const { Option } = Select
    const roles = useSelector((state) => state?.userMgt?.roles)
    const text = useSelector((state) => state?.language)
    const users = useSelector((state) => state?.userMgt?.users)
    const userDetails = users[editUser]
    
    form.setFieldsValue(userDetails)
    const rLoading = useSelector((state) => state?.userMgt?.addingUser)

    let _roles = roles ? roles : {}

    const handleCancel = () => {
        setIsModalVisible(false)
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
                {text["Add new user"]}
            </Button>
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
                    <div className={Styles.secTitle}>{text["Add new user"]}</div>
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
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. abc@zenithbank.com" />
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
                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. +1223449399304" />
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
                            <Select style={{ width: "100%" }} placeholder={text['Select role']} size="large" >
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
                            {text['Add user']}
                        </Button>
                    </div>

                </Form>

            </Modal>
        </>
    )
}

export default AddUser