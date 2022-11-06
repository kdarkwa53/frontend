import { Tag } from "antd"
import { Edit2Icon } from "../../../Shared/Components/JavIcons"

import Styles from  "./../Pages/BusinessKYCForm.module.css"
const KYCListCard = ({ name, id, onCLickEdit })=>{
    return(

        <div className={Styles.listCard}>
            <div className={Styles.cardTitle}>
                {name}
            </div>
            <div onClick={()=>onCLickEdit(id)} className={Styles.action}>
                <Tag color={'black'}> edit <Edit2Icon color={'#ffffff'} height={'1em'} width={'1em'} /></Tag>
            </div>
        </div>
    )
}


export default KYCListCard