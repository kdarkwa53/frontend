
import { Button, Modal } from "antd"
import { useHistory } from "react-router"
import { TickBold, XIcon } from "./JavIcons"
import Styles from "./Pin.module.css"
import Confetti from "../../assets/confetti.gif"


const SuccessTransaction = ({ titleT, msg, action, showSuccess, setShowSuccess, handleClick }) => {

    const handleCancel = ()=>{
        setShowSuccess(false)
    }

   
    return (
        <>
        <Modal
            visible={showSuccess}
            className={Styles.popupModals}
            footer={false}
            width={503}
            closable={true}
            centered
            closeIcon={
                <div className={Styles.circleClose}>
                    <XIcon width="1em" />
                 </div>
            }
            onCancel={handleCancel}
            bodyStyle={
                {
                    padding: "0"
                }
            }
        >
            <div className={[`${Styles.center}`]}>
                <div className={Styles.confettiSec}>
                    <img src={Confetti} alt="confetti" />
                </div>
                <h2 className={Styles.title}>{titleT}</h2>
                <p style={{ color: "#888B93", }} className="textCenter">
                    {msg}
                </p>
                <div
                className={Styles.actionBtn}
                 
                onClick={handleClick}
                >
                    {action}
                </div>
            </div>
        </Modal>
            
        </>
    )
}

export default SuccessTransaction