

import { useHistory } from "react-router"
import Styles from "./../Dashboard.module.css"

const DashboardTitleRow = ({title, action, link})=>{

    const history= useHistory()

    const handLinkClick = ()=>{
        history.push(link)
    }

    return(
        <div className={Styles.titleRow}>
            <div className={Styles.secTitle}>{title}</div>
            <div onClick={handLinkClick} className={Styles.viewLink}> {action}</div>
        </div>
    )
}

export default DashboardTitleRow