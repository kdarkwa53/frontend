import React from "react"
import {  normalizeIdArrayData } from "../../../../helpers/utils"
import DynamicForm from "./DynamicForm"




const DynamicForms = ({data, form}) => {
    let newData = normalizeIdArrayData(data)

    return (
        
     Object.values(data).map((item)=>{
         return(
             <DynamicForm form={form} key={item.id} allData={newData} data ={item}/>
         )
     })
    )
}

export default DynamicForms