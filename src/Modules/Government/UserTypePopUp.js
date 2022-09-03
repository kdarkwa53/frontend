


import { Button, Modal } from "antd";
import React, { useState } from "react"
import './Gov.css'
import Circle from "../../Shared/Components/Circle/Circle";
import BusGov from "../../assets/gov_buz.png"
import IndGov from "../../assets/gov-bus.png"
import { ApproveIcon, PortfolioIcon } from "../../Shared/Components/JavIcons";




const UserTypePopUp = ({ isVisible, setVisible }) => {

    const [selected, setSelected] = useState(false)
    
    const handleCancel = () => {
        setVisible(false);
    };

    const handleSelect = ()=>{
        setSelected()
    }

    return (
        <Modal
            visible={isVisible}
            centered
            footer={false}
            closable={false}
            onCancel={handleCancel}
        // width={643}
        >

            <div style={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
                <h3 style={{ textAlign: "center", marginTop: "2em", fontWeight: "bold" }}>Who are you paying as?</h3>
                <p style={{ textAlign: "center", marginTop: "1em", color: "gray" }}>
                    Select one
                </p>
                <div className="icon-middle">
                    <button className={`iconCover`}>
                        <img src={IndGov} alt={"individual"}/>
                        <p>Individual</p>
                    </button>
                    <button className="iconCover">
                        <img src={BusGov} alt={"individual"} />
                        <p>Business</p>
                    </button>
                </div>
                <a
                    style={{ width: "100%" }}
                    rel="noreferrer"
                    href="/government-services/fee"
                >
                    <Button
                        block
                        size="large"
                        style={{ marginTop: "2em" }}
                        type="primary"

                    >
                        Continue
                    </Button>
                </a>

            </div>

        </Modal>
    )
}

export default UserTypePopUp