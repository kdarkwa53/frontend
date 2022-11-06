import NewWallet from "../../../Modules/Wallet/NewWallet"
import WalletCard from "../WalletCard/WalletCard"
import Styles from "./DashboardWalletSection.module.css"


const DashboardWalletSection = ({ default_wallet }) => {

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
                <NewWallet />

            </div>
        </div>
    )

}


export default DashboardWalletSection