import { Layout, Row, ConfigProvider, Table, Tag, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import { approveTransaction, declineTransaction, getPendingTransactions } from "./duck/action";





const PendingRequests = () => {
    const { Content } = Layout;
   

    const transactions = useSelector((state)=> state.userMgt.pending_tranx)
    const users = useSelector((state)=> state?.userMgt?.users)
    const loading = useSelector((state)=> state?.userMgt?.approveTranx)

    const dispatch = useDispatch()
  
    useEffect(()=>{
        dispatch(getPendingTransactions())
    }, [dispatch])


    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>You don't have any pending transactions</p>
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
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Account Number",
            dataIndex: "account_number",
            key: "account_number",
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
            render: (action) => {
                return (
                    <>
                    
                        <Tag onClick={()=>handleDecline(action?.key)} style={{ color: '#008000', padding: "10px", cursor:"pointer" }}  color="#E0FFE0" >
                            Approve
                        </Tag>
                        <Tag onClick={()=>handleApprove(action?.key)} style={{ color: '#FF0000', padding: "10px", cursor:"pointer" }} color="#FFE0E0" >
                            Decline 
                        </Tag>
                        
                        <Spin spinning={loading}/>
                    </>
                );
            },
        },
    ];



    // const data = [{
    //     role: 'admin',
    //     permissions: ['Create user', 'Edit user', 'Delete User', 'Apply service', 'Create Wallet', 'Edit Wallet'],

    // }]
    
    let tableData = transactions
    ? Object.values(transactions).map((trans) => {
        return {
            key: trans.id,
            user: trans.user_id,
            module: trans.module,
            transaction_id: trans?.transaction_id,
            account_number: trans?.transaction?.account_number,
            amount: `GHS ${Number(trans?.transaction?.amount).toFixed(2)}`,
            action: trans?.id
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
