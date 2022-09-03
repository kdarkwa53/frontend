

import { Layout, Col } from 'antd';
import { useHistory } from 'react-router';
import { MortgageIcon, MicroLoansIcon,  } from "../../Shared/Components/JavIcons"
import PaymentOptionCard from "../../Shared/Components/PaymentOptionCard"
import Styles from "../TransferMoney/TransferMoney.module.css"


const JavolinLoans = () => {

    const history = useHistory()
    const { Content } = Layout;
    return (

        // <Content style={{
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        // }} >

          <Content>
            <div className={Styles.card}>
                <div className={Styles.cardTitle}>
                    <div>
                        <span className={Styles.titleCard}>Loans </span>
                    </div>
                </div>
                <div className={Styles.cardContainer}>
                    <Col xs={24} sm={24} md={12} lg={15} xl={15} className={Styles.cardContent}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>

                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <PaymentOptionCard onClick={() => history.push("/apply")} icon={<MortgageIcon width="30px" />} label={"Mortgage"} />
                    <PaymentOptionCard icon={<MicroLoansIcon width="30px" />} msg="coming soon" label={"Personal Loans"} />
                    {/* <PaymentOptionCard icon={<TraderLoansIcon color="#FC9438" width="30px" he />} label={"Trader loans"} /> */}
                </div>

                        </div>
                    </Col>
                </div>
            </div>
        </Content>

            // <Col xs={24} sm={24} md={12} lg={9} xl={9} className="cardContent">
            //     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2em" }}>
            //         <div style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
            //             <RightArrow width="15px" />
            //         </div>
            //         <div style={{ fontSize: "25px", fontWeight: "500" }}>
            //             Apply for loan
            //         </div>
            //     </div>
            //     <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            //         <PaymentOptionCard onClick={() => history.push("/preq")} icon={<MortgageIcon width="30px" />} label={"Mortgage"} />
            //         <PaymentOptionCard icon={<MicroLoansIcon width="30px" />} label={"Personal Loans"} />
            //         <PaymentOptionCard icon={<TraderLoansIcon color="#FC9438" width="30px" he />} label={"Trader loans"} />
            //     </div>
            // </Col>
        // </Content>
    )
};

export default JavolinLoans