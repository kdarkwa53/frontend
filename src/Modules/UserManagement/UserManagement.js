import { Button, Form, Input, Tabs, Layout, ConfigProvider, Table, Row, Tag, Col, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addingUser } from "./duck/action";


const UserManagement = () => {
    const { TabPane } = Tabs;
    const { Content } = Layout;
    const [form] = useForm();
    const { Option } = Select
    const [activeTab, setActiveTab] = useState("1")

    const roles = useSelector((state) => state?.userMgt?.roles)
    const users = useSelector((state) => state?.userMgt?.users)
    const rLoading = useSelector((state) => state?.userMgt?.addingUser)
    const dispatch = useDispatch()

    let _roles = roles ? roles : {}

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any users yet. Add new</p>
        </div>
    );
    const handleTabChange = (e)=>{
        setActiveTab(e)
    }

    const columns = [
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
       
        {
            title: "Action",
            key: "action",
            render: () => {
                return (
                    <>

                        <Tag style={{ color: '#071CD4', padding: "10px" }} color="#E1E4FE" >
                            <EyeOutlined />
                        </Tag>

                        <Tag style={{ color: '#008000', padding: "10px" }} color="#E0FFE0" >
                            <Edit2Icon height={'1em'} width={'1em'} color='#008000' />
                        </Tag>
                        <Tag style={{ color: '#FF0000', padding: "10px" }} color="#FFE0E0" >
                            <TrashIcon height={'1em'} width={'1em'} color='#FF0000' />
                        </Tag>
                    </>
                );
            },
        },
    ];

    let tableData = users
        ? Object.values(users).map((user) => {
            return {
                key: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone_number,
                
            };
        })
        : [];


    const onFinish = (val) => {
        console.log(val)
        dispatch(addingUser(val)).then((res)=>{
            console.log("val: ", res)
            if(res){
                setActiveTab("1")
                form.resetFields()
            }
            
        }).catch((err)=>{
            console.log(err)
        })

    }

    return (
        <>
            <Content
                style={{
                    minHeight: 300,
                    padding: "50px",
                    margin: "1em",
                    backgroundColor: "white",
                }}
            >
                <Row>
                    <Tabs activeKey={activeTab} onChange={handleTabChange} >
                        <TabPane tab="User List" key="1">
                            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                <Table
                                    columns={columns}
                                    dataSource={tableData}
                                    pagination={{ pageSize: 50 }}
                                    scroll={{ y: 600 }}
                                />
                            </ConfigProvider>
                        </TabPane>
                        <TabPane tab="Add New User" key="2">
                            <Form
                                layout="vertical"
                                name="profile_form"
                                style={{ width: "100%" }}
                                form={form}
                                onFinish={onFinish}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col>
                                        <div className={Styles.title}>First Name</div>
                                        <Form.Item
                                            name="first_name"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. Evans" />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <div className={Styles.title}>Last Name</div>
                                        <Form.Item
                                            name="last_name"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. Asante" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 16]}>
                                    <Col>
                                        <div className={Styles.title}>Email</div>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. abc@zenithbank.com" />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <div className={Styles.title}>Phone Number</div>
                                        <Form.Item
                                            name="phone_number"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input style={{ minWidth: "490px" }} size="large" placeholder="Eg. +1223449399304" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <div className={Styles.title}>Role</div>
                                        <Form.Item
                                            name="role_id"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
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
                                    </Col>
                                </Row>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ marginTop: "3em", padding: "5px 50px" }}
                                    loading={rLoading}
                                >
                                    Add User
                                </Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Row>
            </Content>
        </>
    );
};

export default UserManagement;
