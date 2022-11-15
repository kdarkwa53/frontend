import { Row, Tag, Table, Col } from 'antd';
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
import { Cash, CreditArrow, DebitArrow, DepositIcon, MobileAirtimeIcon, Money, MoneyExchange, SendMoneyIcon, TransferDasIcon, TransferIcon } from '../../Shared/Components/JavIcons';
import CurrencyConverter from '../../Shared/Components/Layouts/Components/CurrencyConverter';
import Circle from '../../Shared/Components/Circle/Circle';
import DashboardTitleRow from './Components/DashboardTitleRow';
import SpotRateCalculator from '../../Shared/Components/Layouts/Components/SpotRateCalculator';
import DashboardWalletSection from '../../Shared/Components/DashboardWalletSection/DashboardWalletSection';
import {InitialSetup} from '../../Shared/Components/InitialSetup/InitialSetup';
import ReviewPopUp from '../../Shared/Components/ReviewPopUp/ReviewPopUp';

const BusDashboard = () => {
    const text = useSelector((state) => state?.language)

    const userDetails = useSelector((state) => state?.user)
    const vis = userDetails?.app_passcode ? false : true
    const [isPinSetVisible, setIsPinSetVisible] = useState(vis)
    const business_kyc = userDetails?.business_kyc

    const [setupAction, setActions] = useState({
        setPin: !vis,
        bus_kyc: business_kyc ? true : false
    })
    const [showSC, setSC] = useState(false)

    const wallets = useSelector((state) => state?.resources?.wallets)
    const appData = useSelector((state) => state?.savings);
    const user = useSelector((state) => state?.user);

    const default_wallet = userDetails?.default_savings_wallet



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
                <Row gutter={[32, 16]} >
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <WelcomeCard
                            name={userDetails?.first_name} />

                        <InitialSetup actions={setupAction} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <SpotRateCalculator />
                    </Col>

                </Row>
                <SetSecurityQuestions isVisible={showSC} setIsModalVisible={setSC} />
                

                
                
                <Row style={{marginTop: "2em"}} gutter={[32, 16]} >
                
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <DashboardTitleRow title={"Javolin Services"} />
                        <div className={Styles.products}>
                            <JavProductCard subTitle={text.PAYMENT_SENDMONEY} link={'/business/payments'} icon={<Money width="5em" height="5em" color="#ffffff" />} color="#BC416B" />
                            <JavProductCard subTitle={text.FOREIGN_EXCHANGE} icon={<MoneyExchange width="5em" height="5em" color="#ffffff" />} link="/business/forex" color="#007451" />
                            <JavProductCard link="/business/transfer" subTitle={text.TRANSFER_MONEY} icon={<TransferDasIcon width="6em" height="6em" color="#ffffff" />} color="#FFA621" />
                            <JavProductCard link="/business/fund-wallet" subTitle={text.FUND_MY_WALLET} icon={<Cash width="5em" height="5em" color="#ffffff" />} color="#EE735D" />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <DashboardTitleRow title={"Your Wallet"} />
                        <DashboardWalletSection default_wallet={default_wallet} />
                    </Col>
                </Row>



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
            {/* <ReviewPopUp  details={"details"}  showReview={true} /> */}


            <Row >
                <Table
                    style={{ backgroundColor: "transparent" }}
                    columns={columns}
                    dataSource={tableData}
                    loading={appData?.gettingSavings}
                    scroll={{ y: 400, }}
                />
            </Row>


        </>
    )
};

export default BusDashboard