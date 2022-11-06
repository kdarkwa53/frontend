import { useHistory } from "react-router-dom";
import { Layout, Col, Form, Button } from 'antd';
import React, { useState } from 'react';
import Styles from "../../../TransferMoney/TransferMoney.module.css"
import DynamicForms from '../DynamicForms/DynamicForms';
import SkeletonLoader from '../../../../helpers/SkeletonLoader';
import { useDispatch, useSelector } from "react-redux";
import { addBeneficiary, addBeneValues } from "../../duck/action";
import { formatRegResults } from "../../../../helpers/utils";

const BeneficiaryLayoutRoute = ({ questions, pageNum, totalPages, type}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const { Content } = Layout;
    console.log('type: ', type)

    const transferReducer = useSelector((state) => state?.transfer)
    const loading = transferReducer?.gettingData
    let details = transferReducer?.defaultValues
    const addLoading = transferReducer?.addingBeneficiary


    const history = useHistory()

    let isBenefiaryFormNotComplete = pageNum < totalPages
    
    const onFinish = (values) => {
        
        if(values?.regulatory){
            values = {
                ...values,
                regulatory: {
                    ...details?.regulatory,
                    ...values?.regulatory
                },
            }
        }
        
        dispatch(addBeneValues(values))

        if (isBenefiaryFormNotComplete){
            history.push({pathname: `/beneficiary/${pageNum}`, state: {type: type}})
        }else{

            details = {
                ...details,
                ...values,
            }

            if(values?.regulatory || details?.regulatory){
                details = {
                    ...details,
                    ...values,
                    regulatory: {
                        ...details?.regulatory,
                        ...values?.regulatory
                    },
                }
                const formReg = formatRegResults(details?.regulatory)
                details = {
                    ...details,
                    regulatory: formReg
                }
            }
           dispatch(addBeneficiary(details, history, type))
        }
    }


    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Send Money</span>
                    </div>
                </div>
                <div style={{ textAlign: "right" , fontSize: "30px", fontWeight: "bold", paddingRight: "50px"}}>
                    {pageNum}/{totalPages}
                </div>
                <div className={Styles.cardContainer}>
                    
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <>
                                
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                    initialValues={details}
                                >

                                    <div className={Styles.sectionBox}>
                                        <p>Beneficiary Information</p>
                                        
                                        {
                                            loading ?
                                                <SkeletonLoader num={5} /> : (
                                                    <DynamicForms form={form} data={questions} />
                                                )
                                        }

                                    </div>
                                    <div className={Styles.buttonContainter}>
                                        <div className={Styles.tnxButton2}>
                                            <Button
                                                type="primary"
                                                block
                                                htmlType="submit"
                                                size="large"
                                                loading={addLoading}
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </div>

                                </Form>

                            </>

                        </div>
                    </Col>
                </div>
            </div>
        </Content>  
    );
}



export default BeneficiaryLayoutRoute