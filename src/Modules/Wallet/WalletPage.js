import { Row, Tag, Table } from 'antd';
import "../Dashboard/Dashboard.module.css"
import Styles from "../Dashboard/Dashboard.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { sortListByDate, isEmpty, statusTagColor } from "../../helpers/utils"
import WelcomeCard2 from '../../Shared/Components/WelcomeCard/WelcomeCard2';

import WalletCard from '../../Shared/Components/WalletCard/WalletCard';
import { CreditArrow, DebitArrow, PlusIcon } from '../../Shared/Components/JavIcons';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { getPrepaid } from '../Prepaid/duck/action';
import Circle from '../../Shared/Components/Circle/Circle';
import NewWallet from './NewWallet'

const WalletPage = () => {
    const text = useSelector((state) => state?.language)

    const userDetails = useSelector((state) => state?.user)
    const appData = useSelector((state) => state?.savings);
    const wallets = useSelector((state) => state?.resources?.wallets)

    const history = useHistory()
    const dispatch = useDispatch()

  
    useEffect(() => {
        dispatch(getPrepaid())
    }, [dispatch]);

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
            key: "amount"

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

    const savings = useSelector((state) => state?.savings);

    let tableData = !isEmpty(savings?.transactions)
        ? Object.values(savings?.transactions).map((transaction) => {
            return {
                key: transaction.id,
                reference: transaction.reference,
                amount: `${transaction?.currency?.ISO ? transaction?.currency?.ISO: "GHS"} ${Number(transaction.amountAndFee).toFixed(2)}`,
                date: new Date(transaction.created_at).toLocaleString('en-GB', { timeZone: 'UTC' }),
                status: transaction.status,
                type: { title: transaction.transaction_type, module: transaction.module.replaceAll("_", " ") }
            };
        })
        : [];
    tableData = tableData.slice(0, 5)
    tableData = sortListByDate(tableData)
    

    return (

        <>
            <div style={{marginTop: "4em"}}>
                <div className={Styles.titleRow}>
                    <div className={Styles.secTitle}>Active accounts</div>
                    <div style={{width: "200px"}}>
                    <NewWallet/>
                    </div>
                    
                    
                  
                </div>
                <div style={{overflowX: "scroll"}} className={Styles.serviceRow}>
                
                        {
                            Object.values(wallets)?.map((wallet)=>{
                                return(
                                    <div key={wallet.id} className={`${Styles.walletTop} ${Styles.walletProc}`}>
                                        <WalletCard
                                        accountBalance={wallet?.current_balance}
                                        accountName={wallet.name}
                                        accountNumber={wallet?.account_number}
                                        currency_id={wallet?.currency_id}
                                />
                                   </div>
                                )
                            })
                        }
                       
                 
                    {/* <NewWallet/> */}
                </div>

                <div className={Styles.titleRow}>
                    <div className={Styles.secTitle}>{text.RECENT_TRANSACTION}</div>
                    <div className={Styles.viewLink}><a href="/business/transactions">{text.VIEW_ALL} </a></div>
                </div>

            </div>



            <Row >
                <Table
                    style={{ backgroundColor: "transparent" }}
                    columns={columns}
                    dataSource={tableData}
                    loading={appData?.gettingSavings}
                    // pagination={{ pageSize: 50 }}
                    scroll={{ y: 200, }}
                />
            </Row>


        </>
    )
};

export default WalletPage