import { Avatar, Dropdown, message, Select } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeLanguage } from "../actions/actions"
import { CaretDown } from "./JavIcons"
import en_flag from "../../assets/usflag.png"
import fr_flag from "../../assets/frflag.png"

const LangDropDown = ({fullname}) => {
    const text = useSelector((state) => state?.language)
    const langAdrr = {
        EN: {
            name: "EN",
            fullname: text["English"],
            flag: en_flag
        },
        FR: {
            name: "FR",
            fullname: text["French"],
            flag: fr_flag
        }
    }

    const items = [
        {
            label: 'EN',
            key: 'EN',
            icon: <Avatar src={langAdrr["EN"].flag} />
 
        },
        {
            label: 'FR',
            key: 'FR',
            icon: <Avatar src={langAdrr["FR"].flag} />

        },

    ];
    const dispatch = useDispatch()
    const state = useSelector((state) => state.language)
    const [lang, setLang] = useState(state.selectedLang)

    const handleLangChange = (val) => {
        // dispatch(changeLanguage(val))
        console.log("df")
    }

    const onClick = ({ key }) => {
        setLang(key)
        dispatch(changeLanguage(key))
      };

    return (
      
  
        <Dropdown
            menu={{
                items,
                onClick
            }}
            trigger={['click']}
        >
                <div style={{display: "flex", alignItems:"center"}} >
                <Avatar src={langAdrr[lang].flag} />
                <span style={{ fontSize: "20px", margin: "0 5px", color: "#3B404A" }}>{ fullname ? langAdrr[lang].fullname : lang}</span>
                <CaretDown width={"1em"} color="#3B404A" />
                </div>
        </Dropdown>
        

    )
}

export default LangDropDown