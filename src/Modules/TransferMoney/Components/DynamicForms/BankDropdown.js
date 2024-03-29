
import { Col, Form, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { capitalizeString } from "../../../../helpers/utils"
import { addBeneValues, changeRegionURL, getDropdownListFromAPI } from "../../duck/action"

 const BankDropdown = ({ val, form }) => {
    const dispatch = useDispatch()

    const {Option} = Select
    const [query, setQuery] = useState("")

    let rules = []
    rules.push({
        required: val.isRequired,
        message: val.errorMessage
    })

    const handleBankAddressChange = () => {
        

    }

    const [items, setItems] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedBank, setBankSelection] = useState('')
    

     useEffect(() => {
        setLoading(true)
         dispatch(getDropdownListFromAPI(`${val.links[0]?.javolinRoute}&query=${query}`)).then((res) => {
             setItems(res)
             setLoading(false)
         })
     }, [dispatch, query, val.links])

    let _items = items ? items : []

    let uniqueItems = {}

    _items.map((val) => {
        return uniqueItems[val.institutionName] = val.institutionName
    })

    const handleSelectBank = (e) => {
        form.setFieldsValue({
            "bankAddress" : ""
        })
        setBankSelection(e)
        
    }

    const handleSelectBankAddress = (e) => {
        const address = {
            "bankDetails": e
        }
        dispatch(addBeneValues(address))
    }

    const handleSearch = (e)=>{
        setQuery(e)
    }

    let listFilteredByBankName = _items.filter(banks => banks.institutionName === selectedBank)
    return (
        <>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>        
            <Form.Item
                name={'bank'}
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
                name={'bankAddress'}
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
                                <Option key={val} value={val}> {option.address1} {option.city} {option.countryISO} {option.branchName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            </Col> 
        </>
    )
}

export default BankDropdown