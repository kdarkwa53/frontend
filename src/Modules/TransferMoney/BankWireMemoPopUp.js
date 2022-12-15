


import { Button, Modal } from "antd"
import Styles from "../../Shared/Components/Menu/Menu.module.css"
import { XIcon } from "../../Shared/Components/JavIcons";
import JavContentTitle from "../../Shared/Components/JavContentTitle";
import { useSelector } from "react-redux";



const BankWireMemoPopUp = ({ isVisible, setVisible, reference }) => {



   const businessName = useSelector((state)=>state.user.business_name)


    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>

            <Modal open={isVisible} onCancel={handleCancel}
                footer={false}
                centered
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                bodyStyle={
                    {
                        padding: 0,
                        border: "16px 16px 0 0"
                    }
                }

                width="1000px"
            >
                <div className={Styles.jav_modal_header}>
                    <div className={Styles.jav_modal_secTitle}>Banks wire instructions</div>
                </div>

                <div style={{ display: "flex", padding: "2em 1em", flexDirection: "column", alignItems: "right", justifyContent: "center" }}>
                    <div>
                        <p>Dear valued customer,</p>
                        <p>To fund your account on Javolin via bank, you need to wire the money to either one of our bank accounts with details below: <span style={{ color: "red" }}>{reference}</span> </p>
                        <JavContentTitle title="Local Account" />
                        <p>Bank name: <span style={{ fontWeight: "bold" }}>ZENITH BANK GHANA</span> </p>
                        <p>Address: <span style={{ fontWeight: "bold" }}>Zenith Heights Accra</span> </p>
                        <p>Account  number: <span style={{ fontWeight: "bold" }}>6010101105</span> </p>
                        <p>Swift (optional): <span style={{ fontWeight: "bold" }}>ZEBLGHAC</span> </p>
                        <JavContentTitle title="International Account" />
                        <p>Bank name: <span style={{ fontWeight: "bold" }}>Barclays Bank PLC</span> </p>
                        <p>Address: <span style={{ fontWeight: "bold" }}>1 Churchill Place, London EC14 5HP</span> </p>
                        <p>Account  number: <span style={{ fontWeight: "bold" }}>74 8445 88</span> </p>
                        <p>Beneficiary: <span style={{ fontWeight: "bold" }}>Cambridge Mercantile Corp.
                            212 King Street West, Suite 400
                            Toronto, ON M5H 1K5</span> </p>
                            <p>IBAN #: <span style={{ fontWeight: "bold" }}>GB92 BARC 2000 0074 8445 88 </span> </p>
                        <p>Beneficiary Bank SWIFT : <span style={{ fontWeight: "bold" }}>BARCGB22</span> </p>
                        <p>Correspondent Bank SWIFT : <span style={{ fontWeight: "bold" }}>BARCGHAC </span> </p>
                        <p>Reference : <span style={{ fontWeight: "bold" }}>294901, {businessName} </span> </p>

                    </div>

                    <div width="100%" style={{ textAlign: "center" }}>
                        <Button
                            block
                            type="primary"
                            size="large"
                            shape="round"
                            onClick={handleCancel}
                            style={{ maxWidth: "400px" }}
                        >
                            Okay
                        </Button>
                    </div>


                </div>

            </Modal>
        </>

    )

}


export default BankWireMemoPopUp