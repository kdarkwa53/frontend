import {  Layout, ConfigProvider, Table, Row, Tag } from "antd";
import React, { useState } from "react";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { EyeOutlined } from "@ant-design/icons";
import {  useSelector } from "react-redux";

import AddUser from "./AddUser";


const UserManagement = () => {
    const { Content } = Layout;
 

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
                        <AddUser isVisible={isVisible} setIsModalVisible={setIsModalVisible}/>
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
