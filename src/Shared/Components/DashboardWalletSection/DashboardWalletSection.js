import NewWallet from "../../../Modules/Wallet/NewWallet"
import WalletCard from "../WalletCard/WalletCard"
import Styles from "./DashboardWalletSection.module.css"
import {
    PlusCircleOutlined
} from '@ant-design/icons';

const DashboardWalletSection = ({ default_wallet }) => {

    const AddWalletButton = ({...rest})=>{
        return(
            <div {...rest}  className={Styles.dummyCon}>
                <div className={Styles.plusIcon}>
                <PlusCircleOutlined style={{color:"#0032A0"}} />
                </div>
                <div className={Styles.addNewText}>
                    Add Account
                </div>
            </div>
        )
    }

    return (
        <div className={Styles.d_wallet}>
            <div className={Styles.default_wallet}>
                <WalletCard
                    accountBalance={default_wallet?.current_balance}
                    accountNumber={default_wallet?.account_number}
                    currency_id={default_wallet?.currency_id}
                />
            </div>

            <div className={Styles.new_wallet}>
                <NewWallet/>

            </div>
        </div>
    )

}


export default DashboardWalletSection