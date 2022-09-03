
import { Select, Form, Button } from 'antd';
import { useEffect, useState } from 'react';
import Styles from "./../TransferMoney.module.css"
import "../../../Shared/Components/Accounts/JavolinAccounts.css" 
import { useDispatch, useSelector } from 'react-redux';
import { getBeneficiaries, } from "./../duck/action"



import {
    PlusCircleOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import { showErrorNotification } from '../../../Shared/actions/alert.actions';





const InternationalBankTransferForm = ({ type})=>{
    const sel = { title: "selectedCard", lineHeight: "cardLeftHemSelected" }
    const busKYC = useSelector((state) => state?.user?.business_kyc)

    const {Option} = Select
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBeneficiaries())
    }, [dispatch])

    const state = useSelector((state) => state?.transfer?.beneficiaries)
    const [selectedBene, setSelectedBene] = useState('')

    const history = useHistory()




    const handleChangeBeneList =(id)=>{
        if(id === 'new'){
            if(busKYC){
                return history.push({
                    pathname: '/business/pre-rules',
                    state: {type: type}
                })
            }else{
                console.log('here')
                const btn = (<Button type="primary" size="small" onClick={() => history.push('/business/compliance')}>
                    Complete KYC
                </Button>)
                    dispatch(showErrorNotification('You need to complete the KYC before', "", "top", 600, btn))
            }
         
        }
        setSelectedBene(state[id])
    }
 

    
   const beneficiaries = state ? state : {}
   return(
        <>
            <div className={Styles.itemRow}>
                <div className={Styles.inputLabel}>{ type === "forex" ? 'Select Account': 'Select Beneficiary'}</div>
                <div className={Styles.inputContainer}>

                <Form.Item
                    
                    name={"beneficiary_account"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                <Select onChange={handleChangeBeneList} size="large" className="c_select" style={{ width: "100%" }}  placeholder={ type === "forex" ? 'Select Account': 'Select Beneficiary'}>
                            <Option value='new' > <PlusCircleOutlined/> { type === "forex" ? 'Add Account': 'Add New Beneficiary'}</Option>
                {Object.values(beneficiaries)?.map((bene) => { 
                    return ( 
                        <Option key={bene?.id}>
                        <div className={`cardTile ${sel.title}`}>
                            <div className="cardLeftHem">
                                    <div className={`cardName ${sel.lineHeight}`} >{bene?.name}</div>
                            </div>
                            <div className="cardRightHem">
                                <div className="accountNumber">
                                    {bene?.account_number ? bene?.account_number : ""}
                                </div>
                                <div className="cardDesign">
                                </div>
                            </div>
                        </div>
                    </Option>
                        ) 
                     })}
                </Select>
                </Form.Item>
            </div>
            </div>
        </>
    )
}


export default InternationalBankTransferForm