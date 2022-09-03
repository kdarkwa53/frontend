
import { Input, Select, Form, Button, } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;

const MakeDepositForm = ({ handleFinish }) => {
    const [form] = Form.useForm();
    const btnLoading = useSelector((state) => state?.savings?.makingDeposit)

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                style={{ width: "100%" }}
                onFinish={handleFinish}
            >
                <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                    Amount
                </div>
                <Input.Group size="large" compact>
                    <Select size="large" bordered={false} style={{ width: '17%' }} defaultValue="cedis">
                        <Option value="cedis">₵</Option>
                        <Option value="naira">₦</Option>
                        <Option value="dollar">$</Option>
                        <Option value="pound">£</Option>
                        <Option value="rand">R</Option>
                    </Select>
                    <Form.Item
                        name="amount"
                        style={{ width: "80%" }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" name='amount' style={{ width: '100%' }} type="number" />
                    </Form.Item>
                </Input.Group>
                <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                    Phone Number
                </div>
                <Input.Group size="large" compact>
                    <Select size="large" bordered={false} defaultValue="cedis">
                        <Option value="cedis">+233</Option>
                        <Option value="naira">+234</Option>
                        <Option value="dollar">+1</Option>
                        <Option value="pound">+44</Option>
                        <Option value="rand">+27</Option>
                    </Select>
                    <Form.Item
                        name="momo_number"
                        style={{ width: "80%" }}
                        rules={[
                            {
                                required: true,
                                len: 10,
                                message: "invalid number"
                            },
                        ]}
                    >
                        <Input style={{ width: '100%' }} type="number" placeholder="mobile number" />
                    </Form.Item>
                </Input.Group>
                <>
                    <div style={{ fontSize: "14px", color: "gray", marginBottom: "1em" }}>
                        Network
                    </div>
                    <Form.Item
                        name="momo_network"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select style={{ width: "100%" }} bordered={false} size="large" defaultValue="Select network">
                            <Option value="MTN">MTN</Option>
                            <Option disabled value="VODA">VODAFONE CASH</Option>
                            <Option disabled value="AIRTELTIGO">AIRTELTIGO CASH</Option>
                        </Select>
                    </Form.Item>
                </>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    loading={btnLoading}
                    size="large"

                >
                    SUBMIT
                </Button>
            </Form>
        </>
    )
}

export default MakeDepositForm