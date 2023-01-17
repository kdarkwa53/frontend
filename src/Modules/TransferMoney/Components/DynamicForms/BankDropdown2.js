
import { Col, Form, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { capitalizeString } from "../../../../helpers/utils"
import { addBeneValues, getDropdownListFromAPI } from "../../duck/action"

 const BankDropdown2 = ({ val, form }) => {
    const dispatch = useDispatch()
    let countryISO = useSelector((state) => state.transfer.regionURL)

    const {Option} = Select
    const [query, setQuery] = useState("")

    let rules = []
    rules.push({
        required: val.isRequired,
        message: val.errorMessage
    })

   

    const [items, setItems] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedBank, setBankSelection] = useState('')
    

     useEffect(() => {
        setLoading(true)
         dispatch(getDropdownListFromAPI(`/api/business/rules-banks?country=${countryISO}&query=${query}`)).then((res) => {
             setItems(res)
             setLoading(false)
         })
     }, [dispatch,countryISO, query, val.links])

    let _items = items ? items : []

    let uniqueItems = {}

    _items.map((val) => {
        return uniqueItems[val.institutionName] = val.institutionName
    })

    const handleSelectBank = (e) => {
        let values = form.getFieldValue('bakingAndSettlement')
        values={
            ...values,
            bank_name: e,
            bank_address: ""
        }
        form.setFieldsValue({
            "bakingAndSettlement": values
        })
        
        setBankSelection(e)
    }

    const handleSelectBankAddress = (e,f) => {
        let values = form.getFieldValue('bakingAndSettlement')
        values={
            ...values,
            bank_address: e,
            bank_primary_key: f.key
        }

        console.log("values: ", values)
        form.setFieldsValue({
            "bakingAndSettlement": values
        })

    }

    const handleSearch = (e)=>{
        setQuery(e)
    }

    let listFilteredByBankName = _items.filter(banks => banks.institutionName === selectedBank)
    return (
        <>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>        
            <Form.Item
                name={'bank_name'}
                rules={rules}
                label={'Bank Name'}

            >
                <Select
                    size='large'
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option?.children[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                    }
                    showSearch
                    loading={loading}
                    onSearch={handleSearch}
                    
                    onChange={handleSelectBank}
                >
                    {
                        Object.values(uniqueItems)?.map((option) => {
                            return (
                                <Option key={option} value={option}> {option}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>      
            <Form.Item
                // labelInValue
                name={'bank_address'}
                rules={rules}
                label={'Bank Address'}

            >
                <Select
                    size='large'
                    filterOption={false}
                    onChange={handleSelectBankAddress}
                    disabled={selectedBank === ''}
                >
                    {
                        listFilteredByBankName?.map((option) => {
                            let val = JSON.stringify(option)
                            
                            return (
                                <Option key={option?.primaryKey} value={option?.address1}> {option.address1} {option.city} {option.countryISO} {option.branchName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            </Col> 
        </>
    )
}

export default BankDropdown2