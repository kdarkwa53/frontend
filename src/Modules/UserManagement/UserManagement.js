import { Button, Form, Input, Tabs, Layout, ConfigProvider, Table, Row, Tag, Col, Select} from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { EyeOutlined } from "@ant-design/icons";


const UserManagement = () => {
    const { TabPane } = Tabs;
    const { Content } = Layout;
    const [form] = useForm();
    const {Option} = Select

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any users yet. Add new</p>
        </div>
    );

    const columns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
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
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            key: "action",
            render: () => {
                return (
                    <>

                        <Tag style={{ color: '#071CD4', padding: "10px" }} color="#E1E4FE" >
                            <EyeOutlined/> 
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


    const data = [
        {
        first_name: 'Benjamin',
        last_name: 'Asamoah',
        email: 'benasa@gmail.com',
        phone: '+2332909892',
        role: 'Admin'
        },
        {
            first_name: 'Evans',
            last_name: 'Asante',
            email: 'benasa@gmail.com',
            phone: '+2332909892',
            role: 'Admin'
        },

]
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
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="User List" key="1">
                            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                <Table
                                    columns={columns}
                                    dataSource={data}
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
                                onFinish={''}
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
                                            name="phone"
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
                                            name="role"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select style={{ width: "100%" }} placeholder='Select role' size="large" name="country" >
                                                <Option value="Ghana">Admin</Option>
                                                <Option value="Ghana">Support Admin</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ marginTop: "3em", padding: "5px 50px" }}
                                // disabled={disableButton}
                                // loading={profile.updatingProfile}
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
