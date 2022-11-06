import { Modal } from "antd";
import React from "react"
import { Form, Input, Row } from "antd";

import Styles from "./Pin.module.css"

const PinCode = ({ isPassCodeVisible, setPassCodeVisible, form, handleSubmit, buttonloading }) => {
    const handleCancel = () => {
        setPassCodeVisible(false);
    };




    const handleFocus = (e) => {
        // setCodeValue(codeValue.concat(value))
        if (e.target.nextSibling)
            e.target.nextSibling.focus()
    }


    return (
        <Modal
            visible={isPassCodeVisible}
            okButtonProps={{ loading: buttonloading }}
            onOk={handleSubmit}
            centered
            onCancel={handleCancel}>

            <Form
                form={form}
                name="normal_login"
                className="login-form"
            >
                <div className={Styles.center} style={{ marginTop: "70px" }}>
                    <p className={Styles.subTitle}>
                        Please enter your  pin
                    </p>
                    <Form.Item
                        name="pin"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the code here",
                            },
                        ]}
                    >
                        <Row>
                            <Input style={{ width: "4em" }} maxLength={1} size="large" type="number" onChange={handleFocus} />
                            <Input style={{ width: "4em", marginLeft: 2 }} size="large" type="number" maxLength={1} onChange={handleFocus} />
                            <Input style={{ width: "4em", marginLeft: 2 }} size="large" type="number" maxLength={1} onChange={handleFocus} />
                            <Input style={{ width: "4em", marginLeft: 2 }} size="large" type="number" maxLength={1} onChange={handleFocus} />
                            <Input style={{ width: "4em", marginLeft: 2 }} size="large" type="number" maxLength={1} onChange={handleFocus} />
                            <Input style={{ width: "4em", marginLeft: 2 }} size="large" type="number" maxLength={1} onChange={handleFocus} />
                        </Row>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default PinCode