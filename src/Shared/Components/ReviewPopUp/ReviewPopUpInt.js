
import { Modal, Button } from "antd";
import React from "react"
import Styles from "./ReviewPopUp.module.css"
import logo from "../../../assets/javWallet.png"
import { XIcon } from "../JavIcons";



const ReviewPopUpInt = ({ setReview, showReview, details, setPasscode }) => {

    const handleCancel = () => {
        setReview(false);
    };
    const onContinue = () => {
        handleCancel()
        setPasscode(true)
    }

    const curFormat = (value)=>{
        return `${Number(value).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    console.log(details?.fee?.fee)
    return (
        <Modal
            visible={showReview}
            style={{ top: 100 }}
            footer={false}
            closable={false}
            onCancel={handleCancel}
            width={643}


            bodyStyle={
                {
                    padding: 0
                }
            }
        >


            <div className={Styles.reviewCard}>
                <div>
                    <div className={Styles.header}>
                        <div className={Styles.secTitle}>Review</div>
                        <div onClick={handleCancel} className={Styles.circleClose}>
                            <XIcon width="1em" height="1em" />
                        </div>
                        {/* <div className={Styles.close} >x</div> */}
                    </div>
                    <div className={Styles.receiver}>
                        <div className={Styles.receiverTitle}>{details?.to?.msg}</div>
                        <div className={Styles.receiverContent}>
                            <div className={Styles.contentRow}>
                                <div className={Styles.ans}>
                                    {details?.to?.title}
                                </div>
                                <div style={{fontWeight: "bold", marginTop:"0.5em", fontSize: "17px"}} className={Styles.subAns}>
                                    {details?.to?.subTitle}
                                </div>
                            </div>

                            <div  className={Styles.account}>
                                {details?.to?.acc_num ? <div>{details?.to?.acc_num}</div> : ""}

                                {details?.to?.image_url ?
                                    <div><img src={details?.to?.image_url} width="50em" alt="card logo"></img></div> : ""
                                }
                                {/* <div>{details?.to?.image_url}</div> */}
                            </div>
                        </div>
                        <div className={Styles.contentRow}>

                            <div style={{fontWeight: "bold", marginTop:"0.5em", fontSize: "17px"}} className={Styles.subAns}>
                                {details?.to?.bank_name}
                            </div>
                        </div>

                    </div>
                    <div className={Styles.details}>
                        <div className={Styles.receiverTitle}>{details?.from?.msg}</div>

                        <div className={Styles.receiverContent}>
                            <div className={Styles.contentRow}>
                                <div className={Styles.ans}>
                                    {details?.from?.title}
                                </div>
                                <div className={Styles.subAns}>
                                    {details?.from?.subTitle}
                                </div>
                            </div>
                            <div className={Styles.account}>
                                {details?.from?.acc_num ? <div>{details?.from?.acc_num}</div> : ""}
                                {details?.from?.image_url ?
                                    // <div><img src={details?.from?.image_url ? details?.from?.image_url : logo} width="50em" alt="card logo"></img></div> : ""
                                    <div><img src={logo} width="50em" alt="card logo"></img></div> : ""

                                }
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    INITIAL TRANSACTION AMOUNT
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.from?.currency} ${curFormat(details?.info?.amount)}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    TRANSACTION FEE
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.from?.currency} ${curFormat(details?.fee?.fee)}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    AMOUNT PAYABLE
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.from?.currency} ${curFormat(details?.fee?.amount_payable)}`}
                                </div>
                            </div>
                        </div>
                        

                       
                        
                        <div>
                            <div className={Styles.detailsTitle}>
                                BENEFICIARY RECEIVES
                            </div>
                            <div className={Styles.ansRed}>
                                {`${details?.settlement?.currency} ${curFormat(details?.settlement?.amount)}`}
                            </div>
                        </div>

                    </div>
                </div>
                <Button
                    block
                    size="large"
                    style={{ maxWidth: "400px", margin: "auto", textAlign: "center", paddingBottom: "2em" }}
                    type="primary"
                    onClick={onContinue}
                >
                    {details.action}
                </Button>
            </div>

        </Modal>
    )
}

export default ReviewPopUpInt