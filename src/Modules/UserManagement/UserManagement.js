import {  Layout, ConfigProvider, Table, Row, Tag } from "antd";
import React, { useState } from "react";
import { Edit, Edit2Icon, Trash, TrashIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { EyeOutlined } from "@ant-design/icons";
import {  useSelector } from "react-redux";

import AddUser from "./AddUser";
import AccessControl from "../../Shared/Components/AccessControl/AccessControl";


const UserManagement = () => {
    const { Content } = Layout;
    const [editUser, setEditUser] = useState(false)

    const handleEdit = (user)=>{
       setEditUser(user.id)
       setIsModalVisible(true)
    }

    const handleDelete = ()=>{
        
    }
 

    const users = useSelector((state) => state?.userMgt?.users)
   

    
    const [isVisible, setIsModalVisible] = useState(false)

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any users yet. Add new</p>
        </div>
    );
  

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
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
       
        {
            title: "Action",
            key: "action",
            render: (id) => {
                return (
                    <div key={id}>
                        <AccessControl
                            userPermissions={['EDIT_USER']}
                            allowedPermissions={['EDIT_USER']}
                            renderNoAccess={''}
                        >
                            <Tag  onClick={()=>handleEdit(id)} style={{ color: '#FFFFFF', padding: "5px 10px", borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#2272F4" >
                            <Edit height="1.2em" width="1.2em" color='#FFFFFF' />
                            Edit
                        </Tag>
                        </AccessControl>

                        <AccessControl
                            userPermissions={['DELETE_USER']}
                            allowedPermissions={['DELETE_USER']}
                            renderNoAccess={''}
                        >
                            <Tag style={{ color: '#FFFFFF', padding: "5px 10px" , borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#DD4918" >
                            <Trash height={'1.2em'} width={'1.2em'} color='#FFFFFF' />
                            delete
                        </Tag>
                        </AccessControl>
                        
                    </div>
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
                id: user.id
                
            };
        })
        : [];



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
                            User List
                        </div>
                        <AddUser editUser={editUser} isVisible={isVisible} setIsModalVisible={setIsModalVisible}/>
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

export default UserManagement;
