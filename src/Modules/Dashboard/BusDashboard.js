import { Row, Tag, Table, Col } from 'antd';
import "./Dashboard.module.css"
import Styles from "./Dashboard.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortListByDate, isEmpty, statusTagColor } from "../../helpers/utils"
import WelcomeCard from '../../Shared/Components/WelcomeCard/WelcomeCard';
import JavProductCard from '../../Shared/Components/Products/JavProductCard';

import Pin from "../../Shared/Components/Pin"
import SetSecurityQuestions from '../../Shared/Components/SetSecurityQuestions/SetSecurityQuestions';
import SimpleCard from '../../Shared/Components/SimpleCard/SimpleCard';
import { Cash, DepositIcon, Money, MoneyExchange, SendMoneyIcon, TransferDasIcon, TransferIcon } from '../../Shared/Components/JavIcons';
import CurrencyConverter from '../../Shared/Components/Layouts/Components/CurrencyConverter';
import DashboardTitleRow from './Components/DashboardTitleRow';
import SpotRateCalculator from '../../Shared/Components/Layouts/Components/SpoteRateCalculator/SpotRateCalculator';
import DashboardWalletSection from '../../Shared/Components/DashboardWalletSection/DashboardWalletSection';
import {InitialSetup} from '../../Shared/Components/InitialSetup/InitialSetup';
import AccessControl from '../../Shared/Components/AccessControl/AccessControl';
import { getWallets } from '../../Shared/Components/duck/action';
import { getTransactions } from '../Savings/duck/action';

const BusDashboard = () => {
    const text = useSelector((state) => state?.language)

    const userDetails = useSelector((state) => state?.user)
    const setSecurityQ = useSelector((state)=>state?.resources?.userSecurityQuestions)
    const vis = userDetails?.app_passcode ? false : true
    // const vis = true

    const [isPinSetVisible, setIsPinSetVisible] = useState(vis)
    const business_kyc = userDetails?.business_kyc

    const [setupAction, setActions] = useState({
        setPin: !vis,
        setSecurityQ: setSecurityQ ? true : false,
        bus_kyc: business_kyc ? true : false
    })
    const [showSC, setSC] = useState(false)
    const dispatch = useDispatch()

    const appData = useSelector((state) => state?.savings);

    const default_wallet = userDetails?.default_savings_wallet

    useEffect(()=>{
        dispatch(getTransactions())
        dispatch(getWallets())
    }, [dispatch])

    const columns = [
        {
            title: text.TRANSACTION_TYPE,
            dataIndex: "type",
            render: (type) => {
                return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
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
                amount:  `${transaction?.currency?.ISO ? transaction?.currency?.ISO: "GHS"} ${Number(transaction.amountAndFee).toFixed(2)}`,
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
            <div style={{maxWidth: "100%"}}>
                <Row gutter={[32, 16]} >
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <WelcomeCard
                            name={userDetails?.first_name} />

                        <InitialSetup actions={setupAction} 
                        setIsPinSetVisible={setIsPinSetVisible}  
                        showSecurityQuestions={setSC}
                        />
                    </Col>
                    {/* <AccessControl
                            allowedPermissions={['CHECK_SPOT_RATE']}
                            renderNoAccess={''}
                        > */}
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <SpotRateCalculator />
                        </Col>
                    {/* </AccessControl> */}

                </Row>
                <SetSecurityQuestions isVisible={showSC} setIsModalVisible={setSC} />
                
                
                <Row  style={{marginTop: "2em" }} gutter={[32, 16]} >
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <DashboardTitleRow title={"Javolin Services"} />
                        <div className={Styles.products}>
                        <AccessControl
                            allowedPermissions={['SEND_MONEY']}
                            renderNoAccess={''}
                        >
                            <JavProductCard subTitle={text.PAYMENT_SENDMONEY} link={'/business/payments'} icon={<Money width="5em" height="5em" color="#ffffff" />} color="#BC416B" />

                        </AccessControl>
                        <AccessControl
                            allowedPermissions={['FOREX']}
                            renderNoAccess={''}
                        >
                            <JavProductCard subTitle={text.FOREIGN_EXCHANGE} icon={<MoneyExchange width="5em" height="5em" color="#ffffff" />} link="send-money/forex" color="#007451" />

                        </AccessControl>
                        <AccessControl
                            allowedPermissions={['TRANSFER_MONEY']}
                            renderNoAccess={''}
                        >
                        <JavProductCard link="/business/transfer" subTitle={text.TRANSFER_MONEY} icon={<TransferDasIcon width="5em" height="5em" color="#ffffff" />} color="#FFA621" />

                        </AccessControl>
                        <AccessControl
                            allowedPermissions={['FUND_WALLET']}
                            renderNoAccess={''}
                        > 
                         <JavProductCard link="/business/fund-wallet" subTitle={text.FUND_MY_WALLET} icon={<Cash width="5em" height="5em" color="#ffffff" />} color="#EE735D" />

                        </AccessControl>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <DashboardTitleRow title={text["Your Wallet"]} />
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
           

            <Pin isPinSetVisible={isPinSetVisible} setIsPinSetVisible={setIsPinSetVisible} showSecurityQuestions={setSC} />
            {/* <ReviewPopUp  details={"details"}  showReview={true} /> */}

            <AccessControl
                            allowedPermissions={['VIEW_RECENT_TRANSACTIONS']}
                            renderNoAccess={''}
            >
            <DashboardTitleRow link={"/business/transactions"} action={text.VIEW_ALL} title={text.RECENT_TRANSACTION} />

            <Row >
                <Table
                    style={{ backgroundColor: "transparent" }}
                    columns={columns}
                    dataSource={tableData}
                    loading={appData?.gettingSavings}
                    scroll={{ y: 400, }}
                />
            </Row>
            </AccessControl>
            </div>

        </>
    )
};

export default BusDashboard