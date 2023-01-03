import { Button, Modal } from "antd"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { bookRate } from "../../../../../Modules/TransferMoney/duck/action";
import { XIcon } from "../../../JavIcons";
import Styles from "../../../Menu/Menu.module.css"



const BookDealPopUp = ({disableContinue, rate, reset})=>{

    const [isVisible, setVisible] = useState(false)
    const [deal, setDeal] = useState(false)
    const bookingRate = useSelector((state) => state?.transfer?.bookingRate)
    const history = useHistory()
    const text = useSelector((state) => state?.language)

    const dispatch = useDispatch()

    console.log("rate in pop: ",rate)

    const handleInstructDeal = ()=>{
        history.push({
            pathname: "/business/instruct-forex",
            state: {
                rate: rate,
                deal: deal
            }
        })
    }
    const handleProceedBooking = ()=>{
        
        dispatch(bookRate(
            {
                "quote_id": rate?.quoteId,
            }
        )).then((val) => {
            reset()
            setDeal(val?.response)
            
            setVisible(true)
    })
}

   
    
      const handleCancel = () => {
        setVisible(false);
      };

    return(
        <>
        <Button
            block
            type="primary"
            size="large"
            shape="round"
            disabled={disableContinue}
            loading={bookingRate}
            onClick={handleProceedBooking}
            >
                {text["book rate"]}
        </Button>
        <Modal  open={isVisible} onCancel={handleCancel}
        footer={false}
        centered
        closeIcon={
            <div className="circle-close">
                <XIcon width="1em" height="1em" />
            </div>
        }
        bodyStyle={
            {
                padding: 0,
                border: "16px 16px 0 0"
            }
        }

        width="700px"
        >  
            <div className={Styles.jav_modal_header}>
                        <div className={Styles.jav_modal_secTitle}>Deal Booked</div>
                </div>

                <div style={{display: "flex", padding: "2em 1em", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <p>Your deal has been booked. Your deal number is <span style={{color: "red"}}>{deal?.orderNumber}</span> </p>
           
                    <Button
                    block
                    type="primary"
                    size="large"
                    shape="round"
                    style={{maxWidth: "400px"}}
                    onClick={handleInstructDeal}
                    >
                        Instruct this deal
                </Button>

                </div>

                
         </Modal>
        </>
        
    )

}


export default BookDealPopUp