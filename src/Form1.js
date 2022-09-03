
import { Form, Radio, Input } from "antd";

const Form1 = () => {
    return (
        <>

            <Form.Item name="radio-group" label="Radio.Group">
                <Radio.Group>
                    <Radio value="a">item 1</Radio>
                    <Radio value="b">item 2</Radio>
                    <Radio value="c">item 3</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="lname" label="Last Name" rules={[
                {
                    required: true,
                    message: "Please input your last name!",
                },
            ]}>
                <Input />
            </Form.Item>
        </>
    );
};

export default Form1