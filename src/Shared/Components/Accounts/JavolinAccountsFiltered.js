import { Select } from 'antd';
import React from 'react';
import "./JavolinAccounts.css"

import { useSelector } from 'react-redux';
import { REACT_APP_ASSETS_API_URL } from '../../../helpers/contants';

const JavolinAccountsFiltered = (props) => {

    const { setsourcewallet, choosenwallet, ...rest } = props


    const sel = { title: "selectedCard", lineHeight: "cardLeftHemSelected" }

    let state = useSelector((state) => state?.resources?.wallets)

    // const handleSelect = () => {
    //     setClassname({ title: "selectedCard", lineHeight: "cardLeftHemSelected" })
    // }

    const handleSelectSource = (val) => {
        setsourcewallet(state[val])
    }

    const { Option } = Select

    state = Object.values(state)?.filter((item) => choosenwallet !== item.id)

    return (
        <Select size="large" {...rest} onSelect={handleSelectSource} className="c_select" style={{ width: "100%" }} placeholder="Select Account">
            {state?.map((wallet) => {
                return (
                    <Option key={wallet?.id}>
                        <div className={`cardTile ${sel.title}`}>
                            <div className="cardLeftHem">
                                <div className={`cardName ${sel.lineHeight}`} >{wallet?.name}</div>
                                <div className={`lastSeen ${sel.lineHeight}`}>{`GHS${Number(wallet?.current_balance).toFixed(2)}`}</div>
                            </div>
                            <div className="cardRightHem">
                                <div className="accountNumber">
                                    {wallet?.account_number ? `****${wallet?.account_number?.substring(6) }` : ""}
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



export default JavolinAccountsFiltered