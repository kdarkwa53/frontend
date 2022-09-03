
import "./WelcomeCard.css"
import Image from "../../../assets/happy.png"
import { useSelector } from "react-redux"


const BannerCrypto = () => {
    const text = useSelector((state) => state?.language)


    return (
        <>
            {/* <a href="/apply" target="_blank" rel="noreferrer"> */}
            <div className="crypto-card">
                <div className="messageContent">
                    <div className="title">
                        {text.MORTGAGE}
                    </div>
                    <div className="desc">
                            {text.MORTGAGE_WELCOME_MSG}                  
                    </div>
                </div>
                <div className="image"  >
                    <img src={Image} style={{ height: "100%", width: "100%", objectFit: "cover", }} alt="welcomeImage" />
                </div>
            
            </div>
            {/* </a> */}
        </>
    )
}

export default BannerCrypto