import { Form, Input } from "antd";

const Form2 = () => {
    return (
        <>
            <Form.Item label="Question">
                <Input />
            </Form.Item>
            <Form.Item label="Answer">
                <Input />
            </Form.Item>
        </>
    );
};

export default Form2