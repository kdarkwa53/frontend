

import { Select } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getConvertion, getCurrencies } from "../../duck/action"
import Styles from "../../Menu/Menu.module.css"

const CurrencyConverter = ()=>{
    const state = useSelector((state) => state?.resources)
    const text = useSelector((state) => state?.language)

    const [newCurr, setNewCurr] = useState(2)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCurrencies())
        dispatch(getConvertion(newCurr))
    },[dispatch, newCurr])
    const {Option} = Select

    const handleCurrencyChange = (val)=>{
        setNewCurr(val)
    }

    const conversion = state?.conversion ? state?.conversion : []
    const currencies = state?.currencies ? state?.currencies :{}
    
    return(
        <div className={Styles.rateCard}>
            <div className={Styles.exTitle}>{text.EXCHANGE_RATE}</div>

            <div className={Styles.base}>
                {/* <div className={Styles.baseCurrency}>{state?.from?.name}</div> */}
               { currencies ?(
                    <Select onChange={handleCurrencyChange} style={{ width: 240 }} defaultValue={newCurr}>
                        {
                            Object?.values(currencies)?.map((currency) => {
                                return (
                                    < Option key={currency?.id} value={currency?.id}>{currency?.name}</Option>
                                )

                            })
                        }

                    </Select>
               ): ""}
                
                <div className={Styles.baseValue}>1.00</div>
            </div>

            { conversion? conversion?.equivalence?.map((item)=>{
                    return(
                        item.currency.name !== conversion?.from?.name?
                            <div key={item.currency.symbol} className={Styles.exRate}>
                                <div className={Styles.currency}>{item.currency.name}</div>
                                <div className={Styles.rate}>{`(${item.currency.symbol}) ${item?.value?.toFixed(2)}`}</div>
                            </div>
                            :""
                    )
                // }
            }) : ""}
        </div>
    )
}
export default CurrencyConverter