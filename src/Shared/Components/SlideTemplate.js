import Styles from "./SlideTemplate.module.css"
import Direction from "./Direction"
import { Row } from "antd"

const SlideTemplate = ({ question, answer, prev, next, handleChange, progress }) => {
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                {/* <div className={Styles.bar}>
                    <ProgressBar size="sm" percentage={progress}></ProgressBar>
                </div> */}

                <div className={Styles.pq_question}>
                    {question}
                </div>
                <div className={Styles.directions}>
                    <Direction link={prev} onClick={() => handleChange("prev", progress)} arrow="left" />
                    <Direction link={next} onClick={() => handleChange("next", progress)} arrow="right" />
                </div>
                <Row justify="center" align="middle" style={{ width: "100%", minHeight: 300, }} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} >
                    {answer}
                </Row>
            </div>
            <div className={Styles.answerSection}>
            </div>
        </div>
    )
}

export default SlideTemplate