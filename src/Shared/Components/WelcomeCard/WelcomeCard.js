
import "./WelcomeCard.css"
import Image from "../../../assets/woman.png"
import VideoModal from "../VideoModal/VideoModal"
import { useSelector } from "react-redux"
const WelcomeCard = ({ name }) => {
    const text = useSelector((state) => state.language)

    return (
        <>
            <div className="card">
                <div className="messageContent">
                    <div className="title">
                        {text.HELLO_THERE} 👋
                    </div>
                    <div className="desc">
                        {text.WELCOME_MSG}                   
                        </div>
                </div>
                <div className="image"  >
                    <img src={Image} style={{ height: "100%", width: "100%", objectFit: "cover", }} alt="welcomeImage" />
                    {/* <VideoModal/> */}
                </div>

            </div>
        </>
    )
}

export default WelcomeCard