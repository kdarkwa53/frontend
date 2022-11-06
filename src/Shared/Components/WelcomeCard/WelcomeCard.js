
import "./WelcomeCard.css"

import { useSelector } from "react-redux"
import { Button } from "antd"
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
                    <Button style={{margin: '1em 0.5em', padding: '8px 24px',width: '226px', height: '42px'}} size="small" shape="round" type="primary">overview in 60s</Button>
                </div>
            </div>
        </>
    )
}

export default WelcomeCard