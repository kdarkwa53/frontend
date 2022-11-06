import { Input, Form, DatePicker } from 'antd';
import Currencies from '../../../Shared/Components/Currencies';
import Styles from "../TransferMoney.module.css"


const CashFrom = ({ form }) => {



    // const handleGetRecepient = () => {
    //     const { phone_number } = form.getFieldsValue()
    //     try {
    //         setLoading(true)
    //         dispatch(getJavRecepientName({ phone_number })).then((res) => {
    //             console.log("chale", res)
    //             setRecepient(res?.name)
    //             form.setFieldsValue({
    //                 recepient: res?.name
    //             })
    //             setLoading(false)
    //         })
    //     } catch (err) {
    //         setLoading(false)
    //         console.log(err)
    //     }
    // }

    return (
        <>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Agent ID</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="agent_id"
                        rules={[
                            {
                                required: true,
                                message: "invalid id number"
                            },
                        ]}
                    >
                        <Input size="large" type="number" placeholder="Eg. 4562" />
                    </Form.Item>
                </div>
            </div>
            
         

        </>
    )
}

export default CashFrom