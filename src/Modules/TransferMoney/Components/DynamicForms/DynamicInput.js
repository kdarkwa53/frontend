

import { Form, Input } from "antd"
import React from "react"
import { unCamelCase } from "../../../../helpers/utils"

const DynamicInput = ({ val, ...rest }) => {

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

    return (
        <Form.Item
            {...rest}
            name={val?.id}
            rules={rules}
            label={Array.isArray(val?.id) ? unCamelCase(val?.id[1]) : unCamelCase(val?.id)}
        >
            <Input size="large" />
        </Form.Item>
    )
}


export default DynamicInput