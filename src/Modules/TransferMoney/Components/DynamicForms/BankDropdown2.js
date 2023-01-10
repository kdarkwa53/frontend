
import { Col, Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getDropdownListFromAPI } from "../../duck/action"

 const BankDropdown2 = ({ val }) => {

    const {Option} = Select

    let rules = []
    rules.push({
        required: val.isRequired,
        message: val.errorMessage
    })

    const [items, setItems] = useState('')
    const [selectedBank, setBankSelection] = useState('')
    const dispatch = useDispatch()

     useEffect(() => {
         dispatch(getDropdownListFromAPI(val.links[0]?.javolinRoute)).then((res) => {
             setItems(res)
         })
     }, [dispatch, val.links])

    let _items = items ? items : []
    console.log("ds: s",items)

    let uniqueItems = {}

    // _items.map((val) => {
    //     return uniqueItems[val.institutionName] = val.institutionName
    // })

    const handleSelectBank = (e) => {
        setBankSelection(e)
    }

    let listFilteredByBankName = _items.filter(banks => banks.institutionName === selectedBank)
    console.log(listFilteredByBankName)
    return (
        <>
        <Col key={1} xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
                name={['bakingAndSettlement', 'bank_name']}
                rules={rules}
                label={'Bank Name'}

            >
                <Select
                    size='large'
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    
                    onChange={handleSelectBank}
                >
                    {
                        Object.values(_items)?.map((option) => {
                            // let val = JSON.stringify(option)

                            return (
                                <Option key={option?.primaryKey} value={option?.institutionName}> {option?.institutionName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            </Col>
            <Col key={2}  style={{width:"100%"}} xs={24} sm={24} md={12} lg={12} xl={12}>
            {/* <Form.Item
                // labelInValue
                name={['bakingAndSettlement', 'bank_address']}
                rules={rules}
                label={'Bank Address'}
                style={{width:"100%"}}

            >
                <Select
                    size='large'
                    filterOption={false}
                    onChange={handleSelectBank}
                    disabled={selectedBank === ''}
                >
                    {
                        listFilteredByBankName?.map((option) => {
                            return (
                                <Option  value={option.primaryKey}> {option.address1} {option.city} {option.countryISO} {option.branchName}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item> */}
            </Col>
            {/* <Form.Item
                noStyle
                name={['bakingAndSettlement','bank_primary_key']}
                rules={rules}
                hidden

            >
                <Input value={selectedBank["primaryKey"]}/>
            </Form.Item> */}
        </>
    )
}

export default BankDropdown2