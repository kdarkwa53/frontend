import { Layout, Col, Table, Tag, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { sortListByDate, isEmpty, statusTagColor } from "../../helpers/utils"
import Circle from '../../Shared/Components/Circle/Circle';
import { CreditArrow, DebitArrow } from '../../Shared/Components/JavIcons';
import { getTransactions } from './duck/action';





const Savings = () => {
    const text = useSelector((state) => state?.language)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getTransactions())
    }, [dispatch])
    const columns = [
        {
            title: text.TRANSACTION_TYPE,
            dataIndex: "type",
            render: (type) => {
                return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        {type?.title === "CREDIT" ? <Circle size={"30px"} color="green" > <CreditArrow color="white" /> </Circle> :
                            <Circle size={"30px"} color="red" ><DebitArrow color={"white"} /> </Circle>

                        }

                        <span style={{ marginLeft: "0.5em" }}>
                            {type?.module}

                        </span>



                    </div>
                );
            },
        },


        {
            title: text.AMOUNT,
            dataIndex: "amount",
            key: "amount",

        },
        {
            title: text.STATUS,
            dataIndex: "status",
            render: (status) => {
                return (
                    <>
                        <Tag color={statusTagColor(status)}>{status}</Tag>
                    </>
                );
            },
        },

        {
            title: text.DATE,
            key: "date",
            dataIndex: "date",
            responsive: ['lg'],
        },
        {
            title: text.REFERENCE,
            dataIndex: "reference",
            key: "reference",
            responsive: ['lg'],
        }

    ];

    const appData = useSelector((state) => state?.savings);
    let data = !isEmpty(appData?.transactions)
        ? Object.values(appData?.transactions).map((transaction) => {
            return {
                key: transaction.id,
                reference: transaction.reference,
                amount: `${transaction?.currency?.ISO ? transaction?.currency?.ISO: "GHS"} ${transaction?.amountAndFee}`,
                date: new Date(transaction.created_at).toLocaleString('en-GB', { timeZone: 'UTC' }),
                status: transaction.status,
                type: { title: transaction.transaction_type, module: transaction.module.replaceAll("_", " ") }

            };
        })
        : [];
    data = sortListByDate(data)
    // const data = []



    const { Content } = Layout
    return (
        // <Content style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} >
           
            <Col
                xs={24} sm={24} md={24} lg={24} xl={24}>
                {/* <Card> */}
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 600 }}
                        loading={appData?.gettingSavings}

                    />
                {/* </Card> */}
            </Col>
        // </Content>
    )
};

export default Savings