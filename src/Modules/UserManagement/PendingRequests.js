import { Layout, Row, ConfigProvider, Table, Tag, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customDatFormat } from "../../helpers/utils";
import { Edit2Icon, TrashIcon } from "../../Shared/Components/JavIcons";
import { getTransactionFee } from "../TransferMoney/duck/action";
import { approveTransaction, declineTransaction, getPendingTransactions } from "./duck/action";
import PendingActionTag from "./PendingActionTag";
import ViewPendingTransDetails from "./ViewPendingTransDetails";
import { getTransactions } from "../Savings/duck/action";





const PendingRequests = () => {
    const { Content } = Layout;
   

    const transactions = useSelector((state)=> state.userMgt.pending_tranx)
    const users = useSelector((state)=> state?.userMgt?.users)
    const loading = useSelector((state)=> state?.userMgt?.approveTranx)
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    

    const [transDetails, setTrans] = useState()

    const dispatch = useDispatch()
    const text = useSelector((state)=> state.language)
  
    useEffect(()=>{
        dispatch(getPendingTransactions())
        dispatch(getTransactions())
    }, [dispatch])


    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <p>{text["You don't have any pending transactions"]}</p>
        </div>
    );


    const handleDecline = (e)=>{
        console.log(e)
        dispatch(approveTransaction(e))
    }

    const handleView = (e)=>{
        const details = transactions[e]

        dispatch(getTransactionFee({
            "reference": details?.params?.order_id,
            "module": "FOREX",
            "amount": details?.transaction?.amount, 
            "currency_id": details?.transaction?.currency_id,
        })).then((fee) => {
        
        console.log(fee)
        let info = {
            ...details,
            fee: fee
        }


       
        setTrans(info)
        setVisible(true)

        })
        
    }
  
    const handleApprove = (e)=>{
        console.log(e)
        dispatch(approveTransaction(e))
    }

    const [isVisible, setVisible] = useState(false)


    const columns = [
       
        {
            title: text["Module"],
            dataIndex: "module",
            key: "module",
        },
        {
            title: text["Transaction ID"],
            dataIndex: "transaction_id",
            key: "transaction_id",
        },
        {
            title: text["Amount"],
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: text["Date"],
            dataIndex: "date",
            key: "date",
        },
        {
            title: text["User"],
            dataIndex: "user",
            key: "user",
        },
        {
            title: text["Action"],
            key: "action",
            render: (action) => {
                return (
                    <>
                        
                        <PendingActionTag action={["decline"]} id={action?.key} /> 
                        <Tag onClick={()=>handleView(action?.key)} style={{  padding: "10px", cursor:"pointer" }} color="gold">{text["view"]}</Tag>
                        
                        
                    </>
                );
            },
        },
    ];


    
    let tableData = transactions
    ? Object.values(transactions).map((trans) => {
        return {
            key: trans.id,
            user: trans?.business?.full_name,
            module: trans.module,
            transaction_id: trans?.transaction_id,
            date:  customDatFormat(trans?.transaction?.created_at) ,
            amount: `${currencies[trans?.transaction?.currency_id]?.ISO} ${Number(trans?.transaction?.amountAndFee).toFixed(2)}`,
            action: trans?.id
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
                    <ViewPendingTransDetails  details={transDetails} setReview={setVisible} showReview={isVisible} />

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
