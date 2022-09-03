import { Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { changeLanguage } from "../actions/actions"

const LangDropDown = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.language)
    const handleLangChange = (val) => {
        dispatch(changeLanguage(val))
    }
    const { Option } = Select
    return (
        <Select defaultValue={state.selectedLang} onChange={handleLangChange}>
            <Option value="EN">EN</Option>
            <Option value="FR">FR</Option>
        </Select>
    )
}

export default LangDropDown