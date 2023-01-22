
import { Modal, Button, Tag } from "antd";
import React from "react"
import { useSelector } from "react-redux";
import { currencyFormat } from "../../helpers/utils";
import JavContentTitle from "../../Shared/Components/JavContentTitle";
import Styles from "../../Shared/Components/ReviewPopUp//ReviewPopUp.module.css"
import PendingActionTag from "./PendingActionTag"


const ViewPendingTransDetails = ({ setReview, showReview, details }) => {

    const text = useSelector((state) => state.language)

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
                        <div className={Styles.secTitle}>{text["Review Pending Transaction"]}</div>
                        {/* <div className={Styles.secSubTitle}>Review Transaction</div> */}
                        <div onClick={handleCancel} className={Styles.cancel}>
                            {text["cancel"]}
                        </div>
                        {/* <div className={Styles.close} >x</div> */}
                    </div>
                    <div className={Styles.contentArea}>
                        <JavContentTitle title="Transaction Made by" />
                        <div className={Styles.rowGrid2} >
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["User name"]}
                                </div>
                                <div className={Styles.ans}>
                                    {details?.business?.full_name}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Role"]}
                                </div>
                                <div className={Styles.ans}>
                                    {details?.business?.is_parent ? "Super Admin" : details?.business?.role}
                                </div>
                            </div>

                        </div>
                        <JavContentTitle title={text["Beneficiary account"]} />

                        <div className={Styles.rowGrid} >
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Account Name"]}
                                </div>
                                <div className={Styles.ans}>
                                    {details ? details?.beneficiary[0]?.name : ""}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Account Number"]}
                                </div>
                                <div className={Styles.ans}>
                                    {details ? details?.beneficiary[0]?.account_number : ""}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Bank name"]}
                                </div>
                                <div className={Styles.ans}>
                                    {details ? details?.beneficiary[0]?.bank_name : ""}
                                </div>
                            </div>
                        </div>

                        <JavContentTitle title={text["Source account"]} />

                        <div >
                            <div className={Styles.detailsTitle}>{text["Source account"]}</div>

                            <div className={Styles.receiverContent}>
                                <div className={Styles.contentRow}>
                                    <div className={Styles.recTitle}>
                                        {details?.wallet[0] ?
                                            (
                                                <> {details?.wallet[0]?.name} <span style={{ marginLeft: "3em", color: "blue" }}>{details?.wallet?.account_number ? details?.wallet?.account_number : ""}</span></>

                                            )
                                            :
                                            "ENTERNAL_WIRE"
                                        }
                                    </div>
                                    <div style={{ marginTop: "0.2em" }} className={Styles.recSubTitle}>
                                        {details?.wallet[0] ? (
                                            <>
                                                {`${currencies[details?.transaction?.currency_id]?.ISO} ${details?.wallet[0]?.current_balance}`}
                                            </>
                                        ) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Initial Trans. Amount"]}
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.order[0]?.sender?.currency} ${currencyFormat(details?.transaction?.amount)}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Trans. Fee"]}
                                    Trans. Fee
                                </div>
                                <div className={Styles.ans}>
                                    {`${details?.order[0]?.sender?.currency} ${currencyFormat(Number(details?.transaction?.fee).toFixed(2))}`}
                                </div>
                            </div>
                            <div>
                                <div className={Styles.detailsTitle}>
                                    {text["Selling Amount"]}
                                </div>
                                <div className={Styles.ans}>
                                {`${details?.order[0].sender?.currency} ${currencyFormat(details?.transaction?.amountAndFee)}`}
                                    {/* {`${currencies[details?.transaction?.currency_id]?.ISO} ${currencyFormat(Number(details?.fee?.amount_payable).toFixed(2))}`} */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={Styles.detailsTitle}>
                                Amount Purchase
                            </div>
                            <div className={Styles.ansRed}>
                                {`${details?.order[0].recipient?.currency} ${currencyFormat(details?.order[0].recipient?.amount)}`}
                            </div>
                        </div>
                    </div>




                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "1em 2em" }}>

                    <PendingActionTag closeModal={setReview} action={"approve"} styles={{ fontSize: "17px", textAlign: "center", width: "300px" }} id={details?.id} />
                    <PendingActionTag closeModal={setReview} action={"decline"} styles={{ fontSize: "17px", textAlign: "center", width: "300px" }} id={details?.id} />

                </div>

            </div>

        </Modal>
    )
}

export default ViewPendingTransDetails