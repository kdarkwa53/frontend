import React from "react"
import Styles from "./Direction.module.css"
import { RightArrow } from "../Components/JavIcons"
import { LeftArrow } from "../Components/JavIcons"
import PropTypes from "prop-types";
const Direction = ({
    arrow,
    onClick,
    ...props
}) => {

    const dir = arrow === "left" ? <RightArrow /> : <LeftArrow />


    return (
        <div {...props}
            className={
                Styles.direction
            }
            onClick={onClick}>
            <div className={
                Styles.arrow
            }>
                {dir} </div>
        </div>
    )
}
Direction.propTypes = {
    arrow: PropTypes.oneOf(
        ['left', 'right']
    )
};


export default Direction
