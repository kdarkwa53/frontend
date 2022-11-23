



import Styles from "../../Modules/TransferMoney/TransferMoney.module.css"




const JavContentTitle = ({title}) => {
    return (
        <div className={Styles.javSpecialRow}>
            <div className={Styles.javRowTitle}>{title}</div>
            <div className={Styles.secRow}>
                <div className={Styles.circle}></div>
                <div className={Styles.sectionB}></div>
            </div>
        </div>
    )
}
export default JavContentTitle