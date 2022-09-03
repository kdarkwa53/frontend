
import { useState } from "react"
import Styles from "../../Menu/Menu.module.css"
import SideMenuItem from "./MenuItem"


const MenuDropdownItem = ({ items, head })=>{
    const [collapsed, setCollaped] = useState()

    const handleCollapse = ()=>{
        setCollaped(!collapsed)
    }
    return(
        
        <div className={Styles.menuDropdown}>
            <nav>
                <div style={{color: "#888B93"}} className={Styles.mainMenuDropdown} onClick={handleCollapse}>
                    {head.icon}
                    <span className={Styles.javMenuText}>{head.title}</span>
                    </div>
            </nav>
           

            {
                collapsed ? (
                    <div style={{marginLeft: "3em"}} classname={Styles.subMenu}>
                    
                        {items.map((item) => {
                            return(
                                <div key={item.id}>
                                    {item.menu}
                                </div>
                                
                                
                            )

                        })}

                    </div>
                ): ""

            }
            
        </div>
    )

}


export default MenuDropdownItem