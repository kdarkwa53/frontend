import React from "react"
import { Col } from "antd"
import Styles from "./ProductCard.module.css"
const ProductCard = ({ icon, label, innerLabel, selectedValue, name, value, ...props }) => {
    return (
        <Col className="gutter-row pc_cardMain" xs={24} sm={24} md={12} lg={3} xl={3}>
            <label className={Styles.pc_card}>
                <div className={Styles.pc_icon}>
                    {icon}
                </div>
                <input {...props} type="radio" id="css" value={value} checked={selectedValue === value ? true : false} name={name} />
                <div className={Styles.pc_label}>
                    {innerLabel}
                </div>
            </label>
            <div className={Styles.outterLabel}>
                {label}
            </div>
        </Col>
    )
}

export default ProductCard