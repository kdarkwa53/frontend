import { Button, Card, Form, Input, Modal, Select } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon } from "../../Shared/Components/JavIcons"
import Styles from "../Dashboard/Dashboard.module.css"
import { createWallet } from "../TransferMoney/duck/action"
import { PlusCircleOutlined } from '@ant-design/icons';




const NewWallet = ()=>{
    const text = useSelector((state) => state?.language)
    const [isVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const handleCancel = ()=>{
        setIsModalVisible(false)
    }

    const showModal = ()=>{
        setIsModalVisible(true)
    }


    const onFinish = (values) =>{
        dispatch(createWallet(values, form, setIsModalVisible))
    }
    const {Option} = Select
    const currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    const loading = useSelector((state) => state?.transfer?.creatingWallet)

    const _currencies = currencies ? currencies : {}
    return (
        <>
         {/* <div onClick={showModal} className={Styles.walletTop}> */}
            <div onClick={showModal}  className={Styles.dummyCon}>
                <div className={Styles.plusIcon}>
                <PlusCircleOutlined style={{color:"#0032A0"}} />
                    {/* <PlusIcon width="2em" height="2em" color="#5D6066" /> */}
                </div>
                <div className={Styles.addNewText}>
                    Add
                </div>
            </div>
        {/* </div> */}


            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={false}
                closable={false}
                centered
            >
                <Card title="ADD NEW WALLET">
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        style={{ width: "100%" }}
                        onFinish={onFinish}
                    >
                         <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Wallet Name</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large"/>
                                </Form.Item>
                            </div>
                        </div>
                        <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Description</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input size="large"/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Currency</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name="currency_id"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select the default currency for your account" size="large">
                                        {
                                            Object.values(_currencies)?.map((item) => {
                                                return (
                                                    <Option value={item.id} key={item.id}>{`${item.name} (${item.symbol})`} </Option>
                                                )
                                            })
                                    }
                                 </Select>
                                </Form.Item>
                            </div>
                        </div>

                    
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                size="large"
                                loading= {loading}

                            >
                                Add Wallet
                            </Button>
                        {/* </div> */}
                    </Form>
                </Card>
                
                
            </Modal>
        </>
       
    )
}

export default NewWallet