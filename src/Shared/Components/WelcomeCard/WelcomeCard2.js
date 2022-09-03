
import { useHistory } from "react-router"
import "./WelcomeCard.css"
import Image from "../../../assets/card_girl.png"
import { useSelector } from "react-redux"

const WelcomeCard2 = ({ name }) => {
    const text = useSelector((state) => state?.language)
    const history = useHistory()
    return (
         <>
            <div onClick={() => history.push("/prepaid/apply/1")} className="prepaid-card" >
                <div className="messageContent">
                    <div className="title">
                       {text.GET_PREPAID}
                    </div>
                    <div className="desc">
                        {text.GET_PREPAID_MSG}                   </div>
                    <button className="bannerBtn">
                        {text.APPLY_NOW}
                    </button>
                </div>
                <div className="image"  >
                    <img src={Image} style={{ height: "100%", width: "100%", objectFit: "cover", }} alt="welcomeImage" />
                </div>
                
            </div>
        </>
    )
}

export default WelcomeCard2