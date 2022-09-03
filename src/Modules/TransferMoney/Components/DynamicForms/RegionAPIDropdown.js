

import { Form, Select } from "antd"
import { formatCountdown } from "antd/lib/statistic/utils"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { unCamelCase } from "../../../../helpers/utils"
import { getDropdownListFromAPI } from "../../duck/action"

 const RegionAPIDropdown = ({form, val, ...rest }) => {
    const { Option } = Select
     let url = useSelector((state) => state.transfer.regionURL)

     url = url ? url : val.links[0]?.javolinRoute

    let reg = val
    const dispatch = useDispatch()
    let regRules = []
    regRules.push({
        required: reg.isRequired,
        message: reg.errorMessage
    })
    reg.validationRules.map((rule => (
        regRules.push(
            {
                pattern: rule.regEx,
                message: rule.errorMessage
            }
        )
    )))
    const [reg_items, reg_setItems] = useState('')
     const [loading, setLoading] = useState(false)

     useEffect(() => {
        setLoading(true)
         form.setFieldsValue({
            [reg.id]: ''
        })
         dispatch(getDropdownListFromAPI(url)).then((res) => {
             reg_setItems(res)
             setLoading(false)
         })
     }, [dispatch, url, reg.id, form])

   
    const _reg_items = reg_items ? reg_items : []
    return (
        <Form.Item
            {...rest}
            name={reg.id}
            rules={regRules}
            label={Array.isArray(reg?.id) ? unCamelCase(reg?.id[1]) : unCamelCase(reg?.id)}
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
                disabled={loading}
            >
                {
                    _reg_items?.map((option) => {
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


export default RegionAPIDropdown