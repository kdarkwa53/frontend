import React, { useState } from "react";

import { Steps, Button, Layout, Form, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import validateMessages from "../../../helpers/validateMessages"
import { useDispatch, useSelector } from "react-redux";
import Styles from "./BusinessKYCForm.module.css"
import {
    showErrorNotification,
} from "../../../Shared/actions/alert.actions";
import KYCSider from "../Components/KYCSider";
import ClientInformation from "./ClientInformation";
import UserRoles from "./UserRoles";
import Ownership from "./Ownership";
import DirectorInformation from "./DirectorInformation";
import BankSettlement from "./BankSettlement";
import ForeignExchange from "./ForeignExchange";
import Authorization from "./Authorization";
import { saveKCYValues } from "../duck/action";
import { user } from "../../../helpers/contants";
// import { submitMortgageApplication } from "../duck/action"



const { Step } = Steps;
const { Content } = Layout;



const BusinessKYCForm = (props) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const kycValues = useSelector((state) => state.kyc.values)


    
   


    const [formValues, setFormValues] = useState({
        user_roles:[]
    });

  
    const next = () => {
        scrollToTop()
        setCurrent(current + 1);
    };

   

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        window.scrollTop = 0;
    }
    const onFinish = (values) => {
       
        next()
    };

    const onFinishFailed = (errorInfo) => {
        dispatch(showErrorNotification("Action Failed", "Some required fields are empty"))
    };

    const steps = [
        {
            id: 0,
            title: "Client Information",
            content: <ClientInformation form={form} formValues={formValues}  setFormValues={setFormValues}/>,
        },
        {
            id: 1,
            title: "Users Roles &  Permissions",
            content: <UserRoles form={form} formValues={formValues} setFormValues={setFormValues} />,
        },
        {
            id: 2,
            title: "Ownership",
            content: <Ownership form={form} formValues={formValues} setFormValues={setFormValues} />,
        },
        {
            id: 3,
            title: "Directors & Appointed Officers",
            content: <DirectorInformation form={form} formValues={formValues} setFormValues={setFormValues} />,
        },
      
        {
            id: 4,
            title: "Banking & Settlement",
            content: <BankSettlement form={form} formValues={formValues} setFormValues={setFormValues} />,
        },
        {
            id: 5,
            title: "Foreign Exchange & Payments",
            content: <ForeignExchange form={form} formValues={formValues} setFormValues={setFormValues} />,
        },
        {
            id: 6,
            title: "Authorization & Certfication",
            content: <Authorization form={form} formValues={formValues} setFormValues={setFormValues}/>,
        },
    ];

    const onChange = (value) => {
        setCurrent(value);
    };
    return (
        <>
              
                {/* <Content
                    style={{
                        minHeight: 300,
                        padding: "50px",
                        margin: "1em",
                        backgroundColor: "white",
                    }}
                > */}
                    <div className={Styles.card}>
                            <div className={Styles.kyccardTitle}>
                                <div>
                                    <span className={Styles.titleCard}>Forex</span>
                                </div>
                            </div>
                <div className={Styles.pageContainer}>
                    {/* <div className={Styles.sider}>
                        <KYCSider steps={steps} onChange={onChange} current={current} />
                    </div> */}
                    <div className={Styles.mainContainArea}>
                        {/* <Steps className={Styles.steps} responsive="true" current={current} onChange={onChange}>
                            {steps.map((item) => (
                                <Step key={item.title}  />
                            ))}
                        </Steps> */}

                        <Steps
                            type="navigation"
                            current={current}
                            onChange={onChange}
                            className="site-navigation-steps"
                            items={steps}
                            style={{ overflowX: "scroll", marginLeft: "1em" }}
                            responsive
                        />
                        
                            <Form
                                form={form}
                                name="dynamic_form_nest_item"
                                layout="vertical"
                                onFinish={onFinish}
                                validateMessages={validateMessages}
                                onFinishFailed={onFinishFailed}
                                initialValues={kycValues}
                                
                            >
                                {/* <div >
                                    <Button type="primary">
                                        Save
                                    </Button>
                                    <Button htmlType="submit" loading={loading} onClick={showConfirm} >Save and Continue later</Button>
                                </div> */}
                                <div className={Styles.formArea}>
                                    {steps[current].content}
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </div>
               
                {/* </Content> */}
        </>
    );
};

export default BusinessKYCForm;
