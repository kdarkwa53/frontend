import { ArrowRightIcon } from "../JavIcons"
import Styles from "./EditCard.module.css"

const EditCard = ({ icon, label, background, link, ...rest }) => {

    return (

        <div {...rest} style={{ background: background }} className={Styles.card}>
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
                </div>
            </div>
            <div className={Styles.arrow}>
                <ArrowRightIcon width="2em" height="2em" color="black" />
            </div>
        </div>
    )
}

export default EditCard