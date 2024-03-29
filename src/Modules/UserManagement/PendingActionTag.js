import { Spin, Tag } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { getTransactions } from "../Savings/duck/action"
import { approveTransaction, declineTransaction, getPendingTransactions } from "./duck/action"
import Styles from "./UserMgt.module.css"



const PendingActionTag = ({action, id, closeModal, styles})=>{
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const text = useSelector((state) =>state.language)

    useEffect(()=>{
        dispatch(getPendingTransactions())
        dispatch(getTransactions())
    }, [dispatch])
    const handleClick=(id)=>{
        if(action === "approve"){
            setLoading(true)
            dispatch(approveTransaction(id)).then(()=>{
                setLoading(false)
                if(closeModal){
                    closeModal(false)
                }
            }).catch((e)=>{
                setLoading(false)
            })
        }else{
            setLoading(true)
            dispatch(declineTransaction(id)).then(()=>{
                if(closeModal){
                    closeModal(false)
                }
                setLoading(false)
            }).catch((e)=>{
                setLoading(false)
            })
        }
    }
    return(
        <Tag onClick={()=>handleClick(id)}  className={`${Styles.javTag} ${action === "action"? "actionBtn": "declineBtn"}`} 
        
        style={{
            padding: "10px",
            color: action==="approve"? '#008000': "#FF0000",
            cursor:"pointer",
            ...styles
            
            
            }} 
            color={action==="approve"? "#E0FFE0" : "#FFE0E0"}
            >
            <Spin spinning={loading}/>
            {text[action]}
        </Tag>
    )
}

export default PendingActionTag