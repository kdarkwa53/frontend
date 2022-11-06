import React, { useEffect } from "react";
import Styles from "../../Menu/Menu.module.css"
import { SendMoneyIcon, DepositIcon, MobileAirtimeIcon, TransferIcon } from "../../../../Shared/Components/JavIcons"
import WalletCard from "../../WalletCard/WalletCard";
import SimpleCard from "../../SimpleCard/SimpleCard";
import { useDispatch, useSelector } from "react-redux";
import CurrencyConverter from "./CurrencyConverter";
import VerifyIdentity from "./VerifyIdentity/VerifyIdentity";


const RightSider = () => {
    const userDetails = useSelector((state) => state?.user)
    const userVeri = userDetails?.id_verification_response
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
                    />
                </div>
                <div>
                    {userVeri ? "" : <VerifyIdentity />}                
                </div>
                <div className={Styles.titleRow}>
                    <div className={Styles.secTitle}>{text.SERVICES}</div>
                    <div className={Styles.viewLink}>{text.VIEW_ALL}</div>
                </div>
                <SimpleCard
                    icon={<DepositIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/fund-wallet"
                    label={text.FUND_MY_WALLET}
                    msg={text.FUND_MY_WALLET_MSG}
                />
                <SimpleCard
                    icon={<SendMoneyIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/send-money"
                    label={text.SEND_MONEY}
                    msg={text.SEND_MONEY_MSG}
                />
                <SimpleCard
                    icon={<TransferIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/transfer"
                    label={text.TRANSFER_MONEY}
                    msg={text.TRANSFER_MONEY_MSG}
                />
                <SimpleCard
                    icon={<MobileAirtimeIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    link="/transfers/airtime" 
                    label={text.BUY_AIRTIME}
                    msg={text.BUY_AIRTIME_DESC}
                />
               
                <CurrencyConverter/>
            </div>
        </aside>
    )
}

export default RightSider