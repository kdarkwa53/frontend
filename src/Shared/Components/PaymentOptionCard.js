import Styles from "./PaymentOptionCard.module.css"
import { ArrowRightIcon } from "./JavIcons"
import { Tag } from "antd"


const PaymentOptionCard = ({ icon, label, msg, ...props }) => {
    return (
        <a {...props} className={Styles.optionBox}>
            <div className={Styles.leftSide}>
                <div className={Styles.optionIcon}>
                    {icon}
                </div>
                <div className={Styles.optionLabel}>
                    {label}
                    {msg ?(
                        <span style={{marginLeft: "1em"}}>  <Tag color="magenta">
                            {msg}
                        </Tag> </span>
                    ): ""}
                    
                </div>
            </div>
            <div>
                <ArrowRightIcon width="1.5em" height="1.5em" color="#000000" />
            </div>
        </a>
    )
}

export default PaymentOptionCard