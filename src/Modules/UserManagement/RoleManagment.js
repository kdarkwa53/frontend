import { Layout, Row, ConfigProvider, Table, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, Edit2Icon, Trash, TrashIcon } from "../../Shared/Components/JavIcons";
import AddRole from "./AddRole";
import { getRoles } from "./duck/action";

import Styles from "./UserMgt.module.css"




const RoleManagement = () => {
    const { Content } = Layout;

    const [isVisible, setIsModalVisible] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRoles())
    })
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

                            <Tag className={Styles.permTile} style={{ color: '#000C26', marginTop: "5px", padding: "10px", borderRadius: "4px", border: "1px solid #3DA31F" }} color='#ECF7E8' key={per.id}>
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
                        <Tag style={{ color: '#FFFFFF', padding: "5px 10px", borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#2272F4" >
                            <Edit height="1.2em" width="1.2em" color='#FFFFFF' />
                            Edit
                        </Tag>
                        <Tag style={{ color: '#FFFFFF', padding: "5px 10px" , borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#DD4918" >
                            <Trash height={'1.2em'} width={'1.2em'} color='#FFFFFF' />
                            delete
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
