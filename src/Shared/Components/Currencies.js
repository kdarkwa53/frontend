
// import React, { useState } from "react"
import { Menu, Dropdown } from "antd";
// import { useSelector } from "react-redux";


const Currencies = () => {

    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(
    //         getCurrencies()
    //     )
    // }, [dispatch])

    // const currencyList = useSelector((state) => state?.resources?.currencies)
    // const state = useSelector((state) => state?.resources)
    // console.log(state.gettingCurrencies)

    // const [currency, setCurrency] = useState('₵')

    // const handleCodeChange = (e) => {
    //     setCurrency(e)
    // }
    const menu = (
        // <Menu>
        //     <Skeleton loading={state.gettingCurrencies} paragraph={{ rows: 1 }} active />
        //     {currencyList?.map((currency, i) => {
        //         return (
        //             <>
        //                 <Menu.Item key={i}>
        //                     <div onClick={e => handleCodeChange(currency.symbol)}>
        //                         <span className="darkGray"> {currency.symbol}</span>
        //                         <span className="darkGray"> {currency.name}</span>
        //                     </div>
        //                 </Menu.Item>
        //             </>
        //         )
        //     })}
        // </Menu>

        <Menu>
            {/* {currencyList?.map((currency, i) => { */}
            {/* return ( */}
            <>
                <Menu.Item >
                    <div >
                        <span className="darkGray">₵</span>
                        <span className="darkGray"> Ghana cedis</span>
                    </div>
                </Menu.Item>
            </>
            {/* ) */}
            {/* })} */}
        </Menu>
    );

    return (
        <div style={{ cursor: "pointer" }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <div style={{ borderRight: "1px solid #888B93", minWidth: "1.5em", marginRight: "0.5em" }}>
                    <span className="darkGray">₵</span>
                </div>
            </Dropdown>
        </div>

    )
}
export default Currencies