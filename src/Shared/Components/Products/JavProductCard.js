
import { useHistory } from "react-router"
import "./JavProductCard.css"
const JavProductCard = ({ title, subTitle, action, color, icon, link }) => {
    const history = useHistory()
    const handleLink = (val) => {
        history.push(val)
    }
    return (
        <div className="jp_card" onClick={() => handleLink(link)} style={{ background: color }}>
            <div className="textArea">
                <div className="subTitle">
                {subTitle}
                </div>
                {/* <div className="subTitle">

                    {subTitle}
                </div> */}
                <div className="action">
                    {action}
                </div>

            </div>
            <div className="icon">
                {icon}
               
            </div>
        </div>
    )
}

export default JavProductCard