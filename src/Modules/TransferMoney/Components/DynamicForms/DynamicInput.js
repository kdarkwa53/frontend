

import { Col, Form, Input } from "antd"
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
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Form.Item
            {...rest}
            name={val?.id}
            rules={rules}
            label={Array.isArray(val?.id) ? unCamelCase(val?.id[1]) : unCamelCase(val?.id)}
        >
            <Input size="large" />
        </Form.Item>
        </Col>
    )
}


export default DynamicInput