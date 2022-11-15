import { Layout, Row, ConfigProvider, Table, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import AddRole from "./AddRole";

import Styles from "./UserMgt.module.css"




const RoleManagement = () => {
    const { Content } = Layout;

    const [isVisible, setIsModalVisible] = useState(false)


    const roles = useSelector((state) => state.userMgt.roles)

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any roles yet. Add new role</p>
        </div>
    );





    const columns = [
        {
            title: "Role Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Role Permissions",
            dataIndex: "permissions",
            key: "permissions",
            render: (permissions) => {
                return (
                    permissions.map((per) => {
                        return (

                            <Tag style={{ color: '#000C26', marginTop: "5px", padding: "10px" }} color='#EBEDF1' key={per.id}>
                                {per.name}
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
                        <Tag style={{ color: '#008000', padding: "10px" }} color="#E0FFE0" >
                            Edit
                            <Edit2Icon height={'1em'} width={'1em'} color='#008000' />
                        </Tag>
                        <Tag style={{ color: '#FF0000', padding: "10px" }} color="#FFE0E0" >
                            delete
                            <TrashIcon height={'1em'} width={'1em'} color='#FF0000' />
                        </Tag>
                    </>
                );
            },
        },
    ];


    let tableData = roles
        ? Object.values(roles).map((role) => {
            return {
                key: role.id,
                name: role.name,
                permissions: role.permissions
            };
        })
        : [];



    const [form] = useForm();
    return (
        <>
            <Content
                style={{
                    minHeight: 300,
                    padding: "50px",
                    margin: "1em",
                }}
            >
                <div className={Styles.titleRow}>
                    <div className={Styles.title}>
                        Role List
                    </div>
                    <AddRole isVisible={isVisible} setIsModalVisible={setIsModalVisible} />
                </div>
                <Row style={{marginTop: "2em"}}>

                    <ConfigProvider renderEmpty={customizeRenderEmpty}>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={{ pageSize: 50 }}
                            scroll={{ y: 600 }}
                        />
                    </ConfigProvider>


                </Row>
            </Content>
        </>
    );
};

export default RoleManagement;
