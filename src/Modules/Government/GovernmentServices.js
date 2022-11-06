

import { Layout, Col } from 'antd';
import { useHistory } from 'react-router';
import { MortgageIcon, MicroLoansIcon, } from "../../Shared/Components/JavIcons"
import GovIcon1 from '../../assets/gov-image4.png'
import GovIcon2 from '../../assets/gov-image1.png'
import GovIcon3 from '../../assets/gov-image3.png'
import GovIcon4 from '../../assets/gov-image1-1.png'
import GovIcon5 from '../../assets/gov-image2.png'
import GovIcon6 from '../../assets/gov-image2-1.png'
import GovIcon7 from '../../assets/gov-image2-2.png'

import PaymentOptionCard from "../../Shared/Components/PaymentOptionCard"
import Styles from "../TransferMoney/TransferMoney.module.css"
import Circle from '../../Shared/Components/Circle/Circle';
import { useState } from 'react';
import UserTypePopUp from './UserTypePopUp';


const GovernmentServices = () => {
    const { Content } = Layout;
    const [isVisible, setVisible] = useState({show: false, name: ""})

    const handleClick = (name)=>{
        setVisible({show:true, name: name})
    }

    return (

        
        <Content>
            <UserTypePopUp setVisible={setVisible} name={isVisible.name} isVisible={isVisible.show}/>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Fees </span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>

                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                <PaymentOptionCard onClick={()=>handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#D9F2CE' radius='12px' ><img src={GovIcon1} alt="permit icon" /></Circle> } label={"Building permit fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#E0F3FF' radius='12px'><img src={GovIcon2} alt="permit icon" /></Circle>}  label={"License fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#FCF4E4' radius='12px'><img src={GovIcon3} alt="permit icon" /></Circle>} label={"Trader fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#E1D5EE' radius='12px'><img src={GovIcon4} alt="permit icon" /></Circle>} label={"Passport fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#D9F2CE' radius='12px'><img src={GovIcon5} alt="permit icon" /></Circle>} label={"Property fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#E0F3FF' radius='12px'><img src={GovIcon6} alt="permit icon" /></Circle>} label={"Telcom mast fees"} />
                                <PaymentOptionCard onClick={() => handleClick("Building permit fees")} icon={<Circle size={'50px'} color='#FCF4E4' radius='12px'><img src={GovIcon7} alt="permit icon" /></Circle>} label={"Bill board fees"} />
                            </div>

                        </div>
                    </Col>
                </div>
            </div>
        </Content>

       
    )
};

export default GovernmentServices