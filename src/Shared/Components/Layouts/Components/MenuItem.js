
import Styles from "../../Menu/Menu.module.css"


const SideMenuItem = ({ icon, text, style, ...rest}) => {

    return (

            <nav>
                <div {...rest} style={style} className={Styles.sideMenuItem}>
                    {icon}
                    <span className={Styles.javMenuText}>{text}</span>
                </div>
            </nav>
    )
}

export default SideMenuItem