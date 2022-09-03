import { Row } from 'antd';
import Styles from "../Dashboard/Dashboard.module.css"
import JavProductCard from '../../Shared/Components/Products/JavProductCard';

import Credit from "../../assets/tax.png"
import Payments from "../../assets/payments.png"
import CardIcon from "../../assets/credit.png"
// import BitcoinIcon from "../../assets/bitcoin.png"
import Tax from "../../assets/tax-img.png"
import SimpleCard from '../../Shared/Components/SimpleCard/SimpleCard';
import { SendMoneyIcon, DepositIcon, MobileAirtimeIcon, TransferIcon } from "../../Shared/Components/JavIcons"
import BannerCrypto from '../../Shared/Components/WelcomeCard/BannerCrypto';
import { useSelector } from 'react-redux';




const BusinessProducts = () => {
    const text = useSelector((state) => state?.language)

    return (

        <div >
            <Row >
                {/* <a ref="noreferrer" ></a> */}
                <BannerCrypto />
            </Row>
            <div className={Styles.titleRow}>
                <div className={Styles.secTitle}>{text.PRODUCTS}</div>
            </div>
            <div className={Styles.products}>
                <JavProductCard subTitle={text.PAYMENT_SENDMONEY} link={'/business/payments'} icon={Payments} color="linear-gradient(90deg, #834D9B 0%, #D04ED6 100%)" />
             </div>
            <div className={Styles.titleRow}>
                <div className={Styles.secTitle}>{text.SERVICES}</div>
            </div>
            <div className={Styles.products}>
                <div className={Styles.servCard}>
                    <SimpleCard
                        icon={<DepositIcon width="1.5em" height="1.5em" color="#0032A0" />}
                        link="/fund-wallet"
                        label={text.FUND_MY_WALLET}
                        msg={text.FUND_MY_WALLET_MSG}
                    />
                </div>
                <div className={Styles.servCard}>
                    <SimpleCard
                        icon={<TransferIcon width="1.5em" height="1.5em" color="#0032A0" />}
                        link="/transfer"
                        label={text.TRANSFER_MONEY}
                        msg={text.TRANSFER_MONEY_MSG}
                    />
                </div>
                <div className={Styles.servCard}>
                    <SimpleCard
                        icon={<SendMoneyIcon width="1.5em" height="1.5em" color="#0032A0" />}
                        link="/"
                        label={text.FOREIGN_EXCHANGE}
                        msg={text.FOREIGN_EXCHANGE_DESC}
                    />
                </div>  
            </div>


        </div>
    )
};

export default BusinessProducts