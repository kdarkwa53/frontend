

import { Col, Form, Select } from "antd"
import React from "react"
import { filterValueSet, unCamelCase } from "../../../../helpers/utils"




 const DynamicDropdown = ({ val, ...rest }) => {
    const { Option } = Select
    val = filterValueSet(val)
    let rules = []
    rules.push({
        required: val?.isRequired,
        message: val?.errorMessage
    })
    if (val?.validationRules) {
        val?.validationRules.map((rule => (
            rules.push(
                {
                    pattern: rule?.regEx,
                    message: rule?.errorMessage
                }
            )
        )))
    }

    let newValueSet = val?.valueSet
    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item
            name={val?.id}
            rules={rules}
            label={Array.isArray(val?.id) ? unCamelCase(val?.id[1]) : unCamelCase(val?.id)}
            {...rest}
        >
            <Select

                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: "100%", textTransform: 'capitalize' }}
                size="large" >
                {
                    Object.values(newValueSet).map((option) => {
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

export default DynamicDropdown