import { Tag } from "antd"
import { useState } from "react"



const RoleItem = ({perm, allPerm, selectedPerm, setSelectedPerm})=>{
    const [select, setSelect] = useState(allPerm? allPerm.includes(perm.id): null)
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
            color: '#FFFFFF',
            marginTop: "5px",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "1px solid #3DA31F",
            background: "#3DA31F"
        },
        default:{
            color: '#000C26',
            marginTop: "5px",
            padding: "10px",
            cursor: "pointer"
        }
    }
    return (
        <Tag style={select ? { ...selectStyle.clicked } : { ...selectStyle.default }} onClick={()=>handleClick(perm.id)} color={select ? '#D4DFF7': '#ECF7E8'} key={perm?.id}>
            {perm?.name}
        </Tag>
    )
}


export default RoleItem