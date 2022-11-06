


import { Button, Modal } from "antd";
import React from "react"
import Circle from "../Circle/Circle";
import { JudgeIcon } from "../JavIcons";



const ComingSoonPopUp = ({ isVisible, setVisible }) => {

    const handleCancel = () => {
        setVisible(false);
    };
    
    return (
        <Modal
            visible={isVisible}
            centered
            footer={false}
            closable={false}
            onCancel={handleCancel}
            // width={643}
        >

            <div style={{display: "flex", alignItems: "center", flexDirection: 'column'}}>
                <Circle color={"#FDEDED"} size={100}>
                    <JudgeIcon width={"4em"} height={"4em"} />
                </Circle>
                <p style={{textAlign: "center", marginTop: "2em"}}>
                    We are currently not available in your area. Rolling out to other markets soon.
                </p>
                <a
                    style={{width: "100%"}}
                    rel="noreferrer"
                    href="https://javolin.com/"
                    target="_blank"
                >
                    <Button
                        block
                        size="large"
                        style={{ marginTop: "2em" }}
                        type="primary"

                    >
                        Join waitlist
                    </Button>
                </a>
                
            </div>

        </Modal>
    )
}

export default ComingSoonPopUp