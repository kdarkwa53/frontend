
import Styles from "./InputQP.module.css"
import { Col, Input, Select } from "antd"

const InputQP = ({ name, value, ...props }) => {
    const { Option } = Select
    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Input.Group compact>
                <Select defaultValue="Zhejiang">
                    <Option value="Zhejiang">$</Option>
                    <Option value="Jiangsu">GHS</Option>
                </Select>
                <input {...props} type="number" value={value} name={name} min="0.00" className={Styles.input_qp} />

            </Input.Group>
        </Col>
    )
}

export default InputQP