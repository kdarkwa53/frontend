import { Button, Form, Input, Row, Col, Select, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { XIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addingRole, addingUser } from "./duck/action";
import RoleItem from "./RoleItem";


const AddRole = ({ isVisible, setIsModalVisible})=>{
    const [form] = useForm();
    const dispatch = useDispatch()
    const [selectedPerm, setSelectedPerm] = useState({})
    const roles = useSelector((state) => state?.userMgt?.roles)
    const rLoading = useSelector((state)=> state.userMgt.addingRole)
    const perm = useSelector((state)=> state.userMgt.permissions)

    let _roles = roles ? roles : {}

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const showModal = () => {
        console.log("berman")
        setIsModalVisible(true);
    };

    const onFinish = (val)=>{
        let details = {
            ...val,
            permissions: `[${Object.values(selectedPerm).toString()}]`
        }
        dispatch(addingRole(details)).then(()=>{
            form.resetFields()
            setIsModalVisible(false)
        })
       
    }

    return(
        <>
           
            <Button style={{background: "#0032A0", fontSize: "16px"}} onClick={showModal} type="primary" size="large" shape="round" >
                            Add new role
                        </Button>
            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={false}
                width={"740px"}
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
            >
                <div className={Styles.header}>
                        <div className={Styles.secTitle}>Add new role</div>
                    </div>
                
                <Form
                    layout="vertical"
                    name="profile_form"
                    style={{ width: "100%" }}
                    form={form}
                    onFinish={onFinish}
                    
                
                >
                    <div style={{  padding: "20px 70px", display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column"}}>
                    <Form.Item
                                        name="name"
                                        label="Role Name"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                        style={{width: "100%"}}
                                    >
                                        <Input style={{ minWidth: "490px"}} size="large" placeholder="Eg. Admin" />
                                    </Form.Item>
                                    <Form.Item
                                    label="Role Permissions"
                                    >
                                    {
                                        Object.values(perm).map((per)=>{
                                            return(
                                                <RoleItem selectedPerm={selectedPerm} setSelectedPerm={setSelectedPerm} key={per.id} perm={per} />
                                            )
                                        })
                                    }
                                    </Form.Item>
                                   
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    style={{ marginTop: "3em", padding: "5px 50px" }}
                                    loading={rLoading}
                                    shape="round"
                                >
                                    Add Role
                                </Button>
                    </div>
                               
                            </Form>
                           
            </Modal>
        </>
    )
}

export default AddRole