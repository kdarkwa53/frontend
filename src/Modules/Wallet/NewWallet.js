import { Button, Card, Form, Input, Modal, Select } from "antd"
import { Children, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon, XIcon } from "../../Shared/Components/JavIcons"
import Styles from "../Dashboard/Dashboard.module.css"
import { createWallet } from "../TransferMoney/duck/action"
import { PlusCircleOutlined } from '@ant-design/icons';




const NewWallet = ({children})=>{
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
            <div onClick={showModal} className={Styles.dummyCon}>
                <div className={Styles.plusIcon}>
                <PlusCircleOutlined style={{color:"#0032A0"}} />
                </div>
                <div style={{textAlign: "center"}} className={Styles.addNewText}>
                    {text["Add Account"]}
                </div>
            </div>
            <Modal
                open={isVisible}
                onCancel={handleCancel}
                footer={false}
                closable={false}
                centered
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                bodyStyle={
                    {
                        padding: 0,
                        border: "16px 16px 0 0"
                    }
                }
        
                width="700px"
            >
                <div className={Styles.jav_modal_header}>
                        <div className={Styles.jav_modal_secTitle}>{text["ADD NEW ACCOUNT"]}</div>
                </div>
                <div style={{display: "flex", padding: "2em 1em", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        style={{ width: "100%" }}
                        onFinish={onFinish}
                    >
                         <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>{text["Account Name"]}</div>
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
                            <div className={Styles.inputLabel}>{text["Description"]}</div>
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
                            <div className={Styles.inputLabel}>{text["Currency"]}</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name="currency_id"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder={text["Select the default currency for your account"]} size="large">
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
                                shape="round"
                                htmlType="submit"
                                size="large"
                                loading= {loading}

                            >
                                {text["Add Account"]}
                            </Button>
                        {/* </div> */}
                    </Form> 
                </div>
                                 
                
            </Modal>
        </>
       
    )
}

export default NewWallet