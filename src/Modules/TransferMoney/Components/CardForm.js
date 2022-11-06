import { Input, Form, DatePicker } from 'antd';
import Styles from "../TransferMoney.module.css"


const CardFrom = ({ form }) => {



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
                <div className={Styles.inputLabel}>Card Number</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="card_number"
                        rules={[
                            {
                                required: true,
                                message: "invalid card number"
                            },
                        ]}
                    >
                        <Input size="large" type="number" placeholder="Eg. 4562 1901 1103 2290" />
                    </Form.Item>
                </div>
            </div>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Name</div>
                <div className={Styles.inputContainer}>
                    <Form.Item
                        name="card_name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Ken Wilder" />
                    </Form.Item>
                </div>
            </div>

            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>Expiry Date</div>
                <div className={Styles.sm_nputContainer}>
                    <Form.Item
                        name="expiry"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker size="large" style={{ background: "#F7F7F7" }} picker="month" />
                    </Form.Item>
                    <div className={Styles.inputLabel}> <span className={Styles.cvv}>CVV</span>  </div>
                    <Form.Item
                        name="cvv"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                </div>


            </div>
        </>
    )
}

export default CardFrom