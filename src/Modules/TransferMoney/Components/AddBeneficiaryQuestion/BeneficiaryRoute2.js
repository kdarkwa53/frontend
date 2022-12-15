import { useHistory } from "react-router-dom";
import { Layout, Col, Form, Button, Row } from 'antd';
import React, { useState } from 'react';
import Styles from "../../../TransferMoney/TransferMoney.module.css"
import DynamicForms from '../DynamicForms/DynamicForms';
import SkeletonLoader from '../../../../helpers/SkeletonLoader';
import { useDispatch, useSelector } from "react-redux";
import { addBeneficiary, addBeneficiary2, addBeneValues } from "../../duck/action";
import { formatRegResults } from "../../../../helpers/utils";
import JavContentTitle from "../../../../Shared/Components/JavContentTitle";

const BeneficiaryLayoutRoute2 = ({ questions, pageNum, totalPages, type, setIndexValue, indexValue, setClose}) => {
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

    const nextSlide = () => {
        let newIndex = indexValue
        newIndex = newIndex + 1
        setIndexValue(newIndex)
    }
    
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
            nextSlide()

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
           dispatch(addBeneficiary2(details, history, type, setClose))
        }
    }


    return (
        <Content>
            
                <div style={{ textAlign: "right" , fontSize: "30px", fontWeight: "bold", paddingRight: "50px"}}>
                    {pageNum}/{totalPages}
                </div>
                <div className={Styles.cardContainer}>
                    
                <div style={{width: "100%"}} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex",flexDirection: "column" }}>
                            <>
                                
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="form_in_modal"
                                    style={{ width: "100%" }}
                                    onFinish={onFinish}
                                    initialValues={details}
                                >

                                    <div style={{ width: "100%", padding: "0 3em", display: "flex", justifyContent: "center", flexDirection: "column" }}  className={Styles.sectionBox}>
                                        <JavContentTitle title={"Beneficiary Information"} />
                                        
                                        {
                                            loading ?
                                                <SkeletonLoader num={5} /> : (
                                                    <Row style={{marginTop: "2em"}} gutter={[32,16]}>
                                                    <DynamicForms form={form} data={questions} />

                                                    </Row>
                                                )
                                        }

                                    </div>
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                            <Button
                                                type="primary"
                                                shape="round"
                                                htmlType="submit"
                                                size="large"
                                                style={{width: "400px"}}
                                                loading={addLoading}
                                            >
                                                Continue
                                            </Button>
                                    </div>

                                </Form>

                            </>

                        </div>
                    </div>
                </div>
        </Content>  
    );
}



export default BeneficiaryLayoutRoute2