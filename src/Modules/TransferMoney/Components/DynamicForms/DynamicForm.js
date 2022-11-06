

import React, { useEffect, useState } from "react"
import BankDropdown from "./BankDropdown"
import DynamicAPIDropdown from "./DynamicAPIDropdown"
import DynamicDropdown from "./DynamicDropdown"
import DynamicInput from "./DynamicInput"
import CountryAPIDropdown from './CountryAPIDropdown'
import RegionAPIDropdown from './RegionAPIDropdown'
import { changeRegionURL } from "../../duck/action"
import { useDispatch } from "react-redux"


 const DynamicForm = ({ data, form, allData}) => {

    // const dispatch = useDispatch()
    //  let region = allData['accountHolderRegion']

    // useEffect(()=>{
    //     // Set default accountholder region to destination country regions
    //     dispatch(changeRegionURL(region.links[0]?.javolinRoute))
    // }, [region, dispatch])


    if (data.id === 'accountHolderCountry') {
        return (
            <CountryAPIDropdown form={form} val={data} />
        )

    } else if (data.id === 'accountHolderRegion') {
        return (
            <RegionAPIDropdown form={form} val={data} allData={allData} />
        )
    }
    else if (data?.id === "bankDetails") {
        return (
            <BankDropdown form={form} val={data} />
        )
    }
    else if (data?.valueSet) {
        return (
            <DynamicDropdown val={data} />
        )
    } else if (data?.value_set) {
        return (
            <DynamicDropdown val={data} />
        )
    }
    else if (data?.links) {
        return (
            < DynamicAPIDropdown val={data} />
        )
    }
    else {
        return (<DynamicInput val={data} />)
    }
}

export default DynamicForm