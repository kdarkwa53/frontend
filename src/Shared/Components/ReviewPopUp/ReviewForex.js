
import { Modal, Button } from "antd";
import React from "react"
import Styles from "./ReviewPopUp.module.css"
import logo from "../../../assets/javWallet.png"
import { XIcon } from "../JavIcons";
import { currencyFormat } from "../../../helpers/utils";
import JavContentTitle from "../JavContentTitle";



const ReviewPopUpInt = ({ setReview, showReview, details, setPasscode }) => {
    console.log('de: ', details)

    const handleCancel = () => {
        setReview(false);
    };
    const onContinue = () => {
        handleCancel()
        setPasscode(true)
    }

    console.log(details?.fee?.fee)
    return (
        <Modal
            visible={showReview}
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
                        <div className={Styles.secTitle}>Review Transaction</div>
                        {/* <div className={Styles.secSubTitle}>Review Transaction</div> */}
                        <div onClick={handleCancel} className={Styles.cancel}>
                            cancel
                        </div>
                        {/* <div className={Styles.close} >x</div> */}
                    </div>
                    <div className={Styles.contentArea}>
                    <JavContentTitle title={details?.to?.msg} />
                    <div className={Styles.rowGrid} >
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Account name
                                </div>
                                <div className={Styles.ans}>
                                  {details?.to?.title}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Account number
                                </div>
                                <div className={Styles.ans}>
                                {details?.to?.subTitle}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    Bank name 
                                </div>
                                <div className={Styles.ans}>
                                    {details?.to?.bank_name}
                                </div>
                            </div>
                        </div>
                    <JavContentTitle title={details?.from?.msg} />
                    <div >
                        <div className={Styles.detailsTitle}>{details?.from?.msg}</div>

                        <div className={Styles.receiverContent}>
                            <div className={Styles.contentRow}>
                                <div className={Styles.recTitle}>
                                    {details?.from?.title} <span style={{marginLeft: "3em", color:""}}>{details?.from?.acc_num ? details?.from?.acc_num : ""}</span>
                                </div>
                                <div style={{marginTop: "0.2em"}} className={Styles.recSubTitle}>
                                    {details?.from?.subTitle} 
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
                                    {`${details?.from?.currency} ${currencyFormat(details?.info?.amount)}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                Trans. Fee
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.from?.currency} ${currencyFormat(Number(details?.fee?.fee).toFixed(2))}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                Selling Amount
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.from?.currency} ${currencyFormat(Number(details?.fee?.amount_payable).toFixed(2))}`}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={Styles.detailsTitle}>
                                Amount Purchase
                            </div>
                            <div className={Styles.ansRed}>
                                {`${details?.settlement?.currency} ${currencyFormat(details?.settlement?.amount)}`}
                            </div>
                        </div>
                    </div>
                    
                  
                   

                </div>
                <Button
                    block
                    size="large"
                    style={{ maxWidth: "400px", margin: "auto", textAlign: "center", paddingBottom: "2em" }}
                    type="primary"
                    shape="round"
                    onClick={onContinue}
                >
                    {details.action}
                </Button>
            </div>

        </Modal>
    )
}

export default ReviewPopUpInt