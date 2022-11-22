import { Col } from "antd"
import React from "react"
import {  normalizeIdArrayData } from "../../../../helpers/utils"
import DynamicForm from "./DynamicForm"




const DynamicForms = ({data, form}) => {
    let newData = normalizeIdArrayData(data)

    return (
        
     Object.values(data).map((item)=>{
         return(
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
             <DynamicForm form={form} key={item.id} allData={newData} data ={item}/>
            </Col>
         )
     })
    )
}

export default DynamicForms