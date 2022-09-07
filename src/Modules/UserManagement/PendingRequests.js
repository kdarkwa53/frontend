import { Layout, Row, ConfigProvider, Table, Tag, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import { approveTransaction, declineTransaction } from "./duck/action";





const PendingRequests = () => {
    const { Content } = Layout;
   

    const transactions = useSelector((state)=> state.userMgt.pending_tranx)
    const users = useSelector((state)=> state?.userMgt?.users)
    const loading = useSelector((state)=> state?.userMgt?.approveTranx)

    const dispatch = useDispatch()
  


    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You haven’t added any users yet. Add new</p>
        </div>
    );


    const handleDecline = (e)=>{
        console.log(e)
        dispatch(approveTransaction(e))
    }
  
    const handleApprove = (e)=>{
        console.log(e)
        dispatch(declineTransaction(e))
    }

    

    const columns = [
       
        {
            title: "Module",
            dataIndex: "module",
            key: "module",
        },
        {
            title: "Transaction ID",
            dataIndex: "transaction_id",
            key: "transaction_id",
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            // render: (user) => {
            //     return (
            //         users[user].name
            //     );
            // },
        
        },
        {
            title: "Action",
            key: "action",
            render: () => {
                return (
                    <>
                    
                        <Tag onClick={()=>handleDecline('1')} style={{ color: '#008000', padding: "10px", cursor:"pointer" }}  color="#E0FFE0" >
                            Approve
                        </Tag>
                        <Tag onClick={()=>handleApprove('2')} style={{ color: '#FF0000', padding: "10px", cursor:"pointer" }} color="#FFE0E0" >
                            Decline 
                        </Tag>
                        <Spin spinning={false}/>
                    </>
                );
            },
        },
    ];



    const data = [{
        role: 'admin',
        permissions: ['Create user', 'Edit user', 'Delete User', 'Apply service', 'Create Wallet', 'Edit Wallet'],

    }]
    
    let tableData = transactions
    ? Object.values(transactions).map((trans) => {
        return {
            key: trans.id,
            user: trans.user_id,
            module: trans.module,
            transaction_id: trans.transaction_id,
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
                        backgroundColor: "white",
                    }}
                >
                    <Row>
                       
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

export default PendingRequests;
