
import { Modal, Button, Tag } from "antd";
import React from "react"
import { useSelector } from "react-redux";
import { currencyFormat } from "../../helpers/utils";
import JavContentTitle from "../../Shared/Components/JavContentTitle";
import Styles from "../../Shared/Components/ReviewPopUp//ReviewPopUp.module.css"
import PendingActionTag from "./PendingActionTag"


const ViewPendingTransDetails = ({ setReview, showReview, details }) => {

    let currencies = useSelector((state) => state?.resources?.defaultCurrencies)
    const handleCancel = () => {
        setReview(false);
    };
    const onContinue = () => {
        handleCancel()
    }



    return (
        <Modal
            open={showReview}
            style={{ top: 100 }}
            footer={false}
            closable={false}
            onCancel={handleCancel}
            width={795}


            bodyStyle={
                {
                    padding: 0
                }
            }
        >


            <div className={Styles.reviewCard}>
                <div>
                    <div className={Styles.header}>
                        <div className={Styles.secTitle}>Review Pending Transaction</div>
                        {/* <div className={Styles.secSubTitle}>Review Transaction</div> */}
                        <div onClick={handleCancel} className={Styles.cancel}>
                            cancel
                        </div>
                        {/* <div className={Styles.close} >x</div> */}
                    </div>
                    <div className={Styles.contentArea}>
                    <JavContentTitle title="Transaction Made by" />
                    <div className={Styles.rowGrid2} >
                            <div>
                                <div className={Styles.detailsTitle}>
                                    User name
                                </div>
                                <div className={Styles.ans}>
                                {details?.business?.full_name}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Role
                                </div>
                                <div className={Styles.ans}>
                                    {details?.business?.is_parent? "Super Admin": details?.business?.role}
                                </div>
                            </div>

                    </div>
                    <JavContentTitle title={"Beneficiary account"} />
                    
                    <div className={Styles.rowGrid} >
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Account name
                                </div>
                                <div className={Styles.ans}>
                                {details ? details?.beneficiary[0]?.name : ""}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Account number
                                </div>
                                <div className={Styles.ans}>
                                {details ? details?.beneficiary[0]?.account_number: ""}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Bank name 
                                </div>
                                <div className={Styles.ans}>
                                {details ? details?.beneficiary[0]?.bank_name: ""}
                                </div>
                            </div>
                    </div>

                    <JavContentTitle title={"Source account"} />

                    <div >
                        <div className={Styles.detailsTitle}>Source account</div>

                        <div className={Styles.receiverContent}>
                            <div className={Styles.contentRow}>
                                <div className={Styles.recTitle}>
                                    {details?.wallet[0]?.name} <span style={{marginLeft: "3em", color:"blue"}}>{details?.wallet?.account_number ? details?.wallet?.account_number : ""}</span>
                                </div>
                                <div style={{marginTop: "0.2em"}} className={Styles.recSubTitle}>
                                    {`${currencies[details?.wallet[0]?.currency_id]?.ISO } ${details?.wallet[0]?.current_balance}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <div className={Styles.detailsTitle}>
                                Initial Trans. Amount
                                </div>
                                <div className={Styles.ans}>
                                    {`${currencies[details?.wallet[0]?.currency_id]?.ISO} ${currencyFormat(details?.transaction?.amount)}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                Trans. Fee
                                </div>
                                <div className={Styles.ans}>
                                    {`${currencies[details?.wallet[0]?.currency_id]?.ISO} ${currencyFormat(Number(details?.fee?.fee).toFixed(2))}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                Selling Amount
                                </div>
                                <div className={Styles.ans}>
                                    {`${currencies[details?.wallet[0]?.currency_id]?.ISO} ${currencyFormat(Number(details?.fee?.amount_payable).toFixed(2))}`}
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div className={Styles.detailsTitle}>
                                Amount Purchase
                            </div>
                            <div className={Styles.ansRed}>
                                {`${details?.settlement?.currency} ${currencyFormat(details?.settlement?.amount)}`}
                            </div>
                        </div> */}
                    </div>
                    
                  
                   

                </div>
                <div style={{ display:"flex", flexDirection: "row", justifyContent:"center", padding: "1em 2em" }}>

                <PendingActionTag closeModal={setReview} action={"approve"} styles={{fontSize: "17px", textAlign:"center",  width:"300px" }} id={details?.id}/>
                <PendingActionTag closeModal={setReview} action={"decline"} styles={{fontSize: "17px", textAlign:"center",  width:"300px" }} id={details?.id}/>

                </div>
               
            </div>

        </Modal>
    )
}

export default ViewPendingTransDetails