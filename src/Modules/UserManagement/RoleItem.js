import { Tag } from "antd"
import { useState } from "react"



const RoleItem = ({perm, selectedPerm, setSelectedPerm})=>{
    const [select, setSelect] = useState(false)

    const handleClick = (e)=>{
        if(e in selectedPerm){
            var perms = selectedPerm
            delete perms[e]
            setSelectedPerm(perms)
        }else{
        setSelectedPerm({
            ...selectedPerm,
            [e]:e
        })
        console.log(selectedPerm)
        }
        setSelect(!select)
    }

    const selectStyle = {
        tag: {
            marginTop: "5px", 
            padding: "10px"
        },
        clicked:{
            color: '#000C26',
            border: "1px solid #0032A0",
            marginTop: "5px",
            padding: "10px",
            cursor: "pointer"
        },
        default:{
            color: '#000C26',
            marginTop: "5px",
            padding: "10px",
            cursor: "pointer"
        }
    }
    return (
        <Tag style={select ? { ...selectStyle.clicked } : { ...selectStyle.default }} onClick={()=>handleClick(perm.id)} color={select ? '#D4DFF7': '#EBEDF1'} key={perm?.id}>
            {perm?.name}
        </Tag>
    )
}


export default RoleItem