
import { Button } from "antd"
import { useHistory } from "react-router"
import { TickBold } from "./JavIcons"
import Styles from "./Pin.module.css"


const SuccessTransaction = ({ titleT, msg, action, link }) => {

    const history = useHistory()

    return (
        <>
            <div className={[`${Styles.center} ${Styles.star_bg}`]}>
                <div style={{ margin: "3em 0 2em" }}>
                    <TickBold width="5em" height="auto" color="#2D9319" />
                </div>
                <h2 className={Styles.title}>{titleT}</h2>
                <p style={{ color: "#888B93", }} className="textCenter">
                    {msg}
                </p>
                <Button
                    block
                    size="large"
                    style={{ marginTop: "2em" }}
                    type="primary"
                    onClick={() => history.push({ link })}
                >
                    {action}
                </Button>
            </div>
        </>
    )
}

export default SuccessTransaction