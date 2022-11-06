import Styles from "./WalletCard.module.css"
import logo from "../../../assets/javolin_logo_rev.svg"
import { Eye } from "../JavIcons"
import {currencyFormat} from '../../../helpers/utils'

import { useState } from "react"
import { Select, Spin } from "antd"
import { useSelector } from "react-redux"

const WalletCard = ({ accountNumber, accountBalance, currency_id, accountName }) => {

    const [showAccountDetails, setAccountDetails] = useState(false)
    const text = useSelector((state) => state.language)

    const handleClick = () => {
        setAccountDetails(!showAccountDetails)
    }

    const handleCurrencyChange = (val) => {
        setNewCurr(val)
    }

    
    const state = useSelector((state) => state?.resources)
    const {Option} = Select
    const accNum = showAccountDetails ? accountNumber : `*********${accountNumber ? accountNumber?.slice(-4) : ""}`
    const accBal = accountBalance !== undefined || null ? `${currencyFormat(accountBalance)}` : <Spin/> 
    const [newCurr, setNewCurr] = useState(currency_id)

    const conversion = state?.conversion ? state?.conversion : []
    const currencies = state?.defaultCurrencies ? state?.defaultCurrencies : {}

    const currency = currencies[currency_id]

    return (
        <div className={Styles.card}>
            <div className={Styles.upperSide}>
                <div className={Styles.accountBal}>
                <div className={Styles.slimTitle}>
                        Balance
                        {/* {accountName} */}
                    </div>
                    <div className={Styles.answer}>
                        {`${currency?.ISO} ${accBal}`}
                    </div>
                </div>
                {/* <div style={{ cursor: "pointer" }} onClick={handleClick}>
                    {<Eye width="1em" height="1em" color="#ffffff" />}
                </div> */}
                <div>
                    <img className={Styles.logoIcon} width="100px" src={logo} alt="javolin logo" />

                </div>
            </div>
            <div className={Styles.lowerSide}>
                <div className={Styles.accountNo}>
                    <div className={Styles.slimTitle}>
                        {text.ACCOUNT_NUMBER}
                    </div>
                    <div className={Styles.answer}>
                        {accNum}
                    </div>
                </div>
               
            </div>
        </div>
    )
}


export default WalletCard