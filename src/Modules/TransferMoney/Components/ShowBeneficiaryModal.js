import { Avatar, Button, Modal } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { XIcon } from "../../../Shared/Components/JavIcons"
import Styles from "../../../Shared/Components/Menu/Menu.module.css"
import { getBeneficiaries } from "../duck/action"




const ShowBeneficiaryModal = ({ isVisible, setIsModalVisible})=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBeneficiaries())
    },[dispatch])
    
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const history = useHistory()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClick = ()=>{
        setIsModalVisible(false)
       history.push('/business/pre-rules')
    }

    const bene = useSelector((state) => state?.transfer?.beneficiaries)
  
    return(
        <>
            <div onClick={showModal} className="playBtn" >
            </div>
            <Modal
                visible={isVisible}
                onCancel={handleCancel}
                footer={false}
                centered
                closeIcon={
                    <div className="circle-close">
                        <XIcon width="1em" height="1em" />
                    </div>
                }
                style={{ width: "900px", maxHeight: "500px"}}
            >
                {/* <p className={'subtitle'}>
                    Answer these questions to cemplete transfer
                </p> */}
                <div className="subTitle">
                    Who are you sending to?
                </div>
                <div style={{maxHeight:"300px", overflow: "scroll"}}>
                    {bene ?
                        Object.values(bene)?.map((item) => {
                            let n = item.name.split(" ")
                            return (
                                <div key={item?.id} className={Styles.fundSourceCard}>
                                    <Avatar style={{ margin: "0 2em", background: '#F6F6F9', color: "#6D689A" }}>
                                        {`${n[0]?.substring(0, 1)}${n[1]?.substring(0, 1)}`}
                                    </Avatar>
                                    <div>
                                        <div className={Styles.fsName}>{item?.name}</div>
                                        <div className={Styles.fsAccount}>{item?.account_number}</div>
                                    </div>
                                </div>
                            )
                        }) :
                        <div style={{ textAlign: "center", marginTop: "2em" }} >
                            No beneficiary added
                        </div>

                    }
                </div>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    style={{marginTop: "2em"}}
                    onClick={handleClick}
                >
                    Add new beneficiary
                </Button>
                
            </Modal>
        </>
    )
}

export default ShowBeneficiaryModal