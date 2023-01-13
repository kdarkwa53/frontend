

import { Form, Input, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getDropdownListFromAPI } from "../../../TransferMoney/duck/action"


const BankListDropdown = ({country, banks, setBanks, ...rest }) => {
    // const { Option } = Select
    // const dispatch = useDispatch()
    // const [nyBanks, setMyBanks] = useState([])

    // useEffect(() => {
    //     dispatch(getDropdownListFromAPI(`/api/business/rules-banks?country=${country}`)).then((res) => {
    //         setMyBanks(res)
    //         console.log("hi: ",nyBanks, res, country)
    //     })
    // }, [country, dispatch, setBanks])

    // let _items = nyBanks ? nyBanks : []


    return (
        <Form.Item label="Bank name" {...rest}>
            <Form.Item
                name={['bakingAndSettlement', 'bank_name']}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                {/* <Select
                    size='large'
                    optionFilterProp="children"
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        Object.values(_items)?.map((option) => {
                            return (
                                <Option key={option?.primaryKey} value={option?.institutionName}> {option?.institutionName}</Option>
                            )
                        })
                    }
                </Select> */}
                <Input size="large" />
            </Form.Item>
        </Form.Item>
    )
}

export default BankListDropdown