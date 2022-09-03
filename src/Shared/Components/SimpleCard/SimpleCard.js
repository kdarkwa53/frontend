import { Link } from "react-router-dom"
import { ArrowRightIcon } from "../JavIcons"
import Styles from "./SimpleCard.module.css"

const SimpleCard = ({ icon, label, link, msg, ...rest }) => {

    return (

        <Link {...rest}  to={link}>
            <div className={Styles.card}>
                <div className={Styles.iconBg}>
                    <div className={Styles.icon}>
                        {icon}
                    </div>
                </div>
                <div className={Styles.textArea}>
                    <div className={Styles.labelDiv}>
                        {label}
                    </div>
                    <div className={Styles.subText}>
                        {msg}
                    </div>
                </div>
                <div className={Styles.arrow}>
                    <ArrowRightIcon width="2em" height="2em" color="black" />
                </div>
            </div>
        </Link>
    )
}

export default SimpleCard