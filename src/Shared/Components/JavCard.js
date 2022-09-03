import React from "react"
import { Col, Tag, Row } from "antd"
// import Styles from "./JavCard.module.css"
import "./JavCard.css"

import { tagColor } from "../../helpers/utils"
import { LeftArrow } from "./JavIcons"
import { Link } from "react-router-dom"
const JavCard = ({ icon, label, title, desc, innerLabel, link, tag, color, classAtrr, ...props }) => {
    return (
        <Col {...props} style={{ marginTop: "1.5em", marginRight: "2em", backgroundColor: color }} className={`gutter-row pc_card ${classAtrr}`} xs={24} sm={24} md={12} lg={5} xl={5}>
            <div>
                {tag !== undefined ? (
                    <Row justify="end" style={{ width: "100%" }}>
                        <Tag color={tagColor(tag)}>
                            {tag}
                        </Tag>
                    </Row>
                ) : ""}
                <div className="pcTitle">
                    {title}
                </div>
                <div className="pcDescription">
                    {desc}
                </div>
                <div className="pc_content">
                    <div className="pc_icon">
                        {icon}
                    </div>
                    <Link to={link}>
                        <div className="pc_label" style={{ backgroundColor: color }}>
                            {innerLabel}
                            <LeftArrow style={{ width: "10px", color: "#245EA2", fill: "#245EA2" }} />
                        </div>
                    </Link>

                </div>

            </div>
            <div className="outterLabel">
                {label}
            </div>
        </Col>
    )
}

export default JavCard