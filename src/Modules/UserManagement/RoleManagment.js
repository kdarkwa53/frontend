import { Tabs, Layout, Row, ConfigProvider, Table, Button, Tag, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import RoleItem from "./RoleItem";
import Styles from "./UserMgt.module.css"




const RoleManagement = () => {
    const { TabPane } = Tabs;
    const { Content } = Layout;


    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any users yet. Add new</p>
        </div>
    );

    const columns = [
        {
            title: "Role Name",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Role Permissions",
            dataIndex: "permissions",
            key: "permissions",
            render: (permissions) => {
                return (
                    permissions.map((per)=>{
                        return(
                            <Tag style={{ color: '#000C26', marginTop:"5px", padding: "10px" }} color='#EBEDF1'  key={per}>
                                {per}
                            </Tag>
                        )
                    })
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: () => {
                return (
                    <>
                       {/* <Button type="primary">Edit</Button>
                        */}
                        <Tag style={{ color: '#008000', padding: "10px" }}  color="#E0FFE0" >
                            Edit
                            <Edit2Icon height={'1em'} width={'1em'} color='#008000' />
                        </Tag>
                        <Tag style={{ color: '#FF0000', padding: "10px" }} color="#FFE0E0" >
                            delete 
                            <TrashIcon height={'1em'} width={'1em'} color='#FF0000'  />
                        </Tag>
                    </>
                );
            },
        },
    ];


    const data = [{
        role: 'admin',
        permissions: ['Create user', 'Edit user', 'Delete User', 'Apply service', 'Create Wallet', 'Edit Wallet'],

    }]

    const permissions = ['Create user', 'Edit user', 'Delete User', 'Apply service', 'Create Wallet', 'Edit Wallet']
    const [form] = useForm();
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
                            <TabPane tab="Role List" key="1">
                            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    pagination={{ pageSize: 50 }}
                                    scroll={{ y: 600 }}
                                />
                            </ConfigProvider>
                            </TabPane>
                            <TabPane tab="Add New Role" key="2">
                            <Form
                                layout="vertical"
                                name="profile_form"
                                style={{ width: "100%" }}
                                form={form}
                                onFinish={''}
                            >
                                <div>
                                    <div className={Styles.title}>Role Name</div>
                                    <Form.Item
                                        name="role"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input style={{ minWidth: "490px"}} size="large" placeholder="Eg. Admin" />
                                    </Form.Item>
                                </div>
                               
                                <div>
                                    <div className={Styles.title}>Role Permissions</div>
                                    
                                    {
                                        permissions.map((per)=>{
                                            return(
                                                <RoleItem name={per} />
                                            )
                                        })
                                    }
                                    
                                </div>
                                
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ marginTop: "3em", padding: "5px 50px" }}
                                    // disabled={disableButton}
                                    // loading={profile.updatingProfile}
                                >
                                    Add Role
                                </Button>
                            </Form>
                            </TabPane>
                        </Tabs>
                    </Row>
                </Content>
        </>
    );
};

export default RoleManagement;
