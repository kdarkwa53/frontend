import { Row, Tag, Table } from 'antd';
import "./Dashboard.module.css"
import Styles from "./Dashboard.module.css"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sortListByDate, isEmpty, statusTagColor } from "../../helpers/utils"
import WelcomeCard from '../../Shared/Components/WelcomeCard/WelcomeCard';
import JavProductCard from '../../Shared/Components/Products/JavProductCard';
import Credit from "../../assets/tax.png"
import CardIcon from "../../assets/Vector.png"
import Payments from "../../assets/payments.png"

import Tax from "../../assets/govfees.png"
import Pin from "../../Shared/Components/Pin"
import SetSecurityQuestions from '../../Shared/Components/SetSecurityQuestions/SetSecurityQuestions';
import WalletCard from '../../Shared/Components/WalletCard/WalletCard';
import SimpleCard from '../../Shared/Components/SimpleCard/SimpleCard';
import { CreditArrow, DebitArrow, DepositIcon, MobileAirtimeIcon, SendMoneyIcon, TransferIcon } from '../../Shared/Components/JavIcons';
import CurrencyConverter from '../../Shared/Components/Layouts/Components/CurrencyConverter';
import Circle from '../../Shared/Components/Circle/Circle';
import DashboardTitleRow from './Components/DashboardTitleRow';

const BusDashboard = () => {
    const text = useSelector((state) => state?.language)

    const userDetails = useSelector((state) => state?.user)
    const vis = userDetails?.app_passcode === null ? true : false
    const [isPinSetVisible, setIsPinSetVisible] = useState(vis)
    const [showSC, setSC] = useState(false)

    const wallets = useSelector((state) => state?.resources?.wallets)
    const appData = useSelector((state) => state?.savings);
    const user = useSelector((state) => state?.user);

    
    console.log(wallets)
    // const default_wallet = wallets[user?.default_savings_wallet?.id]
    // console.log(default_wallet)

    console.log("hs: ",user?.default_savings_wallet?.current_balance)
    console.log("hs: ", user?.default_savings_wallet?.account_number)


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
        // {
        //     title: text.TRANSACTION_TYPE,
        //     dataIndex: "transaction_type",
        //     key: "transaction_type"
        // },


        {
            title: text.AMOUNT,
            dataIndex: "amount",
            render: (amount) => {
                return (
                    `GHS ${Number(amount).toFixed(2)}`
                );
            },

        },
        {
            title: "Status",
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
                amount: transaction.amount,
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
            <div>
                <Row >
                    <WelcomeCard
                        name={userDetails?.first_name} />
                </Row>
                <SetSecurityQuestions isVisible={showSC} setIsModalVisible={setSC} />
                <div className={Styles.customDash}>
                    <div className={Styles.walletTop}>
                        {/* <WalletCard
                            accountBalance={default_wallet?.current_balance}
                            accountNumber={default_wallet?.account_number}
                            accountName={default_wallet?.name}
                            currency_id={default_wallet?.currency_id}
                        /> */}
                        
                    </div>
                </div>
               
                <DashboardTitleRow  title={text.PORTFOLIO} />

                <div className={Styles.products}>
                <JavProductCard subTitle={text.PAYMENT_SENDMONEY} link={'/business/payments'} icon={ <img src={Payments} alt={text.PAYMENT_SENDMONEY} />}  color="linear-gradient(90deg, #834D9B 0%, #D04ED6 100%)" />
                    <JavProductCard subTitle={text.FOREIGN_EXCHANGE} icon={<SendMoneyIcon width="3em" height="3em" color="#ffffff" />} link="/business/forex" color="linear-gradient(90deg, #FF512F 0%, #DD2476 100%)" />
                    <JavProductCard link="/business/transfer"  subTitle={text.TRANSFER_MONEY} icon={<TransferIcon width="3em" height="3em" color="#ffffff" />} color="linear-gradient(90deg, #396AFC 0%, #2948FF 100%)" />
                    <JavProductCard  link="/business/fund-wallet" subTitle={text.FUND_MY_WALLET} icon={<DepositIcon width="3em" height="3em" color="#ffffff" />}color="linear-gradient(90deg, #516B8B 0%, #056B3B 100%)" />
                </div>


                <div className={Styles.customDash}>
                    <div className={Styles.titleRow}>
                        <div className={Styles.secTitle}>{text.SERVICES}</div>
                        <div className={Styles.viewLink}>{text.VIEW_ALL}</div>
                    </div>
                    <div className={Styles.serviceRow}>
                        <div className={Styles.servCard}>
                        <SimpleCard
                            icon={<DepositIcon width="1.5em" height="1.5em" color="#0032A0" />}
                            link="/business/fund-wallet"
                            label={text.FUND_MY_WALLET}
                            msg={text.FUND_MY_WALLET_MSG}
                        />
                        </div>
                        <div className={Styles.servCard}>
                        <SimpleCard
                            icon={<TransferIcon width="1.5em" height="1.5em" color="#0032A0" />}
                            link="/business/transfer"
                            label={text.TRANSFER_MONEY}
                            msg={text.TRANSFER_MONEY_MSG}
                        />
                        </div>
                        <div className={Styles.servCard}>
                        <SimpleCard
                            icon={<SendMoneyIcon width="1.5em" height="1.5em" color="#0032A0" />}
                            link="/business/forex"
                            label={text.FOREIGN_EXCHANGE}
                            msg={text.FOREIGN_EXCHANGE_DESC}
                        />
                        </div>
                    </div>
                    <CurrencyConverter />
                </div>
                <DashboardTitleRow link={"/business/transactions"} action={text.VIEW_ALL} title={text.RECENT_TRANSACTION} />
            </div>

            <Pin isPinSetVisible={isPinSetVisible} setIsPinSetVisible={setIsPinSetVisible} showSecurityQuestions={setSC} />


            <Row >

                {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Card title={text.LINE_GRAPH_DESC}>
                        <Line data={data} options={options} />
                    </Card>
                </Col> */}


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

export default BusDashboard