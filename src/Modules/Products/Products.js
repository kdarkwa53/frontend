import { Row } from 'antd';
import Styles from "../Dashboard/Dashboard.module.css"
import JavProductCard from '../../Shared/Components/Products/JavProductCard';

import Credit from "../../assets/tax.png"
import CardIcon from "../../assets/credit.png"
// import BitcoinIcon from "../../assets/bitcoin.png"
import Tax from "../../assets/tax-img.png"
import SimpleCard from '../../Shared/Components/SimpleCard/SimpleCard';
import { SendMoneyIcon, DepositIcon, MobileAirtimeIcon, TransferIcon } from "../../Shared/Components/JavIcons"
import BannerCrypto from '../../Shared/Components/WelcomeCard/BannerCrypto';
import { useSelector } from 'react-redux';




const Products = () => {
    const text = useSelector((state) => state?.language)

    return (

        <div >
            <Row >
                {/* <a ref="noreferrer" ></a> */}
                <BannerCrypto/>
            </Row>
            <div className={Styles.titleRow}>
                <div className={Styles.secTitle}>{text.PRODUCTS}</div>
            </div>
            <div className={Styles.products}>
                <JavProductCard link="/prepaid/apply/1" title={text.CARD} subTitle={text.CARD_DESC} icon={CardIcon} action="apply now" color="linear-gradient(90deg, #396AFC 0%, #2948FF 100%)" />
                {/* <JavProductCard title="INVESTMENT" subTitle="Cryptocurrency" icon={BitcoinIcon} action="coming soon" color="linear-gradient(90deg, #834D9B 0%, #D04ED6 100%)" /> */}
                <JavProductCard title={text.LOAN} link="/loans" subTitle={text.LOAN_DESC} icon={Credit} action={text.APPLY_NOW} color="linear-gradient(90deg, #516B8B 0%, #056B3B 100%)" />
                <JavProductCard title={text.PAYMENTS} subTitle={text.GOV_FEE} icon={Tax} link="/government-services" action="apply now" color="linear-gradient(90deg, #FF512F 0%, #DD2476 100%)" />
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
                        icon={<SendMoneyIcon width="1.5em" height="1.5em" color="#0032A0" />}
                        link="/send-money"
                        label={text.SEND_MONEY}
                        msg={text.SEND_MONEY_MSG}
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
                        icon={<MobileAirtimeIcon width="1.5em" height="1.5em" color="#0032A0" />}
                        link="/transfers/airtime"
                        label={text.BUY_AIRTIME}
                        msg={text.BUY_AIRTIME_DESC}
                    />
                </div>
            </div>
            
          
        </div>
    )
};

export default Products