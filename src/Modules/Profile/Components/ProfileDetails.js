

import { Form, Input, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleAPIAddressInput from '../../../Shared/Components/GoogleAPIAddressInput/GoogleAPIAddressInput'
import { updateProfile } from '../duck/action'
import Styles from "../Profile.module.css"

const ProfileDetails = () => {
    const state = useSelector((state) => state?.user)
    const profile = useSelector((state) => state?.profile)
    const { first_name, last_name, email, phone_number, current_physical_address, date_of_birth, id } = state
    const [disableButton, setButton] = useState(true)
    const [form] = useForm();

    const dispatch = useDispatch()
    const text = useSelector((state) => state?.language)


    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setButton(hasErrors);
    }
    const onFinish = (values) => {
        console.log(values)
        const address = { "current_physical_address": values?.address ? values?.address?.label : current_physical_address}
        const { email, first_name, last_name } = values
        values = {
            ...address, email, first_name, last_name, id,
            personal_id_type: "value", personal_id_value: "value",
            marital_status: "New", city: "city", region: "region", date_of_birth: date_of_birth
        }
        dispatch(updateProfile(values))
    }
    return (
        <>
            <div className={Styles.editTitle}>{text.PERSONAL_INFO}</div>
            <Form
                layout="vertical"
                name="profile_form"
                style={{ width: "100%" }}
                form={form}
                initialValues={{
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone_number,
                }}
                onFinish={onFinish}
                onFieldsChange={handleFormChange}
            >
                <div>
                    <div className={Styles.inputTitle}>{text.FIRST_NAME}</div>
                    <Form.Item
                        name="first_name"
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
                    <div className={Styles.inputTitle}>{text.SURNAME}</div>
                    <Form.Item
                        name="last_name"
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
                    <div className={Styles.inputTitle}>{text.EMAIL}</div>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" disabled />
                    </Form.Item>
                </div>
                <div>
                    <div className={Styles.inputTitle}>{text.PHONE}</div>
                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" disabled />
                    </Form.Item>
                </div>
                <div>
                    <div className={Styles.inputTitle}>{text.ADDRESS}</div>
                    <Form.Item
                        name="address"
                       
                    >
                        <GoogleAPIAddressInput default={current_physical_address} />
                    </Form.Item>
                </div>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    style={{ marginTop: "1em" }}
                    disabled={disableButton}
                    loading={profile.updatingProfile}
                >
                    {text.UPDATE}
                </Button>
            </Form>
        </>
    )
}

export default ProfileDetails