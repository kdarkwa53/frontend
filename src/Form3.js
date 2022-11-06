import { Form, Select, Input } from "antd";
const { Option } = Select;
const Form3 = () => {
    return (
        <>
            <Form.Item name="people" label="Person" rules={[
                {
                    required: true,
                    message: "Please select a person",
                },
            ]}
            >
                <Select style={{ width: 120 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>
            <Form.Item label="can" name="kwabena">
                <Input />
            </Form.Item>
        </>
    );
};

export default Form3