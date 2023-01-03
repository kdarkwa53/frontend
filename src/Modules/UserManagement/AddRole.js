import { Button, Form, Input, Row, Col, Select, Modal, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { XIcon } from "../../Shared/Components/JavIcons";
import Styles from "./UserMgt.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addingRole, addingUser } from "./duck/action";
import RoleItem from "./RoleItem";
import { getRoles } from "./duck/action";


const AddRole = ({ isVisible, setIsModalVisible,editUser})=>{
    const [form] = useForm();
    const dispatch = useDispatch()
    const [selectedPerm, setSelectedPerm] = useState({})
    const roles = useSelector((state) => state?.userMgt?.roles)
    const rLoading = useSelector((state)=> state.userMgt.addingRole)
    const perm = useSelector((state)=> state.userMgt.permissions)
    const text = useSelector((state) => state?.language)

    const roleDetails = roles[editUser]
    const getLimitValue=(permissions)=>{
        let limitPerm = permissions.filter((per)=> per.name === "TRANSACTION_LIMIT")
        return limitPerm[0]?.value
    }
    const getPermissionsIDs = (perm)=>{
        let perms = perm.map(p => p.id)
        return perms
    }

    let editFieldValiues = editUser ? {
        name: roleDetails?.name,
        limits: getLimitValue(roleDetails?.permissions)
    }: null
    form.setFieldsValue(editFieldValiues)
    let allPerm = editUser ? getPermissionsIDs(roleDetails?.permissions) : null


    

    const handleCancel = () => {
        setIsModalVisible(false)
    }


    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const onFinish = (val)=>{
        let details = {
            ...val,
            permissions: `[${Object.values(selectedPerm).toString()}]`,
            limits:[{
                    "name": "TRANSACTION_LIMIT",
                    "amount_limit": val.limits
            }]
        }
        dispatch(addingRole(details)).then(()=>{
            form.resetFields()
            setIsModalVisible(false)
        })
       
    }

    useEffect(()=>{
        dispatch(getRoles())
    }, [dispatch, rLoading])

    return(
        <>
           
            <Button style={{background: "#0032A0", fontSize: "16px"}} onClick={showModal} type="primary" size="large" shape="round" >
                            {text["Add new role"]}
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
                        <div className={Styles.secTitle}>{text["Add new role"]}</div>
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
                                        label={text["Role Name"]}
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
                                    label={text["Role Permissions"]}
                                    >
                                    {
                                        Object.values(perm).map((per)=>{
                                            if (per.name !== "TRANSACTION_LIMIT") {
                                                return(
                                                    <RoleItem allPerm={allPerm} selectedPerm={selectedPerm} setSelectedPerm={setSelectedPerm} key={per.id} perm={per} />
                                                )
                                            }
                                           
                                        })
                                    }
                                    </Form.Item>
                                    <Form.Item
                                        label={text["Set Transaction Limit"]}
                                        name="limits"
                                        style={{width: "100%"}}
                                        >
                                        <InputNumber prefix={"USD"} style={{ width: "100%" }}
                                        formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        width="100%"
                                        size="large" name='amount' />


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
                                    {text["Add Role"]}
                                </Button>
                    </div>
                               
                            </Form>
                           
            </Modal>
        </>
    )
}

export default AddRole