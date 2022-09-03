import { Tag } from "antd"
import { useState } from "react"



const RoleItem = ({name})=>{

    const [select, setSelect] = useState(false)

    const handleClick = ()=>{
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
        <Tag style={select ? { ...selectStyle.clicked } : { ...selectStyle.default }} onClick={handleClick} color={select ? '#D4DFF7': '#EBEDF1'} key={name}>
            {name}
        </Tag>
    )
}


export default RoleItem