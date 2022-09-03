

import { Form, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Styles from "../Profile.module.css"
import { useForm } from 'antd/lib/form/Form'
import OtpInput from 'react-otp-input';
import { changePin } from '../duck/action';

const ChangePin = () => {
    const dispatch = useDispatch()
    const text = useSelector((state) => state?.language)

    const profileLoading = useSelector((state) => state?.profile?.updatingProfile)

    const [form] = useForm();          
   



    const onFinish = (values)=>{
        dispatch(changePin(values, form))
    }



    return (
        <>
                <div>
                    <div className={Styles.editTitle}>{text.CHANGE_PIN}</div>
                    <Form
                        form={form}               
                        layout="vertical"
                        name="profile_form"
                        style={{ width: "100%" }}
                     onFinish={onFinish}
                    >

                        <div className={Styles.subMsg}>{text.CHANGE_PIN_MSG}</div>

                        <div>
                            <div className={Styles.inputTitle}>{text.CHANGE_PIN}</div>

                        <Form.Item
                            name="passcode"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <OtpInput
                                inputStyle={{ width: "100%", padding: "1em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                                containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "5px", width: "100%", maxWidth:"500px", margin: "0.5em" }}
                                numInputs={6}
                            />
                        </Form.Item>

                        </div>

                        <div>
                            <div className={Styles.inputTitle}>{text.NEW_PIN}</div>
                        <Form.Item
                            name="new_passcode"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <OtpInput
                                inputStyle={{ width: "100%", padding: "1em", margin: "0.2em", borderRadius: "8px", border: "1px solid #AFB3BD" }}
                                containerStyle={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", columnGap: "5px", width: "100%", maxWidth: "500px", margin: "0.5em" }}
                                numInputs={6}
                            />
                        </Form.Item>
                        </div>

                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            size="large"
                            style={{ marginTop: "1em" }}
                            loading={profileLoading}
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
             
        </>
    )
}

export default ChangePin