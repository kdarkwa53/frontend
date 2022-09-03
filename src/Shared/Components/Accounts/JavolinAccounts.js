import { Select } from 'antd';
import React, { useEffect } from 'react';
import "./JavolinAccounts.css"

import {useDispatch, useSelector } from 'react-redux';
import { REACT_APP_ASSETS_API_URL } from '../../../helpers/contants';
import { getWallets } from '../duck/action';

const JavolinAccounts = (props) => {

    const { setsourcewallet, ...rest} = props


    const sel = { title: "selectedCard", lineHeight: "cardLeftHemSelected" }

    let state = useSelector((state) => state?.resources?.wallets)
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    
    const dispatch  = useDispatch()


    const handleSelectSource = (val) => {
        setsourcewallet(state[val])
    }

    const { Option } = Select
    
    // const wallet = state2
    return (
        <Select size="large" {...rest} onSelect={handleSelectSource}  className="c_select" style={{ width: "100%" }} placeholder="Select Account">
            {/* <Select size="large" {...rest}className="c_select" style={{ width: "100%" }} placeholder="Select Account"> */}

            {Object.values(state)?.map((wallet) => { 
                 return (
                     <Option value={wallet?.id} key={wallet?.id}>
                        <div className={`cardTile ${sel.title}`}>
                            <div className="cardLeftHem">
                                <div className={`cardName ${sel.lineHeight}`} >{wallet?.name}</div>
                                <div className={`lastSeen ${sel.lineHeight}`}>{`${currencies[wallet?.currency_id]?.ISO} ${Number(wallet?.current_balance).toFixed(2)}`}</div>
                            </div>
                            <div className="cardRightHem">
                                <div className="accountNumber">
                                    {wallet?.account_number ? `****${wallet?.account_number?.substring(6)}` : ""}
                                </div>
                                <div className="cardDesign">
                                    {wallet?.wallet_logo ? <img alt="card" width="50em" src={`${REACT_APP_ASSETS_API_URL}${wallet.wallet_logo}`} /> : ""}
                                </div>
                            </div>
                        </div>
                    </Option>
                 ) 
             })} 
        </Select>
    )
}



export default JavolinAccounts