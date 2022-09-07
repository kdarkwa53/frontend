
import { useHistory } from "react-router"
import "./WelcomeCard.css"
import Image from "../../../assets/forex_banner.png"
import { useSelector } from "react-redux"

const WelcomeCard2 = ({ name }) => {
    const text = useSelector((state) => state?.language)
    const history = useHistory()
    return (
         <>
            <div onClick={() => history.push("/business/forex")} className="prepaid-card" >
                <div className="messageContent">
                    <div className="title">
                    Get Started with Forex
                    </div>
                    <div className="desc">
                    The foreign exchange marketplace at your convience                  
                        </div>
                    <button className="bannerBtn">
                        Get Started
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