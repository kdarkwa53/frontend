import { Layout, Col } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Styles from "../TransferMoney/TransferMoney.module.css"
import PrepaidPage1 from './Pages/PrepaidPage1';
import PrepaidPage2 from './Pages/PrepaidPage2';
import PrepaidPage3 from './Pages/PrepaidPage3';
import moment from 'moment';







const PrepaidApplication = (props) => {

    const { Content } = Layout;
    const state = useSelector((state)=>state.user)
    const dateFormat = 'YYYY-MM-DD';


    const { email, last_name, first_name, current_physical_address, phone_number, date_of_birth} = state
    

    const [details, setDetails] = useState({surname: last_name, first_name, middle_name: " ",
        
        address_info: {current_physical_address, 
            country: "Ghana"}, 
        occupational_info:{email,
            phone_number,
        },
        prepaid_card_type: "Visa",
        card_type: "Instant",
        identification_info: {
            country_issue: "Ghana"
        },
        birth_info: {
            date_of_birth: moment(date_of_birth, dateFormat)
        },})
    const onFinish = (values) => {
        // details = { ...details, ...values }
        setDetails(details)
    };


    const { id } = props.match.params
    const page = {
        1: <PrepaidPage1 details={details} setDetails={setDetails} />,
        2: <PrepaidPage2 details={details} setDetails={setDetails}/>,
        3: <PrepaidPage3 details={details} onFinish={onFinish} setDetails={setDetails} />
    }

   
    return (
        <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>PREPAID CARD APPLICATION</span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                           
                            {page[id]}
                        </div>
                    </Col>
                </div>
            </div>
        </Content>
    )
};

export default PrepaidApplication