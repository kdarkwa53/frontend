

import { Form, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { unCamelCase } from "../../../../helpers/utils"
import { changeRegionURL, getDropdownListFromAPI } from "../../duck/action"


const CountryAPIDropdown = ({ val, setCountry, ...rest }) => {
    const { Option } = Select
    let rules = []
    rules.push({
        required: val.isRequired,
        message: val.errorMessage
    })
    val.validationRules.map((rule => (
        rules.push(
            {
                pattern: rule.regEx,
                message: rule.errorMessage
            }
        )
    )))

    const [items, setItems] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

     useEffect(() => {
         setLoading(true)
         dispatch(getDropdownListFromAPI(val.links[0]?.javolinRoute)).then((res) => {
             setItems(res)
             setLoading(false)
         })
     }, [dispatch, val.links])

    
    const _items = items ? items : []

    const handleAccountHolderCountry = (regionCode) => {
        let regionurl = `/api/business/rules-regions?country=${regionCode}`
        if(setCountry){
            setCountry(regionCode)
        }
        console.log("region: ", regionurl)
        dispatch(changeRegionURL(regionurl))
    }

    return (
        <Form.Item
            {...rest}
            name={val.id}
            rules={rules}
            label={Array.isArray(val?.id) ? unCamelCase(val?.id[1]) : unCamelCase(val?.id)}
        >
            <Select
                {...rest}
                size='large'
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch
                loading={loading}
                onChange={handleAccountHolderCountry}
            >
                {
                    _items?.map((option) => {
                        const fields = Object.entries(option)

                        return (
                            <Option key={fields[0][1]} value={fields[0][1]}>{fields[1][1]}</Option>
                        )
                    })
                }


            </Select>
        </Form.Item>
    )
}

export default CountryAPIDropdown