import React, { useEffect } from "react";
import Styles from "../../Menu/Menu.module.css"
import { SendMoneyIcon, DepositIcon, MobileAirtimeIcon, TransferIcon } from "../../../../Shared/Components/JavIcons"
import WalletCard from "../../WalletCard/WalletCard";
import SimpleCard from "../../SimpleCard/SimpleCard";
import { useDispatch, useSelector } from "react-redux";
import CurrencyConverter from "./CurrencyConverter";
import VerifyIdentity from "./VerifyIdentity/VerifyIdentity";
import { Alert, Button } from "antd";
import { useHistory } from "react-router";
import SpotRateCalculator from "../Components/SpoteRateCalculator/SpotRateCalculator";


const BusRightSider = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userDetails = useSelector((state) => state?.user)
    const business_kyc = userDetails?.business_kyc
    const owner_kyc = userDetails?.id_verification_response
    const text = useSelector((state) => state.language)
    const default_wallet = userDetails?.default_savings_wallet
    

    return (
        <aside className={Styles.rightSider}>
            {/* <Row> */}
            <div className={Styles.siderContent}>
                <div className={Styles.walletTop}>
                    <WalletCard
                        accountBalance={default_wallet?.current_balance}
                        accountNumber={default_wallet?.account_number}
                        currency_id={default_wallet?.currency_id}
                        accountName = {default_wallet?.name}
                
                    />
                </div>
                <div>
                   {/* {business_kyc ? "" :  */}
                        <div onClick={() => history.push('/business/compliance')} className={Styles.kycCard}>
                            <div className={Styles.kycTitle}>Complete your business profile</div>
                            <div className={Styles.kcyMsg}>click here to complete your KYC</div>
                        </div>
                   {/* }  */}
                    {owner_kyc ? "" : 
                        <VerifyIdentity/>
                    } 

                </div>
                {/* <div className={Styles.titleRow}>
                    <div className={Styles.secTitle}>{text.SERVICES}</div>
                    <div className={Styles.viewLink}>{text.VIEW_ALL}</div>
                </div> */}
                {/* <SimpleCard
                    icon={<DepositIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/business/fund-wallet"
                    label={text.FUND_MY_WALLET}
                    msg={text.FUND_MY_WALLET_MSG}
                />
              
                <SimpleCard
                    icon={<TransferIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/business/transfer"
                    label={text.TRANSFER_MONEY}
                    msg={text.TRANSFER_MONEY_MSG}
                />
                <SimpleCard
                    icon={<SendMoneyIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/business/forex"
                    label={text.FOREIGN_EXCHANGE}
                    msg={text.FOREIGN_EXCHANGE_DESC}
                /> */}
                
                
                {/* <CurrencyConverter /> */}
                <SpotRateCalculator/>
            </div>
        </aside>
    )
}

export default BusRightSider