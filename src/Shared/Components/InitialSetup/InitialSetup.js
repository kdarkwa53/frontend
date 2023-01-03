
import { Button, Col, Row } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import Circle from "../Circle/Circle"
import { CheckIcon, TickBold } from "../JavIcons"
import Styles from "./InitiailSetup.module.css"



export const TaskTodo = ({ completed, title, desc, fontSub }) => {
    const text = useSelector((state) => state?.language)
    return (
        <div className={Styles.rowTaskTodo}>
            <div className={Styles.titleRow}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                    <Circle size="35px" color={completed ? "#3DA31F" : "#EDEEF0"}>
                        <CheckIcon width="1.5em" height="1.5em" color={completed ? "#FFFFFF" : "#727986"} />
                    </Circle>
                    <span style={{ fontSize: "20px", color: "#00050E", marginLeft: "0.5em" }}>{title}</span>
                </div>
                {completed ?
                    (<div className={Styles.completedText}>
                        {text["Completed"]}
                    </div>)
                    : ""}
            </div>

            {desc ? (
                <div className={Styles.row}>
                    <div style={{ marginLeft: "3em", fontSize: fontSub ? fontSub : "16px", color: "#727986" }}>
                        {desc}
                    </div>
                    <div style={{ color: "#BAC0CD" }}>
                        1min
                    </div>
                </div>
            ) : ""}


        </div>
    )

}


export const InitialSetup = ({ actions, setIsPinSetVisible, showSecurityQuestions }) => {
    const text = useSelector((state) => state?.language)
    const history = useHistory()
    const handleClick=()=>{

    
    if(actions.setPin===false){
        // show start
        return setIsPinSetVisible(true)
    }else if(actions.setSecurityQ===false){
        return showSecurityQuestions(true)
    }else if(actions.bus_kyc===false){
        return history.push("/business/compliance")
    }else console.log("here")
    

    }
    

    const [steps, setSteps] = useState(1 + (+actions.setPin) + (+actions.bus_kyc))
    return (
        // <div className={Styles.setupCard}>
            <Row className={Styles.setupCard}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <div style={{ textAlign: "left" }} className={Styles.setupLeft}>
                        <div className={Styles.steps}>
                            {`${steps}/3`}
                        </div>
                        <div style={{ color: "rgba(246, 247, 249, 0.7)", fontSize: "14px", marginTop: "1em" }}>
                            {text["Welcome to Javolin"]}
                        </div>
                        <div style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: "700" }}>
                            {text["Let's secure your account"]}
                        </div>

                        <div onClick={handleClick} className={Styles.conButton}>
                            {text["Continue"]}
                        </div>

                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                    <div className={Styles.setupRight}>

                        <div style={{ marginBottom: "1em" }}>
                            <TaskTodo title={text["Create account"]} completed={true} />
                        </div>
                        <TaskTodo title={text["Secure your Account"]} desc={text["Set your account pin"]} completed={actions.setPin} />
                        <TaskTodo title={text["Business KYC"]} desc={text["Provide your company details"]} completed={actions.bus_kyc} />

                    </div>
                </Col>


            </Row>

        // </div>
    )
}


