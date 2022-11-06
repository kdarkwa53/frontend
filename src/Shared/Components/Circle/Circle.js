

const Circle = ({size, color, children, radius})=>{

    const stylesheet = {
        circle:{
        width:size,
        height:size,
        background: color,
        borderRadius:radius ? radius : "100%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center"
    }}
    return(
        <div style={stylesheet.circle}>
            {children}
        </div>
    )
}


export default Circle