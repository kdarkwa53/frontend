

import { Form, Input, Button } from 'antd'
import Styles from "../Profile.module.css"

const ChangePhoneNumber = () => {
    return (
        <>
            <div className={Styles.editTitle}>Change phone number</div>
            <Form
                // form={form}
                layout="vertical"
                name="profile_form"
                style={{ width: "100%" }}
            >


                <div>
                    <div className={Styles.inputTitle}>Phone number</div>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                </div>
                <div>
                    <div className={Styles.inputTitle}>New phone number</div>
                    <Form.Item
                        name="email_new"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                </div>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    style={{ marginTop: "1em" }}

                >
                    Update
                </Button>
            </Form>
        </>
    )
}

export default ChangePhoneNumber