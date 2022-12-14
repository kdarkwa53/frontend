
import { Button, Col, Form, InputNumber, Row, Select } from "antd"
import { useForm } from "antd/lib/form/Form"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { currencyFormat } from "../../../../helpers/utils"
import { getSpotRate } from "../../../../Modules/TransferMoney/duck/action"
import { showErrorNotification } from "../../../actions/alert.actions"
import Styles from "../../Menu/Menu.module.css"
import { Timer } from "../../Timer"

const SpotRateCalculator = () => {
    const [form] = useForm()
    const { Option } = Select
    const currencies = useSelector((state) => state?.resources?.rules_currencies)
    const rateLoading = useSelector((state) => state?.transfer?.gettingRate)
    
    const [buyCurrency, setBuyCurrency] = useState("")
    const [showTimer, setShowTimer] = useState(false)

    const [rate, setRate] = useState("")
    const dispatch = useDispatch()

    const onFinish = (values)=>{
        console.log(values)
        const details = {
            ...values,
            lock: "to"
        }
        dispatch(getSpotRate(details)).then((rate)=>{
            setRate(rate)
            setShowTimer(true)
        })

    }

    const reset = () => {
        setRate("")
        setShowTimer(false)
    }

    const handleAmountChange = (e)=>{
        console.log(e)
        setBuyCurrency(`(${e})`)
    }

    const expireRate = () => {
        reset()
        dispatch(showErrorNotification('Rate has expired'))
    }
    const _currencies = currencies ? currencies : []
    return (
        <div className={Styles.rateCard}>
            <div className={Styles.exTitle}>SPOT RATE</div>


            <div className={Styles.base}>
                <div className={Styles.baseValue}>
                    
                    {
                    rate?
                    `${rate?.sender?.currency} ${currencyFormat(rate?.sender?.amount)} / ${rate?.recipient?.currency} ${currencyFormat(rate?.recipient?.amount)}`
                    : "Check rates"
                    }
                
                </div>
                <div className={Styles.baseCurrency}>{  rate?`${Number(rate?.javolin_rate[1]).toFixed(4)} / ${Number(rate?.javolin_rate[0]).toFixed(4)}`: ''}</div>
            </div>
            {/* {showTimer ? (
                <Timer reset={expireRate} />
            ) : ""} */}
            <div style={{marginTop: "1em"}}>
                <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                            label={'Buy'}
                            name={"to"}
                            >
                                <Select
                                    onChange={handleAmountChange}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                   {
                                    _currencies?.map((currency)=>{
                                        return(
                                            <Option key={currency.id}>
                                                {currency?.name}
                                            </Option>
                                        )
                                        
                                    })
                                   }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                                label={'Sell'}
                                name={"from"}
                            >
                                <Select
                                    
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
                        </Col>
                    </Row>
                    
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                        <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                            <Form.Item
                                label={`Amount ${buyCurrency}`}
                                name={"value"}
                            >
                                <InputNumber
                                style={{width: "100%"}}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                        <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                            <Button
                            block
                            type="primary"
                            htmlType="submit"
                                loading={rateLoading}
                            >
                                check rate
                            </Button>
                        </Col>
                        
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default SpotRateCalculator