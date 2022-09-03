

import { Modal, Form, Select, Card, Button} from 'antd';
import {  useState } from 'react';
import CardFrom from '../../../Modules/TransferMoney/Components/CardForm';
import MomoForms from '../../../Modules/TransferMoney/Components/MomoForm';
import Styles2 from "../Menu/Menu.module.css"
import Styles from '../../../Modules/TransferMoney/TransferMoney.module.css';
import { PlusIcon } from '../JavIcons';
import { useDispatch, useSelector } from 'react-redux';
import { saveFundSource } from '../duck/action';





const AddFundingSourceModal = () => {

    const {Option} = Select
    const [isVisible, setIsModalVisible] = useState(false)
    const [accountType, setAccountType] = useState()
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.resources?.savingFundSource)

    const handleCancel = ()=>{
        setIsModalVisible(false)
    }

    const showModal = ()=>{
        setIsModalVisible(true)
    }

    const handleAccountChange = (e)=>{
        setAccountType(e)
    }

    const fundFrom = {
        "momo": <MomoForms form={form} />,
        "card": <CardFrom form={form} />
    }

    const onFinish = (e)=>{
        dispatch(saveFundSource(e,form,setIsModalVisible))
    }
    return (
        <>
            <button onClick={showModal} className={Styles2.fundAddBtn}>
                <div className={Styles2.iconCircle}>
                    <PlusIcon width="2em" height="2em" color="white" />
                </div>
                Add new funding source
            </button>
        
            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={false}
                closable={false}
                centered
                width={800}
            >
                <Card title="ADD FUNDING SOURCE">
                    <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        style={{ width: "100%" }}
                    onFinish={onFinish}
                    >

                        <div className={Styles.itemRow}>
                            <div className={Styles.inputLabel}>Type</div>
                            <div className={Styles.inputContainer}>
                                <Form.Item
                                    name="destination"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select style={{ width: "100%" }} size="large" onChange={handleAccountChange} placeholder="Select account type">
                                        <Option value="card">Card</Option>
                                        <Option value="momo">Mobile Money (Momo) Account</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        {fundFrom[accountType]}
                        {/* <div className={Styles.tnxButton2}> */}
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                size="large"
                            loading= {loading}

                            >
                                Save Funding Source
                            </Button>
                        {/* </div> */}
                    </Form>
                </Card>
                
                
            </Modal>
        </>
    )
}


export default AddFundingSourceModal