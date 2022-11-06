import Styles from "./SmallCard.module.css"
import { Col } from "antd"
import { Link } from "react-router-dom"

const SmallCard = ({ icon, label, link }) => {
    return (
        <Col xs={12} sm={12} md={3} lg={8} xl={8} >
            <Link style={{ textDecoration: "none", color: "#0032A0" }} to={link}>
                <div className={Styles.card}>
                    <div className={Styles.circle}>
                        <div>
                            {icon}
                        </div>
                    </div>
                    <div className={Styles.label}>
                        {label}
                    </div>
                </div>
            </Link>
        </Col>
    )
}


export default SmallCard