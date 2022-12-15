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


const WalletRightSider = () => {
    const history = useHistory()
    const userDetails = useSelector((state) => state?.user)
    const business_kyc = userDetails?.business_kyc
    const owner_kyc = userDetails?.id_verification_response
    

    return (
        <aside className={Styles.rightSider}>
            <div className={Styles.siderContent}>
             
                <div>
                   {business_kyc ? "" :
                        <div onClick={() => history.push('/business/compliance')} className={Styles.kycCard}>
                            <div className={Styles.kycTitle}>Complete your business profile</div>
                            <div className={Styles.kcyMsg}>click here to complete your KYC</div>
                        </div>
                    } 
                    {owner_kyc ? "" : 
                        <VerifyIdentity/>
                    } 

                </div>
           
                {/* <CurrencyConverter /> */}
                <SpotRateCalculator/>
            </div>
        </aside>
    )
}

export default WalletRightSider