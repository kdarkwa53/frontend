
import { Form, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getDropdownListFromAPI } from "../../duck/action"

 const BankDropdown = ({ val }) => {

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

    let uniqueItems = {}

    _items.map((val) => {
        return uniqueItems[val.institutionName] = val.institutionName
    })

    const handleSelectBank = (e) => {
        setBankSelection(e)
    }

    let listFilteredByBankName = _items.filter(banks => banks.institutionName === selectedBank)
    console.log(listFilteredByBankName)
    return (
        <>
            <Form.Item
                name={'bank'}
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
                        Object.values(uniqueItems)?.map((option) => {
                            // let val = JSON.stringify(option)


                            return (
                                <Option key={option} value={option}> {option}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <Form.Item
                // labelInValue
                name={'bankDetails'}
                rules={rules}
                label={'Bank Address'}

            >
                <Select
                    size='large'
                    filterOption={false}
                    onChange={handleSelectBank}
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
        </>
    )
}

export default BankDropdown