
import { Col, Form, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { unCamelCase } from "../../../../helpers/utils"
import { getDropdownListFromAPI } from "../../duck/action"

 const DynamicAPIDropdown = ({ val, ...rest }) => {
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

    useEffect(()=>{
        setLoading(true)
        dispatch(getDropdownListFromAPI(val.links[0]?.javolinRoute)).then((res) => {
            setItems(res)
            setLoading(false)
        })
    }, [dispatch, val.links])


    const _items = items ? items : []
   
    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
                disabled={loading}
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
        </Col>
    )
}

export default DynamicAPIDropdown