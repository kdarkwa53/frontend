import React, { useState } from "react"
import { Menu, Dropdown, Skeleton } from "antd";
import {  useSelector } from "react-redux";
import flag from "../../../assets/ghanaflag.png"
import { ArrowDownBold } from "../JavIcons";
// import { getCurrencies } from "../duck/action";





const CountryCode = () => {
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(
    //         getCurrencies()
    //     )
    // }, [dispatch])
    const countries = useSelector((state) => state?.resources?.countries)
    const state = useSelector((state) => state?.resources)
    const [country, setCountry] = useState({ "flag": flag, code: "233" })

    const handleCodeChange = (e) => {
        setCountry(e)
    }
    const menu = (
        <Menu>
            <Skeleton loading={state.gettingCountries} paragraph={{ rows: 1 }} active />
            {countries?.map((country, i) => {
                return (
                    <Menu.Item key={i}>
                        <div onClick={e => handleCodeChange({ "flag": country.logo, code: country.country_phone_code })}>
                            <img width="20em" height="20em" alt="country logo" src={country.logo} />
                            <span className="darkGray">  (+{country.country_phone_code})</span>
                        </div>
                    </Menu.Item>
                )
            })}
        </Menu>
    );

    return (
        <div style={{ cursor: "pointer" }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <div>
                    <img width="20em" height="20em" alt="country logo" src={country.flag} />
                    <ArrowDownBold width="1em" height="1em" style={{ fill: "#5D6066", margin: "0 0.5em" }} />
                    <span className="darkGray">  (+{country.code})</span>
                </div>
            </Dropdown>
        </div>
    )
}


export default CountryCode