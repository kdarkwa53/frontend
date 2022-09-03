import React from "react";
import Styles from "../../Menu/Menu.module.css"
import WalletCard from "../../WalletCard/WalletCard";
import { useSelector } from "react-redux";
import CurrencyConverter from "./CurrencyConverter";
import SimpleCard from "../../SimpleCard/SimpleCard";
import {TransferIcon } from "../../JavIcons";


const PortfolioRightSider = () => {
    const userDetails = useSelector((state) => state?.user)
    const default_wallet = userDetails?.default_savings_wallet


    return (
        
        <aside className={Styles.rightSider}>
            <div className={Styles.siderContent}>
                <div className={Styles.walletTop}>
                    <WalletCard
                        accountBalance={default_wallet?.current_balance}
                        accountNumber={default_wallet?.account_number}
                        currency_id={default_wallet?.currency_id}
                    />
                </div>
               
               
                <SimpleCard
                    style={{ visibility: "hidden" }}
                    link="/"
                    icon={<TransferIcon width="1.5em" height="1.5em" color="#0032A0" />}
                    label="Transfer Money"
                    msg="Move money between your accounts"
                />
              
               
                <CurrencyConverter />
            </div>
        </aside>
    )
}

export default PortfolioRightSider