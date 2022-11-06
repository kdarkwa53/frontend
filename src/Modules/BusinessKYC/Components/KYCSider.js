
import React from "react";
import Styles from "../../../Shared/Components/Menu/Menu.module.css"

const KYCSider = ({ steps, onChange, current }) => {




    const defaultMenuItem = {
        color: "#888B93",
    }

    const activeMenuItem = {
        color: "white",
        background: "#0032A0"
    }

    return (
        <div className={Styles.KYCSider}>
            {steps.map((item) => (
                <nav key={item.title}>
                    <div style={current === item.id ? activeMenuItem : defaultMenuItem} onClick={() => onChange(item.id)} className={Styles.sideMenuItem}>
                        <span className={Styles.javMenuText}>{item.title}</span>
                    </div>
                </nav>
            ))}
        </div>
    )
}

export default KYCSider