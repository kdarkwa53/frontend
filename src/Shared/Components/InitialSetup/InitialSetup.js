
import { Button } from "antd"
import { useState } from "react"
import { TickBold } from "../JavIcons"
import Styles from "./InitiailSetup.module.css"



export const TaskTodo = ({completed, title, desc, fontSub})=>{

    return(
        <div className={Styles.rowTaskTodo}>
            <div className={Styles.titleRow}>
                <div >
                    <TickBold style={{margin: "0 0.5em"}} width="2em" height="2em" color={completed ? "#3DA31F" : "#727986"}  />
                <span style={{fontSize: "20px", color: "#00050E"}}>{title}</span> 
                </div>
                {completed ? 
                (<div className={Styles.completedText}>
                    Completed
                </div>)
                : ""}
            </div>

            {desc ? (
                <div className={Styles.row}>
                <div style={{marginLeft: "3em",fontSize: fontSub ? fontSub: "16px", color: "#727986"}}>
                {desc}
                </div>
                <div style={{color: "#BAC0CD"}}>
                    1min    
                </div>
            </div>
            ): ""}
            
            
        </div>
    )

}


export const InitialSetup = ({actions})=>{

    const [steps, setSteps] = useState(1+ (+actions.setPin) + (+actions.bus_kyc))
    return(
        <div className={Styles.setupCard}>
            <div style={{textAlign: "left"}} className={Styles.setupLeft}>
                <div className={Styles.steps}>
                    { `${steps}/3`}
                 </div>
                 <div style={{color: "rgba(246, 247, 249, 0.7)", fontSize: "14px", marginTop: "1em"}}>
                    Welcome to Javolin
                 </div>
                 <div style={{color: "#FFFFFF", fontSize: "20px", fontWeight: "700"}}>
                    Let's secure your account
                 </div>

                 <div className={Styles.conButton}>
                     Continue
                 </div>

            </div>
            <div className={Styles.setupRight}>

                <div style={{marginBottom: "1em"}}>
                    <TaskTodo title={"Create Account"}  completed={true}/>
                </div>
               <TaskTodo title={"Secure your Account"} desc="Set your account pin" completed={actions.setPin} />
               <TaskTodo title={"Business KYC"} desc="Provide your company details" completed={actions.bus_kyc} />
                
            </div>
        </div>
    )
}


