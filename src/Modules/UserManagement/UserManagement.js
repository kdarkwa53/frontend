import {  Layout, ConfigProvider, Table, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Edit, Edit2Icon, Trash, TrashIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { EyeOutlined } from "@ant-design/icons";
import {  useDispatch, useSelector } from "react-redux";

import AddUser from "./AddUser";
import AccessControl from "../../Shared/Components/AccessControl/AccessControl";
import { getUsers } from "./duck/action";
import { statusTagColor } from "../../helpers/utils";


const UserManagement = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])


    const text = useSelector((state) => state?.language)
    const { Content } = Layout;
    const [editUser, setEditUser] = useState(false)
    const users = useSelector((state) => state?.userMgt?.users)

    

    const handleEdit = (user)=>{
        let userDetails = users[user.id]

        userDetails = {
            ...userDetails,
            role_id: userDetails?.role?.role_id
        }

       setEditUser(userDetails)
       setIsModalVisible(true)
    }

    const handleDelete = ()=>{
        
    }
 

   

    
    const [isVisible, setIsModalVisible] = useState(false)

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>{text["You haven’t added any users yet. Add new"]}</p>
        </div>
    );
  

    const columns = [
        {
            title: text["Full Name"],
            dataIndex: "full_name",
            key: "full_name",
        },
        
        {
            title: text["Email"],
            dataIndex: "email",
            key: "email",
        },
        {
            title: text["Phone Number"],
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: text["Role"],
            dataIndex: "role_id",
            key: "role_id",
        },
        {
            title: text["Status"],
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return(
                    <Tag color={statusTagColor(status)}>{status}</Tag>
                )
            }
        },
       
        {
            title: text["Action"],
            key: "action",
            render: (id) => {
                if(!id.is_parent){
                    return (
                        <div key={id}>
                            <AccessControl
                                allowedPermissions={['EDIT_USER']}
                                renderNoAccess={''}
                            >
                                <Tag  onClick={()=>handleEdit(id)} style={{ color: '#FFFFFF', padding: "5px 10px", borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#2272F4" >
                                <Edit height="1.2em" width="1.2em" color='#FFFFFF' />
                                {text["edit"]}
                            </Tag>
                            </AccessControl>
    
                            <AccessControl
                                allowedPermissions={['DELETE_USER']}
                                renderNoAccess={''}
                            >
                                <Tag style={{ color: '#FFFFFF', padding: "5px 10px" , borderRadius: "20px", fontSize: "16px", cursor:"pointer"}} color="#DD4918" >
                                <Trash height={'1.2em'} width={'1.2em'} color='#FFFFFF' />
                                {text["delete"]}
                            </Tag>
                            </AccessControl>
                            
                        </div>
                    );
                }
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
                role_id: user?.is_parent? "Super Admin" : user?.role?.role?.name,
                id: user.id,
                is_parent: user.is_parent,
                status: user?.status ? user?.status : "Approved"
                
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
                            {text["User List"]}
                        </div>
                        <AccessControl
                                allowedPermissions={["CREATE_BUSINESS_USER"]}
                                renderNoAccess={''}
                            >
                        <AddUser editUser={editUser} isVisible={isVisible} setEditUser={setEditUser} setIsModalVisible={setIsModalVisible}/>
                        </AccessControl>
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
