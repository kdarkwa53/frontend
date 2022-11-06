

import { Modal } from 'antd';
import JavLoading from "../../../assets/javLoader.gif"


const AwaitDepositApproval = ({ approving, showApproving }) => {

    const handleCancel = () => {
        showApproving(false)
    }
    return (
        <Modal
            visible={approving}
            onCancel={handleCancel}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "1em" }}>
                    Please follow the instructions below to complete your transaction
                </span>
                <li>
                    <ul>1. Dail *170# </ul>
                    <ul>2. Select option 6 (My Wallet)</ul>
                    <ul>3. Select option 3 (My Approvals)</ul>
                    <ul>4. Enter MOMO Pin to get Approvals list</ul>
                    <ul>5. Select the pending transaction and confirm authorization</ul>
                </li>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={JavLoading} alt="loading" />
            </div>

        </Modal>
    )
}

export default AwaitDepositApproval