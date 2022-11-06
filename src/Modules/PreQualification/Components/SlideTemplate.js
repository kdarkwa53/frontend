
import Styles from "../PreQualification.module.css"

import { Row } from "antd"



const SlideTemplate = ({ question, answer }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={Styles.pq_question}>
                    {question}
                </div>
                <Row justify="center" align="middle" style={{ minWidth: "500px", marginTop: "3em" }} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} >
                    {answer}
                </Row>
            </div>
            <div className={Styles.answerSection}>
            </div>
        </div>
    )
}


export default SlideTemplate