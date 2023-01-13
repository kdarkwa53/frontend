

import { Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { unCamelCase } from "../../../../helpers/utils"
import { changeRegionURL, getDropdownListFromAPI } from "../../duck/action"


const CountryDropdown2 = ({ val, country, setCountry, ...rest }) => {
    // const { Option } = Select
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

    // const [items, setItems] = useState('')
    // const [loading, setLoading] = useState(false)
    // const dispatch = useDispatch()

    //  useEffect(() => {
    //      setLoading(true)
    //      dispatch(getDropdownListFromAPI(val.links[0]?.javolinRoute)).then((res) => {
    //          setItems(res)
    //          setLoading(false)
    //      })
    //  }, [dispatch, val.links])

    
    // const _items = items ? items : []

    // const handleAccountHolderCountry = (regionCode) => {
    //         console.log(regionCode)
    //         setCountry(regionCode)
    // }

    return (
        <Form.Item label="Bank Country">
            <Form.Item
                name={['bakingAndSettlement', 'bank_country']}
                rules={rules}
                >
            {/* <Select
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


            </Select> */}
            <Input size="large" />
            </Form.Item>
        </Form.Item>
    )
}

export default CountryDropdown2