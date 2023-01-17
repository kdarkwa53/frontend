import { Form, Select } from "antd"
import { useSelector } from "react-redux"



const AllCurrencyDropdown = ({ name, label, ...rest }) => {
    const currencies = useSelector((state) => state?.resources?.rules_currencies)
    const _currencies = currencies ? currencies : []
    const { Option } = Select
    return (
        <Form.Item
            label={label}
            name={name}
            {...rest}
        >
            <Select
                size="large"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    _currencies.map((currency) => {
                        return (
                            <Option key={currency.id}>
                                {currency?.name}
                            </Option>
                        )

                    })
                }
            </Select>
        </Form.Item>
    )
}

export default AllCurrencyDropdown