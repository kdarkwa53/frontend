

import { Form, Button, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Styles from "../Profile.module.css"
import { useForm } from 'antd/lib/form/Form'
import { changePin } from '../duck/action';

const GetHelp = () => {
    const dispatch = useDispatch()
    const text = useSelector((state) => state?.language)


    const profileLoading = useSelector((state) => state?.profile?.updatingProfile)

    const [form] = useForm();




    const onFinish = (values) => {
        console.log(values)
        dispatch(changePin(values, form))
    }


    const {TextArea} = Input

    return (
        <>
            <div>
                <div className={Styles.editTitle}>{text.GET_HELP}</div>
                <Form
                    form={form}
                    layout="vertical"
                    name="profile_form"
                    style={{ width: "100%" }}
                    onFinish={onFinish}
                >

                    <div>
                        <Form.Item
                            name="passcode"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} placeholder={text.CONTACT_INPUT_PLACEHOLDER} />
                        </Form.Item>

                    </div>

                    <div>
                        <div className={Styles.inputTitle}>{text.CONTACT}</div>
                        {/* <div>
                            <p><a href="tel:030568900001">030568900001</a></p>
                        </div>
                        <div>
                            <p><a href="tel:030568900001">030568900001</a></p>
                        </div> */}
                        <div>
                            <a href="mailto: support@javolin.com">support@javolin.com</a>
                        </div>
                       
                    </div>

                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        size="large"
                        style={{ marginTop: "1em" }}
                        loading={profileLoading}
                    >
                        {text.SUBMIT}
                    </Button>
                </Form>
            </div>

        </>
    )
}

export default GetHelp